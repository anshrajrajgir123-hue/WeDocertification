(function () {
  function initServicesMenu() {
    var mega = document.querySelector('header .mega');
    var trig = document.querySelector('header .mega-trigger');
    if (!mega || !trig) return;

    // Prevent duplicate handlers
    if (trig.dataset.wdInit === '1') return;
    trig.dataset.wdInit = '1';

    // Click/tap to toggle
    trig.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      mega.classList.toggle('is-open');
    });

    // Clicks inside the dropdown: if a link is clicked, close the dropdown
    var dd = mega.querySelector('.dd');
    if (dd) {
      dd.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          mega.classList.remove('is-open');
        } else {
          e.stopPropagation();
        }
      });
    }

    // Close when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!mega.contains(e.target)) {
        mega.classList.remove('is-open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        mega.classList.remove('is-open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesMenu);
  } else {
    initServicesMenu();
  }
})();
