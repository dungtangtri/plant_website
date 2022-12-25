const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const results = document.querySelector('#search-results');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  fetch(`/plants/search?q=${searchTerm}`)
.then((response) => response.json())
    .then((data) => {
      results.innerHTML = '';
      data.forEach((plant) => {
        const p = document.createElement('p');
        p.textContent = `${plant.name} - ${plant.description}`;
        results.appendChild(p);
      });
    });
});
