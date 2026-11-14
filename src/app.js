import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
//Importación de rutas
import productsRouter from "./routes/products.route.js";
import authRouter from "./routes/auth.route.js";
//IMportacion de middlewares
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

//Configuración de variables de entorno-------------------------
dotenv.config();

//Configuración del servidor
const app = express();
app.use(bodyParser.json());
app.use(cors());

//ruta principal
app.get("/", (req, res) => {
    res.status(200).send("Entrega del proyecto final para la cursada de Backend con Node.js + Express");
});

// ruta de autenticación
app.use("/auth", authRouter);

//Rutas de la API
app.use("/api", productsRouter);

//Middlewares de errores
app.use(notFound);
app.use(errorHandler);

export default app;
