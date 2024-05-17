function loadBooks() {
  fetch("http://localhost:3000/catalog/api/book_list")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      return response.json();
    })
    .then(data => {
      const bookDropdown = document.getElementById("book");
      bookDropdown.innerHTML = "";
      data.book_list.forEach(book => {
        const option = document.createElement("option");
        option.value = book._id;
        option.textContent = book.title;
        bookDropdown.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const requestData = {};
  formData.forEach((value, key) => {
    requestData[key] = value;
  });
  const jsonData = JSON.stringify(requestData);
  fetch("/catalog/api/bookinstance/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonData
  })
  .then(response => {
    if (response.ok) {
      console.log("Create successful");
      alert("Book instance created successfully");
    }
  });
}

window.addEventListener("load", loadBooks);
document.getElementById("updateForm").addEventListener("submit", handleFormSubmit);
