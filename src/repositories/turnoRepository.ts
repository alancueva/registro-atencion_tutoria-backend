import pool from '../config/DatabaseConexion'; 
import { Turno } from "../models/interface/turno.interface";


export class TurnoRepository {

    /**
     * Obtiene la lista de turnos
     * @returns {Promise<Turno[]>} Lista de turnos
     */
    public async getTurnos(): Promise<Turno[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_turno()");
            return rows as Turno[];
        }
        catch (error) {
            console.error('Error al obtener los turnos:', error);
            throw new Error('Error al obtener los turnos');
        }
    }

}