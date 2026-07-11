window.Logit = window.Logit || {};

Logit.PosterPicker = {
  /** @param {Object} movie @param {string} apiKey @param {Function} onSelect */
  async open(movie, apiKey, onSelect) {
    const old = document.querySelector('.posterPicker');
    if (old) old.remove();

    const picker = document.createElement('div');
    picker.className = 'posterPicker';
    picker.innerHTML = '<div class="posterBg"></div>'
      + '<div class="posterSheet"><div class="posterSheetHandle"></div><div class="posterGrid" style="text-align:center;padding:20px;color:var(--muted);">Loading posters...</div></div>';

    document.body.append(picker);
    requestAnimationFrame(function() { picker.classList.add('active'); });
    Logit.Overlays.push(function() { picker.remove(); });

    const tmdbId = movie.tmdb_id;
    let posters = [];
    if (tmdbId) {
      const d = await Logit.Search.tmdb('https://api.themoviedb.org/3/movie/' + tmdbId + '/images?api_key=' + apiKey);
      if (d && d.posters) {
        posters = d.posters.map(function(p) { return { u: p.file_path, l: p.iso_639_1 || 'N/A' }; });
      }
    }

    if (!picker.isConnected) return;

    const grid = picker.querySelector('.posterGrid');
    if (posters.length === 0) {
      grid.textContent = 'No alternative posters found.';
      return;
    }

    let gridHtml = '';
    posters.forEach(function(p, i) {
      const isActive = movie.sp === p.u ? ' active' : '';
      gridHtml += '<div class="posterItem' + isActive + '" data-i="' + i + '">'
        + '<img src="' + Logit.Utils.esc(Logit.Utils.img(p.u, 'w342')) + '" loading="lazy">'
        + '<div class="posterLang">' + Logit.Utils.esc(p.l) + '</div>'
        + '</div>';
    });
    grid.innerHTML = gridHtml;
    grid.style.textAlign = '';
    grid.style.padding = '';

    picker.querySelectorAll('.posterItem').forEach(function(card) {
      card.onclick = function() {
        const selected = posters[Number(card.dataset.i)].u;
        onSelect(selected);
        Logit.Overlays.closeTop();
      };
    });

    picker.querySelector('.posterBg').onclick = function() { Logit.Overlays.closeTop(); };
  }
};
