import { Router } from "express";
import { InicioSesionController } from "../controllers/inicio_sesionControllers";
import { loginLimiter } from "../middlewares/rateLimiter"; 

const router = Router();
const inicioSesionController = new InicioSesionController();

router.post("/", loginLimiter, inicioSesionController.iniciarSesion.bind(inicioSesionController));

export default router;