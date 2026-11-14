import { Router } from "express";
import { loginController } from "../controllers/auth.controller.js";

const router = Router();

// Ruta de inicio de sesión
router.post("/login", loginController);

export default router;