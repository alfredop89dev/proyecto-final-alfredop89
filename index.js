import express from "express";
import dotenv from "dotenv";
//Importación de rutas
import productsRouter from "./src/routes/products.route.js";


//Configuración de variables de entorno
dotenv.config();

//Configuración del servidor
const app = express();
app.use(express.json());

//ruta principal
app.get("/", (req, res) => {
    res.status(200).send({ message: "Entrega del proyecto final para la cursada de Backend con Node.js + Express" });
});
//Rutas de la API
app.use("/api", productsRouter);


//Middlewares de error 404 y 500
app.use((req, res, next) => {
    res.status(404).send({ error: "Ruta no encontrada" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Error interno del servidor" });
});

//Iniciar el servidor
const PORT = process.env.BACKEND_URL ? new URL(process.env.BACKEND_URL).port : 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT} ✅`);
});