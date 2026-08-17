const express = require("express");
const router = express.Router();
const {listaCarrinho, criaItem, removeItem} = require('../controllers/carrinho.controller');

router.get("/carrido", listaCarrinho);

router.post("/carrinho/item", criaItem);

router.delete("/carrinho/item/:id", removeItem);

module.exports = router;