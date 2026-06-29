'use client';

// "Domain Setup + Warmup Progress" card (right column of the infrastructure
// comparison on /emails-landing-in-spam). Unlike the other animated cards on the
// site, this one is INTENTIONALLY always-on: the loop starts on mount — NOT on
// scroll-into-view — and begins at a RANDOM offset so a visitor scrolling in
// catches the warmup already in progress. It reads as a live, running system, not
// a staged demo that politely waits to be seen.
//
// A single requestAnimationFrame loop drives everything off one clock:
//   elapsed = (now - loopStart + randomOffset) % 10000
// Continuous values (dot travel, track fill, node states, reputation score) are
// derived from `elapsed` every frame and written idempotently via ref.style — so
// a cold mid-cycle entry simply renders the correct frozen frame, then continues.
// One-shot flourishes (node-arrival pops, the node-4 ripple, auth-record pulses,
// the completion pill spring, the Sendrit typewriter) fire once per cycle, guarded
// by `firedThisCycle`; on a cold start every already-passed flourish is marked
// fired so nothing replays. Zero setState during the loop; `cancelled` + tracked
// timers/rafs tear everything down on unmount. Keyframes are scoped with the
// `essc` prefix so nothing leaks into global styles. No global CSS is touched —
// the original .els-setup-* classes still style the frame.

import { useEffect, useRef } from 'react';
import Icon from '@/components/Icon';

const PURPLE = '#7C3AED';
const GREEN = '#22C55E';
const BADGE_GRAD = 'linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)';
const FOOT_TEXT = 'Sendrit: Cleared, campaign authorised to launch';

// cycle timeline (ms)
const LOOP = 10000;
const TRAVEL_END = 7000; // dot reaches node 4
const HOLD_END = 9000; // completion hold ends, reset begins
const RESET_END = 9300; // track-fill retract finishes

const NODE_POS = [0, 33.3, 66.6, 100]; // % of rail width
const SCORES = [42, 67, 83, 96]; // reputation score at each node
const SEGMENTS = [
  { start: 0, end: 2000, from: 0, to: 33.3 },
  { start: 2000, end: 4500, from: 33.3, to: 66.6 },
  { start: 4500, end: 7000, from: 66.6, to: 100 },
];

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeIn = (t) => t * t;

// dot position (% of rail) for a given point in the cycle
function dotPosFor(elapsed) {
  if (elapsed >= HOLD_END) return 0; // reset: dot snaps back to node 1
  if (elapsed >= TRAVEL_END) return 100; // completion hold
  const seg = SEGMENTS.find((s) => elapsed >= s.start && elapsed < s.end) || SEGMENTS[0];
  const t = (elapsed - seg.start) / (seg.end - seg.start);
  return seg.from + (seg.to - seg.from) * easeInOutCubic(t);
}

// reputation score for a given point in the cycle
function scoreFor(elapsed) {
  if (elapsed >= HOLD_END) return 42; // reset → warming
  if (elapsed >= TRAVEL_END) return 96; // hold → locked
  const pos = dotPosFor(elapsed);
  const i = pos < 33.3 ? 0 : pos < 66.6 ? 1 : 2;
  const a = NODE_POS[i];
  const b = NODE_POS[i + 1];
  const t = Math.min(1, Math.max(0, (pos - a) / (b - a)));
  return SCORES[i] + (SCORES[i + 1] - SCORES[i]) * easeOutQuart(t);
}

// badge label + background for a (rounded) score
function badgeStateFor(score) {
  if (score >= 96) return { suffix: 'Inbox-Ready', bg: BADGE_GRAD };
  if (score >= 83) return { suffix: 'Almost Ready', bg: 'rgba(99,51,214,0.95)' };
  if (score >= 67) return { suffix: 'Building', bg: 'rgba(124,58,237,0.85)' };
  return { suffix: 'Warming', bg: 'rgba(124,58,237,0.6)' };
}

export default function EmailsSpamSetupCard() {
  const rootRef = useRef(null);

  // warmup timeline
  const fillRef = useRef(null);
  const dotRef = useRef(null); // outer: holds left + translate (motion)
  const dotInnerRef = useRef(null); // inner: holds colour + scale pops
  const rippleRef = useRef(null); // node-4 completion ripple
  const nodeRefs = useRef([]);

  // reputation badge
  const badgeRef = useRef(null);
  const badgeTextRef = useRef(null);

  // auth records
  const spfCheckRef = useRef(null);
  const spfDetailRef = useRef(null);
  const dkimCheckRef = useRef(null);
  const dkimDetailRef = useRef(null);
  const dmarcCheckRef = useRef(null);
  const dmarcDetailRef = useRef(null);

  // completion elements
  const pillRef = useRef(null);
  const pillCheckRef = useRef(null);
  const footRef = useRef(null);
  const footCheckRef = useRef(null);
  const footTextRef = useRef(null);
  const footDotRef = useRef(null);

  // loop control
  const cancelled = useRef(false);
  const rafId = useRef(0);
  const timers = useRef(new Set());

  useEffect(() => {
    cancelled.current = false;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Reduced motion / no rAF: leave the statically-rendered "complete" state.
    if (prefersReduced || typeof requestAnimationFrame === 'undefined') return;

    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timers.current.delete(id);
        if (!cancelled.current) fn();
      }, ms);
      timers.current.add(id);
      return id;
    };

    const authRefs = {
      spf: { icon: spfCheckRef.current, detail: spfDetailRef.current },
      dkim: { icon: dkimCheckRef.current, detail: dkimDetailRef.current },
      dmarc: { icon: dmarcCheckRef.current, detail: dmarcDetailRef.current },
    };

    // --------- one-shot flourishes ---------
    const restart = (node, anim) => {
      if (!node) return;
      node.style.animation = 'none';
      void node.offsetWidth; // reflow so the animation replays
      node.style.animation = anim;
    };

    const authPulse = (rec) => {
      const { icon, detail } = authRefs[rec] || {};
      restart(icon, 'esscAuthPulse 420ms ease');
      if (detail) {
        detail.style.transition = 'opacity 200ms ease';
        detail.style.opacity = '1';
        later(() => { detail.style.opacity = '0.62'; }, 240);
      }
    };

    const dotPop = () => restart(dotInnerRef.current, 'esscDotPop 260ms ease');

    const node4Arrival = () => {
      restart(rippleRef.current, 'esscRipple 600ms ease-out');
      const n4 = nodeRefs.current[3];
      if (n4) later(() => restart(n4, 'esscNodeBreathe 1500ms ease-in-out'), 60);
    };

    const pillSpring = () => {
      const p = pillRef.current;
      if (p) {
        p.style.borderColor = 'rgba(139,77,255,0.7)';
        restart(p, 'esscPillIn 360ms cubic-bezier(0.34,1.56,0.64,1)');
      }
      later(() => restart(pillCheckRef.current, 'esscSpringIn 300ms cubic-bezier(0.34,1.56,0.64,1)'), 50);
      restart(badgeRef.current, 'esscBadgeGlow 600ms ease-out');
    };

    const typeFoot = () => {
      const el = footTextRef.current;
      if (!el) return;
      el.textContent = '';
      let i = 0;
      const step = () => {
        if (cancelled.current || !footTextRef.current) return;
        i += 1;
        el.textContent = FOOT_TEXT.slice(0, i);
        if (i < FOOT_TEXT.length) later(step, 20);
        else showFootDot();
      };
      step();
    };

    const showFootDot = () => {
      const d = footDotRef.current;
      if (!d) return;
      d.style.opacity = '1';
      d.style.animation = 'esscDotPulse 2s ease-in-out infinite';
    };

    const footArrival = () => {
      restart(footRef.current, 'esscFootIn 360ms ease-out');
      later(() => restart(footCheckRef.current, 'esscSpringIn 300ms cubic-bezier(0.34,1.56,0.64,1)'), 80);
      typeFoot();
    };

    // trigger table — shared by the per-frame check and the cold-start primer
    const ONE_SHOTS = [
      { t: 1200, key: 'spf-a', fn: () => authPulse('spf') },
      { t: 5800, key: 'spf-b', fn: () => authPulse('spf') },
      { t: 2800, key: 'dkim-a', fn: () => authPulse('dkim') },
      { t: 7100, key: 'dkim-b', fn: () => authPulse('dkim') },
      { t: 4100, key: 'dmarc-a', fn: () => authPulse('dmarc') },
      { t: 8500, key: 'dmarc-b', fn: () => authPulse('dmarc') },
      { t: 2000, key: 'pop2', fn: dotPop },
      { t: 4500, key: 'pop3', fn: dotPop },
      { t: 7000, key: 'pop4', fn: () => { dotPop(); node4Arrival(); } },
      { t: 7300, key: 'pill', fn: pillSpring },
      { t: 7700, key: 'foot', fn: footArrival },
    ];

    // --------- continuous (idempotent, cached) ---------
    let lastGreen = null;
    const setDot = (elapsed) => {
      const pos = dotPosFor(elapsed);
      const out = dotRef.current;
      if (out) {
        out.style.left = pos + '%';
        out.style.transform = `translate(${-pos}%, -50%)`;
      }
      const green = elapsed >= TRAVEL_END && elapsed < HOLD_END;
      if (green !== lastGreen) {
        lastGreen = green;
        const inner = dotInnerRef.current;
        if (inner) {
          inner.style.background = green ? GREEN : PURPLE;
          inner.style.boxShadow = green
            ? '0 0 0 3px rgba(34,197,94,0.35)'
            : '0 0 0 3px rgba(124,58,237,0.35)';
        }
      }
      return pos;
    };

    const setFill = (elapsed, pos) => {
      let w;
      if (elapsed < TRAVEL_END) w = pos;
      else if (elapsed < HOLD_END) w = 100;
      else if (elapsed < RESET_END) w = 100 * (1 - easeIn((elapsed - HOLD_END) / (RESET_END - HOLD_END)));
      else w = 0;
      const f = fillRef.current;
      if (f) {
        f.style.width = w + '%';
        const greenStart = Math.max(0, w - 20);
        f.style.background = `linear-gradient(to right, ${PURPLE} ${greenStart}%, ${GREEN} ${w}%)`;
      }
    };

    const nodeState = [];
    const setNodes = (elapsed, pos) => {
      for (let i = 0; i < 4; i += 1) {
        const np = NODE_POS[i];
        let bg;
        let shadow;
        let scale;
        if (elapsed >= HOLD_END) {
          // reset / blank: node 1 is the "ready" start node, rest are future
          bg = i === 0 ? PURPLE : 'rgba(255,255,255,0.2)';
          shadow = i === 0 ? '0 0 0 4px rgba(124,58,237,0.3)' : 'none';
          scale = i === 0 ? 1.3 : 1;
        } else if (i === 3 && elapsed >= TRAVEL_END) {
          // node 4 reached — inbox-ready green
          bg = GREEN;
          shadow = '0 0 0 4px rgba(34,197,94,0.3)';
          scale = 1.15;
        } else {
          const active = elapsed < TRAVEL_END && Math.abs(pos - np) < 4;
          const reached = pos >= np - 0.5;
          if (active) {
            bg = PURPLE;
            shadow = '0 0 0 4px rgba(124,58,237,0.3)';
            scale = 1.3;
          } else if (reached) {
            bg = PURPLE;
            shadow = 'none';
            scale = 1;
          } else {
            bg = 'rgba(255,255,255,0.2)';
            shadow = 'none';
            scale = 1;
          }
        }
        const sig = bg + '|' + shadow + '|' + scale;
        if (nodeState[i] !== sig) {
          nodeState[i] = sig;
          const node = nodeRefs.current[i];
          if (node) {
            node.style.background = bg;
            node.style.boxShadow = shadow;
            node.style.transform = `translate(${-np}%, -50%) scale(${scale})`;
          }
        }
      }
    };

    let pillVisible = null;
    let footVisible = null;
    const setCompletion = (elapsed) => {
      const pv = elapsed >= 7300 && elapsed < HOLD_END;
      const fv = elapsed >= 7700 && elapsed < HOLD_END;
      if (pv !== pillVisible) {
        pillVisible = pv;
        if (pillRef.current) pillRef.current.style.opacity = pv ? '1' : '0';
        if (!pv && pillRef.current) pillRef.current.style.borderColor = 'rgba(139,77,255,0.32)';
      }
      if (fv !== footVisible) {
        footVisible = fv;
        if (footRef.current) footRef.current.style.opacity = fv ? '1' : '0';
      }
    };

    let lastSuffix = null;
    const updateBadge = (score, instant) => {
      const r = Math.round(score);
      const state = badgeStateFor(r);
      const text = r + ' · ' + state.suffix;
      const txt = badgeTextRef.current;
      const badge = badgeRef.current;
      if (!txt) return;
      if (instant || state.suffix === lastSuffix) {
        txt.textContent = text;
        if (state.suffix !== lastSuffix && badge) badge.style.background = state.bg;
        lastSuffix = state.suffix;
      } else {
        // threshold crossed — cross-fade the label
        txt.style.transition = 'opacity 150ms ease';
        txt.style.opacity = '0';
        later(() => {
          txt.textContent = text;
          if (badge) badge.style.background = state.bg;
          txt.style.opacity = '1';
        }, 160);
        lastSuffix = state.suffix;
      }
    };

    // --------- per-cycle reset of one-shot state ---------
    const firedThisCycle = new Set();
    const resetCycleState = () => {
      firedThisCycle.clear();
      if (footTextRef.current) footTextRef.current.textContent = '';
      if (footDotRef.current) {
        footDotRef.current.style.animation = 'none';
        footDotRef.current.style.opacity = '0';
      }
      if (footRef.current) footRef.current.style.animation = 'none';
      if (pillRef.current) {
        pillRef.current.style.animation = 'none';
        pillRef.current.style.borderColor = 'rgba(139,77,255,0.32)';
      }
    };

    // cold mid-cycle entry: settle to the correct frame without replaying flourishes
    const primeColdStart = (elapsed) => {
      ONE_SHOTS.forEach(({ t, key }) => {
        if (elapsed >= t) firedThisCycle.add(key);
      });
      if (elapsed >= 7700 && elapsed < HOLD_END) {
        if (footTextRef.current) footTextRef.current.textContent = FOOT_TEXT;
        if (footDotRef.current) {
          footDotRef.current.style.opacity = '1';
          footDotRef.current.style.animation = 'esscDotPulse 2s ease-in-out infinite';
        }
      }
      if (pillRef.current && elapsed >= 7300 && elapsed < HOLD_END) {
        pillRef.current.style.borderColor = 'rgba(139,77,255,0.7)';
      }
    };

    // --------- the loop ---------
    let loopStart = 0;
    let offset = 0;
    let lastCycle = -1;
    let lastScoreTs = 0;
    let cold = true;

    const tick = (now) => {
      if (cancelled.current) return;
      const raw = now - loopStart + offset;
      const cycle = Math.floor(raw / LOOP);
      const elapsed = raw - cycle * LOOP;

      if (cycle !== lastCycle) {
        lastCycle = cycle;
        if (!cold) resetCycleState();
      }

      const pos = setDot(elapsed);
      setFill(elapsed, pos);
      setNodes(elapsed, pos);
      setCompletion(elapsed);

      if (cold || now - lastScoreTs >= 500) {
        lastScoreTs = now;
        updateBadge(scoreFor(elapsed), cold);
      }

      if (cold) {
        primeColdStart(elapsed);
        cold = false;
      } else {
        ONE_SHOTS.forEach(({ t, key, fn }) => {
          if (elapsed >= t && !firedThisCycle.has(key)) {
            firedThisCycle.add(key);
            fn();
          }
        });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    // start on mount at a random offset (0–7500ms: never inside hold/reset)
    offset = Math.random() * 7500;
    rafId.current = requestAnimationFrame((now) => {
      loopStart = now;
      tick(now);
    });

    return () => {
      cancelled.current = true;
      cancelAnimationFrame(rafId.current);
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, []);

  const setNode = (i) => (el) => { nodeRefs.current[i] = el; };

  return (
    <div className="els-setup" data-reveal data-reveal-delay="150" ref={rootRef}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes esscDotPop {
  0%   { transform: scale(1);   }
  45%  { transform: scale(1.4); }
  100% { transform: scale(1);   }
}
@keyframes esscRipple {
  0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
  100% { box-shadow: 0 0 0 14px rgba(34,197,94,0); }
}
@keyframes esscNodeBreathe {
  0%   { box-shadow: 0 0 0 4px rgba(34,197,94,0.3);  }
  50%  { box-shadow: 0 0 0 8px rgba(34,197,94,0.12); }
  100% { box-shadow: 0 0 0 4px rgba(34,197,94,0.3);  }
}
@keyframes esscAuthPulse {
  0%   { transform: scale(1);    box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
  45%  { transform: scale(1.25); box-shadow: 0 0 0 5px rgba(34,197,94,0);  }
  100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(34,197,94,0);    }
}
@keyframes esscSpringIn {
  0%   { transform: scale(0);   }
  60%  { transform: scale(1.2); }
  100% { transform: scale(1);   }
}
@keyframes esscPillIn {
  0%   { transform: scale(0.9);  }
  60%  { transform: scale(1.05); }
  100% { transform: scale(1);    }
}
@keyframes esscFootIn {
  0%   { transform: translateY(6px); }
  100% { transform: translateY(0);   }
}
@keyframes esscBadgeGlow {
  0%   { box-shadow: 0 0 12px rgba(124,58,237,0.4); }
  100% { box-shadow: 0 0 0 rgba(124,58,237,0);      }
}
@keyframes esscDotPulse {
  0%, 100% { opacity: 1;    }
  50%      { opacity: 0.35; }
}`,
        }}
      />

      <div className="els-setup-top">
        <span className="els-setup-eyebrow">Domain Setup: outreach-nl.io</span>
        <span className="els-setup-badge">Snaarpmail</span>
      </div>

      <div className="els-setup-rows">
        <div className="els-setup-row">
          <span className="els-setup-check" ref={spfCheckRef} style={{ display: 'inline-flex' }}>
            <Icon name="check" aria-hidden="true" />
          </span>
          <div className="els-setup-rec">
            <div className="els-setup-name">SPF</div>
            <div className="els-setup-detail" ref={spfDetailRef} style={{ opacity: 0.62 }}>
              v=spf1 include:_spf &middot; ~all, Auto-configured
            </div>
          </div>
        </div>
        <div className="els-setup-row">
          <span className="els-setup-check" ref={dkimCheckRef} style={{ display: 'inline-flex' }}>
            <Icon name="check" aria-hidden="true" />
          </span>
          <div className="els-setup-rec">
            <div className="els-setup-name">DKIM</div>
            <div className="els-setup-detail" ref={dkimDetailRef} style={{ opacity: 0.62 }}>
              2048-bit key: Active
            </div>
          </div>
        </div>
        <div className="els-setup-row">
          <span className="els-setup-check" ref={dmarcCheckRef} style={{ display: 'inline-flex' }}>
            <Icon name="check" aria-hidden="true" />
          </span>
          <div className="els-setup-rec">
            <div className="els-setup-name">DMARC</div>
            <div className="els-setup-detail" ref={dmarcDetailRef} style={{ opacity: 0.62 }}>
              p=quarantine: Enforced
            </div>
          </div>
        </div>
      </div>

      <span
        className="els-setup-pill"
        ref={pillRef}
        style={{ opacity: 1, transition: 'opacity 350ms ease, border-color 300ms ease' }}
      >
        <span ref={pillCheckRef} style={{ display: 'inline-flex' }}>
          <Icon name="check" aria-hidden="true" />
        </span>{' '}
        Authentication complete
      </span>

      <div className="els-setup-divider" aria-hidden="true" />

      <div className="els-setup-warmhead">
        <span className="els-setup-warmlabel">Warmup Progress: Warmrit</span>
        <span className="els-setup-warmbadge" ref={badgeRef}>
          <span ref={badgeTextRef} style={{ display: 'inline-block', transition: 'opacity 150ms ease' }}>
            96 &middot; Inbox-Ready
          </span>
        </span>
      </div>

      {/* warmup timeline — bespoke rail driven by the rAF loop */}
      <div
        aria-hidden="true"
        style={{ position: 'relative', height: '14px', margin: '4px 0 14px' }}
      >
        {/* base rail */}
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '4px',
            transform: 'translateY(-50%)',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.1)',
          }}
        />
        {/* filled track */}
        <span
          ref={fillRef}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            height: '4px',
            width: '100%',
            transform: 'translateY(-50%)',
            borderRadius: '2px',
            background: `linear-gradient(to right, ${PURPLE} 80%, ${GREEN} 100%)`,
            willChange: 'width',
          }}
        />
        {/* nodes */}
        {NODE_POS.map((np, i) => (
          <span
            key={np}
            ref={setNode(i)}
            style={{
              position: 'absolute',
              top: '50%',
              left: np + '%',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              zIndex: 1,
              transform: `translate(${-np}%, -50%)${i === 3 ? ' scale(1.15)' : ''}`,
              background: i === 3 ? GREEN : PURPLE,
              boxShadow: i === 3 ? '0 0 0 4px rgba(34,197,94,0.3)' : 'none',
              transition: 'background 300ms ease, box-shadow 300ms ease',
            }}
          >
            {i === 3 && (
              <span
                ref={rippleRef}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
              />
            )}
          </span>
        ))}
        {/* active travelling dot */}
        <span
          ref={dotRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '100%',
            width: '12px',
            height: '12px',
            zIndex: 2,
            transform: 'translate(-100%, -50%)',
            willChange: 'transform',
          }}
        >
          <span
            ref={dotInnerRef}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: GREEN,
              boxShadow: '0 0 0 3px rgba(34,197,94,0.35)',
              transition: 'background 400ms ease, box-shadow 400ms ease',
            }}
          />
        </span>
      </div>

      <div className="els-warm-legend">
        <span>d 1&ndash;10</span>
        <span>d 11&ndash;25</span>
        <span>d 26&ndash;45</span>
        <span>d 46&ndash;90</span>
      </div>

      <div
        className="els-setup-foot"
        ref={footRef}
        style={{ opacity: 1, transition: 'opacity 350ms ease' }}
      >
        <span ref={footCheckRef} style={{ display: 'inline-flex' }}>
          <Icon name="check" aria-hidden="true" />
        </span>
        <span ref={footTextRef}>{FOOT_TEXT}</span>
        <span
          ref={footDotRef}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: GREEN,
            marginLeft: '2px',
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}
