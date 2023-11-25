import { Schema } from 'mongoose';

export interface User {
  _id?: Schema.Types.ObjectId,
  name: string,
  username: string
  email: string,
  password: string,
  save: () => void,
}
