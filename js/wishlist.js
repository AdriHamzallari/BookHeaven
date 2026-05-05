
const wishListInfo = document.getElementById('wishlist-info');
const wishListItems = document.getElementById('wishlist-grid');

function createWishList()
{
    const dreamBooks = JSON.parse(localStorage.getItem('userWishlist')) || [];
    wishListItems.innerHTML = '';
    if(dreamBooks.length === 0)
    {
    wishListInfo.innerHTML = `
    <div class="empty-state">
        <h2>Your Wishlist is Empty</h2>
        <p>Start exploring and add your favorites!</p>
        <a href="browse.html" class="btn-explore">Browse Collection</a>
    </div>
`;
    }
  let totalPrice = 0;
   dreamBooks.forEach(book => {
    totalPrice += book.price;
        const item = document.createElement('div');
        item.classList = 'card';
        item.innerHTML = `<div class="book-cover">${book.cover}</div>
    <div class="card-content">
        <h3>${book.title}</h3>
        <div class="author">${book.author}</div>
        <div class="card-footer">
            <span class="price">$${book.price}</span>
        </div>
        <div class="card-actions">
            <button class="btn btn-cart" data-id="${book.isbn}">Add to Cart</button>
            <button class="btn btn-remove" data-id="${book.isbn}">Remove</button>
        </div>
    </div>`;
    wishListItems.appendChild(item);
    
   });
     wishListInfo.innerHTML = ` <h1 class="page-title">Your Wishlist</h1>
    <div class="wishlist-summary">
        <strong>${dreamBooks.length} books</strong> saved • 
        Estimated total: <strong>$${totalPrice.toFixed(2)}</strong>
    </div>`;
}
//Update the badge
const cart = JSON.parse(localStorage.getItem('userCart')) || [];
 const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.setAttribute('data-count', cart.length);
    }
wishListItems.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.btn-remove');
    if (!removeBtn) return;
    const idToRemove = removeBtn.getAttribute('data-id');
    const card = removeBtn.closest('.card');
    card.remove();
    const current = JSON.parse(localStorage.getItem('userWishlist')) || [];
    const updated = current.filter(book => book.isbn !== idToRemove);
    localStorage.setItem('userWishlist', JSON.stringify(updated));
    createWishList();
});
createWishList();