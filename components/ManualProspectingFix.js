'use client';

// "The Full Fix" 5-product bento for /manual-prospecting. Mirrors the
// lrr-fix / scd-fix sections: a 6-column grid with two half-width cards on top
// and three third-width cards below, each showing the product that eliminates
// one step of the manual loop with a small animated mock.
//
// Self-contained: cards stagger in once on scroll-in (IntersectionObserver,
// threshold 0.15); the prominent numbers (ICP scores, validated tally, domain
// reputation) are rAF + easeOutCubic counters; the validation/segment bars fill
// via inline width transitions; live dots + tags keep a component-scoped idle
// pulse. No global CSS is touched — every .mp-fx* class is styled in globals.css.
// Reduced motion renders the final resting state.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const EASE = 'ease-out';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ManualProspectingFix() {
  const gridRef = useRef(null);
  const timersRef = useRef([]);
  const rafsRef = useRef([]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [barsRun, setBarsRun] = useState(false);
  const [idle, setIdle] = useState(false);

  const [scoreA, setScoreA] = useState(0); // -> 94
  const [scoreB, setScoreB] = useState(0); // -> 88
  const [validated, setValidated] = useState(0); // -> 44
  const [rep, setRep] = useState(0); // -> 98

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      setReduced(true);
      setInView(true);
      setBarsRun(true);
      setScoreA(94); setScoreB(88); setValidated(44); setRep(98);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;

    const timers = timersRef.current;
    const rafs = rafsRef.current;

    const count = (to, duration, apply) => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        apply(Math.round(to * easeOutCubic(t)));
        if (t < 1) rafs.push(requestAnimationFrame(tick));
      };
      rafs.push(requestAnimationFrame(tick));
    };

    timers.push(setTimeout(() => count(94, 650, setScoreA), 700));
    timers.push(setTimeout(() => count(88, 650, setScoreB), 820));
    timers.push(setTimeout(() => count(44, 750, setValidated), 700));
    timers.push(setTimeout(() => count(98, 750, setRep), 760));
    timers.push(setTimeout(() => setBarsRun(true), 700));
    timers.push(setTimeout(() => setIdle(true), 1500));

    return () => {
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
      timersRef.current = [];
      rafsRef.current = [];
    };
  }, [inView, reduced]);

  const trans = (duration, delay) =>
    reduced ? 'none' : `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`;
  const card = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(18px)',
    transition: trans(480, delay),
    willChange: 'transform, opacity',
  });
  const barFill = (to, delay) => ({
    width: barsRun ? to : '0%',
    transition: reduced ? 'none' : `width 900ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
  });
  const liveDot = idle && !reduced ? ' mp-fx-pulse' : '';

  return (
    <section className="mp-fix">
      <div className="container">
        <div className="mp-fix-head" data-reveal-stagger="100">
          <span className="mp-fix-eyebrow" data-reveal>
            <Icon name="sparkles" aria-hidden="true" />
            The Full Fix
          </span>
          <h2 data-reveal>
            How NeoLeads Replaces Manual<br />
            Prospecting End to End
          </h2>
          <p data-reveal>
            Five steps that used to span five tools and most of a morning &mdash; collapsed into a
            single pipeline that runs in minutes, automatically, without a tab opened outside
            NeoLeads.
          </p>
        </div>

        <div className="mp-fix-grid" ref={gridRef}>

          {/* ---- Card 1: Zeus + NeoBrain ---- */}
          <article className="mp-fix-card c-half" style={card(120)}>
            <div className="mp-fix-card-head">
              <span className="mp-fix-meta">
                <span className="mp-fix-badge">1</span>
                <span className="mp-fix-product">Zeus + NeoBrain AI</span>
              </span>
              <span className="mp-fix-cut">cuts · 3.5 hrs research</span>
            </div>
            <h3 className="mp-fix-title">Find the right people &mdash; in seconds</h3>
            <p className="mp-fix-desc">
              Type a plain-English description of your ideal buyer. Zeus searches continuously
              refreshed, verified records and ranks results by ICP fit and live buying signals.
              Every result arrives with a score and a &ldquo;why now&rdquo; &mdash; not just a name
              and an email.
            </p>
            <div className="mp-fix-mock">
              <div className="mp-fx-search">
                <Icon name="search" aria-hidden="true" />
                <span className="mp-fx-search-q">VP Sales · Series B SaaS · hiring SDRs</span>
                <span className="mp-fx-search-n">47</span>
              </div>
              <div className="mp-fx-row">
                <span className="mp-fx-av av-0" aria-hidden="true">MT</span>
                <span className="mp-fx-row-name">Marcus T. - Raised $18M</span>
                <span className="mp-fx-score">{scoreA}</span>
              </div>
              <div className="mp-fx-row">
                <span className="mp-fx-av av-1" aria-hidden="true">PN</span>
                <span className="mp-fx-row-name">Priya N. - New CRO hired</span>
                <span className="mp-fx-score">{scoreB}</span>
              </div>
            </div>
          </article>

          {/* ---- Card 2: Verifyrit ---- */}
          <article className="mp-fix-card c-half" style={card(200)}>
            <div className="mp-fix-card-head">
              <span className="mp-fix-meta">
                <span className="mp-fix-badge">2</span>
                <span className="mp-fix-product">Verifyrit</span>
              </span>
              <span className="mp-fix-cut">cuts · Manual verification</span>
            </div>
            <h3 className="mp-fix-title">Validate before anything sends</h3>
            <p className="mp-fix-desc">
              Every contact from a Zeus search passes through Verifyrit&rsquo;s 7-layer check before
              entering a campaign. Invalid addresses, catch-all domains, and risky contacts are
              flagged automatically &mdash; no manual verification step required.
            </p>
            <div className="mp-fix-mock">
              <div className="mp-fxm-top">
                <span className="mp-fxm-label">Validated Automatically</span>
                <span className="mp-fx-frac"><span className="mp-fx-frac-num">{validated}</span><span className="mp-fx-frac-den">/47</span></span>
              </div>
              <div className="mp-fx-vbar">
                <span className="fill" style={barFill('94%', 0)} />
                <span className="tail" style={barFill('6%', 0)} />
              </div>
              <div className="mp-fx-vcells">
                <div className="mp-fx-vcell green"><span className="mp-fx-vcell-num">44</span><span className="mp-fx-vcell-lbl">Deliverable</span></div>
                <div className="mp-fx-vcell amber"><span className="mp-fx-vcell-num">2</span><span className="mp-fx-vcell-lbl">Risky</span></div>
                <div className="mp-fx-vcell"><span className="mp-fx-vcell-num">18s</span><span className="mp-fx-vcell-lbl">Processed</span></div>
              </div>
            </div>
          </article>

          {/* ---- Card 3: Sendrit + NeoBrain ---- */}
          <article className="mp-fix-card c-third" style={card(280)}>
            <div className="mp-fix-card-head">
              <span className="mp-fix-meta">
                <span className="mp-fix-badge">3</span>
                <span className="mp-fix-product">Sendrit + NeoBrain AI</span>
              </span>
              <span className="mp-fix-cut">Template writing</span>
            </div>
            <h3 className="mp-fix-title">Launch in one click</h3>
            <p className="mp-fix-desc">
              NeoBrain AI reads the signal on each contact and writes a signal-backed opening line,
              then Sendrit builds the full multichannel sequence. Research-to-campaign time drops
              from hours to minutes.
            </p>
            <div className="mp-fix-mock">
              <div className="mp-fx-firstline">
                <span className="mp-fx-firstline-lbl">
                  <span className={`mp-fx-dot purple${liveDot}`} aria-hidden="true" /> NeoBrain first line
                </span>
                <p className="mp-fx-firstline-text">&ldquo;Saw Acme opened 9 SDR roles after the raise…&rdquo;</p>
              </div>
              <div className="mp-fx-linerow">
                <span className="mp-fx-line-name"><span className="mp-fx-dot green" aria-hidden="true" /> Email + LinkedIn sequence</span>
                <span className="mp-fx-tag green">Live</span>
              </div>
            </div>
          </article>

          {/* ---- Card 4: Warmrit + Snaarpmail ---- */}
          <article className="mp-fix-card c-third" style={card(360)}>
            <div className="mp-fix-card-head">
              <span className="mp-fix-meta">
                <span className="mp-fix-badge">4</span>
                <span className="mp-fix-product">Warmrit + Snaarpmail</span>
              </span>
              <span className="mp-fix-cut">Tool-switching</span>
            </div>
            <h3 className="mp-fix-title">Protect the infrastructure</h3>
            <p className="mp-fix-desc">
              Warmrit keeps the sending domain campaign-ready before a sequence fires. Snaarpmail
              manages inbox placement and replies across every active campaign &mdash; from one
              screen, without inbox-hopping.
            </p>
            <div className="mp-fix-mock">
              <div className="mp-fxm-top">
                <span className="mp-fxm-label">Domain reputation</span>
                <span className="mp-fx-rep">{rep}</span>
              </div>
              <div className="mp-fx-segs">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <span
                    key={i}
                    className="mp-fx-seg"
                    style={{
                      opacity: barsRun ? 1 : 0,
                      transition: reduced ? 'none' : `opacity 260ms ease ${i * 70}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="mp-fx-okrow">
                <Icon name="check" aria-hidden="true" /> One screen · all campaigns
              </div>
            </div>
          </article>

          {/* ---- Card 5: Snaarpmail + NeoBrain ---- */}
          <article className="mp-fix-card c-third" style={card(440)}>
            <div className="mp-fix-card-head">
              <span className="mp-fix-meta">
                <span className="mp-fix-badge">5</span>
                <span className="mp-fix-product">Snaarpmail + NeoBrain AI</span>
              </span>
              <span className="mp-fix-cut">Inbox management</span>
            </div>
            <h3 className="mp-fix-title">Triage replies automatically</h3>
            <p className="mp-fix-desc">
              NeoBrain AI classifies every reply by intent before a human opens it. Interested
              replies surface first, sequences auto-pause on response &mdash; the rep&rsquo;s inbox
              is pre-sorted before they sit down.
            </p>
            <div className="mp-fix-mock">
              <div className="mp-fx-reply">
                <span className="mp-fx-reply-q"><span className={`mp-fx-dot green${liveDot}`} aria-hidden="true" /> &ldquo;This is great timing…&rdquo;</span>
                <span className="mp-fx-tag green">Hot</span>
              </div>
              <div className="mp-fx-reply">
                <span className="mp-fx-reply-q"><span className="mp-fx-dot amber" aria-hidden="true" /> &ldquo;Follow up in Q2&rdquo;</span>
                <span className="mp-fx-tag amber">Nurture</span>
              </div>
              <div className="mp-fx-paused">
                <Icon name="pause" aria-hidden="true" /> Sequence auto-paused on reply
              </div>
            </div>
          </article>

        </div>
      </div>

      <style jsx>{`
        .mp-fx-pulse {
          animation: mpFxPulse 1.8s ease-in-out infinite;
        }
        @keyframes mpFxPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.78); }
        }
      `}</style>
    </section>
  );
}
