import Router from 'express';
import { RegistroController } from '../controllers/registroControllers';

const router = Router();
const registroController = new RegistroController();

router.get('/getRegistrosBusquedaDocente', (req, res) => registroController.getRegistrosBusquedaDocente(req, res));
router.get('/getRegistrosBusquedaAdmin', (req, res) => registroController.getRegistrosBusquedaAdmin(req, res));
router.post('/insert', (req, res) => registroController.insertRegistro(req, res));
router.post('/insertMultiple', (req, res) => registroController.insertMultipleRegistros(req, res));

export default router;