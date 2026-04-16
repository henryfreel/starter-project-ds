// Fetch the SVG icon sprite and inject it into the DOM so that
// <use href="#icon-name"> works cross-origin for all DS consumers.
// Without this, external <use href="https://...icons.svg#name"> is
// blocked by browsers as a fundamental SVG security restriction.
(function() {
  var script = document.currentScript;
  var baseUrl = '';

  if (script && script.src) {
    baseUrl = script.src.replace(/\/js\/main\.js(\?.*)?$/, '');
  }

  var spriteUrl = baseUrl + '/icons.svg';

  fetch(spriteUrl)
    .then(function(r) { return r.ok ? r.text() : Promise.reject(); })
    .then(function(svgText) {
      function inject() {
        if (document.getElementById('ds-icon-sprite')) return;
        var div = document.createElement('div');
        div.id = 'ds-icon-sprite';
        div.setAttribute('aria-hidden', 'true');
        div.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
        div.innerHTML = svgText;
        document.body.insertBefore(div, document.body.firstChild);
      }
      if (document.body) inject();
      else document.addEventListener('DOMContentLoaded', inject);
    })
    .catch(function() {});
})();

document.addEventListener('DOMContentLoaded', () => {

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  const label = toggle.querySelector('.toggle-label');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    localStorage.setItem('theme', theme);
  }

  setTheme(initial);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Accordion
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.closest('.ds-accordion')
        .querySelectorAll('.accordion-item')
        .forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Tabs
  document.querySelectorAll('.ds-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const panelId = tab.getAttribute('data-tab');
        if (panelId) {
          const container = tabGroup.parentElement.querySelector('.tab-content');
          if (container) {
            container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            const target = container.querySelector('#' + panelId);
            if (target) target.classList.add('active');
          }
        }
      });
    });
  });

  // Overlay scroll lock helpers
  function openOverlay(el) {
    el.classList.add('open');
    document.body.classList.add('overlay-open');
  }

  function closeOverlay(el) {
    el.classList.remove('open');
    if (!document.querySelector('.dialog-overlay.open, .modal-overlay.open, .blade-overlay.open, .sheet-overlay.open')) {
      document.body.classList.remove('overlay-open');
    }
  }

  // Dialog
  const dialogOverlay = document.getElementById('demo-dialog');
  const openBtn = document.getElementById('open-dialog');
  const closeBtns = [
    document.getElementById('close-dialog-cancel'),
    document.getElementById('close-dialog-confirm'),
    dialogOverlay ? dialogOverlay.querySelector('.dialog-dismiss') : null
  ].filter(Boolean);

  if (openBtn && dialogOverlay) {
    openBtn.addEventListener('click', () => openOverlay(dialogOverlay));
  }
  if (dialogOverlay) {
    closeBtns.forEach(btn => btn.addEventListener('click', () => closeOverlay(dialogOverlay)));
    dialogOverlay.addEventListener('click', (e) => {
      if (e.target === dialogOverlay) closeOverlay(dialogOverlay);
    });
  }

  // Modal
  const modalOverlay = document.getElementById('demo-modal');
  const openModalBtn = document.getElementById('open-modal');
  const closeModalBtns = [
    document.getElementById('close-modal-cancel'),
    document.getElementById('close-modal-save'),
    modalOverlay ? modalOverlay.querySelector('.panel-dismiss') : null
  ].filter(Boolean);

  if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener('click', () => openOverlay(modalOverlay));
  }
  if (modalOverlay) {
    closeModalBtns.forEach(btn => btn.addEventListener('click', () => closeOverlay(modalOverlay)));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeOverlay(modalOverlay);
    });
  }

  // Blade
  const bladeOverlay = document.getElementById('demo-blade');
  const openBladeBtn = document.getElementById('open-blade');
  const closeBladeBtns = [
    bladeOverlay ? bladeOverlay.querySelector('.panel-dismiss') : null
  ].filter(Boolean);

  if (openBladeBtn && bladeOverlay) {
    openBladeBtn.addEventListener('click', () => openOverlay(bladeOverlay));
  }
  if (bladeOverlay) {
    closeBladeBtns.forEach(btn => btn.addEventListener('click', () => closeOverlay(bladeOverlay)));
    bladeOverlay.addEventListener('click', (e) => {
      if (e.target === bladeOverlay) closeOverlay(bladeOverlay);
    });
  }

  // Sheet
  const sheetOverlay = document.getElementById('demo-sheet');
  const openSheetBtn = document.getElementById('open-sheet');
  const closeSheetBtns = [
    document.getElementById('close-sheet-cancel'),
    document.getElementById('close-sheet-save'),
    sheetOverlay ? sheetOverlay.querySelector('.panel-dismiss') : null
  ].filter(Boolean);

  if (openSheetBtn && sheetOverlay) {
    openSheetBtn.addEventListener('click', () => openOverlay(sheetOverlay));
  }
  if (sheetOverlay) {
    closeSheetBtns.forEach(btn => btn.addEventListener('click', () => closeOverlay(sheetOverlay)));
    sheetOverlay.addEventListener('click', (e) => {
      if (e.target === sheetOverlay) closeOverlay(sheetOverlay);
    });
  }

  // Notification dismiss
  document.querySelectorAll('.notification-dismiss').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.notification').style.display = 'none';
    });
  });

  // Tag dismiss
  document.querySelectorAll('.tag-dismiss').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.tag').style.display = 'none';
    });
  });

  // Pagination
  document.querySelectorAll('.pagination').forEach(nav => {
    nav.querySelectorAll('.pagination-page').forEach(page => {
      page.addEventListener('click', () => {
        nav.querySelectorAll('.pagination-page').forEach(p => p.classList.remove('current'));
        page.classList.add('current');
      });
    });
  });

  // Tag toggles
  document.querySelectorAll('.tag-toggle').forEach(tag => {
    tag.addEventListener('click', () => {
      const wasOn = tag.classList.contains('on');
      tag.classList.toggle('on', !wasOn);
      tag.classList.toggle('off', wasOn);
      const check = tag.querySelector('svg');
      if (wasOn && check) {
        check.remove();
      } else if (!wasOn && !check) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '20 6 9 17 4 12');
        svg.appendChild(polyline);
        tag.prepend(svg);
      }
    });
  });

  // Sidebar scroll-spy
  const sidebarLinks = document.querySelectorAll('.sidebar-nav .menu-item');
  const sections = document.querySelectorAll('.section-divider[id]');

  if (sidebarLinks.length && sections.length) {
    const linkMap = {};
    sidebarLinks.forEach(link => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (id) linkMap[id] = link;
    });

    let currentActive = null;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (linkMap[id]) {
            if (currentActive) currentActive.classList.remove('active');
            linkMap[id].classList.add('active');
            currentActive = linkMap[id];

            linkMap[id].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      });
    }, {
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));

    sidebarLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.getAttribute('href')?.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'instant', block: 'start' });
          history.replaceState(null, '', '#' + id);
        }
      });
    });
  }

  // Custom select fields (popover-based)
  // Popovers are portaled to document.body when open so they escape
  // overflow:hidden / overflow:auto containers (modals, blades, etc.).
  document.querySelectorAll('.select-field').forEach(field => {
    const trigger = field.querySelector('.select-trigger');
    const popover = field.querySelector('.select-popover');
    if (!trigger || !popover) return;

    field._dsPopover = popover;
    field._dsPopoverParent = popover.parentElement;

    trigger.addEventListener('click', () => {
      if (field.classList.contains('disabled')) return;
      const wasOpen = field.classList.contains('open');
      closeAllSelects();
      if (!wasOpen) openSelect(field);
    });

    popover.querySelectorAll('.popover-item').forEach(item => {
      item.addEventListener('click', () => {
        const value = item.dataset.value;
        const text = field.querySelector('.select-trigger-text');
        text.textContent = value;
        text.classList.remove('placeholder');
        field.dataset.value = value;

        popover.querySelectorAll('.popover-item').forEach(i => {
          i.classList.remove('selected');
          const check = i.querySelector('.popover-check');
          if (check) check.remove();
        });
        item.classList.add('selected');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('popover-check');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', '#check');
        svg.appendChild(use);
        item.appendChild(svg);

        closeSelect(field);
        field.classList.remove('error');
        const errorMsg = field.querySelector('.select-field-error');
        if (errorMsg) errorMsg.style.display = 'none';
      });
    });
  });

  function openSelect(field) {
    const popover = field._dsPopover;
    const trigger = field.querySelector('.select-trigger');
    if (!popover || !trigger) return;

    field.classList.add('open');

    const rect = trigger.getBoundingClientRect();
    document.body.appendChild(popover);
    popover.style.position = 'fixed';
    popover.style.top = (rect.bottom + 4) + 'px';
    popover.style.left = rect.left + 'px';
    popover.style.width = rect.width + 'px';
    popover.style.zIndex = '1200';
    popover.style.display = 'flex';

    requestAnimationFrame(() => {
      const popRect = popover.getBoundingClientRect();
      if (popRect.bottom > window.innerHeight) {
        popover.style.top = (rect.top - popRect.height - 4) + 'px';
      }
    });

    field._dsScrollHandler = () => closeAllSelects();
    window.addEventListener('scroll', field._dsScrollHandler, true);
    window.addEventListener('resize', field._dsScrollHandler);
  }

  function closeSelect(field) {
    field.classList.remove('open');
    const popover = field._dsPopover;
    const parent = field._dsPopoverParent;
    if (popover && parent && popover.parentElement === document.body) {
      parent.appendChild(popover);
      popover.style.cssText = '';
    }
    if (field._dsScrollHandler) {
      window.removeEventListener('scroll', field._dsScrollHandler, true);
      window.removeEventListener('resize', field._dsScrollHandler);
      field._dsScrollHandler = null;
    }
  }

  function closeAllSelects() {
    document.querySelectorAll('.select-field.open').forEach(f => closeSelect(f));
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.select-field') && !e.target.closest('.select-popover')) {
      closeAllSelects();
    }
  });

  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const sidebarNav = document.getElementById('sidebar-nav');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (hamburger && sidebarNav && sidebarOverlay) {
    hamburger.addEventListener('click', () => {
      sidebarNav.classList.toggle('open');
      sidebarOverlay.classList.toggle('open');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebarNav.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });

    sidebarNav.addEventListener('click', e => {
      if (e.target.closest('.menu-item')) {
        sidebarNav.classList.remove('open');
        sidebarOverlay.classList.remove('open');
      }
    });
  }
});
