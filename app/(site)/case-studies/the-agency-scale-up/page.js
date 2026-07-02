import Link from 'next/link';
import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: 'The Agency Scale-Up - Case Study | NeoLeads' };

export default function TheAgencyScaleUpPage() {
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
                <span className="tls-crumb-current" aria-current="page">The Agency Scale-Up</span>
              </nav>

              <span className="tls-badge" data-reveal>
                <Icon name="briefcase" aria-hidden="true" />
                Case Study #2
              </span>

              <h1 data-reveal>
                How One Agency Ran Outbound for{' '}
                <span className="tls-hl">12 Clients</span> From a Single NeoLeads Seat
              </h1>

              <p className="tls-sub" data-reveal>
                Managing a dozen accounts used to mean a dozen separate tool stacks. This agency
                consolidated the entire operation onto one platform, cutting per-client overhead
                ~60% while improving results across every account.
              </p>

              <div className="tls-meta" data-reveal>
                <span className="tls-meta-chip">
                  <Icon name="clock" aria-hidden="true" />
                  7 min read
                </span>
                <span className="tls-meta-chip">Agency &middot; Multi-client</span>
                <span className="tls-meta-chip">All-in-one migration</span>
              </div>
            </div>

            {/* ----- Right column: one-seat multi-client panel ----- */}
            <div className="tls-hero-visual" data-reveal>
              <div className="tls-panel">
                <div className="tls-panel-head">
                  <span className="tls-panel-title">
                    <span className="tls-panel-dot" aria-hidden="true" />
                    One seat &middot; 12 client campaigns
                  </span>
                  <span className="tls-panel-flag">1 Platform</span>
                </div>

                <div className="tls-tabs" role="tablist" aria-label="Client accounts">
                  <span className="tls-tab tls-tab--active">Acme SaaS</span>
                  <span className="tls-tab">ProServ Co</span>
                  <span className="tls-tab">MfgWorks</span>
                  <span className="tls-tab">Northwind</span>
                  <span className="tls-tab tls-tab--more">+8 more</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--sendrit" aria-hidden="true">S</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">Acme SaaS &middot; Sendrit sequence</span>
                    <span className="tls-crow-sub">480 sent &middot; live</span>
                  </span>
                  <span className="tls-crow-tag tls-crow-tag--green">22 replies</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--zeus" aria-hidden="true">Z</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">ProServ Co &middot; Zeus search</span>
                    <span className="tls-crow-sub">40 verified this week</span>
                  </span>
                  <span className="tls-crow-tag tls-crow-tag--purple">segmented</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--snaarp" aria-hidden="true">M</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">MfgWorks &middot; Snaarpmail</span>
                    <span className="tls-crow-sub tls-crow-sub--hot">
                      <Icon name="flame" aria-hidden="true" />
                      hot reply flagged
                    </span>
                  </span>
                  <span className="tls-crow-pill">New</span>
                </div>

                <span className="tls-panel-foot">One login &middot; data segmented per client</span>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== RESULTS METRICS ===================== */}
        <section className="tls-results">
          <div className="container">
            <p className="tls-results-label" data-reveal>
              Notable results: after migrating all twelve accounts onto one platform
            </p>

            <div className="tls-results-grid" data-reveal-stagger="110">
              <div className="tls-result" data-reveal>
                <div className="tls-result-num">12</div>
                <p className="tls-result-desc">Client accounts run from one seat</p>
                <span className="tls-result-note">down from a fragmented stack</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">~60%</div>
                <p className="tls-result-desc">Lower per-client operating cost</p>
                <span className="tls-result-note">after consolidating tools</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">Days&rarr;Hrs</div>
                <p className="tls-result-desc">New-client onboarding time</p>
                <span className="tls-result-note">standardized infrastructure</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">0</div>
                <p className="tls-result-desc">Added headcount to grow capacity</p>
                <span className="tls-result-note">more clients, same team</span>
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
                  The agency built its reputation running cold outbound for B2B clients across a
                  handful of industries: SaaS, professional services, and a growing roster of
                  manufacturing accounts. Each new client meant a new sending domain, a new
                  verification subscription, and a new set of logins for whoever on the team was
                  managing that account.
                </p>
                <p data-reveal>
                  At first, this was manageable. Three clients, three sets of tools, no real friction.
                  But agencies grow by adding clients, and every new account multiplied the operational
                  overhead rather than adding to it in a straight line.
                </p>
                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We got to a point where onboarding a new client took longer than actually
                  running their first campaign. We were spending more time setting up infrastructure
                  than doing the work we were being paid for.&rdquo;
                </blockquote>
                <p data-reveal>
                  By client number eight, the team was juggling a dozen separate sending domains across
                  different providers, cross-referencing verification results in spreadsheets because the
                  tools didn&rsquo;t talk to each other, and manually checking four different inboxes each
                  morning to see which client had gotten a reply overnight. The tools that had each seemed
                  like a reasonable choice individually had, together, become the biggest constraint on how
                  many clients the agency could actually take on.
                </p>
              </div>

              {/* The Challenges */}
              <div className="tls-block" id="the-challenges" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Challenges</span>
                <h2 data-reveal>Tool Sprawl Was the Real Ceiling on Growth</h2>

                <div className="tls-walls" data-reveal-stagger="110">
                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">01</span>
                    <div className="tls-wall-text">
                      <h3>A Different Tool Stack for Every Client</h3>
                      <p>
                        Each new account came with its own sending tool, verification subscription, and
                        inbox setup, so the team was relearning workflows and re-entering data for
                        every client rather than running one standardized process.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">02</span>
                    <div className="tls-wall-text">
                      <h3>Onboarding Took Days, Not Hours</h3>
                      <p>
                        Setting up a new client&rsquo;s sending infrastructure (domain configuration, authentication records, initial warmup) consumed several days per account
                        before a single email could go out, directly limiting how fast the agency could
                        bring on new business.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">03</span>
                    <div className="tls-wall-text">
                      <h3>No Consolidated View Across Accounts</h3>
                      <p>
                        With campaigns spread across different platforms, there was no single place to see
                        how all twelve clients were performing at once. Reporting meant manually pulling
                        numbers from each tool before compiling anything client-ready.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">04</span>
                    <div className="tls-wall-text">
                      <h3>Margin Was Shrinking as the List Grew</h3>
                      <p>
                        Every new account added another subscription cost and another chunk of manual setup.
                        The client list was growing, but the cost of servicing each client wasn&rsquo;t
                        falling the way it should as the operation scaled.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              {/* The Solution */}
              <div className="tls-block" id="the-solution" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Solution</span>
                <h2 data-reveal>One Platform, Every Client, One Login</h2>

                <p data-reveal>
                  The fix wasn&rsquo;t a better version of any single tool; it was collapsing the
                  entire stack onto one platform. <span className="tls-ichip">Zeus</span> replaced the
                  separate prospecting subscriptions across every account, sourcing verified,
                  signal-ranked contacts for each client from the same interface instead of a different
                  login per client.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;The moment every client lived in one place, the whole business felt different.
                  I stopped managing tools and started managing campaigns again.&rdquo;
                </blockquote>

                <p data-reveal>
                  <span className="tls-ichip">Warmrit</span> and <span className="tls-ichip">Verifyrit</span>{' '}
                  standardized the part that used to eat days per client. New sending domains were warmed
                  on a repeatable schedule and every contact was verified inside the same system,
                  turning a multi-day setup into a process the team could kick off in an afternoon.
                </p>

                <p data-reveal>
                  <span className="tls-ichip">Sendrit</span> ran the campaigns for all twelve accounts
                  from one seat, with data segmented per client so nothing crossed over. NeoBrain AI
                  drafted personalized first lines against each client&rsquo;s ideal customer, and{' '}
                  <span className="tls-ichip">Snaarpmail</span> pulled every reply into a single inbox,
                  flagging the hot ones so no client&rsquo;s best conversation waited until the morning check.
                </p>

                <div className="tls-replaced" data-reveal>
                  <span className="tls-replaced-label">What Each Part Replaced</span>
                  <ul className="tls-replaced-list">
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Zeus</strong> replaced a separate prospecting subscription per client: one search interface across every account.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Warmrit + Verifyrit</strong> standardized setup: repeatable warmup
                      and verification instead of days of per-client configuration.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Sendrit + NeoBrain AI</strong> ran every client&rsquo;s campaigns from one seat: personalized sequences without a tool stack per account.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Snaarpmail</strong> consolidated the four morning inboxes into one: hot replies flagged across all clients at once.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why It Worked */}
              <div className="tls-block" id="why-it-worked" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Why It Worked</span>
                <h2 data-reveal>Why Consolidation Beat Best-of-Breed</h2>

                <p data-reveal>
                  The agency hadn&rsquo;t chosen bad tools; each one was a reasonable pick on its own.
                  The problem was that the cost of running them was multiplying with every client instead of
                  spreading across them. Moving to one platform meant every new account plugged into an
                  existing, standardized process rather than starting a new one from scratch, so growth
                  finally started adding to the business instead of taxing it.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We&rsquo;re not a bigger team than we were a year ago. We just stopped losing hours
                  to setup and reconciliation, and put them back into the campaigns clients actually pay for.&rdquo;
                </blockquote>

                <div className="tls-why-grid" data-reveal-stagger="110">
                  <article className="tls-why-card" data-reveal>
                    <h3>One standardized process</h3>
                    <p>
                      Every client runs on the same repeatable setup, so onboarding is a checklist rather
                      than a rebuild each time.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Overhead spread, not stacked</h3>
                    <p>
                      A single platform cost replaced a dozen subscriptions, so margin improved as the client
                      list grew instead of shrinking.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>One view across accounts</h3>
                    <p>
                      Performance for all twelve clients lives in one place, turning reporting from a manual
                      pull into a glance.
                    </p>
                  </article>
                </div>
              </div>

              {/* The Numbers */}
              <div className="tls-block" id="notable-results" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Numbers</span>
                <h2 data-reveal>Notable Results: After Consolidation</h2>

                <ul className="tls-numbers" data-reveal-stagger="90">
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    All twelve client accounts run from a single NeoLeads seat, down from a fragmented stack
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Per-client operating cost cut roughly 60% after consolidating tools onto one platform
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    New-client onboarding shortened from days to hours on standardized infrastructure
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Reporting pulled from one consolidated view instead of manually across separate tools
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Capacity grown without adding headcount: more clients served by the same team
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Hot replies flagged across every client&rsquo;s inbox from a single morning check
                  </li>
                </ul>
              </div>

              {/* Deep Dive */}
              <div className="tls-block" id="deep-dive" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Deep Dive</span>
                <h2 data-reveal>The Onboarding That Changed the Business Model</h2>

                <div className="tls-dd-grid" data-reveal-stagger="110">
                  <article className="tls-dd-card" data-reveal>
                    <h3>From Days to Hours: Standardizing New Client Setup</h3>
                    <p>
                      Before consolidation, a new client meant configuring a sending domain, setting up
                      authentication records, running an initial warmup, and connecting a separate
                      verification tool, the better part of a week before outreach could safely begin.
                      With Warmrit and Verifyrit handling that as a standardized process inside NeoLeads,
                      onboarding shrank dramatically.
                    </p>

                    <div className="tls-dd-compare" role="img" aria-label="Onboarding time: before roughly 5 days, after roughly 4 hours">
                      <div className="tls-dd-bar tls-dd-bar--before">
                        <div className="tls-dd-bar-head">
                          <span>Before &middot; fragmented stack</span>
                          <span>~5 days</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" /></div>
                      </div>
                      <div className="tls-dd-bar tls-dd-bar--after">
                        <div className="tls-dd-bar-head">
                          <span>After &middot; one platform</span>
                          <span>~4 hours</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" /></div>
                      </div>
                    </div>

                    <blockquote className="tls-quote">
                      &ldquo;Faster onboarding didn&rsquo;t just save us time. It changed how many clients we
                      felt comfortable saying yes to.&rdquo;
                    </blockquote>
                  </article>

                  <article className="tls-dd-card" data-reveal>
                    <h3>Reporting That Used to Take a Day, Now Takes Minutes</h3>
                    <p>
                      Compiling a client-ready report used to mean pulling data from separate sending tools,
                      cross-referencing verification stats, and checking reply counts across different inboxes,
                      often the better part of a day per cycle, multiplied across every active client.
                      With every client&rsquo;s data in the same platform, that collapsed into pulling from one consolidated view: minutes per client instead of hours.
                    </p>
                  </article>
                </div>
              </div>

              {/* What's Next */}
              <div className="tls-block" id="whats-next" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>What&rsquo;s Next</span>
                <h2 data-reveal>Where the Agency Goes From Here</h2>

                <p data-reveal>
                  With the operational ceiling gone, the agency&rsquo;s next move is capacity: taking on more
                  accounts without the overhead that used to come with each one. The same standardized setup
                  that made the twelfth client easy is what makes the twenty-fifth possible.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We used to cap ourselves at what the tooling could handle. Now the only question is
                  how many clients we want to take on, not how many we can keep the lights on for.&rdquo;
                </blockquote>

                <p data-reveal>
                  For an agency whose growth was limited by its own tool stack, the next chapter is finally
                  about clients, not infrastructure.
                </p>
              </div>

            </div>

            {/* ----- Sticky sidebar ----- */}
            <aside className="tls-aside">
              <div className="tls-glance" data-reveal>
                <span className="tls-aside-label">At a Glance</span>
                <dl className="tls-glance-list">
                  <div className="tls-glance-row">
                    <dt>Client accounts</dt>
                    <dd>12</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Tool stacks</dt>
                    <dd>12 &rarr; 1</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Operating cost</dt>
                    <dd>&minus;60%</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Onboarding</dt>
                    <dd>Days &rarr; hrs</dd>
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
              <h2 data-reveal>Questions Agencies Ask First</h2>
              <p data-reveal>
                The practical concerns behind running multi-client outbound on one platform, answered.
              </p>
            </div>

            <div className="tls-faq-list" data-reveal-stagger="80">
              <details className="tls-faq-item" data-reveal>
                <summary>
                  Can one seat really manage a dozen separate clients?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Yes, each client&rsquo;s data, campaigns, and replies are segmented inside the same
                    platform, so nothing crosses over. The team works from one login while every account stays
                    cleanly separated, which is exactly what removed the tool-per-client overhead in this study.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How is client data kept separate on a single platform?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Prospecting, sending domains, campaigns, and inboxes are scoped per client. Consolidation
                    happens at the workflow and reporting layer (one place to work and one view of performance) without merging any individual client&rsquo;s data.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How much faster is onboarding a new client, really?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    In this case study, onboarding moved from several days of per-client setup to a standardized
                    flow the team could complete in an afternoon; warmup and verification run on a
                    repeatable schedule rather than being rebuilt from scratch for every account.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Does consolidating tools mean giving up capability?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    No, the agency replaced a stack of single-purpose subscriptions with prospecting,
                    warmup, verification, sending, and reply triage in one platform. The gain came from removing
                    the friction between tools, not from settling for less in any one of them.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How does this improve per-client margin?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    A single platform cost replaces a dozen separate subscriptions, and standardized onboarding
                    removes most of the manual setup each account used to require. Both fixed cost and labor per
                    client fall as the roster grows, roughly a 60% reduction in per-client operating cost
                    here.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Can we see all clients&rsquo; performance in one place?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Yes. Campaign performance across every account lives in one consolidated view, so building a
                    client-ready report no longer means manually pulling numbers from separate tools and stitching
                    them together.
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
              <Link className="tls-related-card" href="/case-studies/the-lean-startup" data-reveal>
                <span className="tls-related-tag">Case Study</span>
                <h3>The Lean Startup</h3>
                <p>
                  How a 2-person startup replaced a $70K SDR hire with NeoLeads, booking its first
                  meetings before a job listing would have closed.
                </p>
                <span className="tls-related-link">
                  Read the story <Icon name="arrow-right" aria-hidden="true" />
                </span>
              </Link>

              <Link className="tls-related-card" href="/case-studies/the-cold-start" data-reveal>
                <span className="tls-related-tag">Case Study</span>
                <h3>The Cold Start</h3>
                <p>
                  Zero pipeline to 50 qualified conversations in under six weeks, built entirely on
                  signal-based targeting.
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
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className="final-cta">
          <div className="container" data-reveal-stagger="100">
            <span className="section-label" data-reveal>Get Started</span>
            <h2 data-reveal>Run Every Client&rsquo;s Outbound<br />From a Single Seat.</h2>
            <p data-reveal>
              Stop rebuilding a tool stack for every account. Agencies are consolidating prospecting,
              sending, and reply triage onto one platform, and growing without the overhead.
            </p>
            <div className="final-buttons" data-reveal>
              <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
              <button className="btn-ghost">Book a Demo</button>
            </div>
            <p className="tls-cta-note" data-reveal>
              No credit card. Onboard your next client in an afternoon, not a week.
            </p>
          </div>
        </section>

      </main>

      <ClientScripts />
    </>
  );
}
