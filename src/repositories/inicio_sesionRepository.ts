import { Inicio_Sesion } from '../models/interface/inicio_sesion.interface';
import { CryptoUtil } from '../utils/CryptoUtil';
import pool from '../config/DatabaseConexion';

export class InicioSesionRepository {

    public async iniciarSesion(u_dni: string, u_clave: string): Promise<Inicio_Sesion | null> {
        try {
            // SELECT * FROM sp_inicio_sesion($1, $2)
            // CALL sp_inicio_sesion(?, ?) 
            const clave = await CryptoUtil.encrypt(u_clave);
            const [rows]: any = await pool.query('CALL sp_inicio_sesion(?, ?)', [u_dni, clave]);

            const result = rows[0][0];

            if (result) {
                const sesion: Inicio_Sesion = {
                    idusuario: result.idusuario,
                    dni: result.dni,
                    nombres: result.nombre,
                    ape_pat: result.ape_pat,
                    ape_mat: result.ape_mat,
                    usua_datos: result.usua_datos,
                    correo: result.correo,
                    clave: result.clave,
                    imagen: result.imagen ? result.imagen : null,
                    rol: result.rol,
                    estado_matricula: result.estado_matricula,
                    estado_sistema: result.estado_sistema,
                    periodo_academico: result.periodo_academico,
                    programa: result.programa,
                    turno: result.turno,
                    semestre: result.semestre,
                    vigencia: result.vigencia
                };
                return sesion;
            }
            return null;
        } catch (error) {
            console.error('Error inicio sesion: ', error);
            throw error;
        }
    }
}