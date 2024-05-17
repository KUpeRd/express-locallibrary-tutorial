async function fetchGenreDetailsAndDisplay() {
    try {
        const response = await fetch("/catalog/api/genre/" + window.location.pathname.split("/").pop());
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        let genreInfo = `<h2>${data.genre.name}</h2><ul>`;
        let genreId = data.genre._id;
        genreInfo += `<p><strong>ID:</strong> ${genreId}</p>`;
        genreInfo += `<h2><strong>Books</strong></h2>`;
        data.genre_books.forEach(book => {
            genreInfo += `<li><strong>${book.title}</strong>: ${book.summary}</li>`;
        });
        genreInfo += '</ul>';
        document.getElementById('genreDetail').innerHTML = genreInfo;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteGenre(genreId, data.genre_books.length)
                .then(() => {
                    window.location.href = '/catalog/genres';
                })
                .catch(error => console.error('An error occurred during delete:', error));
        });

        document.getElementById('genreDetail').appendChild(deleteButton);

        const updateButton = document.createElement('button');
        updateButton.classList.add('update-button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => {
            updateGenre(genreId);
        });
        document.getElementById('genreDetail').appendChild(updateButton);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetchGenreDetailsAndDisplay();
});

async function deleteGenre(id, books) {
    if (books > 0) {
        alert('Genre has books. Delete them first');
        return Promise.reject('Genre has books');
    } else {
        return fetch(`/catalog/api/genre/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Error deleting genre:', error);
            return Promise.reject(error);
        });
    }
}

async function updateGenre(id) {
    window.location.href = 'http://localhost:3000/catalog/genre/' + id + '/update';
}
