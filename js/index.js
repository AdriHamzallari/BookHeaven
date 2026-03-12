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
async function getDataFromAPI(params) {
  const data = await getBooks();
  return data;
}
const dataFromAPI = await getDataFromAPI();
console.log(dataFromAPI);
function heroBook(randomBook){
    console.log(randomBook);
   const heroContainer = document.createElement('div');
   heroContainer.className = 'hero-book-card';
   heroContainer.innerHTML = `
   
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
        </div>
        <div class="hero-book-actions">
          <button class="hero-action-wish">♡ Wishlist</button>
          <button class="hero-action-cart">🛒 Add to Cart</button>
        </div>
      </div>
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

console.log(featureArr);
function createFeaturedBooks(){
   featureArr.forEach(f => 
   {
    const newDiv = document.createElement('div');
    newDiv.className = 'card';
    newDiv.innerHTML = ` 
      <div class="book-cover">${f.cover}</div>
      <h3>${f.title}</h3>
      <p class="author">${f.author}</p>
      <div class="card-footer">
        <span class="price">$${f.price}</span>
        <span class="rating">⭐ ${f.rating}</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn">❤️</button>
        <button class="icon-btn">🛒</button>
      </div>
    `;
    featuredBooksContainer.appendChild(newDiv);
   }
   );
}
createFeaturedBooks();