import pool from '../config/DatabaseConexion'; 
import { Atencion } from "../models/interface/atencion.interface"; 

export class AtencionRepository{

    /**
     * Obtiene todas las atenciones
     * @returns {Promise<Atencion[]>} Lista de atenciones
     */
    public async getAllAtencion(): Promise<Atencion[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_atencion()");
            return rows as Atencion[];
        }
        catch (error) {
            console.error('Error al obtener las atenciones:', error);
            throw new Error('Error al obtener las atenciones');
        }
    }
}