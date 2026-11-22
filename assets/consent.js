/* Cookie choices for garystow.co.uk (added 24 Oct 2026).
   Loaded BEFORE the Google, Clarity and Microsoft Advertising tags on every page except /kids-games/
   (which has no tags at all). It sets their consent defaults, shows a small banner until the visitor
   chooses, and remembers the choice in this browser only.

   Before a choice: Google Analytics measures visits (allowed without consent in the UK for improving
   a website, with a clear way to say no); Microsoft Advertising and Clarity get no cookies.
   "Accept"  -> Clarity and Microsoft Advertising cookies allowed.
   "No thanks" -> nothing optional at all, Google Analytics included.
   The privacy page has a "Change my cookie choices" button (data-consent-open). */
(function () {
  var KEY = "gs_cookie_choice_v1";
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  var w = window;
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
  w.uetq = w.uetq || [];
  w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments); };

  function signals(c) {
    var yes = c === "yes", no = c === "no";
    return {
      google: { ad_storage: yes ? "granted" : "denied", ad_user_data: yes ? "granted" : "denied",
                ad_personalization: yes ? "granted" : "denied", analytics_storage: no ? "denied" : "granted" },
      uet: { ad_storage: yes ? "granted" : "denied" },
      clarity: { ad_Storage: yes ? "granted" : "denied", analytics_Storage: yes ? "granted" : "denied" }
    };
  }

  var s = signals(choice);
  w.gtag("consent", "default", s.google);
  w.uetq.push("consent", "default", s.uet);
  if (choice) w.clarity("consentv2", s.clarity);

  function apply(c) {
    choice = c;
    try { localStorage.setItem(KEY, c); } catch (e) {}
    var n = signals(c);
    w.gtag("consent", "update", n.google);
    w.uetq.push("consent", "update", n.uet);
    w.clarity("consentv2", n.clarity);
    try { w.gtag("event", "cookie_choice", { choice: c }); } catch (e) {}
  }

  var css = "#gs-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:0 auto;" +
    "background:#0f0f0f;color:#fff;border-radius:14px;padding:20px 22px;box-shadow:0 8px 30px rgba(0,0,0,.35);" +
    /* Phone and computer fonts only: with the site's web fonts the banner text re-wrapped when they
       arrived, and that jump scored about 0.16 CLS on every first visit. */
    "font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:18px;line-height:1.5;font-weight:400}" +
    "#gs-consent h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:24px;margin:0 0 6px}" +
    "#gs-consent p{margin:0}#gs-consent a{color:#fff;text-decoration:underline;text-underline-offset:3px}" +
    "#gs-consent .gs-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px}" +
    "#gs-consent button{font:inherit;font-weight:600;font-size:18px;padding:12px 24px;border-radius:999px;cursor:pointer;min-width:140px;min-height:48px}" +
    "#gs-consent .gs-yes{background:#fff;color:#0f0f0f;border:2px solid #fff}" +
    "#gs-consent .gs-no{background:transparent;color:#fff;border:2px solid #fff}" +
    "#gs-consent button:focus-visible{outline:3px solid #e8c4b0;outline-offset:3px}" +
    "@media print{#gs-consent{display:none}}";

  function show() {
    if (document.getElementById("gs-consent")) return;
    if (!document.getElementById("gs-consent-css")) {
      var st = document.createElement("style"); st.id = "gs-consent-css"; st.textContent = css; document.head.appendChild(st);
    }
    var box = document.createElement("div");
    box.id = "gs-consent"; box.setAttribute("role", "region"); box.setAttribute("aria-label", "Cookie choices");
    box.innerHTML = '<h2>Cookies, briefly</h2>' +
      '<p>I count visits so I can see which pages help people. With your OK, Microsoft Clarity and Microsoft Advertising ' +
      'can also set cookies, so I can fix awkward pages and see which adverts brought you here. No ads are shown on this site, and nothing is sold. ' +
      '<a href="/privacy/">Read the privacy page</a>.</p>' +
      '<div class="gs-btns"><button type="button" class="gs-yes">Accept</button><button type="button" class="gs-no">No thanks</button></div>';
    document.body.appendChild(box);
    box.querySelector(".gs-yes").onclick = function () { apply("yes"); box.remove(); };
    box.querySelector(".gs-no").onclick = function () { apply("no"); box.remove(); };
  }

  function wireOpeners() {
    var openers = document.querySelectorAll("[data-consent-open]");
    for (var i = 0; i < openers.length; i++) openers[i].addEventListener("click", function (e) { e.preventDefault(); show(); });
  }

  /* 31 Oct 2026: on a first visit this banner is the largest thing on a phone screen, so it is what
     PageSpeed scores as LCP. Waiting for DOMContentLoaded made it paint after the first frame, and the
     lab test then counted the analytics and font downloads against it. Now it goes up in the first
     frame (as soon as <body> exists). DOMContentLoaded stays as a fallback; show() never doubles up. */
  function showEarly() { if (document.body) show(); else requestAnimationFrame(showEarly); }
  if (!choice) showEarly();

  function ready() { wireOpeners(); if (!choice) show(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();

  /* 22 Nov 2026: start the Google, Clarity and Microsoft tags only once the page has loaded and painted.
     PageSpeed counts every download that starts before the main picture paints against LCP. On its test
     machine the first paint sometimes lands at about 1.4 s, by which time the tags (about 230 KB over six
     other sites) had all started, which turned a 1.4 s paint into a 4.4 to 6 s LCP score on /work/, /articles/
     and two articles. Pages mark the tags <script type="text/plain" data-gs-after-paint> (data-src for a
     file); this runs them in page order. Nothing is lost: the gtag, uetq and clarity queues above already
     hold every call (consent defaults included) until the tags arrive. Pages with ordinary tags are unaffected. */
  var tagsStarted = false;
  function startTags() {
    if (tagsStarted) return;
    tagsStarted = true;
    var list = document.querySelectorAll('script[type="text/plain"][data-gs-after-paint]');
    for (var i = 0; i < list.length; i++) {
      var old = list[i], s = document.createElement("script"), src = old.getAttribute("data-src");
      if (src) { s.src = src; s.async = true; } else { s.text = old.text; }
      old.parentNode.replaceChild(s, old);
    }
  }
  function afterPaint() {
    // A tab opened in the background never paints, so there is nothing to wait for.
    if (document.visibilityState === "hidden") { startTags(); return; }
    setTimeout(startTags, 3000); // safety net if no frame comes
    // The main picture (fetchpriority="high") is decoded off the main thread and can paint a frame or two
    // after "load", so wait for it to be decoded and then for two frames, so the frame showing it has
    // reached the screen (that moment is the LCP time) before any tag starts.
    var waits = [], hero = document.querySelectorAll('img[fetchpriority="high"]');
    for (var i = 0; i < hero.length; i++) if (hero[i].decode) waits.push(hero[i].decode().catch(function () {}));
    function nextFrame() { requestAnimationFrame(function () { requestAnimationFrame(function () { setTimeout(startTags, 0); }); }); }
    if (waits.length && w.Promise) Promise.all(waits).then(nextFrame); else nextFrame();
  }
  if (document.readyState === "complete") afterPaint(); else w.addEventListener("load", afterPaint);
})();
