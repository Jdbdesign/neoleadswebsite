'use client';

// Interactive "four root causes" section for /high-bounce-rates.
// One cause is active at a time. A purple progress line fills under the active
// item over ADVANCE_MS; when it completes, the next cause activates (looping).
// Clicking any item jumps to it immediately and restarts its progress. The
// right-hand panel swaps to the visual that matches the active cause.
// The loop only runs while the section is in view, and is disabled entirely
// under prefers-reduced-motion (clicking still works).
//
// Mirrors the established pattern from GenericOutreachCauses / EmailsSpamCauses.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const ADVANCE_MS = 7000;

const CAUSES = [
  {
    icon: 'list-checks',
    title: 'Unverified Lists Entering Campaigns Unchecked',
    short: 'A list verified once at import keeps decaying, and nothing re-checks it before the next send.',
    long: 'A list verified at import and never touched again is already decaying. B2B data loses 25% of its valid addresses every year. A clean import in Q3 2025 has 8–12% more invalid addresses by Q1 2026, with no alert, no flag, and no gate stopping those dead addresses from entering a Sendrit sequence and generating hard bounces.',
    fix: 'Verifyrit: a pre-campaign validation gate on every Sendrit launch, not just the first import.',
  },
  {
    icon: 'mail',
    title: 'Catch-All Addresses Misclassified as Valid',
    short: 'Standard SMTP passes catch-all domains as valid; many hard-bounce on send.',
    long: 'Catch-all domains accept every address at the SMTP handshake, so standard verifiers mark them “valid.” Then a large share hard-bounce the moment you actually send. Between 23% and 31% of B2B databases are catch-alls, which means a list that looks clean can still carry a campaign-killing bounce rate the first time it ships.',
    fix: 'Verifyrit goes past the SMTP check: it detects catch-all domains and quarantines the risky addresses before they ever enter a send.',
  },
  {
    icon: 'refresh-cw',
    title: 'The Reputation Death Spiral',
    short: 'Bounces drop reputation, which causes more bounces, a compounding spiral.',
    long: 'Every hard bounce lowers your domain reputation, which pushes more of your mail to spam, which lowers engagement, which lowers reputation again. Once the spiral starts it feeds itself: the next campaign bounces harder than the last, and recovery takes 4–8 weeks of throttled sending even after you fix the list.',
    fix: 'Verifyrit stops the first bounce. Keeping reputation high means the spiral never gets its initial push.',
  },
  {
    icon: 'activity',
    title: 'No Monitoring Between Campaigns',
    short: 'Damage builds silently; most teams notice only after open rates fall 40%.',
    long: 'Lists don’t fail loudly. They decay quietly between campaigns while nobody is watching. By the time open rates have dropped 40% and replies have dried up, the bounce damage is already done and the reputation hit is weeks old. Most teams only investigate after the numbers have cratered.',
    fix: 'Verifyrit re-validates and monitors list health continuously, flagging decay before it shows up as a bounce.',
  },
];

export default function HighBounceRatesCauses() {
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
    <section className="hbr-causes" ref={sectionRef}>
      <div className="container">
        <div className="hbr-causes-head" data-reveal-stagger="100">
          <span className="hbr-causes-eyebrow" data-reveal>
            <Icon name="layers" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            High Bounce Rates Have Four Causes.<br />
            Cleaning Your List Once Fixes One of Them.
          </h2>
          <p data-reveal>
            Most teams respond to a bounce rate spike by running a quick clean and resuming sending.
            But if the underlying causes (stale data, unresolved catch-alls, no pre-campaign gate,
            and no continuous monitoring) stay intact, the bounce rate climbs again on the next
            campaign. Here’s what’s actually happening, and which part of NeoLeads eliminates each
            one.
          </p>
        </div>

        <div className="hbr-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="hbr-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`hbr-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="hbr-cause-row">
                    <span className="hbr-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="hbr-cause-title">{c.title}</span>
                    <span className="hbr-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="hbr-cause-body">
                    <p className="hbr-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="hbr-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="hbr-cause-progress" aria-hidden="true">
                      <span className="hbr-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="hbr-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="hbr-panel" key={index}>
      {index === 0 && <PanelGate />}
      {index === 1 && <PanelCatchAll />}
      {index === 2 && <PanelSpiral />}
      {index === 3 && <PanelMonitor />}
    </div>
  );
}

/* ---------- Panel 1: the pre-campaign gate ---------- */
function PanelGate() {
  return (
    <>
      <span className="hbr-panel-eyebrow">The gate on every campaign launch</span>
      <div className="hbr-pcard">
        <span className="hbr-pcard-ic purple" aria-hidden="true"><Icon name="rocket" /></span>
        <div className="hbr-pcard-main">
          <div className="hbr-pcard-title">Launching: Q3 Outreach</div>
          <div className="hbr-pcard-sub">1,000 contacts &middot; imported 8 mo ago</div>
        </div>
      </div>

      <div className="hbr-ppill">
        <Icon name="lock" aria-hidden="true" />
        Verifyrit Gate &middot; verifying 1,000&hellip;
      </div>

      <div className="hbr-pbox">
        <div className="hbr-psplit">
          <div className="hbr-psplit-half green">
            <div className="hbr-psplit-num">947</div>
            <div className="hbr-psplit-label">cleared</div>
          </div>
          <div className="hbr-psplit-half red">
            <div className="hbr-psplit-num">53</div>
            <div className="hbr-psplit-label">removed</div>
          </div>
        </div>
        <div className="hbr-pbadge green">
          <Icon name="check" aria-hidden="true" />
          Gate passed &middot; Sendrit authorised
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 2: catch-all detection ---------- */
function PanelCatchAll() {
  return (
    <>
      <span className="hbr-panel-eyebrow">What standard verifiers miss</span>
      <div className="hbr-prow">
        <Icon name="mail" aria-hidden="true" />
        <span>info@acme.io</span>
        <span className="hbr-ptag gray">SMTP: Valid</span>
      </div>
      <div className="hbr-prow red">
        <Icon name="triangle-alert" aria-hidden="true" />
        <span>Catch-all domain &middot; hard-bounces on send</span>
      </div>

      <div className="hbr-parrow" aria-hidden="true"><Icon name="arrow-down" /></div>

      <div className="hbr-prow green">
        <Icon name="badge-check" aria-hidden="true" />
        <span>Verifyrit: catch-all detected &middot; removed before send</span>
      </div>
    </>
  );
}

/* ---------- Panel 3: the reputation death spiral ---------- */
function PanelSpiral() {
  return (
    <>
      <span className="hbr-panel-eyebrow">The compounding spiral</span>
      <div className="hbr-prow red">
        <Icon name="trending-up" aria-hidden="true" />
        <span>Bounce rate climbs <b className="red">2% &rarr; 8%</b></span>
      </div>
      <div className="hbr-parrow" aria-hidden="true"><Icon name="arrow-down" /></div>
      <div className="hbr-prow red">
        <Icon name="trending-down" aria-hidden="true" />
        <span>Sender reputation drops &middot; more mail to spam</span>
      </div>
      <div className="hbr-parrow" aria-hidden="true"><Icon name="arrow-down" /></div>
      <div className="hbr-prow red">
        <Icon name="repeat" aria-hidden="true" />
        <span>Spam placement triggers <b className="red">more</b> bounces</span>
      </div>

      <div className="hbr-pbadge green">
        <Icon name="shield-check" aria-hidden="true" />
        Verifyrit breaks the loop before it starts
      </div>
    </>
  );
}

/* ---------- Panel 4: silent decay between campaigns ---------- */
function PanelMonitor() {
  return (
    <>
      <span className="hbr-panel-eyebrow">Silent decay between sends</span>
      <div className="hbr-pcard">
        <span className="hbr-pcard-ic green" aria-hidden="true"><Icon name="circle-check" /></span>
        <div className="hbr-pcard-main">
          <div className="hbr-pcard-title">Campaign 1 &middot; list clean</div>
          <div className="hbr-pcard-sub">Bounce rate <b className="green">0.3%</b></div>
        </div>
      </div>

      <div className="hbr-pmuted">3 months &middot; no checks, no alerts</div>

      <div className="hbr-pcard">
        <span className="hbr-pcard-ic red" aria-hidden="true"><Icon name="trending-down" /></span>
        <div className="hbr-pcard-main">
          <div className="hbr-pcard-title">Campaign 2 &middot; open rates &minus;40%</div>
          <div className="hbr-pcard-sub">Bounce rate <b className="red">6.1%</b></div>
        </div>
      </div>

      <div className="hbr-pbadge purple">
        <Icon name="activity" aria-hidden="true" />
        Verifyrit re-checks every list, every campaign
      </div>
    </>
  );
}
