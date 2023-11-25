import { Schema, model } from 'mongoose';

import { Inmueble } from '../interfaces/index';

const inmuebleSchema = new Schema<Inmueble>({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  sanitarios: {
    type: Number,
    required: true,
  },
  habitaciones: {
    type: Number,
    required: true,
  },
  imagenes: {
    type: Array<string>,
    default: ['/img'],
  }
}, {
  timestamps: true,
  versionKey: false,
});

const Inmueble = model<Inmueble>('inmuebles', inmuebleSchema);

export default Inmueble;
