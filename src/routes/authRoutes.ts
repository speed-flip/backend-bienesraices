import { Router } from 'express';

import { createUser, login } from '../controllers/userController';

const router = Router();

router.post('/signup', createUser);
router.post('/login', login);

export default router;
