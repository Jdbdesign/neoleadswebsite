'use client';

// "Snaarpmail + NeoBrain AI — Monitor & protect post-send" step card (card 5 of
// the /stale-contact-data "Full Fix" bento). The OUTER card (badge, heading,
// body) runs a one-time scroll entrance and then never moves. The INNER monitor
// panel loops continuously, replaying a complete threat-detection story:
//   ACT 1 — Healthy monitoring: metrics count up in the safe zone
//   ACT 2 — Hard bounces arrive: alert snaps in, red-dot alarm, bounce rate spikes
//   ACT 3 — Auto-quarantine executes: "Quarantined" badge stamps in, alarm answered
//   ACT 4 — Metrics correct: bounce rate counts back down to its safe value
//   ACT 5 — Reputation confirmed: the "Healthy" bar appears LAST, as the payoff
// The alert + "Quarantined" beat (ACT 2–3) deliberately resolves before the
// green "Domain reputation: Healthy" bar ever appears (ACT 5).
// then a long satisfied hold, a sequential mechanical wipe, and the cycle restarts.
//
// DOM-driven, not React-driven: every per-frame change runs through refs and
// JS-scheduled CSS transitions / rAF tweens — zero setState during the loop. A
// single recursive runMonitorCycle() drives it; a `cancelled` ref breaks the
// recursion on unmount and all timers / rAF ids are tracked in refs and
// cancelled there. Keyframes (alarm pulse, threat ripple, quarantine stamp,
// monitor pulse) are scoped via the unique `scdmon` prefix so nothing leaks into
// global styles.
//
// Keeps `data-reveal data-reveal-skip` so the global reveal engine leaves its
// visuals to this component while siblings' stagger indices stay intact. No
// global CSS touched — original .scd-fix-* classes style the frame; only the
// bespoke motion lives here.

import { useEffect, useRef, useState } from 'react';

const WHITE = '#FFFFFF';
const AMBER = '#F59E0B';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

export default function StaleContactDataMonitorCard() {
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const mockRef = useRef(null);

  // metric tiles
  const tile1Ref = useRef(null);
  const tile2Ref = useRef(null);
  const bounceNumRef = useRef(null);
  const spamNumRef = useRef(null);
  const bounceLblRef = useRef(null);
  const spamLblRef = useRef(null);

  // alert row
  const alertRowRef = useRef(null);
  const dotRef = useRef(null);
  const alertTextRef = useRef(null);
  const badgeRef = useRef(null);

  // reputation bar
  const barRef = useRef(null);
  const barTextRef = useRef(null);
  const checkRef = useRef(null);
  const typedPreRef = useRef(null);
  const greenDotRef = useRef(null);
  const typedPostRef = useRef(null);

  const hasStarted = useRef(false);
  const cancelled = useRef(false);
  const timers = useRef(new Set());
  const rafs = useRef(new Set());

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Reset control refs every effect run (React 18 StrictMode mounts →
    // cleans up → remounts; cleanup sets cancelled=true).
    cancelled.current = false;
    hasStarted.current = false;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // ---- tracked primitives ----
    const later = (fn, ms) =>
      new Promise((resolve) => {
        const id = setTimeout(() => {
          timers.current.delete(id);
          if (!cancelled.current && fn) fn();
          resolve();
        }, ms);
        timers.current.add(id);
      });
    const pause = (ms) => later(null, ms);
    const animate = (duration, fn) =>
      new Promise((resolve) => {
        const start = performance.now();
        let id;
        const step = (now) => {
          rafs.current.delete(id);
          if (cancelled.current) return resolve();
          const t = Math.min(1, (now - start) / duration);
          fn(t);
          if (t < 1) {
            id = requestAnimationFrame(step);
            rafs.current.add(id);
          } else {
            resolve();
          }
        };
        id = requestAnimationFrame(step);
        rafs.current.add(id);
      });

    // counts a number from→to, writing fmt(value) each frame; onValue gives the
    // raw value (used to gate label fade-ins on a threshold)
    const countUp = (node, from, to, duration, easing, fmt, onValue) =>
      animate(duration, (t) => {
        const v = from + (to - from) * easing(t);
        if (node) node.textContent = fmt(v);
        if (onValue) onValue(v);
      });

    // types text into a node char-by-char
    const typeIn = async (node, text, speed) => {
      if (!node) return;
      for (let i = 0; i < text.length; i++) {
        if (cancelled.current) return;
        node.textContent += text[i];
        await pause(speed);
      }
    };

    // ---- small style helpers ----
    const fadeIn = (node, dur) => {
      if (!node) return;
      node.style.transition = `opacity ${dur}ms ease-out`;
      node.style.opacity = '1';
    };
    const fadeOut = (node, dur) => {
      if (!node) return;
      node.style.transition = `opacity ${dur}ms ease`;
      node.style.opacity = '0';
    };
    // opacity 0→1 + translateY(ty→0)
    const enter = (node, dur, ty) =>
      animate(dur, (t) => {
        const e = easeOutCubic(t);
        if (node) {
          node.style.opacity = String(e);
          node.style.transform = `translateY(${ty * (1 - e)}px)`;
        }
      }).then(() => { if (node) node.style.transform = 'none'; });
    // scale 0→1
    const scaleIn = (node, dur) =>
      animate(dur, (t) => {
        const e = easeOutCubic(t);
        if (node) node.style.transform = `scale(${e})`;
      }).then(() => { if (node) node.style.transform = 'none'; });
    // scale 0→peak→1 (entrance overshoot, e.g. checkmark)
    const springIn = (node, peak, dur) =>
      animate(dur, (t) => {
        const s = t < 0.5 ? peak * (t / 0.5) : peak - (peak - 1) * ((t - 0.5) / 0.5);
        if (node) node.style.transform = `scale(${s})`;
      }).then(() => { if (node) node.style.transform = 'none'; });
    // scale 1→peak→1 (re-affirm pulse)
    const pulseScale = (node, peak, dur) =>
      animate(dur, (t) => {
        const s = t < 0.5 ? 1 + (peak - 1) * (t / 0.5) : peak - (peak - 1) * ((t - 0.5) / 0.5);
        if (node) node.style.transform = `scale(${s})`;
      }).then(() => { if (node) node.style.transform = 'none'; });
    // single opacity dip 1→(1-dip)→1 (live readout "breath")
    const breatheOnce = (node, dur, dip) =>
      animate(dur, (t) => {
        if (node) node.style.opacity = String(1 - dip * Math.sin(Math.PI * t));
      }).then(() => { if (node) node.style.opacity = '1'; });
    // status text arrives from the left
    const slideInText = (node, dur) => {
      if (!node) return;
      node.style.transition = 'none';
      node.style.opacity = '0';
      node.style.transform = 'translateX(-6px)';
      void node.offsetWidth;
      node.style.transition = `opacity ${dur}ms ease-out, transform ${dur}ms ease-out`;
      node.style.opacity = '1';
      node.style.transform = 'translateX(0)';
    };

    const setWill = (on) => {
      const v = on ? 'transform, opacity' : 'auto';
      [tile1Ref, tile2Ref, bounceNumRef, spamNumRef, alertRowRef, dotRef, badgeRef, barRef].forEach((r) => {
        if (r.current) r.current.style.willChange = v;
      });
    };

    // =====================================================================
    // ACT 1 — Healthy monitoring
    // =====================================================================
    const act1 = async () => {
      setWill(true);
      // tile shells materialize together
      enter(tile1Ref.current, 350, 8);
      enter(tile2Ref.current, 350, 8);

      // both counters run simultaneously; labels fade in on a value threshold
      let bounceLblShown = false;
      let spamLblShown = false;
      const c1 = countUp(
        bounceNumRef.current, 0, 0.3, 600, easeOutCubic,
        (v) => v.toFixed(1) + '%',
        (v) => { if (!bounceLblShown && v >= 0.2) { bounceLblShown = true; fadeIn(bounceLblRef.current, 200); } }
      );
      const c2 = countUp(
        spamNumRef.current, 0, 0.04, 600, easeOutCubic,
        (v) => v.toFixed(2) + '%',
        (v) => { if (!spamLblShown && v >= 0.02) { spamLblShown = true; fadeIn(spamLblRef.current, 200); } }
      );
      await Promise.all([c1, c2]); // ~600ms

      // monitoring idle — a faint live-readout breath, offset between the two
      breatheOnce(bounceNumRef.current, 2000, 0.25);
      later(() => breatheOnce(spamNumRef.current, 2000, 0.25), 300);

      // monitoring hold — one more live-readout blink, calm before the storm.
      // The reputation bar is intentionally NOT shown yet — it's the ACT 5 payoff.
      breatheOnce(bounceNumRef.current, 1500, 0.2);
      breatheOnce(spamNumRef.current, 1500, 0.2);
      await pause(900);
    };

    // =====================================================================
    // ACT 2 — Hard bounces arrive
    // =====================================================================
    const act2 = async () => {
      const row = alertRowRef.current;
      // alert row snaps in
      if (row) row.style.visibility = 'visible';
      animate(200, (t) => {
        const e = easeOutCubic(t);
        if (row) { row.style.opacity = String(e); row.style.transform = `translateY(${-6 * (1 - e)}px)`; }
      }).then(() => { if (row) row.style.transform = 'none'; });
      if (row) {
        row.style.transition = 'background 250ms ease, border-color 250ms ease';
        row.style.background = 'rgba(239,68,68,0.08)';
        row.style.borderColor = 'rgba(239,68,68,0.35)';
      }

      // red-dot alarm: appears, then a rapid pulse + radiating ripple
      const dot = dotRef.current;
      if (dot) dot.style.opacity = '1';
      scaleIn(dot, 200);
      later(() => {
        if (dot) dot.style.animation = 'scdmonAlarm 500ms ease-in-out 3, scdmonRipple 600ms ease-out 2';
      }, 200);

      // alert text arrives as the alarm fires
      later(() => slideInText(alertTextRef.current, 250), 100);

      await pause(300); // → bounce rate reacts 300ms after the alert row

      // bounce rate spikes into caution territory
      if (bounceNumRef.current) {
        bounceNumRef.current.style.transition = 'color 200ms ease';
        bounceNumRef.current.style.color = AMBER;
      }
      countUp(bounceNumRef.current, 0.3, 0.7, 400, easeOutQuart, (v) => v.toFixed(1) + '%');
      if (tile1Ref.current) {
        tile1Ref.current.style.transition = 'box-shadow 400ms ease';
        tile1Ref.current.style.boxShadow = '0 0 0 1px rgba(245,158,11,0.5)';
      }
      // spam rate stays put — bounces haven't caused complaints

      await pause(400); // spike completes
      await pause(600); // alert hold — maximum tension
    };

    // =====================================================================
    // ACT 3 — Auto-quarantine executes
    // =====================================================================
    const act3 = async () => {
      const row = alertRowRef.current;
      const dot = dotRef.current;
      const badge = badgeRef.current;

      // "Quarantined" badge stamps in like a rubber stamp
      if (badge) {
        badge.style.visibility = 'visible';
        badge.style.opacity = '1';
        badge.style.animation = 'scdmonStamp 320ms cubic-bezier(0.34,1.56,0.64,1) forwards';
      }
      // alert row registers the system action with a brief brighter flash
      if (row) {
        row.style.transition = 'background 100ms ease';
        row.style.background = 'rgba(239,68,68,0.18)';
        later(() => { if (row) row.style.background = 'rgba(239,68,68,0.08)'; }, 100);
      }
      // the alarm has been answered — rapid pulse stops, dot settles steady
      if (dot) {
        dot.style.animation = 'none';
        dot.style.transform = 'none';
        dot.style.opacity = '0.8';
      }
      // one final ripple after the badge lands, then silence
      later(() => {
        if (dot) dot.style.animation = 'scdmonRipple 500ms ease-out 1';
        later(() => { if (dot) dot.style.animation = 'none'; }, 520);
      }, 200);

      await pause(320); // stamp settles
      await pause(500); // system-response hold
    };

    // =====================================================================
    // ACT 4 — Metrics correct
    // =====================================================================
    const act4 = async () => {
      // bounces are contained — bounce rate corrects back to its true safe value
      if (bounceNumRef.current) {
        bounceNumRef.current.style.transition = 'color 400ms ease';
        bounceNumRef.current.style.color = WHITE;
      }
      countUp(bounceNumRef.current, 0.7, 0.3, 500, easeOutCubic, (v) => v.toFixed(1) + '%');
      if (tile1Ref.current) {
        tile1Ref.current.style.transition = 'box-shadow 400ms ease';
        tile1Ref.current.style.boxShadow = 'none';
      }
      // alert row settles — still red-tinted (the event happened), but calmer
      if (alertRowRef.current) {
        alertRowRef.current.style.transition = 'background 400ms ease';
        alertRowRef.current.style.background = 'rgba(239,68,68,0.05)';
      }

      await pause(900); // metrics safe, system calm — ready to confirm reputation
    };

    // =====================================================================
    // ACT 5 — Reputation confirmed (the "Healthy" bar appears last)
    // =====================================================================
    const act5 = async () => {
      // reputation confirmed healthy — the bar appears NOW, after the quarantine,
      // as the closing confirmation that the domain held through the bounces
      enter(barRef.current, 350, 6);
      later(() => { springIn(checkRef.current, 1.2, 280); if (checkRef.current) checkRef.current.style.opacity = '1'; }, 100);

      await pause(150); // type starts 150ms after the bar
      await typeIn(typedPreRef.current, 'Domain reputation: ', 22);
      await typeIn(typedPostRef.current, 'Healthy', 22);

      // green status dot springs in before "Healthy", then a slow monitoring pulse
      scaleIn(greenDotRef.current, 200);
      later(() => { if (greenDotRef.current) greenDotRef.current.style.animation = 'scdmonMonitor 2s ease-in-out infinite'; }, 220);

      await pause(400); // let "Healthy" settle

      // one confident green breath — still healthy, despite the bounces
      if (barRef.current) {
        barRef.current.style.transition = 'background 300ms ease';
        barRef.current.style.background = 'rgba(34,197,94,0.18)';
        later(() => { if (barRef.current) barRef.current.style.background = 'rgba(34,197,94,0.1)'; }, 300);
      }
      pulseScale(checkRef.current, 1.1, 300);
      breatheOnce(tile1Ref.current, 1000, 0.2);
      later(() => breatheOnce(tile2Ref.current, 1000, 0.2), 200);

      await pause(700);
    };

    // ---- satisfied hold ----
    const hold = async (ms) => {
      setWill(false);
      breatheOnce(bounceNumRef.current, 2000, 0.25);
      later(() => breatheOnce(spamNumRef.current, 2000, 0.25), 400);
      breatheOnce(badgeRef.current, 2500, 0.3);
      await pause(ms);
      setWill(true);
    };

    // ---- sequential, mechanical wipe ----
    const resetAnimated = async () => {
      fadeOut(barRef.current, 200);                                   // 1 — green bar out
      await pause(120);
      if (badgeRef.current) {                                          // 2 — alert row + badge out
        badgeRef.current.style.transition = 'transform 150ms ease, opacity 150ms ease';
        badgeRef.current.style.transform = 'scale(0.7)';
        badgeRef.current.style.opacity = '0';
      }
      if (alertRowRef.current) {
        alertRowRef.current.style.transition = 'opacity 180ms ease, transform 180ms ease';
        alertRowRef.current.style.opacity = '0';
        alertRowRef.current.style.transform = 'translateY(-4px)';
      }
      await pause(120);
      fadeOut(bounceNumRef.current, 180);                              // 3 — tile contents out
      fadeOut(spamNumRef.current, 180);
      fadeOut(bounceLblRef.current, 180);
      fadeOut(spamLblRef.current, 180);
      if (tile1Ref.current) tile1Ref.current.style.boxShadow = 'none';
      await pause(60);
      fadeOut(tile1Ref.current, 150);                                  // 4 — tile shells out
      fadeOut(tile2Ref.current, 150);
      await pause(150);
    };

    // ---- instant reset to ACT-1 starting state ----
    const resetInstant = () => {
      const off = (node) => { if (node) { node.style.transition = 'none'; node.style.animation = 'none'; } };

      [tile1Ref, tile2Ref].forEach((r) => {
        if (r.current) {
          r.current.style.transition = 'none';
          r.current.style.opacity = '0';
          r.current.style.transform = 'none';
          r.current.style.boxShadow = 'none';
        }
      });
      if (bounceNumRef.current) { off(bounceNumRef.current); bounceNumRef.current.style.color = WHITE; bounceNumRef.current.style.opacity = '1'; bounceNumRef.current.style.transform = 'none'; bounceNumRef.current.textContent = '0.0%'; }
      if (spamNumRef.current) { off(spamNumRef.current); spamNumRef.current.style.color = WHITE; spamNumRef.current.style.opacity = '1'; spamNumRef.current.style.transform = 'none'; spamNumRef.current.textContent = '0.00%'; }
      if (bounceLblRef.current) { bounceLblRef.current.style.transition = 'none'; bounceLblRef.current.style.opacity = '0'; }
      if (spamLblRef.current) { spamLblRef.current.style.transition = 'none'; spamLblRef.current.style.opacity = '0'; }

      if (alertRowRef.current) {
        const r = alertRowRef.current;
        r.style.transition = 'none';
        r.style.visibility = 'hidden';
        r.style.opacity = '0';
        r.style.transform = 'none';
        r.style.background = 'rgba(239,68,68,0)';
        r.style.borderColor = 'rgba(239,68,68,0)';
      }
      if (dotRef.current) { off(dotRef.current); dotRef.current.style.opacity = '0'; dotRef.current.style.transform = 'scale(0)'; dotRef.current.style.boxShadow = 'none'; }
      if (alertTextRef.current) { alertTextRef.current.style.transition = 'none'; alertTextRef.current.style.opacity = '0'; alertTextRef.current.style.transform = 'none'; }
      if (badgeRef.current) { off(badgeRef.current); badgeRef.current.style.visibility = 'hidden'; badgeRef.current.style.opacity = '0'; badgeRef.current.style.transform = 'none'; }

      if (barRef.current) { barRef.current.style.transition = 'none'; barRef.current.style.opacity = '0'; barRef.current.style.transform = 'translateY(6px)'; barRef.current.style.background = 'rgba(34,197,94,0.1)'; }
      if (barTextRef.current) { barTextRef.current.style.transition = 'none'; barTextRef.current.style.opacity = '1'; }
      if (checkRef.current) { checkRef.current.style.transition = 'none'; checkRef.current.style.transform = 'scale(0)'; checkRef.current.style.opacity = '1'; }
      if (typedPreRef.current) typedPreRef.current.textContent = '';
      if (typedPostRef.current) typedPostRef.current.textContent = '';
      if (greenDotRef.current) { off(greenDotRef.current); greenDotRef.current.style.opacity = '1'; greenDotRef.current.style.transform = 'scale(0)'; }
    };

    // ---- master loop ----
    const runMonitorCycle = async () => {
      if (cancelled.current) return;
      resetInstant();
      await pause(350);
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
      await hold(2500);
      if (cancelled.current) return;
      await resetAnimated();
      await pause(350);
      if (!cancelled.current) runMonitorCycle();
    };

    // ---- reduced-motion / no-IO settled state ----
    const renderFinal = () => {
      if (mockRef.current) { mockRef.current.style.opacity = '1'; mockRef.current.style.transform = 'none'; }
      [tile1Ref, tile2Ref].forEach((r) => { if (r.current) { r.current.style.opacity = '1'; r.current.style.transform = 'none'; } });
      if (bounceNumRef.current) { bounceNumRef.current.style.color = WHITE; bounceNumRef.current.textContent = '0.3%'; }
      if (spamNumRef.current) { spamNumRef.current.style.color = WHITE; spamNumRef.current.textContent = '0.04%'; }
      if (bounceLblRef.current) bounceLblRef.current.style.opacity = '1';
      if (spamLblRef.current) spamLblRef.current.style.opacity = '1';
      if (alertRowRef.current) {
        const r = alertRowRef.current;
        r.style.visibility = 'visible';
        r.style.opacity = '1';
        r.style.background = 'rgba(239,68,68,0.05)';
        r.style.borderColor = 'rgba(239,68,68,0.35)';
      }
      if (dotRef.current) { dotRef.current.style.opacity = '0.8'; dotRef.current.style.transform = 'none'; }
      if (alertTextRef.current) alertTextRef.current.style.opacity = '1';
      if (badgeRef.current) { badgeRef.current.style.visibility = 'visible'; badgeRef.current.style.opacity = '1'; badgeRef.current.style.transform = 'none'; }
      if (barRef.current) { barRef.current.style.opacity = '1'; barRef.current.style.transform = 'none'; }
      if (checkRef.current) { checkRef.current.style.opacity = '1'; checkRef.current.style.transform = 'none'; }
      if (typedPreRef.current) typedPreRef.current.textContent = 'Domain reputation: ';
      if (typedPostRef.current) typedPostRef.current.textContent = 'Healthy';
      if (greenDotRef.current) greenDotRef.current.style.transform = 'none';
    };

    // ---- entrance (Phase 2) then the loop ----
    const startEntrance = async () => {
      if (mockRef.current) mockRef.current.style.minHeight = mockRef.current.offsetHeight + 'px';
      await pause(500);
      animate(400, (t) => {
        const e = easeOutCubic(t);
        if (mockRef.current) {
          mockRef.current.style.opacity = String(e);
          mockRef.current.style.transform = `translateY(${10 * (1 - e)}px)`;
        }
      });
      await pause(400); // panel settled, then the loop begins
      hasStarted.current = true;
      runMonitorCycle();
    };

    // ---- trigger ----
    if (prefersReduced || !hasIO) {
      setReduced(true);
      setEntered(true);
      const id = setTimeout(renderFinal, 0);
      timers.current.add(id);
      return () => {
        cancelled.current = true;
        timers.current.forEach(clearTimeout);
        rafs.current.forEach(cancelAnimationFrame);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            setEntered(true);
            startEntrance();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => {
      cancelled.current = true;
      io.disconnect();
      timers.current.forEach(clearTimeout);
      rafs.current.forEach(cancelAnimationFrame);
      timers.current.clear();
      rafs.current.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes scdmonAlarm {
  0%, 100% { transform: scale(1);   opacity: 1;   }
  50%      { transform: scale(1.6); opacity: 0.5; }
}
@keyframes scdmonRipple {
  0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
  100% { box-shadow: 0 0 0 12px rgba(239,68,68,0); }
}
@keyframes scdmonStamp {
  0%   { transform: scale(0);    opacity: 0; }
  55%  { transform: scale(1.2);  opacity: 1; }
  80%  { transform: scale(0.95); }
  100% { transform: scale(1.0);  opacity: 1; }
}
@keyframes scdmonMonitor {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}`,
        }}
      />

      <div className="scd-fix-card-head" style={o(150, 350)}>
        <span className="scd-fix-num">5</span>
        <span className="scd-fix-product">Snaarpmail &bull; NeoBrain AI</span>
      </div>
      <h3 className="scd-fix-title" style={o(250, 350, 8)}>Monitor &amp; protect post-send</h3>
      <p className="scd-fix-desc" style={o(380, 350, 8)}>
        Snaarpmail auto-quarantines hard bounces and tracks domain health in real time
        &mdash; so the team knows the moment something shifts, not four campaigns later.
      </p>

      {/* ----- live loop zone ----- */}
      <div className="scd-fix-demo" ref={mockRef} style={{ opacity: 0, transform: 'translateY(10px)' }}>
        {/* Row 1 — metric tiles */}
        <div className="scd-fix-stats2">
          <div className="scd-fix-mini" ref={tile1Ref} style={{ opacity: 0 }}>
            <span className="scd-fix-mini-num" ref={bounceNumRef} style={{ display: 'inline-block', color: '#FFFFFF' }}>0.0%</span>
            <span className="scd-fix-mini-lbl" ref={bounceLblRef} style={{ opacity: 0 }}>Bounce rate</span>
          </div>
          <div className="scd-fix-mini" ref={tile2Ref} style={{ opacity: 0 }}>
            <span className="scd-fix-mini-num" ref={spamNumRef} style={{ display: 'inline-block', color: '#FFFFFF' }}>0.00%</span>
            <span className="scd-fix-mini-lbl" ref={spamLblRef} style={{ opacity: 0 }}>Spam rate</span>
          </div>
        </div>

        {/* Row 2 — alert / quarantine */}
        <div
          className="scd-fix-alert"
          ref={alertRowRef}
          style={{ visibility: 'hidden', opacity: 0, background: 'rgba(239,68,68,0)', borderColor: 'rgba(239,68,68,0)' }}
        >
          <span className="scd-fix-alert-msg">
            <span
              className="scd-fix-dot"
              ref={dotRef}
              aria-hidden="true"
              style={{ background: '#EF4444', opacity: 0, transform: 'scale(0)' }}
            />
            <span ref={alertTextRef} style={{ opacity: 0 }}>2 hard bounces detected</span>
          </span>
          <span
            className="scd-fix-quar"
            ref={badgeRef}
            style={{
              visibility: 'hidden',
              opacity: 0,
              color: '#EF4444',
              borderColor: 'rgba(239,68,68,0.6)',
              background: 'rgba(239,68,68,0.12)',
            }}
          >
            Quarantined
          </span>
        </div>

        {/* Row 3 — domain reputation */}
        <div
          className="scd-fix-pill"
          ref={barRef}
          style={{ opacity: 0, transform: 'translateY(6px)' }}
        >
          <span ref={checkRef} style={{ display: 'inline-block', transform: 'scale(0)' }}>✓</span>
          <span ref={barTextRef} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span ref={typedPreRef} />
            <span
              ref={greenDotRef}
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#22C55E',
                margin: '0 6px',
                transform: 'scale(0)',
              }}
            />
            <span ref={typedPostRef} />
          </span>
        </div>
      </div>
    </article>
  );
}
