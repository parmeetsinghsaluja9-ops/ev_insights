/* Pure helpers (testable in Node and usable in the browser). */
globalThis.EmbedUtils = {
  isPublishedUrl(url) {
    if (typeof url !== 'string') return false;
    if (/placeholder/i.test(url)) return false;
    try {
      const u = new URL(url.trim());
      return u.protocol === 'https:' && u.hostname === 'public.tableau.com' && u.pathname.length > 1;
    } catch { return false; }
  },
  embedSrc(url) {
    const u = new URL(url.trim());
    u.search = '';
    u.hash = '';
    return `${u.toString()}?:showVizHome=no&:embed=true&:toolbar=yes`;
  },
  fmtMoney(n) {
    const a = Math.abs(n), s = n < 0 ? '-' : '';
    return a >= 1e6 ? `${s}${(a / 1e6).toFixed(2)}M` : a >= 1e3 ? `${s}${(a / 1e3).toFixed(0)}K` : `${s}${a.toFixed(0)}`;
  },
};
