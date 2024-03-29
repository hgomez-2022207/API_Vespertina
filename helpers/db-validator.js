const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`E correo ${ correo } ye esta registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`)
    }
}

const existeMascotaById = async (id = '') => {
    const existeMascota = await Mascota.findOne({id});
    if(existeMascota){
        throw new Error(`la mascota con el id ${ id } no existe`)
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById,
    existeMascotaById
}