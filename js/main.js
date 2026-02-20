// main.js

document.addEventListener("DOMContentLoaded", function () {
  // انتخاب المان‌های مورد نیاز
  const nav = document.querySelector(".nav");
  const searchIcon = document.querySelector(".bi-search");
  const basketIcon = document.querySelector(".bi-basket3");
  const menuIcon = document.querySelector(".bi-list");
  const closeIcons = document.querySelectorAll(".bi-x-lg");

  // انتخاب تمام صفحات منو - اصلاح انتخابگرها
  const searchPage = nav.children[0]; // صفحه جستجو
  const basketPage = nav.children[1]; // صفحه سبد خرید
  const menuPage = nav.children[2]; // صفحه منو

  // مخفی کردن تمام صفحات در ابتدا
  if (searchPage) searchPage.classList.add("hidden");
  if (basketPage) basketPage.classList.add("hidden");
  if (menuPage) menuPage.classList.add("hidden");

  // تابع برای بستن تمام منوها
  function closeAllMenus() {
    if (searchPage) searchPage.classList.add("hidden");
    if (basketPage) basketPage.classList.add("hidden");
    if (menuPage) menuPage.classList.add("hidden");
  }

  // باز کردن صفحه جستجو
  if (searchIcon) {
    // پیدا کردن parent لینک جستجو
    const searchLink = searchIcon.closest("a");
    if (searchLink) {
      searchLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation(); // جلوگیری از انتشار رویداد
        console.log("Search icon clicked"); // برای دیباگ
        closeAllMenus();
        if (searchPage) {
          searchPage.classList.remove("hidden");
          // فوکوس روی input جستجو بعد از باز شدن منو
          setTimeout(() => {
            const searchInput = document.querySelector('input[type="text"]');
            if (searchInput) searchInput.focus();
          }, 100);
        }
      });
    }
  }

  // باز کردن صفحه سبد خرید
  if (basketIcon) {
    const basketLink = basketIcon.closest("a");
    if (basketLink) {
      basketLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Basket icon clicked"); // برای دیباگ
        closeAllMenus();
        if (basketPage) basketPage.classList.remove("hidden");
      });
    }
  }

  // باز کردن صفحه منو
  if (menuIcon) {
    const menuLink = menuIcon.closest("a");
    if (menuLink) {
      menuLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Menu icon clicked"); // برای دیباگ
        closeAllMenus();
        if (menuPage) menuPage.classList.remove("hidden");
      });
    }
  }

  // بستن منوها با کلیک روی آیکون ضربدر
  closeIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Close icon clicked"); // برای دیباگ
      closeAllMenus();
    });
  });

  // جلوگیری از بسته شدن منو هنگام کلیک داخل آن
  if (searchPage) {
    searchPage.addEventListener("click", function (e) {
      e.stopPropagation(); // جلوگیری از بسته شدن هنگام کلیک داخل منو
    });
  }

  if (basketPage) {
    basketPage.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  if (menuPage) {
    menuPage.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // بستن منو با کلیک خارج از منو
  document.addEventListener("click", function (e) {
    // بررسی کنیم که آیا منویی باز است
    const isAnyMenuOpen =
      (searchPage && !searchPage.classList.contains("hidden")) ||
      (basketPage && !basketPage.classList.contains("hidden")) ||
      (menuPage && !menuPage.classList.contains("hidden"));

    if (isAnyMenuOpen) {
      // اگر کلیک روی آیکون‌های نویگیشن نبود
      const clickedOnIcon =
        (searchIcon && searchIcon.contains(e.target)) ||
        (basketIcon && basketIcon.contains(e.target)) ||
        (menuIcon && menuIcon.contains(e.target)) ||
        Array.from(closeIcons).some((icon) => icon && icon.contains(e.target));

      if (!clickedOnIcon) {
        closeAllMenus();
      }
    }
  });

  // اضافه کردن انیمیشن
  function addAnimationToMenus() {
    const menuPages = [searchPage, basketPage, menuPage];

    menuPages.forEach((page) => {
      if (page) {
        page.style.transition = "opacity 0.3s ease-in-out";
        page.style.opacity = "1";
      }
    });
  }

  addAnimationToMenus();

  // اضافه کردن قابلیت جستجو
  const searchInput = document.querySelector('input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = this.value.trim();
        if (searchTerm) {
          console.log("جستجو برای:", searchTerm);
          // اینجا می‌توانید منطق جستجو را اضافه کنید
          alert(`جستجو برای: ${searchTerm}`);
        }
      }
    });
  }

  // بهینه‌سازی برای اسکرول
  let lastScroll = 0;
  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // فقط اگر منویی باز نباشد، نویگیشن مخفی شود
    const isAnyMenuOpen =
      (searchPage && !searchPage.classList.contains("hidden")) ||
      (basketPage && !basketPage.classList.contains("hidden")) ||
      (menuPage && !menuPage.classList.contains("hidden"));

    if (!isAnyMenuOpen) {
      if (currentScroll > lastScroll && currentScroll > 50) {
        nav.style.transform = "translateY(-100%)";
        nav.style.transition = "transform 0.3s ease-in-out";
      } else {
        nav.style.transform = "translateY(0)";
      }
    }

    lastScroll = currentScroll;
  });
});
// Apple Navigation JavaScript
const nav = document.querySelector(".apple-nav-light");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // ========== MOBILE MENU TOGGLE ==========
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  function toggleMobileMenu() {
    navMenu.classList.toggle("active");

    // Toggle icon
    const menuIcon = mobileMenuBtn.querySelector("i");
    if (navMenu.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
      document.body.style.overflow = "";
    }
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 1024) {
      if (
        !navMenu.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)
      ) {
        closeMobileMenu();
      }
    }
  });

  function closeMobileMenu() {
    navMenu.classList.remove("active");
    const menuIcon = mobileMenuBtn.querySelector("i");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
    document.body.style.overflow = "";
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
      document.body.style.overflow = "";
    }
  });

  // ========== SEARCH FUNCTIONALITY ==========
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    // Search with debounce
    let searchTimeout;
    searchInput.addEventListener("input", function (e) {
      clearTimeout(searchTimeout);
      const searchTerm = e.target.value.trim();

      searchTimeout = setTimeout(() => {
        if (searchTerm.length > 0) {
          performSearch(searchTerm);
        }
      }, 500);
    });

    // Search on enter key
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const searchTerm = e.target.value.trim();
        if (searchTerm.length > 0) {
          performSearch(searchTerm);
        }
      }
    });
  }

  function performSearch(term) {
    console.log("Searching for:", term);
    // Add your search logic here
    // You can redirect to search page or show results
    // window.location.href = `/search?q=${encodeURIComponent(term)}`;
  }

  // ========== SCROLL EFFECT ==========
  let lastScroll = 0;
  const nav = document.querySelector(".apple-nav");
  const scrollThreshold = 100;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Don't hide nav on mobile when menu is open
    if (window.innerWidth <= 1024 && navMenu.classList.contains("active")) {
      return;
    }

    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      // Scrolling down - hide nav
      nav.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up - show nav
      nav.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  // ========== SUBMENU TOUCH SUPPORT FOR MOBILE ==========
  if (window.innerWidth <= 1024) {
    const navItems = document.querySelectorAll(".nav-item.group");

    navItems.forEach((item) => {
      const link = item.querySelector("a");
      const submenu = item.querySelector(".submenu");

      if (submenu) {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          // Close other open submenus
          navItems.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherSubmenu = otherItem.querySelector(".submenu");
              if (otherSubmenu) {
                otherSubmenu.style.display = "none";
              }
            }
          });

          // Toggle current submenu
          if (submenu.style.display === "block") {
            submenu.style.display = "none";
          } else {
            submenu.style.display = "block";
          }
        });
      }
    });
  }

  // ========== KEYBOARD NAVIGATION ==========
  const navLinks = document.querySelectorAll(".nav-link, .submenu-link");

  navLinks.forEach((link) => {
    link.addEventListener("keydown", function (e) {
      // Close submenu with Escape key
      if (e.key === "Escape") {
        const parentItem = this.closest(".nav-item.group");
        if (parentItem) {
          const submenu = parentItem.querySelector(".submenu");
          if (submenu && window.innerWidth <= 1024) {
            submenu.style.display = "none";
          }
        }
      }
    });
  });

  // ========== ACTIVE LINK INDICATOR ==========
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  setActiveLink();

  // ========== BAG ICON ANIMATION ==========
  const bagIcon = document.querySelector(".fa-shopping-bag");
  if (bagIcon) {
    bagIcon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });

    bagIcon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }

  // ========== PREVENT BODY SCROLL WHEN SUBMENU IS OPEN ON MOBILE ==========
  const submenus = document.querySelectorAll(".submenu");
  submenus.forEach((submenu) => {
    submenu.addEventListener("touchmove", function (e) {
      e.stopPropagation();
    });
  });

  // ========== ANALYTICS TRACKING (EXAMPLE) ==========
  function trackNavigation(linkName, category) {
    console.log(`Navigation tracked: ${linkName} - ${category}`);
    // Add your analytics code here
    // gtag('event', 'navigation_click', { 'event_category': category, 'event_label': linkName });
  }

  // Track navigation clicks
  document.querySelectorAll(".nav-link, .submenu-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const linkText = this.textContent.trim();
      const category = this.closest(".nav-item")
        ? this.closest(".nav-item")
            .querySelector(".nav-link")
            .textContent.trim()
        : "submenu";
      trackNavigation(linkText, category);
    });
  });

  // ========== INITIALIZATION ==========
  console.log("Apple Navigation initialized successfully");

  // Add class to body when JavaScript is loaded
  document.body.classList.add("js-loaded");
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Format search term
function formatSearchTerm(term) {
  return term
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .trim();
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Export functions if needed (for module usage)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    toggleMobileMenu,
    performSearch,
    debounce,
    throttle,
  };
}
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3, // چند تا اسلاید همزمان نمایش داده بشه
  centeredSlides: true, // اسلاید وسطی وسط باشه
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    type: "fraction", // نمایش به صورت 1/8 ، 2/8 و ...
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // اختیاری: اگر بخواهی بی‌نهایت بچرخه
  // loop: true,

  // اختیاری: خودکار عوض شدن
  // autoplay: {
  //   delay: 3500,
  //   disableOnInteraction: false,
  // },
});
console.log("اسکریپت لود شد");

document.querySelectorAll(".contentBx").forEach((box) => {
  const label = box.querySelector(".label");

  if (label) {
    // console.log("label پیدا شد");
    label.addEventListener("click", () => {
    //   console.log("کلیک انجام شد");
      box.classList.toggle("active");
    });
  } else {
    console.log("label پیدا نشد!");
  }
});
