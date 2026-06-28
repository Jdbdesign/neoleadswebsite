import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import LowReplyRatesScripts from '@/components/LowReplyRatesScripts';
import LowReplyRatesCauses from '@/components/LowReplyRatesCauses';
import LowReplyRatesCompare from '@/components/LowReplyRatesCompare';
import LowReplyRatesTargetingCard from '@/components/LowReplyRatesTargetingCard';
import LowReplyRatesDelivCard from '@/components/LowReplyRatesDelivCard';
import LowReplyRatesFindPeopleCard from '@/components/LowReplyRatesFindPeopleCard';
import LowReplyRatesCleanListCard from '@/components/LowReplyRatesCleanListCard';
import LowReplyRatesWarmInboxCard from '@/components/LowReplyRatesWarmInboxCard';
import LowReplyRatesSendFollowUpCard from '@/components/LowReplyRatesSendFollowUpCard';
import LowReplyRatesHotReplyCard from '@/components/LowReplyRatesHotReplyCard';

export const metadata = { title: 'Low Reply Rates | NeoLeads' };

export default function LowReplyRatesPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="lrr-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <span className="lrr-badge" data-reveal>
            <Icon name="message-circle-off" aria-hidden="true" />
            Low Reply Rates
          </span>
          <h1 data-reveal>
            19 of 20 Cold Emails{' '}
            <span className="lrr-nowrap">Get <span className="lrr-danger">Ignored.</span></span><br />
            Here&rsquo;s Why Yours Are.
          </h1>
          <p className="lrr-sub" data-reveal>
            The average cold email reply rate has dropped to 3.43% in 2026. Teams hitting
            15%+ aren&rsquo;t writing better subject lines &mdash; they&rsquo;re fixing the four root
            causes most teams never touch: wrong targets, emails that never arrive,
            outreach that reads like a template, and follow-up that gives up too soon.
          </p>
          <div className="lrr-ctas" data-reveal>
            <button className="btn-primary">Fix My Reply Rate Free</button>
            <button className="btn-light">See How NeoLeads Does It</button>
          </div>
          <p className="lrr-microcopy" data-reveal>
            No credit card. See your first campaign improvements in under 10 minutes.
          </p>
        </div>
      </section>

      {/* ===================== BEFORE / AFTER COMPARISON ===================== */}
      <LowReplyRatesCompare />

      {/* ===================== METRICS / NUMBERS ===================== */}
      <section className="lrr-metrics">
        <div className="container">
          <p className="lrr-metrics-label" data-reveal>
            The numbers behind the problem and what fixing it actually looks like
          </p>

          <div className="lrr-metrics-grid" data-reveal-stagger="110">
            <div className="lrr-metric" data-reveal>
              <div className="lrr-metric-num" data-to="3.43" data-decimals="2" data-suffix="%">3.43%</div>
              <p className="lrr-metric-desc">Average B2B cold email reply rate in 2026</p>
              <span className="lrr-metric-src">Instantly Benchmark Report</span>
            </div>

            <div className="lrr-metric" data-reveal>
              <div className="lrr-metric-num" data-to="17" data-decimals="0" data-suffix="%">17%</div>
              <p className="lrr-metric-desc">Cold emails that never reach the inbox</p>
              <span className="lrr-metric-src">Authentication failures</span>
            </div>

            <div className="lrr-metric" data-reveal>
              <div className="lrr-metric-num" data-to="202" data-decimals="0" data-suffix="%">202%</div>
              <p className="lrr-metric-desc">Higher reply rate, personalized vs. generic</p>
              <span className="lrr-metric-src">B2B benchmark data</span>
            </div>

            <div className="lrr-metric" data-reveal>
              <div className="lrr-metric-num" data-to="15" data-decimals="0" data-suffix="%+">15%+</div>
              <p className="lrr-metric-desc">Reply rate of top-performing campaigns</p>
              <span className="lrr-metric-src">Instantly 2026 benchmarks</span>
            </div>
          </div>

          <p className="lrr-metrics-foot" data-reveal>
            These gaps are fixable. All four of them.{' '}
            <span className="lrr-accent">That&rsquo;s what NeoLeads is built for.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <LowReplyRatesCauses />

      {/* ===================== TARGETING + PERSONALIZATION ===================== */}
      <section className="lrr-pp">
        <div className="container">
          <div className="lrr-pp-layout">
            {/* ---- left: copy + features ---- */}
            <div className="lrr-pp-text" data-reveal-stagger="100">
              <span className="lrr-pp-label" data-reveal>
                Root Cause 1 + 3 · Targeting &amp; Personalization
              </span>
              <h2 data-reveal>
                Reaching the Right Person With the Right Message Is a System, Not a Skill.
              </h2>
              <p className="lrr-pp-lead" data-reveal>
                The teams hitting 15%+ reply rates aren&rsquo;t better copywriters. They reach
                contacts who have a real reason to reply &mdash; identified by buying signals &mdash;
                with a message that proves someone did their homework. That&rsquo;s what Zeus and
                NeoBrain AI do together, automatically.
              </p>

              <div className="lrr-pp-feats" data-reveal>
                <div className="lrr-pp-feat">
                  <span className="lrr-pp-feat-ic"><Icon name="send" aria-hidden="true" /></span>
                  <div className="lrr-pp-feat-body">
                    <h4>Signal-First Targeting</h4>
                    <p>
                      Zeus surfaces contacts who just raised a round, posted a surge of hiring
                      roles, or appointed a new VP &mdash; the moments that create genuine openness
                      to a new conversation.
                    </p>
                  </div>
                </div>

                <div className="lrr-pp-feat">
                  <span className="lrr-pp-feat-ic"><Icon name="pen-line" aria-hidden="true" /></span>
                  <div className="lrr-pp-feat-body">
                    <h4>Research-Backed First Lines</h4>
                    <p>
                      NeoBrain AI reads the specific signal that surfaced each contact and writes an
                      opening line that references it directly &mdash; so the prospect opens an email
                      that already knows their situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- right: targeted-contact card ---- */}
            <LowReplyRatesTargetingCard />
          </div>
        </div>
      </section>

      {/* ===================== DELIVERABILITY + FOLLOW-UP ===================== */}
      <section className="lrr-df">
        <div className="container">
          <div className="lrr-df-layout">
            {/* ---- left: deliverability + sequence card ---- */}
            <LowReplyRatesDelivCard />

            {/* ---- right: copy + features ---- */}
            <div className="lrr-pp-text" data-reveal-stagger="100">
              <span className="lrr-pp-label neutral" data-reveal>
                Root Cause 2 + 4 &mdash; Deliverability &amp; Follow-Up
              </span>
              <h2 data-reveal>
                Fix the Infrastructure. Then Fix the Sequence. Replies Follow Both.
              </h2>
              <p className="lrr-pp-lead" data-reveal>
                Improving reply rate means solving two fronts at once &mdash; making sure emails
                actually arrive, and making sure follow-up doesn&rsquo;t give up after two touches.
                NeoLeads handles both inside the same pipeline.
              </p>

              <div className="lrr-pp-feats" data-reveal>
                <div className="lrr-pp-feat">
                  <span className="lrr-pp-feat-ic"><Icon name="circle-check" aria-hidden="true" /></span>
                  <div className="lrr-pp-feat-body">
                    <h4>Inbox Before Outreach</h4>
                    <p>
                      Verifyrit removes every invalid address before launch. Warmrit ensures every
                      sending domain has the reputation to land in primary &mdash; so a campaign
                      starts deliverability-safe instead of sabotaging itself.
                    </p>
                  </div>
                </div>

                <div className="lrr-pp-feat">
                  <span className="lrr-pp-feat-ic"><Icon name="repeat" aria-hidden="true" /></span>
                  <div className="lrr-pp-feat-body">
                    <h4>Multichannel, Signal-Triggered Follow-Up</h4>
                    <p>
                      A prospect who opened but didn&rsquo;t reply gets a LinkedIn nudge, not another
                      identical email. Email + LinkedIn lifts reply rates 30&ndash;50% over
                      email-only at the same volume.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THE FULL FIX (end-to-end bento) ===================== */}
      <section className="lrr-fix">
        <div className="container">
          <div className="lrr-fix-head" data-reveal-stagger="100">
            <span className="lrr-fix-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The Full Fix
            </span>
            <h2 data-reveal>
              How NeoLeads Attacks Low Reply Rates<br />
              End to End
            </h2>
            <p data-reveal>
              Every product plays a specific role in fixing one of the four root causes &mdash; and
              because they&rsquo;re connected, the fix happens automatically rather than requiring
              five separate tools to be manually coordinated.
            </p>
          </div>

          <div className="lrr-fix-grid" data-reveal-stagger="120">
            {/* --- Card 1 --- */}
            <LowReplyRatesFindPeopleCard />

            {/* --- Card 2 --- */}
            <LowReplyRatesCleanListCard />

            {/* --- Card 3 --- */}
            <LowReplyRatesWarmInboxCard />

            {/* --- Card 4 --- */}
            <LowReplyRatesSendFollowUpCard />

            {/* --- Card 5 --- */}
            <LowReplyRatesHotReplyCard />
          </div>
        </div>
      </section>

      {/* ===================== THE REPLY RATE FIX (summary) ===================== */}
      <section className="lrr-sum">
        <div className="container">
          <div className="lrr-sum-head" data-reveal-stagger="100">
            <span className="lrr-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Reply Rate Fix
            </span>
            <h2 data-reveal>
              Four Root Causes. Five Products.<br />
              One Pipeline That Fixes All of Them.
            </h2>
            <p data-reveal>
              Each NeoLeads product targets a specific part of the reply rate problem. Together,
              they cover the full gap between a 3% average and a 15%+ top-performer campaign.
            </p>
          </div>

          <div className="lrr-sum-grid" data-reveal-stagger="120">
            {/* --- Column 1 --- */}
            <article className="lrr-sum-col" data-reveal>
              <h3 className="lrr-sum-title">Fix Targeting</h3>
              <div className="lrr-sum-chips">
                <span className="lrr-sum-chip">Zeus</span>
                <span className="lrr-sum-chip">NeoBrain AI</span>
              </div>
              <p className="lrr-sum-desc">
                Find the right people at the right moment &mdash; verified decision-makers flagged
                with the buying signal that makes them worth contacting today. NeoBrain AI ranks
                them by fit and intent so your team works the most reply-ready contacts first.
              </p>
              <p className="lrr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="lrr-sum-from">wrong person</span> &rarr;{' '}
                  <span className="lrr-sum-to">right person with a reason to reply</span>
                </span>
              </p>
            </article>

            {/* --- Column 2 --- */}
            <article className="lrr-sum-col" data-reveal>
              <h3 className="lrr-sum-title">Fix Deliverability</h3>
              <div className="lrr-sum-chips">
                <span className="lrr-sum-chip">Verifyrit</span>
                <span className="lrr-sum-chip">Warmrit</span>
                <span className="lrr-sum-chip">Snaarpmail</span>
              </div>
              <p className="lrr-sum-desc">
                Verify every address before it enters a campaign, warm every sending domain before
                a single email goes out, and protect the infrastructure throughout. Stop losing 17%
                of emails to technical failures before the conversation starts.
              </p>
              <p className="lrr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="lrr-sum-from">14% in spam</span> &rarr;{' '}
                  <span className="lrr-sum-to">96%+ landing in primary</span>
                </span>
              </p>
            </article>

            {/* --- Column 3 --- */}
            <article className="lrr-sum-col" data-reveal>
              <h3 className="lrr-sum-title">Fix Outreach &amp; Follow-Up</h3>
              <div className="lrr-sum-chips">
                <span className="lrr-sum-chip">Sendrit</span>
                <span className="lrr-sum-chip">NeoBrain AI</span>
              </div>
              <p className="lrr-sum-desc">
                AI-researched, signal-backed first lines that don&rsquo;t read like templates.
                Multichannel sequences that respond to how each prospect actually behaves. Follow-up
                triggered by signals &mdash; not a fixed calendar that ignores whether anyone opened.
              </p>
              <p className="lrr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="lrr-sum-from">2&ndash;3% generic</span> &rarr;{' '}
                  <span className="lrr-sum-to">10%+ personalized, signal-led</span>
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

      {/* ===================== FINAL CTA — GET STARTED ===================== */}
      <section className="final-cta">
        <div className="container" data-reveal-stagger="100">
          <span className="section-label" data-reveal>GET STARTED</span>
          <h2 data-reveal>Ready to Fix Your<br />Reply Rate for Good?</h2>
          <p data-reveal>Stop losing replies to the wrong targets, spam folders, and follow-up that quits too soon.<br />Put all five products to work on your next campaign and watch your reply rate climb.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Fix My Reply Rate Free <Icon name="arrow-right" /></button>
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
      <LowReplyRatesScripts />
    </>
  );
}
