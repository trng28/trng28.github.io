// Scroll reveal animation
const reveals = document.querySelectorAll("section, .card");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

console.log("Motion effects enabled");
