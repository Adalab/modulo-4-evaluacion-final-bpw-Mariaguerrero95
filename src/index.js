const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");


// Crear servidor
const api = express();
require ("dotenv").config();

//configurar para peticiones externas
api.use(cors());
api.use(express.json());

// función para conectar a la DB

async function getDBConnection() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.PASSWORD_DB,
        database: "tshirts"  
    })
    connection.connect();
    return connection;
}

// escuchar el puerto

const port = 5001;
api.listen(port, () => {
    console.log(`Server is running. Go to http://localhost:${port}`);
})

// endpoints
// Insertar sign in para que el usuario pueda registrarse 
/*
    - recoger los datos del usuario que me envía frontend (body params)
    - conectar a la DB
    - añadir el nuevo usuario a mi base de datos (INSERT INTO)
    - finalizar la conexión de la DB
    - responder a frontend
*/
api.post("/user", async (req, res) => {
    try{
        const connection = await getDBConnection();
        const params = req.body;
        const userQuerySQL =
            "INSERT INTO user (user,name, email, password) VALUES(?,?,?, ?)";
        const [selectedUser] = await connection.query(userQuerySQL, [
            params.user,
            params.name,
            params.email,
            params.password
        ])
        connection.end();
        res.status(200).json({
            status: "success",
            message: "Sign in successfully",
            result: selectedUser
        });
    }
    catch (err) {
        console.error(err); 
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

//Ahora voy a leer los registros con SELECT
/*
    - conectar a la DB
    - consulta a la base de datos para obtener todas las recetas --> SELECT
    - cerrar la conexión
    - enviar respuesta a frontend
*/
api.get("/user", async (req,res) => {

    try{
        const connection = await getDBConnection();
        const params = req.query;
        const userQuerySQL =
            "SELECT * FROM user";
        const [selectedUser] = await connection.query(userQuerySQL, [
            params.user,
            params.name,
            params.email,
            params.password
        ])
        connection.end();
        res.status(200).json({
            status: "success",
            result: selectedUser
        });
    } 
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
}
});

// Ahora voy a actualizar los datos del resgistro ya creado (UPDATE)
/* Actualizar los valores de registro con la info que me envía frontend
- recoger los datos que me envía frontend:
    - id del usuario a actualizar 
    - los campos del usuario 
- conectar a la DB
- si no se actualiza ningún registro enviar un error (IF)
- finalizar conexión DB
- responder a frontend
*/
api.put("/user/:idUser", async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const newData = req.body;
        const connection = await getDBConnection();
        const userQuerySQL = "UPDATE users SET  user = ?, name = ?, email = ?, password = ? WHERE  idUser = ?";
        const [result] = await connection.query(userQuerySQL, [
            newData.user,
            newData.name,
            newData.email,
            newData.password,
            idUser
        ]);

        // Si no se actualizó ningún registro, enviar un error

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failure",
                message: `User with id ${idUser} not found.`
            });
        }
        connection.end();
        res.status(200).json({
            status: "success",
            message: "User updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});



// Ahora voy a hacer DELETE de un registro

api.delete("/user/:idUser", async (req, res) => {
    const params = req.params.idUser;
    const connection = await getDBConnection();
    const sql = "DELETE from user WHERE idUser = ?";
    const [userResult] = await connection.query(sql, [params]);

    connection.end();

    res.status(200).json({
        status: "success",
        message: `User with id ${params} deleted succesfully`
    });
})




