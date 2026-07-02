import Link from 'next/link';
import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: 'The Deliverability Rescue - Case Study | NeoLeads' };

export default function TheDeliverabilityRescuePage() {
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
                <span className="tls-crumb-current" aria-current="page">The Deliverability Rescue</span>
              </nav>

              <span className="tls-badge" data-reveal>
                <Icon name="shield-check" aria-hidden="true" />
                Case Study #3
              </span>

              <h1 data-reveal>
                From a Blacklisted Domain to{' '}
                <span className="tls-hl">96% Inbox Placement</span> in 32 Days
              </h1>

              <p className="tls-sub" data-reveal>
                One purchased list and one unwarmed send put this team&rsquo;s domain on multiple
                blacklists, with an 8.4% bounce rate poisoning even their customer emails.
                This is how they rebuilt sender reputation from the ground up, and what they changed
                so it never happens again.
              </p>

              <div className="tls-meta" data-reveal>
                <span className="tls-meta-chip">
                  <Icon name="clock" aria-hidden="true" />
                  6 min read
                </span>
                <span className="tls-meta-chip">B2B Services &middot; 14-person team</span>
                <span className="tls-meta-chip">Domain recovery</span>
              </div>
            </div>

            {/* ----- Right column: domain recovery panel ----- */}
            <div className="tls-hero-visual" data-reveal>
              <div className="tls-panel">
                <div className="tls-panel-head">
                  <span className="tls-panel-title">
                    <span className="tls-panel-dot" aria-hidden="true" />
                    Domain health &middot; recovery mode
                  </span>
                  <span className="tls-panel-flag">Day 32</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--zeus" aria-hidden="true">V</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">Verifyrit &middot; list audit</span>
                    <span className="tls-crow-sub">2,140 invalid addresses removed</span>
                  </span>
                  <span className="tls-crow-tag tls-crow-tag--green">0.6% bounce</span>
                </div>

                <div className="tls-crow">
                  <span className="tls-avatar tls-avatar--sendrit" aria-hidden="true">W</span>
                  <span className="tls-crow-text">
                    <span className="tls-crow-name">Warmrit &middot; reputation rebuild</span>
                    <span className="tls-crow-sub">gradual daily ramp &middot; monitored</span>
                  </span>
                  <span className="tls-crow-tag tls-crow-tag--purple">trending up</span>
                </div>

                <div className="tls-mini-row">
                  <div className="tls-mini tls-mini--purple">
                    <span className="tls-mini-strong">96%</span>
                    <span className="tls-mini-sub">inbox placement</span>
                  </div>
                  <div className="tls-mini">
                    <span className="tls-mini-strong">0</span>
                    <span className="tls-mini-sub">blacklist flags since</span>
                  </div>
                </div>

                <span className="tls-panel-foot">Volume gated by domain health &middot; list re-verified weekly</span>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== RESULTS METRICS ===================== */}
        <section className="tls-results">
          <div className="container">
            <p className="tls-results-label" data-reveal>
              Notable results: from first audit to full recovery
            </p>

            <div className="tls-results-grid" data-reveal-stagger="110">
              <div className="tls-result" data-reveal>
                <div className="tls-result-num">96%</div>
                <p className="tls-result-desc">Inbox placement after recovery</p>
                <span className="tls-result-note">up from spam-folder default</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">8.4&rarr;0.6%</div>
                <p className="tls-result-desc">Bounce rate after list cleaning</p>
                <span className="tls-result-note">2,140 dead addresses removed</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">32 days</div>
                <p className="tls-result-desc">From blacklisted to fully recovered</p>
                <span className="tls-result-note">warmup + monitored ramp</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">0</div>
                <p className="tls-result-desc">Blacklist flags since recovery</p>
                <span className="tls-result-note">twelve months and counting</span>
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
                  The team had been running modest, reasonably successful outbound for over a year.
                  Then a new quarter brought an aggressive pipeline target, and with it a shortcut
                  that felt harmless at the time: a purchased list of eight thousand contacts,
                  loaded into the sequencer and sent from the company&rsquo;s primary domain: the same domain used for support, invoices, and every customer conversation.
                </p>
                <p data-reveal>
                  The list had never been verified. The domain had never sent at that volume. Within
                  days, the bounce rate hit 8.4%, spam complaints followed, and the domain started
                  appearing on blacklists. The damage didn&rsquo;t stay contained to cold outreach: password resets, invoices, and support replies began landing in spam for
                  existing customers.
                </p>
                <blockquote className="tls-quote" data-reveal>
                  &ldquo;The scariest part wasn&rsquo;t losing the campaign. It was a customer calling
                  to say they hadn&rsquo;t received an invoice in three weeks. That&rsquo;s when we
                  realized this wasn&rsquo;t a marketing problem anymore.&rdquo;
                </blockquote>
                <p data-reveal>
                  Outbound was shut down completely. But pausing didn&rsquo;t fix the reputation; it just stopped the bleeding. The team needed a way to systematically
                  rebuild what one campaign had destroyed, and a structure that would make the same
                  mistake impossible to repeat.
                </p>
              </div>

              {/* The Challenges */}
              <div className="tls-block" id="the-challenges" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Challenges</span>
                <h2 data-reveal>One Bad Campaign Nearly Took the Whole Domain Down</h2>

                <div className="tls-walls" data-reveal-stagger="110">
                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">01</span>
                    <div className="tls-wall-text">
                      <h3>A Purchased List Poisoned the Send</h3>
                      <p>
                        Roughly a quarter of the purchased contacts were dead, recycled, or spam traps.
                        Every hard bounce told mailbox providers the sender couldn&rsquo;t be trusted,
                        and at eight thousand sends, the signal was loud enough to trigger
                        blacklisting within days.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">02</span>
                    <div className="tls-wall-text">
                      <h3>The Damage Spread Beyond Outbound</h3>
                      <p>
                        Because the campaign ran from the primary company domain, the reputation hit
                        affected every email the business sent. Support replies, invoices, and product
                        notifications started landing in spam for paying customers.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">03</span>
                    <div className="tls-wall-text">
                      <h3>No Reputation Cushion to Absorb the Hit</h3>
                      <p>
                        The domain had never been warmed for volume sending, so mailbox providers had
                        no history of good behavior to weigh against the bad. One spike of bounces
                        defined the domain&rsquo;s entire sending profile.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">04</span>
                    <div className="tls-wall-text">
                      <h3>Every Day Offline Was Pipeline Lost</h3>
                      <p>
                        With outbound paused entirely, the pipeline target that prompted the purchased
                        list in the first place was slipping further away. The team needed recovery to
                        be fast, but rushing the ramp risked landing right back on the blacklists.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              {/* The Solution */}
              <div className="tls-block" id="the-solution" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Solution</span>
                <h2 data-reveal>Rebuild Reputation First, Volume Second</h2>

                <p data-reveal>
                  The recovery started with the list, not the domain.{' '}
                  <span className="tls-ichip">Verifyrit</span> audited every address the team had ever
                  collected, flagging 2,140 invalid, recycled, or risky contacts that were quietly
                  guaranteed to bounce. Nothing would be sent to an unverified address again, purchased
                  or otherwise.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We thought we had a domain problem. Verifyrit showed us we had a data problem
                  that caused a domain problem. Cleaning the list was the fix; everything after
                  that was rehabilitation.&rdquo;
                </blockquote>

                <p data-reveal>
                  <span className="tls-ichip">Warmrit</span> then rebuilt the domain&rsquo;s reputation
                  the way it should have been built originally: gradually. Positive engagement signals
                  accumulated day by day on a monitored ramp, showing mailbox providers a consistent
                  pattern of wanted mail before any real campaign volume resumed.
                </p>

                <p data-reveal>
                  When outbound restarted, <span className="tls-ichip">Sendrit</span> gated volume to
                  what the domain&rsquo;s health could support, scaling up only as placement held.
                  With NeoBrain AI drafting first lines around genuine signals, the mail being sent was
                  mail people actually opened and answered, which is itself the strongest deliverability
                  signal there is.
                </p>

                <div className="tls-replaced" data-reveal>
                  <span className="tls-replaced-label">What Each Part Fixed</span>
                  <ul className="tls-replaced-list">
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Verifyrit</strong> removed the root cause: 2,140 dead and risky
                      addresses gone, bounce rate down to 0.6%.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Warmrit</strong> rebuilt sender reputation: a monitored,
                      gradual ramp instead of another cold blast.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Sendrit</strong> restarted outbound safely: volume gated by
                      domain health, never ahead of it.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>NeoBrain AI</strong> raised engagement: relevant, signal-based
                      messages that mailbox providers read as wanted mail.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why It Worked */}
              <div className="tls-block" id="why-it-worked" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Why It Worked</span>
                <h2 data-reveal>Deliverability as a System, Not a Setting</h2>

                <p data-reveal>
                  The original failure wasn&rsquo;t one bad decision; it was the absence of any
                  structure that would have caught it. There was nothing between a purchased list and
                  the send button. The recovery worked because it replaced that gap with a system:
                  verification before sending, warmup before volume, and monitoring that ties how much
                  you send to how healthy your domain actually is.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;Before, deliverability was something we assumed was fine until it wasn&rsquo;t.
                  Now it&rsquo;s a number we look at before every campaign, and the platform
                  won&rsquo;t let us outrun it.&rdquo;
                </blockquote>

                <div className="tls-why-grid" data-reveal-stagger="110">
                  <article className="tls-why-card" data-reveal>
                    <h3>Verification before every send</h3>
                    <p>
                      No address enters a campaign unverified, so hard bounces, the fastest way
                      to burn a domain, stay near zero by default.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Reputation built gradually</h3>
                    <p>
                      Warmrit gave mailbox providers a steady history of wanted mail, creating the
                      cushion the domain never had the first time.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Volume gated by health</h3>
                    <p>
                      Sending scales up only as placement holds, making the original mistake (volume the domain can&rsquo;t support) structurally impossible.
                    </p>
                  </article>
                </div>
              </div>

              {/* The Numbers */}
              <div className="tls-block" id="notable-results" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Numbers</span>
                <h2 data-reveal>Notable Results: From Blacklisted to Better Than Before</h2>

                <ul className="tls-numbers" data-reveal-stagger="90">
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Bounce rate cut from 8.4% to 0.6% after Verifyrit removed 2,140 dead addresses
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Inbox placement recovered to 96%, higher than before the incident
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Full recovery in 32 days, from first audit to campaigns running at normal volume
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Customer-facing email (invoices, support, product) back in the inbox
                    within the first two weeks
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Zero blacklist flags in the twelve months since recovery
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Purchased lists eliminated entirely; every contact now sourced and verified
                    inside the platform
                  </li>
                </ul>
              </div>

              {/* Deep Dive */}
              <div className="tls-block" id="deep-dive" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Deep Dive</span>
                <h2 data-reveal>The 32 Days That Rebuilt the Domain</h2>

                <div className="tls-dd-grid" data-reveal-stagger="110">
                  <article className="tls-dd-card" data-reveal>
                    <h3>The Audit That Found 2,140 Dead Addresses</h3>
                    <p>
                      The first step wasn&rsquo;t sending anything; it was finding out how bad the
                      data really was. Verifyrit ran the team&rsquo;s entire contact database, purchased
                      list included, and flagged over a quarter of it as invalid, recycled, or high-risk.
                      Every one of those addresses had been a bounce waiting to happen.
                    </p>

                    <div className="tls-dd-compare" role="img" aria-label="Bounce rate: before 8.4%, after 0.6%">
                      <div className="tls-dd-bar tls-dd-bar--before">
                        <div className="tls-dd-bar-head">
                          <span>Before &middot; unverified list</span>
                          <span>8.4% bounce</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" /></div>
                      </div>
                      <div className="tls-dd-bar tls-dd-bar--after">
                        <div className="tls-dd-bar-head">
                          <span>After &middot; verified only</span>
                          <span>0.6% bounce</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" style={{ width: '8%' }} /></div>
                      </div>
                    </div>

                    <blockquote className="tls-quote">
                      &ldquo;Seeing the audit was painful and clarifying at the same time. We hadn&rsquo;t
                      been unlucky; we&rsquo;d been sending to a list that guaranteed this outcome.&rdquo;
                    </blockquote>
                  </article>

                  <article className="tls-dd-card" data-reveal>
                    <h3>The First Campaign After Recovery</h3>
                    <p>
                      The real test came on day 32: the first full campaign since the incident, sent to a
                      Zeus-sourced, fully verified list at a volume Sendrit held within the domain&rsquo;s
                      rebuilt capacity. Placement held at 96%, bounces stayed under 1%, and the campaign
                      out-performed anything the team had run before the blacklisting, proof the
                      recovery wasn&rsquo;t just repair, but an upgrade.
                    </p>
                    <blockquote className="tls-quote">
                      &ldquo;We came out of this with better deliverability than we&rsquo;d ever had.
                      The incident forced us to build the system we should have started with.&rdquo;
                    </blockquote>
                  </article>
                </div>
              </div>

              {/* What's Next */}
              <div className="tls-block" id="whats-next" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>What&rsquo;s Next</span>
                <h2 data-reveal>Protecting What Was Rebuilt</h2>

                <p data-reveal>
                  With the primary domain healthy again, the team&rsquo;s next step is separation:
                  moving outbound to dedicated sending domains, warmed and monitored in Warmrit, so the
                  company&rsquo;s core domain is never exposed to campaign risk again, however
                  small the platform has made that risk.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We&rsquo;ll never send cold email from our main domain again. Not because the
                  system isn&rsquo;t safe now, but because we know exactly what it costs when the
                  wrong thing goes wrong.&rdquo;
                </blockquote>

                <p data-reveal>
                  For a team that nearly lost its ability to email its own customers, the next chapter
                  is about scaling outbound on infrastructure designed to make that impossible.
                </p>
              </div>

            </div>

            {/* ----- Sticky sidebar ----- */}
            <aside className="tls-aside">
              <div className="tls-glance" data-reveal>
                <span className="tls-aside-label">At a Glance</span>
                <dl className="tls-glance-list">
                  <div className="tls-glance-row">
                    <dt>Bounce rate</dt>
                    <dd>8.4% &rarr; 0.6%</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Inbox placement</dt>
                    <dd>96%</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Recovery time</dt>
                    <dd>32 days</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Blacklist flags since</dt>
                    <dd>0</dd>
                  </div>
                </dl>

                <span className="tls-aside-label tls-aside-label--sub">Products Used</span>
                <div className="tls-glance-chips">
                  <span className="tls-glance-chip">Warmrit</span>
                  <span className="tls-glance-chip">Verifyrit</span>
                  <span className="tls-glance-chip">Sendrit</span>
                  <span className="tls-glance-chip">Zeus</span>
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
              <h2 data-reveal>Questions Teams Ask After a Deliverability Scare</h2>
              <p data-reveal>
                The practical concerns behind recovering (and protecting) a sending
                domain, answered.
              </p>
            </div>

            <div className="tls-faq-list" data-reveal-stagger="80">
              <details className="tls-faq-item" data-reveal>
                <summary>
                  Can a blacklisted domain actually recover?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    In most cases, yes, but only by fixing the cause first. Blacklists respond to
                    behavior, so removing the bad data, stopping the bounces, and rebuilding a pattern of
                    wanted mail is what gets a domain delisted and keeps it that way. The team in this
                    study went from multiple blacklist flags to 96% inbox placement in 32 days.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How long does domain recovery usually take?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    It depends on the severity of the damage, but a structured recovery (clean the list, warm gradually, ramp volume against monitored health) typically takes
                    weeks, not months. Rushing it is the most common way to end up back where you started.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  What made the purchased list so damaging?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Purchased lists are full of dead, recycled, and trap addresses; in this case,
                    over a quarter of the contacts. Every hard bounce and spam-trap hit tells mailbox
                    providers the sender doesn&rsquo;t know who they&rsquo;re emailing, which is exactly
                    the profile blacklists exist to catch.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How does verification prevent this happening again?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Verifyrit checks every address before it can enter a campaign, so hard bounces are
                    caught before they happen rather than after they&rsquo;ve damaged the domain. In this
                    study, that single change took the bounce rate from 8.4% to 0.6%.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  What does warmup actually do for a damaged domain?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Warmrit generates a steady, gradually increasing pattern of positive engagement,
                    mail that gets opened and answered, which rebuilds the sending history mailbox
                    providers use to judge trust. It gives the domain the reputation cushion it needs
                    before real campaign volume resumes.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Should outbound run on the main company domain at all?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Best practice is no: dedicated sending domains keep campaign risk away from the
                    email your business depends on. That&rsquo;s the team&rsquo;s next step in this study:
                    outbound on separate, warmed domains, with the primary domain reserved for customers.
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
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className="final-cta">
          <div className="container" data-reveal-stagger="100">
            <span className="section-label" data-reveal>Get Started</span>
            <h2 data-reveal>Run Outbound That Never Puts<br />Your Domain at Risk.</h2>
            <p data-reveal>
              Verification before every send. Warmup before every ramp. Teams are building outbound on
              infrastructure that makes the worst-case scenario structurally impossible.
            </p>
            <div className="final-buttons" data-reveal>
              <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
              <button className="btn-ghost">Book a Demo</button>
            </div>
            <p className="tls-cta-note" data-reveal>
              No credit card. Verify your first list and check your domain health in minutes.
            </p>
          </div>
        </section>

      </main>

      <ClientScripts />
    </>
  );
}
