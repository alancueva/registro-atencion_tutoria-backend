import Router from 'express';
import { RegistroController } from '../controllers/registroControllers';

const router = Router();
const registroController = new RegistroController();

router.post('/getRegistrosBusquedaDocente', registroController.getRegistrosBusquedaDocente.bind(registroController));
router.post('/getRegistrosBusquedaAdmin', registroController.getRegistrosBusquedaAdmin.bind(registroController));
router.post('/insert', registroController.insertRegistro.bind(registroController));
router.post('/insertMultiple', registroController.insertMultipleRegistros.bind(registroController));

export default router;