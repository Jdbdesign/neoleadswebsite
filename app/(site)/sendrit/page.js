import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: 'Sendrit | AI Outreach Engine by NeoLeads' };

export default function SendritPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="sr-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>

          <span className="hero-badge" data-reveal>
            <Icon name="send" aria-hidden="true" />
            Sendrit | AI Outreach Engine by NeoLeads
          </span>

          <h1 data-reveal>
            Write Once. Send Smart.<br />
            <span className="line-two">Reply More.</span>
          </h1>

          <p className="hero-sub" data-reveal>
            Sendrit takes the verified, signal-backed leads from your Zeus search, writes a
            personalized sequence for each one with NeoBrain AI, and delivers it across email,
            LinkedIn, and calling, automatically, at whatever volume your pipeline demands.
          </p>

          <div className="sr-ctas" data-reveal>
            <a href="https://sendrit.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">Launch Your First Campaign Free <Icon name="arrow-right" /></a>
            <button className="btn-ghost">See Sendrit in Action</button>
          </div>

          <div className="sr-trust" data-reveal>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              Deliverability built in
            </span>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              No card needed
            </span>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              AI-written sequences
            </span>
          </div>

          <div className="sr-dash" data-reveal>
            <div className="sr-dash-frame">
              <img src="/sendrit-dashboard-1.png" alt="Sendrit dashboard: campaigns, contacts, open and click rates at a glance" />
            </div>
          </div>

        </div>
      </section>

      {/* ===================== FOUR ENGINES ===================== */}
      <section className="sr-engines" id="engines">
        <div className="container">

          {/* Header */}
          <div className="eng-header" data-reveal-stagger="100" data-reveal-onload>
            <div data-reveal><span className="eng-eyebrow"><span className="star-glyph">✦</span> EVERYTHING A CAMPAIGN NEEDS, BUILT IN</span></div>
            <h2 className="eng-h2" data-reveal>Four Engines Behind Every Sendrit Campaign</h2>
            <p className="eng-sub" data-reveal>Every campaign you launch runs on four systems working simultaneously, so the right message reaches the right person at exactly the right moment, every time.</p>
          </div>

          {/* Grid */}
          <div className="engines-grid">

            {/* 1 · AI Sequence Writing — text top, UI bottom */}
            <div className="eng-cell text-first" data-reveal>
              <div className="eng-text">
                <h3>AI Sequence Writing</h3>
                <p>NeoBrain AI researches each prospect and writes a distinct, signal-backed opening for every contact then builds out the full multi-step sequence around it.</p>
              </div>
              <div className="eng-ui">
                <div className="ai-hd">
                  <span className="ui-label">AI SEQUENCE</span>
                  <span className="ai-written-tag">AI Written</span>
                </div>
                <div className="ai-email-card">
                  <div className="ai-email-subject">Quick thought on Helix's hiring push</div>
                  <div className="ai-email-preview">Saw you just opened 8 SDR roles after the Series B. Most teams hiring that fast hit a pipeline wall...</div>
                </div>
                <div className="ai-prog-track"><div className="ai-prog-fill"></div></div>
                <div className="ai-ft">
                  <span className="ai-ft-count">5-step sequence generated</span>
                  <span className="ai-ft-step">Step 1 of 8</span>
                </div>
              </div>
            </div>

            {/* 2 · Multichannel Delivery — UI top, text bottom */}
            <div className="eng-cell card-first" data-reveal>
              <div className="eng-ui">
                <div className="ch-label-row"><span className="ui-label">ONE CAMPAIGN &middot; THREE CHANNELS</span></div>
                <div className="ch-row">
                  <span className="ch-icon email-ic"><Icon name="mail" /></span>
                  <span className="ch-name">Email</span>
                  <span className="ch-status s-sent">
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="6" /><polyline points="4.5 7 6.2 8.8 9.5 5.5" /></svg>
                    Sent
                  </span>
                </div>
                <div className="ch-row">
                  <span className="ch-icon li-ic"><Icon name="linkedin" /></span>
                  <span className="ch-name">LinkedIn</span>
                  <span className="ch-status s-sent">
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="6" /><polyline points="4.5 7 6.2 8.8 9.5 5.5" /></svg>
                    Sent
                  </span>
                </div>
                <div className="ch-row">
                  <span className="ch-icon ph-ic"><Icon name="phone" /></span>
                  <span className="ch-name">Calling</span>
                  <span className="ch-status s-queued">
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="6" /><polyline points="4.5 7 6.2 8.8 9.5 5.5" /></svg>
                    Queued
                  </span>
                </div>
              </div>
              <div className="eng-text">
                <h3>Multichannel Delivery</h3>
                <p>One campaign across email, LinkedIn, and calling, orchestrated automatically. No separate tools, no separate logins, no dropped follow-ups between channels.</p>
              </div>
            </div>

            {/* 3 · Signal-Based Follow-Up — text top, UI bottom */}
            <div className="eng-cell text-first" data-reveal>
              <div className="eng-text">
                <h3>Signal-Based Follow-Up</h3>
                <p>A reply, an open, a click, or silence: Sendrit reads each signal and triggers the right next step automatically, without a rep lifting a finger.</p>
              </div>
              <div className="eng-ui">
                <div className="trig-label-row"><span className="ui-label">SMART TRIGGERS</span></div>
                <div className="trig-row">
                  <span className="trig-pill t-orange">No reply &middot; Day 3</span>
                  <span className="trig-arrow">&#8594;</span>
                  <span className="trig-action">Send Follow-Up 2</span>
                </div>
                <div className="trig-row">
                  <span className="trig-pill t-amber">Opened, no reply</span>
                  <span className="trig-arrow">&#8594;</span>
                  <span className="trig-action">LinkedIn nudge</span>
                </div>
                <div className="trig-row">
                  <span className="trig-pill t-green">Replied</span>
                  <span className="trig-arrow">&#8594;</span>
                  <span className="trig-action">Pause & alert rep</span>
                </div>
              </div>
            </div>

            {/* 4 · Deliverability Protection — UI top, text bottom */}
            <div className="eng-cell card-first" data-reveal>
              <div className="eng-ui">
                <div className="inbox-card">
                  <div className="inbox-shield-ic"><Icon name="shield-check" /></div>
                  <div>
                    <div className="inbox-tt">Inbox Ready</div>
                    <div className="inbox-st">Domain health &middot; 98/100</div>
                  </div>
                </div>
                <div className="deliv-checks">
                  <div className="deliv-check">
                    <span className="chk-dot"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                    Warmrit
                  </div>
                  <div className="deliv-check">
                    <span className="chk-dot"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                    SPF
                  </div>
                  <div className="deliv-check">
                    <span className="chk-dot"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                    DKIM
                  </div>
                  <div className="deliv-check">
                    <span className="chk-dot"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                    DMARC
                  </div>
                </div>
              </div>
              <div className="eng-text">
                <h3>Deliverability Protection</h3>
                <p>Send-time optimization, inbox rotation, SPF/DKIM/DMARC compliance, and pre-warmed domains via Warmrit baked into every campaign before a single email goes out.</p>
              </div>
            </div>

          </div>{/* /engines-grid */}
        </div>
      </section>

      {/* ===================== PERSONALIZATION ===================== */}
      <section className="sr-personalize">
        <div className="container">
          <div className="pers-split">

            {/* Left: text + features */}
            <div className="pers-left" data-reveal-stagger="100">
              <span className="pers-eyebrow" data-reveal>AI PERSONALIZATION AT SCALE</span>
              <h2 className="pers-h2" data-reveal>Not Merge Tags. Real Research. Real Replies.</h2>
              <p className="pers-body" data-reveal>Most &ldquo;AI personalization&rdquo; swaps in a first name and calls it done. Sendrit&rsquo;s AI reads the buying signal that surfaced each contact in Zeus, from their company news, role change, funding round, or hiring push, and writes an opening that proves you did your homework, because the AI actually did.</p>
              <div className="pers-features" data-reveal>
                <div className="pf-item">
                  <div className="pf-icon-wrap"><Icon name="zap" /></div>
                  <div>
                    <div className="pf-title">Signal-Driven First Lines</div>
                    <div className="pf-desc">Every email opens with the specific reason this contact was worth reaching out to right now, not a generic opener dressed up in their job title.</div>
                  </div>
                </div>
                <div className="pf-item">
                  <div className="pf-icon-wrap"><Icon name="mic" /></div>
                  <div>
                    <div className="pf-title">Tone & Voice Training</div>
                    <div className="pf-desc">Upload examples, set tone preferences, define what &ldquo;sounds like us,&rdquo; and every AI sequence reflects it, across every contact, at any volume.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: comparison card */}
            <div className="pers-right" data-reveal>
              <div className="pc-wrap">
                <div className="pc-title">The difference personalization makes</div>

                {/* Generic */}
                <div className="pc-ccard">
                  <div className="pc-card-hd">
                    <span className="pc-lbl-generic">GENERIC</span>
                    <span className="pc-badge-x" aria-label="Bad example">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="3" x2="9" y2="9" /><line x1="9" y1="3" x2="3" y2="9" /></svg>
                    </span>
                  </div>
                  <p className="pc-quote generic">&ldquo;Hi <span className="merge-tag">[FirstName]</span>, I wanted to reach out about how we help companies like <span className="merge-tag">[Company]</span> improve their sales process...&rdquo;</p>
                </div>

                {/* Sendrit AI */}
                <div className="pc-ccard">
                  <div className="pc-card-hd">
                    <span className="pc-lbl-sendrit"><Icon name="send" /> SENDRIT AI</span>
                    <span className="pc-badge-ok" aria-label="Good example">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 4.5 8.5 10 3" /></svg>
                    </span>
                  </div>
                  <p className="pc-quote ai">&ldquo;Hi Marcus, saw Acme just opened 8 SDR roles after the Series B. Most teams hiring that fast hit deliverability walls before they hit quota...&rdquo;</p>
                  <div className="pc-signal-tags">
                    <span className="pc-signal-tag">Series B signal</span>
                    <span className="pc-signal-tag">Hiring push</span>
                  </div>
                </div>

                <p className="pc-footer">Personalized emails get <span className="pc-green">more replies</span> on average</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== CAMPAIGN ANALYTICS ===================== */}
      <section className="sr-analytics">
        <div className="container">
          <div className="analytics-split">

            {/* Left: table UI mockup */}
            <div className="an-left" data-reveal>
              <div className="an-table-frame">

                {/* Column headers */}
                <div className="an-tbl-head" role="row" aria-label="Campaign table headers">
                  <span className="an-tbl-col">Campaign</span>
                  <span className="an-tbl-col num">Sent</span>
                  <span className="an-tbl-col num">Open</span>
                  <span className="an-tbl-col num">Reply</span>
                  <span className="an-tbl-col num">Mtgs</span>
                  <span className="an-tbl-col">Status</span>
                </div>

                {/* Rows */}
                <div className="an-tbl-body">

                  <div className="an-row">
                    <div className="an-camp">
                      <span className="an-camp-name">Q3 SaaS: VP Sales</span>
                      <span className="an-camp-count">480 contacts</span>
                    </div>
                    <span className="an-cell">480</span>
                    <span className="an-cell">51%</span>
                    <span className="an-cell reply-val">11.2%</span>
                    <span className="an-cell mtgs-val">22</span>
                    <span className="an-status s-live"><span className="s-dot" aria-hidden="true"></span>LIVE</span>
                  </div>

                  <div className="an-row">
                    <div className="an-camp">
                      <span className="an-camp-name">Series B Follow-Up</span>
                      <span className="an-camp-count">210 contacts</span>
                    </div>
                    <span className="an-cell">210</span>
                    <span className="an-cell">43%</span>
                    <span className="an-cell reply-val">8.7%</span>
                    <span className="an-cell mtgs-val">14</span>
                    <span className="an-status s-live"><span className="s-dot" aria-hidden="true"></span>LIVE</span>
                  </div>

                  <div className="an-row">
                    <div className="an-camp">
                      <span className="an-camp-name">Agency Outreach</span>
                      <span className="an-camp-count">340 contacts</span>
                    </div>
                    <span className="an-cell">290</span>
                    <span className="an-cell">38%</span>
                    <span className="an-cell reply-val">6.4%</span>
                    <span className="an-cell mtgs-val">9</span>
                    <span className="an-status s-paused" aria-label="Paused">
                      <span className="s-pause" aria-hidden="true"><span></span><span></span></span>PAUSED
                    </span>
                  </div>

                  <div className="an-row">
                    <div className="an-camp">
                      <span className="an-camp-name">Re-engage Cold Leads</span>
                      <span className="an-camp-count">130 contacts</span>
                    </div>
                    <span className="an-cell">130</span>
                    <span className="an-cell">29%</span>
                    <span className="an-cell reply-val">4.1%</span>
                    <span className="an-cell mtgs-val">3</span>
                    <span className="an-status s-done" aria-label="Done">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="2 6 5 9 10 3" /></svg>
                      DONE
                    </span>
                  </div>

                  <div className="an-row">
                    <div className="an-camp">
                      <span className="an-camp-name">EMEA Expansion</span>
                      <span className="an-camp-count">560 contacts</span>
                    </div>
                    <span className="an-cell">0</span>
                    <span className="an-dash an-cell">-</span>
                    <span className="an-dash an-cell">-</span>
                    <span className="an-dash an-cell">-</span>
                    <span className="an-status s-draft"><span className="s-plus" aria-hidden="true">+</span> DRAFT</span>
                  </div>

                </div>{/* /an-tbl-body */}

                {/* Footer totals */}
                <div className="an-tbl-footer">
                  <span className="an-footer-replies">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                    Total replies this month: <strong>147</strong>
                  </span>
                  <span className="an-footer-meetings">Meetings booked: <strong>48</strong></span>
                </div>

              </div>
            </div>{/* /an-left */}

            {/* Right: text + features */}
            <div className="an-right" data-reveal-stagger="100">
              <span className="an-eyebrow" data-reveal>Campaign Analytics</span>
              <h2 className="an-h2" data-reveal>Every Campaign's<br />Performance. One Screen.</h2>
              <p className="an-body" data-reveal>See open rates, reply rates, and meetings booked across every live campaign without opening a single spreadsheet, and pause, adjust, or scale any campaign in one click.</p>
              <div className="an-features" data-reveal>
                <div className="an-feat">
                  <div className="an-feat-icon"><Icon name="bar-chart-2" /></div>
                  <div>
                    <div className="an-feat-title">Real-Time Campaign Stats</div>
                    <div className="an-feat-desc">Open rates, reply rates, click-throughs, and meeting bookings update live as your campaign runs, with no manual refresh and no delayed reporting.</div>
                  </div>
                </div>
                <div className="an-feat">
                  <div className="an-feat-icon"><Icon name="git-branch" /></div>
                  <div>
                    <div className="an-feat-title">A/B Testing Built In</div>
                    <div className="an-feat-desc">Test subject lines, opening lines, or entire sequence variants and let Sendrit automatically scale the winner once a clear pattern emerges.</div>
                  </div>
                </div>
              </div>
            </div>{/* /an-right */}

          </div>
        </div>
      </section>

      {/* ===================== OUTREACH INTELLIGENCE ===================== */}
      <section className="sr-intelligence">
        <div className="container">

          {/* Header */}
          <div className="int-header" data-reveal-stagger="100">
            <div data-reveal><span className="int-eyebrow"><span className="star-glyph">✦</span> OUTREACH INTELLIGENCE</span></div>
            <h2 className="int-h2" data-reveal>Everything to Know Before You Send and After</h2>
            <p className="int-body" data-reveal>Sendrit doesn&rsquo;t just launch campaigns. It watches how they perform, surfaces what&rsquo;s working, and tells you where to adjust, so every campaign gets smarter than the last.</p>
          </div>

          {/* Three cards */}
          <div className="int-grid" data-reveal-stagger="120">

            {/* Card 1: Inbox Placement Monitoring */}
            <article className="int-card" data-reveal>
              <h3 className="int-card-title">Inbox Placement Monitoring</h3>
              <p className="int-card-desc">See exactly where your emails land across every sending domain, whether primary, promotions, or spam, in real time, before a bad placement kills a live campaign.</p>
              <div className="int-ui">
                <div className="donut-wrap">
                  <svg viewBox="0 0 100 100" className="donut-svg" aria-hidden="true">
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#1A2040" strokeWidth="12" />
                    <circle cx="50" cy="50" r="36" fill="none"
                      stroke="#22C55E" strokeWidth="12"
                      strokeDasharray="212.62 226.19"
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="36" fill="none"
                      stroke="#F97316" strokeWidth="12"
                      strokeDasharray="9.05 226.19"
                      strokeDashoffset="-212.62"
                      transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="36" fill="none"
                      stroke="#EF4444" strokeWidth="12"
                      strokeDasharray="4.52 226.19"
                      strokeDashoffset="-221.67"
                      transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="donut-center">
                    <span className="donut-pct">94%</span>
                    <span className="donut-lbl">Primary</span>
                  </div>
                </div>
                <div className="donut-legend">
                  <div className="donut-leg-item">
                    <span className="donut-leg-dot d-primary" aria-hidden="true"></span>
                    <span className="donut-leg-name">Primary</span>
                    <span className="donut-leg-val v-primary">94%</span>
                  </div>
                  <div className="donut-leg-item">
                    <span className="donut-leg-dot d-promo" aria-hidden="true"></span>
                    <span className="donut-leg-name">Promotions</span>
                    <span className="donut-leg-val v-promo">4%</span>
                  </div>
                  <div className="donut-leg-item">
                    <span className="donut-leg-dot d-spam" aria-hidden="true"></span>
                    <span className="donut-leg-name">Spam</span>
                    <span className="donut-leg-val v-spam">2%</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 2: Reply Intent Classification */}
            <article className="int-card" data-reveal>
              <h3 className="int-card-title">Reply Intent Classification</h3>
              <p className="int-card-desc">NeoBrain AI reads every reply and classifies it as interested, objection, unsubscribe, or referral, so your team knows which conversations to prioritize before they open Snaarpmail.</p>
              <div className="int-ui">
                <div className="ri-hd">Reply Intent &middot; NeoBrain AI</div>
                <div className="ri-row">
                  <span className="ri-av" aria-hidden="true">DR</span>
                  <span className="ri-msg">&ldquo;Let&rsquo;s grab 30 min&hellip;&rdquo;</span>
                  <span className="ri-badge b-interested">Interested</span>
                </div>
                <div className="ri-row">
                  <span className="ri-av" aria-hidden="true">MC</span>
                  <span className="ri-msg">&ldquo;Already use a vendor&hellip;&rdquo;</span>
                  <span className="ri-badge b-objection">Objection</span>
                </div>
                <div className="ri-row">
                  <span className="ri-av" aria-hidden="true">AW</span>
                  <span className="ri-msg">&ldquo;Reach out next quarter&rdquo;</span>
                  <span className="ri-badge b-not-now">Not Now</span>
                </div>
              </div>
            </article>

            {/* Card 3: Sequence Optimization */}
            <article className="int-card" data-reveal>
              <h3 className="int-card-title">Sequence Optimization</h3>
              <p className="int-card-desc">Sendrit tracks which steps, subject lines, and timings generate the most replies and surfaces specific suggestions to fix the sequences that are underperforming.</p>
              <div className="int-ui">
                <div className="opt-hd">Optimization Insight</div>
                <div className="opt-step-row">
                  <span className="opt-step-lbl">Step 1</span>
                  <div className="opt-bar-track"><div className="opt-bar-fill b-green"></div></div>
                  <span className="opt-step-pct p-green">11%</span>
                </div>
                <div className="opt-step-row">
                  <span className="opt-step-lbl">Step 2</span>
                  <div className="opt-bar-track"><div className="opt-bar-fill b-purple"></div></div>
                  <span className="opt-step-pct p-purple">7%</span>
                </div>
                <div className="opt-step-row">
                  <span className="opt-step-lbl">Step 3</span>
                  <div className="opt-bar-track"><div className="opt-bar-fill b-red"></div></div>
                  <span className="opt-step-pct p-red">2%</span>
                </div>
                <div className="opt-insight">
                  <span className="opt-insight-dot" aria-hidden="true"></span>
                  <div>
                    <div className="opt-insight-title">Step 3 is underperforming</div>
                    <div className="opt-insight-desc">Suggested: shorten by 2 sentences and move to Day 5</div>
                  </div>
                </div>
              </div>
            </article>

          </div>{/* /int-grid */}
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
          <h2 data-reveal>Ready to Launch Your<br />First Campaign?</h2>
          <p data-reveal>Turn verified leads into personalized sequences that get replies, automatically, at any volume.</p>
          <div className="final-buttons" data-reveal>
            <a href="https://sendrit.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">Launch Your First Campaign Free <Icon name="arrow-right" /></a>
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
