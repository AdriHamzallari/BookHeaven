
export const formatBookData = (book) => ({
    isbn: book.isbn,
    cover: book.cover,
    title: book.title,
    author: book.author,
    price: book.price,
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
