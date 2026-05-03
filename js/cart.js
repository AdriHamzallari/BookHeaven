const cartItems = JSON.parse(localStorage.getItem('userCart')) || [];
const cartGrid = document.getElementById('cart-grid');
const infoSection = document.getElementById("info-section");

if(cartItems.length === 0){
    infoSection.innerHTML = `<div class="empty-cart">
    <h2>Your cart is empty</h2>
    <p>Looks like you haven't added anything yet.<br>Start browsing and add your favorite books!</p>
    <a href="books.html" class="btn-shop">Shop Now</a>
  </div>
    `;
}


function addToCart()
{

}