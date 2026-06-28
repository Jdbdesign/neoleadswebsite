'use client';

// "Verifyrit — Clean the List" step card (card 2 of the /low-reply-rates
// "Full Fix" bento). The OUTER card (badge, heading, body) runs a one-time
// scroll entrance and then never moves. The INNER "LIST HEALTH" panel loops
// continuously, showing Verifyrit running a list through validation in real
// time: a four-segment bar fills valid → catch-all → spam-trap, then a purple
// "resolution sweep" washes the tricolor into one clean processed bar.
//
// Per the brief the loop is DOM-driven, not React-driven: every counter is a
// textContent write, every colour a style mutation, every width a per-frame
// requestAnimationFrame update — zero setState during the loop, so the
// component never re-renders mid-cycle. A single recursive runValidationCycle()
// drives the stages; a `cancelled` ref breaks the recursion on unmount and all
// timers / rAF ids are tracked in refs and cancelled there too.
//
// The card keeps `data-reveal data-reveal-skip` so the global reveal engine
// leaves its visuals to this component while siblings' stagger indices stay
// intact. No global CSS is touched — original .lrr-fix-* / .lrr-fixm-* classes
// style everything; only the bespoke motion lives here.

import { useEffect, useRef, useState } from 'react';

// --- easing ---
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
// cubic-bezier(0.4, 0, 0.2, 1) — the "standard" easing, solved via Newton-Raphson
function cubicBezier(p1x, p1y, p2x, p2y) {
  const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
  const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (t) => {
    let x = t;
    for (let i = 0; i < 8; i++) {
      const e = sampleX(x) - t;
      if (Math.abs(e) < 1e-4) break;
      const d = slopeX(x);
      if (Math.abs(d) < 1e-6) break;
      x -= e / d;
    }
    return sampleY(x);
  };
}
const easeStandard = cubicBezier(0.4, 0, 0.2, 1);

const COLORS = {
  green: '#22C55E',
  amber: '#F59E0B',
  red: '#EF4444',
  white: '#FFFFFF',
  gray: 'var(--text-muted)',
};

const edgeStyle = (bg) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  width: '4px',
  height: '100%',
  background: bg,
  opacity: 0,
  pointerEvents: 'none',
});

export default function LowReplyRatesCleanListCard() {
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  // element refs
  const rootRef = useRef(null);
  const mockRef = useRef(null);
  const labelRef = useRef(null);
  const countWrapRef = useRef(null);
  const totalRef = useRef(null);
  const slashRef = useRef(null);

  const validRef = useRef(null);
  const catchRef = useRef(null);
  const spamRef = useRef(null);
  const resolvedRef = useRef(null);
  const validEdgeRef = useRef(null);
  const catchEdgeRef = useRef(null);
  const spamEdgeRef = useRef(null);
  const resolvedEdgeRef = useRef(null);
  const shimmerRef = useRef(null);

  const validNumRef = useRef(null);
  const catchNumRef = useRef(null);
  const spamNumRef = useRef(null);

  // loop-control refs (no re-render)
  const hasStarted = useRef(false);
  const cancelled = useRef(false);
  const timers = useRef(new Set());
  const rafs = useRef(new Set());

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Reset control refs every effect run (React 18 StrictMode mounts →
    // cleans up → remounts; cleanup sets cancelled=true, so without this the
    // real run would no-op every animation and the panel would sit empty).
    cancelled.current = false;
    hasStarted.current = false;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // ---- tracked primitives (cancelled on unmount) ----
    const later = (fn, ms) =>
      new Promise((resolve) => {
        const id = setTimeout(() => {
          timers.current.delete(id);
          if (fn) fn();
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

    // core utility — drives width + reports the segment's current fill fraction
    const animateWidth = (node, fromPct, toPct, duration, easing, onProgress) =>
      animate(duration, (t) => {
        const e = easing(t);
        const w = fromPct + (toPct - fromPct) * e;
        node.style.width = w + '%';
        if (onProgress) onProgress(w / 100, e);
      });

    // ---- counter bookkeeping (closure, no state) ----
    let validCount = 0;
    let catchCount = 0;
    let spamCount = 0;
    const setText = (ref, v) => { if (ref.current) ref.current.textContent = String(v); };
    const updateTop = () => setText(totalRef, validCount + catchCount + spamCount);
    const setEdge = (ref, o) => { if (ref.current) ref.current.style.opacity = String(o); };

    const setWill = (on) => {
      const v = on ? 'transform, opacity' : 'auto';
      [validRef, catchRef, spamRef, resolvedRef].forEach((r) => {
        if (r.current) r.current.style.willChange = v;
      });
    };

    const pop = (ref, peak, dur) =>
      animate(dur, (t) => {
        const s = t < 0.5 ? 1 + (peak - 1) * (t / 0.5) : peak - (peak - 1) * ((t - 0.5) / 0.5);
        if (ref.current) ref.current.style.transform = `scale(${s})`;
      }).then(() => { if (ref.current) ref.current.style.transform = 'none'; });

    const flashPanel = () => {
      const p = mockRef.current;
      if (!p) return;
      p.style.transition = 'background 100ms ease';
      p.style.background = 'rgba(239, 68, 68, 0.04)';
      later(() => { if (mockRef.current) mockRef.current.style.background = ''; }, 100);
    };

    // ---- stages ----
    const stage1 = () => {
      setWill(true);
      setEdge(validEdgeRef, 1);
      return animateWidth(validRef.current, 0, 96.25, 1800, easeOutQuart, (frac) => {
        validCount = Math.min(462, Math.round((frac / 0.9625) * 462));
        setText(validNumRef, validCount);
        updateTop();
      }).then(() => setEdge(validEdgeRef, 0));
    };

    const stage2 = () => {
      // re-classification flicker: the "12" was assumed valid (green) → amber
      if (catchNumRef.current) {
        catchNumRef.current.style.transition = 'color 300ms ease';
        catchNumRef.current.style.color = COLORS.amber;
      }
      setEdge(catchEdgeRef, 1);
      return animateWidth(catchRef.current, 0, 2.5, 400, easeOutCubic, (frac) => {
        catchCount = Math.min(12, Math.round((frac / 0.025) * 12));
        setText(catchNumRef, catchCount);
        updateTop();
      }).then(() => setEdge(catchEdgeRef, 0));
    };

    const stage3 = () => {
      setEdge(spamEdgeRef, 1);
      // faint red "threat detected" panel flash per spam trap caught
      for (let i = 0; i < 6; i++) later(flashPanel, (i / 6) * 300);
      return animateWidth(spamRef.current, 0, 1.25, 300, easeOutCubic, (frac) => {
        spamCount = Math.min(6, Math.round((frac / 0.0125) * 6));
        setText(spamNumRef, spamCount);
        updateTop();
      }).then(() => {
        setEdge(spamEdgeRef, 0);
        pop(spamNumRef, 1.15, 250); // caught — conclusive
      });
    };

    const stage4 = () => {
      // counters resolve to their final resting colours
      if (catchNumRef.current) {
        catchNumRef.current.style.transition = 'color 400ms ease';
        catchNumRef.current.style.color = COLORS.white;
      }
      if (spamNumRef.current) {
        spamNumRef.current.style.transition = 'color 400ms ease';
        spamNumRef.current.style.color = COLORS.gray;
      }
      if (labelRef.current) {
        labelRef.current.style.transition = 'color 350ms ease';
        labelRef.current.style.color = '#fff';
        later(() => { if (labelRef.current) labelRef.current.style.color = ''; }, 700);
      }
      setEdge(resolvedEdgeRef, 1);
      return animateWidth(resolvedRef.current, 0, 100, 700, easeStandard).then(() => {
        setEdge(resolvedEdgeRef, 0);
        // list fully processed — slash brightens to match, counter taps
        if (slashRef.current) {
          slashRef.current.style.transition = 'color 200ms ease';
          slashRef.current.style.color = 'var(--text-primary)';
        }
        pop(countWrapRef, 1.05, 200);
      });
    };

    const shimmerSweep = () => {
      const s = shimmerRef.current;
      if (!s) return;
      s.style.opacity = '1';
      animate(1200, (t) => { s.style.transform = `translateX(${-120 + 440 * t}%)`; }).then(() => {
        if (shimmerRef.current) shimmerRef.current.style.opacity = '0';
      });
    };
    const validBreath = () =>
      animate(1500, (t) => {
        if (validNumRef.current) validNumRef.current.style.opacity = String(0.8 + 0.2 * Math.sin(Math.PI * t));
      }).then(() => { if (validNumRef.current) validNumRef.current.style.opacity = '1'; });

    const hold = async (ms) => {
      setWill(false);
      shimmerSweep();
      validBreath();
      await pause(ms);
    };

    const resetInstant = () => {
      [validRef, catchRef, spamRef, resolvedRef].forEach((r) => {
        if (r.current) {
          r.current.style.transition = 'none';
          r.current.style.width = '0%';
        }
      });
      [validEdgeRef, catchEdgeRef, spamEdgeRef, resolvedEdgeRef].forEach((r) => setEdge(r, 0));
      validCount = catchCount = spamCount = 0;
      if (validNumRef.current) { validNumRef.current.style.color = COLORS.green; validNumRef.current.style.opacity = '1'; validNumRef.current.textContent = '0'; }
      if (catchNumRef.current) { catchNumRef.current.style.transition = 'none'; catchNumRef.current.style.color = COLORS.green; catchNumRef.current.textContent = '0'; }
      if (spamNumRef.current) { spamNumRef.current.style.transition = 'none'; spamNumRef.current.style.color = COLORS.red; spamNumRef.current.style.transform = 'none'; spamNumRef.current.textContent = '0'; }
      if (totalRef.current) totalRef.current.textContent = '0';
      if (slashRef.current) { slashRef.current.style.transition = 'none'; slashRef.current.style.color = ''; }
      if (countWrapRef.current) countWrapRef.current.style.transform = 'none';
    };

    // ---- master loop ----
    const runValidationCycle = async () => {
      if (cancelled.current) return;
      await stage1();
      await pause(300);
      await stage2();
      await pause(200);
      await stage3();
      await pause(400);
      await stage4();
      await hold(2500);
      if (cancelled.current) return;
      resetInstant();
      await pause(300);
      if (!cancelled.current) runValidationCycle();
    };

    // ---- reduced-motion / no-IO settled state ----
    const renderFinal = () => {
      if (resolvedRef.current) resolvedRef.current.style.width = '100%';
      validCount = 462; catchCount = 12; spamCount = 6;
      if (validNumRef.current) { validNumRef.current.style.color = COLORS.green; validNumRef.current.textContent = '462'; }
      if (catchNumRef.current) { catchNumRef.current.style.color = COLORS.white; catchNumRef.current.textContent = '12'; }
      if (spamNumRef.current) { spamNumRef.current.style.color = COLORS.gray; spamNumRef.current.textContent = '6'; }
      if (totalRef.current) totalRef.current.textContent = '480';
      if (slashRef.current) slashRef.current.style.color = 'var(--text-primary)';
      if (mockRef.current) { mockRef.current.style.opacity = '1'; mockRef.current.style.transform = 'none'; }
      if (labelRef.current) labelRef.current.style.opacity = '1';
    };

    // ---- entrance (Phase 2) then the loop ----
    const startEntrance = async () => {
      if (mockRef.current) mockRef.current.style.minHeight = mockRef.current.offsetHeight + 'px';
      await pause(500);
      // panel fades + rises in
      animate(400, (t) => {
        const e = easeOutCubic(t);
        if (mockRef.current) {
          mockRef.current.style.opacity = String(e);
          mockRef.current.style.transform = `translateY(${10 * (1 - e)}px)`;
        }
      });
      await pause(150); // -> 650ms
      animate(250, (t) => { if (labelRef.current) labelRef.current.style.opacity = String(easeOutCubic(t)); });
      hasStarted.current = true;
      runValidationCycle();
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

  // outer-card entrance (one render; opacity + optional transform)
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
      className="lrr-fix-card c-half"
      data-reveal
      data-reveal-skip
      style={{ ...o(0, 450, 16), willChange: 'transform, opacity' }}
    >
      <div className="lrr-fix-card-head" style={o(150, 350)}>
        <div className="lrr-fix-meta">
          <span className="lrr-fix-badge">2</span>
          <span className="lrr-fix-product">Verifyrit</span>
        </div>
        <span className="lrr-fix-fixes">fixes · Bad List</span>
      </div>
      <h3 className="lrr-fix-title" style={o(250, 350, 8)}>Clean the list</h3>
      <p className="lrr-fix-desc" style={o(380, 350, 8)}>
        Every address runs through 7-layer validation before a campaign. Invalid
        emails, catch-alls, and spam traps are removed before send.
      </p>

      {/* ----- live loop zone ----- */}
      <div className="lrr-fix-mock" ref={mockRef} style={{ opacity: 0, transform: 'translateY(10px)' }}>
        <div className="lrr-fixm-top">
          <span className="lrr-fixm-label" ref={labelRef} style={{ opacity: 0 }}>List health</span>
          <span className="lrr-fixm-count" ref={countWrapRef} style={{ display: 'inline-block' }}>
            <b ref={totalRef}>0</b><span ref={slashRef}>/480</span>
          </span>
        </div>

        <div
          className="lrr-fixm-bar"
          aria-hidden="true"
          style={{ position: 'relative', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}
        >
          <div ref={validRef} style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: 0, background: '#22C55E', borderRadius: '3px' }}>
            <div ref={validEdgeRef} style={edgeStyle('rgba(34,197,94,0.6)')} />
          </div>
          <div ref={catchRef} style={{ position: 'absolute', left: '96.25%', top: 0, height: '100%', width: 0, background: '#F59E0B' }}>
            <div ref={catchEdgeRef} style={edgeStyle('rgba(245,158,11,0.7)')} />
          </div>
          <div ref={spamRef} style={{ position: 'absolute', left: '98.75%', top: 0, height: '100%', width: 0, background: '#EF4444' }}>
            <div ref={spamEdgeRef} style={edgeStyle('rgba(239,68,68,0.8)')} />
          </div>
          <div ref={resolvedRef} style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: 0, background: '#7C3AED', borderRadius: '3px' }}>
            <div ref={resolvedEdgeRef} style={edgeStyle('rgba(124,58,237,0.8)')} />
          </div>
          <div
            ref={shimmerRef}
            aria-hidden="true"
            style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '30%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', transform: 'translateX(-120%)', opacity: 0, pointerEvents: 'none' }}
          />
        </div>

        <div className="lrr-fixm-stats">
          <div className="lrr-fixm-stat">
            <span className="lrr-fixm-stat-num" ref={validNumRef} style={{ color: '#22C55E' }}>0</span>
            <span className="lrr-fixm-stat-lbl">Valid</span>
          </div>
          <div className="lrr-fixm-stat">
            <span className="lrr-fixm-stat-num" ref={catchNumRef} style={{ color: '#22C55E' }}>0</span>
            <span className="lrr-fixm-stat-lbl">Catch-all</span>
          </div>
          <div className="lrr-fixm-stat">
            <span className="lrr-fixm-stat-num" ref={spamNumRef} style={{ color: '#EF4444' }}>0</span>
            <span className="lrr-fixm-stat-lbl">Spam trap</span>
          </div>
        </div>
      </div>
    </article>
  );
}
