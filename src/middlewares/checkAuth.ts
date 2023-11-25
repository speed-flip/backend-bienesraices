/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../environment';
import { User } from '../interfaces/index';
import Usuario from '../models/Usuario';

interface IDecoded {
  id: string,
  iat: number,
  exp: number,
}

async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as IDecoded;
      req.user = await Usuario.findById(decoded.id) as User;

      return next();
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        errorResponse: {
          error: true,
          code: 500,
          msg: 'Se produjo un error',
          details: error.message,
        },
      });
    }
  }

  if (!token) {
    res.status(404).json({
      errorResponse: {
        error: true,
        code: 404,
        msg: 'Identificador de sesión no encontrado',
        details: '',
      },
    });
    return;
  }
}

export default checkAuth;
