import { getBooks } from './api.js';
import { handleAction, updateStorage } from './actions.js';
async function getData() {
    const data = await getBooks();
    return data;
}
const books = await getData();

// UI Selectors
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const booksGrid = document.getElementById('booksGrid');
const resultsCount = document.getElementById('resultsCount');
const emptyState = document.getElementById('emptyState');
const priceRange = document.getElementById('priceRange');
const priceValLabel = document.getElementById('priceVal');
const inStockOnly = document.getElementById('inStockOnly');
const sortSelect = document.getElementById('sortSelect');
const resetFiltersBtn = document.getElementById('resetFilters');

// State
const allFilters = {
    category: ['all'], 
    rating: 0,
    price: 50,
    availability: false,
    sortBy: 'default'
};
//CART and WISHLIST
const savedCart = JSON.parse(localStorage.getItem('userCart')) || [];
const savedWishlist = JSON.parse(localStorage.getItem('userWishlist')) || [];

priceRange.addEventListener('input', (e) => {
    priceValLabel.textContent = `$${e.target.value}`;
    allFilters.price = Number(e.target.value);
});

const categoryChips = document.querySelectorAll('.category-chip');
categoryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-value');
        if(val === 'all') {
            allFilters.category = ['all'];
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        } else {
            allFilters.category = allFilters.category.filter(c => c !== 'all');
            document.querySelector('[data-value="all"]').classList.remove('active');
            
            if(allFilters.category.includes(val)) {
                allFilters.category = allFilters.category.filter(c => c !== val);
                chip.classList.remove('active');
            } else {
                allFilters.category.push(val);
                chip.classList.add('active');
            }
        }
    });
});

// Update rating state only
const ratingChips = document.querySelectorAll('.rating-chip');
ratingChips.forEach((chip) => {
    chip.addEventListener('click', () => {
        ratingChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        allFilters.rating = parseFloat(chip.getAttribute('data-value'));
    });
});

// Update sorting state only
sortSelect.addEventListener('change', (e) => {
    allFilters.sortBy = e.target.value;
});

// Update stock state only
inStockOnly.addEventListener('change', (e) => {
    allFilters.availability = e.target.checked;
});

// --- THE TRIGGER ---

searchBtn.addEventListener('click', () => {  
    findBooks();
});

function findBooks() {
    const query = searchInput.value.toLowerCase();

    let validData = books.filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(query) || 
                             b.author.toLowerCase().includes(query);
        
        const matchesCategory = allFilters.category.includes('all') || 
                               allFilters.category.includes(b.category.toLowerCase());
        
        const matchesRating = b.rating >= allFilters.rating;
        const matchesPrice = b.price <= allFilters.price;
        const matchesStock = allFilters.availability ? b.inStock : true;

        return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesStock;
    });

    // Handle Sort
    if (allFilters.sortBy === 'price-asc') validData.sort((a, b) => a.price - b.price);
    else if (allFilters.sortBy === 'price-desc') validData.sort((a, b) => b.price - a.price);
    else if (allFilters.sortBy === 'rating-desc') validData.sort((a, b) => b.rating - a.rating);

    renderBooks(validData);
}

function renderBooks(data) {
    booksGrid.innerHTML = '';
    resultsCount.textContent = `${data.length} results found`;

    if (data.length === 0) {
        emptyState.style.display = 'flex';
        return;
    }

    emptyState.style.display = 'none';
    data.forEach(b => {
        const gridBook = document.createElement('div');
        gridBook.className = 'book-card';
        gridBook.innerHTML = `
         <a href="book.html?id=${b.isbn}" class="book-link">
            <div class="book-cover">
              <div class="book-icon">${b.cover}</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">${b.title}</h3>
              <div class="card-author">${b.author}</div>
              <div class="card-meta">
                <span class="price">$${b.price}</span>
                <span class="rating">⭐ ${b.rating}</span>
              </div></a>
 <div class="card-actions">
<button class="action-btn wishlist-btn" data-id="${b.isbn}" data-action="favourite">❤️</button>
<button class="action-btn cart-btn" data-id="${b.isbn}" data-action="cart">🛒</button>
    </div>  
            </div>
            
        `;
        
        booksGrid.appendChild(gridBook);
      });
     
  }
//=======EventDelegation==========
 booksGrid.addEventListener('click', (e) => {
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
//=======|||||||||||||||==========
resetFiltersBtn.addEventListener('click', () => {
    allFilters.category = ['all'];
    allFilters.rating = 0;
    allFilters.price = 50;
    allFilters.availability = false;
    allFilters.sortBy = 'default';
    searchInput.value = '';
    categoryChips.forEach(chip => chip.classList.remove('active'));
    const allChip = document.querySelector('.category-chip[data-value="all"]');
    if (allChip) allChip.classList.add('active');
    ratingChips.forEach(chip => chip.classList.remove('active'));
    const anyRatingChip = document.querySelector('.rating-chip[data-value="0"]');
    if (anyRatingChip) anyRatingChip.classList.add('active');
    priceRange.value = 50;
    priceValLabel.textContent = '$50';
    inStockOnly.checked = false;
    sortSelect.value = 'default';
    booksGrid.innerHTML = '';
    resultsCount.textContent = 'Filters reset';
    emptyState.style.display = 'none';
});
