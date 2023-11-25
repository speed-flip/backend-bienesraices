import { Router } from 'express';

import { createUser, login } from '../controllers/userController';

const router = Router();

// Public requests
router.post('/signup', createUser);
router.post('/login', login);

// Private request

export default router;
