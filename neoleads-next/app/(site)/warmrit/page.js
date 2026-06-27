import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import Link from 'next/link';

export const metadata = { title: 'Warmrit | Email Warmup by NeoLeads' };

export default function WarmritPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="wm-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>

          <span className="hero-badge" data-reveal>
            <Icon name="flame" aria-hidden="true" />
            Warmrit | Email Warmup by NeoLeads
          </span>

          <h1 data-reveal>
            Don't Send Until Warmrit<br />
            <span className="line-two">Approves.</span>
          </h1>

          <p className="hero-sub" data-reveal>
            Warmrit builds your sender reputation the right way, gradually, continuously, and with
            AI-generated warmup conversations that look exactly like the emails your inbox should
            be sending. When the readiness score hits green, Sendrit is cleared to launch.
          </p>

          <div className="wm-ctas" data-reveal>
            <button className="btn-primary">Start Warming Free <Icon name="arrow-right" /></button>
            <button className="btn-ghost">See Warmrit in Action</button>
          </div>

          <div className="wm-trust" data-reveal>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              AI-driven warmup network
            </span>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              Continuous protection
            </span>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              Readiness scoring
            </span>
          </div>

          <div className="wm-dash" data-reveal>
            <div className="wm-dash-frame">
              <img src="/Hero%20Image%20Box%20(4)%202.png" alt="Warmrit dashboard: warmup status, inbox readiness scores, and sender reputation at a glance" />
            </div>
          </div>

        </div>
      </section>

      {/* ===================== FEATURES — HOW WARMRIT WORKS ===================== */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-label" data-reveal>WARMRIT THAT ACTUALLY WORKS</span>
            <h2 data-reveal>Reputation Isn't Built in a Week.<br />Warmrit Builds It Properly.</h2>
            <p data-reveal>Most warmup tools do one thing — send generic emails on a fixed schedule and hope for the best. Warmrit runs four coordinated systems to make sure your inboxes are genuinely trusted before any campaign starts.</p>
          </div>

          <div className="feat-grid" data-reveal-stagger="140">

            {/* Card 1: AI Warmup Network */}
            <article className="feat-card" data-reveal>
              <div className="feat-text">
                <h3>AI Warmup Network</h3>
                <p>Warmrit's network exchanges realistic, industry-matched conversations with your inbox — not generic lorem ipsum that spam filters pattern-match in milliseconds.</p>
              </div>
              <div className="chat-mock">
                <div className="chat-item">
                  <div className="chat-item-header">
                    <div className="chat-avatar">JL</div>
                    <span className="chat-subject">Re: following up on Q3 goals</span>
                    <span className="ai-badge">AI Generated</span>
                  </div>
                  <p className="chat-quote">"Thanks for the update the numbers look strong. Let's sync next week to lock the plan..."</p>
                </div>
                <div className="chat-item">
                  <div className="chat-item-header">
                    <div className="chat-avatar" style={{ background: 'linear-gradient(135deg,#1E3A5F,#2A5080)' }}>MH</div>
                    <span className="chat-subject">Quick question on the proposal</span>
                  </div>
                  <p className="chat-quote">"Got it, appreciate the quick turnaround. One thing on pricing tiers — mind a 15-min call?"</p>
                </div>
              </div>
            </article>

            {/* Card 2: Gradual Ramp Scheduling */}
            <article className="feat-card" data-reveal>
              <div className="bar-chart-wrap">
                <div className="bar-chart-header">
                  <span className="bar-chart-label">Daily Warmup Volume</span>
                  <span className="bar-chart-metric">5 &rarr; 40 / Day</span>
                </div>
                <div className="bar-chart-body">
                  <div className="bar" style={{ height: '12%' }}></div>
                  <div className="bar" style={{ height: '18%' }}></div>
                  <div className="bar" style={{ height: '25%' }}></div>
                  <div className="bar" style={{ height: '34%' }}></div>
                  <div className="bar" style={{ height: '43%' }}></div>
                  <div className="bar" style={{ height: '51%' }}></div>
                  <div className="bar" style={{ height: '61%' }}></div>
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar" style={{ height: '78%' }}></div>
                  <div className="bar" style={{ height: '86%' }}></div>
                  <div className="bar" style={{ height: '93%' }}></div>
                  <div className="bar" style={{ height: '100%' }}></div>
                </div>
                <div className="bar-chart-weeks">
                  <span className="bar-week-label">Week 1</span>
                  <span className="bar-week-label">Week 2</span>
                  <span className="bar-week-label">Week 3</span>
                  <span className="bar-week-label">Week 4</span>
                </div>
              </div>
              <div className="feat-text">
                <h3>Gradual Ramp Scheduling</h3>
                <p>Sending volume increases on an adaptive schedule calibrated to your domain age and reputation — never a sudden spike that looks suspicious, always a natural growth curve.</p>
              </div>
            </article>

            {/* Card 3: Spam Folder Rescue */}
            <article className="feat-card" data-reveal>
              <div className="feat-text">
                <h3>Spam Folder Rescue</h3>
                <p>Warmrit monitors every warmup email's placement and automatically rescues any that land in spam — marking them important and moving them to primary to build positive engagement signals.</p>
              </div>
              <div className="spam-rescue-wrap">
                <p className="spam-rescue-label">Automatic Spam Rescue</p>
                <div className="spam-rescue-flow">
                  <div className="rescue-box spam">
                    <span className="rescue-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                    </span>
                    <span className="rescue-label-text">Spam</span>
                  </div>
                  <div className="rescue-arrow">
                    <span className="rescue-arrow-label">Rescued</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </div>
                  <div className="rescue-box primary">
                    <span className="rescue-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></svg>
                    </span>
                    <span className="rescue-label-text">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      Primary
                    </span>
                  </div>
                </div>
                <div className="rescue-status">
                  <span className="s-dot"></span>
                  Marked important &middot; positive signal logged
                </div>
              </div>
            </article>

            {/* Card 4: Readiness Score */}
            <article className="feat-card" data-reveal>
              <div className="readiness-visual">
                <div className="score-ring">
                  <svg viewBox="0 0 88 88" aria-hidden="true">
                    <defs>
                      <linearGradient id="wmScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6C2BDF" />
                        <stop offset="100%" stopColor="#A576F8" />
                      </linearGradient>
                    </defs>
                    <circle className="track" cx="44" cy="44" r="37" />
                    <circle className="fill" cx="44" cy="44" r="37" />
                  </svg>
                  <div className="score-inner">
                    <span className="score-number">94</span>
                    <span className="score-sublabel">Readiness</span>
                  </div>
                </div>
                <div className="readiness-pills">
                  <div className="readiness-pill green">
                    <span className="r-dot"></span>
                    Inbox Ready
                  </div>
                  <div className="readiness-pill purple">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    Sendrit: Cleared
                  </div>
                </div>
              </div>
              <div className="feat-text">
                <h3>Readiness Score</h3>
                <p>Every inbox gets a live 0–100 readiness score updated daily. Only inboxes that hit the threshold are cleared for Sendrit so no campaign ever launches from an under-warmed domain.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===================== CONTINUOUS PROTECTION ===================== */}
      <section className="section alt" id="continuous-protection">
        <div className="container">
          <div className="protection-split" data-reveal-stagger="140">

            {/* LEFT: copy */}
            <div className="protection-text">
              <span className="section-label" data-reveal>CONTINUOUS PROTECTION</span>
              <h2 data-reveal>Warming Doesn't Stop When the Campaign Starts.</h2>
              <p data-reveal>Warmup isn't a pre-launch step — it's an ongoing commitment. The moment campaigns go live, your domain is under pressure. Warmrit stays active before, during, and between every campaign to keep your reputation intact.</p>
              <div className="protection-bullets" data-reveal>
                <div className="protection-bullet">
                  <div className="pb-icon"><Icon name="refresh-cw" /></div>
                  <div className="pb-body">
                    <h4>Campaign-Synced Warmup</h4>
                    <p>Warmrit automatically adjusts warmup volume when Sendrit campaigns are active maintaining the right warmup-to-campaign rate to keep provider trust signals strong throughout.</p>
                  </div>
                </div>
                <div className="protection-bullet">
                  <div className="pb-icon"><Icon name="shield-alert" /></div>
                  <div className="pb-body">
                    <h4>Reputation Recovery Mode</h4>
                    <p>If a domain takes a hit — a bad list batch, a complaint spike, or an IP flag — Warmrit detects the drop and activates an intensive recovery schedule to rebuild placement before the next campaign window.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Domain Health card */}
            <div className="domain-card" data-reveal>
              <div className="dc-header">
                <span className="dc-dot"></span>
                <span className="dc-title">Domain Health</span>
                <span className="dc-domain">outreach-mkt.io</span>
              </div>
              <div className="dc-rows">
                <div className="dc-row">
                  <div className="dc-row-left">
                    <span className="dc-icon amber"><Icon name="triangle-alert" /></span>
                    <span className="dc-label">Campaign Status</span>
                  </div>
                  <span className="dc-val active">Sendrit Active</span>
                </div>
                <div className="dc-row">
                  <div className="dc-row-left">
                    <span className="dc-icon"><Icon name="flame" /></span>
                    <span className="dc-label">Warmup</span>
                  </div>
                  <span className="dc-val active">Running &middot; 18/day</span>
                </div>
                <div className="dc-row">
                  <div className="dc-row-left">
                    <span className="dc-icon green"><Icon name="trending-up" /></span>
                    <span className="dc-label">Reputation Trend</span>
                  </div>
                  <span className="dc-val trend">&#9650; +6 pts this week</span>
                </div>
                <div className="dc-row">
                  <div className="dc-row-left">
                    <span className="dc-icon dim"><Icon name="shield" /></span>
                    <span className="dc-label">Reputation Recovery Mode</span>
                  </div>
                  <span className="dc-val muted">Inactive &mdash; domain is healthy</span>
                </div>
              </div>
              <div className="dc-footer">
                <span className="dc-footer-dot"></span>
                Last spam complaint: 0 in past 30 days
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== READINESS DASHBOARD ===================== */}
      <section className="section" id="readiness-dashboard">
        <div className="container">
          <div className="readiness-split">

            {/* LEFT: Domain readiness table */}
            <div className="domain-table-card" data-reveal>
              <div className="dt-head">
                <span className="dt-col-label">Domain</span>
                <span className="dt-col-label center">Day</span>
                <span className="dt-col-label center">Score</span>
                <span className="dt-col-label">Status</span>
                <span className="dt-col-label">Sendrit</span>
              </div>
              <div className="dt-rows">
                <div className="dt-row">
                  <div><div className="dt-domain-name">outreach-nl.io</div><div className="dt-primary-pct">98% Primary</div></div>
                  <span className="dt-day">28</span>
                  <span className="dt-score green">97</span>
                  <span className="dt-status"><span className="dt-status-dot green"></span><span className="dt-status-text green">Ready</span></span>
                  <span><span className="dt-sendrit-btn">Cleared &#8250;</span></span>
                </div>
                <div className="dt-row">
                  <div><div className="dt-domain-name">getneoleads.io</div><div className="dt-primary-pct">91% Primary</div></div>
                  <span className="dt-day">21</span>
                  <span className="dt-score green">88</span>
                  <span className="dt-status"><span className="dt-status-dot green"></span><span className="dt-status-text green">Ready</span></span>
                  <span><span className="dt-sendrit-btn">Cleared &#8250;</span></span>
                </div>
                <div className="dt-row">
                  <div><div className="dt-domain-name">neoleads-hq.com</div><div className="dt-primary-pct">84% Primary</div></div>
                  <span className="dt-day">14</span>
                  <span className="dt-score amber">72</span>
                  <span className="dt-status"><span className="dt-status-dot amber"></span><span className="dt-status-text amber">Warning</span></span>
                  <span className="dt-sendrit-wait">Waiting</span>
                </div>
                <div className="dt-row">
                  <div><div className="dt-domain-name">reach-nl.io</div><div className="dt-primary-pct">71% Primary</div></div>
                  <span className="dt-day">7</span>
                  <span className="dt-score amber">41</span>
                  <span className="dt-status"><span className="dt-status-dot amber"></span><span className="dt-status-text amber">Warning</span></span>
                  <span className="dt-sendrit-wait">Waiting</span>
                </div>
                <div className="dt-row">
                  <div><div className="dt-domain-name">nl-outbound.io</div></div>
                  <span className="dt-day">1</span>
                  <span className="dt-score red">12</span>
                  <span className="dt-status"><span className="dt-status-dot red"></span><span className="dt-status-text red">Starting</span></span>
                  <span className="dt-sendrit-no">Not ready</span>
                </div>
              </div>
              <div className="dt-footer">
                <span className="dt-footer-stat cleared"><span className="fdot"></span>2 Cleared for Sendrit</span>
                <span className="dt-footer-stat warning"><span className="fdot"></span>2 Warning</span>
                <span className="dt-footer-stat starting"><span className="fdot"></span>1 Starting</span>
              </div>
            </div>

            {/* RIGHT: copy */}
            <div className="readiness-copy" data-reveal-stagger="120">
              <span className="section-label" data-reveal>READINESS DASHBOARD</span>
              <h2 data-reveal>Know Exactly Which Inboxes Are Ready and Which Still Need Time.</h2>
              <p data-reveal>Every inbox under Warmrit's management has a live readiness score visible in one place so your team knows at a glance what's cleared, what's still warming, and what's just been added to the rotation.</p>
              <div className="readiness-features" data-reveal>
                <div className="protection-bullet">
                  <div className="pb-icon"><Icon name="bar-chart-2" /></div>
                  <div className="pb-body">
                    <h4>Per-Inbox Score Breakdown</h4>
                    <p>Drill into any inbox's score to see which signals are strong and which are dragging the number down: inbox placement, spam rate, reply engagement, and domain age, all broken out.</p>
                  </div>
                </div>
                <div className="protection-bullet">
                  <div className="pb-icon"><Icon name="lock" /></div>
                  <div className="pb-body">
                    <h4>Automatic Sendrit Gating</h4>
                    <p>When an inbox's score crosses the threshold, Warmrit automatically signals Snaarpmail and Sendrit that it's cleared &mdash; no manual check, no missed &ldquo;is it ready yet&rdquo; moment.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== DELIVERABILITY INTELLIGENCE ===================== */}
      <section className="section alt" id="deliverability">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-badge" data-reveal><Icon name="zap" aria-hidden="true" /> Deliverability Intelligence</span>
            <h2 data-reveal>A Full Picture of Every Domain's Health, All in One View</h2>
            <p data-reveal>Warmrit doesn't just run warmup in the background &mdash; it surfaces a live, actionable picture of every sending domain's deliverability health so you always know what's working, what's at risk, and what needs attention.</p>
          </div>

          <div className="deliv-grid" data-reveal-stagger="130">

            {/* Card 1: Inbox Placement Tracking */}
            <article className="deliv-card" data-reveal>
              <div>
                <h3>Inbox Placement Tracking</h3>
                <p className="deliv-desc">See exactly what percentage of warmup emails land in primary versus promotions or spam, broken down by provider so you know not just &ldquo;is it warming&rdquo; but &ldquo;is it warming with the right providers.&rdquo;</p>
              </div>
              <div className="provider-bars-wrap">
                <p className="provider-bars-label">Placement by Provider</p>
                <div className="provider-bar-row">
                  <span className="provider-name">Gmail</span>
                  <div className="provider-track"><div className="provider-fill" style={{ width: '94%' }}></div></div>
                  <span className="provider-pct">94% Primary</span>
                </div>
                <div className="provider-bar-row">
                  <span className="provider-name">Outlook</span>
                  <div className="provider-track"><div className="provider-fill" style={{ width: '91%' }}></div></div>
                  <span className="provider-pct">91% Primary</span>
                </div>
                <div className="provider-bar-row">
                  <span className="provider-name">Yahoo</span>
                  <div className="provider-track"><div className="provider-fill" style={{ width: '88%' }}></div></div>
                  <span className="provider-pct">88% Primary</span>
                </div>
              </div>
            </article>

            {/* Card 2: Blacklist Monitoring */}
            <article className="deliv-card" data-reveal>
              <div>
                <h3>Blacklist Monitoring</h3>
                <p className="deliv-desc">Warmrit checks every sending domain against major blacklists daily and alerts your team immediately if a domain appears before a live Sendrit campaign takes a hit from a flagged IP or domain.</p>
              </div>
              <div className="blacklist-visual">
                <div className="bl-icon-wrap"><Icon name="shield-check" /></div>
                <p className="bl-status">Blacklist: Clear</p>
                <p className="bl-checked">Last checked: 2 hrs ago</p>
                <div className="bl-stats-row">
                  <div className="bl-stat">
                    <div className="bl-stat-num">80</div>
                    <div className="bl-stat-label">Lists Scanned</div>
                  </div>
                  <div className="bl-stat-divider"></div>
                  <div className="bl-stat">
                    <div className="bl-stat-num">0</div>
                    <div className="bl-stat-label">Flags Found</div>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 3: Warmup Timeline & Forecast */}
            <article className="deliv-card" data-reveal>
              <div>
                <h3>Warmup Timeline &amp; Forecast</h3>
                <p className="deliv-desc">A projected timeline per inbox showing when it's expected to hit campaign-ready based on current trajectory so you can plan launch dates around actual readiness, not a guess.</p>
              </div>
              <div className="forecast-visual">
                <p className="forecast-top-label">Warmup Forecast &mdash; reach-nl.io</p>
                <div className="forecast-timeline">
                  <div className="forecast-track"><div className="forecast-track-fill"></div></div>
                  <div className="forecast-dots-row">
                    <span className="forecast-dot done"></span>
                    <span className="forecast-dot current"></span>
                    <span className="forecast-dot future">
                      <svg viewBox="0 0 12 12" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="2 6 5 9 10 3" /></svg>
                    </span>
                  </div>
                  <div className="forecast-labels-row">
                    <div className="forecast-point-label">
                      <div className="forecast-day">Day 1</div>
                      <div className="forecast-sub">Started</div>
                    </div>
                    <div className="forecast-point-label">
                      <div className="forecast-day">Day 14</div>
                      <div className="forecast-sub">Now &middot; 72</div>
                    </div>
                    <div className="forecast-point-label">
                      <div className="forecast-day">Day 21</div>
                      <div className="forecast-sub ready">Ready</div>
                    </div>
                  </div>
                </div>
                <div className="forecast-ready-banner">
                  <span className="f-dot"></span>
                  Projected campaign-ready in <strong>&nbsp;7 days</strong>
                </div>
              </div>
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
          <h2 data-reveal>Ready to Warm Up<br />Your Sender Reputation?</h2>
          <p data-reveal>Start building inbox trust today, gradually, continuously, and automatically, so every campaign lands where it belongs.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Start Warming Free <Icon name="arrow-right" /></button>
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
    </>
  );
}
