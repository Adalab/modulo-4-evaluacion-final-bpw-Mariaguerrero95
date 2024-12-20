const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());

//configurar el fichero para poder usar variables de entorno con la librería dotenv
require("dotenv").config();

//configurar el servidor para poder usar el motor de plantillas con la librería ejs
server.set("view engine", "ejs");


const port = 5001;
server.listen(port, () => {
    console.log(`Server is running. Go to http://localhost:${port}`);
})
