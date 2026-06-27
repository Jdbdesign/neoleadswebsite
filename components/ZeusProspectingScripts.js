'use client';

// Zeus Prospecting page bespoke animation IIFEs, ported VERBATIM from the
// original site's inline <script> tags. The converted JSX preserves every
// class, id, and data-* attribute, so this imperative DOM code runs unchanged
// after React hydrates. The lucide createIcons call, the mobile-menu IIFE, the
// products mega-menu IIFE, and the shared scroll-reveal engine are intentionally
// omitted (icons via lucide-react, menus via Navbar, reveal via ClientScripts).

import { useEffect } from 'react';

export default function ZeusProspectingScripts() {
  useEffect(() => {

/* ===== Zeus AI Search — live search demo animation ===== */
(function () {
  var panel = document.getElementById('aiSearchPanel');
  if (!panel) return;

  // ---- Content config — swap queries/tags/counts/results here only ----
  var CYCLES = [
    {
      query: 'Fintech founders hiring sales leaders',
      tags: [ { label: 'FOUNDER/CEO', active: true }, { label: 'FINTECH' }, { label: 'HIRING' } ],
      matches: 86,
      results: [
        { avatar: 'avatars/Container.png',   name: 'Tom Keller', role: 'CEO · Arc Pay',    score: 96 },
        { avatar: 'avatars/Container-2.png', name: 'Rhea Vance', role: 'Founder · Ledgr',  score: 93 }
      ]
    },
    {
      query: 'B2B SaaS VP of Sales Series B',
      tags: [ { label: 'VP SALES', active: true }, { label: 'SERIES B' }, { label: 'SAAS' } ],
      matches: 54,
      results: [
        { avatar: 'avatars/Container-3.png', name: 'Marcus Hill', role: 'VP Sales · Stackr',          score: 91 },
        { avatar: 'avatars/Container-4.png', name: 'Priya Nair',  role: 'Head of Revenue · Loopbase', score: 88 }
      ]
    }
  ];

  // ---- Element handles ----
  var searchBar = panel.querySelector('.ai-search');
  var asText    = panel.querySelector('.as-text');
  var asTyped   = panel.querySelector('.as-typed');
  var cursor    = panel.querySelector('.cursor');
  var btn       = panel.querySelector('.as-btn');
  var ripple    = panel.querySelector('.as-ripple');
  var svg       = panel.querySelector('.as-scan');
  var scanRect  = panel.querySelector('.as-scan-rect');
  var scanRest  = panel.querySelector('.as-scan-rest');
  var chipRow   = panel.querySelector('.ai-chip-row');
  var matchesEl = panel.querySelector('.matches');
  var results   = panel.querySelector('.ai-results');
  var scanline  = panel.querySelector('.ai-scanline');

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var perim = 300;

  // ---- Easing + color helpers ----
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function hx(h) { h = h.replace('#', ''); return [parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16)]; }
  function lerpHex(a, b, t) {
    var pa = hx(a), pb = hx(b);
    return 'rgb(' + Math.round(pa[0]+(pb[0]-pa[0])*t) + ',' + Math.round(pa[1]+(pb[1]-pa[1])*t) + ',' + Math.round(pa[2]+(pb[2]-pa[2])*t) + ')';
  }

  // ---- Cancellable run token + waiter ----
  var active = null;
  function newToken() { return { cancelled: false, timers: [], rejectWait: null }; }
  function cancel() {
    if (!active) return;
    active.cancelled = true;
    active.timers.forEach(clearTimeout);
    active.timers = [];
    if (active.rejectWait) { try { active.rejectWait(); } catch (e) {} }
    active = null;
  }
  function wait(token, ms) {
    return new Promise(function (resolve, reject) {
      if (token.cancelled) { reject(); return; }
      token.rejectWait = reject;
      var t = setTimeout(function () { resolve(); }, ms);
      token.timers.push(t);
    });
  }
  function frameLoop(token, dur, step) {
    return new Promise(function (resolve) {
      var start = performance.now();
      (function tick(now) {
        if (token.cancelled) { resolve(); return; }
        var t = dur > 0 ? Math.min(1, (now - start) / dur) : 1;
        step(t);
        if (t < 1) requestAnimationFrame(tick); else resolve();
      })(start);
    });
  }

  // ---- SVG border sizing (perimeter for dash animations) ----
  function sizeSvg() {
    var r = searchBar.getBoundingClientRect();
    var W = Math.round(r.width), H = Math.round(r.height);
    if (!W || !H) return;
    perim = 2 * ((W - 2) + (H - 2));
    [scanRect, scanRest].forEach(function (rect) {
      rect.setAttribute('x', 1); rect.setAttribute('y', 1);
      rect.setAttribute('width', W - 2); rect.setAttribute('height', H - 2);
      rect.setAttribute('rx', 11); rect.setAttribute('ry', 11);
    });
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    scanRect.style.strokeDasharray = perim + 'px';
    scanRect.style.strokeDashoffset = perim + 'px';
    scanRest.style.strokeDasharray = '7 ' + perim;
    searchBar.style.setProperty('--perim', perim);
    // scan line travels the full panel content height
    var ph = panel.clientHeight - 32;
    panel.style.setProperty('--scan-end', ph + 'px');
  }

  // ---- Typewriter (incremental, per-word flash) ----
  function typeIn(token, text) {
    return new Promise(function (resolve) {
      asTyped.innerHTML = '';
      var i = 0, currentWord = null;
      var last = performance.now(), acc = 0;
      var nextDelay = 32 + (Math.random() * 20 - 10);
      function flash(span) { if (!span) return; span.classList.add('flash'); setTimeout(function () { span.classList.remove('flash'); }, 160); }
      (function tick(now) {
        if (token.cancelled) { resolve(); return; }
        acc += now - last; last = now;
        while (acc >= nextDelay && i < text.length) {
          acc -= nextDelay;
          var ch = text[i];
          if (ch === ' ') {
            flash(currentWord); currentWord = null;
            asTyped.appendChild(document.createTextNode(' '));
          } else {
            if (!currentWord) { currentWord = document.createElement('span'); currentWord.className = 'as-word'; asTyped.appendChild(currentWord); }
            currentWord.textContent += ch;
          }
          i++;
          nextDelay = 32 + (Math.random() * 20 - 10);
        }
        if (i < text.length) requestAnimationFrame(tick);
        else { flash(currentWord); resolve(); }
      })(last);
    });
  }
  function deleteText(token) {
    return new Promise(function (resolve) {
      var text = asTyped.textContent;
      asTyped.textContent = text;
      var last = performance.now(), acc = 0;
      (function tick(now) {
        if (token.cancelled) { resolve(); return; }
        acc += now - last; last = now;
        while (acc >= 18 && text.length > 0) { acc -= 18; text = text.slice(0, -1); asTyped.textContent = text; }
        if (text.length > 0) requestAnimationFrame(tick); else resolve();
      })(last);
    });
  }

  // ---- Counters ----
  function countUp(token, el, target, dur, color) {
    return frameLoop(token, dur, function (t) {
      var e = easeOutCubic(t);
      el.textContent = Math.round(e * target);
      if (color) {
        if (t < 0.7) el.style.color = '#ffffff';
        else el.style.color = lerpHex('#ffffff', '#8B4DFF', (t - 0.7) / 0.3);
      }
    });
  }

  // ---- Renderers ----
  function renderChips(cfg) {
    chipRow.innerHTML = '';
    return cfg.tags.map(function (tag) {
      var el = document.createElement('span');
      el.className = 'chip' + (tag.active ? ' active' : '');
      el.textContent = tag.label;
      chipRow.appendChild(el);
      return el;
    });
  }
  function renderResults(cfg) {
    results.innerHTML = '';
    var rows = [];
    cfg.results.forEach(function (data, idx) {
      if (idx === 1) {
        var div = document.createElement('div');
        div.className = 'ai-divider';
        results.appendChild(div);
      }
      var row = document.createElement('div');
      row.className = 'ai-result';
      row.innerHTML =
        '<img class="ai-av" src="' + data.avatar + '" alt="' + data.name + '" />' +
        '<div class="ai-info"><div class="ai-name">' + data.name + '<span class="ai-dot"></span></div>' +
        '<div class="ai-role">' + data.role + '</div></div>' +
        '<span class="ai-score">0</span>';
      results.appendChild(row);
      rows.push(row);
    });
    return rows;
  }

  // ---- Border sweep + scan line ----
  function borderSweep() {
    scanRect.style.transition = 'none';
    scanRect.style.strokeDashoffset = perim + 'px';
    scanRect.style.opacity = '1';
    void scanRect.getBoundingClientRect();
    scanRect.style.transition = 'stroke-dashoffset 0.8s ease-in-out';
    scanRect.style.strokeDashoffset = '0px';
    setTimeout(function () { scanRect.style.opacity = '0'; }, 850);
  }
  function runScanline() { scanline.classList.remove('go'); void scanline.offsetWidth; scanline.classList.add('go'); }

  // ---- One result row reveal (slide + avatar spring + name/role + score) ----
  function revealRow(token, row, data) {
    row.classList.add('enter');
    var scoreEl = row.querySelector('.ai-score');
    return wait(token, 80).then(function () {
      return countUp(token, scoreEl, data.score, 600, true);
    }).then(function () {
      scoreEl.style.color = '#8B4DFF';
      scoreEl.classList.add('snap');
      setTimeout(function () { scoreEl.classList.remove('snap'); }, 220);
    });
  }

  // ---- Reset visible content to empty (between cycles / on exit) ----
  function clearAll() {
    chipRow.innerHTML = '';
    results.innerHTML = '';
    matchesEl.textContent = '';
    matchesEl.style.opacity = '0';
    matchesEl.classList.remove('breathe', 'bounce');
    asTyped.innerHTML = '';
    searchBar.classList.remove('connected');
    scanRect.style.opacity = '0';
    asText.classList.remove('locked');
    cursor.classList.remove('hidden');
    cursor.classList.add('blink');
  }

  // ---- One full search cycle (Phases 4–11) ----
  function runCycle(token, cfg, first) {
    return Promise.resolve()
      // Phase 4 — type query
      .then(function () {
        cursor.classList.remove('hidden'); cursor.classList.add('blink');
        return wait(token, first ? 450 : 0);
      })
      .then(function () { return typeIn(token, cfg.query); })
      .then(function () { return wait(token, 300); })
      // Phase 5 — button press + ripple
      .then(function () {
        btn.classList.add('press');
        ripple.classList.remove('go'); void ripple.offsetWidth; ripple.classList.add('go');
        return wait(token, 200);
      })
      .then(function () { btn.classList.remove('press'); })
      // Phase 6 — AI scanning
      .then(function () {
        cursor.classList.remove('blink'); cursor.classList.add('hidden');
        asText.classList.add('locked');
        borderSweep();
        runScanline();
        return wait(token, 900);
      })
      .then(function () { asText.classList.remove('locked'); })
      // Phase 7 — filter tags stamp in, staggered
      .then(function () {
        var chips = renderChips(cfg);
        return chips.reduce(function (p, chip) {
          return p.then(function () { chip.classList.add('stamp'); return wait(token, 120); });
        }, Promise.resolve());
      })
      // match count up
      .then(function () { return wait(token, 100); })
      .then(function () {
        matchesEl.style.transition = 'opacity 0.5s ease-out';
        matchesEl.style.opacity = '1';
        return countUp(token, matchesEl, cfg.matches, 500, false);
      })
      .then(function () {
        matchesEl.textContent = cfg.matches + ' matches';
        matchesEl.classList.add('bounce');
        setTimeout(function () { matchesEl.classList.remove('bounce'); }, 220);
      })
      // Phase 8 — results discovered one by one
      .then(function () {
        var rows = renderResults(cfg);
        token._rows = rows;
        return revealRow(token, rows[0], cfg.results[0]);
      })
      .then(function () { return wait(token, 400); })
      .then(function () {
        var divider = results.querySelector('.ai-divider');
        if (divider) divider.classList.add('draw');
        return revealRow(token, token._rows[1], cfg.results[1]);
      })
      // Phase 9 — confirmed-match dot pulses
      .then(function () { return wait(token, 150); })
      .then(function () {
        token._rows.forEach(function (r) {
          var d = r.querySelector('.ai-dot');
          d.classList.add('pulse');
          setTimeout(function () { d.classList.remove('pulse'); }, 520);
        });
      })
      // Phase 10 — hold + idle
      .then(function () {
        matchesEl.classList.add('breathe');
        results.querySelectorAll('.ai-score').forEach(function (s) { s.classList.add('glow'); });
        searchBar.classList.add('connected');
        return wait(token, 4200);
      })
      // Phase 11 — reset for next cycle
      .then(function () {
        matchesEl.classList.remove('breathe');
        results.querySelectorAll('.ai-score').forEach(function (s) { s.classList.remove('glow'); });
        searchBar.classList.remove('connected');
        token._rows[1].classList.add('exit');
        return wait(token, 100);
      })
      .then(function () {
        token._rows[0].classList.add('exit');
        var chips = chipRow.querySelectorAll('.chip');
        var seq = Promise.resolve();
        for (var k = chips.length - 1; k >= 0; k--) {
          (function (c) { seq = seq.then(function () { c.classList.add('exit'); return wait(token, 80); }); })(chips[k]);
        }
        return seq;
      })
      .then(function () {
        matchesEl.style.transition = 'opacity 0.2s ease';
        matchesEl.style.opacity = '0';
        return wait(token, 350);
      })
      .then(function () {
        results.innerHTML = '';
        chipRow.innerHTML = '';
        matchesEl.textContent = '';
        matchesEl.style.transition = '';
        cursor.classList.remove('hidden'); cursor.classList.add('blink');
        return deleteText(token);
      })
      .then(function () { return wait(token, 400); });
  }

  // ---- Master loop ----
  function runLoop(token) {
    sizeSvg();
    clearAll();
    var idx = 0;
    function next(first) {
      if (token.cancelled) return;
      runCycle(token, CYCLES[idx % CYCLES.length], first)
        .then(function () { idx++; next(false); })
        .catch(function () { /* cancelled */ });
    }
    next(true);
  }

  // ---- Static fallback (reduced motion) ----
  function renderStatic() {
    var cfg = CYCLES[0];
    panel.classList.add('is-static');
    asTyped.textContent = cfg.query;
    renderChips(cfg);
    matchesEl.textContent = cfg.matches + ' matches';
    var rows = renderResults(cfg);
    rows.forEach(function (row, i) {
      var s = row.querySelector('.ai-score');
      s.textContent = cfg.results[i].score;
      s.style.color = '#8B4DFF';
    });
  }

  // ---- Trigger on scroll-into-view; cancel + reset on exit ----
  if (prefersReduced || !('IntersectionObserver' in window)) {
    renderStatic();
    return;
  }

  window.addEventListener('resize', function () { if (active) sizeSvg(); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!active) { active = newToken(); runLoop(active); }
      } else {
        cancel();
        clearAll();
      }
    });
  }, { threshold: 0.35 });
  io.observe(panel);
})();

/* ===== Verified Contacts — live verification ===== */
(function () {
  var panel = document.getElementById('vcPanel');
  if (!panel) return;

  // ---- Contact config — swap records here only ----
  var CONTACTS = [
    { avatar: 'avatars/Container-6.png', name: 'Sofia Lang', role: 'VP Marketing · Vertex',
      email: 'sofia@vertex.io', phone: '+1 (415) 660-0112', score: 99.2 },
    { avatar: 'avatars/Container-7.png', name: 'James Obi', role: 'Head of Growth · Crestline',
      email: 'j.obi@crestline.co', phone: '+1 (332) 874-5509', score: 97.8 }
  ];

  // ---- Element handles ----
  var body     = panel.querySelector('.vc-body');
  var avatar   = panel.querySelector('.vc-av');
  var ring     = panel.querySelector('.vc-ring');
  var nameEl   = panel.querySelector('.vc-name');
  var subEl    = panel.querySelector('.vc-sub');
  var via      = panel.querySelector('.vc-via');
  var viaSvg   = panel.querySelector('.vc-via-svg');
  var viaRect  = panel.querySelector('.vc-via-rect');
  var emailRow = panel.querySelector('.vc-row[data-field="email"]');
  var phoneRow = panel.querySelector('.vc-row[data-field="phone"]');
  var foot     = panel.querySelector('.vc-foot');
  var recheck  = panel.querySelector('.recheck');
  var deliverNum = panel.querySelector('.deliver-num');
  var deliverLbl = panel.querySelector('.deliver-lbl');

  function rowParts(row) {
    return {
      row: row,
      val: row.querySelector('.vc-val'),
      dots: row.querySelector('.vc-dots'),
      badge: row.querySelector('.vc-valid'),
      beam: row.querySelector('.vc-beam'),
      checkP: row.querySelector('.vc-check-p')
    };
  }
  var email = rowParts(emailRow);
  var phone = rowParts(phoneRow);

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Easing + color helpers ----
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

  // ---- Cancellable token + waiter ----
  var active = null;
  function newToken() { return { cancelled: false, timers: [], rejectWait: null }; }
  function cancel() {
    if (!active) return;
    active.cancelled = true;
    active.timers.forEach(clearTimeout);
    active.timers = [];
    if (active.rejectWait) { try { active.rejectWait(); } catch (e) {} }
    active = null;
  }
  function wait(token, ms) {
    return new Promise(function (resolve, reject) {
      if (token.cancelled) { reject(); return; }
      token.rejectWait = reject;
      var t = setTimeout(resolve, ms);
      token.timers.push(t);
    });
  }
  function frameLoop(token, dur, step) {
    return new Promise(function (resolve) {
      var start = performance.now();
      (function tick(now) {
        if (token.cancelled) { resolve(); return; }
        var t = dur > 0 ? Math.min(1, (now - start) / dur) : 1;
        step(t);
        if (t < 1) requestAnimationFrame(tick); else resolve();
      })(start);
    });
  }

  // ---- One-time setup: checkmark path lengths + pill perimeter ----
  function setupGeometry() {
    [email.checkP, phone.checkP].forEach(function (p) {
      var len = 16;
      try { len = p.getTotalLength() || 16; } catch (e) {}
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
    var r = via.getBoundingClientRect();
    var W = Math.round(r.width), H = Math.round(r.height);
    if (W && H) {
      var perim = 2 * ((W - 2) + (H - 2));
      viaRect.setAttribute('x', 1); viaRect.setAttribute('y', 1);
      viaRect.setAttribute('width', W - 2); viaRect.setAttribute('height', H - 2);
      viaRect.setAttribute('rx', H / 2); viaRect.setAttribute('ry', H / 2);
      viaSvg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      viaRect.style.strokeDasharray = perim + 'px';
      viaRect.style.strokeDashoffset = perim + 'px';
      via._perim = perim;
    }
  }

  // ---- Deliverability counter (count up + white→green lerp) ----
  function countScore(token, target) {
    return frameLoop(token, 900, function (t) {
      var e = easeOutCubic(t);
      deliverNum.textContent = (e * target).toFixed(1) + '%';
      if (t < 0.6) deliverNum.style.color = '#ffffff';
      else {
        var k = (t - 0.6) / 0.4;
        deliverNum.style.color = 'rgb(' + lerp(255, 34, k) + ',' + lerp(255, 197, k) + ',' + lerp(255, 94, k) + ')';
      }
    });
  }

  // ---- Reset all field-level state ----
  function clearAll() {
    body.classList.remove('exit');
    avatar.classList.remove('enter', 'live');
    ring.classList.remove('go');
    nameEl.classList.remove('in');
    subEl.classList.remove('in');
    via.classList.remove('in', 'pulse');
    viaRect.style.transition = 'none';
    viaRect.style.strokeDashoffset = (via._perim || 300) + 'px';
    viaRect.style.opacity = '0';
    foot.classList.remove('in');
    recheck.classList.remove('breathe');
    deliverLbl.classList.remove('in');
    deliverNum.style.color = '#ffffff';
    deliverNum.textContent = '0.0%';
    [email, phone].forEach(function (f) {
      f.row.classList.remove('in', 'afterglow');
      f.val.classList.remove('verified');
      f.dots.classList.remove('run');
      f.badge.classList.remove('stamp', 'shimmer');
      f.beam.classList.remove('scan');
      f.beam.style.opacity = '0';
      f.checkP.style.strokeDashoffset = (f.checkP.style.strokeDasharray || 16);
    });
  }

  // ---- Bind a contact's data into the DOM ----
  function bind(cfg) {
    avatar.src = cfg.avatar;
    avatar.alt = cfg.name;
    nameEl.textContent = cfg.name;
    subEl.textContent = cfg.role;
    email.val.textContent = cfg.email;
    phone.val.textContent = cfg.phone;
  }

  // ---- Verify a single field row (beam scan + dots + stamp) ----
  function verifyField(token, f, opts) {
    f.row.classList.add('in');
    return wait(token, opts.beamDelay).then(function () {
      f.beam.style.animationDuration = opts.beamDur + 'ms';
      f.beam.classList.remove('scan'); void f.beam.offsetWidth; f.beam.classList.add('scan');
      f.dots.classList.add('run');
      return wait(token, opts.dotsDur);
    }).then(function () {
      f.dots.classList.remove('run');
      f.row.classList.add('afterglow');
      f.badge.classList.add('stamp');
      f.val.classList.add('verified');
    });
  }

  // ---- One full contact verification cycle (Phases 3–8) ----
  function runContact(token, cfg) {
    return Promise.resolve()
      // Phase 3 — identity loads
      .then(function () {
        avatar.classList.add('enter');
        setTimeout(function () { ring.classList.add('go'); }, 360);
        return wait(token, 150);
      })
      .then(function () { nameEl.classList.add('in'); return wait(token, 130); })
      .then(function () { subEl.classList.add('in'); return wait(token, 120); })
      .then(function () {
        via.classList.add('in');
        // pill border draws around perimeter
        viaRect.style.opacity = '1';
        void viaRect.getBoundingClientRect();
        viaRect.style.transition = 'stroke-dashoffset 0.45s ease-out';
        viaRect.style.strokeDashoffset = '0px';
        return wait(token, 300);
      })
      .then(function () { avatar.classList.remove('enter'); avatar.classList.add('live'); return wait(token, 150); })
      // Phase 4 — email verification
      .then(function () { return verifyField(token, email, { beamDelay: 200, beamDur: 700, dotsDur: 700 }); })
      // Phase 5 — phone verification (warmed up, faster)
      .then(function () { return wait(token, 300); })
      .then(function () { return verifyField(token, phone, { beamDelay: 150, beamDur: 550, dotsDur: 400 }); })
      // Phase 6 — deliverability score
      .then(function () { return wait(token, 350); })
      .then(function () {
        foot.classList.add('in');
        return countScore(token, cfg.score);
      })
      .then(function () {
        deliverNum.textContent = cfg.score.toFixed(1) + '%';
        deliverNum.style.color = '#22C55E';
        deliverNum.classList.remove('glow'); void deliverNum.offsetWidth; deliverNum.classList.add('glow');
        return wait(token, 200);
      })
      .then(function () { deliverLbl.classList.add('in'); return wait(token, 100); })
      // Phase 7 — idle hold
      .then(function () {
        recheck.classList.add('breathe');
        email.badge.classList.add('shimmer');
        phone.badge.classList.add('shimmer');
        via.classList.add('pulse');
        return wait(token, 2000);
      })
      // Phase 8 — swap out
      .then(function () {
        body.classList.add('exit');
        return wait(token, 400);
      })
      .then(function () {
        clearAll();
        return wait(token, 300);
      });
  }

  // ---- Master loop ----
  function runLoop(token) {
    setupGeometry();
    clearAll();
    var idx = 0;
    function next() {
      if (token.cancelled) return;
      var cfg = CONTACTS[idx % CONTACTS.length];
      bind(cfg);
      runContact(token, cfg)
        .then(function () { idx++; next(); })
        .catch(function () { /* cancelled */ });
    }
    next();
  }

  // ---- Static fallback ----
  function renderStatic() {
    var cfg = CONTACTS[0];
    panel.classList.add('is-static');
    bind(cfg);
    avatar.classList.add('live');
    email.val.classList.add('verified');
    phone.val.classList.add('verified');
    deliverNum.textContent = cfg.score.toFixed(1) + '%';
    deliverNum.style.color = '#22C55E';
  }

  if (prefersReduced || !('IntersectionObserver' in window)) {
    setupGeometry();
    renderStatic();
    return;
  }

  window.addEventListener('resize', function () { if (active) setupGeometry(); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!active) { active = newToken(); runLoop(active); }
      } else {
        cancel();
        clearAll();
      }
    });
  }, { threshold: 0.35 });
  io.observe(panel);
})();

/* ============================================================
   Buying Signals — live streaming intelligence feed
   Self-contained. Drives #bsPanel only. Triggers on scroll-in,
   loops continuously, pauses on viewport exit (index preserved).
   ============================================================ */
(function () {
  var panel = document.getElementById('bsPanel');
  if (!panel) return;

  // ---- Signal data pool (rotate through these — 3 visible at once) ----
  var SIGNALS = [
    { id: 'A', iconType: 'dollar', color: 'purple', accent: '#8B4DFF', title: 'Nova Labs raised $14M',     tags: 'Series B · funding',    age: 2 },
    { id: 'B', iconType: 'users',  color: 'blue',   accent: '#3B82F6', title: 'Helix hiring 12 SDRs',       tags: 'Headcount · growth',    age: 3 },
    { id: 'C', iconType: 'swap',   color: 'green',  accent: '#22C55E', title: 'Bolt appointed new CRO',     tags: 'Leadership · change',   age: 5 },
    { id: 'D', iconType: 'dollar', color: 'teal',   accent: '#14B8A6', title: 'Archon closed $22M seed',    tags: 'Seed · funding',        age: 1 },
    { id: 'E', iconType: 'users',  color: 'violet', accent: '#A855F7', title: 'Stackr expanding EU team',   tags: 'Headcount · expansion', age: 4 },
    { id: 'F', iconType: 'swap',   color: 'orange', accent: '#F97316', title: 'Loopbase hired VP of Sales', tags: 'Leadership · hiring',   age: 6 }
  ];

  // ---- Layout constants (must match CSS) ----
  var ROW_H = 60, GAP = 10, STEP = ROW_H + GAP;   // slot pitch
  var SLOT_INCOMING = -STEP;                       // above the viewport
  var SLOT_EXIT = STEP * 2 + 80;                   // off the bottom
  var ARRIVAL_MS = 2800;

  // ---- Inline icon SVGs (lucide geometry; JS-built rows aren't auto-iconified) ----
  var ICONS = {
    dollar: '<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    users:  '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    swap:   '<svg viewBox="0 0 24 24"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>'
  };

  // ---- Element handles ----
  var feed     = panel.querySelector('.bs-feed');
  var head     = panel.querySelector('.bs-head');
  var ping     = panel.querySelector('.bs-ping');
  var stream   = panel.querySelector('.bs-stream');
  var dot      = panel.querySelector('.bs-dot');
  var ring2    = panel.querySelector('.bs-ring2');
  var border   = panel.querySelector('.bs-border');
  var borderRect = panel.querySelector('.bs-border-rect');

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Timer bookkeeping (all cleared on viewport exit) ----
  var timers = [];
  var interval = null;
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() {
    timers.forEach(clearTimeout); timers = [];
    if (interval) { clearInterval(interval); interval = null; }
  }

  // ---- Build a row element for a signal; positioned at a starting slot ----
  function buildRow(sig, slot) {
    var arow = document.createElement('div');
    arow.className = 'bs-arow';
    arow.style.transform = 'translateY(' + slot + 'px)';

    var accent = document.createElement('span');
    accent.className = 'bs-accent';
    accent.style.background = sig.accent;

    var wrap = document.createElement('div');
    wrap.className = 'bs-rowwrap';
    wrap.style.animationDelay = (-Math.random() * 4) + 's';   // desync the breathe loop

    var row = document.createElement('div');
    row.className = 'bs-row';

    var ic = document.createElement('span');
    ic.className = 'bs-ic ' + sig.color;
    var glow = document.createElement('span');
    glow.className = 'bs-ic-glow';
    glow.style.background = sig.accent;
    var pop = document.createElement('span');
    pop.className = 'bs-ic-pop';
    pop.innerHTML = ICONS[sig.iconType] || ICONS.dollar;
    ic.appendChild(glow);
    ic.appendChild(pop);

    var info = document.createElement('div');
    info.className = 'bs-info';
    var name = document.createElement('div');
    name.className = 'bs-name';
    name.textContent = sig.title;
    var meta = document.createElement('div');
    meta.className = 'bs-meta';
    meta.textContent = sig.tags;
    info.appendChild(name);
    info.appendChild(meta);

    var time = document.createElement('span');
    time.className = 'bs-time';
    var val = document.createElement('span');
    val.className = 'bs-time-val';
    val.textContent = sig.age + 'd';
    time.appendChild(val);

    row.appendChild(ic);
    row.appendChild(info);
    row.appendChild(time);
    wrap.appendChild(row);
    arow.appendChild(accent);
    arow.appendChild(wrap);

    return {
      el: arow, accent: accent, ic: ic, glow: glow, pop: pop,
      name: name, meta: meta, timeEl: time,
      age: sig.age, signal: sig, slot: slot
    };
  }

  function setSlot(r, slot) {
    r.slot = slot;
    r.el.style.transform = 'translateY(' + slot + 'px)';
  }

  // Title/tags/timestamp reveal + icon spring + glow for a freshly-shown row
  function revealRow(r, opts) {
    opts = opts || {};
    later(function () { r.pop.classList.add('pop'); r.glow.classList.add('go'); }, opts.icon || 80);
    later(function () { r.name.classList.add('in'); }, (opts.icon || 80) + 100);
    later(function () { r.meta.classList.add('in'); }, (opts.icon || 80) + 260);
    later(function () { r.timeEl.classList.add('in'); }, (opts.icon || 80) + 420);
    later(function () { r.el.classList.add('idle'); }, (opts.idle || 900));
  }

  // ---- Timestamp slot-machine flip (increment by 1) ----
  function bumpTime(r) {
    r.age += 1;
    var cur = r.timeEl.querySelector('.bs-time-val:not(.exit)');
    var nxt = document.createElement('span');
    nxt.className = 'bs-time-val enter';
    nxt.textContent = r.age + 'd';
    r.timeEl.appendChild(nxt);
    void nxt.offsetWidth;                 // commit start state
    nxt.classList.remove('enter');        // slide up-in
    if (cur) {
      cur.classList.add('exit');          // slide up-out
      var dead = cur;
      later(function () { if (dead.parentNode) dead.parentNode.removeChild(dead); }, 240);
    }
  }

  // ---- Traveling border light geometry (sized to panel) ----
  function setupBorder() {
    var w = panel.clientWidth, h = panel.clientHeight;
    if (!w || !h) return;
    border.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    borderRect.setAttribute('width', w - 2);
    borderRect.setAttribute('height', h - 2);
    var perim = 2 * ((w - 2) + (h - 2));
    var seg = 42;                         // bright travelling segment
    borderRect.style.strokeDasharray = seg + ' ' + (perim - seg);
    borderRect.style.setProperty('--bs-perim-neg', (-perim) + 'px');
  }

  // ---- Live feed state ----
  var rows = [];          // top -> bottom
  var nextIndex = 0;      // index of next arriving signal (preserved across exits)
  var introDone = false;

  // ---- A single arrival: new row in from top, others push down, oldest exits ----
  function arrive() {
    // Phase 5 pre-flash — network ping 100ms before the signal lands
    ping.classList.remove('go'); void ping.offsetWidth; ping.classList.add('go');
    ring2.classList.remove('go'); void ring2.offsetWidth; ring2.classList.add('go');

    later(function () {
      var sig = SIGNALS[nextIndex % SIGNALS.length];
      nextIndex++;

      // New row starts above the feed, invisible, no transition
      var nr = buildRow(sig, SLOT_INCOMING);
      nr.el.style.transition = 'none';
      nr.el.style.opacity = '0';
      var row = nr.el.querySelector('.bs-row');
      row.classList.add('fresh');
      feed.appendChild(nr.el);
      void nr.el.offsetWidth;                       // commit start position

      // Border light adopts the newest signal's colour
      borderRect.style.stroke = sig.accent;

      // Enable transition, slide into the top slot
      nr.el.style.transition = '';
      nr.el.style.opacity = '1';
      setSlot(nr, 0);
      nr.accent.classList.add('flash');             // left-edge "NEW" marker
      later(function () { row.classList.remove('fresh'); }, 60);   // bg fades over 1.2s

      // New row's identity/icon reveal
      revealRow(nr, { icon: 120, idle: 700 });

      // Existing rows push down; ages tick on the survivors
      var survivors = rows.slice(0, 2);             // current top + middle stay visible
      var exiting = rows[2];

      if (rows[0]) { setSlot(rows[0], STEP); bumpTime(rows[0]); }
      if (rows[1]) { setSlot(rows[1], STEP * 2); bumpTime(rows[1]); }
      if (exiting) {
        exiting.el.classList.add('exit');
        exiting.el.style.opacity = '0';
        exiting.el.style.transform = 'translateY(' + SLOT_EXIT + 'px)';
        var dead = exiting.el;
        later(function () { if (dead.parentNode) dead.parentNode.removeChild(dead); }, 460);
      }

      rows = [nr].concat(survivors);
    }, 100);
  }

  // ---- Phase 3: populate the three starting signals (first scroll-in only) ----
  function populate() {
    rows = [];
    for (var i = 0; i < 3; i++) {
      var sig = SIGNALS[i];
      var r = buildRow(sig, i * STEP);
      // start just above final slot, hidden — then drop in
      r.el.style.transition = 'none';
      r.el.style.opacity = '0';
      r.el.style.transform = 'translateY(' + (i * STEP - 16) + 'px)';
      feed.appendChild(r.el);
      rows.push(r);
    }
    nextIndex = 3;

    void feed.offsetWidth;                          // commit start states
    rows.forEach(function (r, i) {
      r.el.style.transition = '';
      later(function () {
        r.el.style.opacity = '1';
        setSlot(r, i * STEP);
        revealRow(r, { icon: 80, idle: 700 });
      }, 800 + i * 180);
    });

    // Phase 4 — streaming indicator activates after the feed is live
    later(function () {
      dot.classList.add('in');
      stream.classList.add('live');
      border.classList.add('on');
      borderRect.classList.add('travel');
    }, 1400);
  }

  // ---- Master loop control ----
  function start() {
    setupBorder();
    if (!introDone) {
      populate();
      introDone = true;
      later(function () { interval = setInterval(arrive, ARRIVAL_MS); }, 2200);
    } else {
      // Resume where we left off — feed was always conceptually running
      interval = setInterval(arrive, ARRIVAL_MS);
    }
  }

  // ---- Static fallback (reduced motion / no IntersectionObserver) ----
  function renderStatic() {
    for (var i = 0; i < 3; i++) {
      var r = buildRow(SIGNALS[i], i * STEP);
      r.el.style.opacity = '1';
      r.el.classList.add('idle');
      r.pop.style.transform = 'none';
      r.name.classList.add('in');
      r.meta.classList.add('in');
      r.timeEl.classList.add('in');
      feed.appendChild(r.el);
    }
    dot.style.transform = 'scale(1)';
    stream.querySelector('.bs-stream-txt').style.opacity = '1';
    stream.querySelector('.bs-stream-txt').style.transform = 'none';
  }

  if (prefersReduced || !('IntersectionObserver' in window)) {
    renderStatic();
    return;
  }

  window.addEventListener('resize', setupBorder);

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!interval) start();
      } else {
        clearTimers();
        // If interrupted mid-intro, reset so it can replay cleanly next time
        if (!rows.length || rows.length < 3) {
          feed.innerHTML = '';
          rows = [];
          introDone = false;
          stream.classList.remove('live');
          dot.classList.remove('in');
          border.classList.remove('on');
          borderRect.classList.remove('travel');
        }
      }
    });
  }, { threshold: 0.35 });
  io.observe(panel);
})();

/* ===== Market Pulse chart ===== */
(function () {
  'use strict';

  // ================================================================
  // VIEWS CONFIG
  // ================================================================
  var VIEWS = [
    {
      label:     '90d',
      bars:      [38, 44, 36, 52, 56, 60, 58, 64, 92, 68],
      peakIndex: 8,
      peakLabel: 'Peak · Jul',
      xLabels:   [{ t: 'APR', x: 50 }, { t: 'MAY', x: 160 }, { t: 'JUN', x: 277 }, { t: 'JUL', x: 395 }],
      stat1:     1284,
      stat2:     18
    },
    {
      label:     '30d',
      bars:      [60, 72, 68, 85, 92, 78],
      peakIndex: 4,
      peakLabel: 'Peak · Jul 14',
      xLabels:   [{ t: 'JUN', x: 104 }, { t: 'JUL', x: 336 }],
      stat1:     347,
      stat2:     23
    }
  ];

  // ================================================================
  // INIT — find elements
  // ================================================================
  var card = document.getElementById('mpCard');
  if (!card) return;

  function q(attr) { return card.querySelector('[data-mp-el="' + attr + '"]'); }
  var pill       = q('pill');
  var line1      = q('line1');
  var line2      = q('line2');
  var sub        = q('sub');
  var statsBlock = q('statsblock');
  var stat1El    = q('stat1');
  var stat2El    = q('stat2');
  var cap1El     = q('cap1');
  var cap2El     = q('cap2');
  var chartCard  = q('chartcard');
  var svgWrap    = q('svgwrap');
  var btn30      = q('btn30');
  var btn90      = q('btn90');

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ================================================================
  // SVG CONSTANTS
  // ================================================================
  var NS      = 'http://www.w3.org/2000/svg';
  var SVG_W   = 440;
  var CHART_H = 160;
  var SVG_H   = 205;
  var XLY     = 192; // x-axis label y

  function mkEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    var ks = Object.keys(attrs);
    for (var i = 0; i < ks.length; i++) e.setAttribute(ks[i], attrs[ks[i]]);
    return e;
  }

  // ================================================================
  // BAR LAYOUT
  // ================================================================
  function layout(view) {
    var n    = view.bars.length;
    var bw   = n <= 6 ? 52 : 32;
    var gap  = (SVG_W - n * bw) / (n - 1);
    return view.bars.map(function (h, i) {
      var x   = i * (bw + gap);
      var hpx = (h / 100) * CHART_H;
      return { x: x, y: CHART_H - hpx, w: bw, h: hpx, cx: x + bw / 2, peak: i === view.peakIndex };
    });
  }

  // ================================================================
  // BUILD STATIC SVG SKELETON (once)
  // ================================================================
  var svg, clipRect, baseline;
  var dynG, barEls, peakGlow, burstG, tooltipG, tooltipStem, xlabelEls;

  function buildSkeleton() {
    svg = mkEl('svg', { viewBox: '0 0 ' + SVG_W + ' ' + SVG_H, 'aria-hidden': 'true' });
    svg.style.cssText = 'display:block;width:100%;height:auto;overflow:visible;';

    var defs = mkEl('defs', {});

    // Peak gradient (y coords updated per view)
    var pg = mkEl('linearGradient', { id: 'mpPG', x1: '0', y1: '0', x2: '0', y2: '1', gradientUnits: 'userSpaceOnUse' });
    pg.appendChild(mkEl('stop', { offset: '0%', 'stop-color': '#A576F8' }));
    pg.appendChild(mkEl('stop', { offset: '100%', 'stop-color': '#6C2BDF' }));
    defs.appendChild(pg);

    // Glow gradient
    var gg = mkEl('linearGradient', { id: 'mpGG', x1: '0', y1: '0', x2: '0', y2: '' + CHART_H, gradientUnits: 'userSpaceOnUse' });
    gg.appendChild(mkEl('stop', { offset: '0%', 'stop-color': '#7c3aed', 'stop-opacity': '0.18' }));
    gg.appendChild(mkEl('stop', { offset: '100%', 'stop-color': '#7c3aed', 'stop-opacity': '0' }));
    defs.appendChild(gg);

    // Baseline clip (draw-in)
    var cp = mkEl('clipPath', { id: 'mpBC' });
    clipRect = mkEl('rect', { x: '0', y: '0', width: '0', height: '' + SVG_H });
    cp.appendChild(clipRect);
    defs.appendChild(cp);

    svg.appendChild(defs);

    // Baseline
    baseline = mkEl('line', {
      x1: '0', y1: '' + CHART_H, x2: '' + SVG_W, y2: '' + CHART_H,
      stroke: 'rgba(255,255,255,0.12)', 'stroke-width': '1',
      'stroke-dasharray': '4 4', 'clip-path': 'url(#mpBC)'
    });
    svg.appendChild(baseline);

    svgWrap.innerHTML = '';
    svgWrap.appendChild(svg);
  }

  // ================================================================
  // RENDER DYNAMIC ELEMENTS FOR A VIEW
  // ================================================================
  function renderDyn(viewIdx) {
    if (dynG) dynG.remove();
    var view = VIEWS[viewIdx];
    var L    = layout(view);
    var pk   = L[view.peakIndex];
    dynG     = mkEl('g', {});

    // Update peak gradient y range
    var pg = svg.querySelector('#mpPG');
    if (pg) { pg.setAttribute('y1', '' + pk.y); pg.setAttribute('y2', '' + CHART_H); }

    // Glow column behind peak bar
    peakGlow = mkEl('rect', { x: '' + pk.x, y: '0', width: '' + pk.w, height: '' + CHART_H, fill: 'url(#mpGG)', opacity: '0' });
    dynG.appendChild(peakGlow);

    // Bars
    barEls = L.map(function (b) {
      var r = mkEl('rect', {
        x: '' + b.x, y: '' + b.y, width: '' + b.w, height: '' + b.h,
        rx: '5', ry: '5',
        fill: b.peak ? 'url(#mpPG)' : '#3D2F6E',
        class: 'mp-bar-rect'
      });
      r.style.transform  = 'scaleY(0)';
      r.style.opacity    = '0.3';
      dynG.appendChild(r);
      return { el: r, b: b };
    });

    // Burst (4 diagonal lines from peak top)
    burstG = mkEl('g', { opacity: '0' });
    var BL = 11;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (d) {
      burstG.appendChild(mkEl('line', {
        x1: '' + pk.cx, y1: '' + pk.y,
        x2: '' + (pk.cx + d[0] * BL), y2: '' + (pk.y + d[1] * BL),
        stroke: '#A576F8', 'stroke-width': '1.5', 'stroke-linecap': 'round'
      }));
    });
    dynG.appendChild(burstG);

    // Tooltip
    var TW  = view.peakLabel.length > 10 ? 84 : 68;
    var TH  = 22;
    var ttx = Math.max(4, Math.min(SVG_W - TW - 4, pk.cx - TW / 2));
    var tty = Math.max(4, pk.y - 42);
    var tcx = ttx + TW / 2;
    var sy1 = tty + TH, sy2 = pk.y - 2;
    var slen = Math.max(0, sy2 - sy1);
    tooltipG = mkEl('g', { opacity: '0' });
    tooltipG.appendChild(mkEl('rect', { x: '' + ttx, y: '' + tty, width: '' + TW, height: '' + TH, rx: '6', ry: '6', fill: 'url(#mpPG)' }));
    var ttxt = mkEl('text', {
      x: '' + tcx, y: '' + (tty + 15), fill: '#fff',
      'font-size': '10', 'font-weight': '700', 'text-anchor': 'middle',
      'font-family': "'Inter',-apple-system,sans-serif"
    });
    ttxt.textContent = view.peakLabel;
    tooltipG.appendChild(ttxt);
    tooltipStem = mkEl('line', {
      x1: '' + pk.cx, y1: '' + sy1, x2: '' + pk.cx, y2: '' + sy2,
      stroke: 'rgba(165,118,248,0.55)', 'stroke-width': '1',
      'stroke-dasharray': '' + slen, 'stroke-dashoffset': '' + slen
    });
    tooltipG.appendChild(tooltipStem);
    dynG.appendChild(tooltipG);

    // X-axis labels
    xlabelEls = view.xLabels.map(function (lbl) {
      var t = mkEl('text', {
        x: '' + lbl.x, y: '' + XLY, fill: 'rgba(255,255,255,0.45)',
        'font-size': '11', 'font-weight': '600', 'text-anchor': 'middle',
        'font-family': "'Inter',-apple-system,sans-serif",
        'letter-spacing': '0.05em', opacity: '0'
      });
      t.textContent = lbl.t;
      dynG.appendChild(t);
      return t;
    });

    svg.appendChild(dynG);
    return L;
  }

  // ================================================================
  // EASING
  // ================================================================
  function eOut(t) { return 1 - Math.pow(1 - t, 3); }
  function eOutBack(t) {
    var c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }
  function eSnap(t) { // mild overshoot for bars
    var c1 = 0.38, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  // ================================================================
  // PRIMITIVES
  // ================================================================
  var _tok = null; // cancellation token

  function newToken() { return { cancelled: false }; }
  function cancel()   { if (_tok) _tok.cancelled = true; }

  function wait(tok, ms) {
    return new Promise(function (res) {
      if (tok.cancelled) { res(); return; }
      var id = setTimeout(function () { res(); }, ms);
      tok._t = tok._t || [];
      tok._t.push(id);
    });
  }

  function tween(tok, dur, easeFn, fn) {
    return new Promise(function (res) {
      if (tok.cancelled) { res(); return; }
      var t0 = performance.now();
      function tick(now) {
        if (tok.cancelled) { res(); return; }
        var t = Math.min((now - t0) / dur, 1);
        fn(easeFn(t), t);
        if (t < 1) requestAnimationFrame(tick);
        else res();
      }
      requestAnimationFrame(tick);
    });
  }

  // ================================================================
  // IDLE RAF
  // ================================================================
  var _idleRaf = null;
  var _idleT0  = 0;

  function stopIdle() {
    if (_idleRaf) { cancelAnimationFrame(_idleRaf); _idleRaf = null; }
  }

  function startIdle(peakIdx) {
    stopIdle();
    _idleT0 = performance.now();
    function tick(now) {
      var s = (now - _idleT0) / 1000;
      // Peak bar brightness breathe (2.5s)
      var pb = 1 + 0.2 * (0.5 - 0.5 * Math.cos(2 * Math.PI * s / 2.5));
      if (barEls[peakIdx]) barEls[peakIdx].el.style.filter = 'brightness(' + pb.toFixed(3) + ')';
      // Tooltip float (3s)
      var fy = -2 * (0.5 - 0.5 * Math.cos(2 * Math.PI * s / 3));
      if (tooltipG) tooltipG.setAttribute('transform', 'translate(0,' + fy.toFixed(2) + ')');
      // +% stat glow (3s)
      var glow = 8 * (0.5 - 0.5 * Math.cos(2 * Math.PI * s / 3));
      if (stat2El) stat2El.style.textShadow = '0 0 ' + glow.toFixed(1) + 'px #22c55e';
      // Non-peak bar breathe (4s, staggered)
      barEls.forEach(function (br, i) {
        if (i === peakIdx) return;
        var ph  = (i / barEls.length) * Math.PI * 2;
        var op  = 0.875 + 0.125 * (0.5 - 0.5 * Math.cos(2 * Math.PI * s / 4 + ph));
        br.el.style.opacity = op.toFixed(3);
      });
      _idleRaf = requestAnimationFrame(tick);
    }
    _idleRaf = requestAnimationFrame(tick);
  }

  function stopIdleClean() {
    stopIdle();
    if (barEls) barEls.forEach(function (br) { br.el.style.filter = ''; });
    if (tooltipG) tooltipG.removeAttribute('transform');
    if (stat2El) stat2El.style.textShadow = '';
  }

  // ================================================================
  // STAT COUNTER
  // ================================================================
  function countStat(tok, el, value, isPercent, dur) {
    return tween(tok, dur, eOut, function (e) {
      var v = Math.round(value * e);
      el.textContent = isPercent ? '+' + v + '%' : v.toLocaleString();
    });
  }

  // ================================================================
  // TOGGLE BUTTON STATE
  // ================================================================
  function setToggle(active) {
    // active: 0 = 90d, 1 = 30d
    if (active === 0) {
      btn90.classList.add('active');
      btn30.classList.remove('active');
    } else {
      btn30.classList.add('active');
      btn90.classList.remove('active');
    }
  }

  // ================================================================
  // RESET / STATIC FALLBACK
  // ================================================================
  function hardReset() {
    stopIdleClean();
    // Left side — restore visible
    [pill, line1, line2, sub].forEach(function (el) {
      el.style.opacity = '1'; el.style.transform = '';
    });
    statsBlock.style.opacity = '1';
    stat1El.textContent = '1,284';
    stat2El.textContent = '+18%';
    [cap1El, cap2El].forEach(function (c) { c.style.opacity = '1'; });
    // Chart card
    chartCard.style.opacity = '1'; chartCard.style.transform = '';
    setToggle(0);
    // SVG — rebuild static 90d view
    buildSkeleton();
    renderDyn(0);
    clipRect.setAttribute('width', '' + SVG_W);
    barEls.forEach(function (b) { b.el.style.transform = 'scaleY(1)'; b.el.style.opacity = '1'; });
    peakGlow.setAttribute('opacity', '0.55');
    tooltipG.setAttribute('opacity', '1');
    tooltipStem.setAttribute('stroke-dashoffset', '0');
    xlabelEls.forEach(function (l) { l.setAttribute('opacity', '0.5'); });
    baseline.style.animation = 'mp-dash-travel 0.5s linear infinite';
  }

  // ================================================================
  // PHASE 1 — TEXT ENTRANCE (first trigger only)
  // ================================================================
  var _textDone = false;

  function phaseText(tok) {
    if (_textDone) return Promise.resolve();
    _textDone = true;

    pill.style.cssText    = 'opacity:0;transform:scale(0.8);';
    line1.style.cssText   = 'opacity:0;transform:translateY(16px);';
    line2.style.cssText   = 'opacity:0;transform:translateY(16px);';
    sub.style.cssText     = 'opacity:0;transform:translateY(8px);';
    statsBlock.style.opacity = '0';
    [cap1El, cap2El].forEach(function (c) { c.style.opacity = '0'; });

    // pill (0ms)
    tween(tok, 350, eOutBack, function (e) {
      pill.style.opacity   = Math.min(e, 1);
      pill.style.transform = 'scale(' + (0.8 + 0.2 * Math.min(e, 1)) + ')';
    });

    return wait(tok, 100).then(function () {
      tween(tok, 450, eOut, function (e) {
        line1.style.opacity   = e;
        line1.style.transform = 'translateY(' + (16 * (1 - e)) + 'px)';
      });
      return wait(tok, 100);
    }).then(function () {
      tween(tok, 450, eOut, function (e) {
        line2.style.opacity   = e;
        line2.style.transform = 'translateY(' + (16 * (1 - e)) + 'px)';
      });
      return wait(tok, 120);
    }).then(function () {
      tween(tok, 350, eOut, function (e) {
        sub.style.opacity   = e;
        sub.style.transform = 'translateY(' + (8 * (1 - e)) + 'px)';
      });
    });
  }

  // ================================================================
  // PHASE 2 — CHART PANEL ENTRANCE
  // ================================================================
  function phaseChartIn(tok) {
    chartCard.style.cssText = 'opacity:0;transform:translateX(24px);';
    return wait(tok, 600).then(function () {
      return tween(tok, 550, function (t) {
        return 1 - Math.pow(1 - t, 4) * (1 + 0.4 * t);
      }, function (e) {
        var v = Math.min(e, 1);
        chartCard.style.opacity   = v;
        chartCard.style.transform = 'translateX(' + (24 * (1 - v)) + 'px)';
      });
    });
  }

  // ================================================================
  // PHASE 3 — AXIS + BASELINE
  // ================================================================
  function phaseAxis(tok) {
    clipRect.setAttribute('width', '0');
    baseline.style.animation = '';
    xlabelEls.forEach(function (l) { l.setAttribute('opacity', '0'); l.setAttribute('transform', 'translate(0,4)'); });

    return wait(tok, 900).then(function () {
      // Draw baseline
      tween(tok, 500, eOut, function (e) {
        clipRect.setAttribute('width', '' + (SVG_W * e));
      }).then(function () {
        if (!tok.cancelled) baseline.style.animation = 'mp-dash-travel 0.5s linear infinite';
      });
      // X-labels staggered
      xlabelEls.forEach(function (lb, i) {
        wait(tok, i * 80).then(function () {
          return tween(tok, 250, eOut, function (e) {
            lb.setAttribute('opacity', '' + (0.5 * e));
            lb.setAttribute('transform', 'translate(0,' + (4 * (1 - e)) + ')');
          });
        });
      });
      return wait(tok, 600);
    });
  }

  // ================================================================
  // PHASE 4 — BARS BUILD LEFT TO RIGHT
  // ================================================================
  function phaseBars(tok, viewIdx) {
    var view    = VIEWS[viewIdx];
    var STAGGER = 120;
    var n       = barEls.length;
    var pkIdx   = view.peakIndex;

    barEls.forEach(function (b) {
      b.el.style.transition = 'none';
      b.el.style.transform  = 'scaleY(0)';
      b.el.style.opacity    = '0.3';
      b.el.style.filter     = '';
    });
    peakGlow.setAttribute('opacity', '0');
    tooltipG.setAttribute('opacity', '0');

    var promises = barEls.map(function (barObj, i) {
      var delay   = i * STAGGER;
      var isPeak  = i === pkIdx;
      var dur     = isPeak ? 380 : 500;
      var ease    = eSnap;

      return wait(tok, delay).then(function () {
        if (tok.cancelled) return;

        // Anticipation flash on previous bar
        if (i > 0) {
          var prev = barEls[i - 1].el;
          prev.style.transition = 'filter 60ms';
          prev.style.filter     = 'brightness(1.3)';
          setTimeout(function () { prev.style.filter = ''; prev.style.transition = ''; }, 70);
        }

        return tween(tok, dur, ease, function (e, rawT) {
          barObj.el.style.transform = 'scaleY(' + e + ')';
          barObj.el.style.opacity   = 0.3 + 0.7 * Math.min(rawT * 1.6, 1);
          // Glow column appears at 50% of peak bar growth
          if (isPeak && rawT > 0.5) {
            peakGlow.setAttribute('opacity', '' + (0.55 * eOut((rawT - 0.5) / 0.5)));
          }
        }).then(function () {
          if (tok.cancelled) return;
          // Confirmation flash
          barObj.el.style.filter = 'brightness(1.8)';
          setTimeout(function () { barObj.el.style.filter = ''; }, 80);

          if (isPeak) {
            // Radial burst — scale up group from peak top, fade out
            var pkData = barObj.b;
            var cx = pkData.cx, cy = pkData.y;
            burstG.setAttribute('opacity', '0.6');
            tween(tok, 380, eOut, function (e) {
              var s = 1 + e * 1.8;
              burstG.setAttribute('opacity', '' + (0.6 * (1 - e)));
              burstG.setAttribute('transform',
                'translate(' + cx + ',' + cy + ') scale(' + s + ') translate(' + (-cx) + ',' + (-cy) + ')');
            });

            // Tooltip drops in (80ms after burst)
            wait(tok, 80).then(function () {
              tooltipG.setAttribute('transform', 'translate(0,-10)');
              return tween(tok, 300, eOutBack, function (e) {
                tooltipG.setAttribute('opacity', '' + Math.min(e, 1));
                tooltipG.setAttribute('transform', 'translate(0,' + (-10 * (1 - Math.min(e, 1))) + ')');
              });
            }).then(function () {
              // Stem draws down
              if (!tok.cancelled) {
                var slen = parseFloat(tooltipStem.getAttribute('stroke-dasharray') || '0');
                return tween(tok, 150, eOut, function (e) {
                  tooltipStem.setAttribute('stroke-dashoffset', '' + (slen * (1 - e)));
                });
              }
            });
          }
        });
      });
    });

    var lastDelay = (n - 1) * STAGGER + (pkIdx === n - 1 ? 380 : 500) + 500;
    return wait(tok, lastDelay);
  }

  // ================================================================
  // PHASE 5 — STATS COUNT UP
  // ================================================================
  function phaseStats(tok, view) {
    statsBlock.style.opacity = '1';
    stat1El.textContent = '0';
    stat2El.textContent = '+0%';
    [cap1El, cap2El].forEach(function (c) { c.style.opacity = '0'; });

    var p1 = countStat(tok, stat1El, view.stat1, false, 900);
    var p2 = countStat(tok, stat2El, view.stat2, true, 900);

    // Labels fade in at midpoint
    wait(tok, 450).then(function () {
      [cap1El, cap2El].forEach(function (c) {
        c.style.transition = 'opacity 300ms ease';
        c.style.opacity    = '0.55';
      });
    });

    return Promise.all([p1, p2]).then(function () {
      if (tok.cancelled) return;
      // Lock flash
      return tween(tok, 200, eOut, function (e) {
        var s = 1 + 0.04 * Math.sin(e * Math.PI);
        stat1El.style.transform = 'scale(' + s + ')';
        stat2El.style.transform = 'scale(' + s + ')';
      });
    }).then(function () {
      if (tok.cancelled) return;
      stat1El.style.transform = '';
      stat2El.style.transform = '';
    });
  }

  // ================================================================
  // PHASE 7 — BARS EXIT (slide out)
  // ================================================================
  function phaseBarsExit(tok, dir) {
    // dir: -1 = slide left (exit 90d), +1 = slide right (exit 30d)
    var dx = dir * 20;
    var promises = barEls.map(function (br, i) {
      return wait(tok, i * 40).then(function () {
        return tween(tok, 300, eOut, function (e) {
          br.el.style.transform   = 'scaleY(1) translateX(' + (dx * e) + 'px)';
          br.el.style.opacity     = 1 - e;
        });
      });
    });

    // Fade tooltip, glow, and x-labels together
    tween(tok, 250, eOut, function (e) {
      tooltipG.setAttribute('opacity', '' + (1 - e));
      peakGlow.setAttribute('opacity', '' + (0.55 * (1 - e)));
      xlabelEls.forEach(function (l) { l.setAttribute('opacity', '' + (0.5 * (1 - e))); });
    });

    return wait(tok, barEls.length * 40 + 350);
  }

  // ================================================================
  // PHASE 7 — TOGGLE BUTTON ANIMATION
  // ================================================================
  function animateToggle(tok, toView) {
    var inBtn  = toView === 1 ? btn30 : btn90;
    var outBtn = toView === 1 ? btn90 : btn30;

    // Activate new button
    tween(tok, 200, eOut, function (e) {
      inBtn.style.transform = 'scale(' + (1 + 0.05 * Math.sin(e * Math.PI)) + ')';
    }).then(function () {
      inBtn.style.transform = '';
      setToggle(toView);
    });

    return wait(tok, 200);
  }

  // ================================================================
  // MASTER LOOP
  // ================================================================
  function runLoop(tok) {
    buildSkeleton();
    renderDyn(0);
    setToggle(0);

    // Phase 1 text (only first time)
    phaseText(tok)
      .then(function () { return phaseChartIn(tok); })
      .then(function () { return phaseAxis(tok); })
      .then(function () { return phaseBars(tok, 0); })
      .then(function () { return phaseStats(tok, VIEWS[0]); })
      .then(function () {
        startIdle(VIEWS[0].peakIndex);
        return wait(tok, 1700); // Phase 6 hold
      })
      .then(function () {
        stopIdleClean();
        return animateToggle(tok, 1); // switch to 30d
      })
      .then(function () {
        return phaseBarsExit(tok, -1);
      })
      .then(function () {
        return wait(tok, 200);
      })
      .then(function () {
        // Cross-fade stats to 0 before new count
        return tween(tok, 200, eOut, function (e) {
          statsBlock.style.opacity = 1 - e;
        });
      })
      .then(function () {
        // Re-render for 30d view
        renderDyn(1);
        clipRect.setAttribute('width', '' + SVG_W);
        baseline.style.animation = 'mp-dash-travel 0.5s linear infinite';
        xlabelEls.forEach(function (l) {
          l.setAttribute('opacity', '0');
          l.setAttribute('transform', 'translate(0,4)');
          setTimeout(function () {
            l.setAttribute('opacity', '0.5');
            l.setAttribute('transform', '');
          }, 80);
        });
        return wait(tok, 100);
      })
      .then(function () { return phaseBars(tok, 1); })
      .then(function () { return phaseStats(tok, VIEWS[1]); })
      .then(function () {
        startIdle(VIEWS[1].peakIndex);
        return wait(tok, 1200); // Phase 8 hold (30d view)
      })
      .then(function () {
        stopIdleClean();
        return animateToggle(tok, 0); // switch back to 90d
      })
      .then(function () {
        return phaseBarsExit(tok, 1); // slide right on exit
      })
      .then(function () {
        return tween(tok, 200, eOut, function (e) {
          statsBlock.style.opacity = 1 - e;
        });
      })
      .then(function () {
        if (tok.cancelled) return;
        // Phase 9 — loop reset: rebuild 90d and re-run chart phases
        renderDyn(0);
        return phaseAxis(tok);
      })
      .then(function () { return phaseBars(tok, 0); })
      .then(function () { return phaseStats(tok, VIEWS[0]); })
      .then(function () {
        startIdle(VIEWS[0].peakIndex);
        return wait(tok, 1700);
      })
      .then(function () {
        if (tok.cancelled) return;
        stopIdleClean();
        // Restart loop from 30d toggle (skip text + chart entrance)
        _tok = newToken();
        var t = _tok;
        animateToggle(t, 1)
          .then(function () { return phaseBarsExit(t, -1); })
          .then(function () {
            return tween(t, 200, eOut, function (e) { statsBlock.style.opacity = 1 - e; });
          })
          .then(function () {
            renderDyn(1);
            clipRect.setAttribute('width', '' + SVG_W);
            baseline.style.animation = 'mp-dash-travel 0.5s linear infinite';
            xlabelEls.forEach(function (l) {
              l.setAttribute('opacity', '0');
              setTimeout(function () { l.setAttribute('opacity', '0.5'); }, 80);
            });
            return wait(t, 100);
          })
          .then(function () { return phaseBars(t, 1); })
          .then(function () { return phaseStats(t, VIEWS[1]); })
          .then(function () {
            startIdle(VIEWS[1].peakIndex);
            return wait(t, 1200);
          })
          .then(function () {
            if (t.cancelled) return;
            stopIdleClean();
            // Full loop restart
            cancel();
            _tok = newToken();
            runLoop(_tok);
          });
      });
  }

  // ================================================================
  // STATIC FALLBACK
  // ================================================================
  function renderStatic() {
    buildSkeleton();
    renderDyn(0);
    clipRect.setAttribute('width', '' + SVG_W);
    barEls.forEach(function (b) { b.el.style.transform = 'scaleY(1)'; b.el.style.opacity = '1'; });
    peakGlow.setAttribute('opacity', '0.55');
    tooltipG.setAttribute('opacity', '1');
    tooltipStem.setAttribute('stroke-dashoffset', '0');
    xlabelEls.forEach(function (l) { l.setAttribute('opacity', '0.5'); });
  }

  // ================================================================
  // INTERSECTION OBSERVER
  // ================================================================
  if (prefersReduced || !('IntersectionObserver' in window)) {
    renderStatic();
    return;
  }

  var _active = false;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!_active) {
          _active = true;
          cancel();
          _tok = newToken();
          runLoop(_tok);
        }
      } else {
        _active = false;
        cancel();
        stopIdleClean();
        hardReset();
      }
    });
  }, { threshold: 0.3 });

  io.observe(card);
})();

/* ============================================================
   Smart Scoring — live AI scoring engine animation
   Self-contained. Drives #ssCard only. Scroll-triggered loop.
   ============================================================ */
(function () {
  'use strict';

  // ================================================================
  // TABS CONFIG — all data and SVG paths per scoring dimension
  // ================================================================
  var TABS = [
    {
      id: 'icp', label: 'ICP Fit',
      peakScore: 92, delta: '+8',
      color: '#9333EA',
      line: 'M0,82 C32,80 50,58 76,60 C104,62 115,80 144,82 C173,84 187,72 220,68 C252,64 270,40 299,38 C317,37 331,56 360,66',
      fill: 'M0,82 C32,80 50,58 76,60 C104,62 115,80 144,82 C173,84 187,72 220,68 C252,64 270,40 299,38 C317,37 331,56 360,66 L360,120 L0,120 Z'
    },
    {
      id: 'intent', label: 'Intent',
      peakScore: 87, delta: '+12',
      color: '#7C3AED',
      line: 'M0,70 C50,72 90,78 140,80 C175,82 205,74 240,65 C268,58 290,35 315,28 C335,24 350,32 360,36',
      fill: 'M0,70 C50,72 90,78 140,80 C175,82 205,74 240,65 C268,58 290,35 315,28 C335,24 350,32 360,36 L360,120 L0,120 Z'
    },
    {
      id: 'timing', label: 'Timing',
      peakScore: 79, delta: '+5',
      color: '#6366F1',
      line: 'M0,76 C70,76 140,74 200,73 C240,72 268,71 298,70 C318,70 334,42 348,15 C352,8 358,16 360,28',
      fill: 'M0,76 C70,76 140,74 200,73 C240,72 268,71 298,70 C318,70 334,42 348,15 C352,8 358,16 360,28 L360,120 L0,120 Z'
    }
  ];

  // ================================================================
  // INIT — element handles
  // ================================================================
  var card     = document.getElementById('ssCard');
  if (!card) return;
  var panel    = document.getElementById('ssPanel');
  var numEl    = document.getElementById('ssNum');
  var deltaEl  = document.getElementById('ssDelta');
  var sDNum    = document.getElementById('ssDNum');
  var rippleEl = document.getElementById('ssRipple');
  var svgEl    = document.getElementById('ssChartSvg');
  var refRect  = document.getElementById('ssRefRect');
  var refLine  = document.getElementById('ssRefLine');
  var fillPath = document.getElementById('ssFillPath');
  var linePath = document.getElementById('ssLinePath');
  var dotEl    = document.getElementById('ssDot');
  var fillStop = document.getElementById('ssFillStop');
  var pillsEl  = document.getElementById('ssPills');
  var pillEls  = pillsEl ? pillsEl.querySelectorAll('.ss-pill') : [];
  var indEl    = document.getElementById('ssInd');

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ================================================================
  // UTILS
  // ================================================================
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIn(t) { return t * t; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function hexToRgba(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  function lerpColor(fromHex, toHex, t) {
    var f = [parseInt(fromHex.slice(1,3),16), parseInt(fromHex.slice(3,5),16), parseInt(fromHex.slice(5,7),16)];
    var d = [parseInt(toHex.slice(1,3),16),   parseInt(toHex.slice(3,5),16),   parseInt(toHex.slice(5,7),16)];
    return 'rgb('+Math.round(lerp(f[0],d[0],t))+','+Math.round(lerp(f[1],d[1],t))+','+Math.round(lerp(f[2],d[2],t))+')';
  }

  // ================================================================
  // CANCELLABLE TOKEN
  // ================================================================
  var _tok = null;

  function newToken() { return { cancelled: false, timers: [] }; }

  function cancel() {
    if (_tok) { _tok.cancelled = true; _tok.timers.forEach(clearTimeout); }
    _tok = null;
  }

  function wait(tok, ms) {
    return new Promise(function (resolve) {
      if (tok.cancelled) { resolve(); return; }
      var t = setTimeout(resolve, ms);
      tok.timers.push(t);
    });
  }

  function frameLoop(tok, dur, fn) {
    return new Promise(function (resolve) {
      var start = performance.now();
      (function tick(now) {
        if (tok.cancelled) { resolve(); return; }
        var p = dur > 0 ? Math.min(1, (now - start) / dur) : 1;
        fn(p);
        if (p < 1) requestAnimationFrame(tick);
        else resolve();
      })(start);
    });
  }

  // ================================================================
  // STATE
  // ================================================================
  var _curTab  = 0;
  var _loopNum = 0;

  // ================================================================
  // HARD RESET — called on scroll-exit; zeros everything
  // ================================================================
  function hardReset() {
    var t0 = TABS[0];

    panel.style.cssText = 'opacity:0;transform:translateY(18px);transition:none;box-shadow:inset 0 0 40px rgba(147,51,234,0.08);';

    numEl.style.cssText = 'opacity:0;color:' + t0.color + ';';
    numEl.textContent = '' + t0.peakScore;
    numEl.classList.remove('ss-lock', 'ss-breathe');

    deltaEl.style.cssText = 'opacity:0;';
    sDNum.textContent = t0.delta;
    rippleEl.className = 'ss-ripple';

    svgEl.style.cssText = 'opacity:0;';
    refRect.setAttribute('width', '0');
    refLine.setAttribute('class', '');

    linePath.setAttribute('d', t0.line);
    linePath.setAttribute('stroke', t0.color);
    linePath.style.cssText = 'opacity:0;';

    fillPath.setAttribute('d', t0.fill);
    fillPath.style.opacity = '0';
    if (fillStop) {
      fillStop.setAttribute('stop-color', t0.color);
      fillStop.setAttribute('stop-opacity', '0.4');
    }

    dotEl.setAttribute('cx', '0');
    dotEl.setAttribute('cy', '82');
    dotEl.setAttribute('fill', t0.color);
    dotEl.setAttribute('r', '4');
    dotEl.style.cssText = 'opacity:0;filter:drop-shadow(0 0 4px ' + t0.color + ');';
    dotEl.classList.remove('ss-dot-pulse');

    pillsEl.style.cssText = 'opacity:0;transform:translateY(8px);transition:none;';
    pillEls.forEach(function (p) {
      p.classList.remove('active');
      p.style.cssText = '';
    });
    positionIndicator(0, false);
    indEl.style.backgroundColor = t0.color;

    _curTab  = 0;
    _loopNum = 0;
  }

  // ================================================================
  // INDICATOR POSITION
  // ================================================================
  function positionIndicator(tabIdx, animate) {
    var totalW = pillsEl.offsetWidth || 240;
    var pillW  = (totalW - 16) / 3;
    var tx     = tabIdx * (pillW + 8);
    indEl.style.transition = animate
      ? 'transform 300ms cubic-bezier(0.22,1,0.36,1), background-color 200ms ease, width 0ms'
      : 'none';
    indEl.style.width     = pillW + 'px';
    indEl.style.transform = 'translateX(' + tx + 'px)';
  }

  // ================================================================
  // ACTIVATE TAB PILL
  // ================================================================
  function activateTab(tabIdx, flash) {
    var tab = TABS[tabIdx];
    pillEls.forEach(function (p, i) {
      if (i === tabIdx) {
        p.classList.add('active');
        p.style.background   = hexToRgba(tab.color, flash ? 0.35 : 0.15);
        p.style.borderColor  = hexToRgba(tab.color, flash ? 0.6  : 0.3);
        if (flash) {
          setTimeout(function () {
            p.style.transition  = 'background 300ms ease, border-color 300ms ease, color 200ms ease';
            p.style.background  = hexToRgba(tab.color, 0.15);
            p.style.borderColor = hexToRgba(tab.color, 0.3);
          }, 60);
        }
      } else {
        p.classList.remove('active');
        p.style.transition  = 'background 200ms ease, border-color 200ms ease, color 200ms ease';
        p.style.background  = '';
        p.style.borderColor = '';
      }
    });
    positionIndicator(tabIdx, tabIdx !== _curTab);
    indEl.style.backgroundColor = tab.color;
    _curTab = tabIdx;
  }

  // ================================================================
  // DRAW LINE — hero animation; returns promise
  // ================================================================
  function drawLine(tok, tabIdx, dur, fromScore) {
    var tab        = TABS[tabIdx];
    var startScore = fromScore !== undefined ? fromScore : 0;
    var refFlashed = false;

    linePath.setAttribute('d', tab.line);
    linePath.setAttribute('stroke', tab.color);
    fillPath.setAttribute('d', tab.fill);
    if (fillStop) {
      fillStop.setAttribute('stop-color', tab.color);
    }
    dotEl.setAttribute('fill', tab.color);
    dotEl.style.filter = 'drop-shadow(0 0 5px ' + tab.color + ')';

    var len = linePath.getTotalLength() || 420;
    linePath.style.cssText = 'opacity:1;stroke-dasharray:' + len + ' ' + len + ';stroke-dashoffset:' + len + ';';
    fillPath.style.opacity = '0';
    dotEl.style.opacity    = '0';
    numEl.style.opacity    = '1';

    return frameLoop(tok, dur, function (p) {
      var e = easeOutCubic(p);

      // Line draws from left to right
      linePath.style.strokeDashoffset = len * (1 - e);

      // Glow dot tracks the tip of the visible line
      if (e > 0.02) {
        var pt = linePath.getPointAtLength(e * len);
        dotEl.setAttribute('cx', '' + pt.x);
        dotEl.setAttribute('cy', '' + pt.y);
        dotEl.style.opacity = '1';
      }

      // Fill fades in with 200ms delay
      var fillP = p > 200 / dur ? easeOutCubic((p - 200 / dur) / (1 - 200 / dur)) : 0;
      fillPath.style.opacity = fillP * 0.52;

      // Score counts up (synced to line progress)
      var scoreVal = Math.round(lerp(startScore, tab.peakScore, e));
      numEl.textContent = '' + scoreVal;
      numEl.style.color = lerpColor('#FFFFFF', tab.color, Math.min(1, e * 1.5));

      // Reference line flashes when score crosses ~75
      if (!refFlashed && scoreVal >= 74 && scoreVal <= 77) {
        refFlashed = true;
        refLine.classList.add('ss-ref-flash');
        setTimeout(function () { refLine.classList.remove('ss-ref-flash'); }, 420);
      }
    });
  }

  // ================================================================
  // SHOW DELTA BADGE
  // ================================================================
  function showDelta(tok, tab, fast) {
    sDNum.textContent = tab.delta;
    var dur = fast ? 260 : 380;

    deltaEl.style.transition = 'none';
    deltaEl.style.opacity    = '0';
    deltaEl.style.transform  = 'translateY(8px) scale(0.7)';

    return wait(tok, 16).then(function () {
      if (tok.cancelled) return;
      deltaEl.style.transition = 'opacity ' + dur + 'ms ease, transform ' + dur + 'ms cubic-bezier(0.34,1.56,0.64,1)';
      deltaEl.style.opacity    = '1';
      deltaEl.style.transform  = 'translateY(0) scale(1)';
      return wait(tok, dur);
    }).then(function () {
      if (tok.cancelled) return;
      // Score lock
      numEl.classList.add('ss-lock');
      var t1 = setTimeout(function () { numEl.classList.remove('ss-lock'); }, 260);
      if (_tok) _tok.timers.push(t1);
      // Ripple pulse
      rippleEl.classList.remove('ss-go');
      void rippleEl.offsetWidth;
      rippleEl.classList.add('ss-go');
      return wait(tok, 120);
    });
  }

  // ================================================================
  // SWITCH TAB
  // ================================================================
  function switchTab(tok, toIdx, startScore) {
    var toTab = TABS[toIdx];

    // Deactivate old pill immediately
    pillEls[_curTab].classList.remove('active');
    pillEls[_curTab].style.transition  = 'background 200ms ease, border-color 200ms ease';
    pillEls[_curTab].style.background  = '';
    pillEls[_curTab].style.borderColor = '';

    // Activate new pill with flash
    var newPill = pillEls[toIdx];
    newPill.classList.add('active');
    newPill.style.background  = hexToRgba(toTab.color, 0.38);
    newPill.style.borderColor = hexToRgba(toTab.color, 0.65);
    setTimeout(function () {
      if (!tok.cancelled) {
        newPill.style.transition  = 'background 300ms ease, border-color 300ms ease';
        newPill.style.background  = hexToRgba(toTab.color, 0.15);
        newPill.style.borderColor = hexToRgba(toTab.color, 0.3);
      }
    }, 60);

    // Slide indicator to new tab
    positionIndicator(toIdx, true);
    indEl.style.backgroundColor = toTab.color;

    // Score briefly desaturates; delta fades out
    numEl.style.transition  = 'color 200ms ease';
    numEl.style.color       = '#fff';
    deltaEl.style.transition = 'opacity 200ms ease';
    deltaEl.style.opacity   = '0';

    // Old curve + dot fade out
    var curFill = parseFloat(fillPath.style.opacity) || 0.52;
    return frameLoop(tok, 300, function (p) {
      var e = easeIn(p);
      linePath.style.opacity = '' + (1 - e);
      fillPath.style.opacity = '' + curFill * (1 - e);
      dotEl.style.opacity    = '' + (1 - e);
    }).then(function () {
      if (tok.cancelled) return;
      numEl.style.transition = '';
      _curTab = toIdx;
      return wait(tok, 150);
    }).then(function () {
      if (tok.cancelled) return;
      return drawLine(tok, toIdx, 1400, startScore);
    }).then(function () {
      if (tok.cancelled) return;
      return showDelta(tok, toTab, true);
    });
  }

  // ================================================================
  // IDLE MICRO-ANIMATIONS
  // ================================================================
  function startIdle() {
    dotEl.classList.add('ss-dot-pulse');
    numEl.classList.add('ss-breathe');
  }
  function stopIdle() {
    dotEl.classList.remove('ss-dot-pulse');
    numEl.classList.remove('ss-breathe');
  }

  // ================================================================
  // MAIN LOOP
  // ================================================================
  function runLoop(tok) {
    var isFirst = (_loopNum === 0);
    _loopNum++;

    var p = Promise.resolve();

    // Phase 2 — panel entrance (first scroll-in only)
    if (isFirst) {
      p = p.then(function () {
        if (tok.cancelled) return;
        void panel.offsetHeight;
        panel.style.transition = 'opacity 520ms cubic-bezier(0.22,1,0.36,1), transform 520ms cubic-bezier(0.22,1,0.36,1)';
        panel.style.opacity    = '1';
        panel.style.transform  = 'translateY(0)';
        return wait(tok, 420);
      });
    }

    // Phase 3 — SVG visible + ref line draws in
    p = p.then(function () {
      if (tok.cancelled) return;
      svgEl.style.transition = 'opacity 300ms ease';
      svgEl.style.opacity    = '1';
      return frameLoop(tok, 600, function (prog) {
        refRect.setAttribute('width', '' + Math.round(easeOutCubic(prog) * 360));
      });
    }).then(function () {
      if (tok.cancelled) return;
      refLine.classList.add('ss-ref-travel');
    });

    // Phase 4 — line draws in (hero)
    p = p.then(function () {
      if (tok.cancelled) return;
      return wait(tok, 80);
    }).then(function () {
      if (tok.cancelled) return;
      return drawLine(tok, 0, 1800, 0);
    });

    // Phase 5 — delta badge lands
    p = p.then(function () {
      if (tok.cancelled) return;
      return showDelta(tok, TABS[0], false);
    });

    // Phase 6 — tab row appears; ICP Fit active
    p = p.then(function () {
      if (tok.cancelled) return;
      return wait(tok, 100);
    }).then(function () {
      if (tok.cancelled) return;
      pillsEl.style.transition = 'opacity 350ms ease, transform 350ms ease';
      pillsEl.style.opacity    = '1';
      pillsEl.style.transform  = 'translateY(0)';
      // Re-position indicator now that layout is known
      positionIndicator(0, false);
      activateTab(0, false);
      return wait(tok, 380);
    });

    // Phase 7 — hold on ICP Fit
    p = p.then(function () {
      if (tok.cancelled) return;
      startIdle();
      return wait(tok, 1800);
    });

    // Phase 8 — switch to Intent
    p = p.then(function () {
      if (tok.cancelled) return;
      stopIdle();
      return switchTab(tok, 1, 62);
    });

    // Phase 9 — hold on Intent
    p = p.then(function () {
      if (tok.cancelled) return;
      startIdle();
      return wait(tok, 1500);
    });

    // Phase 10 — switch to Timing
    p = p.then(function () {
      if (tok.cancelled) return;
      stopIdle();
      return switchTab(tok, 2, 58);
    });

    // Phase 11 — hold on Timing
    p = p.then(function () {
      if (tok.cancelled) return;
      startIdle();
      return wait(tok, 1500);
    });

    // Phase 12 — loop reset: Timing out, ICP Fit redraws
    p = p.then(function () {
      if (tok.cancelled) return;
      stopIdle();

      // Deactivate Timing; reactivate ICP Fit with flash
      pillEls[2].classList.remove('active');
      pillEls[2].style.transition  = 'background 200ms ease, border-color 200ms ease';
      pillEls[2].style.background  = '';
      pillEls[2].style.borderColor = '';
      activateTab(0, true);

      numEl.style.transition  = 'color 200ms ease';
      numEl.style.color       = '#fff';
      deltaEl.style.transition = 'opacity 150ms ease';
      deltaEl.style.opacity   = '0';

      var curFill = parseFloat(fillPath.style.opacity) || 0.52;
      return frameLoop(tok, 300, function (pr) {
        var e = easeIn(pr);
        linePath.style.opacity = '' + (1 - e);
        fillPath.style.opacity = '' + curFill * (1 - e);
        dotEl.style.opacity    = '' + (1 - e);
      });
    }).then(function () {
      if (tok.cancelled) return;
      numEl.style.transition = '';
      return wait(tok, 150);
    }).then(function () {
      if (tok.cancelled) return;
      return drawLine(tok, 0, 1800, 62);
    }).then(function () {
      if (tok.cancelled) return;
      return showDelta(tok, TABS[0], false);
    }).then(function () {
      if (tok.cancelled) return;
      startIdle();
      return wait(tok, 800);
    }).then(function () {
      if (tok.cancelled) return;
      stopIdle();
      cancel();
      _tok = newToken();
      runLoop(_tok);
    });
  }

  // ================================================================
  // STATIC FALLBACK (reduced motion / no IO support)
  // ================================================================
  function renderStatic() {
    var t0 = TABS[0];
    panel.style.cssText = '';
    svgEl.style.opacity = '1';
    refRect.setAttribute('width', '360');
    linePath.style.cssText = 'opacity:1;';
    fillPath.style.opacity = '0.52';
    dotEl.style.opacity    = '0';
    numEl.style.opacity    = '1';
    numEl.style.color      = t0.color;
    deltaEl.style.opacity  = '1';
    deltaEl.style.transform = '';
    pillsEl.style.cssText  = '';
    activateTab(0, false);
  }

  // ================================================================
  // INTERSECTION OBSERVER
  // ================================================================
  if (prefersReduced || !('IntersectionObserver' in window)) {
    renderStatic();
    return;
  }

  hardReset();

  var _active = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!_active) {
          _active = true;
          _tok = newToken();
          runLoop(_tok);
        }
      } else {
        if (_active) {
          _active = false;
          cancel();
          hardReset();
        }
      }
    });
  }, { threshold: 0.4 });

  io.observe(card);
})();
  }, []);

  return null;
}
