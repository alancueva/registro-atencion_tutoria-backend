import { Router } from "express";
import { TurnoControllers } from "../controllers/turnoControllers";

const router = Router();
const turnoController = new TurnoControllers();

router.get("/turno", turnoController.getTurnos.bind(turnoController));

export default router;

