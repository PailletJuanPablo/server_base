// Importamos express
var express = require("express");
// Importamos body-parser, una extensión que nos permitirá recibir campos de una request del tipo POST
var bodyParser = require("body-parser");
// Inicializamos express en otra variable
var app = express();
//Cargamos el módulo de mongoose
let mongoose = require("mongoose");
// Decimos que utilizaremos bodyparser. Esto permite recibir peticiones POST con un cuerpo (EJ: un formulario)
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

// Configuramos cabeceras HTTP
// Esto permitirá recibir peticiones de cualquier origen (nos servirá cuando utilicemos Angular)
app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE");
  res.header("Allow", "GET, POST, PUT,DELETE");
  next();
});

//Configuramos el puerto que tendrá nuestro servidor
let puerto = 1234;

// Especificamos la base hacia donde nos conectaremos
let direccionBaseDatos =
  "mongodb://curso:curso1234@ds149672.mlab.com:49672/curso_mm"; 

// Ejecutamos el método connect de la variable que contiene a Mongoose
mongoose.connect(
  direccionBaseDatos,
  { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log(
        "Se realizó la correción a la base de datos" + direccionBaseDatos
      );
      //Empezamos a escuchar el puerto
      app.listen(process.env.PORT || puerto, () => {
        console.log("Servidor corriendo en puerto: " + puerto);
      });
    }
  }
);

//Importamos el controlador
let catController = require('./controladores/controlador_categoria');
let prodController = require('./controladores/controlador_producto');
//Rutas de categorías
app.get('/categorias',catController.listarCategorias);
app.post('/categorias',catController.crearCategoria);
app.get('/categorias/:id',catController.verCategoria);
app.post('/categorias/:id',catController.actualizarCategoria);
app.post('/categorias/eliminar/:id',catController.eliminarCategoria);
app.get('/ver-por-categoria/:id',catController.verPorCategoria);

//Rutas de Productos
app.get('/productos',prodController.listarProductos);
app.post('/productos',prodController.crearProducto);
app.get('/productos/:id',prodController.verProducto);
