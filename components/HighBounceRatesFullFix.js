import Icon from './Icon';

// "The Full Fix" section for /high-bounce-rates - the closing summary that ties
// the five products together into one pipeline. Two wide cards on top (Zeus,
// Verifyrit) and three on the bottom (Warmrit, Sendrit, Snaarpmail), each with
// a numbered badge, a "problem layer" tag, copy, and a mini-visual.
//
// Presentational only: no client interactivity. Cards fade in via the global
// [data-reveal] / [data-reveal-stagger] helpers driven by ClientScripts.

// Reputation segments for the Warmrit card (decorative): score 98 of 100.
const REP_SEGMENTS = Array.from({ length: 14 }, (_, i) => i < 12);

export default function HighBounceRatesFullFix() {
  return (
    <section className="hbr-fix">
      <div className="container">
        <div className="hbr-fix-head" data-reveal-stagger="100">
          <span className="hbr-fix-eyebrow" data-reveal>The Full Fix</span>
          <h2 data-reveal>
            How NeoLeads Keeps Bounce Rates Under 1%:<br />
            Campaign After Campaign
          </h2>
          <p data-reveal>
            Five connected products, each eliminating one layer of the bounce rate problem, from
            the data source through to post-campaign reputation monitoring, so the fix is permanent,
            not a one-off clean.
          </p>
        </div>

        <div className="hbr-fix-grid" data-reveal-stagger="110">

          {/* ---------- 1 · Zeus ---------- */}
          <article className="hbr-fix-card is-wide" data-reveal>
            <div className="hbr-fix-card-head">
              <span className="hbr-fix-num">1</span>
              <span className="hbr-fix-name">Zeus</span>
              <span className="hbr-fix-tag">step 1 · fresher data</span>
            </div>
            <h3 className="hbr-fix-card-title">Start with fresher data</h3>
            <p className="hbr-fix-card-desc">
              Zeus surfaces contacts from a continuously refreshed database, not a static export
              that&rsquo;s already decaying the day it&rsquo;s pulled. Fewer stale addresses at
              source means fewer bounces before Verifyrit even runs its checks.
            </p>

            <div className="hbr-fix-visual">
              <div className="hbr-fix-search">
                <Icon name="search" aria-hidden="true" />
                <span className="hbr-fix-search-q">VP Sales · Series B SaaS · hiring SDRs</span>
                <span className="hbr-fix-search-n">47</span>
              </div>
              <div className="hbr-fix-lead">
                <span className="hbr-fix-av">MT</span>
                <span className="hbr-fix-lead-name">Marcus T. · Raised $18M</span>
                <span className="hbr-fix-lead-n">94</span>
              </div>
              <div className="hbr-fix-lead">
                <span className="hbr-fix-av alt">PN</span>
                <span className="hbr-fix-lead-name">Priya N. · New CRO hired</span>
                <span className="hbr-fix-lead-n">88</span>
              </div>
            </div>
          </article>

          {/* ---------- 2 · Verifyrit ---------- */}
          <article className="hbr-fix-card is-wide" data-reveal>
            <div className="hbr-fix-card-head">
              <span className="hbr-fix-num">2</span>
              <span className="hbr-fix-name">Verifyrit</span>
              <span className="hbr-fix-tag">gates · every send</span>
            </div>
            <h3 className="hbr-fix-card-title">Gate every campaign with 7-layer validation</h3>
            <p className="hbr-fix-card-desc">
              Every contact entering a Sendrit campaign passes through the full stack: syntax, domain
              health, MX records, SMTP, catch-all resolution, spam trap detection, and disposable
              filtering. Not once on import. Before every send. Invalid, risky, and
              catch-all-unresolved addresses are removed before a sequence fires.
            </p>

            <div className="hbr-fix-visual">
              <div className="hbr-fix-gate-top">
                <span className="hbr-fix-gate-label">Pre-Campaign Gate</span>
                <span className="hbr-fix-gate-count"><b>934</b>/1,000</span>
              </div>
              <div className="hbr-fix-gate-bar">
                <span style={{ width: '93.4%' }} />
              </div>
              <div className="hbr-fix-gate-stats">
                <div className="hbr-fix-gate-stat red">
                  <b>41</b>
                  <span>invalid</span>
                </div>
                <div className="hbr-fix-gate-stat red">
                  <b>12</b>
                  <span>spam traps</span>
                </div>
                <div className="hbr-fix-gate-stat">
                  <b>0.3%</b>
                  <span>forecast</span>
                </div>
              </div>
            </div>
          </article>

          {/* ---------- 3 · Warmrit ---------- */}
          <article className="hbr-fix-card" data-reveal>
            <div className="hbr-fix-card-head">
              <span className="hbr-fix-num">3</span>
              <span className="hbr-fix-name">Warmrit</span>
              <span className="hbr-fix-tag">weak reputation</span>
            </div>
            <h3 className="hbr-fix-card-title">Send from a domain that can absorb imperfection</h3>
            <p className="hbr-fix-card-desc">
              A domain with strong reputation can absorb a few unexpected bounces without lasting
              damage. Warmrit holds every sending domain at healthy status, and activates Recovery
              Mode automatically if bounce signals spike, rebuilding ISP trust before the spiral
              compounds.
            </p>

            <div className="hbr-fix-visual">
              <div className="hbr-fix-rep-top">
                <span className="hbr-fix-rep-label">Domain reputation</span>
                <span className="hbr-fix-rep-num">98</span>
              </div>
              <div className="hbr-fix-rep-bar" aria-hidden="true">
                {REP_SEGMENTS.map((on, i) => (
                  <span key={i} className={on ? 'on' : ''} />
                ))}
              </div>
              <div className="hbr-fix-pill green">
                <Icon name="check" aria-hidden="true" />
                Healthy · Recovery Mode ready
              </div>
            </div>
          </article>

          {/* ---------- 4 · Sendrit ---------- */}
          <article className="hbr-fix-card" data-reveal>
            <div className="hbr-fix-card-head">
              <span className="hbr-fix-num">4</span>
              <span className="hbr-fix-name">Sendrit</span>
              <span className="hbr-fix-tag">unverified in</span>
            </div>
            <h3 className="hbr-fix-card-title">Only verified contacts enter sequences</h3>
            <p className="hbr-fix-card-desc">
              Sendrit receives the Verifyrit-cleared list and launches AI-personalised campaigns. No
              unverified address ever enters a sequence. The pipeline architecture makes the gate
              structural, not optional.
            </p>

            <div className="hbr-fix-visual">
              <div className="hbr-fix-line">
                <span className="hbr-fix-line-ic"><Icon name="mail" aria-hidden="true" /></span>
                <span className="hbr-fix-line-t">934 verified contacts</span>
                <span className="hbr-fix-tag live">live</span>
              </div>
              <div className="hbr-fix-line">
                <span className="hbr-fix-dot purple" aria-hidden="true" />
                <span className="hbr-fix-line-t">Email + LinkedIn sequence</span>
                <span className="hbr-fix-tag">· NeoBrain</span>
              </div>
              <div className="hbr-fix-pill green">
                <Icon name="check" aria-hidden="true" />
                0 unverified in sequence
              </div>
            </div>
          </article>

          {/* ---------- 5 · Snaarpmail ---------- */}
          <article className="hbr-fix-card" data-reveal>
            <div className="hbr-fix-card-head">
              <span className="hbr-fix-num">5</span>
              <span className="hbr-fix-name">Snaarpmail</span>
              <span className="hbr-fix-tag">silent decay</span>
            </div>
            <h3 className="hbr-fix-card-title">Monitor reputation in real time</h3>
            <p className="hbr-fix-card-desc">
              Hard bounces are auto-suppressed and never re-entered into future campaigns. Bounce
              rate, spam complaints, and domain reputation are tracked live with threshold alerts
              that fire before damage becomes visible in engagement metrics.
            </p>

            <div className="hbr-fix-visual">
              <div className="hbr-fix-mon-stats">
                <div className="hbr-fix-mon-stat">
                  <b>0.3%</b>
                  <span>bounce rate</span>
                </div>
                <div className="hbr-fix-mon-stat">
                  <b>0.04%</b>
                  <span>spam rate</span>
                </div>
              </div>
              <div className="hbr-fix-line">
                <span className="hbr-fix-dot red" aria-hidden="true" />
                <span className="hbr-fix-line-t">2 hard bounces detected</span>
                <span className="hbr-fix-tag red">Suppressed</span>
              </div>
              <div className="hbr-fix-pill green">
                <Icon name="check" aria-hidden="true" />
                Domain reputation: Healthy
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
