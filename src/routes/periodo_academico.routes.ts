import { PeriodoAcademicoController } from "../controllers/periodo_academico.controllers";
import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware";
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const periodoAcademicoController = new PeriodoAcademicoController();

router.get("/get", autenticar, asyncHandler(periodoAcademicoController.getPeriodoAcademico.bind(periodoAcademicoController)));
router.put("/updateperiodoAcademico", autenticar, asyncHandler(periodoAcademicoController.updatePeriodoAcademico.bind(periodoAcademicoController)));

export default router;