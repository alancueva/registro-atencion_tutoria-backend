import pool from '../config/DatabaseConexion';
import { PeriodoAcademico } from "../models/interface/periodo_academico.interface";

/**
 * Clase que maneja las operaciones de acceso a datos para los periodos académicos
 */
export class PeriodoAcademicoRepository {
    /**
     * Método para obtener los periodos académicos vigentes
     * @returns {Promise<PeriodoAcademico[]>} Lista de periodos académicos vigentes
     */
    public async getPeriodoAcademico(): Promise<PeriodoAcademico> {
        try {
            const [result]: any = await pool.query("CALL sp_periodo_academico()");
            return result[0][0] as PeriodoAcademico;
        } catch (error) {
            console.error('Error en PeriodoAcademicoRepository.getPeriodos:', error);
            throw error;
        }
    }

    /**
     * Método para actualizar un periodo académico
     * @param PeriodoAcademico - Periodo académico a actualizar
     * @returns Verdadero si se actualizó correctamente, falso en caso contrario
     */
    public async UpdatePeriodoAcademico(PeriodoAcademico: PeriodoAcademico): Promise<boolean> {
        try {
            const [result]: any = await pool.query("CALL sp_periodo_academico_update(?,?,?,?,?,?)", [
                PeriodoAcademico.idperiodo_academico,
                PeriodoAcademico.mes_inicio,
                PeriodoAcademico.mes_fin,
                PeriodoAcademico.estado_matricula,
                PeriodoAcademico.estado_sistema,
                PeriodoAcademico.periodo_academico
            ]);
            return result[0] as boolean;
        } catch (error) {
            console.error('Error en PeriodoAcademicoRepository.UpdatePeriodoAcademico:', error);
            throw error;
        }
    }

}