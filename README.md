# My React + Vite + Tailwind Project

## 📌 MercApp - Project Progress Log

### Day 1 – Setup & Internationalization (i18n) Basics

Today I started the foundation of my project.

- ✅ Created the repository and set up React with Vite.
- ✅ Installed and configured TailwindCSS for styling.
- ✅ Added i18n (internationalization) support with language JSON files.
- ✅ Implemented manual language switching between Portuguese, Spanish and English.

---

### Day 2 – Browser Language Detection + Basic Routing
- ✅ Installed and configured `i18next-browser-languagedetector`.
- ✅ Detection order set to **localStorage → navigator**, and the chosen language is cached in localStorage. (Common pitfall fixed: the option is spelled `"navigator"`.)
- ✅ Created basic routing with React Router v6:
  - `/` → Home
  - `/about` → About
  - `/contact` → Contact
  - `*` → NotFound (fallback)
- ✅ Verified translations render via `t("key")` across pages.

---

**Next Steps**
- Build a shared **Layout** with `<Outlet />`, a **Navbar** (with language selector), and **Footer**.
- Add `public/data/products.json` as the seed catalog.
- Implement the cart MVP:
  - Add items with quantity control.
  - Show item subtotals, total sum, and item count.
  - Edit/remove actions.
  - Persist to `localStorage` under `mercapp_cart_v1`.
- Add a bottom sticky bar with the running total and an over-budget alert.

---

I’m building this project while learning, so everything is documented as clearly as possible.  
This repository is not just about code – it’s about growth, discipline, and continuous improvement 🌱.
