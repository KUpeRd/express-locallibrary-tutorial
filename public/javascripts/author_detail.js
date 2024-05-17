document.addEventListener("DOMContentLoaded", init);

function init() {
    getData();
}

function getData() {
    const authorId = window.location.pathname.split("/").pop();
    fetch(`/catalog/api/author/${authorId}`)
        .then(response => response.json())
        .then(data => {
            renderAuthorDetails(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function renderAuthorDetails(data) {
    const authorDetailDiv = document.getElementById('authorDetail');
    authorDetailDiv.innerHTML = '';

    const authorName = createAuthorElement('h2', `${data.author.first_name} ${data.author.family_name}`);
    const authorId = createAuthorElement('p', `Author ID: ${data.author._id}`);
    const authorBirth = createAuthorElement('p', `Date of birth: ${data.author.date_of_birth || 'N/A'}`, 'author-birth');
    const authorDeath = createAuthorElement('p', `Date of death: ${data.author.date_of_death || 'N/A'}`, 'author-death');
    const booksList = createBooksList(data.author_books);
    const authorDelete = createDeleteButton(data.author._id, data.author_books.length);
    const authorUpdate = createUpdateButton(data.author._id);

    authorDetailDiv.append(authorName, authorId, authorBirth, authorDeath, booksList, authorDelete, authorUpdate);
}

function createAuthorElement(tag, textContent, className) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (className) element.classList.add(className);
    return element;
}

function createBooksList(books) {
    const booksList = document.createElement('ul');
    books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `${book.title}: ${book.summary}`;
        booksList.appendChild(bookItem);
    });
    return booksList;
}

function createDeleteButton(id, booksCount) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.classList.add('delete-button');
    button.onclick = () => handleDelete(id, booksCount);
    return button;
}

function createUpdateButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Update';
    button.classList.add('update-button');
    button.onclick = () => handleUpdate(id);
    return button;
}

function handleDelete(id, booksCount) {
    if (booksCount > 0) {
        alert('Author has books. Delete them first');
        return;
    }

    deleteAuthor(id)
        .then(() => {
            window.location.href = 'http://localhost:3000/catalog/authors';
        })
        .catch(error => {
            console.error('Error when running deleteAuthor function:', error);
        });
}

function handleUpdate(id) {
    window.location.href = `http://localhost:3000/catalog/author/${id}/update`;
}

async function deleteAuthor(id) {
    try {
        const response = await fetch(`/catalog/api/author/${id}/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ authorid: id })
        });
        return response.json();
    } catch (error) {
        console.error('Error deleting author:', error);
    }
}
