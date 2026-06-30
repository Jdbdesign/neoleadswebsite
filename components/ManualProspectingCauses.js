'use client';

// Interactive "four root causes" section for /manual-prospecting.
// One cause is active at a time. A purple progress line fills under the active
// item over ADVANCE_MS; when it completes, the next cause activates (looping).
// Clicking any item jumps to it immediately and restarts its progress. The
// right-hand panel swaps to the visual that matches the active cause.
// The loop only runs while the section is in view, and is disabled entirely
// under prefers-reduced-motion (clicking still works).
//
// Mirrors the established pattern from LowReplyRatesCauses / StaleContactDataCauses.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const ADVANCE_MS = 7000;

const CAUSES = [
  {
    icon: 'clock',
    title: 'Research That Eats the Morning',
    short: 'Reps lose the morning to research before a single email goes out.',
    long: 'The average rep spends 15% of their week on prospect research, 6+ hours cross-referencing LinkedIn, company websites, news, and CRM records just to build a list of 20 contacts that a single Zeus search would have returned in seconds.',
    fix: 'Zeus: natural-language search returns verified, signal-ranked contacts in seconds. No tab-switching, no cross-referencing, no manual list-building.',
  },
  {
    icon: 'layout-grid',
    title: 'Eight Tools to Find One Prospect',
    short: 'The prospecting stack got so big it became the bottleneck.',
    long: 'It now takes eight tools to find and qualify a single prospect, LinkedIn, Apollo, Hunter, ZoomInfo, a CRM, a spreadsheet, and two more. 72% of sellers say the stack leaves them overwhelmed instead of faster.',
    fix: 'Zeus replaces the entire prospecting stack with one search inside NeoLeads, contacts, emails, signals, and ICP scores in a single result.',
  },
  {
    icon: 'zap',
    title: 'No “Why Now” Signal',
    short: "A name and a title isn't a reason to call, and manual research rarely finds one.",
    long: 'Manual lists capture who someone is, never why they would buy today. Without a funding round, a new hire, or a hiring surge attached, every rep is guessing at timing, and most guesses land on someone with no reason to reply.',
    fix: 'Zeus + NeoBrain AI attach a live buying signal and an ICP score to every contact, so reps open with a reason, not a guess.',
  },
  {
    icon: 'refresh-ccw',
    title: "Lists That Don't Update Themselves",
    short: "A list starts decaying the day it's finished.",
    long: 'B2B data goes stale fast, roughly 6% of a freshly built list is wrong within three months as people change roles and companies. A static export is out of date before the campaign even ships.',
    fix: 'Zeus keeps every contact continuously enriched, re-verified, and re-scored, so the list refreshes itself instead of rotting in a spreadsheet.',
  },
];

export default function ManualProspectingCauses() {
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
    <section className="mp-causes" ref={sectionRef}>
      <div className="container">
        <div className="mp-causes-head" data-reveal-stagger="100">
          <span className="mp-causes-eyebrow" data-reveal>
            <Icon name="zap" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Manual Prospecting Has Four Drains.<br />
            Trying Harder Fixes None of Them.
          </h2>
          <p data-reveal>
            The standard response to a thin pipeline is to ask reps to prospect more. But if the
            process is broken, slow, tool-heavy, and signal-free, asking for more of it just
            produces more of the same. Here&rsquo;s what&rsquo;s actually draining your pipeline,
            and which part of NeoLeads eliminates each one.
          </p>
        </div>

        <div className="mp-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="mp-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`mp-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="mp-cause-row">
                    <span className="mp-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="mp-cause-title">{c.title}</span>
                    <span className="mp-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="mp-cause-body">
                    <p className="mp-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="mp-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="mp-cause-progress" aria-hidden="true">
                      <span className="mp-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="mp-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="mp-panel" key={index}>
      {index === 0 && <PanelRace />}
      {index === 1 && <PanelStack />}
      {index === 2 && <PanelSignal />}
      {index === 3 && <PanelFresh />}
    </div>
  );
}

/* ---------- Panel 1: Time to build a usable list ---------- */
function PanelRace() {
  return (
    <>
      <span className="mp-panel-eyebrow">Time to build a usable list</span>
      <div className="mp-race is-manual">
        <div className="mp-race-head">
          <span className="mp-race-name">Manual</span>
          <span className="mp-race-time red">47 min</span>
        </div>
        <div className="mp-bar">
          <span className="fill red" style={{ width: '100%' }} />
        </div>
        <div className="mp-race-sub">6 contacts · 5 tabs · 3 unverified</div>
      </div>

      <div className="mp-race is-zeus">
        <div className="mp-race-head">
          <span className="mp-race-name">Zeus</span>
          <span className="mp-race-time purple">10 sec</span>
        </div>
        <div className="mp-bar">
          <span className="fill purple" style={{ width: '8%' }} />
        </div>
        <div className="mp-race-sub">47 contacts · 1 search · all verified + signal-ranked</div>
      </div>
    </>
  );
}

/* ---------- Panel 2: One search replaces the stack ---------- */
function PanelStack() {
  const tools = ['LinkedIn', 'Apollo', 'Hunter.io', 'ZoomInfo', 'Google', 'Sheets', 'CRM', 'Clay'];
  return (
    <>
      <span className="mp-panel-eyebrow">One search replaces the stack</span>
      <div className="mp-stack is-bad">
        <div className="mp-stack-grid">
          {tools.map((t) => (
            <span className="mp-stack-chip" key={t}>{t}</span>
          ))}
        </div>
        <span className="mp-flag red">
          <Icon name="layers" aria-hidden="true" /> 8 tools · 72% feel overwhelmed
        </span>
      </div>

      <div className="mp-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="mp-stack-one">
        <span className="mp-zeus-chip">
          <Icon name="search" aria-hidden="true" /> Zeus · one unified search
        </span>
        <span className="mp-flag green">
          <Icon name="check" aria-hidden="true" /> 1 tool · 0 tabs · everything inside NeoLeads
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 3: A reason to reach out ---------- */
function PanelSignal() {
  return (
    <>
      <span className="mp-panel-eyebrow">A reason to reach out</span>
      <div className="mp-contact is-bad">
        <div className="mp-contact-head">
          <span className="mp-contact-av gray">JR</span>
          <div className="mp-contact-id">
            <div className="mp-contact-name">Jordan R.</div>
            <div className="mp-contact-role">VP Sales · Acme Corp</div>
          </div>
        </div>
        <span className="mp-flag red">
          <Icon name="ban" aria-hidden="true" /> Name + title only · no reason to call
        </span>
      </div>

      <div className="mp-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="mp-contact is-good">
        <div className="mp-contact-head">
          <span className="mp-contact-av purple">MT</span>
          <div className="mp-contact-id">
            <div className="mp-contact-name">Marcus T.</div>
            <div className="mp-contact-role">VP Sales · Acme Corp</div>
          </div>
          <div className="mp-intent">
            <span className="mp-intent-num">94</span>
            <span className="mp-intent-lbl">ICP</span>
          </div>
        </div>
        <div className="mp-contact-tags">
          <span className="mp-tag purple">Raised $18M</span>
          <span className="mp-tag green">9 SDR roles open</span>
          <span className="mp-tag teal">New CRO hired</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 4: A list that refreshes itself ---------- */
function PanelFresh() {
  return (
    <>
      <span className="mp-panel-eyebrow">A list that stays fresh</span>
      <div className="mp-decay is-bad">
        <div className="mp-decay-head">
          <span className="mp-decay-title">Static export</span>
          <span className="mp-decay-stat red">−6% / 3 months</span>
        </div>
        <div className="mp-bar">
          <span className="fill fade" style={{ width: '78%' }} />
        </div>
        <div className="mp-decay-legend">
          <span>Day 0: 100% valid</span>
          <span className="red">Day 90: 78% valid</span>
        </div>
      </div>

      <div className="mp-decay is-good">
        <div className="mp-decay-head">
          <span className="mp-decay-title">Zeus · continuously refreshed</span>
          <span className="mp-decay-stat purple">Always current</span>
        </div>
        <div className="mp-bar">
          <span className="fill good-fill" style={{ width: '100%' }} />
        </div>
        <div className="mp-decay-tools">
          <span className="mp-tool green">Auto-enriched ✓</span>
          <span className="mp-tool gray">Re-verified ✓</span>
          <span className="mp-tool gray">Re-scored ✓</span>
        </div>
      </div>
    </>
  );
}
