const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosPost,
        usuariosGet, 
        getUsuarioById,
        putUsuarios,
        usuariosDelete} = require('../controllers/user.controller');
        
const { existeEmail, esRoleValido, existeUsuarioById } = require('../helpers/db-validator');

const router = Router();

router.get("/", usuariosGet);

    router.get(
        "/:id",
        [
            check('id','No es un id valido').isMongoId(),
            check('id').custom(existeUsuarioById),
            validarCampos
        ], getUsuarioById);

router.put(
    "/:id",
    [
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check("role").custom(esRoleValido),
        validarCampos
    ], putUsuarios
);

router.post(
    "/",
    [
        check("nombre","nombre no puede estar vacio").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existeEmail),
        check("role").custom(esRoleValido),
        validarCampos, 
    ], usuariosPost);

router.delete(
    "/:id",
    [
        check('id', 'id no valido'),
        check('id').custom(existeUsuarioById),
        
    ], usuariosDelete
);

module.exports = router;