(function () {
  'use strict';

  // Mobile menu toggle
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    primaryNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
      }
    });
  }

  // Accordion — Linhas de pesquisa (only one item open at a time)
  var accordion = document.getElementById('linhasAccordion');

  if (accordion) {
    var items = accordion.querySelectorAll('.accordion-item');

    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      var indicator = item.querySelector('.accordion-indicator');

      trigger.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');

        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.accordion-indicator').textContent = '+';
        });

        if (willOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          indicator.textContent = '−';
        }
      });
    });
  }

  // Drilldown — Produção (Categorias → detalhe da categoria)
  var drilldown = document.getElementById('producaoDrilldown');

  if (drilldown) {
    var panelCategorias = document.getElementById('panel-categorias');
    var panelDetalhe = document.getElementById('panel-detalhe');
    var categoriasHeading = document.getElementById('producao-heading');
    var detalheHeading = document.getElementById('detalhe-heading');
    var detalheDesc = document.getElementById('detalhe-desc');
    var backButton = document.getElementById('backToCategories');
    var categoryCards = drilldown.querySelectorAll('.category-card');
    var detalheContents = drilldown.querySelectorAll('.detalhe-content');

    var categories = {
      bibliografica: {
        title: 'Produção Bibliográfica',
        desc: 'Artigos, livros e capítulos publicados pelo grupo.',
        panelId: 'detalhe-bibliografica'
      },
      tecnica: {
        title: 'Produção Técnica',
        desc: 'Softwares, sistemas e plataformas desenvolvidos pelo grupo.',
        panelId: 'detalhe-tecnica'
      }
    };

    function showCategories(focusHeading) {
      panelDetalhe.hidden = true;
      panelCategorias.hidden = false;
      if (focusHeading) {
        categoriasHeading.focus();
      }
    }

    function showDetail(categoryKey) {
      var category = categories[categoryKey];
      if (!category) return;

      detalheHeading.textContent = category.title;
      detalheDesc.textContent = category.desc;

      detalheContents.forEach(function (content) {
        content.hidden = content.id !== category.panelId;
      });

      panelCategorias.hidden = true;
      panelDetalhe.hidden = false;
      detalheHeading.focus();
    }

    categoryCards.forEach(function (card) {
      card.addEventListener('click', function () {
        showDetail(card.getAttribute('data-category'));
      });
    });

    backButton.addEventListener('click', function () {
      showCategories(true);
    });

    document.querySelectorAll('a[href="#producao"]').forEach(function (link) {
      link.addEventListener('click', function () {
        showCategories(false);
      });
    });
  }

  // Dynamic year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Scrollspy via IntersectionObserver
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('[data-nav]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var linkById = {};
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      linkById[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute('id');
          var link = linkById[id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      if (linkById[section.id]) {
        observer.observe(section);
      }
    });
  }
})();
