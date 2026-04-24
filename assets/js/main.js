(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";
  const FORM_EMAIL = "leminhnhat1326@gmail.com";
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

  const langDropdown = document.getElementById("langDropdown");
  const langDropdownTrigger = document.getElementById("langDropdownTrigger");
  const langDropdownPanel = document.getElementById("langDropdownPanel");
  const langDropdownItems = document.querySelectorAll(".lang-dropdown-item");

  function setLangDropdownOpen(open) {
    if (!langDropdown || !langDropdownTrigger || !langDropdownPanel) return;
    langDropdown.classList.toggle("is-open", open);
    langDropdownPanel.hidden = !open;
    langDropdownTrigger.setAttribute("aria-expanded", String(open));
  }

  if (langDropdownTrigger && langDropdownPanel && typeof PortfolioI18n !== "undefined") {
    langDropdownTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const next = !langDropdown.classList.contains("is-open");
      setLangDropdownOpen(next);
    });

    langDropdownItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        const l = btn.getAttribute("data-lang");
        if (l === "en" || l === "vi") {
          PortfolioI18n.apply(l);
        }
      });
    });

    document.addEventListener("click", () => setLangDropdownOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setLangDropdownOpen(false);
    });
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
      icon.className = open ? "ph ph-x" : "ph ph-list";
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
        if (window.innerWidth > 560) setNavOpen(false);
      },
      { passive: true }
    );
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });
 
  const btnCv = document.getElementById("btnCv");
  if (btnCv) {
    btnCv.addEventListener("click", (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của nút nếu có
      const cvPath = "CV_FullStack_LeMinhNhat.pdf"; // Đường dẫn tương đối đến file CV
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = 'LeMinhNhat_CV.pdf'; // Tên file sẽ được tải về
      document.body.appendChild(link); // Thêm link vào body để có thể click
      link.click(); // Kích hoạt sự kiện click để tải file
      document.body.removeChild(link); // Xóa link tạm thời sau khi tải
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

  /* GitHub API + ngôn ngữ theo repo (không hiển thị %) */
  const projectsSection = document.querySelector("[data-github-user]");
  const GITHUB_USER = projectsSection?.dataset.githubUser || "nhatle26";
  const pinnedReposRaw = projectsSection?.dataset.pinnedRepos || "";

  function parsePinnedRepos(raw) {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((entry) => {
        if (entry.includes("/")) {
          const idx = entry.indexOf("/");
          const owner = entry.slice(0, idx).trim();
          const repo = entry.slice(idx + 1).trim();
          if (!owner || !repo) return null;
          return { owner, repo, key: `${owner}/${repo}`.toLowerCase() };
        }
        return { owner: GITHUB_USER, repo: entry, key: `${GITHUB_USER}/${entry}`.toLowerCase() };
      })
      .filter(Boolean);
  }

  const pinnedItems = parsePinnedRepos(pinnedReposRaw);
  const pinnedRepoSet = new Set(pinnedItems.map((p) => p.key));

  const langCache = new Map();

  function formatLangNames(langObj) {
    if (!langObj || typeof langObj !== "object") return "";
    return Object.entries(langObj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name]) => name)
      .join(" · ");
  }

  async function fetchLanguagesFormatted(owner, repo) {
    const key = `${owner}/${repo}`;
    if (langCache.has(key)) return langCache.get(key);
    try {
      const r = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
      );
      if (!r.ok) {
        langCache.set(key, null);
        return null;
      }
      const data = await r.json();
      const s = formatLangNames(data) || null;
      langCache.set(key, s);
      return s;
    } catch {
      langCache.set(key, null);
      return null;
    }
  }

  function applyLocaleToDocument() {
    if (typeof PortfolioI18n === "undefined" || !PortfolioI18n.apply) return;
    const lang = document.documentElement.getAttribute("lang") || "en";
    PortfolioI18n.apply(lang);
  }

  async function renderPinnedReposFromGitHub() {
    const container = document.getElementById("pinnedRepos");
    if (!container || !pinnedItems.length) {
      if (container)
        container.innerHTML = `<p class="repos-status">${escapeHtml(tr("github.empty"))}</p>`;
      return;
    }

    container.innerHTML = `<p class="repos-status" data-i18n="github.loading_pinned">${escapeHtml(tr("github.loading_pinned"))}</p>`;

    const fragment = document.createDocumentFragment();
    for (const item of pinnedItems) {
      let repo;
      try {
        const r = await fetch(`https://api.github.com/repos/${encodeURIComponent(item.owner)}/${encodeURIComponent(item.repo)}`);
        if (!r.ok) throw new Error("repo");
        repo = await r.json();
      } catch {
        const stub = document.createElement("div");
        stub.className = "repo-card repo-card--pinned";
        stub.innerHTML = `<span class="repo-card-name">${escapeHtml(item.owner + "/" + item.repo)}</span><p class="repo-card-desc">${escapeHtml(tr("github.error"))}</p>`;
        fragment.appendChild(stub);
        continue;
      }

      const langsRaw = await fetchLanguagesFormatted(item.owner, item.repo);
      const langsStr = langsRaw
        ? escapeHtml(langsRaw)
        : repo.language
          ? escapeHtml(repo.language)
          : "—";
      const desc = repo.description ? escapeHtml(repo.description) : escapeHtml(tr("github.no_desc"));
      const badge = (repo.language || item.repo).substring(0, 4).toUpperCase();
      const fullName = escapeHtml(repo.full_name || `${item.owner}/${item.repo}`);

      const a = document.createElement("a");
      a.href = repo.html_url;
      a.className = "repo-card repo-card--pinned";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `
        <span class="repo-card-badge mono">${escapeHtml(badge)}</span>
        <span class="repo-card-name">${escapeHtml(repo.name)}</span>
        <p class="repo-card-desc">${desc}</p>
        <div class="repo-lang-row"><span class="repo-lang-key" data-i18n="github.langs">${escapeHtml(tr("github.langs"))}</span> <span class="repo-lang-val mono">${langsStr}</span></div>
        <div class="repo-card-meta">
          <span><i class="ph ph-github-logo"></i> ${fullName}</span>
        </div>
      `;
      fragment.appendChild(a);
    }

    container.innerHTML = "";
    container.appendChild(fragment);
    applyLocaleToDocument();
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
      const repos = reposAll.filter((repo) => !pinnedRepoSet.has((repo.full_name || "").toLowerCase()));

      const bio = profile.bio ? escapeHtml(profile.bio) : "—";
      const locationHtml = profile.location
        ? `<span><i class="ph ph-map-pin"></i> ${escapeHtml(profile.location)}</span>`
        : "";

      profileEl.innerHTML = `
        <div class="github-profile-inner">
          <a href="${escapeHtml(profile.html_url)}" target="_blank" rel="noopener noreferrer">
            <img class="github-avatar" src="${escapeHtml(profile.avatar_url)}" alt="" width="72" height="72" loading="lazy" decoding="async">
            <p class="github-login" style="margin-top:0.75rem">@${escapeHtml(profile.login)}</p>
          </a>
          <p class="github-bio">${bio}</p>
          <div class="github-meta">
            <span><i class="ph ph-folder-open"></i> ${Number(profile.public_repos) || 0} ${escapeHtml(tr("github.repos_count"))}</span>
            ${locationHtml}
          </div>
          <a class="github-open" href="${escapeHtml(profile.html_url)}" target="_blank" rel="noopener noreferrer"><i class="ph ph-github-logo"></i> ${escapeHtml(tr("github.open_btn"))}</a>
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
          <div class="repo-lang-row"><span class="repo-lang-key" data-i18n="github.langs">${escapeHtml(tr("github.langs"))}</span> <span class="repo-lang-val mono">${langLine}</span></div>
          <div class="repo-card-meta">
            <span><i class="ph ph-code"></i> ${repo.language ? escapeHtml(repo.language) : "—"}</span>
            <span><i class="ph ph-star"></i> ${repo.stargazers_count}</span>
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

  void renderPinnedReposFromGitHub();
  loadGitHub();

  document.addEventListener("localechange", () => {
    const loading = document.querySelector("#githubRepos .repos-loading");
    if (loading && loading.dataset.i18n) {
      loading.textContent = tr("github.loading");
    }
  });

  /* Typewriter effect */
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
    const text = "Fullstack Developer";
    let index = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
      if (!isDeleting && index <= text.length) {
        typewriterElement.textContent = text.substring(0, index);
        index++;
        typingSpeed = 100;
        if (index > text.length) {
          isDeleting = true;
          typingSpeed = 2000; // Pause at the end
        }
      } else if (isDeleting && index >= 0) {
        typewriterElement.textContent = text.substring(0, index);
        index--;
        typingSpeed = 50;
        if (index < 0) {
          isDeleting = false;
          typingSpeed = 500; // Pause before typing again
        }
      }
      setTimeout(typeWriter, typingSpeed);
    }
    setTimeout(typeWriter, 1000);
  }

  /* Particle Cursor Trail */
  const canvas = document.getElementById('cursorTrail');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 4 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          life: 1
        });
      }
    });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.fillStyle = `rgba(244, 114, 182, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.95;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }
})();
