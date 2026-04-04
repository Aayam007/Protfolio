(function () {
  var asyncLinks = document.querySelectorAll('link[data-async-style]');

  function promote(link) {
    link.rel = 'stylesheet';
    link.removeAttribute('as');
  }

  asyncLinks.forEach(function (link) {
    if (link.dataset.promoted === 'true') return;
    link.dataset.promoted = 'true';

    link.addEventListener('load', function () {
      promote(link);
    }, { once: true });

    link.addEventListener('error', function () {
      promote(link);
    }, { once: true });
  });
})();
