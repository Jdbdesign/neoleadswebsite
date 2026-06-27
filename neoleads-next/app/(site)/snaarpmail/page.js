import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import Link from 'next/link';

export const metadata = { title: 'Snaarpmail | Inbox & Infrastructure by NeoLeads' };

export default function SnaarpmailPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="sm-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>

          <span className="hero-badge" data-reveal>
            <Icon name="inbox" aria-hidden="true" />
            Snaarpmail Info & Inbox by NeoLeads
          </span>

          <h1 data-reveal>
            Every Reply. Full Context.<br />
            <span className="line-two">One Inbox.</span>
          </h1>

          <p className="hero-sub" data-reveal>
            Snaarpmail handles the two things that break most outbound operations: the
            infrastructure that keeps your sending domains healthy and out of spam, and the inbox
            where every reply arrives already tagged, classified, and ready to close.
          </p>

          <div className="sm-ctas" data-reveal>
            <a href="https://snaarp.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">Set Up Your Inbox Free <Icon name="arrow-right" /></a>
            <button className="btn-ghost">See Snaarpmail in Action</button>
          </div>

          <div className="sm-trust" data-reveal>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              Unlimited mailboxes
            </span>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              Auto DNS: SPF/DKIM/DMARC
            </span>
            <span className="item">
              <span className="check-ic">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
              </span>
              AI intent classification
            </span>
          </div>

          <div className="sm-dash" data-reveal>
            <div className="sm-dash-frame">
              <img src="/Snaarpmail%20dashboard%201.png" alt="Snaarpmail unified inbox: replies tagged, classified, and ready to close" />
            </div>
          </div>

        </div>
      </section>

      {/* ===================== INFRASTRUCTURE SECTION ===================== */}
      <section className="section infra-section" id="how-it-works">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-label" data-reveal>
              <Icon name="git-fork" aria-hidden="true" />
              TWO PROBLEMS. ONE PRODUCT.
            </span>
            <h2 data-reveal>The Infrastructure That Sends.<br />The Inbox That Converts.</h2>
            <p data-reveal>Every campaign you launch runs on four systems working simultaneously so the right message reaches the right person at exactly the right moment, every time.</p>
          </div>

          <div className="infra-grid" data-reveal-stagger="120">

            {/* Card 1: Unlimited Mailboxes — text top, mock bottom */}
            <article className="infra-card" data-reveal>
              <div className="infra-card-text">
                <h3>Unlimited Mailboxes</h3>
                <p>Connect as many sending domains and mailboxes as your campaigns need no per-inbox pricing, no artificial caps, no scaling ceiling.</p>
              </div>
              <div className="infra-mockup">
                <div className="mock-topbar">
                  <span className="mock-tl">CONNECTED MAILBOXES</span>
                  <span className="mock-cnt">12</span>
                </div>
                <div className="mb-grid">
                  <div className="mb-item"><span className="mb-dot"></span><span className="mb-addr">james@neoleads.io</span></div>
                  <div className="mb-item"><span className="mb-dot"></span><span className="mb-addr">sarah@neoleads.io</span></div>
                  <div className="mb-item"><span className="mb-dot"></span><span className="mb-addr">sales@neoleads.io</span></div>
                  <div className="mb-add"><span aria-hidden="true">+</span> Add Mailbox</div>
                </div>
              </div>
            </article>

            {/* Card 2: DNS — mock top, text bottom */}
            <article className="infra-card infra-card--rev" data-reveal>
              <div className="infra-mockup">
                <div className="dns-head">
                  <span className="dns-domain-label">DOMAIN SETUP &middot; NEOLEADS.IO</span>
                  <span className="dns-auth-pill">Authenticated</span>
                </div>
                <div className="dns-rows">
                  <div className="dns-row">
                    <span className="dns-type">SPF</span>
                    <span className="dns-val">v=spf1 include:...</span>
                    <span className="dns-auto-badge">&#10003; Auto</span>
                  </div>
                  <div className="dns-row">
                    <span className="dns-type">DKIM</span>
                    <span className="dns-val">k=rsa; p=MIGf...</span>
                    <span className="dns-auto-badge">&#10003; Auto</span>
                  </div>
                  <div className="dns-row">
                    <span className="dns-type">DMARC</span>
                    <span className="dns-val">p=quarantine;...</span>
                    <span className="dns-auto-badge">&#10003; Auto</span>
                  </div>
                </div>
              </div>
              <div className="infra-card-text">
                <h3>Automatic DNS & Domain Setup</h3>
                <p>SPF, DKIM, and DMARC configured automatically for every connected domain no manual DNS editing, no waiting on IT, no misconfigured records silently killing deliverability.</p>
              </div>
            </article>

            {/* Card 3: AI Intent — text top, mock bottom */}
            <article className="infra-card" data-reveal>
              <div className="infra-card-text">
                <h3>AI Intent Classification</h3>
                <p>NeoBrain AI reads every incoming reply and classifies it Interested, Objection, Not Now, Referral, Unsubscribe so your team opens the inbox knowing exactly what needs attention first.</p>
              </div>
              <div className="infra-mockup">
                <div className="mock-topbar">
                  <span className="mock-tl">INCOMING &middot; CLASSIFIED BY NEOBRAIN</span>
                </div>
                <div className="intent-rows">
                  <div className="intent-row">
                    <span className="intent-av av-green" aria-hidden="true">MT</span>
                    <span className="intent-msg">"Great timing, send pricing"</span>
                    <span className="intent-badge badge-interested">&#9679; Interested</span>
                  </div>
                  <div className="intent-row">
                    <span className="intent-av av-amber" aria-hidden="true">PN</span>
                    <span className="intent-msg">"Locked in until Q1..."</span>
                    <span className="intent-badge badge-objection">&#9679; Objection</span>
                  </div>
                  <div className="intent-row">
                    <span className="intent-av av-blue" aria-hidden="true">DO</span>
                    <span className="intent-msg">"Reach out in 3 months"</span>
                    <span className="intent-badge badge-notnow">&#9679; Not Now</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 4: Full Conversation Context — mock top, text bottom */}
            <article className="infra-card infra-card--rev" data-reveal>
              <div className="infra-mockup">
                <div className="mock-topbar">
                  <span className="mock-tl">OPEN CONVERSATION</span>
                </div>
                <div className="conv-contact">
                  <span className="conv-av" aria-hidden="true">CW</span>
                  <span className="conv-name">Chen Wu &middot; <span className="conv-company">Orion Health</span></span>
                </div>
                <div className="conv-bubble">
                  "Yes, happy to jump on a call &mdash; when works for you?"
                </div>
                <div className="conv-tags">
                  <span className="conv-tag">SIGNAL: NEW CRO HIRED</span>
                  <span className="conv-dot-sep" aria-hidden="true">&middot;</span>
                  <span className="conv-tag">SEQUENCE: STEP 3</span>
                  <span className="conv-dot-sep" aria-hidden="true">&middot;</span>
                  <span className="conv-tag">SCORE: 91</span>
                </div>
              </div>
              <div className="infra-card-text">
                <h3>Full Conversation Context</h3>
                <p>Every reply arrives with the original buying signal, the full Sendrit sequence thread, and the prospect's lead score visible in the same view &mdash; no tab-switching, no guessing why you reached out.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===================== SENDING INFRASTRUCTURE ===================== */}
      <section className="section" id="infrastructure">
        <div className="container">
          <div className="si-inner">

            {/* Left: copy */}
            <div>
              <span className="si-eyebrow" data-reveal>SENDING INFRASTRUCTURE</span>
              <h2 className="si-h2" data-reveal>Set Up Once. Snaarpmail Keeps Every Mailbox Healthy So You Don't Have To.</h2>
              <p className="si-body" data-reveal>Managing sending infrastructure manually DNS records, inbox rotation, blacklist monitoring, IP health is a full-time job that has nothing to do with closing deals. Snaarpmail automates all of it so your team stays focused on conversations, not configuration.</p>
              <div className="si-features" data-reveal-stagger="110">
                <div className="si-feat" data-reveal>
                  <span className="si-feat-icon icon-amber"><Icon name="refresh-cw" aria-hidden="true" /></span>
                  <div>
                    <div className="si-feat-title">Dynamic IP & Inbox Rotation</div>
                    <p className="si-feat-desc">Sending volume is automatically distributed across your connected mailboxes and IPs, so no single account triggers spam filters or hits daily send limits mid-campaign.</p>
                  </div>
                </div>
                <div className="si-feat" data-reveal>
                  <span className="si-feat-icon icon-purple"><Icon name="activity" aria-hidden="true" /></span>
                  <div>
                    <div className="si-feat-title">Real-Time Domain Health Monitoring</div>
                    <p className="si-feat-desc">Snaarpmail watches every sending domain for blacklist appearances, reputation drops, and deliverability shifts &mdash; and alerts your team before a problem becomes a pipeline blocker. Warm-up itself is handled by <Link href="/warmrit">Warmrit</Link> &rarr;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: domain health card */}
            <div className="si-dash" data-reveal>
              <div className="si-dash-head">
                <span className="si-health-dot" aria-hidden="true"></span>
                <span className="si-health-title">Domain Health</span>
                <span className="si-health-domain">neoleads.in</span>
              </div>
              <div className="si-metrics">
                <div className="si-metric">
                  <span className="si-metric-ic"><Icon name="shield" aria-hidden="true" /></span>
                  <span className="si-metric-label">Blacklists</span>
                  <span className="si-metric-value">Clear &middot; 0/80</span>
                </div>
                <div className="si-metric">
                  <span className="si-metric-ic"><Icon name="star" aria-hidden="true" /></span>
                  <span className="si-metric-label">Reputation</span>
                  <span className="si-metric-value">Excellent</span>
                </div>
                <div className="si-metric">
                  <span className="si-metric-ic"><Icon name="inbox" aria-hidden="true" /></span>
                  <span className="si-metric-label">Inbox Placement</span>
                  <span className="si-metric-value">98% Primary</span>
                </div>
              </div>
              <div className="si-no-incidents">
                <Icon name="circle-check-big" aria-hidden="true" />
                <span>No Incidents in the last 30 days</span>
              </div>
              <div className="si-dash-footer">
                <span className="si-foot-item">IP ROTATION: <span className="si-foot-active">ACTIVE</span></span>
                <span className="si-foot-sep" aria-hidden="true">&middot;</span>
                <span className="si-foot-item">LAST DNS CHECK: <span>4 MINS AGO</span></span>
                <span className="si-foot-sep" aria-hidden="true">&middot;</span>
                <span className="si-foot-item">U ARMIT STATUS: <span className="si-foot-active">ARMED</span> &rarr;</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== UNIFIED INBOX ===================== */}
      <section className="section alt" id="unified-inbox">
        <div className="container">
          <div className="ub-inner">

            {/* Left: inbox table mockup */}
            <div className="ub-card" data-reveal>
              <div className="ub-thead">
                <span className="ub-th">CONTACT</span>
                <span className="ub-th">INTENT</span>
                <span className="ub-th">REPLY PREVIEW</span>
                <span className="ub-th">ACTION</span>
              </div>

              <div className="ub-row">
                <div><div className="ub-contact-name">Marcus T.</div><div className="ub-contact-sub">Acme Corp &middot; Q3 SaaS</div></div>
                <span className="intent-badge badge-interested">&#9679; Interested</span>
                <span className="ub-preview">"Great timing &mdash; we're evaluating..."</span>
                <button className="ub-btn ub-btn-primary">Reply</button>
              </div>

              <div className="ub-row">
                <div><div className="ub-contact-name">Priya N.</div><div className="ub-contact-sub">Vertex AI &middot; Series B</div></div>
                <span className="intent-badge badge-objection">&#9679; Objection</span>
                <span className="ub-preview">"Locked in with a vendor until Q1..."</span>
                <button className="ub-btn ub-btn-dark">Snooze</button>
              </div>

              <div className="ub-row">
                <div><div className="ub-contact-name">David O.</div><div className="ub-contact-sub">Stackline &middot; Agency</div></div>
                <span className="intent-badge badge-notnow">&#9679; Not Now</span>
                <span className="ub-preview">"Reach out in 3 months, mid-migration"</span>
                <button className="ub-btn ub-btn-dark">Schedule</button>
              </div>

              <div className="ub-row">
                <div><div className="ub-contact-name">Chen W.</div><div className="ub-contact-sub">Orion Health &middot; EMEA</div></div>
                <span className="intent-badge badge-interested">&#9679; Interested</span>
                <span className="ub-preview">"Yes, happy to jump on a call..."</span>
                <button className="ub-btn ub-btn-green">Book Call</button>
              </div>

              <div className="ub-row">
                <div><div className="ub-contact-name">Amara F.</div><div className="ub-contact-sub">Nexford &middot; Q1 SaaS</div></div>
                <span className="intent-badge badge-referral">&#9679; Referral</span>
                <span className="ub-preview">"Not the right person, but talk to..."</span>
                <button className="ub-btn ub-btn-dark">Reassign</button>
              </div>

              <div className="ub-foot">
                <span className="ub-stat ub-stat-muted">5 replies</span>
                <span className="ub-stat ub-stat-amber">2 high-priority</span>
                <span className="ub-stat ub-stat-green">1 meeting ready to book</span>
              </div>
            </div>

            {/* Right: copy */}
            <div data-reveal-stagger="100">
              <span className="si-eyebrow" data-reveal>UNIFIED INBOX</span>
              <h2 className="si-h2" data-reveal>Every Reply From Every Campaign. One Place. Already Sorted.</h2>
              <p className="si-body" data-reveal>Stop opening fifteen tabs to check which campaign got a reply, who sent it, and what they said. Snaarpmail pulls every response from every Sendrit campaign into one view with NeoBrain AI's intent classification applied before you open a single message.</p>
              <div className="si-features" data-reveal-stagger="110">
                <div className="si-feat" data-reveal>
                  <span className="si-feat-icon icon-purple"><Icon name="pause" aria-hidden="true" /></span>
                  <div>
                    <div className="si-feat-title">Sequence Auto-Pause on Reply</div>
                    <p className="si-feat-desc">The moment a prospect replies, Snaarpmail automatically pauses their active Sendrit sequence &mdash; so they never receive a follow-up that makes it obvious the left hand doesn't know what the right hand is doing.</p>
                  </div>
                </div>
                <div className="si-feat" data-reveal>
                  <span className="si-feat-icon icon-purple"><Icon name="git-branch" aria-hidden="true" /></span>
                  <div>
                    <div className="si-feat-title">Team Routing & Assignment</div>
                    <p className="si-feat-desc">Hot replies route automatically to the right rep based on campaign ownership, geography, or account tier so interested prospects get a response in minutes, not hours. Pipeline Visibility</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== PIPELINE VISIBILITY ===================== */}
      <section className="section" id="pipeline-visibility">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-label" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              PIPELINE VISIBILITY
            </span>
            <h2 data-reveal>Know What's in Your Inbox<br />Before You Open It</h2>
            <p data-reveal>Snaarpmail gives you a live summary of everything that came back from your campaigns &mdash; intent breakdown, reply volume, and which conversations are one message away from a meeting &mdash; so you always know where to focus first.</p>
          </div>

          <div className="pv-grid" data-reveal-stagger="120">

            {/* Card 1: Reply Volume Tracking */}
            <article className="pv-card" data-reveal>
              <div className="pv-card-text">
                <h3>Reply Volume Tracking</h3>
                <p>See how many replies have come in across all active campaigns broken out by day, by campaign, and by channel so you can spot surges and gaps in real time.</p>
              </div>
              <div className="pv-mockup">
                <span className="pv-stat-label">REPLIES THIS WEEK</span>
                <div className="pv-stat-row">
                  <span className="pv-stat-num">47</span>
                  <span className="pv-stat-delta">+ 23%</span>
                </div>
                <div className="pv-chart-wrap">
                  <svg viewBox="0 0 240 56" preserveAspectRatio="none" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="pvLineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B4DFF" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#8B4DFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 38 C20 42 40 34 65 29 C85 24 100 16 120 13 C140 10 158 19 178 25 C198 30 220 34 240 32 L240 56 L0 56 Z" fill="url(#pvLineGrad)" />
                    <path d="M0 38 C20 42 40 34 65 29 C85 24 100 16 120 13 C140 10 158 19 178 25 C198 30 220 34 240 32" stroke="#8B4DFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="pv-chart-days">
                  <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
                </div>
              </div>
            </article>

            {/* Card 2: Intent Breakdown Dashboard */}
            <article className="pv-card" data-reveal>
              <div className="pv-card-text">
                <h3>Intent Breakdown Dashboard</h3>
                <p>A live donut of today's reply intent &mdash; how many Interested, Objections, Not Now, and Unsubscribes &mdash; so you know before opening the inbox whether this is a great day or a triage day.</p>
              </div>
              <div className="pv-mockup">
                <div className="pv-donut-row">
                  <div className="pv-donut-wrap">
                    <svg viewBox="0 0 104 104" width="100" height="100" fill="none" aria-hidden="true">
                      {/* background ring */}
                      <circle cx="52" cy="52" r="40" stroke="#1A2040" strokeWidth="12" />
                      {/* Interested 38%: start at 12-o'clock (-90°), length=95.5 of 251.33 */}
                      <circle cx="52" cy="52" r="40" fill="none" stroke="#22C55E" strokeWidth="12"
                        strokeDasharray="95.5 251.33" transform="rotate(-90 52 52)" />
                      {/* Objection 22%: start at 46.8° (cumulative 38% from 12-o'clock) */}
                      <circle cx="52" cy="52" r="40" fill="none" stroke="#FBBF24" strokeWidth="12"
                        strokeDasharray="55.3 251.33" transform="rotate(46.8 52 52)" />
                      {/* Not Now 31%: start at 126° (cumulative 60% from 12-o'clock) */}
                      <circle cx="52" cy="52" r="40" fill="none" stroke="#818CF8" strokeWidth="12"
                        strokeDasharray="77.9 251.33" transform="rotate(126 52 52)" />
                      {/* Other 9%: start at 237.6° (cumulative 91% from 12-o'clock) */}
                      <circle cx="52" cy="52" r="40" fill="none" stroke="#2E3E6A" strokeWidth="12"
                        strokeDasharray="22.6 251.33" transform="rotate(237.6 52 52)" />
                      {/* center hole */}
                      <circle cx="52" cy="52" r="33" fill="#070B1A" />
                    </svg>
                    <div className="pv-donut-center">
                      <span className="pv-donut-num">47</span>
                      <span className="pv-donut-sub">TODAY</span>
                    </div>
                  </div>
                  <div className="pv-legend">
                    <div className="pv-legend-item">
                      <span className="pv-legend-dot" style={{ background: '#22C55E' }}></span>
                      <span className="pv-legend-label">Interested</span>
                      <span className="pv-legend-pct" style={{ color: '#22C55E' }}>38%</span>
                    </div>
                    <div className="pv-legend-item">
                      <span className="pv-legend-dot" style={{ background: '#FBBF24' }}></span>
                      <span className="pv-legend-label">Objection</span>
                      <span className="pv-legend-pct" style={{ color: '#FBBF24' }}>22%</span>
                    </div>
                    <div className="pv-legend-item">
                      <span className="pv-legend-dot" style={{ background: '#818CF8' }}></span>
                      <span className="pv-legend-label">Not Now</span>
                      <span className="pv-legend-pct" style={{ color: '#818CF8' }}>31%</span>
                    </div>
                    <div className="pv-legend-item">
                      <span className="pv-legend-dot" style={{ background: '#4A5578' }}></span>
                      <span className="pv-legend-label">Other</span>
                      <span className="pv-legend-pct" style={{ color: '#4A5578' }}>9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 3: Meeting-Ready Queue */}
            <article className="pv-card" data-reveal>
              <div className="pv-card-text">
                <h3>Meeting-Ready Queue</h3>
                <p>A prioritized shortlist of prospects who replied positively and haven't been booked yet &mdash; sorted by reply recency so no warm reply goes cold while sitting unnoticed in a full inbox.</p>
              </div>
              <div className="pv-mockup">
                <div className="pv-queue-head">
                  <span className="pv-queue-title">MEETING-READY</span>
                  <span className="pv-queue-badge">3 waiting</span>
                </div>
                <div className="pv-queue-rows">
                  <div className="pv-queue-row">
                    <span className="pv-q-av av-teal" aria-hidden="true">CW</span>
                    <div className="pv-q-info">
                      <div className="pv-q-name">Chen Wu</div>
                      <div className="pv-q-sub"><span className="pv-q-sub-dot">&#9679;</span> Interested &middot; 4m ago</div>
                    </div>
                    <span className="pv-q-book">Book &rarr;</span>
                  </div>
                  <div className="pv-queue-row">
                    <span className="pv-q-av av-warm" aria-hidden="true">MT</span>
                    <div className="pv-q-info">
                      <div className="pv-q-name">Marcus Tran</div>
                      <div className="pv-q-sub"><span className="pv-q-sub-dot">&#9679;</span> Interested &middot; 18m ago</div>
                    </div>
                    <span className="pv-q-book">Book &rarr;</span>
                  </div>
                </div>
                <div className="pv-queue-footer">VIA KALENDER INTEGRATION</div>
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
          <h2 data-reveal>Ready to Take Control<br />of Your Inbox?</h2>
          <p data-reveal>One inbox for every reply, with full context, auto-classification, and bulletproof infrastructure behind every send.</p>
          <div className="final-buttons" data-reveal>
            <a href="https://snaarp.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">Set Up Your Inbox Free <Icon name="arrow-right" /></a>
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
