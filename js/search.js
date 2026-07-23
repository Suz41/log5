window.Logit = window.Logit || {};

Logit.Search = {
  cache: {},
  _lastRequest: 0,
  _MIN_INTERVAL: 300, // 300ms between requests

  /** @param {string} url @param {number} retries @returns {Promise<Object|null>} */
  async tmdb(url, retries = 2) {
    if (this.cache[url]) return this.cache[url];

    // Rate limit: wait if too soon
    const now = Date.now();
    const wait = this._MIN_INTERVAL - (now - this._lastRequest);
    if (wait > 0) await new Promise(resolve => setTimeout(resolve, wait));
    this._lastRequest = Date.now();

    for (let i = 0; i <= retries; i++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const r = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!r.ok) return null;
        const data = await r.json();
        this.cache[url] = data;
        return data;
      } catch (e) {
        console.error('TMDB fetch attempt ' + (i + 1) + ' failed:', e);
        if (i < retries) await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    return null;
  },

  /** @param {Array} moviesList @param {string} query @returns {Array|null} */
  filterLibrary(moviesList, query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return moviesList.filter(function(m) {
      return (m.t || '').toLowerCase().indexOf(q) !== -1;
    });
  }
};
