const mongoose = require ('mongoose')

const livroSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    autor:{
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true,
        min: 0
    },
    quantidade_estoque:{
        type: Number,
        required: true,
        min: 0
    }

})

module.exports = mongoose.model('Livro', livroSchema);