const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        requied:[true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'La contrase;a es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        rquire: true,
        enum: ["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default:false
    }
});

module.exports = model('Usuario', UsuarioSchema);