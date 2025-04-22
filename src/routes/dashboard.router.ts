import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controllers";

const router = Router();
const dashboardController = new DashboardController();

router.get("/dashboard", dashboardController.getDashboardData.bind(dashboardController));
router.get("/dashboard/cantidad_sesiones", dashboardController.getDashboardCantidadSesiones.bind(dashboardController));
router.get("/dashboard/conteo_porcentaje_area", dashboardController.getDashboardConteoPorcentajeArea.bind(dashboardController));
router.get("/dashboard/docente_sesiones/:idusuario", dashboardController.getDashboardDocenteSesiones.bind(dashboardController));

export default router;