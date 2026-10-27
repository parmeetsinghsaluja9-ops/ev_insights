/* Renders: KPI cards, preview charts (CSS bars, NOT Tableau), embeds, dictionary. No dependencies. */
(function () {
  'use strict';
  var D = window.SITE_DATA, C = globalThis.PROJECT_CONFIG || {}, U = globalThis.EmbedUtils;
  var $ = function (s) { return document.querySelector(s); };
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  // ---- Embeds with graceful placeholder / error states
  function embed(hostId, url, height, title, label) {
    var host = $(hostId); if (!host) return;
    host.textContent = '';
    if (!U.isPublishedUrl(url)) {
      var box = el('div', 'notice');
      box.setAttribute('role', 'status');
      box.appendChild(el('strong', null, label + ' not published yet'));
      box.appendChild(el('p', null, 'This project has not yet been published to Tableau Public, so nothing is embedded here. After publishing, set the URL in assets/js/config.js (see tableau/publishing_checklist.md).'));
      host.appendChild(box); return;
    }
    var wrap = el('div', 'embed');
    var f = document.createElement('iframe');
    f.src = U.embedSrc(url); f.title = title; f.loading = 'lazy'; f.style.height = height + 'px';
    f.setAttribute('allowfullscreen', '');
    var fallback = el('p', 'muted');
    var a = el('a', null, 'Open ' + label.toLowerCase() + ' on Tableau Public'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    fallback.appendChild(document.createTextNode('If the embed does not load: ')); fallback.appendChild(a);
    wrap.appendChild(f); host.appendChild(wrap); host.appendChild(fallback);
  }
  embed('#dashboard-embed', C.dashboardUrl, C.dashboardHeight || 900, 'Superstore sales and profitability dashboard', 'Dashboard');
  embed('#story-embed', C.storyUrl, C.storyHeight || 850, 'Superstore data story', 'Story');

  if (!D) { var err = el('div', 'notice', 'Data file assets/js/data.js is missing. Run: npm run build'); err.setAttribute('role', 'alert'); $('#findings').prepend(err); return; }

  // ---- KPIs
  var k = D.kpis, kp = $('#kpis');
  [['Total sales', U.fmtMoney(k.totalSales)], ['Total profit', U.fmtMoney(k.totalProfit)], ['Profit margin', (k.margin * 100).toFixed(1) + '%'],
   ['Orders', k.orders.toLocaleString('en-US')], ['Loss-making lines', (k.lossLineShare * 100).toFixed(1) + '%']].forEach(function (x) {
    var c = el('div', 'kpi'); c.appendChild(el('div', 'kpi-v', x[1])); c.appendChild(el('div', 'kpi-l', x[0])); kp.appendChild(c);
  });

  // ---- Preview charts (accessible: each bar has a text value)
  function bars(hostId, items, field, fmt) {
    var host = $(hostId); if (!host) return;
    var max = Math.max.apply(null, items.map(function (i) { return Math.abs(i[field]); })) || 1;
    var ul = el('ul', 'bars'); ul.setAttribute('role', 'list');
    items.forEach(function (i) {
      var li = el('li'); li.appendChild(el('span', 'bl', i.key));
      var track = el('span', 'track'), bar = el('span', 'bar' + (i[field] < 0 ? ' neg' : ''));
      bar.style.width = (Math.abs(i[field]) / max * 100).toFixed(1) + '%'; track.appendChild(bar); li.appendChild(track);
      li.appendChild(el('span', 'bv', fmt(i[field]))); ul.appendChild(li);
    });
    host.appendChild(ul);
  }
  var pct = function (v) { return (v * 100).toFixed(1) + '%'; };
  bars('#chart-year', D.byYear, 'sales', U.fmtMoney);
  bars('#chart-category', D.byCategory, 'margin', pct);
  bars('#chart-sub', D.bySubCategory.slice().sort(function (a, b) { return a.profit - b.profit; }).slice(0, 6), 'profit', U.fmtMoney);
  bars('#chart-ship', D.byShipMode, 'margin', pct);
  bars('#chart-discount', D.byDiscountBand.filter(function (b) { return b.lines > 20; }), 'margin', pct);
  bars('#chart-region', D.byRegion, 'margin', pct);

  // ---- Data dictionary + quality
  var tb = $('#dict-body');
  D.dictionary.forEach(function (r) { var tr = el('tr'); [r[0], r[2], r[3], r[4]].forEach(function (t) { tr.appendChild(el('td', null, t)); }); tb.appendChild(tr); });
  $('#quality').textContent = D.quality.rows.toLocaleString('en-US') + ' rows loaded, ' + D.quality.dropped + ' dropped; order dates ' + D.quality.dateRange[0] + ' to ' + D.quality.dateRange[1] + '.';
  $('#year').textContent = new Date().getFullYear();
})();
