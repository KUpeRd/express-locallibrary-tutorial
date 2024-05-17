function fetchGenreDataAndPopulateForm() {
    const path = window.location.pathname;
    const regex = /\/genre\/([^/]+)\/update/;
    const match = path.match(regex);
    const id = match[1];
    fetch('/catalog/api/genre/' + id + '/update')
      .then(response => response.json())
      .then(data => {
        const name = data.genre.name;
        const titleInput = document.getElementById('titleInput');
        if (titleInput) {
          titleInput.value = name;
        } else {
          console.error('Element with id "titleInput" not found');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
}

function updateGenre(id, newName) {
    const data = { name: newName };
  
    fetch("/catalog/api/genre/" + id + "/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data successfully sent:', data);
      window.location.href = '/catalog/genre/' + data.genre._id;
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
}

function fetchGenreDataAndPopulateForm() {
    const path = window.location.pathname;
    const regex = /\/genre\/([^/]+)\/update/;
    const match = path.match(regex);
    const id = match[1];
    fetch('/catalog/api/genre/' + id + '/update')
      .then(response => response.json())
      .then(data => {
        const name = data.genre.name;
        const titleInput = document.getElementById('titleInput');
        if (titleInput) {
          titleInput.value = name;
        } else {
          console.error('Element with id "titleInput" not found');
        }

        const updateGenreBtn = document.getElementById('updateGenreBtn');
        if (updateGenreBtn) {
          updateGenreBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const newName = titleInput.value;
            const id = data.genre._id;
            updateGenre(id, newName);
          });
        } else {
          console.error('Button with id "updateGenreBtn" not found');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
}

fetchGenreDataAndPopulateForm();
