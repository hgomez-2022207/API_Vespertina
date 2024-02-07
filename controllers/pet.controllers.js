const bcryptjs = require('bcryptjs');
const Mascota = require('../models/pet');
const { response } = require('express');

const mascotasGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado:true};

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascota
    })
}

const getMascotaById  = async (req, res) =>{
    const{ id } = req.params;
    const mascotas = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const mascotaPost = async (req, res) => {
    const {nombre, especie, raza, edad} = req.body;
    const mascotas = new Mascota({nombre, especie, raza, edad});

    const salt = bcryptjs.genSaltSync();
    
    await mascota.save();

    res.status(202).json({
        mascota
    });
}

module.exports = {
    mascotaPost,
    mascotasGet,
    getMascotaById
}