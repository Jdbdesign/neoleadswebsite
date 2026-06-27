import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: 'NeoBrain AI | Pipeline Intelligence by NeoLeads' };

// Small reusable check glyph used across the page (matches the original inline SVG).
function CheckGlyph() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 6 5 9 10 3" />
    </svg>
  );
}

export default function NeoBrainAIPage() {
  return (
    <>
      <main>

        {/* ===================== HERO ===================== */}
        <section className="nb-hero">
          <div className="container" data-reveal-stagger="100" data-reveal-onload>

            <span className="hero-badge" data-reveal>
              <Icon name="brain-circuit" aria-hidden="true" />
              NeoBrain AI | Pipeline Intelligence by NeoLeads
            </span>

            <h1 data-reveal>
              The AI That Doesn&apos;t Stop<br />
              at the <span className="grad">Score.</span>
            </h1>

            <p className="hero-sub" data-reveal>
              Most AI tools score a list and call it done. NeoBrain AI runs the entire pipeline —
              ranking your best leads in Zeus, writing a personalized first line for every contact
              in Sendrit, classifying every reply in Snaarpmail, and learning from every outcome so
              the next campaign is smarter than the last.
            </p>

            <div className="nb-ctas" data-reveal>
              <button className="btn-primary">See NeoBrain in Action <Icon name="arrow-right" /></button>
              <button className="btn-ghost">Start Free</button>
            </div>

            <div className="nb-trust" data-reveal>
              <span className="item"><span className="check-ic"><CheckGlyph /></span>Explainable scoring</span>
              <span className="item"><span className="check-ic"><CheckGlyph /></span>Researches every prospect</span>
              <span className="item"><span className="check-ic"><CheckGlyph /></span>Learns from every outcome</span>
            </div>

            <div className="nb-dash" data-reveal>
              <div className="nb-dash-frame">
                <img src="/neobrain-dashboard-1.png" alt="NeoBrain AI dashboard: lead scoring, AI personalization, and reply classification live across your pipeline" />
              </div>
            </div>

          </div>
        </section>

        {/* ===================== INTELLIGENCE AT EVERY STAGE ===================== */}
        <section className="nb-stages" id="stages">
          <div className="container">

            <div className="stage-header" data-reveal-stagger="100">
              <div data-reveal><span className="stage-eyebrow"><span className="star-glyph">✦</span> THREE SYSTEMS. ONE BRAIN.</span></div>
              <h2 className="stage-h2" data-reveal>Intelligence at Every Stage Not Just the Top of the Funnel.</h2>
              <p className="stage-sub" data-reveal>Traditional AI scoring tools score a list and stop. NeoBrain AI runs four interconnected systems across the entire NeoLeads pipeline from the moment a lead is found to the moment a deal is closed.</p>
            </div>

            <div className="stages-grid">

              {/* 1 · ICP Fit Scoring */}
              <div className="stage-cell text-first" data-reveal>
                <div className="stage-text">
                  <h3>ICP Fit Scoring</h3>
                  <p>Every lead Zeus surfaces gets scored against your ideal customer profile role, company, size, industry, and growth signals so your team works the best-fit accounts first, automatically.</p>
                </div>
                <div className="stage-ui icp-ui">
                  <div className="icp-ring">
                    <svg viewBox="0 0 120 120" aria-hidden="true">
                      <defs>
                        <linearGradient id="icpGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#6C2BDF" />
                          <stop offset="1" stopColor="#A576F8" />
                        </linearGradient>
                      </defs>
                      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9" />
                      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#icpGrad)" strokeWidth="9" strokeLinecap="round" strokeDasharray="287.7 39" transform="rotate(90 60 60)" />
                    </svg>
                    <div className="icp-ring-val">
                      <span className="icp-ring-num">91</span>
                      <span className="icp-ring-den">/100</span>
                    </div>
                  </div>
                  <div className="icp-pills">
                    <span className="icp-pill p-icp">ICP Match</span>
                    <span className="icp-pill p-funded">Funded</span>
                    <span className="icp-pill p-hiring">Hiring</span>
                  </div>
                </div>
              </div>

              {/* 2 · Buying Signal Detection */}
              <div className="stage-cell card-first" data-reveal>
                <div className="stage-ui">
                  <span className="ui-label">Signal Timeline · Nova Labs</span>
                  <div className="sig-list">
                    <div className="sig-item">
                      <span className="sig-dot"></span>
                      <div className="sig-body">
                        <div className="sig-title">Raised Series B</div>
                        <div className="sig-meta">12 days ago · <span className="plus">+21 to score</span></div>
                      </div>
                    </div>
                    <div className="sig-item">
                      <span className="sig-dot"></span>
                      <div className="sig-body">
                        <div className="sig-title">New CRO appointed</div>
                        <div className="sig-meta">8 days ago · <span className="plus">+12 to score</span></div>
                      </div>
                    </div>
                    <div className="sig-item">
                      <span className="sig-dot"></span>
                      <div className="sig-body">
                        <div className="sig-title">8 SDR roles posted</div>
                        <div className="sig-meta">3 days ago · <span className="plus">+16 to score</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stage-text">
                  <h3>Buying Signal Detection</h3>
                  <p>NeoBrain AI monitors funding rounds, leadership changes, job postings, and tech shifts then weights each signal by relevance to your specific ICP to surface the &quot;why now&quot; behind every high score.</p>
                </div>
              </div>

              {/* 3 · Prospect Research & Personalization */}
              <div className="stage-cell text-first" data-reveal>
                <div className="stage-text">
                  <h3>Prospect Research &amp; Personalization</h3>
                  <p>Before Sendrit writes a single word, NeoBrain AI researches each prospect their role, their company&apos;s recent news, the signal that surfaced them and generates a first line that proves someone did the homework.</p>
                </div>
                <div className="stage-ui">
                  <div className="cmp-row">
                    <div className="cmp-hd">
                      <span className="cmp-label">Template</span>
                      <span className="cmp-badge x"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="3" x2="9" y2="9" /><line x1="9" y1="3" x2="3" y2="9" /></svg></span>
                    </div>
                    <div className="cmp-text generic">&quot;Hi [Name], I wanted to reach out...&quot;</div>
                  </div>
                  <div className="cmp-row is-neo">
                    <div className="cmp-hd">
                      <span className="cmp-label neo"><span className="star">★</span> NeoBrain</span>
                      <span className="cmp-badge ok"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                    </div>
                    <div className="cmp-text neo">&quot;Saw your team just opened 8 SDR roles...&quot;</div>
                  </div>
                </div>
              </div>

              {/* 4 · Reply Intent Classification */}
              <div className="stage-cell card-first" data-reveal>
                <div className="stage-ui">
                  <span className="ui-label">Incoming Reply · Classified</span>
                  <div className="reply-card">
                    <div className="reply-hd">
                      <span className="reply-av">MT</span>
                      <span className="reply-name">Marcus Tran</span>
                      <span className="reply-tag"><span className="dot"></span> High Intent</span>
                    </div>
                    <p className="reply-quote">&quot;This is actually great timing — we&apos;re evaluating tools for the new SDR team right now.&quot;</p>
                    <div className="reply-action">
                      <Icon name="arrow-right" aria-hidden="true" />
                      Suggested: Book via Kalender
                    </div>
                  </div>
                </div>
                <div className="stage-text">
                  <h3>Reply Intent Classification</h3>
                  <p>Every reply that lands in Snaarpmail is read by NeoBrain AI and classified Interested, Soft Objection, Not Now, Referral, Unsubscribe with a suggested next action attached, so your team knows what to do before reading a word.</p>
                </div>
              </div>

            </div>{/* /stages-grid */}
          </div>
        </section>

        {/* ===================== EXPLAINABLE SCORING ===================== */}
        <section className="nb-explain" id="explainable">
          <div className="container">
            <div className="explain-grid">

              {/* Left · copy */}
              <div data-reveal-stagger="100">
                <span className="exp-eyebrow" data-reveal>Explainable Scoring</span>
                <h2 className="exp-h2" data-reveal>Every Score Comes With a Reason Your Team Actually Believes.</h2>
                <p className="exp-lead" data-reveal>
                  The biggest reason AI lead scores get ignored is that reps don&apos;t know why a lead
                  scored where it did. A number without an explanation isn&apos;t intelligence it&apos;s noise.
                  NeoBrain AI surfaces the exact signals behind every score in plain English, so your
                  team trusts the ranking and acts on it.
                </p>
                <div className="exp-features">
                  <div className="exp-feature" data-reveal>
                    <span className="exp-feat-ic"><Icon name="align-left" aria-hidden="true" /></span>
                    <div className="exp-feat-text">
                      <h4>Plain-Language Signal Breakdown</h4>
                      <p>Every scored lead shows the exact signals that pushed the score up or held it back funding event, hiring pattern, tech stack match, seniority written in one readable sentence, not a cryptic algorithm output.</p>
                    </div>
                  </div>
                  <div className="exp-feature" data-reveal>
                    <span className="exp-feat-ic"><Icon name="git-compare-arrows" aria-hidden="true" /></span>
                    <div className="exp-feat-text">
                      <h4>Score Transparency Across Channels</h4>
                      <p>Whether a score comes from a Zeus search, a CRM sync, or a mid-campaign reply in Snaarpmail, NeoBrain AI shows the same explainable breakdown so reps always know what they&apos;re working with.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right · score card */}
              <div data-reveal>
                <div className="exp-card">
                  <div className="exp-card-hd">
                    <span className="exp-av">RG</span>
                    <div className="exp-person">
                      <div className="name">Rohan Gupta</div>
                      <div className="role">VP Sales · Forge (180 employees)</div>
                    </div>
                    <div className="exp-ring">
                      <svg viewBox="0 0 56 56" aria-hidden="true">
                        <defs>
                          <linearGradient id="expGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#6C2BDF" />
                            <stop offset="1" stopColor="#A576F8" />
                          </linearGradient>
                        </defs>
                        <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                        <circle cx="28" cy="28" r="24" fill="none" stroke="url(#expGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="134 17" transform="rotate(-90 28 28)" />
                      </svg>
                      <span className="exp-ring-num">89</span>
                    </div>
                  </div>

                  <span className="exp-why-label">Why This Score</span>
                  <div className="exp-rows">
                    <div className="exp-row">
                      <span className="exp-row-ic ok"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                      <span className="label">ICP role match: VP Sales</span>
                      <span className="exp-val pos">+18</span>
                    </div>
                    <div className="exp-row">
                      <span className="exp-row-ic ok"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                      <span className="label">Company size: 150-500 employees</span>
                      <span className="exp-val pos">+14</span>
                    </div>
                    <div className="exp-row">
                      <span className="exp-row-ic ok"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                      <span className="label">Buying signal: Raised $22M Series B</span>
                      <span className="exp-val pos">+21</span>
                    </div>
                    <div className="exp-row">
                      <span className="exp-row-ic ok"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg></span>
                      <span className="label">Hiring signal: 9 open SDR roles</span>
                      <span className="exp-val pos">+16</span>
                    </div>
                    <div className="exp-row">
                      <span className="exp-row-ic warn"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 1 11 10 1 10" /><line x1="6" y1="5" x2="6" y2="7" /></svg></span>
                      <span className="label">Tech stack: No current CRM signal</span>
                      <span className="exp-val neg">-6</span>
                    </div>
                    <div className="exp-row">
                      <span className="exp-row-ic warn"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 1 11 10 1 10" /><line x1="6" y1="5" x2="6" y2="7" /></svg></span>
                      <span className="label">Engagement: Not yet contacted</span>
                      <span className="exp-val neg">-14</span>
                    </div>
                  </div>

                  <button className="exp-cta" type="button">
                    <Icon name="send" aria-hidden="true" />
                    Open in Sendrit → Draft outreach
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===================== PIPELINE LEARNING ===================== */}
        <section className="nb-learn" id="learning">
          <div className="container">
            <div className="learn-grid">

              {/* Left · learning card */}
              <div data-reveal>
                <div className="learn-card">
                  <div className="learn-card-hd">
                    <span className="learn-brand">
                      <span className="learn-brand-ic"><Icon name="brain-circuit" aria-hidden="true" /></span>
                      Pipeline Learning
                    </span>
                    <span className="learn-status"><span className="dot"></span> Observing</span>
                  </div>

                  <div className="learn-table-hd">
                    <span>Campaign</span>
                    <span className="r">Repl</span>
                    <span className="r">Mtgs</span>
                    <span className="r">Top Signal</span>
                  </div>

                  <div className="learn-block">
                    <div className="learn-row">
                      <span className="lc-camp">Q3 SaaS — VP Sales</span>
                      <span className="lc-num">47</span>
                      <span className="lc-num green">22</span>
                      <span className="lc-sig">Series B funding</span>
                    </div>
                    <div className="learn-insight tip">
                      <Icon name="sparkles" aria-hidden="true" />
                      Funding-triggered sequences convert 2.4x faster — prioritize
                    </div>
                  </div>

                  <div className="learn-block">
                    <div className="learn-row">
                      <span className="lc-camp">EMEA Expansion</span>
                      <span className="lc-num">18</span>
                      <span className="lc-num green">6</span>
                      <span className="lc-sig">New CRO</span>
                    </div>
                    <div className="learn-insight warn">
                      <Icon name="zap" aria-hidden="true" />
                      CRO-change signal underperforming in EMEA — adjust timing to Day 7
                    </div>
                  </div>

                  <div className="learn-block">
                    <div className="learn-row">
                      <span className="lc-camp">Agency Outreach</span>
                      <span className="lc-num">29</span>
                      <span className="lc-num green">9</span>
                      <span className="lc-sig">Hiring push</span>
                    </div>
                    <div className="learn-insight tip">
                      <Icon name="sparkles" aria-hidden="true" />
                      Agency ICP responds better to shorter Step 1 — under 60 words
                    </div>
                  </div>

                  <div className="learn-block">
                    <div className="learn-row">
                      <span className="lc-camp">Re-Engage Cold Leads</span>
                      <span className="lc-num">11</span>
                      <span className="lc-num green">2</span>
                      <span className="lc-sig muted">No signal</span>
                    </div>
                    <div className="learn-insight bad">
                      <Icon name="ban" aria-hidden="true" />
                      Low signal contacts show 0.4x conversion — reduce list priority
                    </div>
                  </div>

                  <div className="learn-foot">
                    <span className="check-ic"><CheckGlyph /></span>
                    NeoBrain applied 3 suggestions to active campaigns this week
                  </div>
                </div>
              </div>

              {/* Right · copy */}
              <div data-reveal-stagger="100">
                <span className="exp-eyebrow" data-reveal>Pipeline Learning</span>
                <h2 className="exp-h2" data-reveal>Every Closed Deal Makes the Next Campaign Smarter.</h2>
                <p className="exp-lead" data-reveal>
                  NeoBrain AI doesn&apos;t just apply intelligence it learns from every outcome. Every reply,
                  every booking, every deal feeds back into the scoring model, the personalization engine,
                  and the signal weighting so the intelligence gets more accurate over time, not just more data.
                </p>
                <div className="exp-features">
                  <div className="exp-feature" data-reveal>
                    <span className="exp-feat-ic"><Icon name="bar-chart-3" aria-hidden="true" /></span>
                    <div className="exp-feat-text">
                      <h4>Outcome-Based Score Refinement</h4>
                      <p>As deals close and campaigns run, NeoBrain AI updates its scoring weights automatically so signals actually converting in your market rise in importance, and signals that aren&apos;t start to fade.</p>
                    </div>
                  </div>
                  <div className="exp-feature" data-reveal>
                    <span className="exp-feat-ic"><Icon name="trending-up" aria-hidden="true" /></span>
                    <div className="exp-feat-text">
                      <h4>Message Performance Feedback</h4>
                      <p>NeoBrain AI tracks which subject lines, opening lines, and sequence structures generate replies versus being ignored — and surfaces specific suggestions to Sendrit for underperforming campaigns.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===================== THREE LAYERS ===================== */}
        <section className="nb-layers" id="layers">
          <div className="container">

            <div className="stage-header" data-reveal-stagger="100">
              <div data-reveal><span className="stage-eyebrow"><span className="star-glyph">✦</span> THE FULL INTELLIGENCE PICTURE</span></div>
              <h2 className="stage-h2" data-reveal>The Three Layers of NeoBrain AI Working Simultaneously.</h2>
              <p className="stage-sub" data-reveal>NeoBrain AI runs three interconnected intelligence systems in parallel each powering a different stage of the NeoLeads pipeline, all feeding into the same learning loop.</p>
            </div>

            <div className="layers-grid" data-reveal-stagger="120">

              {/* 1 · Lead Intelligence */}
              <article className="layer-card" data-reveal>
                <h3>Lead Intelligence</h3>
                <p>Scores every search result against your ICP and live buying signals — ranking the highest-fit, highest-intent leads at the top of every list automatically.</p>
                <div className="layer-demo">
                  <span className="demo-label">Signals Tracked</span>
                  <div className="demo-chips">
                    <span className="demo-chip">Funding</span>
                    <span className="demo-chip">Leadership</span>
                    <span className="demo-chip">Hiring</span>
                    <span className="demo-chip">Tech change</span>
                    <span className="demo-chip">Growth rate</span>
                    <span className="demo-chip">Seniority</span>
                  </div>
                </div>
              </article>

              {/* 2 · Conversation AI */}
              <article className="layer-card" data-reveal>
                <h3>Conversation AI</h3>
                <p>Researches and writes personalized outreach for every contact in Sendrit. Reads and classifies every reply in Snaarpmail. Suggests the next right action — book, nurture, route, or close.</p>
                <div className="layer-demo center">
                  <div className="demo-flow">
                    <span className="flow-pill a">Sendrit · writes</span>
                    <span className="flow-arrow"><Icon name="arrow-right" aria-hidden="true" /></span>
                    <span className="flow-pill b">Snaarpmail · reads</span>
                  </div>
                </div>
              </article>

              {/* 3 · Pipeline Learning */}
              <article className="layer-card" data-reveal>
                <h3>Pipeline Learning</h3>
                <p>Feeds the outcomes of every campaign — replies, bookings, deals — back into the scoring and personalization models, so the intelligence improves with use rather than staying static.</p>
                <div className="layer-demo center">
                  <div className="demo-loop">
                    <div className="loop-row">Campaign <span className="op">+</span> Replies <span className="op">→</span> Outcomes</div>
                    <div className="loop-foot"><Icon name="refresh-cw" aria-hidden="true" /> NeoBrain learns → next campaign</div>
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
              <h2 data-reveal>Don&apos;t just take our word for it.</h2>
            </div>
            <div className="grid-3" data-reveal-stagger="120">
              <article className="card testi-card" data-reveal>
                <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p className="quote">&quot;NeoLeads completely changed our outbound workflow. We went from 5% reply rate to over 23% in 3 weeks.&quot;</p>
                <div className="testi-author"><img className="av" src="/avatars/Container.png" alt="James T." /><div><div className="name">James T.</div><div className="role">VP Sales, TechCorp</div></div></div>
              </article>
              <article className="card testi-card" data-reveal>
                <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p className="quote">&quot;The pay-per-conversation model is genius. We only pay for actual results, not wasted software subscriptions.&quot;</p>
                <div className="testi-author"><img className="av" src="/avatars/Container-2.png" alt="Maria K." /><div><div className="name">Maria K.</div><div className="role">Founder, GrowthLab</div></div></div>
              </article>
              <article className="card testi-card" data-reveal>
                <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p className="quote">&quot;NeoBrain AI is scary good. It replies to leads like a human, qualifies them and books meetings on autopilot.&quot;</p>
                <div className="testi-author"><img className="av" src="/avatars/Container-1.png" alt="Derek W." /><div><div className="name">Derek W.</div><div className="role">Head of Growth, ScaleUp</div></div></div>
              </article>
              <article className="card testi-card" data-reveal>
                <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p className="quote">&quot;Setup was fast and the results came quickly. This is the future of outbound sales.&quot;</p>
                <div className="testi-author"><img className="av" src="/avatars/Container-6.png" alt="Priya S." /><div><div className="name">Priya S.</div><div className="role">Marketing Director, FintechHub</div></div></div>
              </article>
              <article className="card testi-card" data-reveal>
                <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p className="quote">&quot;Best investment we made this year. Our pipeline has never been healthier.&quot;</p>
                <div className="testi-author"><img className="av" src="/avatars/Container-3.png" alt="Carlos M." /><div><div className="name">Carlos M.</div><div className="role">CEO, LaunchPad</div></div></div>
              </article>
              <article className="card testi-card" data-reveal>
                <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p className="quote">&quot;The unified inbox alone is worth it. Managing 10 mailboxes from one place is a game changer.&quot;</p>
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
            <h2 data-reveal>Ready to Put Your Pipeline<br />on Autopilot?</h2>
            <p data-reveal>Let NeoBrain AI score, personalize, and learn across every step, so each campaign is smarter than the last.</p>
            <div className="final-buttons" data-reveal>
              <button className="btn-primary">See NeoBrain in Action <Icon name="arrow-right" /></button>
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
