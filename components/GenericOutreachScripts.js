'use client';

// Page-specific behaviour for /generic-outreach.
// Drives the count-up animation on the metrics band: each number animates
// from 0 to its target the first time the band scrolls into view. Markup
// contract on each .go-metric-num:
//   data-to="71"          target value (omit to leave the figure static, e.g. "5–10×")
//   data-decimals="0"     decimal places to render
//   data-suffix="%"       text appended after the number (e.g. "%", "×")
//   data-prefix=""        text prepended before the number (optional)

import { useEffect } from 'react';

export default function GenericOutreachScripts() {
  useEffect(() => {
    const grid = document.querySelector('.go-metrics-grid');
    if (!grid) return;

    // Only animate figures that declare a target; static ranges keep their markup.
    const nums = Array.prototype.slice.call(grid.querySelectorAll('.go-metric-num[data-to]'));
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

    // Start every animated number at 0 so the count-up reads cleanly.
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
          nums.forEach(countUp); // all figures count together
          obs.disconnect();
        }
      });
    }, { threshold: 0.35 });

    obs.observe(grid);

    return () => obs.disconnect();
  }, []);

  return null;
}
