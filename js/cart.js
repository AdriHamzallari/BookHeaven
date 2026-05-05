let cartItems = JSON.parse(localStorage.getItem('userCart')) || [];
const cartGrid = document.getElementById('cart-grid');
const infoSection = document.getElementById("info-section");
const chechkout = document.getElementById("checkout-section");
const checkoutModal = document.getElementById('checkout-modal');
const totalAmount = document.getElementById('modal-total-amount');
 function renderItems() {
    // Empty state 
    if (cartItems.length === 0) {
        cartGrid.innerHTML = '';
        infoSection.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <a href="browse.html" class="btn-shop">Shop Now</a>
            </div>`;
        return;
    }

    cartGrid.innerHTML = ''; 
    let totalPrice = 0;

    cartItems.forEach(book => {
        totalPrice += Number(book.price);
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-cover">${book.cover}</div>
            <div class="item-info">
                <h4>${book.title}</h4>
                <div class="item-author">${book.author}</div>
                <div class="item-price">$${book.price}</div>
                <button class="remove-btn" data-id="${book.isbn}">Remove</button>
            </div>`;
        cartGrid.appendChild(cartItem);
    });
    totalAmount.textContent = totalPrice + "$";
    chechkout.innerHTML = `<div class="cart-total-card">
    <h3>Summary</h3>
    <div class="total-line">
      <span>Total</span>
      <span>$${totalPrice.toFixed(2)}</span>
    </div>
    <button class="checkout-btn">Checkout Now</button>
  </div>
      `;
}

//Remove Logic
cartGrid.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-btn');
    if(!removeBtn) return;
    const idToRemove = removeBtn.getAttribute('data-id');
    const card = removeBtn.closest('.cart-item');
    card.style.display = 'none';
   card.remove();
     const updatedCart = cartItems.filter(book => book.isbn !== idToRemove);
    localStorage.setItem('userCart', JSON.stringify(updatedCart));
    renderItems();
});

//Modal
const modal = document.getElementById('checkout-modal');
const openBtn = document.querySelector('.checkout-btn');
const closeBtn = document.getElementById('close-modal');
const cancleBtn = document.getElementById('cancel-purchase');
const confirmPurch = document.getElementById('confirm-purchase');

if (openBtn) openBtn.addEventListener('click', () => {
  modal.classList.add('active');
});
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});
cancleBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});
//Chechkout
confirmPurch.addEventListener('click', () => {
    let libraryData = JSON.parse(localStorage.getItem('userLibrary')) || [];
    libraryData.push(...cartItems);
    localStorage.setItem('userLibrary', JSON.stringify(libraryData));
    localStorage.removeItem('userCart');
    modal.classList.remove('active');
    window.location.href = 'library.html';
    
})
function syncNavbarBadge() {
    const cart = JSON.parse(localStorage.getItem('userCart')) || [];
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.setAttribute('data-count', cart.length);
    }
}
syncNavbarBadge();
renderItems();
