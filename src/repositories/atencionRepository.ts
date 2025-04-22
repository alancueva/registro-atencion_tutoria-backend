import pool from '../config/DatabaseConexion'; 
import { Atencion } from "../models/interface/atencion.interface"; 

export class AtencionRepository{

    /**
     * Obtiene todas las atenciones
     * @returns {Promise<Atencion[]>} Lista de atenciones
     */
    public async getAllAtencion(): Promise<Atencion[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows] = await connetion.query("CALL sp_atencion()");
            return rows as Atencion[];
        }
        catch (error) {
            console.error('Error al obtener los motivos:', error);
            throw new Error('Error al obtener los motivos');
        }
        finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

}