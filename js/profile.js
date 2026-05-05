const wishlist = JSON.parse(localStorage.getItem('userWishlist')) || [];
const cart = JSON.parse(localStorage.getItem('userCart')) || [];
const library = JSON.parse(localStorage.getItem('userLibrary')) || [];
const cartBadge = document.querySelector('.cart-badge');
const totalBooks = document.getElementById('nb-books');
const booksRead = document.getElementById('nb-read');
const wishlistCount = document.getElementById('nb-wishlist');
const totalPurchases = document.getElementById('nb-bought');
const saveBtn = document.querySelector('.settings-form .btn-primary');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
function updateProfileUI() {

    totalBooks.textContent = library.length;
    wishlistCount.textContent = wishlist.length;
    cartBadge.setAttribute('data-count', cart.length);
    totalPurchases.textContent = library.length;
    const readingList = document.querySelector('.reading-list');
    const currentlyReading = library.slice(-3).reverse(); 

    readingList.innerHTML = currentlyReading.map(book => `
      <div class="book-item">
        <div>${book.title || book}</div>
        <button class="btn btn-outline">Mark as Finished</button>
      </div>
    `).join('');
    const activityContainer = document.querySelector('.recent-activity');
    
    activityContainer.innerHTML = currentlyReading.map(book => `
      <div class="activity-item">
        <div class="activity-text">
          <strong>Purchased:</strong> ${book.title || book}
        </div>
        <div class="activity-date">Recently</div>
      </div>
    `).join('');
}
document.querySelector('.reading-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-outline')) {
        const bookItem = e.target.closest('.book-item');
        const title = bookItem.querySelector('div').textContent;

        booksRead.textContent = parseInt(booksRead.textContent) + 1;
        const activityContainer = document.querySelector('.recent-activity');
        const finishLog = `
          <div class="activity-item">
            <div class="activity-text"><strong>Finished:</strong> ${title}</div>
            <div class="activity-date">Just now</div>
          </div>
        `;
        activityContainer.insertAdjacentHTML('afterbegin', finishLog);

        bookItem.remove();
    }
});

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const updatedUser = {
        name: nameInput.value,
        email: emailInput.value
    };
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    document.querySelector('.user-info h1').textContent = updatedUser.name;
    document.querySelector('.user-email').textContent = updatedUser.email;

    logActivity(`Updated account settings for <strong>${updatedUser.name}</strong>`);

    alert('Changes saved successfully!');
});
window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('userProfile'));
    if (savedData) {
        nameInput.value = savedData.name;
        emailInput.value = savedData.email;
        document.querySelector('.user-info h1').textContent = savedData.name;
        document.querySelector('.user-email').textContent = savedData.email;
    }
});

updateProfileUI();