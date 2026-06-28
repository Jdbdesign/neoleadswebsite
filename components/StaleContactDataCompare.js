'use client';

// Before / After comparison card for /stale-contact-data — "What Continuous
// Verification Actually Looks Like". Self-contained entrance choreography,
// triggered ONCE on scroll-into-view (IntersectionObserver, threshold 0.15,
// unobserve after firing).
//
// Mirrors the interaction used by <LowReplyRatesCompare />:
//   - entrance states are inline styles (opacity / transform only — zero layout shift)
//   - number counters are rAF + easeOutCubic utilities scoped below
//   - idle pulses + the AFTER-badge pop are component-scoped styled-jsx keyframes
// No global CSS is touched; every original .scd-* class is preserved so the card
// keeps its existing look and the global data-reveal engine never sees this section.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

// rAF easeOutCubic counter — drives a state setter from 0 -> `to`. Stores raw
// floats; the caller formats at render (toFixed for the decimal counter) so the
// displayed value never jumps decimals mid-count.
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StaleContactDataCompare() {
  const sectionRef = useRef(null);
  const timersRef = useRef([]); // setTimeout ids
  const rafsRef = useRef([]); // requestAnimationFrame ids

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [leftDim, setLeftDim] = useState(false); // Phase 4
  const [idle, setIdle] = useState(false); // Phase 5

  // AFTER-card counters (raw floats; formatted at render)
  const [verified, setVerified] = useState(0); // -> 847
  const [removed, setRemoved] = useState(0); // -> 89
  const [bounce, setBounce] = useState(0); // -> 0.3
  const [flagged, setFlagged] = useState(0); // -> 64

  // ---- trigger: once, on scroll-into-view ----
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      // Render the final resting state with no animation.
      setReduced(true);
      setInView(true);
      setLeftDim(true);
      setVerified(847);
      setRemoved(89);
      setBounce(0.3);
      setFlagged(64);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- choreography: counters + Phase 4 dim + Phase 5 idle ----
  useEffect(() => {
    if (!inView || reduced) return;

    const timers = timersRef.current;
    const rafs = rafsRef.current;

    const count = (setter, to, duration, decimals) => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const v = to * easeOutCubic(t);
        setter(decimals ? v : Math.round(v));
        if (t < 1) rafs.push(requestAnimationFrame(tick));
      };
      rafs.push(requestAnimationFrame(tick));
    };

    // Each counter starts the moment its tile's entrance begins.
    timers.push(setTimeout(() => count(setVerified, 847, 700, 0), 780));
    timers.push(setTimeout(() => count(setRemoved, 89, 600, 0), 860));
    timers.push(setTimeout(() => count(setBounce, 0.3, 700, 1), 940));
    timers.push(setTimeout(() => count(setFlagged, 64, 600, 0), 1020));

    timers.push(setTimeout(() => setLeftDim(true), 1600)); // Phase 4
    timers.push(setTimeout(() => setIdle(true), 2000)); // Phase 5

    return () => {
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
      timersRef.current = [];
      rafsRef.current = [];
    };
  }, [inView, reduced]);

  // ---- inline entrance-style helpers (opacity + transform only) ----
  const trans = (duration, delay) =>
    reduced
      ? 'none'
      : `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`;

  // slide/rise: animates opacity + transform from `from` -> resting.
  const move = (delay, duration, from) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : from,
    transition: trans(duration, delay),
  });
  // fade: opacity only (used for header rows + contact text).
  const fade = (delay, duration) => ({
    opacity: inView ? 1 : 0,
    transition: reduced ? 'none' : `opacity ${duration}ms ${EASE} ${delay}ms`,
  });
  // highlight background layer: opacity-only fade-in (then handed to idle pulse).
  const bgFade = (delay, duration) => ({
    opacity: inView ? 1 : 0,
    transition: reduced ? 'none' : `opacity ${duration}ms ${EASE} ${delay}ms`,
    willChange: 'opacity',
  });

  const willPanel = { willChange: 'transform, opacity' };

  return (
    <section className="scd-compare" ref={sectionRef}>
      <div className="container">
        {/* Phase 1 — section label */}
        <p className="scd-compare-label" style={move(0, 400, 'translateY(8px)')}>
          What Continuous Verification Actually Looks Like
        </p>

        <div className="scd-compare-grid">

          {/* ---------- BEFORE (Phase 2) ---------- */}
          {/* outer wrapper = Phase 4 dim layer; inner article = entrance slide */}
          <div
            style={{
              opacity: leftDim ? 0.72 : 1,
              transition: reduced ? 'none' : 'opacity 400ms ease-in-out',
              willChange: 'opacity',
            }}
          >
            <article className="scd-card" style={{ ...move(150, 500, 'translateX(-20px)'), ...willPanel }}>
              <div className="scd-card-head" style={fade(150, 350)}>
                <span className="scd-card-title">
                  <span className="scd-led red" aria-hidden="true"></span>
                  Your List Today
                </span>
                <span className="scd-chip red">Imported 8 mo ago</span>
              </div>

              <div className="scd-stats">
                <div className="scd-stat" style={move(280, 300, 'translateY(10px)')}>
                  <span className="scd-stat-label">Contacts</span>
                  <span className="scd-stat-num">1,000</span>
                </div>
                <div className="scd-stat" style={move(360, 300, 'translateY(10px)')}>
                  <span className="scd-stat-label">Verified</span>
                  <span className="scd-stat-num muted">Unknown</span>
                </div>
                <div
                  className="scd-stat is-flag red"
                  style={{ ...move(440, 300, 'translateY(10px)'), position: 'relative', background: 'transparent', overflow: 'hidden', ...willPanel }}
                >
                  <span
                    aria-hidden="true"
                    style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'var(--scd-red-soft)', ...bgFade(520, 300) }}
                  />
                  <span className="scd-stat-label red" style={{ position: 'relative' }}>Bounce Rate</span>
                  <span className="scd-stat-num red" style={{ position: 'relative' }}>8.4%</span>
                </div>
                <div className="scd-stat" style={move(520, 300, 'translateY(10px)')}>
                  <span className="scd-stat-label">Wasted Sends</span>
                  <span className="scd-stat-num">186</span>
                </div>
              </div>

              <div className="scd-rep red" style={move(680, 300, 'translateY(6px)')}>
                <Icon name="triangle-alert" aria-hidden="true" />
                Sender reputation: At risk
              </div>

              <div className="scd-contacts">
                <div className="scd-contact" style={move(700, 300, 'translateY(8px)')}>
                  <span className="scd-contact-ic red" aria-hidden="true"><Icon name="triangle-alert" /></span>
                  <div className="scd-contact-body" style={fade(780, 250)}>
                    <span className="scd-contact-name">Marcus T.</span>
                    <span className="scd-contact-note">Left Acme Corp 5 months ago</span>
                  </div>
                </div>
                <div className="scd-contact" style={move(800, 300, 'translateY(8px)')}>
                  <span className="scd-contact-ic red" aria-hidden="true"><Icon name="triangle-alert" /></span>
                  <div className="scd-contact-body" style={fade(880, 250)}>
                    <span className="scd-contact-name">priya.n@vertexco.com</span>
                    <span className="scd-contact-note">Domain no longer active</span>
                  </div>
                </div>
                <div className="scd-contact" style={move(900, 300, 'translateY(8px)')}>
                  <span className="scd-contact-ic red" aria-hidden="true"><Icon name="triangle-alert" /></span>
                  <div className="scd-contact-body" style={fade(980, 250)}>
                    <span className="scd-contact-name">david.o@stackline.io</span>
                    <span className="scd-contact-note">Role changed: now CMO, not VP Sales</span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* ---------- AFTER (Phase 3) ---------- */}
          <div>
            <article className="scd-card is-after" style={{ ...move(500, 500, 'translateX(20px)'), ...willPanel }}>
              <div className="scd-card-head" style={fade(600, 350)}>
                <span className="scd-card-title">
                  <span className="scd-led purple" aria-hidden="true"></span>
                  With NeoLeads
                </span>
                <span className={`scd-chip purple${inView && !reduced ? ' scd-badge-pop' : ''}`}>Continuously Verified</span>
              </div>

              <div className="scd-stats">
                <div className="scd-stat" style={move(700, 300, 'translateY(10px)')}>
                  <span className="scd-stat-label">Verified</span>
                  <span className="scd-stat-num purple">{Math.round(verified)}</span>
                </div>
                <div className="scd-stat" style={move(780, 300, 'translateY(10px)')}>
                  <span className="scd-stat-label">Removed</span>
                  <span className="scd-stat-num">{Math.round(removed)}</span>
                </div>
                <div
                  className="scd-stat is-flag purple"
                  style={{ ...move(860, 300, 'translateY(10px)'), position: 'relative', background: 'transparent', overflow: 'hidden', ...willPanel }}
                >
                  <span
                    aria-hidden="true"
                    className={idle && !reduced ? 'scd-flag-pulse' : ''}
                    style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(108, 43, 223, 0.12)', ...bgFade(940, 300) }}
                  />
                  <span className="scd-stat-label purple" style={{ position: 'relative' }}>Bounce Rate</span>
                  <span className="scd-stat-num purple" style={{ position: 'relative' }}>{bounce.toFixed(1)}%</span>
                </div>
                <div className="scd-stat" style={move(940, 300, 'translateY(10px)')}>
                  <span className="scd-stat-label">Flagged</span>
                  <span className="scd-stat-num">{Math.round(flagged)}</span>
                </div>
              </div>

              <div
                className="scd-rep green"
                style={{ ...move(1100, 350, 'scale(0.95)'), transformOrigin: 'left center' }}
              >
                <span
                  className={idle && !reduced ? 'scd-dot-pulse' : ''}
                  style={{ display: 'inline-flex' }}
                >
                  <Icon name="check" aria-hidden="true" />
                </span>
                Sender reputation: Healthy
              </div>

              <div className="scd-contacts">
                <div className="scd-contact" style={move(1120, 300, 'translateY(8px)')}>
                  <span className="scd-contact-ic green" aria-hidden="true"><Icon name="check" /></span>
                  <div className="scd-contact-body" style={fade(1200, 250)}>
                    <span className="scd-contact-name">Marcus T.</span>
                    <span className="scd-contact-note">New role: VP Sales at Growthline &middot; Signal: Series A raised</span>
                  </div>
                </div>
                <div className="scd-contact" style={move(1220, 300, 'translateY(8px)')}>
                  <span className="scd-contact-ic green" aria-hidden="true"><Icon name="check" /></span>
                  <div className="scd-contact-body" style={fade(1300, 250)}>
                    <span className="scd-contact-name">priya.n@vertexai.com</span>
                    <span className="scd-contact-note">New domain verified &middot; Deliverable</span>
                  </div>
                </div>
                <div className="scd-contact" style={move(1320, 300, 'translateY(8px)')}>
                  <span className="scd-contact-ic green" aria-hidden="true"><Icon name="check" /></span>
                  <div className="scd-contact-body" style={fade(1400, 250)}>
                    <span className="scd-contact-name">david.o@stackline.io</span>
                    <span className="scd-contact-note">Role updated: CMO &middot; Score adjusted</span>
                  </div>
                </div>
              </div>
            </article>
          </div>

        </div>
      </div>

      {/* component-scoped keyframes — AFTER-badge pop + idle pulses */}
      <style jsx>{`
        .scd-badge-pop {
          animation: scdBadgePop 420ms ease-out 600ms both;
        }
        .scd-flag-pulse {
          animation: scdFlagPulse 3s ease-in-out infinite;
        }
        .scd-dot-pulse {
          animation: scdDotPulse 2.5s ease-in-out infinite;
        }
        @keyframes scdBadgePop {
          0% { transform: scale(0.85); }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes scdFlagPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes scdDotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
