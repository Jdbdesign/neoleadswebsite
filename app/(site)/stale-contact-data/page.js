import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import StaleContactDataScripts from '@/components/StaleContactDataScripts';
import StaleContactDataCauses from '@/components/StaleContactDataCauses';

export const metadata = { title: 'Stale Contact Data | NeoLeads' };

export default function StaleContactDataPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="scd-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <span className="scd-badge" data-reveal>
            <Icon name="database" aria-hidden="true" />
            Stale Contact Data
          </span>
          <h1 data-reveal>
            <span className="scd-h1-line">Your List Loses <span className="scd-decay">22% of Its Value</span></span><br />
            Every Year. While You Sleep.
          </h1>
          <p className="scd-sub" data-reveal>
            B2B contact data decays at 22.5% annually &mdash; and it&rsquo;s accelerating. Every
            stale address your team reaches out to wastes a sequence slot, burns domain
            reputation, and sends AI-powered personalization to entirely the wrong person.
            The fix isn&rsquo;t a quarterly cleanup. It&rsquo;s a pipeline that never lets stale
            data in.
          </p>
          <div className="scd-ctas" data-reveal>
            <button className="btn-primary">Clean My Data &mdash; Free</button>
            <button className="btn-light">See How NeoLeads Keeps Data Fresh</button>
          </div>
          <p className="scd-microcopy" data-reveal>
            No credit card. Your first list verification starts in under 2 minutes.
          </p>
        </div>
      </section>

      {/* ===================== BEFORE / AFTER COMPARISON ===================== */}
      <section className="scd-compare">
        <div className="container" data-reveal-stagger="120">
          <p className="scd-compare-label" data-reveal>
            What Continuous Verification Actually Looks Like
          </p>

          <div className="scd-compare-grid">

            {/* ---------- BEFORE ---------- */}
            <article className="scd-card" data-reveal>
              <div className="scd-card-head">
                <span className="scd-card-title">
                  <span className="scd-led red" aria-hidden="true"></span>
                  Your List Today
                </span>
                <span className="scd-chip red">Imported 8 mo ago</span>
              </div>

              <div className="scd-stats">
                <div className="scd-stat">
                  <span className="scd-stat-label">Contacts</span>
                  <span className="scd-stat-num">1,000</span>
                </div>
                <div className="scd-stat">
                  <span className="scd-stat-label">Verified</span>
                  <span className="scd-stat-num muted">Unknown</span>
                </div>
                <div className="scd-stat is-flag red">
                  <span className="scd-stat-label red">Bounce Rate</span>
                  <span className="scd-stat-num red">8.4%</span>
                </div>
                <div className="scd-stat">
                  <span className="scd-stat-label">Wasted Sends</span>
                  <span className="scd-stat-num">186</span>
                </div>
              </div>

              <div className="scd-rep red">
                <Icon name="triangle-alert" aria-hidden="true" />
                Sender reputation: At risk
              </div>

              <div className="scd-contacts">
                <div className="scd-contact">
                  <span className="scd-contact-ic red" aria-hidden="true"><Icon name="triangle-alert" /></span>
                  <div className="scd-contact-body">
                    <span className="scd-contact-name">Marcus T.</span>
                    <span className="scd-contact-note">Left Acme Corp 5 months ago</span>
                  </div>
                </div>
                <div className="scd-contact">
                  <span className="scd-contact-ic red" aria-hidden="true"><Icon name="triangle-alert" /></span>
                  <div className="scd-contact-body">
                    <span className="scd-contact-name">priya.n@vertexco.com</span>
                    <span className="scd-contact-note">Domain no longer active</span>
                  </div>
                </div>
                <div className="scd-contact">
                  <span className="scd-contact-ic red" aria-hidden="true"><Icon name="triangle-alert" /></span>
                  <div className="scd-contact-body">
                    <span className="scd-contact-name">david.o@stackline.io</span>
                    <span className="scd-contact-note">Role changed: now CMO, not VP Sales</span>
                  </div>
                </div>
              </div>
            </article>

            {/* ---------- AFTER ---------- */}
            <article className="scd-card is-after" data-reveal>
              <div className="scd-card-head">
                <span className="scd-card-title">
                  <span className="scd-led purple" aria-hidden="true"></span>
                  With NeoLeads
                </span>
                <span className="scd-chip purple">Continuously Verified</span>
              </div>

              <div className="scd-stats">
                <div className="scd-stat">
                  <span className="scd-stat-label">Verified</span>
                  <span className="scd-stat-num purple">847</span>
                </div>
                <div className="scd-stat">
                  <span className="scd-stat-label">Removed</span>
                  <span className="scd-stat-num">89</span>
                </div>
                <div className="scd-stat is-flag purple">
                  <span className="scd-stat-label purple">Bounce Rate</span>
                  <span className="scd-stat-num purple">0.3%</span>
                </div>
                <div className="scd-stat">
                  <span className="scd-stat-label">Flagged</span>
                  <span className="scd-stat-num">64</span>
                </div>
              </div>

              <div className="scd-rep green">
                <Icon name="check" aria-hidden="true" />
                Sender reputation: Healthy
              </div>

              <div className="scd-contacts">
                <div className="scd-contact">
                  <span className="scd-contact-ic green" aria-hidden="true"><Icon name="check" /></span>
                  <div className="scd-contact-body">
                    <span className="scd-contact-name">Marcus T.</span>
                    <span className="scd-contact-note">New role: VP Sales at Growthline &middot; Signal: Series A raised</span>
                  </div>
                </div>
                <div className="scd-contact">
                  <span className="scd-contact-ic green" aria-hidden="true"><Icon name="check" /></span>
                  <div className="scd-contact-body">
                    <span className="scd-contact-name">priya.n@vertexai.com</span>
                    <span className="scd-contact-note">New domain verified &middot; Deliverable</span>
                  </div>
                </div>
                <div className="scd-contact">
                  <span className="scd-contact-ic green" aria-hidden="true"><Icon name="check" /></span>
                  <div className="scd-contact-body">
                    <span className="scd-contact-name">david.o@stackline.io</span>
                    <span className="scd-contact-note">Role updated: CMO &middot; Score adjusted</span>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===================== METRICS / NUMBERS ===================== */}
      <section className="scd-metrics">
        <div className="container">
          <p className="scd-metrics-label" data-reveal>
            The data behind the problem and the cost of ignoring it
          </p>

          <div className="scd-metrics-grid" data-reveal-stagger="110">
            <div className="scd-metric" data-reveal>
              <div className="scd-metric-num" data-to="22.5" data-decimals="1" data-suffix="%">22.5%</div>
              <p className="scd-metric-desc">Of your B2B contact database goes stale every year</p>
              <span className="scd-metric-src">SMARTe / Landbase 2026</span>
            </div>

            <div className="scd-metric" data-reveal>
              <div className="scd-metric-num" data-to="30" data-decimals="0" data-suffix="%">30%</div>
              <p className="scd-metric-desc">Professionals who change jobs annually, invalidating records</p>
              <span className="scd-metric-src">BLS / Cleanlist</span>
            </div>

            <div className="scd-metric" data-reveal>
              <div className="scd-metric-num" data-to="546" data-decimals="0" data-suffix=" hrs">546 hrs</div>
              <p className="scd-metric-desc">Per rep per year wasted chasing stale data &mdash; 13 working weeks</p>
              <span className="scd-metric-src">Salesmotion 2026</span>
            </div>

            <div className="scd-metric" data-reveal>
              <div className="scd-metric-num" data-prefix="$" data-to="3.1" data-decimals="1" data-suffix="T">$3.1T</div>
              <p className="scd-metric-desc">Annual cost of poor data quality to US businesses</p>
              <span className="scd-metric-src">Instantly 2026 benchmarks</span>
            </div>
          </div>

          <p className="scd-metrics-foot" data-reveal>
            Every one of these stats is fixable. None of them are inevitable.{' '}
            <span className="scd-accent">That&rsquo;s what NeoLeads is built for.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <StaleContactDataCauses />

      {/* ===================== DEEP DIVE — STATIC DATA & CRM ROT ===================== */}
      <section className="scd-deep">
        <div className="container">
          <div className="scd-deep-grid" data-reveal-stagger="120">

            {/* ---------- copy ---------- */}
            <div className="scd-deep-copy" data-reveal>
              <span className="scd-deep-eyebrow">Root Cause 1 + 3 &mdash; Static Data &amp; CRM Rot</span>
              <h2 className="scd-deep-title">A Database Is a Perishable<br />Good. Treat It Like One.</h2>
              <p className="scd-deep-lead">
                The standard approach &mdash; buy a list, import it, use it until bounce rates spike
                &mdash; treats contact data like a one-time purchase. But data isn&rsquo;t
                infrastructure. It&rsquo;s inventory. At 2.1% monthly decay, a list you imported six
                months ago has already lost more than 12% of its usable contacts before your team
                touches it. Zeus gives you a continuously refreshed map of your market; NeoBrain AI
                watches your existing contacts and surfaces replacements automatically when one
                moves on.
              </p>

              <ul className="scd-deep-features">
                <li className="scd-deep-feature">
                  <span className="scd-deep-feature-ic" aria-hidden="true"><Icon name="navigation" /></span>
                  <div className="scd-deep-feature-body">
                    <h3>Always-Fresh Source Data</h3>
                    <p>
                      Every Zeus search returns contacts verified against current records &mdash;
                      not a cached export that was accurate last quarter. Buying signals refresh
                      continuously, so the list you pull today reflects today&rsquo;s market.
                    </p>
                  </div>
                </li>
                <li className="scd-deep-feature">
                  <span className="scd-deep-feature-ic" aria-hidden="true"><Icon name="database-zap" /></span>
                  <div className="scd-deep-feature-body">
                    <h3>CRM Enrichment on Autopilot</h3>
                    <p>
                      NeoBrain AI monitors your existing contacts for role changes, company events,
                      and signal shifts &mdash; flagging stale records and surfacing replacements
                      before they cause a bounce or a wasted sequence. Your CRM stays accurate
                      without a weekly manual review.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* ---------- visual: contact status update card ---------- */}
            <div className="scd-deep-visual" data-reveal>
              <div className="scd-deep-card">
                <div className="scd-deep-card-head">
                  <span className="scd-deep-card-label">Contact Status Update</span>
                  <span className="scd-deep-card-badge">
                    <Icon name="sparkles" aria-hidden="true" /> NeoBrain AI
                  </span>
                </div>

                {/* stale record */}
                <div className="scd-deep-rec is-stale">
                  <span className="scd-deep-av gray" aria-hidden="true">MT</span>
                  <div className="scd-deep-rec-id">
                    <span className="scd-deep-rec-name struck">Marcus T. &middot; VP Sales</span>
                    <span className="scd-deep-rec-meta">Acme Corp &middot; Verified last quarter</span>
                  </div>
                </div>

                {/* updated record */}
                <div className="scd-deep-rec is-current">
                  <span className="scd-deep-av purple" aria-hidden="true">MT</span>
                  <div className="scd-deep-rec-id">
                    <span className="scd-deep-rec-name">Marcus T. &middot; VP Sales</span>
                    <span className="scd-deep-rec-meta">Growthline.io &middot; Verified 2 days ago</span>
                  </div>
                  <span className="scd-deep-rec-dot" aria-hidden="true"></span>
                </div>

                <div className="scd-deep-status">
                  <Icon name="refresh-cw" aria-hidden="true" />
                  Job change detected &mdash; record updated
                </div>

                <div className="scd-deep-divider" aria-hidden="true"></div>

                <span className="scd-deep-sub">Replacement found at Acme Corp</span>

                <div className="scd-deep-rec is-replace">
                  <span className="scd-deep-av purple" aria-hidden="true">SK</span>
                  <div className="scd-deep-rec-id">
                    <span className="scd-deep-rec-name">Sarah K. &middot; VP Sales</span>
                    <span className="scd-deep-rec-meta">Acme Corp &middot; Signal: New hire, scaling team</span>
                  </div>
                  <div className="scd-deep-score">
                    <span className="scd-deep-score-num">88</span>
                    <span className="scd-deep-score-lbl">Score</span>
                  </div>
                </div>

                <div className="scd-deep-actions">
                  <button type="button" className="scd-deep-btn primary">
                    Open in Zeus <Icon name="arrow-right" aria-hidden="true" />
                  </button>
                  <button type="button" className="scd-deep-btn ghost">
                    Add to Sendrit campaign <Icon name="arrow-right" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== DEEP DIVE — DELIVERABILITY & FOLLOW-UP ===================== */}
      <section className="scd-deep is-rev">
        <div className="container">
          <div className="scd-deep-grid" data-reveal-stagger="120">

            {/* ---------- visual: verifyrit + snaarpmail ---------- */}
            <div className="scd-deep-visual" data-reveal>

              <div className="scd-deep-card">
                <div className="scd-deep-card-head">
                  <span className="scd-deep-card-label scd-vf-title">
                    Verifyrit <span>&mdash; Pre-Campaign Check</span>
                  </span>
                  <span className="scd-vf-meta">Q3 OUTREACH &middot; 1,000</span>
                </div>

                <div className="scd-vf-chips">
                  <span className="scd-vf-chip green"><b>847</b> Deliverable</span>
                  <span className="scd-vf-chip red"><b>89</b> Invalid</span>
                  <span className="scd-vf-chip amber"><b>64</b> Risky</span>
                  <span className="scd-vf-chip gray"><b>0</b> Spam Trap</span>
                </div>

                <div className="scd-vf-rows">
                  <div className="scd-vf-row">
                    <span className="scd-vf-ic red" aria-hidden="true"><Icon name="x" /></span>
                    <div className="scd-vf-id">
                      <span className="scd-vf-addr">priya.n@vertexco.com</span>
                      <span className="scd-vf-note">Domain inactive</span>
                    </div>
                    <span className="scd-vf-stat red">Removed</span>
                  </div>
                  <div className="scd-vf-row">
                    <span className="scd-vf-ic amber" aria-hidden="true"><Icon name="triangle-alert" /></span>
                    <div className="scd-vf-id">
                      <span className="scd-vf-addr">david.o@stackline.io</span>
                      <span className="scd-vf-note">Catch-all resolved &rarr; deliverable</span>
                    </div>
                    <span className="scd-vf-stat amber">Cleared</span>
                  </div>
                  <div className="scd-vf-row">
                    <span className="scd-vf-ic green" aria-hidden="true"><Icon name="check" /></span>
                    <div className="scd-vf-id">
                      <span className="scd-vf-addr">chen.w@orionhealth.com</span>
                      <span className="scd-vf-note">Verified deliverable</span>
                    </div>
                    <span className="scd-vf-stat green">&rarr; Sendrit</span>
                  </div>
                </div>

                <div className="scd-vf-foot">
                  <Icon name="check" aria-hidden="true" />
                  847 cleared &amp; sent to Sendrit &middot; Bounce forecast 0.3%
                </div>
              </div>

              <div className="scd-deep-card scd-sm-card">
                <div className="scd-deep-card-head">
                  <span className="scd-deep-card-label scd-vf-title">
                    Snaarpmail <span>&mdash; Domain Health</span>
                  </span>
                  <span className="scd-sm-tag">post-campaign</span>
                </div>

                <div className="scd-sm-stats">
                  <div className="scd-sm-stat">
                    <span className="scd-sm-num green">0.3%</span>
                    <span className="scd-sm-lbl">Bounce rate &middot; safe zone</span>
                  </div>
                  <div className="scd-sm-stat">
                    <span className="scd-sm-num green">0.04%</span>
                    <span className="scd-sm-lbl">Spam complaints &middot; &lt; 0.1%</span>
                  </div>
                </div>

                <div className="scd-sm-rep">
                  <span className="scd-sm-rep-lbl">Domain reputation</span>
                  <span className="scd-sm-rep-val">
                    <span className="scd-deep-rec-dot" aria-hidden="true"></span>
                    Healthy
                  </span>
                </div>
              </div>

            </div>

            {/* ---------- copy ---------- */}
            <div className="scd-deep-copy" data-reveal>
              <span className="scd-deep-eyebrow">Root Cause 2 + 4 &mdash; Deliverability &amp; Follow-Up</span>
              <h2 className="scd-deep-title">Verify Before You Send.<br />Protect Before You&rsquo;re Penalised.</h2>
              <p className="scd-deep-lead">
                Every hard bounce above a 2% rate signals inbox providers that your domain is a
                source of junk traffic. Above 5%, blacklisting is a real risk and recovery takes
                months, damaging every campaign you send during that window. Verifyrit removes
                that risk by running every email address through 7 layers of validation before it
                enters a Sendrit campaign.
              </p>

              <ul className="scd-deep-features">
                <li className="scd-deep-feature">
                  <span className="scd-deep-feature-ic" aria-hidden="true"><Icon name="shield-check" /></span>
                  <div className="scd-deep-feature-body">
                    <h3>7-Layer Validation Before Every Send</h3>
                    <p>
                      Syntax, domain health, MX records, SMTP check, catch-all resolution,
                      spam-trap detection, and disposable-email flagging &mdash; every address in
                      every list is checked on every campaign launch, not just the first time the
                      list is imported.
                    </p>
                  </div>
                </li>
                <li className="scd-deep-feature">
                  <span className="scd-deep-feature-ic" aria-hidden="true"><Icon name="activity" /></span>
                  <div className="scd-deep-feature-body">
                    <h3>Continuous Post-Send Monitoring</h3>
                    <p>
                      Snaarpmail watches bounce rates and spam-complaint rates in real time during
                      live campaigns &mdash; auto-quarantining contacts that generate hard bounces
                      and alerting your team before domain reputation takes a measurable hit.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== THE FULL FIX (5-product bento) ===================== */}
      <section className="scd-fix">
        <div className="container">
          <div className="scd-causes-head" data-reveal-stagger="100">
            <span className="scd-causes-eyebrow" data-reveal>
              <Icon name="sparkles" aria-hidden="true" />
              The Full Fix
            </span>
            <h2 data-reveal>
              How NeoLeads Keeps Your Contact Data<br />
              Fresh End to End
            </h2>
            <p data-reveal>
              Five products, each eliminating one layer of the stale data problem &mdash; connected
              so the fix runs automatically rather than requiring five manual hygiene checks before
              every campaign.
            </p>
          </div>

          <div className="scd-fix-grid" data-reveal-stagger="90">

            {/* ---------- Card 1: Zeus + NeoBrain ---------- */}
            <article className="scd-fix-card" data-reveal>
              <div className="scd-fix-card-head">
                <span className="scd-fix-num">1</span>
                <span className="scd-fix-product">Zeus &bull; NeoBrain AI</span>
                <span className="scd-fix-tag">Fixes &middot; Static List</span>
              </div>
              <h3 className="scd-fix-title">Start fresh &mdash; every time</h3>
              <p className="scd-fix-desc">
                Every Zeus search returns continuously refreshed, signal-verified contacts &mdash;
                not a static export. NeoBrain AI flags stale records and surfaces replacements
                before they cause damage.
              </p>
              <div className="scd-fix-demo">
                <div className="scd-fix-demo-head">
                  <span className="scd-fix-demo-eyebrow">Verified today &middot; Live signal</span>
                  <span className="scd-fix-zeus">Zeus</span>
                </div>
                <div className="scd-fix-contact">
                  <span className="scd-deep-av purple" aria-hidden="true">MT</span>
                  <div className="scd-fix-contact-id">
                    <span className="scd-fix-contact-name">Marcus T.</span>
                    <span className="scd-fix-contact-role">VP Sales &middot; Acme Corp</span>
                  </div>
                  <div className="scd-fix-intent">
                    <span className="scd-fix-intent-num">94</span>
                    <span className="scd-fix-intent-lbl">Intent</span>
                  </div>
                </div>
                <div className="scd-fix-signals">
                  <span className="scd-fix-signal">Raised $22M &middot; 9d</span>
                  <span className="scd-fix-signal">9 SDR roles &middot; 5d</span>
                  <span className="scd-fix-signal">New CRO &middot; 12d</span>
                </div>
              </div>
            </article>

            {/* ---------- Card 2: Verifyrit ---------- */}
            <article className="scd-fix-card" data-reveal>
              <div className="scd-fix-card-head">
                <span className="scd-fix-num">2</span>
                <span className="scd-fix-product">Verifyrit</span>
                <span className="scd-fix-tag">Fixes &middot; Unvalidated</span>
              </div>
              <h3 className="scd-fix-title">Validate before it sends</h3>
              <p className="scd-fix-desc">
                Every contact entering a Sendrit campaign passes through Verifyrit&rsquo;s 7-layer
                check first &mdash; on every launch, not just the first import. Invalid addresses,
                catch-alls, and spam traps are removed before a sequence fires.
              </p>
              <div className="scd-fix-demo">
                <div className="scd-fix-demo-head">
                  <span className="scd-fix-demo-eyebrow">List health</span>
                  <span className="scd-fix-health">480<span>/480</span></span>
                </div>
                <div className="scd-fix-bar" aria-hidden="true"><span style={{ width: '100%' }} /></div>
                <div className="scd-fix-stats3">
                  <div className="scd-fix-stat">
                    <span className="scd-fix-stat-num green">462</span>
                    <span className="scd-fix-stat-lbl">Valid</span>
                  </div>
                  <div className="scd-fix-stat">
                    <span className="scd-fix-stat-num">12</span>
                    <span className="scd-fix-stat-lbl">Catch-all</span>
                  </div>
                  <div className="scd-fix-stat">
                    <span className="scd-fix-stat-num red">6</span>
                    <span className="scd-fix-stat-lbl">Spam trap</span>
                  </div>
                </div>
              </div>
            </article>

            {/* ---------- Card 3: Warmrit ---------- */}
            <article className="scd-fix-card" data-reveal>
              <div className="scd-fix-card-head">
                <span className="scd-fix-num">3</span>
                <span className="scd-fix-product">Warmrit</span>
              </div>
              <h3 className="scd-fix-title">Protect the domain</h3>
              <p className="scd-fix-desc">
                Warmrit keeps every sending domain at campaign-ready reputation, so cleaned lists
                send from a position of strength &mdash; able to absorb the occasional bounce
                without lasting damage.
              </p>
              <div className="scd-fix-demo">
                <div className="scd-fix-demo-head">
                  <span className="scd-fix-demo-eyebrow">Domain reputation</span>
                  <span className="scd-fix-rep">98</span>
                </div>
                <div className="scd-fix-segs" aria-hidden="true">
                  <span /><span /><span /><span /><span /><span /><span />
                </div>
                <div className="scd-fix-pill">
                  <Icon name="check" aria-hidden="true" />
                  Warmed &middot; ready to send
                </div>
              </div>
            </article>

            {/* ---------- Card 4: Sendrit + NeoBrain ---------- */}
            <article className="scd-fix-card" data-reveal>
              <div className="scd-fix-card-head">
                <span className="scd-fix-num">4</span>
                <span className="scd-fix-product">Sendrit &bull; NeoBrain AI</span>
              </div>
              <h3 className="scd-fix-title">Only clean contacts send</h3>
              <p className="scd-fix-desc">
                Sendrit launches AI-personalized sequences to the right person, in the right role
                &mdash; verified, signal-backed contacts, not whoever sat in the CRM eight months
                ago.
              </p>
              <div className="scd-fix-demo">
                <div className="scd-fix-seq">
                  <div className="scd-fix-seq-row">
                    <span className="scd-fix-seq-ic" aria-hidden="true"><Icon name="mail" /></span>
                    <span className="scd-fix-seq-label">Email &middot; Day 1</span>
                    <span className="scd-fix-seq-stat gray">Sent</span>
                  </div>
                  <div className="scd-fix-seq-row">
                    <span className="scd-fix-seq-ic" aria-hidden="true"><Icon name="linkedin" /></span>
                    <span className="scd-fix-seq-label">LinkedIn &middot; Day 3</span>
                    <span className="scd-fix-seq-stat amber">Opened</span>
                  </div>
                  <div className="scd-fix-seq-row is-active">
                    <span className="scd-fix-seq-ic" aria-hidden="true"><Icon name="message-circle" /></span>
                    <span className="scd-fix-seq-label">Reply &middot; Day 6</span>
                    <span className="scd-fix-seq-stat purple">Interested</span>
                  </div>
                </div>
              </div>
            </article>

            {/* ---------- Card 5: Snaarpmail + NeoBrain ---------- */}
            <article className="scd-fix-card" data-reveal>
              <div className="scd-fix-card-head">
                <span className="scd-fix-num">5</span>
                <span className="scd-fix-product">Snaarpmail &bull; NeoBrain AI</span>
              </div>
              <h3 className="scd-fix-title">Monitor &amp; protect post-send</h3>
              <p className="scd-fix-desc">
                Snaarpmail auto-quarantines hard bounces and tracks domain health in real time
                &mdash; so the team knows the moment something shifts, not four campaigns later.
              </p>
              <div className="scd-fix-demo">
                <div className="scd-fix-stats2">
                  <div className="scd-fix-mini">
                    <span className="scd-fix-mini-num">0.3%</span>
                    <span className="scd-fix-mini-lbl">Bounce rate</span>
                  </div>
                  <div className="scd-fix-mini">
                    <span className="scd-fix-mini-num">0.04%</span>
                    <span className="scd-fix-mini-lbl">Spam rate</span>
                  </div>
                </div>
                <div className="scd-fix-alert">
                  <span className="scd-fix-alert-msg">
                    <span className="scd-fix-dot red" aria-hidden="true"></span>
                    2 hard bounces detected
                  </span>
                  <span className="scd-fix-quar">Quarantined</span>
                </div>
                <div className="scd-fix-pill">
                  <Icon name="check" aria-hidden="true" />
                  Domain reputation: Healthy
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===================== PIPELINE SUMMARY (3-column) ===================== */}
      <section className="scd-pipe">
        <div className="container">
          <div className="scd-causes-head" data-reveal-stagger="100">
            <span className="scd-causes-eyebrow" data-reveal>
              <Icon name="arrow-right" aria-hidden="true" />
              The NeoLeads Data Fix
            </span>
            <h2 data-reveal>
              Four Root Causes. Five Products. One Pipeline<br />
              That Keeps Data Fresh.
            </h2>
            <p data-reveal>
              Each product eliminates a specific layer of the stale data problem. Together, they
              replace a quarterly cleanup habit with a pipeline that stays clean by default.
            </p>
          </div>

          <div className="scd-pipe-grid" data-reveal-stagger="110">

            <div className="scd-pipe-col" data-reveal>
              <h3 className="scd-pipe-title">Keep Source Data Fresh</h3>
              <div className="scd-pipe-pills">
                <span className="scd-pipe-pill">Zeus</span>
                <span className="scd-pipe-pill">NeoBrain AI</span>
              </div>
              <p className="scd-pipe-desc">
                Zeus provides continuously refreshed contacts verified against live market signals
                &mdash; not a snapshot that starts decaying the moment you download it. NeoBrain AI
                watches your existing records for job changes, company events, and role shifts,
                flagging stale contacts and surfacing replacements automatically.
              </p>
              <p className="scd-pipe-foot">
                <Icon name="corner-down-right" aria-hidden="true" />
                From 22.5% annual decay &rarr; always-current contact records
              </p>
            </div>

            <div className="scd-pipe-col" data-reveal>
              <h3 className="scd-pipe-title">Validate Before Every Send</h3>
              <div className="scd-pipe-pills">
                <span className="scd-pipe-pill">Verifyrit</span>
              </div>
              <p className="scd-pipe-desc">
                Every contact entering a Sendrit campaign is validated through 7 layers before a
                sequence fires. Verifyrit runs on every campaign, not just the first import &mdash;
                so a list checked in January is re-checked before the April campaign without anyone
                needing to remember to run it.
              </p>
              <p className="scd-pipe-foot">
                <Icon name="corner-down-right" aria-hidden="true" />
                From 8%+ bounce on stale lists &rarr; 0.3% on verified ones
              </p>
            </div>

            <div className="scd-pipe-col" data-reveal>
              <h3 className="scd-pipe-title">Monitor &amp; Protect Post-Send</h3>
              <div className="scd-pipe-pills">
                <span className="scd-pipe-pill">Snaarpmail</span>
                <span className="scd-pipe-pill">Warmrit</span>
              </div>
              <p className="scd-pipe-desc">
                Snaarpmail auto-quarantines hard bounces and tracks domain health metrics in real
                time &mdash; so the team knows immediately when something shifts. Warmrit maintains
                the sender reputation that protects deliverability even when occasional stale
                contacts slip through.
              </p>
              <p className="scd-pipe-foot">
                <Icon name="corner-down-right" aria-hidden="true" />
                From reactive damage control &rarr; continuous, signal-led domain protection
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== CUSTOMER STORIES ===================== */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-label" data-reveal>CUSTOMER STORIES</span>
            <h2 data-reveal>Don't just take our word for it.</h2>
          </div>
          <div className="grid-3" data-reveal-stagger="120">
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"NeoLeads completely changed our outbound workflow. We went from 5% reply rate to over 23% in 3 weeks."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container.png" alt="James T." /><div><div className="name">James T.</div><div className="role">VP Sales, TechCorp</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"The pay-per-conversation model is genius. We only pay for actual results, not wasted software subscriptions."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-2.png" alt="Maria K." /><div><div className="name">Maria K.</div><div className="role">Founder, GrowthLab</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"NeoBrain AI is scary good. It replies to leads like a human, qualifies them and books meetings on autopilot."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-1.png" alt="Derek W." /><div><div className="name">Derek W.</div><div className="role">Head of Growth, ScaleUp</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"Setup was fast and the results came quickly. This is the future of outbound sales."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-6.png" alt="Priya S." /><div><div className="name">Priya S.</div><div className="role">Marketing Director, FintechHub</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"Best investment we made this year. Our pipeline has never been healthier."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-3.png" alt="Carlos M." /><div><div className="name">Carlos M.</div><div className="role">CEO, LaunchPad</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"The unified inbox alone is worth it. Managing 10 mailboxes from one place is a game changer."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-7.png" alt="Sophie L." /><div><div className="name">Sophie L.</div><div className="role">Sales Lead, Nexvio</div></div></div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== COMPLIANCE ===================== */}
      <section className="section alt" id="security">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="security-pill" data-reveal><Icon name="shield-check" /> Compliant</span>
            <h2 data-reveal>Keep your organization secure<br />and compliant.</h2>
          </div>
          <div className="badges-row" data-reveal-stagger="80">
            <span className="comp-badge" title="AICPA SOC" data-reveal><img src="/logos/compliance-1.png" alt="AICPA SOC 2 certified" /></span>
            <span className="comp-badge" title="PCI DSS" data-reveal><img src="/logos/compliance-2.png" alt="PCI DSS compliant" /></span>
            <span className="comp-badge" title="GDPR" data-reveal><img src="/logos/compliance-3.png" alt="GDPR compliant" /></span>
            <span className="comp-badge" title="Privacy" data-reveal><img src="/logos/compliance-4.png" alt="Data privacy" /></span>
            <span className="comp-badge" title="CSA STAR Level One" data-reveal><img src="/logos/compliance-5.png" alt="CSA STAR Level One" /></span>
            <span className="comp-badge" title="ISO/IEC 27001" data-reveal><img src="/logos/compliance-6.png" alt="ISO/IEC 27001 certified" /></span>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA — GET STARTED ===================== */}
      <section className="final-cta">
        <div className="container" data-reveal-stagger="100">
          <span className="section-label" data-reveal>GET STARTED</span>
          <h2 data-reveal>Ready to Keep Your<br />Data Fresh for Good?</h2>
          <p data-reveal>Stop burning sequence slots and sender reputation on contacts who moved on months ago.<br />Let NeoLeads verify, enrich, and re-score your list continuously &mdash; automatically.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Clean My Data Free <Icon name="arrow-right" /></button>
            <button className="btn-ghost">Book a Demo</button>
          </div>
          <div className="final-trust" data-reveal>
            <span className="item"><Icon name="shield-check" /> SOC 2 Certified</span>
            <span className="item"><Icon name="check" /> No credit card</span>
            <span className="item"><Icon name="check" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      </main>

      <ClientScripts />
      <StaleContactDataScripts />
    </>
  );
}
