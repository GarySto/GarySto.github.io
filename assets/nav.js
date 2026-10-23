/* Phone menu (23 Oct 2026). Without JavaScript the menu simply shows in full, so it never hides links. */
(function () {
  document.documentElement.classList.add("js-nav");
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".nav-toggle"), nav = document.getElementById("site-nav");
    if (!btn || !nav) return;
    function set(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { set(false); btn.focus(); }
    });
  });
})();
