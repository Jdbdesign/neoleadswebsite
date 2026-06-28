import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import LowReplyRatesScripts from '@/components/LowReplyRatesScripts';
import LowReplyRatesCauses from '@/components/LowReplyRatesCauses';

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
      <section className="lrr-compare">
        <div className="container" data-reveal-stagger="120">
          <p className="lrr-compare-label" data-reveal>The 4 Root Causes NeoLeads Fixes</p>

          <div className="lrr-compare-grid">

            {/* ---------- BEFORE ---------- */}
            <article className="lrr-card" data-reveal>
              <div className="lrr-card-head">
                <span className="lrr-card-title">
                  <span className="lrr-led red" aria-hidden="true"></span>
                  Current Campaign
                </span>
                <span className="lrr-chip red">Before NeoLeads</span>
              </div>

              <div className="lrr-stats">
                <div className="lrr-stat">
                  <span className="lrr-stat-label">Sent</span>
                  <span className="lrr-stat-num">840</span>
                </div>
                <div className="lrr-stat">
                  <span className="lrr-stat-label">Open Rate</span>
                  <span className="lrr-stat-num">24%</span>
                </div>
                <div className="lrr-stat is-reply red">
                  <span className="lrr-stat-label red">Reply Rate</span>
                  <span className="lrr-stat-num red">2.1%</span>
                </div>
                <div className="lrr-stat">
                  <span className="lrr-stat-label">Meetings</span>
                  <span className="lrr-stat-num">2</span>
                </div>
              </div>

              <div className="lrr-deliver red">
                <Icon name="triangle-alert" aria-hidden="true" />
                14% landed in spam
              </div>

              <div className="lrr-replies">
                <div className="lrr-reply">
                  <span className="lrr-reply-dot red" aria-hidden="true"></span>
                  &ldquo;Not interested&rdquo;
                </div>
                <div className="lrr-reply">
                  <span className="lrr-reply-dot red" aria-hidden="true"></span>
                  &ldquo;Unsubscribe&rdquo;
                </div>
                <div className="lrr-reply">
                  <span className="lrr-reply-dot red" aria-hidden="true"></span>
                  &ldquo;Wrong person&rdquo;
                </div>
              </div>
            </article>

            {/* ---------- AFTER ---------- */}
            <article className="lrr-card is-after" data-reveal>
              <div className="lrr-card-head">
                <span className="lrr-card-title">
                  <span className="lrr-led purple" aria-hidden="true"></span>
                  With NeoLeads
                </span>
                <span className="lrr-chip purple">After NeoLeads</span>
              </div>

              <div className="lrr-stats">
                <div className="lrr-stat">
                  <span className="lrr-stat-label">Sent</span>
                  <span className="lrr-stat-num">840</span>
                </div>
                <div className="lrr-stat">
                  <span className="lrr-stat-label">Open Rate</span>
                  <span className="lrr-stat-num">41%</span>
                </div>
                <div className="lrr-stat is-reply purple">
                  <span className="lrr-stat-label purple">Reply Rate</span>
                  <span className="lrr-stat-num purple">11.4%</span>
                </div>
                <div className="lrr-stat">
                  <span className="lrr-stat-label">Meetings</span>
                  <span className="lrr-stat-num">18</span>
                </div>
              </div>

              <div className="lrr-deliver green">
                <Icon name="check" aria-hidden="true" />
                97% landed in primary inbox
              </div>

              <div className="lrr-replies">
                <div className="lrr-reply">
                  <span className="lrr-reply-dot green" aria-hidden="true"></span>
                  &ldquo;This is great timing&hellip;&rdquo;
                </div>
                <div className="lrr-reply">
                  <span className="lrr-reply-dot green" aria-hidden="true"></span>
                  &ldquo;Happy to jump on a call&rdquo;
                </div>
                <div className="lrr-reply">
                  <span className="lrr-reply-dot amber" aria-hidden="true"></span>
                  &ldquo;Not now &mdash; follow up in Q2&rdquo;
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

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
            <div className="lrr-pp-card" data-reveal data-reveal-delay="150">
              <div className="lrr-pp-card-top">
                <span className="lrr-pp-eyebrow">Why this contact was targeted</span>
                <span className="lrr-pp-zeus">Zeus</span>
              </div>

              <div className="lrr-pp-contact">
                <span className="lrr-contact-av purple">MT</span>
                <div className="lrr-pp-id">
                  <div className="lrr-pp-name">Marcus T.</div>
                  <div className="lrr-pp-role">VP Sales · Acme Corp</div>
                </div>
                <div className="lrr-pp-intent">
                  <span className="lrr-pp-intent-num">94</span>
                  <span className="lrr-pp-intent-lbl">High Intent</span>
                </div>
              </div>

              <div className="lrr-pp-signals">
                <span className="lrr-pp-sig">Raised $22M Series B · 9d ago</span>
                <span className="lrr-pp-sig">9 SDR roles posted · 5d</span>
                <span className="lrr-pp-sig">New CRO hired · 12d</span>
              </div>

              <div className="lrr-pp-divider" aria-hidden="true" />

              <span className="lrr-pp-eyebrow purple">AI-Generated First Line</span>
              <div className="lrr-pp-subject">Subject: Quick thought on scaling Acme&rsquo;s SDR team</div>
              <p className="lrr-pp-quote">
                &ldquo;Hi Marcus &mdash; saw Acme just brought on a new CRO and opened 9 SDR roles in
                the same week. Most teams hiring that fast hit outbound pipeline walls before the new
                reps are ramped&hellip;&rdquo;
              </p>

              <span className="lrr-pp-tag">
                <Icon name="sparkles" aria-hidden="true" /> NeoBrain AI &mdash; researched from 3 signals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DELIVERABILITY + FOLLOW-UP ===================== */}
      <section className="lrr-df">
        <div className="container">
          <div className="lrr-df-layout">
            {/* ---- left: deliverability + sequence card ---- */}
            <div className="lrr-deliv-card" data-reveal>
              <div className="lrr-deliv-top">
                <span className="lrr-deliv-title">Deliverability Status</span>
                <span className="lrr-deliv-domain">outreach-nl.io</span>
              </div>

              <div className="lrr-deliv-pills">
                <span className="lrr-deliv-pill green">SPF ✓</span>
                <span className="lrr-deliv-pill green">DKIM ✓</span>
                <span className="lrr-deliv-pill green">DMARC ✓</span>
                <span className="lrr-deliv-pill purple">Warmrit: Warmed ✓</span>
                <span className="lrr-deliv-pill gray">Bounce 0.4%</span>
              </div>

              <div className="lrr-deliv-bar" aria-hidden="true">
                <span className="lrr-deliv-bar-fill" />
              </div>
              <div className="lrr-deliv-legend">
                <span>96% Primary</span>
                <span>3% Promotions</span>
                <span>1% Spam</span>
              </div>
              <p className="lrr-deliv-note">Verifyrit: 480/480 contacts verified before send</p>

              <div className="lrr-deliv-seqhead">Sendrit Sequence — Q3 Outreach</div>
              <div className="lrr-seq2">
                <div className="lrr-seq2-row">
                  <span className="lrr-seq2-num">1</span>
                  <span className="lrr-seq2-label">Email · Day 1 · 480 sent</span>
                  <span className="lrr-seq2-replies">22 replies</span>
                </div>
                <div className="lrr-seq2-row">
                  <span className="lrr-seq2-num">2</span>
                  <span className="lrr-seq2-label">LinkedIn · Day 3 · no-reply trigger</span>
                  <span className="lrr-seq2-replies">18 replies</span>
                </div>
                <div className="lrr-seq2-row">
                  <span className="lrr-seq2-num">3</span>
                  <span className="lrr-seq2-label">Email · Day 6 · opened, no reply</span>
                  <span className="lrr-seq2-replies">14 replies</span>
                </div>
                <div className="lrr-seq2-row">
                  <span className="lrr-seq2-num">4</span>
                  <span className="lrr-seq2-label">Final email · Day 10</span>
                  <span className="lrr-seq2-replies">7 replies</span>
                </div>
              </div>

              <div className="lrr-deliv-foot">
                <span>Total replies: <b>61</b></span>
                <span className="purple">Reply rate 12.7%</span>
                <span>Meetings: <b>19</b></span>
              </div>
            </div>

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
            <article className="lrr-fix-card c-half" data-reveal>
              <div className="lrr-fix-card-head">
                <div className="lrr-fix-meta">
                  <span className="lrr-fix-badge">1</span>
                  <span className="lrr-fix-product">Zeus + NeoBrain AI</span>
                </div>
                <span className="lrr-fix-fixes">fixes · Wrong People</span>
              </div>
              <h3 className="lrr-fix-title">Find the right people</h3>
              <p className="lrr-fix-desc">
                AI search for verified decision-makers ranked by ICP fit and live buying signals.
                Every contact surfaces with a &ldquo;why now&rdquo; attached.
              </p>
              <div className="lrr-fix-mock">
                <div className="lrr-fixm-top">
                  <span className="lrr-fixm-label">Top match in segment</span>
                  <span className="lrr-pp-zeus">Zeus</span>
                </div>
                <div className="lrr-fixm-contact">
                  <span className="lrr-contact-av purple">MT</span>
                  <div className="lrr-fixm-id">
                    <div className="lrr-fixm-name">Marcus T.</div>
                    <div className="lrr-fixm-role">VP Sales · Acme Corp</div>
                  </div>
                  <div className="lrr-fixm-intent">
                    <span className="lrr-fixm-intent-num">94</span>
                    <span className="lrr-fixm-intent-lbl">Intent</span>
                  </div>
                </div>
                <div className="lrr-fixm-sigs">
                  <span className="lrr-pp-sig">Raised $22M · 9d</span>
                  <span className="lrr-pp-sig">9 SDR roles · 5d</span>
                  <span className="lrr-pp-sig">New CRO · 12d</span>
                </div>
              </div>
            </article>

            {/* --- Card 2 --- */}
            <article className="lrr-fix-card c-half" data-reveal>
              <div className="lrr-fix-card-head">
                <div className="lrr-fix-meta">
                  <span className="lrr-fix-badge">2</span>
                  <span className="lrr-fix-product">Verifyrit</span>
                </div>
                <span className="lrr-fix-fixes">fixes · Bad List</span>
              </div>
              <h3 className="lrr-fix-title">Clean the list</h3>
              <p className="lrr-fix-desc">
                Every address runs through 7-layer validation before a campaign. Invalid emails,
                catch-alls, and spam traps are removed before send.
              </p>
              <div className="lrr-fix-mock">
                <div className="lrr-fixm-top">
                  <span className="lrr-fixm-label">List health</span>
                  <span className="lrr-fixm-count"><b>480</b>/480</span>
                </div>
                <div className="lrr-fixm-bar" aria-hidden="true">
                  <span className="lrr-fixm-bar-fill" />
                </div>
                <div className="lrr-fixm-stats">
                  <div className="lrr-fixm-stat">
                    <span className="lrr-fixm-stat-num green">462</span>
                    <span className="lrr-fixm-stat-lbl">Valid</span>
                  </div>
                  <div className="lrr-fixm-stat">
                    <span className="lrr-fixm-stat-num">12</span>
                    <span className="lrr-fixm-stat-lbl">Catch-all</span>
                  </div>
                  <div className="lrr-fixm-stat">
                    <span className="lrr-fixm-stat-num red">6</span>
                    <span className="lrr-fixm-stat-lbl">Spam trap</span>
                  </div>
                </div>
              </div>
            </article>

            {/* --- Card 3 --- */}
            <article className="lrr-fix-card c-third" data-reveal>
              <div className="lrr-fix-card-head">
                <div className="lrr-fix-meta">
                  <span className="lrr-fix-badge">3</span>
                  <span className="lrr-fix-product">Warmrit</span>
                </div>
              </div>
              <h3 className="lrr-fix-title">Prepare the inbox</h3>
              <p className="lrr-fix-desc">
                Every sending domain is warmed to campaign-ready &mdash; building the reputation that
                lands in primary, not spam.
              </p>
              <div className="lrr-fix-mock">
                <div className="lrr-fixm-top">
                  <span className="lrr-fixm-label">Domain reputation</span>
                  <span className="lrr-fixm-rep">98</span>
                </div>
                <div className="lrr-fixm-dots" aria-hidden="true">
                  <span className="on" /><span className="on" /><span className="on" />
                  <span className="on" /><span className="on" /><span className="on" />
                  <span className="on" /><span className="on" /><span className="on" />
                  <span className="off" />
                </div>
                <span className="lrr-fixm-warmed">
                  <Icon name="check" aria-hidden="true" /> Warmed · ready to send
                </span>
              </div>
            </article>

            {/* --- Card 4 --- */}
            <article className="lrr-fix-card c-third" data-reveal>
              <div className="lrr-fix-card-head">
                <div className="lrr-fix-meta">
                  <span className="lrr-fix-badge">4</span>
                  <span className="lrr-fix-product">Sendrit + NeoBrain AI</span>
                </div>
              </div>
              <h3 className="lrr-fix-title">Send &amp; follow up</h3>
              <p className="lrr-fix-desc">
                AI-researched, signal-backed sequences across email, LinkedIn, and calling &mdash;
                follow-up responds to behaviour.
              </p>
              <div className="lrr-fix-mock">
                <div className="lrr-fixm-seq">
                  <div className="lrr-fixm-seq-row">
                    <span className="lrr-fixm-seq-ic"><Icon name="mail" aria-hidden="true" /></span>
                    <span className="lrr-fixm-seq-lbl">Email · Day 1</span>
                    <span className="lrr-fixm-seq-st gray">sent</span>
                  </div>
                  <div className="lrr-fixm-seq-row">
                    <span className="lrr-fixm-seq-ic"><Icon name="linkedin" aria-hidden="true" /></span>
                    <span className="lrr-fixm-seq-lbl">LinkedIn · Day 3</span>
                    <span className="lrr-fixm-seq-st orange">opened</span>
                  </div>
                  <div className="lrr-fixm-seq-row is-active">
                    <span className="lrr-fixm-seq-ic purple"><Icon name="check" aria-hidden="true" /></span>
                    <span className="lrr-fixm-seq-lbl">Reply · Day 6</span>
                    <span className="lrr-fixm-seq-st purple">Interested</span>
                  </div>
                </div>
              </div>
            </article>

            {/* --- Card 5 --- */}
            <article className="lrr-fix-card c-third" data-reveal>
              <div className="lrr-fix-card-head">
                <div className="lrr-fix-meta">
                  <span className="lrr-fix-badge">5</span>
                  <span className="lrr-fix-product">Snaarpmail + NeoBrain AI</span>
                </div>
              </div>
              <h3 className="lrr-fix-title">Never miss a hot reply</h3>
              <p className="lrr-fix-desc">
                Every reply is classified by intent before a human opens it. Sequences auto-pause the
                moment a prospect responds.
              </p>
              <div className="lrr-fix-mock">
                <div className="lrr-fixm-replies">
                  <div className="lrr-fixm-reply">
                    <span className="lrr-fixm-reply-dot green" />
                    <span className="lrr-fixm-reply-q">&ldquo;This is great timing&hellip;&rdquo;</span>
                    <span className="lrr-fixm-reply-tag hot">Hot</span>
                  </div>
                  <div className="lrr-fixm-reply">
                    <span className="lrr-fixm-reply-dot amber" />
                    <span className="lrr-fixm-reply-q">&ldquo;Follow up in Q2&rdquo;</span>
                    <span className="lrr-fixm-reply-tag nurture">Nurture</span>
                  </div>
                  <div className="lrr-fixm-reply is-muted">
                    <span className="lrr-fixm-reply-ic"><Icon name="refresh-cw" aria-hidden="true" /></span>
                    <span className="lrr-fixm-reply-q">Sequence auto-paused on reply</span>
                  </div>
                </div>
              </div>
            </article>
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
