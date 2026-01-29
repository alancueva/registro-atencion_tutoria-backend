import Router, { NextFunction, Request, Response } from "express";
import { RegistroController } from "../controllers/registroControllers";
import { autenticar } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const registroController = new RegistroController();

router.post(
  "/getRegistrosBusquedaDocente",
  autenticar,
  asyncHandler(
    registroController.getRegistrosBusquedaDocente.bind(registroController),
  ),
);
router.get(
  "/getCantidad_de_registros_en_un_mes/:idusuario",
  autenticar,
  asyncHandler(
    registroController.getCantidad_de_registros_en_un_mes.bind(
      registroController,
    ),
  ),
);
router.post(
  "/getRegistrosBusquedaAdmin",
  autenticar,
  asyncHandler(
    registroController.getRegistrosBusquedaAdmin.bind(registroController),
  ),
);
router.post(
  "/insert",
  autenticar,
  asyncHandler(registroController.insertRegistro.bind(registroController)),
);
router.post(
  "/insertMultiple",
  autenticar,
  asyncHandler(
    registroController.insertMultipleRegistros.bind(registroController),
  ),
);

export default router;
