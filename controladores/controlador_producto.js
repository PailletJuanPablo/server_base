//Importamos los modelos Mongoose para poder acceder a sus metodos
var Producto = require("../modelos/producto");

let listarProductos = (req, res) =>{
    //Ejecutaremos el metodo find para obtener todos los 
    Producto.find()
    // Esto ejecuta una promise, que podemos manejar con .then cuando es ejecutada con éxito, 
    //y con .catch cuando no lo es
    .then((productos)=>{
        return res.send(productos)
    })
}

let crearProducto = (req,res) =>{
    //Creamos una variable con la categoria desde el 
    Producto.create(req.body).then((productoCreado)=>{
        return res.send({mensaje:"Producto creado",detalles:productoCreado})
    })
    .catch((errorCreando)=>{
        return res.send({mensaje:"No se pudo crear",error:errorCreando})
    })
}

let actualizarProducto = (req,res) => {
    Producto.findByIdAndUpdate(req.params.id,req.body)
    .then((productoActualizado)=>{
        return res.send({mensaje:"Actualizado"})
    })
    .catch((err)=>{
        return res.send({mensaje:err})
    })
}

let verProducto = (req,res)=>{
    Producto.findById(req.params.id)
    .populate('categoria')
    .then((producto)=>{
        return res.send(producto)
    })
    .catch((err)=>{
        return res.send({message:"No se pudo encontrar el producto"})
    })
}

let eliminarProducto = (req,res)=>{
    Producto.findByIdAndRemove(req.params.id)
    .then((catBorrada)=>{
        return res.send({message:"El producto se eliminó correctamente"})
    })
    .catch((error)=>{
        return res.send({message:"No se pudo eliminar el producto"})
    })
}
// Exportamos el método
module.exports = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    verProducto,
    eliminarProducto
}