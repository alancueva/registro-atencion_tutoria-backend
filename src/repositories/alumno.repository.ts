import pool from '../config/DatabaseConexion';
import { Alumno, AlumnoConsulta } from '../models/interface/alumno.interface';

export class AlumnoRepository {

    public async verificarUsuarioDni(a_dni: string, a_periodo_academico: string, a_anio: string): Promise<boolean> {
        try {
            const [rows]: any = await pool.query('CALL sp_alumnos_verificar_dni(?, ?, ?)', [
                a_dni,
                a_periodo_academico,
                a_anio
            ]);
            if (rows.length === 0) {
                throw new Error('No se encontraron resultados en la consulta.');
            }
            const result = rows[0]?.[0];
            return result && Number(result['result']) === 1;
        } catch (error: any) {
            throw new Error(`Error: ${error.message}`);
        } 
    }

    public async consulta_alumnos(ac: AlumnoConsulta): Promise<Alumno[]> {
        try {
            const [rows]: any = await pool.query('CALL sp_alumnos_consulta(?, ?, ?, ?, ?, ?, ?, ?)', [
                ac.dni,
                ac.nombres,
                ac.apellidos,
                ac.programa,
                ac.turno,
                ac.semestre,
                ac.periodo_academico,
                ac.anio
            ]);
            return rows[0] as Alumno[];
        } catch (error: any) {
            throw new Error(`Ocurrio un error en la validación: ${error.message}`);
        }
    }

    public async mostrar_alumnos_programa_turno_semestre(programa: string, turno: string, semestre: string): Promise<Alumno[]> {
        try {
            const [rows]: any = await pool.query('CALL sp_alumnos_mostrar_programa_turno_semestre(?, ?, ?)', [
                programa,
                turno,
                semestre
            ]);
            return rows[0].map((row: any) => ({
                dni: row.dni,
                nombres: row.nombres
            })) as Alumno[];
        } catch (error: any) {
            throw new Error(`Ocurrio un error en la validación: ${error.message}`);
        }
    }

    public async recuperar_alumnos(a_idalumnos: number): Promise<Alumno[]> {

        try {
            const [rows]: any = await pool.query('CALL sp_alumnos_recuperar(?)', [
                a_idalumnos
            ]);
            return rows[0] as Alumno[];
        } catch (error: any) {
            throw new Error(`Error: ${error.message}`);
        }
    }


    public async insertMultipleRegistros(jsonData: any[]): Promise<boolean> {
        try {
            await pool.query('CALL sp_alumnos_insert_multiple(?)', [JSON.stringify(jsonData)]);
            return true;
        } catch (error: any) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    public async insertar_alumnos(ac: Alumno): Promise<boolean> {
        try {
            await pool.query('CALL sp_alumnos_insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                ac.dni,
                ac.nombres,
                ac.apellidos,
                ac.idProgramaDeEstudio,
                ac.programa,
                ac.idTurno,
                ac.turno,
                ac.idsemestre,
                ac.semestre,
                ac.periodo_academico,
                ac.anio
            ]);
            return true;
        } catch (error: any) {
            throw new Error(`Error: ${error.message}`);
        } 
    }

    public async actualizar_alumnos(ac: Alumno): Promise<boolean> {
        try {
            await pool.query('CALL sp_alumnos_insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                ac.idalumnos,
                ac.dni,
                ac.nombres,
                ac.apellidos,
                ac.idProgramaDeEstudio,
                ac.programa,
                ac.idTurno,
                ac.turno,
                ac.idsemestre,
                ac.semestre,
                ac.periodo_academico,
                ac.anio
            ]);
            return true;
        } catch (error: any) {
            throw new Error(`Error: ${error.message}`);
        } 
    }

}