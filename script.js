(function () {
  const toc = document.getElementById('toc');
  const sections = Array.from(document.querySelectorAll('.section'));

  // Build TOC
  sections.forEach(sec => {
    const id = sec.id;
    const h2 = sec.querySelector('h2');
    if (!id || !h2) return;

    const a = document.createElement('a');
    a.href = `#${id}`;
    a.innerText = h2.innerText.trim();
    a.dataset.target = id;

    a.addEventListener('click', function (e) {
      e.preventDefault();

      // 👉 Active ngay khi click
      setActive(this.dataset.target);

      const el = document.getElementById(this.dataset.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${this.dataset.target}`);
      }
    });

    toc.appendChild(a);
  });

  const links = Array.from(toc.querySelectorAll('a'));

  function setActive(targetId) {
    links.forEach(a => {
      a.classList.toggle('active', a.dataset.target === targetId);
    });
  }

  function onScroll() {
    const offset = 120;
    let current = sections[0]?.id;

    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top - offset <= 0) current = sec.id;
      else break;
    }

    if (current) setActive(current);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Init (hash support)
  if (location.hash) {
    setActive(location.hash.replace('#', ''));
  } else {
    onScroll();
  }
})();
