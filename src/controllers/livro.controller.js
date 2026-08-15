const LivroModel = require('../models/livro.model');

async function listaLivros(req,res){
    try{
        const livrosListados = await LivroModel.find();
        res.status(200).json(livrosListados);
    }catch(error){
        res.status(500).send(error.message);
    }
}

async function listaLivro(req,res){
    try{
        const {id} = req.params;
        const livroListado = await LivroModel.findById(id);
        res.status(200).json(livroListado);
    }catch(error){
        res.status(500).send(error.message);
    }
}

async function criaLivro(req, res){
    try{
        const {titulo, autor, preco, quantidade_estoque} = req.body;
        if(preco>=0 && quantidade_estoque>0){
            const livroSalvo = await LivroModel.create({titulo, autor, preco, quantidade_estoque});
            res.status(200).json(livroSalvo);
        }else {
            return res.status(400).json({ mensagem: 'Preço e estoque devem ser maiores ou iguais a zero.' });
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}

async function removeLivro(req, res){
    try{
        const {id} = req.params;
        const livroRemovido = await LivroModel.findByIdAndDelete(id);
        res.status(200).json(livroRemovido);

    }catch(error){
        res.status(500).send(error.message);

    }
}

module.exports = {
    listaLivros,
    listaLivro,
    criaLivro,
    removeLivro
};