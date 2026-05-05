import { getBooks } from './api.js';
import { handleAction, updateStorage } from './actions.js';
import { restoreButtonStates } from './actions.js';
const totalBooksEl = document.getElementById('total-books');
const wishlistCountEl = document.getElementById('wishlist-count');
const cartCountEl = document.getElementById('cart-count');
const libraryCountEl = document.getElementById('library-count');
const heroBookContainer = document.getElementById('hero');
//Search
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
// Featured Books
const featuredBooksContainer = document.getElementById('featured-books');
// Buttons 
const exploreBtns = document.getElementById('explore-btn');
const myLibraryBtns = document.getElementById('library-btn');
//Update hero book
async function initHero() {
    const books = await getBooks();
     const randomBook = books[Math.floor(Math.random() * books.length)];
    heroBook(randomBook);
};
async function getDataFromAPI(params) {
  const data = await getBooks();
  return data;
}
const dataFromAPI = await getDataFromAPI();
function heroBook(randomBook){
   const heroContainer = document.createElement('div');
   heroContainer.className = 'hero-book-card';
   heroContainer.innerHTML = `
   <a href="book.html?id=${randomBook.isbn}" class="book-link">

      <div class="hero-book-cover">
        <div class="hero-book-icon">${randomBook.cover}</div>
        <div class="hero-cover-shine"></div>
      </div>
      <div class="hero-book-info">
        <p class="hero-book-label">Featured</p>
        <h3 class="hero-book-title">${randomBook.title}</h3>
        <p class="hero-book-author">${randomBook.author}</p>
        <div class="hero-book-meta">
          <span class="hero-book-price">$${randomBook.price}</span>
          <span class="hero-book-rating">⭐${randomBook.rating}</span>
        </div></a>
<div class="hero-book-actions">
  <button class="hero-action-wish wishlist-btn action-btn" data-id="${randomBook.isbn}">♡ Wishlist</button>
  <button class="hero-action-cart cart-btn action-btn" data-id="${randomBook.isbn}">🛒 Add to Cart</button>
</div>

      </div>
      
  `;
heroBookContainer.appendChild(heroContainer);
}

//Search

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
    const input = searchInput.value;
    if(searchInput.value.trim() === ''){

     return;
    }
    else{
      window.location.href = `books.html?search=${input}`;
    }
});
//Creating The feature books funcionality
function displayFeaturedBooks(){
  let arr = [];
  while(arr.length < 8){
    let arrData = dataFromAPI[Math.floor(Math.random() * dataFromAPI.length)];
    if(!arr.includes(arrData)){
      arr.push(arrData);
    }
    else{
      arr.push(dataFromAPI[Math.floor(Math.random() * dataFromAPI.length)]);
    }
  }
    return arr;
}
let featureArr = displayFeaturedBooks();

function createFeaturedBooks() {
   featureArr.forEach(f => {
    const newDiv = document.createElement('div');
    newDiv.className = 'card';
    newDiv.innerHTML = `
      <a href="book.html?id=${f.isbn}" class="book-link">
        <div class="book-cover">${f.cover}</div>
        <h3>${f.title}</h3>
        <p class="author">${f.author}</p>
        <div class="card-footer">
          <span class="price">$${f.price}</span>
          <span class="rating">⭐ ${f.rating}</span>
        </div>
      </a>
      <div class="card-actions">
        <!-- ADDED wishlist-btn and cart-btn CLASSES BELOW -->
        <button class="icon-btn wishlist-btn" data-id="${f.isbn}">❤️</button>
        <button class="icon-btn cart-btn" data-id="${f.isbn}">🛒</button>
      </div>
    `;
    featuredBooksContainer.appendChild(newDiv);
    restoreButtonStates(newDiv, f.isbn);
   });
}

 function updateDashboardStats() {
    const wishlist = JSON.parse(localStorage.getItem('userWishlist')) || [];
    const cart = JSON.parse(localStorage.getItem('userCart')) || [];
    const library = JSON.parse(localStorage.getItem('userLibrary')) || [];

    if (totalBooksEl) totalBooksEl.textContent = dataFromAPI.length;
    if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;
    if (cartCountEl) cartCountEl.textContent = cart.length;
    if (libraryCountEl) libraryCountEl.textContent = library.length;

    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.setAttribute('data-count', cart.length);
    }
}


featuredBooksContainer.addEventListener('click', (e) => {
         const btn = e.target.closest('.icon-btn');
         if(!btn) return;
         const result = handleAction(btn, dataFromAPI);
             if (result) {
         const isAdded = updateStorage(result.type, result.data);
         if (isAdded) {
             btn.classList.add('active-btn');
             updateDashboardStats();
         } else {
             btn.classList.remove('active-btn');
             updateDashboardStats();
         }
     }
     });
heroBookContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.action-btn');
     if(!btn) return;
         const result = handleAction(btn, dataFromAPI);
             if (result) {
         const isAdded = updateStorage(result.type, result.data);
         updateDashboardStats();
     }
})
function syncNavbarBadge() {
    const cart = JSON.parse(localStorage.getItem('userCart')) || [];
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.setAttribute('data-count', cart.length);
    }
}
syncNavbarBadge();
 createFeaturedBooks();
 updateDashboardStats();
 initHero();