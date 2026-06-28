'use client';

// Page-specific behaviour for /low-reply-rates.
// Drives the count-up animation on the metrics band: each number animates
// from 0 to its target the first time the band scrolls into view. Markup
// contract on each .lrr-metric-num:
//   data-to="3.43"        target value
//   data-decimals="2"     decimal places to render
//   data-suffix="%"       text appended after the number (e.g. "%", "%+")
//   data-prefix=""        text prepended before the number (optional)

import { useEffect } from 'react';

export default function LowReplyRatesScripts() {
  useEffect(() => {
    const grid = document.querySelector('.lrr-metrics-grid');
    if (!grid) return;

    const nums = Array.prototype.slice.call(grid.querySelectorAll('.lrr-metric-num'));
    if (!nums.length) return;

    const format = (el, val) => {
      const dec = parseInt(el.getAttribute('data-decimals'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      return prefix + val.toFixed(dec) + suffix;
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No animation: leave the server-rendered final values untouched.
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    // Start every number at 0 so the count-up reads cleanly when scrolled in.
    nums.forEach((el) => { el.textContent = format(el, 0); });

    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    function countUp(el) {
      const to = parseFloat(el.getAttribute('data-to')) || 0;
      const duration = 1600;
      let start = 0;
      function frame(now) {
        if (!start) start = now;
        const raw = Math.min(1, (now - start) / duration);
        el.textContent = format(el, to * easeOutCubic(raw));
        if (raw < 1) requestAnimationFrame(frame);
        else el.textContent = format(el, to);
      }
      requestAnimationFrame(frame);
    }

    let fired = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          nums.forEach(countUp); // all four count together
          obs.disconnect();
        }
      });
    }, { threshold: 0.35 });

    obs.observe(grid);

    return () => obs.disconnect();
  }, []);

  return null;
}
