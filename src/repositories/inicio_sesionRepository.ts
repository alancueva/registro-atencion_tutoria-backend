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

            const result = rows[0];
            if (result && result.length > 0) {
                const sesion: Inicio_Sesion = {
                    idusuario: result[0].idusuario,
                    dni: result[0].dni,
                    nombres: result[0].nombre,
                    ape_pat: result[0].ape_pat,
                    ape_mat: result[0].ape_mat,
                    usua_datos: result[0].usua_datos,
                    correo: result[0].correo,
                    clave: result[0].clave,
                    imagen: result[0].imagen ? result[0].imagen : null,
                    rol: result[0].rol,
                    programa: result[0].programa,
                    turno: result[0].turno,
                    semestre: result[0].semestre,
                    vigencia: result[0].vigencia
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