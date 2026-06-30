import Icon from './Icon';

// "The full fix" end-to-end recap for /missed-hot-replies. Five connected steps
// laid out as a bento grid (two wide cards on top, three on the bottom), each a
// numbered step with a product label, a step pill, copy, and a small mock of
// what that step looks like in the product. Purely presentational; entrance is
// the global data-reveal engine, so no client boundary is needed.

const STEPS = [
  {
    num: 1,
    label: 'Sendrit',
    step: 'step 1 · a reply arrives',
    title: 'A reply arrives from any active campaign',
    body:
      'Whether the reply comes from an email, a LinkedIn message, or a call follow-up, Sendrit captures it the instant it lands, across every active campaign your team is running.',
    visual: 'arrives',
  },
  {
    num: 2,
    label: 'Snaarpmail',
    step: 'step 2 · one inbox',
    title: 'Every reply lands in one inbox',
    body:
      'No matter which of the five active campaigns generated it, the reply appears in the same unified Snaarpmail inbox, tagged with its source campaign, with zero inbox-hopping required to find it.',
    visual: 'inbox',
  },
  {
    num: 3,
    label: 'NeoBrain AI',
    step: 'step 3',
    title: 'Intent is classified instantly',
    body:
      'NeoBrain AI reads the reply and labels it Interested, Soft Objection, Not Now, or Referral within seconds of arrival. High-intent replies surface at the top of the inbox automatically, no manual triage required.',
    visual: 'intent',
  },
  {
    num: 4,
    label: 'Sendrit',
    step: 'step 4',
    title: 'The sequence stops immediately',
    body:
      'The moment a reply is detected, that contact’s active sequence is paused automatically, no scheduled follow-up email or LinkedIn touch goes out after a human has already responded.',
    visual: 'pause',
  },
  {
    num: 5,
    label: 'Snaarpmail + Kalender',
    step: 'step 5',
    title: 'Response happens in minutes, not days',
    body:
      'The meeting-ready queue surfaces high-intent replies with a live response-time clock, and one-click booking via Kalender turns a hot reply into a scheduled meeting before the qualification window closes.',
    visual: 'book',
  },
];

export default function MissedHotRepliesFullFix() {
  return (
    <section className="mhr-fix">
      <div className="container">
        <div className="mhr-fix-head" data-reveal-stagger="100">
          <span className="mhr-fix-eyebrow" data-reveal>The Full Fix</span>
          <h2 data-reveal>
            How NeoLeads Closes the Speed-to-Lead<br />
            Gap End to End
          </h2>
          <p data-reveal>
            From the moment a reply lands to the moment a meeting is booked, five connected steps that
            collapse the average 42-hour response time toward minutes, automatically.
          </p>
        </div>

        <div className="mhr-fix-grid" data-reveal-stagger="110">
          {STEPS.map((s) => (
            <article className={`mhr-fix-card span-${s.num <= 2 ? 3 : 2}`} key={s.num} data-reveal>
              <div className="mhr-fix-card-head">
                <span className="mhr-fix-num">{s.num}</span>
                <span className="mhr-fix-label">{s.label}</span>
                <span className="mhr-fix-step">{s.step}</span>
              </div>
              <h3 className="mhr-fix-title">{s.title}</h3>
              <p className="mhr-fix-body">{s.body}</p>
              <FixVisual kind={s.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FixVisual({ kind }) {
  if (kind === 'arrives') {
    return (
      <div className="mhr-fix-vis">
        <div className="mhr-fix-rep">
          <span className="mhr-fix-dot green" aria-hidden="true" />
          <span className="mhr-fix-rep-text">Marcus T. replied &middot; Q4 SaaS</span>
          <span className="mhr-fix-rep-time">now</span>
        </div>
        <div className="mhr-fix-rep">
          <span className="mhr-fix-dot green" aria-hidden="true" />
          <span className="mhr-fix-rep-text">Priya N. replied &middot; Series B</span>
          <span className="mhr-fix-rep-time">8m</span>
        </div>
      </div>
    );
  }

  if (kind === 'inbox') {
    return (
      <div className="mhr-fix-vis">
        <div className="mhr-fix-letters">
          {['A', 'B', 'C', 'D', 'E'].map((c) => (
            <span className="mhr-fix-letter" key={c}>{c}</span>
          ))}
        </div>
        <div className="mhr-fix-unibox">
          <span className="mhr-fix-unibox-ic" aria-hidden="true"><Icon name="mail" /></span>
          <div className="mhr-fix-unibox-text">
            <span className="mhr-fix-unibox-name">Unified inbox</span>
            <span className="mhr-fix-unibox-sub">47 replies &middot; all 5 campaigns</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'intent') {
    const rows = [
      { dot: 'green', name: 'Marcus T.', tag: 'Interested', tone: 'green' },
      { dot: 'amber', name: 'David O.', tag: 'Objection', tone: 'amber' },
      { dot: 'blue', name: 'Chen W.', tag: 'Not Now', tone: 'muted' },
    ];
    return (
      <div className="mhr-fix-vis">
        {rows.map((r) => (
          <div className="mhr-fix-rep" key={r.name}>
            <span className={`mhr-fix-dot ${r.dot}`} aria-hidden="true" />
            <span className="mhr-fix-rep-text">{r.name}</span>
            <span className={`mhr-fix-tag ${r.tone}`}>{r.tag}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === 'pause') {
    return (
      <div className="mhr-fix-vis">
        <div className="mhr-fix-detect">
          <span className="mhr-fix-detect-ic" aria-hidden="true"><Icon name="check" /></span>
          <span className="mhr-fix-detect-text">Reply detected</span>
          <span className="mhr-fix-detect-time">just now</span>
        </div>
        <div className="mhr-fix-paused">
          <span className="mhr-fix-paused-ic" aria-hidden="true"><Icon name="pause" /></span>
          <span className="mhr-fix-paused-text">Step 3 &middot; in 2 days</span>
          <span className="mhr-fix-paused-tag">Paused</span>
        </div>
      </div>
    );
  }

  // book
  return (
    <div className="mhr-fix-vis">
      <div className="mhr-fix-qrow">
        <div className="mhr-fix-qwho">
          <span className="mhr-fix-qname">Marcus T.</span>
          <span className="mhr-fix-qintent">
            <span className="mhr-fix-dot green" aria-hidden="true" />
            Interested
          </span>
        </div>
        <span className="mhr-fix-qtimer">4:12</span>
      </div>
      <span className="mhr-fix-book">
        Book via Kalender <Icon name="arrow-right" aria-hidden="true" />
      </span>
    </div>
  );
}
