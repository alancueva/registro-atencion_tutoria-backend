export interface Registro {
  idtabla: number;
  nom_ape: string;
  idarea: number;
  area: string;
  motivo: string;
  osb: string;
  fecha: Date;
  idatencion: number;
  atencion: string;
  programa: string;
  turno: string;
  semestre: string;
  tutor: string;
  idusuario: number;
  periodo_academico: string;
  anio: string;
  vigencia: string;
  usuario_creacion: string;
  fecha_creacion: Date;
  usuario_modificacion: string;
  fecha_modificacion: Date;
  usuario_baja: string;
  fecha_baja: Date;
}

export interface TablaRegistro {
  idarea: number;
  area: string;
  motivo: string;
  osb: string;
  fecha: Date;
  idatencion: number;
  atencion: string;
  programa: string;
  turno: string;
  semestre: string;
  tutor: string;
  idusuario: number;
  alumnos: alumnos[];
  usuario_creacion: string;
}
export interface alumnos {
  dni: string;
  nombres: string;
}

export interface RegistroBusqueda {
  anio: number;
  mes: number;
  programa: string;
  area: string;
  atencion: string;
}

export interface RegistroBusquedaDocente extends RegistroBusqueda {
  id_usuario: number;
}

export interface RegistroResponse {
  number: number;
  nom_ape: string;
  area: string;
  motivo: string;
  osb: string;
  fecha: Date;
  atencion: string;
  programa: string;
  turno: string;
  semestre: string;
  tutor: string;
}

export interface cantidad_de_registros_en_un_mes {
  anio_actual: number;
  mes_numero: number;
  mes: string;
  cantidad_registros: number;
}
