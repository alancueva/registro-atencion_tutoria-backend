export interface Inicio_Sesion {
    idusuario: number;
    dni: string;
    nombres: string;
    ape_pat: string;
    ape_mat: string;
    usua_datos: string;
    correo: string;
    clave: string;
    imagen?: Buffer | null | File ;
    rol: string;
    programa: string;
    turno: string;
    semestre: string;
    vigencia: string;
}