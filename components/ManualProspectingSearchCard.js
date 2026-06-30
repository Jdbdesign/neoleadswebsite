'use client';

// "Root Cause 1 + 3 — Research Time & Missing Signals" demo card for
// /manual-prospecting. A scroll-triggered, once-only sequence that plays like a
// live Zeus search: the query settles in, NeoBrain AI "searches live signals",
// three verified, signal-ranked contacts populate (each ICP score counting up),
// then the action row appears. Triggered once on scroll-in (IntersectionObserver,
// threshold 0.15, unobserve after firing).
//
// Self-contained: entrance states are inline opacity/transform; the three ICP
// scores are rAF + easeOutCubic counters; the searching-dot and idle pulses are
// component-scoped styled-jsx. No global CSS is touched — every .mp-sr-* class is
// styled in globals.css. Reduced motion renders the final resting state.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

const RESULTS = [
  { initials: 'MT', name: 'Marcus T.', role: 'VP Sales', company: 'Acme Corp', signal: 'Raised $18M Series B · 9 open SDR roles', score: 94 },
  { initials: 'PN', name: 'Priya N.', role: 'Head of Sales', company: 'Vertex AI', signal: 'New CRO appointed · Sales team doubling', score: 88 },
  { initials: 'DO', name: 'David O.', role: 'VP Sales', company: 'Stackline', signal: 'Series B closed 3 weeks ago · Hiring push', score: 83 },
];

export default function ManualProspectingSearchCard() {
  const rootRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [searching, setSearching] = useState(false);
  const [idle, setIdle] = useState(false);
  const [scores, setScores] = useState([0, 0, 0]);

  // ---- trigger once on scroll-in ----
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      setReduced(true);
      setInView(true);
      setScores([94, 88, 83]);
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

  // ---- choreography ----
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

    // NeoBrain AI "searches" briefly, then results resolve.
    timers.push(setTimeout(() => setSearching(true), 480));
    timers.push(setTimeout(() => setSearching(false), 980));

    RESULTS.forEach((r, i) => {
      timers.push(
        setTimeout(
          () => count(r.score, 600, (v) => setScores((s) => { const n = s.slice(); n[i] = v; return n; })),
          1000 + i * 160
        )
      );
    });

    timers.push(setTimeout(() => setIdle(true), 1700));

    return () => {
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
      timersRef.current = [];
      rafsRef.current = [];
    };
  }, [inView, reduced]);

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

  return (
    <div
      ref={rootRef}
      className="mp-sr-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: reduced ? 'none' : 'opacity 500ms ease-out, transform 500ms ease-out',
        willChange: 'transform, opacity',
      }}
    >
      <div className="mp-sr-search" style={move(150, 420, 'translateY(8px)')}>
        <Icon name="search" aria-hidden="true" />
        <span className="mp-sr-q">
          Head of Sales at US SaaS companies, 50&ndash;500 employees, Series B, actively hiring SDRs
        </span>
      </div>

      <span className="mp-sr-pill" style={fade(440, 320)}>
        <span className={`mp-sr-pill-dot${searching || (idle && !reduced) ? ' mp-sr-searching' : ''}`} aria-hidden="true" />
        <Icon name="sparkles" aria-hidden="true" />
        NeoBrain AI &mdash; searching live signals
      </span>

      <div className="mp-sr-panel" style={fade(620, 360)}>
        <div className="mp-sr-results">
          {RESULTS.map((r, i) => (
            <div key={r.initials} className="mp-sr-row" style={move(1000 + i * 160, 360, 'translateY(10px)')}>
              <span className={`mp-sr-av av-${i}`} aria-hidden="true">{r.initials}</span>
              <span className="mp-sr-body">
                <span className="mp-sr-name">{r.name} - {r.role} - {r.company}</span>
                <span className="mp-sr-sub">{r.signal}</span>
              </span>
              <span className="mp-sr-meta">
                <span className={`mp-sr-score${idle && !reduced ? ' mp-sr-glow' : ''}`}>{scores[i]}</span>
                <span className="mp-sr-verified"><Icon name="check" aria-hidden="true" /> Verified</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mp-sr-actions" style={move(1560, 380, 'translateY(8px)')}>
          <button type="button" className="mp-sr-btn primary">Push to Sendrit <Icon name="arrow-right" aria-hidden="true" /></button>
          <button type="button" className="mp-sr-btn ghost">Add to saved search</button>
          <button type="button" className="mp-sr-btn ghost">Export to CRM</button>
        </div>
      </div>

      <style jsx>{`
        .mp-sr-searching {
          animation: mpSrPulse 1.1s ease-in-out infinite;
        }
        .mp-sr-glow {
          animation: mpSrGlow 3s ease-in-out infinite;
        }
        @keyframes mpSrPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.78); }
        }
        @keyframes mpSrGlow {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
