document.addEventListener("DOMContentLoaded", function() {
    function populateBooks(bookList, selectedBookId) {
        const bookDropdown = document.getElementById("book");
        bookDropdown.innerHTML = "";
        bookList.forEach(book => {
            const option = document.createElement("option");
            option.value = book._id;
            option.textContent = book.title;
            if (book._id === selectedBookId) {
                option.selected = true;
            }
            bookDropdown.appendChild(option);
        });
    }

    function fetchAndUpdateData(id) {
        fetch("/catalog/api/bookinstance/" + id + "/update")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => {
                populateBooks(data.book_list, data.selected_book);
                document.getElementById("imprint").value = data.bookinstance.imprint;
                document.getElementById("status").value = data.bookinstance.status;

                const dueBackDate = new Date(data.bookinstance.due_back);
                const formattedDueBackDate = dueBackDate.toISOString().slice(0,10);
                document.getElementById("due_back").value = formattedDueBackDate;
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    const path = window.location.pathname;
    const regex = /\/bookinstance\/([^/]+)\/update/;
    const match = path.match(regex);
    const id = match[1];

    fetchAndUpdateData(id);

    document.getElementById("updateForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });
        const jsonData = JSON.stringify(requestData);
        fetch("/catalog/api/bookinstance/" + id + "/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
        .then(response => {
            if (response.ok) {
                console.log("Update successful");
                alert("Book instance updated successfully");
            } else {
                console.error("Update failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});
