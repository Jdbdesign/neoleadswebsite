import Icon from './Icon';

// "One Pipeline. Every Signal." solution section for /no-pipeline-visibility.
// Addresses root causes 1 + 2 (disconnected tools + manual logging): copy on the
// left, a static NeoLeads live-pipeline mockup on the right. Purely
// presentational — entrance handled by the global data-reveal engine
// (ClientScripts), so no client boundary is needed here.

const FEATURES = [
  {
    icon: 'unplug',
    title: 'Every Tool, One Connected View',
    body:
      'The lead source, Sendrit sequences, Snaarpmail replies, and Kalender bookings all write to the same pipeline. No reconciling four dashboards that each report a different number, every signal lands in one place, already in sync.',
  },
  {
    icon: 'zap',
    title: 'Activity Captured, Not Typed In',
    body:
      'Sends, opens, replies, intent labels, and booked meetings are logged the instant they happen. The pipeline reflects what actually occurred, not what a busy rep remembered to enter, so the forecast stops depending on anyone’s memory.',
  },
];

// Right-card stage filters. `all` is the active/purple state; the rest carry the
// tone of the pipeline stage they represent.
const TABS = [
  { label: 'All', n: 47, tone: 'all' },
  { label: 'Warming', n: 12, tone: 'green' },
  { label: 'Engaged', n: 9, tone: 'amber' },
  { label: 'Stalled', n: 14, tone: 'muted' },
  { label: 'Cold', n: 12, tone: 'muted' },
];

// Deals already sorted by live engagement: two warming (green), one engaged
// (amber), one stalled (muted). Each shows the auto-captured signal trail.
const DEALS = [
  {
    dot: 'green',
    name: 'Acme Corp',
    value: '$48K',
    signal: 'Opened 5× · replied 2× · call booked',
    source: 'Sendrit + Kalender',
    score: '88',
  },
  {
    dot: 'green',
    name: 'Vertex AI',
    value: '$32K',
    signal: 'Opened 6× · replied this morning',
    source: 'Snaarpmail',
    score: '84',
  },
  {
    dot: 'amber',
    name: 'Stackline',
    value: '$21K',
    signal: 'Replied once, then went quiet',
    source: 'Snaarpmail',
    score: '54',
  },
  {
    dot: 'muted',
    name: 'Orion Health',
    value: '$15K',
    signal: 'No opens in 9 days',
    source: 'Sendrit',
    score: '21',
  },
];

export default function NoPipelineVisibilitySolution() {
  return (
    <section className="npv-sol">
      <div className="container">
        <div className="npv-sol-layout">

          {/* ---------- copy ---------- */}
          <div className="npv-sol-copy" data-reveal-stagger="100">
            <span className="npv-sol-eyebrow" data-reveal>
              Root Cause 1 + 2 &middot; Disconnected Tools &amp; Manual Logging
            </span>
            <h2 data-reveal>
              One Pipeline. Every Signal.<br />
              Updated Before You Open It.
            </h2>
            <p className="npv-sol-lead" data-reveal>
              The fastest way to lose visibility isn&rsquo;t bad data, it&rsquo;s data that never gets
              connected. NeoLeads pulls signals from every active Sendrit campaign, every Snaarpmail
              reply, and every Kalender booking into a single live pipeline, capturing each one
              automatically, so the view is already current and complete before a rep touches a single
              field.
            </p>

            <div className="npv-sol-features">
              {FEATURES.map((f) => (
                <div className="npv-sol-feature" key={f.title} data-reveal>
                  <span className="npv-sol-feature-ic" aria-hidden="true">
                    <Icon name={f.icon} />
                  </span>
                  <div className="npv-sol-feature-text">
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- live-pipeline mockup ---------- */}
          <div className="npv-sol-visual" data-reveal>
            <article className="npv-sol-inbox">
              <div className="npv-sol-inbox-head">
                <span className="npv-sol-inbox-title">NeoLeads &mdash; Live Pipeline</span>
                <span className="npv-sol-inbox-pill">4 tools synced</span>
              </div>

              <div className="npv-sol-tabs" role="tablist" aria-label="Deals by engagement">
                {TABS.map((t) => (
                  <span
                    key={t.label}
                    className={`npv-sol-tab ${t.tone}`}
                    role="tab"
                    aria-selected={t.tone === 'all'}
                  >
                    {t.label} <b>{t.n}</b>
                  </span>
                ))}
              </div>

              <div className="npv-sol-list">
                {DEALS.map((d) => (
                  <div className="npv-sol-row" key={d.name}>
                    <span className={`npv-sol-row-dot ${d.dot}`} aria-hidden="true" />
                    <div className="npv-sol-row-main">
                      <div className="npv-sol-row-top">
                        <span className="npv-sol-row-name">{d.name}</span>
                        <span className="npv-sol-row-org">{d.value}</span>
                        <span className="npv-sol-row-time">{d.score}</span>
                      </div>
                      <p className="npv-sol-row-quote">{d.signal}</p>
                      <p className="npv-sol-row-camp">Auto-logged: {d.source}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="npv-sol-foot">
                <span className="npv-sol-foot-hot">
                  <span className="npv-sol-foot-dot" aria-hidden="true" />
                  $80K warming, ready to action
                </span>
                <span className="npv-sol-foot-avg">Forecast confidence: 96%</span>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
