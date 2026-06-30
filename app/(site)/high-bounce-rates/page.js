import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import HighBounceRatesScripts from '@/components/HighBounceRatesScripts';
import HighBounceRatesCauses from '@/components/HighBounceRatesCauses';
import HighBounceRatesVerifyMiss from '@/components/HighBounceRatesVerifyMiss';
import HighBounceRatesRecovery from '@/components/HighBounceRatesRecovery';
import HighBounceRatesFullFix from '@/components/HighBounceRatesFullFix';

export const metadata = { title: 'High Bounce Rates | NeoLeads' };

export default function HighBounceRatesPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="hbr-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <h1 data-reveal>
            A 5% Bounce Rate Can Cost You<br />
            <span className="hbr-danger">Four Months</span> to Recover.
          </h1>
          <p className="hbr-sub" data-reveal>
            Every hard bounce tells Gmail, Outlook, and Yahoo that your domain sends to addresses
            that don&rsquo;t exist. Your sender reputation drops. Future emails, even to
            valid, interested prospects, start landing in spam. The bounce rate climbs
            further. Breaking that spiral, once it starts, takes <strong>4&ndash;8 weeks</strong>.
            Verifyrit stops it before it begins.
          </p>
          <div className="hbr-ctas" data-reveal>
            <button className="btn-primary">Verify My List, Free <Icon name="arrow-right" /></button>
            <button className="btn-light">See How Verifyrit Cleans Lists</button>
          </div>
          <p className="hbr-microcopy" data-reveal>
            No credit card. Your first 100 verifications are free. Results in under 2 minutes.
          </p>
        </div>
      </section>

      {/* ===================== BEFORE / AFTER COMPARISON ===================== */}
      <section className="hbr-compare">
        <div className="container" data-reveal-stagger="120">
          <p className="hbr-compare-label" data-reveal>
            <span className="hbr-compare-rule" aria-hidden="true" />
            53 contacts removed before send. 4 months of recovery avoided.
            <Icon name="arrow-right" aria-hidden="true" />
          </p>

          <div className="hbr-compare-grid">

            {/* ---------- UNVERIFIED ---------- */}
            <article className="hbr-card" data-reveal>
              <div className="hbr-card-head">
                <span className="hbr-card-title">
                  <span className="hbr-led red" aria-hidden="true" />
                  Unverified Campaign
                </span>
                <span className="hbr-chip red">Imported 8 mo ago</span>
              </div>
              <p className="hbr-card-sub">Q3 Outreach: 1,000 contacts</p>

              <div className="hbr-stats">
                <div className="hbr-stat">
                  <span className="hbr-stat-label">Sent</span>
                  <span className="hbr-stat-num" data-to="1000">1,000</span>
                </div>
                <div className="hbr-stat">
                  <span className="hbr-stat-label">Bounced</span>
                  <span className="hbr-stat-num red" data-to="84">84</span>
                </div>
                <div className="hbr-stat is-flag red">
                  <span className="hbr-stat-label red">Bounce Rate</span>
                  <span className="hbr-stat-num red" data-to="8.4" data-decimals="1" data-suffix="%">8.4%</span>
                </div>
                <div className="hbr-stat">
                  <span className="hbr-stat-label">Inbox Placement</span>
                  <span className="hbr-stat-num" data-to="61" data-suffix="%">61%</span>
                </div>
              </div>

              <div className="hbr-rows">
                <div className="hbr-row red">
                  <Icon name="triangle-alert" aria-hidden="true" />
                  <span>Hard bounces: <b className="red">8.4%</b>, above safe threshold (2%)</span>
                </div>
                <div className="hbr-row red">
                  <Icon name="triangle-alert" aria-hidden="true" />
                  <span>Sender reputation: <b className="red">Damaged</b>, Gmail flagging domain</span>
                </div>
                <div className="hbr-row">
                  <Icon name="circle-x" aria-hidden="true" />
                  <span>340 emails never reached any folder</span>
                </div>
              </div>

              <div className="hbr-flag red">
                <Icon name="octagon-alert" aria-hidden="true" />
                <span>Future campaigns penalised, est. 4&ndash;8 weeks to recover</span>
              </div>
            </article>

            {/* ---------- VERIFYRIT-CLEANED ---------- */}
            <article className="hbr-card is-after" data-reveal>
              <div className="hbr-card-head">
                <span className="hbr-card-title">
                  <span className="hbr-led purple" aria-hidden="true" />
                  Verifyrit-Cleaned Campaign
                </span>
                <span className="hbr-chip purple">Verified before send</span>
              </div>
              <p className="hbr-card-sub">Same 1,000 contacts</p>

              <div className="hbr-stats">
                <div className="hbr-stat">
                  <span className="hbr-stat-label">Sent</span>
                  <span className="hbr-stat-num" data-to="947">947</span>
                </div>
                <div className="hbr-stat">
                  <span className="hbr-stat-label">Bounced</span>
                  <span className="hbr-stat-num purple" data-to="3">3</span>
                </div>
                <div className="hbr-stat is-flag purple">
                  <span className="hbr-stat-label purple">Bounce Rate</span>
                  <span className="hbr-stat-num purple" data-to="0.3" data-decimals="1" data-suffix="%">0.3%</span>
                </div>
                <div className="hbr-stat">
                  <span className="hbr-stat-label">Inbox Placement</span>
                  <span className="hbr-stat-num blue" data-to="96" data-suffix="%">96%</span>
                </div>
              </div>

              <div className="hbr-rows">
                <div className="hbr-row green">
                  <Icon name="check" aria-hidden="true" />
                  <span>Hard bounces: <b className="green">0.3%</b>, well within safe zone</span>
                </div>
                <div className="hbr-row green">
                  <Icon name="check" aria-hidden="true" />
                  <span>Sender reputation: <b className="green">Healthy</b>, no flags</span>
                </div>
                <div className="hbr-row green">
                  <Icon name="check" aria-hidden="true" />
                  <span>53 invalid contacts removed before send</span>
                </div>
              </div>

              <div className="hbr-flag green">
                <Icon name="shield-check" aria-hidden="true" />
                <span>Domain protected, future campaigns unaffected</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== METRICS / DATA BAND ===================== */}
      <section className="hbr-metrics">
        <div className="container">
          <p className="hbr-metrics-label" data-reveal>
            The bounce rate numbers that determine whether your domain stays healthy, or
            starts spiraling
          </p>

          <div className="hbr-metrics-grid" data-reveal-stagger="110">
            <div className="hbr-metric" data-reveal>
              <div className="hbr-metric-num" data-to="2" data-suffix="%">2%</div>
              <p className="hbr-metric-desc">
                The hard bounce ceiling. Above this, ISPs penalize sender reputation; above 5%,
                domain-level damage
              </p>
              <span className="hbr-metric-src">Gmail Postmaster / Litmus 2025</span>
            </div>

            <div className="hbr-metric" data-reveal>
              <div className="hbr-metric-num" data-to="25" data-suffix="%">25%</div>
              <p className="hbr-metric-desc">
                Annual B2B list decay: a list verified mid-2025 has 8&ndash;12% more invalid
                addresses by early 2026
              </p>
              <span className="hbr-metric-src">EmailAddress.ai 2026</span>
            </div>

            <div className="hbr-metric" data-reveal>
              <div className="hbr-metric-num">23&ndash;31%</div>
              <p className="hbr-metric-desc">
                Of B2B databases contain catch-all addresses standard verifiers pass as valid but
                hard-bounce
              </p>
              <span className="hbr-metric-src">EmailAddress.ai 2026</span>
            </div>

            <div className="hbr-metric" data-reveal>
              <div className="hbr-metric-num">4&ndash;8 wks</div>
              <p className="hbr-metric-desc">
                Time required to recover sender reputation after a single high-bounce campaign
              </p>
              <span className="hbr-metric-src">EmailWarmup.com 2026</span>
            </div>
          </div>

          <p className="hbr-metrics-foot" data-reveal>
            Every one of these risks is preventable.{' '}
            <span className="hbr-accent">Verifyrit prevents them before your next campaign fires.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <HighBounceRatesCauses />

      {/* ===================== WHAT STANDARD VERIFICATION MISSES ===================== */}
      <HighBounceRatesVerifyMiss />

      {/* ===================== STOP THE SPIRAL / RECOVERY MODE ===================== */}
      <HighBounceRatesRecovery />

      {/* ===================== THE FULL FIX (5-product pipeline) ===================== */}
      <HighBounceRatesFullFix />

      {/* ===================== THE NEOLEADS BOUNCE RATE FIX (summary) ===================== */}
      <section className="hbr-sum">
        <div className="container">
          <div className="hbr-sum-head" data-reveal-stagger="100">
            <span className="hbr-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Bounce Rate Fix
            </span>
            <h2 data-reveal>
              Four Causes of High Bounce Rates.<br />
              One Pipeline That Eliminates All of Them.
            </h2>
            <p data-reveal>
              Each NeoLeads product removes a specific layer of the bounce rate problem,
              connected so the protection runs automatically rather than requiring a manual hygiene
              check before every campaign.
            </p>
          </div>

          <div className="hbr-sum-grid" data-reveal-stagger="120">
            {/* --- Column 1 --- */}
            <article className="hbr-sum-col" data-reveal>
              <h3 className="hbr-sum-title">Clean Every List Before Every Send</h3>
              <div className="hbr-sum-chips">
                <span className="hbr-sum-chip">Verifyrit</span>
                <span className="hbr-sum-chip">Zeus</span>
              </div>
              <p className="hbr-sum-desc">
                Verifyrit gates every Sendrit campaign with 7-layer validation, including
                catch-all resolution and spam trap detection that standard tools miss. Zeus keeps
                source data fresher from the start, reducing the number of stale addresses that reach
                Verifyrit in the first place.
              </p>
              <p className="hbr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="hbr-sum-from">8.4% bounce on unverified lists</span> &rarr;{' '}
                  <span className="hbr-sum-to">0.3% on Verifyrit-cleaned ones</span>
                </span>
              </p>
            </article>

            {/* --- Column 2 --- */}
            <article className="hbr-sum-col" data-reveal>
              <h3 className="hbr-sum-title">Resolve Catch-Alls, Not Just Flag Them</h3>
              <div className="hbr-sum-chips">
                <span className="hbr-sum-chip">Verifyrit</span>
              </div>
              <p className="hbr-sum-desc">
                Most tools mark catch-all domains &ldquo;Unknown&rdquo; and leave them on the list.
                Verifyrit resolves each catch-all address to a definitive deliverable or
                undeliverable verdict, so the 23&ndash;31% of a typical B2B list in this
                category doesn&rsquo;t become a silent source of hard bounces on your next send.
              </p>
              <p className="hbr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="hbr-sum-from">catch-alls left in a grey zone</span> &rarr;{' '}
                  <span className="hbr-sum-to">a definitive verdict on every address</span>
                </span>
              </p>
            </article>

            {/* --- Column 3 --- */}
            <article className="hbr-sum-col" data-reveal>
              <h3 className="hbr-sum-title">Stop the Spiral. Protect the Domain.</h3>
              <div className="hbr-sum-chips">
                <span className="hbr-sum-chip">Warmrit</span>
                <span className="hbr-sum-chip">Snaarpmail</span>
              </div>
              <p className="hbr-sum-desc">
                Warmrit monitors domain health throughout active campaigns and activates Recovery
                Mode automatically when bounce signals spike, rebuilding ISP trust before the
                spiral compounds. Snaarpmail tracks bounce rate and reputation in real time and fires
                alerts when the threshold is approached.
              </p>
              <p className="hbr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="hbr-sum-from">reactive repair (4&ndash;8 weeks)</span> &rarr;{' '}
                  <span className="hbr-sum-to">proactive spiral prevention before damage starts</span>
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
          <h2 data-reveal>Ready to Protect Your Domain<br />Before the Next Send?</h2>
          <p data-reveal>Stop letting dead addresses wreck your sender reputation.<br />Let Verifyrit clean every list before a single email leaves your domain.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Verify My List Free <Icon name="arrow-right" /></button>
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
      <HighBounceRatesScripts />
    </>
  );
}
