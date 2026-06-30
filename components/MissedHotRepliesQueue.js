'use client';

// "A Live Clock on Every Hot Reply" solution section for /missed-hot-replies.
// Addresses root causes 3 + 4 (no urgency signal + sequences that don't stop):
// the meeting-ready queue and sequence auto-pause log sit on the LEFT (mirror of
// the previous solution section), copy on the RIGHT.
//
// The queue timers are genuinely live: each "time since reply" counts up once a
// second while the section is in view, shifting green -> amber -> red as it ages.
// Under prefers-reduced-motion the clocks hold at their starting values with the
// colors shown. Entrance fade/lift is the global data-reveal engine; only the
// per-second tick lives here.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Seconds since reply at first paint. Server + first client render both use
// offset 0, so the markup matches and there is no hydration mismatch.
const QUEUE = [
  { name: 'Marcus T.', org: 'Acme Corp', note: null, start: 4 * 60 + 12 },
  { name: 'Priya N.', org: 'Vertex AI', note: null, start: 12 * 60 + 30 },
  { name: 'James K.', org: 'Lumen', note: 'approaching 1 hr', start: 38 * 60 + 4 },
];

const PAUSED = [
  { name: 'Marcus T.', step: 'Step 3 (in 2 days)' },
  { name: 'Priya N.', step: 'Step 2 (tomorrow)' },
];

// green while fresh, amber as it ages, red once it crosses the hour.
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

export default function MissedHotRepliesQueue() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0); // seconds added to every queue timer

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
    <section className="mhr-q" ref={sectionRef}>
      <div className="container">
        <div className="mhr-q-layout">

          {/* ---------- visual: meeting-ready queue + auto-pause log ---------- */}
          <div className="mhr-q-visual">

            <article className="mhr-q-card" data-reveal>
              <div className="mhr-q-card-head">
                <span className="mhr-q-card-title">Act Now &mdash; High Intent, Unbooked</span>
                <span className="mhr-q-live">
                  <span className="mhr-q-live-dot" aria-hidden="true" />
                  live
                </span>
              </div>

              <div className="mhr-q-rows">
                {QUEUE.map((q) => {
                  const sec = q.start + offset;
                  const tone = toneFor(sec);
                  return (
                    <div className="mhr-q-row" key={q.name}>
                      <div className="mhr-q-who">
                        <div className="mhr-q-who-top">
                          <span className="mhr-q-name">{q.name} &middot;</span>
                          <span className="mhr-q-intent">
                            <span className="mhr-q-intent-dot" aria-hidden="true" />
                            Interested
                          </span>
                        </div>
                        <div className="mhr-q-org">
                          {q.org}
                          {q.note && <span className="mhr-q-note"> &middot; {q.note}</span>}
                        </div>
                      </div>
                      <span className={`mhr-q-timer ${tone}`} aria-label={`${clock(sec)} since reply`}>
                        {clock(sec)}
                      </span>
                      <button className="mhr-q-book" type="button">
                        Book via Kalender <Icon name="arrow-right" aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="mhr-q-foot">
                Average time to qualification: <b>9 mins</b> this week
              </p>
            </article>

            <article className="mhr-q-log" data-reveal>
              <div className="mhr-q-log-head">
                <span className="mhr-q-log-dot" aria-hidden="true" />
                Sequence Auto-Pause Log
              </div>

              <div className="mhr-q-log-rows">
                {PAUSED.map((p) => (
                  <div className="mhr-q-log-row" key={p.name}>
                    <span className="mhr-q-log-ic" aria-hidden="true"><Icon name="pause" /></span>
                    <span className="mhr-q-log-name">{p.name} &middot; {p.step}</span>
                    <span className="mhr-q-log-status">Paused on reply</span>
                  </div>
                ))}
              </div>

              <span className="mhr-q-log-pill">
                <Icon name="check" aria-hidden="true" />
                0 awkward follow-ups sent this week
              </span>
            </article>

          </div>

          {/* ---------- copy ---------- */}
          <div className="mhr-q-copy" data-reveal-stagger="100">
            <span className="mhr-q-eyebrow" data-reveal>
              Root Cause 3 + 4 &middot; No Urgency Signal &amp; Sequences That Don&rsquo;t Stop
            </span>
            <h2 data-reveal>
              A Live Clock on Every Hot Reply.<br />
              A Hard Stop on Every Sequence<br />
              That Already Worked.
            </h2>
            <p className="mhr-q-lead" data-reveal>
              Knowing a reply is hot isn&rsquo;t enough if there&rsquo;s no visible pressure to act on
              it before the qualification window closes. Snaarpmail&rsquo;s meeting-ready queue shows
              exactly how long a high-intent reply has been waiting, color-shifting as the clock runs,
              while Sendrit automatically halts any sequence the moment a reply lands, so no scheduled
              follow-up undermines a conversation that&rsquo;s already started.
            </p>

            <div className="mhr-q-features">
              <div className="mhr-q-feature" data-reveal>
                <span className="mhr-q-feature-ic" aria-hidden="true"><Icon name="clock" /></span>
                <div className="mhr-q-feature-text">
                  <h3>Live Response-Time Tracking</h3>
                  <p>
                    Every high-intent reply in the meeting-ready queue shows a live &ldquo;time since
                    reply&rdquo; indicator that shifts from green to amber to red as it ages, turning an
                    abstract benchmark (21&times; more likely to qualify within 5 minutes) into a
                    visible, actionable signal on every conversation.
                  </p>
                </div>
              </div>

              <div className="mhr-q-feature" data-reveal>
                <span className="mhr-q-feature-ic" aria-hidden="true"><Icon name="pause" /></span>
                <div className="mhr-q-feature-text">
                  <h3>Automatic Sequence Halting</h3>
                  <p>
                    The moment NeoBrain AI detects a reply, Sendrit pauses that contact&rsquo;s sequence
                    instantly, before the next scheduled email, LinkedIn message, or call reminder can
                    go out. The conversation moves to a human at exactly the right moment, with no risk
                    of an automated touch landing on top of it.
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
