# 🛒 MercApp – React + Vite + Tailwind PWA  

---

## 📱 What is MercApp?  
MercApp is a **Progressive Web App (PWA)** built with **React + Vite** and styled with **TailwindCSS**.  
The app is designed to help users **manage their grocery shopping** with a clean, Apple-inspired UI, offline support, and persistent data storage.  

Main goals:  
- ✅ Simple and elegant **shopping assistant**  
- ✅ **Add, track, and edit** products while shopping  
- ✅ Always see your **running total** (to avoid surprises at checkout)  
- ✅ Optimized for **mobile-first experience** with full PWA installability  

---

## 🚀 Progress Log  

### 🏗️ Foundation  
- ✅ Repository created and environment set up with **React + Vite**  
- ✅ Installed and configured **TailwindCSS** for clean, scalable UI design  
- ✅ Configured as **PWA** (offline-first, installable, persistent local storage)  

### 🌍 Internationalization  
- ✅ Integrated **i18next** with JSON language files (🇵🇹 Portuguese, 🇪🇸 Spanish, 🇬🇧 English)  
- ✅ Manual language switching implemented  
- ✅ Browser language detection via **i18next-browser-languagedetector**  
- ✅ Detection order: `localStorage → navigator`  

### 🎨 Layout & Components  
- ✅ Created **Master Layout** with `<Outlet />`  
- ✅ Added **Navbar** with fully functional **Language Selector**  
- ✅ Added **Footer** as sticky bottom navigation bar with 3 buttons: Home, About, Contact  
- ✅ Built **ProductCard component**:
  - Shows product **emoji/icon** (or initials fallback)  
  - Displays **name, category, store**  
  - Formats price with **currency utils (`formatCurrency`)**  
  - Includes **add button (+)** with **lucide-react icon**  
  - Responsive and clean Apple-inspired design  

---

## 🎯 Next Milestone (Tomorrow’s Focus)  
- 🛍️ Implement **Cart MVP**:  
  - Add items with quantity control  
  - Show subtotals, totals, and item count  
  - Edit/remove items  
  - Persist cart in `localStorage`  
- 📊 Add running total & over-budget alert to the bottom navigation bar  
- 🎨 Improve category filtering UI for better product browsing  

---

## 📦 Tech Stack  
- ⚡ **React + Vite** – Fast development and optimized build  
- 🎨 **TailwindCSS** – Utility-first, responsive design  
- 🌍 **i18next** – Multi-language support  
- 📲 **PWA** – Installable, offline-ready, persistent  
- 🛠️ **Lucide-react** – Modern and lightweight icons  

---

📌 MercApp is both a **learning journey** and a **real-world PWA prototype**.  
Step by step, every feature is documented, tested, and improved sustainably 🌱.  
