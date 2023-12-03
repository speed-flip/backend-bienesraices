import { Router } from 'express';
import upload from '../lib/multer';

import { crearInmueble, getInmuebles, getInmuebleById, searchInmueble } from '../controllers/inmuebleController';
import checkIsAdmin from '../middlewares/checkIsAdmin';
import checkAuth from '../middlewares/checkAuth';

const router = Router();

router.get('/', checkAuth, getInmuebles);
router.post('/', checkAuth, checkIsAdmin, upload.array('imagenes', 3), crearInmueble);
router.get('/search', checkAuth, searchInmueble);

router.get('/:id', checkAuth, getInmuebleById);

export default router;
