'use client';

// Interactive "four causes" section for /stale-contact-data.
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
    icon: 'database',
    title: 'Static Databases',
    short: 'A list bought or exported once starts rotting the moment you save it.',
    long: 'Most teams run a verification pass before a big campaign and call it done. But data decays at 2.1% per month, by the time the next campaign launches, the list is already stale again.',
    fix: 'Zeus: continuously refreshed, buying-signal-backed contacts, not a snapshot that rots.',
  },
  {
    icon: 'mail',
    title: 'No Pre-Campaign Validation',
    short: 'Stale contacts enter sequences unchecked and bounce your domain.',
    long: 'Most sequences launch against whatever is in the CRM. Invalid addresses, dead domains, and spam traps go out with everything else, and every hard bounce chips away at the sender reputation you spent months building.',
    fix: 'Verifyrit: every address re-validated at send time, so bad data never leaves your domain.',
  },
  {
    icon: 'layers',
    title: 'Invisible CRM Rot',
    short: 'No alert fires when a contact changes jobs or a domain goes dark.',
    long: 'A CRM only knows what was true the day a record was created. When someone changes roles, a company rebrands, or a domain lapses, nothing flags it, the rot stays invisible until a campaign bounces or a reply never comes.',
    fix: 'NeoBrain AI: live change-detection that flags and updates records the moment a signal moves.',
  },
  {
    icon: 'replace',
    title: 'Role-Change Blindness',
    short: 'The email delivers, but the person left their role months ago.',
    long: 'Deliverability looks perfect: the email lands, maybe even gets opened. But the contact moved on two quarters ago, so your perfectly personalized message reaches someone who can no longer say yes.',
    fix: 'Zeus + NeoBrain AI: re-verify the person behind the address and re-score them on every change.',
  },
];

export default function StaleContactDataCauses() {
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
    <section className="scd-causes" ref={sectionRef}>
      <div className="container">
        <div className="scd-causes-head" data-reveal-stagger="100">
          <span className="scd-causes-eyebrow" data-reveal>
            <Icon name="sparkles" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Stale Data Has Four Causes. A One-Time<br />
            List Clean Fixes Zero of Them.
          </h2>
          <p data-reveal>
            Most teams run a quarterly scrub and assume the problem is solved. That fixes one
            moment in time while the data keeps decaying underneath them. Here&rsquo;s what&rsquo;s
            actually letting your list go stale, and which part of NeoLeads fixes each one.
          </p>
        </div>

        <div className="scd-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="scd-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`scd-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="scd-cause-row">
                    <span className="scd-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="scd-cause-title">{c.title}</span>
                    <span className="scd-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="scd-cause-body">
                    <p className="scd-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="scd-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="scd-cause-progress" aria-hidden="true">
                      <span className="scd-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="scd-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="scd-panel" key={index}>
      {index === 0 && <PanelDecay />}
      {index === 1 && <PanelValidation />}
      {index === 2 && <PanelRot />}
      {index === 3 && <PanelRole />}
    </div>
  );
}

/* ---------- Panel 1: How a static list decays ---------- */
function PanelDecay() {
  const rows = [
    { month: 'Month 1', pct: '97% valid', width: '97%', tone: 'green' },
    { month: 'Month 6', pct: '88% valid', width: '88%', tone: 'amber' },
    { month: 'Month 12', pct: '77% valid', width: '77%', tone: 'red' },
  ];
  return (
    <>
      <span className="scd-panel-eyebrow">How a static list decays</span>
      <div className="scd-pcard">
        <div className="scd-pcard-head">
          <Icon name="download" aria-hidden="true" />
          <span className="scd-pcard-file">contacts-export.csv</span>
          <span className="scd-pcard-meta">· downloaded once</span>
        </div>
        <div className="scd-decay">
          {rows.map((r) => (
            <div className="scd-decay-row" key={r.month}>
              <div className="scd-decay-top">
                <span className="scd-decay-month">{r.month}</span>
                <span className={`scd-decay-pct ${r.tone}`}>{r.pct}</span>
              </div>
              <div className="scd-decay-bar" aria-hidden="true">
                <span className={`scd-decay-fill ${r.tone}`} style={{ width: r.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="scd-zeus-pill">
        <span className="scd-zeus-badge">Zeus</span>
        Refreshed against live signals: always current, never a snapshot
      </div>
    </>
  );
}

/* ---------- Panel 2: Validation before every send ---------- */
function PanelValidation() {
  return (
    <>
      <span className="scd-panel-eyebrow">Validation before every send</span>
      <div className="scd-prow is-bad">
        <div className="scd-prow-head">
          <span className="scd-prow-ic red" aria-hidden="true"><Icon name="send" /></span>
          <div className="scd-prow-id">
            <div className="scd-prow-name">Sent without validation</div>
            <div className="scd-prow-role">1,000 contacts · last checked 8 months ago</div>
          </div>
        </div>
        <span className="scd-flag red">
          <Icon name="ban" aria-hidden="true" /> 84 hard bounces · domain reputation hit
        </span>
      </div>

      <div className="scd-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="scd-prow is-good">
        <div className="scd-prow-head">
          <span className="scd-prow-ic purple" aria-hidden="true"><Icon name="badge-check" /></span>
          <div className="scd-prow-id">
            <div className="scd-prow-name">Verifyrit pre-send check</div>
            <div className="scd-prow-role">Re-validated the moment the campaign launches</div>
          </div>
        </div>
        <div className="scd-tags">
          <span className="scd-tag gray">1,000 checked</span>
          <span className="scd-tag purple">64 removed</span>
          <span className="scd-tag green">
            <Icon name="check" aria-hidden="true" /> Bounce 0.3%
          </span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 3: Live change-detection ---------- */
function PanelRot() {
  const alerts = [
    { ic: 'briefcase', tone: 'amber', title: 'Marcus T. changed jobs', note: 'Now VP Sales @ Growthline', time: '2d' },
    { ic: 'globe', tone: 'red', title: 'vertexco.com domain expired', note: 'Address auto-flagged as undeliverable', time: '5d' },
    { ic: 'refresh-cw', tone: 'green', title: 'Record auto-updated', note: 'No manual cleanup needed', time: 'now' },
  ];
  return (
    <>
      <span className="scd-panel-eyebrow">Live change-detection alerts</span>
      <div className="scd-alerts">
        {alerts.map((a) => (
          <div className={`scd-alert ${a.tone}`} key={a.title}>
            <span className="scd-alert-ic" aria-hidden="true"><Icon name={a.ic} /></span>
            <div className="scd-alert-body">
              <span className="scd-alert-title">{a.title}</span>
              <span className="scd-alert-note">{a.note}</span>
            </div>
            <span className="scd-alert-time">{a.time}</span>
          </div>
        ))}
      </div>
      <p className="scd-causes-foot-note">
        Every change fires a signal, your CRM stays current without a single manual edit.
      </p>
    </>
  );
}

/* ---------- Panel 4: Delivered, but to whom? ---------- */
function PanelRole() {
  return (
    <>
      <span className="scd-panel-eyebrow">Delivered, but to whom?</span>
      <div className="scd-prow is-bad">
        <div className="scd-prow-head">
          <span className="scd-prow-av gray">DO</span>
          <div className="scd-prow-id">
            <div className="scd-prow-name struck">David O. · VP Sales</div>
            <div className="scd-prow-role">stackline.io · title from 6 months ago</div>
          </div>
        </div>
        <span className="scd-flag red">
          <Icon name="ban" aria-hidden="true" /> Email delivered to the wrong role
        </span>
      </div>

      <div className="scd-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="scd-prow is-good">
        <div className="scd-prow-head">
          <span className="scd-prow-av purple">DO</span>
          <div className="scd-prow-id">
            <div className="scd-prow-name">David O. · CMO</div>
            <div className="scd-prow-role">stackline.io · re-verified today</div>
          </div>
          <div className="scd-prow-intent">
            <span className="scd-prow-intent-num">91</span>
            <span className="scd-prow-intent-lbl">Re-scored</span>
          </div>
        </div>
        <div className="scd-tags">
          <span className="scd-tag purple">Role updated</span>
          <span className="scd-tag green">
            <Icon name="check" aria-hidden="true" /> Verified deliverable
          </span>
        </div>
      </div>
    </>
  );
}
