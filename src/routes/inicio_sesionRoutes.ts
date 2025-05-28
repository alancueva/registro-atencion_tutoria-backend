import { Router } from "express";
import { InicioSesionController } from "../controllers/inicio_sesionControllers";

const router = Router();
const inicioSesionController = new InicioSesionController();

router.post("/", inicioSesionController.iniciarSesion.bind(inicioSesionController));

export default router;