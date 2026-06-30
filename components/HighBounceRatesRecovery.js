'use client';

// "Stop the Spiral Before It Starts" section for /high-bounce-rates - the
// payoff to root causes 3 + 4 (the reputation death spiral and silent
// degradation). Mirror of HighBounceRatesVerifyMiss with the layout reversed:
// an animated visual on the left, copy on the right.
//
// On first scroll-in the visual plays once (skipped under prefers-reduced-
// motion, which jumps to the final state): the three death-spiral campaign
// rows count their bounce rates up and reveal in sequence, then the recovery
// card's progress ring sweeps to 11 / 18 days while its day counter ticks up.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const SPIRAL = [
  { title: 'Campaign 1', sub: 'Reputation: Damaged', rate: 8.4 },
  { title: 'Campaign 2 · +2 weeks', sub: 'Spam placement: 31%', rate: 6.1 },
  { title: 'Campaign 3 · +4 weeks', sub: 'Gateway block: 340 emails rejected', rate: 9.2 },
];

const REVEAL_AT = [200, 560, 920]; // when each spiral row appears

const POINTS = [
  {
    icon: 'history',
    title: 'Automatic Reputation Recovery',
    body:
      'Warmrit watches every sending domain’s health metrics throughout active campaigns. If bounce signals trend toward the danger threshold, Recovery Mode activates automatically, adjusting warmup intensity, temporarily reducing send volume, and rebuilding ISP trust before a bad bounce rate turns into a blocked domain.',
  },
  {
    icon: 'activity',
    title: 'Real-Time Monitoring Before Damage Compounds',
    body:
      'Snaarpmail tracks bounce rate, spam complaints, and domain reputation signals continuously, not just at campaign end. An alert fires when bounce rate approaches the safe limit, giving your team the chance to pause and clean before the spiral starts rather than after it’s already three campaigns deep.',
  },
];

const RING_R = 42;
const RING_C = 2 * Math.PI * RING_R;
const RING_TARGET = 11 / 18; // 11 of 18 days
const RING_OFFSET = RING_C * (1 - RING_TARGET);

export default function HighBounceRatesRecovery() {
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [recovered, setRecovered] = useState(false);

  const visualRef = useRef(null);
  const ringRef = useRef(null);
  const dayRef = useRef(null);
  const rateRefs = useRef([]);

  // Kick the sequence off once, the first time the visual scrolls into view.
  useEffect(() => {
    const el = visualRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rafs = [];

    const countUp = (el, to, { decimals = 0, suffix = '', duration = 1100 } = {}) => {
      if (!el) return;
      let start = 0;
      const frame = (now) => {
        if (!start) start = now;
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toFixed(decimals) + suffix;
        if (p < 1) rafs.push(requestAnimationFrame(frame));
      };
      rafs.push(requestAnimationFrame(frame));
    };

    // Reduced motion: show the finished state with no animation.
    if (reduced) {
      setRevealed(SPIRAL.length);
      setRecovered(true);
      SPIRAL.forEach((s, i) => {
        if (rateRefs.current[i]) rateRefs.current[i].textContent = s.rate.toFixed(1) + '%';
      });
      if (dayRef.current) dayRef.current.textContent = '11';
      if (ringRef.current) {
        ringRef.current.style.transition = 'none';
        ringRef.current.style.strokeDashoffset = String(RING_OFFSET);
      }
      return;
    }

    const timers = [];

    // Death-spiral rows reveal + count their bounce rate up in sequence.
    SPIRAL.forEach((s, i) => {
      timers.push(
        setTimeout(() => {
          setRevealed((r) => Math.max(r, i + 1));
          countUp(rateRefs.current[i], s.rate, { decimals: 1, suffix: '%', duration: 900 });
        }, REVEAL_AT[i])
      );
    });

    // Recovery card: sweep the ring and tick the day counter up.
    timers.push(
      setTimeout(() => {
        setRecovered(true);
        const ring = ringRef.current;
        if (ring) {
          ring.style.transition = 'none';
          ring.style.strokeDashoffset = String(RING_C);
          void ring.getBoundingClientRect(); // commit before animating
          ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
          ring.style.strokeDashoffset = String(RING_OFFSET);
        }
        countUp(dayRef.current, 11, { duration: 1200 });
      }, 1300)
    );

    return () => {
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, [started]);

  return (
    <section className="hbr-rec">
      <div className="container">
        <div className="hbr-rec-grid">

          {/* ---------- left: animated visuals ---------- */}
          <div className="hbr-rec-visual" data-reveal ref={visualRef} aria-hidden="true">

            {/* death spiral */}
            <div className="hbr-rec-spiral">
              <div className="hbr-rec-card-head">
                <span className="hbr-rec-led red" />
                Without Warmrit: Reputation Death Spiral
              </div>
              <div className="hbr-rec-spiral-rows">
                {SPIRAL.map((s, i) => (
                  <div
                    key={s.title}
                    className={`hbr-rec-spiral-row${i < revealed ? ' is-in' : ''}`}
                  >
                    <div className="hbr-rec-spiral-main">
                      <div className="hbr-rec-spiral-title">{s.title}</div>
                      <div className="hbr-rec-spiral-sub">{s.sub}</div>
                    </div>
                    <div
                      className="hbr-rec-spiral-rate"
                      ref={(el) => (rateRefs.current[i] = el)}
                    >
                      {s.rate.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="hbr-rec-spiral-foot">
                12 weeks · 3 campaigns · domain effectively unusable
              </div>
            </div>

            {/* recovery mode */}
            <div className={`hbr-rec-active${recovered ? ' is-in' : ''}`}>
              <div className="hbr-rec-card-head">
                <span className="hbr-rec-led purple" />
                With Warmrit: Recovery Mode Active
              </div>

              <div className="hbr-rec-active-top">
                <div className="hbr-rec-ring">
                  <svg className="hbr-rec-ring-svg" viewBox="0 0 100 100">
                    <circle className="hbr-rec-ring-track" cx="50" cy="50" r={RING_R} />
                    <circle
                      className="hbr-rec-ring-fill"
                      cx="50"
                      cy="50"
                      r={RING_R}
                      ref={ringRef}
                      style={{ strokeDasharray: RING_C, strokeDashoffset: RING_C }}
                    />
                  </svg>
                  <div className="hbr-rec-ring-label">
                    <b ref={dayRef}>11</b>
                    <span>of 18 days</span>
                  </div>
                </div>
                <div className="hbr-rec-active-info">
                  <div className="hbr-rec-active-title">Recovery Mode: Active</div>
                  <div className="hbr-rec-active-sub">
                    Triggered by bounce spike on Nov 14 · warmup intensity increased · send volume
                    paused · ISP trust rebuilding
                  </div>
                </div>
              </div>

              <div className="hbr-rec-inbox">
                <span className="hbr-rec-inbox-label">Inbox placement trending back</span>
                <span className="hbr-rec-inbox-prog">
                  <span className="red">61%</span>
                  <Icon name="arrow-right" />
                  <span className="amber">74%</span>
                  <Icon name="arrow-right" />
                  <span className="green">89%</span>
                </span>
              </div>

              <div className="hbr-rec-resume">
                <Icon name="circle-check" />
                Sendrit campaigns authorised to resume Nov 28
              </div>
            </div>
          </div>

          {/* ---------- right: copy ---------- */}
          <div className="hbr-miss-copy hbr-rec-copy" data-reveal-stagger="100">
            <span className="hbr-rec-pill" data-reveal>
              Root Cause 3 + 4: The Death Spiral &amp; Silent Degradation
            </span>
            <h2 data-reveal>
              Stop the Spiral Before It Starts.<br />
              Monitor the Signal Before It Compounds.
            </h2>
            <p className="hbr-miss-lead" data-reveal>
              A bounce rate above 2% doesn&rsquo;t just affect the current campaign. It degrades the
              domain&rsquo;s reputation for every campaign that follows, until someone intervenes.
              Warmrit&rsquo;s Reputation Recovery Mode activates automatically when domain health
              signals drop, rebuilding sender reputation before the damage compounds. Snaarpmail
              monitors bounce rate and reputation signals in real time so the alert fires before open
              rates start reflecting the problem.
            </p>

            <div className="hbr-miss-points" data-reveal>
              {POINTS.map((p) => (
                <div className="hbr-miss-point" key={p.title}>
                  <span className="hbr-miss-point-ic" aria-hidden="true">
                    <Icon name={p.icon} />
                  </span>
                  <div className="hbr-miss-point-body">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
