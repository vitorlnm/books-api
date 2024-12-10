const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books');

const app = express();
app.use(bodyParser.json());
app.use('/books', booksRoutes);

module.exports = app;
