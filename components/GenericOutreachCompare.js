'use client';

// "Generic template -> NeoBrain AI personalised" email comparison for
// /generic-outreach. Same self-contained choreography as ManualProspectingCompare:
// fired ONCE on scroll-into-view (IntersectionObserver, threshold 0.15, unobserve
// after firing).
//
// All animation is isolated to this component:
//   - entrance states are inline styles (opacity / transform only, zero layout shift)
//   - the six stat figures (open / reply / meetings, per card) are rAF + easeOutCubic
//     counters; reply rates carry one decimal place
//   - the left card's red "template pattern" flag and the right card's signal pill
//     get component-scoped styled-jsx idle pulses
// No global CSS is touched; every .go-* class is styled in globals.css.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Stat figures, in render order. decimals: how many to fix when counting.
const GENERIC_STATS = [
  { label: 'Open', to: 24, decimals: 0, suffix: '%' },
  { label: 'Reply', to: 1.8, decimals: 1, suffix: '%', tone: 'bad' },
  { label: 'Meetings', to: 2, decimals: 0, suffix: '' },
];
const AI_STATS = [
  { label: 'Open', to: 43, decimals: 0, suffix: '%' },
  { label: 'Reply', to: 11.6, decimals: 1, suffix: '%', tone: 'good' },
  { label: 'Meetings', to: 21, decimals: 0, suffix: '' },
];

export default function GenericOutreachCompare() {
  const sectionRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [idle, setIdle] = useState(false);

  const [genVals, setGenVals] = useState([0, 0, 0]); // -> 24, 1.8, 2
  const [aiVals, setAiVals] = useState([0, 0, 0]); // -> 43, 11.6, 21

  // ---- trigger: once, on scroll-into-view ----
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      setReduced(true);
      setInView(true);
      setGenVals(GENERIC_STATS.map((s) => s.to));
      setAiVals(AI_STATS.map((s) => s.to));
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

  // ---- choreography: stat counters + idle pulses ----
  useEffect(() => {
    if (!inView || reduced) return;

    const timers = timersRef.current;
    const rafs = rafsRef.current;

    const count = (to, decimals, duration, apply) => {
      const start = performance.now();
      const factor = Math.pow(10, decimals);
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        apply(Math.round(to * easeOutCubic(t) * factor) / factor);
        if (t < 1) rafs.push(requestAnimationFrame(tick));
      };
      rafs.push(requestAnimationFrame(tick));
    };

    const setAt = (setter, i) => (v) =>
      setter((arr) => { const n = arr.slice(); n[i] = v; return n; });

    // generic card stats settle first, then the AI card's tick up a beat later.
    GENERIC_STATS.forEach((s, i) =>
      timers.push(setTimeout(() => count(s.to, s.decimals, 700, setAt(setGenVals, i)), 900 + i * 120))
    );
    AI_STATS.forEach((s, i) =>
      timers.push(setTimeout(() => count(s.to, s.decimals, 750, setAt(setAiVals, i)), 1300 + i * 120))
    );

    timers.push(setTimeout(() => setIdle(true), 2000));

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

  const fmt = (v, s) => `${s.decimals ? v.toFixed(s.decimals) : v}${s.suffix}`;

  return (
    <section className="go-compare" ref={sectionRef}>
      <div className="container">
        <p className="go-compare-label" style={move(0, 400, 'translateY(8px)')}>
          <span className="go-compare-rule" aria-hidden="true" />
          Same offer. Same list. Different research. 6&times; more replies.
          <Icon name="arrow-right" aria-hidden="true" />
          <span className="go-compare-rule" aria-hidden="true" />
        </p>

        <div className="go-compare-grid">

          {/* ---------- GENERIC TEMPLATE (left) ---------- */}
          <article className="go-ec" style={{ ...move(150, 500, 'translateX(-20px)'), ...willPanel }}>
            <div className="go-ec-head" style={fade(220, 350)}>
              <span className="go-ec-title">
                <span className="go-led red" aria-hidden="true" />
                Generic Template
              </span>
              <span className="go-ec-chip red">480 sends &middot; same message</span>
            </div>

            <div className="go-ec-mail">
              <p className="go-ec-subject" style={move(320, 360, 'translateY(8px)')}>
                Subject: Quick question for you, Marcus
              </p>
              <p className="go-ec-body generic" style={move(420, 360, 'translateY(8px)')}>
                Hi Marcus, I wanted to reach out because I think Acme Corp could really benefit from
                our AI sales platform. We help companies like yours improve their outreach and
                generate more pipeline. Would you have 15 minutes this week?
              </p>
              <span className={`go-ec-flag${idle && !reduced ? ' go-flag-pulse' : ''}`} style={fade(620, 360)}>
                <Icon name="ban" aria-hidden="true" />
                Gmail: Template pattern detected
              </span>
            </div>

            <p className="go-ec-meta" style={fade(720, 320)}>
              {'{{FirstName}}'} &middot; {'{{Company}}'} &middot; same template &middot; 480 sends
            </p>

            <div className="go-ec-stats" style={move(820, 360, 'translateY(10px)')}>
              {GENERIC_STATS.map((s, i) => (
                <div key={s.label} className={`go-stat${s.tone ? ` is-${s.tone}` : ''}`}>
                  <span className="go-stat-label">{s.label}</span>
                  <span className="go-stat-num">{fmt(genVals[i], s)}</span>
                </div>
              ))}
            </div>
          </article>

          {/* ---------- NEOBRAIN AI (right) ---------- */}
          <article className="go-ec is-ai" style={{ ...move(500, 500, 'translateX(20px)'), ...willPanel }}>
            <div className="go-ec-head" style={fade(560, 350)}>
              <span className="go-ec-title">
                <span className="go-led purple" aria-hidden="true" />
                NeoBrain AI Personalised
              </span>
              <span className="go-ec-chip purple">Unique per contact</span>
            </div>

            <div className="go-ec-mail">
              <p className="go-ec-subject" style={move(660, 360, 'translateY(8px)')}>
                Subject: Quick thought on Acme&rsquo;s SDR expansion
              </p>
              <p className="go-ec-body neo" style={move(760, 360, 'translateY(8px)')}>
                Saw Acme just posted 9 new SDR roles the same week you brought on a new CRO, Marcus.
                That kind of rapid scaling usually hits outbound pipeline walls before the new
                reps are fully ramped. We help teams in exactly that window&hellip;
              </p>
              <span className={`go-ec-signal${idle && !reduced ? ' go-signal-glow' : ''}`} style={fade(960, 360)}>
                <Icon name="sparkles" aria-hidden="true" />
                NeoBrain AI &middot; Series B &middot; 9 SDR roles &middot; New CRO hire
              </span>
            </div>

            <p className="go-ec-meta neo" style={fade(1060, 320)}>
              Same 480 contacts &middot; unique first line per contact
            </p>

            <div className="go-ec-stats" style={move(1160, 360, 'translateY(10px)')}>
              {AI_STATS.map((s, i) => (
                <div key={s.label} className={`go-stat${s.tone ? ` is-${s.tone}` : ''}`}>
                  <span className="go-stat-label">{s.label}</span>
                  <span className="go-stat-num">{fmt(aiVals[i], s)}</span>
                </div>
              ))}
            </div>
          </article>

        </div>
      </div>

      {/* component-scoped keyframes: left red flag + right signal pill idle pulses */}
      <style jsx>{`
        .go-flag-pulse {
          animation: goFlagPulse 2.6s ease-in-out infinite;
        }
        .go-signal-glow {
          animation: goSignalGlow 3s ease-in-out infinite;
        }
        @keyframes goFlagPulse {
          0%, 100% { opacity: 0.78; }
          50% { opacity: 1; }
        }
        @keyframes goSignalGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 77, 255, 0); }
          50% { box-shadow: 0 0 14px 0 rgba(139, 77, 255, 0.35); }
        }
      `}</style>
    </section>
  );
}
