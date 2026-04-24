(function (global) {
  "use strict";

  const LOCALE_KEY = "portfolio-locale";

  const MESSAGES = {
    vi: {
      "nav.about": "Giới thiệu",
      "nav.skills": "Kỹ năng",
      "nav.projects": "Dự án",
      "nav.contact": "Liên hệ",
      "lang.name_en": "English",
      "lang.name_vi": "Tiếng Việt",
      "lang.dropdown_aria": "Chọn ngôn ngữ",
      "theme.toggle": "Chuyển giao diện sáng / tối",
      "nav.menu.open": "Mở menu",
      "nav.menu.close": "Đóng menu",

      "hero.kicker": "Hello, world",
      "hero.h1": "Xin chào, tôi là",
      "hero.role": "Lập trình viên web · Sinh viên IT",
      "hero.desc":
        "Sinh viên năm 2 tại Passerelles Numériques Vietnam. Mình thích xây giao diện gọn, logic rõ ràng và học thêm công nghệ để làm sản phẩm web hữu ích.",
      "hero.cv": "Tải CV",
      "hero.cv_alert":
        "Cảm ơn bạn đã quan tâm! Link CV có thể bổ sung sau — hiện bạn có thể liên hệ qua email hoặc form bên dưới.",
      "hero.projects": "Xem dự án",
      "badge.front": "Frontend & Backend",
      "badge.student": "Sinh viên IT",

      "about.tag": "01",
      "about.title": "Về tôi",
      "about.lead": "Hành trình trở thành Fullstack Developer",
      "about.p1":
        "Tôi là sinh viên năm 2 tại Passerelles Numériques Vietnam (PNV). Với niềm đam mê mãnh liệt trong việc xây dựng ứng dụng web, tôi luôn nỗ lực kết hợp giữa thẩm mỹ giao diện và sự tối ưu ở hệ thống máy chủ. Mục tiêu của tôi là tạo ra những sản phẩm công nghệ mang lại giá trị thực cho người dùng.",
      "about.li1": "Phát triển giao diện hiện đại với HTML, CSS, JavaScript và các UI Framework.",
      "about.li2": "Xây dựng hệ thống Backend ổn định với PHP (Laravel), Python và MySQL.",
      "about.li3": "Tư duy giải quyết vấn đề, quản lý mã nguồn với Git và làm việc nhóm hiệu quả.",

      "info.location": "Vị trí",
      "info.email": "Email",
      "info.phone": "Điện thoại",
      "info.org": "Tổ chức",
      "info.status": "Trạng thái",
      "info.availability": "Sẵn sàng",

      "skills.tag": "02",
      "skills.title": "Kỹ năng",
      "skills.lead": "Chuyển tab để xem kỹ năng kỹ thuật và kỹ năng mềm.",
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
        "Trên là vài dự án mình muốn làm nổi bật; phía dưới là thêm các project khác trên GitHub.",
      "projects.github_source_note":
        "Mô tả và phần ngôn ngữ trên thẻ theo thông tin từng repository trên GitHub.",
      "projects.featured.tag": "Nổi bật",
      "projects.featured.title": "Portfolio — trang này",
      "projects.featured.desc":
        "Trang portfolio một trang: responsive, sáng/tối, tiếng Việt và tiếng Anh, chuyển động nhẹ và con trỏ tùy chỉnh. Danh sách dự án bên dưới cập nhật theo GitHub của mình.",
      "projects.featured.gh": "GitHub của tôi",
      "projects.featured.contact": "Liên hệ",

      "projects.pinned.title": "Dự án đang ghim",
      "projects.pinned.sub":
        "Thứ tự do mình sắp xếp; nội dung hiển thị theo từng repo trên GitHub.",

      "pin.library.desc":
        "Hệ thống quản lý thư viện: mượn/trả sách, danh mục, người dùng — theo nội dung repo.",
      "pin.basic.desc": "Website tĩnh / nền tảng HTML, CSS và JavaScript — bài tập hoặc demo giao diện.",
      "pin.food.desc": "Ứng dụng / web chủ đề ẩm thực, đặt món — chi tiết theo repo.",
      "pin.php.desc": "Dự án PHP: form, CRUD, làm việc với CSDL — tùy phạm vi trong repo.",

      "projects.api.title": "Các repo khác trên GitHub",
      "projects.api.sub": "Các repository công khai khác trên tài khoản của mình.",

      "contact.tag": "04",
      "contact.title": "Liên hệ",
      "contact.lead":
        "Cứ nhắn qua form hoặc các kênh bên cạnh — mình sẽ phản hồi qua email.",

      "form.name": "Họ tên",
      "form.email": "Email",
      "form.message": "Nội dung",
      "form.submit": "Gửi tin nhắn",
      "form.ph.name": "Nguyễn Văn A",
      "form.ph.email": "ban@example.com",
      "form.ph.msg": "Nội dung tin nhắn...",
      "form.sending": "Đang gửi…",
      "form.success": "Đã gửi! Mình sẽ phản hồi sớm nhất có thể.",
      "form.error": "Gửi không thành công. Thử lại hoặc gửi email trực tiếp.",

      "footer.text": "© 2026 Le Minh Nhat · HTML, CSS & JS",

      "github.loading": "Đang tải danh sách repo…",
      "github.loading_pinned": "Đang tải các repo đã ghim…",
      "github.empty": "Không còn repo công khai khác để hiển thị (hoặc đều đã nằm trong phần ghim).",
      "github.no_desc": "Chưa có mô tả trên GitHub.",
      "github.open_profile": "Xem profile GitHub",
      "github.open_btn": "Mở trên GitHub",
      "github.repos_count": "repos",
      "github.error": "Không tải được dữ liệu từ GitHub.",
      "github.error_repos": "Bạn vẫn có thể xem repo tại:",
      "github.langs": "Ngôn ngữ (theo GitHub)",
    },
    en: {
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "lang.name_en": "English",
      "lang.name_vi": "Tiếng Việt",
      "lang.dropdown_aria": "Choose language",
      "theme.toggle": "Toggle light / dark theme",
      "nav.menu.open": "Open menu",
      "nav.menu.close": "Close menu",

      "hero.kicker": "Hello, world",
      "hero.h1": "Hi, I'm",
      "hero.role": "Web Developer · IT Student",
      "hero.desc":
        "Second-year student at Passerelles Numériques Vietnam. I enjoy building clear UIs, straightforward logic, and picking up tools that help ship useful web projects.",
      "hero.cv": "Download CV",
      "hero.cv_alert":
        "Thanks for your interest! A CV link can be added later — for now, reach out via email or the contact form below.",
      "hero.projects": "View projects",
      "badge.front": "Frontend & Backend",
      "badge.student": "IT Student",

      "about.tag": "01",
      "about.title": "About me",
      "about.lead": "My Journey to becoming a Fullstack Developer",
      "about.p1":
        "I am a 2nd-year student at Passerelles Numériques Vietnam (PNV). Driven by a passion for building web applications, I strive to bridge the gap between intuitive UI and robust server-side logic. My goal is to develop technology solutions that provide real value to users.",
      "about.li1": "Developing modern interfaces with HTML, CSS, JS, and UI frameworks.",
      "about.li2": "Building stable Backend systems using PHP (Laravel), Python, and MySQL.",
      "about.li3": "Problem-solving mindset, version control with Git, and effective teamwork.",

      "info.location": "Location",
      "info.email": "Email",
      "info.phone": "Phone",
      "info.org": "Organization",
      "info.status": "Status",
      "info.availability": "Availability",

      "skills.tag": "02",
      "skills.title": "Skills",
      "skills.lead": "Switch tabs to see technical skills and soft skills.",
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
        "A few projects I want to highlight first; below that, more of my work on GitHub.",
      "projects.github_source_note":
        "Descriptions and language labels on each card follow that repository on GitHub.",
      "projects.featured.tag": "Featured",
      "projects.featured.title": "Portfolio — this site",
      "projects.featured.desc":
        "A one-page portfolio: responsive, light and dark mode, English and Vietnamese, subtle motion, and a custom cursor. The project list below stays in step with my GitHub.",
      "projects.featured.gh": "My GitHub",
      "projects.featured.contact": "Contact",

      "projects.pinned.title": "Pinned projects",
      "projects.pinned.sub":
        "Order is mine to set; what you see is pulled from each repo on GitHub.",

      "pin.library.desc":
        "Library-style system: lending, catalog, users — as implemented in the repo.",
      "pin.basic.desc": "Static / foundational site with HTML, CSS, and JavaScript — coursework or UI practice.",
      "pin.food.desc": "Food or ordering-themed app or site — see the repo for scope.",
      "pin.php.desc": "PHP work: forms, CRUD, database usage — depending on what’s in the repo.",

      "projects.api.title": "Other public repos",
      "projects.api.sub": "Other public repositories on my account.",

      "contact.tag": "04",
      "contact.title": "Contact",
      "contact.lead":
        "Use the form or the links beside it — I’ll reply by email.",

      "form.name": "Name",
      "form.email": "Email",
      "form.message": "Message",
      "form.submit": "Send message",
      "form.ph.name": "John Doe",
      "form.ph.email": "you@example.com",
      "form.ph.msg": "Your message...",
      "form.sending": "Sending…",
      "form.success": "Sent! I’ll get back to you as soon as I can.",
      "form.error": "Something went wrong. Try again or email me directly.",

      "footer.text": "© 2026 Le Minh Nhat · HTML, CSS & JS",

      "github.loading": "Loading repositories…",
      "github.loading_pinned": "Loading pinned repositories…",
      "github.empty": "No other public repos to list (or they’re all shown as pinned).",
      "github.no_desc": "No description on GitHub yet.",
      "github.open_profile": "Open GitHub profile",
      "github.open_btn": "Open on GitHub",
      "github.repos_count": "repos",
      "github.error": "Could not load data from GitHub.",
      "github.error_repos": "You can still browse repositories at:",
      "github.langs": "Languages (from GitHub)",
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
    const lang = document.documentElement.getAttribute("lang") || "en";
    const table = MESSAGES[lang] || MESSAGES.en;
    return table[key] !== undefined ? table[key] : MESSAGES.en[key] || MESSAGES.vi[key] || key;
  }

  function syncLangDropdown(activeLang) {
    const wrap = document.getElementById("langDropdown");
    const trigger = document.getElementById("langDropdownTrigger");
    const panel = document.getElementById("langDropdownPanel");
    const flagEl = document.getElementById("langCurrentFlag");
    const labelEl = document.getElementById("langCurrentLabel");
    const table = MESSAGES[activeLang] || MESSAGES.en;

    if (flagEl) flagEl.textContent = activeLang === "vi" ? "🇻🇳" : "🇬🇧";
    if (labelEl) {
      labelEl.textContent =
        activeLang === "vi" ? table["lang.name_vi"] : table["lang.name_en"];
    }

    document.querySelectorAll(".lang-dropdown-item").forEach(function (btn) {
      const d = btn.getAttribute("data-lang");
      btn.classList.toggle("is-active", d === activeLang);
    });

    if (wrap) wrap.classList.remove("is-open");
    if (panel) {
      panel.hidden = true;
    }
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  }

  function apply(lang) {
    if (lang !== "vi" && lang !== "en") lang = "en";
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

    syncLangDropdown(lang);
  }

  function initLocale() {
    const stored = getStoredLocale();
    apply(stored === "en" || stored === "vi" ? stored : "en");
  }

  global.PortfolioI18n = {
    MESSAGES: MESSAGES,
    t: t,
    apply: apply,
    initLocale: initLocale,
    LOCALE_KEY: LOCALE_KEY,
  };
})(window);
