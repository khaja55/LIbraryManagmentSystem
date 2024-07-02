document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');

    // Clear previous results
    resultsTableBody.innerHTML = '';

    // Send a POST request to the backend with searchInput
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchInput: searchInput }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(data.error);
        } else {
            data.books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.year}</td>
                `;
                resultsTableBody.appendChild(row);
            });

            if (data.books.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="3">No results found</td>';
                resultsTableBody.appendChild(row);
            }
        }
    })
    .catch(error => console.error('Error:', error));
});
