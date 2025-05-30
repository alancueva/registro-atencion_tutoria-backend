import { MotivoController } from "../controllers/motivoControllers";
import { Router } from "express";

const router = Router();
const motivoController = new MotivoController();

router.get("/motivo_consultar/:idArea/:motivo", motivoController.getMotivos_Consultar.bind(motivoController));
router.get("/motivo_recuperar/:id_motivo", motivoController.getRecuperarMotivos.bind(motivoController));
router.get("/motivo_por_area/:idarea", motivoController.getMotivos_por_area.bind(motivoController));
router.post("/motivo_insert", motivoController.insert_motivo.bind(motivoController));
router.put("/motivo_update", motivoController.update_motivo.bind(motivoController));

export default router;