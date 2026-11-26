document.addEventListener("DOMContentLoaded",function(){var n=document.querySelector("header nav");if(n){var box=null;n.querySelectorAll("div").forEach(function(d){if(d.children.length===3&&d.textContent.indexOf("BIS & CORE")>-1&&!d.querySelector("a[href*=blogs]")){box=d;d.classList.add("wedo-compact-box");Array.from(d.children).forEach(function(col){col.classList.add("wedo-cat-col");var hd=col.firstElementChild;if(hd){hd.classList.add("wedo-cat-head");hd.onclick=function(e){e.preventDefault();e.stopPropagation();var o=col.classList.contains("open");d.querySelectorAll(".wedo-cat-col").forEach(function(x){x.classList.remove("open")});if(!o)col.classList.add("open")}}})}});var svc=Array.from(n.querySelectorAll("a,button")).find(function(el){return el.textContent.indexOf("Services")>-1&&(!box||!box.contains(el))});if(svc&&box){svc.classList.add("wedo-svc-trigger");svc.childNodes.forEach(function(nd){if(nd.nodeType===3)nd.nodeValue=nd.nodeValue.replace(/[????]/g,"").trim()});var toggleSvc=function(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(box.classList.contains("wedo-svc-open")){box.classList.remove("wedo-svc-open");box.classList.add("wedo-force-closed");box.querySelectorAll(".wedo-cat-col").forEach(function(c){c.classList.remove("open")})}else{box.classList.remove("wedo-force-closed");box.classList.add("wedo-svc-open")}};svc.addEventListener("click",toggleSvc,true);document.addEventListener("click",function(e){if(!box.contains(e.target)&&!svc.contains(e.target)){box.classList.remove("wedo-svc-open");box.classList.add("wedo-force-closed")}},true)}}var p=location.pathname.toLowerCase();if(p.indexOf("services")===-1){var cards=Array.from(document.querySelectorAll("main a,section a")).filter(function(a){return a.textContent.indexOf("VIEW SERVICE")>-1}).map(function(a){return a.closest("div")});if(cards.length>9){cards.slice(9).forEach(function(c){if(c)c.classList.add("wedo-hide-extra-card")})}}});
document.addEventListener("DOMContentLoaded",function(){var n=document.querySelector("header nav");if(!n)return;var box=n.querySelector(".wedo-compact-box");var svc=n.querySelector(".wedo-svc-trigger");if(svc&&box){var c=svc.cloneNode(true);svc.parentNode.replaceChild(c,svc);c.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();var o=box.classList.contains("wedo-svc-open");box.classList.toggle("wedo-svc-open",!o);if(o)box.querySelectorAll(".wedo-cat-col").forEach(function(x){x.classList.remove("open")})},true);document.addEventListener("click",function(e){if(!box.contains(e.target)&&!c.contains(e.target))box.classList.remove("wedo-svc-open")},true)}});
document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("section,div").forEach(function(el){if(el.children.length<10&&el.textContent.indexOf("Step-by-Step Execution Process")>-1&&el.textContent.length<1500)el.classList.add("wedo-hide-proc")})});
document.addEventListener("DOMContentLoaded", function () {
  // 1. Purane hover aur compact-menu ke rules ko band karke sirf .mega-open par 3 columns dikhao
  var style = document.createElement("style");
  style.textContent =
    ".mega .dd, .mega:hover .dd, .mega:focus-within .dd { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }" +
    ".mega.mega-open .dd { display: grid !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }" +
    "@media (max-width: 900px) { .mega.mega-open .dd { display: block !important; } }" +
    ".mega .nav-arrow { display: inline-block; transition: transform 0.25s ease; }" +
    ".mega.mega-open .nav-arrow { transform: rotate(180deg); }";
  document.head.appendChild(style);

  // 2. Services par tap/click karne se 3 columns kholein aur dubara tap karne se band hon
  document.querySelectorAll(".mega").forEach(function (mega) {
    var trigger = mega.querySelector(".mega-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      mega.classList.toggle("mega-open");
    });
  });

  // 3. Bahar kahin bhi tap/click karne par menu band ho jaye
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".mega.mega-open").forEach(function (mega) {
      if (!mega.contains(e.target)) {
        mega.classList.remove("mega-open");
      }
    });
  });
});
[11:00 PM, 11/26/2026] Dharmendra Kumar: document.addEventListener("DOMContentLoaded", function () {
  // 1. Purane hover aur compact-menu ke rules ko band karke sirf .mega-open par 3 columns dikhao
  var style = document.createElement("style");
  style.textContent =
    ".mega .dd, .mega:hover .dd, .mega:focus-within .dd { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }" +
    ".mega.mega-open .dd { display: grid !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }" +
    "@media (max-width: 900px) { .mega.mega-open .dd { display: block !important; } }" +
    ".mega .nav-arrow { display: inline-block; transition: transform 0.25s ease; }" +
    ".mega.mega-open .nav-arrow { transform:…
[11:02 PM, 11/26/2026] Dharmendra Kumar: document.addEventListener("DOMContentLoaded", function () {
  var style = document.createElement("style");
  style.textContent =
    ".mega:hover .dd, .mega:focus-within .dd { display: none !important; }" +
    ".mega .nav-arrow { display: inline-block; transition: transform 0.25s ease; }" +
    ".mega.mega-open .nav-arrow { transform: rotate(180deg); }";
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
    } else {
      mega.classList.remove("mega-open");
      dd.style.setProperty("display", "none", "important");
    }
  }

  // Sabhi dropdowns ko shuru mein band rakho
  document.querySelectorAll(".mega").forEach(function (mega) {
    toggleMega(mega, false);
  });

  // Services par tap/click karne se kholein aur dubara tap karne se band karein
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