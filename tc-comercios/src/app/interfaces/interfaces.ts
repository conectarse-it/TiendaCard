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