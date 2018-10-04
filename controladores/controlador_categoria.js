//Importamos los modelos Mongoose para poder acceder a sus metodos
var Categoria = require("../modelos/categoria");
var Producto = require("../modelos/producto");

let listarCategorias = (req, res) =>{
    //Ejecutaremos el metodo find para obtener todos los 
    Categoria.find()
    // Esto ejecuta una promise, que podemos manejar con .then cuando es ejecutada con éxito, 
    //y con .catch cuando no lo es
    .then((categorias)=>{
        return res.send(categorias)
    })
}

let crearCategoria = (req,res) =>{
    //Creamos una variable con la categoria desde el 
    Categoria.create(req.body).then((categoriaCreada)=>{
        return res.send({mensaje:"Categoria creada",detalles:categoriaCreada})
    })
    .catch((errorCreando)=>{
        return res.send({mensaje:"No se pudo crear",error:errorCreando})
    })
}

let actualizarCategoria = (req,res) => {
    Categoria.findByIdAndUpdate(req.params.id,req.body)
    .then((categoriaActualizada)=>{
        return res.send({mensaje:"Actualizada"})
    })
    .catch((err)=>{
        return res.send({mensaje:err})
    })
}

let verCategoria = (req,res)=>{
    Categoria.findById(req.params.id)
    .then((categoria)=>{
        return res.send(categoria)
    })
    .catch((err)=>{
        return res.send({message:"No se pudo encontrar la categoria"})
    })
}

let eliminarCategoria = (req,res)=>{
    Categoria.findByIdAndRemove(req.params.id)
    .then((catBorrada)=>{
        return res.send({message:"La categoría se eliminó correctamente"})
    })
    .catch((error)=>{
        return res.send({message:"No se pudo eliminar la categoría"})
    })
}

let verPorCategoria = (req,res)=>{
    let categoria = Categoria.findById(req.params.id);
    let productosDeCategoria = Producto.find({categoria:req.params.id});
    categoria.then(
        (categoria)=>{
            productosDeCategoria.then((productos)=>{
                res.send({categoria,productos})
            })
        }
    )
}
// Exportamos el método
module.exports = {
    listarCategorias,
    crearCategoria,
    actualizarCategoria,
    verCategoria,
    eliminarCategoria,
    verPorCategoria
}