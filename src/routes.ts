import { Router } from 'express';
import UsersController from './controllers/UsersController';

const router = Router();

// Controllers
const users_controller = new UsersController();

router.post('/users', users_controller.create);

export default router;