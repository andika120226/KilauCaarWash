// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================

const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
const mobileNavClose = document.querySelector(".mobile-nav-close");
const body = document.body;

// Function to open mobile navigation
function openMobileNav() {
  mobileNav.classList.add("active");
  mobileNavOverlay.classList.add("active");
  hamburger.classList.add("active");
  body.classList.add("mobile-nav-open");
}

// Function to close mobile navigation
function closeMobileNav() {
  mobileNav.classList.remove("active");
  mobileNavOverlay.classList.remove("active");
  hamburger.classList.remove("active");
  body.classList.remove("mobile-nav-open");
}

// Toggle mobile nav when hamburger is clicked
if (hamburger) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (mobileNav.classList.contains("active")) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });
}

// Close mobile nav when close button is clicked
if (mobileNavClose) {
  mobileNavClose.addEventListener("click", () => {
    closeMobileNav();
  });
}

// Close mobile nav when overlay is clicked
if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener("click", () => {
    closeMobileNav();
  });
}

// Close mobile nav when a nav link is clicked
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNav();
  });
});

// Close mobile nav on window resize if it's open and screen becomes desktop size
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileNav.classList.contains("active")) {
    closeMobileNav();
  }
});

// Prevent body scroll when mobile nav is open (additional touch prevention)
if (mobileNav) {
  mobileNav.addEventListener("touchmove", (e) => {
    e.stopPropagation();
  });
}

// ========================================
// LEGACY SUPPORT (Old nav-menu if exists)
// ========================================

const navMenu = document.querySelector(".nav-menu");

// Close old nav-menu when clicking on nav links (backward compatibility)
if (navMenu) {
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      if (hamburger) hamburger.classList.remove("active");
    });
  });
}

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      if (mobileNav && mobileNav.classList.contains("active")) {
        closeMobileNav();
      }
      if (navMenu) {
        navMenu.classList.remove("active");
        if (hamburger) hamburger.classList.remove("active");
      }
    }
  });
});

// Navbar Background on Scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "white";
    navbar.style.backdropFilter = "none";
  }
});

// Animate on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections (include gallery and CTA map card)
const animateElements = document.querySelectorAll(
  ".service-card, .feature-card, .testimonial-card, .partner-card, .gallery-item, .cta-map-card"
);

animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  // make scroll reveal animation slower (0.5x speed -> longer duration)
  el.style.transition = "opacity 1.2s ease, transform 1.2s ease";
  observer.observe(el);
});

// Counter Animation for Stats
const statItems = document.querySelectorAll(".stat-item h3");

const animateCounter = (element, target) => {
  const targetNumber = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/[0-9]/g, "");
  const duration = 2000;
  const steps = 60;
  const stepValue = targetNumber / steps;
  const stepDuration = duration / steps;

  let current = 0;
  const timer = setInterval(() => {
    current += stepValue;
    if (current >= targetNumber) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, stepDuration);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const target = entry.target.textContent;
        animateCounter(entry.target, target);
        entry.target.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 }
);

statItems.forEach((stat) => {
  statsObserver.observe(stat);
});

// Form Submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value || "Belum ditentukan";
    const time = document.getElementById("time").value || "Belum ditentukan";
    const message = document.getElementById("message").value;

    // Get service label from select (with price)
    const serviceSelect = document.getElementById("service");
    let serviceLabel = "Tidak dipilih";
    if (serviceSelect && serviceSelect.selectedIndex > 0) {
      serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;
    }

    // Build WhatsApp message with better formatting
    let waMessage = `Halo Kilau Carwash, saya ingin mengirimkan pesan:%0A%0A`;
    waMessage += `📝 Data Kontak:%0A`;
    waMessage += `Nama: ${name}%0A`;
    waMessage += `Email: ${email}%0A`;
    waMessage += `Telepon: ${phone}%0A%0A`;
    waMessage += `🚗 Jenis Layanan: ${serviceLabel}%0A`;
    waMessage += `📅 Tanggal Booking: ${date}%0A`;
    waMessage += `⏰ Waktu: ${time}%0A%0A`;
    waMessage += `💬 Pesan:%0A${message}`;

    // Redirect ke WhatsApp
    window.open(`https://wa.me/6282175424507?text=${waMessage}`, "_blank");

    // Show success message
    alert(
      "Pesan Anda akan dikirim ke WhatsApp. Silakan konfirmasi di WhatsApp."
    );

    // Reset form
    contactForm.reset();
  });
}

// Booking WhatsApp Button Handler
const bookingWhatsappBtn = document.getElementById("bookingWhatsappBtn");

if (bookingWhatsappBtn) {
  bookingWhatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value || "Belum ditentukan";
    const time = document.getElementById("time").value || "Belum ditentukan";
    const message = document.getElementById("message").value;

    // Get service label from select (with price)
    const serviceSelect = document.getElementById("service");
    let serviceLabel = "Tidak dipilih";
    if (serviceSelect && serviceSelect.selectedIndex > 0) {
      serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;
    }

    // Validate form
    if (!name || !phone) {
      alert("Silakan isi Nama dan Nomor Telepon terlebih dahulu!");
      return;
    }

    // Build WhatsApp message
    let waMessage = `Halo Admin Kilau Carwash, Saya ingin melakukan pemesanan/bertanya.%0A%0A`;
    waMessage += `📝 Data Kontak:%0A`;
    waMessage += `Nama: ${name}%0A`;
    if (email) waMessage += `Email: ${email}%0A`;
    waMessage += `Nomor HP: ${phone}%0A%0A`;
    waMessage += `🚗 Jenis Layanan: ${serviceLabel}%0A`;
    waMessage += `📅 Tanggal Booking: ${date}%0A`;
    waMessage += `⏰ Waktu: ${time}%0A%0A`;
    waMessage += `💬 Pesan:%0A${message}%0A%0A`;
    waMessage += `Terima kasih! 🚗✨`;

    // Redirect ke WhatsApp
    window.open(`https://wa.me/6282175424507?text=${waMessage}`, "_blank");
  });
}

// Booking Button Click Handler
const bookingButtons = document.querySelectorAll(".btn-primary");

bookingButtons.forEach((button) => {
  if (
    button.textContent.includes("Booking") ||
    button.textContent.includes("Pesan")
  ) {
    button.addEventListener("click", () => {
      // Scroll to contact form
      const contactSection = document.getElementById("kontak");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

// Service Card Selection (updated)
const selectedPackages = [];

const formatPrice = (num) => {
  return "Rp " + (num || 0).toLocaleString("id-ID");
};

const parsePrice = (text) => {
  if (!text) return 0;
  const onlyNums = text.replace(/[^0-9]/g, "");
  return onlyNums ? parseInt(onlyNums, 10) : 0;
};

const updateOrderPanel = () => {
  const list = document.getElementById("selected-list");
  const totalEl = document.getElementById("order-total");
  if (!list || !totalEl) return;
  list.innerHTML = "";
  let total = 0;
  selectedPackages.forEach((pkg, index) => {
    const li = document.createElement("li");
    // left: name and qty input
    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "8px";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = pkg.name;

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = 0;
    qtyInput.value = pkg.qty || 1;
    qtyInput.style.width = "64px";
    qtyInput.style.padding = "6px";
    qtyInput.style.borderRadius = "6px";
    qtyInput.style.border = "1px solid #eee";

    qtyInput.addEventListener("change", (e) => {
      const v = parseInt(e.target.value, 10) || 0;
      const idx2 = selectedPackages.findIndex((p) => p.name === pkg.name);
      if (v <= 0) {
        // remove package if found
        if (idx2 !== -1) selectedPackages.splice(idx2, 1);
        // restore button state
        const btns = document.querySelectorAll(".service-card");
        btns.forEach((card) => {
          const h3 = card.querySelector("h3")?.textContent?.trim();
          if (h3 === pkg.name) {
            const btn = card.querySelector("button");
            if (btn) {
              btn.textContent = btn.dataset.originalText || "Pilih Paket";
              btn.classList.remove("btn-primary");
              btn.classList.add("btn-outline");
            }
          }
        });
      } else {
        if (idx2 !== -1) {
          selectedPackages[idx2].qty = v;
        }
      }
      updateOrderPanel();
    });

    left.appendChild(qtyInput);
    left.appendChild(nameSpan);

    // right: price total
    const right = document.createElement("div");
    right.textContent = formatPrice((pkg.price || 0) * (pkg.qty || 1));

    li.appendChild(left);
    li.appendChild(right);

    list.appendChild(li);
    total += (pkg.price || 0) * (pkg.qty || 1);
  });
  totalEl.textContent = formatPrice(total);
};

const toggleSelection = (card, button) => {
  const name = card.querySelector("h3").textContent.trim();
  const priceText = card.querySelector(".service-price")?.textContent || "";
  const price = parsePrice(priceText);
  const idx = selectedPackages.findIndex((p) => p.name === name);
  if (idx === -1) {
    selectedPackages.push({ name, price, qty: 1 });
    card.classList.add("selected-card");
    button.textContent = "Dipilih";
    button.classList.remove("btn-outline");
    button.classList.add("btn-primary");
  } else {
    selectedPackages.splice(idx, 1);
    card.classList.remove("selected-card");
    button.textContent = button.dataset.originalText || "Pilih Paket";
    button.classList.remove("btn-primary");
    button.classList.add("btn-outline");
  }
  updateOrderPanel();
  // Open the order panel (Hitung) automatically when a package is selected
  const panel = document.getElementById("order-panel");
  if (panel && selectedPackages.length > 0) {
    panel.classList.remove("hidden");
  }
};

// Order panel controls
const orderPanel = document.getElementById("order-panel");
const orderClose = document.getElementById("order-close");
const orderWhatsapp = document.getElementById("order-whatsapp");

const WHATSAPP_NUMBER = "6282175424507"; // change if needed (no +, country code included)

const calcTotal = () => {
  return selectedPackages.reduce((sum, p) => sum + p.price * (p.qty || 1), 0);
};

const buildWhatsAppMessage = () => {
  if (selectedPackages.length === 0) return "";
  const total = calcTotal();
  let msg = "Halo, saya ingin memesan layanan dari Kilau Carwash:%0A";
  selectedPackages.forEach((p) => {
    msg += `- ${p.name} x${p.qty || 1} (${formatPrice(
      p.price * (p.qty || 1)
    ).replace(/ /g, "")})%0A`;
  });
  msg += `%0ATotal: ${formatPrice(total).replace(
    / /g,
    ""
  )}%0A%0ANama:%0ATelepon:%0AAlamat:%0A`; // placeholders
  return msg;
};

if (orderClose) {
  orderClose.addEventListener("click", () =>
    orderPanel.classList.add("hidden")
  );
}

if (orderWhatsapp) {
  orderWhatsapp.addEventListener("click", () => {
    if (selectedPackages.length === 0) {
      alert("Silakan pilih minimal 1 paket terlebih dahulu.");
      return;
    }
    // Prefill contact form and scroll to it so user can enter name/email/phone before sending via WhatsApp
    const contactSection = document.getElementById("kontak");
    const textarea = document.querySelector("#contactForm textarea");
    const nameInput = document.querySelector('#contactForm input[type="text"]');
    if (textarea) {
      const plain = decodeURIComponent(buildWhatsAppMessage());
      textarea.value = plain;
    }
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      if (nameInput) nameInput.focus();
      // close order panel after linking to contact form
      if (orderPanel) orderPanel.classList.add("hidden");
    }
  });
}

// Partner Registration Button
const partnerButton = document.querySelector(".cta-partner button");

if (partnerButton) {
  partnerButton.addEventListener("click", () => {
    alert(
      "Terima kasih atas minat Anda!\n\nTim partnership kami akan menghubungi Anda segera untuk informasi lebih lanjut."
    );
  });
}

// Add hover effect to testimonial cards
const testimonialCards = document.querySelectorAll(".testimonial-card");

testimonialCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.borderLeft = "4px solid var(--primary-color)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.borderLeft = "none";
  });
});

// Lazy loading for images (if images are added later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => imageObserver.observe(img));
}

// Add loading state to buttons
const allButtons = document.querySelectorAll("button");

allButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Add ripple effect
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Console welcome message
console.log(
  "%c🚗 Kilau Carwash",
  "color: #00a8ff; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cJasa Cuci Mobil Terbaik Se-Indonesia",
  "color: #666; font-size: 14px;"
);
console.log("%cWebsite: www.kilaucarwash.com", "color: #999; font-size: 12px;");
// ============================================
// Feedback (Komentar & Rating) - kontak.html
// ============================================
(function () {
  const form = document.getElementById("feedbackForm");
  const listEl = document.getElementById("feedbackList");
  const avgEl = document.getElementById("avgRating");
  const avgStarsEl = document.getElementById("avgStars");
  const totalEl = document.getElementById("totalReviews");

  if (!form || !listEl || !avgEl || !totalEl) return; // Only run on kontak.html

  const STORAGE_KEY = "kilau_feedback_v1";

  const loadItems = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };

  const saveItems = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const escapeHtml = (str) => {
    return String(str).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[c])
    );
  };

  const renderStarsHtml = (rating) => {
    let html = "";
    const r = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    for (let i = 1; i <= 5; i++) {
      html += `<i class="fas fa-star ${
        i <= r ? "star-filled" : "star-empty"
      }"></i>`;
    }
    return html;
  };

  const render = () => {
    const items = loadItems();
    listEl.innerHTML = "";

    if (items.length === 0) {
      avgEl.textContent = "0.0";
      totalEl.textContent = "0";
      if (avgStarsEl) avgStarsEl.innerHTML = renderStarsHtml(0);
      listEl.innerHTML =
        '<div class="empty-feedback">Belum ada ulasan. Jadilah yang pertama!</div>';
      return;
    }

    const total = items.reduce((sum, it) => sum + (Number(it.rating) || 0), 0);
    const avg = total / items.length;
    avgEl.textContent = avg.toFixed(1);
    totalEl.textContent = items.length;
    if (avgStarsEl) avgStarsEl.innerHTML = renderStarsHtml(avg);

    items
      .slice()
      .reverse()
      .forEach((it) => {
        const div = document.createElement("div");
        div.className = "feedback-item";
        const dateStr = new Date(it.date).toLocaleDateString("id-ID");
        div.innerHTML = `
          <div class="feedback-item-header">
            <div class="feedback-item-name"><i class="fas fa-user-circle"></i>${escapeHtml(
              it.name
            )}</div>
            <div class="feedback-item-stars">${renderStarsHtml(
              Number(it.rating) || 0
            )}</div>
          </div>
          <div class="feedback-item-comment">${escapeHtml(it.comment)}</div>
          <div class="feedback-item-meta">${dateStr}</div>
        `;
        listEl.appendChild(div);
      });
  };

  // Controls: Reload & Clear All
  const reloadBtn = document.getElementById("feedbackReload");
  const clearBtn = document.getElementById("feedbackClear");
  const msgEl = document.getElementById("feedbackMessage");

  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
      render();
      if (msgEl) {
        msgEl.classList.remove("hidden", "error");
        msgEl.classList.add("success");
        msgEl.textContent = "Daftar komentar dimuat ulang.";
        setTimeout(() => msgEl.classList.add("hidden"), 1500);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (
        !confirm(
          "Yakin hapus semua komentar? Tindakan ini tidak dapat dibatalkan."
        )
      )
        return;
      saveItems([]);
      render();
      if (msgEl) {
        msgEl.classList.remove("hidden", "error");
        msgEl.classList.add("success");
        msgEl.textContent = "Semua komentar telah dihapus.";
        setTimeout(() => msgEl.classList.add("hidden"), 1500);
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("fbName").value.trim();
    const comment = document.getElementById("fbComment").value.trim();
    const checked = form.querySelector('input[name="rating"]:checked');
    const rating = Number((checked && checked.value) || 0);
    const msgEl = document.getElementById("feedbackMessage");

    if (!name || !comment || rating < 1) {
      if (msgEl) {
        msgEl.classList.remove("hidden");
        msgEl.classList.remove("success");
        msgEl.classList.add("error");
        msgEl.textContent = "Mohon isi nama, komentar, dan pilih rating.";
      }
      return;
    }

    const items = loadItems();
    items.push({ name, comment, rating, date: Date.now() });
    saveItems(items);

    if (msgEl) {
      msgEl.classList.remove("hidden");
      msgEl.classList.remove("error");
      msgEl.classList.add("success");
      msgEl.textContent = "Terima kasih! Ulasan Anda berhasil disimpan.";
    }

    form.reset();
    render();
  });

  render();
})();
// ============================================
// ADDITIONAL INTERACTIVE FEATURES
// ============================================

// Hero Slider (for home.html)
const initHeroSlider = () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-slider-dots .dot");

  if (slides.length === 0 || dots.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  // Auto slide
  setInterval(nextSlide, slideInterval);

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
};

// Parallax effect for hero background
const initHeroParallax = () => {
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg-slider");
  const slides = heroBg ? heroBg.querySelectorAll(".hero-slide") : [];

  if (!hero || !heroBg || slides.length === 0) return;

  const speed = 0.25;
  let ticking = false;

  const updateParallax = () => {
    const rect = hero.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.bottom < 0 || rect.top > viewportHeight) {
      ticking = false;
      return;
    }

    const offset = rect.top * speed;
    slides.forEach((slide) => {
      slide.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    });

    ticking = false;
  };

  const requestTick = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  requestTick();
  window.addEventListener("scroll", requestTick);
  window.addEventListener("resize", requestTick);
};

// Counter Animation (Enhanced for profile page)
const initCounterAnimation = () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString("id-ID");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString("id-ID");
      }
    };

    // Start animation when element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !counter.classList.contains("counted")
        ) {
          counter.classList.add("counted");
          updateCounter();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(counter);
  });
};

// FAQ Accordion (for kontak.html)
const initFAQ = () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((i) => i.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
};

// Contact Form Validation & Submission
const initContactForm = () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");
  const STORAGE_KEY_BOOKING = "kilau_booking_v1";

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    const service = document.getElementById("service")?.value || "";
    const date = document.getElementById("date")?.value || "";
    const time = document.getElementById("time")?.value || "";
    const message = document.getElementById("message")?.value || "";

    // Validate
    if (!name || !email || !phone || !message) {
      showFormMessage("Mohon lengkapi semua field yang wajib diisi.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage("Format email tidak valid.", "error");
      return;
    }

    // Build WhatsApp message (with booking fields)
    let waMessage =
      "Halo Admin Kilau Carwash, Saya ingin melakukan pemesanan/bertanya.%0A%0A";
    waMessage += `Nama: ${encodeURIComponent(name)}%0A`;
    waMessage += `Email: ${encodeURIComponent(email)}%0A`;
    waMessage += `Nomor HP: ${encodeURIComponent(phone)}%0A`;
    if (service)
      waMessage += `Jenis Layanan: ${encodeURIComponent(service)}%0A`;
    if (date) waMessage += `Tanggal Booking: ${encodeURIComponent(date)}%0A`;
    if (time) waMessage += `Waktu: ${encodeURIComponent(time)}%0A`;
    waMessage += `Pesan: ${encodeURIComponent(message)}`;

    // Persist booking locally
    try {
      const existing = JSON.parse(
        localStorage.getItem(STORAGE_KEY_BOOKING) || "[]"
      );
      existing.push({
        name,
        email,
        phone,
        service,
        date,
        time,
        message,
        createdAt: Date.now(),
      });
      localStorage.setItem(STORAGE_KEY_BOOKING, JSON.stringify(existing));
    } catch (_) {}

    // Redirect to WhatsApp
    const whatsappURL = `https://wa.me/6282175424507?text=${waMessage}`;
    window.open(whatsappURL, "_blank");

    // Show success message
    showFormMessage(
      "Pesan Anda sedang disiapkan! Anda akan diarahkan ke WhatsApp.",
      "success"
    );

    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset();
      hideFormMessage();
    }, 2000);
  });

  // Prefill from last booking
  try {
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEY_BOOKING) || "[]"
    );
    const last = existing[existing.length - 1];
    if (last) {
      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el && typeof val === "string") el.value = val;
      };
      setVal("name", last.name);
      setVal("email", last.email);
      setVal("phone", last.phone);
      setVal("service", last.service);
      setVal("date", last.date);
      setVal("time", last.time);
      setVal("message", last.message);
    }
  } catch (_) {}

  // Dynamic WhatsApp booking button
  const waBtn = document.querySelector(".btn-whatsapp");
  if (waBtn) {
    waBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const phone = document.getElementById("phone")?.value || "";
      const service = document.getElementById("service")?.value || "";
      const date = document.getElementById("date")?.value || "";
      const time = document.getElementById("time")?.value || "";
      const message = document.getElementById("message")?.value || "";

      if (!name || !phone) {
        showFormMessage(
          "Isi minimal Nama dan Telepon untuk booking via WhatsApp.",
          "error"
        );
        return;
      }

      let waMessage =
        "Halo Admin Kilau Carwash, Saya ingin melakukan pemesanan/bertanya.%0A%0A";
      waMessage += `Nama: ${encodeURIComponent(name)}%0A`;
      if (email) waMessage += `Email: ${encodeURIComponent(email)}%0A`;
      waMessage += `Nomor HP: ${encodeURIComponent(phone)}%0A`;
      if (service)
        waMessage += `Jenis Layanan: ${encodeURIComponent(service)}%0A`;
      if (date) waMessage += `Tanggal Booking: ${encodeURIComponent(date)}%0A`;
      if (time) waMessage += `Waktu: ${encodeURIComponent(time)}%0A`;
      if (message) waMessage += `Pesan: ${encodeURIComponent(message)}`;

      try {
        const existing = JSON.parse(
          localStorage.getItem(STORAGE_KEY_BOOKING) || "[]"
        );
        existing.push({
          name,
          email,
          phone,
          service,
          date,
          time,
          message,
          createdAt: Date.now(),
        });
        localStorage.setItem(STORAGE_KEY_BOOKING, JSON.stringify(existing));
      } catch (_) {}

      const whatsappURL = `https://wa.me/6282175424507?text=${waMessage}`;
      window.open(whatsappURL, "_blank");
      showFormMessage(
        "Membuka WhatsApp dengan data booking Anda...",
        "success"
      );
    });
  }
};

const showFormMessage = (message, type) => {
  const formMessage = document.getElementById("form-message");
  if (!formMessage) return;

  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.classList.remove("hidden");
};

const hideFormMessage = () => {
  const formMessage = document.getElementById("form-message");
  if (formMessage) {
    formMessage.classList.add("hidden");
  }
};

// Smooth scroll to top button
const initScrollToTop = () => {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Image gallery lightbox enhancement
const initGalleryLightbox = () => {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      link.addEventListener("click", (e) => {
        // Add smooth transition
        const targetId = link.getAttribute("href");
        const lightbox = document.querySelector(targetId);

        if (lightbox) {
          lightbox.style.display = "flex";
          setTimeout(() => {
            lightbox.style.opacity = "1";
          }, 10);
        }
      });
    }
  });

  // Close lightbox with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const lightboxes = document.querySelectorAll(".lightbox");
      lightboxes.forEach((lb) => {
        lb.style.opacity = "0";
        setTimeout(() => {
          lb.style.display = "none";
        }, 300);
      });
    }
  });
};

// Add loading animation
const showLoading = () => {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = '<div class="loader-spinner"></div>';
  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;

  const spinner = loader.querySelector(".loader-spinner");
  spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

  document.body.appendChild(loader);

  // Add keyframes for spinner
  const style = document.createElement("style");
  style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);

  return loader;
};

const hideLoading = (loader) => {
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
};

// Page load animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  if (loader) {
    hideLoading(loader);
  }
});

// Enhanced order panel for service selection
const enhanceOrderPanel = () => {
  const orderButtons = document.querySelectorAll(".btn-order");

  orderButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const card = button.closest(".service-card");
      const serviceName = button.getAttribute("data-service");
      const servicePrice = button.getAttribute("data-price");

      // Toggle selection
      const isSelected = card.classList.contains("selected-card");

      if (isSelected) {
        card.classList.remove("selected-card");
        button.textContent = "Pilih Paket";

        // Remove from selection
        const idx = selectedPackages.findIndex((p) => p.name === serviceName);
        if (idx !== -1) {
          selectedPackages.splice(idx, 1);
        }
      } else {
        card.classList.add("selected-card");
        button.textContent = "✓ Dipilih";

        // Add to selection
        selectedPackages.push({
          name: serviceName,
          price: parseInt(servicePrice),
          qty: 1,
        });
      }

      updateOrderPanel();

      // Show order panel if has items
      const panel = document.getElementById("order-panel");
      if (panel && selectedPackages.length > 0) {
        panel.classList.remove("hidden");
      } else if (panel && selectedPackages.length === 0) {
        panel.classList.add("hidden");
      }
    });
  });
};

// Initialize all features when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initHeroParallax();
  initCounterAnimation();
  initFAQ();
  initContactForm();
  initScrollToTop();
  initGalleryLightbox();
  enhanceOrderPanel();

  // Add smooth reveal animation to all sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, index * 100);
  });

  console.log("✅ All interactive features initialized!");
});

// ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================

let shoppingCart = [];

// Format price with thousands separator
const formatCartPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Save cart to localStorage
const saveCart = () => {
  localStorage.setItem("kilauCarwashCart", JSON.stringify(shoppingCart));
};

// Load cart from localStorage
const loadCart = () => {
  const savedCart = localStorage.getItem("kilauCarwashCart");
  if (savedCart) {
    shoppingCart = JSON.parse(savedCart);
    updateCartUI();
  }
};

// Add item to cart
const addToCart = (id, name, price, type) => {
  const existingItem = shoppingCart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    shoppingCart.push({
      id: id,
      name: name,
      price: parseInt(price),
      type: type,
      qty: 1,
    });
  }

  saveCart();
  updateCartUI();
  showCartNotification(`${name} ditambahkan ke keranjang`);
};

// Remove item from cart
const removeFromCart = (id) => {
  shoppingCart = shoppingCart.filter((item) => item.id !== id);
  saveCart();
  updateCartUI();
};

// Update item quantity
const updateCartQty = (id, change) => {
  const item = shoppingCart.find((item) => item.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
      updateCartUI();
    }
  }
};

// Clear cart
const clearCart = () => {
  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
    shoppingCart = [];
    saveCart();
    updateCartUI();
  }
};

// Calculate cart total
const getCartTotal = () => {
  return shoppingCart.reduce((total, item) => total + item.price * item.qty, 0);
};

// Update cart UI
const updateCartUI = () => {
  const cartBadge = document.getElementById("cartBadge");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Update badge
  const totalItems = shoppingCart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "flex" : "none";
  }

  // Update cart items
  if (cartItems && cartEmpty) {
    if (shoppingCart.length === 0) {
      cartEmpty.style.display = "flex";
      cartItems.style.display = "none";
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      cartEmpty.style.display = "none";
      cartItems.style.display = "flex";
      if (checkoutBtn) checkoutBtn.disabled = false;

      cartItems.innerHTML = shoppingCart
        .map(
          (item) => `
        <div class="cart-item">
          <div class="cart-item-header">
            <span class="cart-item-name">${item.name}</span>
            <button class="cart-item-remove" onclick="removeFromCart('${
              item.id
            }')">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="cart-item-details">
            <span class="cart-item-price">Rp ${formatCartPrice(
              item.price * item.qty
            )}</span>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">
                <i class="fas fa-minus"></i>
              </button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  // Update total
  const total = getCartTotal();
  if (cartTotal) {
    cartTotal.textContent = `Rp ${formatCartPrice(total)}`;
  }
};

// Show cart notification
const showCartNotification = (message) => {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: linear-gradient(135deg, #00d4bf 0%, #0b2447 100%);
    color: white;
    padding: 15px 25px;
    border-radius: 50px;
    box-shadow: 0 8px 25px rgba(0, 212, 191, 0.4);
    z-index: 10002;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    animation: slideInRight 0.4s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease";
    setTimeout(() => notification.remove(), 400);
  }, 2500);
};

// Toggle cart sidebar
const toggleCart = () => {
  const cartSidebar = document.getElementById("cartSidebar");
  if (cartSidebar) {
    cartSidebar.classList.toggle("active");
  }
};

// Open checkout modal
const openCheckout = () => {
  if (shoppingCart.length === 0) {
    alert("Keranjang belanja kosong!");
    return;
  }

  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutTotal = document.getElementById("checkoutTotal");

  if (checkoutModal) {
    checkoutModal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Populate checkout items
    if (checkoutItems) {
      checkoutItems.innerHTML = shoppingCart
        .map(
          (item) => `
        <div class="checkout-item">
          <span class="checkout-item-name">${item.name}</span>
          <span class="checkout-item-qty">x${item.qty}</span>
          <span class="checkout-item-price">Rp ${formatCartPrice(
            item.price * item.qty
          )}</span>
        </div>
      `
        )
        .join("");
    }

    // Update totals
    const total = getCartTotal();
    if (checkoutSubtotal)
      checkoutSubtotal.textContent = `Rp ${formatCartPrice(total)}`;
    if (checkoutTotal)
      checkoutTotal.textContent = `Rp ${formatCartPrice(total)}`;
  }

  // Close cart sidebar
  toggleCart();
};

// Close checkout modal
const closeCheckout = () => {
  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) {
    checkoutModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

// ============================================
// BILL/INVOICE FUNCTIONALITY
// ============================================

// Generate invoice number (unique per day)
const generateInvoiceNumber = () => {
  const date = new Date();
  const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  return `INV-${dateStr}-${random}`;
};

// Sequential queue number (No. Urut), resets daily
const getNextQueueNumber = () => {
  const KEY = "kilauBillSequence_v1";
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(KEY)) || null;
  } catch (e) {
    data = null;
  }
  const today = new Date().toISOString().split("T")[0];
  if (!data || data.date !== today) {
    data = { date: today, counter: 0 };
  }
  data.counter = (data.counter || 0) + 1;
  localStorage.setItem(KEY, JSON.stringify(data));
  return data.counter;
};

const formatQueueNumber = (n) => String(n).padStart(3, "0");

// Generate Bill HTML
const generateBillHTML = (customerInfo, items, total) => {
  const invoiceNumber = generateInvoiceNumber();
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let billHTML = `
    <div class="bill-header">
      <div class="bill-logo">🚗</div>
      <h3 class="bill-title">KILAU CARWASH</h3>
      <p class="bill-subtitle">Jasa Cuci Mobil Profesional</p>
    </div>

    <div class="bill-invoice-number">
      <strong>Struk Pemesanan: ${invoiceNumber}</strong>
    </div>
    <div class="bill-detail-row">
      <span class="bill-detail-label">No. Urut:</span>
      <span class="bill-detail-value" id="billQueue">-</span>
    </div>

    <div class="bill-details">
      <div class="bill-detail-row">
        <span class="bill-detail-label">Tanggal:</span>
        <span class="bill-detail-value">${dateStr}</span>
      </div>
      <div class="bill-detail-row">
        <span class="bill-detail-label">Atas Nama:</span>
        <span class="bill-detail-value"><strong>${customerInfo.name}</strong></span>
      </div>
      <div class="bill-detail-row">
        <span class="bill-detail-label">No. WhatsApp:</span>
        <span class="bill-detail-value">${customerInfo.phone}</span>
      </div>
  `;

  if (customerInfo.plate) {
    billHTML += `
      <div class="bill-detail-row">
        <span class="bill-detail-label">No. Polisi:</span>
        <span class="bill-detail-value">${customerInfo.plate}</span>
      </div>
    `;
  }

  billHTML += `
      <div class="bill-detail-row">
        <span class="bill-detail-label">Jadwal Cuci:</span>
        <span class="bill-detail-value">${customerInfo.dateTime || "-"}</span>
      </div>
  `;

  if (customerInfo.paymentMethod) {
    billHTML += `
      <div class="bill-detail-row">
        <span class="bill-detail-label">Metode Pembayaran:</span>
        <span class="bill-detail-value">${customerInfo.paymentMethod}</span>
      </div>
    `;
  }

  if (customerInfo.address) {
    billHTML += `
      <div class="bill-detail-row">
        <span class="bill-detail-label">Alamat:</span>
        <span class="bill-detail-value">${customerInfo.address}</span>
      </div>
    `;
  }

  billHTML += `
    </div>

    <div class="bill-divider"></div>

    <div class="bill-items">
      <div style="font-weight: 600; margin-bottom: 10px; display: flex; justify-content: space-between; border-bottom: 2px solid var(--border-color); padding-bottom: 8px;">
        <span>Layanan</span>
        <span style="text-align: right;">
          <span style="min-width: 30px; display: inline-block;">Qty</span>
          <span style="min-width: 80px; text-align: right;">Harga</span>
        </span>
      </div>
  `;

  items.forEach((item) => {
    const itemTotal = item.price * item.qty;
    billHTML += `
      <div class="bill-item">
        <span class="bill-item-name">${item.name}</span>
        <span class="bill-item-qty">x${item.qty}</span>
        <span class="bill-item-price">Rp ${formatCartPrice(itemTotal)}</span>
      </div>
    `;
  });

  billHTML += `
    </div>

    <div class="bill-divider"></div>

    <div class="bill-summary">
      <div class="bill-summary-row">
        <span>Subtotal:</span>
        <span style="font-weight: 600;">Rp ${formatCartPrice(total)}</span>
      </div>
      <div class="bill-summary-row">
        <span>Diskon:</span>
        <span style="font-weight: 600;">Rp 0</span>
      </div>
    </div>

    <div class="bill-total">
      <span class="bill-total-label">TOTAL PEMBAYARAN:</span>
      <span class="bill-total-amount">Rp ${formatCartPrice(total)}</span>
    </div>

    <div class="bill-footer">
      <p>🎉 Program Loyalitas: Cuci 8x, Gratis 1x Cucian</p>
      <p>Terima kasih telah memilih Kilau Carwash! 🚗✨</p>
      <p style="margin-top: 10px; font-size: 11px;">Hubungi: 082-372-597-596 | Instagram: @kilaucarwash</p>
    </div>
  `;

  return billHTML;
};

// Show Bill Modal
const showBillModal = (customerInfo, items, total, whatsappMessage) => {
  const billModal = document.getElementById("billModal");
  const billContent = document.getElementById("billContent");
  const billConfirm = document.getElementById("billConfirm");
  const billPrint = document.getElementById("billPrint");
  const billDownload = document.getElementById("billDownload");
  const billClose = document.getElementById("billClose");

  if (!billModal || !billContent) return;

  // Generate bill HTML
  const billHTML = generateBillHTML(customerInfo, items, total);
  billContent.innerHTML = billHTML;

  // Show modal
  billModal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Close button
  if (billClose) {
    billClose.onclick = () => {
      billModal.style.display = "none";
      document.body.style.overflow = "auto";
    };
  }

  // Print button
  if (billPrint) {
    billPrint.onclick = () => {
      // Assign queue number at print time
      const queueNo = formatQueueNumber(getNextQueueNumber());
      const queueEl = document.getElementById("billQueue");
      if (queueEl) queueEl.textContent = queueNo;
      window.print();
    };
  }

  // Download button (akan membuat simple image/PDF)
  if (billDownload) {
    billDownload.onclick = () => {
      // Ensure queue number exists when downloading
      const queueEl = document.getElementById("billQueue");
      if (queueEl && (!queueEl.textContent || queueEl.textContent === "-")) {
        queueEl.textContent = formatQueueNumber(getNextQueueNumber());
      }
      downloadBillAsImage(billContent);
    };
  }

  // Confirm button - kirim ke WhatsApp
  if (billConfirm) {
    billConfirm.onclick = () => {
      const whatsappNumber = "6282372597596";
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      window.open(whatsappURL, "_blank");

      // Close modal dan clear cart
      setTimeout(() => {
        billModal.style.display = "none";
        document.body.style.overflow = "auto";
        clearCart();
        closeCheckout();
        const checkoutForm = document.getElementById("checkoutForm");
        if (checkoutForm) checkoutForm.reset();
      }, 500);
    };
  }

  // Close modal when clicking outside
  billModal.onclick = (e) => {
    if (e.target === billModal) {
      billModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };
};

// Download Bill as Image
const downloadBillAsImage = (billContent) => {
  // Using html2canvas library (jika ingin yang lebih kompleks)
  // Untuk sekarang, kita gunakan simple screenshot atau localStorage
  const billHTML = billContent.innerHTML;
  const printWindow = window.open("", "", "width=600,height=800");
  printWindow.document.write(`
    <html>
      <head>
        <title>Struk Kilau Carwash</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .bill-content { max-width: 500px; margin: 0 auto; }
        </style>
      </head>
      <body>
        <div class="bill-content">${billHTML}</div>
      </body>
    </html>
  `);
  printWindow.document.close();

  // Set untuk print ke PDF
  setTimeout(() => {
    printWindow.print();
  }, 250);
};

// Initialize Shopping Cart
const initShoppingCart = () => {
  // Load saved cart
  loadCart();

  // Floating cart button
  const floatingCartBtn = document.getElementById("floatingCartBtn");
  if (floatingCartBtn) {
    floatingCartBtn.addEventListener("click", toggleCart);
  }

  // Cart close button
  const cartClose = document.getElementById("cartClose");
  if (cartClose) {
    cartClose.addEventListener("click", toggleCart);
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", openCheckout);
  }

  // Clear cart button
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }

  // Close checkout modal
  const checkoutClose = document.getElementById("checkoutClose");
  if (checkoutClose) {
    checkoutClose.addEventListener("click", closeCheckout);
  }

  // Close modal when clicking outside
  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) {
        closeCheckout();
      }
    });
  }

  // Pay Now button (show bill immediately)
  const payNowBtn = document.getElementById("payNowBtn");
  if (payNowBtn) {
    payNowBtn.addEventListener("click", () => {
      if (shoppingCart.length === 0) {
        alert("Keranjang belanja kosong!");
        return;
      }

      const name = document.getElementById("checkoutName").value;
      const phone = document.getElementById("checkoutPhone").value;
      const dateTime = document.getElementById("checkoutDateTime").value;
      const plate = document.getElementById("checkoutPlate").value;
      const address = document.getElementById("checkoutAddress").value;
      const notes = document.getElementById("checkoutNotes").value;

      // Get selected payment method from radio buttons
      const paymentMethodRadio = document.querySelector(
        'input[name="paymentMethod"]:checked'
      );
      const paymentMethod = paymentMethodRadio
        ? paymentMethodRadio.value
        : "Tunai (Cash)";

      let formattedDate = "-";
      if (dateTime) {
        try {
          const dateObj = new Date(dateTime);
          formattedDate = dateObj.toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch (e) {
          formattedDate = "-";
        }
      }

      let message = `*PEMESANAN KILAU CARWASH*%0A%0A`;
      message += `*Informasi Pelanggan:*%0A`;
      message += `▸ Nama: ${name}%0A`;
      message += `▸ No. WhatsApp: ${phone}%0A`;
      message += `▸ Tanggal & Waktu: ${formattedDate}%0A`;
      if (plate) message += `▸ No. Polisi: ${plate}%0A`;
      if (address) message += `▸ Alamat: ${address}%0A`;
      message += `▸ Metode Pembayaran: ${paymentMethod}%0A`;
      message += `%0A*DETAIL PESANAN:*%0A`;

      shoppingCart.forEach((item) => {
        message += `▸ ${item.name} x${item.qty} - Rp ${formatCartPrice(
          item.price * item.qty
        )}%0A`;
      });

      const total = getCartTotal();
      message += `%0A*TOTAL: Rp ${formatCartPrice(total)}*%0A`;
      if (notes) message += `%0A*Catatan:* ${notes}%0A`;
      message += `%0ATerima kasih telah memilih Kilau Carwash! 🚗✨`;

      const customerInfo = {
        name,
        phone,
        dateTime: formattedDate,
        plate: plate || "",
        address: address || "",
        paymentMethod,
      };

      closeCheckout();
      showBillModal(customerInfo, shoppingCart, total, message);
    });
  }

  // Add to cart buttons
  const addCartButtons = document.querySelectorAll(".btn-add-cart");
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = button.getAttribute("data-id");
      const name = button.getAttribute("data-service");
      const price = button.getAttribute("data-price");
      const type = button.getAttribute("data-type");
      addToCart(id, name, price, type);
    });
  });

  // Checkout form submission
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (shoppingCart.length === 0) {
        alert("Keranjang belanja kosong!");
        return;
      }

      const name = document.getElementById("checkoutName").value;
      const phone = document.getElementById("checkoutPhone").value;
      const dateTime = document.getElementById("checkoutDateTime").value;
      const plate = document.getElementById("checkoutPlate").value;
      const address = document.getElementById("checkoutAddress").value;
      const notes = document.getElementById("checkoutNotes").value;

      // Get selected payment method from radio buttons
      const paymentMethodRadio = document.querySelector(
        'input[name="paymentMethod"]:checked'
      );
      const paymentMethod = paymentMethodRadio
        ? paymentMethodRadio.value
        : "Tunai (Cash)";

      // Format date
      let formattedDate = "-";
      if (dateTime) {
        try {
          const dateObj = new Date(dateTime);
          formattedDate = dateObj.toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch (e) {
          formattedDate = "-";
        }
      }

      // Build WhatsApp message with better formatting
      let message = `Halo Admin Kilau Carwash, Saya ingin melakukan pemesanan/bertanya.%0A%0A`;
      message += `📝 Data Kontak:%0A`;
      message += `Nama: ${name}%0A`;
      message += `Nomor HP: ${phone}%0A`;
      message += `Tanggal Booking: ${formattedDate}%0A`;
      message += `Waktu: ${
        dateTime
          ? new Date(dateTime).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-"
      }%0A`;
      if (plate) message += `Nomor Polisi: ${plate}%0A`;
      if (address) message += `Alamat: ${address}%0A%0A`;
      else message += `%0A`;

      message += `🚗 Detail Layanan:%0A`;
      shoppingCart.forEach((item) => {
        message += `${item.name} x${item.qty} - Rp ${formatCartPrice(
          item.price * item.qty
        )}%0A`;
      });

      const total = getCartTotal();
      message += `%0A💰 Total: Rp ${formatCartPrice(total)}%0A`;
      message += `💳 Metode Pembayaran: ${paymentMethod}%0A`;

      if (notes) {
        message += `%0A💬 Pesan:%0A${notes}%0A`;
      }

      message += `%0ATerima kasih! 🚗✨`;

      // Prepare customer info for bill
      const customerInfo = {
        name: name,
        phone: phone,
        dateTime: formattedDate,
        plate: plate || "",
        address: address || "",
        paymentMethod,
      };

      // Show bill modal instead of directly opening WhatsApp
      closeCheckout();
      showBillModal(customerInfo, shoppingCart, total, message);
    });
  }
};

// Add animation styles
const addCartAnimations = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize shopping cart when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initShoppingCart();
    addCartAnimations();
  });
} else {
  initShoppingCart();
  addCartAnimations();
}

console.log("✅ Shopping Cart functionality loaded!");
// ============================================
// PAYMENT GATEWAY MODAL FUNCTIONALITY
// ============================================

let selectedPaymentMethod = null;

const paymentModal = document.getElementById("paymentModal");
const paymentClose = document.getElementById("paymentClose");
const paymentCancel = document.getElementById("paymentCancel");
const paymentConfirm = document.getElementById("paymentConfirm");
const paymentMethodCards = document.querySelectorAll(".payment-method-card");

// Open Payment Modal
function openPaymentModal() {
  if (paymentModal) {
    paymentModal.classList.add("active");
    document.body.style.overflow = "hidden";
    selectedPaymentMethod = null;
    paymentConfirm.disabled = true;

    // Reset all selections
    paymentMethodCards.forEach((card) => {
      card.classList.remove("active");
      const checkmark = card.querySelector(".checkmark");
      if (!checkmark) {
        const newCheckmark = document.createElement("span");
        newCheckmark.className = "checkmark";
        newCheckmark.innerHTML = '<i class="fas fa-check"></i>';
        card.appendChild(newCheckmark);
      }
    });
  }
}

// Close Payment Modal
function closePaymentModal() {
  if (paymentModal) {
    paymentModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Handle Payment Method Selection
paymentMethodCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove active class from all cards
    paymentMethodCards.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked card
    card.classList.add("active");

    // Store selected method
    selectedPaymentMethod = card.getAttribute("data-method");

    // Enable confirm button
    paymentConfirm.disabled = false;
  });
});

// Close modal buttons
if (paymentClose) {
  paymentClose.addEventListener("click", closePaymentModal);
}

if (paymentCancel) {
  paymentCancel.addEventListener("click", closePaymentModal);
}

// Confirm Payment Selection
if (paymentConfirm) {
  paymentConfirm.addEventListener("click", () => {
    if (selectedPaymentMethod) {
      // Log selection
      console.log("Selected Payment Method:", selectedPaymentMethod);

      // Close payment modal
      closePaymentModal();

      // Open bill/invoice modal (integrate with existing invoice system)
      const billModal = document.getElementById("billModal");
      if (billModal) {
        billModal.style.display = "block";
      }

      // Show success message
      showPaymentConfirmation(selectedPaymentMethod);
    }
  });
}

// Show Payment Confirmation
function showPaymentConfirmation(method) {
  const methodNames = {
    "bank-transfer": "Transfer Bank",
    qris: "QRIS",
    ewallet: "E-Wallet",
    cash: "Bayar di Tempat",
  };

  const methodName = methodNames[method] || method;
  console.log(
    `✅ Metode pembayaran dipilih: ${methodName}. Lanjut ke invoice.`
  );
}

// Close modal when clicking outside
if (paymentModal) {
  paymentModal.addEventListener("click", (e) => {
    if (e.target === paymentModal) {
      closePaymentModal();
    }
  });
}

// Keyboard shortcut to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && paymentModal?.classList.contains("active")) {
    closePaymentModal();
  }
});

// Integrate with existing "Checkout" button
document.addEventListener("DOMContentLoaded", () => {
  // Find all checkout buttons in the page
  const checkoutButtons = document.querySelectorAll(
    "[id='checkoutBtn'], .btn-checkout"
  );

  checkoutButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Check if there are items in cart
      if (selectedPackages && selectedPackages.length > 0) {
        openPaymentModal();
      } else {
        alert("Silakan pilih paket layanan terlebih dahulu");
      }
    });
  });
});

console.log("✅ Payment Gateway Modal functionality loaded!");

// ============================================
// CHECKOUT PAYMENT METHOD ENHANCEMENT
// ============================================

// Add visual feedback for payment method selection
document.addEventListener("DOMContentLoaded", () => {
  const paymentRadios = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );

  if (paymentRadios.length > 0) {
    paymentRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        // Log selection
        console.log("Payment method selected:", this.value);

        // Optional: Add animation/feedback
        const label = this.nextElementSibling;
        if (label) {
          label.style.animation = "none";
          setTimeout(() => {
            label.style.animation = "pulse 0.4s ease";
          }, 10);
        }
      });
    });

    console.log("✅ Payment method selection handler loaded!");
  }
});

// Pulse animation for selected payment
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);
