import { Router } from "express";
import { SemestreController } from "../controllers/semestreControllers";

const router = Router();
const semestreController = new SemestreController();

router.get("/semestre", semestreController.getSemestres.bind(semestreController));

export default router;
