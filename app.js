
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();

app.set("view engine", "ejs");

//Capture body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("public"));

//Connect mongoose with MongoDB and search / creates database
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});


//Import routes
const authRoute = require("./routes/auth");
const tokenValidation = require("./routes/validate-token");
const index = require("./routes/index");

//Middleware
app.use("/api/user", authRoute);
app.use("/api/index", tokenValidation, index);

//Start server
app.listen(3000, function(){
    console.log("server running on port 3000");
})


/*

Hola equipo de Pack&pack, antes que nada les agradezco el interés que tienen en mi,
antes que nada me quiero disculpar con ustedes debido a que mi prueba técnica no está al 100%,
debido a causas laborales y personales no le he podido dedicar el tiempo que me hubiera gustado para 
poder haberla terminado, ya que hubo puntos en la prueba que nunca había hecho y consumieron bastante de mi poco
tiempo disponible, pero estoy seguro que con un poco más de tiempo y mentoría de algún desarrollador más 
experimentado se puede lograr esto y más.

Espero que a pesar de los inconvenientes presentados en este proyecto pueda demostrarles mis habilidades y espero
que ustedes puedan encontrarme un espacio en su equipo!

Sin más por el momento, muchas gracias por la oportunidad y su interés, espero escuchar de ustedes pronto

JMSC

*/