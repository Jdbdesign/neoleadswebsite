'use client';

// "A Live Engagement Score on Every Deal" solution section for
// /no-pipeline-visibility. Addresses root causes 3 + 4 (static stages + no single
// source of truth): the live engagement board and auto-capture log sit on the
// LEFT (mirror of the previous solution section), copy on the RIGHT.
//
// The board timers are genuinely live: each "time since last signal" counts up
// once a second while the section is in view, shifting green -> amber -> red as a
// deal goes quiet. Under prefers-reduced-motion the clocks hold at their starting
// values with the colors shown. Entrance fade/lift is the global data-reveal
// engine; only the per-second tick lives here.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Seconds since last captured signal at first paint. Server + first client
// render both use offset 0, so the markup matches and there is no hydration
// mismatch.
const DEALS = [
  { name: 'Acme Corp', value: '$48K', score: 88, note: null, start: 12 },
  { name: 'Vertex AI', value: '$32K', score: 84, note: null, start: 3 * 60 + 40 },
  { name: 'Stackline', value: '$21K', score: 54, note: 'cooling', start: 41 * 60 + 8 },
];

const CAPTURED = [
  { name: 'Acme Corp', detail: 'Reply captured from Snaarpmail', ic: 'mail' },
  { name: 'Vertex AI', detail: 'Meeting booked via Kalender', ic: 'calendar-check' },
];

// green while a signal is fresh, amber as it ages, red once it crosses the hour.
function toneFor(sec) {
  if (sec >= 3600) return 'red';
  if (sec >= 15 * 60) return 'amber';
  return 'green';
}

function clock(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function NoPipelineVisibilitySignals() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0); // seconds added to every "last signal" timer

  useEffect(() => {
    const el = sectionRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !el || !('IntersectionObserver' in window)) return;

    let timer = null;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !timer) {
          timer = setInterval(() => setOffset((o) => o + 1), 1000);
        } else if (!visible && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <section className="npv-q" ref={sectionRef}>
      <div className="container">
        <div className="npv-q-layout">

          {/* ---------- visual: live engagement board + auto-capture log ---------- */}
          <div className="npv-q-visual">

            <article className="npv-q-card" data-reveal>
              <div className="npv-q-card-head">
                <span className="npv-q-card-title">Live Engagement &mdash; Open Deals</span>
                <span className="npv-q-live">
                  <span className="npv-q-live-dot" aria-hidden="true" />
                  live
                </span>
              </div>

              <div className="npv-q-rows">
                {DEALS.map((d) => {
                  const sec = d.start + offset;
                  const tone = toneFor(sec);
                  return (
                    <div className="npv-q-row" key={d.name}>
                      <div className="npv-q-who">
                        <div className="npv-q-who-top">
                          <span className="npv-q-name">{d.name} &middot;</span>
                          <span className="npv-q-intent">
                            <span className="npv-q-intent-dot" aria-hidden="true" />
                            {d.score} score
                          </span>
                        </div>
                        <div className="npv-q-org">
                          {d.value}
                          {d.note && <span className="npv-q-note"> &middot; {d.note}</span>}
                        </div>
                      </div>
                      <span className={`npv-q-timer ${tone}`} aria-label={`${clock(sec)} since last signal`}>
                        {clock(sec)}
                      </span>
                      <button className="npv-q-book" type="button">
                        Open deal <Icon name="arrow-right" aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="npv-q-foot">
                Time since last signal updates <b>live</b>, no rep refresh required
              </p>
            </article>

            <article className="npv-q-log" data-reveal>
              <div className="npv-q-log-head">
                <span className="npv-q-log-dot" aria-hidden="true" />
                Auto-Capture Log
              </div>

              <div className="npv-q-log-rows">
                {CAPTURED.map((c) => (
                  <div className="npv-q-log-row" key={c.name}>
                    <span className="npv-q-log-ic" aria-hidden="true"><Icon name={c.ic} /></span>
                    <span className="npv-q-log-name">{c.name} &middot; {c.detail}</span>
                    <span className="npv-q-log-status">Logged automatically</span>
                  </div>
                ))}
              </div>

              <span className="npv-q-log-pill">
                <Icon name="check" aria-hidden="true" />
                0 activities logged by hand this week
              </span>
            </article>

          </div>

          {/* ---------- copy ---------- */}
          <div className="npv-q-copy" data-reveal-stagger="100">
            <span className="npv-q-eyebrow" data-reveal>
              Root Cause 3 + 4 &middot; Stale Stages &amp; No Source of Truth
            </span>
            <h2 data-reveal>
              A Live Engagement Score on Every Deal.<br />
              One Number the Whole Team<br />
              Actually Trusts.
            </h2>
            <p className="npv-q-lead" data-reveal>
              A stage label can&rsquo;t tell you whether a buyer is heating up or going dark. NeoBrain AI
              scores every deal in real time from the signals NeoLeads captures, opens, replies, intent,
              and bookings, so each opportunity carries a live temperature instead of a stale stage. And
              because every tool feeds the same view, that score rolls up into one forecast the rep, the
              manager, and the board are all reading off.
            </p>

            <div className="npv-q-features">
              <div className="npv-q-feature" data-reveal>
                <span className="npv-q-feature-ic" aria-hidden="true"><Icon name="gauge" /></span>
                <div className="npv-q-feature-text">
                  <h3>Real-Time Engagement Scoring</h3>
                  <p>
                    Every open deal shows a live engagement score and a &ldquo;time since last
                    signal&rdquo; indicator that shifts from green to amber to red as it cools, turning a
                    static pipeline stage into a moving picture of which deals are actually progressing.
                  </p>
                </div>
              </div>

              <div className="npv-q-feature" data-reveal>
                <span className="npv-q-feature-ic" aria-hidden="true"><Icon name="check-check" /></span>
                <div className="npv-q-feature-text">
                  <h3>One Forecast, Always Current</h3>
                  <p>
                    Because every signal writes to the same record, the pipeline rolls up into a single
                    live forecast, the same number for the rep, the manager, and the board. No
                    reconciliation meeting, no defending four dashboards, just one source of truth that
                    updates itself.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
