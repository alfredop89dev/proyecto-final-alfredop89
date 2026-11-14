import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
//Importacion de middlewares para las rutas de productos
import { validateProduct, validateId, validateProductUpdate } from "../middlewares/products.middleware.js";
//middleware de autenticacion
import { authMiddleware, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

//todos los productos
router.get("/products", getAllProducts);
//producto por ID
router.get("/products/:id", validateId, getProductById);
//agregar un producto
router.post("/products/create", authMiddleware, requireRole('admin'), validateProduct, addProduct);
//actualizar un producto
router.put("/products/:id", authMiddleware, requireRole('admin'), validateId, validateProductUpdate, updateProduct);
//eliminar un producto
router.delete("/products/:id", authMiddleware, requireRole('admin'), validateId, deleteProduct);

export default router;