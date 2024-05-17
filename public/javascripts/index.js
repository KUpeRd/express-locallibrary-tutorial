document.addEventListener("DOMContentLoaded", function() {
  fetch('http://localhost:3000/catalog/api/index')
  .then(response => response.json())
  .then(data => {
    var indexElement = document.getElementById('index');
    if (indexElement) {
      var htmlContent = `
        <p>Books: ${data.book_count}</p>
        <p>Copies: ${data.book_instance_count}</p>
        <p>Copies available: ${data.book_instance_available_count}</p>
        <p>Authors: ${data.author_count}</p>
        <p>Genres: ${data.genre_count}</p>
      `;
      indexElement.innerHTML = htmlContent;
    }
  })
  .catch(error => {
    console.error('An error occured while fatching data:', error);
  });
});