/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';

import Inmueble from '../models/Inmueble';
import { MulterFile } from '../lib/multer';

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

export async function crearInmueble(req: Request, res: Response) {
  const files = req.files as MulterFile[];

  if (!files || files.length == 0) {
    res.status(404).json({
      msg: 'Faltan las imagenes',
    });
    return;
  }

  const imagenes: string[] = files.map((file: MulterFile) => `/public/img/${file.filename}`);
  const nuevoInmueble = { ...req.body, imagenes };

  try {
    const inmueble = new Inmueble(nuevoInmueble);
    const inmuebleSaved = await inmueble.save();
    res.status(200).json({
      inmueble: inmuebleSaved,
      msg: 'Inmueble creado correctamente',
      errorResponse: {
        error: false,
        code: 200,
        msg: '',
        details: '',
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errorResponse: {
        error: true,
        code: 400,
        msg: 'Se produjo un error',
        details: error.message,
      }
    });
  }


  res.status(200).json({
    msg: 'Creando inmueble',
    nuevoInmueble,
    errorResponse: {
      error: false,
      code: 200,
      msg: '',
      details: '',
    },
  });
}
