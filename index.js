import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//Importación de rutas
import productsRouter from "./src/routes/products.route.js";
//IMportacion de middlewares
import { notFound } from "./src/middlewares/notFound.middleware.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";

//Configuración de variables de entorno-------------------------
dotenv.config();

//Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());


//ruta principal
app.get("/", (req, res) => {
    res.status(200).send({ message: "Entrega del proyecto final para la cursada de Backend con Node.js + Express" });
});
//Rutas de la API
app.use("/api", productsRouter);

//Middlewares de errores
app.use(notFound);
app.use(errorHandler);

//Iniciar el servidor------------------------------------------
const PORT = process.env.BACKEND_URL ? new URL(process.env.BACKEND_URL).port : 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT} ✅`);
});