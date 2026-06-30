// "The Full Fix": the five-step process grid for /generic-outreach. Walks the
// reader from signal → research → send → delivery → follow-up, with each step
// owning a product (Zeus, NeoBrain AI, Sendrit, Verifyrit + Warmrit, Snaarpmail)
// and a small visual proof of what that step produces. The right-hand tag on each
// card names the generic-outreach failure the step replaces.
//
// Static + server-rendered: entrance is the page-wide `data-reveal` observer
// (ClientScripts), no client JS of its own. Every .go-fix-* class lives in
// globals.css. The asymmetric 2-up / 3-up layout is a 6-column grid (top cards
// span 3, bottom cards span 2).

import Icon from './Icon';

export default function GenericOutreachProcess() {
  return (
    <section className="go-fix">
      <div className="container">
        <div className="go-fix-head" data-reveal-stagger="100">
          <span className="go-fix-badge" data-reveal>The Full Fix</span>
          <h2 data-reveal>
            How <span className="go-fix-hl">NeoLeads</span> Replaces Generic Templates With
            Research-Backed Outreach
          </h2>
          <p className="go-fix-sub" data-reveal>
            Five connected steps, from finding the signal to writing the message to sending
            across every channel, that make every sequence feel like it was written
            specifically for the person receiving it, because it was.
          </p>
        </div>

        <div className="go-fix-grid" data-reveal-stagger="110">
          {/* ---- Step 1 ---- */}
          <article className="go-fix-card" data-reveal>
            <div className="go-fix-card-top">
              <span className="go-fix-num">1</span>
              <span className="go-fix-eyebrow">Zeus + NeoBrain AI</span>
              <span className="go-fix-tag go-fix-tag-purple">step 1 &middot; the signal</span>
            </div>
            <h3 className="go-fix-card-title">Find contacts with a reason to hear from you</h3>
            <p className="go-fix-card-body">
              Zeus surfaces verified decision-makers ranked by ICP fit and live buying signals. Every
              contact arrives with a specific signal, a funding round, a leadership hire, a
              hiring push, that becomes the foundation of the personalization in the next step.
            </p>

            <div className="go-fix-widget">
              <div className="go-fix-search">
                <Icon name="search" aria-hidden="true" />
                <span className="go-fix-search-q">VP Sales &middot; Series B SaaS &middot; hiring SDRs</span>
                <span className="go-fix-count">47</span>
              </div>
              <div className="go-fix-contact">
                <span className="go-fix-av" aria-hidden="true">MT</span>
                <span className="go-fix-contact-name">Marcus T. &middot; Raised $18M</span>
                <span className="go-fix-score">94</span>
              </div>
              <div className="go-fix-contact">
                <span className="go-fix-av go-fix-av-pink" aria-hidden="true">PN</span>
                <span className="go-fix-contact-name">Priya N. &middot; New CRO hired</span>
                <span className="go-fix-score">88</span>
              </div>
            </div>
          </article>

          {/* ---- Step 2 ---- */}
          <article className="go-fix-card" data-reveal>
            <div className="go-fix-card-top">
              <span className="go-fix-num">2</span>
              <span className="go-fix-eyebrow">NeoBrain AI</span>
              <span className="go-fix-tag go-fix-tag-red">replaces &middot; merge tags</span>
            </div>
            <h3 className="go-fix-card-title">Research every prospect before a word is written</h3>
            <p className="go-fix-card-body">
              NeoBrain AI reads the buying signal, cross-references the contact&rsquo;s role and
              company context, and generates a signal-backed first line per prospect, not a
              template with a field swapped, but a distinct opening built around something real about
              their situation this week.
            </p>

            <div className="go-fix-widget">
              <div className="go-fix-signals">
                <span className="go-fix-pill">Series B</span>
                <span className="go-fix-pill">New CRO</span>
                <span className="go-fix-pill">9 SDR roles</span>
              </div>
              <span className="go-fix-arrow" aria-hidden="true"><Icon name="arrow-down" /></span>
              <div className="go-fix-genbox">
                <span className="go-fix-genlabel">
                  <Icon name="sparkles" aria-hidden="true" /> Generated first line
                </span>
                <p className="go-fix-genquote">
                  &ldquo;Saw Acme brought on a new CRO and opened 9 SDR roles in the same week,
                  Marcus&hellip;&rdquo;
                </p>
              </div>
            </div>
          </article>

          {/* ---- Step 3 ---- */}
          <article className="go-fix-card" data-reveal>
            <div className="go-fix-card-top">
              <span className="go-fix-num">3</span>
              <span className="go-fix-eyebrow">Sendrit</span>
              <span className="go-fix-tag go-fix-tag-red">one template</span>
            </div>
            <h3 className="go-fix-card-title">Send a personalised sequence</h3>
            <p className="go-fix-card-body">
              Sendrit takes NeoBrain AI&rsquo;s research and builds a full email + LinkedIn + calling
              sequence around it: channel-appropriate content at each step, with signal-based
              follow-up that responds to how each prospect engages.
            </p>

            <div className="go-fix-widget">
              <div className="go-fix-genbox">
                <span className="go-fix-genlabel go-fix-genlabel-brand">NeoBrain first line</span>
                <p className="go-fix-genquote">
                  &ldquo;Saw Acme opened 9 SDR roles after the raise&hellip;&rdquo;
                </p>
              </div>
              <div className="go-fix-seqrow">
                <span className="go-fix-dot go-fix-dot-green" aria-hidden="true" />
                <span className="go-fix-seqrow-text">Email + LinkedIn sequence</span>
                <span className="go-fix-live">Live</span>
              </div>
            </div>
          </article>

          {/* ---- Step 4 ---- */}
          <article className="go-fix-card" data-reveal>
            <div className="go-fix-card-top">
              <span className="go-fix-num">4</span>
              <span className="go-fix-eyebrow">Verifyrit + Warmrit</span>
              <span className="go-fix-tag go-fix-tag-red">in spam</span>
            </div>
            <h3 className="go-fix-card-title">Protect the delivery</h3>
            <p className="go-fix-card-body">
              A perfectly personalised email that lands in spam is still ignored. Verifyrit cleans the
              list and Warmrit keeps the domain landing in primary, so the research gets the
              credit, because the infrastructure gave it a chance.
            </p>

            <div className="go-fix-widget">
              <div className="go-fix-rep">
                <span className="go-fix-rep-label">Domain reputation</span>
                <span className="go-fix-rep-num">98</span>
              </div>
              <div className="go-fix-bar" aria-hidden="true">
                <span className="on" /><span className="on" /><span className="on" /><span className="on" />
                <span className="on" /><span className="on" /><span className="on" /><span />
              </div>
              <span className="go-fix-status-green">
                <Icon name="check" aria-hidden="true" /> Cleaned &middot; warmed &middot; inbox-ready
              </span>
            </div>
          </article>

          {/* ---- Step 5 ---- */}
          <article className="go-fix-card" data-reveal>
            <div className="go-fix-card-top">
              <span className="go-fix-num">5</span>
              <span className="go-fix-eyebrow">Snaarpmail + NeoBrain AI</span>
              <span className="go-fix-tag go-fix-tag-red">lost in inbox</span>
            </div>
            <h3 className="go-fix-card-title">Keep the personalisation going</h3>
            <p className="go-fix-card-body">
              Every reply is classified by intent (Interested, Soft Objection, Referral, Not
              Now), and the suggested follow-up continues the signal-led conversation. The
              research doesn&rsquo;t stop at the first email; it runs through the whole thread.
            </p>

            <div className="go-fix-widget">
              <div className="go-fix-reply">
                <span className="go-fix-dot go-fix-dot-green" aria-hidden="true" />
                <span className="go-fix-reply-text">&ldquo;This is great timing&hellip;&rdquo;</span>
                <span className="go-fix-intent go-fix-intent-hot">Hot</span>
              </div>
              <div className="go-fix-reply">
                <span className="go-fix-dot go-fix-dot-amber" aria-hidden="true" />
                <span className="go-fix-reply-text">&ldquo;Follow up in Q2&rdquo;</span>
                <span className="go-fix-intent go-fix-intent-nurture">Nurture</span>
              </div>
              <div className="go-fix-reply go-fix-reply-paused">
                <Icon name="pause" aria-hidden="true" />
                <span className="go-fix-reply-text">Sequence auto-paused on reply</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
