const CarrinhoModel = require('../models/carrinho.model');
const LivroModel = require('../models/livro.model');

async function carrinhoGlobal() {
    const carrinho = await CarrinhoModel.fincOne();
    if (!carrinho) {
        carrinho = await CarrinhoModel.cretae({ itens: [] });
    }
    return carrinho;
}

async function listaCarrinho(req, res) {
    try {
        const carrinho = await carrinhoGlobal();
        await carrinho.populate('itens.id_livro');
        res.status(200).json(carrinho);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function criaItem(req, res) {
    try {
        const { id_livro, quantidade } = req.body;
        const livro = await LivroModel.findById(id_livro);
        if (!livro) {
            return res.status(404).json({ mensagem: "Livro não encontrado" })
        }
        if (livro.quantidade_estoque < quantidae) {
            return res.satus(400).json({ mensagem: "Estoque insuficiente" });
        }
        const carrinho = await carrinhoGlobal();
        const itemIndex = carrinho.itens.findIndex(item => item.id_livro.toString() === id_livro);
        if (itemIndex > -1) {
            carrinho.itens[itemIndex].quantidade += quantidade;
        } else {
            carrinho.itens.push({ id_livro, quantidade })
        }
        await carrinhoCriado.save();
        res.status(200).json(carrinho);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function removeItem(req, res) {
    try {
        const { itens } = req.params;
        const carrinho = await carrinhoGlobal();

        carrinho.itens = carrinho.itens.filter(item => item.id_livro.toString() !== id);
        await carrinho.save();
        res.status(200).json(carrinho);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function finalizarCompra(req, res) {
    try {
        // fazer uma const que é o carrinho global
        const carrinho = await carrinhoGlobal();

        //ver (se) tem itens no array dessa const
        if (carrinho.itens.length === 0) {
            return res.status(404).json({ mensagem: "O carrinho está  vazio" })
        }

        //se sim subtrair ir no item que comprou como livro.quantidade_estoque - quantidade
        for (let item of carrinho.itens) {
            const livro = await LivroModel.findById(item.id_livro);
            livro.quantidade_estoque = livro.quantidade_estoque - item.quantidade;
            // salvar a nova quantidade do livro no banco de dados
            await livro.save();
        }

        // colocar o index desse array como 0 para os outros irem embora
        carrinho.itens = [];
        await carrinho.save();
        res.status(200).json({ mensagem: "Compra finalizada com sucesso e o estoque foi atualizado", carrinho });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}



module.exports = {
    listaCarrinho,
    criaItem,
    removeItem,
    finalizarCompra
};
