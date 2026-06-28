'use client';

// "Contact Status Update" card for /stale-contact-data (Root Cause 1 + 3 deep dive).
//
// A looping, story-driven contact-intelligence animation replaying the NeoBrain AI
// discovery sequence: stale record detected -> contact updated -> replacement found
// -> action offered. Triggers ONCE on scroll-into-view, then loops indefinitely.
//
// Isolated to this card only:
//   - every original .scd-deep-* class is preserved so the look is unchanged
//   - all loop mutations go through ref.current.style (zero setState after entrance)
//   - zero layout shift: every section lives in the DOM from first paint and is
//     hidden with `visibility: hidden` (space reserved) — only opacity/transform animate
//   - component-scoped styled-jsx for the few keyframe effects (ripple, shimmer, cursor)
//   - a `cancelled` ref stops the loop on unmount; all timers/rafs are tracked + cleared

import { useEffect, useRef } from 'react';
import Icon from './Icon';

const ALERT_TEXT = 'Job change detected — record updated';

export default function StaleContactDataStatusCard() {
  // --- element refs ---
  const cardRef = useRef(null);
  const headRef = useRef(null);
  const badgeRef = useRef(null);
  const shimmerRef = useRef(null);

  const staleRowRef = useRef(null);
  const staleAvRef = useRef(null);
  const staleNameRef = useRef(null);
  const strikeRef = useRef(null);
  const staleMetaRef = useRef(null);

  const updRowRef = useRef(null);
  const updAvRef = useRef(null);
  const updNameRef = useRef(null);
  const updMetaRef = useRef(null);
  const dotRef = useRef(null);

  const statusRef = useRef(null);
  const syncRef = useRef(null);
  const alertRef = useRef(null);
  const cursorRef = useRef(null);

  const dividerRef = useRef(null);
  const subRef = useRef(null);

  const repRowRef = useRef(null);
  const repAvRef = useRef(null);
  const repNameRef = useRef(null);
  const repMetaRef = useRef(null);
  const scoreRef = useRef(null);
  const scoreLblRef = useRef(null);

  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  // --- loop bookkeeping ---
  const cancelled = useRef(false);
  const timeouts = useRef([]);
  const rafs = useRef([]);

  useEffect(() => {
    cancelled.current = false;
    const timeoutsArr = timeouts.current;
    const rafsArr = rafs.current;

    const WILL = 'transform, opacity';

    // ---- tiny utilities ----
    const set = (el, obj) => { if (el) Object.assign(el.style, obj); };
    const reflow = (el) => { if (el) void el.offsetWidth; };
    const pause = (ms) =>
      new Promise((res) => { timeoutsArr.push(setTimeout(res, ms)); });
    const at = (ms, fn) => {
      timeoutsArr.push(setTimeout(() => { if (!cancelled.current) fn(); }, ms));
    };
    // animate from current committed state -> finalProps using `transition`.
    const animate = (el, finalProps, transition) => {
      if (!el) return;
      reflow(el); // commit current (start) values before arming the transition
      el.style.transition = transition;
      Object.assign(el.style, finalProps);
    };
    const showSection = (el) => { if (el) el.style.visibility = 'visible'; };

    // ---- counter (score 0 -> 88) ----
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    function countScore(to, duration) {
      const el = scoreRef.current;
      if (!el) return;
      const lbl = scoreLblRef.current;
      const start = performance.now();
      let lblShown = false;
      const frame = (now) => {
        if (cancelled.current) return;
        const t = Math.min(1, (now - start) / duration);
        const v = Math.round(to * easeOutCubic(t));
        el.textContent = String(v);
        // "SCORE" label fades in once the counter passes 60
        if (!lblShown && v >= 60 && lbl) {
          lblShown = true;
          animate(lbl, { opacity: '1' }, 'opacity 200ms ease');
        }
        if (t < 1) {
          rafsArr.push(requestAnimationFrame(frame));
        } else {
          el.textContent = String(to);
          // the number lands with confidence: 1 -> 1.1 -> 1
          animate(el, { transform: 'scale(1.1)' }, 'transform 125ms ease-out');
          at(125, () => animate(el, { transform: 'scale(1)' }, 'transform 125ms ease-out'));
        }
      };
      rafsArr.push(requestAnimationFrame(frame));
    }

    // ---- typewriter for the job-change alert ----
    function typeIn(text, speed) {
      return new Promise((resolve) => {
        const el = alertRef.current;
        if (!el) return resolve();
        el.textContent = '';
        if (cursorRef.current) cursorRef.current.classList.add('on');
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

    // ---- reset everything to the pre-ACT-1 start state, no animation ----
    function resetInstant() {
      // stale record
      set(staleRowRef.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(-12px)', willChange: WILL });
      set(staleAvRef.current, { transition: 'none', opacity: '0', transform: 'scale(0.8)', filter: 'grayscale(0)' });
      set(staleNameRef.current, { transition: 'none', opacity: '0', transform: 'translateX(-6px)', color: '' });
      set(strikeRef.current, { transition: 'none', transformOrigin: 'left', transform: 'scaleX(0)' });
      set(staleMetaRef.current, { transition: 'none', opacity: '0', color: '' });
      // updated record
      set(updRowRef.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(16px)', borderColor: 'rgba(124,58,237,0)', willChange: WILL });
      set(updAvRef.current, { transition: 'none', opacity: '0', transform: 'scale(0)' });
      set(updNameRef.current, { transition: 'none', opacity: '0', transform: 'translateX(-8px)' });
      set(updMetaRef.current, { transition: 'none', opacity: '0' });
      set(dotRef.current, { transition: 'none', opacity: '0', transform: 'scale(0)' });
      // job-change alert
      set(statusRef.current, { visibility: 'hidden' });
      set(syncRef.current, { transition: 'none', opacity: '0', transform: 'rotate(0deg)', willChange: WILL });
      if (alertRef.current) alertRef.current.textContent = '';
      set(alertRef.current, { opacity: '1' });
      if (cursorRef.current) {
        cursorRef.current.classList.remove('on', 'blink');
        cursorRef.current.style.transition = 'none';
        cursorRef.current.style.opacity = '0';
      }
      // divider + replacement label
      set(dividerRef.current, { visibility: 'hidden', transition: 'none', transformOrigin: 'left', transform: 'scaleX(0)', opacity: '1' });
      set(subRef.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(4px)' });
      // replacement contact
      set(repRowRef.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(14px)', willChange: WILL });
      set(repAvRef.current, { transition: 'none', opacity: '0', transform: 'scale(0)' });
      set(repNameRef.current, { transition: 'none', opacity: '0', transform: 'translateX(-8px)' });
      set(repMetaRef.current, { transition: 'none', opacity: '0' });
      if (scoreRef.current) scoreRef.current.textContent = '0';
      set(scoreRef.current, { transition: 'none', opacity: '1', transform: 'scale(1)', willChange: WILL });
      set(scoreLblRef.current, { transition: 'none', opacity: '0' });
      // CTAs
      set(btn1Ref.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(10px)', background: 'transparent', willChange: WILL });
      set(btn2Ref.current, { visibility: 'hidden', transition: 'none', opacity: '0', transform: 'translateY(10px)', willChange: WILL });
    }

    // ---- scroll entrance (once) ----
    function entrance() {
      set(cardRef.current, { transition: 'none', opacity: '0', transform: 'translateY(20px)' });
      set(headRef.current, { transition: 'none', opacity: '0' });
      animate(cardRef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 500ms ease-out, transform 500ms ease-out');
      at(200, () => animate(headRef.current, { opacity: '1' }, 'opacity 300ms ease'));
      // NeoBrain badge pop: 0.7 -> 1.1 -> 1 (back-out bezier gives the overshoot)
      at(200, () => {
        set(badgeRef.current, { transition: 'none', transform: 'scale(0.7)' });
        animate(badgeRef.current, { transform: 'scale(1)' }, 'transform 320ms cubic-bezier(0.34,1.56,0.64,1)');
      });
    }

    // ================= the 6 acts =================

    // ACT 1 — stale record appears (looks legitimate)
    async function act1() {
      showSection(staleRowRef.current);
      animate(staleRowRef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 400ms ease-out, transform 400ms ease-out');
      at(100, () => animate(staleAvRef.current, { opacity: '1', transform: 'scale(1)' }, 'opacity 300ms ease, transform 300ms ease-out'));
      at(250, () => animate(staleNameRef.current, { opacity: '1', transform: 'translateX(0)' }, 'opacity 300ms ease, transform 300ms ease-out'));
      at(330, () => animate(staleMetaRef.current, { opacity: '1' }, 'opacity 250ms ease'));
      await pause(600);
    }

    // ACT 2 — NeoBrain flags it (ripple, strikethrough draws, record dims)
    async function act2() {
      badgeRef.current && badgeRef.current.classList.add('scd-ripple');
      at(500, () => badgeRef.current && badgeRef.current.classList.remove('scd-ripple'));
      await pause(200);
      if (cancelled.current) return;
      // strikethrough draws left -> right — the card's key micro-moment
      animate(strikeRef.current, { transform: 'scaleX(1)' }, 'transform 400ms cubic-bezier(0.4,0,0.2,1)');
      // record dims simultaneously
      animate(staleRowRef.current, { opacity: '0.45' }, 'opacity 400ms ease');
      animate(staleAvRef.current, { filter: 'grayscale(1)' }, 'filter 400ms ease, opacity 400ms ease');
      animate(staleNameRef.current, { color: 'rgba(255,255,255,0.4)' }, 'color 400ms ease');
      animate(staleMetaRef.current, { color: 'rgba(255,255,255,0.4)' }, 'color 400ms ease');
      await pause(400);
    }

    // ACT 3 — updated record rises (where Marcus actually is now)
    async function act3() {
      showSection(updRowRef.current);
      animate(
        updRowRef.current,
        { opacity: '1', transform: 'translateY(0)', borderColor: 'rgba(124,58,237,0.6)' },
        'opacity 420ms ease-out, transform 420ms ease-out, border-color 400ms ease-out'
      );
      at(80, () => animate(updAvRef.current, { opacity: '1', transform: 'scale(1)' }, 'opacity 350ms ease, transform 350ms cubic-bezier(0.34,1.56,0.64,1)'));
      at(200, () => animate(dotRef.current, { opacity: '1', transform: 'scale(1)' }, 'opacity 300ms ease, transform 300ms cubic-bezier(0.34,1.8,0.64,1)'));
      at(230, () => animate(updNameRef.current, { opacity: '1', transform: 'translateX(0)' }, 'opacity 300ms ease, transform 300ms ease-out'));
      at(310, () => animate(updMetaRef.current, { opacity: '1' }, 'opacity 250ms ease'));
      await pause(640);
    }

    // ACT 4 — job change alert fires (sync spin + typed text)
    async function act4() {
      showSection(statusRef.current);
      animate(syncRef.current, { opacity: '1' }, 'opacity 200ms ease');
      at(200, () => animate(syncRef.current, { transform: 'rotate(360deg)' }, 'transform 500ms ease-in-out'));
      await pause(300);
      if (cancelled.current) return;
      await typeIn(ALERT_TEXT, 22);
      if (cancelled.current) return;
      // cursor blinks twice then fades
      if (cursorRef.current) {
        cursorRef.current.classList.add('blink');
        at(800, () => {
          if (!cursorRef.current) return;
          cursorRef.current.classList.remove('on', 'blink');
          cursorRef.current.style.transition = 'opacity 200ms ease';
          cursorRef.current.style.opacity = '0';
        });
      }
      await pause(400);
    }

    // ACT 5 — replacement surfaces (Sarah K. at Acme Corp + score counts up)
    async function act5() {
      showSection(dividerRef.current);
      animate(dividerRef.current, { transform: 'scaleX(1)' }, 'transform 350ms ease-out');
      at(120, () => {
        showSection(subRef.current);
        animate(subRef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 250ms ease, transform 250ms ease-out');
      });
      at(420, () => {
        showSection(repRowRef.current);
        animate(repRowRef.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 400ms ease-out, transform 400ms ease-out');
      });
      at(500, () => animate(repAvRef.current, { opacity: '1', transform: 'scale(1)' }, 'opacity 350ms ease, transform 350ms cubic-bezier(0.34,1.56,0.64,1)'));
      at(570, () => animate(repNameRef.current, { opacity: '1', transform: 'translateX(0)' }, 'opacity 300ms ease, transform 300ms ease-out'));
      at(650, () => animate(repMetaRef.current, { opacity: '1' }, 'opacity 250ms ease'));
      at(640, () => countScore(88, 700));
      await pause(1500);
    }

    // ACT 6 — actions offered (two-step CTA arrival)
    async function act6() {
      showSection(btn1Ref.current);
      animate(btn1Ref.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 320ms ease-out, transform 320ms ease-out');
      // fill comes in 80ms after the shape appears
      at(80, () => animate(btn1Ref.current, { background: '#7C3AED' }, 'background 300ms ease, opacity 320ms ease-out, transform 320ms ease-out'));
      at(180, () => {
        showSection(btn2Ref.current);
        animate(btn2Ref.current, { opacity: '1', transform: 'translateY(0)' }, 'opacity 320ms ease-out, transform 320ms ease-out');
      });
      await pause(560);
    }

    // ---- HOLD — full card visible, gentle living signals ----
    async function hold() {
      // ease off the compositor hints while mostly static
      [staleRowRef, updRowRef, repRowRef, btn1Ref, btn2Ref, syncRef].forEach((r) => set(r.current, { willChange: 'auto' }));
      // green live dot breathes once: 1 -> 0.5 -> 1
      if (dotRef.current) {
        animate(dotRef.current, { opacity: '0.5' }, 'opacity 1000ms ease-in-out');
        at(1000, () => animate(dotRef.current, { opacity: '1' }, 'opacity 1000ms ease-in-out'));
      }
      // score pulses once: 1 -> 0.7 -> 1
      if (scoreRef.current) {
        animate(scoreRef.current, { opacity: '0.7' }, 'opacity 1250ms ease-in-out');
        at(1250, () => animate(scoreRef.current, { opacity: '1' }, 'opacity 1250ms ease-in-out'));
      }
      // NeoBrain badge shimmer sweep
      if (shimmerRef.current) {
        shimmerRef.current.classList.add('sweep');
        at(820, () => shimmerRef.current && shimmerRef.current.classList.remove('sweep'));
      }
      await pause(3500);
    }

    // ---- animated reset (fast, mechanical wipe) ----
    async function resetAnimated() {
      animate(btn1Ref.current, { opacity: '0', transform: 'translateY(8px)' }, 'opacity 200ms ease, transform 200ms ease');
      animate(btn2Ref.current, { opacity: '0', transform: 'translateY(8px)' }, 'opacity 200ms ease, transform 200ms ease');
      animate(repRowRef.current, { opacity: '0', transform: 'translateY(10px)' }, 'opacity 200ms ease, transform 200ms ease');
      animate(dividerRef.current, { opacity: '0' }, 'opacity 150ms ease');
      animate(subRef.current, { opacity: '0' }, 'opacity 150ms ease');
      animate(alertRef.current, { opacity: '0' }, 'opacity 150ms ease');
      animate(syncRef.current, { opacity: '0' }, 'opacity 150ms ease');
      if (cursorRef.current) { cursorRef.current.style.transition = 'opacity 150ms ease'; cursorRef.current.style.opacity = '0'; }
      animate(updRowRef.current, { opacity: '0', transform: 'translateY(8px)', borderColor: 'rgba(124,58,237,0)' }, 'opacity 200ms ease, transform 200ms ease, border-color 200ms ease');
      // strikethrough retracts to the right, then the stale row fades
      animate(strikeRef.current, { transformOrigin: 'right', transform: 'scaleX(0)' }, 'transform 250ms ease');
      await pause(250);
      if (cancelled.current) return;
      animate(staleRowRef.current, { opacity: '0' }, 'opacity 150ms ease');
      await pause(160);
    }

    // ================= master loop =================
    async function runCycle() {
      if (cancelled.current) return;
      resetInstant();
      reflow(cardRef.current);
      await pause(400);
      if (cancelled.current) return;
      await act1();
      if (cancelled.current) return;
      await pause(700);
      await act2();
      if (cancelled.current) return;
      await pause(200);
      await act3();
      if (cancelled.current) return;
      await pause(400);
      await act4();
      if (cancelled.current) return;
      await pause(200);
      await act5();
      if (cancelled.current) return;
      await pause(400);
      await act6();
      if (cancelled.current) return;
      await hold();
      if (cancelled.current) return;
      await resetAnimated();
      if (cancelled.current) return;
      await pause(400);
      if (!cancelled.current) runCycle();
    }

    // ---- reduced-motion / no-IO: render the fully assembled final state ----
    function showFinal() {
      set(cardRef.current, { opacity: '1', transform: 'none' });
      set(headRef.current, { opacity: '1' });
      set(badgeRef.current, { transform: 'none' });
      set(staleRowRef.current, { visibility: 'visible', opacity: '0.45', transform: 'none' });
      set(staleAvRef.current, { opacity: '1', transform: 'none', filter: 'grayscale(1)' });
      set(staleNameRef.current, { opacity: '1', transform: 'none', color: 'rgba(255,255,255,0.4)' });
      set(strikeRef.current, { transform: 'scaleX(1)' });
      set(staleMetaRef.current, { opacity: '1', color: 'rgba(255,255,255,0.4)' });
      set(updRowRef.current, { visibility: 'visible', opacity: '1', transform: 'none', borderColor: 'rgba(124,58,237,0.6)' });
      set(updAvRef.current, { opacity: '1', transform: 'none' });
      set(updNameRef.current, { opacity: '1', transform: 'none' });
      set(updMetaRef.current, { opacity: '1' });
      set(dotRef.current, { opacity: '1', transform: 'none' });
      set(statusRef.current, { visibility: 'visible' });
      set(syncRef.current, { opacity: '1', transform: 'none' });
      if (alertRef.current) alertRef.current.textContent = ALERT_TEXT;
      set(dividerRef.current, { visibility: 'visible', transform: 'scaleX(1)' });
      set(subRef.current, { visibility: 'visible', opacity: '1', transform: 'none' });
      set(repRowRef.current, { visibility: 'visible', opacity: '1', transform: 'none' });
      set(repAvRef.current, { opacity: '1', transform: 'none' });
      set(repNameRef.current, { opacity: '1', transform: 'none' });
      set(repMetaRef.current, { opacity: '1' });
      if (scoreRef.current) scoreRef.current.textContent = '88';
      set(scoreLblRef.current, { opacity: '1' });
      set(btn1Ref.current, { visibility: 'visible', opacity: '1', transform: 'none', background: '#7C3AED' });
      set(btn2Ref.current, { visibility: 'visible', opacity: '1', transform: 'none' });
    }

    // ---- wire up: trigger once on scroll, then loop ----
    const el = cardRef.current;
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
            // entrance (~520ms) + a 600ms reading pause, then the loop begins
            at(1120, () => { if (!cancelled.current) runCycle(); });
          }
        });
      },
      { threshold: 0.3 }
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
    <div className="scd-deep-card" ref={cardRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>
      <div className="scd-deep-card-head" ref={headRef} style={{ opacity: 0 }}>
        <span className="scd-deep-card-label">Contact Status Update</span>
        <span
          className="scd-deep-card-badge"
          ref={badgeRef}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <Icon name="sparkles" aria-hidden="true" /> NeoBrain AI
          <span ref={shimmerRef} className="scd-shimmer" aria-hidden="true" />
        </span>
      </div>

      {/* stale record */}
      <div className="scd-deep-rec" ref={staleRowRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-12px)' }}>
        <span className="scd-deep-av gray" ref={staleAvRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0.8)' }}>MT</span>
        <div className="scd-deep-rec-id">
          <span
            className="scd-deep-rec-name"
            ref={staleNameRef}
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', opacity: 0, transform: 'translateX(-6px)' }}
          >
            Marcus T. &middot; VP Sales
            <span
              ref={strikeRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                height: '1px',
                width: '100%',
                background: 'rgba(255,255,255,0.55)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          </span>
          <span className="scd-deep-rec-meta" ref={staleMetaRef} style={{ opacity: 0 }}>Acme Corp &middot; Verified last quarter</span>
        </div>
      </div>

      {/* updated record */}
      <div className="scd-deep-rec is-current" ref={updRowRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(16px)', borderColor: 'rgba(124,58,237,0)' }}>
        <span className="scd-deep-av purple" ref={updAvRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }}>MT</span>
        <div className="scd-deep-rec-id">
          <span className="scd-deep-rec-name" ref={updNameRef} style={{ opacity: 0, transform: 'translateX(-8px)' }}>Marcus T. &middot; VP Sales</span>
          <span className="scd-deep-rec-meta" ref={updMetaRef} style={{ opacity: 0 }}>Growthline.io &middot; Verified 2 days ago</span>
        </div>
        <span className="scd-deep-rec-dot" ref={dotRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }}></span>
      </div>

      {/* job change alert */}
      <div className="scd-deep-status" ref={statusRef} style={{ visibility: 'hidden' }}>
        <span ref={syncRef} style={{ display: 'inline-flex', opacity: 0, transform: 'rotate(0deg)' }}>
          <Icon name="refresh-cw" aria-hidden="true" />
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span ref={alertRef}></span>
          <span ref={cursorRef} className="scd-cur" aria-hidden="true" />
        </span>
      </div>

      <div className="scd-deep-divider" ref={dividerRef} aria-hidden="true" style={{ visibility: 'hidden', transform: 'scaleX(0)', transformOrigin: 'left' }}></div>

      <span className="scd-deep-sub" ref={subRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(4px)' }}>
        <span style={{ opacity: 1 }}>Replacement</span>{' '}
        <span style={{ opacity: 0.6 }}>found at Acme Corp</span>
      </span>

      {/* replacement contact */}
      <div className="scd-deep-rec is-replace" ref={repRowRef} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(14px)' }}>
        <span className="scd-deep-av purple" ref={repAvRef} aria-hidden="true" style={{ opacity: 0, transform: 'scale(0)' }}>SK</span>
        <div className="scd-deep-rec-id">
          <span className="scd-deep-rec-name" ref={repNameRef} style={{ opacity: 0, transform: 'translateX(-8px)' }}>Sarah K. &middot; VP Sales</span>
          <span className="scd-deep-rec-meta" ref={repMetaRef} style={{ opacity: 0 }}>Acme Corp &middot; Signal: New hire, scaling team</span>
        </div>
        <div className="scd-deep-score">
          <span className="scd-deep-score-num" ref={scoreRef} style={{ opacity: 1, transform: 'scale(1)' }}>0</span>
          <span className="scd-deep-score-lbl" ref={scoreLblRef} style={{ opacity: 0 }}>Score</span>
        </div>
      </div>

      <div className="scd-deep-actions">
        <button type="button" className="scd-deep-btn primary" ref={btn1Ref} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(10px)', background: 'transparent' }}>
          Open in Zeus <Icon name="arrow-right" aria-hidden="true" />
        </button>
        <button type="button" className="scd-deep-btn ghost" ref={btn2Ref} style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(10px)' }}>
          Add to Sendrit campaign <Icon name="arrow-right" aria-hidden="true" />
        </button>
      </div>

      {/* component-scoped keyframe effects (class-toggled from the loop) */}
      <style jsx>{`
        .scd-cur {
          display: inline-block;
          width: 1px;
          height: 12px;
          margin-left: 3px;
          background: #7c3aed;
          vertical-align: middle;
          opacity: 0;
        }
        .scd-cur.on { opacity: 1; }
        .scd-cur.blink { animation: scdCurBlink 0.4s steps(1, end) 0s 2; }

        .scd-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 45%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
          transform: translateX(-160%);
          pointer-events: none;
        }
        .scd-shimmer.sweep { animation: scdShimmerSweep 800ms ease-out; }

        .scd-ripple { animation: scdBadgeRipple 500ms ease-out; }

        @keyframes scdCurBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scdShimmerSweep {
          from { transform: translateX(-160%); }
          to { transform: translateX(360%); }
        }
        @keyframes scdBadgeRipple {
          from { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.5); }
          to { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
        }
      `}</style>
    </div>
  );
}
