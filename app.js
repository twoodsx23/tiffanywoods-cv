(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const chevron = '<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- Header ---------- */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const menuBtn = $('.menu-btn'), mnav = $('#mobile-nav');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    menuBtn.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    mnav.hidden = open;
  });
  $$('#mobile-nav a').forEach((a) => a.addEventListener('click', () => { mnav.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }));

  // active nav
  const navLinks = $$('.nav-links a');
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['fit', 'work', 'kit', 'experience', 'skills'].forEach((id) => { const el = document.getElementById(id); el && secObs.observe(el); });

  /* ---------- Tabs (generic) ---------- */
  function setupTabs(list) {
    const tabs = $$('[role=tab]', list);
    const activate = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => activate(t));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
          activate(n, true);
        }
      });
    });
  }
  $$('[role=tablist]').forEach(setupTabs);

  /* ---------- Fit check ---------- */
  const out = $('#fit-output');
  const reFor = (kw) => {
    const k = kw.trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return kw.trim().length <= 4 ? new RegExp('(^|[^a-z0-9])' + k + '(?![a-z0-9])', 'gi') : new RegExp('(^|[^a-z0-9])' + k, 'gi');
  };
  function scan(text) {
    const t = ' ' + text.toLowerCase() + ' ';
    const res = PF.competencies.map((c) => {
      let hits = 0; const terms = [];
      c.kw.forEach((kw) => { const m = t.match(reFor(kw)); if (m) { hits += m.length; terms.push(kw.trim()); } });
      return { c, hits, terms };
    }).filter((r) => r.hits > 0).sort((a, b) => b.hits - a.hits);
    const gaps = PF.gaps.filter((g) => g.kw.some((kw) => reFor(kw).test(t)));
    return { res, gaps };
  }
  function ring(pct) {
    const r = 40, C = 2 * Math.PI * r, off = C * (1 - pct);
    return `<svg width="92" height="92" viewBox="0 0 92 92" aria-hidden="true"><circle cx="46" cy="46" r="${r}" fill="none" stroke="var(--color-offset)" stroke-width="8"/><circle cx="46" cy="46" r="${r}" fill="none" stroke="var(--color-pass)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="transition:stroke-dashoffset .9s cubic-bezier(.16,1,.3,1)" data-off="${off}"/></svg>`;
  }
  function renderFit(res, gaps, mode) {
    if (!res.length && !gaps.length) {
      out.innerHTML = `<div class="fit-empty"><p class="mono">No themes found</p><p>Try pasting the full responsibilities and requirements, or pick requirements instead.</p></div>`;
      return;
    }
    const total = res.length + gaps.length;
    const pct = total ? res.length / total : 0;
    const headline = pct >= 0.85 ? 'Strong overlap with work I\u2019ve already done' : pct >= 0.6 ? 'Solid overlap, with a few things to discuss' : 'Partial overlap';
    const items = res.map((r, i) => `
      <details class="match" ${i < 2 ? 'open' : ''}>
        <summary><span class="dot"></span><span class="match-name">${esc(r.c.label)}</span>${mode === 'jd' ? `<span class="match-hits">${r.hits} mention${r.hits > 1 ? 's' : ''}</span>` : ''}${chevron}</summary>
        <ul role="list">${r.c.evidence.map((e) => `<li><b>${esc(e[0])}.</b> ${esc(e[1])}</li>`).join('')}</ul>
        ${mode === 'jd' ? `<p class="terms">Matched: ${r.terms.slice(0, 6).map(esc).join(', ')}</p>` : ''}
      </details>`).join('');
    const gapItems = gaps.map((g) => `
      <details class="match gap"><summary><span class="dot"></span><span class="match-name">${esc(g.label)}</span>${chevron}</summary><ul role="list"><li>${esc(g.note)}</li></ul></details>`).join('');
    out.innerHTML = `
      <div class="fit-summary">
        <div class="ring">${ring(pct)}<div class="ring-val">${res.length}/${total}<small>themes</small></div></div>
        <div><h3>${headline}</h3><p>${res.length} of ${total} requirement themes ${mode === 'jd' ? 'in this posting' : 'you selected'} have direct evidence.${gaps.length ? ` ${gaps.length} worth discussing.` : ''}</p></div>
      </div>
      <div class="match-list">
        ${res.length ? `<p class="mono group-label" style="margin-top:0">Direct evidence</p>${items}` : ''}
        ${gaps.length ? `<p class="mono group-label">Worth discussing</p>${gapItems}` : ''}
      </div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { const c = $('circle[data-off]', out); if (c) c.style.strokeDashoffset = c.dataset.off; }));
  }
  $('#run-fit').addEventListener('click', () => {
    const v = $('#jd').value.trim();
    if (!v) { $('#jd').focus(); out.innerHTML = `<div class="fit-empty"><p class="mono">Nothing to check yet</p><p>Paste a job description, or try the sample posting.</p></div>`; return; }
    const { res, gaps } = scan(v); renderFit(res, gaps, 'jd');
  });
  $('#sample-jd').addEventListener('click', () => { $('#jd').value = PF.sampleJD; $('#run-fit').click(); });
  $('#clear-jd').addEventListener('click', () => { $('#jd').value = ''; out.innerHTML = `<div class="fit-empty"><p class="mono">Waiting for a role</p><p>Results show each requirement theme found, the strongest evidence behind it, and where the experience comes from.</p></div>`; });

  // pick mode
  const pickWrap = $('#pick-chips');
  const pickItems = PF.competencies.map((c) => ({ type: 'c', id: c.id, label: c.label })).concat(PF.gaps.slice(0, 3).map((g, i) => ({ type: 'g', id: 'g' + i, label: g.label })));
  pickWrap.innerHTML = pickItems.map((p) => `<button type="button" class="chip" data-type="${p.type}" data-id="${p.id}" aria-pressed="false">${esc(p.label)}</button>`).join('');
  pickWrap.addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
    const on = $$('.chip[aria-pressed=true]', pickWrap);
    if (!on.length) { $('#clear-jd').click(); return; }
    const res = on.filter((x) => x.dataset.type === 'c').map((x) => ({ c: PF.competencies.find((c) => c.id === x.dataset.id), hits: 1, terms: [] }));
    const gaps = on.filter((x) => x.dataset.type === 'g').map((x) => PF.gaps[+x.dataset.id.slice(1)]);
    renderFit(res, gaps, 'pick');
  });

  /* ---------- Config flow ---------- */
  const flows = {
    today: { steps: ['Request', 'Spec & story', 'Dev sprint', 'QA', 'Release window', 'Production'], note: 'Weeks per change. Every update queues behind scheduled releases and engineering capacity.' },
    tomorrow: { steps: ['Edit in Admin', 'Auto-validate', 'Re-rate sample', 'Publish to Test', 'UAT sign-off', 'Promote to Prod'], note: 'Goal: days, on the business\u2019s own clock. No code deploy for routine configuration; every change versioned, approved and reversible.' }
  };
  const flowEl = $('#flow'), noteEl = $('#flow-note');
  function renderFlow(k) {
    const f = flows[k];
    flowEl.className = 'flow ' + k;
    flowEl.innerHTML = f.steps.map((s, i) => `<li><span class="step" style="animation-delay:${i * 60}ms">${s}</span>${i < f.steps.length - 1 ? '<span class="arrow" aria-hidden="true">→</span>' : ''}</li>`).join('');
    noteEl.textContent = f.note;
  }
  $$('[data-flow]').forEach((b) => b.addEventListener('click', () => {
    $$('[data-flow]').forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    renderFlow(b.dataset.flow);
  }));
  renderFlow('today');

  /* ---------- GTM bars ---------- */


  /* ---------- Triage dots ---------- */
  $('#triage-dots').innerHTML = Array.from({ length: 13 }, (_, i) => `<i style="transition-delay:${i * 55}ms"></i>`).join('');

  /* ---------- Roadmap chain ---------- */
  const chain = $('#chain');
  chain.innerHTML = PF.chain.map((n) => `<button class="node" role="listitem" data-id="${n.id}" aria-pressed="false"><span class="mono">${n.stage}</span><strong>${esc(n.title)}</strong><span class="body">${esc(n.body)}</span></button>`).join('');
  // order: lever (col1, span2), o1, s1, unlock (col4), o2, s2
  const order = { lever: 1, o1: 2, s1: 3, unlock: 4, o2: 5, s2: 6 };
  $$('.node', chain).forEach((el) => { el.style.order = order[el.dataset.id]; });
  let sel = null;
  chain.addEventListener('click', (e) => {
    const b = e.target.closest('.node'); if (!b) return;
    const id = b.dataset.id;
    sel = sel === id ? null : id;
    const n = PF.chain.find((x) => x.id === sel);
    $$('.node', chain).forEach((el) => {
      const on = sel && (el.dataset.id === sel || n.links.includes(el.dataset.id));
      el.classList.toggle('on', !!sel && el.dataset.id === sel);
      el.classList.toggle('dim', !!sel && !on);
      el.setAttribute('aria-pressed', String(el.dataset.id === sel));
    });
  });

  /* ---------- Eval set ---------- */
  const state = PF.evals.map(() => true);
  let filter = 'All';
  const cats = ['All', 'Happy path', 'Edge case', 'Compliance', 'Adversarial', 'Regression'];
  $('#eval-filters').innerHTML = cats.map((c) => `<button type="button" class="chip" data-cat="${c}" aria-pressed="${c === 'All'}">${c}${c === 'All' ? '' : ' · ' + PF.evals.filter((e) => e[1] === c).length}</button>`).join('');
  $('#eval-filters').addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    filter = b.dataset.cat;
    $$('#eval-filters .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderEval();
  });
  function renderEval() {
    $('#eval-body').innerHTML = PF.evals.map((e, i) => (filter === 'All' || e[1] === filter) ? `
      <tr class="${state[i] ? '' : 'failing'}">
        <td>${e[0]}</td>
        <td>${esc(e[2])}<small>${esc(e[1])}</small></td>
        <td>${esc(e[3])}</td>
        <td>${esc(e[4])}</td>
        <td><span class="sev ${e[5]}">${e[5]}</span></td>
        <td><button class="toggle" data-i="${i}" aria-pressed="${state[i]}" aria-label="${e[0]} result: ${state[i] ? 'passing' : 'failing'}. Toggle.">${state[i] ? 'Pass' : 'Fail'}</button></td>
      </tr>` : '').join('');
    renderGate();
  }
  function renderGate() {
    const groups = { Critical: [], High: [], Low: [] };
    PF.evals.forEach((e, i) => { const k = e[5] === 'Critical' ? 'Critical' : e[5] === 'High' ? 'High' : 'Low'; groups[k].push(state[i]); });
    const rate = (a) => a.filter(Boolean).length / a.length;
    const overall = rate(state);
    const c = rate(groups.Critical), h = rate(groups.High), l = rate(groups.Low);
    const reasons = [];
    if (c < 1) reasons.push('A critical case failed. Any single critical failure blocks release.');
    if (h < 0.95) reasons.push('High-severity pass rate is under 95%. Fix before pilot.');
    if (overall < 0.95) reasons.push('Overall pass rate is under the 95% pilot bar.');
    const go = reasons.length === 0;
    const lowNote = l < 0.9 ? 'Medium/low under 90%: tracked, not blocking alone.' : '';
    const pctTxt = (v) => Math.round(v * 100) + '%';
    const gate = $('#gate');
    gate.classList.toggle('nogo', !go);
    gate.innerHTML = `
      <div class="gate-verdict"><span class="mono">Release gate</span><strong>${go ? 'Go' : 'No-Go'}</strong></div>
      <div class="gate-rows">
        <div><span>Critical (must be 100%)</span><span class="${c < 1 ? 'bad' : ''}">${groups.Critical.filter(Boolean).length}/${groups.Critical.length} · ${pctTxt(c)}</span></div>
        <div><span>High (≥ 95%)</span><span class="${h < 0.95 ? 'bad' : ''}">${groups.High.filter(Boolean).length}/${groups.High.length} · ${pctTxt(h)}</span></div>
        <div><span>Medium &amp; low (≥ 90%)</span><span>${groups.Low.filter(Boolean).length}/${groups.Low.length} · ${pctTxt(l)}</span></div>
        <div><span>Overall (≥ 95%)</span><span class="${overall < 0.95 ? 'bad' : ''}">${pctTxt(overall)}</span></div>
      </div>
      <p class="gate-reason">${go ? (lowNote || 'All gates met. Remaining pilot checks: compliance sign-off, rollback test, trained staff, named queue owner.') : esc(reasons[0])}</p>`;
  }
  $('#eval-body').addEventListener('click', (e) => {
    const b = e.target.closest('.toggle'); if (!b) return;
    const i = +b.dataset.i; state[i] = !state[i]; renderEval();
    const nb = $(`.toggle[data-i="${i}"]`); nb && nb.focus();
  });
  $('#eval-reset').addEventListener('click', () => { state.fill(true); renderEval(); });
  $('#eval-sim').addEventListener('click', () => {
    state.fill(true);
    // a plausible bad build: fills a missing rating field, misses a USDOT conflict, over-trusts a poor scan
    ['EV-15', 'EV-10', 'EV-14'].forEach((id) => { state[PF.evals.findIndex((e) => e[0] === id)] = false; });
    filter = 'All'; $$('#eval-filters .chip').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.cat === 'All')));
    renderEval();
  });
  renderEval();

  /* ---------- Impact model ---------- */
  let roi = Object.assign({}, PF.roiPresets.base);
  const QA_MIN = 3;
  const money = (v) => { const a = Math.abs(v); const s = a >= 1e6 ? '$' + (a / 1e6).toFixed(2) + 'M' : '$' + (a / 1e3).toFixed(1) + 'K'; return (v < 0 ? '−' : '') + s; };
  function calc(p) {
    const autoN = p.vol * p.auto / 100, routed = p.vol - autoN;
    const before = p.vol * p.base / 60;
    const after = (autoN * (p.qa / 100) * QA_MIN + routed * p.assist) / 60;
    const savedYr = (before - after) * 12;
    const labor = savedYr * p.cost;
    const errors = Math.max(0, p.vol * 12 * (p.errB - p.errA) / 100);
    const rework = errors * p.rework / 60 * p.cost;
    const value = labor + rework;
    const net = value - p.build * 1000;
    const perEnd = value / (p.vol * 12);
    const breakeven = perEnd > 0 ? (p.build * 1000) / perEnd / 12 : Infinity;
    const payback = value > 0 ? (p.build * 1000) / (value / 12) : Infinity;
    return { before, after, savedYr, labor, errors, rework, value, net, perEnd, breakeven, payback };
  }
  const sliders = $('#roi-sliders');
  sliders.innerHTML = PF.roiFields.map((f) => `<div class="slider"><label for="r-${f.k}"><span>${f.label}</span><output id="o-${f.k}" for="r-${f.k}"></output></label><input type="range" id="r-${f.k}" data-k="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" /></div>`).join('');
  function syncSliders() { PF.roiFields.forEach((f) => { $('#r-' + f.k).value = roi[f.k]; $('#o-' + f.k).textContent = f.fmt(roi[f.k]); }); }
  function renderRoi() {
    const r = calc(roi);
    const net = $('#roi-net');
    net.textContent = (r.net >= 0 ? '+' : '') + money(r.net);
    net.className = 'roi-net ' + (r.net >= 0 ? 'pos' : 'neg');
    $('#roi-pay').textContent = isFinite(r.payback) ? `Payback in about ${r.payback < 10 ? r.payback.toFixed(1) : Math.round(r.payback)} months · total annual value ${money(r.value)}` : 'No payback at these assumptions';
    $('#roi-grid').innerHTML = [
      ['Hours / month, before → after', `${Math.round(r.before).toLocaleString()} → ${Math.round(r.after).toLocaleString()}`],
      ['Hours saved / year', Math.round(r.savedYr).toLocaleString()],
      ['Labor value', money(r.labor)],
      ['Errors avoided / year', Math.round(r.errors).toLocaleString()],
      ['Rework value', money(r.rework)],
      ['Value per submission', '$' + r.perEnd.toFixed(2)]
    ].map((x) => `<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join('');
    const max = Math.max(roi.vol, isFinite(r.breakeven) ? r.breakeven : 0) * 1.25 || 1;
    const be = isFinite(r.breakeven) ? Math.round(r.breakeven / 10) * 10 : null;
    $('#breakeven').innerHTML = `
      <p class="mono" style="color:var(--color-text-muted)">Break-even volume</p>
      <div class="be-track"><div class="be-fill" style="width:${(roi.vol / max) * 100}%"></div>${be ? `<div class="be-mark" style="left:${Math.min(99, (be / max) * 100)}%"><span>${be.toLocaleString()}/mo</span></div>` : ''}</div>
      <div class="be-legend"><span>0</span><span>Your volume: ${roi.vol.toLocaleString()}/mo</span></div>
      <p class="be-text">${be ? (roi.vol >= be ? `Volume clears break-even by ${(roi.vol - be).toLocaleString()} submissions a month.` : `Volume is ${(be - roi.vol).toLocaleString()} a month short of break-even. That's a reason to scope smaller, not to fudge the inputs.`) : 'These inputs never break even.'}</p>`;
  }
  sliders.addEventListener('input', (e) => {
    const k = e.target.dataset.k; if (!k) return;
    roi[k] = parseFloat(e.target.value);
    $('#o-' + k).textContent = PF.roiFields.find((f) => f.k === k).fmt(roi[k]);
    $$('#roi-presets .seg-btn').forEach((x) => { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
    renderRoi();
  });
  $('#roi-presets').addEventListener('click', (e) => {
    const b = e.target.closest('.seg-btn'); if (!b) return;
    roi = Object.assign({}, PF.roiPresets[b.dataset.preset]);
    $$('#roi-presets .seg-btn').forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    syncSliders(); renderRoi();
  });
  syncSliders(); renderRoi();

  /* ---------- Adapt ---------- */
  $('#adapt').innerHTML = PF.adapt.map((a) => `<div class="adapt-row"><div><span class="mono">Lane</span><strong>${esc(a.lane)}</strong></div><div><span class="mono">PRD workflow</span><p>${esc(a.workflow)}</p></div><div><span class="mono">Eval focus</span><p>${esc(a.tests)}</p></div><div><span class="mono">Impact drivers</span><p>${esc(a.impact)}</p></div></div>`).join('');

  /* ---------- Experience ---------- */
  const inds = ['All', 'Insurance', 'Healthcare', 'Benefits SaaS', 'Telecom & media'];
  $('#exp-filters').innerHTML = inds.map((c) => `<button type="button" class="chip" data-ind="${c}" aria-pressed="${c === 'All'}">${c}</button>`).join('');
  $('#exp-list').innerHTML = PF.experience.map((x, i) => `
    <li class="exp-item" data-ind="${x.industry}">
      <div class="exp-when">${x.dates}<br><span class="ind">${x.industry}</span></div>
      <div>
        <button class="exp-head" aria-expanded="${i === 0}" aria-controls="exp-${i}">
          <div><h3>${esc(x.role)}</h3><p>${esc(x.org)}${x.via ? ' · ' + esc(x.via) : ''}${x.context ? ' · ' + esc(x.context) : ''}</p></div>
          <span class="plus" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></span>
        </button>
        <div class="exp-body" id="exp-${i}"><div><ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div></div>
      </div>
    </li>`).join('');
  $('#exp-list').addEventListener('click', (e) => {
    const b = e.target.closest('.exp-head'); if (!b) return;
    b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'));
  });
  $('#exp-filters').addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    const ind = b.dataset.ind;
    $$('#exp-filters .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('.exp-item').forEach((li) => { li.hidden = !(ind === 'All' || li.dataset.ind === ind); });
  });

  /* ---------- Skills ---------- */
  const groups = {};
  PF.competencies.forEach((c) => { (groups[c.group] = groups[c.group] || []).push(c); });
  const gOrder = ['Product strategy & execution', 'Leadership & governance', 'Technical & data fluency', 'Domain', 'Methods & tooling'];
  $('#skill-groups').innerHTML = gOrder.filter((g) => groups[g]).map((g) => `<div class="skill-group"><h3>${g}</h3>${groups[g].map((c) => `<button class="skill-btn" data-id="${c.id}" aria-pressed="false">${esc(c.label)} <em>${c.evidence.length}</em></button>`).join('')}</div>`).join('');
  function showSkill(id) {
    const c = PF.competencies.find((x) => x.id === id);
    $$('.skill-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
    $('#skill-detail').innerHTML = `<p class="mono" style="color:var(--color-text-muted)">${esc(c.group)}</p><h3>${esc(c.label)}</h3><ul role="list">${c.evidence.map((e) => `<li><span class="mono">${esc(e[0])}</span>${esc(e[1])}</li>`).join('')}</ul>`;
  }
  $('#skill-groups').addEventListener('click', (e) => { const b = e.target.closest('.skill-btn'); if (b) showSkill(b.dataset.id); });
  showSkill('modern');

  /* ---------- Reveal + animated widgets ---------- */
  const revealTargets = $$('.case, .win, .creds > div, .principles li, .exp-item, .adapt-row');
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach((el) => io.observe(el));
  const widgetIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      if (e.target.id === 'gtm-bars') $$('.bar-fill', e.target).forEach((b) => { b.style.width = b.dataset.w + '%'; });
      if (e.target.id === 'triage-dots') e.target.classList.add('in');
      widgetIO.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  widgetIO.observe($('#triage-dots'));
})();
(function () {
  /* ---------- Back to top (wordmark + footer link) ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#top"]'); if (!a) return;
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  });
})();
