'use client';

// Zeus "coming soon" bespoke animation, ported VERBATIM from the original page's
// inline <script>: the entrance sequence, cursor-tracking eyes (lerp), random
// blink mechanic, and the Back button. The converted JSX preserves every class
// and id, so this imperative DOM code runs unchanged after React hydrates. The
// only adaptation is the Back fallback target ('index.html' -> '/') and calling
// the script's own window.zeusCleanup on unmount so the rAF loop and mousemove
// listener don't leak across client-side navigations.

import { useEffect } from 'react';

export default function ZeusComingSoonScripts() {
  useEffect(() => {
  (function () {
    "use strict";

    /* ---------- Entrance sequence ---------- */
    var eyeWrap = document.getElementById('eyeWrap');
    var pill = document.getElementById('pill');
    var map = [
      [eyeWrap, ''],
      [pill, 'pill'],
      [document.getElementById('headline'), 'head'],
      [document.getElementById('sub'), 'sub'],
      [document.getElementById('back'), 'back']
    ];
    map.forEach(function (pair) {
      pair[0].classList.add('enter');
      if (pair[1]) pair[0].classList.add(pair[1]);
    });

    /* ---------- Cursor-tracking eyes (lerp) ---------- */
    var pupils = document.querySelectorAll('.pupil');
    var svg = document.getElementById('eyeSvg');
    var MAX_TRAVEL = 12;       // px in SVG units
    var LERP = 0.12;
    var target = { x: 0, y: 0 };
    var current = { x: 0, y: 0 };
    var hasPointer = false;
    var t0 = null;             // time base for mobile drift

    function onMove(e) {
      hasPointer = true;
      var rect = svg.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) { target.x = 0; target.y = 0; return; }
      // clamp travel to MAX_TRAVEL radius, keep direction
      var scale = Math.min(MAX_TRAVEL, dist) / dist;
      target.x = dx * scale;
      target.y = dy * scale;
    }
    window.addEventListener('mousemove', onMove);

    function frame(ts) {
      if (t0 === null) t0 = ts;
      if (!hasPointer) {
        // autonomous figure-8 drift for touch/no-cursor
        var elapsed = (ts - t0) / 1000;          // seconds
        var phase = (elapsed / 4) * Math.PI * 2;  // 4s period
        target.x = Math.sin(phase) * 6;
        target.y = Math.sin(phase * 2) * 3;       // figure-8 (vertical 2x freq)
      }
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      var tf = 'translate(' + current.x.toFixed(2) + ',' + current.y.toFixed(2) + ')';
      for (var i = 0; i < pupils.length; i++) pupils[i].setAttribute('transform', tf);
      requestAnimationFrame(frame);
    }
    var rafId = requestAnimationFrame(frame);

    /* ---------- Blink mechanic ---------- */
    var eyelids = document.querySelectorAll('.eyelid');
    var TOP = -122, BOTTOM = 8;   // y range: hidden above -> covering the eye
    var blinkTimer = null;

    function animateY(from, to, duration, done) {
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        // ease-in-out
        var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        var y = (from + (to - from) * e).toFixed(2);
        for (var i = 0; i < eyelids.length; i++) eyelids[i].setAttribute('y', y);
        if (p < 1) requestAnimationFrame(step);
        else if (done) done();
      }
      requestAnimationFrame(step);
    }

    function blink(done) {
      animateY(TOP, BOTTOM, 300, function () {
        animateY(BOTTOM, TOP, 200, done);
      });
    }

    function scheduleRandomBlink() {
      blinkTimer = setTimeout(function () {
        blink(scheduleRandomBlink);
      }, 4000 + Math.random() * 4000);
    }

    // opening blink shortly after the eye scales in, then a second at 3s, then random
    setTimeout(function () {
      blink(function () {
        setTimeout(function () {
          blink(scheduleRandomBlink);
        }, 3000);
      });
    }, 520);

    // start idle ambient effects once entrance is done
    setTimeout(function () { pill.classList.add('idle'); }, 1200);

    /* ---------- Back button ---------- */
    var back = document.getElementById('back');
    back.addEventListener('click', function () {
      // optional onBack hook: window.zeusOnBack
      if (typeof window.zeusOnBack === 'function') { window.zeusOnBack(); return; }
      if (document.referrer && window.history.length > 1) window.history.back();
      else window.location.href = '/';
    });

    /* ---------- Cleanup (for SPA mounts) ---------- */
    window.zeusCleanup = function () {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(blinkTimer);
    };
  })();

    return () => { if (typeof window.zeusCleanup === 'function') { window.zeusCleanup(); } };
  }, []);

  return null;
}
