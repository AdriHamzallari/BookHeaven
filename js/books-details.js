import { getBooks } from "./api.js";
import { handleAction, updateStorage } from "./actions.js";
async function getData() {
    const data = await getBooks();
    return data;
}
const books = await getData();
const urlParams = new URLSearchParams(window.location.search);
const clickedBooks = urlParams.get('id');
console.log(clickedBooks);
const book = books.find(b => b.isbn === clickedBooks);
console.log(book);
const bookContent = document.getElementById('book-content');
const moreBooks = document.getElementById('author-books-grid');
const cart = JSON.parse(localStorage.getItem('userCart')) || [];
 const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.setAttribute('data-count', cart.length);
    }
const authorBooks = books.filter(b => b.author === book.author);
console.log(authorBooks);
bookContent.innerHTML = ``;
function createUI()
{
    bookContent.innerHTML = `
    <div class="book-cover-container">
        <div class="book-cover">${book.cover}</div>
    </div>

    <div class="book-info">
        <h1 class="book-title">${book.title}</h1>
        <div class="book-author">by ${book.author}</div>

        <div class="book-meta">
            <span class="book-rating">⭐ ${book.rating}</span>
            <span class="book-price">$${book.price}</span>
        </div>

        <p class="book-description">
            ${book.description || "No description available for this title."}
        </p>

        <div class="actions">
            <button class="action-btn btn btn-outline wishlist-btn" data-id="${book.isbn}">
                ♡ Add to Wishlist
            </button>
            <button class="action-btn btn btn-primary cart-btn" data-id="${book.isbn}">
                🛒 Add to Cart – $${book.price}
            </button>
        </div>
    </div>
    `;
    authorBooks.forEach(book => 
    {
        const container = document.createElement('div');
        container.className = 'book-card';
        container.innerHTML = ` <a href="book.html?id=${book.isbn}" style="text-decoration: none; color: inherit;">
            <div class="book-icon">${book.cover}</div>
            <h3>${book.title}</h3>
            <div class="card-meta">
                <span class="price">$${book.price}</span>
                <span class="rating">⭐ ${book.rating}</span>
            </div>
        </a>
        <div class="card-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button class="action-btn wishlist-btn" data-id="${book.isbn}">❤️</button>
            <button class="action-btn cart-btn" data-id="${book.isbn}">🛒</button>
        </div>`;
        moreBooks.appendChild(container);
    }
    )
}


bookContent.addEventListener('click', (e) => {
         const btn = e.target.closest('.action-btn');
         if(!btn) return;
         const result = handleAction(btn, books);
             if (result) {
         
         const isAdded = updateStorage(result.type, result.data);
         
         
         if (isAdded) {
             btn.classList.add('active-btn');
         } else {
             btn.classList.remove('active-btn');
         }
     }
 
     });
 moreBooks.addEventListener('click', (e) => {
         const btn = e.target.closest('.action-btn');
         if(!btn) return;
         const result = handleAction(btn, books);
             if (result) {
         
         const isAdded = updateStorage(result.type, result.data);
         
         
         if (isAdded) {
             btn.classList.add('active-btn');
         } else {
             btn.classList.remove('active-btn');
         }
     }
 
     });
createUI();