/* Site menu v3 (31 Oct 2026, Gary: "we now need a proper burger menu ... to the top left of my name so that we can
   find all of these pages easily"). One "Menu" button sits left of the name on every screen size and opens a
   full, grouped list of every section of the site. On desktop the short top menu stays as it was; on phones the
   old right-hand burger is replaced by this one, so there is only ever one menu button.
   Built entirely here (styles included) so every page gets it without editing 60+ HTML files.
   Without JavaScript nothing changes: the original menu shows in full, so no link is ever hidden. */
(function () {
  document.documentElement.classList.add("js-nav");

  var GROUPS = [
    ["My work", [
      ["/work/", "Momentum Scanner", "My automated trading scanner"],
      ["/agents/", "AI teams and agents", "Everything I have built in my own time"],
      ["/agents/map/", "The Agent Map", "All my AI agents on one interactive sphere"],
      ["/village/", "The Village", "My AI teams at work, drawn as a town"],
      ["/lab/", "Trading Research Lab", "Every trading idea tested, costs included"]
    ]],
    ["Read", [
      ["/articles/", "Articles", "Building in public, AI and performance marketing"],
      ["/guides/", "Guides", "Step-by-step, with screenshots"],
      ["/news/", "News roundup", "Search, PPC and AI news in plain English"]
    ]],
    ["Free to use", [
      ["/guides/how-to-use-ai-to-find-jobs-that-fit-you/", "AI Job Finder", "Free prompts to find roles that fit you"],
      ["/kids-games/", "Kids Games", "Free, ad-free learning games"],
      ["/kids-games/spelling-lists/", "Spelling lists", "Year 1 to Year 6"],
      ["/kids-games/for-teachers/", "For teachers and parents", "How to use the games"]
    ]],
    ["About me", [
      ["/#about", "About", "Who I am"],
      ["/speaking/", "Speaking and training", "Talks and workshops"],
      ["/contact/", "Contact", "Get in touch"],
      ["/privacy/", "Privacy", "What this site collects"]
    ]]
  ];

  var CSS = "" +
    ".menu-brand{display:flex;align-items:center;gap:0.9rem;min-width:0}" +
    ".menu-btn{display:inline-flex;align-items:center;gap:0.55rem;font-family:var(--sans);font-size:1.05rem;font-weight:700;color:var(--ink);" +
    "background:var(--paper);border:2px solid var(--ink);border-radius:6px;padding:0.5rem 0.85rem;cursor:pointer;line-height:1}" +
    ".menu-btn:hover{background:var(--ink);color:var(--paper)}.menu-btn:hover .menu-bars span{background:var(--paper)}" +
    ".menu-btn:focus-visible,.site-menu a:focus-visible,.site-menu-close:focus-visible{outline:3px solid #b23a09;outline-offset:3px}" +
    ".menu-bars{display:flex;flex-direction:column;gap:4px;width:20px}.menu-bars span{display:block;height:3px;background:var(--ink);border-radius:2px}" +
    ".site-menu{position:fixed;inset:0;z-index:200;background:var(--paper);overflow-y:auto;padding:1.5rem 4rem 3rem}" +
    ".site-menu[hidden]{display:none}" +
    ".site-menu-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--ink);padding-bottom:1.2rem;margin-bottom:2rem}" +
    ".site-menu-top .logo{font-family:var(--serif);font-size:1.75rem;color:var(--ink);text-decoration:none}" +
    ".site-menu-close{font-family:var(--sans);font-size:1.1rem;font-weight:700;color:var(--ink);background:var(--paper);border:2px solid var(--ink);border-radius:6px;padding:0.6rem 1rem;cursor:pointer}" +
    ".site-menu-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:2rem 3rem}" +
    ".site-menu h2{font-family:var(--mono);font-size:0.9rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:#b23a09;margin-bottom:0.8rem}" +
    ".site-menu ul{list-style:none;margin:0;padding:0}" +
    ".site-menu li{border-top:1px solid var(--rule)}" +
    ".site-menu a.menu-item{display:block;padding:0.85rem 0;text-decoration:none;color:var(--ink)}" +
    ".site-menu a.menu-item b{display:block;font-family:var(--sans);font-size:1.3rem;font-weight:700;line-height:1.3}" +
    ".site-menu a.menu-item span{display:block;font-size:1rem;color:#4d4842;line-height:1.4;margin-top:0.15rem}" +
    ".site-menu a.menu-item:hover b{color:#b23a09;text-decoration:underline;text-underline-offset:5px}" +
    ".site-menu a.menu-item[aria-current=page] b{color:#b23a09}" +
    "html.menu-open{overflow:hidden}" +
    "@media (max-width:1100px){.site-menu-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}" +
    "@media (max-width:900px){.js-nav .nav-toggle{display:none!important}.site-menu{padding:1rem 1.25rem 2.5rem}" +
    ".site-menu-grid{grid-template-columns:1fr}.menu-btn{padding:0.6rem 0.8rem}.menu-label{display:none}" +
    ".menu-btn{width:52px;height:52px;justify-content:center}.menu-bars{width:24px}}";

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function build() {
    var header = document.querySelector("header"), logo = header && header.querySelector(".logo");
    if (!header || !logo || document.getElementById("site-menu")) return;
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var here = location.pathname.replace(/index\.html$/, "");
    var html = '<div class="site-menu-top"><a href="/" class="logo">Gary Stow</a>' +
      '<button type="button" class="site-menu-close" aria-label="Close menu">Close &#10005;</button></div>' +
      '<div class="site-menu-grid">';
    GROUPS.forEach(function (g) {
      html += '<div class="menu-group" role="group" aria-label="' + esc(g[0]) + '"><h2>' + esc(g[0]) + '</h2><ul>';
      g[1].forEach(function (it) {
        var cur = it[0] === here ? ' aria-current="page"' : "";
        html += '<li><a class="menu-item" href="' + it[0] + '"' + cur + '><b>' + esc(it[1]) + '</b><span>' + esc(it[2]) + '</span></a></li>';
      });
      html += "</ul></div>";
    });
    html += "</div>";
    var panel = document.createElement("div");
    panel.className = "site-menu";
    panel.id = "site-menu";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Site menu");
    panel.innerHTML = html;
    document.body.appendChild(panel);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menu-btn";
    btn.setAttribute("aria-controls", "site-menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<span class="menu-bars" aria-hidden="true"><span></span><span></span><span></span></span><span class="menu-label">Menu</span>';
    btn.setAttribute("aria-label", "Open the full site menu");
    var wrap = document.createElement("div");
    wrap.className = "menu-brand";
    header.insertBefore(wrap, logo);
    wrap.appendChild(btn);
    wrap.appendChild(logo);

    var closeBtn = panel.querySelector(".site-menu-close");
    function set(open) {
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.documentElement.classList.toggle("menu-open", open);
      if (open) { closeBtn.focus(); } else { btn.focus(); }
      if (open && window.gtag) { window.gtag("event", "site_menu_open", { page: here }); }
    }
    btn.addEventListener("click", function () { set(true); });
    closeBtn.addEventListener("click", function () { set(false); });
    panel.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (a && a.getAttribute("href").indexOf("/#") === 0 && here === "/") { set(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) { set(false); }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    build();
    /* The original phone menu still works if this page has no logo to attach to. */
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
