import { Router } from "express";
import { ProgramaEstudioController } from "../controllers/programaEstudioControllers";

const router = Router();
const programaEstudioController = new ProgramaEstudioController();

router.get("/programaEstudio", programaEstudioController.getProgramasEstudio.bind(programaEstudioController));
router.get("/programaEstudio/todos", programaEstudioController.getProgramasEstudioTodos.bind(programaEstudioController));
router.get("/programaEstudio/:id", programaEstudioController.getProgramaEstudioById.bind(programaEstudioController));
router.post("/insertprogramaEstudio", programaEstudioController.insertProgramaEstudio.bind(programaEstudioController));
router.put("/updateprogramaEstudio", programaEstudioController.updateProgramaEstudio.bind(programaEstudioController));

export default router;