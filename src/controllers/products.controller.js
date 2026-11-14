import * as ProductService from "../services/products.service.js";

//Todos los productos
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductService.getAllProducts();
        return res.status(200).send(products);
    }
    catch (error) {
        next(error);
    }
};
//Producto por ID
export const getProductById = async (req, res, next) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        next(error);
    }
};
// Agregar un producto
export const addProduct = async (req, res, next) => {
    try {
        const product = await ProductService.addProduct(req.body);
        res.status(201).send({ message: 'Producto agregado correctamente', product });
    } catch (error) {
        next(error);
    }
};
// Actualizar un producto
export const updateProduct = async (req, res, next) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        res.status(200).send({ message: 'Producto actualizado correctamente', product });
    } catch (error) {
        next(error);
    }
};
// Eliminar un producto
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await ProductService.deleteProduct(req.params.id);
        res.status(200).send({ message: 'Producto eliminado correctamente', product });
    } catch (error) {
        next(error);
    }
};