export interface IUsuario {
  idusuario?: number;
  idrol_usuario: number;
  dni: string;
  nombres: string;
  ape_pat: string
  ape_mat: string
  correo?: string;
  clave: string;
  es_docente?: 'SI' | 'NO';
  es_tutor?: 'SI' | 'NO';
  imagen?: Buffer | null;
  vigencia?: 'SI' | 'NO';
  idProgramaDeEstudio: number;
  programa: number;
  idTurno: number;
  turno: number;
  idsemestre: number;
  descripcion: number;
  usuario_creacion?: string;
  fecha_creacion?: Date;
  usuario_modificacion?: string;
  fecha_modificacion?: Date;
  usuario_baja?: string;
  fecha_baja?: Date;
}

export interface User {
  idusuario: number;
  idrol_usuario: number;
  rol: string;
  dni: string;
  nombres: string;
  ape_pat: string;
  ape_mat: string;
  correo: string;
  es_docente: string;
  es_tutor: string;
  vigencia: number;
}

export interface UserQueryParams {
  dni?: string;
  nombre?: string;
  ape_pat?: string;
  ape_mat?: string;
  es_docente?: string;
  es_tutor?: string;
}

export interface CreateUserDto {
  idrol_usuario: number;
  dni: string;
  nombre: string;
  ape_pat: string;
  ape_mat: string;
  correo: string;
  clave: string;
  es_docente: string;
  es_tutor: string;
  idTurno: number;
  idProgramaDeEstudio: number;
  idsemestre: number;
  imagen?: Buffer | null;
  usuario_creacion: string;
}

export interface UpdateUserDto extends CreateUserDto {
  idusuario: number;
  vigencia: string;
}

export interface usuario_datos {
  idusuario: number;
  dni: string;
  nombres: string;
  ape_pat: string;
  ape_mat: string;
  usua_datos: string;
  correo: string;
}

export interface usuario_datos_dto extends usuario_datos {
  usuario_modificacion: string;
}