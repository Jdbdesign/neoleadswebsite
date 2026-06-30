'use client';

// Interactive "four root causes" section for /unqualified-lead-lists.
// One cause is active at a time. A purple progress line fills under the active
// item over ADVANCE_MS; when it completes, the next cause activates (looping).
// Clicking any item jumps to it immediately and restarts its progress. The
// right-hand panel swaps to the visual that matches the active cause.
// The loop only runs while the section is in view, and is disabled entirely
// under prefers-reduced-motion (clicking still works).
//
// Mirrors the established pattern from NoPipelineVisibilityCauses / ManualProspectingCauses.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const ADVANCE_MS = 7000;

const CAUSES = [
  {
    icon: 'filter',
    title: 'Lists Built on Filters, Not Fit',
    short: 'A title and a company size match a filter — that is not the same as matching a buyer.',
    long: 'Most lists are assembled by stacking filters: this title, this industry, this headcount, this region. Those are surface attributes a database can sort on, not signals that a company actually needs what you sell. So a name lands on the list because it cleared a checkbox, not because it has the problem you solve. The filter feels precise, but it answers the wrong question — it tells you who looks like a buyer, never who is one.',
    fix: 'NeoBrain AI scores every company on real fit — what they do, how they operate, and whether your product solves a problem they actually have — not just whether they matched a filter.',
  },
  {
    icon: 'user-x',
    title: 'No Authority Check on the Contact',
    short: 'The name matched the search, but the person can’t actually buy what you’re selling.',
    long: 'A list can be full of the right companies and still be full of the wrong people. The contact who matched your title filter may have left, changed roles, or never owned the budget in the first place. Reps burn weeks nurturing someone who was never able to say yes, then have to start over with whoever actually signs off — if they can even find them. The list looked complete; it just pointed at the wrong seat.',
    fix: 'NeoLeads pulls verified decision-makers with the right authority through Zeus, and Verifyrit confirms every contact is real and reachable before it ever reaches a rep.',
  },
  {
    icon: 'radar',
    title: 'No Intent Signal — Everyone Looks Identical',
    short: 'On a spreadsheet a hot, in-market buyer is indistinguishable from a cold one.',
    long: 'A static list flattens everyone to the same row. The company researching solutions today and the one that won’t care for two years look exactly alike — same columns, same blank cells. Without an intent signal there is no way to tell who is actively in-market, so reps work the list top to bottom and spend the same effort on a buyer who’s ready and one who will never reply. Timing is the single biggest predictor of a close, and the raw list hides it completely.',
    fix: 'NeoBrain AI reads buying signals in real time — hiring, site visits, research activity — and gives every contact a live intent score, so the ones actually in-market rise to the top.',
  },
  {
    icon: 'layers',
    title: 'Volume Over Quality',
    short: 'The instinct is to load more names — a bigger list with the same 27% qualified.',
    long: 'When pipeline is thin, the reflex is to buy more contacts. But doubling a list that’s 27% qualified just doubles the 73% that were never going to buy. Reps end up with more rows to work, not more deals to close, and the time spent qualifying out bad-fit names is time not spent selling. More volume doesn’t fix an unqualified list — it scales the exact problem that made it unqualified.',
    fix: 'NeoLeads ranks the whole list by fit and intent and surfaces only the qualified contacts, so reps work a shorter, sharper list instead of a longer one.',
  },
];

export default function UnqualifiedLeadListsCauses() {
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
    <section className="ull-causes" ref={sectionRef}>
      <div className="container">
        <div className="ull-causes-head" data-reveal-stagger="100">
          <span className="ull-causes-eyebrow" data-reveal>
            <Icon name="zap" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Unqualified Lists Have Four Causes.<br />
            Buying More Contacts Fixes None of Them.
          </h2>
          <p data-reveal>
            The instinct when conversion is low is to load a bigger list. But if the names were chosen by
            filters instead of fit, point at people who can&rsquo;t buy, carry no intent signal, and get
            judged by volume instead of quality, more contacts just scale the problem. Here&rsquo;s
            what&rsquo;s actually happening, and which part of NeoLeads fixes each one.
          </p>
        </div>

        <div className="ull-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="ull-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`ull-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="ull-cause-row">
                    <span className="ull-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="ull-cause-title">{c.title}</span>
                    <span className="ull-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="ull-cause-body">
                    <p className="ull-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="ull-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="ull-cause-progress" aria-hidden="true">
                      <span className="ull-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="ull-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="ull-panel" key={index}>
      {index === 0 && <PanelFilters />}
      {index === 1 && <PanelAuthority />}
      {index === 2 && <PanelIntent />}
      {index === 3 && <PanelVolume />}
    </div>
  );
}

/* ---------- Panel 1: filters -> real fit score ---------- */
function PanelFilters() {
  const filters = [
    { id: 'Title', n: '✓' },
    { id: 'Industry', n: '✓' },
    { id: 'Headcount', n: '✓' },
    { id: 'Region', n: '✓' },
  ];
  return (
    <>
      <span className="ull-panel-eyebrow">4 matched filters → 1 real fit score</span>
      <div className="ull-silos">
        {filters.map((s) => (
          <span className="ull-silo" key={s.id}>{s.id} · {s.n}</span>
        ))}
      </div>

      <div className="ull-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="ull-unibox">
        <span className="ull-unibox-ic" aria-hidden="true"><Icon name="target" /></span>
        <div className="ull-unibox-body">
          <div className="ull-unibox-name">NeoBrain AI · Fit 94</div>
          <div className="ull-unibox-sub">Scored on what they do, not what they matched</div>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 2: wrong authority -> verified decision-maker ---------- */
function PanelAuthority() {
  return (
    <>
      <span className="ull-panel-eyebrow">Who the filter found vs who can buy</span>
      <div className="ull-pblock is-bad">
        <div className="ull-prow">
          <span className="ull-prow-dot gray" aria-hidden="true" />
          <span className="ull-prow-name">On the raw list</span>
          <span className="ull-itag muted">Junior coordinator · no budget</span>
        </div>
        <div className="ull-prow">
          <span className="ull-prow-dot gray" aria-hidden="true" />
          <span className="ull-prow-name">Also on the list</span>
          <span className="ull-itag muted">Left the company 6 months ago</span>
        </div>
        <span className="ull-flag red">
          <Icon name="ban" aria-hidden="true" /> The name matched — the authority didn’t
        </span>
      </div>

      <div className="ull-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="ull-pblock is-good">
        <div className="ull-prow">
          <span className="ull-prow-dot green" aria-hidden="true" />
          <span className="ull-prow-name">VP Revenue · verified</span>
          <span className="ull-itag green">Owns budget · reachable</span>
        </div>
        <span className="ull-flag green">
          <Icon name="check" aria-hidden="true" /> Right seat, confirmed real before a rep reaches out
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 3: no intent -> live intent score ---------- */
function PanelIntent() {
  return (
    <>
      <span className="ull-panel-eyebrow">Flat list vs live intent</span>
      <div className="ull-pblock is-bad">
        <div className="ull-prow">
          <span className="ull-prow-ic gray" aria-hidden="true"><Icon name="rows-3" /></span>
          <span className="ull-prow-name">Acme Corp</span>
          <span className="ull-itag muted">Row 412 · no signal</span>
        </div>
        <span className="ull-flag red">
          <Icon name="eye-off" aria-hidden="true" /> Hot or cold? The spreadsheet can’t tell you
        </span>
      </div>

      <div className="ull-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="ull-pblock is-good">
        <div className="ull-pblock-head">
          <span className="ull-pblock-title">Acme Corp · intent</span>
          <span className="ull-pblock-stat purple">91 · in-market</span>
        </div>
        <div className="ull-ubar">
          <span className="ull-ubar-fill" style={{ width: '91%' }} />
        </div>
        <div className="ull-ubar-legend">
          <span className="good">Hiring · pricing-page visits · research spike</span>
          <span>Live score</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 4: volume -> ranked quality ---------- */
function PanelVolume() {
  return (
    <>
      <span className="ull-panel-eyebrow">Bigger list vs sharper list</span>
      <div className="ull-pblock is-bad">
        <div className="ull-prow">
          <span className="ull-prow-dot gray" aria-hidden="true" />
          <span className="ull-prow-name">2,000 contacts loaded</span>
          <span className="ull-prow-quote">“more names, same 27%”</span>
        </div>
        <div className="ull-prow">
          <span className="ull-prow-dot gray" aria-hidden="true" />
          <span className="ull-prow-name">1,460 never going to buy</span>
          <span className="ull-prow-quote">“reps qualify them out by hand”</span>
        </div>
        <span className="ull-flag red">
          <Icon name="layers" aria-hidden="true" /> More volume just scales the bad-fit pile
        </span>
      </div>

      <div className="ull-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="ull-pblock is-good">
        <div className="ull-prow">
          <span className="ull-prow-dot green" aria-hidden="true" />
          <span className="ull-prow-name">NeoLeads ranked list</span>
          <span className="ull-itag green">540 qualified · sorted by intent</span>
        </div>
        <span className="ull-flag green">
          <Icon name="check" aria-hidden="true" /> A shorter, sharper list — only the names worth working
        </span>
      </div>
    </>
  );
}
