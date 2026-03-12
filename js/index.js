import { getBooks } from './api.js';
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
function heroBook(randomBook){
    console.log(randomBook);
   const heroContainer = document.createElement('div');
   heroContainer.className = 'hero-image';
   heroContainer.innerHTML = `
    
  `;
heroBookContainer.appendChild(heroContainer);
}
initHero();
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


