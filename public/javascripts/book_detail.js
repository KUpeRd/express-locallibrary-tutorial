document.addEventListener('DOMContentLoaded', function() {
  fetchDataAndPopulate();
});

function fetchDataAndPopulate() {
  const bookId = window.location.pathname.split("/").pop();
  fetch(`/catalog/api/book/${bookId}`)
    .then(response => response.json())
    .then(data => {
      populateBookDetail(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function populateBookDetail(data) {
  const bookDetail = document.getElementById('bookDetail');
  
  const bookTitle = createAndAppendElement('h2', data.book.title, bookDetail);
  
  const authorName = document.createElement('p');
  const authorLink = createAndAppendElement('a', `${data.book.author.first_name} ${data.book.author.family_name}`, authorName);
  authorLink.classList.add('author-link');
  authorLink.href = `http://localhost:3000/catalog/author/${data.book.author._id}`;
  bookDetail.appendChild(authorName);

  createAndAppendElement('p', `Summary: ${data.book.summary}`, bookDetail);
  createAndAppendElement('p', `ISBN: ${data.book.isbn}`, bookDetail);
  createAndAppendElement('p', `Genre: ${data.book.genre.map(genre => genre.name).join(', ')}`, bookDetail);

  const instancesHeader = createAndAppendElement('h3', 'Book Instances', bookDetail);

  if (data.book_instances.length === 0) {
    createAndAppendElement('p', 'N/A', bookDetail);
  } else {
    data.book_instances.forEach(instance => {
      const instanceDiv = document.createElement('div');
      instanceDiv.classList.add('border-with-background', 'instance');
      createAndAppendElement('p', `Imprint: ${instance.imprint}`, instanceDiv);
      createAndAppendElement('p', `Status: ${instance.status}`, instanceDiv);
      createAndAppendElement('p', `Due Back: ${instance.due_back ? new Date(instance.due_back).toLocaleString() : 'N/A'}`, instanceDiv);
      bookDetail.appendChild(instanceDiv);
    });
  }
}

function createAndAppendElement(tag, text, parent) {
  const element = document.createElement(tag);
  element.textContent = text;
  parent.appendChild(element);
  return element;
}
