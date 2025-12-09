(function() {
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
    a.addEventListener('click', function(e){
      e.preventDefault();
      const el = document.getElementById(this.dataset.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${this.dataset.target}`);
      }
    });
    toc.appendChild(a);
  });

  const links = Array.from(toc.querySelectorAll('a'));

  function onScroll() {
    const offset = 120;
    let current = sections[0].id;
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top - offset <= 0) current = sec.id;
      else break;
    }
    links.forEach(a => {
      if (a.dataset.target === current) a.classList.add('active');
      else a.classList.remove('active');
    });
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

  onScroll();
})();
