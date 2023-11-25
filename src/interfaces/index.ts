import { Schema } from 'mongoose';

export interface User {
  _id?: Schema.Types.ObjectId,
  name: string,
  username: string
  email: string,
  password: string,
  save: () => void,
}

export interface Inmueble {
  _id?: Schema.Types.ObjectId,
  nombre: string
  descripcion: string
  sanitarios: number
  habitaciones: number
  imagenes: any
}
