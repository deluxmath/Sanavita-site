// Sana Vita — невеликі інтерактиви: мобільне меню, каруселі відгуків, категорії цін, форми.
(function () {
  // Мобільне меню
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.querySelector('img').src = open ? 'img/icons/close.svg' : 'img/icons/menu.svg';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.querySelector('img').src = 'img/icons/menu.svg'; }
    });
  }

  // Каруселі: кнопка «далі» гортає на одну картку, в кінці повертає на початок
  document.querySelectorAll('.carousel').forEach(function (c) {
    var track = c.querySelector('.js-track');
    var next = c.querySelector('.js-next');
    var dots = c.parentElement.querySelector('.js-dots');
    if (!track || !next) return;
    function step() { var card = track.firstElementChild; return card ? card.getBoundingClientRect().width + 20 : 300; }
    function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; }
    function update() {
      next.hidden = track.scrollWidth <= track.clientWidth + 4;
      if (dots) {
        var d = dots.children; var i = atEnd() ? d.length - 1 : 0;
        for (var k = 0; k < d.length; k++) d[k].classList.toggle('is-active', k === i);
      }
    }
    next.addEventListener('click', function () {
      track.scrollTo({ left: atEnd() ? 0 : track.scrollLeft + step(), behavior: 'smooth' });
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // Ціни: чіпи відкривають потрібну категорію
  document.querySelectorAll('.js-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.js-chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var target = document.getElementById(chip.dataset.target);
      if (target) { target.open = true; target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Форми: без сервера просто показуємо подяку
  document.querySelectorAll('.js-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) note.hidden = false;
      form.reset();
    });
  });
})();
