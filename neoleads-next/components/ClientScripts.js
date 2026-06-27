'use client';

// Scroll-reveal engine + bespoke per-card animations, ported VERBATIM from the
// original site's inline <script>. Because the converted JSX preserves every
// class, id, and data-* attribute, this imperative DOM code runs unchanged after
// React hydrates. It runs once per mount (per page). The icon-rendering and
// nav-menu blocks from the original script are intentionally omitted — icons use
// lucide-react (see Icon.js) and the menus use React state (see Navbar.js).

import { useEffect } from 'react';

export default function ClientScripts() {
  useEffect(() => {
      // Scroll reveal engine — reusable, Intersection Observer based.
      // Markup contract:
      //   [data-reveal]                 element fades + lifts in once
      //   [data-reveal-delay="120"]     fixed entrance delay (ms)
      //   [data-reveal-stagger="120"]   container: its direct [data-reveal]
      //                                 children get index * step delays
      //   [data-reveal-base="100"]      stagger start offset (ms)
      // Elements already in view on load are revealed instantly (no anim).
      (function () {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var hasIO = 'IntersectionObserver' in window;
        var slice = Array.prototype.slice;
    
        // 1. Compute stagger delays from container groups.
        // A group (or element) marked data-reveal-onload still animates even when
        // it's above the fold on load — used for the hero entrance.
        slice.call(document.querySelectorAll('[data-reveal-stagger]')).forEach(function (group) {
          var step = parseInt(group.getAttribute('data-reveal-stagger'), 10) || 120;
          var base = parseInt(group.getAttribute('data-reveal-base'), 10) || 0;
          var onload = group.hasAttribute('data-reveal-onload');
          var kids = group.querySelectorAll(':scope > [data-reveal]');
          slice.call(kids).forEach(function (kid, i) {
            if (kid.getAttribute('data-reveal-delay') === null) {
              kid.setAttribute('data-reveal-delay', base + i * step);
            }
            if (onload) { kid.setAttribute('data-reveal-onload', ''); }
          });
        });
    
        var legacy = slice.call(document.querySelectorAll('.reveal'));
        var items = slice.call(document.querySelectorAll('[data-reveal]'));
    
        // 2. No observer / reduced motion -> show everything, no animation.
        if (prefersReduced || !hasIO) {
          legacy.forEach(function (el) { el.classList.add('visible'); });
          items.forEach(function (el) { el.classList.add('is-revealed'); el.removeAttribute('data-reveal'); });
          return;
        }
    
        // 3. Legacy whole-section .reveal blocks.
        var legacyObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              legacyObs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        legacy.forEach(function (el) { legacyObs.observe(el); });
    
        // 4. Granular, staggered [data-reveal] elements.
        // Once the entrance settles we drop the data-reveal attribute + helper
        // classes so the element returns to its own CSS — its final visible state
        // (opacity:1 / no transform) is identical, and this stops the reveal rule
        // from overriding the element's own hover transitions.
        function settle(el) {
          el.classList.remove('reveal-animating');
          el.style.transitionDelay = '';
          el.removeAttribute('data-reveal');
        }
        function reveal(el, animate) {
          if (!animate) { el.classList.add('is-revealed'); settle(el); return; } // above the fold
          var delay = parseInt(el.getAttribute('data-reveal-delay'), 10) || 0;
          if (delay) { el.style.transitionDelay = delay + 'ms'; }
          el.classList.add('reveal-animating');
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { el.classList.add('is-revealed'); });
          });
          window.setTimeout(function () { settle(el); }, 700 + delay);
        }
    
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              reveal(entry.target, true);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    
        var vh = window.innerHeight || document.documentElement.clientHeight;
        items.forEach(function (el) {
          // data-reveal-skip: this element runs its own bespoke animation
          // (e.g. the Zeus card). Reveal its frame instantly and hand off —
          // it still counts in any stagger group so siblings keep their timing.
          if (el.hasAttribute('data-reveal-skip')) { el.classList.add('is-revealed'); settle(el); return; }
          var r = el.getBoundingClientRect();
          var aboveFold = r.top < vh * 0.9 && r.bottom > 0; // already visible at load
          if (aboveFold) {
            // default: skip animation above the fold. Opt in with data-reveal-onload
            // (the hero) to play the entrance on page load instead.
            reveal(el, el.hasAttribute('data-reveal-onload'));
          } else {
            obs.observe(el);
          }
        });
      })();
    
      // Zeus Prospecting card — bespoke staggered entrance (isolated to .zeus-anim).
      // Fires once at threshold 0.15; CSS handles the precise timing via .in-view.
      (function () {
        var card = document.querySelector('.zeus-anim');
        if (!card) { return; }
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || !('IntersectionObserver' in window)) {
          card.classList.add('in-view');
          return;
        }
        var zObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              zObs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        zObs.observe(card);
      })();
    
      // Verifyrit & Warmrit card — bespoke cinematic entrance (isolated to .verify2-anim).
      // CSS handles the opacity/transform phases via .in-view; JS drives the gauge
      // ring sweep + colour, the % counter and the 98/100 score via requestAnimationFrame.
      (function () {
        var card = document.querySelector('.verify2-anim');
        if (!card) { return; }
    
        var ring    = card.querySelector('.vw-ring-fill');
        var numEl   = card.querySelector('.vw-num');
        var inbox   = card.querySelector('.vw-inbox');
        var line    = card.querySelector('.vw-line');
        var scoreEl = card.querySelector('.vw-score-num');
    
        var R = 42;
        var C = 2 * Math.PI * R;            // ring circumference (~263.9)
        var TARGET = 99.2;                  // inbox %
        var finalOffset = C * (1 - TARGET / 100); // dashoffset at 99.2% fill
    
        // Prep SVG draw lengths up front (attributes only -> no layout shift).
        if (ring) { ring.style.strokeDasharray = C; ring.style.strokeDashoffset = C; ring.style.stroke = 'rgb(42,42,42)'; }
        var lineLen = 0;
        if (line && line.getTotalLength) {
          lineLen = line.getTotalLength();
          line.style.strokeDasharray = lineLen;
          line.style.strokeDashoffset = lineLen;
          line.style.transition = 'stroke-dashoffset 1600ms ease-in-out 800ms';
        }
    
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function settleInstant() {
          card.classList.add('in-view');
          if (ring) { ring.style.strokeDashoffset = finalOffset; ring.style.stroke = '#22C55E'; }
          if (line) { line.style.strokeDashoffset = 0; }
          if (numEl) { numEl.textContent = TARGET.toFixed(1); }
          if (inbox) { inbox.classList.add('show'); }
          if (scoreEl) { scoreEl.textContent = '98'; }
        }
        if (prefersReduced || !('IntersectionObserver' in window)) { settleInstant(); return; }
    
        // Faithful cubic-bezier easing (Newton-Raphson) so the ring decelerates
        // exactly like the CSS curve it mirrors.
        function cubicBezier(p1x, p1y, p2x, p2y) {
          function A(a, b) { return 1 - 3 * b + 3 * a; }
          function B(a, b) { return 3 * b - 6 * a; }
          function Cc(a) { return 3 * a; }
          function calc(t, a, b) { return ((A(a, b) * t + B(a, b)) * t + Cc(a)) * t; }
          function slope(t, a, b) { return 3 * A(a, b) * t * t + 2 * B(a, b) * t + Cc(a); }
          return function (x) {
            if (x <= 0) { return 0; }
            if (x >= 1) { return 1; }
            var t = x;
            for (var i = 0; i < 6; i++) {
              var s = slope(t, p1x, p2x);
              if (s === 0) { break; }
              t -= (calc(t, p1x, p2x) - x) / s;
            }
            return calc(t, p1y, p2y);
          };
        }
        var ringEase = cubicBezier(0.4, 0, 0.2, 1);
        function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
    
        function animate(duration, ease, step) {
          var start = 0;
          function frame(now) {
            if (!start) { start = now; }
            var raw = Math.min(1, (now - start) / duration);
            step(ease(raw), raw);
            if (raw < 1) { requestAnimationFrame(frame); }
          }
          requestAnimationFrame(frame);
        }
    
        // Phase 3 — hero gauge: ring sweeps + dims grey -> green, % counts up.
        function runRing() {
          var inboxShown = false;
          animate(1800, ringEase, function (e, raw) {
            if (ring) {
              ring.style.strokeDashoffset = (C - (C - finalOffset) * e);
              var cf = Math.min(1, e / 0.5); // reach full green by mid-sweep
              var r = Math.round(42 + (34 - 42) * cf);
              var g = Math.round(42 + (197 - 42) * cf);
              var b = Math.round(42 + (94 - 42) * cf);
              ring.style.stroke = 'rgb(' + r + ',' + g + ',' + b + ')';
            }
            if (numEl) { numEl.textContent = (TARGET * e).toFixed(1); }
            if (!inboxShown && raw >= 0.5 && inbox) { inbox.classList.add('show'); inboxShown = true; }
          });
        }
    
        // Phase 5 — score flies up fast then settles.
        function runScore() {
          animate(900, easeOutCubic, function (e) {
            if (scoreEl) { scoreEl.textContent = Math.round(98 * e); }
          });
        }
    
        var fired = false;
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !fired) {
              fired = true;
              entry.target.classList.add('in-view'); // CSS phases + chart draw
              if (line) { line.style.strokeDashoffset = 0; } // Phase 4 line draw
              setTimeout(runRing, 600);   // Phase 3
              setTimeout(runScore, 1600); // Phase 5
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        obs.observe(card);
      })();
    
      // Sendrit Automation card — live-sequence storytelling loop (isolated to .sendrit-anim).
      // A single requestAnimationFrame master timeline toggles state classes at fixed
      // offsets and loops every ~6.8s; CSS does the actual interpolation. The loop only
      // runs while the card is in view and restarts cleanly from Phase 3 on re-entry.
      (function () {
        var card = document.querySelector('.sendrit-anim');
        if (!card) { return; }
        var panel = card.querySelector('.sendrit-mock');
        var rows  = card.querySelectorAll('.seq-row');
        var conns = card.querySelectorAll('.seq-conn');
    
        var sd1ring  = card.querySelector('.sd1-ring');
        var sd1fill  = card.querySelector('.sd1-fill');
        var sd1check = card.querySelector('.sd1-check');
        var sd1pulse = card.querySelector('.sd1-pulse');
        var status1  = rows[0].querySelector('.sd-anim-status');
        var status2  = rows[1].querySelector('.sd-anim-status');
        var prog     = card.querySelector('.sd2-prog');
    
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          card.classList.add('in-view'); // CSS reduced-motion block shows a static final state
          return;
        }
    
        // Master timeline (loop-relative ms). 0-300ms = lead-in pause, then Phase 3..6.
        var T = 6800;
        var timeline = [
          { at: 300,  fn: function () { rows[0].classList.add('lit'); sd1ring.classList.add('draw'); } },        // border draws
          { at: 700,  fn: function () { sd1fill.classList.add('fill'); } },                                       // fills orange
          { at: 900,  fn: function () { sd1check.classList.add('draw'); } },                                      // check draws
          { at: 1200, fn: function () {                                                                           // complete: pulse + status + connector
              sd1pulse.classList.remove('pulse'); void panel.offsetWidth; sd1pulse.classList.add('pulse');
              status1.classList.add('show'); conns[0].classList.add('draw');
          } },
          { at: 1600, fn: function () {                                                                           // Phase 4: Step 2 activates
              rows[1].classList.add('lit'); panel.classList.add('s2-active');
              status2.classList.add('show'); prog.classList.add('go'); conns[1].classList.add('draw');
          } },
          { at: 2800, fn: function () { rows[2].classList.add('s3lit'); panel.classList.add('s3-active'); } },    // Phase 5: Step 3 stirs
          { at: 6400, fn: function () { panel.classList.add('resetting'); } }                                     // Phase 6: tail fade
        ];
    
        function resetPanel() {
          // Snap every looped element back to its initial (Phase 3) state with no
          // reverse transitions, so the next pass draws everything fresh.
          panel.classList.add('no-trans');
          panel.classList.remove('resetting', 's2-active', 's3-active');
          rows[0].classList.remove('lit'); rows[1].classList.remove('lit'); rows[2].classList.remove('s3lit');
          sd1ring.classList.remove('draw'); sd1fill.classList.remove('fill'); sd1check.classList.remove('draw');
          sd1pulse.classList.remove('pulse');
          status1.classList.remove('show'); status2.classList.remove('show');
          conns[0].classList.remove('draw'); conns[1].classList.remove('draw');
          prog.classList.remove('go');
          void panel.offsetWidth; // force reflow so the class removals apply instantly
          panel.classList.remove('no-trans');
        }
    
        var raf = null, running = false, loopStart = 0, idx = 0;
        function frame(now) {
          if (!running) { return; }
          if (!loopStart) { loopStart = now; }
          var t = now - loopStart;
          while (idx < timeline.length && t >= timeline[idx].at) { timeline[idx].fn(); idx++; }
          if (t >= T) { resetPanel(); loopStart = now; idx = 0; }
          raf = requestAnimationFrame(frame);
        }
        function startLoop() {
          if (running) { return; }
          running = true; loopStart = 0; idx = 0;
          resetPanel();                       // clean restart from Phase 3
          raf = requestAnimationFrame(frame);
        }
        function stopLoop() {
          running = false;
          if (raf) { cancelAnimationFrame(raf); raf = null; }
        }
    
        if (!('IntersectionObserver' in window)) { card.classList.add('in-view'); startLoop(); return; }
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { card.classList.add('in-view'); startLoop(); } // text/panel enter once; loop (re)starts
            else { stopLoop(); }
          });
        }, { threshold: 0.15 });
        obs.observe(card);
      })();
    
      // Snaarp Mail card — live inbox storytelling loop (isolated to .snaarp-anim).
      // One master setTimeout chain drives Phases 4-7 (~8s) and re-arms itself; the
      // typewriter is requestAnimationFrame with a timestamp accumulator. All timers
      // are tracked so leaving the viewport cancels everything and re-entry restarts.
      (function () {
        var card = document.querySelector('.snaarp-anim');
        if (!card) { return; }
        var panel    = card.querySelector('.snaarp-mock');
        var rPriya   = card.querySelector('.r-priya');
        var rMarcus  = card.querySelector('.r-marcus');
        var rDana    = card.querySelector('.r-dana');
        var priyaDot = rPriya.querySelector('.sr-dot');
        var danaDot  = rDana.querySelector('.sr-dot');
        var priyaQuote = rPriya.querySelector('.sr-quote');
        var priyaType  = rPriya.querySelector('.sr-type');
        var priyaTime  = rPriya.querySelector('.sr-time');
        var danaQuote  = rDana.querySelector('.sr-quote');
        var danaType   = rDana.querySelector('.sr-type');
        var roll  = card.querySelector('.mb-roll');
        var mbCur = card.querySelector('.mb-cur');
        var mbNext = card.querySelector('.mb-next');
    
        var PRIYA_MSG = '"Yes, let\'s set up a call this week..."';
        var DANA_MSG  = '"Is this still available?..."';
    
        var timers = [];
        var typer = null;
        function after(ms, fn) { var id = setTimeout(fn, ms); timers.push(id); return id; }
        function clearAll() {
          for (var i = 0; i < timers.length; i++) { clearTimeout(timers[i]); }
          timers = [];
          if (typer) { typer.cancel(); typer = null; }
        }
    
        // Typewriter — rAF + timestamp accumulator, ~38ms/char with +/-10ms jitter.
        function typeWriter(typeEl, quoteEl, text, onDone) {
          if (typer) { typer.cancel(); }
          quoteEl.classList.add('typing');
          typeEl.textContent = '';
          var i = 0, last = 0, acc = 0, raf;
          function nextDelay() { return 38 + (Math.random() * 20 - 10); }
          var delay = nextDelay();
          function step(ts) {
            if (!last) { last = ts; }
            acc += ts - last; last = ts;
            while (acc >= delay && i < text.length) { acc -= delay; i++; typeEl.textContent = text.slice(0, i); delay = nextDelay(); }
            if (i < text.length) { raf = requestAnimationFrame(step); }
            else { quoteEl.classList.remove('typing'); typer = null; if (onDone) { onDone(); } }
          }
          raf = requestAnimationFrame(step);
          typer = { cancel: function () { if (raf) { cancelAnimationFrame(raf); } } };
        }
    
        // Mailbox counter — slot-machine flip between two known values, then commit.
        function flip(from, to, dir) {
          mbCur.textContent = from; mbNext.textContent = to;
          roll.classList.add('mb-instant');
          mbNext.style.transform = dir === 'up' ? 'translateY(100%)' : 'translateY(-100%)';
          mbCur.style.transform = 'translateY(0)';
          void roll.offsetWidth;                    // commit start positions instantly
          roll.classList.remove('mb-instant');
          mbCur.style.transform = dir === 'up' ? 'translateY(-100%)' : 'translateY(100%)';
          mbNext.style.transform = 'translateY(0)';
          after(260, function () {                  // settle: adopt the new value, reset slots
            roll.classList.add('mb-instant');
            mbCur.textContent = to; mbCur.style.transform = 'translateY(0)';
            mbNext.style.transform = 'translateY(100%)';
            void roll.offsetWidth;
            roll.classList.remove('mb-instant');
          });
        }
    
        // Snap every looped element back to its clean Phase-4 starting state.
        function resetContent() {
          rPriya.classList.remove('in'); rMarcus.classList.remove('in');
          priyaDot.classList.remove('pulsing'); danaDot.classList.remove('pulsing');
          priyaTime.classList.remove('show');
          priyaQuote.classList.remove('typing'); danaQuote.classList.remove('typing');
          priyaType.textContent = ''; danaType.textContent = '';
          rDana.classList.add('snap'); rDana.classList.remove('in', 'out');
          roll.classList.add('mb-instant');
          mbCur.textContent = '12'; mbCur.style.transform = 'translateY(0)';
          mbNext.textContent = '13'; mbNext.style.transform = 'translateY(100%)';
          void rDana.offsetWidth;                   // apply snaps with no transition
          rDana.classList.remove('snap'); roll.classList.remove('mb-instant');
        }
    
        function runLoop() {
          timers = [];
          // Phase 4 — existing rows slide in (older first)
          after(0,    function () { rMarcus.classList.add('in'); });
          after(300,  function () { rPriya.classList.add('in'); priyaDot.classList.add('pulsing'); });
          // Phase 5 — Priya types (cursor blinks ~400ms first, then characters)
          after(800,  function () { priyaQuote.classList.add('typing'); });
          after(1200, function () { typeWriter(priyaType, priyaQuote, PRIYA_MSG, function () { priyaTime.classList.add('show'); }); });
          // Phase 6 — Dana arrives: row slides up, border flash, counter 12 -> 13, preview types
          after(3000, function () {
            rDana.classList.add('in'); danaDot.classList.add('pulsing');
            panel.classList.add('flash'); flip('12', '13', 'up');
          });
          after(3200, function () { panel.classList.remove('flash'); });
          after(3450, function () { typeWriter(danaType, danaQuote, DANA_MSG); });
          // Phase 7 — reset: Dana leaves, counter 13 -> 12, Priya text clears (brief cursor)
          after(6300, function () {
            rDana.classList.remove('in'); rDana.classList.add('out');
            flip('13', '12', 'down');
            rPriya.classList.remove('in'); rMarcus.classList.remove('in');
            priyaDot.classList.remove('pulsing'); danaDot.classList.remove('pulsing');
            priyaTime.classList.remove('show');
            if (typer) { typer.cancel(); typer = null; }
            priyaType.textContent = ''; priyaQuote.classList.add('typing');
            danaType.textContent = ''; danaQuote.classList.remove('typing');
          });
          after(6600, function () { priyaQuote.classList.remove('typing'); }); // cursor disappears
          // ~500ms pause, then restart from Phase 4
          after(7200, function () { resetContent(); runLoop(); });
        }
    
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          card.classList.add('in-view');
          rMarcus.classList.add('in'); rPriya.classList.add('in');
          priyaType.textContent = PRIYA_MSG; priyaTime.classList.add('show');
          return;
        }
    
        var entered = false;
        function start() {
          clearAll(); resetContent();
          var lead = entered ? 0 : 1200;   // first time: let the header (Phase 3) assemble
          entered = true;
          after(lead, runLoop);
        }
        function stop() { clearAll(); resetContent(); }
    
        if (!('IntersectionObserver' in window)) { card.classList.add('in-view'); start(); return; }
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { card.classList.add('in-view'); start(); }
            else { stop(); }
          });
        }, { threshold: 0.15 });
        obs.observe(card);
      })();
    
      // NeoBrain AI card — cinematic AI-analysis storytelling loop (isolated to .neobrain-anim).
      // A single cancellable master async function tells the story: message arrives + types,
      // the AI "reads" + "processes", then fires its analysis across all three panels and
      // drops the verdict. requestAnimationFrame drives the typewriters and the ring/counter
      // (with the score-70 stutter). Leaving the viewport cancels everything; re-entry restarts.
      (function () {
        var card = document.querySelector('.neobrain-anim');
        if (!card) { return; }
        var reply    = card.querySelector('.nb-reply');
        var score    = card.querySelector('.nb-score-cell');
        var analysis = card.querySelector('.nb-analysis');
        var avatar   = card.querySelector('.nb-av');
        var avWrap   = card.querySelector('.nb-av-wrap');
        var name     = card.querySelector('.nb-name');
        var role     = card.querySelector('.nb-role');
        var quote    = card.querySelector('.nb-quote');
        var quoteType = card.querySelector('.nb-type');
        var scan     = card.querySelector('.nb-scan');
        var shimmer  = card.querySelector('.nb-shimmer');
        var ringFill = card.querySelector('.nb-ring-fill');
        var num      = card.querySelector('.nb-num');
        var cap      = card.querySelector('.nb-cap');
        var burst    = card.querySelector('.nb-burst');
        var hot      = card.querySelector('.nb-hot');
        var flash    = card.querySelector('.nb-flash');
        var sentLbl  = card.querySelector('.nb-lbl-sent');
        var detLbl   = card.querySelector('.nb-lbl-det');
        var pos      = card.querySelector('.nb-pos');
        var posType  = card.querySelector('.nb-pos-type');
        var pricing  = card.querySelector('.nb-tag.pricing');
        var meeting  = card.querySelector('.nb-tag.meeting');
        var nextLbl  = card.querySelector('.nb-next-lbl');
        var arrow    = card.querySelector('.nb-next-icon');
        var action   = card.querySelector('.nb-next-action');
    
        var QUOTE = '"This looks genuinely useful. Can you send pricing and grab 30 minutes next week to walk the team through it?"';
        var C = 2 * Math.PI * 52;            // ring circumference (~326.7)
        var FINAL = C * (1 - 0.87);          // dashoffset at 87%
    
        function resetContent() {
          reply.classList.remove('lit'); score.classList.remove('lit'); analysis.classList.remove('lit');
          card.classList.remove('analyzed');
          avatar.classList.remove('in'); avWrap.classList.remove('glow');
          name.classList.remove('in'); role.classList.remove('in');
          quote.classList.remove('typing'); quoteType.textContent = '';
          scan.classList.remove('run'); shimmer.classList.remove('run');
          cap.classList.remove('show'); burst.classList.remove('run');
          ringFill.style.strokeDasharray = C; ringFill.style.strokeDashoffset = C; ringFill.style.stroke = '#333333';
          num.textContent = '0';
          sentLbl.classList.remove('show'); detLbl.classList.remove('show'); nextLbl.classList.remove('show');
          pos.classList.remove('pulse'); posType.textContent = '';
          pricing.classList.remove('stamp', 'flash-on'); meeting.classList.remove('stamp', 'flash-on');
          arrow.classList.remove('in', 'pulsing'); action.classList.remove('in');
          hot.classList.remove('in', 'flicker'); flash.classList.remove('run');
        }
    
        // ---- reduced-motion: render the final analyzed state, no loop ----
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          card.classList.add('in-view');
          reply.classList.add('lit'); score.classList.add('lit'); analysis.classList.add('lit');
          avatar.classList.add('in'); name.classList.add('in'); role.classList.add('in');
          quoteType.textContent = QUOTE;
          ringFill.style.strokeDasharray = C; ringFill.style.strokeDashoffset = FINAL; ringFill.style.stroke = '#7C3AED';
          num.textContent = '87'; cap.classList.add('show');
          sentLbl.classList.add('show'); detLbl.classList.add('show'); nextLbl.classList.add('show');
          posType.textContent = 'Positive';
          arrow.classList.add('in'); action.classList.add('in'); hot.classList.add('in');
          return;
        }
    
        // ---- cancellable timing primitives ----
        function track(tk) { var h = { id: 0 }; tk.rafs.push(h); return h; }
        function sleep(tk, ms) { return new Promise(function (res) { var id = setTimeout(res, ms); tk.timers.push(id); }); }
        function replay(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
    
        // typewriter — rAF + timestamp accumulator, per-char interval with jitter
        function typeWriter(tk, typeEl, holderClassEl, text, perChar, jitter) {
          return new Promise(function (resolve) {
            typeEl.textContent = '';
            var i = 0, last = 0, acc = 0, h = track(tk);
            function delay() { return perChar + (jitter ? (Math.random() * 2 * jitter - jitter) : 0); }
            var d = delay();
            function frame(ts) {
              if (tk.cancelled) { resolve(); return; }
              if (!last) { last = ts; }
              acc += ts - last; last = ts;
              while (acc >= d && i < text.length) { acc -= d; i++; typeEl.textContent = text.slice(0, i); d = delay(); }
              if (i < text.length) { h.id = requestAnimationFrame(frame); }
              else { resolve(); }
            }
            h.id = requestAnimationFrame(frame);
          });
        }
    
        // ring sweep + counter, ease-out cubic, grey->purple, 80ms stutter at score 70
        function runRing(tk) {
          return new Promise(function (resolve) {
            var start = 0, pausedTotal = 0, pauseUntil = 0, pauseStart = 0, stuttered = false, capShown = false, h = track(tk);
            function ease(x) { return 1 - Math.pow(1 - x, 3); }
            function ch(a, b, t) { return Math.round(a + (b - a) * t); }
            function frame(ts) {
              if (tk.cancelled) { resolve(); return; }
              if (!start) { start = ts; }
              if (pauseUntil > 0) {
                if (ts < pauseUntil) { h.id = requestAnimationFrame(frame); return; }
                pausedTotal += ts - pauseStart; pauseUntil = 0;
              }
              var e = ease(Math.min(1, (ts - start - pausedTotal) / 1600));
              var count = 87 * e;
              if (!stuttered && count >= 70) { stuttered = true; pauseUntil = ts + 80; pauseStart = ts; h.id = requestAnimationFrame(frame); return; }
              ringFill.style.strokeDashoffset = C - (C - FINAL) * e;
              ringFill.style.stroke = 'rgb(' + ch(51, 124, e) + ',' + ch(51, 58, e) + ',' + ch(51, 237, e) + ')';
              num.textContent = Math.round(count);
              if (!capShown && count >= 50) { cap.classList.add('show'); capShown = true; }
              if (e < 1) { h.id = requestAnimationFrame(frame); }
              else {
                num.textContent = '87'; ringFill.style.strokeDashoffset = FINAL; ringFill.style.stroke = '#7C3AED';
                replay(burst, 'run'); resolve();
              }
            }
            h.id = requestAnimationFrame(frame);
          });
        }
    
        // right-panel cascade (runs in parallel with the ring)
        async function fireRight(tk) {
          sentLbl.classList.add('show');
          await typeWriter(tk, posType, pos, 'Positive', 60, 0); if (tk.cancelled) { return; }
          replay(pos, 'pulse');
          detLbl.classList.add('show');
          await sleep(tk, 160); if (tk.cancelled) { return; }
          replay(pricing, 'stamp'); pricing.classList.add('flash-on');
          var p1 = setTimeout(function () { pricing.classList.remove('flash-on'); }, 80); tk.timers.push(p1);
          await sleep(tk, 200); if (tk.cancelled) { return; }
          replay(meeting, 'stamp'); meeting.classList.add('flash-on');
          var p2 = setTimeout(function () { meeting.classList.remove('flash-on'); }, 80); tk.timers.push(p2);
          await sleep(tk, 200); if (tk.cancelled) { return; }
          nextLbl.classList.add('show');
          await sleep(tk, 100); if (tk.cancelled) { return; }
          arrow.classList.add('in');
          await sleep(tk, 100); if (tk.cancelled) { return; }
          action.classList.add('in');
          await sleep(tk, 250); if (tk.cancelled) { return; }
          arrow.classList.add('pulsing');
        }
    
        // ---- master story (one full ~9s loop) ----
        async function story(tk) {
          resetContent();
          tk.rafs.length = 0; tk.timers.length = 0;
          await sleep(tk, 300); if (tk.cancelled) { return; }
    
          // Phase 3 — the message arrives, then types itself out
          reply.classList.add('lit');
          avatar.classList.add('in'); replay(avWrap, 'glow');
          await sleep(tk, 200); if (tk.cancelled) { return; }
          name.classList.add('in');
          await sleep(tk, 150); if (tk.cancelled) { return; }
          role.classList.add('in');
          await sleep(tk, 250); if (tk.cancelled) { return; }
          quote.classList.add('typing');          // cursor blinks first
          replay(scan, 'run');                     // AI "reads" the message
          // Start typing in the BACKGROUND — the AI reads + analyses in parallel, so the
          // viewer grasps the whole concept immediately instead of waiting for the full quote.
          typeWriter(tk, quoteType, quote, QUOTE, 28, 8).then(function () { if (!tk.cancelled) { quote.classList.remove('typing'); } });
          await sleep(tk, 900); if (tk.cancelled) { return; }   // brief read beat; typing keeps running
    
          // Phase 4 — processing sweep (overlaps the still-typing message)
          replay(shimmer, 'run');
          await sleep(tk, 700); if (tk.cancelled) { return; }
    
          // Phase 5 — fire analysis simultaneously across center + right panels
          score.classList.add('lit'); analysis.classList.add('lit');
          runRing(tk);            // self-running (not awaited)
          fireRight(tk);          // self-running (not awaited)
    
          // Phase 6 — verdict drops after the score locks in
          await sleep(tk, 1800); if (tk.cancelled) { return; }
          hot.classList.add('in'); replay(flash, 'run'); hot.classList.add('flicker');
          ringFill.style.stroke = '#F97316';       // ring briefly tints orange
          await sleep(tk, 200); if (tk.cancelled) { return; }
          ringFill.style.stroke = '#7C3AED';
          hot.classList.remove('flicker');
          card.classList.add('analyzed');          // Phase 7 idle micro-animations on
    
          // Phase 7 — hold the fully-analyzed state
          await sleep(tk, 2600); if (tk.cancelled) { return; }
    
          // Phase 8 — fade panels back to dim, then loop restarts (reset under cover)
          card.classList.remove('analyzed');
          reply.classList.remove('lit'); score.classList.remove('lit'); analysis.classList.remove('lit');
          await sleep(tk, 800); if (tk.cancelled) { return; }
        }
    
        var token = null, entered = false;
        function cancel() {
          if (!token) { return; }
          token.cancelled = true;
          token.rafs.forEach(function (h) { cancelAnimationFrame(h.id); });
          token.timers.forEach(clearTimeout);
          token = null;
        }
        function startStory() {
          cancel();
          var tk = token = { cancelled: false, rafs: [], timers: [] };
          (async function () {
            if (!entered) { entered = true; await sleep(tk, 900); } // first time: let Phase 1/2 enter
            while (!tk.cancelled) { await story(tk); }
          })();
        }
    
        if (!('IntersectionObserver' in window)) { card.classList.add('in-view'); startStory(); return; }
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { card.classList.add('in-view'); startStory(); }
            else { cancel(); resetContent(); }
          });
        }, { threshold: 0.15 });
        io.observe(card);
      })();
  }, []);

  return null;
}
