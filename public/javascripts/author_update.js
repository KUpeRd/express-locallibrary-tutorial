document.addEventListener("DOMContentLoaded", init);

function init() {
    fetchAndUpdateAuthor();
}

function formatDateToString(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function updateAuthor(authorId) {
    const firstName = document.getElementById('first_name').value;
    const familyName = document.getElementById('family_name').value;
    const dateOfBirthElement = document.getElementById('date_of_birth');
    const dateOfDeathElement = document.getElementById('date_of_death');
    let dateOfBirth = dateOfBirthElement.value ? new Date(dateOfBirthElement.value).toISOString() : undefined;
    let dateOfDeath = dateOfDeathElement.value ? new Date(dateOfDeathElement.value).toISOString() : undefined;
    const body = {
        first_name: firstName,
        family_name: familyName,
        date_of_birth: dateOfBirth,
        date_of_death: dateOfDeath
    };

    sendUpdateRequest(authorId, body);
}

function sendUpdateRequest(authorId, body) {
    fetch(`/catalog/api/author/${authorId}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.log(data.errors);
            alert('Error updating author');
        } else {
            alert('Author updated successfully');
            window.location.href = "/catalog/author/" + data.author._id;
        }
    })
    .catch(error => {
        console.error('Error creating author:', error);
    });
}

function createInputField(id, value) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.value = value || '';
    if (id.includes('date')) {
        input.placeholder = "DD/MM/YYYY";
    }
    return input;
}

function createLabel(text, htmlFor) {
    const label = document.createElement("label");
    label.htmlFor = htmlFor;
    label.textContent = text.replace(/_/g, ' '); 
    return label;
}

function createButton(text, onClickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClickHandler);
    return button;
}

function fetchAndUpdateAuthor() {
    const path = window.location.pathname;
    const id = path.match(/\/author\/([^/]+)\/update/)[1];
    
    fetch(`/catalog/api/author/${id}/update`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const author = data.author;
        let authorUpdateElement = document.getElementById("authorUpdate");
        if (!authorUpdateElement) {
            authorUpdateElement = document.createElement("div");
            authorUpdateElement.id = "authorUpdate";
            document.body.appendChild(authorUpdateElement);
        }
        authorUpdateElement.innerHTML = '';

        ['first_name', 'family_name', 'date_of_birth', 'date_of_death'].forEach(field => {
            const input = createInputField(field, author[field]);
            const label = createLabel(field, field);
            authorUpdateElement.appendChild(label);
            if (field.includes('date')) {
                input.value = author[field] ? formatDateToString(author[field]) : '';
            }
            authorUpdateElement.appendChild(input);
            authorUpdateElement.appendChild(document.createElement("br"));
        });

        const submitButton = createButton("Update", () => updateAuthor(id));
        authorUpdateElement.appendChild(submitButton);
    })
    .catch(error => {
        console.error('Error fetching author data:', error);
    });
}
