'use client';

// Interactive "four root causes" section for /missed-hot-replies.
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
    icon: 'layout-grid',
    title: 'Replies Scattered Across Multiple Inboxes',
    short: 'Five active campaigns means five separate inboxes to watch.',
    long: 'A team running 5 active Sendrit campaigns is, in practice, monitoring 5 separate sending inboxes, each with its own unread count, its own login, its own browser tab. A genuinely hot reply in campaign 3 sits invisible while the rep’s attention is on campaign 1’s unread count. The more campaigns running, the worse it gets, exactly when speed to lead matters most.',
    fix: 'Snaarpmail: one unified inbox pulling every reply from every active campaign, no inbox-hopping required.',
  },
  {
    icon: 'message-square',
    title: 'A Hot Reply Looks Like a Polite No',
    short: 'An eager “yes” and a “remove me” look identical until someone opens both.',
    long: 'An eager “yes, let’s talk” and a curt “please remove me” often share the same preview line and the same unread styling. From the inbox list they look identical, so the rep either opens every reply or skims past the one that mattered. Intent stays invisible until something actually reads the full message.',
    fix: 'NeoBrain AI reads every reply the moment it lands and labels intent, high intent, neutral, or opt-out, so the hot ones stand out before anyone opens them.',
  },
  {
    icon: 'clock',
    title: 'No Urgency Signal on Response Time',
    short: 'Inboxes show unread counts, never a countdown, so urgency stays invisible.',
    long: 'Every inbox is built around an unread count, not a clock. It tells you a reply exists, never how fast that reply is cooling. Since close rates fall off a cliff after the first few minutes, the one number that should drive urgency is the one number no inbox ever shows.',
    fix: 'Snaarpmail puts a live response timer on every hot reply, so the rep sees exactly how long it has been waiting and acts while the lead is still warm.',
  },
  {
    icon: 'repeat',
    title: 'Sequences Keep Firing After a Reply Lands',
    short: 'A prospect who just replied still gets the next automated follow-up two days later.',
    long: 'Reply detection rarely talks back to the sending sequence. A prospect can answer “this is great timing” and still receive the next scheduled follow-up two days later, a templated nudge that makes the team look automated and the reply look ignored.',
    fix: 'Snaarpmail tells Sendrit the moment a reply lands, so the sequence pauses automatically and no one gets a follow-up after they have already answered.',
  },
];

export default function MissedHotRepliesCauses() {
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
    <section className="mhr-causes" ref={sectionRef}>
      <div className="container">
        <div className="mhr-causes-head" data-reveal-stagger="100">
          <span className="mhr-causes-eyebrow" data-reveal>
            <Icon name="zap" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Missed Replies Have Four Causes.<br />
            Checking Your Inbox More Often Fixes None of Them.
          </h2>
          <p data-reveal>
            The instinct when a hot reply gets missed is to tell the team to &ldquo;check email
            more.&rdquo; But if replies are scattered across five inboxes, look identical to a spam
            unsubscribe, carry no urgency signal, and arrive into a sequence that keeps firing
            automatically, checking more often just means missing replies faster. Here&rsquo;s
            what&rsquo;s actually happening, and which part of NeoLeads fixes each one.
          </p>
        </div>

        <div className="mhr-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="mhr-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`mhr-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="mhr-cause-row">
                    <span className="mhr-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="mhr-cause-title">{c.title}</span>
                    <span className="mhr-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="mhr-cause-body">
                    <p className="mhr-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="mhr-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="mhr-cause-progress" aria-hidden="true">
                      <span className="mhr-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="mhr-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="mhr-panel" key={index}>
      {index === 0 && <PanelScatter />}
      {index === 1 && <PanelIntent />}
      {index === 2 && <PanelUrgency />}
      {index === 3 && <PanelSequence />}
    </div>
  );
}

/* ---------- Panel 1: scattered inboxes -> one unified view ---------- */
function PanelScatter() {
  const silos = [
    { id: 'A', n: 12 },
    { id: 'B', n: 4 },
    { id: 'C', n: 31 },
    { id: 'D', n: 2 },
    { id: 'E', n: 18 },
  ];
  return (
    <>
      <span className="mhr-panel-eyebrow">5 inboxes → 1 unified view</span>
      <div className="mhr-silos">
        {silos.map((s) => (
          <span className="mhr-silo" key={s.id}>Campaign {s.id} · {s.n}</span>
        ))}
      </div>

      <div className="mhr-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="mhr-unibox">
        <span className="mhr-unibox-ic" aria-hidden="true"><Icon name="mail" /></span>
        <div className="mhr-unibox-body">
          <div className="mhr-unibox-name">Snaarpmail</div>
          <div className="mhr-unibox-sub">1 inbox · 5 campaigns · 67 replies, all visible</div>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 2: identical previews -> classified intent ---------- */
function PanelIntent() {
  return (
    <>
      <span className="mhr-panel-eyebrow">Identical at a glance</span>
      <div className="mhr-pblock is-bad">
        <div className="mhr-prow">
          <span className="mhr-prow-dot gray" aria-hidden="true" />
          <span className="mhr-prow-name">Marcus T.</span>
          <span className="mhr-prow-quote">“Sounds good, let’s set a time…”</span>
        </div>
        <div className="mhr-prow">
          <span className="mhr-prow-dot gray" aria-hidden="true" />
          <span className="mhr-prow-name">Dana W.</span>
          <span className="mhr-prow-quote">“Sounds good, please remove me…”</span>
        </div>
        <span className="mhr-flag red">
          <Icon name="ban" aria-hidden="true" /> Same preview · opposite intent
        </span>
      </div>

      <div className="mhr-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="mhr-pblock is-good">
        <div className="mhr-prow">
          <span className="mhr-prow-dot green" aria-hidden="true" />
          <span className="mhr-prow-name">Marcus T.</span>
          <span className="mhr-itag green">High Intent · 92</span>
        </div>
        <div className="mhr-prow">
          <span className="mhr-prow-dot muted" aria-hidden="true" />
          <span className="mhr-prow-name">Dana W.</span>
          <span className="mhr-itag muted">Opt-out</span>
        </div>
        <span className="mhr-flag green">
          <Icon name="check" aria-hidden="true" /> NeoBrain AI labels intent on arrival
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 3: unread count -> live countdown ---------- */
function PanelUrgency() {
  return (
    <>
      <span className="mhr-panel-eyebrow">Unread count vs live countdown</span>
      <div className="mhr-pblock is-bad">
        <div className="mhr-prow">
          <span className="mhr-prow-ic gray" aria-hidden="true"><Icon name="inbox" /></span>
          <span className="mhr-prow-name">Campaign C inbox</span>
          <span className="mhr-itag muted">31 unread</span>
        </div>
        <span className="mhr-flag red">
          <Icon name="eye-off" aria-hidden="true" /> A count, never a clock · urgency invisible
        </span>
      </div>

      <div className="mhr-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="mhr-pblock is-good">
        <div className="mhr-pblock-head">
          <span className="mhr-pblock-title">Marcus T. · hot reply</span>
          <span className="mhr-pblock-stat purple">4:12 since reply</span>
        </div>
        <div className="mhr-ubar">
          <span className="mhr-ubar-fill" style={{ width: '32%' }} />
        </div>
        <div className="mhr-ubar-legend">
          <span className="good">Respond now · 2.6× close</span>
          <span>Cools after 1h</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 4: sequence keeps firing -> auto-paused ---------- */
function PanelSequence() {
  return (
    <>
      <span className="mhr-panel-eyebrow">Reply lands · sequence reacts</span>
      <div className="mhr-pblock is-bad">
        <div className="mhr-prow">
          <span className="mhr-prow-dot green" aria-hidden="true" />
          <span className="mhr-prow-name">Marcus replied</span>
          <span className="mhr-prow-quote">“This is great timing…”</span>
        </div>
        <div className="mhr-seqline">
          <span className="mhr-seqstep">Follow-up 3</span>
          <span className="mhr-seqarrow" aria-hidden="true"><Icon name="arrow-right" /></span>
          <span className="mhr-seqstep red">Sent 2 days later</span>
        </div>
        <span className="mhr-flag red">
          <Icon name="repeat" aria-hidden="true" /> Sequence keeps firing after the reply
        </span>
      </div>

      <div className="mhr-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="mhr-pblock is-good">
        <div className="mhr-prow">
          <span className="mhr-prow-dot green" aria-hidden="true" />
          <span className="mhr-prow-name">Reply detected</span>
          <span className="mhr-itag green">Sendrit notified</span>
        </div>
        <span className="mhr-flag green">
          <Icon name="pause" aria-hidden="true" /> Sequence paused automatically · no stray follow-ups
        </span>
      </div>
    </>
  );
}
