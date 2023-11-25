import { User } from '../../interfaces/index';

export { };

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
