'use client';

// "Root Cause 1 + 2: Merge Tags & Missing Signals" demo card for
// /generic-outreach. A scroll-triggered, once-only sequence that plays like
// NeoBrain AI researching a single contact: the contact header settles in, the
// signal stack populates row by row, then the generated first line resolves with
// its meta + action. Triggered once on scroll-in (IntersectionObserver,
// threshold 0.15, unobserve after firing).
//
// Self-contained: entrance states are inline opacity/transform; the "Live" dot
// and idle glow are component-scoped styled-jsx. No global CSS is touched. Every
// .go-rc-* class is styled in globals.css. Reduced motion renders the final state.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

const SIGNALS = [
  { strong: 'Raised $22M Series B', meta: '9 days ago' },
  { strong: 'New CRO: Sarah K.', meta: 'appointed 12 days ago' },
  { strong: '9 open SDR roles', meta: 'posted in last 2 weeks' },
];

export default function GenericOutreachResearchCard() {
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
      className="go-rc-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: reduced ? 'none' : 'opacity 500ms ease-out, transform 500ms ease-out',
        willChange: 'transform, opacity',
      }}
    >
      <div className="go-rc-head" style={fade(150, 360)}>
        <span className="go-rc-eyebrow">NeoBrain AI &middot; Contact Research</span>
        <span className={`go-rc-live${idle && !reduced ? ' go-rc-live-on' : ''}`}>
          <span className="go-rc-live-dot" aria-hidden="true" />
          Live
        </span>
      </div>

      <div className="go-rc-contact" style={move(280, 400, 'translateY(8px)')}>
        <span className="go-rc-av" aria-hidden="true">MT</span>
        <span className="go-rc-id">
          <span className="go-rc-name">Marcus T. &middot; VP Sales</span>
          <span className="go-rc-sub">Acme Corp &middot; Series B &middot; 340 employees</span>
        </span>
      </div>

      <div className="go-rc-stack" style={fade(520, 320)}>
        <span className="go-rc-stack-label">Signal Stack</span>
        <div className="go-rc-signals">
          {SIGNALS.map((s, i) => (
            <div key={s.strong} className="go-rc-signal" style={move(680 + i * 160, 360, 'translateY(10px)')}>
              <span className="go-rc-signal-dot" aria-hidden="true" />
              <span className="go-rc-signal-text">
                <b>{s.strong}</b> &middot; {s.meta}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="go-rc-gen" style={move(1240, 400, 'translateY(10px)')}>
        <span className="go-rc-gen-label">Generated first line</span>
        <p className="go-rc-gen-quote">
          &ldquo;Saw Acme brought on a new CRO and opened 9 SDR roles in the same week, Marcus.
          That window between a leadership hire and a ramped sales team is exactly when
          outbound pipeline either gets set up properly or gets retrofitted under pressure&hellip;&rdquo;
        </p>
        <div className="go-rc-gen-meta">
          <span className="go-rc-gen-chip">
            <Icon name="sparkles" aria-hidden="true" />
            NeoBrain AI &middot; 3 signals &middot; Tone: Direct &middot; 34 words
          </span>
        </div>
        <button type="button" className="go-rc-gen-btn">
          Used in Sendrit Step 1 <Icon name="arrow-right" aria-hidden="true" />
        </button>
      </div>

      <style jsx>{`
        .go-rc-live-on .go-rc-live-dot {
          animation: goRcPulse 1.6s ease-in-out infinite;
        }
        @keyframes goRcPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
