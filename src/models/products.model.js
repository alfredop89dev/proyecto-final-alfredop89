import { products } from "../data/products.js";



//Todos los productos
export const getAllProducts = () => {
    return products;
}
//Producto por ID
export const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    if (!product) {
        throw new Error("Producto no encontrado");
    }
    return product;
}
//Agregar un producto
export const addProduct = (product) => {
    const newProduct = {
        id: products.length + 1,
        ...product,
    };
    products.push(newProduct);
    return newProduct;
}
//Actualizar un producto
export const updateProduct = (id, updatedProduct) => {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        throw new Error("Producto no encontrado");
    }
    products[index] = { ...products[index], ...updatedProduct };
    return products[index];
}
//Eliminar un producto
export const deleteProduct = (id) => {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        throw new Error("Producto no encontrado");
    }
    const deletedProduct = products.splice(index, 1);
    return deletedProduct[0];
}   