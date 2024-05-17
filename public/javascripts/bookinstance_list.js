document.addEventListener("DOMContentLoaded", init);

function init() {
    getData();
}

function getData() {
    const bookInstanceList = document.getElementById("bookinstance-list");
    const url = "http://localhost:3000/catalog/api/bookinstance_list";

    fetch(url)
        .then(response => response.json())
        .then(data => renderBookInstances(data.bookinstance_list))
        .catch(error => console.error('Error fetching data:', error));
}

function renderBookInstances(bookInstances) {
    const bookInstanceList = document.getElementById("bookinstance-list");
    const list = bookInstances.map(bookInstance => createBookInstanceHTML(bookInstance)).join('');
    bookInstanceList.innerHTML = list;
    addEventListeners();
}

function createBookInstanceHTML(bookInstance) {
    return `
        <div id="instance-${bookInstance._id}" class="book-instance">
            <h2><a href="http://localhost:3000/catalog/bookinstance/${bookInstance._id}", class="bookinstance-link">${bookInstance.book.title}</a></h2>
            <p><strong>Author:</strong> ${bookInstance.book.author}</p>
            <p><strong>Summary:</strong> ${bookInstance.book.summary}</p>
            <p><strong>Imprint:</strong> ${bookInstance.imprint}</p>
            <p><strong>Status:</strong> ${bookInstance.status}</p>
            <p><strong>Due Back:</strong> ${bookInstance.due_back ? new Date(bookInstance.due_back).toLocaleDateString() : 'N/A'}</p>
            <button data-id="${bookInstance._id}" class="delete-button">Delete</button>
            <button data-id="${bookInstance._id}" class="update-button">Update</button>
        </div>
    `;
}

function addEventListeners() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', () => deleteBookInstance(button.dataset.id));
    });

    document.querySelectorAll('.update-button').forEach(button => {
        button.addEventListener('click', () => updateBookInstance(button.dataset.id));
    });
}

function deleteBookInstance(id) {
    fetch(`http://localhost:3000/catalog/api/bookinstance/${id}/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data successfully sent:", data);
            document.getElementById(`instance-${id}`).remove();
        })
        .catch(error => {
            console.error("Error sending data:", error);
        });
}

function updateBookInstance(id) {
    window.location.href = `http://localhost:3000/catalog/bookinstance/${id}/update`;
}
