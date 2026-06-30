'use client';

// Interactive "four root causes" section for /no-pipeline-visibility.
// One cause is active at a time. A purple progress line fills under the active
// item over ADVANCE_MS; when it completes, the next cause activates (looping).
// Clicking any item jumps to it immediately and restarts its progress. The
// right-hand panel swaps to the visual that matches the active cause.
// The loop only runs while the section is in view, and is disabled entirely
// under prefers-reduced-motion (clicking still works).
//
// Mirrors the established pattern from MissedHotRepliesCauses / ManualProspectingCauses.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const ADVANCE_MS = 7000;

const CAUSES = [
  {
    icon: 'unplug',
    title: 'Data Scattered Across Disconnected Tools',
    short: 'The lead source, outreach tool, reply inbox, and CRM never sync to each other.',
    long: 'A modern sales stack is four or five tools deep, a prospecting source, an outreach sequencer, a reply inbox, a calendar, and a CRM, and almost none of them share data automatically. Each one holds a piece of the truth, so the real state of a deal is split across systems that have no idea the others exist. Nobody can see the whole picture because no single tool was ever given it.',
    fix: 'NeoLeads connects Sendrit, Snaarpmail, Kalender, and your lead source so every signal flows into one pipeline view automatically, no integrations to babysit.',
  },
  {
    icon: 'pencil-off',
    title: 'The Pipeline Depends on Reps Logging Activity',
    short: 'If a rep forgets to update the record, the pipeline simply doesn’t know it happened.',
    long: 'Most CRMs only know what a human remembered to type into them. A rep sends 40 emails, gets 6 replies, books 2 calls, and at the end of a busy week logs maybe half of it. The pipeline isn’t wrong because the data is bad, it’s wrong because the data never made it in. Forecasts built on manual entry are forecasts built on whatever didn’t get skipped.',
    fix: 'NeoLeads captures every send, open, reply, and booking the instant it happens, so the pipeline reflects reality without a rep ever updating a field.',
  },
  {
    icon: 'gauge',
    title: 'The CRM Shows Stages, Not Real Engagement',
    short: 'A deal can sit in “Stage 2” for weeks while the prospect goes hot or cold unseen.',
    long: 'CRM stages are a snapshot a human set, not a live signal. A deal marked “Qualified” three weeks ago tells you nothing about whether that buyer opened your last five emails or went completely silent. The one thing that actually predicts a close, current engagement, is exactly the thing a static stage field can’t show you.',
    fix: 'NeoBrain AI scores engagement in real time from opens, replies, and intent, so every deal carries a live temperature, not a stale stage label.',
  },
  {
    icon: 'git-compare-arrows',
    title: 'No Single Source of Truth to Trust',
    short: 'Every tool reports a different number, so the forecast becomes a debate, not a fact.',
    long: 'When the outreach tool says 1,840 touches, the inbox says 47 replies, and the CRM says 18 open deals, which number is the pipeline? Each system is internally consistent and mutually contradictory, so the weekly forecast turns into a reconciliation meeting where everyone defends their own dashboard. With no shared source of truth, no one fully believes the number, including the people reporting it.',
    fix: 'NeoLeads makes one live pipeline view the single source of truth, the same number for the rep, the manager, and the board.',
  },
];

export default function NoPipelineVisibilityCauses() {
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
    <section className="npv-causes" ref={sectionRef}>
      <div className="container">
        <div className="npv-causes-head" data-reveal-stagger="100">
          <span className="npv-causes-eyebrow" data-reveal>
            <Icon name="zap" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Blind Pipeline Has Four Causes.<br />
            Adding Another Dashboard Fixes None of Them.
          </h2>
          <p data-reveal>
            The instinct when the forecast can&rsquo;t be trusted is to buy another reporting tool. But
            if the data is scattered across four systems, depends on reps to log it, shows stale stages
            instead of live engagement, and never rolls up to one trusted number, another dashboard just
            adds a fifth version of the truth. Here&rsquo;s what&rsquo;s actually happening, and which
            part of NeoLeads fixes each one.
          </p>
        </div>

        <div className="npv-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="npv-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`npv-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="npv-cause-row">
                    <span className="npv-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="npv-cause-title">{c.title}</span>
                    <span className="npv-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="npv-cause-body">
                    <p className="npv-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="npv-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="npv-cause-progress" aria-hidden="true">
                      <span className="npv-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="npv-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="npv-panel" key={index}>
      {index === 0 && <PanelScatter />}
      {index === 1 && <PanelLogging />}
      {index === 2 && <PanelEngagement />}
      {index === 3 && <PanelTruth />}
    </div>
  );
}

/* ---------- Panel 1: scattered tools -> one connected view ---------- */
function PanelScatter() {
  const silos = [
    { id: 'Lead Source', n: '312' },
    { id: 'Sendrit', n: '1.8k' },
    { id: 'Snaarpmail', n: '47' },
    { id: 'CRM', n: '18' },
  ];
  return (
    <>
      <span className="npv-panel-eyebrow">4 disconnected tools → 1 live view</span>
      <div className="npv-silos">
        {silos.map((s) => (
          <span className="npv-silo" key={s.id}>{s.id} · {s.n}</span>
        ))}
      </div>

      <div className="npv-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="npv-unibox">
        <span className="npv-unibox-ic" aria-hidden="true"><Icon name="layout-dashboard" /></span>
        <div className="npv-unibox-body">
          <div className="npv-unibox-name">NeoLeads Pipeline</div>
          <div className="npv-unibox-sub">1 view · 4 tools connected · every signal in sync</div>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 2: manual logging -> auto-capture ---------- */
function PanelLogging() {
  return (
    <>
      <span className="npv-panel-eyebrow">What the rep logged vs what happened</span>
      <div className="npv-pblock is-bad">
        <div className="npv-prow">
          <span className="npv-prow-dot gray" aria-hidden="true" />
          <span className="npv-prow-name">Logged in CRM</span>
          <span className="npv-itag muted">1 call</span>
        </div>
        <div className="npv-prow">
          <span className="npv-prow-dot gray" aria-hidden="true" />
          <span className="npv-prow-name">Actually happened</span>
          <span className="npv-itag muted">40 sent · 6 replies · 2 booked</span>
        </div>
        <span className="npv-flag red">
          <Icon name="ban" aria-hidden="true" /> Most activity never made it into the pipeline
        </span>
      </div>

      <div className="npv-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="npv-pblock is-good">
        <div className="npv-prow">
          <span className="npv-prow-dot green" aria-hidden="true" />
          <span className="npv-prow-name">Captured automatically</span>
          <span className="npv-itag green">40 · 6 · 2 logged</span>
        </div>
        <span className="npv-flag green">
          <Icon name="check" aria-hidden="true" /> Every signal logged the instant it happens
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 3: static stage -> live engagement ---------- */
function PanelEngagement() {
  return (
    <>
      <span className="npv-panel-eyebrow">Static stage vs live engagement</span>
      <div className="npv-pblock is-bad">
        <div className="npv-prow">
          <span className="npv-prow-ic gray" aria-hidden="true"><Icon name="layers" /></span>
          <span className="npv-prow-name">Acme Corp</span>
          <span className="npv-itag muted">Stage 2 · set 21 days ago</span>
        </div>
        <span className="npv-flag red">
          <Icon name="eye-off" aria-hidden="true" /> A label, never a signal · is it hot or dead?
        </span>
      </div>

      <div className="npv-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="npv-pblock is-good">
        <div className="npv-pblock-head">
          <span className="npv-pblock-title">Acme Corp · engagement</span>
          <span className="npv-pblock-stat purple">88 · warming</span>
        </div>
        <div className="npv-ubar">
          <span className="npv-ubar-fill" style={{ width: '88%' }} />
        </div>
        <div className="npv-ubar-legend">
          <span className="good">Opened 5× · replied 2× this week</span>
          <span>Live score</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 4: conflicting numbers -> one source of truth ---------- */
function PanelTruth() {
  return (
    <>
      <span className="npv-panel-eyebrow">Four numbers vs one truth</span>
      <div className="npv-pblock is-bad">
        <div className="npv-prow">
          <span className="npv-prow-dot gray" aria-hidden="true" />
          <span className="npv-prow-name">Outreach tool</span>
          <span className="npv-prow-quote">“1,840 touches sent”</span>
        </div>
        <div className="npv-prow">
          <span className="npv-prow-dot gray" aria-hidden="true" />
          <span className="npv-prow-name">CRM report</span>
          <span className="npv-prow-quote">“18 open deals”</span>
        </div>
        <span className="npv-flag red">
          <Icon name="git-compare-arrows" aria-hidden="true" /> Every tool defends a different number
        </span>
      </div>

      <div className="npv-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="npv-pblock is-good">
        <div className="npv-prow">
          <span className="npv-prow-dot green" aria-hidden="true" />
          <span className="npv-prow-name">NeoLeads forecast</span>
          <span className="npv-itag green">$412K · 96% confidence</span>
        </div>
        <span className="npv-flag green">
          <Icon name="check" aria-hidden="true" /> One live number · rep, manager, and board agree
        </span>
      </div>
    </>
  );
}
