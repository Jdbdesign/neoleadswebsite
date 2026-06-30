import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import MissedHotRepliesScripts from '@/components/MissedHotRepliesScripts';
import MissedHotRepliesCompare from '@/components/MissedHotRepliesCompare';
import MissedHotRepliesCauses from '@/components/MissedHotRepliesCauses';
import MissedHotRepliesSolution from '@/components/MissedHotRepliesSolution';
import MissedHotRepliesQueue from '@/components/MissedHotRepliesQueue';
import MissedHotRepliesFullFix from '@/components/MissedHotRepliesFullFix';

export const metadata = { title: 'Missed Hot Replies | NeoLeads' };

export default function MissedHotRepliesPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="mhr-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <h1 data-reveal>
            Your Hottest Reply Today Might Be<br />
            <span className="mhr-hl">Sitting Unread</span> Right Now.
          </h1>
          <p className="mhr-sub" data-reveal>
            A prospect who replies &ldquo;this is great timing, let&rsquo;s talk&rdquo; is at peak
            interest the moment they hit send, and that interest decays fast. The average B2B team
            still takes <strong>42 hours</strong> to respond. Snaarpmail pulls every reply from every
            campaign into one inbox, NeoBrain AI flags the hot ones instantly, and the gap between
            &ldquo;they replied&rdquo; and &ldquo;we responded&rdquo; collapses from days to minutes.
          </p>
          <div className="mhr-ctas" data-reveal>
            <button className="btn-primary">Never Miss a Reply, Free <Icon name="arrow-right" /></button>
            <button className="btn-light">See the Unified Inbox in Action</button>
          </div>
          <p className="mhr-microcopy" data-reveal>
            No credit card. Connect your first inbox in under 2 minutes.
          </p>
        </div>
      </section>

      {/* ===================== SCATTERED vs SNAARPMAIL COMPARISON ===================== */}
      <MissedHotRepliesCompare />

      {/* ===================== METRICS / NUMBERS ===================== */}
      <section className="mhr-metrics">
        <div className="container">
          <p className="mhr-metrics-label" data-reveal>
            The numbers behind speed to lead, the most studied, least acted-on metric in B2B sales
          </p>

          <div className="mhr-metrics-grid" data-reveal-stagger="110">
            <div className="mhr-metric" data-reveal>
              <div className="mhr-metric-num" data-to="21" data-decimals="0" data-suffix="×">21×</div>
              <p className="mhr-metric-desc">More likely to qualify a lead contacted within 5 minutes vs. after a 30-minute wait</p>
              <span className="mhr-metric-src">Chili Piper / corroborated</span>
            </div>

            <div className="mhr-metric" data-reveal>
              <div className="mhr-metric-num" data-to="42" data-decimals="0" data-suffix=" hrs">42 hrs</div>
              <p className="mhr-metric-desc">Average B2B lead response time</p>
              <span className="mhr-metric-src">HubSpot</span>
            </div>

            <div className="mhr-metric" data-reveal>
              <div className="mhr-metric-num" data-to="78" data-decimals="0" data-suffix="%">78%</div>
              <p className="mhr-metric-desc">Buyers who purchase from the vendor that responds first</p>
              <span className="mhr-metric-src">Amplemarket 2026</span>
            </div>

            <div className="mhr-metric" data-reveal>
              <div className="mhr-metric-num" data-to="2.6" data-decimals="1" data-suffix="×">2.6×</div>
              <p className="mhr-metric-desc">Close rate moving from 24-hour to under-5-minute response, 12% to 32%</p>
              <span className="mhr-metric-src">Optifai Benchmark 2025&ndash;26</span>
            </div>
          </div>

          <p className="mhr-metrics-foot" data-reveal>
            The data hasn&rsquo;t changed in two decades. What&rsquo;s changed is whether your inbox
            actually shows you the reply in time.{' '}
            <span className="mhr-accent">Snaarpmail makes sure it does.</span>
          </p>
        </div>
      </section>

      {/* ===================== FOUR ROOT CAUSES (interactive) ===================== */}
      <MissedHotRepliesCauses />

      {/* ===================== SOLUTION — ONE INBOX, EVERY CAMPAIGN ===================== */}
      <MissedHotRepliesSolution />

      {/* ===================== SOLUTION — LIVE CLOCK + SEQUENCE AUTO-PAUSE ===================== */}
      <MissedHotRepliesQueue />

      {/* ===================== THE FULL FIX — 5-STEP END-TO-END ===================== */}
      <MissedHotRepliesFullFix />

      {/* ===================== THE NEOLEADS SPEED-TO-LEAD FIX (summary) ===================== */}
      <section className="mhr-sum">
        <div className="container">
          <div className="mhr-sum-head" data-reveal-stagger="100">
            <span className="mhr-sum-eyebrow" data-reveal>
              <Icon name="refresh-cw" aria-hidden="true" />
              The NeoLeads Speed-to-Lead Fix
            </span>
            <h2 data-reveal>
              Four Causes of Missed Replies. One Pipeline<br />
              That Closes the Gap.
            </h2>
            <p data-reveal>
              Each NeoLeads product removes a specific layer of the speed-to-lead problem,
              connected so a hot reply is seen, prioritized, and actioned in minutes, not days.
            </p>
          </div>

          <div className="mhr-sum-grid" data-reveal-stagger="120">
            {/* --- Column 1 --- */}
            <article className="mhr-sum-col" data-reveal>
              <h3 className="mhr-sum-title">Unify Every Reply</h3>
              <div className="mhr-sum-chips">
                <span className="mhr-sum-chip">Snaarpmail</span>
              </div>
              <p className="mhr-sum-desc">
                Every reply from every active Sendrit campaign lands in a single inbox, no more
                checking five separate sending accounts to find the one reply that actually matters
                today. Each reply is tagged with its source campaign, so context is never lost.
              </p>
              <p className="mhr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="mhr-sum-from">replies scattered across 5 inboxes</span> &rarr;{' '}
                  <span className="mhr-sum-to">1 unified view</span>
                </span>
              </p>
            </article>

            {/* --- Column 2 --- */}
            <article className="mhr-sum-col" data-reveal>
              <h3 className="mhr-sum-title">Prioritize by Intent, Not Arrival Time</h3>
              <div className="mhr-sum-chips">
                <span className="mhr-sum-chip">NeoBrain AI</span>
              </div>
              <p className="mhr-sum-desc">
                Every reply is classified the moment it lands, Interested, Objection, Not Now,
                Referral, so the inbox is sorted by urgency before a human opens a single message.
                High-intent replies surface at the top automatically, no manual triage required.
              </p>
              <p className="mhr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="mhr-sum-from">opening replies in arrival order</span> &rarr;{' '}
                  <span className="mhr-sum-to">high-intent replies surfaced first</span>
                </span>
              </p>
            </article>

            {/* --- Column 3 --- */}
            <article className="mhr-sum-col" data-reveal>
              <h3 className="mhr-sum-title">Act Before the Window Closes</h3>
              <div className="mhr-sum-chips">
                <span className="mhr-sum-chip">Snaarpmail</span>
                <span className="mhr-sum-chip">Sendrit</span>
                <span className="mhr-sum-chip">Kalender</span>
              </div>
              <p className="mhr-sum-desc">
                The meeting-ready queue shows a live clock on every hot reply, sequences pause
                automatically the instant a reply arrives, and one-click booking via Kalender
                collapses the path from reply to scheduled meeting before interest decays.
              </p>
              <p className="mhr-sum-shift">
                <Icon name="arrow-right" aria-hidden="true" />
                <span>
                  From <span className="mhr-sum-from">a 42-hour average response</span> &rarr;{' '}
                  <span className="mhr-sum-to">minutes, with a 2.6&times; close-rate lift</span>
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
          <h2 data-reveal>Ready to Respond While the<br />Reply Is Still Hot?</h2>
          <p data-reveal>Stop letting warm replies cool off in scattered inboxes.<br />Let Snaarpmail unify every reply and NeoBrain AI flag the hot ones the moment they land.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Never Miss a Reply Free <Icon name="arrow-right" /></button>
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
      <MissedHotRepliesScripts />
    </>
  );
}
