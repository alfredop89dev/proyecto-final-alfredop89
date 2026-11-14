//Middleware para validacion de productos

const isPresent = (v) => v !== undefined && v !== null;

export const validateProduct = (req, res, next) => {
    const { name, description, price, category, stock, image } = req.body ?? {};
    const fields = { name, description, price, category, stock, image };

    if (Object.values(fields).some((v) => !isPresent(v))) {
        return res.status(400).send({ error: "Faltan campos requeridos" });
    }
    if ([name, description, category, image].some((v) => typeof v !== "string")) {
        return res.status(400).send({ error: "Los campos name, description, category e image deben ser de tipo string" });
    }
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
        return res.status(400).send({ error: "El campo price debe ser un número válido mayor o igual a 0" });
    }
    if (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
        return res.status(400).send({ error: "El campo stock debe ser un entero mayor o igual a 0" });
    }
    if ([name, description, category, image].some((v) => v.trim() === "")) {
        return res.status(400).send({ error: "Los campos name, description, category e image no pueden estar vacíos" });
    }
    next();
};

export const validateId = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: "Falta el parámetro id" });
    }
    next();
};

export const validateProductUpdate = (req, res, next) => {
    const { name, description, price, category, stock, image } = req.body ?? {};
    const fields = { name, description, price, category, stock, image };

    if (!Object.values(fields).some(isPresent)) {
        return res.status(400).send({ error: "Debe enviar al menos un campo para actualizar" });
    }
    if (["name", "description", "category", "image"].some((k) => isPresent(fields[k]) && (typeof fields[k] !== "string" || fields[k].trim() === ""))) {
        return res.status(400).send({ error: "Los campos name, description, category e image deben ser de tipo string y no estar vacíos" });
    }
    if (isPresent(price) && (typeof price !== "number" || !Number.isFinite(price) || price < 0)) {
        return res.status(400).send({ error: "El campo price debe ser un número válido mayor o igual a 0" });
    }
    if (isPresent(stock) && (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0)) {
        return res.status(400).send({ error: "El campo stock debe ser un entero mayor o igual a 0" });
    }
    next();
};