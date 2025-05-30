import pool from '../config/DatabaseConexion'; 
import { semestre } from "../models/interface/semestre.interface"; 


export class semestreRepository {
    /**
     * Método para obtener los semestres 
     * @returns {Promise<semestre[]>} Lista de semestres
     */
    public async getSemestres(): Promise<semestre[]> {
        try {
            const result: any = await pool.query("CALL sp_semestre()");
            return result[0] as semestre[];
        } catch (error) {
            console.error('Error en semestreRepository.getSemestresVigentes:', error);
            throw error;
        }
    }
}