'use client';

// Interactive "four root causes" section for /generic-outreach.
// One cause is active at a time. A purple progress line fills under the active
// item over ADVANCE_MS; when it completes, the next cause activates (looping).
// Clicking any item jumps to it immediately and restarts its progress. The
// right-hand panel swaps to the visual that matches the active cause.
// The loop only runs while the section is in view, and is disabled entirely
// under prefers-reduced-motion (clicking still works).
//
// Mirrors the established pattern from ManualProspectingCauses / LowReplyRatesCauses.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const ADVANCE_MS = 7000;

const CAUSES = [
  {
    icon: 'type',
    title: 'Merge Tags Masquerading as Personalization',
    short: 'A first name dropped into a template still reads as a template.',
    long: '"Hi {{FirstName}}, I noticed {{Company}} could benefit from…" lands in the inbox and the bin at the same time. Every recipient has seen this pattern dozens of times, and Gmail’s AI filters now detect the same template openers outreach tools use to generate them. Surface-level merge tags don’t signal research, they signal automation.',
    fix: 'NeoBrain AI reads each contact’s role, company, and buying signal, then writes a unique opening line that references something specific, not a field from a CSV.',
  },
  {
    icon: 'zap',
    title: 'No Signal, No “Why Now”',
    short: 'A pitch with no signal makes no argument for why this prospect should care now.',
    long: 'A message that opens with your product instead of their moment gives the reader no reason to act today. Without a funding round, a new hire, or a hiring surge to anchor it, even a well-written email is just another vendor asking for 15 minutes, and it waits in the queue forever.',
    fix: 'NeoBrain AI attaches a live buying signal to every contact and opens on it, so the first line answers “why now” before the reader has to ask.',
  },
  {
    icon: 'repeat',
    title: 'Same Template Across Every Channel',
    short: 'The same copy pasted to email, LinkedIn, and a call is one message in three costumes.',
    long: 'Reusing one script across email, LinkedIn, and the phone doesn’t multiply your reach, it multiplies the same generic impression. A buyer who ignored the email recognizes the identical opener in the connection request, and the repetition only confirms that no one actually looked them up.',
    fix: 'NeoBrain AI writes channel-aware variations off the same research, so each touch reads as a fresh, specific message instead of a copy-paste across three windows.',
  },
  {
    icon: 'bar-chart-3',
    title: 'Volume Over Precision',
    short: '500 generic contacts reply at 2.1%; 50 researched ones reply at 5.8%.',
    long: 'When replies are thin, the instinct is to send more. But blasting 500 near-identical emails trains filters and recipients to tune you out, while 50 genuinely researched messages outperform them on raw reply count, not just rate. More volume of the wrong thing makes the next campaign harder, not easier.',
    fix: 'NeoBrain AI makes precision scalable, researched signal-specific first lines for every contact, so you get the reply rate of hand-written outreach at the volume of automated sending.',
  },
];

export default function GenericOutreachCauses() {
  const [active, setActive] = useState(0);
  const [nonce, setNonce] = useState(0); // bump to restart the active item's line
  const [running, setRunning] = useState(false);
  const sectionRef = useRef(null);
  const fillRef = useRef(null);

  const select = (i) => {
    setActive(i);
    setNonce((n) => n + 1);
  };

  // Run the progress line + auto-advance only while in view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setRunning(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setRunning(e.isIntersecting)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fill = fillRef.current;

    // Reset the line to 0, then drive it to 100% with a linear CSS transition.
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      void fill.offsetWidth; // commit the reset before animating
      if (!reduced) {
        fill.style.transition = `width ${ADVANCE_MS}ms linear`;
        fill.style.width = '100%';
      }
    }

    if (reduced) return; // no auto-advance under reduced motion
    const id = setTimeout(() => setActive((a) => (a + 1) % CAUSES.length), ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, nonce, running]);

  return (
    <section className="go-causes" ref={sectionRef}>
      <div className="container">
        <div className="go-causes-head" data-reveal-stagger="100">
          <span className="go-causes-eyebrow" data-reveal>
            <Icon name="zap" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Generic Outreach Has Four Causes.<br />
            A New Subject Line Fixes None.
          </h2>
          <p data-reveal>
            Most teams respond to low reply rates by rewriting subject lines, shortening copy, or
            trying a new template. But if the core problem is that every message sounds identical and
            impersonal, no subject line variation will fix it. Here&rsquo;s what&rsquo;s actually
            causing generic outreach, and which part of NeoLeads addresses each one.
          </p>
        </div>

        <div className="go-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="go-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`go-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="go-cause-row">
                    <span className="go-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="go-cause-title">{c.title}</span>
                    <span className="go-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="go-cause-body">
                    <p className="go-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="go-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="go-cause-progress" aria-hidden="true">
                      <span className="go-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="go-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="go-panel" key={index}>
      {index === 0 && <PanelFirstLine />}
      {index === 1 && <PanelWhyNow />}
      {index === 2 && <PanelChannels />}
      {index === 3 && <PanelVolume />}
    </div>
  );
}

/* ---------- Panel 1: The first line a buyer reads ---------- */
function PanelFirstLine() {
  return (
    <>
      <span className="go-panel-eyebrow">The first line a buyer reads</span>
      <div className="go-qa is-bad">
        <span className="go-qa-head">
          <span className="go-qa-ic red" aria-hidden="true"><Icon name="circle-x" /></span>
          Template detected
        </span>
        <p className="go-qa-quote">
          &ldquo;Hi Marcus, I wanted to reach out because Acme Corp could benefit from&hellip;&rdquo;
        </p>
      </div>

      <div className="go-qa is-good">
        <span className="go-qa-head">
          <span className="go-qa-ic green" aria-hidden="true"><Icon name="check" /></span>
          Personalised
        </span>
        <p className="go-qa-quote strong">
          &ldquo;Saw Acme just brought on a new CRO and opened 9 SDR roles in the same
          week&hellip;&rdquo;
        </p>
        <span className="go-qa-chip">
          <span className="go-dot" aria-hidden="true" />
          NeoBrain AI &middot; referenced a real signal
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 2: A reason to reach out now ---------- */
function PanelWhyNow() {
  return (
    <>
      <span className="go-panel-eyebrow">Why this lands now</span>
      <div className="go-contact is-bad">
        <div className="go-contact-head">
          <span className="go-contact-av gray">JR</span>
          <div className="go-contact-id">
            <div className="go-contact-name">Jordan R.</div>
            <div className="go-contact-role">VP Sales &middot; Acme Corp</div>
          </div>
        </div>
        <span className="go-flag red">
          <Icon name="ban" aria-hidden="true" /> No signal &middot; no reason to reply today
        </span>
      </div>

      <div className="go-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="go-contact is-good">
        <div className="go-contact-head">
          <span className="go-contact-av purple">MT</span>
          <div className="go-contact-id">
            <div className="go-contact-name">Marcus T.</div>
            <div className="go-contact-role">VP Sales &middot; Acme Corp</div>
          </div>
        </div>
        <div className="go-contact-tags">
          <span className="go-tag purple">New CRO hired</span>
          <span className="go-tag green">9 SDR roles open</span>
          <span className="go-tag teal">Series B closed</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 3: One message across three channels ---------- */
function PanelChannels() {
  return (
    <>
      <span className="go-panel-eyebrow">One message, three channels</span>
      <div className="go-chan-group is-bad">
        <span className="go-chan"><Icon name="mail" aria-hidden="true" />Email<i className="go-chan-msg">&ldquo;Hi {'{{FirstName}}'}, I wanted to reach out&hellip;&rdquo;</i></span>
        <span className="go-chan"><Icon name="linkedin" aria-hidden="true" />LinkedIn<i className="go-chan-msg">&ldquo;Hi {'{{FirstName}}'}, I wanted to reach out&hellip;&rdquo;</i></span>
        <span className="go-chan"><Icon name="phone" aria-hidden="true" />Call<i className="go-chan-msg">&ldquo;Hi {'{{FirstName}}'}, I wanted to reach out&hellip;&rdquo;</i></span>
        <span className="go-flag red">
          <Icon name="copy" aria-hidden="true" /> Identical script &middot; three costumes
        </span>
      </div>

      <div className="go-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="go-chan-group is-good">
        <span className="go-chan"><Icon name="mail" aria-hidden="true" />Email<i className="go-chan-msg good">&ldquo;On the new CRO and 9 open SDR roles&hellip;&rdquo;</i></span>
        <span className="go-chan"><Icon name="linkedin" aria-hidden="true" />LinkedIn<i className="go-chan-msg good">&ldquo;Saw the Series B, congrats on the raise&hellip;&rdquo;</i></span>
        <span className="go-chan"><Icon name="phone" aria-hidden="true" />Call<i className="go-chan-msg good">&ldquo;Noticed you&rsquo;re scaling the SDR team&hellip;&rdquo;</i></span>
        <span className="go-flag green">
          <Icon name="check" aria-hidden="true" /> Same research &middot; three tailored touches
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 4: Volume vs precision ---------- */
function PanelVolume() {
  return (
    <>
      <span className="go-panel-eyebrow">Volume vs precision</span>
      <div className="go-race is-bad">
        <div className="go-race-head">
          <span className="go-race-name">500 generic sends</span>
          <span className="go-race-time red">2.1%</span>
        </div>
        <div className="go-bar">
          <span className="fill fade" style={{ width: '36%' }} />
        </div>
        <div className="go-race-sub">~11 replies &middot; filters learn the pattern</div>
      </div>

      <div className="go-race is-good">
        <div className="go-race-head">
          <span className="go-race-name">50 researched sends</span>
          <span className="go-race-time purple">5.8%</span>
        </div>
        <div className="go-bar">
          <span className="fill purple" style={{ width: '100%' }} />
        </div>
        <div className="go-race-sub">researched first line per contact &middot; higher reply rate, less noise</div>
      </div>
    </>
  );
}
