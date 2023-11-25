import jwt from 'jsonwebtoken';
import config from '../environment';

function generateJWT(id: string) {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '1d',
  });
}

export default generateJWT;
