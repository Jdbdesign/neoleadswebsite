'use client';

// Page-specific behaviour for /emails-landing-in-spam.
// Drives count-up animations on two bands the first time each scrolls into view:
//   1. the hero comparison stats (.els-compare-grid .els-stat-num)
//   2. the data band metrics      (.els-metrics-grid  .els-metric-num)
// Markup contract on each animated number:
//   data-to="61"          target value
//   data-decimals="0"     decimal places to render (optional, default 0)
//   data-suffix="%"       text appended after the number (optional)
//   data-prefix=""        text prepended before the number (optional)

import { useEffect } from 'react';

export default function EmailsSpamScripts() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    const format = (el, val) => {
      const dec = parseInt(el.getAttribute('data-decimals'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      return prefix + val.toFixed(dec) + suffix;
    };

    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    function countUp(el) {
      const to = parseFloat(el.getAttribute('data-to')) || 0;
      const duration = 1500;
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

    // Wire one band: count up all [data-to] numbers together once it scrolls in.
    function wireBand(gridSelector, numSelector) {
      const grid = document.querySelector(gridSelector);
      if (!grid) return null;
      const nums = Array.prototype.slice.call(grid.querySelectorAll(numSelector));
      if (!nums.length) return null;

      // Start at 0 so the count-up reads cleanly when scrolled in.
      nums.forEach((el) => { el.textContent = format(el, 0); });

      let fired = false;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            nums.forEach(countUp);
            obs.disconnect();
          }
        });
      }, { threshold: 0.3 });
      obs.observe(grid);
      return obs;
    }

    const observers = [
      wireBand('.els-compare-grid', '.els-stat-num[data-to]'),
      wireBand('.els-metrics-grid', '.els-metric-num[data-to]'),
    ].filter(Boolean);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
