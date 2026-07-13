// Categories page: typography-based tag filtering + live search
document.addEventListener('DOMContentLoaded', function () {
  var tagButtons = document.querySelectorAll('#tag-filters button');
  var items = Array.prototype.slice.call(document.querySelectorAll('.grid-item'));
  var searchInput = document.getElementById('search-input');
  var resultsCount = document.getElementById('results-count');
  var noResults = document.getElementById('no-results');

  var activeTag = 'all';
  var query = '';

  function applyFilters() {
    var visibleCount = 0;

    items.forEach(function (item) {
      var tags = (item.getAttribute('data-tags') || '').split(' ');
      var title = item.getAttribute('data-title') || '';

      var matchesTag = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
      var matchesQuery = query === '' || title.indexOf(query) !== -1;
      var visible = matchesTag && matchesQuery;

      item.classList.toggle('hidden', !visible);
      if (visible) visibleCount += 1;
    });

    resultsCount.textContent = visibleCount;
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  tagButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      tagButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      button.setAttribute('aria-pressed', 'true');
      activeTag = button.getAttribute('data-tag');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      query = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }
});
