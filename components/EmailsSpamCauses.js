'use client';

// Interactive "four root causes" section for /emails-landing-in-spam.
// One cause is active at a time. A purple progress line fills under the active
// item over ADVANCE_MS; when it completes, the next cause activates (looping).
// Clicking any item jumps to it immediately and restarts its progress. The
// right-hand panel swaps to the visual that matches the active cause.
// The loop only runs while the section is in view, and is disabled entirely
// under prefers-reduced-motion (clicking still works).

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const ADVANCE_MS = 7000;

const CAUSES = [
  {
    icon: 'key-round',
    title: 'Missing Authentication',
    short: 'SPF, DKIM, and DMARC prove your domain is who it claims to be.',
    long: 'SPF, DKIM, and DMARC are the three DNS records that prove your domain is who it claims to be. Since Google and Yahoo (Feb 2024) and Microsoft (May 2025), sending without them means outright rejection at the server level, not “possibly spam,” rejection. Only 7.6% of domains currently enforce DMARC.',
    fix: 'Snaarpmail auto-configures SPF, DKIM and DMARC for every connected sending domain on setup.',
  },
  {
    icon: 'mail',
    title: 'Cold, Unwarmed Inboxes',
    short: 'New domains land at 55% inbox vs. 85%, a 30-point cold-start penalty.',
    long: 'New domains and mailboxes have no sending history, so providers treat every message as suspicious. New domains land at 55% inbox vs. 85% for warmed ones, a 30-point cold-start penalty that no subject line can overcome.',
    fix: 'Warmrit ramps every new domain with natural, human-like activity until it earns full inbox trust before your campaign sends.',
  },
  {
    icon: 'copy',
    title: 'Content That Reads Like a Template',
    short: "Gmail's AI now detects the same patterns AI outreach tools write.",
    long: "Gmail's AI now detects the same patterns AI outreach tools write: identical structures, spammy phrases, link-heavy bodies, and mail-merge tokens. Content that looks mass-produced gets filtered no matter how clean your domain is.",
    fix: "NeoBrain AI writes each message from the prospect's real signals, so every email reads uniquely human, not mass-produced.",
  },
  {
    icon: 'list-x',
    title: 'List Hygiene Failures',
    short: 'Purchased lists average 18.5% bounce, enough to burn a domain in one send.',
    long: 'Sending to invalid, stale, or purchased addresses spikes your bounce rate, and providers read high bounces as spammer behaviour. Purchased lists average 18.5% bounce, enough to burn a domain in a single send.',
    fix: 'Verifyrit validates every address through 7-layer checks before send, keeping bounce rates under 1% and your reputation intact.',
  },
];

export default function EmailsSpamCauses() {
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
    <section className="els-causes" ref={sectionRef}>
      <div className="container">
        <div className="els-causes-head" data-reveal-stagger="100">
          <span className="els-causes-eyebrow" data-reveal>
            <Icon name="git-fork" aria-hidden="true" />
            The Four Root Causes
          </span>
          <h2 data-reveal>
            Spam Placement Has Four Causes. Rewriting<br />
            Your Subject Line Fixes None of Them.
          </h2>
          <p data-reveal>
            Most teams facing spam issues change their copy, remove links, or switch to a new
            domain and start over, leaving the actual causes intact. Here&rsquo;s what&rsquo;s
            really happening, and which part of NeoLeads addresses each one.
          </p>
        </div>

        <div className="els-causes-layout">
          {/* ---------- accordion list ---------- */}
          <div className="els-causes-list">
            {CAUSES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`els-cause${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onClick={() => select(i)}
                >
                  <span className="els-cause-row">
                    <span className="els-cause-ic">
                      <Icon name={c.icon} aria-hidden="true" />
                    </span>
                    <span className="els-cause-title">{c.title}</span>
                    <span className="els-cause-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="els-cause-body">
                    <p className="els-cause-desc">{isActive ? c.long : c.short}</p>
                    {isActive && (
                      <p className="els-cause-fix">
                        <Icon name="check" aria-hidden="true" />
                        <span>
                          <b>Fix:</b> {c.fix}
                        </span>
                      </p>
                    )}
                  </div>

                  {isActive && (
                    <span className="els-cause-progress" aria-hidden="true">
                      <span className="els-cause-progress-fill" ref={fillRef} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- swapping visual panel ---------- */}
          <div className="els-causes-visual">
            <Panel index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ index }) {
  return (
    <div className="els-panel" key={index}>
      {index === 0 && <PanelAuth />}
      {index === 1 && <PanelWarmup />}
      {index === 2 && <PanelContent />}
      {index === 3 && <PanelHygiene />}
    </div>
  );
}

/* ---------- Panel 1: DNS authentication status ---------- */
function PanelAuth() {
  return (
    <>
      <span className="els-panel-eyebrow">DNS Authentication Status</span>

      <div className="els-dns-block is-bad">
        <div className="els-dns-stage">Before · Unauthenticated Domain</div>
        <div className="els-dns-row">
          <span className="els-dns-rec">SPF</span>
          <span className="els-dns-stat red"><Icon name="x" aria-hidden="true" /> Missing</span>
        </div>
        <div className="els-dns-row">
          <span className="els-dns-rec">DKIM</span>
          <span className="els-dns-stat red"><Icon name="x" aria-hidden="true" /> Missing</span>
        </div>
        <div className="els-dns-row">
          <span className="els-dns-rec">DMARC</span>
          <span className="els-dns-stat red"><Icon name="x" aria-hidden="true" /> Not Enforced</span>
        </div>
        <div className="els-dns-note">
          <Icon name="arrow-right" aria-hidden="true" /> Rejected at SMTP level since Feb 2024
        </div>
      </div>

      <div className="els-dns-block is-good">
        <div className="els-dns-stage purple">After · Snaarpmail Configured</div>
        <div className="els-dns-row">
          <span className="els-dns-rec">SPF</span>
          <span className="els-dns-stat green"><Icon name="check" aria-hidden="true" /> Active</span>
        </div>
        <div className="els-dns-row">
          <span className="els-dns-rec">DKIM</span>
          <span className="els-dns-stat green"><Icon name="check" aria-hidden="true" /> Active</span>
        </div>
        <div className="els-dns-row">
          <span className="els-dns-rec">DMARC</span>
          <span className="els-dns-stat green"><Icon name="check" aria-hidden="true" /> Enforced</span>
        </div>
        <span className="els-dns-btn">
          <Icon name="check" aria-hidden="true" /> Auto-configured by Snaarpmail
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 2: Inbox placement after warm-up ---------- */
function PanelWarmup() {
  return (
    <>
      <span className="els-panel-eyebrow">Inbox placement vs. domain trust</span>
      <div className="els-inbox is-bad">
        <div className="els-inbox-head">
          <span className="els-inbox-title">Cold domain · Day 1</span>
          <span className="els-inbox-stat red">55% inbox</span>
        </div>
        <div className="els-bar">
          <span className="seg cold-fill" style={{ width: '55%' }} />
        </div>
        <div className="els-inbox-legend">
          <span>No sending history</span>
          <span className="red">30-pt cold-start penalty</span>
        </div>
      </div>

      <div className="els-inbox is-good">
        <div className="els-inbox-head">
          <span className="els-inbox-title">Warmrit · 28 days warmed</span>
          <span className="els-inbox-stat purple">96% inbox</span>
        </div>
        <div className="els-bar">
          <span className="seg good-fill" style={{ width: '96%' }} />
        </div>
        <div className="els-inbox-tools">
          <span className="els-tool green">ISP trust: Strong ✓</span>
          <span className="els-tool gray">Natural ramp ✓</span>
          <span className="els-tool gray">Reputation built ✓</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Panel 3: Human, not mass-produced ---------- */
function PanelContent() {
  return (
    <>
      <span className="els-panel-eyebrow">Human, not mass-produced</span>
      <div className="els-msg is-bad">
        <div className="els-msg-label">Looks AI-generated</div>
        <p className="els-msg-body">
          Hi <span className="els-token">{'{{first_name}}'}</span>, I wanted to reach out about our
          platform that helps companies like{' '}
          <span className="els-token">{'{{company}}'}</span> scale faster. Click here to{' '}
          <span className="els-token">book a demo</span> today!
        </p>
        <span className="els-flag red">
          <Icon name="ban" aria-hidden="true" /> Pattern-matched &amp; filtered
        </span>
      </div>

      <div className="els-panel-arrow" aria-hidden="true">
        <Icon name="arrow-down" />
      </div>

      <div className="els-msg is-good">
        <div className="els-msg-label purple">Written by NeoBrain AI</div>
        <p className="els-msg-body bright">
          Hi Marcus, saw Acme just opened <span className="els-hl">9 SDR roles</span> after the new
          CRO landed. Teams scaling outbound that fast usually hit{' '}
          <span className="els-hl">deliverability walls</span> first. Worth comparing notes?
        </p>
        <span className="els-flag green">
          <Icon name="check" aria-hidden="true" /> Reads uniquely human
        </span>
      </div>
    </>
  );
}

/* ---------- Panel 4: List health before send ---------- */
function PanelHygiene() {
  return (
    <>
      <span className="els-panel-eyebrow">List health before send</span>
      <div className="els-inbox is-bad">
        <div className="els-inbox-head">
          <span className="els-inbox-title">Purchased list</span>
          <span className="els-inbox-stat red">18.5% bounce</span>
        </div>
        <div className="els-bar">
          <span className="seg spam-fill" style={{ width: '18.5%' }} />
        </div>
        <div className="els-inbox-legend">
          <span>Invalid, stale &amp; trap addresses</span>
          <span className="red">Domain at risk</span>
        </div>
      </div>

      <div className="els-inbox is-good">
        <div className="els-inbox-head">
          <span className="els-inbox-title">Verifyrit · 7-layer check</span>
          <span className="els-inbox-stat purple">0.3% bounce</span>
        </div>
        <div className="els-bar">
          <span className="seg good-fill" style={{ width: '99.7%' }} />
        </div>
        <div className="els-inbox-tools">
          <span className="els-tool green">Invalids removed ✓</span>
          <span className="els-tool gray">Spam traps caught ✓</span>
          <span className="els-tool gray">Catch-alls flagged ✓</span>
        </div>
      </div>
    </>
  );
}
