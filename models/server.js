const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        this.mascotasPath = "/api/mascotas";

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }

    routes2(){
        this.app.use(this.usuariosPath, require('../routes/pet.routes'));
    }

    listen(){

        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchando el puerto',this.port)
        });
    
    }
}

module.exports = Server;