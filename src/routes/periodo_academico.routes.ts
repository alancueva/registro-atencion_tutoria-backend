import { PeriodoAcademicoController } from "../controllers/periodo_academico.controllers";
import { Router } from "express";

const router = Router();
const periodoAcademicoController = new PeriodoAcademicoController();

router.get("/get", periodoAcademicoController.getPeriodoAcademico.bind(periodoAcademicoController));
router.put("/updateperiodoAcademico", periodoAcademicoController.updatePeriodoAcademico.bind(periodoAcademicoController));

export default router;