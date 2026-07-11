window.Logit = window.Logit || {};

Logit.Config = {
  /** @returns {string} */
  getApiKey() {
    return localStorage.getItem('tmdb_key') || '';
  },

  /** @param {string} key */
  setApiKey(key) {
    if (key === null) return;
    key = key.trim();
    if (key) {
      localStorage.setItem('tmdb_key', key);
    } else {
      localStorage.removeItem('tmdb_key');
    }
  }
};
