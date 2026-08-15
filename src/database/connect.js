const mongoose = require ('mongoose')

const connectToDatabase = async () =>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@projetotrainee.15ps2yg.mongodb.net/?appName=ProjetoTrainee`)
        console.log("Conectado ao BD");
    }
    catch(error){
        console.log("Ocorreu um erro ao conectar ao BD");
    }
}
module.exports = connectToDatabase