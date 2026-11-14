import * as ProductModel from '../models/products.model.js';

const httpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

//Todos los productos
export const getAllProducts = () => ProductModel.getAllProducts();
//Producto por ID
export const getProductById = (id) => ProductModel.getProductById(id);
//Agregar un producto
export const addProduct = async (product) => {
    const name = product.name.trim();
    const category = product.category.trim();

    const existing = await ProductModel.findByNameAndCategory(name, category);
    if (existing) {
        throw httpError(409, "Ya existe un producto con ese nombre en esa categoría");
    }

    return ProductModel.addProduct({ ...product, name, category });

};
//Actualizar un producto
export const updateProduct = async (id, changes) => {
    const updatedProduct = { ...changes }
    const current = await ProductModel.getProductById(id);
    const name = updatedProduct.name !== undefined ? updatedProduct.name.trim() : current.name;
    const category = updatedProduct.category !== undefined ? updatedProduct.category.trim() : current.category;
    const existing = await ProductModel.findByNameAndCategory(name, category);
    if (existing && existing.id !== id) {
        throw httpError(409, "Ya existe un producto con ese nombre en esa categoría");
    }
    if (updatedProduct.name !== undefined) updatedProduct.name = name;
    if (updatedProduct.category !== undefined) updatedProduct.category = category;

    return ProductModel.updateProduct(id, updatedProduct);
};
//Eliminar un producto
export const deleteProduct = (id) => ProductModel.deleteProduct(id);