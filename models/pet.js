const {Schema, model} = require('mongoose');

const petSchema = Schema({
    nombre:{
        type: String,
        required:[true,'El nombre es obligatori']
    },
    especie:{
        type: String,
        required: [true, 'La especie es obligatoria']
    },
    raza:{
        type: String,
        required: true

    },
    edad:{
        type:Number,
        require: true
    }

});

module.exports = model('Mascota',petSchema);