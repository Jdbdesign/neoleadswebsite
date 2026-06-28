'use client';

// "Warmrit — Protect the domain" step card (card 3 of the /stale-contact-data
// "Full Fix" bento). Reuses the warming interaction from the /low-reply-rates
// "Prepare the inbox" card, adapted to this card's .scd-fix-* frame. The OUTER
// card (badge, heading, body) runs a one-time scroll entrance and then never
// moves. The INNER "DOMAIN REPUTATION" panel loops continuously, replaying the
// warming journey: cold domain (score 0, all segments gray, red "not ready") →
// segments fill one by one on an acceleration curve while the score climbs →
// the final segment lands and the pill flips green "Warmed · ready to send".
//
// DOM-driven, not React-driven: the score is a textContent counter, segment
// fills are JS-scheduled CSS transitions, pill state is style mutation + a
// dissolve content swap — zero setState during the loop. A single recursive
// runWarmingCycle() drives it; a `cancelled` ref breaks the recursion on unmount
// and all timers / rAF ids are tracked in refs and cancelled there.
//
// Keeps `data-reveal data-reveal-skip` so the global reveal engine leaves its
// visuals to this component while siblings' stagger indices stay intact. No
// global CSS touched — original .scd-fix-* classes style the frame; only the
// bespoke motion lives here.

import { useEffect, useRef, useState } from 'react';

// segments fill slow → fast (ISPs skeptical early, reputation compounds late)
const SEGMENT_GAPS = [360, 330, 300, 260, 220, 180, 150];
// score per segment — weighted toward the back half, landing at 98
const SCORE_TARGETS = [12, 25, 40, 55, 70, 85, 98];
const SEG_COUNT = SEGMENT_GAPS.length;

const SEG_GRAY = 'rgba(255,255,255,0.08)';
const SEG_FILL = 'linear-gradient(90deg, var(--brand) 0%, var(--brand-light) 100%)';
const SEG_TRANSITION = 'box-shadow 400ms ease-out, filter 200ms ease-out';

const PILL_TRANSITION = 'background-color 400ms ease, border-color 400ms ease, color 400ms ease';

const PILL = {
  red: { bg: 'rgba(255,107,107,0.1)', border: 'rgba(255,107,107,0.3)', color: '#FF6B6B', icon: '✗', text: 'Not ready · reputation too low' },
  amber: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', color: '#F59E0B', icon: '⟳', text: 'Warming · building reputation' },
  green: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', color: '#22C55E', icon: '✓', text: 'Warmed · ready to send' },
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;

export default function StaleContactDataProtectCard() {
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const mockRef = useRef(null);
  const labelRef = useRef(null);
  const scoreRef = useRef(null);
  const segmentRefs = useRef([]);
  const pillRef = useRef(null);
  const pillIconRef = useRef(null);
  const pillTextRef = useRef(null);

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
      if (pillRef.current) pillRef.current.style.willChange = on ? 'transform, opacity' : 'auto';
      segmentRefs.current.forEach((s) => { if (s) s.style.willChange = on ? 'background, box-shadow' : 'auto'; });
    };

    // ---- segment activation: fill + flash + lone glow ----
    const activateSegment = (i) => {
      const seg = segmentRefs.current[i];
      if (!seg) return;
      if (i > 0 && segmentRefs.current[i - 1]) segmentRefs.current[i - 1].style.boxShadow = 'none';
      seg.style.background = SEG_FILL;
      seg.style.filter = 'brightness(1.5)';
      later(() => { if (seg) seg.style.filter = 'brightness(1)'; }, 100);
      seg.style.boxShadow = '0 0 8px rgba(124,58,237,0.5)';
      later(() => { if (seg) seg.style.boxShadow = '0 0 0px rgba(124,58,237,0)'; }, 200);
    };

    const countToNextScore = (i) => {
      const from = i === 0 ? 0 : SCORE_TARGETS[i - 1];
      countUp(scoreRef.current, from, SCORE_TARGETS[i], SEGMENT_GAPS[i] * 0.8, easeOutCubic);
    };

    // ---- pill: state colours + dissolve content swap ----
    const swapPillContent = (icon, text) => {
      const ic = pillIconRef.current;
      const tx = pillTextRef.current;
      if (ic) ic.style.opacity = '0';
      if (tx) tx.style.opacity = '0';
      later(() => {
        if (ic) { ic.textContent = icon; ic.style.opacity = '1'; }
        if (tx) { tx.textContent = text; tx.style.opacity = '1'; }
      }, 150);
    };
    const pulsePill = () =>
      animate(300, (t) => {
        const s = t < 0.5 ? 1 + 0.02 * (t / 0.5) : 1.02 - 0.02 * ((t - 0.5) / 0.5);
        if (pillRef.current) pillRef.current.style.transform = `scale(${s})`;
      }).then(() => { if (pillRef.current) pillRef.current.style.transform = 'none'; });
    const transitionPill = (state) => {
      const s = PILL[state];
      if (pillRef.current) {
        pillRef.current.style.transition = PILL_TRANSITION;
        pillRef.current.style.backgroundColor = s.bg;
        pillRef.current.style.borderColor = s.border;
        pillRef.current.style.color = s.color;
      }
      swapPillContent(s.icon, s.text);
      if (state === 'green') pulsePill();
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
        if (pillRef.current) pillRef.current.style.opacity = String(1 - 0.15 * Math.sin(Math.PI * t));
      }).then(() => { if (pillRef.current) pillRef.current.style.opacity = '1'; });
      await pause(ms);
    };

    // ---- resets ----
    const resetSegments = () => {
      // simultaneous fill → gray (efficient system reset, not one-by-one)
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
      const r = PILL.red;
      if (pillRef.current) {
        pillRef.current.style.transition = 'none';
        pillRef.current.style.backgroundColor = r.bg;
        pillRef.current.style.borderColor = r.border;
        pillRef.current.style.color = r.color;
        pillRef.current.style.opacity = '1';
        pillRef.current.style.transform = 'none';
      }
      if (pillIconRef.current) { pillIconRef.current.textContent = r.icon; pillIconRef.current.style.opacity = '1'; }
      if (pillTextRef.current) { pillTextRef.current.textContent = r.text; pillTextRef.current.style.opacity = '1'; }
      later(() => { if (pillRef.current) pillRef.current.style.transition = PILL_TRANSITION; }, 20);
      setWill(true);
    };

    // ---- master loop ----
    const runWarmingCycle = async () => {
      if (cancelled.current) return;
      resetToCold();
      await pause(500);

      for (let i = 0; i < SEG_COUNT; i++) {
        if (cancelled.current) return;
        await pause(SEGMENT_GAPS[i]);
        activateSegment(i);
        countToNextScore(i);
        if (i === 2) transitionPill('amber'); // crossing the "warming" threshold
      }

      await pause(200); // let the final score settle at 98
      if (cancelled.current) return;
      transitionPill('green');
      pulseScore();

      await hold(3000);
      if (cancelled.current) return;

      // reversed reset: drain score, fade segments, pill back to red
      transitionPill('red');
      countUp(scoreRef.current, 98, 0, 500, easeInCubic);
      resetSegments();
      await pause(500);
      if (!cancelled.current) runWarmingCycle();
    };

    // ---- reduced-motion / no-IO settled state (Warmed) ----
    const renderFinal = () => {
      if (scoreRef.current) scoreRef.current.textContent = '98';
      segmentRefs.current.forEach((s) => { if (s) s.style.background = SEG_FILL; });
      const g = PILL.green;
      if (pillRef.current) { pillRef.current.style.backgroundColor = g.bg; pillRef.current.style.borderColor = g.border; pillRef.current.style.color = g.color; }
      if (pillIconRef.current) pillIconRef.current.textContent = g.icon;
      if (pillTextRef.current) pillTextRef.current.textContent = g.text;
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
      className="scd-fix-card"
      data-reveal
      data-reveal-skip
      style={{ ...o(0, 450, 16), willChange: 'transform, opacity' }}
    >
      <div className="scd-fix-card-head" style={o(150, 350)}>
        <span className="scd-fix-num">3</span>
        <span className="scd-fix-product">Warmrit</span>
      </div>
      <h3 className="scd-fix-title" style={o(250, 350, 8)}>Protect the domain</h3>
      <p className="scd-fix-desc" style={o(380, 350, 8)}>
        Warmrit keeps every sending domain at campaign-ready reputation, so cleaned lists
        send from a position of strength &mdash; able to absorb the occasional bounce
        without lasting damage.
      </p>

      {/* ----- live loop zone ----- */}
      <div className="scd-fix-demo" ref={mockRef} style={{ opacity: 0, transform: 'translateY(12px)' }}>
        <div className="scd-fix-demo-head">
          <span className="scd-fix-demo-eyebrow" ref={labelRef} style={{ opacity: 0 }}>Domain reputation</span>
          <span
            className="scd-fix-rep"
            ref={scoreRef}
            style={{ display: 'inline-block', transition: 'text-shadow 300ms ease-out' }}
          >
            0
          </span>
        </div>

        <div className="scd-fix-segs" aria-hidden="true">
          {Array.from({ length: SEG_COUNT }, (_, i) => (
            <span
              key={i}
              ref={(node) => { segmentRefs.current[i] = node; }}
              style={{ opacity: 1, background: SEG_GRAY, transition: SEG_TRANSITION }}
            />
          ))}
        </div>

        <div
          className="scd-fix-pill"
          ref={pillRef}
          style={{
            backgroundColor: PILL.red.bg,
            borderColor: PILL.red.border,
            color: PILL.red.color,
            transition: PILL_TRANSITION,
          }}
        >
          <span ref={pillIconRef} style={{ transition: 'opacity 150ms ease' }}>{PILL.red.icon}</span>
          <span ref={pillTextRef} style={{ transition: 'opacity 150ms ease' }}>{PILL.red.text}</span>
        </div>
      </div>
    </article>
  );
}
