export interface Alumno {
    idalumnos: number;
    dni: string;
    nombres: string;
    apellidos: string;
    idProgramaDeEstudio: number;
    programa: string;
    idTurno: number;
    turno: string;
    idsemestre: number;
    semestre: string;
    periodo_academico: string;
    anio: string;
    vigencia: string;
}

export interface AlumnoConsulta {
    dni: string;
    nombres: string;
    apellidos: string;
    programa: string;
    turno: string;
    semestre: string;
    periodo_academico: string;
    anio: string;
}