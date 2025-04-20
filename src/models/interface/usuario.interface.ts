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
    programa : number;
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