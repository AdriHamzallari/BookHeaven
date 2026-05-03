const cartItems = JSON.parse(localStorage.getItem('userCart')) || [];
const cartGrid = document.getElementById('cart-grid');
const infoSection = document.getElementById("info-section");
const chechkout = document.getElementById("checkout-section");
 function renderItems() {
    // Check for empty state first
    if (cartItems.length === 0) {
        cartGrid.innerHTML = ''; // Clear the grid
        infoSection.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <a href="books.html" class="btn-shop">Shop Now</a>
            </div>`;
        return;
    }

    cartGrid.innerHTML = ''; 
    let totalPrice = 0;

    cartItems.forEach(book => {
        totalPrice += Number(book.price); // Ensure it's a number
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

renderItems();

//Remove Logic
cartGrid.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-btn');
    if(!removeBtn) return;
    const idToRemove = removeBtn.getAttribute('data-id');
     // We create a NEW array excluding the one we don't want
    const updatedCart = cartItems.filter(book => book.isbn !== idToRemove);
    localStorage.setItem('userCart', JSON.stringify(updatedCart));
    renderItems();
});

