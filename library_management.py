pip install flask
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Simulated database or list of books

books = [
    { 'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 'year': 1925 },
    { 'title': 'To Kill a Mockingbird', 'author': 'Harper Lee', 'year': 1960 },
    { 'title': '1984', 'author': 'George Orwell', 'year': 1949 },
    { 'title': 'Moby Dick', 'author': 'Herman Melville', 'year': 1851 }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search_books():
    search_input = request.json.get('searchInput', '').lower()

    if not search_input:
        return jsonify({'error': 'Invalid search input'}), 400

    filtered_books = [book for book in books
                      if search_input in book['title'].lower() or
                      search_input in book['author'].lower()]

    return jsonify({'books': filtered_books})

if __name__ == '__main__':
    app.run(debug=True)
