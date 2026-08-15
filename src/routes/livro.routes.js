const express = require("express");
const router = express.Router();
const {listaLivros, listaLivro, criaLivro, removeLivro} = require('../controllers/livro.controller');

router.get("/livro", listaLivros);

router.get("/livro/:id", listaLivro);

router.post("/livros", criaLivro);

router.delete("/livro/:id", removeLivro);

module.exports = router;