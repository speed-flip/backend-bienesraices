/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import Usuario from '../models/Usuario';
import generateJWT from '../helpers/generateJWT';
import Inmueble from '../models/Inmueble';

export async function createUser(req: Request, res: Response) {
  // Avoid duplicate users
  const { email } = req.body;
  const userFound = await Usuario.findOne({ email });

  if (userFound) {
    res.status(400).json({
      errorResponse: {
        error: true,
        code: 400,
        msg: 'Este email ya esta registrado en BienesRaices',
        details: 'Intente recuperar su contraseña si olvidó sus credenciales',
      }
    });
    return;
  }

  try {
    const user = new Usuario(req.body);
    const userSaved = await user.save();
    res.status(200).json({
      usuario: userSaved,
      msg: 'Cuenta creada correctamente',
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
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (usuario === null) {
    res.status(400).json({
      errorResponse: {
        error: true,
        code: 400,
        msg: 'Este email no esta registrado en BienesRaices',
        details: 'Cree una cuenta para acceder',
      }
    });
    return;
  }

  if (password == usuario.password) {
    res.status(200).json({
      usuario,
      msg: 'Inicio de sesión exitoso',
      token: generateJWT(usuario.id),
      errorResponse: {
        error: false,
        code: 200,
        msg: '',
        details: '',
      },
    });
  } else {
    res.status(400).json({
      errorResponse: {
        error: true,
        code: 400,
        msg: 'La contraseña ingresada no es correcta',
        details: '',
      }
    });
  }
}

export async function addFavorite(req: Request, res: Response) {
  console.log(req.params.inmuebleId);
  const casa = await Inmueble.findById(req.params.inmuebleId);

  if (!casa) {
    res.status(400).json({
      errorResponse: {
        error: true,
        code: 400,
        msg: 'Este inmueble no existe',
        details: '',
      }
    });
    return;
  }

  try {
    const userFound = await Usuario.findById(req.user?._id);
    if (!userFound) {
      res.status(400).json({
        errorResponse: {
          error: true,
          code: 400,
          msg: 'El usuario no esta registrado',
          details: '',
        }
      });
    }

    await Usuario.findByIdAndUpdate(req.user?._id, {
      favorites: [...userFound!.favorites, casa],
    });

    res.status(200).json({
      msg: 'Inmueble añadido a favoritos',
      errorResponse: {
        error: false,
        code: 200,
        msg: '',
        details: '',
      }
    });

  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      errorResponse: {
        error: true,
        code: 400,
        msg: 'Se produjo un error en el servidor',
        details: error.message,
      }
    });
  }
}

export async function getFavorites(req: Request, res: Response) {
  const user = await Usuario.findById(req.user?._id);
  if (!user) {
    res.status(400).json({
      errorResponse: {
        error: false,
        code: 400,
        msg: 'Usuario no encontrado',
        details: '',
      }
    });
    return;
  }

  res.status(200).json({
    msg: 'Consulta exitosa',
    favorites: user.favorites,
    total_registros: user.favorites.length,
    errorResponse: {
      error: false,
      code: 200,
      msg: '',
      details: '',
    }
  });

}
