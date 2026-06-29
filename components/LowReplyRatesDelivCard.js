'use client';

// "Root Cause 2 + 4 — Deliverability & Follow-Up" demo card for /low-reply-rates.
// A cinematic two-act entrance, triggered ONCE on scroll-into-view
// (IntersectionObserver, threshold 0.15, unobserve after firing).
//
//   Act 1 — pre-flight check: auth badges stamp in like clearing checkboxes,
//   the inbox-placement bar charges up left→right (clip-path power meter with a
//   leading-edge glow), the placement legend fades in, and the Verifyrit line
//   counts to 480/480 — the "all clear".
//   THE BEAT — a 300ms structural pause (a real setTimeout, not a CSS delay).
//   Act 2 — launch: the divider draws in, the four sequence steps fire one by
//   one (each reply count tallying after its row lands), then the footer totals
//   slam in and count up together.
//
// All animation is isolated here. Entrance states are inline opacity/transform;
// every counter is a rAF + easeOutCubic loop; the bar charge, badge stamp/flash,
// number pop and idle shimmer/breath live in component-scoped styled-jsx. No
// global CSS is touched — the original .lrr-deliv-* / .lrr-seq2-* classes are
// kept for styling. Zero layout shift: the card reserves a min-height and every
// pre-entrance element keeps its box (opacity/transform only). All timers and
// rAFs are tracked and cancelled on unmount.

import { useEffect, useRef, useState } from 'react';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// sequence steps — `main` is the always-visible label, `extra` the trailing
// condition that staggers in 100ms after the row (steps 2 & 3 only).
const STEPS = [
  { main: 'Email · Day 1 · 480 sent', extra: null, to: 22 },
  { main: 'LinkedIn · Day 3 · ', extra: 'no-reply trigger', to: 18 },
  { main: 'Email · Day 6 · ', extra: 'opened, no reply', to: 14 },
  { main: 'Final email · Day 10', extra: null, to: 7 },
];

export default function LowReplyRatesDelivCard() {
  const rootRef = useRef(null);
  const timersRef = useRef([]); // setTimeout ids
  const rafsRef = useRef([]); // requestAnimationFrame ids

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  // entrance flags
  const [headIn, setHeadIn] = useState(false);
  const [badges, setBadges] = useState([false, false, false, false, false]);
  const [barCharge, setBarCharge] = useState(false);
  const [legend, setLegend] = useState([false, false, false]);
  const [vPrefix, setVPrefix] = useState(false);
  const [vSuffix, setVSuffix] = useState(false);
  const [dividerIn, setDividerIn] = useState(false);
  const [seqHeadIn, setSeqHeadIn] = useState(false);
  const [rowIn, setRowIn] = useState([false, false, false, false]);
  const [extraIn, setExtraIn] = useState([false, false, false, false]);
  const [pop4, setPop4] = useState(false);
  const [footIn, setFootIn] = useState(false);
  const [idle, setIdle] = useState(false);

  // counters (raw values; formatted at render)
  const [vNum, setVNum] = useState(0); // -> 480
  const [replyN, setReplyN] = useState([0, 0, 0, 0]); // -> 22/18/14/7
  const [totReplies, setTotReplies] = useState(0); // -> 61
  const [replyRate, setReplyRate] = useState(0); // -> 12.7
  const [meetings, setMeetings] = useState(0); // -> 19

  // ---- trigger: once, on scroll-into-view ----
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      // Render the fully-settled final state, no animation.
      setReduced(true);
      setInView(true);
      setHeadIn(true);
      setBadges([true, true, true, true, true]);
      setBarCharge(true);
      setLegend([true, true, true]);
      setVPrefix(true);
      setVSuffix(true);
      setVNum(480);
      setDividerIn(true);
      setSeqHeadIn(true);
      setRowIn([true, true, true, true]);
      setExtraIn([true, true, true, true]);
      setReplyN([22, 18, 14, 7]);
      setFootIn(true);
      setTotReplies(61);
      setReplyRate(12.7);
      setMeetings(19);
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

  // ---- the choreography ----
  useEffect(() => {
    if (!inView || reduced) return;

    const tm = (d, fn) => {
      const id = setTimeout(fn, d);
      timersRef.current.push(id);
    };
    // rAF easeOutCubic counter -> drives a scalar setter from 0 to `to`.
    const count = (setter, to, dur, decimals) => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const v = to * easeOutCubic(t);
        setter(decimals ? v : Math.round(v));
        if (t < 1) rafsRef.current.push(requestAnimationFrame(tick));
      };
      rafsRef.current.push(requestAnimationFrame(tick));
    };
    // counter into one slot of the replyN array.
    const countReply = (i, to, dur) => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const v = Math.round(to * easeOutCubic(t));
        setReplyN((prev) => prev.map((p, idx) => (idx === i ? v : p)));
        if (t < 1) rafsRef.current.push(requestAnimationFrame(tick));
      };
      rafsRef.current.push(requestAnimationFrame(tick));
    };
    const raise = (setter, i) => setter((prev) => prev.map((p, idx) => (idx === i ? true : p)));

    // Phase 1 — header (the panel rises via inline transition the moment inView flips)
    tm(200, () => setHeadIn(true));

    // Phase 2 — pre-flight badges stamp in, 110ms apart
    [400, 510, 620, 730, 840].forEach((d, i) => tm(d, () => raise(setBadges, i)));

    // Phase 3 — gradient bar charges up (clip-path power meter), legend follows
    tm(1100, () => setBarCharge(true));
    tm(1900, () => raise(setLegend, 0)); // bar completes ~1900
    tm(2000, () => raise(setLegend, 1));
    tm(2100, () => raise(setLegend, 2));

    // Phase 4 — Verifyrit preflight clearance counts to 480/480
    tm(2100, () => setVPrefix(true));
    tm(2150, () => count(setVNum, 480, 600, false));
    tm(2850, () => setVSuffix(true));

    // Phase 5 — THE BEAT: 300ms pause, then Act 2 opens (divider draw + seq head)
    tm(2900, () => {
      const id = setTimeout(() => {
        setDividerIn(true);
        setSeqHeadIn(true);
      }, 300);
      timersRef.current.push(id);
    });

    // Phase 6 — sequence steps fire one by one; each count starts after its row
    tm(3600, () => raise(setRowIn, 0));
    tm(3800, () => countReply(0, 22, 400));

    tm(4050, () => raise(setRowIn, 1));
    tm(4150, () => raise(setExtraIn, 1));
    tm(4250, () => countReply(1, 18, 350));

    tm(4500, () => raise(setRowIn, 2));
    tm(4600, () => raise(setExtraIn, 2));
    tm(4700, () => countReply(2, 14, 300));

    tm(4950, () => raise(setRowIn, 3));
    tm(5150, () => countReply(3, 7, 250));
    tm(5400, () => setPop4(true)); // final touchpoint lands -> brief scale pop

    // Phase 7 — footer totals slam in, all three count up in parallel
    tm(5400, () => setFootIn(true));
    tm(5500, () => {
      count(setTotReplies, 61, 700, false);
      count(setReplyRate, 12.7, 700, true);
      count(setMeetings, 19, 700, false);
    });

    // Phase 8 — idle (shimmer + winning-metric breath)
    tm(6300, () => setIdle(true));

    return () => {
      timersRef.current.forEach(clearTimeout);
      rafsRef.current.forEach(cancelAnimationFrame);
      timersRef.current = [];
      rafsRef.current = [];
    };
  }, [inView, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  // inline entrance helper — opacity (+ optional transform) only, zero layout shift
  const fade = (on, dur, from) => ({
    opacity: on ? 1 : 0,
    transform: from ? (on ? 'none' : from) : undefined,
    transition: reduced
      ? 'none'
      : from
        ? `opacity ${dur}ms ease-out, transform ${dur}ms ease-out`
        : `opacity ${dur}ms ease-out`,
    willChange: 'transform, opacity',
  });

  const badgeStyle = (i) =>
    reduced
      ? undefined
      : {
          willChange: 'transform, opacity',
          ...(badges[i] ? {} : { opacity: 0, transform: 'scale(0.6)' }),
        };

  return (
    <div
      ref={rootRef}
      className="lrr-deliv-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: reduced ? 'none' : 'opacity 450ms ease-out, transform 450ms ease-out',
        minHeight: 540,
        willChange: 'transform, opacity',
      }}
    >
      <div className="lrr-deliv-top">
        <span className="lrr-deliv-title" style={fade(headIn, 300)}>Deliverability Status</span>
        <span className="lrr-deliv-domain" style={fade(headIn, 300)}>outreach-nl.io</span>
      </div>

      <div className="lrr-deliv-pills">
        <span className={`lrr-deliv-pill green${badges[0] && !reduced ? ' stamp' : ''}`} style={badgeStyle(0)}>SPF ✓</span>
        <span className={`lrr-deliv-pill green${badges[1] && !reduced ? ' stamp' : ''}`} style={badgeStyle(1)}>DKIM ✓</span>
        <span className={`lrr-deliv-pill green${badges[2] && !reduced ? ' stamp' : ''}`} style={badgeStyle(2)}>DMARC ✓</span>
        <span className={`lrr-deliv-pill purple${badges[3] && !reduced ? ' stamp' : ''}`} style={badgeStyle(3)}>Warmrit: Warmed ✓</span>
        <span className={`lrr-deliv-pill gray${badges[4] && !reduced ? ' stamp' : ''}`} style={badgeStyle(4)}>Bounce 0.4%</span>
      </div>

      <div className="lrr-deliv-bar" aria-hidden="true" style={{ position: 'relative' }}>
        <span
          className={`lrr-deliv-bar-fill${barCharge && !reduced ? ' charge' : ''}`}
          style={{
            background: 'linear-gradient(to right, #7C3AED, #3B82F6, #10B981, #84CC16)',
            clipPath: reduced ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            willChange: 'clip-path',
          }}
        />
        {/* leading-edge "charging" glow that rides the fill front */}
        <span className={`lrr-bar-edge${barCharge && !reduced ? ' run' : ''}`} aria-hidden="true" />
        {/* idle shimmer sweep */}
        <span className={`lrr-bar-shimmer${idle ? ' run' : ''}`} aria-hidden="true" />
      </div>

      <div className="lrr-deliv-legend">
        <span className={`lrr-deliv-legend-primary${idle ? ' breathe' : ''}`} style={fade(legend[0], 250)}>
          <span style={{ color: '#fff' }}>96%</span> Primary
        </span>
        <span style={fade(legend[1], 250)}>3% Promotions</span>
        <span style={fade(legend[2], 250)}>1% Spam</span>
      </div>

      <p className="lrr-deliv-note" style={{ borderBottom: 'none' }}>
        <span style={fade(vPrefix, 200)}>Verifyrit: </span>
        <span style={{ opacity: vPrefix ? 1 : 0 }}>{vNum}/480</span>
        <span style={fade(vSuffix, 200)}> contacts verified before send</span>
      </p>

      <div
        className="lrr-deliv-divider"
        aria-hidden="true"
        style={{
          height: '1px',
          background: 'var(--bg-card-border)',
          transformOrigin: 'left',
          transform: dividerIn ? 'scaleX(1)' : 'scaleX(0)',
          transition: reduced ? 'none' : 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      />

      <div className="lrr-deliv-seqhead" style={fade(seqHeadIn, 350, 'translateY(6px)')}>
        Sendrit Sequence: Q3 Outreach
      </div>

      <div className="lrr-seq2">
        {STEPS.map((s, i) => (
          <div key={i} className="lrr-seq2-row" style={fade(rowIn[i], 350, 'translateX(-16px)')}>
            <span className="lrr-seq2-num">{i + 1}</span>
            <span className="lrr-seq2-label">
              {s.main}
              {s.extra && <span style={fade(extraIn[i], 250)}>{s.extra}</span>}
            </span>
            <span className="lrr-seq2-replies">
              <span className={i === 3 && pop4 && !reduced ? 'pop' : undefined} style={{ display: 'inline-block' }}>
                {replyN[i]}
              </span>{' '}
              replies
            </span>
          </div>
        ))}
      </div>

      <div className="lrr-deliv-foot" style={fade(footIn, 300, 'translateY(8px)')}>
        <span>Total replies: <b>{totReplies}</b></span>
        <span className="purple">Reply rate {replyRate.toFixed(1)}%</span>
        <span>Meetings: <b>{meetings}</b></span>
      </div>

      <style jsx>{`
        /* Phase 2 — badge stamp (spring overshoot) + a single brightness flash */
        .stamp {
          animation: badgeStamp 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both, badgeFlash 80ms ease-out;
        }
        @keyframes badgeStamp {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes badgeFlash {
          0% { filter: brightness(1); }
          40% { filter: brightness(1.3); }
          100% { filter: brightness(1); }
        }

        /* Phase 3 — gradient bar powers up via clip-path, glow rides the front */
        .charge {
          animation: barCharge 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes barCharge {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0% 0 0); }
        }
        .lrr-bar-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          background: rgba(255, 255, 255, 0.6);
          transform: translateX(0);
          opacity: 0;
          pointer-events: none;
        }
        .lrr-bar-edge.run {
          animation: barEdge 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes barEdge {
          0% { left: 0; transform: translateX(0); opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; transform: translateX(-100%); opacity: 0; }
        }

        /* Phase 8 — idle shimmer sweep (barely perceptible) */
        .lrr-bar-shimmer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 45%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent);
          transform: translateX(-120%);
          opacity: 0;
          pointer-events: none;
        }
        .lrr-bar-shimmer.run {
          opacity: 1;
          animation: barShimmer 5s linear infinite;
        }
        @keyframes barShimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(330%); }
        }

        /* Phase 8 — winning metric breathes */
        .breathe {
          animation: legendBreathe 4s ease-in-out infinite;
        }
        @keyframes legendBreathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        /* Phase 6 — final touchpoint number lands conclusively */
        .pop {
          animation: numPop 200ms ease-out;
        }
        @keyframes numPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
