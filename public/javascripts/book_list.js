document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
  });
  
  async function fetchBooks() {
    try {
        const response = await fetch('http://localhost:3000/catalog/api/book_list', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
  
        const data = await response.json();
  
        if (data && data.book_list) {
            displayBooks(data.book_list);
        } else {
            showError('No books found');
        }
    } catch (error) {
        showError('Error fetching books');
    }
  }
  
  function displayBooks(books) {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
  
        const titleElement = document.createElement('div');
        const titleLink = document.createElement('a');
        titleElement.classList.add('book-title');
        titleLink.classList.add('book-title-link');
        titleElement.appendChild(titleLink);
        titleLink.textContent = book.title;
        bookElement.appendChild(titleElement);
        titleLink.href = `http://localhost:3000/catalog/book/${book._id}`;
  
        const authorsElement = document.createElement('div');
        authorsElement.classList.add('book-authors');
        authorsElement.textContent = `${book.author.first_name} ${book.author.family_name}`;
        bookElement.appendChild(authorsElement);
  
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-book-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteBook(book._id));
        bookElement.appendChild(deleteButton);
  
        bookContainer.appendChild(bookElement);
    });
  }
  
  async function deleteBook(id) {
      try {
          const response = await fetch(`/catalog/api/book/${id}/delete`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ id: id })
          });
  
          if (response.ok) {
              fetchBooks();
          } else {
              console.error('Error deleting book:', response.status);
              showError(`Error deleting book: ${response.status}`);
          }
      } catch (error) {
          console.error('Error deleting book:', error);
          showError(`Error deleting book: ${error}`);
      }
  }
  
  function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    toast.classList.add('show');
  
    const hideToast = () => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    };
  
    setTimeout(hideToast, 15000);
    toast.addEventListener('click', hideToast);
  }
  