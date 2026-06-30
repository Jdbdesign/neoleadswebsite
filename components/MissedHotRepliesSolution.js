import Icon from './Icon';

// "One Inbox. Every Campaign." solution section for /missed-hot-replies.
// Addresses root causes 1 + 2 (inbox sprawl + no intent signal): copy on the
// left, a static Snaarpmail unified-inbox mockup on the right. Purely
// presentational — entrance handled by the global data-reveal engine
// (ClientScripts), so no client boundary is needed here.

const FEATURES = [
  {
    icon: 'mail',
    title: 'Every Reply, One Stream',
    body:
      'No more checking five different sending accounts to find out which campaign got a response. Every reply from every active campaign lands in the same Snaarpmail inbox, tagged with the originating campaign so context is never lost.',
  },
  {
    icon: 'sliders-horizontal',
    title: 'Intent, Classified on Arrival',
    body:
      'NeoBrain AI reads each reply and labels it Interested, Soft Objection, Not Now, Referral, or Unsubscribe the instant it lands. The rep opens the inbox and sees the highest-priority conversations at the top, not whichever email happened to arrive first.',
  },
];

// Right-card filter tabs. `all` is the active/purple state; the rest carry the
// tone of the intent class they represent.
const TABS = [
  { label: 'All', n: 47, tone: 'all' },
  { label: 'Interested', n: 6, tone: 'green' },
  { label: 'Objection', n: 9, tone: 'amber' },
  { label: 'Not Now', n: 14, tone: 'muted' },
  { label: 'Other', n: 18, tone: 'muted' },
];

// Replies already sorted by urgency: two hot (green), one soft objection
// (amber), one cold (muted).
const REPLIES = [
  {
    dot: 'green',
    name: 'Marcus T.',
    org: 'Acme Corp',
    quote: '“This is great timing, let’s talk”',
    campaign: 'Q4 SaaS',
    time: '4 mins',
  },
  {
    dot: 'green',
    name: 'Priya N.',
    org: 'Vertex AI',
    quote: '“Yes, happy to jump on a call this week”',
    campaign: 'Series B Follow-Up',
    time: '12 mins',
  },
  {
    dot: 'amber',
    name: 'David O.',
    org: 'Stackline',
    quote: '“We’re locked in until Q1, but…”',
    campaign: 'Agency Outreach',
    time: '1 hr',
  },
  {
    dot: 'muted',
    name: 'Chen W.',
    org: 'Orion Health',
    quote: '“Not the right time, check back in 6 months”',
    campaign: 'EMEA Expansion',
    time: '3 hrs',
  },
];

export default function MissedHotRepliesSolution() {
  return (
    <section className="mhr-sol">
      <div className="container">
        <div className="mhr-sol-layout">

          {/* ---------- copy ---------- */}
          <div className="mhr-sol-copy" data-reveal-stagger="100">
            <span className="mhr-sol-eyebrow" data-reveal>
              Root Cause 1 + 2 &middot; Inbox Sprawl &amp; No Intent Signal
            </span>
            <h2 data-reveal>
              One Inbox. Every Campaign.<br />
              Sorted Before You Open It.
            </h2>
            <p className="mhr-sol-lead" data-reveal>
              The fastest way to miss a hot reply isn&rsquo;t being slow, it&rsquo;s not seeing it in
              time among everything else. Snaarpmail pulls replies from every active Sendrit campaign
              into a single view, and NeoBrain AI reads each one the moment it arrives and classifies
              it by intent, so the inbox is already sorted by urgency before a human opens a single
              message.
            </p>

            <div className="mhr-sol-features">
              {FEATURES.map((f) => (
                <div className="mhr-sol-feature" key={f.title} data-reveal>
                  <span className="mhr-sol-feature-ic" aria-hidden="true">
                    <Icon name={f.icon} />
                  </span>
                  <div className="mhr-sol-feature-text">
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- unified-inbox mockup ---------- */}
          <div className="mhr-sol-visual" data-reveal>
            <article className="mhr-sol-inbox">
              <div className="mhr-sol-inbox-head">
                <span className="mhr-sol-inbox-title">Snaarpmail &mdash; All Replies</span>
                <span className="mhr-sol-inbox-pill">5 campaigns</span>
              </div>

              <div className="mhr-sol-tabs" role="tablist" aria-label="Replies by intent">
                {TABS.map((t) => (
                  <span
                    key={t.label}
                    className={`mhr-sol-tab ${t.tone}`}
                    role="tab"
                    aria-selected={t.tone === 'all'}
                  >
                    {t.label} <b>{t.n}</b>
                  </span>
                ))}
              </div>

              <div className="mhr-sol-list">
                {REPLIES.map((r) => (
                  <div className="mhr-sol-row" key={r.name}>
                    <span className={`mhr-sol-row-dot ${r.dot}`} aria-hidden="true" />
                    <div className="mhr-sol-row-main">
                      <div className="mhr-sol-row-top">
                        <span className="mhr-sol-row-name">{r.name}</span>
                        <span className="mhr-sol-row-org">{r.org}</span>
                        <span className="mhr-sol-row-time">{r.time}</span>
                      </div>
                      <p className="mhr-sol-row-quote">{r.quote}</p>
                      <p className="mhr-sol-row-camp">Campaign: {r.campaign}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mhr-sol-foot">
                <span className="mhr-sol-foot-hot">
                  <span className="mhr-sol-foot-dot" aria-hidden="true" />
                  2 high-intent replies waiting
                </span>
                <span className="mhr-sol-foot-avg">Avg response today: 6 mins</span>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
