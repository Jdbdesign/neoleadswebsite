import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import ManualProspectingScripts from '@/components/ManualProspectingScripts';
import ManualProspectingCompare from '@/components/ManualProspectingCompare';
import ManualProspectingCauses from '@/components/ManualProspectingCauses';
import ManualProspectingSearchCard from '@/components/ManualProspectingSearchCard';
import ManualProspectingPipelineCard from '@/components/ManualProspectingPipelineCard';
import ManualProspectingFix from '@/components/ManualProspectingFix';

export const metadata = { title: 'Manual Prospecting | NeoLeads' };

export default function ManualProspectingPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="mp-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <h1 data-reveal>
            Your Reps Spend <span className="mp-hl">70% of Their Week</span> Not
            Selling. That&rsquo;s the Problem.
          </h1>
          <p className="mp-sub" data-reveal>
            The average B2B sales rep spends just <strong>28&ndash;30%</strong> of their week
            actually selling. The rest disappears into manual research, tab-switching,
            list-building, and CRM updates that don&rsquo;t move a single deal forward. Zeus
            replaces that entire process with a 10-second search: verified contacts,
            buying signals, and ICP scores, ready to launch without leaving NeoLeads.
          </p>
          <div className="mp-ctas" data-reveal>
            <button className="btn-primary">Find Leads in Seconds, Free <Icon name="arrow-right" /></button>
            <button className="btn-light">See Zeus Find Leads Live</button>
          </div>
          <p className="mp-microcopy" data-reveal>
            No credit card. Your first search returns verified leads in under 10 seconds.
          </p>
        </div>
      </section>

      {/* ===================== MANUAL vs ZEUS COMPARISON ===================== */}
      <ManualProspectingCompare />

      {/* ===================== METRICS / NUMBERS ===================== */}
      <section className="mp-metrics">
        <div className="container">
          <p className="mp-metrics-label" data-reveal>
            The true cost of manual prospecting, measured in time your reps aren&rsquo;t selling
          </p>

          <div className="mp-metrics-grid" data-reveal-stagger="110">
            <div className="mp-metric" data-reveal>
              <div className="mp-metric-num" data-to="70" data-decimals="0" data-suffix="%">70%</div>
              <p className="mp-metric-desc">Of the average sales rep&rsquo;s week is spent on non-selling tasks</p>
              <span className="mp-metric-src">Salesforce State of Sales 2025</span>
            </div>

            <div className="mp-metric" data-reveal>
              <div className="mp-metric-num" data-to="37" data-decimals="0" data-suffix=" weeks">37 weeks</div>
              <p className="mp-metric-desc">Selling weeks lost per rep per year to research, admin &amp; tool-switching</p>
              <span className="mp-metric-src">Salesforce / Forrester 2026</span>
            </div>

            <div className="mp-metric" data-reveal>
              <div className="mp-metric-num" data-to="54" data-decimals="0" data-suffix="%">54%</div>
              <p className="mp-metric-desc">Of teams say finding quality leads is their biggest prospecting challenge</p>
              <span className="mp-metric-src">Outreach 2025</span>
            </div>

            <div className="mp-metric" data-reveal>
              <div className="mp-metric-num" data-to="3.7" data-decimals="1" data-suffix="×">3.7×</div>
              <p className="mp-metric-desc">More likely to hit quota when reps partner with AI for prospecting</p>
              <span className="mp-metric-src">Gartner 2025</span>
            </div>
          </div>

          <p className="mp-metrics-foot" data-reveal>
            Every one of these hours is recoverable.{' '}
            <span className="mp-accent">Zeus gives them back.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <ManualProspectingCauses />

      {/* ===================== DEEP DIVE - RESEARCH TIME & SIGNALS ===================== */}
      <section className="mp-pp">
        <div className="container">
          <div className="mp-pp-layout">
            {/* ---- left: copy + features ---- */}
            <div className="mp-pp-text" data-reveal-stagger="100">
              <span className="mp-pp-label" data-reveal>
                Root Cause 1 + 3: Research Time &amp; Missing Signals
              </span>
              <h2 data-reveal>
                Describe Your Buyer Once. Zeus Finds Them, With a Reason to Call.
              </h2>
              <p className="mp-pp-lead" data-reveal>
                The manual loop looks like this: spend the morning researching, find a name, guess
                at a reason to reach out, write something generic, and wonder why no one replies.
                Zeus breaks the loop. Type a description of your ideal buyer, in plain English,
                and get back a ranked list of verified contacts, each flagged with the
                specific signal that makes them worth contacting right now.
              </p>

              <div className="mp-pp-feats" data-reveal>
                <div className="mp-pp-feat">
                  <span className="mp-pp-feat-ic"><Icon name="search" aria-hidden="true" /></span>
                  <div className="mp-pp-feat-body">
                    <h4>Natural Language Search</h4>
                    <p>
                      Describe your ICP the way you&rsquo;d explain it to a colleague: &ldquo;Head of
                      RevOps at mid-market SaaS companies using Salesforce that just raised a Series
                      B.&rdquo; Zeus finds them. No filter-stacking, no tab-switching, no building a
                      list from a raw export that goes stale in six weeks.
                    </p>
                  </div>
                </div>

                <div className="mp-pp-feat">
                  <span className="mp-pp-feat-ic"><Icon name="sparkles" aria-hidden="true" /></span>
                  <div className="mp-pp-feat-body">
                    <h4>Buying Signals Built In</h4>
                    <p>
                      NeoBrain AI reads each contact&rsquo;s recent company signals: funding
                      rounds, leadership changes, hiring surges, technology shifts, and
                      surfaces the specific one that makes this the right moment to reach out. Every
                      result comes with a &ldquo;why now,&rdquo; not just a &ldquo;who.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- right: animated zeus search-result card ---- */}
            <ManualProspectingSearchCard />
          </div>
        </div>
      </section>

      {/* ===================== DEEP DIVE - TOOL SPRAWL & STALE LISTS ===================== */}
      <section className="mp-df">
        <div className="container">
          <div className="mp-df-layout">
            {/* ---- left: animated pipeline card ---- */}
            <ManualProspectingPipelineCard />

            {/* ---- right: copy + features ---- */}
            <div className="mp-pp-text" data-reveal-stagger="100">
              <span className="mp-pp-label neutral" data-reveal>
                Root Cause 2 + 4: Tool Sprawl &amp; Stale Lists
              </span>
              <h2 data-reveal>
                From Search to Live Campaign. Four Minutes. One Platform.
              </h2>
              <p className="mp-pp-lead" data-reveal>
                The average manual workflow spans eight tools and takes hours before a campaign is
                even ready to launch. In NeoLeads, Zeus finds the contacts, Verifyrit validates them,
                NeoBrain AI writes the opening lines, and Sendrit launches the campaign, all
                without leaving the platform. Eight logins and eight context-switches become one
                uninterrupted workflow.
              </p>

              <div className="mp-pp-feats" data-reveal>
                <div className="mp-pp-feat">
                  <span className="mp-pp-feat-ic"><Icon name="git-merge" aria-hidden="true" /></span>
                  <div className="mp-pp-feat-body">
                    <h4>One Pipeline From Search to Send</h4>
                    <p>
                      Every step between identifying a prospect and reaching out happens inside
                      NeoLeads. No exporting to a spreadsheet, no re-uploading to a different tool, no
                      format mismatches between the list-builder and the email sender. Find &rarr;
                      verify &rarr; send in one unbroken flow.
                    </p>
                  </div>
                </div>

                <div className="mp-pp-feat">
                  <span className="mp-pp-feat-ic"><Icon name="history" aria-hidden="true" /></span>
                  <div className="mp-pp-feat-body">
                    <h4>Saved Searches That Maintain Themselves</h4>
                    <p>
                      Turn any Zeus search into a living list that re-runs automatically and surfaces
                      new matches as they appear, with Verifyrit validating every new contact
                      in real time. The list your team worked from in October is still accurate in
                      January without anyone touching it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THE FULL FIX (5-product bento) ===================== */}
      <ManualProspectingFix />

      {/* ===================== PROSPECTING FIX SUMMARY (3-column) ===================== */}
      <section className="mp-sum">
        <div className="container">
          <div className="mp-sum-head" data-reveal-stagger="100">
            <span className="mp-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Prospecting Fix
            </span>
            <h2 data-reveal>
              Four Drains on Prospecting Time. One<br />
              Platform That Eliminates Them.
            </h2>
            <p data-reveal>
              Each NeoLeads product removes a specific layer of the manual prospecting problem,
              and because they&rsquo;re connected, the time savings compound across every
              step of the workflow.
            </p>
          </div>

          <div className="mp-sum-grid" data-reveal-stagger="120">
            {/* --- Column 1 --- */}
            <article className="mp-sum-col" data-reveal>
              <h3 className="mp-sum-title">Replace Manual Research</h3>
              <div className="mp-sum-chips">
                <span className="mp-sum-chip">Zeus</span>
                <span className="mp-sum-chip">NeoBrain AI</span>
              </div>
              <p className="mp-sum-desc">
                A 10-second natural language search replaces hours of LinkedIn scrolling,
                tab-switching, and manual cross-referencing. Every result arrives pre-scored by
                NeoBrain AI with the buying signal that makes the contact worth reaching out to today,
                not just a verified email and a job title.
              </p>
              <p className="mp-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="mp-sum-from">47 minutes for 6 contacts</span> &rarr;{' '}
                  <span className="mp-sum-to">10 seconds for 47 verified, signal-ranked contacts</span>
                </span>
              </p>
            </article>

            {/* --- Column 2 --- */}
            <article className="mp-sum-col" data-reveal>
              <h3 className="mp-sum-title">Collapse Eight Tools Into One</h3>
              <div className="mp-sum-chips">
                <span className="mp-sum-chip">Zeus</span>
                <span className="mp-sum-chip">Verifyrit</span>
                <span className="mp-sum-chip">Warmrit</span>
                <span className="mp-sum-chip">Sendrit</span>
                <span className="mp-sum-chip">Snaarpmail</span>
                <span className="mp-sum-chip">NeoBrain AI</span>
              </div>
              <p className="mp-sum-desc">
                Finding, verifying, warming, sending, and managing replies all happen inside NeoLeads,
                connected, without format mismatches, re-uploads, or context-switches. The
                8-tool stack that was bought to save time becomes one workflow that actually does.
              </p>
              <p className="mp-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="mp-sum-from">8 tools and 8 logins</span> &rarr;{' '}
                  <span className="mp-sum-to">1 platform and 1 pipeline</span>
                </span>
              </p>
            </article>

            {/* --- Column 3 --- */}
            <article className="mp-sum-col" data-reveal>
              <h3 className="mp-sum-title">Build Lists That Stay Current</h3>
              <div className="mp-sum-chips">
                <span className="mp-sum-chip">Zeus</span>
                <span className="mp-sum-chip">Verifyrit</span>
                <span className="mp-sum-chip">NeoBrain AI</span>
              </div>
              <p className="mp-sum-desc">
                Saved searches re-run automatically and surface new matches as they appear, with
                Verifyrit validating each new contact in real time and NeoBrain AI scoring them
                against your ICP. The list you built in October is still accurate, and growing,
                in January.
              </p>
              <p className="mp-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="mp-sum-from">static lists that decay</span> &rarr;{' '}
                  <span className="mp-sum-to">living searches that self-update</span>
                </span>
              </p>
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

      {/* ===================== FINAL CTA - GET STARTED ===================== */}
      <section className="final-cta">
        <div className="container" data-reveal-stagger="100">
          <span className="section-label" data-reveal>GET STARTED</span>
          <h2 data-reveal>Ready to Get Your Reps<br />Back to Selling?</h2>
          <p data-reveal>Stop losing 70% of the week to research, tab-switching, and list-building.<br />Let Zeus surface verified, signal-ready buyers in seconds, so your team can actually sell.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Find Leads in Seconds Free <Icon name="arrow-right" /></button>
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
      <ManualProspectingScripts />
    </>
  );
}
