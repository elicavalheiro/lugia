import { Router } from 'express';
import AuthController from './controllers/AuthController';
import UsersController from './controllers/UsersController';

const router = Router();

// Controllers
const users_controller = new UsersController();
const auth_controller = new AuthController();


// Users routes
router.get('/users', users_controller.list);
router.get('/users/:id', users_controller.list);
router.post('/users', users_controller.create);
router.put('/users/:id', users_controller.update);
router.delete('/users/:id', users_controller.delete);

router.post('/authenticate', auth_controller.login);

export default router;