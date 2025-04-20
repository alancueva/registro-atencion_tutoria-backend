import { Router } from 'express';
import { UserController } from '../controllers/usuarioControllers';

const router = Router();
const userController = new UserController();

router.get('/search', userController.searchUsers);
router.post('/create', userController.createUser);
router.put('/update:id', userController.updateUser)

export default router;
