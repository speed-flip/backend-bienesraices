import { Response, Request } from 'express';
import Inmueble from '../models/Inmueble';

export async function getInmuebles(req: Request, res: Response) {
  const inmuebles = await Inmueble.find();
  res.status(200).json({
    msg: 'Consulta exitosa',
    total_registros: inmuebles.length,
    inmuebles,
    errorResponse: {
      error: false,
      code: 200,
      msg: '',
      details: '',
    },
  });
}
