import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioControllers';
import upload from '../middlewares/upload.middleware';
import { autenticar } from "../middlewares/authMiddleware";
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/buscar_usuario', usuarioController.searchUsers.bind(usuarioController));
router.get('/recuperar_usuario/:idusuario', usuarioController.recuperarUsuario.bind(usuarioController));
router.post('/insert_usuario', usuarioController.createUser.bind(usuarioController));
router.put('/actualizar_usuario', usuarioController.updateUser.bind(usuarioController));
router.post('/verificar_dni', usuarioController.verificarDNI.bind(usuarioController));
router.post('/verificar_asignacion_tutores', usuarioController.verificar_asignacion_tutores.bind(usuarioController));

// Rutas protegidas que requieren autenticación
router.post('/actualizar_datos_usuario', autenticar, asyncHandler(usuarioController.actualizarDatosUsuario.bind(usuarioController)));
router.post('/verificar_actualizar_clave', autenticar, asyncHandler(usuarioController.verificarClave.bind(usuarioController)));
router.post('/update_usuario_imagenPerfil', autenticar, upload.single('imagen'), asyncHandler(usuarioController.updateUserImage.bind(usuarioController)));

export default router;
