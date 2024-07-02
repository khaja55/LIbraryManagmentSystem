document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');

    // Clear previous results
    resultsTableBody.innerHTML = '';

    // Simulated search results (in a real application, you would fetch these from a server)
    const books = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
        { title: '1984', author: 'George Orwell', year: 1949 },
        { title: 'Moby Dick', author: 'Herman Melville', year: 1851 }
    ];

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        book.author.toLowerCase().includes(searchInput.toLowerCase())
    );

    filteredBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
        `;
        resultsTableBody.appendChild(row);
    });

    if (filteredBooks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3">No results found</td>';
        resultsTableBody.appendChild(row);
    }
});
