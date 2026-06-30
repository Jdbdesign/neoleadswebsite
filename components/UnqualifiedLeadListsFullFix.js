import Icon from './Icon';

// "The full fix" end-to-end recap for /unqualified-lead-lists. Five connected
// steps laid out as a bento grid (two wide cards on top, three on the bottom),
// each a numbered step with a product label, a step pill, copy, and a small mock
// of what that step looks like in the product. Purely presentational; entrance is
// the global data-reveal engine, so no client boundary is needed.

const STEPS = [
  {
    num: 1,
    label: 'Zeus',
    step: 'step 1 · find the right people',
    title: 'Pull decision-makers with real authority',
    body:
      'Instead of a title filter that returns anyone, Zeus finds the verified decision-maker who actually owns the budget at each target company, so the list starts with people who can say yes, not just names that matched a search.',
    visual: 'capture',
  },
  {
    num: 2,
    label: 'Verifyrit',
    step: 'step 2 · validate every contact',
    title: 'Confirm every contact is real and reachable',
    body:
      'Each address is validated before it ever reaches a rep, the dead inboxes, role accounts, and people who left are stripped out, so no time is lost on contacts that were never going to respond in the first place.',
    visual: 'inbox',
  },
  {
    num: 3,
    label: 'NeoBrain AI',
    step: 'step 3',
    title: 'Score real fit, not filter matches',
    body:
      'NeoBrain AI reads what each company actually does and scores whether your product solves a problem they really have, turning a matched filter into a fit score that reflects who needs you.',
    visual: 'score',
  },
  {
    num: 4,
    label: 'NeoBrain AI',
    step: 'step 4',
    title: 'Score live buying intent',
    body:
      'Hiring, site visits, and research activity are read in real time and rolled into an intent score, so the contacts who are in-market right now rise above the ones who simply look similar on paper.',
    visual: 'sync',
  },
  {
    num: 5,
    label: 'Ranked List',
    step: 'step 5',
    title: 'Reps work only the qualified 27%',
    body:
      'The result is a ranked shortlist, fit-checked, authority-verified, and sorted by intent, so reps spend their day on the names actually worth working instead of qualifying out the 73% that never were.',
    visual: 'forecast',
  },
];

export default function UnqualifiedLeadListsFullFix() {
  return (
    <section className="ull-fix">
      <div className="container">
        <div className="ull-fix-head" data-reveal-stagger="100">
          <span className="ull-fix-eyebrow" data-reveal>The Full Fix</span>
          <h2 data-reveal>
            How NeoLeads Turns a 1,000-Name List<br />
            Into the 270 Worth Working
          </h2>
          <p data-reveal>
            From the raw import to the ranked shortlist on a rep&rsquo;s screen, five connected steps that
            verify authority, score fit and intent, and surface only the contacts actually worth a
            rep&rsquo;s time.
          </p>
        </div>

        <div className="ull-fix-grid" data-reveal-stagger="110">
          {STEPS.map((s) => (
            <article className={`ull-fix-card span-${s.num <= 2 ? 3 : 2}`} key={s.num} data-reveal>
              <div className="ull-fix-card-head">
                <span className="ull-fix-num">{s.num}</span>
                <span className="ull-fix-label">{s.label}</span>
                <span className="ull-fix-step">{s.step}</span>
              </div>
              <h3 className="ull-fix-title">{s.title}</h3>
              <p className="ull-fix-body">{s.body}</p>
              <FixVisual kind={s.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FixVisual({ kind }) {
  if (kind === 'capture') {
    return (
      <div className="ull-fix-vis">
        <div className="ull-fix-rep">
          <span className="ull-fix-dot green" aria-hidden="true" />
          <span className="ull-fix-rep-text">Acme Corp · VP Revenue</span>
          <span className="ull-fix-rep-time">owns budget</span>
        </div>
        <div className="ull-fix-rep">
          <span className="ull-fix-dot green" aria-hidden="true" />
          <span className="ull-fix-rep-text">Vertex AI · Head of Growth</span>
          <span className="ull-fix-rep-time">verified</span>
        </div>
      </div>
    );
  }

  if (kind === 'inbox') {
    return (
      <div className="ull-fix-vis">
        <div className="ull-fix-letters">
          {['A', 'B', 'C', 'D', 'E'].map((c) => (
            <span className="ull-fix-letter" key={c}>{c}</span>
          ))}
        </div>
        <div className="ull-fix-unibox">
          <span className="ull-fix-unibox-ic" aria-hidden="true"><Icon name="badge-check" /></span>
          <div className="ull-fix-unibox-text">
            <span className="ull-fix-unibox-name">Validated → clean</span>
            <span className="ull-fix-unibox-sub">1,000 checked · 60 bad removed</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'score') {
    const rows = [
      { dot: 'green', name: 'Acme Corp', tag: 'Fit 94', tone: 'green' },
      { dot: 'amber', name: 'Stackline', tag: 'Fit 68', tone: 'amber' },
      { dot: 'blue', name: 'Initech', tag: 'Fit 19', tone: 'muted' },
    ];
    return (
      <div className="ull-fix-vis">
        {rows.map((r) => (
          <div className="ull-fix-rep" key={r.name}>
            <span className={`ull-fix-dot ${r.dot}`} aria-hidden="true" />
            <span className="ull-fix-rep-text">{r.name}</span>
            <span className={`ull-fix-tag ${r.tone}`}>{r.tag}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === 'sync') {
    return (
      <div className="ull-fix-vis">
        <div className="ull-fix-detect">
          <span className="ull-fix-detect-ic" aria-hidden="true"><Icon name="radar" /></span>
          <span className="ull-fix-detect-text">Hiring · pricing visits · research</span>
          <span className="ull-fix-detect-time">in-market</span>
        </div>
        <div className="ull-fix-paused">
          <span className="ull-fix-paused-ic" aria-hidden="true"><Icon name="eye-off" /></span>
          <span className="ull-fix-paused-text">Guessing who’s ready</span>
          <span className="ull-fix-paused-tag">Removed</span>
        </div>
      </div>
    );
  }

  // forecast
  return (
    <div className="ull-fix-vis">
      <div className="ull-fix-qrow">
        <div className="ull-fix-qwho">
          <span className="ull-fix-qname">Ranked shortlist</span>
          <span className="ull-fix-qintent">
            <span className="ull-fix-dot green" aria-hidden="true" />
            270 qualified
          </span>
        </div>
        <span className="ull-fix-qtimer">Top 27%</span>
      </div>
      <span className="ull-fix-book">
        Reps work only the names worth working <Icon name="arrow-right" aria-hidden="true" />
      </span>
    </div>
  );
}
