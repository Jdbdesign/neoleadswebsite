import Link from 'next/link';
import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: "The Sales Leader's Stack Collapse - Case Study | NeoLeads" };

export default function TheSalesLeadersStackCollapsePage() {
  return (
    <>
      <main>

        {/* ===================== HERO ===================== */}
        <section className="tls-hero">
          <div className="container tls-hero-grid" data-reveal-stagger="110" data-reveal-onload>

            {/* ----- Left column: story intro ----- */}
            <div className="tls-hero-copy">
              <nav className="tls-crumb" aria-label="Breadcrumb" data-reveal>
                <Link href="/">Home</Link>
                <span className="tls-crumb-sep">/</span>
                <span className="tls-crumb-parent">Case Studies</span>
                <span className="tls-crumb-sep">/</span>
                <span className="tls-crumb-current" aria-current="page">The Sales Leader&rsquo;s Stack Collapse</span>
              </nav>

              <span className="tls-badge" data-reveal>
                <Icon name="layers" aria-hidden="true" />
                Case Study #5
              </span>

              <h1 data-reveal>
                How a VP Sales Collapsed{' '}
                <span className="tls-hl">5 Tools Into 1</span> and Cut Stack Costs 60%
              </h1>

              <p className="tls-sub" data-reveal>
                Nine reps, five overlapping subscriptions, and a renewal season that forced the
                question: what is all of this actually costing us? An audit of the outbound stack
                turned into a consolidation, and a faster, cheaper, more measurable sales team.
              </p>

              <div className="tls-meta" data-reveal>
                <span className="tls-meta-chip">
                  <Icon name="clock" aria-hidden="true" />
                  7 min read
                </span>
                <span className="tls-meta-chip">Mid-market &middot; 9-rep team</span>
                <span className="tls-meta-chip">Stack consolidation</span>
              </div>
            </div>

            {/* ----- Right column: renewal audit panel ----- */}
            <div className="tls-hero-visual" data-reveal>
              <div className="tls-panel">
                <div className="tls-panel-head">
                  <span className="tls-panel-title">
                    <span className="tls-panel-dot" aria-hidden="true" />
                    The old stack &middot; renewal audit
                  </span>
                  <span className="tls-panel-flag">5 &rarr; 1</span>
                </div>

                <div className="tls-tabs" role="list" aria-label="Tools replaced">
                  <span className="tls-tab">Data provider</span>
                  <span className="tls-tab">Sequencer</span>
                  <span className="tls-tab">Verifier</span>
                  <span className="tls-tab">Warmup</span>
                  <span className="tls-tab tls-tab--more">+ inbox tools</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--zeus" aria-hidden="true">Z</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">Zeus &middot; replaces the data provider</span>
                    <span className="tls-crow-sub">verified contacts + buying signals</span>
                  </span>
                  <span className="tls-crow-tag tls-crow-tag--purple">consolidated</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--sendrit" aria-hidden="true">S</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">Sendrit &middot; replaces the sequencer</span>
                    <span className="tls-crow-sub">9 reps &middot; one workflow</span>
                  </span>
                  <span className="tls-crow-tag tls-crow-tag--green">&minus;60% cost</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--snaarp" aria-hidden="true">M</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">Snaarpmail &middot; replaces inbox tooling</span>
                    <span className="tls-crow-sub tls-crow-sub--hot">
                      <Icon name="flame" aria-hidden="true" />
                      one reply view, whole team
                    </span>
                  </span>
                  <span className="tls-crow-pill">New</span>
                </div>

                <span className="tls-panel-foot">One renewal &middot; one login &middot; one report</span>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== RESULTS METRICS ===================== */}
        <section className="tls-results">
          <div className="container">
            <p className="tls-results-label" data-reveal>
              Notable results: one quarter after collapsing the stack
            </p>

            <div className="tls-results-grid" data-reveal-stagger="110">
              <div className="tls-result" data-reveal>
                <div className="tls-result-num">5&rarr;1</div>
                <p className="tls-result-desc">Tools collapsed into one platform</p>
                <span className="tls-result-note">one renewal, one login</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">~60%</div>
                <p className="tls-result-desc">Reduction in stack cost</p>
                <span className="tls-result-note">vs. five separate contracts</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">3 wks&rarr;4 d</div>
                <p className="tls-result-desc">New-rep ramp on tooling</p>
                <span className="tls-result-note">one workflow to learn, not five</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">+41%</div>
                <p className="tls-result-desc">More meetings per rep</p>
                <span className="tls-result-note">same team, same quarter</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== BODY - ORIGIN + CHALLENGES + SIDEBAR ===================== */}
        <section className="tls-body">
          <div className="container tls-body-grid">

            {/* ----- Main article column ----- */}
            <div className="tls-main">

              {/* The Origin */}
              <div className="tls-block" id="how-it-started" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Origin</span>
                <h2 data-reveal>How It All Started</h2>
                <p data-reveal>
                  The stack hadn&rsquo;t been designed; it had accumulated. A data provider bought
                  two years ago. A sequencer added when the team grew past three reps. A verification tool
                  bolted on after a bad bounce month. A warmup service someone found after deliverability
                  dipped. Inbox and reporting add-ons layered over the top. Each purchase had solved a
                  real problem at the time.
                </p>
                <p data-reveal>
                  What forced the reckoning was renewal season. Three of the five contracts came up for
                  renewal in the same quarter, and the new VP Sales, four months into the role,
                  asked finance for a simple number: what does our outbound motion cost per
                  meeting booked? Nobody could answer it. The data lived in five systems that didn&rsquo;t
                  talk to each other.
                </p>
                <blockquote className="tls-quote" data-reveal>
                  &ldquo;I asked what we spend to book one meeting and got five invoices and a shrug.
                  That was the moment I knew the stack was managing us, not the other way around.&rdquo;
                </blockquote>
                <p data-reveal>
                  The audit that followed found the real cost wasn&rsquo;t just the contracts. Reps were
                  spending the first hour of every day moving data between tools: exporting from
                  the data provider, importing to the sequencer, cross-checking verification, and
                  scanning two different inboxes for replies. Nine reps, an hour a day, every day.
                </p>
              </div>

              {/* The Challenges */}
              <div className="tls-block" id="the-challenges" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Challenges</span>
                <h2 data-reveal>Five Tools, One Motion, No Single Source of Truth</h2>

                <div className="tls-walls" data-reveal-stagger="110">
                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">01</span>
                    <div className="tls-wall-text">
                      <h3>Paying Five Vendors for One Workflow</h3>
                      <p>
                        Data, sequencing, verification, warmup, and inbox tooling were five separate
                        contracts with overlapping features, and the total was climbing every
                        renewal, with per-seat pricing multiplying across nine reps.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">02</span>
                    <div className="tls-wall-text">
                      <h3>Data Died Between the Tools</h3>
                      <p>
                        Every handoff was manual. Contacts exported from the data provider lost their
                        context by the time they reached the sequencer; verification ran as a separate
                        step reps sometimes skipped under quota pressure, exactly when it mattered
                        most.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">03</span>
                    <div className="tls-wall-text">
                      <h3>Reps Lost an Hour a Day to the Seams</h3>
                      <p>
                        Exporting, importing, cross-referencing, and inbox-hopping consumed the first hour
                        of every rep&rsquo;s day: selling time spent on data plumbing, multiplied by
                        nine people, every working day.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">04</span>
                    <div className="tls-wall-text">
                      <h3>No Answer to the Only Question That Mattered</h3>
                      <p>
                        With activity data scattered across five systems, cost-per-meeting, the
                        number a sales leader actually runs the motion on, was unknowable without a
                        day of manual spreadsheet work that was stale by the time it was finished.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              {/* The Solution */}
              <div className="tls-block" id="the-solution" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Solution</span>
                <h2 data-reveal>Collapse the Stack, Keep the Capability</h2>

                <p data-reveal>
                  The consolidation mapped one-to-one. <span className="tls-ichip">Zeus</span> replaced
                  the data provider, and upgraded it, because contacts now arrived verified and
                  ranked by live buying signals instead of as static database rows. The nightly
                  export-import ritual disappeared: sourced contacts flow straight into campaigns without
                  ever leaving the platform.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;The pitch to my reps wasn&rsquo;t &lsquo;new tool.&rsquo; It was &lsquo;you never
                  export a CSV again.&rsquo; That got a standing ovation.&rdquo;
                </blockquote>

                <p data-reveal>
                  <span className="tls-ichip">Sendrit</span> replaced the sequencer, with NeoBrain AI
                  drafting signal-based first lines that reps review instead of write.{' '}
                  <span className="tls-ichip">Verifyrit</span> and <span className="tls-ichip">Warmrit</span>{' '}
                  turned verification and warmup from separate subscriptions (and separate steps someone had to remember) into defaults that run automatically inside the same
                  flow. Skipping verification under quota pressure stopped being possible, because it
                  stopped being a step.
                </p>

                <p data-reveal>
                  <span className="tls-ichip">Snaarpmail</span> gave the team what the old inbox add-ons
                  never had: every reply across all nine reps in one intent-ranked view. And because the
                  whole motion now ran through one system, the question that started the audit,
                  cost per meeting booked, became a dashboard number instead of a quarterly
                  archaeology project.
                </p>

                <div className="tls-replaced" data-reveal>
                  <span className="tls-replaced-label">What Each Part Replaced</span>
                  <ul className="tls-replaced-list">
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Zeus</strong> replaced the data provider: verified,
                      signal-ranked contacts that never need exporting.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Sendrit + NeoBrain AI</strong> replaced the sequencer: one
                      campaign workflow for all nine reps, with AI-drafted first lines.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Verifyrit + Warmrit</strong> replaced two standalone subscriptions: verification and warmup as automatic defaults, not optional steps.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Snaarpmail</strong> replaced the inbox add-ons: every
                      rep&rsquo;s replies in one view, ranked by intent.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why It Worked */}
              <div className="tls-block" id="why-it-worked" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Why It Worked</span>
                <h2 data-reveal>The Gains Were in the Seams</h2>

                <p data-reveal>
                  None of the five tools was individually bad; the waste lived in the gaps between
                  them. Every export-import boundary cost rep time, dropped data, and created a place for
                  process to silently fail. Consolidation didn&rsquo;t win by having marginally better
                  features; it won by deleting the seams where the old stack leaked money, hours, and
                  data quality.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We didn&rsquo;t buy a better sequencer. We deleted the four hand-offs around the
                  sequencer. That&rsquo;s where the 60% came from, and honestly the hours mattered
                  more than the invoices.&rdquo;
                </blockquote>

                <div className="tls-why-grid" data-reveal-stagger="110">
                  <article className="tls-why-card" data-reveal>
                    <h3>Zero hand-offs</h3>
                    <p>
                      Sourcing, verifying, sending, and reply triage happen in one flow: no exports,
                      no imports, no data lost in transit.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Safeguards became defaults</h3>
                    <p>
                      Verification and warmup run automatically, so the steps reps used to skip under
                      pressure can&rsquo;t be skipped anymore.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>One system, one truth</h3>
                    <p>
                      With the whole motion in one platform, cost-per-meeting went from unknowable to a
                      number on a dashboard.
                    </p>
                  </article>
                </div>
              </div>

              {/* The Numbers */}
              <div className="tls-block" id="notable-results" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Numbers</span>
                <h2 data-reveal>Notable Results: One Quarter Post-Consolidation</h2>

                <ul className="tls-numbers" data-reveal-stagger="90">
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Five tool contracts collapsed into one platform: one renewal, one vendor, one
                    login for the whole team
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Stack cost cut roughly 60% versus the combined price of the five contracts it replaced
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Roughly an hour per rep per day reclaimed from exports, imports, and inbox-hopping
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Meetings booked per rep up 41% in the first full quarter: same team, same territory
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    New-rep tooling ramp cut from three weeks to four days: one workflow to learn
                    instead of five
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Cost-per-meeting now reported live from one dashboard: the question that started
                    the audit, answered continuously
                  </li>
                </ul>
              </div>

              {/* Deep Dive */}
              <div className="tls-block" id="deep-dive" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Deep Dive</span>
                <h2 data-reveal>The Audit That Made the Decision Easy</h2>

                <div className="tls-dd-grid" data-reveal-stagger="110">
                  <article className="tls-dd-card" data-reveal>
                    <h3>Pricing the Seams, Not Just the Subscriptions</h3>
                    <p>
                      The audit added up more than invoices. Five contracts across nine seats was the
                      visible cost, but an hour of daily data plumbing per rep, priced at loaded
                      cost, nearly matched the subscription total on its own. When both lines were on one
                      page, consolidation stopped being a tooling debate and became arithmetic.
                    </p>

                    <div className="tls-dd-compare" role="img" aria-label="Monthly stack cost: before five contracts at full cost, after one platform at roughly 40 percent">
                      <div className="tls-dd-bar tls-dd-bar--before">
                        <div className="tls-dd-bar-head">
                          <span>Before &middot; 5 contracts &times; 9 seats</span>
                          <span>100% baseline</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" /></div>
                      </div>
                      <div className="tls-dd-bar tls-dd-bar--after">
                        <div className="tls-dd-bar-head">
                          <span>After &middot; one platform</span>
                          <span>~40% of baseline</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" style={{ width: '40%' }} /></div>
                      </div>
                    </div>

                    <blockquote className="tls-quote">
                      &ldquo;Finance approved it in one meeting. When the hidden hours are on the same
                      slide as the invoices, there&rsquo;s nothing left to argue about.&rdquo;
                    </blockquote>
                  </article>

                  <article className="tls-dd-card" data-reveal>
                    <h3>The Migration That Didn&rsquo;t Stall the Quarter</h3>
                    <p>
                      The biggest fear was losing pipeline momentum mid-quarter. Instead of a hard cutover,
                      the team ran two weeks of parallel operation: active sequences finished on the old
                      stack while every new campaign started in NeoLeads. Warmrit brought the sending
                      domains up in the background, and by week three the old tools had nothing left
                      running in them; the contracts simply weren&rsquo;t renewed.
                    </p>
                    <blockquote className="tls-quote">
                      &ldquo;We never had a down day. The old stack just quietly ran out of things to do,
                      and then we stopped paying for it.&rdquo;
                    </blockquote>
                  </article>
                </div>
              </div>

              {/* What's Next */}
              <div className="tls-block" id="whats-next" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>What&rsquo;s Next</span>
                <h2 data-reveal>Reinvesting What the Stack Used to Consume</h2>

                <p data-reveal>
                  The 60% saved on tooling is going where the VP always wanted it: headcount. The budget
                  freed by consolidation covers most of a tenth rep, who will onboard onto one
                  platform in days, not weeks, and inherit a motion where cost-per-meeting is a number on
                  a screen rather than a mystery.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;A year ago my budget grew the stack. Now it grows the team. That&rsquo;s the whole
                  point of running sales: spend on people who sell, not on seams between tools.&rdquo;
                </blockquote>

                <p data-reveal>
                  For a sales leader who started with five invoices and no answers, the next chapter is a
                  bigger team on a smaller stack, with every number that matters, live in one place.
                </p>
              </div>

            </div>

            {/* ----- Sticky sidebar ----- */}
            <aside className="tls-aside">
              <div className="tls-glance" data-reveal>
                <span className="tls-aside-label">At a Glance</span>
                <dl className="tls-glance-list">
                  <div className="tls-glance-row">
                    <dt>Tools replaced</dt>
                    <dd>5 &rarr; 1</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Stack cost</dt>
                    <dd>&minus;60%</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Team size</dt>
                    <dd>9 reps</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Meetings per rep</dt>
                    <dd>+41%</dd>
                  </div>
                </dl>

                <span className="tls-aside-label tls-aside-label--sub">Products Used</span>
                <div className="tls-glance-chips">
                  <span className="tls-glance-chip">Zeus</span>
                  <span className="tls-glance-chip">Sendrit</span>
                  <span className="tls-glance-chip">Snaarpmail</span>
                  <span className="tls-glance-chip">Warmrit</span>
                  <span className="tls-glance-chip">Verifyrit</span>
                  <span className="tls-glance-chip">NeoBrain AI</span>
                </div>

                <button className="btn-primary tls-glance-cta" type="button">
                  Start for Free <Icon name="arrow-right" aria-hidden="true" />
                </button>
              </div>

              <nav className="tls-toc" aria-label="On this page" data-reveal>
                <span className="tls-aside-label">On This Page</span>
                <ul>
                  <li><a href="#how-it-started"><Icon name="chevron-right" aria-hidden="true" />How it all started</a></li>
                  <li><a href="#the-challenges"><Icon name="chevron-right" aria-hidden="true" />The challenges</a></li>
                  <li><a href="#the-solution"><Icon name="chevron-right" aria-hidden="true" />The solution</a></li>
                  <li><a href="#why-it-worked"><Icon name="chevron-right" aria-hidden="true" />Why it worked</a></li>
                  <li><a href="#notable-results"><Icon name="chevron-right" aria-hidden="true" />Notable results</a></li>
                  <li><a href="#deep-dive"><Icon name="chevron-right" aria-hidden="true" />Deep dive</a></li>
                  <li><a href="#whats-next"><Icon name="chevron-right" aria-hidden="true" />What&rsquo;s next</a></li>
                  <li><a href="#faq"><Icon name="chevron-right" aria-hidden="true" />FAQ</a></li>
                </ul>
              </nav>
            </aside>

          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section className="tls-faq" id="faq">
          <div className="container">
            <div className="tls-faq-head" data-reveal-stagger="90">
              <span className="tls-eyebrow" data-reveal>FAQ</span>
              <h2 data-reveal>Questions Sales Leaders Ask Before Consolidating</h2>
              <p data-reveal>
                The practical concerns behind collapsing an outbound stack, answered.
              </p>
            </div>

            <div className="tls-faq-list" data-reveal-stagger="80">
              <details className="tls-faq-item" data-reveal>
                <summary>
                  Do we lose capability by moving off best-of-breed tools?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    The team in this study found the opposite: the integrated versions were
                    stronger, because they share data. Contacts arrive with signals attached, verification
                    runs on everything automatically, and replies carry campaign context. Most of what
                    felt like &ldquo;capability&rdquo; in the old stack was actually workarounds for the
                    seams between tools.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How disruptive is the migration for a team mid-quarter?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    It doesn&rsquo;t have to be a hard cutover. This team ran two weeks in parallel (old sequences finished where they started while every new campaign launched in NeoLeads) and never lost a day of activity. The old contracts simply
                    weren&rsquo;t renewed once nothing was left running in them.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Where does the 60% cost reduction actually come from?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    One platform subscription replacing five separate contracts, each with its own
                    per-seat pricing across nine reps. And that&rsquo;s just the visible line; the reclaimed hour per rep per day of manual data work was worth nearly as much as the
                    subscription savings.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How do reps take the change?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Better than most tool rollouts, because consolidation removes work instead of
                    adding it. No more exports, imports, or checking multiple inboxes. In this study, reps
                    booked 41% more meetings the first full quarter, largely from the selling time the old
                    stack used to consume.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Can leadership actually see cost-per-meeting in one place?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Yes, that&rsquo;s a direct consequence of the whole motion running in one
                    system. Sourcing, sending, replies, and meetings live in the same data model, so the
                    metric that took a day of spreadsheet work to approximate is now continuously
                    reported.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How fast does a new rep ramp on one platform?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    In this study, tooling ramp dropped from three weeks to four days. A new rep learns one workflow (find, send, reply) instead of five tools and the fragile
                    hand-offs between them.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ===================== RELATED CASE STUDIES ===================== */}
        <section className="tls-related">
          <div className="container">
            <div className="tls-related-head" data-reveal-stagger="90">
              <span className="tls-eyebrow" data-reveal>Related Case Studies</span>
              <h2 data-reveal>More Teams, More Ways to Run the System</h2>
            </div>

            <div className="tls-related-grid" data-reveal-stagger="110">
              <Link className="tls-related-card" href="/case-studies/the-agency-scale-up" data-reveal>
                <span className="tls-related-tag">Case Study</span>
                <h3>The Agency Scale-Up</h3>
                <p>
                  How one agency ran outbound for 12 clients from a single NeoLeads seat, without a
                  dedicated SDR per account.
                </p>
                <span className="tls-related-link">
                  Read the story <Icon name="arrow-right" aria-hidden="true" />
                </span>
              </Link>

              <Link className="tls-related-card" href="/case-studies/the-reply-rate-turnaround" data-reveal>
                <span className="tls-related-tag">Case Study</span>
                <h3>The Reply Rate Turnaround</h3>
                <p>
                  From 1.8% to 11.4% reply rate on the same list and the same offer; the only change
                  was the system.
                </p>
                <span className="tls-related-link">
                  Read the story <Icon name="arrow-right" aria-hidden="true" />
                </span>
              </Link>

              <Link className="tls-related-card" href="/case-studies/the-deliverability-rescue" data-reveal>
                <span className="tls-related-tag">Case Study</span>
                <h3>The Deliverability Rescue</h3>
                <p>
                  From 8.4% bounce rate and a blacklisted domain to 96% inbox placement, in 32 days.
                </p>
                <span className="tls-related-link">
                  Read the story <Icon name="arrow-right" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className="final-cta">
          <div className="container" data-reveal-stagger="100">
            <span className="section-label" data-reveal>Get Started</span>
            <h2 data-reveal>Collapse Your Stack.<br />Keep the Capability.</h2>
            <p data-reveal>
              Stop paying five vendors for one workflow. Sales leaders are consolidating data,
              sequencing, verification, warmup, and reply triage into one platform, and putting
              the savings into headcount.
            </p>
            <div className="final-buttons" data-reveal>
              <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
              <button className="btn-ghost">Book a Demo</button>
            </div>
            <p className="tls-cta-note" data-reveal>
              No credit card. See what your current stack costs per meeting, then see it drop.
            </p>
          </div>
        </section>

      </main>

      <ClientScripts />
    </>
  );
}
