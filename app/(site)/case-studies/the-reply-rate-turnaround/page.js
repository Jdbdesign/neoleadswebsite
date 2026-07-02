import Link from 'next/link';
import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';

export const metadata = { title: 'The Reply Rate Turnaround - Case Study | NeoLeads' };

export default function TheReplyRateTurnaroundPage() {
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
                <span className="tls-crumb-current" aria-current="page">The Reply Rate Turnaround</span>
              </nav>

              <span className="tls-badge" data-reveal>
                <Icon name="mail-open" aria-hidden="true" />
                Case Study #6
              </span>

              <h1 data-reveal>
                From 1.8% to <span className="tls-hl">11.4% Reply Rate</span>: Same List,
                Same Offer
              </h1>

              <p className="tls-sub" data-reveal>
                No new market, no new pitch, no new prospects. This team re-ran outbound to the same
                accounts with the same offer, and got six times the replies. The controlled
                experiment that proves the system matters more than the list.
              </p>

              <div className="tls-meta" data-reveal>
                <span className="tls-meta-chip">
                  <Icon name="clock" aria-hidden="true" />
                  6 min read
                </span>
                <span className="tls-meta-chip">B2B SaaS &middot; 4-rep team</span>
                <span className="tls-meta-chip">Controlled comparison</span>
              </div>
            </div>

            {/* ----- Right column: same-list comparison panel ----- */}
            <div className="tls-hero-visual" data-reveal>
              <div className="tls-panel">
                <div className="tls-panel-head">
                  <span className="tls-panel-title">
                    <span className="tls-panel-dot" aria-hidden="true" />
                    Same list &middot; same offer &middot; new system
                  </span>
                  <span className="tls-panel-flag">6.3&times; Replies</span>
                </div>

                <article className="tls-step">
                  <div className="tls-step-head">
                    <span className="tls-avatar tls-avatar--sendrit" aria-hidden="true">S</span>
                    <span className="tls-step-name">Sendrit &middot; Send</span>
                    <span className="tls-step-tag tls-step-tag--purple">AI first line</span>
                  </div>
                  <div className="tls-msg">
                    Noticed you just brought on a new Head of RevOps, usually the moment
                    reporting gaps start to sting
                    <span className="tls-cursor" aria-hidden="true" />
                  </div>
                  <div className="tls-mini-row">
                    <div className="tls-mini">
                      <span className="tls-mini-strong">1.8%</span>
                      <span className="tls-mini-sub">old system</span>
                    </div>
                    <div className="tls-mini tls-mini--purple">
                      <span className="tls-mini-strong">11.4%</span>
                      <span className="tls-mini-sub">new system</span>
                    </div>
                  </div>
                </article>

                <article className="tls-step">
                  <div className="tls-step-head">
                    <span className="tls-avatar tls-avatar--snaarp" aria-hidden="true">M</span>
                    <span className="tls-step-name">Snaarpmail &middot; Reply</span>
                    <span className="tls-step-tag tls-step-tag--green">hot</span>
                  </div>
                  <div className="tls-reply">
                    <div className="tls-reply-head">
                      <span className="tls-reply-subject">Re: quick thought</span>
                      <span className="tls-reply-intent">
                        <Icon name="flame" aria-hidden="true" />
                        High intent
                      </span>
                    </div>
                    <p className="tls-reply-quote">&ldquo;This is actually relevant, how&rsquo;s Thursday?&rdquo;</p>
                  </div>
                  <span className="tls-flagged">Same contact ignored the old sequence twice</span>
                </article>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== RESULTS METRICS ===================== */}
        <section className="tls-results">
          <div className="container">
            <p className="tls-results-label" data-reveal>
              Notable results: same list, same offer, three weeks after switching systems
            </p>

            <div className="tls-results-grid" data-reveal-stagger="110">
              <div className="tls-result" data-reveal>
                <div className="tls-result-num">11.4%</div>
                <p className="tls-result-desc">Reply rate on the re-run campaign</p>
                <span className="tls-result-note">up from 1.8% on the old system</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">6.3&times;</div>
                <p className="tls-result-desc">More replies from identical contacts</p>
                <span className="tls-result-note">no new names added</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">97%</div>
                <p className="tls-result-desc">Inbox placement after warmup</p>
                <span className="tls-result-note">most old sends never arrived</span>
              </div>

              <div className="tls-result" data-reveal>
                <div className="tls-result-num">3 wks</div>
                <p className="tls-result-desc">From switch to full turnaround</p>
                <span className="tls-result-note">including domain warmup</span>
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
                  On paper, the outbound motion looked fine. The list was solid: correctly-sized
                  accounts, right titles, a genuinely good offer that existing customers loved. The team
                  sent consistently, followed up on schedule, and did everything the playbooks say. The
                  reply rate: 1.8%, and drifting down each month.
                </p>
                <p data-reveal>
                  The internal debate split the usual way. One camp said the list was exhausted: buy new data, find new accounts. The other said the offer needed rework. Both fixes
                  were expensive, and neither camp could prove its theory, because the team had no way
                  to isolate what was actually failing.
                </p>
                <blockquote className="tls-quote" data-reveal>
                  &ldquo;Everyone had a theory about why nobody replied. New list, new offer, new
                  everything. What nobody suggested was that the problem might be the machinery in the
                  middle, because that part felt invisible.&rdquo;
                </blockquote>
                <p data-reveal>
                  So instead of changing the inputs, the team designed a controlled experiment: keep the
                  exact same list and the exact same offer, and change only the system underneath: deliverability, timing, and personalization. If the reply rate moved, they&rsquo;d know
                  where the problem had lived all along.
                </p>
              </div>

              {/* The Challenges */}
              <div className="tls-block" id="the-challenges" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Challenges</span>
                <h2 data-reveal>The Silent Failures Behind a 1.8% Reply Rate</h2>

                <div className="tls-walls" data-reveal-stagger="110">
                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">01</span>
                    <div className="tls-wall-text">
                      <h3>Most Emails Never Reached an Inbox</h3>
                      <p>
                        The sending domain had never been warmed and carried a mediocre reputation. A
                        placement test during the audit showed a large share of sends landing in spam: prospects weren&rsquo;t saying no; they were never seeing the email at all.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">02</span>
                    <div className="tls-wall-text">
                      <h3>Personalization That Fooled Nobody</h3>
                      <p>
                        Sequences opened with merge-tag lines: first name, company name, a generic
                        compliment. Prospects have learned to read that as automation, and it primed every
                        message after it to be ignored.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">03</span>
                    <div className="tls-wall-text">
                      <h3>Right Person, Wrong Week</h3>
                      <p>
                        The list was contacted alphabetically, on a schedule set by the sequencer,
                        not by anything happening at the prospect&rsquo;s company. Even perfect-fit
                        accounts were being reached at moments when the problem wasn&rsquo;t on their desk.
                      </p>
                    </div>
                  </article>

                  <article className="tls-wall" data-reveal>
                    <span className="tls-wall-num">04</span>
                    <div className="tls-wall-text">
                      <h3>A Decaying List Nobody Was Re-Verifying</h3>
                      <p>
                        The list had been verified once, a year earlier. B2B contact data decays fast,
                        and the accumulating bounces from stale addresses were quietly dragging
                        the domain&rsquo;s reputation down with every send.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              {/* The Solution */}
              <div className="tls-block" id="the-solution" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Solution</span>
                <h2 data-reveal>Change the System, Keep Everything Else Constant</h2>

                <p data-reveal>
                  The experiment started with the invisible layer.{' '}
                  <span className="tls-ichip">Verifyrit</span> re-verified the entire list,
                  removing the stale addresses that had been bleeding the domain&rsquo;s reputation,
                  while <span className="tls-ichip">Warmrit</span> spent two weeks rebuilding
                  sender reputation before the re-run began. A follow-up placement test confirmed the
                  fix: 97% of sends now reached an inbox.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;Half our problem was solved before we changed a single word of copy. You
                  can&rsquo;t get a reply to an email that landed in spam, and we&rsquo;d been
                  A/B testing subject lines on emails nobody ever saw.&rdquo;
                </blockquote>

                <p data-reveal>
                  Then came timing. <span className="tls-ichip">Zeus</span> enriched the existing list
                  with live buying signals (funding rounds, leadership hires, expansion news) and re-ordered it so each account was contacted when something relevant was
                  actually happening, not when the alphabet said so.
                </p>

                <p data-reveal>
                  Finally, the first lines. <span className="tls-ichip">Sendrit</span> rebuilt the
                  sequences with NeoBrain AI drafting openers grounded in each account&rsquo;s specific
                  signal, replacing merge-tag personalization with something a human would
                  recognize as informed. As replies multiplied,{' '}
                  <span className="tls-ichip">Snaarpmail</span> ranked them by intent so a four-rep team
                  could keep pace with six times the conversations.
                </p>

                <div className="tls-replaced" data-reveal>
                  <span className="tls-replaced-label">What Changed (and What Didn&rsquo;t)</span>
                  <ul className="tls-replaced-list">
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Unchanged:</strong> the list, the offer, the team, and the number of
                      emails per sequence, the experiment&rsquo;s controls.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Warmrit + Verifyrit</strong> fixed placement: from spam-folder
                      default to 97% inbox before the re-run started.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Zeus</strong> fixed timing: the same accounts, re-ordered by
                      live buying signals instead of alphabetical schedule.</span>
                    </li>
                    <li>
                      <Icon name="check" aria-hidden="true" />
                      <span><strong>Sendrit + NeoBrain AI</strong> fixed relevance: signal-based
                      first lines instead of merge-tag templates.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why It Worked */}
              <div className="tls-block" id="why-it-worked" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Why It Worked</span>
                <h2 data-reveal>Reply Rate Is a System Property</h2>

                <p data-reveal>
                  The experiment&rsquo;s conclusion was uncomfortable and liberating at once: the list
                  was never the problem, and neither was the offer. Reply rate turned out to be the
                  product of three multiplying factors: whether the email arrives, whether it
                  arrives at a relevant moment, and whether the first line earns the second one. The old
                  stack failed quietly at all three; fixing them compounded.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;We&rsquo;d been about to spend thousands on new data to solve a problem the data
                  never had. The same names, run through a working system, were worth six times more.&rdquo;
                </blockquote>

                <div className="tls-why-grid" data-reveal-stagger="110">
                  <article className="tls-why-card" data-reveal>
                    <h3>Delivery before copy</h3>
                    <p>
                      No message optimization matters until the message reliably reaches an inbox; placement went from the biggest silent leak to a solved problem.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Signals set the schedule</h3>
                    <p>
                      Contacting accounts when something relevant was happening turned the same list into
                      a fundamentally different audience.
                    </p>
                  </article>
                  <article className="tls-why-card" data-reveal>
                    <h3>Informed beats personalized</h3>
                    <p>
                      A first line about a real event at the company outperforms any merge-tag trick; it reads as research, not automation.
                    </p>
                  </article>
                </div>
              </div>

              {/* The Numbers */}
              <div className="tls-block" id="notable-results" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>The Numbers</span>
                <h2 data-reveal>Notable Results: The Controlled Re-Run</h2>

                <ul className="tls-numbers" data-reveal-stagger="90">
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Reply rate up from 1.8% to 11.4% on the identical list and identical offer
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    6.3&times; more replies, including from accounts that had ignored the old
                    sequence twice
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Inbox placement at 97% after warmup and re-verification, confirmed by placement tests
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Positive-reply share rose too: more of the replies were interest, not opt-outs
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Meetings booked in the first re-run month exceeded the previous quarter combined
                  </li>
                  <li data-reveal>
                    <span className="tls-check" aria-hidden="true"><Icon name="check" /></span>
                    Zero spend on new data; the planned list purchase was cancelled outright
                  </li>
                </ul>
              </div>

              {/* Deep Dive */}
              <div className="tls-block" id="deep-dive" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>Deep Dive</span>
                <h2 data-reveal>The Experiment, Measured Honestly</h2>

                <div className="tls-dd-grid" data-reveal-stagger="110">
                  <article className="tls-dd-card" data-reveal>
                    <h3>Same 1,200 Contacts, Two Very Different Outcomes</h3>
                    <p>
                      The re-run used the exact 1,200-contact list from the failed campaign: no additions, no substitutions. Under the old system, those contacts produced 22
                      replies. Re-verified, signal-ordered, and reached from a warmed domain with informed
                      first lines, the same names produced 137. The inputs were the control; the system
                      was the variable.
                    </p>

                    <div className="tls-dd-compare" role="img" aria-label="Reply rate: old system 1.8%, new system 11.4%">
                      <div className="tls-dd-bar tls-dd-bar--before">
                        <div className="tls-dd-bar-head">
                          <span>Old system &middot; same list</span>
                          <span>1.8% &middot; 22 replies</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" style={{ width: '16%' }} /></div>
                      </div>
                      <div className="tls-dd-bar tls-dd-bar--after">
                        <div className="tls-dd-bar-head">
                          <span>New system &middot; same list</span>
                          <span>11.4% &middot; 137 replies</span>
                        </div>
                        <div className="tls-dd-track"><span className="tls-dd-fill" style={{ width: '100%' }} /></div>
                      </div>
                    </div>

                    <blockquote className="tls-quote">
                      &ldquo;It&rsquo;s the cleanest experiment we&rsquo;ve ever run in sales. One
                      variable changed. The result was six-fold. There&rsquo;s nothing left to argue
                      about.&rdquo;
                    </blockquote>
                  </article>

                  <article className="tls-dd-card" data-reveal>
                    <h3>The Prospect Who Ignored Us Twice, Then Booked a Call</h3>
                    <p>
                      The story the team retells is a single contact: a VP who had received (and ignored) two full sequences under the old system. In the re-run, Zeus flagged
                      her company the week it announced a new RevOps hire, and NeoBrain&rsquo;s first line
                      opened with exactly that. She replied in four hours and booked a call for Thursday.
                      Same person, same offer; different moment, different message, different
                      outcome.
                    </p>
                    <blockquote className="tls-quote">
                      &ldquo;She told us on the call she&rsquo;d never seen the earlier emails. They were
                      in spam. The third one arrived in her inbox, in the right week, about the right
                      thing. That&rsquo;s the whole case study in one anecdote.&rdquo;
                    </blockquote>
                  </article>
                </div>
              </div>

              {/* What's Next */}
              <div className="tls-block" id="whats-next" data-reveal-stagger="90">
                <span className="tls-eyebrow" data-reveal>What&rsquo;s Next</span>
                <h2 data-reveal>Scaling a Proven Multiplier</h2>

                <p data-reveal>
                  With the system validated on the old list, the team is now expanding the audience it
                  runs through it, confident that new contacts will arrive into a motion that
                  converts at 11%, not 2%. The planned data purchase is back on the table, but for the
                  opposite reason: growth, not rescue.
                </p>

                <blockquote className="tls-quote" data-reveal>
                  &ldquo;Every contact we add now is worth six of what a contact used to be worth to us.
                  That completely changes the math on how fast we want to grow the list.&rdquo;
                </blockquote>

                <p data-reveal>
                  For a team that nearly rebuilt everything except the thing that was broken, the next
                  chapter is simple: more volume through a system that finally deserves it.
                </p>
              </div>

            </div>

            {/* ----- Sticky sidebar ----- */}
            <aside className="tls-aside">
              <div className="tls-glance" data-reveal>
                <span className="tls-aside-label">At a Glance</span>
                <dl className="tls-glance-list">
                  <div className="tls-glance-row">
                    <dt>Reply rate</dt>
                    <dd>1.8% &rarr; 11.4%</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>List / offer</dt>
                    <dd>Unchanged</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Inbox placement</dt>
                    <dd>97%</dd>
                  </div>
                  <div className="tls-glance-row">
                    <dt>Time to turnaround</dt>
                    <dd>3 weeks</dd>
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
              <h2 data-reveal>Questions Teams With Low Reply Rates Ask First</h2>
              <p data-reveal>
                The practical concerns behind diagnosing (and fixing) a failing outbound
                motion, answered.
              </p>
            </div>

            <div className="tls-faq-list" data-reveal-stagger="80">
              <details className="tls-faq-item" data-reveal>
                <summary>
                  How do I know if my list is the problem or my system is?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Run the diagnostics before buying anything: a placement test tells you whether your
                    emails reach inboxes, and re-verification tells you how much of the list has decayed.
                    In this study both checks failed, which meant the same list could be rescued
                    rather than replaced.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Is a 1.8% reply rate really a deliverability problem?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Often, largely yes, and it&rsquo;s the failure nobody sees. If a meaningful
                    share of sends lands in spam, every downstream metric collapses no matter how good the
                    copy is. This team&rsquo;s placement test showed exactly that, and fixing it alone
                    accounted for a large share of the turnaround.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Can you really re-contact a list that already ignored you?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Yes, especially when many of those contacts never actually saw the earlier
                    emails. With placement fixed, timing set by live signals, and a first line worth
                    reading, previously unresponsive accounts replied at the full 11.4% rate,
                    including some who had ignored two complete sequences.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  What&rsquo;s wrong with merge-tag personalization?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Prospects have seen &ldquo;Hi &#123;FirstName&#125;, love what &#123;Company&#125; is
                    doing&rdquo; thousands of times; it signals automation, not attention. A first
                    line referencing a real, current event at the company reads as informed research, and
                    that difference showed up directly in this study&rsquo;s reply rate.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  How long does a turnaround like this take?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    Three weeks here, end to end: two weeks of Warmrit warmup and Verifyrit cleaning while
                    Zeus enriched and re-ordered the list, then the re-run itself. The waiting is part of the fix; launching before the domain is ready just repeats the original failure.
                  </p>
                </div>
              </details>

              <details className="tls-faq-item" data-reveal>
                <summary>
                  Will more replies overwhelm a small team?
                  <span className="tls-faq-ic" aria-hidden="true"><Icon name="chevron-down" /></span>
                </summary>
                <div className="tls-faq-a">
                  <p>
                    It&rsquo;s a real concern at 6&times; volume, and it&rsquo;s what Snaarpmail is
                    for. Replies arrive ranked by intent, so the four reps in this study worked the hottest
                    conversations first and never let a high-intent reply age at the bottom of an inbox.
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

              <Link className="tls-related-card" href="/case-studies/the-sales-leaders-stack-collapse" data-reveal>
                <span className="tls-related-tag">Case Study</span>
                <h3>The Sales Leader&rsquo;s Stack Collapse</h3>
                <p>
                  How a VP Sales replaced 5 tools with NeoLeads and cut stack costs by 60%, while
                  booking more meetings per rep.
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
            <h2 data-reveal>Your List Isn&rsquo;t the Problem.<br />Run It Through a Better System.</h2>
            <p data-reveal>
              Before you buy new data or rewrite your offer, fix what&rsquo;s actually broken: placement, timing, and first lines. Teams are multiplying reply rates on the lists they
              already own.
            </p>
            <div className="final-buttons" data-reveal>
              <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
              <button className="btn-ghost">Book a Demo</button>
            </div>
            <p className="tls-cta-note" data-reveal>
              No credit card. Re-verify your list and test your inbox placement in minutes.
            </p>
          </div>
        </section>

      </main>

      <ClientScripts />
    </>
  );
}
