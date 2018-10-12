// Importamos los modelos Mongoose para poder acceder a sus metodos
// En este caso es un elemento de demo, deberán importar los que hayan creado
var Elemento = require("../modelos/categoria");

// ------------------------------------
// Método para obtener todos los elementos
// ------------------------------------

let obtenerElementos = (req, res) =>{
    //Ejecutaremos el metodo find para obtener todos los elementos
    Elemento.find()
    // Esto ejecuta una promise, que podemos manejar con 
    //.then cuando es ejecutada con éxito, 
    .then((elementos)=>{
        // Devolvemos respuesta en formato JSON con todos los elementos recibidos
        return res.send(elementos)
    })
    //.catch cuando no lo es
    .catch((err)=>{
        // Devolvemos respuesta con el error
        return res.send(err)
    })
}

// ------------------------------------
// Método para crear un elemento nuevo
// ------------------------------------

let crearElemento = (req,res) =>{
    // Ejecutamos el método .create del elemento, que nos permite ejecutar un then o un catch
    // .then cuando fué completado satisfactoriamente
    Elemento.create(req.body).then((elementoCreado)=>{
        // Si fue creado, devolvemos respuesta confirmando acción
        return res.send({mensaje:"Elementro Creado",detalles:elementoCreado})
    })
    .catch((errorCreando)=>{
        //Si no lo fué, capturamos el error con el catch y lo devulvemos
        return res.send({mensaje:"No se pudo crear",error:errorCreando})
    })
}

// ------------------------------------
// Método para actualizar un elemento
// ------------------------------------

let actualizarElemento = (req,res) => {
    // Ejecutamos la función findByIdAndUpdate, que recibe un id y datos a actualizar
    // El id viene de los parametros de la url, los datos a actualizar del body de la request (Que es una request POST)
    Elemento.findByIdAndUpdate(req.params.id,req.body)
    .then((elementoActualizado)=>{
        // Con then devolvemos una respuesta si fué creado satisfactoriamente
        return res.send({mensaje:"Okey!"})
    })
    .catch((err)=>{
        // Con catch devolvemos un mensaje de error si ocurrió alguno
        return res.send({mensaje:err})
    })
}

// ------------------------------------
// Método para ver un elemento individual
// ------------------------------------

let verElemento = (req,res)=>{
    // Ejecutamos la función findById, que recibe un id y devuelve un elemento en JSON
    // El id vendrá de los parámetros
    Elemento.findById(req.params.id)
    // Con then, capturamos el evento satisfactorio (JSON del elemento)
    .then((elemento)=>{
        // Devolvemos una respuesta con el elemento
        return res.send(elemento)
    })
    // Con Catch, capturamos un error
    .catch((err)=>{
        return res.send(err)
    })
}

// ------------------------------------
// Método para eliminar un elemento
// ------------------------------------

let eliminarElemento = (req,res)=>{
    // Ejecutamos la función findByIdAndRemove, que recibe un id y datos a actualizar
    Elemento.findByIdAndRemove(req.params.id)
    .then((elementoBorrado)=>{
        // Con then, capturamos el evento satisfactorio (eliminación)
        return res.send({message:"Elemento eliminado correctamente"})
    })
    .catch((error)=>{
    // Con then, capturamos el evento error y lo devolvemos
        return res.send({message:"No se pudo eliminar"})
    })
}

// Exportamos el método
module.exports = {
    obtenerElementos,
    crearElemento,
    actualizarElemento,
    verElemento,
    eliminarElemento,
}