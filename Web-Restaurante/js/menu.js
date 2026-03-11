document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");
  const searchInput = document.getElementById("menuSearch");
  const noResults = document.getElementById("noResults");

  let currentFilter = "all";

  function filterMenu() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    menuCards.forEach((card) => {
      const category = card.dataset.category;
      const name = card.dataset.name.toLowerCase();

      const matchesFilter =
        currentFilter === "all" || category === currentFilter;
      const matchesSearch = name.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.classList.remove("menu-hidden");
        visibleCount++;
      } else {
        card.classList.add("menu-hidden");
      }
    });

    noResults.classList.toggle("d-none", visibleCount > 0);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      filterMenu();
    });
  });

  searchInput.addEventListener("input", filterMenu);

  filterMenu();
});
