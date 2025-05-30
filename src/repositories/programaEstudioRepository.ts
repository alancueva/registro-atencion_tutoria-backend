
import { ProgramaEstudio } from "../models/interface/programaEstudio.interface";
import pool from '../config/DatabaseConexion';

export class ProgramaEstudioRepository {
    /**
     * Método para obtener los programas de estudio vigentes
     * @returns {Promise<ProgramaEstudio[]>} Lista de programas de estudio vigentes
     */
    public async getProgramasVigentes(): Promise<ProgramaEstudio[]> {
        try {
        const result: any = await pool.query("CALL sp_programa()");

        const programas: ProgramaEstudio[] = (result[0] as any).map((row: any) => ({
            idprogramadeestudio: row.idprogramadeestudio,
            programa: row.programa       
        }));
        return programas;
        }catch (error) {
            console.error('Error en ProgramaEstudioRepository.getProgramasVigentes:', error);
            throw error;
        }
    }
}