// Importamos Express usando ES Modules
import express from "express";

// Creamos la instancia de la aplicación Express
const app = express();

// Definimos el puerto en una constante para facilitar su configuración
const PORT = 3000;

// Definimos el endpoint raíz con una arrow function
app.get("/", (req, res) => {
 res.send("Hola Express");
});

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
 console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
