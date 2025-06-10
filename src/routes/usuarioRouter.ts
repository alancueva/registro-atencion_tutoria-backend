import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioControllers';
import upload from '../middlewares/upload.middleware';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/buscar_usuario', usuarioController.searchUsers.bind(usuarioController));
router.get('/recuperar_usuario/:idusuario', usuarioController.recuperarUsuario.bind(usuarioController));
router.post('/insert_usuario', usuarioController.createUser.bind(usuarioController));
router.put('/actualizar_usuario', usuarioController.updateUser.bind(usuarioController));
router.post('/verificar_actualizar_clave', usuarioController.verificarClave.bind(usuarioController));
router.post('/update_usuario_imagenPerfil', upload.single('imagen'), usuarioController.updateUserImage.bind(usuarioController));
router.post('/verificar_dni', usuarioController.verificarDNI.bind(usuarioController));
router.post('/actualizar_datos_usuario', usuarioController.actualizarDatosUsuario.bind(usuarioController));

export default router;
