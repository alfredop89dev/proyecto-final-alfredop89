//Middleware para manejo de errores
export const errorHandler = (err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).send({ error: "JSON incorrecto o inválido" });
    }

    const status = err.status || err.statusCode || 500;

    if (status >= 500) {
        console.error(err.stack);
        return res.status(500).send({ error: "Error interno del servidor" });
    }

    res.status(status).send({ error: err.message || "Error en la solicitud" });
};