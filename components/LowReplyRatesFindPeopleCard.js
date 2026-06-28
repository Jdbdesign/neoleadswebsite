'use client';

// "Zeus + NeoBrain AI — Find the Right People" step card (card 1 of the
// /low-reply-rates "Full Fix" bento). The OUTER card (badge, heading, body)
// runs a one-time scroll entrance and then never moves again. The INNER dark
// panel ("TOP MATCH IN SEGMENT") runs a continuous live loop: Zeus surfaces
// one contact, holds, files it away upward, sweeps a scan line, then surfaces
// the next — alternating between two distinct people indefinitely.
//
// Per the brief, the loop is DOM-driven, not React-driven: contact swaps are
// imperative ref mutations (textContent / inline styles) so the component never
// re-renders per cycle. `currentIndex` lives in a ref; a single recursive
// `runContactCycle()` drives entrance → hold → exit → scan; every motion is a
// setTimeout / requestAnimationFrame (no CSS transitions for the loop). All
// timers + rAF ids are tracked in refs and cancelled on unmount.
//
// The card keeps `data-reveal data-reveal-skip` so the global reveal engine
// leaves its visuals to this component while siblings' stagger indices are
// preserved. No global CSS is touched — original .lrr-fix-* / .lrr-fixm-* /
// .lrr-pp-* classes style everything; only the bespoke motion lives here.

import { useEffect, useRef, useState } from 'react';

const CONTACTS = [
  {
    initials: 'MT',
    avatarColor: '#7C3AED',
    name: 'Marcus T.',
    role: 'VP Sales · Acme Corp',
    score: 94,
    signals: ['Raised $22M · 9d', '9 SDR roles · 5d', 'New CRO · 12d'],
  },
  {
    initials: 'SR',
    avatarColor: '#6D28D9',
    name: 'Sofia R.',
    role: 'Head of Growth · Meridian',
    score: 87,
    signals: ['Series A closed · 3d', 'CMO departed · 8d', 'Job spike +340% · 6d'],
  },
];

// --- easing ---
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
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

export default function LowReplyRatesFindPeopleCard() {
  // outer-card entrance is the only React state (one render, never during loop)
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  // element refs (inner panel is mutated imperatively)
  const rootRef = useRef(null);
  const mockRef = useRef(null);
  const labelRef = useRef(null);
  const zeusRef = useRef(null);
  const avatarRef = useRef(null);
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const intentWrapRef = useRef(null);
  const scoreRef = useRef(null);
  const intentLblRef = useRef(null);
  const sigsWrapRef = useRef(null);
  const sigRefs = useRef([]);
  const scanRef = useRef(null);

  // loop state — all in refs so swaps never trigger a re-render
  const currentIndex = useRef(0);
  const hasEntered = useRef(false);
  const cancelled = useRef(false);
  const timers = useRef(new Set());
  const rafs = useRef(new Set());

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Reset loop-control refs on every effect run. React 18 StrictMode (dev)
    // mounts → cleans up → remounts; cleanup sets cancelled=true, so without
    // this reset the real run would no-op every animation and the panel would
    // stay empty.
    cancelled.current = false;
    hasEntered.current = false;
    currentIndex.current = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // ---- tracked primitives (cancelled on unmount) ----
    const later = (fn, ms) =>
      new Promise((resolve) => {
        const id = setTimeout(() => {
          timers.current.delete(id);
          fn && fn();
          resolve();
        }, ms);
        timers.current.add(id);
      });
    const wait = (ms) => later(null, ms);
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
    // single reusable counter — counts up (entrance) or down (exit)
    const countUp = (node, from, to, duration, easing, onTick) =>
      animate(duration, (t) => {
        const v = Math.round(from + (to - from) * easing(t));
        node.textContent = String(v);
        if (onTick) onTick(v);
      });

    // ---- helpers ----
    const setStyle = (ref, props) => {
      const n = ref.current;
      if (!n) return;
      Object.assign(n.style, props);
    };
    const setWill = (on) => {
      const v = on ? 'transform, opacity' : 'auto';
      [avatarRef, idRef, intentWrapRef, scoreRef, sigsWrapRef].forEach((r) => {
        if (r.current) r.current.style.willChange = v;
      });
    };

    const setContactData = (c) => {
      if (avatarRef.current) {
        avatarRef.current.textContent = c.initials;
        avatarRef.current.style.background = c.avatarColor;
      }
      if (nameRef.current) nameRef.current.textContent = c.name;
      if (roleRef.current) roleRef.current.textContent = c.role;
      sigRefs.current.forEach((el, i) => {
        if (el) el.textContent = c.signals[i];
      });
    };

    const resetContact = () => {
      setStyle(avatarRef, { opacity: '0', transform: 'translateY(14px) scale(0)' });
      setStyle(idRef, { opacity: '0', transform: 'translateY(8px)' });
      setStyle(intentWrapRef, { opacity: '0', transform: 'translateY(8px)' });
      setStyle(intentLblRef, { opacity: '0' });
      if (scoreRef.current) scoreRef.current.textContent = '0';
      sigRefs.current.forEach((el) => {
        if (!el) return;
        Object.assign(el.style, {
          maxWidth: '0px',
          opacity: '0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          filter: 'brightness(1)',
        });
      });
    };

    // avatar scale: 0 -> 1.08 -> 1 (spring overshoot, piecewise)
    const avatarScale = (t) => (t < 0.65 ? 1.08 * (t / 0.65) : 1.08 - 0.08 * ((t - 0.65) / 0.35));
    // zeus scale: 0.7 -> 1.1 -> 1
    const zeusScale = (t) => (t < 0.6 ? 0.7 + 0.4 * (t / 0.6) : 1.1 - 0.1 * ((t - 0.6) / 0.4));

    const expandPill = (i) => {
      const el = sigRefs.current[i];
      if (!el) return;
      const full = el.scrollWidth + 2; // scrollWidth ignores the max-width clamp
      el.style.filter = 'brightness(1.3)'; // single 80ms arrival flash
      later(() => {
        if (el) el.style.filter = 'brightness(1)';
      }, 80);
      animate(280, (t) => {
        const e = easeStandard(t);
        el.style.maxWidth = full * e + 'px';
        el.style.opacity = String(e);
      }).then(() => {
        if (el && !cancelled.current) el.style.maxWidth = 'none';
      });
    };

    // ---- Phase 3 / loop Step 3: a contact rises into the panel ----
    const enterContact = async (c) => {
      setContactData(c);
      resetContact();
      setWill(true);

      // avatar rises (spring) — fire & forget
      animate(380, (t) => {
        const sc = avatarScale(t);
        const ty = 14 * (1 - easeOutCubic(t));
        setStyle(avatarRef, {
          opacity: String(Math.min(1, t / 0.4)),
          transform: `translateY(${ty}px) scale(${sc})`,
        });
      });

      await wait(80);
      animate(300, (t) => {
        const e = easeOutCubic(t);
        setStyle(idRef, { opacity: String(e), transform: `translateY(${8 * (1 - e)}px)` });
      });

      await wait(120); // ~200ms after avatar
      animate(200, (t) => {
        const e = easeOutCubic(t);
        setStyle(intentWrapRef, { opacity: String(e), transform: `translateY(${8 * (1 - e)}px)` });
      });

      let labelShown = false;
      await countUp(scoreRef.current, 0, c.score, 650, easeOutCubic, (v) => {
        if (!labelShown && v >= 70) {
          labelShown = true;
          animate(200, (t) => setStyle(intentLblRef, { opacity: String(easeOutCubic(t)) }));
        }
      });

      // signal pills expand one by one (160ms apart)
      expandPill(0);
      await wait(160);
      expandPill(1);
      await wait(160);
      expandPill(2);
      await wait(280); // let the last pill settle

      setWill(false); // hold phase — drop will-change
    };

    // ---- Hold (3.5s): one faint breath on the intent score, else static ----
    const hold = async () => {
      await animate(3000, (t) => {
        if (scoreRef.current) scoreRef.current.style.opacity = String(0.85 + 0.15 * Math.sin(Math.PI * t));
      });
      if (scoreRef.current) scoreRef.current.style.opacity = '1';
      await wait(500);
    };

    // ---- Exit: current contact files away upward ----
    const exitContact = async () => {
      setWill(true);
      const fromScore = CONTACTS[currentIndex.current].score;
      const widths = sigRefs.current.map((el) => (el ? el.scrollWidth : 0));

      // pills retract + score counts down to 0 (fast-at-end reset)
      animate(180, (t) => {
        const e = easeInCubic(t);
        sigRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.maxWidth = widths[i] * (1 - e) + 'px';
          el.style.opacity = String(1 - e);
        });
      });
      countUp(scoreRef.current, fromScore, 0, 250, easeInCubic);

      await wait(170);
      // avatar / name / role / intent slide up and out
      await animate(280, (t) => {
        const e = easeInCubic(t);
        const ty = -18 * e;
        const op = String(1 - e);
        [avatarRef, idRef, intentWrapRef].forEach((r) => {
          if (r.current) {
            r.current.style.transform = `translateY(${ty}px)`;
            r.current.style.opacity = op;
          }
        });
      });
    };

    // ---- Scan gap (500ms): Zeus reads between contacts ----
    const scanGap = async () => {
      const h = mockRef.current ? mockRef.current.offsetHeight : 120;
      if (scanRef.current) {
        scanRef.current.style.transform = 'translateY(0)';
        scanRef.current.style.opacity = '1';
      }
      // "TOP MATCH IN SEGMENT" briefly dims 1 -> 0.4 -> 1
      animate(400, (t) => {
        if (labelRef.current) labelRef.current.style.opacity = String(1 - 0.6 * Math.sin(Math.PI * t));
      });
      await animate(400, (t) => {
        const e = easeInOutCubic(t);
        if (scanRef.current) scanRef.current.style.transform = `translateY(${h * e}px)`;
      });
      if (scanRef.current) scanRef.current.style.opacity = '0';
      if (labelRef.current) labelRef.current.style.opacity = '1';
      await wait(100);
    };

    // ---- master loop ----
    const runContactCycle = async () => {
      if (cancelled.current) return;
      const c = CONTACTS[currentIndex.current];
      await enterContact(c);
      await hold();
      if (cancelled.current) return;
      await exitContact();
      await scanGap();
      currentIndex.current = (currentIndex.current + 1) % CONTACTS.length;
      if (!cancelled.current) runContactCycle();
    };

    // ---- final settled state (reduced motion / no-IO) ----
    const renderFinal = () => {
      const c = CONTACTS[0];
      setContactData(c);
      setStyle(labelRef, { opacity: '1' });
      setStyle(zeusRef, { opacity: '1', transform: 'none' });
      setStyle(avatarRef, { opacity: '1', transform: 'none' });
      setStyle(idRef, { opacity: '1', transform: 'none' });
      setStyle(intentWrapRef, { opacity: '1', transform: 'none' });
      setStyle(intentLblRef, { opacity: '1' });
      if (scoreRef.current) scoreRef.current.textContent = String(c.score);
      sigRefs.current.forEach((el) => {
        if (el) Object.assign(el.style, { maxWidth: 'none', opacity: '1' });
      });
    };

    // ---- the scroll-entrance + activation sequence (Phases 1–3) ----
    const startEntrance = async () => {
      // lock the panel height so exits/scans never shift layout
      if (mockRef.current) mockRef.current.style.minHeight = mockRef.current.offsetHeight + 'px';

      // Phase 2 — panel activates, label + Zeus badge enter
      await wait(500);
      if (mockRef.current) mockRef.current.classList.add('panel-activate');
      animate(250, (t) => setStyle(labelRef, { opacity: String(easeOutCubic(t)) }));
      await wait(80);
      await animate(280, (t) => {
        setStyle(zeusRef, { opacity: String(Math.min(1, t / 0.4)), transform: `scale(${zeusScale(t)})` });
      });

      // Phase 3 starts at ~1200ms after inView — then the loop runs forever
      await wait(340);
      hasEntered.current = true;
      runContactCycle();
    };

    // ---- trigger: outer card entrance once on scroll-in ----
    if (prefersReduced || !hasIO) {
      setReduced(true);
      setEntered(true);
      // settle the panel without animation on next tick (refs are mounted)
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
          if (entry.isIntersecting && !hasEntered.current) {
            setEntered(true); // Phase 1 — outer card (CSS via inline transitions)
            startEntrance(); // Phases 2–3 + loop
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

  // outer-card entrance inline style (opacity + optional transform; one render)
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
          <span className="lrr-fix-badge">1</span>
          <span className="lrr-fix-product">Zeus + NeoBrain AI</span>
        </div>
        <span className="lrr-fix-fixes">fixes · Wrong People</span>
      </div>
      <h3 className="lrr-fix-title" style={o(250, 350, 8)}>Find the right people</h3>
      <p className="lrr-fix-desc" style={o(380, 350, 8)}>
        AI search for verified decision-makers ranked by ICP fit and live buying signals.
        Every contact surfaces with a &ldquo;why now&rdquo; attached.
      </p>

      {/* ----- live loop zone ----- */}
      <div className="lrr-fix-mock" ref={mockRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="lrr-fixm-top">
          <span className="lrr-fixm-label" ref={labelRef} style={{ opacity: 0 }}>Top match in segment</span>
          <span className="lrr-pp-zeus" ref={zeusRef} style={{ opacity: 0, transform: 'scale(0.7)' }}>Zeus</span>
        </div>

        <div className="lrr-fixm-contact">
          <span className="lrr-contact-av purple" ref={avatarRef} style={{ opacity: 0 }}>MT</span>
          <div className="lrr-fixm-id" ref={idRef} style={{ opacity: 0 }}>
            <div className="lrr-fixm-name" ref={nameRef}>Marcus T.</div>
            <div className="lrr-fixm-role" ref={roleRef}>VP Sales · Acme Corp</div>
          </div>
          <div className="lrr-fixm-intent" ref={intentWrapRef} style={{ opacity: 0 }}>
            <span className="lrr-fixm-intent-num" ref={scoreRef}>94</span>
            <span className="lrr-fixm-intent-lbl" ref={intentLblRef} style={{ opacity: 0 }}>Intent</span>
          </div>
        </div>

        <div className="lrr-fixm-sigs" ref={sigsWrapRef}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="lrr-pp-sig"
              ref={(el) => { sigRefs.current[i] = el; }}
              style={{ opacity: 0, maxWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {CONTACTS[0].signals[i]}
            </span>
          ))}
        </div>

        {/* Zeus scan line — swept between contacts */}
        <div
          ref={scanRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '1px',
            width: '100%',
            background: 'rgba(124, 58, 237, 0.4)',
            opacity: 0,
            transform: 'translateY(0)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <style jsx>{`
        /* entrance border sweep — Zeus activating (once, settles to a faint ring) */
        .panel-activate {
          animation: panelActivate 600ms ease-out forwards;
        }
        @keyframes panelActivate {
          0% { box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.1); }
          50% { box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.7), 0 0 12px rgba(124, 58, 237, 0.15); }
          100% { box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.2); }
        }
      `}</style>
    </article>
  );
}
