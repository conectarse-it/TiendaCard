export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  comercio?: Comercio;
  created?: string;
  
}

export interface Usuario {
  avatar?: string;
  rol?: string;
  _id?: string;
  nombre?: string;
  apellido?: string;
  dni?: number;
  direccion?: string;
  telefono?: string;
  localidad?: string;
  provincia?: string;
  email?: string;
  password?: string;
  tipoTarjeta?: number;
  estadoTarjeta?: number;
  comercio?: string;
  altaFecha?: Date;
  
}

export interface Comercio {
  avatar?: string;
  _id?: string;
  razonSocial?: string;
  cuit?: number;
  direccion?: string;
  telefono?: string;
  localidad?: string;
  provincia?: string;
  email?: string;
  horario?: string;
  password?: string;
  descripcion?: string;
  
}