
import { handleAction, restoreButtonStates } from "./actions.js";
import { getBooks } from "./api.js";

async function getData() {
    const data = await getBooks();
    return data;
}
 const books = await getData();
//Take the data from main page
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');
//Container
const booksContainer = document.getElementById('grid-container');
const noResultCase = document.getElementById("noresult");
const resultText = document.getElementById('result-text');
const header = document.getElementById('header');
const nrResult = document.getElementById('resultctr');
//Kontroll nese cfare po kerkohet eshte e ne te dhenat
const isValidData = books.filter(d => d.author.toLowerCase().includes(searchTerm.toLowerCase()) || d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.isbn === searchTerm);
//Search funcionality
if(isValidData.length !== 0){
 noResultCase.style.display = "none";
 nrResult.textContent = isValidData.length;
  resultText.textContent = searchTerm;
        isValidData.forEach(b => {
    const gridBook = document.createElement('div');
    gridBook.className = "book-card";
    gridBook.innerHTML = `
          <a href="book.html?id=${b.isbn}" class="book-link">
        <div class="book-cover">
          <div class="book-icon">${b.cover}</div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${b.title}</h3>
          <div class="card-author">${b.author}</div>
          <div class="card-meta">
            <span class="price">${b.price}</span>
            <span class="rating">⭐ ${b.rating}</span>
          </div>
          </a>
<div class="card-actions">
  <button class="action-btn wishlist-btn" data-id="${b.isbn}">❤️</button>
  <button class="action-btn cart-btn" data-id="${b.isbn}">🛒</button>
</div>
        
    `;
    booksContainer.appendChild(gridBook);
    restoreButtonStates(gridBook, b.isbn);
  });
}
else{
header.style.display = 'none';
noResultCase.style.display = "flex";  
nrResult.textContent = isValidData.length; 
}
//=======EventDelegation=====//
booksContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.action-btn');
  if(!btn) return;
  const result = handleAction(btn, books);
  if(result)
  {
      const storageKey = result.type === 'CART' ? 'userCart' : 'userWishlist';
      let currentItems = JSON.parse(localStorage.getItem(storageKey)) ||[];
      const exist = currentItems.some(item => item.isbn === result.data.isbn);
      if (!exist)
      {
        currentItems.push(result.data);
        btn.classList.add('active-btn');
      }  
      else
      {
          currentItems = currentItems.filter(item => item.isbn !== result.data.isbn);
          btn.classList.remove('active-btn');
      }
      localStorage.setItem(storageKey, JSON.stringify(currentItems));
  }
})
//Update the badge
const cart = JSON.parse(localStorage.getItem('userCart')) || [];
 const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.setAttribute('data-count', cart.length);
    }
