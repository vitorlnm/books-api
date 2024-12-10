const request = require('supertest');
const app = require('../app');
const { sequelize, Book } = require('../models');

beforeEach(async () => {
    await sequelize.sync({ force: true }); // Vai recriar o banco antes de cada teste
});

describe('Testes de Integração para Livros', () => {
    test('Adiciona um novo livro com dados válidos', async () => {
        const res = await request(app).post('/books').send({
            title: 'Livro Teste',
            author: 'Autor Teste',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Livro Teste');
        expect(res.body.author).toBe('Autor Teste');
    });

    test('Tenta adicionar um livro com dados inválidos', async () => {
        const res = await request(app).post('/books').send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBeTruthy();
    });

    test('Lista todos os livros', async () => {
        await Book.create({ title: 'Livro 1', author: 'Autor 1' });
        const res = await request(app).get('/books');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe('Livro 1');
    });

    test('Atualiza informações de um livro', async () => {
        const book = await Book.create({ title: 'Livro 1', author: 'Autor 1' });
        const res = await request(app).put(`/books/${book.id}`).send({
            title: 'Livro Atualizado',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Livro Atualizado');
    });

    test('Remove um livro', async () => {
        const book = await Book.create({ title: 'Livro 1', author: 'Autor 1' });
        const res = await request(app).delete(`/books/${book.id}`);

        expect(res.statusCode).toBe(204);

        const books = await Book.findAll();
        expect(books.length).toBe(0);
    });
});
