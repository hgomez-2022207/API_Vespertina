const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { mascotasGet,
        getMascotaById,
        mascotaPost,
        mascotaPut} = require('../controllers/pet.controllers');

const { existeMascotaById } = require('../helpers/db-validator')
        
const router = Router();

router.post(
    "/",
    [
        check("nombre","nombre no puede estar vacio").not().isEmpty(), 
        check("especie", "La informacion de especie no puede estar vacia").not().isEmpty(),
        check("raza", "La informacion de raza no puede estar vacia").not().isEmpty(),
        check("edad","Para estar seguros del procedimiento a seguir, especifique la edad de la mascota").not().isEmpty().isNumeric()
    ], mascotaPost);

router.get("/", mascotasGet);

router.get(
    "/:id",
    [
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
    ], getMascotaById
);

router.put(
    "/:id",
    [
        check("nombre","El nuevo nombre no puede estar vacio").not().isEmpty(),
        check("especie","La especie debe tener informacion").not().isEmpty(),
        check('raza','esta informacion no debe estar vacia').not().isEmpty(),
        check("edad","Para un cuidado mas apropiado anote el numero de años que tiene la mascota").not().isEmpty().isNumeric(),
    ], mascotaPut
);

module.exports = router;