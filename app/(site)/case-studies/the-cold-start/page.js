import Link from 'next/link';
import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: 'The Cold Start - Case Study | NeoLeads' };

export default function TheColdStartPage() {
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
                <span className="tls-crumb-current" aria-current="page">The Cold Start</span>
              </nav>

              <span className="tls-badge" data-reveal>
                <Icon name="zap" aria-hidden="true" />
                Case Study #4
              </span>

              <h1 data-reveal>
                Zero Pipeline to{' '}
                <span className="tls-hl">50 Qualified Conversations</span> in Under 6 Weeks
              </h1>

              <p className="tls-sub" data-reveal>
                A new market. No contacts, no brand recognition, no warm intros to lean on, and a
                sending domain that had never sent a single cold email. This is how a team built a
                pipeline from absolute zero, using nothing but signals.
              </p>

              <div className="tls-meta" data-reveal>
                <span className="tls-meta-chip">
                  <Icon name="clock" aria-hidden="true" />
                  6 min read
                </span>
                <span className="tls-meta-chip">New market entry &middot; B2B SaaS</span>
                <span className="tls-meta-chip">Signal-based targeting</span>
              </div>
            </div>

            {/* ----- Right column: week-6 scoreboard panel ----- */}
            <div className="tls-hero-visual" data-reveal>
              <div className="tls-panel">
                <div className="tls-panel-head">
                  <span className="tls-panel-title">
                    <span className="tls-panel-dot" aria-hidden="true" />
                    Week 6 &middot; cold-start scoreboard
                  </span>
                  <span className="tls-panel-flag">50 Conversations</span>
                </div>

                <article className="tls-step">
                  <div className="tls-step-head">
                    <span className="tls-avatar tls-avatar--zeus" aria-hidden="true">Z</span>
                    <span className="tls-step-name">Zeus &middot; Find</span>
                    <span className="tls-step-tag">signals only</span>
                  </div>
                  <div className="tls-lead">
                    <div className="tls-lead-name">Meridian Ops &middot; COO</div>
                    <div className="tls-lead-sig tls-lead-sig--hot">Opened 2nd office &middot; 4d ago</div>
                  </div>
                  <div className="tls-lead">
                    <div className="tls-lead-name">Brightpath &middot; VP Ops</div>
                    <div className="tls-lead-sig tls-lead-sig--hot">Series A raised &middot; 11d ago</div>
                  </div>
                </article>

                <div className="tls-mini-row">
                  <div className="tls-mini tls-mini--purple">
                    <span className="tls-mini-strong">0 &rarr; 50</span>
                    <span className="tls-mini-sub">qualified conversations</span>
                  </div>
                  <div className="tls-mini">
                    <span className="tls-mini-strong">6 wks</span>
                    <span className="tls-mini-sub">from a standing start</span>
                  </div>
                </div>

                <span className="tls-panel-foot">Every contact signal-sourced &middot; zero purchased lists</span>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== RESULTS METRICS ===================== */}
        <section className="tls-results">
          <div className="container">
            <p className="tls-results-label" data-reveal>
              Notable results: six weeks, starting from absolute zero
            </p>

            <div className="tls-results-grid" data-reveal-stagger="110">
              <div className="tls-result" data-reveal>
                <div className="tls-result-num">50</div>
                <p className="tls-result-desc">Qualified conversations opened</p>
                <span className="tls-result-note">from zero existing pipeline</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">&lt;6 wks</div>
                <p className="tls-result-desc">From first search to conversation #50</p>
                <span className="tls-result-note">including domain warmup</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">100%</div>
                <p className="tls-result-desc">Contacts sourced through signals</p>
                <span className="tls-result-note">zero purchased or scraped lists</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">9.2%</div>
                <p className="tls-result-desc">Reply rate in an unknown market</p>
                <span className="tls-result-note">vs. ~3.4% industry average</span>
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
                  The company had found solid traction in its home vertical, but the board wanted
                  proof the product could sell beyond it. A second market was chosen: adjacent enough for
                  the product to fit, foreign enough that none of the team&rsquo;s existing advantages
                  applied. No customer references there. No network. Not one contact in the CRM.
                </p>
                <p data-reveal>
                  Every playbook the team had relied on assumed some starting asset: a warm intro,
                  a known logo, an old colleague to reconnect with. The new market offered none of those.
                  Whatever pipeline was going to exist would have to be built cold, and there was a real
                  deadline: two quarters to show whether the market was viable.
                </p>
                <blockquote className="tls-quote" data-reveal>
                  &ldquo;In our home market we never really did cold outbound; we didn&rsquo;t
                  have to. This was the first time we started from a literal blank page. Zero names,
                  zero history, zero favors to call in.&rdquo;
                </blockquote>
                <p data-reveal>
                  The question wasn&rsquo;t just whether cold outbound could work; it was whether
                  it could work fast enough, in a market where nobody knew the company&rsquo;s name, to
                  produce a defensible answer before the deadline.
                </p>
              </div>

              {/* The Challenges */}
              <div className="tls-block" id="the-challenges" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Challenges</span>
                <h2 data-reveal>Starting From Zero on Every Axis at Once</h2>

                <div className="tls-walls" data-reveal-stagger="110">
                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">01</span>
                    <div className="tls-wall-text">
                      <h3>No List, and No Idea Who to Target</h3>
                      <p>
                        The team didn&rsquo;t just lack contacts; it lacked the market knowledge to
                        know which companies were even worth contacting. Building a list by hand meant
                        guessing at an ideal customer profile in a vertical nobody on the team had sold
                        into before.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">02</span>
                    <div className="tls-wall-text">
                      <h3>No Brand Recognition to Open Doors</h3>
                      <p>
                        In the home market, the company&rsquo;s name earned a reply on its own. Here, every
                        email would be judged purely on relevance: a generic pitch from an unknown
                        vendor was guaranteed to be ignored or marked as spam.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">03</span>
                    <div className="tls-wall-text">
                      <h3>A Domain With No Sending History</h3>
                      <p>
                        The outbound domain set up for the new market had never sent an email. Pushing
                        volume through it cold would burn its reputation before the experiment even
                        produced data, ending the market test for the wrong reason.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">04</span>
                    <div className="tls-wall-text">
                      <h3>A Hard Deadline on Proving the Market</h3>
                      <p>
                        Two quarters to a go/no-go decision left no room for a slow ramp. The team needed
                        enough real conversations, fast enough, to judge the market on evidence rather
                        than anecdotes.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              {/* The Solution */}
              <div className="tls-block" id="the-solution" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Solution</span>
                <h2 data-reveal>Let Signals Replace the Network They Didn&rsquo;t Have</h2>

                <p data-reveal>
                  <span className="tls-ichip">Zeus</span> solved the coldest part of the cold start:
                  knowing where to begin. Instead of guessing at an ideal customer profile, the team
                  described the problem their product solves and let Zeus surface companies in the new
                  market showing live buying signals: expansions, funding rounds, leadership hires,
                  active recruiting for roles the product replaces. Every contact arrived verified, with
                  the reason to reach out attached.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We had zero relationships in that market, but the signals meant we didn&rsquo;t
                  need them to start. A company that just opened a second office doesn&rsquo;t care that
                  they&rsquo;ve never heard of you; they care that you noticed, and that you&rsquo;re
                  relevant to what&rsquo;s happening to them right now.&rdquo;
                </blockquote>

                <p data-reveal>
                  While Zeus built the list, <span className="tls-ichip">Warmrit</span> spent the first
                  two weeks building the domain&rsquo;s reputation from nothing, so that when
                  campaigns launched, they launched from a domain mailbox providers already trusted.{' '}
                  <span className="tls-ichip">Verifyrit</span> kept the bounce rate near zero, protecting
                  the young domain from the one thing that could have ended the test early.
                </p>

                <p data-reveal>
                  <span className="tls-ichip">Sendrit</span> turned the signal-ranked list into
                  campaigns, with NeoBrain AI drafting first lines around each company&rsquo;s specific
                  signal, the only form of relevance available to a brand nobody recognized. As
                  replies arrived, <span className="tls-ichip">Snaarpmail</span> triaged them by intent,
                  so the team&rsquo;s limited time in the new market went to the conversations most
                  likely to become pipeline.
                </p>

                <div className="tls-replaced" data-reveal>
                  <span className="tls-replaced-label">What Each Part Replaced</span>
                  <ul className="tls-replaced-list">
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Zeus</strong> replaced the network they didn&rsquo;t have: signal-sourced, verified contacts in a market with zero existing relationships.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Warmrit + Verifyrit</strong> gave a brand-new domain a safe runway: reputation built before volume, bounces stopped before they happened.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Sendrit + NeoBrain AI</strong> replaced brand recognition with relevance: every first line anchored to a real, current signal.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Snaarpmail</strong> protected the team&rsquo;s scarcest resource,
                      time, by surfacing the highest-intent replies first.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why It Worked */}
              <div className="tls-block" id="why-it-worked" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Why It Worked</span>
                <h2 data-reveal>Relevance Beats Recognition</h2>

                <p data-reveal>
                  The team&rsquo;s instinct going in was that cold outbound without a brand was a numbers game: send more, accept worse rates. Signal-based targeting inverted that.
                  Because every email was anchored to something real happening at the prospect&rsquo;s
                  company that week, the messages read as informed rather than anonymous. An unknown
                  sender with a relevant message beat a known name with a generic one.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;The replies kept saying some version of the same thing: &lsquo;good timing.&rsquo;
                  That&rsquo;s not luck; that&rsquo;s what happens when the signal picks the moment
                  instead of the send schedule.&rdquo;
                </blockquote>

                <div className="tls-why-grid" data-reveal-stagger="110">
                  <article className="tls-why-card" data-reveal>
                    <h3>Signals picked the accounts</h3>
                    <p>
                      The team didn&rsquo;t need market expertise to build the list; live buying
                      signals identified which companies were in motion right now.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Infrastructure ran ahead of volume</h3>
                    <p>
                      Two weeks of warmup before launch meant the first real campaign sent from a domain
                      with an established, positive reputation.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Every reply got triaged</h3>
                    <p>
                      Intent flags meant a small team exploring a new market never lost a hot conversation
                      to a crowded inbox.
                    </p>
                  </article>
                </div>
              </div>

              {/* The Numbers */}
              <div className="tls-block" id="notable-results" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Numbers</span>
                <h2 data-reveal>Notable Results: The First Six Weeks</h2>

                <ul className="tls-numbers" data-reveal-stagger="90">
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    50 qualified conversations opened in a market with zero prior presence
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    9.2% reply rate, nearly three times the industry average, with no brand
                    recognition to lean on
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Every contact sourced through Zeus signals: zero purchased or scraped lists
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Brand-new sending domain kept at full health throughout: zero deliverability
                    incidents
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    First opportunities created within three weeks of the first send
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Market viability confirmed a full quarter ahead of the go/no-go deadline
                  </li>
                </ul>
              </div>

              {/* Deep Dive */}
              <div className="tls-block" id="deep-dive" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Deep Dive</span>
                <h2 data-reveal>The Two Weeks Before the First Email</h2>

                <div className="tls-dd-grid" data-reveal-stagger="110">
                  <article className="tls-dd-card" data-reveal>
                    <h3>The Patience That Paid for Itself</h3>
                    <p>
                      The hardest decision of the whole project was sending nothing for the first two
                      weeks. With a deadline looming, the team let Warmrit build the new domain&rsquo;s
                      reputation while Zeus assembled and ranked the first signal-sourced list. When
                      campaigns finally launched, they hit primary inboxes from day one, and the
                      pipeline that followed arrived faster than a cold-domain blast could ever have
                      produced it.
                    </p>
                    <blockquote className="tls-quote">
                      &ldquo;Waiting two weeks felt reckless with a deadline over us. Looking back, it was
                      the fastest thing we did; we never lost a single day to a spam folder.&rdquo;
                    </blockquote>
                  </article>

                  <article className="tls-dd-card" data-reveal>
                    <h3>The Signal That Defined the Playbook</h3>
                    <p>
                      Three weeks in, a pattern emerged from the replies: companies flagged for
                      expansion signals (new offices, new markets, headcount growth) were
                      replying at nearly double the rate of any other segment. The team rebuilt the
                      campaign around that one signal class, and it became the engine behind most of the
                      50 conversations.
                    </p>
                    <blockquote className="tls-quote">
                      &ldquo;Six weeks in a brand-new market and we already had a repeatable playbook:
                      companies in expansion mode, contacted the week it happens. That&rsquo;s the thing
                      we couldn&rsquo;t have guessed from the outside.&rdquo;
                    </blockquote>
                  </article>
                </div>
              </div>

              {/* What's Next */}
              <div className="tls-block" id="whats-next" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>What&rsquo;s Next</span>
                <h2 data-reveal>From Proof to Presence</h2>

                <p data-reveal>
                  With the market validated a quarter early, the plan now is depth: scaling the
                  expansion-signal playbook across the full vertical, and hiring the new market&rsquo;s
                  first dedicated rep, who will inherit a working system and 50 live conversations
                  instead of a blank page.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;The next person we hire into this market starts with a running system and a
                  pipeline. That&rsquo;s the opposite of how market entries usually begin.&rdquo;
                </blockquote>

                <p data-reveal>
                  For a team that started with nothing but a product and a deadline, the next chapter is
                  about turning a proven playbook into a durable presence.
                </p>
              </div>

            </div>

            {/* ----- Sticky sidebar ----- */}
            <aside className="tls-aside">
              <div className="tls-glance" data-reveal>
                <span className="tls-aside-label">At a Glance</span>
                <dl className="tls-glance-list">
                  <div className="tls-glance-row">
                    <dt>Starting pipeline</dt>
                    <dd>0 contacts</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Qualified conversations</dt>
                    <dd>50</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Time to get there</dt>
                    <dd>&lt;6 weeks</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Reply rate</dt>
                    <dd>9.2%</dd>
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
              <h2 data-reveal>Questions Teams Ask Before a Cold Start</h2>
              <p data-reveal>
                The practical concerns behind building pipeline from absolute zero, answered.
              </p>
            </div>

            <div className="tls-faq-list" data-reveal-stagger="80">
              <details className="tls-faq-item" data-reveal>
                <summary>
                  Can outbound really work with zero existing contacts?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Yes, that&rsquo;s exactly what signal-based sourcing is for. Zeus builds the
                    list from live buying signals rather than your network, so a team with no contacts in
                    a market can still know precisely who to reach and why. The team in this study opened
                    50 qualified conversations starting from an empty CRM.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How do you get replies when nobody knows your brand?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Relevance substitutes for recognition. When the first line of an email references
                    something real that happened at the prospect&rsquo;s company that week, the message
                    reads as informed rather than anonymous, and gets judged on usefulness, not on
                    whether the sender&rsquo;s name is familiar.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How long before a brand-new domain can send campaigns?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    In this study, two weeks of Warmrit warmup was enough for the first campaign to land
                    in primary inboxes from day one. The exact timeline varies with volume goals, but the
                    principle holds: reputation gets built before campaigns launch, not repaired after.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Isn&rsquo;t it faster to just buy a list for a new market?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    It&rsquo;s faster to acquire names, and slower to get results. Purchased lists
                    carry dead addresses that damage a young domain, and none of the context that earns
                    replies. Signal-sourced, verified contacts produced a 9.2% reply rate here; a bought
                    list risks ending the experiment with a burned domain instead.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  What counts as a &ldquo;qualified conversation&rdquo;?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Not auto-replies and not polite brush-offs: a real, two-way exchange with a
                    fitting prospect about the problem the product solves. Snaarpmail&rsquo;s intent
                    classification did the first pass, and the team confirmed fit before counting anything
                    toward the fifty.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How do you find the right signals in an unfamiliar market?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    You start broad and let the replies teach you. The team launched across several signal
                    types, watched expansion signals outperform everything else by week three, and
                    concentrated there. The system surfaces the signals; the market tells you which ones
                    matter.
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
            <h2 data-reveal>Build Pipeline From Zero.<br />No Network Required.</h2>
            <p data-reveal>
              You don&rsquo;t need warm intros or a known brand to start. Teams are entering brand-new
              markets with signal-based targeting and opening real conversations within weeks.
            </p>
            <div className="final-buttons" data-reveal>
              <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
              <button className="btn-ghost">Book a Demo</button>
            </div>
            <p className="tls-cta-note" data-reveal>
              No credit card. Run your first signal search and see who&rsquo;s in a buying window today.
            </p>
          </div>
        </section>

      </main>

      <ClientScripts />
    </>
  );
}
