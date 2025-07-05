import { Router } from "express";
import { AtencionControlles } from "../controllers/atencionControllers";

const router = Router();
const atencionController = new AtencionControlles();

router.get("/atencion", atencionController.getAtenciones.bind(atencionController));

export default router;