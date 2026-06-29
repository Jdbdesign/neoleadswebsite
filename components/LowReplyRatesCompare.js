'use client';

// Before / After comparison card for /low-reply-rates — "The 4 Root Causes
// NeoLeads Fixes". Self-contained entrance choreography, triggered ONCE on
// scroll-into-view (IntersectionObserver, threshold 0.15, unobserve after firing).
//
// All animation is isolated to this component:
//   - entrance states are inline styles (opacity / transform only — zero layout shift)
//   - number counters are rAF + easeOutCubic utilities scoped below
//   - idle pulses + the AFTER-badge pop are component-scoped styled-jsx keyframes
// No global CSS is touched; every original .lrr-* class is preserved so the card
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

export default function LowReplyRatesCompare() {
  const sectionRef = useRef(null);
  const timersRef = useRef([]); // setTimeout ids
  const rafsRef = useRef([]); // requestAnimationFrame ids

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [leftDim, setLeftDim] = useState(false); // Phase 4
  const [idle, setIdle] = useState(false); // Phase 5

  // AFTER-card counters (raw floats; formatted at render)
  const [openRate, setOpenRate] = useState(0); // -> 41
  const [replyRate, setReplyRate] = useState(0); // -> 11.4
  const [meetings, setMeetings] = useState(0); // -> 18

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
      setOpenRate(41);
      setReplyRate(11.4);
      setMeetings(18);
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
    timers.push(setTimeout(() => count(setOpenRate, 41, 600, 0), 780));
    timers.push(setTimeout(() => count(setReplyRate, 11.4, 700, 1), 860));
    timers.push(setTimeout(() => count(setMeetings, 18, 500, 0), 940));

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
  // fade: opacity only (used for header rows).
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
    <section className="lrr-compare" ref={sectionRef}>
      <div className="container">
        {/* Phase 1 — section label */}
        <p className="lrr-compare-label" style={move(0, 400, 'translateY(8px)')}>
          The 4 Root Causes NeoLeads Fixes
        </p>

        <div className="lrr-compare-grid">

          {/* ---------- BEFORE (Phase 2) ---------- */}
          {/* outer wrapper = Phase 4 dim layer; inner article = entrance slide */}
          <div
            style={{
              opacity: leftDim ? 0.72 : 1,
              transition: reduced ? 'none' : 'opacity 400ms ease-in-out',
              willChange: 'opacity',
            }}
          >
            <article className="lrr-card" style={{ ...move(150, 500, 'translateX(-20px)'), ...willPanel }}>
              <div className="lrr-card-head" style={fade(150, 350)}>
                <span className="lrr-card-title">
                  <span className="lrr-led red" aria-hidden="true"></span>
                  Current Campaign
                </span>
                <span className="lrr-chip red">Before NeoLeads</span>
              </div>

              <div className="lrr-stats">
                <div className="lrr-stat" style={move(280, 300, 'translateY(10px)')}>
                  <span className="lrr-stat-label">Sent</span>
                  <span className="lrr-stat-num">840</span>
                </div>
                <div className="lrr-stat" style={move(360, 300, 'translateY(10px)')}>
                  <span className="lrr-stat-label">Open Rate</span>
                  <span className="lrr-stat-num">24%</span>
                </div>
                <div
                  className="lrr-stat is-reply red"
                  style={{ ...move(440, 300, 'translateY(10px)'), position: 'relative', background: 'transparent', overflow: 'hidden', ...willPanel }}
                >
                  <span
                    aria-hidden="true"
                    style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'var(--lrr-red-soft)', ...bgFade(520, 300) }}
                  />
                  <span className="lrr-stat-label red" style={{ position: 'relative' }}>Reply Rate</span>
                  <span className="lrr-stat-num red" style={{ position: 'relative' }}>2.1%</span>
                </div>
                <div className="lrr-stat" style={move(520, 300, 'translateY(10px)')}>
                  <span className="lrr-stat-label">Meetings</span>
                  <span className="lrr-stat-num">2</span>
                </div>
              </div>

              <div className="lrr-deliver red" style={move(680, 300, 'translateY(6px)')}>
                <Icon name="triangle-alert" aria-hidden="true" />
                14% landed in spam
              </div>

              <div className="lrr-replies">
                <div className="lrr-reply" style={move(700, 300, 'translateY(8px)')}>
                  <span className="lrr-reply-dot red" aria-hidden="true"></span>
                  <span style={fade(780, 250)}>&ldquo;Not interested&rdquo;</span>
                </div>
                <div className="lrr-reply" style={move(800, 300, 'translateY(8px)')}>
                  <span className="lrr-reply-dot red" aria-hidden="true"></span>
                  <span style={fade(880, 250)}>&ldquo;Unsubscribe&rdquo;</span>
                </div>
                <div className="lrr-reply" style={move(900, 300, 'translateY(8px)')}>
                  <span className="lrr-reply-dot red" aria-hidden="true"></span>
                  <span style={fade(980, 250)}>&ldquo;Wrong person&rdquo;</span>
                </div>
              </div>
            </article>
          </div>

          {/* ---------- AFTER (Phase 3) ---------- */}
          <div>
            <article className="lrr-card is-after" style={{ ...move(500, 500, 'translateX(20px)'), ...willPanel }}>
              <div className="lrr-card-head" style={fade(600, 350)}>
                <span className="lrr-card-title">
                  <span className="lrr-led purple" aria-hidden="true"></span>
                  With NeoLeads
                </span>
                <span className={`lrr-chip purple${inView && !reduced ? ' lrr-badge-pop' : ''}`}>After NeoLeads</span>
              </div>

              <div className="lrr-stats">
                <div className="lrr-stat" style={move(700, 300, 'translateY(10px)')}>
                  <span className="lrr-stat-label">Sent</span>
                  <span className="lrr-stat-num">840</span>
                </div>
                <div className="lrr-stat" style={move(780, 300, 'translateY(10px)')}>
                  <span className="lrr-stat-label">Open Rate</span>
                  <span className="lrr-stat-num">{Math.round(openRate)}%</span>
                </div>
                <div
                  className="lrr-stat is-reply purple"
                  style={{ ...move(860, 300, 'translateY(10px)'), position: 'relative', background: 'transparent', overflow: 'hidden', ...willPanel }}
                >
                  <span
                    aria-hidden="true"
                    className={idle && !reduced ? 'lrr-reply-pulse' : ''}
                    style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(108, 43, 223, 0.12)', ...bgFade(940, 300) }}
                  />
                  <span className="lrr-stat-label purple" style={{ position: 'relative' }}>Reply Rate</span>
                  <span className="lrr-stat-num purple" style={{ position: 'relative' }}>{replyRate.toFixed(1)}%</span>
                </div>
                <div className="lrr-stat" style={move(940, 300, 'translateY(10px)')}>
                  <span className="lrr-stat-label">Meetings</span>
                  <span className="lrr-stat-num">{Math.round(meetings)}</span>
                </div>
              </div>

              <div
                className="lrr-deliver green"
                style={{ ...move(1100, 350, 'scale(0.95)'), transformOrigin: 'left center' }}
              >
                <span
                  className={idle && !reduced ? 'lrr-dot-pulse' : ''}
                  style={{ display: 'inline-flex' }}
                >
                  <Icon name="check" aria-hidden="true" />
                </span>
                97% landed in primary inbox
              </div>

              <div className="lrr-replies">
                <div className="lrr-reply" style={move(1120, 300, 'translateY(8px)')}>
                  <span className="lrr-reply-dot green" aria-hidden="true"></span>
                  <span style={fade(1200, 250)}>&ldquo;This is great timing&hellip;&rdquo;</span>
                </div>
                <div className="lrr-reply" style={move(1220, 300, 'translateY(8px)')}>
                  <span className="lrr-reply-dot green" aria-hidden="true"></span>
                  <span style={fade(1300, 250)}>&ldquo;Happy to jump on a call&rdquo;</span>
                </div>
                <div className="lrr-reply" style={move(1320, 300, 'translateY(8px)')}>
                  <span className="lrr-reply-dot amber" aria-hidden="true"></span>
                  <span style={fade(1400, 250)}>&ldquo;Not now, follow up in Q2&rdquo;</span>
                </div>
              </div>
            </article>
          </div>

        </div>
      </div>

      {/* component-scoped keyframes — AFTER-badge pop + idle pulses */}
      <style jsx>{`
        .lrr-badge-pop {
          animation: lrrBadgePop 420ms ease-out 600ms both;
        }
        .lrr-reply-pulse {
          animation: lrrReplyPulse 3s ease-in-out infinite;
        }
        .lrr-dot-pulse {
          animation: lrrDotPulse 2.5s ease-in-out infinite;
        }
        @keyframes lrrBadgePop {
          0% { transform: scale(0.85); }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes lrrReplyPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes lrrDotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
