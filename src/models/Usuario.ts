import { Schema, model } from 'mongoose';

import { User } from '../interfaces/index';

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  favorites: {
    type: Array,
    default: [],
  }
}, {
  timestamps: true,
  versionKey: false,
});

const Usuario = model<User>('usuarios', userSchema);

export default Usuario;
