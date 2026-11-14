import app from "./src/app.js";

//Iniciar el servidor------------------------------------------
const PORT = process.env.BACKEND_URL ? new URL(process.env.BACKEND_URL).port : 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT} ✅`);
});
