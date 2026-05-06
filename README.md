# 📚 BookHeaven

A fully client-side **online bookstore and personal library app** built with vanilla JavaScript and ES Modules. Browse a catalog of books, manage a wishlist and cart, check out, and track your personal library — all without a backend or framework.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🚀 Live Demo

> 🔗 [View Live →](https://adrihamzallari.github.io/BookHeaven) *(deploy and update this link)*

---

## 📸 Pages

| Page | Description |
|------|-------------|
| **Home** (`index.html`) | Dashboard with stats, random hero book, and 8 featured books |
| **Browse** (`browse.html`) | Full catalog with multi-filter search |
| **Book Detail** (`book.html`) | Single book view with author's other books |
| **Search Results** (`books.html`) | Results from homepage search |
| **Cart** (`cart.html`) | Cart review, order summary, and checkout modal |
| **Wishlist** (`wishlist.html`) | Saved books with estimated total |
| **Library** (`library.html`) | Purchased books collection |
| **Profile** (`profile.html`) | User stats, reading list, and account settings |

---

## ✨ Features

### 🏠 Home
- Random **hero book** featured on every page load
- **8 randomized featured books** pulled from the catalog
- Live **dashboard stats** — total books, cart count, wishlist count, library count
- **Cart badge** in navbar synced across all pages

### 🔍 Browse & Search
- **Multi-select category chips** — filter by one or multiple genres simultaneously
- **Price range slider** with live label update
- **Star rating filter** — show only books above a minimum rating
- **In-stock toggle** — filter to available titles only
- **Sort** by price (low→high, high→low) or rating
- **Reset all filters** with one click
- **Search** by title or author
- Global **search** from homepage redirects to a dedicated results page via URL params

### 🛒 Cart & Checkout
- Add and remove books from cart
- **Live order total** calculated on the fly
- **Checkout modal** with confirm/cancel
- On confirmation — cart is cleared and books are moved to your **Library**
- Cart badge updates instantly across all pages

### ❤️ Wishlist
- Add/remove books from any page
- Estimated **total price** of saved books
- **Add to Cart** directly from the wishlist page

### 📖 Library & Profile
- All purchased books appear in your personal library
- **Mark as Finished** button on reading list — updates books-read counter
- **Recent activity log** — tracks purchases and finished books
- **Profile settings** — save your name and email, persists via localStorage

### 🔧 Technical
- **ES Modules** (`import`/`export`) across all JS files
- **Event delegation** on book grids — one listener per container, not per card
- **`restoreButtonStates()`** — shared utility that marks wishlist/cart buttons as active on page load based on localStorage
- **`handleAction()`** and **`updateStorage()`** — centralized action and storage logic reused across all pages
- **URL params** (`?id=`, `?search=`) for passing data between pages
- All data persisted in **localStorage** — survives page refresh

---

## 🗂️ Project Structure

```
BookHeaven/
├── index.html          # Home / Dashboard
├── browse.html         # Full catalog with filters
├── book.html           # Single book detail page
├── books.html          # Search results page
├── cart.html           # Cart and checkout
├── wishlist.html       # Wishlist page
├── library.html        # Personal library
├── profile.html        # User profile and settings
│
├── css/
│   ├── global.css      # Shared styles and variables
│   ├── index.css       # Home page styles
│   ├── browse.css      # Browse page styles
│   ├── book.css        # Book detail styles
│   ├── books.css       # Search results styles
│   ├── cart.css        # Cart styles
│   ├── wishlist.css    # Wishlist styles
│   ├── library.css     # Library styles
│   └── profile.css     # Profile styles
│
├── js/
│   ├── api.js          # Fetches books.json (async/await, try/catch)
│   ├── actions.js      # Shared: handleAction, updateStorage, restoreButtonStates
│   ├── index.js        # Home page logic
│   ├── browse.js       # Filter, sort, and render logic
│   ├── books-details.js# Book detail + author books section
│   ├── search.js       # URL param search + results rendering
│   ├── cart.js         # Cart render, remove, checkout modal
│   ├── wishlist.js     # Wishlist render and remove
│   ├── library.js      # Library render
│   └── profile.js      # Profile stats, reading list, settings
│
└── data/
    └── books.json      # Local book catalog (ISBN, title, author, price, rating, etc.)
```

---

## 🧠 Architecture

```
books.json
    ↓
api.js → getBooks()          (async fetch, reused by every page that needs data)
    ↓
actions.js → handleAction()  (reads btn class + data-id, returns { type, data })
           → updateStorage() (add/remove from localStorage, returns boolean)
           → restoreButtonStates() (syncs button UI to localStorage on page load)
    ↓
Page JS files                (import from api.js + actions.js, handle page-specific logic)
    ↓
localStorage                 (userCart, userWishlist, userLibrary, userProfile)
```

All pages are independent HTML files connected by shared JS modules and localStorage — no routing library, no build tool, no backend.

---

## 🏃 Getting Started

Because `api.js` uses `fetch()` to load `books.json`, the app needs to be served — it won't work by just opening `index.html` directly.

VS Code Live Server (recommended):**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → Open with Live Server


---

## 💡 What I Learned

- Architecting a **multi-page app** with shared JS modules using native ES Modules
- **Async/await** and `fetch()` for loading local JSON data
- **Event delegation** — attaching one listener to a parent instead of many listeners to children
- Passing state between pages using **URL query parameters** (`URLSearchParams`)
- Building **reusable utility functions** (`handleAction`, `updateStorage`, `restoreButtonStates`) that work across every page
- Managing **complex filter state** as a single object and applying all filters in one pass
- Keeping **localStorage in sync** with the UI across multiple independent pages
- Structuring a project with **separation of concerns** — data, logic, and UI kept separate

---

## 🗺️ Possible Improvements

- [ ] Migrate to **React** — each page becomes a component, routing via React Router
- [ ] Add a **real backend** (Node.js + Express) with user authentication
- [ ] Replace `localStorage` with a **database** for true data persistence
- [ ] Add **quantity tracking** in the cart (currently one entry per book)
- [ ] **Toast notifications** on add-to-cart and add-to-wishlist
- [ ] Live filter updates without needing to click Search

---

## 👤 Author

**Adri Hamzallari**
- GitHub: [@AdriHamzallari](https://github.com/AdriHamzallari)
- LinkedIn: [your-linkedin-url](https://www.linkedin.com/in/adri-hamzallari-891667322/)
- Location: Tirana, Albania 🇦🇱
---

> *The most complex project in my frontend portfolio — built entirely with vanilla HTML, CSS, and JavaScript. No frameworks. No build tools.*
