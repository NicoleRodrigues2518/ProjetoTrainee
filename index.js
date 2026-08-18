const express = require('express');
const mongoose = require ('mongoose');

const livroRoutes = require ('./routes/livrro.routes');
const carrinhoRoutes = require('./routes/carrinho.routes');

const app = express();

app.use(express.json());

app.use(livroRoutes);
app.use(carrinhoRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/simon_books')
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000! (http://localhost:3000)');
        });
    })
    .catch((error) => {
        console.log('Erro ao conectar no banco de dados:', error);
    });