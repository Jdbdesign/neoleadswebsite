'use client';

// "Raw imported list -> NeoBrain AI scored list" comparison for
// /unqualified-lead-lists. Self-contained entrance choreography, fired ONCE on
// scroll-into-view (IntersectionObserver, threshold 0.15, unobserve after firing).
//
// All animation is isolated to this component:
//   - entrance states are inline styles (opacity / transform only, zero layout shift)
//   - the headline stat numbers (% qualified, % wrong-fit, fit score) are rAF +
//     easeOutCubic counters
//   - the right card's "ready" pulse is a component-scoped styled-jsx keyframe
// No global CSS is touched; every .ull-* class is styled in globals.css so the card
// keeps its look and the global data-reveal engine never sees this section.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Left card: a list built from filter matches, not buyers. The one thing that
// actually predicts a sale — fit + intent — is the one column it never has.
const FILTERS = [
  { id: 'Title', n: '✓' },
  { id: 'Industry', n: '✓' },
  { id: 'Headcount', n: '✓' },
  { id: 'Fit + Intent', n: '✗', active: true },
];

// Right card: the next contacts the scored list surfaces, already ranked by how
// ready they are to buy.
const MINIS = [
  { dot: 'green', name: 'Vertex AI', quote: 'Strong fit · hiring + pricing-page visits', time: '91' },
  { dot: 'amber', name: 'Stackline', quote: 'Good fit · early research signals', time: '68' },
];

export default function UnqualifiedLeadListsCompare() {
  const sectionRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [leftDim, setLeftDim] = useState(false);
  const [idle, setIdle] = useState(false);

  const [qual, setQual] = useState(0); // -> 27 (left: % actually qualified)
  const [waste, setWaste] = useState(0); // -> 73 (left: % never going to buy)
  const [fit, setFit] = useState(0); // -> 94 (right: top contact fit score)

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
      setQual(27);
      setWaste(73);
      setFit(94);
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

    // Left card: the cost of an unscored list tallies up.
    timers.push(setTimeout(() => count(27, 750, (v) => setQual(v)), 700));
    timers.push(setTimeout(() => count(73, 600, (v) => setWaste(v)), 900));

    // Right card: the top contact's fit score lands fast.
    timers.push(setTimeout(() => count(94, 700, (v) => setFit(v)), 1100));

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
    <section className="ull-compare" ref={sectionRef}>
      <div className="container">
        <p className="ull-compare-label" style={move(0, 400, 'translateY(8px)')}>
          <span className="ull-compare-rule" aria-hidden="true" />
          Same 1,000 contacts. The 27% worth working, ranked to the top.
          <Icon name="arrow-right" aria-hidden="true" />
        </p>

        <div className="ull-compare-grid">

          {/* ---------- RAW LIST (left) ---------- */}
          <div
            style={{
              opacity: leftDim ? 0.72 : 1,
              transition: reduced ? 'none' : 'opacity 400ms ease-in-out',
              willChange: 'opacity',
            }}
          >
            <article className="ull-card" style={{ ...move(150, 500, 'translateX(-20px)'), ...willPanel }}>
              <div className="ull-card-head" style={fade(150, 350)}>
                <span className="ull-card-title">
                  <span className="ull-led red" aria-hidden="true" />
                  Raw Imported List
                </span>
                <span className="ull-time-chip red">UNSCORED</span>
              </div>

              <p className="ull-card-sub" style={fade(220, 350)}>1,000 contacts · matched a filter, not a buyer</p>

              <div className="ull-chips" style={fade(300, 350)}>
                {FILTERS.map((t, i) => (
                  <span
                    key={t.id}
                    className={`ull-chip${t.active ? ' is-active' : ''}`}
                    style={move(340 + i * 70, 320, 'translateY(8px)')}
                  >
                    {t.id} <b>{t.n}</b>
                  </span>
                ))}
              </div>

              <div className="ull-reply buried" style={move(760, 420, 'translateY(10px)')}>
                <div className="ull-reply-top">
                  <span className="ull-tag buried">wrong fit</span>
                  <span className="ull-unread">Looks fine on the spreadsheet</span>
                </div>
                <p className="ull-reply-name">Initech · 5,000 employees</p>
                <p className="ull-reply-quote">Right title, right industry &mdash; but they already built it in-house</p>
                <p className="ull-reply-meta">A rep finds out on the call</p>
              </div>

              <div className="ull-stats" style={fade(960, 350)}>
                <div className="ull-stat">
                  <span className="ull-stat-num">1,000</span>
                  <span className="ull-stat-label">contacts loaded</span>
                </div>
                <div className="ull-stat is-flag">
                  <span className="ull-stat-num flag">{qual}%</span>
                  <span className="ull-stat-label">actually qualified</span>
                </div>
                <div className="ull-stat">
                  <span className="ull-stat-num">{waste}%</span>
                  <span className="ull-stat-label">never going to buy</span>
                </div>
              </div>
            </article>
          </div>

          {/* ---------- NEOBRAIN AI SCORED LIST (right) ---------- */}
          <div>
            <article className="ull-card is-live" style={{ ...move(500, 500, 'translateX(20px)'), ...willPanel }}>
              <div className="ull-card-head" style={fade(600, 350)}>
                <span className="ull-card-title">
                  <span className="ull-led purple" aria-hidden="true" />
                  NeoBrain AI Scored List
                </span>
                <span className="ull-time-chip purple">RANKED · LIVE</span>
              </div>

              <p className="ull-card-sub" style={fade(670, 350)}>Every contact scored by fit + intent</p>

              <div className="ull-reply is-hot" style={move(760, 420, 'translateY(10px)')}>
                <div className="ull-reply-top">
                  <span className={`ull-tag intent${idle && !reduced ? ' ull-pulse-intent' : ''}`}>
                    <span className="ull-intent-dot" aria-hidden="true" />
                    Ready to buy · 94
                  </span>
                  <span className="ull-reply-age">scored just now</span>
                </div>
                <p className="ull-reply-name">Acme Corp · 1,200 employees</p>
                <p className="ull-reply-quote">Strong fit · added headcount · visited pricing 3× this week</p>
                <span className="ull-suggest">
                  <Icon name="sparkles" aria-hidden="true" />
                  Decision-maker verified · scored by NeoBrain AI
                  <Icon name="arrow-right" aria-hidden="true" />
                </span>
              </div>

              <div className="ull-minis">
                {MINIS.map((m, i) => (
                  <div key={m.name} className="ull-mini" style={move(1080 + i * 130, 340, 'translateY(8px)')}>
                    <span className={`ull-mini-dot ${m.dot}`} aria-hidden="true" />
                    <span className="ull-mini-name">{m.name} ·</span>
                    <span className="ull-mini-quote">{m.quote}</span>
                    <span className="ull-mini-time">{m.time}</span>
                  </div>
                ))}
              </div>

              <div className="ull-stats" style={fade(1380, 350)}>
                <div className="ull-stat">
                  <span className="ull-stat-num">270</span>
                  <span className="ull-stat-label">qualified surfaced</span>
                </div>
                <div className="ull-stat is-good">
                  <span className="ull-stat-num good">{fit}</span>
                  <span className="ull-stat-label">top fit score</span>
                </div>
                <div className="ull-stat">
                  <span className="ull-stat-num">0</span>
                  <span className="ull-stat-label">wrong-fit shown</span>
                </div>
              </div>
            </article>
          </div>

        </div>

        <div className="ull-domain" style={move(1500, 380, 'translateY(8px)')}>
          <Icon name="check" aria-hidden="true" />
          Every contact scored by fit and intent · reps only see the list worth working
        </div>
      </div>

      {/* component-scoped keyframes: right "ready" idle pulse */}
      <style jsx>{`
        .ull-pulse-intent .ull-intent-dot {
          animation: ullIntentPulse 2.4s ease-in-out infinite;
        }
        @keyframes ullIntentPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.82); }
        }
      `}</style>
    </section>
  );
}
