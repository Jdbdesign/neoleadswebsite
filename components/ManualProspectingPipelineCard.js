'use client';

// "Root Cause 2 + 4: Tool Sprawl & Stale Lists" demo card for
// /manual-prospecting. A scroll-triggered, once-only sequence that shows the
// search → verify → launch handoff happening inside one platform: Zeus hands 47
// contacts to Verifyrit (deliverability chips pop in), a live Sendrit campaign
// spins up, and a Manual-vs-NeoLeads time race fills out. Triggered once on
// scroll-in (IntersectionObserver, threshold 0.15, unobserve after firing).
//
// Self-contained: entrance states are inline opacity/transform; the contact
// tally is a rAF + easeOutCubic counter; the race bars fill via inline width
// transitions; idle pulses live in component-scoped styled-jsx. No global CSS is
// touched; every .mp-pl-* class is styled in globals.css. Reduced motion renders
// the final resting state.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ManualProspectingPipelineCard() {
  const rootRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [raceRun, setRaceRun] = useState(false);
  const [idle, setIdle] = useState(false);
  const [contacts, setContacts] = useState(0); // -> 44

  // ---- trigger once on scroll-in ----
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      setReduced(true);
      setInView(true);
      setRaceRun(true);
      setContacts(44);
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

    timers.push(setTimeout(() => count(44, 650, (v) => setContacts(v)), 900));
    timers.push(setTimeout(() => setRaceRun(true), 1250));
    timers.push(setTimeout(() => setIdle(true), 1800));

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
  const pop = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'scale(0.85)',
    transition: reduced ? 'none' : `opacity 240ms ${EASE} ${delay}ms, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
  });

  // race bar widths (fill once raceRun flips)
  const barFill = (to, delay) => ({
    width: raceRun ? to : '0%',
    transition: reduced ? 'none' : `width 900ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
  });

  return (
    <div
      ref={rootRef}
      className="mp-pl-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: reduced ? 'none' : 'opacity 500ms ease-out, transform 500ms ease-out',
        willChange: 'transform, opacity',
      }}
    >
      {/* ---- Block 1: Zeus -> Verifyrit handoff ---- */}
      <div className="mp-pl-block" style={move(150, 460, 'translateY(10px)')}>
        <div className="mp-pl-block-head">
          <span className="mp-pl-title">Zeus <Icon name="arrow-right" aria-hidden="true" /> Verifyrit</span>
          <span className="mp-pl-muted">47 contacts found</span>
        </div>
        <div className="mp-pl-query">
          <span className="mp-pl-query-text">Series B SaaS, VP Sales</span>
          <span className="mp-pl-send">Send to Verifyrit <Icon name="arrow-right" aria-hidden="true" /></span>
        </div>
        <div className="mp-pl-chips">
          <span className="mp-pl-chip green" style={pop(560)}>44 Deliverable</span>
          <span className="mp-pl-chip amber" style={pop(640)}>2 Risky</span>
          <span className="mp-pl-chip red" style={pop(720)}>1 Invalid</span>
          <span className="mp-pl-chip muted" style={pop(800)}>18 sec · Campaign-ready ✓</span>
        </div>
      </div>

      {/* ---- Block 2: live campaign ---- */}
      <div className="mp-pl-block" style={move(420, 460, 'translateY(10px)')}>
        <div className="mp-pl-block-head">
          <span className="mp-pl-title sm">Series B SDR Expansion, October</span>
          <span className={`mp-pl-live${idle && !reduced ? ' mp-pl-live-on' : ''}`}>
            <span className="mp-pl-live-dot" aria-hidden="true" />
            Live · launched 4 min after search
          </span>
        </div>
        <div className="mp-pl-stats">
          <div className="mp-pl-stat">
            <span className="mp-pl-stat-num">{contacts}</span>
            <span className="mp-pl-stat-lbl">Contacts</span>
          </div>
          <div className="mp-pl-stat is-active">
            <span className="mp-pl-stat-num accent">Active</span>
            <span className="mp-pl-stat-lbl">Sequences</span>
          </div>
          <div className="mp-pl-stat">
            <span className="mp-pl-stat-num sm">Email+LI</span>
            <span className="mp-pl-stat-lbl">Channel</span>
          </div>
        </div>
        <span className="mp-pl-neobrain" style={fade(900, 320)}>
          <Icon name="sparkles" aria-hidden="true" /> NeoBrain: first lines generated per contact
        </span>
      </div>

      {/* ---- Block 3: time race ---- */}
      <div className="mp-pl-race" style={move(680, 460, 'translateY(10px)')}>
        <span className="mp-pl-race-eyebrow">Search <Icon name="arrow-right" aria-hidden="true" /> Live Campaign</span>
        <div className="mp-pl-race-row">
          <span className="mp-pl-race-name">Manual</span>
          <span className="mp-pl-bar"><span className="fill red" style={barFill('100%', 0)} /></span>
          <span className="mp-pl-race-time red">3.5 hrs</span>
        </div>
        <div className="mp-pl-race-row">
          <span className="mp-pl-race-name">NeoLeads</span>
          <span className="mp-pl-bar"><span className="fill purple" style={barFill('9%', 120)} /></span>
          <span className="mp-pl-race-time purple">4 min</span>
        </div>
      </div>

      <style jsx>{`
        .mp-pl-live-on .mp-pl-live-dot {
          animation: mpPlLive 1.8s ease-in-out infinite;
        }
        @keyframes mpPlLive {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
