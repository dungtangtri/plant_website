const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTerm = input.value;
  input.value = '';
  const searchResults = await fetch(`/search?q=${searchTerm}`).then(res => res.json());
  displayResults(searchResults);
});

function displayResults(results) {
  resultsDiv.innerHTML = '';
  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
  } else {
    for (const result of results) {
      const resultDiv = document.createElement('div');
      resultDiv.innerHTML = 
      `<h3>${result['Name']}</h3>
      <p>${result['Dạng sống']}</p>`;
      resultsDiv.appendChild(resultDiv);
    }
  }
}
