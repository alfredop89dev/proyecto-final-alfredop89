import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
//Importacion de middlewares para las rutas de productos
import { validateProduct, validateId, validateProductUpdate } from "../middlewares/products.middleware.js";

const router = Router();

//todos los productos
router.get("/products", getAllProducts);
//producto por ID
router.get("/products/:id", validateId, getProductById);
//agregar un producto
router.post("/products", validateProduct, addProduct);
//actualizar un producto
router.put("/products/:id", validateId, validateProductUpdate, updateProduct);
//eliminar un producto
router.delete("/products/:id", validateId, deleteProduct);

export default router;