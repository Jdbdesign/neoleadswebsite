import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import NoPipelineVisibilityScripts from '@/components/NoPipelineVisibilityScripts';
import NoPipelineVisibilityCompare from '@/components/NoPipelineVisibilityCompare';
import NoPipelineVisibilityCauses from '@/components/NoPipelineVisibilityCauses';
import NoPipelineVisibilitySolution from '@/components/NoPipelineVisibilitySolution';
import NoPipelineVisibilitySignals from '@/components/NoPipelineVisibilitySignals';
import NoPipelineVisibilityFullFix from '@/components/NoPipelineVisibilityFullFix';

export const metadata = { title: 'No Pipeline Visibility | NeoLeads' };

export default function NoPipelineVisibilityPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="npv-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <h1 data-reveal>
            Only 7% of Sales Teams Trust Their Own Forecast.<br />
            <span className="npv-hl">Is Yours One of Them?</span>
          </h1>
          <p className="npv-sub" data-reveal>
            Pipeline visibility breaks down the moment data gets scattered across a lead source,
            an outreach tool, a reply inbox, and a CRM that don&rsquo;t talk to each other. NeoLeads
            connects every signal &mdash; who replied, how engaged they are, which campaigns are
            converting &mdash; into one live view, automatically, without depending on a rep to
            remember to log it.
          </p>
          <div className="npv-ctas" data-reveal>
            <button className="btn-primary">See My Real Pipeline &mdash; Free <Icon name="arrow-right" /></button>
            <button className="btn-light">See the Unified Dashboard</button>
          </div>
          <p className="npv-microcopy" data-reveal>
            No credit card. Connect your first campaign and see live pipeline data in minutes.
          </p>
        </div>
      </section>

      {/* ===================== FRAGMENTED STACK vs UNIFIED PIPELINE COMPARISON ===================== */}
      <NoPipelineVisibilityCompare />

      {/* ===================== METRICS / NUMBERS ===================== */}
      <section className="npv-metrics">
        <div className="container">
          <p className="npv-metrics-label" data-reveal>
            The numbers behind pipeline visibility, the metric every revenue leader reports on and
            almost none of them trust
          </p>

          <div className="npv-metrics-grid" data-reveal-stagger="110">
            <div className="npv-metric" data-reveal>
              <div className="npv-metric-num" data-to="7" data-decimals="0" data-suffix="%">7%</div>
              <p className="npv-metric-desc">Sales teams that fully trust their own pipeline forecast</p>
              <span className="npv-metric-src">Clari / corroborated</span>
            </div>

            <div className="npv-metric" data-reveal>
              <div className="npv-metric-num" data-to="54" data-decimals="0" data-suffix="%">54%</div>
              <p className="npv-metric-desc">Forecasted deals that don&rsquo;t close the way the CRM predicted</p>
              <span className="npv-metric-src">Gartner</span>
            </div>

            <div className="npv-metric" data-reveal>
              <div className="npv-metric-num" data-to="60" data-decimals="0" data-suffix="%">60%</div>
              <p className="npv-metric-desc">A rep&rsquo;s week spent on non-selling work like updating records</p>
              <span className="npv-metric-src">Salesforce State of Sales</span>
            </div>

            <div className="npv-metric" data-reveal>
              <div className="npv-metric-num" data-to="2.8" data-decimals="1" data-suffix="×">2.8×</div>
              <p className="npv-metric-desc">Forecast accuracy lift when activity is captured automatically, not logged by hand</p>
              <span className="npv-metric-src">Optifai Benchmark 2025&ndash;26</span>
            </div>
          </div>

          <p className="npv-metrics-foot" data-reveal>
            The data already exists. It&rsquo;s just scattered across four tools that don&rsquo;t talk,
            and a CRM that only knows what a rep remembered to type in.{' '}
            <span className="npv-accent">NeoLeads connects them into one live view.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <NoPipelineVisibilityCauses />

      {/* ===================== SOLUTION — ONE PIPELINE, EVERY SIGNAL ===================== */}
      <NoPipelineVisibilitySolution />

      {/* ===================== SOLUTION — LIVE ENGAGEMENT + AUTO-CAPTURE ===================== */}
      <NoPipelineVisibilitySignals />

      {/* ===================== THE FULL FIX — 5-STEP END-TO-END ===================== */}
      <NoPipelineVisibilityFullFix />

      {/* ===================== THE NEOLEADS PIPELINE-VISIBILITY FIX (summary) ===================== */}
      <section className="npv-sum">
        <div className="container">
          <div className="npv-sum-head" data-reveal-stagger="100">
            <span className="npv-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Pipeline-Visibility Fix
            </span>
            <h2 data-reveal>
              Four Reasons You Can&rsquo;t See Your Pipeline.<br />
              One Live View That Fixes All of Them.
            </h2>
            <p data-reveal>
              Each NeoLeads product removes a specific layer of the visibility problem, connected so
              every signal flows into a single pipeline view that updates itself, with nothing left to
              manual logging.
            </p>
          </div>

          <div className="npv-sum-grid" data-reveal-stagger="120">
            {/* --- Column 1 --- */}
            <article className="npv-sum-col" data-reveal>
              <h3 className="npv-sum-title">Connect Every Tool</h3>
              <div className="npv-sum-chips">
                <span className="npv-sum-chip">Sendrit</span>
                <span className="npv-sum-chip">Snaarpmail</span>
                <span className="npv-sum-chip">Kalender</span>
              </div>
              <p className="npv-sum-desc">
                The lead source, the outreach sequences, the reply inbox, and the booking calendar all
                feed the same pipeline. No more reconciling four dashboards that each report a different
                number, every tool writes to one record automatically.
              </p>
              <p className="npv-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="npv-sum-from">data scattered across 4 tools</span> &rarr;{' '}
                  <span className="npv-sum-to">1 connected pipeline</span>
                </span>
              </p>
            </article>

            {/* --- Column 2 --- */}
            <article className="npv-sum-col" data-reveal>
              <h3 className="npv-sum-title">Capture Every Signal Automatically</h3>
              <div className="npv-sum-chips">
                <span className="npv-sum-chip">NeoBrain AI</span>
                <span className="npv-sum-chip">Snaarpmail</span>
              </div>
              <p className="npv-sum-desc">
                Sends, opens, replies, intent, and booked meetings are logged the instant they happen,
                so the pipeline reflects what actually occurred, not what a busy rep remembered to type
                in at the end of the week. NeoBrain AI scores engagement in real time.
              </p>
              <p className="npv-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="npv-sum-from">reps logging activity by hand</span> &rarr;{' '}
                  <span className="npv-sum-to">every signal auto-captured</span>
                </span>
              </p>
            </article>

            {/* --- Column 3 --- */}
            <article className="npv-sum-col" data-reveal>
              <h3 className="npv-sum-title">Trust One Number</h3>
              <div className="npv-sum-chips">
                <span className="npv-sum-chip">Unified Dashboard</span>
              </div>
              <p className="npv-sum-desc">
                One live pipeline view becomes the single source of truth, the same number for the rep,
                the manager, and the forecast. When every signal is connected and current, the forecast
                stops being a guess and starts being something the whole team can actually trust.
              </p>
              <p className="npv-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="npv-sum-from">4 conflicting forecasts</span> &rarr;{' '}
                  <span className="npv-sum-to">1 number everyone trusts</span>
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
          <h2 data-reveal>Ready to See a Pipeline You<br />Can Actually Trust?</h2>
          <p data-reveal>Stop reconciling four tools that each tell a different story.<br />Let NeoLeads connect every signal into one live view that updates itself.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">See My Real Pipeline Free <Icon name="arrow-right" /></button>
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
      <NoPipelineVisibilityScripts />
    </>
  );
}
