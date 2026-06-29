'use client';

// "Sendrit + NeoBrain AI — Send & Follow Up" step card (card 4 of the
// /low-reply-rates "Full Fix" bento). The OUTER card (badge, heading, body)
// runs a one-time scroll entrance and then never moves. The INNER sequence
// panel loops continuously, replaying a story-driven multichannel cadence:
//   Day 1 — Email fires (send-line down the wire, "sent")
//   …time passes (· · ·)…
//   Day 3 — LinkedIn opened (notification ripple ping, "opened")
//   …time passes (· ·)…
//   Day 6 — Reply arrives (purple flood, checkmark spring, "Interested"
//           types in char-by-char, arrival glow) — the money moment.
// then a long satisfied hold, a fast reverse-typewriter teardown, an instant
// snap back to pending, and the cycle restarts.
//
// DOM-driven, not React-driven: every per-frame change runs through refs and
// JS-scheduled CSS transitions / rAF tweens — zero setState during the loop. A
// single recursive runSequenceCycle() drives it; a `cancelled` ref breaks the
// recursion on unmount and all timers / rAF ids are tracked in refs and
// cancelled there. Keyframes (ripple ping, cursor blink, time-dots) are scoped
// via the unique `lrrsfu` prefix so nothing leaks into global styles.
//
// Keeps `data-reveal data-reveal-skip` so the global reveal engine leaves its
// visuals to this component while siblings' stagger indices stay intact. No
// global CSS touched — original .lrr-fix-* / .lrr-fixm-* classes style the
// frame; only the bespoke motion lives here.

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';

const MUTED = 'var(--text-muted)';
const SECONDARY = 'var(--text-secondary)';
const WHITE = '#FFFFFF';
const ORANGE = '#EA580C';
const PURPLE = '#7C3AED';
const BORDER = 'var(--bg-card-border)';
const PURPLE_BORDER = 'rgba(124,58,237,0.4)';

const ROW_TRANSITION =
  'background 300ms ease-out, border-color 300ms ease-out, opacity 200ms ease-out, box-shadow 400ms ease-out';
const LABEL_TRANSITION = 'color 200ms ease-out, opacity 200ms ease-out';
const ICON_TRANSITION = 'color 200ms ease-out';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function LowReplyRatesSendFollowUpCard() {
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const mockRef = useRef(null);

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const icon3Ref = useRef(null);
  const lbl1Ref = useRef(null);
  const lbl2Ref = useRef(null);
  const lbl3Ref = useRef(null);
  const st1Ref = useRef(null); // "sent"
  const st2Ref = useRef(null); // "opened"
  const typedRef = useRef(null); // "Interested" (typewriter target)
  const cursorRef = useRef(null);
  const dots12Ref = useRef(null);
  const dots23Ref = useRef(null);

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

    // single up-down scale pulse
    const pulseScale = (node, peak) =>
      animate(250, (t) => {
        const s = t < 0.5 ? 1 + (peak - 1) * (t / 0.5) : peak - (peak - 1) * ((t - 0.5) / 0.5);
        if (node) node.style.transform = `scale(${s})`;
      }).then(() => {
        if (node) node.style.transform = 'none';
      });

    const setColor = (node, color) => {
      if (node) node.style.color = color;
    };
    const brightenLabel = (node) => {
      if (!node) return;
      node.style.transition = LABEL_TRANSITION;
      node.style.color = WHITE;
      node.style.opacity = '1';
    };
    const showStatus = (node, color) => {
      if (!node) return;
      if (color) node.style.color = color;
      node.style.transition = 'none';
      node.style.opacity = '0';
      node.style.transform = 'translateX(6px)';
      void node.offsetWidth; // commit the reset before tweening
      node.style.transition = 'opacity 250ms ease-out, transform 250ms ease-out';
      node.style.opacity = '1';
      node.style.transform = 'translateX(0)';
    };

    const setWill = (on) => {
      [row1Ref, row2Ref, row3Ref].forEach((r) => {
        if (r.current) r.current.style.willChange = on ? 'transform, opacity' : 'auto';
      });
      if (typedRef.current) typedRef.current.style.willChange = on ? 'transform, opacity' : 'auto';
    };

    // ---- typewriter primitives ----
    const typeIn = async (node, text, speed) => {
      if (!node) return;
      node.textContent = '';
      for (let i = 0; i < text.length; i++) {
        if (cancelled.current) return;
        node.textContent += text[i];
        await pause(speed);
      }
    };
    const deleteText = async (node, speed) => {
      if (!node) return;
      while (node.textContent.length > 0) {
        if (cancelled.current) return;
        node.textContent = node.textContent.slice(0, -1);
        await pause(speed);
      }
    };

    // ---- time-passing dots between rows ----
    const showTimeDots = async (container, cycles) => {
      if (!container) return;
      container.style.transition = 'opacity 150ms ease';
      container.style.opacity = '1';
      await pause(150);
      const spans = Array.from(container.children);
      spans.forEach((s, i) => {
        s.style.animation = `lrrsfuDot 600ms ease-in-out ${i * 150}ms ${cycles}`;
      });
      await pause(600 * cycles + 300); // run cycles + stagger tail
      spans.forEach((s) => {
        s.style.animation = 'none';
      });
      container.style.opacity = '0';
      await pause(200);
    };

    // ---- Day 1: Email fires ----
    const fireEmailRow = async () => {
      const row = row1Ref.current;
      if (row) row.style.opacity = '1';
      setColor(icon1Ref.current, WHITE);
      brightenLabel(lbl1Ref.current);
      showStatus(st1Ref.current, MUTED);

      // send-line down the wire
      let line = null;
      if (row) {
        line = document.createElement('div');
        line.style.cssText =
          'position:absolute;height:1px;width:100%;left:0;bottom:0;background:rgba(255,255,255,0.2);transform:scaleX(0);transform-origin:left;pointer-events:none;';
        row.appendChild(line);
      }
      await animate(350, (t) => {
        if (line) line.style.transform = `scaleX(${easeOutCubic(t)})`;
      });
      if (line) {
        line.style.transition = 'opacity 300ms ease';
        line.style.opacity = '0';
        later(() => {
          if (line && line.parentNode) line.parentNode.removeChild(line);
        }, 320);
      }
    };

    // ---- Day 3: LinkedIn opened ----
    const fireLinkedInRow = async () => {
      const row = row2Ref.current;
      const ic = icon2Ref.current;
      // single notification ripple ping, fired exactly once
      if (ic) {
        ic.style.animation = 'none';
        void ic.offsetWidth;
        ic.style.borderRadius = '50%';
        ic.style.animation = 'lrrsfuRipple 500ms ease-out forwards';
        later(() => {
          if (ic) ic.style.animation = 'none';
        }, 520);
      }
      if (row) row.style.opacity = '1';
      setColor(ic, ORANGE);
      brightenLabel(lbl2Ref.current);
      showStatus(st2Ref.current, ORANGE);
      await pause(250);
      await pulseScale(st2Ref.current, 1.08); // notification badge ping
    };

    // ---- pre-arrival panel blink ----
    const panelBlink = async () => {
      const p = mockRef.current;
      if (!p) return;
      p.style.transition = 'opacity 80ms';
      p.style.opacity = '0.85';
      await pause(80);
      p.style.opacity = '1';
      await pause(80);
      p.style.transition = '';
    };

    // ---- Day 6: Reply arrives — the money moment ----
    const fireReplyRow = async () => {
      await panelBlink();
      const row = row3Ref.current;

      // Step A — row lights up
      if (row) {
        row.style.transition = ROW_TRANSITION;
        row.style.background = 'rgba(124,58,237,0.25)';
        row.style.borderColor = PURPLE_BORDER;
        row.style.opacity = '1';
      }
      setColor(icon3Ref.current, PURPLE);
      pulseScale(icon3Ref.current, 1.15); // checkmark earns its moment
      brightenLabel(lbl3Ref.current);

      // Step B — "Interested" types in
      await pause(350);
      if (cursorRef.current) {
        cursorRef.current.style.transition = 'none';
        cursorRef.current.style.opacity = '1';
        cursorRef.current.style.animation = 'lrrsfuBlink 1060ms step-end infinite';
      }
      await pause(300); // ~1 blink cycle before typing
      await typeIn(typedRef.current, 'Interested', 45);
      await pause(600); // cursor blinks ~2 more times
      if (cursorRef.current) {
        cursorRef.current.style.animation = 'none';
        cursorRef.current.style.transition = 'opacity 200ms ease';
        cursorRef.current.style.opacity = '0';
      }

      // Step C — arrival pulse
      if (row) {
        row.style.transition =
          'box-shadow 400ms ease-out, background 300ms ease-out, border-color 300ms ease-out';
        row.style.boxShadow = 'inset 0 0 20px rgba(124,58,237,0.15)';
        later(() => {
          if (row) {
            row.style.transition =
              'box-shadow 600ms ease-out, background 300ms ease-out, border-color 300ms ease-out';
            row.style.boxShadow = 'inset 0 0 0px rgba(124,58,237,0)';
          }
        }, 400);
      }
      await pulseScale(typedRef.current, 1.06);
    };

    // ---- satisfied hold ----
    const hold = async (ms) => {
      setWill(false);
      // one slow "Interested" breath
      animate(2000, (t) => {
        if (typedRef.current) typedRef.current.style.opacity = String(1 - 0.3 * Math.sin(Math.PI * t));
      }).then(() => {
        if (typedRef.current) typedRef.current.style.opacity = '1';
      });
      // row3 purple background breathes
      animate(2500, (t) => {
        const a = 0.25 + 0.1 * Math.sin(Math.PI * t);
        if (row3Ref.current) row3Ref.current.style.background = `rgba(124,58,237,${a})`;
      }).then(() => {
        if (row3Ref.current) row3Ref.current.style.background = 'rgba(124,58,237,0.25)';
      });
      await pause(ms);
      setWill(true);
    };

    // ---- reverse-typewriter teardown ----
    const reverseTypewriter = async () => {
      if (cursorRef.current) {
        cursorRef.current.style.animation = 'none';
        cursorRef.current.style.transition = 'none';
        cursorRef.current.style.opacity = '1';
      }
      await deleteText(typedRef.current, 25);
      await pause(80);
      if (cursorRef.current) {
        cursorRef.current.style.transition = 'opacity 200ms ease';
        cursorRef.current.style.opacity = '0';
      }
      await pause(200);
    };

    // ---- instant snap back to pending ----
    const resetAllRows = () => {
      const rows = [row1Ref.current, row2Ref.current, row3Ref.current];
      const icons = [icon1Ref.current, icon2Ref.current, icon3Ref.current];
      const lbls = [lbl1Ref.current, lbl2Ref.current, lbl3Ref.current];
      const sts = [st1Ref.current, st2Ref.current];

      rows.forEach((r) => {
        if (!r) return;
        r.style.transition = 'none';
        r.style.opacity = '0.45';
        r.style.transform = 'none';
        r.style.background = 'transparent';
        r.style.borderColor = BORDER;
        r.style.boxShadow = 'none';
      });
      icons.forEach((ic) => {
        if (!ic) return;
        ic.style.transition = 'none';
        ic.style.color = MUTED;
        ic.style.animation = 'none';
        ic.style.transform = 'none';
      });
      lbls.forEach((l) => {
        if (!l) return;
        l.style.transition = 'none';
        l.style.color = SECONDARY;
        l.style.opacity = '1';
      });
      sts.forEach((s) => {
        if (!s) return;
        s.style.transition = 'none';
        s.style.opacity = '0';
        s.style.transform = 'none';
      });
      if (typedRef.current) {
        typedRef.current.textContent = '';
        typedRef.current.style.transition = 'none';
        typedRef.current.style.opacity = '1';
        typedRef.current.style.transform = 'none';
      }
      if (cursorRef.current) {
        cursorRef.current.style.animation = 'none';
        cursorRef.current.style.transition = 'none';
        cursorRef.current.style.opacity = '0';
      }

      // restore transitions on the next tick so future activations animate
      later(() => {
        rows.forEach((r) => {
          if (r) r.style.transition = ROW_TRANSITION;
        });
        icons.forEach((ic) => {
          if (ic) ic.style.transition = ICON_TRANSITION;
        });
        lbls.forEach((l) => {
          if (l) l.style.transition = LABEL_TRANSITION;
        });
      }, 20);
    };

    // ---- master loop ----
    const runSequenceCycle = async () => {
      if (cancelled.current) return;
      setWill(true);
      resetAllRows();
      await pause(400);

      await fireEmailRow(); // Day 1
      await pause(800);
      await showTimeDots(dots12Ref.current, 2);

      await fireLinkedInRow(); // Day 3
      await pause(900);
      await showTimeDots(dots23Ref.current, 1.5);

      await fireReplyRow(); // Day 6
      await hold(4000);
      if (cancelled.current) return;

      await reverseTypewriter();
      resetAllRows();
      await pause(400);
      if (!cancelled.current) runSequenceCycle();
    };

    // ---- reduced-motion / no-IO settled state ----
    const renderFinal = () => {
      if (mockRef.current) {
        mockRef.current.style.opacity = '1';
        mockRef.current.style.transform = 'none';
      }
      const settle = (row, icon, color, lbl, st, stColor) => {
        if (row) row.style.opacity = '1';
        if (icon) icon.style.color = color;
        if (lbl) {
          lbl.style.color = WHITE;
          lbl.style.opacity = '1';
        }
        if (st) {
          st.style.opacity = '1';
          st.style.transform = 'none';
          if (stColor) st.style.color = stColor;
        }
      };
      settle(row1Ref.current, icon1Ref.current, WHITE, lbl1Ref.current, st1Ref.current, MUTED);
      settle(row2Ref.current, icon2Ref.current, ORANGE, lbl2Ref.current, st2Ref.current, ORANGE);
      if (row3Ref.current) {
        row3Ref.current.style.opacity = '1';
        row3Ref.current.style.background = 'rgba(124,58,237,0.25)';
        row3Ref.current.style.borderColor = PURPLE_BORDER;
      }
      setColor(icon3Ref.current, PURPLE);
      brightenLabel(lbl3Ref.current);
      if (typedRef.current) {
        typedRef.current.textContent = 'Interested';
        typedRef.current.style.opacity = '1';
      }
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
      // rows enter staggered in pending (opacity 0 → 0.45)
      const enterRow = (ref, delay) =>
        later(() => {
          animate(300, (t) => {
            const e = easeOutCubic(t);
            if (ref.current) {
              ref.current.style.opacity = String(0.45 * e);
              ref.current.style.transform = `translateY(${8 * (1 - e)}px)`;
            }
          });
        }, delay);
      enterRow(row1Ref, 150); // -> 650ms
      enterRow(row2Ref, 250); // -> 750ms
      enterRow(row3Ref, 350); // -> 850ms
      await pause(650); // last row done (~1150ms from entrance) ...
      await pause(400); // ... then settle before the loop
      hasStarted.current = true;
      runSequenceCycle();
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

  const rowBase = {
    position: 'relative',
    opacity: 0,
    transform: 'translateY(8px)',
    transition: 'none',
  };
  const dotsBase = {
    opacity: 0,
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '12px',
    lineHeight: 1,
    color: 'rgba(255,255,255,0.3)',
  };

  return (
    <article
      ref={rootRef}
      className="lrr-fix-card c-third"
      data-reveal
      data-reveal-skip
      style={{ ...o(0, 450, 16), willChange: 'transform, opacity' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes lrrsfuRipple {
  0%   { box-shadow: 0 0 0 0px rgba(234,88,12,0.5); }
  100% { box-shadow: 0 0 0 14px rgba(234,88,12,0); }
}
@keyframes lrrsfuBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes lrrsfuDot {
  0%   { opacity: 0.2; }
  50%  { opacity: 0.7; }
  100% { opacity: 0.2; }
}`,
        }}
      />

      <div className="lrr-fix-card-head" style={o(150, 350)}>
        <div className="lrr-fix-meta">
          <span className="lrr-fix-badge">4</span>
          <span className="lrr-fix-product">Sendrit + NeoBrain AI</span>
        </div>
      </div>
      <h3 className="lrr-fix-title" style={o(250, 350, 8)}>Send &amp; follow up</h3>
      <p className="lrr-fix-desc" style={o(380, 350, 8)}>
        AI-researched, signal-backed sequences across email, LinkedIn, and calling,
        follow-up responds to behaviour.
      </p>

      {/* ----- live loop zone ----- */}
      <div className="lrr-fix-mock" ref={mockRef} style={{ opacity: 0, transform: 'translateY(10px)' }}>
        <div className="lrr-fixm-seq">
          {/* Row 1 — Email */}
          <div ref={row1Ref} className="lrr-fixm-seq-row" style={{ ...rowBase, overflow: 'hidden' }}>
            <span ref={icon1Ref} className="lrr-fixm-seq-ic" style={{ transition: ICON_TRANSITION }}>
              <Icon name="mail" aria-hidden="true" />
            </span>
            <span ref={lbl1Ref} className="lrr-fixm-seq-lbl">Email · Day 1</span>
            <span ref={st1Ref} className="lrr-fixm-seq-st gray" style={{ opacity: 0 }}>sent</span>
          </div>

          {/* time passing 1 → 2 */}
          <div ref={dots12Ref} aria-hidden="true" style={dotsBase}>
            <span>·</span>
            <span>·</span>
            <span>·</span>
          </div>

          {/* Row 2 — LinkedIn */}
          <div ref={row2Ref} className="lrr-fixm-seq-row" style={rowBase}>
            <span ref={icon2Ref} className="lrr-fixm-seq-ic" style={{ transition: ICON_TRANSITION }}>
              <Icon name="linkedin" aria-hidden="true" />
            </span>
            <span ref={lbl2Ref} className="lrr-fixm-seq-lbl">LinkedIn · Day 3</span>
            <span ref={st2Ref} className="lrr-fixm-seq-st orange" style={{ opacity: 0 }}>opened</span>
          </div>

          {/* time passing 2 → 3 (shorter) */}
          <div ref={dots23Ref} aria-hidden="true" style={dotsBase}>
            <span>·</span>
            <span>·</span>
            <span>·</span>
          </div>

          {/* Row 3 — Reply */}
          <div ref={row3Ref} className="lrr-fixm-seq-row" style={rowBase}>
            <span ref={icon3Ref} className="lrr-fixm-seq-ic" style={{ transition: ICON_TRANSITION }}>
              <Icon name="check" aria-hidden="true" />
            </span>
            <span ref={lbl3Ref} className="lrr-fixm-seq-lbl">Reply · Day 6</span>
            <span className="lrr-fixm-seq-st purple" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span ref={typedRef} style={{ display: 'inline-block' }} />
              <span ref={cursorRef} style={{ opacity: 0, marginLeft: '1px' }}>|</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
