'use client';

// Verifyrit + Snaarpmail dual-panel card for /stale-contact-data
// (Root Cause 2 + 4 deep dive).
//
// A looping, two-act pipeline animation telling the full deliverability story:
// list enters -> Verifyrit validates -> verdicts delivered -> emails send ->
// Snaarpmail reports health. Triggers ONCE on scroll-into-view, then loops.
//
// Isolated to this card only:
//   - every original .scd-deep-* / .scd-vf-* / .scd-sm-* class is preserved
//   - all loop mutations go through ref.current.style / .textContent (no setState
//     after entrance, so zero React re-renders during the loop)
//   - zero layout shift: both panels keep full height because every inner element
//     lives in the DOM from first paint, hidden with `visibility: hidden`
//   - one component-scoped styled-jsx keyframe (the live-dot pulse), class-toggled
//   - a `cancelled` ref stops the loop on unmount; all timers/rafs are cleared

import { useEffect, useRef } from 'react';
import Icon from './Icon';

const FOOT_TEXT = '847 cleared & sent to Sendrit · Bounce forecast 0.3%';

export default function StaleContactDataVerifyCard() {
  // --- Panel 1 (Verifyrit) refs ---
  const p1Ref = useRef(null);
  const p1HeadRef = useRef(null);
  const metaNumRef = useRef(null);

  const chipDelivRef = useRef(null);
  const numDelivRef = useRef(null);
  const chipInvalidRef = useRef(null);
  const numInvalidRef = useRef(null);
  const chipRiskyRef = useRef(null);
  const numRiskyRef = useRef(null);
  const chipSpamRef = useRef(null);

  const rowARef = useRef(null);
  const icARef = useRef(null);
  const addrARef = useRef(null);
  const strikeARef = useRef(null);
  const noteARef = useRef(null);
  const statARef = useRef(null);

  const rowBRef = useRef(null);
  const icBRef = useRef(null);
  const addrBRef = useRef(null);
  const noteBRef = useRef(null);
  const statBRef = useRef(null);

  const rowCRef = useRef(null);
  const icCRef = useRef(null);
  const addrCRef = useRef(null);
  const noteCRef = useRef(null);
  const statCRef = useRef(null);
  const arrowCRef = useRef(null);

  const footRef = useRef(null);
  const footCheckRef = useRef(null);
  const footTextRef = useRef(null);

  // --- Panel 2 (Snaarpmail) refs ---
  const p2Ref = useRef(null);
  const p2HeadRef = useRef(null);
  const tagRef = useRef(null);
  const tile1Ref = useRef(null);
  const num1Ref = useRef(null);
  const lbl1Ref = useRef(null);
  const tile2Ref = useRef(null);
  const num2Ref = useRef(null);
  const lbl2Ref = useRef(null);
  const repRowRef = useRef(null);
  const repLblRef = useRef(null);
  const dotRef = useRef(null);
  const healthyTextRef = useRef(null);

  // --- loop bookkeeping ---
  const cancelled = useRef(false);
  const timeouts = useRef([]);
  const rafs = useRef([]);

  useEffect(() => {
    cancelled.current = false;
    const timeoutsArr = timeouts.current;
    const rafsArr = rafs.current;

    const WILL = 'transform, opacity';
    const AMBER = '#F59E0B';
    const PURPLE = '#7C3AED';

    // ---- tiny utilities ----
    const set = (el, obj) => { if (el) Object.assign(el.style, obj); };
    const reflow = (el) => { if (el) void el.offsetWidth; };
    const pause = (ms) => new Promise((res) => { timeoutsArr.push(setTimeout(res, ms)); });
    const at = (ms, fn) => { timeoutsArr.push(setTimeout(() => { if (!cancelled.current) fn(); }, ms)); };
    const animate = (el, finalProps, transition) => {
      if (!el) return;
      reflow(el);
      el.style.transition = transition;
      Object.assign(el.style, finalProps);
    };
    const showSection = (el) => { if (el) el.style.visibility = 'visible'; };

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const SPRING = 'cubic-bezier(0.34,1.6,0.64,1)';
    const SPRING_BIG = 'cubic-bezier(0.34,1.9,0.64,1)';

    // ---- shared count utility ----
    function countUp(el, to, duration, format, easing, onProgress) {
      return new Promise((resolve) => {
        if (!el) return resolve();
        const t0 = performance.now();
        const ez = easing || easeOutCubic;
        const frame = (now) => {
          if (cancelled.current) return resolve();
          const t = Math.min(1, (now - t0) / duration);
          const v = to * ez(t);
          el.textContent = format(v);
          if (onProgress) onProgress(v);
          if (t < 1) rafsArr.push(requestAnimationFrame(frame));
          else { el.textContent = format(to); resolve(); }
        };
        rafsArr.push(requestAnimationFrame(frame));
      });
    }

    // ---- typewriter ----
    function typeIn(el, text, speed) {
      return new Promise((resolve) => {
        if (!el) return resolve();
        el.textContent = '';
        let i = 0;
        const step = () => {
          if (cancelled.current) return resolve();
          el.textContent = text.slice(0, i);
          if (i >= text.length) return resolve();
          i += 1;
          timeoutsArr.push(setTimeout(step, speed));
        };
        step();
      });
    }

    // ---- classification badge entrance ----
    const appearChip = (el) => {
      if (!el) return;
      el.style.visibility = 'visible';
      reflow(el);
      el.style.transition = 'opacity 280ms ease-out, transform 280ms ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    };

    // ================= reset to pre-ACT-1 start state, no animation =================
    function resetInstant() {
      if (metaNumRef.current) metaNumRef.current.textContent = '0';
      // classification chips
      [chipDelivRef, chipInvalidRef, chipRiskyRef, chipSpamRef].forEach((r) =>
        set(r.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(-8px) scale(0.8)', willChange: WILL }));
      if (numDelivRef.current) numDelivRef.current.textContent = '0';
      if (numInvalidRef.current) numInvalidRef.current.textContent = '0';
      if (numRiskyRef.current) numRiskyRef.current.textContent = '0';
      // verdict rows
      [rowARef, rowBRef, rowCRef].forEach((r) =>
        set(r.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(-10px)', background: 'transparent', willChange: WILL }));
      // row A
      set(icARef.current, { transition: 'none', opacity: '0', transform: 'scale(0)' });
      set(addrARef.current, { transition: 'none', opacity: '0', color: '' });
      set(strikeARef.current, { transition: 'none', transformOrigin: 'left', transform: 'scaleX(0)' });
      set(noteARef.current, { transition: 'none', opacity: '0' });
      set(statARef.current, { transition: 'none', opacity: '0', transform: 'translateX(6px)' });
      // row B
      set(icBRef.current, { transition: 'none', opacity: '0', transform: 'scale(0)', color: AMBER });
      set(addrBRef.current, { transition: 'none', opacity: '0', color: AMBER });
      set(noteBRef.current, { transition: 'none', opacity: '0' });
      set(statBRef.current, { transition: 'none', opacity: '0', transform: 'translateX(6px)' });
      // row C
      set(icCRef.current, { transition: 'none', opacity: '0', transform: 'scale(0)' });
      set(addrCRef.current, { transition: 'none', opacity: '0' });
      set(noteCRef.current, { transition: 'none', opacity: '0' });
      set(statCRef.current, { transition: 'none', opacity: '0', transform: 'translateX(8px)' });
      set(arrowCRef.current, { transition: 'none', transform: 'translateX(-4px)' });
      // footer
      set(footRef.current, { visibility: 'hidden', transition: 'none', opacity: '1', willChange: WILL });
      set(footCheckRef.current, { transition: 'none', opacity: '0', transform: 'scale(0.6)' });
      if (footTextRef.current) footTextRef.current.textContent = '';
      set(footTextRef.current, { transition: 'none', transform: 'scale(1)' });
      // Panel 2
      set(p2Ref.current, { transition: 'none', borderColor: 'rgba(255,255,255,0.05)' });
      set(p2HeadRef.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(6px)' });
      set(tagRef.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'scale(0.7)', willChange: WILL });
      [tile1Ref, tile2Ref].forEach((r) => set(r.current, { visibility: 'hidden', transition: 'none', opacity: '0', willChange: WILL }));
      if (num1Ref.current) num1Ref.current.textContent = '0.0%';
      if (num2Ref.current) num2Ref.current.textContent = '0.00%';
      set(num1Ref.current, { transition: 'none', opacity: '0' });
      set(num2Ref.current, { transition: 'none', opacity: '0' });
      set(lbl1Ref.current, { transition: 'none', opacity: '0' });
      set(lbl2Ref.current, { transition: 'none', opacity: '0' });
      set(repRowRef.current, { visibility: 'hidden', transition: 'none', opacity: '1', willChange: WILL });
      set(repLblRef.current, { transition: 'none', opacity: '0', transform: 'translateX(-6px)' });
      if (dotRef.current) dotRef.current.classList.remove('scd-dotpulse');
      set(dotRef.current, { transition: 'none', opacity: '0', transform: 'scale(0)', animation: 'none' });
      if (healthyTextRef.current) healthyTextRef.current.textContent = '';
    }

    // ================= scroll entrance (once) =================
    function entrance() {
      set(p1Ref.current, { transition: 'none', opacity: '0', transform: 'translateY(16px)' });
      set(p2Ref.current, { transition: 'none', opacity: '0', transform: 'translateY(16px)', borderColor: 'rgba(255,255,255,0.05)' });
      set(p1HeadRef.current, { transition: 'none', opacity: '0' });
      animate(p1Ref.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 450ms ease-out, transform 450ms ease-out');
      at(100, () => animate(p2Ref.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 450ms ease-out, transform 450ms ease-out'));
      at(200, () => animate(p1HeadRef.current, { opacity: '1' }, 'opacity 300ms ease'));
    }

    // ================= ACT 1 — list enters, scan classifies =================
    function act1() {
      return new Promise((resolve) => {
        const dur = 800;
        const t0 = performance.now();
        const shown = { d: false, i: false, r: false, s: false };
        const frac = (main, thr) => Math.max(0, Math.min(1, (main - thr) / (1000 - thr)));
        const frame = (now) => {
          if (cancelled.current) return resolve();
          const t = Math.min(1, (now - t0) / dur);
          const main = Math.round(1000 * easeOutQuart(t));
          if (metaNumRef.current) metaNumRef.current.textContent = main.toLocaleString();
          if (!shown.d && main >= 200) { shown.d = true; appearChip(chipDelivRef.current); }
          if (!shown.i && main >= 400) { shown.i = true; appearChip(chipInvalidRef.current); }
          if (!shown.r && main >= 650) { shown.r = true; appearChip(chipRiskyRef.current); }
          if (!shown.s && main >= 900) { shown.s = true; appearChip(chipSpamRef.current); }
          if (shown.d && numDelivRef.current) numDelivRef.current.textContent = String(Math.round(847 * frac(main, 200)));
          if (shown.i && numInvalidRef.current) numInvalidRef.current.textContent = String(Math.round(89 * frac(main, 400)));
          if (shown.r && numRiskyRef.current) numRiskyRef.current.textContent = String(Math.round(64 * frac(main, 650)));
          if (t < 1) {
            rafsArr.push(requestAnimationFrame(frame));
          } else {
            if (metaNumRef.current) metaNumRef.current.textContent = (1000).toLocaleString();
            if (numDelivRef.current) numDelivRef.current.textContent = '847';
            if (numInvalidRef.current) numInvalidRef.current.textContent = '89';
            if (numRiskyRef.current) numRiskyRef.current.textContent = '64';
            resolve();
          }
        };
        rafsArr.push(requestAnimationFrame(frame));
      }).then(() => pause(300)); // scan complete, list classified
    }

    // ================= ACT 2 — email verdicts delivered (sequential) =================
    async function act2() {
      // --- ROW A: rejection (clinical, final) ---
      showSection(rowARef.current);
      animate(rowARef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 350ms ease-out, transform 350ms ease-out');
      animate(addrARef.current, { opacity: '1' }, 'opacity 250ms ease');
      at(100, () => animate(noteARef.current, { opacity: '1' }, 'opacity 200ms ease'));
      await pause(550);
      if (cancelled.current) return;
      animate(icARef.current, { opacity: '1', transform: 'scale(1)' }, `opacity 280ms ease, transform 280ms ${SPRING}`);
      animate(statARef.current, { opacity: '1', transform: 'translateX(0)' }, 'opacity 250ms ease, transform 250ms ease-out');
      // single faint red flash
      animate(rowARef.current, { background: 'rgba(239,68,68,0.08)' }, 'background 200ms ease');
      at(200, () => animate(rowARef.current, { background: 'transparent' }, 'background 200ms ease'));
      // strikethrough draws + address dims
      animate(strikeARef.current, { transform: 'scaleX(1)' }, 'transform 300ms ease-out');
      animate(addrARef.current, { opacity: '0.5' }, 'opacity 300ms ease');
      await pause(280 + 500);
      if (cancelled.current) return;

      // --- ROW B: resolution (amber concern -> purple cleared) ---
      showSection(rowBRef.current);
      animate(rowBRef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 350ms ease-out, transform 350ms ease-out');
      animate(addrBRef.current, { opacity: '1' }, 'opacity 250ms ease'); // shows amber
      at(100, () => animate(noteBRef.current, { opacity: '1' }, 'opacity 200ms ease'));
      await pause(600);
      if (cancelled.current) return;
      animate(icBRef.current, { opacity: '1', transform: 'scale(1)' }, `opacity 280ms ease, transform 280ms ${SPRING}`);
      await pause(280);
      if (cancelled.current) return;
      // the "cleared" moment: amber -> purple / amber -> white
      animate(icBRef.current, { color: PURPLE }, 'color 300ms ease');
      animate(addrBRef.current, { color: '#FFFFFF' }, 'color 300ms ease');
      animate(statBRef.current, { opacity: '1', transform: 'translateX(0)' }, 'opacity 250ms ease, transform 250ms ease-out');
      at(300, () => animate(icBRef.current, { opacity: '0.7' }, 'opacity 200ms ease')); // resolved, no longer a threat
      await pause(300 + 500);
      if (cancelled.current) return;

      // --- ROW C: approval (green light, the payoff) ---
      showSection(rowCRef.current);
      animate(rowCRef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 350ms ease-out, transform 350ms ease-out');
      animate(addrCRef.current, { opacity: '1' }, 'opacity 250ms ease');
      at(100, () => animate(noteCRef.current, { opacity: '1' }, 'opacity 200ms ease'));
      await pause(500);
      if (cancelled.current) return;
      animate(icCRef.current, { opacity: '1', transform: 'scale(1)' }, `opacity 300ms ease, transform 300ms ${SPRING_BIG}`); // biggest stamp
      animate(statCRef.current, { opacity: '1', transform: 'translateX(0)' }, 'opacity 300ms ease, transform 300ms ease-out');
      animate(arrowCRef.current, { transform: 'translateX(0)' }, 'transform 300ms ease-out'); // arrow points to destination
      animate(rowCRef.current, { background: 'rgba(34,197,94,0.08)' }, 'background 350ms ease'); // approved glow stays
      await pause(350);
    }

    // ================= ACT 3 — list cleared, passes to Sendrit =================
    async function act3() {
      showSection(footRef.current);
      animate(footCheckRef.current, { opacity: '1', transform: 'scale(1)' }, `opacity 250ms ease, transform 250ms ${SPRING}`);
      await pause(150);
      if (cancelled.current) return;
      await typeIn(footTextRef.current, FOOT_TEXT, 18);
      if (cancelled.current) return;
      // confirmation lands with a subtle pop
      animate(footTextRef.current, { transform: 'scale(1.03)' }, 'transform 150ms ease-out');
      at(150, () => animate(footTextRef.current, { transform: 'scale(1)' }, 'transform 150ms ease-out'));
      await pause(400);
    }

    // ================= ACT 4 — Snaarpmail panel materializes =================
    async function act4() {
      animate(p2Ref.current, { borderColor: 'rgba(255,255,255,0.15)' }, 'border-color 400ms ease'); // panel turns on
      showSection(p2HeadRef.current);
      animate(p2HeadRef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 300ms ease, transform 300ms ease-out');
      at(120, () => {
        showSection(tagRef.current);
        set(tagRef.current, { transition: 'none', transform: 'scale(0.7)' });
        animate(tagRef.current, { opacity: '1', transform: 'scale(1)' }, `opacity 300ms ease, transform 300ms ${SPRING}`);
      });
      at(200, () => { showSection(tile1Ref.current); animate(tile1Ref.current, { opacity: '1' }, 'opacity 250ms ease'); });
      at(300, () => { showSection(tile2Ref.current); animate(tile2Ref.current, { opacity: '1' }, 'opacity 250ms ease'); });
      await pause(600); // panel visible, metrics still zero
    }

    // ================= ACT 5 — health metrics count up, reputation confirmed =================
    async function act5() {
      let lbl1Shown = false;
      let lbl2Shown = false;
      set(num1Ref.current, { opacity: '1' });
      set(num2Ref.current, { opacity: '1' });
      // both campaign results arrive together
      countUp(num1Ref.current, 0.3, 900, (v) => v.toFixed(1) + '%', easeOutCubic, (v) => {
        if (!lbl1Shown && v >= 0.2) { lbl1Shown = true; animate(lbl1Ref.current, { opacity: '1' }, 'opacity 250ms ease'); }
      });
      countUp(num2Ref.current, 0.04, 900, (v) => v.toFixed(2) + '%', easeOutCubic, (v) => {
        if (!lbl2Shown && v >= 0.02) { lbl2Shown = true; animate(lbl2Ref.current, { opacity: '1' }, 'opacity 250ms ease'); }
      });
      await pause(900);
      if (cancelled.current) return;
      await pause(300); // beat
      if (cancelled.current) return;
      // domain reputation — the final confirmation
      showSection(repRowRef.current);
      animate(repLblRef.current, { opacity: '1', transform: 'translateX(0)' }, 'opacity 280ms ease, transform 280ms ease-out');
      animate(dotRef.current, { opacity: '1', transform: 'scale(1)' }, `opacity 300ms ease, transform 300ms ${SPRING_BIG}`);
      await pause(150);
      if (cancelled.current) return;
      await typeIn(healthyTextRef.current, 'Healthy', 35);
      if (cancelled.current) return;
      if (dotRef.current) { dotRef.current.style.animation = ''; dotRef.current.classList.add('scd-dotpulse'); } // live status
      await pause(100);
    }

    // ================= HOLD =================
    async function hold() {
      [chipDelivRef, chipInvalidRef, chipRiskyRef, chipSpamRef, rowARef, rowBRef, rowCRef, footRef, tile1Ref, tile2Ref, repRowRef]
        .forEach((r) => set(r.current, { willChange: 'auto' }));
      // "0.3%" and "0.04%" breathe once, offset by 500ms
      const breathe = (ref, delay) => {
        at(delay, () => animate(ref.current, { opacity: '0.7' }, 'opacity 1000ms ease-in-out'));
        at(delay + 1000, () => animate(ref.current, { opacity: '1' }, 'opacity 1000ms ease-in-out'));
      };
      breathe(num1Ref, 0);
      breathe(num2Ref, 500);
      // approved (chen.w) row breathes its green glow once
      if (rowCRef.current) {
        animate(rowCRef.current, { background: 'rgba(34,197,94,0.14)' }, 'background 1250ms ease-in-out');
        at(1250, () => animate(rowCRef.current, { background: 'rgba(34,197,94,0.08)' }, 'background 1250ms ease-in-out'));
      }
      await pause(3500);
    }

    // ================= animated reset (Panel 2 first, then Panel 1) =================
    async function resetAnimated() {
      if (dotRef.current) dotRef.current.classList.remove('scd-dotpulse');
      animate(repRowRef.current, { opacity: '0' }, 'opacity 150ms ease');
      animate(tile1Ref.current, { opacity: '0' }, 'opacity 200ms ease');
      animate(tile2Ref.current, { opacity: '0' }, 'opacity 200ms ease');
      animate(tagRef.current, { opacity: '0', transform: 'scale(0.7)' }, 'opacity 200ms ease, transform 200ms ease');
      animate(p2HeadRef.current, { opacity: '0' }, 'opacity 150ms ease');
      animate(p2Ref.current, { borderColor: 'rgba(255,255,255,0.05)' }, 'border-color 300ms ease');
      await pause(300);
      if (cancelled.current) return;
      // Panel 1, top-to-bottom
      animate(footRef.current, { opacity: '0' }, 'opacity 150ms ease');
      animate(rowCRef.current, { opacity: '0', background: 'transparent' }, 'opacity 200ms ease, background 200ms ease');
      animate(rowBRef.current, { opacity: '0' }, 'opacity 200ms ease');
      animate(strikeARef.current, { transformOrigin: 'right', transform: 'scaleX(0)' }, 'transform 200ms ease');
      animate(rowARef.current, { opacity: '0' }, 'opacity 200ms ease');
      [chipDelivRef, chipInvalidRef, chipRiskyRef, chipSpamRef].forEach((r) =>
        animate(r.current, { opacity: '0', transform: 'translateY(-8px) scale(0.8)' }, 'opacity 200ms ease, transform 200ms ease'));
      await pause(220);
    }

    // ================= master loop =================
    async function runCycle() {
      if (cancelled.current) return;
      resetInstant();
      reflow(p1Ref.current);
      await pause(300);
      if (cancelled.current) return;
      await act1();
      if (cancelled.current) return;
      await act2();
      if (cancelled.current) return;
      await act3();
      if (cancelled.current) return;
      await act4();
      if (cancelled.current) return;
      await act5();
      if (cancelled.current) return;
      await hold();
      if (cancelled.current) return;
      await resetAnimated();
      if (cancelled.current) return;
      await pause(300);
      if (!cancelled.current) runCycle();
    }

    // ================= reduced-motion / no-IO: fully assembled final state =================
    function showFinal() {
      set(p1Ref.current, { opacity: '1', transform: 'none' });
      set(p2Ref.current, { opacity: '1', transform: 'none', borderColor: 'rgba(255,255,255,0.15)' });
      set(p1HeadRef.current, { opacity: '1' });
      if (metaNumRef.current) metaNumRef.current.textContent = (1000).toLocaleString();
      [chipDelivRef, chipInvalidRef, chipRiskyRef, chipSpamRef].forEach((r) => set(r.current, { visibility: 'visible', opacity: '1', transform: 'none' }));
      if (numDelivRef.current) numDelivRef.current.textContent = '847';
      if (numInvalidRef.current) numInvalidRef.current.textContent = '89';
      if (numRiskyRef.current) numRiskyRef.current.textContent = '64';
      [rowARef, rowBRef, rowCRef].forEach((r) => set(r.current, { visibility: 'visible', opacity: '1', transform: 'none' }));
      set(rowCRef.current, { background: 'rgba(34,197,94,0.08)' });
      set(icARef.current, { opacity: '1', transform: 'none' });
      set(addrARef.current, { opacity: '0.5' });
      set(strikeARef.current, { transform: 'scaleX(1)' });
      set(noteARef.current, { opacity: '1' });
      set(statARef.current, { opacity: '1', transform: 'none' });
      set(icBRef.current, { opacity: '0.7', transform: 'none', color: PURPLE });
      set(addrBRef.current, { opacity: '1', color: '#FFFFFF' });
      set(noteBRef.current, { opacity: '1' });
      set(statBRef.current, { opacity: '1', transform: 'none' });
      set(icCRef.current, { opacity: '1', transform: 'none' });
      set(addrCRef.current, { opacity: '1' });
      set(noteCRef.current, { opacity: '1' });
      set(statCRef.current, { opacity: '1', transform: 'none' });
      set(arrowCRef.current, { transform: 'none' });
      set(footRef.current, { visibility: 'visible', opacity: '1' });
      set(footCheckRef.current, { opacity: '1', transform: 'none' });
      if (footTextRef.current) footTextRef.current.textContent = FOOT_TEXT;
      set(p2HeadRef.current, { visibility: 'visible', opacity: '1', transform: 'none' });
      set(tagRef.current, { visibility: 'visible', opacity: '1', transform: 'none' });
      [tile1Ref, tile2Ref].forEach((r) => set(r.current, { visibility: 'visible', opacity: '1' }));
      if (num1Ref.current) num1Ref.current.textContent = '0.3%';
      if (num2Ref.current) num2Ref.current.textContent = '0.04%';
      set(num1Ref.current, { opacity: '1' });
      set(num2Ref.current, { opacity: '1' });
      set(lbl1Ref.current, { opacity: '1' });
      set(lbl2Ref.current, { opacity: '1' });
      set(repRowRef.current, { visibility: 'visible', opacity: '1' });
      set(repLblRef.current, { opacity: '1', transform: 'none' });
      set(dotRef.current, { opacity: '1', transform: 'none' });
      if (healthyTextRef.current) healthyTextRef.current.textContent = 'Healthy';
    }

    // ================= wire up: trigger once on scroll, then loop =================
    const el = p1Ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      showFinal();
      return () => { cancelled.current = true; };
    }

    resetInstant();
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            io.unobserve(e.target);
            entrance();
            // entrance (~550ms) + a 500ms reading pause, then the loop begins
            at(1050, () => { if (!cancelled.current) runCycle(); });
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);

    return () => {
      cancelled.current = true;
      io.disconnect();
      timeoutsArr.forEach(clearTimeout);
      rafsArr.forEach(cancelAnimationFrame);
      timeouts.current = [];
      rafs.current = [];
    };
  }, []);

  return (
    <>
      {/* ---------- Panel 1: Verifyrit ---------- */}
      <div className="scd-deep-card" ref={p1Ref} style={{ opacity: 0, transform: 'translateY(16px)' }}>
        <div className="scd-deep-card-head" ref={p1HeadRef} style={{ opacity: 0 }}>
          <span className="scd-deep-card-label scd-vf-title">
            Verifyrit <span>&mdash; Pre-Campaign Check</span>
          </span>
          <span className="scd-vf-meta">Q3 OUTREACH &middot; <span ref={metaNumRef}>0</span></span>
        </div>

        <div className="scd-vf-chips">
          <span className="scd-vf-chip green" ref={chipDelivRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-8px) scale(0.8)' }}>
            <b ref={numDelivRef}>0</b> Deliverable
          </span>
          <span className="scd-vf-chip red" ref={chipInvalidRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-8px) scale(0.8)' }}>
            <b ref={numInvalidRef}>0</b> Invalid
          </span>
          <span className="scd-vf-chip amber" ref={chipRiskyRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-8px) scale(0.8)' }}>
            <b ref={numRiskyRef}>0</b> Risky
          </span>
          <span className="scd-vf-chip gray" ref={chipSpamRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-8px) scale(0.8)' }}>
            <b>0</b> Spam Trap
          </span>
        </div>

        <div className="scd-vf-rows">
          {/* Row A */}
          <div className="scd-vf-row" ref={rowARef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-10px)' }}>
            <span className="scd-vf-ic red" ref={icARef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }}><Icon name="x" /></span>
            <div className="scd-vf-id">
              <span className="scd-vf-addr" ref={addrARef} style={{ position: 'relative', opacity: 0 }}>
                priya.n@vertexco.com
                <span
                  ref={strikeARef}
                  aria-hidden="true"
                  style={{ position: 'absolute', top: '50%', left: 0, height: '1px', width: '100%', background: 'rgba(255,255,255,0.6)', transform: 'scaleX(0)', transformOrigin: 'left' }}
                />
              </span>
              <span className="scd-vf-note" ref={noteARef} style={{ opacity: 0 }}>Domain inactive</span>
            </div>
            <span className="scd-vf-stat red" ref={statARef} style={{ opacity: 0, transform: 'translateX(6px)' }}>Removed</span>
          </div>

          {/* Row B */}
          <div className="scd-vf-row" ref={rowBRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-10px)' }}>
            <span className="scd-vf-ic amber" ref={icBRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)', color: '#F59E0B' }}><Icon name="triangle-alert" /></span>
            <div className="scd-vf-id">
              <span className="scd-vf-addr" ref={addrBRef} style={{ opacity: 0, color: '#F59E0B' }}>david.o@stackline.io</span>
              <span className="scd-vf-note" ref={noteBRef} style={{ opacity: 0 }}>Catch-all resolved &rarr; deliverable</span>
            </div>
            <span className="scd-vf-stat amber" ref={statBRef} style={{ opacity: 0, transform: 'translateX(6px)' }}>Cleared</span>
          </div>

          {/* Row C */}
          <div className="scd-vf-row" ref={rowCRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-10px)' }}>
            <span className="scd-vf-ic green" ref={icCRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }}><Icon name="check" /></span>
            <div className="scd-vf-id">
              <span className="scd-vf-addr" ref={addrCRef} style={{ opacity: 0 }}>chen.w@orionhealth.com</span>
              <span className="scd-vf-note" ref={noteCRef} style={{ opacity: 0 }}>Verified deliverable</span>
            </div>
            <span className="scd-vf-stat green" ref={statCRef} style={{ opacity: 0, transform: 'translateX(8px)' }}>
              <span ref={arrowCRef} style={{ display: 'inline-block', transform: 'translateX(-4px)' }}>&rarr;</span> Sendrit
            </span>
          </div>
        </div>

        <div className="scd-vf-foot" ref={footRef} style={{ visibility: 'hidden' }}>
          <span ref={footCheckRef} style={{ display: 'inline-flex', opacity: 0, transform: 'scale(0.6)' }}><Icon name="check" aria-hidden="true" /></span>
          <span ref={footTextRef} style={{ display: 'inline-block', transformOrigin: 'left' }}></span>
        </div>
      </div>

      {/* ---------- Panel 2: Snaarpmail ---------- */}
      <div className="scd-deep-card scd-sm-card" ref={p2Ref} style={{ opacity: 0, transform: 'translateY(16px)', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="scd-deep-card-head" ref={p2HeadRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(6px)' }}>
          <span className="scd-deep-card-label scd-vf-title">
            Snaarpmail <span>&mdash; Domain Health</span>
          </span>
          <span className="scd-sm-tag" ref={tagRef} style={{ visibility: 'hidden', opacity: 0, transform: 'scale(0.7)' }}>post-campaign</span>
        </div>

        <div className="scd-sm-stats">
          <div className="scd-sm-stat" ref={tile1Ref} style={{ visibility: 'hidden', opacity: 0 }}>
            <span className="scd-sm-num green" ref={num1Ref} style={{ opacity: 0 }}>0.0%</span>
            <span className="scd-sm-lbl" ref={lbl1Ref} style={{ opacity: 0 }}>Bounce rate &middot; safe zone</span>
          </div>
          <div className="scd-sm-stat" ref={tile2Ref} style={{ visibility: 'hidden', opacity: 0 }}>
            <span className="scd-sm-num green" ref={num2Ref} style={{ opacity: 0 }}>0.00%</span>
            <span className="scd-sm-lbl" ref={lbl2Ref} style={{ opacity: 0 }}>Spam complaints &middot; &lt; 0.1%</span>
          </div>
        </div>

        <div className="scd-sm-rep" ref={repRowRef} style={{ visibility: 'hidden' }}>
          <span className="scd-sm-rep-lbl" ref={repLblRef} style={{ opacity: 0, transform: 'translateX(-6px)', display: 'inline-block' }}>Domain reputation</span>
          <span className="scd-sm-rep-val">
            <span className="scd-deep-rec-dot" ref={dotRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }}></span>
            <span ref={healthyTextRef}></span>
          </span>
        </div>
      </div>

      {/* component-scoped keyframe — live-dot pulse (class-toggled from the loop) */}
      <style jsx>{`
        .scd-dotpulse { animation: scdDotPulse 2.5s ease-in-out infinite; }
        @keyframes scdDotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
