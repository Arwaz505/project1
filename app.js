const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const data = require('./data');

const app = express();
const port = 3000;

// Set up Handlebars
app.set('view engine', 'hbs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Add book form
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { title, author, theme, writer, year, company } = req.body;
    data.addBook(title, author, theme, writer, parseInt(year), company);
    res.redirect('/');
});

// Show book details
app.get('/show', (req, res) => {
    res.render('show', { book: null });
});

app.post('/show', (req, res) => {
    const book = data.showBookDetails(req.body.title);
    res.render('show', { book });
});

// Remove book form
app.get('/remove', (req, res) => {
    res.render('remove');
});

app.post('/remove', (req, res) => {
    data.removeBook(req.body.title);
    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
