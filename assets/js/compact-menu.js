document.addEventListener("DOMContentLoaded", function () {
  var style = document.createElement("style");
  style.textContent =
    ".mega:hover .dd, .mega:focus-within .dd { display: none !important; }" +
    ".mega .nav-arrow { display: inline-block; transition: transform 0.25s ease; }" +
    ".mega.mega-open .nav-arrow { transform: rotate(180deg); }" +
    "@media (max-width: 900px) {" +
    "  .mega { width: 100% !important; text-align: center !important; }" +
    "  .mega.mega-open .dd {" +
    "    position: static !important;" +
    "    display: block !important;" +
    "    width: 100% !important;" +
    "    max-height: 65vh !important;" +
    "    overflow-y: auto !important;" +
    "    margin-top: 10px !important;" +
    "    padding: 12px !important;" +
    "    background: #f8fafc !important;" +
    "    border-radius: 10px !important;" +
    "    box-shadow: none !important;" +
    "    text-align: left !important;" +
    "  }" +
    "}";
  document.head.appendChild(style);

  function toggleMega(mega, forceState) {
    var dd = mega.querySelector(".dd");
    if (!dd) return;
    var isOpen = typeof forceState === "boolean" ? forceState : !mega.classList.contains("mega-open");

    if (isOpen) {
      mega.classList.add("mega-open");
      dd.style.setProperty("display", window.innerWidth <= 900 ? "block" : "grid", "important");
      dd.style.setProperty("opacity", "1", "important");
      dd.style.setProperty("visibility", "visible", "important");
      dd.style.setProperty("pointer-events", "auto", "important");
      dd.style.setProperty("z-index", "99999", "important");
      dd.style.setProperty("transform", "none", "important");
      if (window.innerWidth <= 900) {
        dd.style.setProperty("position", "static", "important");
        dd.style.setProperty("max-height", "65vh", "important");
        dd.style.setProperty("overflow-y", "auto", "important");
      }
    } else {
      mega.classList.remove("mega-open");
      dd.style.setProperty("display", "none", "important");
    }
  }

  document.querySelectorAll(".mega").forEach(function (mega) {
    toggleMega(mega, false);
  });

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".mega-trigger");
    var mega = e.target.closest(".mega");

    if (trigger && mega) {
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleMega(mega);
      return;
    }

    if (!mega) {
      document.querySelectorAll(".mega.mega-open").forEach(function (m) {
        toggleMega(m, false);
      });
    }
  }, true);
});