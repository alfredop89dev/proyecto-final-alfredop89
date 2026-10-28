import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

const router = Router();

//todos los productos
router.get("/products", getAllProducts);
//producto por ID
router.get("/products/:id", getProductById);
//agregar un producto
router.post("/products", addProduct);
//actualizar un producto
router.put("/products/:id", updateProduct);
//eliminar un producto
router.delete("/products/:id", deleteProduct);

export default router;