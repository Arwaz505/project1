const fs = require('fs');
const _ = require('lodash');

const booksFile = 'books-data.json';

// Load books from JSON file
const loadBooks = () => {
    try {
        const dataBuffer = fs.readFileSync(booksFile);
        return JSON.parse(dataBuffer);
    } catch (e) {
        return [];
    }
};

// Save books to JSON file
const saveBooks = (books) => {
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
};

// Add a book
const addBook = (title, author, theme, writer, year, company) => {
    const books = loadBooks();
    if (!books.find((book) => book.title === title)) {
        books.push({ title, author, theme, writer, year, company });
        saveBooks(books);
    }
};

// Show book details
const showBookDetails = (title) => {
    const books = loadBooks();
    return books.find((book) => book.title === title) || null;
};

// Remove a book
const removeBook = (title) => {
    let books = loadBooks();
    books = books.filter((book) => book.title !== title);
    saveBooks(books);
};

module.exports = {
    addBook,
    showBookDetails,
    removeBook
};
