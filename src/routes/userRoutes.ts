import { Router } from 'express';

import { addFavorite, createUser, login } from '../controllers/userController';
import checkAuth from '../middlewares/checkAuth';

const router = Router();

// Public requests
router.post('/signup', createUser);
router.post('/login', login);

// Private request
router.put('/add-favorite/:inmuebleId', checkAuth, addFavorite);

export default router;
