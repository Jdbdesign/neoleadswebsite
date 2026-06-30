'use client';

// "A Ready-to-Buy Score on Every Contact" solution section for
// /unqualified-lead-lists. Addresses root causes 3 + 4 (no intent signal + volume
// over quality): the live intent board and filtered-out log sit on the LEFT
// (mirror of the previous solution section), copy on the RIGHT.
//
// The board timers are genuinely live: each "time since last buying signal"
// counts up once a second while the section is in view, shifting green -> amber ->
// red as a contact goes quiet. Under prefers-reduced-motion the clocks hold at
// their starting values with the colors shown. Entrance fade/lift is the global
// data-reveal engine; only the per-second tick lives here.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Seconds since last buying signal at first paint. Server + first client render
// both use offset 0, so the markup matches and there is no hydration mismatch.
const DEALS = [
  { name: 'Acme Corp', value: 'Ready 94', score: 94, note: null, start: 12 },
  { name: 'Vertex AI', value: 'Ready 91', score: 91, note: null, start: 3 * 60 + 40 },
  { name: 'Stackline', value: 'Warming 68', score: 68, note: 'cooling', start: 41 * 60 + 8 },
];

const FILTERED = [
  { name: 'Initech', detail: 'Wrong fit · built it in-house', ic: 'ban' },
  { name: 'J. Doe', detail: 'Left the company 6 months ago', ic: 'user-x' },
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

export default function UnqualifiedLeadListsSignals() {
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
    <section className="ull-q" ref={sectionRef}>
      <div className="container">
        <div className="ull-q-layout">

          {/* ---------- visual: live intent board + filtered-out log ---------- */}
          <div className="ull-q-visual">

            <article className="ull-q-card" data-reveal>
              <div className="ull-q-card-head">
                <span className="ull-q-card-title">Live Intent &mdash; Qualified Contacts</span>
                <span className="ull-q-live">
                  <span className="ull-q-live-dot" aria-hidden="true" />
                  live
                </span>
              </div>

              <div className="ull-q-rows">
                {DEALS.map((d) => {
                  const sec = d.start + offset;
                  const tone = toneFor(sec);
                  return (
                    <div className="ull-q-row" key={d.name}>
                      <div className="ull-q-who">
                        <div className="ull-q-who-top">
                          <span className="ull-q-name">{d.name} &middot;</span>
                          <span className="ull-q-intent">
                            <span className="ull-q-intent-dot" aria-hidden="true" />
                            {d.value}
                          </span>
                        </div>
                        <div className="ull-q-org">
                          intent {d.score}
                          {d.note && <span className="ull-q-note"> &middot; {d.note}</span>}
                        </div>
                      </div>
                      <span className={`ull-q-timer ${tone}`} aria-label={`${clock(sec)} since last buying signal`}>
                        {clock(sec)}
                      </span>
                      <button className="ull-q-book" type="button">
                        Work lead <Icon name="arrow-right" aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="ull-q-foot">
                Time since last buying signal updates <b>live</b>, ranking adjusts itself
              </p>
            </article>

            <article className="ull-q-log" data-reveal>
              <div className="ull-q-log-head">
                <span className="ull-q-log-dot" aria-hidden="true" />
                Filtered-Out Log
              </div>

              <div className="ull-q-log-rows">
                {FILTERED.map((c) => (
                  <div className="ull-q-log-row" key={c.name}>
                    <span className="ull-q-log-ic" aria-hidden="true"><Icon name={c.ic} /></span>
                    <span className="ull-q-log-name">{c.name} &middot; {c.detail}</span>
                    <span className="ull-q-log-status">Removed before a rep</span>
                  </div>
                ))}
              </div>

              <span className="ull-q-log-pill">
                <Icon name="check" aria-hidden="true" />
                730 wrong-fit contacts kept off the rep&rsquo;s list this week
              </span>
            </article>

          </div>

          {/* ---------- copy ---------- */}
          <div className="ull-q-copy" data-reveal-stagger="100">
            <span className="ull-q-eyebrow" data-reveal>
              Root Cause 3 + 4 &middot; No Intent Signal &amp; Volume Over Quality
            </span>
            <h2 data-reveal>
              A Ready-to-Buy Score on Every Contact.<br />
              A Shorter List Your Reps<br />
              Can Actually Trust.
            </h2>
            <p className="ull-q-lead" data-reveal>
              A spreadsheet can&rsquo;t tell you who&rsquo;s in-market today. NeoBrain AI scores every
              qualified contact on live buying signals, hiring, site visits, research activity, so each one
              carries a ready-to-buy temperature instead of a blank cell. And because the wrong-fit names
              are filtered out before a rep ever sees them, the list gets shorter and sharper, not longer,
              the opposite of buying more contacts.
            </p>

            <div className="ull-q-features">
              <div className="ull-q-feature" data-reveal>
                <span className="ull-q-feature-ic" aria-hidden="true"><Icon name="radar" /></span>
                <div className="ull-q-feature-text">
                  <h3>Real-Time Intent Scoring</h3>
                  <p>
                    Every qualified contact shows a live intent score and a &ldquo;time since last
                    signal&rdquo; indicator that shifts from green to amber to red as it cools, turning a
                    flat row of names into a moving picture of who&rsquo;s actually ready to buy right now.
                  </p>
                </div>
              </div>

              <div className="ull-q-feature" data-reveal>
                <span className="ull-q-feature-ic" aria-hidden="true"><Icon name="check-check" /></span>
                <div className="ull-q-feature-text">
                  <h3>Only Qualified Leads Reach Your Reps</h3>
                  <p>
                    The 73% that were never going to buy, wrong fit, wrong authority, no intent, are filtered
                    out automatically before they hit a rep&rsquo;s queue. Your team works a ranked shortlist
                    of the names worth their time, not a spreadsheet they have to qualify by hand.
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
