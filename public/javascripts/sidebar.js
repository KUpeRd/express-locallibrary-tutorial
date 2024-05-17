document.addEventListener("DOMContentLoaded", function() {
  var sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  
  fetch("/sidebar.html")
      .then(response => response.text())
      .then(html => {
          sidebar.innerHTML = html;

          document.body.insertBefore(sidebar, document.body.firstChild);
      })
      .catch(error => console.error("Error loading sidebar:", error));
});
