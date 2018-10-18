// Importamos express
var express = require('express');
// Definimos una variable router que contendrá el módulo de rutas de express
var router = express.Router();
//Importamos el controlador del elemento
let elementoController = require('../controladores/controlador_elemento');
//Importamos método para verificar si el usuario está logueado
var verificarUsuario = require('../middlewares/auth');

//Rutas de categorías
router.get('/',verificarUsuario,elementoController.obtenerElementos);
router.post('/',elementoController.crearElemento);
router.get('/elementos/:id',elementoController.verElemento);
router.post('/elementos/:id',elementoController.actualizarElemento);
router.post('/elementos/eliminar/:id',elementoController.eliminarElemento);

module.exports = router;
