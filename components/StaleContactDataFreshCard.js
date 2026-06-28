'use client';

// "Zeus · NeoBrain AI — Start fresh, every time" card (card 1 of the
// /stale-contact-data "Full Fix" bento). The OUTER card (badge, heading, body)
// runs a one-time scroll entrance and then never moves again. The INNER dark
// panel (".scd-fix-demo") then loops continuously, demonstrating Zeus
// re-verifying contacts and refreshing signal data in real time.
//
// Loop narrative — 4 acts per cycle:
//   ACT 1 — Contact A (Marcus T.) loads, the "VERIFIED" timestamp ticks down
//           live (3 → 2 → 1 MIN AGO → JUST NOW), the green LIVE SIGNAL dot blinks.
//   ACT 2 — Zeus re-runs: panel enters a "REFRESHING…" state, a scan line sweeps,
//           signals age one-by-one, a brand-new 4th signal slides in.
//   ACT 3 — Contact B (Sofia R.) surfaces from a different segment after a scan.
//   ACT 4 — System scans back to Contact A (continuous-monitoring signal).
//   HOLD + RESET.
//
// Per the brief, the loop is DOM-driven, not React-driven: every mutation goes
// through ref.current.style / textContent so the component never re-renders per
// cycle (the only React state is the one-time outer-card entrance). A single
// recursive runFreshCycle() drives every beat with tracked setTimeout / rAF ids;
// a `cancelled` ref breaks the recursion on unmount and clears all timers.
//
// The card keeps `data-reveal data-reveal-skip` so the global reveal engine
// reveals its frame instantly and hands off — siblings keep their stagger
// indices. No global CSS is touched: original .scd-fix-* / .scd-deep-av classes
// style the frame; only the bespoke motion + two dot keyframes live here.

import { useEffect, useRef, useState } from 'react';

const CONTACTS = {
  A_initial: {
    initials: 'MT',
    avatarColor: '#7C3AED',
    name: 'Marcus T.',
    role: 'VP Sales · Acme Corp',
    score: 94,
    signals: ['Raised $22M · 9d', '9 SDR roles · 5d', 'New CRO · 12d'],
  },
  A_refreshed: {
    signals: ['Raised $22M · 10d', '9 SDR roles · 6d', 'New CRO · 13d'],
    newSignal: 'Hiring VP Mktg · Just now',
  },
  B: {
    initials: 'SR',
    avatarColor: '#6D28D9',
    name: 'Sofia R.',
    role: 'Head of Growth · Meridian',
    score: 87,
    signals: ['Series A closed · 3d', 'CMO departed · 8d', 'Job spike +340% · 6d'],
  },
};

const TIMESTAMP_STATES = [
  'VERIFIED 3 MIN AGO',
  'VERIFIED 2 MIN AGO',
  'VERIFIED 1 MIN AGO',
  'VERIFIED JUST NOW',
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;

export default function StaleContactDataFreshCard() {
  // outer-card entrance is the only React state (one render, never during loop)
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  // --- frame refs ---
  const rootRef = useRef(null);
  const mockRef = useRef(null);
  const headerLabelRef = useRef(null);
  const liveWrapRef = useRef(null);
  const liveDotRef = useRef(null);
  const zeusRef = useRef(null);
  const scanRef = useRef(null);

  // --- contact refs (mutated imperatively) ---
  const avatarRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const intentWrapRef = useRef(null);
  const scoreRef = useRef(null);
  const intentLblRef = useRef(null);
  const sigRefs = useRef([]);
  const sigTextRefs = useRef([]);
  const newPillRef = useRef(null);
  const newDotRef = useRef(null);

  // --- loop bookkeeping ---
  const cancelled = useRef(false);
  const hasEntered = useRef(false);
  const timeouts = useRef(new Set());
  const rafs = useRef(new Set());

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Reset loop-control refs each effect run (React 18 StrictMode dev double-mount).
    cancelled.current = false;
    hasEntered.current = false;
    const timeoutsArr = timeouts.current;
    const rafsArr = rafs.current;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // ---- tiny utilities ----
    const node = (r) => (r && r.current !== undefined ? r.current : r);
    const set = (r, obj) => { const n = node(r); if (n) Object.assign(n.style, obj); };
    const reflow = (r) => { const n = node(r); if (n) void n.offsetWidth; };
    const pause = (ms) => new Promise((res) => {
      const id = setTimeout(() => { timeoutsArr.delete(id); res(); }, ms);
      timeoutsArr.add(id);
    });
    const at = (ms, fn) => {
      const id = setTimeout(() => {
        timeoutsArr.delete(id);
        if (!cancelled.current) fn();
      }, ms);
      timeoutsArr.add(id);
    };
    // animate from current committed state -> final using a CSS transition
    const animate = (r, final, transition) => {
      const n = node(r);
      if (!n) return;
      reflow(n);
      n.style.transition = transition;
      Object.assign(n.style, final);
    };

    const WILL_REFS = [avatarRef, nameRef, roleRef, intentWrapRef, scoreRef, newPillRef, scanRef, headerLabelRef];
    const setWill = (on) => {
      const v = on ? 'transform, opacity' : 'auto';
      WILL_REFS.forEach((r) => { if (r.current) r.current.style.willChange = v; });
      sigRefs.current.forEach((el) => { if (el) el.style.willChange = v; });
    };

    // ---- rAF counter (up = entrance, down = exit) ----
    const countTo = (from, to, dur, easing, onTick) => new Promise((res) => {
      const elS = scoreRef.current;
      if (!elS) return res();
      const start = performance.now();
      const frame = (now) => {
        if (cancelled.current) return res();
        const t = Math.min(1, (now - start) / dur);
        const v = Math.round(from + (to - from) * easing(t));
        elS.textContent = String(v);
        if (onTick) onTick(v);
        if (t < 1) { const id = requestAnimationFrame(frame); rafsArr.add(id); }
        else { elS.textContent = String(to); res(); }
      };
      const id = requestAnimationFrame(frame);
      rafsArr.add(id);
    });

    // ---- data binding ----
    const setContactData = (c) => {
      if (avatarRef.current) {
        avatarRef.current.textContent = c.initials;
        avatarRef.current.style.background = c.avatarColor;
      }
      if (nameRef.current) nameRef.current.textContent = c.name;
      if (roleRef.current) roleRef.current.textContent = c.role;
      sigTextRefs.current.forEach((t, i) => { if (t) t.textContent = c.signals[i]; });
    };

    // ---- reset the contact portion to its pre-entrance state (no animation) ----
    const prepContact = (c) => {
      setContactData(c);
      set(avatarRef, { transition: 'none', opacity: '0', transform: 'scale(0)' });
      set(nameRef, { transition: 'none', opacity: '0', transform: 'translateX(-8px)' });
      set(roleRef, { transition: 'none', opacity: '0', transform: 'none' });
      set(intentWrapRef, { transition: 'none', opacity: '0', transform: 'translateY(8px)' });
      if (scoreRef.current) scoreRef.current.textContent = '0';
      set(scoreRef, { transition: 'none', opacity: '1', transform: 'scale(1)' });
      set(intentLblRef, { transition: 'none', opacity: '0' });
      sigRefs.current.forEach((el, i) => {
        set(el, { transition: 'none', opacity: '0', maxWidth: '0px', overflow: 'hidden', whiteSpace: 'nowrap', filter: 'brightness(1)' });
        const t = sigTextRefs.current[i];
        if (t) { t.style.transition = 'none'; t.style.opacity = '1'; }
      });
      set(newPillRef, { transition: 'none', opacity: '0', maxWidth: '0px', overflow: 'hidden', transform: 'translateX(16px)' });
      if (newDotRef.current) { newDotRef.current.classList.remove('pulse'); set(newDotRef, { transition: 'none', opacity: '0', transform: 'scale(0)' }); }
    };

    // ---- full instant reset (contact + header + scan + live dot) ----
    const resetInstant = () => {
      prepContact(CONTACTS.A_initial);
      set(scanRef, { transition: 'none', opacity: '0', transform: 'translateY(0)' });
      if (headerLabelRef.current) {
        headerLabelRef.current.textContent = 'VERIFIED TODAY';
        set(headerLabelRef, { transition: 'none', opacity: '1' });
      }
      set(liveWrapRef, { transition: 'none', opacity: '1' });
      if (liveDotRef.current) { liveDotRef.current.classList.remove('pulse'); set(liveDotRef, { transition: 'none', opacity: '0', transform: 'scale(0)' }); }
    };

    // ---- header label state machine (cross-fade swap) ----
    const setLabel = (text) => {
      const n = headerLabelRef.current;
      if (!n) return;
      n.style.transition = 'opacity 150ms ease';
      n.style.opacity = '0';
      at(150, () => { if (headerLabelRef.current) { headerLabelRef.current.textContent = text; headerLabelRef.current.style.opacity = '1'; } });
    };

    // ---- "· LIVE SIGNAL" group + green dot ----
    const hideLive = () => {
      animate(liveWrapRef, { opacity: '0' }, 'opacity 150ms ease');
      if (liveDotRef.current) { liveDotRef.current.classList.remove('pulse'); set(liveDotRef, { opacity: '0', transform: 'scale(0)' }); }
    };
    const appearDot = (ref) => {
      const n = ref.current;
      if (!n) return;
      n.classList.remove('pulse');
      n.style.transition = 'none';
      n.style.opacity = '0';
      n.style.transform = 'scale(0)';
      reflow(n);
      n.style.transition = 'opacity 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1)';
      n.style.opacity = '1';
      n.style.transform = 'scale(1)';
    };
    const pulseDot = (ref, cycle, count) => {
      const n = ref.current;
      if (!n) return;
      n.classList.add('pulse');
      at(cycle * count + 40, () => { if (n) { n.classList.remove('pulse'); n.style.opacity = '1'; } });
    };
    const revealLiveSteady = () => {
      animate(liveWrapRef, { opacity: '1' }, 'opacity 200ms ease');
      appearDot(liveDotRef);
    };
    const revealLiveBlink = () => {
      animate(liveWrapRef, { opacity: '1' }, 'opacity 200ms ease');
      appearDot(liveDotRef);
      at(200, () => pulseDot(liveDotRef, 1200, 2));
    };

    // ---- live timestamp ticker (the signature "live data" moment) ----
    const runTimestampTicker = async () => {
      const n = headerLabelRef.current;
      if (!n) return;
      n.style.transition = 'opacity 150ms ease';
      for (const label of TIMESTAMP_STATES) {
        if (cancelled.current) return;
        n.style.opacity = '0';
        await pause(150);
        if (cancelled.current) return;
        n.textContent = label;
        n.style.opacity = '1';
        await pause(800);
      }
    };

    // ---- signal pill width reveal (staggered, with arrival flash) ----
    const expandPill = (i) => {
      const elP = sigRefs.current[i];
      if (!elP) return;
      const full = elP.scrollWidth + 2;
      elP.style.filter = 'brightness(1.3)';
      reflow(elP);
      elP.style.transition = 'max-width 280ms cubic-bezier(0.4,0,0.2,1), opacity 280ms cubic-bezier(0.4,0,0.2,1), filter 120ms ease';
      elP.style.maxWidth = full + 'px';
      elP.style.opacity = '1';
      at(100, () => { if (elP) elP.style.filter = 'brightness(1)'; });
      at(300, () => { if (elP && !cancelled.current) elP.style.maxWidth = 'none'; });
    };

    // ---- ACT-2: a single signal pill's text ages in place ----
    const updatePillText = (i, text) => {
      const t = sigTextRefs.current[i];
      if (!t) return;
      t.style.transition = 'opacity 150ms ease';
      t.style.opacity = '0';
      at(150, () => { if (t && !cancelled.current) { t.textContent = text; t.style.opacity = '1'; } });
    };

    // ---- ACT-2: the brand-new 4th signal pill slides in from the right ----
    const appearNewPill = () => {
      const n = newPillRef.current;
      if (!n) return;
      const full = n.scrollWidth + 2;
      n.style.transition = 'none';
      n.style.maxWidth = '0px';
      n.style.opacity = '0';
      n.style.transform = 'translateX(16px)';
      n.style.overflow = 'hidden';
      reflow(n);
      n.style.transition = 'max-width 300ms ease-out, opacity 300ms ease-out, transform 300ms ease-out';
      n.style.maxWidth = full + 'px';
      n.style.opacity = '1';
      n.style.transform = 'translateX(0)';
      at(300, () => { if (n && !cancelled.current) n.style.maxWidth = 'none'; });
      appearDot(newDotRef);
      at(220, () => pulseDot(newDotRef, 1000, 2));
    };

    // ---- Zeus scan line sweep (top -> bottom across the panel) ----
    const scanSweep = async (color, dur, onStart) => {
      const h = mockRef.current ? mockRef.current.offsetHeight : 120;
      const n = scanRef.current;
      if (onStart) onStart();
      if (n) {
        n.style.transition = 'none';
        n.style.background = color;
        n.style.opacity = '1';
        n.style.transform = 'translateY(0)';
        reflow(n);
        n.style.transition = `transform ${dur}ms ease-in-out`;
        n.style.transform = `translateY(${h}px)`;
      }
      await pause(dur);
      if (n) { n.style.transition = 'opacity 150ms ease'; n.style.opacity = '0'; }
    };

    const zeusPing = () => {
      const n = zeusRef.current;
      if (!n) return;
      n.classList.remove('ping');
      reflow(n);
      n.classList.add('ping');
      at(500, () => { if (n) n.classList.remove('ping'); });
    };

    // ---- a contact rises into the panel (shared by ACT 1 / 3 / 4) ----
    const enterContact = async (c, fast) => {
      prepContact(c);
      setWill(true);
      const aD = fast ? 300 : 380;
      const nD = fast ? 240 : 300;
      const rD = fast ? 200 : 250;
      const sD = fast ? 450 : 650;
      animate(avatarRef, { opacity: '1', transform: 'scale(1)' }, `opacity ${aD}ms ease, transform ${aD}ms cubic-bezier(0.34,1.56,0.64,1)`);
      animate(intentWrapRef, { opacity: '1', transform: 'translateY(0)' }, `opacity ${aD}ms ease, transform ${aD}ms ease-out`);
      await pause(80);
      animate(nameRef, { opacity: '1', transform: 'translateX(0)' }, `opacity ${nD}ms ease, transform ${nD}ms ease-out`);
      await pause(80);
      animate(roleRef, { opacity: '1' }, `opacity ${rD}ms ease`);
      // score counts up (~150ms after avatar) — INTENT label fades in past 70
      let lblShown = false;
      await countTo(0, c.score, sD, easeOutCubic, (v) => {
        if (!lblShown && v >= 70) { lblShown = true; animate(intentLblRef, { opacity: '1' }, 'opacity 200ms ease'); }
      });
      // pills expand one-by-one after the score lands
      expandPill(0);
      await pause(fast ? 120 : 160);
      expandPill(1);
      await pause(fast ? 120 : 160);
      expandPill(2);
      await pause(fast ? 180 : 280);
      setWill(false);
    };

    // ---- a contact files away upward (shared by ACT 3 / 4) ----
    const exitContact = async (fromScore, fast, hasNew) => {
      setWill(true);
      const pD = fast ? 140 : 180;
      sigRefs.current.forEach((elP) => {
        if (!elP) return;
        elP.style.maxWidth = elP.scrollWidth + 'px';
        animate(elP, { maxWidth: '0px', opacity: '0' }, `max-width ${pD}ms ease-in, opacity ${pD}ms ease-in`);
      });
      if (hasNew && newPillRef.current) {
        const n = newPillRef.current;
        n.style.maxWidth = n.scrollWidth + 'px';
        animate(n, { maxWidth: '0px', opacity: '0', transform: 'translateX(16px)' }, `max-width ${pD}ms ease-in, opacity 200ms ease-in, transform 200ms ease-in`);
        if (newDotRef.current) { newDotRef.current.classList.remove('pulse'); newDotRef.current.style.opacity = '0'; }
      }
      countTo(fromScore, 0, fast ? 200 : 250, easeInCubic);
      animate(intentLblRef, { opacity: '0' }, 'opacity 150ms ease');
      await pause(fast ? 120 : 170);
      const uD = fast ? 220 : 280;
      [avatarRef, nameRef, roleRef, intentWrapRef].forEach((r) => {
        animate(r, { opacity: '0', transform: 'translateY(-14px)' }, `opacity ${uD}ms ease-in, transform ${uD}ms ease-in`);
      });
      await pause(uD);
      setWill(false);
    };

    // ================= ACT 2 — Zeus re-runs (refresh) =================
    const act2Refresh = async () => {
      setLabel('REFRESHING…');
      hideLive();
      await pause(220);
      if (cancelled.current) return;
      // panel dims while data is re-checked
      sigRefs.current.forEach((elP) => animate(elP, { opacity: '0.45' }, 'opacity 400ms ease'));
      animate(scoreRef, { opacity: '0.45' }, 'opacity 400ms ease');
      animate(avatarRef, { opacity: '0.6' }, 'opacity 400ms ease');
      await scanSweep('rgba(124,58,237,0.25)', 500);
      if (cancelled.current) return;
      // signals age one-by-one (80ms stagger), restoring brightness as they update
      for (let i = 0; i < 3; i++) {
        updatePillText(i, CONTACTS.A_refreshed.signals[i]);
        animate(sigRefs.current[i], { opacity: '1' }, 'opacity 250ms ease');
        await pause(80);
      }
      await pause(220);
      if (cancelled.current) return;
      appearNewPill();
      await pause(300);
      // panel restores; score re-confirms with a single pulse
      animate(avatarRef, { opacity: '1' }, 'opacity 300ms ease');
      animate(scoreRef, { opacity: '1' }, 'opacity 300ms ease');
      at(300, () => {
        animate(scoreRef, { transform: 'scale(1.06)' }, 'transform 110ms ease-out');
        at(110, () => animate(scoreRef, { transform: 'scale(1)' }, 'transform 110ms ease-out'));
      });
      setLabel('JUST VERIFIED');
      at(360, () => revealLiveBlink());
      await pause(1200);
    };

    // ---- animated reset (everything fades out together) ----
    const resetAnimated = async () => {
      [avatarRef, nameRef, roleRef, intentWrapRef, newPillRef, liveWrapRef, headerLabelRef].forEach((r) =>
        animate(r, { opacity: '0' }, 'opacity 250ms ease'));
      sigRefs.current.forEach((elP) => animate(elP, { opacity: '0' }, 'opacity 250ms ease'));
      if (liveDotRef.current) { liveDotRef.current.classList.remove('pulse'); liveDotRef.current.style.transition = 'opacity 250ms ease'; liveDotRef.current.style.opacity = '0'; }
      if (newDotRef.current) { newDotRef.current.classList.remove('pulse'); newDotRef.current.style.opacity = '0'; }
      await pause(260);
    };

    // ================= master loop =================
    const runFreshCycle = async () => {
      if (cancelled.current) return;
      resetInstant();
      reflow(mockRef.current);
      await pause(400);
      if (cancelled.current) return;

      // ACT 1 — Contact A loads, timestamp ticks live
      await enterContact(CONTACTS.A_initial, false);
      if (cancelled.current) return;
      await pause(200);
      await runTimestampTicker();
      if (cancelled.current) return;
      revealLiveBlink();
      await pause(800);
      if (cancelled.current) return;

      // ACT 2 — Zeus re-runs: refresh state
      await act2Refresh();
      if (cancelled.current) return;

      // ACT 3 — Contact B surfaces
      await exitContact(CONTACTS.A_initial.score, false, true);
      if (cancelled.current) return;
      await scanSweep('rgba(124,58,237,0.3)', 400, () => { setLabel('SEARCHING…'); hideLive(); zeusPing(); });
      if (cancelled.current) return;
      setLabel('VERIFIED TODAY');
      await enterContact(CONTACTS.B, false);
      if (cancelled.current) return;
      revealLiveSteady();
      await pause(1800);
      if (cancelled.current) return;

      // ACT 4 — system scans back to Contact A (faster, efficient)
      await exitContact(CONTACTS.B.score, true, false);
      if (cancelled.current) return;
      await scanSweep('rgba(124,58,237,0.3)', 300, () => { setLabel('SEARCHING…'); hideLive(); zeusPing(); });
      if (cancelled.current) return;
      setLabel('VERIFIED TODAY');
      await enterContact(CONTACTS.A_initial, true);
      if (cancelled.current) return;
      revealLiveSteady();
      await pause(600);
      if (cancelled.current) return;

      // RESET
      await resetAnimated();
      if (cancelled.current) return;
      await pause(400);
      if (!cancelled.current) runFreshCycle();
    };

    // ---- lock the panel height to the widest (4-pill) state — zero layout shift ----
    const lockHeight = () => {
      const demo = mockRef.current;
      if (!demo) return;
      const all = [...sigRefs.current, newPillRef.current];
      all.forEach((elP) => { if (elP) { elP.style.transition = 'none'; elP.style.maxWidth = 'none'; elP.style.opacity = '0'; elP.style.overflow = 'visible'; } });
      void demo.offsetWidth;
      demo.style.minHeight = demo.offsetHeight + 'px';
      all.forEach((elP) => { if (elP) { elP.style.maxWidth = '0px'; elP.style.overflow = 'hidden'; } });
    };

    // ---- fully settled state (reduced motion / no IO) ----
    const renderFinal = () => {
      setContactData(CONTACTS.A_initial);
      set(mockRef, { opacity: '1', transform: 'none' });
      set(zeusRef, { opacity: '1', transform: 'none' });
      set(avatarRef, { opacity: '1', transform: 'none' });
      set(nameRef, { opacity: '1', transform: 'none' });
      set(roleRef, { opacity: '1' });
      set(intentWrapRef, { opacity: '1', transform: 'none' });
      if (scoreRef.current) scoreRef.current.textContent = String(CONTACTS.A_initial.score);
      set(intentLblRef, { opacity: '1' });
      sigRefs.current.forEach((elP) => set(elP, { opacity: '1', maxWidth: 'none' }));
      set(liveWrapRef, { opacity: '1' });
      set(liveDotRef, { opacity: '1', transform: 'scale(1)' });
    };

    // ---- entrance: outer card (CSS via state), then inner panel + loop ----
    const startEntrance = async () => {
      lockHeight();
      resetInstant();
      await pause(550);
      if (cancelled.current) return;
      animate(mockRef, { opacity: '1', transform: 'translateY(0)' }, 'opacity 400ms ease-out, transform 400ms ease-out');
      animate(zeusRef, { opacity: '1', transform: 'scale(1)' }, 'opacity 300ms ease, transform 300ms cubic-bezier(0.34,1.56,0.64,1)');
      await pause(400);
      if (cancelled.current) return;
      runFreshCycle();
    };

    if (prefersReduced || !hasIO) {
      setReduced(true);
      setEntered(true);
      const id = setTimeout(renderFinal, 0);
      timeoutsArr.add(id);
      return () => {
        cancelled.current = true;
        timeoutsArr.forEach(clearTimeout);
        rafsArr.forEach(cancelAnimationFrame);
        timeoutsArr.clear();
        rafsArr.clear();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasEntered.current) {
            hasEntered.current = true;
            setEntered(true); // Phase 1 — outer card (inline transitions)
            startEntrance();  // Phase 2 — inner panel + loop
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      cancelled.current = true;
      io.disconnect();
      timeoutsArr.forEach(clearTimeout);
      rafsArr.forEach(cancelAnimationFrame);
      timeoutsArr.clear();
      rafsArr.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // outer-card entrance inline style (one render; transitions only on `entered`)
  const o = (delay, dur, ty) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'none' : ty ? `translateY(${ty}px)` : undefined,
    transition: reduced
      ? 'none'
      : `opacity ${dur}ms ease-out ${delay}ms${ty ? `, transform ${dur}ms ease-out ${delay}ms` : ''}`,
  });

  return (
    <article
      ref={rootRef}
      className="scd-fix-card"
      data-reveal
      data-reveal-skip
      style={{ ...o(0, 450, 16), willChange: 'transform, opacity' }}
    >
      <div className="scd-fix-card-head" style={o(150, 350)}>
        <span className="scd-fix-num">1</span>
        <span className="scd-fix-product">Zeus &bull; NeoBrain AI</span>
        <span className="scd-fix-tag">Fixes &middot; Static List</span>
      </div>
      <h3 className="scd-fix-title" style={o(250, 350, 8)}>Start fresh &mdash; every time</h3>
      <p className="scd-fix-desc" style={o(380, 350, 8)}>
        Every Zeus search returns continuously refreshed, signal-verified contacts &mdash;
        not a static export. NeoBrain AI flags stale records and surfaces replacements
        before they cause damage.
      </p>

      {/* ----- live loop zone ----- */}
      <div
        className="scd-fix-demo"
        ref={mockRef}
        style={{ position: 'relative', overflow: 'hidden', opacity: 0, transform: 'translateY(10px)' }}
      >
        <div className="scd-fix-demo-head">
          <span className="scd-fix-demo-eyebrow">
            <span ref={headerLabelRef} style={{ transition: 'opacity 150ms ease' }}>Verified today</span>
            <span ref={liveWrapRef}>
              {' '}&middot;{' '}
              <span ref={liveDotRef} className="scd-livedot" aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }} />
              Live signal
            </span>
          </span>
          <span className="scd-fix-zeus" ref={zeusRef} style={{ opacity: 0, transform: 'scale(0.7)' }}>Zeus</span>
        </div>

        <div className="scd-fix-contact">
          <span className="scd-deep-av purple" ref={avatarRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }}>MT</span>
          <div className="scd-fix-contact-id">
            <span className="scd-fix-contact-name" ref={nameRef} style={{ opacity: 0, transform: 'translateX(-8px)' }}>Marcus T.</span>
            <span className="scd-fix-contact-role" ref={roleRef} style={{ opacity: 0 }}>VP Sales &middot; Acme Corp</span>
          </div>
          <div className="scd-fix-intent" ref={intentWrapRef} style={{ opacity: 0, transform: 'translateY(8px)' }}>
            <span className="scd-fix-intent-num" ref={scoreRef}>0</span>
            <span className="scd-fix-intent-lbl" ref={intentLblRef} style={{ opacity: 0 }}>Intent</span>
          </div>
        </div>

        <div className="scd-fix-signals">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="scd-fix-signal"
              ref={(elP) => { sigRefs.current[i] = elP; }}
              style={{ opacity: 0, maxWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <span ref={(t) => { sigTextRefs.current[i] = t; }}>{CONTACTS.A_initial.signals[i]}</span>
            </span>
          ))}
          {/* freshly-detected 4th signal — distinct background reads as "new" */}
          <span
            className="scd-fix-signal"
            ref={newPillRef}
            style={{
              opacity: 0,
              maxWidth: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              transform: 'translateX(16px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(124,58,237,0.18)',
              borderColor: 'rgba(139,77,255,0.45)',
            }}
          >
            <span ref={newDotRef} className="scd-newdot" aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }} />
            {CONTACTS.A_refreshed.newSignal}
          </span>
        </div>

        {/* Zeus scan line — swept top -> bottom between states */}
        <span
          ref={scanRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '1px',
            width: '100%',
            background: 'rgba(124,58,237,0.3)',
            opacity: 0,
            transform: 'translateY(0)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* component-scoped keyframe effects */}
      <style jsx>{`
        .scd-livedot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          margin-right: 5px;
          vertical-align: middle;
        }
        .scd-livedot.pulse { animation: scdfreshPulse 1.2s ease-in-out 2; }
        .scd-newdot {
          display: inline-block;
          width: 5px;
          height: 5px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #8b4dff;
        }
        .scd-newdot.pulse { animation: scdfreshPulse 1s ease-in-out 2; }
        .scd-fix-zeus.ping { animation: scdfreshPing 500ms ease-out; }

        @keyframes scdfreshPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes scdfreshPing {
          from { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.5); }
          to { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
        }
      `}</style>
    </article>
  );
}
