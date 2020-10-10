import { Router } from 'express';
import UsersController from './controllers/UsersController';

const router = Router();

// Controllers
const users_controller = new UsersController();

router.get('/users', users_controller.list);
router.post('/users', users_controller.create);
router.put('/users/:id', users_controller.update);

export default router;