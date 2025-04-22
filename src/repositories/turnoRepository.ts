import pool from '../config/DatabaseConexion'; // Asegúrate de que la ruta sea correcta
import { Turno } from "../models/interface/turno.interface"; // Asegúrate de que la ruta sea correcta


export class TurnoRepository {

    /**
     * Obtiene la lista de turnos
     * @returns {Promise<Turno[]>} Lista de turnos
     */
    public async getTurnos(): Promise<Turno[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows] = await connetion.query("CALL sp_turno()");
            return rows as Turno[];
        }
        catch (error) {
            console.error('Error al obtener los turnos:', error);
            throw new Error('Error al obtener los turnos');
        }
        finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

}