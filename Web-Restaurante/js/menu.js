document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");
  const searchInput = document.getElementById("menuSearch");
  const noResults = document.getElementById("noResults");

  const modalElement = document.getElementById("dishModal");
  const dishModal = modalElement ? new bootstrap.Modal(modalElement) : null;
  const modalWhatsappBtn = document.querySelector("#dishModal .btn.btn-custom");

  let currentFilter = "all";

  function filterMenu() {
    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";
    let visibleCount = 0;

    menuCards.forEach((card) => {
      const category = card.dataset.category;
      const name = (card.dataset.name || "").toLowerCase();

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

    if (noResults) {
      noResults.classList.toggle("d-none", visibleCount > 0);
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      filterMenu();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterMenu);
  }

  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!dishModal) return;

      const title = card.dataset.title || "";
      const price = card.dataset.price || "";
      const category = card.dataset.categoryLabel || "";
      const description = card.dataset.description || "";
      const ingredients = card.dataset.ingredients || "";
      const allergens = card.dataset.allergens || "";
      const image = card.dataset.image || "";

      const modalTitle = document.getElementById("modalDishTitle");
      const modalPrice = document.getElementById("modalDishPrice");
      const modalCategory = document.getElementById("modalDishCategory");
      const modalDescription = document.getElementById("modalDishDescription");
      const modalIngredients = document.getElementById("modalDishIngredients");
      const modalAllergens = document.getElementById("modalDishAllergens");
      const modalImage = document.getElementById("modalDishImage");

      if (modalTitle) modalTitle.textContent = title;
      if (modalPrice) modalPrice.textContent = price;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDescription) modalDescription.textContent = description;
      if (modalIngredients) modalIngredients.textContent = ingredients;
      if (modalAllergens) modalAllergens.textContent = allergens;
      if (modalImage) {
        modalImage.src = image;
        modalImage.alt = title;
      }

      if (modalWhatsappBtn) {
        const message = `Hola, quiero reservar y me interesa el plato: ${title}`;
        modalWhatsappBtn.href = `https://wa.me/34600123456?text=${encodeURIComponent(message)}`;
      }

      dishModal.show();
    });
  });

  filterMenu();

  const qrContainer = document.getElementById("qrcode");

  if (qrContainer) {
    qrContainer.innerHTML = "";

    const menuUrl = `${window.location.origin}${window.location.pathname}`;

    new QRCode(qrContainer, {
      text: menuUrl,
      width: 180,
      height: 180,
    });
  }
});
