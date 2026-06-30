'use client';

// "Scattered inboxes -> Snaarpmail unified inbox" comparison for
// /missed-hot-replies. Self-contained entrance choreography, fired ONCE on
// scroll-into-view (IntersectionObserver, threshold 0.15, unobserve after firing).
//
// All animation is isolated to this component:
//   - entrance states are inline styles (opacity / transform only, zero layout shift)
//   - the headline stat numbers (avg time to notice, lost to clutter) are rAF +
//     easeOutCubic counters
//   - the left card's "still unread" dot and the right card's "high intent" pulse
//     are component-scoped styled-jsx keyframes
// No global CSS is touched; every .mhr-* class is styled in globals.css so the card
// keeps its look and the global data-reveal engine never sees this section.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Left card: five campaigns, each its own silo. Campaign C is where the hot
// reply is buried.
const CAMPAIGNS = [
  { id: 'A', n: 12 },
  { id: 'B', n: 4 },
  { id: 'C', n: 31, active: true },
  { id: 'D', n: 2 },
  { id: 'E', n: 18 },
];

// Right card: the two follow-on replies that land under the hot one, already
// surfaced in the same unified view.
const MINIS = [
  { dot: 'green', name: 'Priya N.', quote: '“Happy to jump on a call”', time: '12m' },
  { dot: 'amber', name: 'David O.', quote: '“Locked in until Q1, but…”', time: '1h' },
];

export default function MissedHotRepliesCompare() {
  const sectionRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [leftDim, setLeftDim] = useState(false);
  const [idle, setIdle] = useState(false);

  const [hrs, setHrs] = useState(0); // -> 31
  const [lostL, setLostL] = useState(0); // -> 2
  const [mins, setMins] = useState(0); // -> 3

  // ---- trigger: once, on scroll-into-view ----
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      setReduced(true);
      setInView(true);
      setLeftDim(true);
      setHrs(31);
      setLostL(2);
      setMins(3);
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

  // ---- choreography: counters + left dim + idle pulses ----
  useEffect(() => {
    if (!inView || reduced) return;

    const timers = timersRef.current;
    const rafs = rafsRef.current;

    const count = (to, duration, apply) => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        apply(Math.round(to * easeOutCubic(t)));
        if (t < 1) rafs.push(requestAnimationFrame(tick));
      };
      rafs.push(requestAnimationFrame(tick));
    };

    // Left card: the cost of scattered inboxes tallies up.
    timers.push(setTimeout(() => count(31, 750, (v) => setHrs(v)), 700));
    timers.push(setTimeout(() => count(2, 600, (v) => setLostL(v)), 900));

    // Right card: the recovered number lands fast.
    timers.push(setTimeout(() => count(3, 600, (v) => setMins(v)), 1100));

    timers.push(setTimeout(() => setLeftDim(true), 1700));
    timers.push(setTimeout(() => setIdle(true), 2100));

    return () => {
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
      timersRef.current = [];
      rafsRef.current = [];
    };
  }, [inView, reduced]);

  // ---- inline entrance-style helpers (opacity + transform only) ----
  const trans = (duration, delay) =>
    reduced ? 'none' : `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`;

  const move = (delay, duration, from) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : from,
    transition: trans(duration, delay),
  });
  const fade = (delay, duration) => ({
    opacity: inView ? 1 : 0,
    transition: reduced ? 'none' : `opacity ${duration}ms ${EASE} ${delay}ms`,
  });

  const willPanel = { willChange: 'transform, opacity' };

  return (
    <section className="mhr-compare" ref={sectionRef}>
      <div className="container">
        <p className="mhr-compare-label" style={move(0, 400, 'translateY(8px)')}>
          <span className="mhr-compare-rule" aria-hidden="true" />
          Same reply. 31 hours faster to see it. 2.6&times; the close rate.
          <Icon name="arrow-right" aria-hidden="true" />
        </p>

        <div className="mhr-compare-grid">

          {/* ---------- SCATTERED (left) ---------- */}
          <div
            style={{
              opacity: leftDim ? 0.72 : 1,
              transition: reduced ? 'none' : 'opacity 400ms ease-in-out',
              willChange: 'opacity',
            }}
          >
            <article className="mhr-card" style={{ ...move(150, 500, 'translateX(-20px)'), ...willPanel }}>
              <div className="mhr-card-head" style={fade(150, 350)}>
                <span className="mhr-card-title">
                  <span className="mhr-led red" aria-hidden="true" />
                  Scattered Inboxes
                </span>
                <span className="mhr-time-chip red">TUE · 9:14 AM</span>
              </div>

              <p className="mhr-card-sub" style={fade(220, 350)}>5 active campaigns · 5 separate inboxes</p>

              <div className="mhr-chips" style={fade(300, 350)}>
                {CAMPAIGNS.map((c, i) => (
                  <span
                    key={c.id}
                    className={`mhr-chip${c.active ? ' is-active' : ''}`}
                    style={move(340 + i * 70, 320, 'translateY(8px)')}
                  >
                    Campaign {c.id} <b>{c.n}</b>
                  </span>
                ))}
              </div>

              <div className="mhr-reply buried" style={move(760, 420, 'translateY(10px)')}>
                <div className="mhr-reply-top">
                  <span className="mhr-tag buried">buried in Campaign C</span>
                  <span className="mhr-unread">Still unread</span>
                </div>
                <p className="mhr-reply-name">Marcus T. · Acme Corp</p>
                <p className="mhr-reply-quote">“This is great timing, when can we talk?”</p>
                <p className="mhr-reply-meta">Received 2 days ago</p>
              </div>

              <div className="mhr-stats" style={fade(960, 350)}>
                <div className="mhr-stat">
                  <span className="mhr-stat-num">6</span>
                  <span className="mhr-stat-label">hot replies this week</span>
                </div>
                <div className="mhr-stat is-flag">
                  <span className="mhr-stat-num flag">{hrs} hrs</span>
                  <span className="mhr-stat-label">avg time to notice</span>
                </div>
                <div className="mhr-stat">
                  <span className="mhr-stat-num">{lostL}</span>
                  <span className="mhr-stat-label">lost to clutter</span>
                </div>
              </div>
            </article>
          </div>

          {/* ---------- SNAARPMAIL (right) ---------- */}
          <div>
            <article className="mhr-card is-snaarp" style={{ ...move(500, 500, 'translateX(20px)'), ...willPanel }}>
              <div className="mhr-card-head" style={fade(600, 350)}>
                <span className="mhr-card-title">
                  <span className="mhr-led purple" aria-hidden="true" />
                  Snaarpmail Unified Inbox
                </span>
                <span className="mhr-time-chip purple">TUE · 9:14 AM</span>
              </div>

              <p className="mhr-card-sub" style={fade(670, 350)}>All 5 campaigns, one inbox</p>

              <div className="mhr-reply is-hot" style={move(760, 420, 'translateY(10px)')}>
                <div className="mhr-reply-top">
                  <span className={`mhr-tag intent${idle && !reduced ? ' mhr-pulse-intent' : ''}`}>
                    <span className="mhr-intent-dot" aria-hidden="true" />
                    High Intent
                  </span>
                  <span className="mhr-reply-age">4 minutes ago</span>
                </div>
                <p className="mhr-reply-name">Marcus T. · Acme Corp</p>
                <p className="mhr-reply-quote">“This is great timing, when can we talk?”</p>
                <span className="mhr-suggest">
                  <Icon name="sparkles" aria-hidden="true" />
                  Suggested: Book via Kalender
                  <Icon name="arrow-right" aria-hidden="true" />
                </span>
              </div>

              <div className="mhr-minis">
                {MINIS.map((m, i) => (
                  <div key={m.name} className="mhr-mini" style={move(1080 + i * 130, 340, 'translateY(8px)')}>
                    <span className={`mhr-mini-dot ${m.dot}`} aria-hidden="true" />
                    <span className="mhr-mini-name">{m.name} ·</span>
                    <span className="mhr-mini-quote">{m.quote}</span>
                    <span className="mhr-mini-time">{m.time}</span>
                  </div>
                ))}
              </div>

              <div className="mhr-stats" style={fade(1380, 350)}>
                <div className="mhr-stat">
                  <span className="mhr-stat-num">6</span>
                  <span className="mhr-stat-label">hot replies this week</span>
                </div>
                <div className="mhr-stat is-good">
                  <span className="mhr-stat-num good">{mins} mins</span>
                  <span className="mhr-stat-label">avg time to notice</span>
                </div>
                <div className="mhr-stat">
                  <span className="mhr-stat-num">0</span>
                  <span className="mhr-stat-label">lost to clutter</span>
                </div>
              </div>
            </article>
          </div>

        </div>

        <div className="mhr-domain" style={move(1500, 380, 'translateY(8px)')}>
          <Icon name="check" aria-hidden="true" />
          Domain protected · future campaigns unaffected
        </div>
      </div>

      {/* component-scoped keyframes: right "high intent" idle pulse */}
      <style jsx>{`
        .mhr-pulse-intent .mhr-intent-dot {
          animation: mhrIntentPulse 2.4s ease-in-out infinite;
        }
        @keyframes mhrIntentPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.82); }
        }
      `}</style>
    </section>
  );
}
