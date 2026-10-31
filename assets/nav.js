/* Site menu v4 (31 Oct 2026). Gary: "when I talk about a burger menu I mean something like this" (Oakley): a plain
   three-line button by the name that slides a panel in from the left. The first level lists the main areas with an
   arrow; choosing one slides to its pages, with a Back button. It sits apart from the short top menu, which stays.
   Everything (styles included) lives in this one file, which every page already loads, so the menu is the same on
   all 60+ pages. Pages link to it as /assets/nav.js?v=<hash> (css_version.py) so Cloudflare never serves an old copy.
   Without JavaScript nothing changes: the original menu shows in full, so no link is ever hidden.

   TO ADD A PAGE TO THE MENU: add a line to MENU below, then run  py "D:\Marketing Data\Scripts\site_menu.py"  */
(function () {
  document.documentElement.classList.add("js-nav");

  // [label, link or null, sub-items [url, title, one-line description], highlight?]
  var MENU = [
    ["Home", "/", null],
    ["My work", null, [
      ["/work/#project", "Momentum Scanner", "My automated trading scanner, how it works"],
      ["/agents/", "AI teams and agents", "Everything I have built in my own time"],
      ["/agents/map/", "The Agent Map", "All my AI agents on one interactive sphere"],
      ["/village/", "The Village", "My AI teams at work, drawn as a town"],
      ["/lab/", "Trading Research Lab", "Every trading idea tested, costs included"]
    ]],
    ["Read", null, [
      ["/articles/", "Articles", "Building in public, AI and performance marketing"],
      ["/guides/", "Guides", "Step by step, with screenshots"],
      ["/news/", "News roundup", "Search, PPC and AI news in plain English"]
    ]],
    ["Free to use", null, [
      ["/guides/how-to-use-ai-to-find-jobs-that-fit-you/", "AI Job Finder", "Free prompts to find roles that fit you"],
      ["/kids-games/", "Kids Games", "Free, ad-free learning games"],
      ["/kids-games/spelling-lists/", "Spelling lists", "Year 1 to Year 6"],
      ["/kids-games/for-teachers/", "For teachers and parents", "How to use the games"]
    ]],
    ["About me", null, [
      ["/#about", "About", "Who I am"],
      ["/speaking/", "Speaking and training", "Talks, workshops and build days"],
      ["/privacy/", "Privacy", "What this site collects"]
    ]],
    ["Contact", "/contact/", null],
    ["Free AI Job Finder", "/guides/how-to-use-ai-to-find-jobs-that-fit-you/", null, true]
  ];

  var CSS = "" +
    ".sm[hidden],.sm-shade[hidden],.sm-level[hidden]{display:none!important}" +
    ".menu-brand{display:flex;align-items:center;gap:1rem;min-width:0}" +
    ".menu-btn{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;padding:0;background:transparent;" +
    "border:2px solid transparent;border-radius:8px;cursor:pointer;flex:none}" +
    ".menu-btn:hover{border-color:var(--ink)}" +
    ".menu-float{position:fixed;top:12px;left:12px;z-index:250;background:#fffdf8;border:2px solid #0f0f0f;box-shadow:0 2px 10px rgba(0,0,0,.3)}" +
    ".menu-bars{display:flex;flex-direction:column;gap:6px;width:30px}.menu-bars span{display:block;height:3px;background:var(--ink,#0f0f0f);border-radius:2px}" +
    ".sm{--ink:#0f0f0f;--sans:'DM Sans',Segoe UI,sans-serif;--serif:'DM Serif Display',Georgia,serif;font-family:var(--sans)}" +
    ".menu-btn:focus-visible,.sm a:focus-visible,.sm button:focus-visible{outline:3px solid #b23a09;outline-offset:3px}" +
    ".sm-shade{position:fixed;inset:0;z-index:299;background:rgba(15,15,15,.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);opacity:0;transition:opacity .25s}" +
    ".sm{position:fixed;top:0;left:0;bottom:0;z-index:300;width:min(460px,100vw);background:#fffdf8;color:var(--ink);" +
    "box-shadow:6px 0 30px rgba(0,0,0,.25);transform:translateX(-102%);transition:transform .28s ease;overflow:hidden;display:flex;flex-direction:column}" +
    "html.menu-open .sm{transform:none}html.menu-open .sm-shade{opacity:1}html.menu-open{overflow:hidden}" +
    ".sm-head{display:flex;align-items:center;gap:1rem;padding:1.4rem 1.6rem 1rem}" +
    ".sm-close{width:56px;height:56px;border-radius:50%;border:none;background:#ece8df;color:var(--ink);font-size:1.8rem;line-height:1;cursor:pointer;flex:none}" +
    ".sm-close:hover{background:#ddd7cb}" +
    ".sm-levels{position:relative;flex:1;overflow:hidden}" +
    ".sm-level{position:absolute;inset:0;overflow-y:auto;padding:0.4rem 1.6rem 2rem;transition:transform .28s ease}" +
    ".sm-level.sm-sub{transform:translateX(102%)}.sm-level.sm-sub.on{transform:none}.sm-level.sm-top.away{transform:translateX(-102%)}" +
    ".sm ul{list-style:none;margin:0;padding:0}" +
    ".sm-row{display:flex;align-items:center;justify-content:space-between;width:100%;padding:1.05rem 0.2rem;background:none;border:none;" +
    "border-bottom:1px solid #e6e0d5;font-family:var(--sans);font-size:1.55rem;font-weight:500;line-height:1.3;color:var(--ink);text-decoration:none;text-align:left;cursor:pointer}" +
    ".sm-row:hover{color:#b23a09}.sm-row.hl{color:#b23a09;font-weight:700}.sm-row[aria-current=page]{color:#b23a09}" +
    ".sm-chev{font-size:2.1rem;line-height:1;margin-left:1rem;font-weight:400}" +
    ".sm-back{display:inline-flex;align-items:center;gap:.5rem;background:none;border:none;font-family:var(--sans);font-size:1.15rem;font-weight:700;" +
    "color:var(--ink);cursor:pointer;padding:.6rem 0;margin-bottom:.4rem}" +
    ".sm-back:hover{color:#b23a09}" +
    ".sm-title{font-family:var(--serif);font-size:2.1rem;font-weight:400;margin:.2rem 0 .8rem}" +
    ".sm-item{display:block;padding:1rem .2rem;border-bottom:1px solid #e6e0d5;text-decoration:none;color:var(--ink)}" +
    ".sm-item b{display:block;font-family:var(--sans);font-size:1.4rem;font-weight:700;line-height:1.3}" +
    ".sm-item span{display:block;font-size:1.05rem;color:#4d4842;line-height:1.45;margin-top:.2rem}" +
    ".sm-item:hover b,.sm-item[aria-current=page] b{color:#b23a09}" +
    "@media (prefers-reduced-motion:reduce){.sm,.sm-level,.sm-shade{transition:none}}" +
    "@media (max-width:900px){.js-nav .nav-toggle{display:none!important}.menu-brand{gap:.6rem}" +
    ".sm-head{padding:1rem 1.25rem .6rem}.sm-level{padding:0.2rem 1.25rem 2rem}.sm-row{font-size:1.4rem}}";

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function build() {
    var header = document.querySelector("header"), logo = header && header.querySelector(".logo");
    if (document.getElementById("site-menu")) return false;
    /* Pages with their own full-screen layout (the Village, the Lab) have no site header, so the same button
       floats in the top-left corner instead (31 Oct 2026: Gary, "it's not persistent across pages"). */
    var floating = !(header && logo);
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    var here = location.pathname.replace(/index\.html$/, "");

    var top = '<div class="sm-level sm-top"><ul>';
    var subs = "";
    MENU.forEach(function (m, i) {
      if (m[2]) {
        top += '<li><button type="button" class="sm-row" data-open="sm-sub-' + i + '" aria-controls="sm-sub-' + i + '">' + esc(m[0]) +
               '<span class="sm-chev" aria-hidden="true">&#8250;</span></button></li>';
        subs += '<div class="sm-level sm-sub" id="sm-sub-' + i + '" hidden><button type="button" class="sm-back">&#8249; Back</button>' +
                '<h2 class="sm-title">' + esc(m[0]) + '</h2><ul>';
        m[2].forEach(function (it) {
          subs += '<li><a class="sm-item" href="' + it[0] + '"' + (it[0] === here ? ' aria-current="page"' : "") + '><b>' +
                  esc(it[1]) + '</b><span>' + esc(it[2]) + '</span></a></li>';
        });
        subs += "</ul></div>";
      } else {
        top += '<li><a class="sm-row' + (m[3] ? " hl" : "") + '" href="' + m[1] + '"' + (m[1] === here ? ' aria-current="page"' : "") +
               '>' + esc(m[0]) + (m[3] ? ' <span class="sm-chev" aria-hidden="true">&#8594;</span>' : "") + '</a></li>';
      }
    });
    top += "</ul></div>";

    var shade = document.createElement("div");
    shade.className = "sm-shade";
    shade.hidden = true;
    var panel = document.createElement("nav");
    panel.className = "sm";
    panel.id = "site-menu";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Full site menu");
    panel.innerHTML = '<div class="sm-head"><button type="button" class="sm-close" aria-label="Close menu">&#10005;</button></div>' +
                      '<div class="sm-levels">' + top + subs + "</div>";
    document.body.appendChild(shade);
    document.body.appendChild(panel);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menu-btn";
    btn.setAttribute("aria-controls", "site-menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open the full site menu");
    btn.innerHTML = '<span class="menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>';
    if (floating) {
      btn.classList.add("menu-float");
      document.body.appendChild(btn);
    } else {
      var wrap = document.createElement("div");
      wrap.className = "menu-brand";
      header.insertBefore(wrap, logo);
      wrap.appendChild(btn);
      wrap.appendChild(logo);
    }

    var topLevel = panel.querySelector(".sm-top"), closeBtn = panel.querySelector(".sm-close");
    function showSub(id) {
      var sub = document.getElementById(id);
      sub.hidden = false;
      requestAnimationFrame(function () { sub.classList.add("on"); topLevel.classList.add("away"); });
      var b = sub.querySelector(".sm-back");
      setTimeout(function () { b.focus(); }, 30);
    }
    function backToTop() {
      var open = panel.querySelector(".sm-sub.on");
      if (!open) return;
      open.classList.remove("on");
      topLevel.classList.remove("away");
      setTimeout(function () { open.hidden = true; }, 300);
      var opener = panel.querySelector('[data-open="' + open.id + '"]');
      if (opener) opener.focus();
    }
    function set(open) {
      if (open) {
        panel.hidden = false; shade.hidden = false;
        requestAnimationFrame(function () { document.documentElement.classList.add("menu-open"); });
        btn.setAttribute("aria-expanded", "true");
        setTimeout(function () { closeBtn.focus(); }, 30);
        if (window.gtag) { window.gtag("event", "site_menu_open", { page: here }); }
      } else {
        document.documentElement.classList.remove("menu-open");
        btn.setAttribute("aria-expanded", "false");
        setTimeout(function () {
          panel.hidden = true; shade.hidden = true;
          panel.querySelectorAll(".sm-sub").forEach(function (s) { s.classList.remove("on"); s.hidden = true; });
          topLevel.classList.remove("away");
        }, 300);
        btn.focus();
      }
    }
    btn.addEventListener("click", function () { set(true); });
    closeBtn.addEventListener("click", function () { set(false); });
    shade.addEventListener("click", function () { set(false); });
    panel.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("button, a") : null;
      if (!t) return;
      if (t.dataset && t.dataset.open) { showSub(t.dataset.open); return; }
      if (t.classList.contains("sm-back")) { backToTop(); return; }
      if (t.tagName === "A" && t.getAttribute("href").indexOf("/#") === 0 && here === "/") { set(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || panel.hidden) return;
      if (panel.querySelector(".sm-sub.on")) { backToTop(); } else { set(false); }
    });
    return true;
  }

  /* Footer (31 Oct 2026): every page's footer also gets the main sections it was missing, so the footer is a
     second way to find everything. Only links that are not already there are added, before LinkedIn. */
  var FOOTER_ADD = [["/articles/", "Articles"], ["/guides/", "Guides"], ["/agents/", "AI teams"], ["/agents/map/", "Agent Map"],
                    ["/speaking/", "Speaking"]];
  function fillFooter() {
    var box = document.querySelector("footer .footer-links");
    if (!box) return;
    var have = {};
    box.querySelectorAll("a").forEach(function (a) { have[a.getAttribute("href")] = true; });
    var before = null;
    box.querySelectorAll("a").forEach(function (a) { if (!before && /linkedin\.com/.test(a.href)) before = a; });
    FOOTER_ADD.forEach(function (f) {
      if (have[f[0]]) return;
      var a = document.createElement("a");
      a.href = f[0];
      a.textContent = f[1];
      box.insertBefore(a, before);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    try { fillFooter(); } catch (e) {}
    if (build()) return;
    /* Fallback: the original phone menu, for any page without the usual header. */
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
