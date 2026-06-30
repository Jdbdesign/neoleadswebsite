import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import UnqualifiedLeadListsScripts from '@/components/UnqualifiedLeadListsScripts';
import UnqualifiedLeadListsCompare from '@/components/UnqualifiedLeadListsCompare';
import UnqualifiedLeadListsCauses from '@/components/UnqualifiedLeadListsCauses';
import UnqualifiedLeadListsSolution from '@/components/UnqualifiedLeadListsSolution';
import UnqualifiedLeadListsSignals from '@/components/UnqualifiedLeadListsSignals';
import UnqualifiedLeadListsFullFix from '@/components/UnqualifiedLeadListsFullFix';

export const metadata = { title: 'Unqualified Lead Lists | NeoLeads' };

export default function UnqualifiedLeadListsPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="ull-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <h1 data-reveal>
            73% of the Leads on Your List Were<br />
            <span className="ull-hl">Never Going to Buy.</span>
          </h1>
          <p className="ull-sub" data-reveal>
            Only 27% of leads sent to sales are genuinely qualified &mdash; the rest are wrong-fit
            companies, wrong-authority contacts, or names that matched a filter without matching a buyer.
            NeoBrain AI scores every contact by fit and intent before a rep ever sees them, so the list
            your team works is the list actually worth working.
          </p>
          <div className="ull-ctas" data-reveal>
            <button className="btn-primary">Score My Leads &mdash; Free <Icon name="arrow-right" /></button>
            <button className="btn-light">See NeoBrain AI Score a List</button>
          </div>
          <p className="ull-microcopy" data-reveal>
            No credit card. Upload a list and watch NeoBrain AI score it by fit and intent in minutes.
          </p>
        </div>
      </section>

      {/* ===================== RAW LIST vs SCORED LIST COMPARISON ===================== */}
      <UnqualifiedLeadListsCompare />

      {/* ===================== METRICS / NUMBERS ===================== */}
      <section className="ull-metrics">
        <div className="container">
          <p className="ull-metrics-label" data-reveal>
            The numbers behind unqualified lead lists, the reason most of a rep&rsquo;s week is spent on
            contacts that were never going to convert
          </p>

          <div className="ull-metrics-grid" data-reveal-stagger="110">
            <div className="ull-metric" data-reveal>
              <div className="ull-metric-num" data-to="27" data-decimals="0" data-suffix="%">27%</div>
              <p className="ull-metric-desc">Of leads sent to sales that are genuinely qualified to buy</p>
              <span className="ull-metric-src">MarketingSherpa</span>
            </div>

            <div className="ull-metric" data-reveal>
              <div className="ull-metric-num" data-to="73" data-decimals="0" data-suffix="%">73%</div>
              <p className="ull-metric-desc">Of a typical list that will never convert, wrong fit, wrong authority, or no intent</p>
              <span className="ull-metric-src">Derived from MarketingSherpa</span>
            </div>

            <div className="ull-metric" data-reveal>
              <div className="ull-metric-num" data-to="50" data-decimals="0" data-suffix="%">50%</div>
              <p className="ull-metric-desc">A rep&rsquo;s prospecting time spent on contacts that were never a fit</p>
              <span className="ull-metric-src">Gartner</span>
            </div>

            <div className="ull-metric" data-reveal>
              <div className="ull-metric-num" data-to="2.3" data-decimals="1" data-suffix="×">2.3×</div>
              <p className="ull-metric-desc">Win-rate lift when reps work only fit-and-intent-scored leads</p>
              <span className="ull-metric-src">Optifai Benchmark 2025&ndash;26</span>
            </div>
          </div>

          <p className="ull-metrics-foot" data-reveal>
            The qualified buyers are already on the list. They&rsquo;re just buried under the 73% that
            matched a filter without matching a buyer.{' '}
            <span className="ull-accent">NeoBrain AI scores every contact and ranks them to the top.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <UnqualifiedLeadListsCauses />

      {/* ===================== SOLUTION — FIT + INTENT SCORING ===================== */}
      <UnqualifiedLeadListsSolution />

      {/* ===================== SOLUTION — LIVE INTENT + FILTERED LIST ===================== */}
      <UnqualifiedLeadListsSignals />

      {/* ===================== THE FULL FIX — 5-STEP END-TO-END ===================== */}
      <UnqualifiedLeadListsFullFix />

      {/* ===================== THE NEOLEADS UNQUALIFIED-LEAD FIX (summary) ===================== */}
      <section className="ull-sum">
        <div className="container">
          <div className="ull-sum-head" data-reveal-stagger="100">
            <span className="ull-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Unqualified-Lead Fix
            </span>
            <h2 data-reveal>
              Four Reasons Your List Is Full of Wrong-Fit Names.<br />
              One Scored List That Fixes All of Them.
            </h2>
            <p data-reveal>
              Each NeoLeads product removes a specific reason a list goes unqualified, connected so every
              contact arrives scored by fit and intent, ranked, and ready, with the 73% that were never
              going to buy filtered out before a rep sees them.
            </p>
          </div>

          <div className="ull-sum-grid" data-reveal-stagger="120">
            {/* --- Column 1 --- */}
            <article className="ull-sum-col" data-reveal>
              <h3 className="ull-sum-title">Score Every Contact</h3>
              <div className="ull-sum-chips">
                <span className="ull-sum-chip">NeoBrain AI</span>
              </div>
              <p className="ull-sum-desc">
                Every company is scored on real fit, what they do and whether your product solves a problem
                they actually have, and every contact on live buying intent. A matched filter becomes a fit
                and intent score, so the list reflects who needs you, not who looked the part.
              </p>
              <p className="ull-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="ull-sum-from">names that matched a filter</span> &rarr;{' '}
                  <span className="ull-sum-to">contacts scored by fit &amp; intent</span>
                </span>
              </p>
            </article>

            {/* --- Column 2 --- */}
            <article className="ull-sum-col" data-reveal>
              <h3 className="ull-sum-title">Verify the Buyer</h3>
              <div className="ull-sum-chips">
                <span className="ull-sum-chip">Zeus</span>
                <span className="ull-sum-chip">Verifyrit</span>
              </div>
              <p className="ull-sum-desc">
                Zeus pulls the decision-maker with the authority to actually buy, and Verifyrit confirms
                every address is real and reachable. No more weeks lost nurturing a contact who left, never
                owned the budget, or was never going to open an email in the first place.
              </p>
              <p className="ull-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="ull-sum-from">wrong-authority, dead contacts</span> &rarr;{' '}
                  <span className="ull-sum-to">verified decision-makers</span>
                </span>
              </p>
            </article>

            {/* --- Column 3 --- */}
            <article className="ull-sum-col" data-reveal>
              <h3 className="ull-sum-title">Work Only the Qualified</h3>
              <div className="ull-sum-chips">
                <span className="ull-sum-chip">Ranked List</span>
              </div>
              <p className="ull-sum-desc">
                The whole list is ranked by fit and intent and the wrong-fit names are filtered out before a
                rep sees them. Your team works a shorter, sharper shortlist of buyers worth their time,
                instead of qualifying out the 73% by hand, one disappointing call at a time.
              </p>
              <p className="ull-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="ull-sum-from">1,000 unsorted names</span> &rarr;{' '}
                  <span className="ull-sum-to">the 270 worth working</span>
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
          <h2 data-reveal>Ready to Stop Working the 73%<br />That Were Never Going to Buy?</h2>
          <p data-reveal>Upload your list and let NeoBrain AI score every contact by fit and intent.<br />Your reps work the names worth working, and nothing else.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Score My Leads Free <Icon name="arrow-right" /></button>
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
      <UnqualifiedLeadListsScripts />
    </>
  );
}
