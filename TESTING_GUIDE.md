# Testing & Troubleshooting Guide

## 🧪 Manual Testing Procedures

### Test 1: Hero Banner Responsiveness

#### Mobile (iPhone 6/7/8 - 375px)

1. Open `home.html` in Chrome DevTools (iPhone view)
2. **Expected Results:**

   - Hero height: ~50vh (not too tall)
   - H1 text: 1.75rem size
   - Buttons: Stack vertically
   - Badge visible but smaller
   - Text readable without scrolling

3. **Verification:**

```
[ ] Hero section visible
[ ] Text centered both ways
[ ] Buttons stack vertically
[ ] No horizontal scrolling
[ ] All text readable
[ ] Images load properly
```

#### Tablet (iPad - 768px)

1. Open in tablet view
2. **Expected Results:**

   - Hero height: ~55vh
   - H1 text: 2.25rem size
   - Buttons: Side by side (row layout)
   - More spacious layout

3. **Verification:**

```
[ ] Hero section looks good
[ ] Buttons align horizontally
[ ] Text properly sized
[ ] Layout centered
```

#### Desktop (1920px)

1. Open in full desktop view
2. **Expected Results:**

   - Hero height: ~70vh
   - H1 text: 3rem size
   - Maximum spacing applied
   - Professional appearance

3. **Verification:**

```
[ ] Hero section proportional
[ ] Text large and readable
[ ] Buttons properly spaced
[ ] Background image visible
[ ] Overlay gradient applied
```

---

### Test 2: Contact Section Text

#### What to Verify

1. Open `kontak.html`
2. Look at "Mari Berkomunikasi" section
3. **Expected Results:**
   - H1 centered
   - Description paragraph centered
   - Paragraph doesn't go edge-to-edge
   - Max-width of ~600px applied

#### Testing at Each Breakpoint

```
Mobile (480px):
  [ ] Title: 1.375rem
  [ ] Text: 0.95rem
  [ ] Not touching edges (1rem padding)

Tablet (768px):
  [ ] Title: 2rem
  [ ] Text: 1rem
  [ ] Proper spacing

Desktop (1920px):
  [ ] Title: 3rem
  [ ] Text: 1.0625rem
  [ ] Max-width visible
```

---

### Test 3: Payment Modal Functionality

#### Opening the Modal

1. Go to `layanan.html`
2. Click on any "Tambah ke Keranjang" button
3. Items appear in cart
4. Click "Checkout" button
5. **Expected:** Payment modal opens with animation

```
[ ] Modal appears with fade-in
[ ] Header visible: "Pilih Metode Pembayaran"
[ ] 4 payment method cards visible
[ ] All cards clickable
[ ] Close button visible
```

#### Selecting Payment Method

1. Click on "Transfer Bank" card
2. **Expected Results:**

   - Card gets blue border
   - Active background color applied
   - Checkmark appears
   - Confirm button becomes enabled

3. Try each card:
   - Transfer Bank (university icon)
   - QRIS (qrcode icon)
   - E-Wallet (mobile icon)
   - Cash (money icon)

```
[ ] Transfer Bank selectable
[ ] QRIS selectable
[ ] E-Wallet selectable
[ ] Cash selectable
[ ] Confirm button enables
[ ] Visual feedback visible
```

#### Closing the Modal

1. Click payment card to select
2. Try closing via:
   - X button (top right)
   - Cancel button
   - ESC key
   - Click outside modal

```
[ ] X button closes modal
[ ] Cancel button closes modal
[ ] ESC key closes modal
[ ] Click outside closes modal
[ ] Body scroll restored
```

#### Confirming Selection

1. Select a payment method
2. Click "Lanjutkan"
3. **Expected:**
   - Modal closes
   - Invoice modal opens
   - Payment confirmation logged

```
[ ] Modal closes smoothly
[ ] Invoice modal shows
[ ] Console shows confirmation message
[ ] Flow works correctly
```

---

### Test 4: Button Styles

#### Primary Button (.btn-primary)

```
Desktop:
  - Background: Cyan (#00d4bf)
  - Color: White
  - Padding: 1.125rem 2.5rem
  - Font-size: 1rem
  - Hover: Slightly raised + shadow

Mobile:
  - Padding: 0.875rem 1.25rem
  - Font-size: 0.875rem
  - Width: 100% on hero
```

#### Secondary Button (.btn-secondary)

```
  - Background: Transparent
  - Border: 2px solid white
  - Color: Cyan
  - Hover: Filled with cyan
```

#### Verification

```
[ ] Primary buttons have correct colors
[ ] Hover effects work
[ ] Mobile buttons properly sized
[ ] Icons display correctly
[ ] Text visible on all backgrounds
```

---

## 🔍 Browser Developer Tools Testing

### Console Checks

```javascript
// Check payment modal is loaded
console.log(document.getElementById("paymentModal"));
// Should return: <div id="paymentModal" class="modal...">

// Check selected payment method
console.log(selectedPaymentMethod);
// Should return: null (before selection) or "bank-transfer" etc.

// Check hero element exists
console.log(document.querySelector(".hero"));
// Should return: <section class="hero">
```

### CSS Inspection

1. Right-click on any element → Inspect
2. Check computed styles:

   - Font sizes in rem/em
   - Padding/margins in rem
   - Width in % or px
   - Media queries applying correctly

3. Example for hero h1:

```
Computed Styles Should Show:
- font-size: 28px (1.75rem on mobile)
- font-weight: 800
- margin: 12px 0
- text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5)
```

### Network Tab

```
Expected Resources:
✓ bgawal.png (hero background)
✓ style.css
✓ script.js
✓ Font files from googleapis

Check:
[ ] All images load (< 3s)
[ ] No 404 errors
[ ] CSS applies
[ ] JS executes
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Hero Background Not Showing

**Problem:** Background image appears as solid color

**Solutions:**

1. Check image path in CSS:

   ```css
   background-image: url("bgawal.png");
   /* File should be in same directory as HTML */
   ```

2. Verify file exists:

   ```
   d:\tugas desain web\KILAU CARWASH1\bgawal.png
   ```

3. Check file permissions (readable)

4. Try absolute path temporarily:

   ```css
   background-image: url("/Aset gambar/bgawal.png");
   /* If image is in Aset gambar folder */
   ```

5. Check if overlay opacity too high:
   ```css
   .hero-overlay {
     /* Decrease the alpha values */
     background: rgba(11, 36, 71, 0.8); /* Was 0.9 */
   }
   ```

---

### Issue 2: Payment Modal Not Opening

**Problem:** Click checkout button but nothing happens

**Solutions:**

1. Check console for errors:

   - Ctrl+Shift+J (Chrome/Firefox/Edge)
   - Cmd+Option+J (Mac)

2. Verify HTML IDs exist:

   ```html
   <div id="paymentModal">
     <!-- Check this -->
     <button id="checkoutBtn"><!-- Check this --></button>
   </div>
   ```

3. Verify JavaScript loaded:

   ```
   At bottom of page: <script src="script.js"></script>
   ```

4. Check if `selectedPackages` has items:

   ```javascript
   console.log(selectedPackages);
   // Should be array with items
   ```

5. Verify button click handler:
   ```javascript
   document
     .getElementById("checkoutBtn")
     .addEventListener("click", function () {
       console.log("Clicked!");
       openPaymentModal();
     });
   ```

---

### Issue 3: Text Not Centered in Contact Section

**Problem:** Description text aligned left or not centered

**Solutions:**

1. Check CSS is applied:

   ```css
   .contact-hero-content .lead {
     text-align: center;
     margin: auto;
     max-width: 600px;
   }
   ```

2. Check margin property:

   ```javascript
   // In console:
   const lead = document.querySelector(".contact-hero-content .lead");
   console.log(getComputedStyle(lead).margin);
   // Should show: "auto" or specific pixel values centered
   ```

3. Verify container is flex:

   ```css
   .contact-hero-content {
     display: flex;
     flex-direction: column;
     align-items: center;
   }
   ```

4. Check if conflicting CSS:
   - Search for other `.lead` styles
   - Use !important temporarily to test
   ```css
   .lead {
     text-align: center !important;
   }
   ```

---

### Issue 4: Mobile Buttons Too Large/Small

**Problem:** Buttons don't scale properly on mobile

**Solutions:**

1. Check media query is applied:

   ```css
   @media (max-width: 480px) {
     .btn-lg {
       padding: 0.875rem 1.25rem;
       font-size: 0.875rem;
     }
   }
   ```

2. Verify viewport meta tag:

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

3. Check for conflicting inline styles:

   ```html
   <!-- BAD - inline styles override CSS -->
   <button style="padding: 20px !important;">Btn</button>

   <!-- GOOD - use CSS classes -->
   <button class="btn-lg">Btn</button>
   ```

4. Clear browser cache:
   - Ctrl+Shift+Delete (Chrome)
   - Hard refresh: Ctrl+Shift+R

---

### Issue 5: Payment Cards Not Responding to Click

**Problem:** Click payment method but nothing happens

**Solutions:**

1. Verify click handler exists:

   ```javascript
   const paymentMethodCards = document.querySelectorAll(".payment-method-card");
   console.log(paymentMethodCards.length); // Should be 4
   ```

2. Check HTML attributes:

   ```html
   <div class="payment-method-card" data-method="bank-transfer">
     <!-- Should have data-method -->
   </div>
   ```

3. Test manual selection:

   ```javascript
   document.querySelectorAll(".payment-method-card")[0].click();
   console.log(selectedPaymentMethod); // Should log method name
   ```

4. Check CSS active state:

   ```css
   .payment-method-card.active {
     border-color: var(--secondary-color);
     /* Styles should apply */
   }
   ```

5. Verify JavaScript runs after DOM:
   ```javascript
   // Should be near end of script.js
   document.addEventListener("DOMContentLoaded", () => {
     // Initialize modal here
   });
   ```

---

## 📊 Performance Testing

### Lighthouse Audit

1. Open DevTools → Lighthouse
2. Run audit for:

   - Performance
   - Accessibility
   - Best Practices

3. Check metrics:

```
Performance Score: 80+ target
Accessibility Score: 90+ target
Best Practices: 90+ target
```

### Load Time Check

```javascript
// In console:
console.time("page");
// ... do something ...
console.timeEnd("page");
// Shows: page: 124.5ms
```

---

## ✅ Final Pre-Launch Checklist

### HTML Structure

```
[ ] No 404 errors in console
[ ] All semantic elements used
[ ] Proper heading hierarchy (h1 > h2 > h3)
[ ] Images have alt attributes
[ ] Forms have proper labels
```

### CSS & Styling

```
[ ] Relative units used (rem, em, %)
[ ] Media queries working
[ ] All colors visible
[ ] No text cutoff
[ ] Hover states working
[ ] Animations smooth (60fps)
```

### JavaScript

```
[ ] No console errors
[ ] Modal opens/closes properly
[ ] Payment selection works
[ ] Invoice integration functional
[ ] Keyboard shortcuts working
[ ] No memory leaks
```

### Mobile/Tablet/Desktop

```
[ ] Tested on actual devices
[ ] Orientation changes work
[ ] Touch targets large enough (44px min)
[ ] Text readable (16px min)
[ ] Images responsive
```

### Accessibility

```
[ ] Keyboard navigation works
[ ] Color contrast sufficient
[ ] Focus indicators visible
[ ] ARIA labels present
[ ] Screen reader compatible
```

### Performance

```
[ ] Page loads in < 3 seconds
[ ] No layout shifts
[ ] Images optimized
[ ] CSS/JS minified
[ ] Caching headers set
```

---

## 🔧 Quick Debug Commands

### Check Hero Setup

```javascript
const hero = document.querySelector(".hero");
console.log({
  element: hero,
  height: hero.offsetHeight,
  minHeight: getComputedStyle(hero).minHeight,
  display: getComputedStyle(hero).display,
  alignItems: getComputedStyle(hero).alignItems,
});
```

### Check Payment Modal

```javascript
const modal = document.getElementById("paymentModal");
console.log({
  exists: !!modal,
  visible: getComputedStyle(modal).display,
  zIndex: getComputedStyle(modal).zIndex,
  cards: document.querySelectorAll(".payment-method-card").length,
});
```

### Check Contact Text

```javascript
const lead = document.querySelector(".contact-hero-content .lead");
console.log({
  element: lead,
  textAlign: getComputedStyle(lead).textAlign,
  margin: getComputedStyle(lead).margin,
  maxWidth: getComputedStyle(lead).maxWidth,
});
```

---

## 📞 Support Resources

- **MDN Web Docs:** https://developer.mozilla.org
- **CSS Tricks:** https://css-tricks.com
- **JavaScript Info:** https://javascript.info
- **Can I Use:** https://caniuse.com

---

**Document Version:** 1.0  
**Last Updated:** 13 Januari 2026  
**Status:** Complete & Ready for Testing
