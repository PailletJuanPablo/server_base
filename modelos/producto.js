// Importamos mongoose para utilizarlo
let mongoose = require('mongoose');

//Creamos un objeto del tipo Schema para configurar modelos
let Schema = mongoose.Schema;

//Creamos el modelo de Fecha
let ModeloProducto = Schema({
    nombre: {type:String, required:true},
    descripcion: {type:String, required:true},
    imagen: {type:String, required:false},
    precio:{type:Number,required:true},
    categoria: {type: Schema.ObjectId, ref: 'Categoria'}
});

//Lo exportamos
module.exports = mongoose.model('Producto', ModeloProducto);