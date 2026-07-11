window.Logit = window.Logit || {};

Logit.Search = {
  cache: {},

  /** @param {string} url @returns {Promise<Object|null>} */
  async tmdb(url) {
    if (this.cache[url]) return this.cache[url];
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      const data = await r.json();
      this.cache[url] = data;
      return data;
    } catch (e) {
      console.error('TMDB fetch failed:', e);
      return null;
    }
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
