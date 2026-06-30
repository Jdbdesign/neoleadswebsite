import Icon from './Icon';

// "Every Contact Scored by Fit and Intent." solution section for
// /unqualified-lead-lists. Addresses root causes 1 + 2 (filters-not-fit + no
// authority check): copy on the left, a static NeoBrain AI scored-list mockup on
// the right. Purely presentational — entrance handled by the global data-reveal
// engine (ClientScripts), so no client boundary is needed here.

const FEATURES = [
  {
    icon: 'target',
    title: 'Fit Scored on Every Company',
    body:
      'NeoBrain AI looks past the filter columns at what a company actually does and how it operates, then scores whether your product solves a problem they really have. A title match becomes a fit score, so the list reflects who needs you, not who looked the part.',
  },
  {
    icon: 'user-check',
    title: 'Authority Verified, Contacts Validated',
    body:
      'Zeus pulls the decision-maker with the right authority and Verifyrit confirms the address is real and reachable, so the person on the list can actually say yes. No more weeks spent nurturing a contact who could never sign off.',
  },
];

// Right-card tier filters. `all` is the active/purple state; the rest carry the
// tone of the qualification tier they represent.
const TABS = [
  { label: 'All', n: 270, tone: 'all' },
  { label: 'Ready', n: 41, tone: 'green' },
  { label: 'Warming', n: 73, tone: 'amber' },
  { label: 'Researching', n: 96, tone: 'muted' },
  { label: 'Low fit', n: 60, tone: 'muted' },
];

// Contacts already ranked by fit + intent: two ready (green), one warming
// (amber), one low-fit/cut (muted). Each shows the signal behind the score.
const DEALS = [
  {
    dot: 'green',
    name: 'Acme Corp',
    value: 'Fit 94',
    signal: 'Hiring · pricing visits · decision-maker verified',
    source: 'NeoBrain AI + Zeus',
    score: '94',
  },
  {
    dot: 'green',
    name: 'Vertex AI',
    value: 'Fit 91',
    signal: 'Strong fit · research spike this week',
    source: 'NeoBrain AI',
    score: '91',
  },
  {
    dot: 'amber',
    name: 'Stackline',
    value: 'Fit 68',
    signal: 'Good fit · early signals, not in-market yet',
    source: 'NeoBrain AI',
    score: '68',
  },
  {
    dot: 'muted',
    name: 'Initech',
    value: 'Fit 19',
    signal: 'Wrong fit · already built it in-house',
    source: 'Filtered out',
    score: '19',
  },
];

export default function UnqualifiedLeadListsSolution() {
  return (
    <section className="ull-sol">
      <div className="container">
        <div className="ull-sol-layout">

          {/* ---------- copy ---------- */}
          <div className="ull-sol-copy" data-reveal-stagger="100">
            <span className="ull-sol-eyebrow" data-reveal>
              Root Cause 1 + 2 &middot; Filters Not Fit &amp; No Authority Check
            </span>
            <h2 data-reveal>
              Every Contact Scored by Fit and Intent.<br />
              Ranked Before a Rep Sees It.
            </h2>
            <p className="ull-sol-lead" data-reveal>
              The fastest way to a list full of wrong-fit names isn&rsquo;t bad data, it&rsquo;s a list
              built from filters that never asked whether the company is a buyer. NeoBrain AI scores every
              contact on real fit and live intent, while Zeus and Verifyrit confirm the person has the
              authority to buy and is reachable, so the list is already sorted by who&rsquo;s worth working
              before a rep opens it.
            </p>

            <div className="ull-sol-features">
              {FEATURES.map((f) => (
                <div className="ull-sol-feature" key={f.title} data-reveal>
                  <span className="ull-sol-feature-ic" aria-hidden="true">
                    <Icon name={f.icon} />
                  </span>
                  <div className="ull-sol-feature-text">
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- scored-list mockup ---------- */}
          <div className="ull-sol-visual" data-reveal>
            <article className="ull-sol-inbox">
              <div className="ull-sol-inbox-head">
                <span className="ull-sol-inbox-title">NeoBrain AI &mdash; Scored List</span>
                <span className="ull-sol-inbox-pill">270 of 1,000 qualified</span>
              </div>

              <div className="ull-sol-tabs" role="tablist" aria-label="Contacts by qualification tier">
                {TABS.map((t) => (
                  <span
                    key={t.label}
                    className={`ull-sol-tab ${t.tone}`}
                    role="tab"
                    aria-selected={t.tone === 'all'}
                  >
                    {t.label} <b>{t.n}</b>
                  </span>
                ))}
              </div>

              <div className="ull-sol-list">
                {DEALS.map((d) => (
                  <div className="ull-sol-row" key={d.name}>
                    <span className={`ull-sol-row-dot ${d.dot}`} aria-hidden="true" />
                    <div className="ull-sol-row-main">
                      <div className="ull-sol-row-top">
                        <span className="ull-sol-row-name">{d.name}</span>
                        <span className="ull-sol-row-org">{d.value}</span>
                        <span className="ull-sol-row-time">{d.score}</span>
                      </div>
                      <p className="ull-sol-row-quote">{d.signal}</p>
                      <p className="ull-sol-row-camp">Scored by: {d.source}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ull-sol-foot">
                <span className="ull-sol-foot-hot">
                  <span className="ull-sol-foot-dot" aria-hidden="true" />
                  41 ready to buy, ranked to the top
                </span>
                <span className="ull-sol-foot-avg">73% never reaches a rep</span>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
