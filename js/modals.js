window.Logit = window.Logit || {};

Logit.Modals = {
  /** @param {Object} movie @param {string} apiKey @param {Function} onAdd */
  openRating(movie, apiKey, onAdd) {
    const old = document.querySelector('.ratingSheet');
    if (old) old.remove();

    const sheet = document.createElement('div');
    sheet.className = 'ratingSheet';

    let ratesHtml = '';
    [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].forEach(function(v) {
      ratesHtml += '<button>' + v + '</button>';
    });

    sheet.innerHTML = '<div class="sheetBg"></div>'
      + '<div class="sheet">'
      + '<img src="' + Logit.Utils.esc(Logit.Utils.img(movie.poster_path)) + '">'
      + '<h3>' + Logit.Utils.esc(movie.title) + '</h3>'
      + '<div class="rates">' + ratesHtml + '</div>'
      + '<label class="sheetToggle">'
      + '<input type="checkbox" id="rewatchToggle">'
      + '<div class="toggle-track"></div>'
      + 'Rewatch</label>'
      + '<button class="sheetAdd">Add Movie</button>'
      + '</div>';

    document.body.append(sheet);

    let rating = null;
    const addBtn = sheet.querySelector('.sheetAdd');

    Logit.Overlays.push(function() { sheet.remove(); });

    sheet.querySelectorAll('.rates button').forEach(function(btn) {
      btn.onclick = function() {
        sheet.querySelectorAll('.rates button').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        rating = btn.textContent;
        addBtn.classList.add('enabled');
      };
    });

    sheet.querySelector('.sheetBg').onclick = function() { Logit.Overlays.closeTop(); };

    addBtn.onclick = async function() {
      if (!rating) return;

      addBtn.textContent = 'Adding...';
      addBtn.disabled = true;

      const d = await Logit.Search.tmdb(
        'https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=' + apiKey + '&append_to_response=credits,images'
      );

      if (!d) {
        alert('Failed to fetch movie details from TMDB. Please check your connection.');
        addBtn.textContent = 'Add Movie';
        addBtn.disabled = false;
        return;
      }

      const isRewatch = sheet.querySelector('#rewatchToggle').checked;
      onAdd(d, rating, isRewatch);
    };
  },

  /** @param {Object} movie */
  openMeta(movie) {
    const $ = Logit.Utils.byId;
    const metaModal = $('metaModal');
    if (!metaModal) return;

    metaModal.classList.add('active');
    document.body.classList.add('no-scroll');
    document.querySelector('.meta').classList.remove('editing');
    Logit.Overlays.push(() => this.closeMeta());

    $('mPoster').src = Logit.Utils.esc(Logit.Utils.img(movie.sp));
    $('mTitle').textContent = movie.t;
    $('mRating').textContent = movie.r + '/5';
    $('mYear').textContent = movie.yr;
    $('mRun').textContent = movie.rt + 'm';
    $('mGenre').textContent = movie.g;
    $('mDirector').textContent = movie.dr;
    $('mLang').textContent = movie.lg;
    $('mCountry').textContent = movie.ct;
    $('mWatch').textContent = movie.w;
    $('mLogged').textContent = movie.d;
    $('mCast').textContent = movie.c;

    $('eDirector').value = movie.dr;
    $('eLang').value = movie.lg;
    $('eCountry').value = movie.ct;
    $('eWatch').checked = /^Rewatch/i.test(movie.w);
    $('eLogged').value = movie.d;
    $('eCast').value = movie.c;
  },

  closeMeta() {
    const metaModal = document.getElementById('metaModal');
    if (metaModal) {
      metaModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  },

  /** @param {HTMLElement} modalElement @param {HTMLInputElement} queryInput */
  openAdd(modalElement, queryInput) {
    modalElement.classList.add('active');
    document.body.classList.add('no-scroll');
    queryInput.focus();
    Logit.Overlays.push(() => this.closeAdd(modalElement, queryInput));
  },

  /** @param {HTMLElement} modalElement @param {HTMLInputElement} queryInput */
  closeAdd(modalElement, queryInput) {
    modalElement.classList.remove('active');
    document.body.classList.remove('no-scroll');
    queryInput.value = '';
    const yearInput = document.getElementById('year');
    if (yearInput) yearInput.value = '';
    const results = document.getElementById('results');
    if (results) results.innerHTML = '';
    const clearQuery = document.getElementById('clearQuery');
    if (clearQuery) clearQuery.classList.remove('visible');
    queryInput.blur();
  }
};
