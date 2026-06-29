'use client';

// "Inbox Placement Monitor" card (left column of the List-Hygiene + Monitoring
// band on /emails-landing-in-spam). Like its sibling setup card, this one is
// INTENTIONALLY always-on: a single requestAnimationFrame loop starts on mount —
// NOT on scroll — and begins at a RANDOM offset so a visitor scrolling in joins a
// monitor that is already running. Genuinely live, not a staged demo.
//
// Four independent sub-systems share one clock (elapsed = now - mount + offset):
//   1. Heartbeat        — a 2s "Snaarpmail · live" pulse + a faint scan sweep
//                         washing across the provider bars on every beat.
//   2. Provider bars    — Gmail (stable, 8s readings), Outlook (solid, 6s),
//                         Yahoo (the nervous one: a 10s dip → warn → recover
//                         state-machine with colour + triangle-pulse + footer swap).
//   3. Spam ticker      — a 14s subtle 0.06% → 0.07% → 0.06% blip.
//   4. Verifyrit scan   — an independent 9s scan/complete/reset sub-cycle that
//                         counts the classification chips up and the bounce
//                         forecast down, then resets like a fresh list loaded.
//
// All per-frame values are derived from `elapsed` and written idempotently via
// ref.style / ref.textContent (cached so the DOM is only touched on change) —
// so a cold mid-cycle entry simply renders the correct frame and continues. The
// few one-shots (scan sweep, Verifyrit complete-wash, value cross-fades) are
// guarded by "last index" trackers and primed on the first frame so nothing
// replays on entry. Zero setState; `cancelled` + tracked timers/raf tear it all
// down on unmount. Keyframes are scoped with the `esscm` prefix. No global CSS is
// touched — the original .els-monitor-* / .els-mon-* classes still style it.

import { useEffect, useRef } from 'react';
import Icon from '@/components/Icon';

const RED = '#EF4444';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Yahoo % over its 10s dip sub-cycle (91 → 88 → recover → 91)
function yahooPct(sub) {
  if (sub < 2000) return 91 + (88 - 91) * easeInOutCubic(sub / 2000);
  if (sub < 3500) {
    if (sub < 2500) return 88;
    if (sub < 3000) return 89;
    return 90;
  }
  if (sub < 5000) return 90 + (91 - 90) * easeOutCubic((sub - 3500) / 1500);
  return 91;
}

export default function EmailsSpamMonitorCard() {
  const rootRef = useRef(null);

  // heartbeat
  const dotRef = useRef(null);
  const sweepRef = useRef(null);

  // provider bars
  const gmStatRef = useRef(null);
  const gmPrimRef = useRef(null);
  const gmSpamRef = useRef(null);
  const olStatRef = useRef(null);
  const olPrimRef = useRef(null);
  const olSpamRef = useRef(null);
  const yaStatRef = useRef(null); // outer span (colour)
  const yaTextRef = useRef(null); // inner text node
  const yaIconRef = useRef(null); // triangle wrapper (pulse)
  const yaPrimRef = useRef(null);
  const yaSpamRef = useRef(null);

  // footer
  const noteRef = useRef(null);
  const spamValRef = useRef(null);

  // verifyrit
  const verifyPanelRef = useRef(null);
  const checkedRef = useRef(null);
  const deliverRef = useRef(null);
  const invalidRef = useRef(null);
  const riskyRef = useRef(null);
  const bounceRef = useRef(null);
  const downRef = useRef(null);
  const routeRef = useRef(null);

  const cancelled = useRef(false);
  const rafId = useRef(0);
  const timers = useRef(new Set());

  useEffect(() => {
    cancelled.current = false;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof requestAnimationFrame === 'undefined') return;

    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timers.current.delete(id);
        if (!cancelled.current) fn();
      }, ms);
      timers.current.add(id);
    };

    // live dot pulse — independent of the rAF loop, runs forever
    if (dotRef.current) dotRef.current.style.animation = 'esscmLivePulse 2s ease-out infinite';

    const crossfade = (node, text) => {
      if (!node) return;
      node.style.transition = 'opacity 100ms ease';
      node.style.opacity = '0';
      later(() => {
        node.textContent = text;
        node.style.opacity = '1';
      }, 110);
    };

    // ---- provider state (discrete sensor readings, tweened) ----
    const mk = (interval, lo, hi, start) => ({ interval, lo, hi, cur: start, beat: -1, tween: null });
    const gm = mk(8000, 95.5, 96.5, 96);
    const ol = mk(6000, 92, 94, 93);

    const stepProvider = (p, elapsed) => {
      const beat = Math.floor(elapsed / p.interval);
      if (beat !== p.beat) {
        if (p.beat !== -1) {
          p.tween = { from: p.cur, to: p.lo + Math.random() * (p.hi - p.lo), start: elapsed, dur: 600 };
        }
        p.beat = beat;
      }
      if (p.tween) {
        const t = (elapsed - p.tween.start) / p.tween.dur;
        if (t >= 1) {
          p.cur = p.tween.to;
          p.tween = null;
        } else {
          return p.tween.from + (p.tween.to - p.tween.from) * easeOutCubic(t);
        }
      }
      return p.cur;
    };

    // ---- caches (write DOM only on change) ----
    const cache = {
      gm: -1, ol: -1, ya: -1, yaColor: '', yaPulse: null,
      note: null, spam: null,
      checked: -1, deliver: -1, invalid: -1, risky: -1, bounce: '', down: null, route: null,
    };

    const writeBar = (prim, spam, pct) => {
      if (prim) prim.style.width = pct + '%';
      if (spam) spam.style.width = 100 - pct + '%';
    };

    // ---- per-cycle one-shot trackers ----
    let lastBeat = -1;
    let lastVfyCycle = -1;
    let washed = false;
    let primed = false;

    let mountTime = 0;
    let offset = 0;

    const tick = (now) => {
      if (cancelled.current) return;
      const elapsed = now - mountTime + offset;

      // ===== SYSTEM 1 — heartbeat scan sweep =====
      const beatIdx = Math.floor(elapsed / 2000);
      if (beatIdx !== lastBeat) {
        if (lastBeat !== -1 && sweepRef.current) {
          sweepRef.current.style.animation = 'none';
          void sweepRef.current.offsetWidth;
          sweepRef.current.style.animation = 'esscmSweep 600ms ease-out';
        }
        lastBeat = beatIdx;
      }

      // ===== SYSTEM 2 — provider bars =====
      const gmv = stepProvider(gm, elapsed);
      if (Math.abs(gmv - cache.gm) > 0.02) {
        cache.gm = gmv;
        writeBar(gmPrimRef.current, gmSpamRef.current, gmv);
        if (gmStatRef.current) gmStatRef.current.textContent = Math.round(gmv) + '% Primary ';
      }
      const olv = stepProvider(ol, elapsed);
      if (Math.abs(olv - cache.ol) > 0.02) {
        cache.ol = olv;
        writeBar(olPrimRef.current, olSpamRef.current, olv);
        if (olStatRef.current) olStatRef.current.textContent = Math.round(olv) + '% Primary ';
      }

      // Yahoo dip state machine
      const yaSub = elapsed % 10000;
      const yav = yahooPct(yaSub);
      if (Math.abs(yav - cache.ya) > 0.02) {
        cache.ya = yav;
        writeBar(yaPrimRef.current, yaSpamRef.current, yav);
        if (yaTextRef.current) yaTextRef.current.textContent = Math.round(yav) + '% Primary ';
      }
      const yaColor = yav <= 88.5 ? RED : '';
      if (yaColor !== cache.yaColor) {
        cache.yaColor = yaColor;
        if (yaStatRef.current) yaStatRef.current.style.color = yaColor;
      }
      const yaPulse = yaSub < 3500;
      if (yaPulse !== cache.yaPulse) {
        cache.yaPulse = yaPulse;
        if (yaIconRef.current) yaIconRef.current.style.animation = yaPulse ? 'esscmWarn 800ms ease-in-out infinite' : 'none';
      }
      const note = yaSub < 3500 ? 'Yahoo: monitoring closely' : 'Monitoring: within safe range';
      if (note !== cache.note) {
        if (cache.note === null) {
          if (noteRef.current) noteRef.current.textContent = note;
        } else {
          crossfade(noteRef.current, note);
        }
        cache.note = note;
      }

      // ===== SYSTEM 3 — spam complaints ticker =====
      const spamVal = elapsed % 14000 < 3000 ? '0.07%' : '0.06%';
      if (spamVal !== cache.spam) {
        if (cache.spam === null) {
          if (spamValRef.current) spamValRef.current.textContent = spamVal;
        } else {
          crossfade(spamValRef.current, spamVal);
        }
        cache.spam = spamVal;
      }

      // ===== SYSTEM 4 — Verifyrit scan sub-cycle (9s) =====
      const sub = elapsed % 9000;
      const vfyCycle = Math.floor(elapsed / 9000);
      if (vfyCycle !== lastVfyCycle) {
        lastVfyCycle = vfyCycle;
        washed = false;
      }

      let checked;
      let deliver;
      let invalid;
      let risky;
      let bounce;
      let downOn;
      let routeOn;
      if (sub < 7500) {
        checked = sub < 2000 ? Math.round(easeOutQuart(sub / 2000) * 820) : 820;
        deliver = sub < 2000 ? Math.round(easeOutQuart(sub / 2000) * 761) : 761;
        invalid = sub < 500 ? 0 : sub < 2000 ? Math.round(easeOutQuart((sub - 500) / 1500) * 41) : 41;
        risky = sub < 1000 ? 0 : sub < 2000 ? Math.round(easeOutQuart((sub - 1000) / 1000) * 18) : 18;
        bounce = sub < 3000 ? 7.2 + (0.3 - 7.2) * easeOutCubic(sub / 3000) : 0.3;
        downOn = sub >= 1000;
        routeOn = deliver >= 761;
      } else {
        checked = 0;
        deliver = 0;
        invalid = 0;
        risky = 0;
        bounce = 7.2;
        downOn = false;
        routeOn = false;
      }

      if (checked !== cache.checked) {
        cache.checked = checked;
        if (checkedRef.current) checkedRef.current.textContent = checked + ' checked';
      }
      if (deliver !== cache.deliver) {
        cache.deliver = deliver;
        if (deliverRef.current) deliverRef.current.textContent = deliver;
      }
      if (invalid !== cache.invalid) {
        cache.invalid = invalid;
        if (invalidRef.current) invalidRef.current.textContent = invalid;
      }
      if (risky !== cache.risky) {
        cache.risky = risky;
        if (riskyRef.current) riskyRef.current.textContent = risky;
      }
      const bounceTxt = bounce.toFixed(1) + '%';
      if (bounceTxt !== cache.bounce) {
        cache.bounce = bounceTxt;
        if (bounceRef.current) bounceRef.current.textContent = bounceTxt;
      }
      if (downOn !== cache.down) {
        cache.down = downOn;
        if (downRef.current) downRef.current.style.opacity = downOn ? '1' : '0';
      }
      if (routeOn !== cache.route) {
        cache.route = routeOn;
        if (routeRef.current) {
          routeRef.current.style.opacity = routeOn ? '1' : '0';
          routeRef.current.style.transform = routeOn ? 'translateX(0)' : 'translateX(6px)';
        }
      }
      // complete-wash one-shot
      if (sub >= 5000 && sub < 7500 && !washed) {
        washed = true;
        if (!primed && verifyPanelRef.current) {
          verifyPanelRef.current.style.animation = 'none';
          void verifyPanelRef.current.offsetWidth;
          verifyPanelRef.current.style.animation = 'esscmWash 800ms ease';
        }
      }

      primed = true;
      rafId.current = requestAnimationFrame(tick);
    };

    offset = Math.random() * 8000;
    rafId.current = requestAnimationFrame((now) => {
      mountTime = now;
      tick(now);
    });

    return () => {
      cancelled.current = true;
      cancelAnimationFrame(rafId.current);
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, []);

  return (
    <div className="els-monitor" data-reveal ref={rootRef}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes esscmLivePulse {
  0%   { transform: scale(1);   opacity: 1;   box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
  30%  { transform: scale(1.4); opacity: 0.8; box-shadow: 0 0 0 5px rgba(34,197,94,0);  }
  100% { transform: scale(1);   opacity: 1;   box-shadow: 0 0 0 0 rgba(34,197,94,0);    }
}
@keyframes esscmSweep {
  0%   { transform: translateX(-130%); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateX(130%);  opacity: 0; }
}
@keyframes esscmWarn {
  0%, 100% { opacity: 1;   transform: scale(1);   filter: drop-shadow(0 0 0px #F59E0B); }
  50%      { opacity: 0.7; transform: scale(1.3); filter: drop-shadow(0 0 6px #F59E0B); }
}
@keyframes esscmWash {
  0%   { background-color: rgba(34,197,94,0);    }
  50%  { background-color: rgba(34,197,94,0.05); }
  100% { background-color: rgba(34,197,94,0);    }
}`,
        }}
      />

      <div className="els-monitor-top">
        <span className="els-monitor-title">Inbox Placement Monitor</span>
        <span className="els-monitor-live">
          <span className="els-monitor-dot" aria-hidden="true" ref={dotRef} /> Snaarpmail · live
        </span>
      </div>

      <div className="els-mon-rows" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* heartbeat scan sweep */}
        <span
          ref={sweepRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '45%',
            pointerEvents: 'none',
            opacity: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.10) 50%, transparent 100%)',
            zIndex: 0,
          }}
        />

        <div className="els-mon-row">
          <div className="els-mon-row-head">
            <span className="els-mon-prov">Gmail</span>
            <span className="els-mon-stat green">
              <span ref={gmStatRef}>96% Primary </span>
              <Icon name="check" aria-hidden="true" />
            </span>
          </div>
          <div className="els-mon-bar">
            <span className="seg primary" ref={gmPrimRef} style={{ width: '96%' }} />
            <span className="seg spam" ref={gmSpamRef} style={{ width: '4%' }} />
          </div>
        </div>

        <div className="els-mon-row">
          <div className="els-mon-row-head">
            <span className="els-mon-prov">Outlook</span>
            <span className="els-mon-stat green">
              <span ref={olStatRef}>93% Primary </span>
              <Icon name="check" aria-hidden="true" />
            </span>
          </div>
          <div className="els-mon-bar">
            <span className="seg primary" ref={olPrimRef} style={{ width: '93%' }} />
            <span className="seg spam" ref={olSpamRef} style={{ width: '7%' }} />
          </div>
        </div>

        <div className="els-mon-row">
          <div className="els-mon-row-head">
            <span className="els-mon-prov">Yahoo</span>
            <span className="els-mon-stat amber" ref={yaStatRef}>
              <span ref={yaTextRef}>91% Primary </span>
              <span ref={yaIconRef} style={{ display: 'inline-flex' }}>
                <Icon name="triangle-alert" aria-hidden="true" />
              </span>
            </span>
          </div>
          <div className="els-mon-bar">
            <span className="seg primary" ref={yaPrimRef} style={{ width: '91%' }} />
            <span className="seg spam" ref={yaSpamRef} style={{ width: '9%' }} />
          </div>
        </div>
      </div>

      <div className="els-mon-meta">
        <span className="els-mon-note" ref={noteRef} style={{ display: 'inline-block' }}>
          Monitoring: within safe range
        </span>
        <span className="els-mon-stats">
          Spam complaints:{' '}
          <span ref={spamValRef} style={{ display: 'inline-block' }}>0.06%</span> · 0 blacklists
        </span>
      </div>

      <div className="els-mon-verify" ref={verifyPanelRef}>
        <div className="els-mon-verify-top">
          <span className="els-mon-verify-title">Verifyrit: Pre-Campaign Check</span>
          <span className="els-mon-verify-count" ref={checkedRef}>820 checked</span>
        </div>
        <div className="els-mon-chips">
          <span className="els-mon-chip green"><b ref={deliverRef}>761</b> Deliverable</span>
          <span className="els-mon-chip red"><b ref={invalidRef}>41</b> Invalid</span>
          <span className="els-mon-chip amber"><b ref={riskyRef}>18</b> Risky</span>
          <span className="els-mon-chip gray"><b>0</b> Spam Trap</span>
        </div>
        <div className="els-mon-verify-foot">
          <span>
            Bounce forecast: <b className="green" ref={bounceRef}>0.3%</b>{' '}
            <span className="els-mon-down" ref={downRef} style={{ transition: 'opacity 300ms ease' }}>
              ↓ from 7.2%
            </span>
          </span>
          <span
            className="els-mon-route"
            ref={routeRef}
            style={{ transition: 'opacity 300ms ease, transform 300ms ease' }}
          >
            761 → Sendrit
          </span>
        </div>
      </div>
    </div>
  );
}
