document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-zoom",
  );

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;

    animatedElements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      if (rect.top < triggerBottom) {
        element.classList.add("active");
      }
    });
  };

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);
});
