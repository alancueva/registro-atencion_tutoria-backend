import { Router } from "express";
import { AreaContorllers } from "../controllers/areaControllers";

const router = Router();
const areaController = new AreaContorllers();

router.get("/area", areaController.getAreas.bind(areaController));
router.get("/area_recuperar/:id_area", areaController.getRecuperarAreas.bind(areaController));
router.put("/area_update", areaController.update_area.bind(areaController));

export default router;