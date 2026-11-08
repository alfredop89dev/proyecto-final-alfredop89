import * as productModel from "../models/products.model.js";


//Todos los productos
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        next(error);
    }
};
//Producto por ID
export const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productModel.getProductById(id);
        res.status(200).send(product);
    } catch (error) {
        next(error);
    }
};
//Agregar un producto
export const addProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const name = product.name.trim();
        const category = product.category.trim();

        const existing = await productModel.findByNameAndCategory(name, category);
        if (existing) {
            return res.status(409).send({ error: "Ya existe un producto con ese nombre en esa categoría" });
        }

        const newProduct = await productModel.addProduct({ ...product, name, category });
        res.status(201).send({ message: "Producto agregado correctamente", product: newProduct });
    } catch (error) {
        next(error);
    }
};
//Actualizar un producto
export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedProduct = { ...req.body };

        const current = await productModel.getProductById(id);
        const name = updatedProduct.name !== undefined ? updatedProduct.name.trim() : current.name;
        const category = updatedProduct.category !== undefined ? updatedProduct.category.trim() : current.category;

        const existing = await productModel.findByNameAndCategory(name, category);
        if (existing && existing.id !== id) {
            return res.status(409).send({ error: "Ya existe un producto con ese nombre en esa categoría" });
        }

        if (updatedProduct.name !== undefined) updatedProduct.name = name;
        if (updatedProduct.category !== undefined) updatedProduct.category = category;

        const product = await productModel.updateProduct(id, updatedProduct);
        res.status(200).send({ message: "Producto actualizado correctamente", product });
    } catch (error) {
        next(error);
    }
};
//Eliminar un producto
export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProduct = await productModel.deleteProduct(id);
        res.status(200).send({ message: "Producto eliminado correctamente", product: deletedProduct });
    } catch (error) {
        next(error);
    }
};