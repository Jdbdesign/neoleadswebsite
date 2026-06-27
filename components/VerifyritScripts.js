'use client';

// Verifyrit page bespoke animation IIFEs, ported VERBATIM from the original
// site's inline <script>. The converted JSX preserves every class, id, and
// data-* attribute, so this imperative DOM code runs unchanged after React
// hydrates. The lucide createIcons call, the mobile-menu IIFE, the products
// mega-menu IIFE, and the shared scroll-reveal engine are intentionally omitted
// (icons via lucide-react, menus via Navbar, reveal via ClientScripts).

import { useEffect } from 'react';

export default function VerifyritScripts() {
  useEffect(() => {
/* Syntax card: invalid -> corrected -> valid loop */
(function () {
  var arrow = document.getElementById('synArrow');
  var valid = document.getElementById('synValid');
  if (!arrow || !valid) return;
  function cycle() {
    arrow.classList.remove('show');
    valid.style.opacity = '0';
    setTimeout(function () { arrow.classList.add('show'); }, 1600);
    setTimeout(function () { valid.style.opacity = '1'; }, 2600);
    setTimeout(cycle, 5600);
  }
  cycle();
})();

/* Domain & MX Record Validation — live DNS diagnostic */
(function () {
  var panel = document.getElementById('domPanel');
  if (!panel) return;

  /* ---- data-driven cycles ---- */
  var CYCLES = [
    { domain: 'vertex.io',    mxResult: '2 records found', mxHosts: 'mail.vertex.io · alt.vertex.io',                 mailResult: 'Accepting mail', mxLatency: 847, mailLatency: 312 },
    { domain: 'crestline.co', mxResult: '3 records found', mxHosts: 'mx1.crestline.co · mx2.crestline.co · mx3.crestline.co', mailResult: 'Accepting mail', mxLatency: 623, mailLatency: 288 },
    { domain: 'stackr.dev',   mxResult: '1 record found',  mxHosts: 'aspmx.stackr.dev',                                mailResult: 'Accepting mail', mxLatency: 419, mailLatency: 194 }
  ];

  var CHECK_SVG = '<svg class="dom-rescheck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>';

  var els = {
    topRow:    document.getElementById('domTopRow'),
    globe:     document.getElementById('domGlobe'),
    globePulse:document.getElementById('domGlobePulse'),
    name:      document.getElementById('domName'),
    sub:       document.getElementById('domSub'),
    badge:     document.getElementById('domLive'),
    divider:   document.getElementById('domDivider'),
    row1:      document.getElementById('domRow1'),
    row2:      document.getElementById('domRow2'),
    row3:      document.getElementById('domRow3'),
    res1:      document.getElementById('domRes1'),
    res2:      document.getElementById('domRes2'),
    res3:      document.getElementById('domRes3'),
    mx:        document.getElementById('domMx')
  };

  /* ---- run-token cancellation + timer tracking ---- */
  var run = 0;
  var timers = [];        // pending sleep timeouts
  var latTimers = [];     // latency-counter intervals
  var liveTimer = null;   // "last checked" interval
  var STOP = {};

  function guard(token) { if (token !== run) throw STOP; }
  function sleep(ms, token) {
    return new Promise(function (res, rej) {
      var id = setTimeout(function () {
        timers.splice(timers.indexOf(id), 1);
        if (token !== run) { rej(STOP); return; }
        res();
      }, ms);
      timers.push(id);
    });
  }
  function clearTimers() {
    timers.forEach(clearTimeout); timers = [];
    latTimers.forEach(clearInterval); latTimers = [];
    if (liveTimer) { clearInterval(liveTimer); liveTimer = null; }
  }
  function globeEl() { return els.globe.querySelector('.lucide'); }
  function globeSpeed(dur) { var g = globeEl(); if (g) g.style.animationDuration = dur; }
  function restart(node, cls) { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); }
  function globePulse(color) {
    var p = els.globePulse;
    p.classList.remove('pulse-purple', 'pulse-green'); void p.offsetWidth;
    p.classList.add(color === 'green' ? 'pulse-green' : 'pulse-purple');
  }

  /* ---- text utilities ---- */
  async function type(el, text, per, jitter, token) {
    el.textContent = '';
    for (var i = 0; i < text.length; i++) {
      guard(token);
      el.textContent += text.charAt(i);
      await sleep(per + (jitter ? (Math.random() * 2 - 1) * jitter : 0), token);
    }
  }
  async function untype(el, per, token) {
    while (el.textContent.length) {
      guard(token);
      el.textContent = el.textContent.slice(0, -1);
      await sleep(per, token);
    }
  }

  /* ---- query / resolve mechanics ---- */
  function startQuerying(resEl, rowEl, targetLatency) {
    resEl.classList.remove('ok');
    resEl.innerHTML = '<span class="dom-querying"><span class="dom-dots"><i></i><i></i><i></i></span>' +
      (targetLatency != null ? '<span class="dom-latency">0ms</span>' : '') + '</span>';
    var pk = document.createElement('span');
    pk.className = 'dom-packets'; pk.innerHTML = '<i></i><i></i>';
    rowEl.appendChild(pk);
    if (targetLatency != null) {
      var latEl = resEl.querySelector('.dom-latency');
      var start = Date.now();
      var iv = setInterval(function () {
        var e = Math.round(Date.now() - start);
        if (e >= targetLatency) { e = targetLatency; clearInterval(iv); }
        if (latEl) latEl.textContent = e + 'ms';
      }, 10);
      latTimers.push(iv);
    }
  }
  async function resolve(resEl, rowEl, text, token) {
    var pk = rowEl.querySelector('.dom-packets'); if (pk) pk.parentNode.removeChild(pk);
    restart(rowEl, 'flash');
    resEl.classList.add('ok');
    resEl.innerHTML = CHECK_SVG + '<span class="dom-restext"></span>';
    var svg = resEl.querySelector('.dom-rescheck');
    var txt = resEl.querySelector('.dom-restext');
    await sleep(80, token); guard(token);
    svg.classList.add('drawn');
    await type(txt, text, 22, 0, token);
  }
  function startLiveCounter(token) {
    if (liveTimer) clearInterval(liveTimer);
    var start = Date.now();
    function fmt() {
      var s = Math.floor((Date.now() - start) / 1000);
      if (s < 60) return s + ' sec ago';
      return Math.floor(s / 60) + ' min ago';
    }
    els.res3.textContent = '0 sec ago';
    liveTimer = setInterval(function () {
      if (token !== run) { clearInterval(liveTimer); return; }
      els.res3.textContent = fmt();
    }, 1000);
  }

  /* ---- reset to blank pre-diagnostic state ---- */
  function resetVisual() {
    clearTimers();
    els.topRow.classList.remove('in');
    els.globe.classList.remove('in');
    els.name.textContent = ''; els.name.classList.remove('in');
    els.sub.classList.remove('in');
    els.badge.classList.remove('in', 'live', 'draw', 'boost', 'out');
    els.divider.classList.remove('draw'); els.divider.style.transformOrigin = 'left center';
    [els.row1, els.row2, els.row3].forEach(function (r) {
      r.classList.remove('in', 'done', 'flash');
      var pk = r.querySelector('.dom-packets'); if (pk) pk.parentNode.removeChild(pk);
    });
    els.res1.innerHTML = ''; els.res1.classList.remove('ok');
    els.res2.innerHTML = ''; els.res2.classList.remove('ok');
    els.res3.style.opacity = ''; els.res3.style.transition = ''; els.res3.textContent = '';
    els.mx.textContent = ''; els.mx.classList.remove('in');
    globeSpeed('12s');
  }

  /* ---- one full diagnostic cycle ---- */
  async function cycle(c, token) {
    /* Phase 3 — domain identity loads */
    els.topRow.classList.add('in');
    els.globe.classList.add('in');
    globePulse('purple');
    await sleep(200, token);
    els.name.classList.add('in');
    await type(els.name, c.domain, 45, 6, token);
    els.sub.classList.add('in');
    els.divider.style.transformOrigin = 'left center';
    els.divider.classList.add('draw');
    await sleep(380, token);

    /* Phase 4 — LIVE badge activates */
    els.badge.classList.add('in', 'draw');
    await sleep(300, token);
    els.badge.classList.add('live');

    /* Phase 5 — DNS queries fire (pending state) */
    startQuerying(els.res1, els.row1, c.mxLatency);
    els.row1.classList.add('in');
    await sleep(100, token);
    startQuerying(els.res2, els.row2, c.mailLatency);
    els.row2.classList.add('in');
    await sleep(100, token);
    els.row3.classList.add('in');

    /* Phase 6 — results resolve with irregular timing */
    await sleep(900, token);
    await resolve(els.res1, els.row1, c.mxResult, token);
    els.row1.classList.add('done');
    await sleep(350, token); guard(token);
    els.mx.textContent = c.mxHosts;
    els.mx.classList.add('in');

    await sleep(250, token);
    await resolve(els.res2, els.row2, c.mailResult, token);
    els.row2.classList.add('done');

    await sleep(500, token); guard(token);
    startLiveCounter(token);
    els.row3.classList.add('done');

    /* Phase 7 — verification complete */
    restart(panel, 'complete');
    globePulse('green');
    restart(els.badge, 'boost');

    /* Phase 8 — live idle state */
    await sleep(3000, token);

    /* Phase 9 — domain swap transition */
    if (liveTimer) { clearInterval(liveTimer); liveTimer = null; }
    els.res3.style.transition = 'opacity 0.2s ease'; els.res3.style.opacity = '0';
    els.row3.classList.remove('in', 'done');
    await sleep(60, token);
    els.row2.classList.remove('in', 'done');
    await sleep(60, token);
    els.row1.classList.remove('in', 'done');
    els.mx.classList.remove('in');
    els.divider.style.transformOrigin = 'right center';
    els.divider.classList.remove('draw');
    els.badge.classList.remove('live', 'in', 'draw'); els.badge.classList.add('out');
    els.sub.classList.remove('in');
    globeSpeed('2s');
    await untype(els.name, 25, token);
    await sleep(400, token); guard(token);

    /* clean residue for the next run */
    els.res1.innerHTML = ''; els.res1.classList.remove('ok');
    els.res2.innerHTML = ''; els.res2.classList.remove('ok');
    els.res3.style.opacity = ''; els.res3.style.transition = ''; els.res3.textContent = '';
    els.row1.classList.remove('flash'); els.row2.classList.remove('flash');
    els.badge.classList.remove('out', 'boost');
    els.name.classList.remove('in');
    globeSpeed('12s');
    await sleep(60, token);
  }

  async function loop(token) {
    try {
      var i = 0;
      while (token === run) {
        await cycle(CYCLES[i % CYCLES.length], token);
        i++;
      }
    } catch (e) { if (e !== STOP) throw e; }
  }

  function start() { run++; var token = run; resetVisual(); loop(token); }
  function stop()  { run++; resetVisual(); }

  /* reduced motion: show a complete static diagnostic, no animation */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    panel.classList.remove('dom-diag-on');
    var c = CYCLES[0];
    els.name.textContent = c.domain;
    els.divider.style.transform = 'scaleX(1)';
    els.res1.className = 'dom-check-val ok';
    els.res1.innerHTML = CHECK_SVG.replace('dom-rescheck', 'dom-rescheck drawn') + '<span class="dom-restext">' + c.mxResult + '</span>';
    els.mx.textContent = c.mxHosts; els.mx.classList.add('in');
    els.res2.className = 'dom-check-val ok';
    els.res2.innerHTML = CHECK_SVG.replace('dom-rescheck', 'dom-rescheck drawn') + '<span class="dom-restext">' + c.mailResult + '</span>';
    els.res3.textContent = '32 sec ago';
    return;
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
    }, { threshold: 0.3 });
    io.observe(panel);
  } else { start(); }
})();

/* Rep bars: animate on scroll */
(function () {
  var card = document.getElementById('repCard');
  if (!card) return;
  var fills = card.querySelectorAll('.rep-bar-fill[data-w]');
  var done = false;
  function go() {
    if (done) return;
    done = true;
    fills.forEach(function (f, i) {
      setTimeout(function () { f.style.width = f.getAttribute('data-w') + '%'; }, i * 120);
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { go(); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(card);
  } else { go(); }
})();

/* Spam Trap & Risk Detection — live threat detection & interception */
(function () {
  var panel = document.getElementById('spamPanel');
  if (!panel) return;

  /* ---- data-driven threat cycles ---- */
  var CYCLES = [
    {
      id: 'A', email: 'noreply@spamtrap.net', title: 'Spam Trap Detected',
      tags: ['Known spam trap', 'Role-based address', 'Honeypot match'],
      severity: 'max', rgb: '185,28,28', alpha: 0.20,
      borderColor: 'rgba(239,68,68,0.5)', titleColor: '#F97316',
      tagBg: 'rgba(239,68,68,0.10)', tagBorder: 'rgba(239,68,68,0.55)', tagColor: '#FCA5A5'
    },
    {
      id: 'B', email: 'contact@blacklisted-domain.com', title: 'Blacklisted Domain',
      tags: ['Domain blacklisted', 'Abuse reported', 'MX flagged'],
      severity: 'high', rgb: '220,38,38', alpha: 0.18,
      borderColor: 'rgba(220,38,38,0.5)', titleColor: '#EF4444',
      tagBg: 'rgba(220,38,38,0.10)', tagBorder: 'rgba(220,38,38,0.55)', tagColor: '#FCA5A5'
    },
    {
      id: 'C', email: 'admin@info-generic.io', title: 'Role-Based Address',
      tags: ['Generic role inbox', 'Low deliverability', 'No personal owner'],
      severity: 'medium', rgb: '245,158,11', alpha: 0.15,
      borderColor: 'rgba(245,158,11,0.5)', titleColor: '#F59E0B',
      tagBg: 'rgba(245,158,11,0.10)', tagBorder: 'rgba(245,158,11,0.5)', tagColor: '#FCD34D'
    }
  ];

  function gid(id) { return document.getElementById(id); }
  var els = {
    alert: gid('spamAlert'), ring: gid('spamRing'), icons: gid('spamIcons'),
    title: gid('spamTitle'), emailWrap: gid('spamEmailWrap'), email: gid('spamEmail'),
    scan: gid('spamScan'), tags: gid('spamTags'), protected: gid('spamProtected'),
    shield: gid('spamShield'), ptxt: gid('spamProtectedTxt'), clearSweep: gid('spamClearSweep')
  };
  els.shieldPulse = els.shield.querySelector('.spam-shield-pulse');

  /* ---- run-token cancellation + timer tracking ---- */
  var run = 0, timers = [], STOP = {};
  var alertState = { rgb: '185,28,28', alpha: 0.20, flood: 0, cx: 50 };
  var greenFlood = 0, idleActive = false;

  function guard(token) { if (token !== run) throw STOP; }
  function sleep(ms, token) {
    return new Promise(function (res, rej) {
      var id = setTimeout(function () {
        timers.splice(timers.indexOf(id), 1);
        if (token !== run) { rej(STOP); return; }
        res();
      }, ms);
      timers.push(id);
    });
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function restart(node, cls) { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); }
  function now() { return (window.performance && performance.now) ? performance.now() : Date.now(); }

  /* ---- radial flood (alert background) via rAF-driven custom value ---- */
  function paintAlert() {
    var a = alertState;
    var inner = 'rgba(' + a.rgb + ',' + (a.alpha * a.flood).toFixed(3) + ')';
    var outer = 'rgba(' + a.rgb + ',0)';
    els.alert.style.background = 'radial-gradient(ellipse at ' + a.cx.toFixed(2) + '% 50%, ' + inner + ', ' + outer + ' 72%), rgba(30,20,40,1)';
  }
  function animateFlood(to, dur, token) {
    return new Promise(function (resolve) {
      var from = alertState.flood, t0 = now();
      (function frame(t) {
        if (token !== run) { resolve(); return; }
        var p = Math.min(1, (t - t0) / dur);
        alertState.flood = from + (to - from) * p;
        paintAlert();
        if (p < 1) requestAnimationFrame(frame); else resolve();
      })(t0);
    });
  }
  function animateGreenFlood(to, dur, token) {
    return new Promise(function (resolve) {
      var from = greenFlood, t0 = now();
      (function frame(t) {
        if (token !== run) { resolve(); return; }
        var p = Math.min(1, (t - t0) / dur);
        greenFlood = from + (to - from) * p;
        els.protected.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,' + (0.08 * greenFlood).toFixed(3) + '), rgba(34,197,94,0) 72%), rgba(34,197,94,0)';
        if (p < 1) requestAnimationFrame(frame); else resolve();
      })(t0);
    });
  }
  function startDrift(token) {
    idleActive = true;
    var t0 = now();
    (function frame(t) {
      if (token !== run || !idleActive) return;
      alertState.cx = 50 + Math.sin((t - t0) / 3000 * Math.PI * 2) * 1.2;
      paintAlert();
      requestAnimationFrame(frame);
    })(t0);
  }

  /* ---- text utilities ---- */
  async function typeText(el, text, per, jitter, token) {
    for (var i = 0; i < text.length; i++) {
      guard(token);
      el.textContent += text.charAt(i);
      await sleep(per + (jitter ? (Math.random() * 2 - 1) * jitter : 0), token);
    }
  }
  async function typeEmail(c, token) {
    var at = c.email.indexOf('@');
    var local = c.email.slice(0, at), domain = c.email.slice(at);
    var lEl = document.createElement('span'); lEl.className = 'spam-email-local';
    var dEl = document.createElement('span'); dEl.className = 'spam-email-domain';
    els.email.appendChild(lEl); els.email.appendChild(dEl);
    for (var i = 0; i < local.length; i++) { guard(token); lEl.textContent += local.charAt(i); await sleep(38 + (Math.random() * 2 - 1) * 8, token); }
    for (var j = 0; j < domain.length; j++) { guard(token); dEl.textContent += domain.charAt(j); await sleep(50 + (Math.random() * 2 - 1) * 8, token); }
    return dEl;
  }
  async function untypeEmail(token) {
    var dEl = els.email.querySelector('.spam-email-domain');
    var lEl = els.email.querySelector('.spam-email-local');
    while (dEl && dEl.textContent.length) { guard(token); dEl.textContent = dEl.textContent.slice(0, -1); await sleep(22, token); }
    while (lEl && lEl.textContent.length) { guard(token); lEl.textContent = lEl.textContent.slice(0, -1); await sleep(22, token); }
  }
  async function typeProtected(token) {
    var s1 = document.createElement('span'); els.ptxt.appendChild(s1);
    await typeText(s1, 'Domain reputation protected · ', 22, 0, token);
    var sb = document.createElement('span'); sb.className = 'spam-bold'; els.ptxt.appendChild(sb);
    await typeText(sb, 'blocked', 22, 0, token);
    restart(sb, 'emph');
    var s2 = document.createElement('span'); els.ptxt.appendChild(s2);
    await typeText(s2, ' before send', 22, 0, token);
  }

  /* ---- tag construction (data-driven, SVG perimeter border + shockwave) ---- */
  function buildTag(label, idx, c) {
    var tag = document.createElement('span');
    tag.className = 'spam-tag';
    tag.style.setProperty('--tag-bg', c.tagBg);
    tag.style.setProperty('--tag-color', c.tagColor);
    tag.style.setProperty('--tag-border', c.tagBorder);
    var ring = document.createElement('span'); ring.className = 'spam-tag-ring';
    var lbl = document.createElement('span'); lbl.className = 'spam-tag-label'; lbl.textContent = label;
    tag.appendChild(ring); tag.appendChild(lbl);
    return { tag: tag, ring: ring };
  }
  function drawTagBorder(tag, clockwise) {
    var w = tag.offsetWidth, h = tag.offsetHeight;
    if (!w || !h) return;
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'spam-tag-border');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', '0.5'); rect.setAttribute('y', '0.5');
    rect.setAttribute('width', (w - 1)); rect.setAttribute('height', (h - 1));
    rect.setAttribute('rx', '4.5');
    var per = 2 * ((w - 1) + (h - 1));
    rect.style.strokeDasharray = per;
    rect.style.strokeDashoffset = (clockwise ? per : -per);
    svg.appendChild(rect);
    tag.insertBefore(svg, tag.firstChild);
    void rect.getBoundingClientRect();
    rect.style.transition = 'stroke-dashoffset 0.34s ease-out';
    rect.style.strokeDashoffset = '0';
  }
  function emitSparks() {
    for (var i = 0; i < 5; i++) {
      var s = document.createElement('span'); s.className = 'spam-spark';
      var ang = (Math.PI * 2) * (i / 5) + Math.random();
      var dist = 8 + Math.random() * 4;
      s.style.setProperty('--sx', (Math.cos(ang) * dist).toFixed(1) + 'px');
      s.style.setProperty('--sy', (Math.sin(ang) * dist).toFixed(1) + 'px');
      s.style.left = (40 + Math.random() * 50) + '%';
      s.style.top = '50%';
      els.tags.appendChild(s);
      (function (sp) {
        void sp.offsetWidth; sp.classList.add('go');
        var id = setTimeout(function () { timers.splice(timers.indexOf(id), 1); if (sp.parentNode) sp.parentNode.removeChild(sp); }, 450);
        timers.push(id);
      })(s);
    }
  }

  /* ---- reset to blank pre-detection state ---- */
  function resetVisual() {
    clearTimers();
    idleActive = false;
    alertState.flood = 0; alertState.cx = 50;
    els.alert.classList.remove('in', 'maxflash');
    els.alert.style.background = 'rgba(30,20,40,1)';
    els.alert.style.borderColor = 'rgba(120,90,140,0.20)';
    els.ring.classList.remove('ping');
    els.icons.classList.remove('in', 'out');
    els.title.textContent = ''; els.title.classList.remove('out');
    els.email.innerHTML = ''; els.email.classList.remove('flagged');
    els.scan.style.transition = 'none'; els.scan.style.transform = 'translateX(0)'; els.scan.style.opacity = '0';
    els.tags.innerHTML = ''; els.tags.classList.remove('idle', 'triplepulse');
    els.protected.classList.remove('in', 'out');
    els.protected.style.background = 'rgba(34,197,94,0)'; greenFlood = 0;
    els.shield.classList.remove('in', 'breathe');
    els.shieldPulse.classList.remove('go');
    els.ptxt.innerHTML = '';
    els.clearSweep.classList.remove('go');
  }

  /* ---- one full detection + interception cycle (~9s) ---- */
  async function cycle(c, token) {
    els.alert.style.setProperty('--spam-bd', c.borderColor);
    els.title.style.color = c.titleColor;

    /* Phase 3 — alert box appears in neutral state, address types in unscreened */
    els.alert.classList.add('in');
    await sleep(320, token);
    var dEl = await typeEmail(c, token);
    await sleep(220, token);

    /* Phase 4 — system scan beam sweeps, slows on the domain, trips the trap */
    var localW = els.email.querySelector('.spam-email-local').offsetWidth;
    var totalW = els.email.offsetWidth;
    els.scan.style.transition = 'none';
    els.scan.style.transform = 'translateX(0)';
    void els.scan.offsetWidth;
    els.scan.style.opacity = '1';
    els.scan.style.transition = 'transform 0.38s ease-in-out';
    els.scan.style.transform = 'translateX(' + localW + 'px)';
    await sleep(380, token);
    dEl.classList.add('uline');
    restart(els.ring, 'ping');
    await sleep(200, token);
    els.scan.style.transition = 'transform 0.32s ease-in-out';
    els.scan.style.transform = 'translateX(' + totalW + 'px)';
    await sleep(320, token);
    els.scan.style.opacity = '0';

    /* Phase 5 — threat confirmed: flood, border, icons, title, flag the address */
    alertState.rgb = c.rgb; alertState.alpha = c.alpha;
    els.alert.style.borderColor = c.borderColor;
    els.icons.classList.add('in');
    els.email.classList.add('flagged');
    await Promise.all([
      animateFlood(1, 600, token),
      typeText(els.title, c.title, 20, 0, token)
    ]);

    /* Phase 6 — risk tags surface one by one as evidence */
    await sleep(200, token);
    for (var i = 0; i < 3; i++) {
      var built = buildTag(c.tags[i], i, c);
      els.tags.appendChild(built.tag);
      drawTagBorder(built.tag, i !== 1);   /* tag1 cw, tag2 ccw, tag3 cw */
      await sleep(60, token);
      built.tag.classList.add('land');
      restart(built.ring, 'go');
      if (i < 2) await sleep(340, token);
    }
    await sleep(120, token);
    restart(els.tags, 'triplepulse');
    restart(els.alert, 'maxflash');
    emitSparks();
    await sleep(220, token);
    els.tags.classList.remove('triplepulse');

    /* Phase 7 — shield interception drops in */
    await sleep(180, token);
    els.protected.classList.add('in');
    els.shield.classList.add('in');
    restart(els.shieldPulse, 'go');
    var gp = animateGreenFlood(1, 500, token);
    await sleep(220, token);
    await typeProtected(token);
    await gp;
    restart(els.clearSweep, 'go');
    await sleep(400, token);

    /* Phase 8 — idle hold: re-examination pulses, heat shimmer, shield breathe */
    els.tags.classList.add('idle');
    els.shield.classList.add('breathe');
    dEl.classList.add('pulse');
    startDrift(token);
    await sleep(2000, token);

    /* Phase 9 — loop reset: clear evidence in reverse, de-flood, untype */
    idleActive = false;
    els.tags.classList.remove('idle');
    els.shield.classList.remove('breathe');
    dEl.classList.remove('pulse');
    els.protected.classList.remove('in'); els.protected.classList.add('out');
    els.shield.classList.remove('in');
    var tagEls = els.tags.querySelectorAll('.spam-tag');
    for (var k = tagEls.length - 1; k >= 0; k--) {
      tagEls[k].classList.remove('land'); tagEls[k].classList.add('out');
      await sleep(60, token);
    }
    els.title.classList.add('out');
    var df = animateFlood(0, 400, token);
    await untypeEmail(token);
    await df;
    els.icons.classList.remove('in'); els.icons.classList.add('out');
    await sleep(220, token);

    /* clean residue for the next threat (alert box stays present) */
    els.alert.classList.remove('maxflash');
    els.alert.style.background = 'rgba(30,20,40,1)';
    els.alert.style.borderColor = 'rgba(120,90,140,0.20)';
    els.email.classList.remove('flagged'); els.email.innerHTML = '';
    els.title.classList.remove('out'); els.title.textContent = '';
    els.tags.innerHTML = '';
    els.protected.classList.remove('out'); els.protected.style.background = 'rgba(34,197,94,0)'; greenFlood = 0;
    els.shieldPulse.classList.remove('go');
    els.ptxt.innerHTML = '';
    els.clearSweep.classList.remove('go');
    els.icons.classList.remove('out');
    await sleep(300, token);
  }

  async function loop(token) {
    try {
      var i = 0;
      while (token === run) { await cycle(CYCLES[i % CYCLES.length], token); i++; }
    } catch (e) { if (e !== STOP) throw e; }
  }
  function start() { run++; var token = run; resetVisual(); loop(token); }
  function stop() { run++; resetVisual(); }

  /* reduced motion: render a complete static detected state, no animation */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    panel.classList.remove('spam-anim-on');
    var c = CYCLES[0];
    alertState.rgb = c.rgb; alertState.alpha = c.alpha; alertState.flood = 1; paintAlert();
    els.alert.style.borderColor = c.borderColor; els.alert.style.setProperty('--spam-bd', c.borderColor);
    els.icons.classList.add('in');
    els.title.style.color = c.titleColor; els.title.textContent = c.title;
    var at = c.email.indexOf('@');
    var lEl = document.createElement('span'); lEl.className = 'spam-email-local'; lEl.textContent = c.email.slice(0, at);
    var dEl2 = document.createElement('span'); dEl2.className = 'spam-email-domain uline'; dEl2.textContent = c.email.slice(at);
    els.email.appendChild(lEl); els.email.appendChild(dEl2); els.email.classList.add('flagged');
    for (var t = 0; t < 3; t++) { var b = buildTag(c.tags[t], t, c); els.tags.appendChild(b.tag); b.tag.classList.add('land'); }
    els.protected.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.08), rgba(34,197,94,0) 72%), rgba(34,197,94,0)';
    els.shield.classList.add('in');
    els.ptxt.innerHTML = 'Domain reputation protected · <span class="spam-bold">blocked</span> before send';
    return;
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
    }, { threshold: 0.3 });
    io.observe(panel);
  } else { start(); }
})();

/* Catch-All Resolution — competitive contrast storytelling ("they stop here, we don't") */
(function () {
  var panel = document.getElementById('catchPanel');
  if (!panel) return;

  /* ---- data-driven cycles (Cycle C's amber treatment is entirely config) ---- */
  var CYCLES = [
    { email: 'sarah@techcorp.io',    score: 84, statusText: 'Deliverable',
      statusColor: '#22C55E', rgb: '34,197,94',  scoreRGB: [124,58,237], glowRGB: '124,58,237',
      border: 'rgba(34,197,94,0.3)',  amber: false, deliverIcon: 'check' },
    { email: 'm.chen@growthlab.co',  score: 91, statusText: 'Deliverable',
      statusColor: '#22C55E', rgb: '34,197,94',  scoreRGB: [124,58,237], glowRGB: '124,58,237',
      border: 'rgba(34,197,94,0.3)',  amber: false, deliverIcon: 'check' },
    { email: 'hello@ventures.dev',   score: 67, statusText: 'Risky — send with caution',
      statusColor: '#F59E0B', rgb: '245,158,11', scoreRGB: [245,158,11], glowRGB: '245,158,11',
      border: 'rgba(245,158,11,0.3)', amber: true,  deliverIcon: 'warn' }
  ];

  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  var ICON_WARN  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';

  function gid(id) { return document.getElementById(id); }
  var els = {
    stop: gid('catchStop'), stopLbl: gid('catchStopLbl'), stopEmail: gid('catchStopEmail'),
    dots: gid('catchDots'), status: gid('catchStatus'), bar: gid('catchBar'), barFill: gid('catchBarFill'),
    arrow: gid('catchArrow'), resolve: gid('catchResolve'), scan: gid('catchScan'),
    resolveLbl: gid('catchResolveLbl'), resolveEmail: gid('catchResolveEmail'),
    probe: gid('catchProbe'), result: gid('catchResult'), ricon: gid('catchRicon'),
    rstatus: gid('catchRstatus'), rscore: gid('catchRscore'), rnum: gid('catchRnum')
  };

  /* ---- run-token cancellation + timer tracking (mirrors the other panels) ---- */
  var run = 0, timers = [], STOP = {}, floodVal = 0;
  function now() { return (window.performance && performance.now) ? performance.now() : Date.now(); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function sleep(ms, token) {
    return new Promise(function (res, rej) {
      var id = setTimeout(function () {
        timers.splice(timers.indexOf(id), 1);
        if (token !== run) { rej(STOP); return; }
        res();
      }, ms);
      timers.push(id);
    });
  }
  function schedule(fn, ms, token) {
    var id = setTimeout(function () {
      timers.splice(timers.indexOf(id), 1);
      if (token === run) fn();
    }, ms);
    timers.push(id);
  }
  function raf2() { return new Promise(function (r) { requestAnimationFrame(function () { requestAnimationFrame(r); }); }); }

  /* ---- self-contained typewriter utilities ---- */
  function typeIn(el, text, per, jitter, token) {
    return new Promise(function (res, rej) {
      el.textContent = ''; var i = 0;
      (function step() {
        if (token !== run) { rej(STOP); return; }
        if (i >= text.length) { res(); return; }
        el.textContent += text.charAt(i); i++;
        var d = per + (jitter ? (Math.random() * 2 * jitter - jitter) : 0);
        var id = setTimeout(function () { timers.splice(timers.indexOf(id), 1); step(); }, Math.max(8, d));
        timers.push(id);
      })();
    });
  }
  function deleteText(el, per, token) {
    return new Promise(function (res, rej) {
      (function step() {
        if (token !== run) { rej(STOP); return; }
        var t = el.textContent;
        if (t.length === 0) { res(); return; }
        el.textContent = t.slice(0, -1);
        var id = setTimeout(function () { timers.splice(timers.indexOf(id), 1); step(); }, per);
        timers.push(id);
      })();
    });
  }
  /* types a final word, then wraps its last character so the idle glitch can flicker it */
  function typeWordWrapLast(el, word, per, token) {
    return new Promise(function (res, rej) {
      var i = 0;
      (function step() {
        if (token !== run) { rej(STOP); return; }
        if (i >= word.length) {
          var txt = el.textContent;
          el.textContent = txt.slice(0, -1);
          var sp = document.createElement('span'); sp.id = 'catchUnknownLast'; sp.textContent = txt.slice(-1);
          el.appendChild(sp); res(); return;
        }
        el.textContent += word.charAt(i); i++;
        var id = setTimeout(function () { timers.splice(timers.indexOf(id), 1); step(); }, per);
        timers.push(id);
      })();
    });
  }
  /* shared probe sequence — types each string, holds, fades, advances */
  async function probeSequence(steps, el, token) {
    for (var i = 0; i < steps.length; i++) {
      el.style.opacity = '1';
      await typeIn(el, steps[i], 16, 0, token);
      await sleep(140, token);
      el.style.opacity = '0';
      await sleep(170, token);
    }
    el.textContent = ''; el.style.opacity = '1';
  }

  /* ---- score counter: rAF, easeOutCubic, white->target lerp, accel burst past 65% ---- */
  function countScore(numEl, target, endRGB, token) {
    return new Promise(function (res) {
      var t0 = now(), dur = 700, start = [255, 255, 255];
      (function frame() {
        if (token !== run) { res(); return; }
        var p = Math.min(1, (now() - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        if (p > 0.65 && p < 0.75) e = Math.min(1, e * 1.3); /* blow past where others stopped */
        var val = Math.round(target * e);
        var r = Math.round(start[0] + (endRGB[0] - start[0]) * p);
        var g = Math.round(start[1] + (endRGB[1] - start[1]) * p);
        var b = Math.round(start[2] + (endRGB[2] - start[2]) * p);
        numEl.textContent = val; numEl.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        if (p < 1) requestAnimationFrame(frame);
        else { numEl.textContent = target; numEl.style.color = 'rgb(' + endRGB[0] + ',' + endRGB[1] + ',' + endRGB[2] + ')'; res(); }
      })();
    });
  }

  /* ---- radial flood for the bottom box (green / amber), rAF-driven ---- */
  function animateFlood(rgb, to, dur, token) {
    return new Promise(function (res) {
      var from = floodVal, t0 = now();
      (function frame() {
        if (token !== run) { res(); return; }
        var p = Math.min(1, (now() - t0) / dur);
        floodVal = from + (to - from) * p;
        var a = (0.08 * floodVal).toFixed(3);
        els.resolve.style.background = 'radial-gradient(ellipse at center, rgba(' + rgb + ',' + a + '), rgba(' + rgb + ',0) 70%), rgba(255,255,255,0.03)';
        if (p < 1) requestAnimationFrame(frame); else res();
      })();
    });
  }

  function resetVisual() {
    els.stop.classList.remove('in', 'dim', 'flash');
    els.arrow.classList.remove('in', 'pop', 'bob');
    els.resolve.classList.remove('in', 'dn', 'pulse', 'amber');
    els.resolveEmail.classList.remove('in'); els.resolveEmail.textContent = '';
    els.dots.classList.remove('show', 'slow', 'freeze');
    els.bar.classList.remove('show'); els.barFill.style.transition = 'none'; els.barFill.style.width = '0';
    els.scan.classList.remove('go');
    els.result.classList.remove('show');
    els.rscore.classList.remove('show');
    els.ricon.classList.remove('draw'); els.ricon.innerHTML = '';
    els.rnum.classList.remove('snap', 'glow'); els.rnum.textContent = ''; els.rnum.style.color = '';
    els.rstatus.textContent = ''; els.rstatus.style.color = '';
    els.stopLbl.textContent = ''; els.stopLbl.classList.remove('defeated');
    els.resolveLbl.textContent = ''; els.resolveLbl.classList.remove('shimmer');
    els.stopEmail.textContent = '';
    els.status.textContent = ''; els.status.classList.remove('unknown');
    els.probe.textContent = ''; els.probe.style.opacity = '1';
    floodVal = 0; els.resolve.style.background = ''; els.resolve.style.borderColor = '';
  }

  /* ---- one full cycle (~10s): they stop here, we don't ---- */
  async function cycle(c, token) {
    /* PHASE 3 — the other tools' attempt begins */
    els.stop.classList.add('in');
    await sleep(380, token);
    els.stopLbl.textContent = 'Most Tools Stop Here';
    await typeIn(els.stopEmail, c.email, 38, 8, token);
    var cur = document.createElement('span'); cur.className = 'catch-cursor';
    els.stopEmail.appendChild(cur);
    schedule(function () { if (cur.parentNode) cur.parentNode.removeChild(cur); }, 1150, token);

    /* PHASE 4 — other tools try, stall, and give up */
    await sleep(150, token);
    els.dots.classList.add('show');
    await typeIn(els.status, 'Querying MX...', 25, 0, token);
    await sleep(700, token);
    await typeIn(els.status, 'Resolving domain...', 25, 0, token);
    await sleep(350, token);
    /* the stall */
    els.dots.classList.add('slow');
    await typeIn(els.status, 'Catch-All detected...', 35, 0, token);
    els.bar.classList.add('show');
    els.barFill.style.transition = 'width 0.6s ease-out';
    await raf2(); els.barFill.style.width = '65%';
    await sleep(650, token);
    /* frozen at 65% — one micro-pulse, a last gasp */
    els.barFill.style.transition = 'width 0.1s ease';
    els.barFill.style.width = '66%'; await sleep(110, token);
    els.barFill.style.width = '65%'; await sleep(150, token);
    /* the give-up */
    els.barFill.style.transition = 'width 0.3s ease';
    els.barFill.style.width = '72%'; await sleep(300, token);
    els.bar.classList.remove('show');
    els.dots.classList.add('freeze'); await sleep(200, token);
    els.dots.classList.remove('show'); await sleep(250, token);
    els.status.classList.add('unknown');
    await typeIn(els.status, 'Catch-All · ', 30, 0, token);
    await typeWordWrapLast(els.status, 'Unknown', 50, token);
    els.stop.classList.add('flash');
    schedule(function () { els.stop.classList.remove('flash'); }, 220, token);

    /* PHASE 5 — the handoff: Verifyrit takes over */
    await sleep(250, token);
    els.arrow.classList.add('in', 'pop');
    await sleep(360, token);
    els.arrow.classList.remove('pop'); els.arrow.classList.add('bob');
    await sleep(900, token);
    els.arrow.classList.remove('bob');

    /* PHASE 6 — bottom box rises with different energy */
    els.resolve.classList.toggle('amber', !!c.amber);
    els.resolve.style.background = 'radial-gradient(ellipse at center, rgba(' + c.rgb + ',0), rgba(' + c.rgb + ',0) 70%), rgba(255,255,255,0.03)';
    els.resolve.classList.add('in');
    animateFlood(c.rgb, 1, 600, token);
    els.resolve.style.borderColor = c.border;
    await sleep(150, token);
    await typeIn(els.resolveLbl, 'Verifyrit Resolves It', 18, 0, token);

    /* PHASE 7 — deep probe: Verifyrit does what others couldn't */
    els.resolveEmail.textContent = c.email;
    els.resolveEmail.classList.add('in');
    els.scan.classList.remove('go'); void els.scan.offsetWidth; els.scan.classList.add('go');
    await probeSequence(['Probing SMTP handshake...', 'Sampling inbox response...', 'Analyzing delivery patterns...'], els.probe, token);

    /* PHASE 8 — the score resolves: the payoff */
    els.probe.style.opacity = '0';
    els.result.classList.add('show');
    els.ricon.innerHTML = (c.deliverIcon === 'warn') ? ICON_WARN : ICON_CHECK;
    els.ricon.style.color = c.statusColor;
    await raf2(); els.ricon.classList.add('draw');
    await sleep(200, token);
    els.rstatus.style.color = c.statusColor;
    await typeIn(els.rstatus, c.statusText, 22, 0, token);
    await sleep(300, token); /* a beat */
    els.rscore.classList.add('show');
    els.rnum.style.setProperty('--glow-rgb', c.glowRGB);
    await countScore(els.rnum, c.score, c.scoreRGB, token);
    els.rnum.classList.add('snap');
    schedule(function () { els.rnum.classList.remove('snap'); }, 240, token);
    els.resolve.classList.add('pulse');
    schedule(function () { els.resolve.classList.remove('pulse'); }, 420, token);

    /* PHASE 9 — side-by-side contrast: the money shot */
    await sleep(200, token);
    els.stop.classList.add('dim');
    await animateFlood(c.rgb, 1.75, 300, token);
    await animateFlood(c.rgb, 1, 300, token);

    /* PHASE 10 — idle hold: the result stays alive, the failure stays defeated */
    els.rnum.classList.add('glow');
    els.stopLbl.classList.add('defeated');
    els.resolveLbl.classList.add('shimmer');
    schedule(function () {
      var sp = gid('catchUnknownLast');
      if (sp) { sp.style.opacity = '0'; schedule(function () { if (sp) sp.style.opacity = '1'; }, 80, token); }
    }, 750, token);
    await sleep(1400, token);
    els.rnum.classList.remove('glow');
    els.stopLbl.classList.remove('defeated');
    els.resolveLbl.classList.remove('shimmer');

    /* PHASE 11 — clean reset for the next email */
    els.result.classList.remove('show');
    els.rscore.classList.remove('show');
    animateFlood(c.rgb, 0, 400, token);
    els.arrow.classList.remove('in');
    els.resolve.classList.add('dn');
    els.status.textContent = '';
    await deleteText(els.stopEmail, 20, token);
    els.stopLbl.textContent = '';
    await sleep(320, token);
    resetVisual();
    await sleep(300, token);
  }

  async function loop(token) {
    try {
      var i = 0;
      while (token === run) { await cycle(CYCLES[i % CYCLES.length], token); i++; }
    } catch (e) { if (e !== STOP) throw e; }
  }
  function start() { run++; var token = run; clearTimers(); resetVisual(); loop(token); }
  function stop() { run++; clearTimers(); resetVisual(); }

  /* reduced motion: render a complete static state of cycle A — no animation */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    panel.classList.remove('catch-anim-on');
    var c = CYCLES[0];
    els.stopLbl.textContent = 'Most Tools Stop Here';
    els.stopEmail.textContent = c.email;
    els.status.classList.add('unknown'); els.status.textContent = 'Catch-All · Unknown';
    els.resolveLbl.textContent = 'Verifyrit Resolves It';
    els.resolveEmail.textContent = c.email;
    els.resolve.style.background = 'radial-gradient(ellipse at center, rgba(' + c.rgb + ',0.08), rgba(' + c.rgb + ',0) 70%), rgba(255,255,255,0.03)';
    els.resolve.style.borderColor = c.border;
    els.result.classList.add('show');
    els.ricon.innerHTML = ICON_CHECK; els.ricon.style.color = c.statusColor;
    els.rstatus.style.color = c.statusColor; els.rstatus.textContent = c.statusText;
    els.rscore.classList.add('show');
    els.rnum.textContent = c.score; els.rnum.style.color = 'rgb(' + c.scoreRGB.join(',') + ')';
    return;
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
    }, { threshold: 0.3 });
    io.observe(panel);
  } else { start(); }
})();
  }, []);

  return null;
}
