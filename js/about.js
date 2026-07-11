window.Logit = window.Logit || {};

Logit.AboutPage = {
  init() {
    const esc = Logit.Utils.esc;
    const $ = Logit.Utils.byId;

    function renderStorage() {
      const { total, keys } = Logit.Storage.getStorageSize();
      const fmt = Logit.Storage.formatBytes(total);

      $('storageTotal').innerText = fmt.val;
      $('storageUnit').innerText = fmt.unit;
      $('storageSub').innerText = total.toLocaleString() + ' bytes used of ~5 MB limit';

      const pct = Math.min((total / 5242880) * 100, 100);
      $('storageFill').style.width = pct + '%';

      const container = $('storageKeys');
      container.innerHTML = '';
      keys.sort((a, b) => b.size - a.size);

      let keysHtml = '';
      keys.forEach(item => {
        const kFmt = Logit.Storage.formatBytes(item.size);
        let dotClass = 'other';
        if (item.key === 'movies') dotClass = 'movies';
        else if (item.key === 'grid') dotClass = 'grid';

        keysHtml += `
          <div class="storageKey">
            <div class="storageKeyLeft">
              <div class="storageDot ${dotClass}"></div>
              <div class="storageKeyName">${esc(item.key)}</div>
            </div>
            <div class="storageKeySize">${kFmt.val} ${kFmt.unit}</div>
          </div>
        `;
      });
      container.innerHTML = keysHtml;
    }

    renderStorage();

    // ========= EVENT LISTENERS =========
    const apiKeyBtn = document.querySelector('[data-action="setApiKey"]');
    if (apiKeyBtn) {
      apiKeyBtn.addEventListener('click', function() {
        const key = prompt('Enter your TMDB API Key:', Logit.Config.getApiKey());
        if (key !== null) {
          Logit.Config.setApiKey(key);
          location.reload();
        }
      });
    }

    const clearBtn = document.querySelector('[data-action="clearAllData"]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (!confirm('Clear all movie data? This cannot be undone.')) return;
        localStorage.removeItem('movies');
        renderStorage();
        alert('All movie data cleared.');
      });
    }
  }
};
