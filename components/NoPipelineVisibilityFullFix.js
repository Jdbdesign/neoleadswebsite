import Icon from './Icon';

// "The full fix" end-to-end recap for /no-pipeline-visibility. Five connected
// steps laid out as a bento grid (two wide cards on top, three on the bottom),
// each a numbered step with a product label, a step pill, copy, and a small mock
// of what that step looks like in the product. Purely presentational; entrance is
// the global data-reveal engine, so no client boundary is needed.

const STEPS = [
  {
    num: 1,
    label: 'Sendrit',
    step: 'step 1 · activity happens',
    title: 'Every outreach action is captured',
    body:
      'Each send, open, and click across every active campaign is recorded the instant it happens, no rep ever opens the CRM to log it. The raw activity that pipeline is built on starts complete instead of half-remembered.',
    visual: 'capture',
  },
  {
    num: 2,
    label: 'Snaarpmail',
    step: 'step 2 · replies flow in',
    title: 'Every reply flows into the pipeline',
    body:
      'Replies from every campaign land in the unified inbox and write straight to the matching deal, tagged and timestamped, so the conversation and the opportunity are never two disconnected records again.',
    visual: 'inbox',
  },
  {
    num: 3,
    label: 'NeoBrain AI',
    step: 'step 3',
    title: 'Engagement is scored in real time',
    body:
      'NeoBrain AI reads the captured signals and assigns each deal a live engagement score, warming, engaged, stalled, or cold, so the pipeline shows temperature, not a stage someone set weeks ago.',
    visual: 'score',
  },
  {
    num: 4,
    label: 'Auto-Sync',
    step: 'step 4',
    title: 'Every signal writes to one record',
    body:
      'Sends, replies, bookings, and scores all write back to a single source of truth automatically, so the four tools that used to disagree now report the exact same number.',
    visual: 'sync',
  },
  {
    num: 5,
    label: 'Unified Dashboard',
    step: 'step 5',
    title: 'One live pipeline everyone trusts',
    body:
      'The result is a single live view, the same forecast for the rep, the manager, and the board, current to the second and accurate because nothing was left to manual entry.',
    visual: 'forecast',
  },
];

export default function NoPipelineVisibilityFullFix() {
  return (
    <section className="npv-fix">
      <div className="container">
        <div className="npv-fix-head" data-reveal-stagger="100">
          <span className="npv-fix-eyebrow" data-reveal>The Full Fix</span>
          <h2 data-reveal>
            How NeoLeads Turns Four Blind Spots<br />
            Into One Live Pipeline
          </h2>
          <p data-reveal>
            From the first email sent to the forecast on the board&rsquo;s screen, five connected steps
            that capture every signal automatically and roll it up into a number you can actually trust.
          </p>
        </div>

        <div className="npv-fix-grid" data-reveal-stagger="110">
          {STEPS.map((s) => (
            <article className={`npv-fix-card span-${s.num <= 2 ? 3 : 2}`} key={s.num} data-reveal>
              <div className="npv-fix-card-head">
                <span className="npv-fix-num">{s.num}</span>
                <span className="npv-fix-label">{s.label}</span>
                <span className="npv-fix-step">{s.step}</span>
              </div>
              <h3 className="npv-fix-title">{s.title}</h3>
              <p className="npv-fix-body">{s.body}</p>
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
      <div className="npv-fix-vis">
        <div className="npv-fix-rep">
          <span className="npv-fix-dot green" aria-hidden="true" />
          <span className="npv-fix-rep-text">Acme Corp · email opened 5×</span>
          <span className="npv-fix-rep-time">now</span>
        </div>
        <div className="npv-fix-rep">
          <span className="npv-fix-dot green" aria-hidden="true" />
          <span className="npv-fix-rep-text">Vertex AI · link clicked</span>
          <span className="npv-fix-rep-time">8m</span>
        </div>
      </div>
    );
  }

  if (kind === 'inbox') {
    return (
      <div className="npv-fix-vis">
        <div className="npv-fix-letters">
          {['A', 'B', 'C', 'D', 'E'].map((c) => (
            <span className="npv-fix-letter" key={c}>{c}</span>
          ))}
        </div>
        <div className="npv-fix-unibox">
          <span className="npv-fix-unibox-ic" aria-hidden="true"><Icon name="mail" /></span>
          <div className="npv-fix-unibox-text">
            <span className="npv-fix-unibox-name">Reply → deal</span>
            <span className="npv-fix-unibox-sub">47 replies · linked to records</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'score') {
    const rows = [
      { dot: 'green', name: 'Acme Corp', tag: 'Warming 88', tone: 'green' },
      { dot: 'amber', name: 'Stackline', tag: 'Engaged 54', tone: 'amber' },
      { dot: 'blue', name: 'Orion Health', tag: 'Cold 21', tone: 'muted' },
    ];
    return (
      <div className="npv-fix-vis">
        {rows.map((r) => (
          <div className="npv-fix-rep" key={r.name}>
            <span className={`npv-fix-dot ${r.dot}`} aria-hidden="true" />
            <span className="npv-fix-rep-text">{r.name}</span>
            <span className={`npv-fix-tag ${r.tone}`}>{r.tag}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === 'sync') {
    return (
      <div className="npv-fix-vis">
        <div className="npv-fix-detect">
          <span className="npv-fix-detect-ic" aria-hidden="true"><Icon name="check" /></span>
          <span className="npv-fix-detect-text">4 tools writing to 1 record</span>
          <span className="npv-fix-detect-time">in sync</span>
        </div>
        <div className="npv-fix-paused">
          <span className="npv-fix-paused-ic" aria-hidden="true"><Icon name="pencil-off" /></span>
          <span className="npv-fix-paused-text">Manual data entry</span>
          <span className="npv-fix-paused-tag">Removed</span>
        </div>
      </div>
    );
  }

  // forecast
  return (
    <div className="npv-fix-vis">
      <div className="npv-fix-qrow">
        <div className="npv-fix-qwho">
          <span className="npv-fix-qname">Q4 Forecast</span>
          <span className="npv-fix-qintent">
            <span className="npv-fix-dot green" aria-hidden="true" />
            96% confidence
          </span>
        </div>
        <span className="npv-fix-qtimer">$412K</span>
      </div>
      <span className="npv-fix-book">
        One number, everyone agrees <Icon name="arrow-right" aria-hidden="true" />
      </span>
    </div>
  );
}
