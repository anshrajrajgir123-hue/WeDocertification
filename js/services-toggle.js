document.addEventListener("DOMContentLoaded", () => {
  // 1. CSS ke hover ko band karo aur .mega-open class par menu dikhao (Laptop + Mobile dono ke liye)
  const style = document.createElement("style");
  style.textContent = `
    .mega:hover .dd, .mega:focus-within .dd {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
    .mega.mega-open .dd {
      display: grid !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    @media (max-width: 900px) {
      .mega.mega-open .dd {
        display: block !important;
      }
    }
    .mega .nav-arrow {
      display: inline-block;
      transition: transform 0.25s ease;
    }
    .mega.mega-open .nav-arrow {
      transform: rotate(180deg);
    }
  `;
  document.head.appendChild(style);

  // 2. Services par tap/click karne par 3 columns khole aur dubara tap karne par band kare
  document.querySelectorAll(".mega").forEach(mega => {
    const trigger = mega.querySelector(".mega-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mega.classList.toggle("mega-open");
    });
  });

  // 3. Bahar kahin bhi tap/click karne par band ho jaye
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".mega.mega-open").forEach(mega => {
      if (!mega.contains(e.target)) {
        mega.classList.remove("mega-open");
      }
    });
  });
});