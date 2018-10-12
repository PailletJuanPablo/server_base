// Importamos mongoose para utilizarlo
let mongoose = require('mongoose');

//Creamos un objeto del tipo Schema para configurar modelos
let Schema = mongoose.Schema;

//Creamos el modelo de Fecha
let ModeloElemento = Schema({

    // Aquí se especifica en JSON
    // nombreCampo:{type:tipo de dato, required: true or false (si es requerido o no )}
    
});

//Lo exportamos
module.exports = mongoose.model('Elemento', ModeloElemento);