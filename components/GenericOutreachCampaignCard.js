'use client';

// "Root Cause 3 + 4: Channel Consistency & Precision Over Volume" demo card for
// /generic-outreach. A scroll-triggered, once-only sequence that plays like a live
// multichannel campaign: the campaign header settles in, each channel step
// (Email → LinkedIn → Email) populates row by row, then the results bar resolves.
// Triggered once on scroll-in (IntersectionObserver, threshold 0.15, unobserve
// after firing).
//
// Self-contained: entrance states are inline opacity/transform; the "Active" dot
// is component-scoped styled-jsx. No global CSS is touched. Every .go-cmp-* class
// is styled in globals.css. Reduced motion renders the final state immediately.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

const STEPS = [
  {
    icon: 'mail',
    channel: 'Email',
    when: 'Day 1',
    status: '',
    tag: 'Signal-led',
    subject: 'Quick thought on Acme’s SDR expansion',
    preview: '“Saw Acme just posted 9 SDR roles after the Series B, Marcus…”',
    stats: [
      { label: 'Sent', value: '44' },
      { label: 'Opened', value: '19 (43%)' },
      { label: 'Replies', value: '5' },
    ],
  },
  {
    icon: 'linkedin',
    channel: 'LinkedIn',
    when: 'Day 3',
    status: 'no reply',
    tag: 'Short form',
    subject: null,
    preview:
      '“Hi Marcus, sent a note about Acme’s SDR build-out. Happy to be brief if this timing makes sense.”',
    stats: [
      { label: 'Sent', value: '31' },
      { label: 'Connections', value: '8' },
      { label: 'Replies', value: '6' },
    ],
  },
  {
    icon: 'mail',
    channel: 'Email',
    when: 'Day 7',
    status: 'opened, no reply',
    tag: 'Objection-aware',
    subject: 'Re: Acme’s outbound setup',
    preview:
      '“Still thinking about the SDR context. One thing teams in that growth window usually underestimate is…”',
    stats: [
      { label: 'Sent', value: '18' },
      { label: 'Replies', value: '4' },
    ],
    active: true,
  },
];

export default function GenericOutreachCampaignCard() {
  const rootRef = useRef(null);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [idle, setIdle] = useState(false);

  // ---- trigger once on scroll-in ----
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      setReduced(true);
      setInView(true);
      setIdle(true);
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

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setTimeout(() => setIdle(true), 1700);
    return () => clearTimeout(id);
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
      className="go-cmp-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: reduced ? 'none' : 'opacity 500ms ease-out, transform 500ms ease-out',
        willChange: 'transform, opacity',
      }}
    >
      <div className="go-cmp-head" style={fade(150, 360)}>
        <div className="go-cmp-head-top">
          <span className="go-cmp-title">Q4 VP Sales Outreach: Series B SaaS</span>
          <span className={`go-cmp-active${idle && !reduced ? ' go-cmp-active-on' : ''}`}>
            <span className="go-cmp-active-dot" aria-hidden="true" />
            NeoBrain Active
          </span>
        </div>
        <span className="go-cmp-sub">Contacts: 44 &middot; Channels: Email + LinkedIn + Call</span>
      </div>

      <div className="go-cmp-steps">
        {STEPS.map((s, i) => (
          <div
            key={s.channel + s.when}
            className={`go-cmp-step${s.active ? ' go-cmp-step-active' : ''}`}
            style={move(360 + i * 320, 420, 'translateY(12px)')}
          >
            <div className="go-cmp-step-head">
              <span className="go-cmp-step-meta">
                <span className="go-cmp-step-ic" aria-hidden="true"><Icon name={s.icon} /></span>
                <span className="go-cmp-step-label">
                  {s.channel} &middot; {s.when}
                  {s.status ? <span className="go-cmp-step-status"> &middot; {s.status}</span> : null}
                </span>
              </span>
              <span className="go-cmp-tag">+ {s.tag}</span>
            </div>

            {s.subject ? <p className="go-cmp-subject">Subject: {s.subject}</p> : null}
            <p className="go-cmp-preview">{s.preview}</p>

            <div className="go-cmp-stats">
              {s.stats.map((st) => (
                <span key={st.label} className="go-cmp-stat">
                  {st.label} <b>{st.value}</b>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="go-cmp-foot" style={move(1340, 420, 'translateY(10px)')}>
        <span className="go-cmp-foot-item">Total replies: <b>15</b></span>
        <span className="go-cmp-foot-rate">34% reply rate</span>
        <span className="go-cmp-foot-item">Meetings: <b>8</b></span>
      </div>

      <style jsx>{`
        .go-cmp-active-on .go-cmp-active-dot {
          animation: goCmpPulse 1.6s ease-in-out infinite;
        }
        @keyframes goCmpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
