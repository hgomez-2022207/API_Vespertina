const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { mascotasGet,
        getMascotaById,
        mascotaPost} = require('../controllers/pet.controller');
        
const router = Router();

router.post(
    "/",
    [
        check("nombre","nombre no puede estar vacio").not().isEmpty(), 
        check("especie", "La informacion de especie no puede estar vacia").not().isEmpty(),
        check("raza", "La informacion de raza no puede estar vacia").not().isEmpty(),
        check("edad","Para estar seguros del procedimiento a seguir, especifique la edad de la mascota").not().isEmpty(),
        validarCampos, 
    ], mascotaPost);

module.exports = router;