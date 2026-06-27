import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export default function HomePage() {
  return (
    <>
      <main>
      
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="hero-dash" aria-hidden="true">
          <img src="/hero-dashboard.png" alt="" width="1062" height="1014" />
        </div>
        <div className="container">
          <div className="hero-left" data-reveal-stagger="100" data-reveal-onload>
            <span className="hero-badge" data-reveal>
              <Icon name="sparkles" />
              AI Revenue Operating System
            </span>
            <h1 data-reveal>
              We Find. We Engage.<br />
              They Reply. <span className="grow">We Grow</span>
            </h1>
            <p className="hero-sub" data-reveal>
              The world's first Pay-Per-Conversation platform that automates your entire outbound sales process. We handle everything from finding leads to starting real conversations, so you only pay when prospects reply.
            </p>
            <div className="hero-ctas" data-reveal>
              <button className="btn-primary">Start for Free</button>
              <button className="btn-light">Book a Demo</button>
            </div>
            <div className="trust-row" data-reveal>
              <span className="item">
                <Icon name="credit-card" />
                Pay Per Conversation
              </span>
              <span className="item">
                <Icon name="badge-dollar-sign" />
                No Setup Fees
              </span>
              <span className="item">
                <Icon name="calendar-x" />
                Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===================== LOGO BAR ===================== */}
      <section className="logobar">
        <div className="container" data-reveal-stagger="100">
          <p className="label" data-reveal>Trusted by growing businesses worldwide</p>
          <div className="logos" data-reveal>
            <div className="logos-track">
              {/* set 1 */}
              <img className="brand-logo" src="/logos/allstate.svg" alt="Allstate" loading="lazy" />
              <img className="brand-logo" src="/logos/abbott.svg" alt="Abbott" loading="lazy" />
              <img className="brand-logo" src="/logos/alaska.svg" alt="Alaska Airlines" loading="lazy" />
              <img className="brand-logo" src="/logos/blackrock.svg" alt="BlackRock" loading="lazy" />
              <img className="brand-logo" src="/logos/adm.svg" alt="ADM" loading="lazy" />
              <img className="brand-logo" src="/logos/coterra.svg" alt="Coterra" loading="lazy" />
              <img className="brand-logo" src="/logos/camden.svg" alt="Camden" loading="lazy" />
              {/* set 2 (duplicate for a seamless loop) */}
              <img className="brand-logo dup" src="/logos/allstate.svg" alt="" aria-hidden="true" loading="lazy" />
              <img className="brand-logo dup" src="/logos/abbott.svg" alt="" aria-hidden="true" loading="lazy" />
              <img className="brand-logo dup" src="/logos/alaska.svg" alt="" aria-hidden="true" loading="lazy" />
              <img className="brand-logo dup" src="/logos/blackrock.svg" alt="" aria-hidden="true" loading="lazy" />
              <img className="brand-logo dup" src="/logos/adm.svg" alt="" aria-hidden="true" loading="lazy" />
              <img className="brand-logo dup" src="/logos/coterra.svg" alt="" aria-hidden="true" loading="lazy" />
              <img className="brand-logo dup" src="/logos/camden.svg" alt="" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      
      {/* ===================== 4. FEATURES ===================== */}
      <section className="section alt" id="features">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-label" data-reveal>FEATURES</span>
            <h2 data-reveal>The Complete Outbound Ecosystem</h2>
            <p data-reveal>NeoLeads combines industry-leading technology with AI to find, start conversations, and send emails.</p>
          </div>
          <div className="grid-3" data-reveal-stagger="120">
            <article className="card feature-card" data-reveal>
              <div className="feature-icon icon-purple" aria-hidden="true"><Icon name="radar" /></div>
              <h3>Zeus (Lead Discovery)</h3>
              <p>Find your ideal companies with AI-powered data with enrichment and intent signals.</p>
            </article>
            <article className="card feature-card" data-reveal>
              <div className="feature-icon icon-teal" aria-hidden="true"><Icon name="badge-check" /></div>
              <h3>Verifyrit (Email Validation)</h3>
              <p>Ensure 99%+ email deliverability with advanced verification and list data cleaning.</p>
            </article>
            <article className="card feature-card" data-reveal>
              <div className="feature-icon icon-orange" aria-hidden="true"><Icon name="flame" /></div>
              <h3>Warmrit (Email Warmer)</h3>
              <p>Land in the inbox, not the spam folders.</p>
            </article>
            <article className="card feature-card" data-reveal>
              <div className="feature-icon icon-blue" aria-hidden="true"><Icon name="send" /></div>
              <h3>Sendrit (Outreach Engine)</h3>
              <p>Create personalized email sequences, automate follow ups, and track every email.</p>
            </article>
            <article className="card feature-card" data-reveal>
              <div className="feature-icon icon-purple2" aria-hidden="true"><Icon name="inbox" /></div>
              <h3>Snaarp Mail (Inbox & Inbox)</h3>
              <p>Unlimited mailboxes with a unified inbox to manage all replies in one place.</p>
            </article>
            <article className="card feature-card" data-reveal>
              <div className="feature-icon icon-green" aria-hidden="true"><Icon name="brain-circuit" /></div>
              <h3>NeoBrain AI (Intelligence)</h3>
              <p>AI that replies, scores leads, creates email and helps you focus on the best opportunities.</p>
            </article>
          </div>
          <div className="center-cta" data-reveal data-reveal-delay="200">
            <button className="btn-primary" style={{padding: '12px 28px'}}>Explore All Products <Icon name="arrow-right" /></button>
          </div>
        </div>
      </section>
      
      {/* ===================== 5. HOW IT WORKS ===================== */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="steps-pill" data-reveal><Icon name="presentation" /> How NeoLeads Works</span>
            <h2 data-reveal>From Leads to Conversations in<br />6 Simple Steps</h2>
          </div>
          <div className="steps-grid" data-reveal-stagger="120">
            <div className="step" data-reveal>
              <span className="step-num">Step 1</span>
              <div className="step-icon ic-indigo" aria-hidden="true"><Icon name="user-search" /></div>
              <h3>Find Leads</h3>
              <p>Zeus finds and companies high-quality prospects.</p>
            </div>
            <div className="step" data-reveal>
              <span className="step-num">Step 2</span>
              <div className="step-icon ic-green" aria-hidden="true"><Icon name="shield-check" /></div>
              <h3>Verify Emails</h3>
              <p>Verifyrit ensures 100% valid and deliverable emails.</p>
            </div>
            <div className="step" data-reveal>
              <span className="step-num">Step 3</span>
              <div className="step-icon ic-orange" aria-hidden="true"><Icon name="flame" /></div>
              <h3>Warm Up</h3>
              <p>Warmrit builds strong sender reputation automatically.</p>
            </div>
            <div className="step" data-reveal>
              <span className="step-num">Step 4</span>
              <div className="step-icon ic-blue" aria-hidden="true"><Icon name="send" /></div>
              <h3>Send Campaigns</h3>
              <p>Sendrit launches personalized multi-step campaigns.</p>
            </div>
            <div className="step" data-reveal>
              <span className="step-num">Step 5</span>
              <div className="step-icon ic-blue" aria-hidden="true"><Icon name="inbox" /></div>
              <h3>Get Replies</h3>
              <p>All replies land in your unified inbox instantly.</p>
            </div>
            <div className="step" data-reveal>
              <span className="step-num">Step 6</span>
              <div className="step-icon ic-purple" aria-hidden="true"><Icon name="messages-square" /></div>
              <h3>Pay Per Conversation</h3>
              <p>You only pay $10 for qualified business conversations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===================== 6. ALL-IN-ONE PLATFORM ===================== */}
      <section className="section alt" id="platform">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-label" data-reveal>ALL-IN-ONE</span>
            <h2 data-reveal>Everything You Need.<br />All In One Platform</h2>
            <p data-reveal>NeoLeads combines industry-leading technology with AI to deliver real conversations, not just emails.</p>
          </div>
          <div className="grid-2" data-reveal-stagger="120">
            {/* Card 1: Zeus Prospecting */}
            <div className="showcase-card zeus-anim" data-reveal data-reveal-skip>
              <span className="card-eyebrow"><Icon name="search" /> Lead Discovery</span>
              <h3>Zeus Prospecting</h3>
              <p>Find the exact companies and decision-makers you need using AI-powered search and real-time intent signals.</p>
              <div className="mock zeus-mock">
                <div className="zeus-search">
                  <Icon name="search" />
                  <span className="zs-text">SaaS · 50–200 · hiring SDRs</span>
                  <span className="zs-live"><span className="dot"></span>LIVE</span>
                </div>
                <div className="zeus-lead">
                  <img className="zl-av nv" src="/avatars/Container-4.png" alt="Nova Labs lead" />
                  <div className="zl-info"><div className="zl-name">Nova Labs · VP Sales</div><div className="zl-sub">Series B · 140 employees</div></div>
                  <span className="zl-badge hot"><Icon name="flame" />High</span>
                </div>
                <div className="zeus-lead">
                  <img className="zl-av hx" src="/avatars/Container-5.png" alt="Helix lead" />
                  <div className="zl-info"><div className="zl-name">Helix · Head of Growth</div><div className="zl-sub">Series A · 80 employees</div></div>
                  <span className="zl-badge match">94% match</span>
                </div>
              </div>
            </div>
      
            {/* Card 2: Verifyrit & Warmrit */}
            <div className="showcase-card verify2-anim" data-reveal data-reveal-skip>
              <span className="card-eyebrow"><Icon name="check" /> Email Deliverability</span>
              <h3>Verifyrit & Warmrit</h3>
              <p>Ensure 99%+ deliverability with advanced data cleaning while building a rock-solid sender reputation to land straight in the primary inbox.</p>
              <div className="mock verify2-mock">
                <div className="vw-left">
                  <div className="vw-ring">
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7"/>
                      <circle className="vw-ring-fill" cx="50" cy="50" r="42" fill="none" stroke="#22C55E" strokeWidth="7" strokeLinecap="round" transform="rotate(-90 50 50)"/>
                      <circle className="vw-ring-shimmer" cx="50" cy="50" r="42" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeDasharray="14 250"/>
                    </svg>
                    <div className="vw-ring-val"><span className="vw-num">0.0</span>%<span className="vw-inbox">INBOX</span></div>
                  </div>
                  <span className="vw-spam">Spam 0.1%</span>
                </div>
                <div className="vw-right">
                  <div className="vw-rep-head"><span className="vw-rep-lbl">Sender reputation</span><span className="vw-warmed">Warmed <Icon name="check" /></span></div>
                  <svg className="vw-chart" viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true">
                    <defs><linearGradient id="repFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(34,197,94,0.35)"/>
                      <stop offset="100%" stopColor="rgba(34,197,94,0)"/>
                    </linearGradient></defs>
                    <path className="vw-area" d="M0,50 C40,48 60,38 90,32 C120,26 150,18 200,20 L200,64 L0,64 Z" fill="url(#repFill)"/>
                    <path className="vw-line" d="M0,50 C40,48 60,38 90,32 C120,26 150,18 200,20" fill="none" stroke="#22C55E" strokeWidth="2.5"/>
                  </svg>
                  <div className="vw-score"><span className="vw-score-num">0</span>/100 <span className="vw-delta">+12 in 30d</span></div>
                </div>
              </div>
            </div>
      
            {/* Card 3: Sendrit Automation */}
            <div className="showcase-card sendrit-anim" data-reveal data-reveal-skip>
              <span className="card-eyebrow"><Icon name="zap" /> Outreach Engine</span>
              <h3>Sendrit Automation</h3>
              <p>Launch highly personalized campaigns, automate intelligent follow-up sequences, and scale your outbound efforts effortlessly.</p>
              <div className="mock sendrit-mock">
                {/* Step 1 — Intro email */}
                <div className="seq-row">
                  <span className="seq-dot">
                    <svg className="seq-dot-svg" viewBox="0 0 28 28" aria-hidden="true">
                      <circle className="sd1-pulse" cx="14" cy="14" r="12" fill="none" stroke="#F97316" strokeWidth="2"/>
                      <circle className="sd1-ring" cx="14" cy="14" r="12" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" transform="rotate(-90 14 14)"/>
                      <circle className="sd1-fill" cx="14" cy="14" r="12" fill="#F97316"/>
                      <path className="sd1-check" d="M8.5 14.5 L12.5 18 L19.5 9.5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="seq-card">
                    <span className="seq-name">Intro email</span>
                    <span className="seq-status sent sd-anim-status"><span className="sw sw1">Sent</span> <span className="sw sw2">·</span> <span className="sw sw3">64% open</span></span>
                  </div>
                  <svg className="seq-conn" viewBox="0 0 2 26" preserveAspectRatio="none" aria-hidden="true"><line x1="1" y1="0" x2="1" y2="26" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="3 4"/></svg>
                </div>
                {/* Step 2 — Follow-up (in progress) */}
                <div className="seq-row">
                  <span className="seq-dot">
                    <svg className="seq-dot-svg" viewBox="0 0 28 28" aria-hidden="true">
                      <circle className="sd2-ring" cx="14" cy="14" r="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                      <circle className="sd2-arc" cx="14" cy="14" r="12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="18.85 56.55"/>
                    </svg>
                  </span>
                  <div className="seq-card">
                    <span className="seq-name">Wait 2 days · Follow-up</span>
                    <span className="seq-status running sd-anim-status">Running</span>
                    <div className="sd2-prog"><div className="sd2-prog-fill"></div></div>
                  </div>
                  <svg className="seq-conn" viewBox="0 0 2 26" preserveAspectRatio="none" aria-hidden="true"><line x1="1" y1="0" x2="1" y2="26" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="3 4"/></svg>
                </div>
                {/* Step 3 — Break-up email (queued) */}
                <div className="seq-row">
                  <span className="seq-dot">
                    <svg className="seq-dot-svg" viewBox="0 0 28 28" aria-hidden="true">
                      <circle className="sd3-ring" cx="14" cy="14" r="12" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2"/>
                    </svg>
                  </span>
                  <div className="seq-card">
                    <span className="seq-name">Break-up email</span>
                    <span className="seq-status queued">Queued</span>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Card 4: Snaarp Mail */}
            <div className="showcase-card snaarp-anim" data-reveal data-reveal-skip>
              <span className="card-eyebrow"><Icon name="mail" /> Infra & Inbox</span>
              <h3>Snaarp Mail</h3>
              <p>Power your outreach with unlimited mailboxes and manage every prospect reply from a single, centralized master inbox.</p>
              <div className="mock snaarp-mock">
                <div className="snaarp-head">
                  <div className="av-stack">
                    <img className="as a" src="/avatars/Container-2.png" alt="" /><img className="as b" src="/avatars/Container.png" alt="" /><img className="as c" src="/avatars/Container-6.png" alt="" /><span className="as more">+9</span>
                  </div>
                  <span className="snaarp-title">Master Inbox</span>
                  <span className="snaarp-badge"><span className="mb-roll"><span className="mb-cur">12</span><span className="mb-next">13</span></span> mailboxes</span>
                </div>
                {/* Priya M. — newest existing reply (preview types in) */}
                <div className="snaarp-reply r-priya">
                  <span className="sr-dot blue"></span>
                  <div className="sr-body">
                    <div className="sr-top"><span className="sr-name">Priya M.</span> <span className="sr-tag">replied</span></div>
                    <div className="sr-quote"><span className="sr-type"></span><span className="sr-cursor">|</span></div>
                  </div>
                  <span className="sr-time">2m</span>
                </div>
                {/* Marcus L. — older reply, already read */}
                <div className="snaarp-reply r-marcus">
                  <span className="sr-dot gray"></span>
                  <div className="sr-body">
                    <div className="sr-top"><span className="sr-name">Marcus L.</span> <span className="sr-tag">replied</span></div>
                    <div className="sr-quote sr-static">"What does pricing look like for..."</div>
                  </div>
                  <span className="sr-time">18m</span>
                </div>
                {/* Dana K. — new arrival, pre-rendered hidden below (no DOM insertion at runtime) */}
                <div className="snaarp-reply r-dana" aria-hidden="true">
                  <span className="sr-dot blue"></span>
                  <div className="sr-body">
                    <div className="sr-top"><span className="sr-name">Dana K.</span> <span className="sr-tag">replied</span></div>
                    <div className="sr-quote"><span className="sr-type"></span><span className="sr-cursor">|</span></div>
                  </div>
                  <span className="sr-time">just now</span>
                </div>
              </div>
            </div>
          </div>
      
          {/* Full-width NeoBrain AI — reveals last, after the 4-card grid */}
          <div className="neobrain-card neobrain-anim" data-reveal data-reveal-skip>
            <div className="nb-head">
              <span className="card-eyebrow"><Icon name="brain-circuit" /> AI Intelligence</span>
              <h3>NeoBrain AI</h3>
              <p>Automatically qualify incoming replies and score lead intent so you can focus your time strictly on closing the best opportunities.</p>
            </div>
            <div className="nb-grid">
              {/* processing shimmer sweeps across all three panels (Phase 4) */}
              <div className="nb-shimmer" aria-hidden="true"></div>
              {/* Left — the incoming reply */}
              <div className="nb-cell nb-reply">
                <div className="nb-person">
                  <span className="nb-av-wrap"><img className="nb-av" src="/avatars/Container-6.png" alt="Dana Reyes" /></span>
                  <div><div className="nb-name">Dana Reyes</div><div className="nb-role">Director of Ops · replied</div></div>
                </div>
                <p className="nb-quote"><span className="nb-type"></span><span className="nb-cursor">|</span></p>
                <div className="nb-scan" aria-hidden="true"></div>
              </div>
              {/* Center — intent score */}
              <div className="nb-cell nb-score-cell">
                <div className="nb-ring">
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
                    <circle className="nb-ring-fill" cx="60" cy="60" r="52" fill="none" stroke="#333333" strokeWidth="8" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                    <circle className="nb-ring-shimmer" cx="60" cy="60" r="52" fill="none" stroke="#C4A8FF" strokeWidth="8" strokeLinecap="round" strokeDasharray="13 314"/>
                    <g className="nb-burst" aria-hidden="true">
                      <line x1="116" y1="60" x2="124" y2="60"/>
                      <line x1="88" y1="108.5" x2="92" y2="115.4"/>
                      <line x1="32" y1="108.5" x2="28" y2="115.4"/>
                      <line x1="4" y1="60" x2="-4" y2="60"/>
                      <line x1="32" y1="11.5" x2="28" y2="4.6"/>
                      <line x1="88" y1="11.5" x2="92" y2="4.6"/>
                    </g>
                  </svg>
                  <div className="nb-ring-val"><span className="nb-num">0</span><span className="nb-cap">INTENT SCORE</span></div>
                </div>
                <span className="nb-hot"><Icon name="flame" /> Hot lead</span>
                <div className="nb-flash" aria-hidden="true"></div>
              </div>
              {/* Right — classification results */}
              <div className="nb-cell nb-analysis">
                <div className="nb-arow"><span className="nb-lbl nb-lbl-sent">Sentiment</span><span className="nb-pos"><span className="nb-pos-type"></span></span></div>
                <div className="nb-arow"><span className="nb-lbl nb-lbl-det">Detected</span><span className="nb-tags"><span className="nb-tag pricing">PRICING</span><span className="nb-tag meeting">MEETING</span></span></div>
                <div className="nb-next">
                  <span className="nb-next-icon"><Icon name="arrow-right" /></span>
                  <div><div className="nb-next-lbl">Suggested next step</div><div className="nb-next-action">Book a meeting</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===================== 7. PRICING ===================== */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="pricing-layout">
            <div className="pricing-left" data-reveal-stagger="100">
              <span className="section-label" data-reveal>PAY FOR RESULTS, NOT SOFTWARE</span>
              <h2 data-reveal>Pay Only for<br /><span className="accent">Conversations</span></h2>
              <p data-reveal>No contracts. No hidden fees. Just a simple $10 per qualified conversation.</p>
              <ul className="price-features" data-reveal>
                <li><span className="pc-check"><Icon name="check" /></span> $10 per qualified business conversation</li>
                <li><span className="pc-check"><Icon name="check" /></span> No long-term contracts</li>
                <li><span className="pc-check"><Icon name="check" /></span> Disqualify any reply you don't like</li>
                <li><span className="pc-check"><Icon name="check" /></span> Cancel anytime, no hard feelings</li>
              </ul>
              <button className="btn-primary" style={{padding: '14px 30px'}} data-reveal>Start Getting Conversations <Icon name="arrow-right" /></button>
            </div>
      
            <div className="pricing-cards-wrap" data-reveal data-reveal-delay="150">
              <span className="pricing-pill"><Icon name="zap" /> Simple. Transparent. Fair.</span>
              <div className="pricing-cards">
                <div className="price-card">
                  <div className="pc-label">Platform Access</div>
                  <ul>
                    <li><span className="pc-check"><Icon name="check" /></span> All features included</li>
                    <li><span className="pc-check"><Icon name="check" /></span> Unlimited email accounts</li>
                    <li><span className="pc-check"><Icon name="check" /></span> Unified inbox</li>
                    <li><span className="pc-check"><Icon name="check" /></span> AI-powered engine</li>
                    <li><span className="pc-check"><Icon name="check" /></span> Analytics & reporting</li>
                  </ul>
                  <div className="pc-from">
                    <span className="from-lbl">From </span>
                    <span className="from-amt">$99<span>/month</span></span>
                  </div>
                </div>
      
                <div className="pc-plus"><Icon name="plus" /></div>
      
                <div className="price-card">
                  <div className="pc-label">Pay Per Conversation</div>
                  <div className="pc-big">$10</div>
                  <div className="pc-sub">per qualified conversation</div>
                  <ul>
                    <li><span className="pc-check"><Icon name="check" /></span> Real people, real replies</li>
                    <li><span className="pc-check"><Icon name="check" /></span> You qualify the conversations</li>
                    <li><span className="pc-check"><Icon name="check" /></span> Pay only for value</li>
                    <li><span className="pc-check"><Icon name="check" /></span> Scale with confidence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===================== 8. INTEGRATIONS ===================== */}
      <section className="section alt" id="integrations">
        <div className="container">
          <div className="integrations-layout">
            <div className="int-left" data-reveal-stagger="100">
              <span className="int-pill" data-reveal><Icon name="trophy" /> Integration</span>
              <h2 data-reveal>Plugs into your entire<br /><span className="accent">tech stack.</span></h2>
              <p data-reveal>Connect Ritstack to the 40+ tools your team already uses: CRMs, calendars, marketing platforms and more.</p>
            </div>
      
            <div className="integrations-frame" data-reveal data-reveal-delay="150">
              <div className="integrations-grid">
                {/* Row 1 */}
                <span className="int-tile" title="Omnisend"><img src="/logos/Group.png" alt="Omnisend" /></span>
                <span className="int-tile" title="Gmail"><img src="/logos/gmail.png" alt="Gmail" /></span>
                <span className="int-tile empty"></span>
                <span className="int-tile" title="GetResponse"><img src="/logos/getresponse_symbol.svg.png" alt="GetResponse" /></span>
                {/* Row 2 */}
                <span className="int-tile" title="Mailchimp"><img src="/logos/mailchimp.png" alt="Mailchimp" /></span>
                <span className="int-tile empty"></span>
                <span className="int-tile" title="Microsoft Excel"><img src="/logos/ms_excel.png" alt="Microsoft Excel" /></span>
                <span className="int-tile empty"></span>
                {/* Row 3 */}
                <span className="int-tile" title="Snov.io"><img src="/logos/snovio.png" alt="Snov.io" /></span>
                <span className="int-tile" title="Google Calendar"><img src="/logos/Frame.png" alt="Google Calendar" /></span>
                <span className="int-tile" title="HubSpot"><img src="/logos/Symbol.svg.png" alt="HubSpot" /></span>
                <span className="int-tile" title="Cloudflare"><img src="/logos/cloudflare_logo.svg.png" alt="Cloudflare" /></span>
                {/* Row 4 */}
                <span className="int-tile" title="Zoho"><img src="/logos/zoho_logo.svg.png" alt="Zoho" /></span>
                <span className="int-tile empty"></span>
                <span className="int-tile" title="Mailgun"><img src="/logos/mailgun_technologies_inc_symbol.svg.png" alt="Mailgun" /></span>
                <span className="int-tile" title="Reply"><img src="/logos/reply_logo.svg.png" alt="Reply" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===================== 9. TESTIMONIALS ===================== */}
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
      
      {/* ===================== 10. SECURITY ===================== */}
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
      
      {/* ===================== 11. FINAL CTA ===================== */}
      <section className="final-cta">
        <div className="container" data-reveal-stagger="100">
          <span className="section-label" data-reveal>GET STARTED</span>
          <h2 data-reveal>Ready to generate real conversations?</h2>
          <p data-reveal>Join hundreds of businesses that only pay for results.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
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
