import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioControllers';

const router = Router();
const usuarioController = new UsuarioController();

router.get('/buscar_usuario/', usuarioController.searchUsers);
router.get('/recuperar_usuario/:idusuario', usuarioController.recuperarUsuario.bind(usuarioController));
router.post('/insert_usuario', usuarioController.createUser);
router.put('/actualizar_usuario', usuarioController.updateUser)
router.post('/verificar_actualizar_clave', usuarioController.verificarClave.bind(usuarioController));
router.put('/update_usuario_imagenPerfil', usuarioController.updateUserImage.bind(usuarioController));
router.post('/verificar_dni', usuarioController.verificarDNI.bind(usuarioController));

export default router;
