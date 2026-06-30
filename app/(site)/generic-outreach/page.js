import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import GenericOutreachCompare from '@/components/GenericOutreachCompare';
import GenericOutreachCauses from '@/components/GenericOutreachCauses';
import GenericOutreachResearchCard from '@/components/GenericOutreachResearchCard';
import GenericOutreachCampaignCard from '@/components/GenericOutreachCampaignCard';
import GenericOutreachProcess from '@/components/GenericOutreachProcess';
import GenericOutreachScripts from '@/components/GenericOutreachScripts';

export const metadata = { title: 'Generic Outreach | NeoLeads' };

export default function GenericOutreachPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="go-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <h1 data-reveal>
            <span className="go-hl">{'{{FirstName}}'}</span> Isn&rsquo;t
            Personalization.<br />It&rsquo;s a Red Flag.
          </h1>
          <p className="go-sub" data-reveal>
            In 2026, decision-makers receive <strong>15+ cold emails a week</strong>, and
            they&rsquo;ve trained themselves to spot a template in the first sentence. NeoBrain AI
            researches every prospect on your list, finds the specific buying signal that makes them
            worth contacting right now, and writes a first line that proves someone actually looked
            them up. Because it did.
          </p>
          <div className="go-ctas" data-reveal>
            <button className="btn-primary">Write Smarter Outreach, Free <Icon name="arrow-right" /></button>
            <button className="btn-light">See NeoBrain Write a Personalised Email</button>
          </div>
          <p className="go-microcopy" data-reveal>
            No credit card. See a NeoBrain AI-written first line in under 30 seconds.
          </p>
        </div>
      </section>

      {/* ===================== GENERIC vs NEOBRAIN AI COMPARISON ===================== */}
      <GenericOutreachCompare />

      {/* ===================== METRICS / NUMBERS ===================== */}
      <section className="go-metrics">
        <div className="container">
          <p className="go-metrics-label" data-reveal>
            The personalization gap, measured in replies, meetings, and closed deals
          </p>

          <div className="go-metrics-grid" data-reveal-stagger="110">
            <div className="go-metric" data-reveal>
              <div className="go-metric-num" data-to="71" data-decimals="0" data-suffix="%">71%</div>
              <p className="go-metric-desc">Of decision-makers ignore cold emails because they lack relevance</p>
              <span className="go-metric-src">Hunter.io State of Cold Email</span>
            </div>

            <div className="go-metric" data-reveal>
              <div className="go-metric-num" data-to="5" data-decimals="0" data-suffix="%">5%</div>
              <p className="go-metric-desc">Of senders personalize every email, and they get 2&ndash;3&times; better results</p>
              <span className="go-metric-src">Woodpecker 2026</span>
            </div>

            <div className="go-metric" data-reveal>
              <div className="go-metric-num" data-to="18" data-decimals="0" data-suffix="%">18%</div>
              <p className="go-metric-desc">Reply rate for signal-specific personalized outreach vs. 3.43% average</p>
              <span className="go-metric-src">Autobound 2026</span>
            </div>

            <div className="go-metric" data-reveal>
              <div className="go-metric-num">5&ndash;10&times;</div>
              <p className="go-metric-desc">More effective at converting to meetings vs. generic templates</p>
              <span className="go-metric-src">Artemis Leads 2026</span>
            </div>
          </div>

          <p className="go-metrics-foot" data-reveal>
            The gap between your current reply rate and 18% isn&rsquo;t talent. It&rsquo;s research.{' '}
            <span className="go-accent">NeoBrain AI does the research.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <GenericOutreachCauses />

      {/* ===================== DEEP DIVE: MERGE TAGS & MISSING SIGNALS ===================== */}
      <section className="go-pp">
        <div className="container">
          <div className="go-pp-layout">
            {/* ---- left: copy + features ---- */}
            <div className="go-pp-text" data-reveal-stagger="100">
              <span className="go-pp-label" data-reveal>
                Root Cause 1 + 2: Merge Tags &amp; Missing Signals
              </span>
              <h2 data-reveal>
                NeoBrain AI Doesn&rsquo;t Personalise With Your Name. It Personalises With Your
                Situation.
              </h2>
              <p className="go-pp-lead" data-reveal>
                There are two levels of personalization in cold email. Level 1 is knowing
                someone&rsquo;s name and company. Every tool does that, and every prospect
                knows it. Level 2 is referencing something specific about their situation right now: a
                recent hire, a growth move, a signal that says &ldquo;I know what you&rsquo;re dealing
                with this week.&rdquo; NeoBrain AI operates at Level 2, automatically, across every
                contact on your list.
              </p>

              <div className="go-pp-feats" data-reveal>
                <div className="go-pp-feat">
                  <span className="go-pp-feat-ic"><Icon name="sparkles" aria-hidden="true" /></span>
                  <div className="go-pp-feat-body">
                    <h4>Signal-Researched First Lines</h4>
                    <p>
                      Before Sendrit writes a word, NeoBrain AI reads the buying signal that surfaced
                      each contact in Zeus, their funding event, hiring surge, leadership
                      change, or tech shift, and builds an opening line around it. The prospect
                      opens an email that references something real, not a placeholder swapped in at
                      send time.
                    </p>
                  </div>
                </div>

                <div className="go-pp-feat">
                  <span className="go-pp-feat-ic"><Icon name="mic" aria-hidden="true" /></span>
                  <div className="go-pp-feat-body">
                    <h4>Voice and Tone Training</h4>
                    <p>
                      Train NeoBrain AI on your brand voice: upload samples, set tone
                      preferences, define what sounds like your team at their best. Every
                      AI-generated sequence reflects that voice, across every contact, at any volume.
                      The personalization scales; the human feel stays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- right: animated contact-research card ---- */}
            <GenericOutreachResearchCard />
          </div>
        </div>
      </section>

      {/* ===================== DEEP DIVE: CHANNEL CONSISTENCY & PRECISION ===================== */}
      <section className="go-pp go-pp-flip">
        <div className="container">
          <div className="go-pp-layout">
            {/* ---- right (desktop): copy + features; leads on mobile ---- */}
            <div className="go-pp-text" data-reveal-stagger="100">
              <span className="go-pp-label" data-reveal>
                Root Cause 3 + 4: Channel Consistency &amp; Precision Over Volume
              </span>
              <h2 data-reveal>
                One Campaign. Three Channels. Every Message Written for That Specific Person.
              </h2>
              <p className="go-pp-lead" data-reveal>
                Personalization that holds across email, LinkedIn, and a follow-up call is the
                difference between a multichannel campaign and the same email in three different
                fonts. Sendrit orchestrates each channel with NeoBrain AI writing
                context-appropriate content per step, so the prospect receives a coherent,
                relevant sequence, not a forwarded email with a LinkedIn notification attached.
              </p>

              <div className="go-pp-feats" data-reveal>
                <div className="go-pp-feat">
                  <span className="go-pp-feat-ic"><Icon name="repeat-2" aria-hidden="true" /></span>
                  <div className="go-pp-feat-body">
                    <h4>Channel-Appropriate AI Writing</h4>
                    <p>
                      NeoBrain AI doesn&rsquo;t copy-paste across channels. Each step gets a
                      distinct content brief: the email gets a signal-led opening argument,
                      the LinkedIn message gets a concise professional nudge, and the follow-up
                      email references the lack of response rather than repeating the original
                      pitch.
                    </p>
                  </div>
                </div>

                <div className="go-pp-feat">
                  <span className="go-pp-feat-ic"><Icon name="target" aria-hidden="true" /></span>
                  <div className="go-pp-feat-body">
                    <h4>Precision List Sizing</h4>
                    <p>
                      Zeus&rsquo;s ICP scoring means only the highest-fit, highest-intent contacts
                      enter a sequence. Smaller, better-scored lists consistently outperform large
                      generic ones, and NeoBrain AI&rsquo;s per-contact research is more
                      effective on 50 well-chosen prospects than on 500 random ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- left (desktop): animated multichannel campaign card ---- */}
            <GenericOutreachCampaignCard />
          </div>
        </div>
      </section>

      {/* ===================== THE FULL FIX: FIVE-STEP PROCESS ===================== */}
      <GenericOutreachProcess />

      {/* ===================== THE PERSONALISATION FIX (summary) ===================== */}
      <section className="go-sum">
        <div className="container">
          <div className="go-sum-head" data-reveal-stagger="100">
            <span className="go-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Personalisation Fix
            </span>
            <h2 data-reveal>
              Four Causes of Generic Outreach.<br />
              One Platform That Fixes Them All.
            </h2>
            <p data-reveal>
              Each NeoLeads product removes a specific layer of the generic outreach problem, and
              because they&rsquo;re connected, the personalisation runs all the way from the first
              search to the last follow-up.
            </p>
          </div>

          <div className="go-sum-grid" data-reveal-stagger="120">
            {/* --- Card 1 --- */}
            <article className="go-sum-col" data-reveal>
              <h3 className="go-sum-title">Replace Merge Tags With Signal Research</h3>
              <div className="go-sum-chips">
                <span className="go-sum-chip">NeoBrain AI</span>
                <span className="go-sum-chip">Zeus</span>
              </div>
              <p className="go-sum-desc">
                Zeus surfaces contacts with live buying signals. NeoBrain AI reads those signals and
                writes a unique, context-specific first line per contact. Not a template, not a
                field substitution. Every prospect on your list gets a message that proves someone
                looked them up, because the AI did.
              </p>
              <p className="go-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="go-sum-from">3.43% average reply rate</span> &rarr;{' '}
                  <span className="go-sum-to">18% with signal-specific personalization</span>
                </span>
              </p>
            </article>

            {/* --- Card 2 --- */}
            <article className="go-sum-col" data-reveal>
              <h3 className="go-sum-title">Personalize Across Every Channel</h3>
              <div className="go-sum-chips">
                <span className="go-sum-chip">Sendrit</span>
                <span className="go-sum-chip">NeoBrain AI</span>
              </div>
              <p className="go-sum-desc">
                Sendrit orchestrates email, LinkedIn, and calling in a single campaign, with NeoBrain
                AI writing channel-appropriate content at each step. The prospect receives a coherent,
                escalating sequence, not three versions of the same email delivered through
                different apps.
              </p>
              <p className="go-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="go-sum-from">one template on three channels</span> &rarr;{' '}
                  <span className="go-sum-to">a distinct, relevant message per channel</span>
                </span>
              </p>
            </article>

            {/* --- Card 3 --- */}
            <article className="go-sum-col" data-reveal>
              <h3 className="go-sum-title">Precision Over Volume</h3>
              <div className="go-sum-chips">
                <span className="go-sum-chip">Zeus</span>
                <span className="go-sum-chip">NeoBrain AI</span>
                <span className="go-sum-chip">Verifyrit</span>
              </div>
              <p className="go-sum-desc">
                ICP scoring in Zeus ensures only the highest-fit, signal-backed contacts enter a
                sequence, and Verifyrit validates every one before Sendrit fires. Smaller,
                well-researched campaigns consistently outperform larger generic ones, and
                NeoBrain AI&rsquo;s research quality holds at any list size.
              </p>
              <p className="go-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="go-sum-from">2.1% on 500-contact blasts</span> &rarr;{' '}
                  <span className="go-sum-to">5.8%+ on tight, scored, research-backed lists</span>
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

      {/* ===================== FINAL CTA: GET STARTED ===================== */}
      <section className="final-cta">
        <div className="container" data-reveal-stagger="100">
          <span className="section-label" data-reveal>GET STARTED</span>
          <h2 data-reveal>Ready to Sound Like a Human<br />Instead of a Template?</h2>
          <p data-reveal>Stop blasting the same {'{{FirstName}}'} template to every contact.<br />Let NeoBrain AI research each prospect and write a first line that earns the reply.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Write Smarter Outreach Free <Icon name="arrow-right" /></button>
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
      <GenericOutreachScripts />
    </>
  );
}
