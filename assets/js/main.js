/**
 * WeDo Certification & Services
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('header nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.textContent = isOpen ? '✕ Close' : '☰ Menu';
    });

    // Close when clicking nav link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 980) {
          nav.classList.remove('open');
          menuBtn.textContent = '☰ Menu';
          menuBtn.setAttribute('aria-expanded', false);
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuBtn.textContent = '☰ Menu';
        menuBtn.setAttribute('aria-expanded', false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuBtn.textContent = '☰ Menu';
        menuBtn.setAttribute('aria-expanded', false);
      }
    });
  }

  // 2. Dark/Light Mode Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('wedo-theme');

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('wedo-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // 3. Dynamic Copyright Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 4. Live Services Filter & Search
  const searchInput = document.getElementById('service-search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('#services .grid .card');
  const serviceHeadings = document.querySelectorAll('#services .grp');

  function filterServices() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.category || 'all';

    let visibleCount = 0;

    serviceCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const subtitle = card.querySelector('.card-pattern-subtitle, .chip')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p, .card-pattern-subtitle')?.textContent.toLowerCase() || '';
      const category = card.dataset.category || '';

      const matchesQuery = !query || title.includes(query) || subtitle.includes(query) || desc.includes(query);
      const matchesCategory = (activeFilter === 'all') || (category === activeFilter);

      if (matchesQuery && matchesCategory) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Hide empty group headings if filtering
    serviceHeadings.forEach(h => {
      if (query || activeFilter !== 'all') {
        const nextGrid = h.nextElementSibling;
        if (nextGrid && nextGrid.classList.contains('grid')) {
          const hasVisible = Array.from(nextGrid.children).some(c => c.style.display !== 'none');
          h.style.display = hasVisible ? 'block' : 'none';
        }
      } else {
        h.style.display = 'block';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterServices);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterServices();
    });
  });

  // 5. Contact Form Handler (Interactive validation + WhatsApp direct enquiry option)
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const whatsappBtn = document.getElementById('btn-enquire-whatsapp');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value || 'Client';
      const service = contactForm.querySelector('[name="service"]')?.value || 'General Consultation';
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enquiry Sent!';
      }

      if (formAlert) {
        formAlert.className = 'form-alert success';
        formAlert.innerHTML = `<strong>Thank you, ${escapeHtml(name)}!</strong> Your enquiry for <em>${escapeHtml(service)}</em> has been recorded. Our team will contact you shortly.`;
      }

      contactForm.reset();

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Another Message';
        }
      }, 4000);
    });
  }

  if (whatsappBtn && contactForm) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value.trim();
      const phone = contactForm.querySelector('[name="phone"]')?.value.trim();
      const email = contactForm.querySelector('[name="email"]')?.value.trim();
      const service = contactForm.querySelector('[name="service"]')?.value;
      const message = contactForm.querySelector('[name="message"]')?.value.trim();

      let text = `Hello WeDo Certification & Services team,\n`;
      if (name) text += `Name: ${name}\n`;
      if (phone) text += `Phone: ${phone}\n`;
      if (email) text += `Email: ${email}\n`;
      text += `Required Service: ${service}\n`;
      if (message) text += `Query: ${message}\n`;

      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/919953570505?text=${encodedText}`, '_blank');
    });
  }

  // Pre-fill service dropdown from card clicks or URL query parameter (?service=...)
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam && contactForm) {
    const select = contactForm.querySelector('select[name="service"]');
    if (select) {
      let matched = false;
      for (let option of select.options) {
        if (option.value.toLowerCase() === serviceParam.toLowerCase() || option.text.toLowerCase().includes(serviceParam.toLowerCase())) {
          select.value = option.value;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const newOpt = document.createElement('option');
        newOpt.value = serviceParam;
        newOpt.textContent = serviceParam;
        newOpt.selected = true;
        select.appendChild(newOpt);
      }
    }
  }

  // Make entire service cards clickable to navigate to their dedicated detail page
  document.querySelectorAll('#services .card, .grid .card, .service-pattern-card').forEach(card => {
    const link = card.querySelector('a.card-pattern-link, a.enquire-link, a[href^="services/"]');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' && !e.target.closest('a')) {
          link.click();
        }
      });
    }
  });

  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', () => {
      const card = link.closest('.card');
      if (card) {
        const title = card.querySelector('h3')?.textContent;
        const select = contactForm?.querySelector('select[name="service"]');
        if (select && title) {
          for (let option of select.options) {
            if (option.text.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(option.text.toLowerCase())) {
              select.value = option.value;
              break;
            }
          }
        }
      }
    });
  });

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});
