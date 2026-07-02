import Link from 'next/link';
import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: 'The Lean Startup - Case Study | NeoLeads' };

export default function TheLeanStartupPage() {
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
                <span className="tls-crumb-current" aria-current="page">The Lean Startup</span>
              </nav>

              <span className="tls-badge" data-reveal>
                <Icon name="rocket" aria-hidden="true" />
                Case Study #1
              </span>

              <h1 data-reveal>
                How a 2-Person Startup Replaced a{' '}
                <span className="tls-hl">$70K SDR Hire</span> With NeoLeads
              </h1>

              <p className="tls-sub" data-reveal>
                Instead of posting the role, interviewing for weeks, and betting runway on a
                first hire, this team treated outbound as a system, and booked its first
                qualified meetings before the job listing would have closed.
              </p>

              <div className="tls-meta" data-reveal>
                <span className="tls-meta-chip">
                  <Icon name="clock" aria-hidden="true" />
                  6 min read
                </span>
                <span className="tls-meta-chip">Founder-led &middot; SaaS</span>
                <span className="tls-meta-chip">Zeus &middot; Sendrit &middot; Snaarpmail</span>
              </div>
            </div>

            {/* ----- Right column: the two-person outbound system panel ----- */}
            <div className="tls-hero-visual" data-reveal>
              <div className="tls-panel">
                <div className="tls-panel-head">
                  <span className="tls-panel-title">
                    <span className="tls-panel-dot" aria-hidden="true" />
                    The two-person outbound system
                  </span>
                  <span className="tls-panel-flag">SDR Hire - Not Required</span>
                </div>

                {/* Zeus - Find */}
                <article className="tls-step">
                  <div className="tls-step-head">
                    <span className="tls-avatar tls-avatar--zeus" aria-hidden="true">Z</span>
                    <span className="tls-step-name">Zeus &middot; Find</span>
                    <span className="tls-step-tag">40 verified</span>
                  </div>
                  <div className="tls-lead">
                    <div className="tls-lead-name">Acme Corp &middot; VP Sales</div>
                    <div className="tls-lead-sig tls-lead-sig--hot">Series B raised &middot; 9d ago</div>
                  </div>
                  <div className="tls-lead">
                    <div className="tls-lead-name">Vertex AI &middot; Head of RevOps</div>
                    <div className="tls-lead-sig tls-lead-sig--hot">New VP hired &middot; 3d ago</div>
                  </div>
                  <div className="tls-lead">
                    <div className="tls-lead-name">Northwind &middot; Founder</div>
                    <div className="tls-lead-sig">Hiring SDRs &middot; 6d ago</div>
                  </div>
                </article>

                {/* Sendrit - Send */}
                <article className="tls-step">
                  <div className="tls-step-head">
                    <span className="tls-avatar tls-avatar--sendrit" aria-hidden="true">S</span>
                    <span className="tls-step-name">Sendrit &middot; Send</span>
                    <span className="tls-step-tag tls-step-tag--purple">AI first line</span>
                  </div>
                  <div className="tls-msg">
                    Saw the Series B close last week, congrats. Most teams your size hit an
                    outbound wall right about now
                    <span className="tls-cursor" aria-hidden="true" />
                  </div>
                  <div className="tls-mini-row">
                    <div className="tls-mini tls-mini--purple">
                      <span className="tls-mini-strong">Reviewed</span>
                      <span className="tls-mini-sub">by a human</span>
                    </div>
                    <div className="tls-mini">
                      <span className="tls-mini-strong">1 click</span>
                      <span className="tls-mini-sub">to launch</span>
                    </div>
                  </div>
                </article>

                {/* Snaarpmail - Reply */}
                <article className="tls-step">
                  <div className="tls-step-head">
                    <span className="tls-avatar tls-avatar--snaarp" aria-hidden="true">M</span>
                    <span className="tls-step-name">Snaarpmail &middot; Reply</span>
                    <span className="tls-step-tag tls-step-tag--green">1 hot</span>
                  </div>
                  <div className="tls-reply">
                    <div className="tls-reply-head">
                      <span className="tls-reply-subject">Re: your note</span>
                      <span className="tls-reply-intent">
                        <Icon name="flame" aria-hidden="true" />
                        High intent
                      </span>
                    </div>
                    <p className="tls-reply-quote">&ldquo;Good timing, can you do Thursday?&rdquo;</p>
                  </div>
                  <span className="tls-flagged">Flagged before it hit the pile</span>
                </article>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== RESULTS METRICS ===================== */}
        <section className="tls-results">
          <div className="container">
            <p className="tls-results-label" data-reveal>
              Notable results: first six weeks, from a completely cold start
            </p>

            <div className="tls-results-grid" data-reveal-stagger="110">
              <div className="tls-result" data-reveal>
                <div className="tls-result-num">$70K</div>
                <p className="tls-result-desc">First-year SDR hire replaced</p>
                <span className="tls-result-note">salary + tools + ramp</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">6 wks</div>
                <p className="tls-result-desc">To first closed customer</p>
                <span className="tls-result-note">from a cold start</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">3&times;+</div>
                <p className="tls-result-desc">Reply rate vs. 3.4% average</p>
                <span className="tls-result-note">signal-based targeting</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">0</div>
                <p className="tls-result-desc">Domain-health incidents</p>
                <span className="tls-result-note">warmed + verified from day one</span>
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
                  Like most early-stage companies, the first customers came through the founders&rsquo;
                  existing network: warm intros, former colleagues, people who already trusted
                  them. That well runs dry faster than most founders expect.
                </p>
                <p data-reveal>
                  By the time the product had a handful of paying customers, the pipeline behind those
                  wins was almost entirely inbound and referral-driven. There was no system for finding
                  net-new accounts that actually fit the ideal customer profile, just a founder
                  manually searching LinkedIn between product work, customer calls, and everything else
                  a two-person startup has to juggle.
                </p>
                <blockquote className="tls-quote" data-reveal>
                  &ldquo;I was spending my Friday mornings building a list of maybe fifteen people, and
                  by the time I actually sent anything, half the week was gone. It wasn&rsquo;t
                  sustainable, and it definitely wasn&rsquo;t scalable.&rdquo;
                </blockquote>
                <p data-reveal>
                  The instinct at that point is almost universal: hire someone whose full-time job is
                  outbound. But at this stage, a six-figure annual commitment didn&rsquo;t make sense
                  against a limited runway. What the team needed was the <em>output</em> of an SDR,
                  without the fixed cost of one.
                </p>
              </div>

              {/* The Challenges */}
              <div className="tls-block" id="the-challenges" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Challenges</span>
                <h2 data-reveal>Four Walls a Two-Person Team Hit at Once</h2>

                <div className="tls-walls" data-reveal-stagger="110">
                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">01</span>
                    <div className="tls-wall-text">
                      <h3>No Time for Manual Prospecting</h3>
                      <p>
                        With two people splitting product, support, and sales, manual list-building
                        consumed hours the business couldn&rsquo;t afford. Time spent finding and
                        verifying contacts left almost none for the follow-up and personalization that
                        actually generates replies.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">02</span>
                    <div className="tls-wall-text">
                      <h3>No Infrastructure for Deliverability</h3>
                      <p>
                        The sending domain was young and had never been used for outbound at volume.
                        Without warmup or authentication, a cold push risked damaging the exact domain
                        the business relied on for support, invoices, and every customer email.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">03</span>
                    <div className="tls-wall-text">
                      <h3>No Signal on Who to Contact First</h3>
                      <p>
                        Without buying-signal data, every prospect looked identical on paper. There was
                        no way to tell which contacts were in a buying window versus which simply matched
                        a job-title filter.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">04</span>
                    <div className="tls-wall-text">
                      <h3>The Hiring Decision Was Approaching Fast</h3>
                      <p>
                        Advisors and early investors were pushing toward a first sales hire as the
                        default next step. The team needed proof, one way or the other,
                        before committing to a six-figure annual cost.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              {/* The Solution */}
              <div className="tls-block" id="the-solution" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Solution</span>
                <h2 data-reveal>How NeoLeads Replaced the SDR Hire</h2>

                <p data-reveal>
                  <span className="tls-ichip">Zeus</span> replaced the manual list-building sessions
                  entirely. Instead of searching LinkedIn by hand, the team described their ideal
                  customer in plain language, and Zeus returned a ranked list of verified contacts,
                  each flagged with the specific signal that made them worth contacting that week.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;The first time I ran a search and got back forty verified contacts with actual
                  reasons attached (a funding round, a new hire, whatever it was) in under a
                  minute, I realized I&rsquo;d been doing this completely wrong.&rdquo;
                </blockquote>

                <p data-reveal>
                  <span className="tls-ichip">Warmrit</span> and <span className="tls-ichip">Verifyrit</span>{' '}
                  handled the infrastructure side before a single cold email went out. The sending domain
                  was warmed gradually, and every contact was verified before entering a campaign,
                  removing the deliverability risk that could have made one bad early campaign a lasting
                  problem.
                </p>

                <p data-reveal>
                  <span className="tls-ichip">Sendrit</span> turned the verified, signal-ranked list into
                  an actual campaign: AI-personalized sequences built around the specific signal
                  NeoBrain AI had already attached to each contact.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;I didn&rsquo;t write a single cold email from scratch. NeoBrain would draft a
                  first line based on something real about the company, and I&rsquo;d just review it and
                  hit send. It felt less like writing sales copy and more like editing something a smart
                  research assistant had already gotten mostly right.&rdquo;
                </blockquote>

                <p data-reveal>
                  When replies started coming in, <span className="tls-ichip">Snaarpmail</span> kept them
                  all in one place, with NeoBrain AI flagging which ones were genuinely interested
                  versus which were polite deflections, so the team knew exactly which conversations to
                  prioritize.
                </p>

                <div className="tls-replaced" data-reveal>
                  <span className="tls-replaced-label">What Each Part Replaced</span>
                  <ul className="tls-replaced-list">
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Zeus</strong> replaced manual list-building: verified,
                      signal-ranked contacts instead of hours of LinkedIn research.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Warmrit + Verifyrit</strong> protected deliverability: no risk
                      to the domain the business depended on for everything else.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Sendrit + NeoBrain AI</strong> removed the writing bottleneck: AI-personalized sequences without a copywriter or SDR on staff.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Snaarpmail</strong> surfaced the replies that mattered: no hot
                      lead lost in a pile of auto-replies and unsubscribes.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why It Worked */}
              <div className="tls-block" id="why-it-worked" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Why It Worked</span>
                <h2 data-reveal>What Made It Work for a Team This Small</h2>

                <p data-reveal>
                  The signal-based targeting in Zeus meant the founders weren&rsquo;t guessing who to contact; every name on the list had a specific, current reason to be there. For a
                  team with no dedicated sales background, that removed the hardest part of cold outreach:
                  knowing where to start. The deliverability infrastructure meant the campaign didn&rsquo;t
                  need to be perfect to be safe; Warmrit and Verifyrit created a floor under the
                  whole operation.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We&rsquo;re a two-person team. We don&rsquo;t have a deliverability expert. We
                  don&rsquo;t have an SDR manager reviewing our sequences. What NeoLeads gave us was that
                  expertise built into the product, so we didn&rsquo;t have to hire for it.&rdquo;
                </blockquote>

                <div className="tls-why-grid" data-reveal-stagger="110">
                  <article className="tls-why-card" data-reveal>
                    <h3>Signal-first targeting</h3>
                    <p>
                      Every contact came with a specific reason to reach out, removing the
                      guesswork most non-sales founders struggle with most.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Built-in deliverability expertise</h3>
                    <p>
                      Warmrit and Verifyrit meant the team never needed to hire or contract for
                      infrastructure knowledge.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>AI-assisted, not AI-only</h3>
                    <p>
                      Every message was reviewed and approved by a human, keeping tone in check while
                      NeoBrain AI handled research and first drafts.
                    </p>
                  </article>
                </div>
              </div>

              {/* The Numbers */}
              <div className="tls-block" id="notable-results" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Numbers</span>
                <h2 data-reveal>Notable Results: First 6 Weeks</h2>

                <ul className="tls-numbers" data-reveal-stagger="90">
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Qualified meetings booked from a cold start, with no existing pipeline
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Verified contacts sourced entirely through Zeus: zero purchased or scraped lists
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Reply rate well above the industry average of roughly 3.4%
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Strong inbox placement maintained throughout, with zero domain-health incidents
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Cost of running NeoLeads for the period a fraction of a first-year SDR hire
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    First closed customer sourced entirely through a Zeus-found, Sendrit-run campaign
                    within six weeks
                  </li>
                </ul>
              </div>

              {/* Deep Dive */}
              <div className="tls-block" id="deep-dive" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Deep Dive</span>
                <h2 data-reveal>The Campaign That Changed the Hiring Decision</h2>

                <div className="tls-dd-grid" data-reveal-stagger="110">
                  <article className="tls-dd-card" data-reveal>
                    <h3>A Reply Rate That Made the Case on Its Own</h3>
                    <p>
                      This was the campaign that made the hiring conversation moot. Targeting a tightly
                      defined set of accounts, it generated a reply rate several times the platform
                      average, using a signal-based approach built entirely inside Zeus and Sendrit.
                    </p>
                    <blockquote className="tls-quote">
                      &ldquo;That campaign is the one we show investors now instead of a hiring plan.
                      It&rsquo;s proof the system works before we add a single salary to it.&rdquo;
                    </blockquote>
                  </article>

                  <article className="tls-dd-card" data-reveal>
                    <h3>The Meeting That Almost Got Missed</h3>
                    <p>
                      One reply arrived in the middle of a stretch of back-to-back customer calls.
                      Snaarpmail&rsquo;s intent classification flagged it as high-priority the moment it
                      landed, and the team responded within minutes of getting off the call,
                      booking what became one of the company&rsquo;s most important deals to date.
                    </p>
                    <blockquote className="tls-quote">
                      &ldquo;Without that flag, that reply sits in a pile with everything else until end
                      of day. By then, who knows if they&rsquo;re still that interested.&rdquo;
                    </blockquote>
                  </article>
                </div>
              </div>

              {/* What's Next */}
              <div className="tls-block" id="whats-next" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>What&rsquo;s Next</span>
                <h2 data-reveal>Where the System Goes From Here</h2>

                <p data-reveal>
                  The team isn&rsquo;t done experimenting. The next priority is scaling the same
                  signal-based approach to a second customer segment as the company expands beyond its
                  initial target market, testing whether the same lean, no-SDR model holds at
                  higher volume.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;The real test isn&rsquo;t whether this works for forty contacts a week.
                  It&rsquo;s whether it still works at four hundred. That&rsquo;s what we&rsquo;re finding
                  out next.&rdquo;
                </blockquote>

                <p data-reveal>
                  For a team that avoided a six-figure hiring decision by proving the system first, the
                  next chapter is about scale, not headcount.
                </p>
              </div>

            </div>

            {/* ----- Sticky sidebar ----- */}
            <aside className="tls-aside">
              <div className="tls-glance" data-reveal>
                <span className="tls-aside-label">At a Glance</span>
                <dl className="tls-glance-list">
                  <div className="tls-glance-row">
                    <dt>Team size</dt>
                    <dd>2 people</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Starting pipeline</dt>
                    <dd>Cold &middot; $0</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>SDR hire replaced</dt>
                    <dd>~$70K/yr</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>First closed deal</dt>
                    <dd>6 weeks</dd>
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
              <h2 data-reveal>Questions Lean Teams Ask First</h2>
              <p data-reveal>
                The practical concerns behind running outbound as a two-person team, answered.
              </p>
            </div>

            <div className="tls-faq-list" data-reveal-stagger="80">
              <details className="tls-faq-item" data-reveal>
                <summary>
                  Can a two-person team really run outbound without an SDR?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Yes, because the work an SDR does is unbundled into the platform. Zeus handles
                    sourcing and signal research, Sendrit drafts and runs the sequences, and NeoBrain AI
                    triages replies. A founder stays in the loop to review and approve, which takes minutes
                    a day rather than a full-time role.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How is this different from just hiring an SDR?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    An SDR is a fixed six-figure annual commitment that needs onboarding, tooling, and
                    management before producing pipeline. NeoLeads delivers the output (verified contacts, personalized sequences, and prioritized replies) from day one, at a
                    fraction of the cost, with no ramp period and nothing to manage.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  What does &ldquo;signal-based targeting&rdquo; actually mean?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Instead of contacting everyone who matches a job title, Zeus surfaces accounts showing a
                    current reason to buy: a funding round, a new leadership hire, active SDR
                    recruiting, and similar triggers. Every name on the list arrives with the specific
                    signal that made it worth reaching out that week.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Won&rsquo;t cold outbound damage my domain reputation?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Not when the infrastructure is handled first. Warmrit builds sender reputation
                    gradually before any volume goes out, and Verifyrit cleans every address so bounces
                    never hit your primary domain. In this case study, the team ran the full campaign with
                    zero domain-health incidents.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Do I still have to write the emails myself?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    No. NeoBrain AI drafts a first line grounded in something real about each account, and
                    Sendrit builds the sequence around it. Your job shifts from writing to reviewing: approving or tweaking a draft that&rsquo;s already mostly right, closer to editing than
                    writing from scratch.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How fast can a lean team expect results?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    It depends on your market, but the team in this study went from a completely cold start
                    to qualified meetings within weeks and their first closed customer inside six,
                    all sourced through a single Zeus-found, Sendrit-run campaign, with no existing pipeline
                    to lean on.
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
            <h2 data-reveal>Build Your First Outbound System<br />Without Your First Hire.</h2>
            <p data-reveal>
              You don&rsquo;t need an SDR to start. Founders are using Zeus and Sendrit to launch outbound
              systems that generate real meetings from day one.
            </p>
            <div className="final-buttons" data-reveal>
              <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
              <button className="btn-ghost">Book a Demo</button>
            </div>
            <p className="tls-cta-note" data-reveal>
              No credit card. Launch your first signal-based campaign in under an afternoon.
            </p>
          </div>
        </section>

      </main>

      <ClientScripts />
    </>
  );
}
