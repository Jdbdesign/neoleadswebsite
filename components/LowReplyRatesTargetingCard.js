'use client';

// "Root Cause 1 + 3 · Targeting & Personalization" demo card for /low-reply-rates.
// A scroll-triggered, once-only sequence that plays like a live product demo:
// Zeus loads a contact + surfaces buying signals one by one, then NeoBrain AI
// types the first line character-by-character. Triggered once on scroll-in
// (IntersectionObserver, threshold 0.15, unobserve after firing).
//
// All animation is self-contained here: entrance states are inline opacity/
// transform; the typewriter is a cancellable setTimeout chain; the intent score
// is a rAF + easeOutCubic counter; and all keyframes (border sweep, pops, pill
// flash, idle shimmer, cursor blink, scan line) live in component-scoped
// styled-jsx. No global CSS is touched — the original .lrr-pp-* classes are kept
// for styling. Zero layout shift: the subject/body reserve their full height via
// a transparent "untyped" tail, and the signals row has a reserved min-height.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const SUB_PREFIX = 'Subject: ';
const SUB_TEXT = 'Quick thought on scaling Acme’s SDR team';
const BODY =
  '“Hi Marcus, saw Acme just brought on a new CRO and opened 9 SDR roles in the same week. ' +
  'Most teams hiring that fast hit outbound pipeline walls before the new reps are ramped…”';
const SIGNALS = ['Raised $22M Series B · 9d ago', '9 SDR roles posted · 5d', 'New CRO hired · 12d'];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function LowReplyRatesTargetingCard() {
  const rootRef = useRef(null);
  const pillRefs = useRef([]);
  const timers = useRef([]);
  const rafId = useRef(0);
  const cancelled = useRef(false);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  // entrance flags
  const [labelIn, setLabelIn] = useState(false);
  const [zeusIn, setZeusIn] = useState(false);
  const [avatarIn, setAvatarIn] = useState(false);
  const [nameIn, setNameIn] = useState(false);
  const [roleIn, setRoleIn] = useState(false);
  const [intentLabelIn, setIntentLabelIn] = useState(false);
  const [dividerIn, setDividerIn] = useState(false);
  const [aiLabelIn, setAiLabelIn] = useState(false);
  const [badgeIn, setBadgeIn] = useState(false);
  const [sparkPulse, setSparkPulse] = useState(false);
  const [idle, setIdle] = useState(false);
  const [scanRun, setScanRun] = useState(false);

  const [intent, setIntent] = useState(0);

  // typed-character counts (slices reveal the text; the tail stays transparent)
  const [prefixN, setPrefixN] = useState(0);
  const [textN, setTextN] = useState(0);
  const [bodyN, setBodyN] = useState(0);
  const [cursor, setCursor] = useState('none'); // 'none'|'prefix'|'text'|'body'|'bodygone'
  const [blink, setBlink] = useState(false);

  // pills: max-width drives the "typed out" reveal; child text fades; flash on arrival
  const [pills, setPills] = useState(() => SIGNALS.map(() => ({ mw: '0px', op: 0, tr: 'none', tr2: 'none', flash: false })));
  const setPill = (i, val) =>
    setPills((prev) => prev.map((p, idx) => (idx === i ? (typeof val === 'function' ? val(p) : val) : p)));

  // cancellable wait built on tracked setTimeout
  const wait = (ms) =>
    new Promise((res) => {
      const id = setTimeout(res, ms);
      timers.current.push(id);
    });

  // ---- trigger once on scroll-in ----
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    if (prefersReduced || !hasIO) {
      // render the fully-settled final state, no animation
      setReduced(true);
      setInView(true);
      setLabelIn(true); setZeusIn(true); setAvatarIn(true); setNameIn(true); setRoleIn(true);
      setIntent(94); setIntentLabelIn(true); setDividerIn(true); setAiLabelIn(true); setBadgeIn(true);
      setPrefixN(SUB_PREFIX.length); setTextN(SUB_TEXT.length); setBodyN(BODY.length);
      setPills(SIGNALS.map(() => ({ mw: 'none', op: 1, tr: 'none', tr2: 'none', flash: false })));
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

  // ---- the choreography ----
  useEffect(() => {
    if (!inView || reduced) return;
    cancelled.current = false;
    const tm = (d, fn) => timers.current.push(setTimeout(fn, d));

    // Phase 2 — contact identity loads
    tm(400, () => setLabelIn(true));
    tm(450, () => setZeusIn(true));
    tm(500, () => setAvatarIn(true));
    tm(600, () => setNameIn(true));
    tm(680, () => setRoleIn(true));
    tm(650, () => startIntent());

    // Phase 3 — buying signals surface one by one (scan line, then pills)
    tm(1100, () => setScanRun(true));
    tm(1100, () => expandPill(0));
    tm(1450, () => expandPill(1));
    tm(1800, () => expandPill(2));

    // Phase 4 — divider + AI label, then the cursor primes in the subject line
    tm(2200, () => { setDividerIn(true); setAiLabelIn(true); });
    tm(2400, () => { setCursor('prefix'); setBlink(true); });

    // Phases 5-8 — typewriter, attribution, idle
    tm(2700, () => { runTyping(); });

    return () => {
      cancelled.current = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      cancelAnimationFrame(rafId.current);
    };
  }, [inView, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  function startIntent() {
    const start = performance.now();
    const dur = 700;
    const frame = (now) => {
      if (cancelled.current) return;
      const t = Math.min(1, (now - start) / dur);
      const v = Math.round(94 * easeOutCubic(t));
      setIntent(v);
      if (v >= 80) setIntentLabelIn(true);
      if (t < 1) rafId.current = requestAnimationFrame(frame);
    };
    rafId.current = requestAnimationFrame(frame);
  }

  function expandPill(i) {
    const el = pillRefs.current[i];
    const w = el ? el.scrollWidth + 3 : 220; // scrollWidth ignores the max-width clamp
    setPill(i, { mw: `${w}px`, op: 1, tr: 'max-width 300ms cubic-bezier(0.4, 0, 0.2, 1)', tr2: 'opacity 150ms ease 150ms', flash: true });
    timers.current.push(setTimeout(() => setPill(i, (p) => ({ ...p, flash: false })), 160));
  }

  // typewriter — setTimeout chain via wait(); micro-pauses keyed on the previous char
  async function typeCount(text, setN, speed, micro) {
    for (let i = 1; i <= text.length; i++) {
      if (cancelled.current) return;
      const prev = text[i - 2];
      let d = speed;
      if (micro) { if (prev === '—') d = 180; else if (prev === ',') d = 120; }
      await wait(d);
      if (cancelled.current) return;
      setN(i);
    }
  }

  async function runTyping() {
    // Phase 5 — subject types (prefix slower, subject text picks up pace)
    setBlink(false);
    await typeCount(SUB_PREFIX, setPrefixN, 28, false); if (cancelled.current) return;
    setCursor('text');
    await typeCount(SUB_TEXT, setTextN, 22, false); if (cancelled.current) return;

    // Phase 6 — pause (cursor blinks twice), then body types
    setBlink(true);
    await wait(600); if (cancelled.current) return;
    setCursor('body'); setBlink(false);
    await typeCount(BODY, setBodyN, 16, true); if (cancelled.current) return;

    // cursor blinks a few times, then fades
    setBlink(true);
    await wait(1100); if (cancelled.current) return;
    setCursor('bodygone');

    // Phase 7 — attribution badge
    await wait(400); if (cancelled.current) return;
    setBadgeIn(true); setSparkPulse(true);

    // Phase 8 — idle loops
    await wait(400); if (cancelled.current) return;
    setIdle(true);
  }

  const fade = (on, dur, from) => ({
    opacity: on ? 1 : 0,
    transform: from ? (on ? 'none' : from) : undefined,
    transition: reduced ? 'none' : from ? `opacity ${dur}ms ease-out, transform ${dur}ms ease-out` : `opacity ${dur}ms ease-out`,
  });

  const cursorSpan = (gone) => (
    <span
      className={`pp-cursor${blink ? ' blink' : ''}`}
      aria-hidden="true"
      style={gone ? { opacity: 0, transition: 'opacity 300ms ease' } : undefined}
    />
  );

  return (
    <div
      ref={rootRef}
      className={`lrr-pp-card${inView && !reduced ? ' pp-sweep' : ''}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: reduced ? 'none' : 'opacity 500ms ease-out, transform 500ms ease-out',
        minHeight: 480,
        willChange: 'transform, opacity',
      }}
    >
      <div className="lrr-pp-card-top">
        <span className="lrr-pp-eyebrow" style={fade(labelIn, 300)}>Why this contact was targeted</span>
        <span className={`lrr-pp-zeus${zeusIn ? ' pp-zeus-pop' : ''}`} style={zeusIn ? undefined : { opacity: 0 }}>Zeus</span>
      </div>

      <div className="lrr-pp-contact">
        <span
          className={`lrr-contact-av purple${avatarIn ? ' pp-avatar-pop' : ''}`}
          style={avatarIn ? undefined : { opacity: 0, transform: 'scale(0)' }}
        >
          MT
        </span>
        <div className="lrr-pp-id">
          <div className="lrr-pp-name" style={fade(nameIn, 300, 'translateX(-8px)')}>Marcus T.</div>
          <div className="lrr-pp-role" style={fade(roleIn, 300, 'translateX(-8px)')}>VP Sales · Acme Corp</div>
        </div>
        <div className="lrr-pp-intent">
          <span className={`lrr-pp-intent-num${idle ? ' pp-intent-idle' : ''}`} style={{ willChange: 'opacity' }}>{intent}</span>
          <span className="lrr-pp-intent-lbl" style={fade(intentLabelIn, 200)}>High Intent</span>
        </div>
      </div>

      <div className="pp-signals-wrap">
        <span className={`pp-scan${scanRun ? ' run' : ''}`} aria-hidden="true" />
        <div className="lrr-pp-signals">
          {SIGNALS.map((s, i) => (
            <span
              key={s}
              ref={(el) => { pillRefs.current[i] = el; }}
              className={`lrr-pp-sig${pills[i].flash ? ' pp-sig-flash' : ''}${idle ? ` pp-sig-idle-${i + 1}` : ''}`}
              style={{ maxWidth: pills[i].mw, overflow: 'hidden', whiteSpace: 'nowrap', boxSizing: 'border-box', transition: reduced ? 'none' : pills[i].tr, willChange: 'transform, opacity' }}
            >
              <span style={{ opacity: reduced ? 1 : pills[i].op, transition: reduced ? 'none' : pills[i].tr2 }}>{s}</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="lrr-pp-divider"
        aria-hidden="true"
        style={{ transform: dividerIn ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: reduced ? 'none' : 'transform 400ms ease-out', willChange: 'transform' }}
      />

      <span className="lrr-pp-eyebrow purple" style={fade(aiLabelIn, 300)}>AI-Generated First Line</span>

      <div className="lrr-pp-subject">
        <span className="pp-subject-prefix">
          {SUB_PREFIX.slice(0, prefixN)}
          {cursor === 'prefix' && cursorSpan(false)}
          <span style={{ color: 'transparent' }}>{SUB_PREFIX.slice(prefixN)}</span>
        </span>
        <span className="pp-subject-text">
          {SUB_TEXT.slice(0, textN)}
          {cursor === 'text' && cursorSpan(false)}
          <span style={{ color: 'transparent' }}>{SUB_TEXT.slice(textN)}</span>
        </span>
      </div>

      <p className="lrr-pp-quote">
        {BODY.slice(0, bodyN)}
        {(cursor === 'body' || cursor === 'bodygone') && cursorSpan(cursor === 'bodygone')}
        <span style={{ color: 'transparent' }}>{BODY.slice(bodyN)}</span>
      </p>

      <span className="lrr-pp-tag" style={fade(badgeIn, 350, 'translateY(8px)')}>
        <span className={sparkPulse ? 'pp-spark' : undefined} style={{ display: 'inline-flex' }}>
          <Icon name="sparkles" aria-hidden="true" />
        </span>
        {' '}NeoBrain AI: researched from 3 signals
      </span>

      <style jsx>{`
        /* Phase 1 — one-time border "activating" sweep, settles back to standard */
        .pp-sweep { animation: ppSweep 800ms ease-out; }
        @keyframes ppSweep {
          0% { border-color: var(--bg-card-border); }
          50% { border-color: rgba(124, 58, 237, 0.7); }
          100% { border-color: var(--bg-card-border); }
        }

        /* Phase 2 — confident pops */
        .pp-zeus-pop { animation: ppZeusPop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes ppZeusPop { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .pp-avatar-pop { animation: ppAvatarPop 350ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes ppAvatarPop { 0% { transform: scale(0); opacity: 0; } 35% { opacity: 1; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }

        /* Phase 3 — scan line + pill flash */
        .pp-signals-wrap { position: relative; overflow: hidden; min-height: 66px; }
        .pp-scan { position: absolute; left: 0; top: 9px; height: 1px; width: 100%; background: rgba(124, 58, 237, 0.3); transform: translateX(-100%); opacity: 0; pointer-events: none; }
        .pp-scan.run { animation: ppScan 400ms ease-in-out forwards; }
        @keyframes ppScan { 0% { transform: translateX(-100%); opacity: 1; } 100% { transform: translateX(100%); opacity: 1; } }
        .pp-sig-flash { animation: ppSigFlash 120ms ease-out; }
        @keyframes ppSigFlash { 0% { background: rgba(255, 255, 255, 0.03); } 45% { background: rgba(255, 255, 255, 0.13); } 100% { background: rgba(255, 255, 255, 0.03); } }

        /* Phase 5/6 — subject colour split + typing cursor */
        .pp-subject-prefix { color: var(--text-muted); font-weight: 600; }
        .pp-subject-text { color: #fff; font-weight: 700; }
        .pp-cursor { display: inline-block; width: 0; height: 1em; margin-left: 1px; border-right: 2px solid #7C3AED; vertical-align: -2px; }
        .pp-cursor.blink { animation: ppCursorBlink 530ms step-end infinite; }
        @keyframes ppCursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Phase 7 — spark pulse */
        .pp-spark { animation: ppSpark 300ms ease-out; }
        .pp-spark :global(.lucide) { transform-origin: center; }
        @keyframes ppSpark { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }

        /* Phase 8 — idle (opacity only, offset loops so they never pulse together) */
        .pp-intent-idle { animation: ppIntentPulse 4s ease-in-out infinite; }
        @keyframes ppIntentPulse { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        .pp-sig-idle-1 { animation: ppShimmer 5s ease-in-out infinite; }
        .pp-sig-idle-2 { animation: ppShimmer 6s ease-in-out infinite 0.4s; }
        .pp-sig-idle-3 { animation: ppShimmer 7s ease-in-out infinite 0.9s; }
        @keyframes ppShimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      `}</style>
    </div>
  );
}
