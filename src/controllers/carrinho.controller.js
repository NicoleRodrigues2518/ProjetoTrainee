const CarrinhoModel = require ('../models/carrinho.model');
const LivroModel = require ('../models/livro.model');

async function carrinhoGlobal(){
    const carrinho = await CarrinhoModel.fincOne();
    if(!carrinho){
        carrinho = await CarrinhoModel.cretae({ itens: []});
    }
    return carrinho;
}

async function listaCarrinho (req, res){
    try{
        const carrinhoListado = await carrinhoGlobal();
        await carrinhoListado.populate('itens.id_livro');
        res.status(200).json(carrinhoListado);
    }catch(error){
        res.status(500).send(error.message);
    }
}

async function criaItem (req, res){
    try{
        const{id_livro, quantidade} = req.body;
        const livro = await LivroModel.findById(id_livro);
        if(!livro){
            return res.status(404).json({mensagem: "Livro não encontrado"})
        }
        if(livro.quantidade_estoque < quantidae){
        return res.satus(400).json({mensagem: "Estoque insuficiente"});
        }
        const carrinhoCriado = await carrinhoGlobal();
        const itemIndex = carrinhoCriado.itens.findIndex(item => item.id_livro.toString() === id_livro);
        if(itemIndex > -1){
            carrinhoCriado.itens[itemIndex].quantidade += quantidade;
        } else{
            carrinhoCriado.itens.push({id_livro, quantidade})
        }
        await carrinhoCriado.save();
        res.status(200).json(carrinhoCriado);
    }catch(error){
        res.status(500).send(error.message)
    }
}

async function removeItem (req, res){
    try{
        const {itens}  = req.params;
        const carrinhoRemovido = await carrinhoGlobal();

        carrinhoRemovido.itens = carrinhoRemovido.itens.filter(item => item.id_livro.toString() !== id);
        await carrinhoRemovido.save();a
        res.status(200).json(carrinhoRemovido);
    }catch(error){
        res.status(500).send(error.message);
    }
}

module.exports = {
    listaCarrinho,
    criaItem,
    removeItem
};
