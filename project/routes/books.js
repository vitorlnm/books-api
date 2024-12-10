const express = require('express');
const { Book } = require('../models');
const router = express.Router();

// POST /books - Adiciona um novo livro
router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /books - Lista todos os livros
router.get('/', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

// PUT /books/:id - Atualiza um livro
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

        await book.update(req.body);
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /books/:id - Remove um livro
router.delete('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

    await book.destroy();
    res.status(204).send();
});

module.exports = router;
