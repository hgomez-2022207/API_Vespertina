const mongoose = require('mongoose'); 

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Conexion con la base de datos realizada');
    }catch(e){
        throw new Error('Error de conexion con la base de datos',e)
    }
}

module.exports = {
    dbConnection
}