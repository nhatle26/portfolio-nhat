(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";
  const FORM_EMAIL = "nhat.le27@students.passerellesnumeriques.org";
  const FORMSUBMIT_AJAX = "https://formsubmit.co/ajax/" + encodeURIComponent(FORM_EMAIL);

  function tr(key, fallback) {
    if (typeof PortfolioI18n !== "undefined" && PortfolioI18n.t) {
      const s = PortfolioI18n.t(key);
      if (s && s !== key) return s;
    }
    return fallback !== undefined ? fallback : key;
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  }

  function setStoredTheme(value) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch {
      /* ignore */
    }
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme === "dark" ? "dark" : "light";
      setStoredTheme(theme);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute("content", theme === "dark" ? "#0a0f1a" : "#fffdf9");
      }
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
      return;
    }
    applyTheme("dark");
  }

  if (typeof PortfolioI18n !== "undefined") {
    PortfolioI18n.initLocale();
  }

  initTheme();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  const langVi = document.getElementById("langVi");
  const langEn = document.getElementById("langEn");
  if (langVi && langEn && typeof PortfolioI18n !== "undefined") {
    langVi.addEventListener("click", () => PortfolioI18n.apply("vi"));
    langEn.addEventListener("click", () => PortfolioI18n.apply("en"));
  }

  /* Mobile nav */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const siteHeader = document.getElementById("siteHeader");

  function setNavOpen(open) {
    if (!siteNav || !navToggle) return;
    siteNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", tr(open ? "nav.menu.close" : "nav.menu.open"));
    if (siteHeader) siteHeader.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-open", open);
    const icon = navToggle.querySelector("i");
    if (icon) {
      icon.className = open ? "fas fa-xmark" : "fas fa-bars";
    }
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      setNavOpen(!siteNav.classList.contains("is-open"));
    });
    siteNav.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", () => setNavOpen(false));
    });
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 768) setNavOpen(false);
      },
      { passive: true }
    );
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });

  const btnCv = document.getElementById("btnCv");
  if (btnCv) {
    btnCv.addEventListener("click", () => {
      alert(tr("hero.cv_alert"));
    });
  }

  function escapeHtml(str) {
    if (str == null) return "";
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  /* Skills tabs */
  const skillToggle = document.getElementById("skillToggle");
  const tabTechnical = document.getElementById("tab-technical");
  const tabSoft = document.getElementById("tab-soft");
  const panelTechnical = document.getElementById("panel-technical");
  const panelSoft = document.getElementById("panel-soft");

  function activateSkillTab(panel) {
    if (!skillToggle || !tabTechnical || !tabSoft || !panelTechnical || !panelSoft) return;
    const isTech = panel === "technical";
    skillToggle.dataset.active = isTech ? "technical" : "soft";
    tabTechnical.classList.toggle("is-active", isTech);
    tabSoft.classList.toggle("is-active", !isTech);
    tabTechnical.setAttribute("aria-selected", String(isTech));
    tabSoft.setAttribute("aria-selected", String(!isTech));
    panelTechnical.hidden = !isTech;
    panelSoft.hidden = isTech;
  }

  if (tabTechnical && tabSoft) {
    tabTechnical.addEventListener("click", () => activateSkillTab("technical"));
    tabSoft.addEventListener("click", () => activateSkillTab("soft"));
  }

  /* Contact form — FormSubmit AJAX → email */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const formSubmitBtn = document.getElementById("formSubmitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (formStatus) formStatus.textContent = "";
      const name = document.getElementById("name")?.value?.trim();
      const email = document.getElementById("email")?.value?.trim();
      const message = document.getElementById("message")?.value?.trim();
      if (!name || !email || !message) return;

      const submitSpan = formSubmitBtn?.querySelector("span[data-i18n]");
      const prevBtnText = submitSpan ? submitSpan.textContent : "";
      if (submitSpan) submitSpan.textContent = tr("form.sending");
      if (formSubmitBtn) formSubmitBtn.disabled = true;

      try {
        const res = await fetch(FORMSUBMIT_AJAX, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: "Portfolio — tin từ " + name,
            _template: "table",
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) {
          throw new Error("submit");
        }
        if (formStatus) {
          formStatus.textContent = tr("form.success");
          formStatus.className = "form-status form-status--ok";
        }
        contactForm.reset();
      } catch {
        if (formStatus) {
          formStatus.textContent = tr("form.error");
          formStatus.className = "form-status form-status--err";
        }
      } finally {
        if (formSubmitBtn) formSubmitBtn.disabled = false;
        if (submitSpan) submitSpan.textContent = prevBtnText || tr("form.submit");
      }
    });
  }

  document.addEventListener("localechange", () => {
    if (formStatus) {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }
  });

  const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
  const sections = document.querySelectorAll("section[id]");

  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  function setActiveNav() {
    const scrollY = window.scrollY;
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute("id") || "";
      }
    });
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  const revealEls = document.querySelectorAll(".section-reveal");
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  function markFallback(img, containerSelector) {
    const wrap = img.closest(containerSelector);
    if (!wrap) return;
    img.addEventListener("error", () => {
      wrap.classList.add("is-fallback");
    });
  }

  document.querySelectorAll(".hero-photo img").forEach((img) => markFallback(img, ".hero-photo"));
  document.querySelectorAll(".about-frame img").forEach((img) => markFallback(img, ".about-frame"));

  /* GitHub API + ngôn ngữ theo repo */
  const projectsSection = document.querySelector("[data-github-user]");
  const GITHUB_USER = projectsSection?.dataset.githubUser || "nhatle26";
  const pinnedReposRaw = projectsSection?.dataset.pinnedRepos || "";
  const pinnedRepoSet = new Set(
    pinnedReposRaw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );

  const langCache = new Map();

  function formatLangPct(langObj) {
    if (!langObj || typeof langObj !== "object") return "";
    const total = Object.values(langObj).reduce((a, b) => a + b, 0);
    if (!total) return "";
    return Object.entries(langObj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([k, v]) => `${k} ${Math.round((v / total) * 100)}%`)
      .join(" · ");
  }

  async function fetchLanguagesFormatted(owner, repo) {
    const key = `${owner}/${repo}`;
    if (langCache.has(key)) return langCache.get(key);
    try {
      const r = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`);
      if (!r.ok) {
        langCache.set(key, null);
        return null;
      }
      const data = await r.json();
      const s = formatLangPct(data) || null;
      langCache.set(key, s);
      return s;
    } catch {
      langCache.set(key, null);
      return null;
    }
  }

  async function fillRepoLanguageElements() {
    const nodes = document.querySelectorAll(".js-repo-lang");
    for (const el of nodes) {
      const owner = el.dataset.owner;
      const repo = el.dataset.repo;
      if (!owner || !repo) continue;
      el.textContent = "…";
      const s = await fetchLanguagesFormatted(owner, repo);
      el.textContent = s || "—";
    }
  }

  async function loadGitHub() {
    const profileEl = document.getElementById("githubProfile");
    const reposEl = document.getElementById("githubRepos");
    if (!profileEl || !reposEl) return;

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}`),
        fetch(
          `https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/repos?sort=updated&per_page=20`
        ),
      ]);

      if (!profileRes.ok) throw new Error("profile");

      const profile = await profileRes.json();
      const reposAll = reposRes.ok ? await reposRes.json() : [];
      const repos = reposAll.filter((repo) => !pinnedRepoSet.has(repo.name.toLowerCase()));

      const bio = profile.bio ? escapeHtml(profile.bio) : "—";
      const locationHtml = profile.location
        ? `<span><i class="fas fa-location-dot"></i> ${escapeHtml(profile.location)}</span>`
        : "";

      profileEl.innerHTML = `
        <div class="github-profile-inner">
          <a href="${escapeHtml(profile.html_url)}" target="_blank" rel="noopener noreferrer">
            <img class="github-avatar" src="${escapeHtml(profile.avatar_url)}" alt="" width="72" height="72" loading="lazy" decoding="async">
            <p class="github-login" style="margin-top:0.75rem">@${escapeHtml(profile.login)}</p>
          </a>
          <p class="github-bio">${bio}</p>
          <div class="github-meta">
            <span><i class="fas fa-folder-open"></i> ${Number(profile.public_repos) || 0} ${escapeHtml(tr("github.repos_count"))}</span>
            ${locationHtml}
          </div>
          <a class="github-open" href="${escapeHtml(profile.html_url)}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> ${escapeHtml(tr("github.open_btn"))}</a>
        </div>
      `;

      reposEl.innerHTML = "";
      const fragment = document.createDocumentFragment();

      const items = await Promise.all(
        repos.map(async (repo) => {
          const langsStr = await fetchLanguagesFormatted(GITHUB_USER, repo.name);
          return { repo, langsStr };
        })
      );

      items.forEach(({ repo, langsStr }) => {
        const a = document.createElement("a");
        a.href = repo.html_url;
        a.className = "repo-card";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        const desc = repo.description ? escapeHtml(repo.description) : escapeHtml(tr("github.no_desc"));
        const langLine = langsStr
          ? escapeHtml(langsStr)
          : repo.language
            ? escapeHtml(repo.language)
            : "—";
        a.innerHTML = `
          <span class="repo-card-name">${escapeHtml(repo.name)}</span>
          <p class="repo-card-desc">${desc}</p>
          <div class="repo-lang-row"><span class="repo-lang-key">${escapeHtml(tr("github.langs"))}</span> <span class="repo-lang-val mono">${langLine}</span></div>
          <div class="repo-card-meta">
            <span><i class="fas fa-code"></i> ${repo.language ? escapeHtml(repo.language) : "—"}</span>
            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
          </div>
        `;
        fragment.appendChild(a);
      });
      reposEl.appendChild(fragment);

      if (!repos.length) {
        reposEl.innerHTML = `<p class="repos-status">${escapeHtml(tr("github.empty"))}</p>`;
      }
    } catch {
      profileEl.innerHTML = `<div class="github-error">${escapeHtml(tr("github.error"))} <a href="https://github.com/${escapeHtml(GITHUB_USER)}" target="_blank" rel="noopener noreferrer">${escapeHtml(tr("github.open_profile"))}</a></div>`;
      reposEl.innerHTML = `<div class="repos-error">${escapeHtml(tr("github.error_repos"))} <a href="https://github.com/${escapeHtml(GITHUB_USER)}?tab=repositories" target="_blank" rel="noopener noreferrer">github.com/${escapeHtml(GITHUB_USER)}</a></div>`;
    }
  }

  fillRepoLanguageElements();
  loadGitHub();

  document.addEventListener("localechange", () => {
    const loading = document.querySelector("#githubRepos .repos-loading");
    if (loading && loading.dataset.i18n) {
      loading.textContent = tr("github.loading");
    }
  });

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (dot && ring && finePointer && !prefersReducedMotion) {
    document.body.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafRunning = false;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, .magnetic, .skill-toggle-btn, .skill-tile, .repo-card, .lang-btn, .nav-toggle';

    function frame() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      const dist = Math.hypot(mouseX - ringX, mouseY - ringY);
      if (dist > 0.4) {
        requestAnimationFrame(frame);
      } else {
        rafRunning = false;
      }
    }

    document.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        const el = e.target.closest(interactiveSelector);
        if (el) {
          ring.classList.add("is-hover");
        } else {
          ring.classList.remove("is-hover");
        }
        if (!rafRunning) {
          rafRunning = true;
          requestAnimationFrame(frame);
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      () => {
        ring.classList.remove("is-hover");
      },
      { passive: true }
    );

    const magnetics = document.querySelectorAll(".magnetic");
    magnetics.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 0.14;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }
})();
