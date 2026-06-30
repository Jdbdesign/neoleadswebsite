'use client';

// "Fragmented stack -> NeoLeads unified pipeline" comparison for
// /no-pipeline-visibility. Self-contained entrance choreography, fired ONCE on
// scroll-into-view (IntersectionObserver, threshold 0.15, unobserve after firing).
//
// All animation is isolated to this component:
//   - entrance states are inline styles (opacity / transform only, zero layout shift)
//   - the headline stat numbers (forecast accuracy, days of data lag) are rAF +
//     easeOutCubic counters
//   - the left card's "out of sync" dot and the right card's "warming" pulse
//     are component-scoped styled-jsx keyframes
// No global CSS is touched; every .npv-* class is styled in globals.css so the card
// keeps its look and the global data-reveal engine never sees this section.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Left card: four disconnected tools, each its own number. The CRM is the one
// the forecast trusts, and it's the most out of date.
const TOOLS = [
  { id: 'Lead Source', n: '312' },
  { id: 'Sendrit', n: '1.8k' },
  { id: 'Snaarpmail', n: '47' },
  { id: 'CRM', n: '18', active: true },
];

// Right card: the two other deals that surface in the same live view, already
// scored by engagement.
const MINIS = [
  { dot: 'green', name: 'Vertex AI', quote: '$32K · opened 6×, replied', time: '88' },
  { dot: 'amber', name: 'Stackline', quote: '$21K · 1 reply, cooling', time: '54' },
];

export default function NoPipelineVisibilityCompare() {
  const sectionRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [leftDim, setLeftDim] = useState(false);
  const [idle, setIdle] = useState(false);

  const [acc, setAcc] = useState(0); // -> 73 (left: forecast accuracy)
  const [lag, setLag] = useState(0); // -> 9 (left: days of data lag)
  const [accG, setAccG] = useState(0); // -> 96 (right: forecast accuracy)

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
      setAcc(73);
      setLag(9);
      setAccG(96);
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

    // Left card: the cost of a disconnected stack tallies up.
    timers.push(setTimeout(() => count(73, 750, (v) => setAcc(v)), 700));
    timers.push(setTimeout(() => count(9, 600, (v) => setLag(v)), 900));

    // Right card: the recovered accuracy lands fast.
    timers.push(setTimeout(() => count(96, 700, (v) => setAccG(v)), 1100));

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
    <section className="npv-compare" ref={sectionRef}>
      <div className="container">
        <p className="npv-compare-label" style={move(0, 400, 'translateY(8px)')}>
          <span className="npv-compare-rule" aria-hidden="true" />
          Same deals. 9 days fresher. 96% forecast accuracy, not 73%.
          <Icon name="arrow-right" aria-hidden="true" />
        </p>

        <div className="npv-compare-grid">

          {/* ---------- FRAGMENTED STACK (left) ---------- */}
          <div
            style={{
              opacity: leftDim ? 0.72 : 1,
              transition: reduced ? 'none' : 'opacity 400ms ease-in-out',
              willChange: 'opacity',
            }}
          >
            <article className="npv-card" style={{ ...move(150, 500, 'translateX(-20px)'), ...willPanel }}>
              <div className="npv-card-head" style={fade(150, 350)}>
                <span className="npv-card-title">
                  <span className="npv-led red" aria-hidden="true" />
                  Fragmented Stack
                </span>
                <span className="npv-time-chip red">OUT OF SYNC</span>
              </div>

              <p className="npv-card-sub" style={fade(220, 350)}>4 tools · 4 different numbers</p>

              <div className="npv-chips" style={fade(300, 350)}>
                {TOOLS.map((t, i) => (
                  <span
                    key={t.id}
                    className={`npv-chip${t.active ? ' is-active' : ''}`}
                    style={move(340 + i * 70, 320, 'translateY(8px)')}
                  >
                    {t.id} <b>{t.n}</b>
                  </span>
                ))}
              </div>

              <div className="npv-reply buried" style={move(760, 420, 'translateY(10px)')}>
                <div className="npv-reply-top">
                  <span className="npv-tag buried">stale in CRM</span>
                  <span className="npv-unread">Last logged 9 days ago</span>
                </div>
                <p className="npv-reply-name">Acme Corp · $48K</p>
                <p className="npv-reply-quote">CRM says &ldquo;no activity&rdquo; &mdash; they actually replied twice</p>
                <p className="npv-reply-meta">Rep forgot to log it</p>
              </div>

              <div className="npv-stats" style={fade(960, 350)}>
                <div className="npv-stat">
                  <span className="npv-stat-num">4</span>
                  <span className="npv-stat-label">numbers that disagree</span>
                </div>
                <div className="npv-stat is-flag">
                  <span className="npv-stat-num flag">{acc}%</span>
                  <span className="npv-stat-label">forecast accuracy</span>
                </div>
                <div className="npv-stat">
                  <span className="npv-stat-num">{lag} days</span>
                  <span className="npv-stat-label">data lag</span>
                </div>
              </div>
            </article>
          </div>

          {/* ---------- NEOLEADS LIVE PIPELINE (right) ---------- */}
          <div>
            <article className="npv-card is-live" style={{ ...move(500, 500, 'translateX(20px)'), ...willPanel }}>
              <div className="npv-card-head" style={fade(600, 350)}>
                <span className="npv-card-title">
                  <span className="npv-led purple" aria-hidden="true" />
                  NeoLeads Live Pipeline
                </span>
                <span className="npv-time-chip purple">IN SYNC · LIVE</span>
              </div>

              <p className="npv-card-sub" style={fade(670, 350)}>Every tool, one live view</p>

              <div className="npv-reply is-hot" style={move(760, 420, 'translateY(10px)')}>
                <div className="npv-reply-top">
                  <span className={`npv-tag intent${idle && !reduced ? ' npv-pulse-intent' : ''}`}>
                    <span className="npv-intent-dot" aria-hidden="true" />
                    Warming · 88
                  </span>
                  <span className="npv-reply-age">synced 4s ago</span>
                </div>
                <p className="npv-reply-name">Acme Corp · $48K</p>
                <p className="npv-reply-quote">2 replies · opened 5× · booked a call this week</p>
                <span className="npv-suggest">
                  <Icon name="sparkles" aria-hidden="true" />
                  Auto-logged from Snaarpmail + Kalender
                  <Icon name="arrow-right" aria-hidden="true" />
                </span>
              </div>

              <div className="npv-minis">
                {MINIS.map((m, i) => (
                  <div key={m.name} className="npv-mini" style={move(1080 + i * 130, 340, 'translateY(8px)')}>
                    <span className={`npv-mini-dot ${m.dot}`} aria-hidden="true" />
                    <span className="npv-mini-name">{m.name} ·</span>
                    <span className="npv-mini-quote">{m.quote}</span>
                    <span className="npv-mini-time">{m.time}</span>
                  </div>
                ))}
              </div>

              <div className="npv-stats" style={fade(1380, 350)}>
                <div className="npv-stat">
                  <span className="npv-stat-num">1</span>
                  <span className="npv-stat-label">source of truth</span>
                </div>
                <div className="npv-stat is-good">
                  <span className="npv-stat-num good">{accG}%</span>
                  <span className="npv-stat-label">forecast accuracy</span>
                </div>
                <div className="npv-stat">
                  <span className="npv-stat-num">0</span>
                  <span className="npv-stat-label">manual logging</span>
                </div>
              </div>
            </article>
          </div>

        </div>

        <div className="npv-domain" style={move(1500, 380, 'translateY(8px)')}>
          <Icon name="check" aria-hidden="true" />
          Every signal captured automatically · nothing logged by hand
        </div>
      </div>

      {/* component-scoped keyframes: right "warming" idle pulse */}
      <style jsx>{`
        .npv-pulse-intent .npv-intent-dot {
          animation: npvIntentPulse 2.4s ease-in-out infinite;
        }
        @keyframes npvIntentPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.82); }
        }
      `}</style>
    </section>
  );
}
