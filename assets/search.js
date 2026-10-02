(function () {
  const script = document.currentScript;
  const indexUrl = script && script.dataset.indexUrl;
  const headerForm = document.getElementById('header-search-form');
  const headerInput = document.getElementById('site-search-input');
  const suggestions = document.getElementById('header-search-results');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-query');
  const results = document.getElementById('search-results');
  const status = document.getElementById('search-status');

  if (!indexUrl || (!headerInput && !searchInput)) return;

  function normalize(value) {
    return String(value || '').toLocaleLowerCase('nb-NO').replace(/\s+/g, ' ').trim();
  }

  function matchesFor(query) {
    const terms = normalize(query).split(' ').filter(Boolean);
    if (!terms.length) return [];

    return index.map(function (item) {
      const title = normalize(item.title);
      const haystack = normalize([item.title, item.summary, item.content, item.category, item.type].join(' '));
      if (!terms.every(function (term) { return haystack.includes(term); })) return null;

      const score = terms.reduce(function (total, term) {
        return total + (title.includes(term) ? 3 : 0) + (haystack.startsWith(term) ? 1 : 0);
      }, 0);
      return { item: item, score: score };
    }).filter(Boolean)
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (entry) { return entry.item; });
  }

  function makeResult(item, className, query) {
    const link = document.createElement('a');
    link.className = className;
    link.href = item.url;
    link.textContent = item.title;
    if (item.type === 'Dokument') {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', item.title + ' (åpnes i ny fane)');
    }
    if (className === 'search-suggestion') {
      link.setAttribute('role', 'option');
      link.setAttribute('aria-selected', 'false');
      const type = document.createElement('span');
      type.className = 'search-suggestion-type';
      type.textContent = item.type || 'Side';
      const title = document.createElement('strong');
      title.textContent = item.title;
      const summary = document.createElement('small');
      summary.textContent = item.summary || '';
      link.replaceChildren(type, title, summary);
    } else {
      const type = document.createElement('span');
      type.className = 'search-result-type';
      type.textContent = item.type || 'Side';

      const title = document.createElement('strong');
      title.textContent = item.title;

      const excerpt = item.summary || item.content || '';
      const paragraph = document.createElement('p');
      paragraph.textContent = snippet(excerpt, query);

      const meta = document.createElement('small');
      const dateText = item.date
        ? new Date(item.date + 'T12:00:00').toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';
      meta.textContent = [item.category, dateText].filter(Boolean).join(' · ');

      link.replaceChildren(type, title);
      if (paragraph.textContent) link.append(paragraph);
      if (meta.textContent) link.append(meta);
    }
    return link;
  }

  function snippet(text, query) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    const position = normalize(clean).indexOf(normalize(query));
    if (position < 0) return clean.length > 180 ? clean.slice(0, 177) + '...' : clean;
    const start = Math.max(0, position - 60);
    const end = Math.min(clean.length, position + query.length + 100);
    return (start ? '...' : '') + clean.slice(start, end) + (end < clean.length ? '...' : '');
  }

  function renderSuggestions(query) {
    const found = matchesFor(query).slice(0, 7);
    suggestions.replaceChildren();
    activeSuggestion = -1;

    if (!query.trim()) {
      closeSuggestions();
      return;
    }

    if (found.length) {
      found.forEach(function (item, index) {
        const option = makeResult(item, 'search-suggestion', query);
        option.id = 'header-search-option-' + index;
        suggestions.append(option);
      });
    } else {
      const empty = document.createElement('p');
      empty.className = 'search-suggestion-empty';
      empty.textContent = 'Ingen treff. Trykk Enter for å åpne søkesiden.';
      suggestions.append(empty);
    }
    suggestions.hidden = false;
    headerInput.setAttribute('aria-expanded', 'true');
  }

  function closeSuggestions() {
    if (!suggestions || !headerInput) return;
    suggestions.hidden = true;
    headerInput.setAttribute('aria-expanded', 'false');
    headerInput.removeAttribute('aria-activedescendant');
    activeSuggestion = -1;
  }

  function renderSearchResults(query) {
    if (!query.trim()) {
      status.textContent = 'Skriv inn minst ett søkeord.';
      results.replaceChildren();
      return;
    }

    const found = matchesFor(query);
    status.textContent = found.length
      ? 'Fant ' + found.length + ' treff for søket «' + query + '».'
      : 'Fant ingen treff for søket «' + query + '». Prøv et annet ord.';

    results.replaceChildren();
    if (!found.length) {
      const empty = document.createElement('div');
      empty.className = 'search-empty';
      empty.textContent = 'Ingen sider eller nyheter matcher søket. Prøv et annet ord.';
      results.append(empty);
      return;
    }
    found.forEach(function (item) {
      results.append(makeResult(item, 'search-result', query));
    });
  }

  function updateUrl(form, query) {
    const url = new URL(form.action, window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    history.replaceState({}, '', url);
  }

  let index = [];
  let activeSuggestion = -1;

  async function loadIndex() {
    try {
      const response = await fetch(indexUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error('Kunne ikke laste søkeindeksen (' + response.status + ').');
      index = await response.json();

      if (searchInput) {
        const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
        searchInput.value = initialQuery;
        renderSearchResults(initialQuery);
      }
      if (headerInput && headerInput.value) renderSuggestions(headerInput.value);
    } catch (error) {
      if (status) status.textContent = 'Søket kunne ikke lastes. Prøv igjen senere.';
      if (results) {
        const message = document.createElement('div');
        message.className = 'search-empty';
        message.textContent = 'Det oppstod en feil under lasting av søkeindeksen.';
        results.replaceChildren(message);
      }
      console.error(error);
    }
  }

  if (headerForm) {
    headerInput.addEventListener('input', function () {
      renderSuggestions(headerInput.value);
    });
    headerInput.addEventListener('keydown', function (event) {
      const options = suggestions.querySelectorAll('[role="option"]');
      if (event.key === 'ArrowDown' && options.length) {
        event.preventDefault();
        activeSuggestion = (activeSuggestion + 1) % options.length;
      } else if (event.key === 'ArrowUp' && options.length) {
        event.preventDefault();
        activeSuggestion = (activeSuggestion - 1 + options.length) % options.length;
      } else if (event.key === 'Escape') {
        closeSuggestions();
        return;
      } else {
        return;
      }
      options.forEach(function (option, index) {
        const selected = index === activeSuggestion;
        option.setAttribute('aria-selected', String(selected));
        if (selected) {
          headerInput.setAttribute('aria-activedescendant', option.id);
          option.scrollIntoView({ block: 'nearest' });
        }
      });
    });
    headerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const option = suggestions.querySelectorAll('[role="option"]')[activeSuggestion];
      if (option) window.location.href = option.href;
      else {
        const query = headerInput.value.trim();
        window.location.href = headerForm.action + (query ? '?q=' + encodeURIComponent(query) : '');
      }
    });
    document.addEventListener('click', function (event) {
      if (!headerForm.contains(event.target)) closeSuggestions();
    });
  }

  if (searchForm) {
    searchInput.addEventListener('input', function () {
      renderSearchResults(searchInput.value);
      updateUrl(searchForm, searchInput.value.trim());
    });
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      updateUrl(searchForm, searchInput.value.trim());
      renderSearchResults(searchInput.value);
    });
  }

  loadIndex();
})();
