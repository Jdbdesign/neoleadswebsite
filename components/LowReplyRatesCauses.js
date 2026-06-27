'use client';

// Interactive "four root causes" section for /low-reply-rates.
// One cause is active at a time. A purple progress line fills under the active
// item over ADVANCE_MS; when it completes, the next cause activates (looping).
// Clicking any item jumps to it immediately and restarts its progress. The
// right-hand panel swaps to the visual that matches the active cause.
// The loop only runs while the section is in view, and is disabled entirely
// under prefers-reduced-motion (clicking still works).

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const ADVANCE_MS = 7000;

const CAUSES = [
  {
    icon: 'users',
    title: 'Wrong People',
    short: 'A great message to the wrong person is still ignored.',
    long: "You're reaching contacts who changed jobs last quarter, companies that don't fit your ICP, or decision-makers with no buying reason right now. A great message to the wrong person is still ignored.",
    fix: 'Zeus + NeoBrain AI — verified, signal-ranked decision-makers with a “why now” attached.',
  },
  {
    icon: 'mail',
    title: 'Emails Never Arriving',
    short: "You can't get a reply to an email that landed in spam.",
    long: '17% of cold emails never reach the inbox — missing authentication, unwarmed domains, or stale lists full of invalid addresses. You can’t get a reply to an email that landed in spam.',
    fix: 'Verifyrit + Warmrit + Snaarpmail — clean lists, warmed domains, proper authentication.',
  },
  {
    icon: 'copy',
    title: 'Outreach That Reads Like a Template',
    short: 'Generic outreach gets deleted before the second sentence.',
    long: 'Buyers spot a mail-merge from the first line. Templates with a name and company swapped in get deleted before the second sentence — they prove you never looked at who you were writing to.',
    fix: "Sendrit + NeoBrain AI — openers researched and written from each prospect's real buying signals, at scale.",
  },
  {
    icon: 'repeat',
    title: 'Follow-Up That Gives Up Too Soon',
    short: 'Most teams send one email, maybe two, then move on.',
    long: "Most replies land after the first email, but most teams send one, maybe two, then quit. The deals you're losing aren't saying no — they just haven't seen the right message at the right moment yet.",
    fix: 'Sendrit — automated, multi-step sequences that keep following up on the right cadence until you get a reply.',
  },
];

export default function LowReplyRatesCauses() {
  const [active, setActive] = useState(0);
  const [nonce, setNonce] = useState(0); // bump to restart the active item's line
  const [running, setRunning] = useState(false);
  const sectionRef = useRef(null);
  const fillRef = useRef(null);

  const select = (i) => {
    setActive(i);
    setNonce((n) => n + 1);
  };

  // Run the progress line + auto-advance only while in view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setRunning(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setRunning(e.isIntersecting)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fill = fillRef.current;

    // Reset the line to 0, then drive it to 100% with a linear CSS transition.
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      void fill.offsetWidth; // commit the reset before animating
      if (!reduced) {
        fill.style.transition = `width ${ADVANCE_MS}ms linear`;
        fill.style.width = '100%';
      }
    }

    if (reduced) return; // no auto-advance under reduced motion
    const id = setTimeout(() => setActive((a) => (a + 1) % CAUSES.length), ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, nonce, running]);

  return (
    <section className="lrr-causes" ref={sectionRef}>
      <div className="container">
        <div className="lrr-causes-head" data-reveal-stagger="100">
          <span className="lrr-causes-eyebrow" data-reveal>
            <Icon name="zap" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Low Reply Rates Have Four Causes.<br />
            Most Teams Are Only Fixing One.
          </h2>
          <p data-reveal>
            Most teams rewrite their subject lines when reply rates drop. That addresses one
            variable while three others stay broken. Here&rsquo;s what&rsquo;s actually stopping
            replies &mdash; and which part of NeoLeads fixes each one.
          </p>
        </div>

        <div className="lrr-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="lrr-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`lrr-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="lrr-cause-row">
                    <span className="lrr-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="lrr-cause-title">{c.title}</span>
                    <span className="lrr-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="lrr-cause-body">
                    <p className="lrr-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="lrr-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="lrr-cause-progress" aria-hidden="true">
                      <span className="lrr-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="lrr-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="lrr-panel" key={index}>
      {index === 0 && <PanelTargeting />}
      {index === 1 && <PanelInbox />}
      {index === 2 && <PanelPersonalize />}
      {index === 3 && <PanelSequence />}
    </div>
  );
}

/* ---------- Panel 1: Targeting the right contact ---------- */
function PanelTargeting() {
  return (
    <>
      <span className="lrr-panel-eyebrow">Targeting the right contact</span>
      <div className="lrr-contact is-bad">
        <div className="lrr-contact-head">
          <span className="lrr-contact-av gray">DR</span>
          <div className="lrr-contact-id">
            <div className="lrr-contact-name struck">Daniel R.</div>
            <div className="lrr-contact-role">VP Sales · former @Northwind</div>
          </div>
        </div>
        <span className="lrr-flag red">
          <Icon name="ban" aria-hidden="true" /> Left company 4 months ago
        </span>
      </div>

      <div className="lrr-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="lrr-contact is-good">
        <div className="lrr-contact-head">
          <span className="lrr-contact-av purple">MT</span>
          <div className="lrr-contact-id">
            <div className="lrr-contact-name">Marcus T.</div>
            <div className="lrr-contact-role">VP Sales · Acme Corp</div>
          </div>
          <div className="lrr-intent">
            <span className="lrr-intent-num">94</span>
            <span className="lrr-intent-lbl">Intent</span>
          </div>
        </div>
        <div className="lrr-contact-tags">
          <span className="lrr-tag teal">
            <Icon name="check" aria-hidden="true" /> ICP Match
          </span>
          <span className="lrr-tag purple">Raised $18M</span>
          <span className="lrr-tag green">Hiring SDRs</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 2: Inbox placement ---------- */
function PanelInbox() {
  return (
    <>
      <span className="lrr-panel-eyebrow">Inbox placement</span>
      <div className="lrr-inbox is-bad">
        <div className="lrr-inbox-head">
          <span className="lrr-inbox-title">Without NeoLeads</span>
          <span className="lrr-inbox-stat red">14% to spam</span>
        </div>
        <div className="lrr-bar">
          <span className="seg primary" style={{ width: '62%' }} />
          <span className="seg promo" style={{ width: '24%' }} />
          <span className="seg spam" style={{ width: '14%' }} />
        </div>
        <div className="lrr-inbox-legend">
          <span>62% Primary</span>
          <span>24% Promotions</span>
          <span className="red">14% Spam</span>
        </div>
      </div>

      <div className="lrr-inbox is-good">
        <div className="lrr-inbox-head">
          <span className="lrr-inbox-title">With NeoLeads</span>
          <span className="lrr-inbox-stat purple">97% primary</span>
        </div>
        <div className="lrr-bar">
          <span className="seg good-fill" style={{ width: '97%' }} />
        </div>
        <div className="lrr-inbox-tools">
          <span className="lrr-tool green">Verifyrit: Clean ✓</span>
          <span className="lrr-tool gray">Warmrit: Warmed ✓</span>
          <span className="lrr-tool gray">Snaarpmail: Auth ✓</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 3: Personalized, not templated ---------- */
function PanelPersonalize() {
  return (
    <>
      <span className="lrr-panel-eyebrow">Personalized, not templated</span>
      <div className="lrr-msg is-bad">
        <div className="lrr-msg-label">Generic template</div>
        <p className="lrr-msg-body">
          Hi <span className="lrr-token">{'{{first_name}}'}</span>, I wanted to reach out about
          our platform that helps companies like{' '}
          <span className="lrr-token">{'{{company}}'}</span> drive more pipeline. Do you have 15
          minutes this week?
        </p>
        <span className="lrr-flag red">
          <Icon name="ban" aria-hidden="true" /> Deleted in 2 seconds
        </span>
      </div>

      <div className="lrr-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="lrr-msg is-good">
        <div className="lrr-msg-label purple">Written by NeoBrain AI</div>
        <p className="lrr-msg-body bright">
          Hi Marcus — congrats on the <span className="lrr-hl">$18M raise</span>. Noticed Acme just
          opened <span className="lrr-hl">8 SDR roles</span>; scaling the team usually means new
          pipeline targets. Worth a look at how others hit them faster?
        </p>
        <span className="lrr-flag green">
          <Icon name="check" aria-hidden="true" /> Built from live buying signals
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 4: Sequence that gets the reply ---------- */
function PanelSequence() {
  const steps = [
    { day: 'Day 1', name: 'Intro email', status: 'Opened', tone: 'opened' },
    { day: 'Day 3', name: 'Follow-up', status: 'Opened', tone: 'opened' },
    { day: 'Day 6', name: 'Value nudge', status: 'Opened', tone: 'opened' },
    { day: 'Day 9', name: 'Break-up email', status: 'Replied', tone: 'replied' },
  ];
  return (
    <>
      <span className="lrr-panel-eyebrow">A sequence that earns the reply</span>
      <div className="lrr-seq">
        {steps.map((s, i) => (
          <div className={`lrr-seq-step${s.tone === 'replied' ? ' is-reply' : ''}`} key={s.name}>
            <span className="lrr-seq-rail">
              <span className={`lrr-seq-dot ${s.tone}`} />
            </span>
            <div className="lrr-seq-content">
              <div className="lrr-seq-top">
                <span className="lrr-seq-name">{s.name}</span>
                <span className="lrr-seq-day">{s.day}</span>
              </div>
              <span className={`lrr-seq-status ${s.tone}`}>{s.status}</span>
              {s.tone === 'replied' && (
                <p className="lrr-seq-quote">“Good timing — let’s set up a call this week.”</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="lrr-seq-foot">
        <span className="lrr-seq-foot-num">80%</span> of replies came after the first email
      </p>
    </>
  );
}
