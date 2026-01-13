# Code Snippets - KILAU CARWASH1 Optimization

## 1. Hero Banner - HTML

```html
<!-- Hero Section - Responsive Mobile-First -->
<section class="hero" id="beranda">
  <div class="hero-wrapper">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-text">
        <p class="hero-badge">
          <i class="fas fa-sparkles"></i> Jasa Cuci Mobil Terpercaya
        </p>
        <h1>Mobil Bersih,<br /><span class="highlight">Hati Tenang</span></h1>
        <p class="hero-subtitle">
          Layanan cuci mobil profesional dengan hasil maksimal dan harga
          terjangkau
        </p>
        <div class="hero-buttons">
          <a href="layanan.html" class="btn-primary btn-lg">
            <i class="fas fa-list"></i> Lihat Layanan
          </a>
          <a href="kontak.html" class="btn-secondary btn-lg">
            <i class="fas fa-phone"></i> Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 2. Hero Banner - CSS (Main Styles)

```css
/* Hero Section - Responsive Mobile-First */
.hero {
  position: relative;
  min-height: 60vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(11, 36, 71, 0.9) 0%,
    rgba(7, 16, 40, 0.75) 50%,
    rgba(7, 16, 40, 0.6) 100%
  );
  background-image: linear-gradient(
      135deg,
      rgba(11, 36, 71, 0.9) 0%,
      rgba(7, 16, 40, 0.75) 50%,
      rgba(7, 16, 40, 0.6) 100%
    ), url("bgawal.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem 1.25rem;
}

.hero-text {
  text-align: center;
  color: var(--light-text);
  max-width: 700px;
  width: 100%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 212, 191, 0.15);
  color: var(--secondary-color);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  backdrop-filter: blur(10px);
}

.hero-text h1 {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 1rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 1rem 0 2rem 0;
  line-height: 1.6;
}

.highlight {
  color: var(--accent-color);
  font-weight: 800;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}
```

---

## 3. Hero Banner - CSS (Media Queries)

```css
/* Mobile (max-width: 480px) */
@media (max-width: 480px) {
  .hero {
    min-height: 50vh;
  }

  .hero-wrapper {
    min-height: 50vh;
  }

  .hero-content {
    padding: 1.5rem 1rem;
  }

  .hero-text h1 {
    font-size: 1.75rem;
    margin: 0.75rem 0;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .hero-badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .hero-buttons {
    gap: 0.75rem;
  }

  .btn-lg {
    padding: 0.875rem 1.25rem;
    font-size: 0.875rem;
    width: 100%;
  }
}

/* Tablet (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .hero {
    min-height: 55vh;
  }

  .hero-wrapper {
    min-height: 55vh;
  }

  .hero-content {
    padding: 2rem 1.5rem;
  }

  .hero-text h1 {
    font-size: 2.25rem;
  }

  .hero-buttons {
    flex-direction: row;
    justify-content: center;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 0.95rem;
  }
}

/* Desktop (min-width: 769px) */
@media (min-width: 769px) {
  .hero {
    min-height: 70vh;
  }

  .hero-wrapper {
    min-height: 70vh;
  }

  .hero-content {
    padding: 3rem 2rem;
  }

  .hero-text h1 {
    font-size: 3rem;
    margin: 1.5rem 0;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-badge {
    font-size: 1rem;
    padding: 0.65rem 1.25rem;
  }

  .hero-buttons {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .btn-lg {
    padding: 1.125rem 2.5rem;
    font-size: 1rem;
  }
}
```

---

## 4. Contact Section - CSS

```css
/* Contact Hero Section */
.contact-hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.contact-hero-content .badge {
  margin-bottom: 1rem;
}

.contact-hero-content h1 {
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  line-height: 1.2;
}

.contact-hero-content .lead {
  text-align: center;
  margin: 1.5rem auto 0;
  padding: 0 1.25rem;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.0625rem;
  line-height: 1.6;
  width: 100%;
}

/* Mobile Responsive */
@media (max-width: 480px) {
  .contact-hero-content h1 {
    font-size: 1.375rem;
  }

  .contact-hero-content .lead {
    font-size: 0.95rem;
    padding: 0 1rem;
  }
}

/* Tablet Responsive */
@media (min-width: 481px) and (max-width: 768px) {
  .contact-hero-content h1 {
    font-size: 2rem;
  }

  .contact-hero-content .lead {
    font-size: 1rem;
  }
}

/* Desktop */
@media (min-width: 769px) {
  .contact-hero-content h1 {
    font-size: 3rem;
  }

  .contact-hero-content .lead {
    font-size: 1.0625rem;
  }
}
```

---

## 5. Payment Modal - HTML

```html
<!-- Payment Gateway Modal -->
<div id="paymentModal" class="modal payment-modal-overlay">
  <div class="modal-content payment-modal">
    <button class="close payment-close" id="paymentClose">
      <i class="fas fa-times"></i>
    </button>

    <div class="payment-header">
      <h2>Pilih Metode Pembayaran</h2>
      <p>Silakan pilih metode pembayaran yang tersedia</p>
    </div>

    <div class="payment-methods">
      <!-- Transfer Bank -->
      <div class="payment-method-card" data-method="bank-transfer">
        <div class="payment-method-icon">
          <i class="fas fa-university"></i>
        </div>
        <h3>Transfer Bank</h3>
        <p>BCA, Mandiri, BNI</p>
        <div class="payment-method-details" style="display: none;">
          <p class="payment-info">
            Silakan transfer ke rekening kami. Konfirmasi akan dikirimkan
            melalui WhatsApp.
          </p>
        </div>
      </div>

      <!-- QRIS -->
      <div class="payment-method-card" data-method="qris">
        <div class="payment-method-icon">
          <i class="fas fa-qrcode"></i>
        </div>
        <h3>QRIS</h3>
        <p>Scan & Bayar</p>
        <div class="payment-method-details" style="display: none;">
          <p class="payment-info">
            Scan QRIS kami dan lakukan pembayaran dengan mudah.
          </p>
        </div>
      </div>

      <!-- E-Wallet -->
      <div class="payment-method-card" data-method="ewallet">
        <div class="payment-method-icon">
          <i class="fas fa-mobile-alt"></i>
        </div>
        <h3>E-Wallet</h3>
        <p>DANA, GoPay</p>
        <div class="payment-method-details" style="display: none;">
          <p class="payment-info">
            Bayar melalui aplikasi e-wallet favorit Anda.
          </p>
        </div>
      </div>

      <!-- Cash / Bayar di Tempat -->
      <div class="payment-method-card" data-method="cash">
        <div class="payment-method-icon">
          <i class="fas fa-money-bill-wave"></i>
        </div>
        <h3>Bayar di Tempat</h3>
        <p>Tunai / Cash</p>
        <div class="payment-method-details" style="display: none;">
          <p class="payment-info">
            Bayar langsung saat layanan selesai di lokasi kami.
          </p>
        </div>
      </div>
    </div>

    <div class="payment-actions">
      <button class="btn-outline payment-cancel" id="paymentCancel">
        Batal
      </button>
      <button class="btn-primary payment-confirm" id="paymentConfirm" disabled>
        <i class="fas fa-check"></i> Lanjutkan
      </button>
    </div>
  </div>
</div>
```

---

## 6. Payment Modal - CSS (Main Styles)

```css
/* PAYMENT GATEWAY MODAL */
.payment-modal-overlay {
  display: none;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.payment-modal-overlay.active {
  display: flex;
}

.payment-modal {
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.payment-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: var(--primary-color);
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 100;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-close:hover {
  transform: scale(1.2) rotate(90deg);
}

.payment-header {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;
  border-radius: 1.25rem 1.25rem 0 0;
}

.payment-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 800;
}

.payment-header p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  padding: 2rem 1.5rem;
}

.payment-method-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  text-align: center;
  min-height: 140px;
  position: relative;
}

.payment-method-card:hover {
  border-color: var(--secondary-color);
  box-shadow: 0 4px 12px rgba(0, 212, 191, 0.15);
  transform: translateY(-2px);
}

.payment-method-card.active {
  border-color: var(--secondary-color);
  background: rgba(0, 212, 191, 0.05);
  box-shadow: 0 8px 20px rgba(0, 212, 191, 0.2);
}

.payment-method-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.75rem;
}

.payment-method-card.active .payment-method-icon {
  color: var(--secondary-color);
}

.payment-method-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--dark-text);
  margin: 0 0 0.25rem 0;
}

.payment-method-card p {
  font-size: 0.8rem;
  color: var(--gray-text);
  margin: 0;
}

.payment-method-card .checkmark {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--secondary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.payment-method-card.active .checkmark {
  opacity: 1;
}

.payment-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 0 0 1.25rem 1.25rem;
  flex-direction: row-reverse;
}

.payment-confirm,
.payment-cancel {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.payment-confirm {
  background: var(--secondary-color);
  color: white;
}

.payment-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 212, 191, 0.3);
}

.payment-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.payment-cancel {
  background: white;
  color: var(--dark-text);
  border: 2px solid var(--border-color);
}

.payment-cancel:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
```

---

## 7. Payment Modal - JavaScript

```javascript
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
```

---

## Testing Checklist

- [ ] Hero banner terlihat baik di mobile (iPhone 5/6/7/8)
- [ ] Hero banner terlihat baik di tablet (iPad)
- [ ] Hero banner terlihat baik di desktop (1920x1080)
- [ ] Contact text centered dan tidak menempel di mobile
- [ ] Payment modal bisa dibuka dari checkout button
- [ ] Payment method selection berfungsi
- [ ] Confirm button enabled setelah memilih method
- [ ] Modal bisa ditutup dengan close button
- [ ] Modal bisa ditutup dengan ESC key
- [ ] Modal bisa ditutup dengan klik outside
- [ ] Invoice modal terbuka setelah payment confirmation
- [ ] Responsive design smooth pada semua breakpoint
- [ ] No console errors

---

**Generated:** 13 Januari 2026  
**Version:** 1.0 (Complete)
