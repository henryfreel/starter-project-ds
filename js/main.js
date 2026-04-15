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
    if (!document.querySelector('.dialog-overlay.open, .modal-overlay.open, .blade-overlay.open')) {
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
    closeBladeBtns.forEach(btn => btn.addEventListener('click', () => closeOverlay(bladeOverlay)));
    bladeOverlay.addEventListener('click', (e) => {
      if (e.target === bladeOverlay) closeOverlay(bladeOverlay);
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
});
