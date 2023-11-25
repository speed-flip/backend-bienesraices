import { Router } from 'express';
import upload from '../lib/multer';

import { crearInmueble, getInmuebles, getInmuebleById } from '../controllers/inmuebleController';
import checkIsAdmin from '../middlewares/checkIsAdmin';

const router = Router();

router.get('/', getInmuebles);
router.get('/:id', getInmuebleById);
router.post('/', checkIsAdmin, upload.array('imagenes', 3), crearInmueble);

export default router;
