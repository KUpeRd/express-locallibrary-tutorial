document.addEventListener("DOMContentLoaded", getGenreData);

async function getGenreData() {
    try {
        const response = await fetch('http://localhost:3000/catalog/api/genre_list');
        const data = await response.json();
        displayGenres(data.genre_list);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayGenres(genres) {
    const genreList = document.getElementById('genre-list');
    genreList.innerHTML = '';

    genres.forEach(genre => {
        const div = document.createElement('li');
        const link = document.createElement('a');
        link.href = `/catalog/genre/${genre._id}`; 
        link.textContent = genre.name;
        link.classList.add('genre-link');
        div.appendChild(link);
        genreList.appendChild(div);
    });
}
