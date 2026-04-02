(function (global) {
  "use strict";

  const LOCALE_KEY = "portfolio-locale";

  const MESSAGES = {
    vi: {
      "nav.about": "Giới thiệu",
      "nav.skills": "Kỹ năng",
      "nav.projects": "Dự án",
      "nav.contact": "Liên hệ",
      "lang.vi": "VI",
      "lang.en": "EN",
      "theme.toggle": "Chuyển giao diện sáng / tối",
      "nav.menu.open": "Mở menu",
      "nav.menu.close": "Đóng menu",

      "hero.kicker": "Hello, world",
      "hero.h1": "Xin chào, tôi là",
      "hero.role": "Kỹ sư phần mềm · Lập trình web",
      "hero.desc":
        "Sinh viên năm 2 tại Passerelles Numériques Vietnam, đam mê phát triển web. Tôi thích giao diện gọn, trải nghiệm tốt và học công nghệ mới.",
      "hero.cv": "Tải CV",
      "hero.cv_alert": "Cảm ơn bạn đã quan tâm! CV sẽ được gửi khi có liên kết tải — tạm thời liên hệ qua email hoặc form bên dưới.",
      "hero.projects": "Xem dự án",
      "badge.front": "Frontend & Backend",
      "badge.student": "Sinh viên IT",

      "about.tag": "01",
      "about.title": "Về tôi",
      "about.lead": "Nền tảng kỹ thuật và định hướng nghề nghiệp",
      "about.p1":
        "Tôi theo đuổi phát triển web (frontend và backend), code rõ ràng và sản phẩm có ý nghĩa. Mục tiêu: trải nghiệm ổn định, dễ bảo trì, giải quyết vấn đề thực tế.",
      "about.li1": "HTML, CSS, JavaScript và framework phía server",
      "about.li2": "Làm việc nhóm, phiên bản hóa với Git",
      "about.li3": "Học best practice và kiến trúc ứng dụng",

      "skills.tag": "02",
      "skills.title": "Kỹ năng",
      "skills.lead": "Stack có icon chính thức — chọn tab bên dưới",
      "skills.tab.tech": "Kỹ thuật",
      "skills.tab.soft": "Kỹ năng mềm",
      "skills.aria": "Phân loại kỹ năng",

      "soft.comm": "Giao tiếp",
      "soft.team": "Làm nhóm",
      "soft.problem": "Giải quyết vấn đề",
      "soft.time": "Quản lý thời gian",
      "soft.adapt": "Thích nghi",
      "soft.critical": "Tư duy phản biện",
      "soft.creative": "Sáng tạo",
      "soft.lead": "Lãnh đạo",

      "projects.tag": "03",
      "projects.title": "Dự án",
      "projects.lead":
        "Repo ghim trỏ GitHub; danh sách bên dưới bổ sung (không trùng ghim). Link 404 thì sửa tên repo trong code.",
      "projects.featured.tag": "Nổi bật",
      "projects.featured.title": "Portfolio — trang này",
      "projects.featured.desc":
        "Trang đơn, responsive, sáng/tối, animation, con trỏ tùy chỉnh — layout chỉnh tay cho giống sản phẩm.",
      "projects.featured.gh": "GitHub của tôi",
      "projects.featured.contact": "Liên hệ",

      "projects.pinned.title": "Repo đang highlight",
      "projects.pinned.sub": "Bốn dự án — mở code trên GitHub (tên repo khớp URL).",

      "pin.library.desc":
        "Hệ thống quản lý thư viện — mượn/trả, danh mục, người dùng (theo repo).",
      "pin.basic.desc": "Website nền tảng HTML/CSS/JS — bài tập hoặc demo layout.",
      "pin.food.desc": "Dự án ẩm thực / đặt món — theo code trong repo.",
      "pin.php.desc": "Bài tập PHP — form, CRUD hoặc CSDL tùy repo.",

      "projects.api.title": "Thêm từ GitHub API",
      "projects.api.sub": "Repo công khai (ẩn repo đã ghim).",

      "contact.tag": "04",
      "contact.title": "Liên hệ",
      "contact.lead": "Thực tập hoặc hợp tác — gửi tin qua form (đến email của tôi).",

      "form.name": "Họ tên",
      "form.email": "Email",
      "form.message": "Nội dung",
      "form.submit": "Gửi tin nhắn",
      "form.ph.name": "Nguyễn Văn A",
      "form.ph.email": "ban@example.com",
      "form.ph.msg": "Nội dung tin nhắn...",
      "form.sending": "Đang gửi…",
      "form.success": "Đã gửi! Tôi sẽ phản hồi sớm.",
      "form.error": "Gửi thất bại. Thử lại hoặc gửi email trực tiếp.",

      "footer.text": "© 2026 Le Minh Nhat · HTML, CSS & JS",

      "github.loading": "Đang tải repo từ GitHub…",
      "github.empty": "Không còn repo khác (hoặc đều đã ghim).",
      "github.no_desc": "Không có mô tả.",
      "github.open_profile": "Mở profile",
      "github.open_btn": "Mở GitHub",
      "github.repos_count": "repos",
      "github.error":
        "Không tải được GitHub.",
      "github.error_repos": "Xem repo trên GitHub:",
      "github.langs": "Ngôn ngữ (GitHub)",
    },
    en: {
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "lang.vi": "VI",
      "lang.en": "EN",
      "theme.toggle": "Toggle light / dark theme",
      "nav.menu.open": "Open menu",
      "nav.menu.close": "Close menu",

      "hero.kicker": "Hello, world",
      "hero.h1": "Hi, I'm",
      "hero.role": "Software Engineer · Web Developer",
      "hero.desc":
        "Second-year IT student at Passerelles Numériques Vietnam, passionate about web development. I like clean UI, solid UX, and learning new tech.",
      "hero.cv": "Download CV",
      "hero.cv_alert": "Thanks for your interest! A download link can be added later — for now, use email or the contact form below.",
      "hero.projects": "View projects",
      "badge.front": "Frontend & Backend",
      "badge.student": "IT Student",

      "about.tag": "01",
      "about.title": "About me",
      "about.lead": "Technical foundation & career focus",
      "about.p1":
        "I focus on frontend and backend web development, clear code, and meaningful products. I aim for stable, maintainable experiences that solve real problems.",
      "about.li1": "HTML, CSS, JavaScript & server-side frameworks",
      "about.li2": "Teamwork and version control with Git",
      "about.li3": "Learning best practices and application architecture",

      "skills.tag": "02",
      "skills.title": "Skills",
      "skills.lead": "Official stack icons — switch tab below",
      "skills.tab.tech": "Technical",
      "skills.tab.soft": "Soft skills",
      "skills.aria": "Skill category",

      "soft.comm": "Communication",
      "soft.team": "Teamwork",
      "soft.problem": "Problem-solving",
      "soft.time": "Time management",
      "soft.adapt": "Adaptability",
      "soft.critical": "Critical thinking",
      "soft.creative": "Creativity",
      "soft.lead": "Leadership",

      "projects.tag": "03",
      "projects.title": "Projects",
      "projects.lead":
        "Pinned repos link to GitHub; the list below adds more (no duplicates). Fix repo slug in code if links 404.",
      "projects.featured.tag": "Featured",
      "projects.featured.title": "Portfolio — this site",
      "projects.featured.desc":
        "Single-page, responsive, light/dark theme, animations, custom cursor — hand-tuned layout.",
      "projects.featured.gh": "My GitHub",
      "projects.featured.contact": "Contact",

      "projects.pinned.title": "Highlighted repos",
      "projects.pinned.sub": "Four projects — open the repo on GitHub (slug must match).",

      "pin.library.desc":
        "Library management — borrow/return, catalog, users (per repo).",
      "pin.basic.desc": "Basic website — HTML/CSS/JS coursework or layout demo.",
      "pin.food.desc": "Food / ordering project — as implemented in the repo.",
      "pin.php.desc": "PHP coursework — forms, CRUD, or DB per repo.",

      "projects.api.title": "More from GitHub API",
      "projects.api.sub": "Public repos (pinned items are hidden from this list).",

      "contact.tag": "04",
      "contact.title": "Contact",
      "contact.lead": "Internships or collaboration — message goes to my email.",

      "form.name": "Name",
      "form.email": "Email",
      "form.message": "Message",
      "form.submit": "Send message",
      "form.ph.name": "John Doe",
      "form.ph.email": "you@example.com",
      "form.ph.msg": "Your message...",
      "form.sending": "Sending…",
      "form.success": "Sent! I'll reply soon.",
      "form.error": "Send failed. Retry or email me directly.",

      "footer.text": "© 2026 Le Minh Nhat · HTML, CSS & JS",

      "github.loading": "Loading repos from GitHub…",
      "github.empty": "No other repos to show (or all are pinned).",
      "github.no_desc": "No description.",
      "github.open_profile": "Open profile",
      "github.open_btn": "Open GitHub",
      "github.repos_count": "repos",
      "github.error": "Could not load GitHub data.",
      "github.error_repos": "View repos on GitHub:",
      "github.langs": "Languages (GitHub)",
    },
  };

  function getStoredLocale() {
    try {
      return localStorage.getItem(LOCALE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredLocale(lang) {
    try {
      localStorage.setItem(LOCALE_KEY, lang);
    } catch {
      /* ignore */
    }
  }

  function t(key) {
    const lang = document.documentElement.getAttribute("lang") || "vi";
    const table = MESSAGES[lang] || MESSAGES.vi;
    return table[key] !== undefined ? table[key] : MESSAGES.vi[key] || key;
  }

  function apply(lang) {
    if (lang !== "vi" && lang !== "en") lang = "vi";
    document.documentElement.setAttribute("lang", lang);
    setStoredLocale(lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (!key || !MESSAGES[lang][key]) return;
      el.textContent = MESSAGES[lang][key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key || !MESSAGES[lang][key]) return;
      el.setAttribute("placeholder", MESSAGES[lang][key]);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      if (!key || !MESSAGES[lang][key]) return;
      el.innerHTML = MESSAGES[lang][key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (!key || !MESSAGES[lang][key]) return;
      el.setAttribute("aria-label", MESSAGES[lang][key]);
    });

    document.dispatchEvent(new CustomEvent("localechange", { detail: { lang: lang } }));

    const langVi = document.getElementById("langVi");
    const langEn = document.getElementById("langEn");
    if (langVi && langEn) {
      langVi.classList.toggle("is-active", lang === "vi");
      langEn.classList.toggle("is-active", lang === "en");
    }
  }

  function initLocale() {
    const stored = getStoredLocale();
    apply(stored === "en" || stored === "vi" ? stored : "vi");
  }

  global.PortfolioI18n = {
    MESSAGES: MESSAGES,
    t: t,
    apply: apply,
    initLocale: initLocale,
    LOCALE_KEY: LOCALE_KEY,
  };
})(window);
