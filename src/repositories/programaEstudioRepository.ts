
import { ProgramaEstudio } from "../models/interface/programaEstudio.interface";
import pool from '../config/DatabaseConexion';

/**
 * Clase que maneja las operaciones de acceso a datos para los programas de estudio
 */
export class ProgramaEstudioRepository {
    /**
     * Método para obtener los programas de estudio vigentes
     * @returns {Promise<ProgramaEstudio[]>} Lista de programas de estudio vigentes
     */
    public async getProgramasVigentes(): Promise<ProgramaEstudio[]> {
        try {
            const [result]: any = await pool.query("CALL sp_programa()");
            return result[0] as ProgramaEstudio[];
        } catch (error) {
            console.error('Error en ProgramaEstudioRepository.getProgramasVigentes:', error);
            throw error;
        }
    }

    /**
     * Método para obtener todos los programas de estudio
     * @returns {Promise<ProgramaEstudio[]>} Lista de programas de estudio
     */
    public async getProgramas(): Promise<ProgramaEstudio[]> {
        try {
            const [result]: any = await pool.query("CALL sp_programa_select()");
            return result[0] as ProgramaEstudio[];
        } catch (error) {
            console.error('Error en ProgramaEstudioRepository.getProgramas:', error);
            throw error;
        }
    }

    /**
     * Método para obtener un programa de estudio por su ID
     * @param {number} id - ID del programa de estudio
     * @returns {Promise<ProgramaEstudio | null>} Programa de estudio encontrado o null si no existe
     */
    public async getProgramasporId(id: number): Promise<ProgramaEstudio | null> {
        try {
            const [result]: any = await pool.query("CALL sp_programa_recuperar(?)", [id]);

            if (result.length > 0) {
                return result[0][0] as ProgramaEstudio;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error en ProgramaEstudioRepository.getProgramasporId:', error);
            throw error;
        }
    }

    /**
     * Método para insertar un nuevo programa de estudio
     * @param programaEstudio - Programa de estudio a insertar
     * @returns Verdadero si se insertó correctamente, falso en caso contrario
     */
    public async insertProgramaEstudio(programaEstudio: ProgramaEstudio): Promise<boolean> {
        try {
            await pool.query("CALL sp_programa_insert(?,?)", [
                programaEstudio.programa, programaEstudio.vigencia]);
            return true;
        } catch (error) {
            console.error('Error en ProgramaEstudioRepository.insertProgramaEstudio:', error);
            throw error;
        }
    }

    /**
     * Método para actualizar un programa de estudio
     * @param programaEstudio - Programa de estudio a actualizar
     * @returns Verdadero si se actualizó correctamente, falso en caso contrario
     */
    public async updateProgramaEstudio(programaEstudio: ProgramaEstudio): Promise<boolean> {
        try {
            await pool.query("CALL sp_programa_update(?,?,?)", [
                programaEstudio.idProgramaDeEstudio, 
                programaEstudio.programa, 
                programaEstudio.vigencia]);
            return true;
        } catch (error) {
            console.error('Error en ProgramaEstudioRepository.updateProgramaEstudio:', error);
            throw error;
        }
    }

}