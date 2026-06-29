import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import EmailsSpamScripts from '@/components/EmailsSpamScripts';
import EmailsSpamCauses from '@/components/EmailsSpamCauses';
import EmailsSpamSetupCard from '@/components/EmailsSpamSetupCard';
import EmailsSpamMonitorCard from '@/components/EmailsSpamMonitorCard';

export const metadata = { title: 'Emails Landing in Spam | NeoLeads' };

export default function EmailsLandingInSpamPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="els-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <h1 data-reveal>
            Your Emails Aren&rsquo;t Being Ignored.<br />
            <span className="els-nowrap">They&rsquo;re <span className="els-danger">Never Arriving.</span></span>
          </h1>
          <p className="els-sub" data-reveal>
            Since 2024&ndash;2025, Gmail, Yahoo, and Microsoft require every bulk sender to have
            SPF, DKIM, and DMARC in place, and now reject unauthenticated mail outright. A
            cold inbox, a stale list, or a single missing DNS record is enough to make your entire
            campaign invisible before a single prospect reads word one.
          </p>
          <div className="els-ctas" data-reveal>
            <button className="btn-primary">Fix My Deliverability Free</button>
            <button className="btn-light">See How NeoLeads Protects Inbox Placement</button>
          </div>
          <p className="els-microcopy" data-reveal>
            No credit card. Your domain health check starts in under 2 minutes.
          </p>
        </div>
      </section>

      {/* ===================== INFRASTRUCTURE COMPARISON ===================== */}
      <section className="els-compare">
        <div className="container" data-reveal-stagger="120">
          <p className="els-compare-label" data-reveal>
            The Infrastructure Difference Between Invisible and Delivered
          </p>

          <div className="els-compare-grid">

            {/* ---------- WITHOUT ---------- */}
            <article className="els-card" data-reveal>
              <div className="els-card-head">
                <span className="els-card-title">
                  <span className="els-led red" aria-hidden="true"></span>
                  Without NeoLeads
                </span>
                <span className="els-chip red">640 Sent</span>
              </div>

              <div className="els-stats">
                <div className="els-stat">
                  <span className="els-stat-label">Inbox</span>
                  <span className="els-stat-num" data-to="61" data-suffix="%">61%</span>
                </div>
                <div className="els-stat">
                  <span className="els-stat-label">Promotions</span>
                  <span className="els-stat-num" data-to="8" data-suffix="%">8%</span>
                </div>
                <div className="els-stat is-flag red">
                  <span className="els-stat-label red">Spam</span>
                  <span className="els-stat-num red" data-to="31" data-suffix="%">31%</span>
                </div>
                <div className="els-stat">
                  <span className="els-stat-label">Filtered</span>
                  <span className="els-stat-num" data-to="198">198</span>
                </div>
              </div>

              <div className="els-rows">
                <div className="els-row red">
                  <Icon name="triangle-alert" aria-hidden="true" />
                  <span>198 emails filtered before anyone opened them</span>
                </div>
                <div className="els-row">
                  <Icon name="ban" aria-hidden="true" />
                  <span>SPF: Not configured &middot; DKIM: Missing &middot; DMARC: Not enforced</span>
                </div>
                <div className="els-row">
                  <Icon name="triangle-alert" aria-hidden="true" />
                  <span>Domain age: 11 days, ISP trust: <b>Low</b></span>
                </div>
                <div className="els-row">
                  <Icon name="triangle-alert" aria-hidden="true" />
                  <span>List bounce rate: 7.2%, Sender reputation: <b className="red">Damaged</b></span>
                </div>
              </div>
            </article>

            {/* ---------- WITH ---------- */}
            <article className="els-card is-after" data-reveal>
              <div className="els-card-head">
                <span className="els-card-title">
                  <span className="els-led purple" aria-hidden="true"></span>
                  With NeoLeads
                </span>
                <span className="els-chip purple">Same Copy</span>
              </div>

              <div className="els-stats">
                <div className="els-stat is-flag purple">
                  <span className="els-stat-label purple">Inbox</span>
                  <span className="els-stat-num purple" data-to="96" data-suffix="%">96%</span>
                </div>
                <div className="els-stat">
                  <span className="els-stat-label">Promotions</span>
                  <span className="els-stat-num" data-to="3" data-suffix="%">3%</span>
                </div>
                <div className="els-stat is-flag purple">
                  <span className="els-stat-label purple">Spam</span>
                  <span className="els-stat-num purple" data-to="1" data-suffix="%">1%</span>
                </div>
                <div className="els-stat">
                  <span className="els-stat-label">Landed</span>
                  <span className="els-stat-num blue" data-to="614">614</span>
                </div>
              </div>

              <div className="els-rows">
                <div className="els-row green">
                  <Icon name="check" aria-hidden="true" />
                  <span>614 emails landed in primary inbox</span>
                </div>
                <div className="els-row green">
                  <Icon name="check" aria-hidden="true" />
                  <span>SPF &check; &middot; DKIM &check; &middot; DMARC &check;, Auto-configured by Snaarpmail</span>
                </div>
                <div className="els-row green">
                  <Icon name="check" aria-hidden="true" />
                  <span>Warmrit: Domain warmed 28 days, ISP trust: <b>Strong</b></span>
                </div>
                <div className="els-row green">
                  <Icon name="check" aria-hidden="true" />
                  <span>Verifyrit: 0.3% bounce rate, Sender reputation: <b className="green">Healthy</b></span>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===================== METRICS / DATA BAND ===================== */}
      <section className="els-metrics">
        <div className="container">
          <p className="els-metrics-label" data-reveal>
            The data behind the problem and the cost of ignoring it
          </p>

          <div className="els-metrics-grid" data-reveal-stagger="110">
            <div className="els-metric" data-reveal>
              <div className="els-metric-num" data-to="2.7" data-decimals="1" data-suffix="&times;">2.7&times;</div>
              <p className="els-metric-desc">More likely to reach the inbox with full authentication vs. without</p>
              <span className="els-metric-src">B2B Deliverability Report 2025</span>
            </div>

            <div className="els-metric" data-reveal>
              <div className="els-metric-num" data-to="7.6" data-decimals="1" data-suffix="%">7.6%</div>
              <p className="els-metric-desc">Share of domains that currently enforce DMARC</p>
              <span className="els-metric-src">B2B Deliverability Report 2025</span>
            </div>

            <div className="els-metric" data-reveal>
              <div className="els-metric-num" data-to="38" data-decimals="0" data-suffix=" pts">38 pts</div>
              <p className="els-metric-desc">Inbox placement gap between authenticated and unauthenticated domains</p>
              <span className="els-metric-src">B2B Deliverability Report 2025</span>
            </div>

            <div className="els-metric" data-reveal>
              <div className="els-metric-num" data-to="0.1" data-decimals="1" data-suffix="%">0.1%</div>
              <p className="els-metric-desc">Gmail &amp; Microsoft spam-complaint ceiling: 1 per 1,000 emails</p>
              <span className="els-metric-src">Google Sender Guidelines 2024</span>
            </div>
          </div>

          <p className="els-metrics-foot" data-reveal>
            Every one of these gaps is closeable.{' '}
            <span className="els-accent">NeoLeads closes all four before your next campaign fires.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <EmailsSpamCauses />

      {/* ===================== AUTHENTICATION + WARMUP ===================== */}
      <section className="els-pp">
        <div className="container">
          <div className="els-pp-layout">
            {/* ---- left: copy + features ---- */}
            <div className="els-pp-text" data-reveal-stagger="100">
              <span className="els-pp-label" data-reveal>
                Root Cause 1 + 2: Authentication &amp; Warmup
              </span>
              <h2 data-reveal>
                Authentication and Warmup Aren&rsquo;t Optional Anymore. They&rsquo;re the Floor.
              </h2>
              <p className="els-pp-lead" data-reveal>
                Before 2024, missing authentication was a deliverability risk. Since 2024&ndash;2025
                enforcement by Gmail, Yahoo, and Microsoft, it&rsquo;s a hard rejection, your
                email doesn&rsquo;t land in spam, it never leaves the server. Snaarpmail handles
                authentication automatically the moment a domain is connected. Warmrit handles the
                sender reputation that authentication alone can&rsquo;t build.
              </p>

              <div className="els-pp-feats" data-reveal>
                <div className="els-pp-feat">
                  <span className="els-pp-feat-ic"><Icon name="send" aria-hidden="true" /></span>
                  <div className="els-pp-feat-body">
                    <h4>Automatic DNS Authentication</h4>
                    <p>
                      Every domain connected to NeoLeads gets SPF, DKIM, and DMARC configured
                      automatically by Snaarpmail, no manual DNS editing, no waiting on IT, no
                      misconfigured records discovered three campaigns in. Set up correctly the first
                      time and monitored for validity on an ongoing basis.
                    </p>
                  </div>
                </div>

                <div className="els-pp-feat">
                  <span className="els-pp-feat-ic"><Icon name="flame" aria-hidden="true" /></span>
                  <div className="els-pp-feat-body">
                    <h4>Domain Warmup Before the First Send</h4>
                    <p>
                      Warmrit runs a gradual ramp schedule calibrated to each domain&rsquo;s age and
                      reputation before Sendrit ever launches a campaign over it. New domains
                      don&rsquo;t send at full volume on Day 1, they build ISP trust over
                      3&ndash;4 weeks, then maintain it continuously throughout active campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- right: domain setup card (always-on warmup animation) ---- */}
            <EmailsSpamSetupCard />
          </div>
        </div>
      </section>

      {/* ===================== LIST HYGIENE + MONITORING ===================== */}
      <section className="els-df">
        <div className="container">
          <div className="els-df-layout">
            {/* ---- left: inbox placement monitor card (always-on live monitor) ---- */}
            <EmailsSpamMonitorCard />

            {/* ---- right: copy + features ---- */}
            <div className="els-pp-text" data-reveal-stagger="100">
              <span className="els-pp-label neutral" data-reveal>
                Root Cause 3 + 4: List Hygiene &amp; Real-Time Monitoring
              </span>
              <h2 data-reveal>
                Clean the List Before You Send. Watch the Domain While You Do.
              </h2>
              <p className="els-pp-lead" data-reveal>
                A well-authenticated, warm domain can still take a deliverability hit from a stale
                list, one bad batch of hard bounces pushes the rate above the safe threshold,
                and weeks of warmup start to erode. Verifyrit removes the risk before campaigns
                launch. Snaarpmail watches placement metrics in real time so your team knows the
                moment something shifts, not after the damage is done.
              </p>

              <div className="els-pp-feats" data-reveal>
                <div className="els-pp-feat">
                  <span className="els-pp-feat-ic"><Icon name="shield-check" aria-hidden="true" /></span>
                  <div className="els-pp-feat-body">
                    <h4>7-Layer List Validation Before Every Send</h4>
                    <p>
                      Every address entering a Sendrit campaign passes through Verifyrit&rsquo;s full
                      validation stack: syntax, domain health, MX records, SMTP, catch-all
                      resolution, spam-trap detection, and disposable-email filtering. Not just on
                      the first import. Before every campaign.
                    </p>
                  </div>
                </div>

                <div className="els-pp-feat">
                  <span className="els-pp-feat-ic"><Icon name="activity" aria-hidden="true" /></span>
                  <div className="els-pp-feat-body">
                    <h4>Real-Time Inbox Placement Monitoring</h4>
                    <p>
                      Snaarpmail tracks exactly where emails are landing, primary, promotions,
                      or spam, broken out by provider, updated in real time during live
                      campaigns. If spam placement spikes above the safe threshold, an alert fires
                      immediately so your team can pause, investigate, and correct before reputation
                      takes lasting damage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THE FULL FIX (end-to-end bento) ===================== */}
      <section className="els-fix">
        <div className="container">
          <div className="els-fix-head" data-reveal-stagger="100">
            <span className="els-fix-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The Full Fix
            </span>
            <h2 data-reveal>
              How NeoLeads Keeps Your Emails Out of Spam<br />
              End to End
            </h2>
            <p data-reveal>
              Each product eliminates one layer of the spam problem, connected so the
              protection runs automatically, without anyone needing to remember to run a
              deliverability check before every campaign.
            </p>
          </div>

          <div className="els-fix-grid" data-reveal-stagger="120">
            {/* --- Card 1 --- */}
            <article className="els-fix-card c-half" data-reveal>
              <div className="els-fix-card-head">
                <div className="els-fix-meta">
                  <span className="els-fix-badge">1</span>
                  <span className="els-fix-product">Verifyrit</span>
                </div>
                <span className="els-fix-fixes">stops · bounce damage</span>
              </div>
              <h3 className="els-fix-title">Remove bounce triggers first</h3>
              <p className="els-fix-desc">
                Every contact entering a campaign is validated through 7 layers. Invalid addresses,
                spam traps, and risky accounts are removed before they can damage reputation,
                bounce forecast drops from double digits to under 0.5%.
              </p>
              <div className="els-fix-mock">
                <div className="els-fixm-top">
                  <span className="els-fixm-label">List health</span>
                  <span className="els-fixm-count"><b>761</b>/820</span>
                </div>
                <div className="els-fixm-bar" aria-hidden="true">
                  <span className="els-fixm-bar-fill" style={{ width: '93%' }} />
                </div>
                <div className="els-fixm-stats">
                  <div className="els-fixm-stat">
                    <span className="els-fixm-stat-num green">761</span>
                    <span className="els-fixm-stat-lbl">Deliverable</span>
                  </div>
                  <div className="els-fixm-stat">
                    <span className="els-fixm-stat-num red">41</span>
                    <span className="els-fixm-stat-lbl">Invalid</span>
                  </div>
                  <div className="els-fixm-stat">
                    <span className="els-fixm-stat-num">0.3%</span>
                    <span className="els-fixm-stat-lbl">Bounce</span>
                  </div>
                </div>
              </div>
            </article>

            {/* --- Card 2 --- */}
            <article className="els-fix-card c-half" data-reveal>
              <div className="els-fix-card-head">
                <div className="els-fix-meta">
                  <span className="els-fix-badge">2</span>
                  <span className="els-fix-product">Snaarpmail</span>
                </div>
                <span className="els-fix-fixes">stops · server rejection</span>
              </div>
              <h3 className="els-fix-title">Authenticate every domain</h3>
              <p className="els-fix-desc">
                The moment a sending domain is connected, Snaarpmail provisions SPF, DKIM, and DMARC
                automatically. No manual DNS editing, no misconfigured records found three campaigns
                in. Authentication is the non-negotiable floor, handled first.
              </p>
              <div className="els-fix-mock">
                <div className="els-fixm-top">
                  <span className="els-fixm-label">Domain authentication</span>
                  <span className="els-fixm-tag">Snaarpmail</span>
                </div>
                <div className="els-fixm-auth">
                  <div className="els-fixm-auth-row">
                    <span className="els-fixm-auth-name"><Icon name="check" aria-hidden="true" /> SPF</span>
                    <span className="els-fixm-auth-val">Active</span>
                  </div>
                  <div className="els-fixm-auth-row">
                    <span className="els-fixm-auth-name"><Icon name="check" aria-hidden="true" /> DKIM</span>
                    <span className="els-fixm-auth-val">2048-bit</span>
                  </div>
                  <div className="els-fixm-auth-row">
                    <span className="els-fixm-auth-name"><Icon name="check" aria-hidden="true" /> DMARC</span>
                    <span className="els-fixm-auth-val">Enforced</span>
                  </div>
                </div>
              </div>
            </article>

            {/* --- Card 3 --- */}
            <article className="els-fix-card c-third" data-reveal>
              <div className="els-fix-card-head">
                <div className="els-fix-meta">
                  <span className="els-fix-badge">3</span>
                  <span className="els-fix-product">Warmrit</span>
                </div>
                <span className="els-fix-fixes">isp distrust</span>
              </div>
              <h3 className="els-fix-title">Build the reputation</h3>
              <p className="els-fix-desc">
                Authentication proves identity; warmup builds trust. Warmrit runs a calibrated ramp
                over 3&ndash;4 weeks before any campaign fires, then maintains it throughout,
                the reputation authentication alone can&rsquo;t create.
              </p>
              <div className="els-fix-mock">
                <div className="els-fixm-top">
                  <span className="els-fixm-label">Domain reputation</span>
                  <span className="els-fixm-rep">98</span>
                </div>
                <div className="els-fixm-dots" aria-hidden="true">
                  <span className="on" /><span className="on" /><span className="on" />
                  <span className="on" /><span className="on" /><span className="on" />
                  <span className="on" /><span className="on" /><span className="on" />
                  <span className="off" />
                </div>
                <span className="els-fixm-warmed">
                  <Icon name="check" aria-hidden="true" /> Warmed · ready to send
                </span>
              </div>
            </article>

            {/* --- Card 4 --- */}
            <article className="els-fix-card c-third" data-reveal>
              <div className="els-fix-card-head">
                <div className="els-fix-meta">
                  <span className="els-fix-badge">4</span>
                  <span className="els-fix-product">Sendrit + NeoBrain AI</span>
                </div>
                <span className="els-fix-fixes">filter detection</span>
              </div>
              <h3 className="els-fix-title">Pass the AI filter test</h3>
              <p className="els-fix-desc">
                NeoBrain AI researches each prospect and writes a signal-backed first line before
                Sendrit builds the sequence, outreach that reads like a human, not a template
                Gmail&rsquo;s LLM detects in milliseconds.
              </p>
              <div className="els-fix-mock">
                <div className="els-fixm-filter">
                  <div className="els-fixm-filter-row is-bad">
                    <span className="els-fixm-filter-head red">
                      <Icon name="ban" aria-hidden="true" /> Template detected
                    </span>
                    <p className="els-fixm-filter-q struck">&ldquo;Hey {'{{first_name}}'}, I wanted to reach out&hellip;&rdquo;</p>
                  </div>
                  <div className="els-fixm-filter-row is-good">
                    <span className="els-fixm-filter-head purple">
                      <Icon name="check" aria-hidden="true" /> Passed filter
                    </span>
                    <p className="els-fixm-filter-q">&ldquo;Saw Acme opened 9 SDR roles after the raise&hellip;&rdquo;</p>
                  </div>
                </div>
              </div>
            </article>

            {/* --- Card 5 --- */}
            <article className="els-fix-card c-third" data-reveal>
              <div className="els-fix-card-head">
                <div className="els-fix-meta">
                  <span className="els-fix-badge">5</span>
                  <span className="els-fix-product">Snaarpmail · Continuous</span>
                </div>
                <span className="els-fix-fixes">silent decay</span>
              </div>
              <h3 className="els-fix-title">Monitor placement live</h3>
              <p className="els-fix-desc">
                Inbox placement, spam-complaint rate, and reputation signals are tracked live through
                every campaign. Alerts fire the moment a metric drifts toward the danger zone,
                before a hit compounds across future sends.
              </p>
              <div className="els-fix-mock">
                <div className="els-fixm-rate">
                  <div className="els-fixm-rate-tile">
                    <span className="els-fixm-rate-num">0.3%</span>
                    <span className="els-fixm-rate-lbl">Bounce rate</span>
                  </div>
                  <div className="els-fixm-rate-tile">
                    <span className="els-fixm-rate-num">0.04%</span>
                    <span className="els-fixm-rate-lbl">Spam rate</span>
                  </div>
                </div>
                <div className="els-fixm-alert">
                  <span className="els-fixm-alert-txt">
                    <span className="els-fixm-alert-dot" aria-hidden="true" /> 2 hard bounces detected
                  </span>
                  <span className="els-fixm-alert-tag">Quarantined</span>
                </div>
                <span className="els-fixm-healthy">
                  <Icon name="check" aria-hidden="true" /> Domain reputation: Healthy
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== THE DELIVERABILITY FIX (summary) ===================== */}
      <section className="els-sum">
        <div className="container">
          <div className="els-sum-head" data-reveal-stagger="100">
            <span className="els-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Deliverability Fix
            </span>
            <h2 data-reveal>
              Four Causes of Spam Placement. One Pipeline<br />
              That Fixes Them All.
            </h2>
            <p data-reveal>
              Each NeoLeads product targets a specific layer of the spam placement problem,
              and because they&rsquo;re connected, the protection is automatic rather than a manual
              checklist before every campaign.
            </p>
          </div>

          <div className="els-sum-grid" data-reveal-stagger="120">
            {/* --- Column 1 --- */}
            <article className="els-sum-col" data-reveal>
              <h3 className="els-sum-title">Authenticate &amp; Protect the Domain</h3>
              <div className="els-sum-chips">
                <span className="els-sum-chip">Snaarpmail</span>
                <span className="els-sum-chip">Warmrit</span>
              </div>
              <p className="els-sum-desc">
                Snaarpmail auto-configures SPF, DKIM, and DMARC for every connected sending domain,
                the authentication Gmail, Yahoo, and Microsoft now require. Warmrit builds the
                sender reputation authentication alone can&rsquo;t create, gradually and continuously,
                before and during every active campaign.
              </p>
              <p className="els-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="els-sum-from">unauthenticated and cold</span> &rarr;{' '}
                  <span className="els-sum-to">2.7&times; more likely to reach the inbox</span>
                </span>
              </p>
            </article>

            {/* --- Column 2 --- */}
            <article className="els-sum-col" data-reveal>
              <h3 className="els-sum-title">Clean the List Before Every Send</h3>
              <div className="els-sum-chips">
                <span className="els-sum-chip">Verifyrit</span>
              </div>
              <p className="els-sum-desc">
                Every address entering a Sendrit campaign is validated against 7 layers before a
                sequence fires. Spam traps, invalid emails, and risky addresses are removed
                automatically so bounce rates stay in the safe zone and every campaign launches from
                a clean, trust-preserving list.
              </p>
              <p className="els-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="els-sum-from">7&ndash;18% bounce on dirty lists</span> &rarr;{' '}
                  <span className="els-sum-to">under 0.5% on verified ones</span>
                </span>
              </p>
            </article>

            {/* --- Column 3 --- */}
            <article className="els-sum-col" data-reveal>
              <h3 className="els-sum-title">Send Like a Human. Monitor Like a System.</h3>
              <div className="els-sum-chips">
                <span className="els-sum-chip">NeoBrain AI</span>
                <span className="els-sum-chip">Snaarpmail</span>
              </div>
              <p className="els-sum-desc">
                NeoBrain AI&rsquo;s signal-researched personalization generates outreach that passes
                AI spam-filter detection because it reads like a human wrote it for this specific
                person. Snaarpmail monitors inbox placement in real time so any degradation is caught
                before it compounds across future campaigns.
              </p>
              <p className="els-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="els-sum-from">filtered template content</span> &rarr;{' '}
                  <span className="els-sum-to">inbox-landing personalised outreach</span>
                </span>
              </p>
            </article>
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
          <h2 data-reveal>Ready to Land in the<br />Inbox for Good?</h2>
          <p data-reveal>Stop losing campaigns to spam folders, broken authentication, and cold sending domains.<br />Put all five products to work on your next campaign and watch your inbox placement climb.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Fix My Deliverability Free <Icon name="arrow-right" /></button>
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
      <EmailsSpamScripts />
    </>
  );
}
