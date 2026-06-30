'use client';

// "47 minutes of manual work -> 10 seconds with Zeus" comparison for
// /manual-prospecting. Self-contained entrance choreography, fired ONCE on
// scroll-into-view (IntersectionObserver, threshold 0.15, unobserve after firing).
//
// All animation is isolated to this component:
//   - entrance states are inline styles (opacity / transform only, zero layout shift)
//   - the "47 verified" tally + the three ICP scores are rAF + easeOutCubic counters
//   - the left card's "working…" shimmer and the right card's idle pulses are
//     component-scoped styled-jsx keyframes
// No global CSS is touched; every .mp-* class is styled in globals.css so the card
// keeps its look and the global data-reveal engine never sees this section.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Left card: the manual stack, in the order a rep actually grinds through it.
const TOOLS = [
  { name: 'LinkedIn', status: 'Filtering by title…' },
  { name: 'Apollo', status: 'Cross-referencing…' },
  { name: 'Hunter.io', status: 'Verifying emails…' },
  { name: 'Google', status: 'Company research…' },
  { name: 'CRM', status: 'Checking existing contacts…' },
];

// Right card: what Zeus returns instead.
const LEADS = [
  { initials: 'MT', name: 'Marcus T.', role: 'VP Sales', signal: 'Raised $18M · 9 SDR roles open', score: 94 },
  { initials: 'PN', name: 'Priya N.', role: 'VP Sales', signal: 'New CRO hired · Scaling team', score: 88 },
  { initials: 'DO', name: 'David O.', role: 'VP Sales', signal: 'Series B closed · Hiring push', score: 81 },
];

export default function ManualProspectingCompare() {
  const sectionRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [leftDim, setLeftDim] = useState(false);
  const [idle, setIdle] = useState(false);

  const [verified, setVerified] = useState(0); // -> 47
  const [scores, setScores] = useState([0, 0, 0]); // -> 94, 88, 81

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
      setVerified(47);
      setScores([94, 88, 81]);
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

    // "47 verified" tallies up as the search resolves.
    timers.push(setTimeout(() => count(47, 700, (v) => setVerified(v)), 760));

    // Each ICP score counts up the moment its lead row begins entering.
    LEADS.forEach((lead, i) => {
      timers.push(
        setTimeout(
          () => count(lead.score, 600, (v) => setScores((s) => { const n = s.slice(); n[i] = v; return n; })),
          1040 + i * 140
        )
      );
    });

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
    <section className="mp-compare" ref={sectionRef}>
      <div className="container">
        <p className="mp-compare-label" style={move(0, 400, 'translateY(8px)')}>
          <span className="mp-compare-rule" aria-hidden="true" />
          47 Minutes of Manual Work
          <Icon name="arrow-right" aria-hidden="true" />
          10 Seconds With Zeus
          <span className="mp-compare-rule" aria-hidden="true" />
        </p>

        <div className="mp-compare-grid">

          {/* ---------- MANUAL (left) ---------- */}
          <div
            style={{
              opacity: leftDim ? 0.72 : 1,
              transition: reduced ? 'none' : 'opacity 400ms ease-in-out',
              willChange: 'opacity',
            }}
          >
            <article className="mp-card" style={{ ...move(150, 500, 'translateX(-20px)'), ...willPanel }}>
              <div className="mp-card-head" style={fade(150, 350)}>
                <span className="mp-card-title">
                  <span className="mp-led red" aria-hidden="true" />
                  Manual Prospecting
                </span>
                <span className="mp-time-chip red">TUE · 8:27 AM</span>
              </div>

              <div className="mp-tools">
                {TOOLS.map((tool, i) => (
                  <div key={tool.name} className="mp-tool" style={move(300 + i * 90, 320, 'translateY(10px)')}>
                    <span className="mp-tool-ic" aria-hidden="true"><Icon name="monitor" /></span>
                    <span className="mp-tool-name">{tool.name}</span>
                    <span className={`mp-tool-status${idle && !reduced ? ' mp-working' : ''}`}>{tool.status}</span>
                  </div>
                ))}
              </div>

              <div className="mp-later" style={move(900, 360, 'translateY(8px)')}>
                <Icon name="clock" aria-hidden="true" />
                9:14 AM, 47 minutes later
              </div>

              <div className="mp-found" style={move(1020, 360, 'translateY(8px)')}>
                <span className="mp-found-num">6</span>
                <span className="mp-found-body">
                  <span className="mp-found-text">prospects found</span>
                  <span className="mp-found-sub">3 unverified · 0 signals</span>
                </span>
              </div>
            </article>
          </div>

          {/* ---------- ZEUS (right) ---------- */}
          <div>
            <article className="mp-card is-zeus" style={{ ...move(500, 500, 'translateX(20px)'), ...willPanel }}>
              <div className="mp-card-head" style={fade(600, 350)}>
                <span className="mp-card-title">
                  <span className="mp-led purple" aria-hidden="true" />
                  With Zeus
                </span>
                <span className="mp-time-chip purple">TUE · 8:27 AM</span>
              </div>

              <div className="mp-search" style={move(700, 360, 'translateY(10px)')}>
                <Icon name="search" aria-hidden="true" />
                <span className="mp-search-q">VP of Sales at Series B SaaS companies in the US hiring SDRs</span>
              </div>

              <div className="mp-zeus-meta" style={fade(820, 320)}>
                <span className={`mp-zpill green${idle && !reduced ? ' mp-pulse-pill' : ''}`}>
                  <Icon name="clock" aria-hidden="true" />
                  8:27 AM, 10 seconds later
                </span>
                <span className="mp-verified">{verified} verified</span>
              </div>

              <div className="mp-leads">
                {LEADS.map((lead, i) => (
                  <div key={lead.initials} className="mp-lead" style={move(1040 + i * 140, 340, 'translateY(10px)')}>
                    <span className={`mp-av av-${i}`} aria-hidden="true">{lead.initials}</span>
                    <span className="mp-lead-body">
                      <span className="mp-lead-name">{lead.name} - {lead.role}</span>
                      <span className="mp-lead-sub">{lead.signal}</span>
                    </span>
                    <span className={`mp-lead-score${idle && !reduced ? ' mp-score-glow' : ''}`}>{scores[i]}</span>
                  </div>
                ))}
              </div>

              <div className="mp-allverified" style={move(1500, 380, 'scale(0.96)')}>
                <span className={idle && !reduced ? 'mp-dot-pulse' : ''} style={{ display: 'inline-flex' }}>
                  <Icon name="check" aria-hidden="true" />
                </span>
                All verified · Campaign-ready · 0 tabs opened
              </div>
            </article>
          </div>

        </div>
      </div>

      {/* component-scoped keyframes: left "working" shimmer + right idle pulses */}
      <style jsx>{`
        .mp-working {
          animation: mpWorking 1.8s ease-in-out infinite;
        }
        .mp-pulse-pill {
          animation: mpPulsePill 3s ease-in-out infinite;
        }
        .mp-score-glow {
          animation: mpScoreGlow 3s ease-in-out infinite;
        }
        .mp-dot-pulse {
          animation: mpDotPulse 2.5s ease-in-out infinite;
        }
        @keyframes mpWorking {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes mpPulsePill {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        @keyframes mpScoreGlow {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 1; }
        }
        @keyframes mpDotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
