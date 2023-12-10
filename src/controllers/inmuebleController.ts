/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';

import Inmueble from '../models/Inmueble';
import { Inmueble as InmuebleI } from '../interfaces';

// interface MulterRequest extends Request {
//   files: any; // o usa el tipo correcto proporcionado por Multer
// }

export async function getInmuebles(req: Request, res: Response) {
  let inmuebles: InmuebleI[] = [];

  if (req.query.tipo) {
    inmuebles = await Inmueble.find().where('tipo').equals(req.query.tipo);
  } else {
    inmuebles = await Inmueble.find();
  }
  res.status(200).json({
    msg: 'Consulta exitosa',
    total_registros: inmuebles.length,
    inmuebles,
    params: req.query,
    errorResponse: {
      error: false,
      code: 200,
      msg: '',
      details: '',
    },
  });
}

export async function getInmuebleById(req: Request, res: Response) {
  const inmuebles = await Inmueble.findById(req.params.id);

  if (!inmuebles) {
    res.status(404).json({
      errorResponse: {
        error: true,
        code: 404,
        msg: 'El inmueble no fue encontrado',
        details: '',
      },
    });
  }

  res.status(200).json({
    msg: 'Consulta exitosa',
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
  const files = req.files as Express.Multer.File[];

  if (!req.files || req.files.length == 0) {
    res.json({
      msg: 'Faltan las imagenes',
    });
    return;
  }

  console.log(req.files);

  const imagenes: string[] = files.map((file: any) => `/img/${file.filename}`);
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

export async function searchInmueble(req: Request, res: Response) {
  const { q } = req.query;
  const inmuebles = await Inmueble.find({ nombre: { $regex: q, $options: 'i' } });
  res.status(200).json({
    msg: 'Consulta exitosa',
    total_registros: inmuebles.length,
    inmuebles,
  });
}
