const bcryptjs = require('bcryptjs');
const Mascota = require('../models/mascotas');
const { response } = require('express');

const mascotasGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado:true};
    console.log("mascotasGet");
    const [total, mascota] = await Promise.all([
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
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const mascotaPost = async (req, res) => {
    const {nombre, especie, raza, edad} = req.body;
    const mascota = new Mascota({nombre, especie, raza, edad});

    const salt = bcryptjs.genSaltSync();
    
    await mascota.save();

    res.status(202).json({
        mascota
    });
}

const mascotaPut = async (req, res) => {
    const { id } = req.params;
    const {nombre, especie,raza,edad} = req.body;
    const mascota = await Mascota.findByIdAndUpdate(id,{nombre, especie,raza,edad});

    //const salt = bcryptjs.genSaltSync();

    await mascota.save();

    res.status(200).json({
        msg: 'Datos actualizados exitosamente',
        mascota
    });
}

const mascotaDelete = async(req,res = response) => {
    const { id } = req.params;
    const mascota = await Mascota.findByIdAndUpdate(id,{estado:false});
    const mascotaAtentica = req.mascota;

    res.status(200).json({
        msg: "Mascota eliminada",
        mascota,
        mascotaAtentica
    });
}

module.exports = {
    mascotaPost,
    mascotasGet,
    getMascotaById,
    mascotaPut,
    mascotaDelete
}