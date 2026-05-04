let libraryStorage = JSON.parse(localStorage.getItem('userLibrary')) || [];
console.log(libraryStorage);
const libraryInfo = document.getElementById('library-info');
const grid = document.getElementById('library-grid');
function createLibrary()
{
      if (libraryStorage.length === 0) {
        libraryInfo.innerHTML = `
            <h1 class="page-title">My Library</h1>
            <div class="empty-state" style="text-align:center; padding: 4rem 0;">
                <h2>Your library is empty</h2>
                <p>Start your collection by browsing our store!</p>
                <a href="browse.html" class="btn btn-read" style="display:inline-block; margin-top:1rem; text-decoration:none;">Browse Books</a>
            </div>`;
        grid.style.display = 'none';
        return;
    }
    libraryInfo.innerHTML = `
        <h1 class="page-title">My Library</h1>
        <div class="library-summary">
            <strong>${libraryStorage.length} books</strong> in your collection • <strong>0</strong> read this year
        </div>
    `;
     grid.innerHTML = ''; 
    libraryStorage.forEach(book => {
        const container = document.createElement('div');
        container.className = 'card';
        
        container.innerHTML = `
            <div class="book-cover">${book.cover}</div>
            <div class="card-content">
                <h3>${book.title}</h3>
                <div class="author">${book.author}</div>
                <div class="card-footer">
                  <span class="format-badge">Digital Edition</span>
                </div>
                <div class="card-actions">
                  <button class="btn btn-read">Read Now</button>
                  <a href="book.html?id=${book.isbn}" class="btn btn-details">Details</a>
                </div>
            </div>`;
        grid.appendChild(container);
    });
}
//Update the badge
const cart = JSON.parse(localStorage.getItem('userCart')) || [];
 const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.setAttribute('data-count', cart.length);
    }
createLibrary();
