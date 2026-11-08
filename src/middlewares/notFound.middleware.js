//Middlewares de errores 404

export const notFound = (req, res, next) => {
    res.status(404).send({ error: "Ruta no encontrada" });
};
