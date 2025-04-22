import { Router } from "express";
import { InicioSesionController } from "../controllers/inicio_sesionControllers";

const router = Router();
const inicioSesionController = new InicioSesionController();

router.get("/inicio_sesion/:dni/:contrasena", (req, res) => {
    req.body = {
        dni: req.params.dni,
        contrasena: req.params.contrasena
    };
    inicioSesionController.iniciarSesion(req, res);
});

export default router;