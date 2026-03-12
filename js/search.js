
import { getBooks } from "./api.js";
async function getData() {
    const data = await getBooks();
    return data;
}
 export const dataToSearch = await getData();
//Take the data from main page
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');
console.log(searchTerm);
//Container
const booksContainer = document.getElementById('grid-container');
const noResultCase = document.getElementById("noresult");
const resultText = document.getElementById('result-text');
const header = document.getElementById('header');
const nrResult = document.getElementById('resultctr');
console.log(dataToSearch[0].author);
//Kontroll nese cfare po kerkohet eshte e ne te dhenat
const isValidData = dataToSearch.filter(d => d.author.toLowerCase().includes(searchTerm.toLowerCase()) || d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.isbn === searchTerm);
console.log(isValidData);
//Search funcionality
if(isValidData.length !== 0){
 noResultCase.style.display = "none";
 nrResult.textContent = isValidData.length;
  resultText.textContent = searchTerm;
        isValidData.forEach(b => {
    const gridBook = document.createElement('div');
    gridBook.className = "book-card";
    gridBook.innerHTML = `
        <div class="book-cover">
          <div class="book-icon">${b.cover}</div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${b.title}</h3>
          <div class="card-author">${b.author}</div>
          <div class="card-meta">
            <span class="price">${b.price}</span>
            <span class="rating">⭐ ${b.rating}</span>
          </div>
          <div class="card-actions">
            <button class="action-btn">❤️</button>
            <button class="action-btn">🛒</button>
          </div>
        </div>
    `;
    booksContainer.appendChild(gridBook);
  });
}
else{
header.style.display = 'none';
noResultCase.style.display = "flex";  
nrResult.textContent = isValidData.length; 
}


