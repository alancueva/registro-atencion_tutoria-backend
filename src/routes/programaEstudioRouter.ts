import { Router } from "express";
import { ProgramaEstudioController } from "../controllers/programaEstudioControllers";

const router = Router();
const programaEstudioController = new ProgramaEstudioController();

router.get("/programaEstudio", programaEstudioController.getAllProgramasEstudio.bind(programaEstudioController));

export default router;