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
  res.header("Access-Control-Allow-Origin", "*");
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
// let direccionBaseDatos = 'mongodb://localhost:27017/nombre_base';
// Si están en su entorno local, la variable sería algo así
// En este caso nos conectaremos a una base remota
let direccionBaseDatos = "mongodb://curso:curso1234@ds149672.mlab.com:49672/curso_mm"; 


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


// Importamos y utilizamos las rutas
var rutas_base= require("./rutas/rutas_base");
app.use('/elementos',rutas_base);
