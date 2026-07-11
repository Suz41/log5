window.Logit = window.Logit || {};

Logit.MovieFactory = {
  /** @param {Object} d TMDB movie detail @param {string} rating @param {string} watchType @param {string} watchDate @returns {Object} */
  fromTMDB(d, rating, watchType, watchDate) {
    return {
      id: crypto.randomUUID(),
      tmdb_id: String(d.id || ''),
      imdb_id: d.imdb_id || '',
      t: d.title || '',
      yr: (d.release_date || '').slice(0, 4),
      rt: d.runtime || 0,
      g: (d.genres || []).map(function(x) { return x.name; }).join(', '),
      dr: ((d.credits && d.credits.crew ? d.credits.crew.find(function(x) { return x.job === 'Director'; }) : null) || {}).name || '',
      c: (d.credits && d.credits.cast ? d.credits.cast.slice(0, 10).map(function(x) { return x.name; }) : []).join(', '),
      lg: d.original_language || '',
      ct: (d.production_countries && d.production_countries[0] ? d.production_countries[0].name : ''),
      r: rating,
      w: watchType,
      d: watchDate,
      sp: d.poster_path || ''
    };
  }
};
