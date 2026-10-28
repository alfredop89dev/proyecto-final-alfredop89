import * as productModel from "../models/products.model.js";


//Todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
};
//Producto por ID
export const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productModel.getProductById(id);
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: error.message });
    }
};
//Agregar un producto
export const addProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productModel.addProduct(product);
        res.status(201).send(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
};
//Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedProduct = req.body;
        const product = await productModel.updateProduct(id, updatedProduct);
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: error.message });
    }
};
//Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedProduct = await productModel.deleteProduct(id);
        res.status(200).send(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: error.message });
    }
};