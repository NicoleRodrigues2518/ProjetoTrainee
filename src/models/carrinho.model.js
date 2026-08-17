const mongoose = require ('mongoose')

const itemCarrinhoSchema = new mongoose.Schema({
    id_livro:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livro',
        required:true
    },
    quantidade:{
        type: Number,
        required: true,
        min: 1
    }
}, {_id: false});
const carrinhoSchema = new mongoose.Schema({
    itens: [itemCarrinhoSchema]

});

module.exports = mongoose.model('Carrinho', carrinhoSchema);