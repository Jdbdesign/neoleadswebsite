'use client';

// "Verifyrit Catches What Standard Verification Misses" section for
// /high-bounce-rates. The deep-dive payoff to root causes 1 + 2 (stale data and
// catch-all addresses): a two-column block whose right side is an animated
// pre-campaign scan that plays once when it scrolls into view.
//
// Timeline (skipped under prefers-reduced-motion, which jumps to the final
// state): a 7-layer progress bar sweeps 0 -> 100% over SCAN_MS while the four
// result rows reveal in sequence; on completion the badge flips from "Running"
// to "Cleared", the bounce-rate forecast counts up, and the authorise block
// fades in. Fires once, mirroring HighBounceRatesScripts' count-up bands.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const SCAN_MS = 2600;
const REVEAL_AT = [600, 1080, 1560, 2040]; // when each result row appears

const RESULTS = [
  {
    tone: 'green',
    icon: 'circle-check',
    count: '912',
    label: 'Deliverable',
    sub: '7 / 7 checks passed',
  },
  {
    tone: 'red',
    icon: 'circle-x',
    count: '41',
    label: 'Invalid',
    sub: 'Domain inactive / user unknown',
  },
  {
    tone: 'amber',
    icon: 'triangle-alert',
    count: '35',
    label: 'Risky, catch-all detected',
    sub: '22 resolved deliverable · 13 undeliverable',
  },
  {
    tone: 'red',
    icon: 'ban',
    count: '12',
    label: 'Spam Trap',
    sub: 'Removed, not in Sendrit',
  },
];

export default function HighBounceRatesVerifyMiss() {
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);

  const panelRef = useRef(null);
  const fillRef = useRef(null);
  const forecastRef = useRef(null);

  // Kick the scan off once, the first time the panel scrolls into view.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const fill = fillRef.current;
    const forecast = forecastRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: present the finished verdict with no animation.
    if (reduced) {
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '100%';
      }
      if (forecast) forecast.textContent = '0.3%';
      setRevealed(RESULTS.length);
      setDone(true);
      return;
    }

    // Sweep the progress bar 0 -> 100% over the scan.
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      void fill.offsetWidth; // commit the reset before animating
      fill.style.transition = `width ${SCAN_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      fill.style.width = '100%';
    }

    // Reveal each result row in sequence as the check runs.
    const timers = REVEAL_AT.map((t, i) =>
      setTimeout(() => setRevealed((r) => Math.max(r, i + 1)), t)
    );

    // Finish: flip to the cleared state and count the forecast up.
    let raf = 0;
    timers.push(
      setTimeout(() => {
        setRevealed(RESULTS.length);
        setDone(true);
        if (forecast) {
          const to = 0.3;
          const dur = 900;
          let start = 0;
          const frame = (now) => {
            if (!start) start = now;
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            forecast.textContent = (to * eased).toFixed(1) + '%';
            if (p < 1) raf = requestAnimationFrame(frame);
          };
          raf = requestAnimationFrame(frame);
        }
      }, SCAN_MS)
    );

    return () => {
      timers.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [started]);

  return (
    <section className="hbr-miss">
      <div className="container">
        <div className="hbr-miss-grid">

          {/* ---------- left: copy ---------- */}
          <div className="hbr-miss-copy" data-reveal-stagger="100">
            <span className="hbr-miss-eyebrow" data-reveal>
              <span className="hbr-miss-rule" aria-hidden="true" />
              Root Cause 1 + 2: Stale Data &amp; Catch-All Addresses
            </span>
            <h2 data-reveal>
              Verifyrit Catches What Standard Verification Misses.{' '}
              <span className="hbr-miss-accent">Every Time, Before Every Send.</span>
            </h2>
            <p className="hbr-miss-lead" data-reveal>
              Most verification tools run a basic SMTP ping: they check whether a domain exists and
              whether the server responds. That catches obvious invalid addresses but misses the two
              most common sources of B2B bounce spikes: data that was valid at import but decayed
              since, and catch-all domains that accept all inbound mail at server level but
              hard-bounce for individual mailboxes that don&rsquo;t exist. Verifyrit runs 7 checks,
              including catch-all resolution and continuous re-verification, so neither makes it into
              a campaign.
            </p>

            <div className="hbr-miss-points" data-reveal>
              <div className="hbr-miss-point">
                <span className="hbr-miss-point-ic" aria-hidden="true">
                  <Icon name="scan-search" />
                </span>
                <div className="hbr-miss-point-body">
                  <h3>Catch-All Resolution Beyond SMTP</h3>
                  <p>
                    When Verifyrit encounters a catch-all domain, it doesn&rsquo;t mark it
                    &ldquo;valid&rdquo; and move on. It runs additional checks to determine whether
                    the specific mailbox actually exists, returning a definitive deliverable or
                    undeliverable verdict rather than leaving 23&ndash;31% of a typical B2B list in a
                    high-risk grey zone.
                  </p>
                </div>
              </div>

              <div className="hbr-miss-point">
                <span className="hbr-miss-point-ic" aria-hidden="true">
                  <Icon name="refresh-cw" />
                </span>
                <div className="hbr-miss-point-body">
                  <h3>Continuous Re-Verification Between Campaigns</h3>
                  <p>
                    A list verified before October&rsquo;s campaign has already degraded before
                    January&rsquo;s. Verifyrit re-validates saved lists automatically between
                    campaigns, flagging addresses that have gone invalid since the last send without
                    anyone needing to schedule a manual cleaning run.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- right: animated pre-campaign scan ---------- */}
          <div className="hbr-miss-visual" data-reveal>
            <div
              className={`hbr-scan${done ? ' is-done' : ''}`}
              ref={panelRef}
              aria-hidden="true"
            >
              <div className="hbr-scan-head">
                <span className="hbr-scan-id">
                  <Icon name="shield-check" />
                  Verifyrit, Pre-Campaign Check
                </span>
                <span className={`hbr-scan-badge${done ? ' is-done' : ''}`}>
                  {done ? (
                    <>
                      <Icon name="check" />
                      Cleared
                    </>
                  ) : (
                    <>
                      <span className="hbr-scan-dot" />
                      Running
                    </>
                  )}
                </span>
              </div>

              <div className="hbr-scan-job">
                <div className="hbr-scan-job-title">Q4 SaaS Outreach: 1,000 contacts</div>
                <div className="hbr-scan-job-sub">Last verified: 7 months ago</div>
              </div>

              <div className="hbr-scan-bar">
                <span className="hbr-scan-bar-fill" ref={fillRef} />
              </div>
              <div className="hbr-scan-status">
                {done ? '7-layer check complete' : 'Running 7-layer check…'}
              </div>

              <div className="hbr-scan-results-label">Results</div>
              <div className="hbr-scan-results">
                {RESULTS.map((r, i) => (
                  <div
                    key={r.label}
                    className={`hbr-scan-result ${r.tone}${i < revealed ? ' is-in' : ''}`}
                  >
                    <span className="hbr-scan-result-ic">
                      <Icon name={r.icon} />
                    </span>
                    <div className="hbr-scan-result-main">
                      <div className="hbr-scan-result-top">
                        <b>{r.count}</b> {r.label}
                      </div>
                      <div className="hbr-scan-result-sub">{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`hbr-scan-forecast${done ? ' is-in' : ''}`}>
                <div className="hbr-scan-forecast-row">
                  <span className="hbr-scan-forecast-label">Bounce rate forecast</span>
                  <span className="hbr-scan-forecast-est">
                    unverified est. <b>8.8%</b>
                  </span>
                </div>
                <div className="hbr-scan-forecast-num" ref={forecastRef}>0.3%</div>
                <div className="hbr-scan-authorise">
                  <Icon name="circle-check" />
                  934 cleared · Sendrit campaign authorised
                </div>
                <div className="hbr-scan-foot">
                  *67 new invalids detected since October, caught before send
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
