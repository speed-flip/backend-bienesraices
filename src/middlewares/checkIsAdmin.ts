/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

async function checkIsAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(404).json({
      errorResponse: {
        error: true,
        code: 404,
        msg: 'Identificador de sesión de administrador no encontrado',
        details: '',
      },
    });
    return;
  }

  if (req.user?.email == 'victor@torres.com') {
    return next();
  } else {
    res.status(401).json({
      errorResponse: {
        error: true,
        code: 401,
        msg: 'Acción no valida',
        details: 'No tiene permisos para ejecutar esta acción',
      },
    });
  }

}

export default checkIsAdmin;
