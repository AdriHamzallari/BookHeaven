
export const formatBookData = (book) => ({
    isbn: book.isbn,
    cover: book.cover,
    title: book.title,
    author: book.author,
    price: book.price,
    rating: book.rating
});

export function handleAction(btn, books) {
    const btnId = btn.getAttribute('data-id');
    
    const book = books.find(b => b.isbn.toString() === btnId);

    if (!book) return null;

    const formattedData = formatBookData(book);

    if (btn.classList.contains('wishlist-btn')) {
        return { type: 'WISHLIST', data: formattedData };
    }
    
    if (btn.classList.contains('cart-btn')) {
        return { type: 'CART', data: formattedData };
    }
    
    return null;
}
export function updateStorage(type, data) {
    const key = type === 'CART' ? 'userCart' : 'userWishlist';
    let items = JSON.parse(localStorage.getItem(key)) || [];
    
    const exists = items.some(item => item.isbn === data.isbn);

    if (!exists) {
        items.push(data);
        localStorage.setItem(key, JSON.stringify(items));
        return true; 
    } else {
        items = items.filter(item => item.isbn !== data.isbn);
        localStorage.setItem(key, JSON.stringify(items));
        return false;
    }
}
export function restoreButtonStates(container, isbn) {
  const savedCart = JSON.parse(localStorage.getItem('userCart')) || [];
  const savedWishlist = JSON.parse(localStorage.getItem('userWishlist')) || [];

  const wishBtn = container.querySelector('.wishlist-btn');
  const cartBtn = container.querySelector('.cart-btn');

  if (wishBtn && savedWishlist.some(i => i.isbn === isbn)) wishBtn.classList.add('active-btn');
  if (cartBtn && savedCart.some(i => i.isbn === isbn)) cartBtn.classList.add('active-btn');
}
