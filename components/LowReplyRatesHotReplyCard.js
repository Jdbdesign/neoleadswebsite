'use client';

// "Snaarpmail + NeoBrain AI — Never Miss a Hot Reply" step card (card 5 of the
// /low-reply-rates "Full Fix" bento). The OUTER card (badge, heading, body)
// runs a one-time scroll entrance and then never moves. The INNER reply panel
// loops continuously as a two-act story:
//   ACT 1 — both replies arrive in sequence (slide in, dot, faint "new message"
//           left-edge signal) so the viewer can READ them. No badges yet — this
//           is the raw, unclassified inbox.
//   ACT 2 — a "NeoBrain AI classifying…" label switches on, then each reply is
//           scanned in turn (scan line sweeps the text) and its intent badge
//           STAMPS in — HOT (green) then NURTURE (amber) — and finally Row 3
//           activates: the sequence auto-pauses.
// A long confident hold, then a fast mechanical wipe, then it repeats.
//
// DOM-driven, not React-driven: every per-frame change runs through refs and
// JS-scheduled CSS transitions / rAF tweens — zero setState during the loop. A
// single recursive runCycle() drives it; a `cancelled` ref breaks the recursion
// on unmount and all timers / rAF ids are tracked in refs and cancelled there.
// The badge-stamp keyframe is scoped via the unique `lrrhr` prefix so nothing
// leaks into global styles.
//
// Keeps `data-reveal data-reveal-skip` so the global reveal engine leaves its
// visuals to this component while siblings' stagger indices stay intact. No
// global CSS touched — original .lrr-fix-* / .lrr-fixm-* classes style the
// frame; only the bespoke motion lives here.

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';

const ROWS = [
  {
    dotColor: '#22C55E',
    text: '“This is great timing…”',
    badge: 'HOT',
    badgeColor: '#22C55E',
    badgeBg: 'rgba(34,197,94,0.1)',
    badgeBorder: 'rgba(34,197,94,0.5)',
    signal: 'rgba(34,197,94,0.5)',
    scanDuration: 380,
    scanPostPause: 100,
  },
  {
    dotColor: '#F59E0B',
    text: '“Follow up in Q2”',
    badge: 'NURTURE',
    badgeColor: '#F59E0B',
    badgeBg: 'rgba(245,158,11,0.1)',
    badgeBorder: 'rgba(245,158,11,0.5)',
    signal: 'rgba(245,158,11,0.5)',
    scanDuration: 520,
    scanPostPause: 150,
  },
];

const PAUSE_BG = 'rgba(124,58,237,0.15)';
const PAUSE_BORDER = 'rgba(124,58,237,0.3)';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function LowReplyRatesHotReplyCard() {
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const mockRef = useRef(null);
  const neoBrainLabelRef = useRef(null);

  // per-reply-row refs (index 0 = HOT, 1 = NURTURE)
  const rowRefs = useRef([]);
  const dotRefs = useRef([]);
  const textRefs = useRef([]); // inner text span (scan width source)
  const scanRefs = useRef([]);
  const badgeRefs = useRef([]);

  // auto-pause row
  const row3Ref = useRef(null);
  const syncIconRef = useRef(null);
  const row3TextRef = useRef(null);

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

    const setWill = (on) => {
      const v = on ? 'transform, opacity' : 'auto';
      [0, 1].forEach((i) => {
        [textRefs, dotRefs, badgeRefs, scanRefs].forEach((r) => {
          if (r.current[i]) r.current[i].style.willChange = v;
        });
      });
      if (neoBrainLabelRef.current) neoBrainLabelRef.current.style.willChange = v;
      if (row3Ref.current) row3Ref.current.style.willChange = on ? 'background' : 'auto';
    };

    // ---- per-row pending shell ----
    const prepRow = (i) => {
      const row = rowRefs.current[i];
      if (row) {
        row.style.transition = 'none';
        row.style.opacity = '0.2';
        row.style.boxShadow = 'none';
      }
      const dot = dotRefs.current[i];
      if (dot) {
        dot.style.transition = 'none';
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0.5)';
      }
      const text = textRefs.current[i];
      if (text) {
        text.style.transition = 'none';
        text.style.opacity = '0';
        text.style.transform = 'translateX(14px)';
      }
      const badge = badgeRefs.current[i];
      if (badge) {
        badge.style.animation = 'none';
        badge.style.transition = 'none';
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0)';
      }
      const scan = scanRefs.current[i];
      if (scan) {
        scan.style.transition = 'none';
        scan.style.opacity = '0';
        scan.style.transform = 'translateX(0)';
      }
    };

    const resetRow3Instant = () => {
      if (row3Ref.current) {
        row3Ref.current.style.transition = 'none';
        row3Ref.current.style.background = '';
        row3Ref.current.style.borderColor = '';
      }
      if (syncIconRef.current) {
        syncIconRef.current.style.transition = 'none';
        syncIconRef.current.style.opacity = '0.2';
        syncIconRef.current.style.transform = 'rotate(0deg)';
        void syncIconRef.current.offsetHeight; // commit rotation reset
      }
      if (row3TextRef.current) {
        row3TextRef.current.style.transition = 'none';
        row3TextRef.current.style.opacity = '0.2';
        row3TextRef.current.style.transform = 'translateX(-8px)';
      }
    };

    const resetInstant = () => {
      prepRow(0);
      prepRow(1);
      resetRow3Instant();
      if (neoBrainLabelRef.current) {
        neoBrainLabelRef.current.style.transition = 'none';
        neoBrainLabelRef.current.style.opacity = '0';
        neoBrainLabelRef.current.style.transform = 'translateY(-4px)';
      }
    };

    // ---- ACT 1: a reply arrives ----
    const animateRowIn = async (i) => {
      const cfg = ROWS[i];
      const row = rowRefs.current[i];
      const dot = dotRefs.current[i];
      const text = textRefs.current[i];
      if (row) {
        row.style.transition = 'opacity 200ms ease-out, box-shadow 250ms ease-out';
        row.style.opacity = '1';
        row.style.boxShadow = `inset 3px 0 0 ${cfg.signal}`; // faint new-message signal
        later(() => {
          if (row) {
            row.style.transition = 'opacity 200ms ease-out, box-shadow 600ms ease-out';
            row.style.boxShadow = 'inset 3px 0 0 rgba(0,0,0,0)';
          }
        }, 250);
      }
      if (dot) {
        dot.style.transition = 'none';
        animate(250, (t) => {
          const e = easeOutCubic(t);
          dot.style.opacity = String(e);
          dot.style.transform = `scale(${0.5 + 0.5 * e})`;
        }).then(() => {
          if (dot) {
            dot.style.opacity = '1';
            dot.style.transform = 'scale(1)';
          }
        });
      }
      if (text) {
        text.style.transition = 'opacity 320ms ease-out, transform 320ms ease-out';
        text.style.opacity = '1';
        text.style.transform = 'translateX(0)';
      }
      await pause(320);
    };

    // ---- ACT 2: scan one reply, then stamp its badge ----
    const scanAndStamp = async (i) => {
      const cfg = ROWS[i];
      const text = textRefs.current[i];
      const scan = scanRefs.current[i];
      const dot = dotRefs.current[i];
      const badge = badgeRefs.current[i];
      const w = text ? text.offsetWidth : 0;

      if (scan) {
        scan.style.transition = 'none';
        scan.style.opacity = '1';
        scan.style.transform = 'translateX(0)';
      }
      // text dims as the scanner crosses the middle — the AI "reading" it
      animate(cfg.scanDuration, (t) => {
        if (text) text.style.opacity = String(1 - 0.35 * Math.sin(Math.PI * t));
      }).then(() => {
        if (text) text.style.opacity = '1';
      });
      await animate(cfg.scanDuration, (t) => {
        if (scan) scan.style.transform = `translateX(${w * easeInOut(t)}px)`;
      });
      if (scan) {
        scan.style.transition = 'opacity 100ms ease';
        scan.style.opacity = '0';
      }
      await pause(cfg.scanPostPause); // classifier deciding

      // badge stamps in (spring overshoot, never a fade)
      if (badge) {
        badge.style.animation = 'none';
        void badge.offsetWidth;
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0)';
        badge.style.animation = 'lrrhrStamp 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        later(() => {
          if (badge) {
            // bake final frame so hold-breathing can take over
            badge.style.animation = 'none';
            badge.style.transform = 'scale(1)';
            badge.style.opacity = '1';
          }
        }, 310);
      }
      // dot confirms the badge with a single pulse
      if (dot) {
        animate(250, (t) => {
          dot.style.transform = `scale(${1 + 0.5 * Math.sin(Math.PI * t)})`;
        }).then(() => {
          if (dot) dot.style.transform = 'scale(1)';
        });
      }
      await pause(310);
    };

    // ---- ACT 2: NeoBrain "switched on" label ----
    const showNeoBrainLabel = () => {
      const l = neoBrainLabelRef.current;
      if (!l) return;
      l.style.transition = 'opacity 250ms ease-out, transform 250ms ease-out';
      l.style.opacity = '0.8';
      l.style.transform = 'translateY(0)';
    };
    const hideNeoBrainLabel = () => {
      const l = neoBrainLabelRef.current;
      if (!l) return;
      l.style.transition = 'opacity 250ms ease-in';
      l.style.opacity = '0';
    };

    // ---- ACT 2: sequence auto-pauses ----
    const activateRow3 = async () => {
      if (row3Ref.current) {
        row3Ref.current.style.transition = 'background 350ms ease-out, border-color 350ms ease-out';
        row3Ref.current.style.background = PAUSE_BG;
        row3Ref.current.style.borderColor = PAUSE_BORDER;
      }
      if (syncIconRef.current) {
        syncIconRef.current.style.transition = 'opacity 200ms ease, transform 450ms ease-in-out';
        syncIconRef.current.style.opacity = '1';
        syncIconRef.current.style.transform = 'rotate(180deg)'; // pause-button half turn
      }
      if (row3TextRef.current) {
        row3TextRef.current.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
        row3TextRef.current.style.opacity = '1';
        row3TextRef.current.style.transform = 'translateX(0)';
      }
      await pause(450);
    };

    // ---- confident hold ----
    const hold = async (ms) => {
      setWill(false);
      const b0 = badgeRefs.current[0];
      const b1 = badgeRefs.current[1];
      animate(2000, (t) => {
        if (b0) b0.style.opacity = String(1 - 0.35 * Math.sin(Math.PI * t));
      }).then(() => {
        if (b0) b0.style.opacity = '1';
      });
      later(() => {
        animate(2000, (t) => {
          if (b1) b1.style.opacity = String(1 - 0.35 * Math.sin(Math.PI * t));
        }).then(() => {
          if (b1) b1.style.opacity = '1';
        });
      }, 400);
      animate(2500, (t) => {
        const a = 0.15 + 0.1 * Math.sin(Math.PI * t);
        if (row3Ref.current) row3Ref.current.style.background = `rgba(124,58,237,${a})`;
      }).then(() => {
        if (row3Ref.current) row3Ref.current.style.background = PAUSE_BG;
      });
      await pause(ms);
      setWill(true);
    };

    // ---- fast mechanical wipe ----
    const resetAnimated = async () => {
      [0, 1].forEach((i) => {
        const badge = badgeRefs.current[i];
        if (badge) {
          badge.style.animation = 'none';
          badge.style.transition = 'transform 180ms ease-in, opacity 180ms ease-in';
          badge.style.transform = 'scale(0)';
          badge.style.opacity = '0';
        }
        const text = textRefs.current[i];
        if (text) {
          text.style.transition = 'transform 200ms ease-in, opacity 200ms ease-in';
          text.style.transform = 'translateX(-14px)';
          text.style.opacity = '0';
        }
        const dot = dotRefs.current[i];
        if (dot) {
          dot.style.transition = 'opacity 150ms ease-in';
          dot.style.opacity = '0';
        }
      });
      if (row3Ref.current) {
        row3Ref.current.style.transition = 'background 200ms ease, border-color 200ms ease';
        row3Ref.current.style.background = '';
        row3Ref.current.style.borderColor = '';
      }
      if (syncIconRef.current) {
        syncIconRef.current.style.transition = 'opacity 200ms ease';
        syncIconRef.current.style.opacity = '0.2';
      }
      if (row3TextRef.current) {
        row3TextRef.current.style.transition = 'opacity 200ms ease, transform 200ms ease';
        row3TextRef.current.style.opacity = '0.2';
        row3TextRef.current.style.transform = 'translateX(-8px)';
      }
      await pause(220);
      // snap shells + instant rotation reset for next cycle
      prepRow(0);
      prepRow(1);
      if (syncIconRef.current) {
        syncIconRef.current.style.transition = 'none';
        syncIconRef.current.style.transform = 'rotate(0deg)';
        void syncIconRef.current.offsetHeight;
      }
    };

    // ---- master loop ----
    const runCycle = async () => {
      if (cancelled.current) return;
      setWill(true);
      resetInstant();
      await pause(300);

      // ACT 1 — replies arrive
      await animateRowIn(0);
      await pause(500);
      await animateRowIn(1);
      await pause(600);

      // ACT 2 — NeoBrain classifies
      showNeoBrainLabel();
      await pause(280);
      await scanAndStamp(0);
      await pause(400);
      await scanAndStamp(1);
      await pause(300);
      hideNeoBrainLabel();
      await activateRow3();

      // HOLD
      await hold(3200);
      if (cancelled.current) return;

      // RESET
      await resetAnimated();
      await pause(300);
      if (!cancelled.current) runCycle();
    };

    // ---- reduced-motion / no-IO settled state (fully classified) ----
    const renderFinal = () => {
      if (mockRef.current) {
        mockRef.current.style.opacity = '1';
        mockRef.current.style.transform = 'none';
      }
      [0, 1].forEach((i) => {
        const row = rowRefs.current[i];
        const dot = dotRefs.current[i];
        const text = textRefs.current[i];
        const badge = badgeRefs.current[i];
        if (row) row.style.opacity = '1';
        if (dot) {
          dot.style.opacity = '1';
          dot.style.transform = 'scale(1)';
        }
        if (text) {
          text.style.opacity = '1';
          text.style.transform = 'translateX(0)';
        }
        if (badge) {
          badge.style.opacity = '1';
          badge.style.transform = 'scale(1)';
        }
      });
      if (row3Ref.current) {
        row3Ref.current.style.background = PAUSE_BG;
        row3Ref.current.style.borderColor = PAUSE_BORDER;
      }
      if (syncIconRef.current) syncIconRef.current.style.opacity = '1';
      if (row3TextRef.current) {
        row3TextRef.current.style.opacity = '1';
        row3TextRef.current.style.transform = 'translateX(0)';
      }
    };

    // ---- entrance (Phase 2) then the loop ----
    const startEntrance = async () => {
      if (mockRef.current) mockRef.current.style.minHeight = mockRef.current.offsetHeight + 'px';
      await pause(550);
      animate(400, (t) => {
        const e = easeOutCubic(t);
        if (mockRef.current) {
          mockRef.current.style.opacity = String(e);
          mockRef.current.style.transform = `translateY(${10 * (1 - e)}px)`;
        }
      });
      await pause(400); // panel settled
      await pause(400); // beat, then the loop begins
      hasStarted.current = true;
      runCycle();
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
      className="lrr-fix-card c-third"
      data-reveal
      data-reveal-skip
      style={{ ...o(0, 450, 16), willChange: 'transform, opacity' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes lrrhrStamp {
  0%   { transform: scale(0);    opacity: 0; }
  55%  { transform: scale(1.18); opacity: 1; }
  80%  { transform: scale(0.95); }
  100% { transform: scale(1.0);  opacity: 1; }
}`,
        }}
      />

      <div className="lrr-fix-card-head" style={o(150, 350)}>
        <div className="lrr-fix-meta">
          <span className="lrr-fix-badge">5</span>
          <span className="lrr-fix-product">Snaarpmail + NeoBrain AI</span>
        </div>
      </div>
      <h3 className="lrr-fix-title" style={o(250, 350, 8)}>Never miss a hot reply</h3>
      <p className="lrr-fix-desc" style={o(380, 350, 8)}>
        Every reply is classified by intent before a human opens it. Sequences auto-pause the
        moment a prospect responds.
      </p>

      {/* ----- live loop zone ----- */}
      <div
        className="lrr-fix-mock"
        ref={mockRef}
        style={{ position: 'relative', opacity: 0, transform: 'translateY(10px)' }}
      >
        {/* NeoBrain "switched on" label — absolute, no layout impact */}
        <div
          ref={neoBrainLabelRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '8px',
            left: '16px',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: 'rgba(124,58,237,0.6)',
            opacity: 0,
            transform: 'translateY(-4px)',
            pointerEvents: 'none',
          }}
        >
          NeoBrain AI classifying…
        </div>

        <div className="lrr-fixm-replies" style={{ marginTop: '16px' }}>
          {ROWS.map((c, i) => (
            <div
              key={i}
              ref={(node) => { rowRefs.current[i] = node; }}
              className="lrr-fixm-reply"
              style={{
                position: 'relative',
                overflow: 'visible',
                height: '48px',
                boxSizing: 'border-box',
                opacity: 0.2,
                transition: 'none',
              }}
            >
              <span
                ref={(node) => { dotRefs.current[i] = node; }}
                className="lrr-fixm-reply-dot"
                style={{
                  background: c.dotColor,
                  opacity: 0,
                  transform: 'scale(0.5)',
                  willChange: 'transform, opacity',
                }}
              />
              <span className="lrr-fixm-reply-q" style={{ position: 'relative', overflow: 'visible' }}>
                <span
                  ref={(node) => { textRefs.current[i] = node; }}
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    transform: 'translateX(14px)',
                    willChange: 'transform, opacity',
                  }}
                >
                  {c.text}
                </span>
                <div
                  ref={(node) => { scanRefs.current[i] = node; }}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '2px',
                    background:
                      'linear-gradient(to bottom, transparent, rgba(124,58,237,0.5), transparent)',
                    opacity: 0,
                    pointerEvents: 'none',
                    willChange: 'transform, opacity',
                  }}
                />
              </span>
              <span
                ref={(node) => { badgeRefs.current[i] = node; }}
                className="lrr-fixm-reply-tag"
                style={{
                  color: c.badgeColor,
                  background: c.badgeBg,
                  border: `1px solid ${c.badgeBorder}`,
                  opacity: 0,
                  transform: 'scale(0)',
                  minWidth: '64px',
                  textAlign: 'center',
                  willChange: 'transform, opacity',
                }}
              >
                {c.badge}
              </span>
            </div>
          ))}

          {/* auto-pause row */}
          <div
            ref={row3Ref}
            className="lrr-fixm-reply"
            style={{ height: '48px', boxSizing: 'border-box', transition: 'none' }}
          >
            <span
              ref={syncIconRef}
              className="lrr-fixm-reply-ic"
              style={{ opacity: 0.2, willChange: 'transform' }}
            >
              <Icon name="refresh-cw" aria-hidden="true" />
            </span>
            <span
              ref={row3TextRef}
              className="lrr-fixm-reply-q"
              style={{ color: 'var(--text-muted)', opacity: 0.2, transform: 'translateX(-8px)' }}
            >
              Sequence auto-paused on reply
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
