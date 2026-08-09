const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const Livro = require('./models/Livro'); // essa parte deve ser ajustada de acordo com o caminho escolhido
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/simon_books';

async function popularBanco() {
  try {
    // conexão com o BD
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB');


    //limpa a base de dados atual para evitar duplicações caso o script seja rodado mais de uma vez
    await Livro.deleteMany({});

    const livros = [];

    // leitura do CSV e formatação dos dados
    fs.createReadStream('livros.csv')
      .pipe(csv())
      .on('data', (row) => {
        livros.push({
          titulo: row.titulo,
          autor: row.autor,
          preco: parseFloat(row.preco),
          quantidade_estoque: parseInt(row.quantidade_estoque, 10)
        });
      })
      .on('end', async () => {
        // inserção no MongoDB
        if (livros.length > 0) {
          await Livro.insertMany(livros);
          console.log(`${livros.length} livros foram inseridos no BD`);
        } else {
          console.log('nenhum livro no BD');
        }
        
        // encerra a conexão
        mongoose.connection.close();
        process.exit(0);
      });

  } catch (error) {
    console.error('Erro ao popular BD', error);
    process.exit(1);
  }
}

// Executa a função principal
popularBanco();