'use client';

// "Warmrit — Prepare the Inbox" step card (card 3 of the /low-reply-rates
// "Full Fix" bento). The OUTER card (badge, heading, body) runs a one-time
// scroll entrance and then never moves. The INNER "DOMAIN REPUTATION" panel
// loops continuously, replaying the warming journey: cold domain (score 0, all
// segments gray, red "not ready") → segments fill one by one on an acceleration
// curve while the score climbs → segment 10 lands and the badge flips green
// "Warmed · ready to send".
//
// DOM-driven, not React-driven: the score is a textContent counter, segment
// fills are JS-scheduled CSS transitions, badge state is style mutation + a
// dissolve content swap — zero setState during the loop. A single recursive
// runWarmingCycle() drives it; a `cancelled` ref breaks the recursion on unmount
// and all timers / rAF ids are tracked in refs and cancelled there.
//
// Keeps `data-reveal data-reveal-skip` so the global reveal engine leaves its
// visuals to this component while siblings' stagger indices stay intact. No
// global CSS touched — original .lrr-fix-* / .lrr-fixm-* classes style the
// frame; only the bespoke motion lives here.

import { useEffect, useRef, useState } from 'react';

// segments fill slow → fast (ISPs skeptical early, reputation compounds late)
const SEGMENT_GAPS = [350, 330, 300, 270, 240, 210, 180, 150, 130, 110];
// score per segment — weighted toward the back half
const SCORE_TARGETS = [8, 16, 25, 34, 44, 55, 66, 77, 88, 98];

const SEG_GRAY = 'rgba(255,255,255,0.1)';
const SEG_PURPLE = '#7C3AED';
const SEG_TRANSITION = 'background 180ms ease-out, box-shadow 400ms ease-out, filter 200ms ease-out';
const BADGE_TRANSITION = 'background-color 400ms ease, border-color 400ms ease, color 400ms ease';

const BADGE = {
  red: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', color: '#EF4444', icon: '✗', text: 'Not ready · reputation too low' },
  amber: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', color: '#F59E0B', icon: '⟳', text: 'Warming · building reputation' },
  green: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', color: '#22C55E', icon: '✓', text: 'Warmed · ready to send' },
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;

export default function LowReplyRatesWarmInboxCard() {
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const mockRef = useRef(null);
  const labelRef = useRef(null);
  const scoreRef = useRef(null);
  const segmentRefs = useRef([]);
  const badgeRef = useRef(null);
  const badgeIconRef = useRef(null);
  const badgeTextRef = useRef(null);

  const hasStarted = useRef(false);
  const cancelled = useRef(false);
  const timers = useRef(new Set());
  const rafs = useRef(new Set());

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Reset control refs every effect run (React 18 StrictMode mounts →
    // cleans up → remounts; cleanup sets cancelled=true).
    cancelled.current = false;
    hasStarted.current = false;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // ---- tracked primitives ----
    const later = (fn, ms) =>
      new Promise((resolve) => {
        const id = setTimeout(() => {
          timers.current.delete(id);
          if (!cancelled.current && fn) fn();
          resolve();
        }, ms);
        timers.current.add(id);
      });
    const pause = (ms) => later(null, ms);
    const animate = (duration, fn) =>
      new Promise((resolve) => {
        const start = performance.now();
        let id;
        const step = (now) => {
          rafs.current.delete(id);
          if (cancelled.current) return resolve();
          const t = Math.min(1, (now - start) / duration);
          fn(t);
          if (t < 1) {
            id = requestAnimationFrame(step);
            rafs.current.add(id);
          } else {
            resolve();
          }
        };
        id = requestAnimationFrame(step);
        rafs.current.add(id);
      });
    const countUp = (node, from, to, duration, easing) =>
      animate(duration, (t) => {
        if (node) node.textContent = String(Math.round(from + (to - from) * easing(t)));
      });

    const setWill = (on) => {
      if (scoreRef.current) scoreRef.current.style.willChange = on ? 'transform, opacity' : 'auto';
      if (badgeRef.current) badgeRef.current.style.willChange = on ? 'transform, opacity' : 'auto';
      segmentRefs.current.forEach((s) => { if (s) s.style.willChange = on ? 'background, box-shadow' : 'auto'; });
    };

    // ---- segment activation: relay closes — colour + flash + lone glow ----
    const activateSegment = (i) => {
      const seg = segmentRefs.current[i];
      if (!seg) return;
      if (i > 0 && segmentRefs.current[i - 1]) segmentRefs.current[i - 1].style.boxShadow = 'none';
      seg.style.background = SEG_PURPLE;
      seg.style.filter = 'brightness(1.5)';
      later(() => { if (seg) seg.style.filter = 'brightness(1)'; }, 100);
      seg.style.boxShadow = '0 0 8px rgba(124,58,237,0.5)';
      later(() => { if (seg) seg.style.boxShadow = '0 0 0px rgba(124,58,237,0)'; }, 200);
    };

    const countToNextScore = (i) => {
      const from = i === 0 ? 0 : SCORE_TARGETS[i - 1];
      countUp(scoreRef.current, from, SCORE_TARGETS[i], SEGMENT_GAPS[i] * 0.8, easeOutCubic);
    };

    // ---- badge: state colours + dissolve content swap ----
    const swapBadgeContent = (icon, text) => {
      const ic = badgeIconRef.current;
      const tx = badgeTextRef.current;
      if (ic) ic.style.opacity = '0';
      if (tx) tx.style.opacity = '0';
      later(() => {
        if (ic) { ic.textContent = icon; ic.style.opacity = '1'; }
        if (tx) { tx.textContent = text; tx.style.opacity = '1'; }
      }, 150);
    };
    const pulseBadge = () =>
      animate(300, (t) => {
        const s = t < 0.5 ? 1 + 0.02 * (t / 0.5) : 1.02 - 0.02 * ((t - 0.5) / 0.5);
        if (badgeRef.current) badgeRef.current.style.transform = `scale(${s})`;
      }).then(() => { if (badgeRef.current) badgeRef.current.style.transform = 'none'; });
    const transitionBadge = (state) => {
      const s = BADGE[state];
      if (badgeRef.current) {
        badgeRef.current.style.transition = BADGE_TRANSITION;
        badgeRef.current.style.backgroundColor = s.bg;
        badgeRef.current.style.borderColor = s.border;
        badgeRef.current.style.color = s.color;
      }
      swapBadgeContent(s.icon, s.text);
      if (state === 'green') pulseBadge();
    };

    // ---- score "campaign-ready" lock: scale + faint purple halo ----
    const pulseScore = () => {
      const el2 = scoreRef.current;
      if (el2) {
        el2.style.transition = 'text-shadow 300ms ease-out';
        el2.style.textShadow = '0 0 12px rgba(124,58,237,0.4)';
        later(() => {
          if (scoreRef.current) {
            scoreRef.current.style.transition = 'text-shadow 600ms ease-out';
            scoreRef.current.style.textShadow = '0 0 0px rgba(124,58,237,0)';
          }
        }, 300);
      }
      return animate(250, (t) => {
        const s = t < 0.5 ? 1 + 0.08 * (t / 0.5) : 1.08 - 0.08 * ((t - 0.5) / 0.5);
        if (scoreRef.current) scoreRef.current.style.transform = `scale(${s})`;
      }).then(() => { if (scoreRef.current) scoreRef.current.style.transform = 'none'; });
    };

    const hold = async (ms) => {
      setWill(false);
      // one gentle green breath
      animate(2000, (t) => {
        if (badgeRef.current) badgeRef.current.style.opacity = String(1 - 0.15 * Math.sin(Math.PI * t));
      }).then(() => { if (badgeRef.current) badgeRef.current.style.opacity = '1'; });
      await pause(ms);
    };

    // ---- resets ----
    const resetSegments = () => {
      // simultaneous purple → gray (efficient system reset, not one-by-one)
      segmentRefs.current.forEach((s) => {
        if (!s) return;
        s.style.transition = 'background 350ms ease, box-shadow 400ms ease-out, filter 200ms ease-out';
        s.style.background = SEG_GRAY;
        s.style.boxShadow = 'none';
        s.style.filter = 'brightness(1)';
      });
      later(() => { segmentRefs.current.forEach((s) => { if (s) s.style.transition = SEG_TRANSITION; }); }, 360);
    };
    const resetToCold = () => {
      if (scoreRef.current) { scoreRef.current.textContent = '0'; scoreRef.current.style.transform = 'none'; }
      segmentRefs.current.forEach((s) => {
        if (!s) return;
        s.style.transition = 'none';
        s.style.background = SEG_GRAY;
        s.style.boxShadow = 'none';
        s.style.filter = 'brightness(1)';
      });
      later(() => { segmentRefs.current.forEach((s) => { if (s) s.style.transition = SEG_TRANSITION; }); }, 20);
      const r = BADGE.red;
      if (badgeRef.current) {
        badgeRef.current.style.transition = 'none';
        badgeRef.current.style.backgroundColor = r.bg;
        badgeRef.current.style.borderColor = r.border;
        badgeRef.current.style.color = r.color;
        badgeRef.current.style.opacity = '1';
        badgeRef.current.style.transform = 'none';
      }
      if (badgeIconRef.current) { badgeIconRef.current.textContent = r.icon; badgeIconRef.current.style.opacity = '1'; }
      if (badgeTextRef.current) { badgeTextRef.current.textContent = r.text; badgeTextRef.current.style.opacity = '1'; }
      later(() => { if (badgeRef.current) badgeRef.current.style.transition = BADGE_TRANSITION; }, 20);
      setWill(true);
    };

    // ---- master loop ----
    const runWarmingCycle = async () => {
      if (cancelled.current) return;
      resetToCold();
      await pause(500);

      for (let i = 0; i < 10; i++) {
        if (cancelled.current) return;
        await pause(SEGMENT_GAPS[i]);
        activateSegment(i);
        countToNextScore(i);
        if (i === 3) transitionBadge('amber'); // crossing the "warming" threshold
      }

      await pause(200); // let the final score settle at 98
      if (cancelled.current) return;
      transitionBadge('green');
      pulseScore();

      await hold(3000);
      if (cancelled.current) return;

      // reversed reset: drain score, fade segments, badge back to red
      transitionBadge('red');
      countUp(scoreRef.current, 98, 0, 500, easeInCubic);
      resetSegments();
      await pause(500);
      if (!cancelled.current) runWarmingCycle();
    };

    // ---- reduced-motion / no-IO settled state (State 2 — Warmed) ----
    const renderFinal = () => {
      if (scoreRef.current) scoreRef.current.textContent = '98';
      segmentRefs.current.forEach((s) => { if (s) s.style.background = SEG_PURPLE; });
      const g = BADGE.green;
      if (badgeRef.current) { badgeRef.current.style.backgroundColor = g.bg; badgeRef.current.style.borderColor = g.border; badgeRef.current.style.color = g.color; }
      if (badgeIconRef.current) badgeIconRef.current.textContent = g.icon;
      if (badgeTextRef.current) badgeTextRef.current.textContent = g.text;
      if (mockRef.current) { mockRef.current.style.opacity = '1'; mockRef.current.style.transform = 'none'; }
      if (labelRef.current) labelRef.current.style.opacity = '1';
    };

    // ---- entrance (Phase 2) then the loop ----
    const startEntrance = async () => {
      if (mockRef.current) mockRef.current.style.minHeight = mockRef.current.offsetHeight + 'px';
      await pause(500);
      animate(400, (t) => {
        const e = easeOutCubic(t);
        if (mockRef.current) {
          mockRef.current.style.opacity = String(e);
          mockRef.current.style.transform = `translateY(${12 * (1 - e)}px)`;
        }
      });
      await pause(150); // -> 650ms: label + cold readout fade in with the panel
      animate(250, (t) => { if (labelRef.current) labelRef.current.style.opacity = String(easeOutCubic(t)); });
      await pause(350); // -> ~1000ms
      hasStarted.current = true;
      runWarmingCycle();
    };

    // ---- trigger ----
    if (prefersReduced || !hasIO) {
      setReduced(true);
      setEntered(true);
      const id = setTimeout(renderFinal, 0);
      timers.current.add(id);
      return () => {
        cancelled.current = true;
        timers.current.forEach(clearTimeout);
        rafs.current.forEach(cancelAnimationFrame);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            setEntered(true);
            startEntrance();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => {
      cancelled.current = true;
      io.disconnect();
      timers.current.forEach(clearTimeout);
      rafs.current.forEach(cancelAnimationFrame);
      timers.current.clear();
      rafs.current.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const o = (delay, dur, ty) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'none' : ty ? `translateY(${ty}px)` : undefined,
    transition: reduced
      ? 'none'
      : `opacity ${dur}ms ease-out ${delay}ms${ty ? `, transform ${dur}ms ease-out ${delay}ms` : ''}`,
  });

  return (
    <article
      ref={rootRef}
      className="lrr-fix-card c-third"
      data-reveal
      data-reveal-skip
      style={{ ...o(0, 450, 16), willChange: 'transform, opacity' }}
    >
      <div className="lrr-fix-card-head" style={o(150, 350)}>
        <div className="lrr-fix-meta">
          <span className="lrr-fix-badge">3</span>
          <span className="lrr-fix-product">Warmrit</span>
        </div>
      </div>
      <h3 className="lrr-fix-title" style={o(250, 350, 8)}>Prepare the inbox</h3>
      <p className="lrr-fix-desc" style={o(380, 350, 8)}>
        Every sending domain is warmed to campaign-ready, building the
        reputation that lands in primary, not spam.
      </p>

      {/* ----- live loop zone ----- */}
      <div className="lrr-fix-mock" ref={mockRef} style={{ opacity: 0, transform: 'translateY(12px)' }}>
        <div className="lrr-fixm-top">
          <span className="lrr-fixm-label" ref={labelRef} style={{ opacity: 0 }}>Domain reputation</span>
          <span
            className="lrr-fixm-rep"
            ref={scoreRef}
            style={{ display: 'inline-block', transition: 'text-shadow 300ms ease-out' }}
          >
            0
          </span>
        </div>

        <div aria-hidden="true" style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              ref={(node) => { segmentRefs.current[i] = node; }}
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                background: SEG_GRAY,
                transition: SEG_TRANSITION,
              }}
            />
          ))}
        </div>

        <div
          className="lrr-fixm-warmed"
          ref={badgeRef}
          style={{
            height: '38px',
            boxSizing: 'border-box',
            padding: '0 12px',
            backgroundColor: BADGE.red.bg,
            borderColor: BADGE.red.border,
            color: BADGE.red.color,
            transition: BADGE_TRANSITION,
          }}
        >
          <span ref={badgeIconRef} style={{ transition: 'opacity 150ms ease' }}>{BADGE.red.icon}</span>
          <span ref={badgeTextRef} style={{ transition: 'opacity 150ms ease' }}>{BADGE.red.text}</span>
        </div>
      </div>
    </article>
  );
}
