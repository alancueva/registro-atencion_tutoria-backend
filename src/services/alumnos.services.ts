import { AlumnoRepository } from "../repositories/alumno.repository";
import { Alumno, AlumnoConsulta } from '../models/interface/alumno.interface';

export class AlumnoService {
    private alumnoRepository: AlumnoRepository;

    constructor() {
        this.alumnoRepository = new AlumnoRepository();
    }

    public async verificarUsuarioDni(a_dni: string, a_periodo_academico: string, a_anio: string): Promise<boolean> {
        try {
            return await this.alumnoRepository.verificarUsuarioDni(a_dni, a_periodo_academico, a_anio);
        } catch (error: any) {
            throw new Error(`Error en la verificación del DNI: ${error.message}`);
        }
    }

    public async consulta_alumnos(ac: AlumnoConsulta): Promise<Alumno[]> {
        try {
            return await this.alumnoRepository.consulta_alumnos(ac);
        } catch (error: any) {
            throw new Error(`Error en la consulta de alumnos: ${error.message}`);
        }
    }

    public async mostrar_alumnos_programa_turno_semestre(programa: string, turno: string, semestre: string): Promise<Alumno[]> {
        try {
            return await this.alumnoRepository.mostrar_alumnos_programa_turno_semestre(programa, turno, semestre);
        } catch (error: any) {
            throw new Error(`Error al mostrar alumnos por programa, turno y semestre: ${error.message}`);
        }
    }


    public async recuperar_alumno(a_idalumnos: number): Promise<Alumno[]> {
        try {
            return await this.alumnoRepository.recuperar_alumnos(a_idalumnos);
        } catch (error: any) {
            throw new Error(`Error al recuperar alumno: ${error.message}`);
        }
    }

    public async insertMultipleRegistros(jsonData: any[]): Promise<boolean> {
        try {
            return await this.alumnoRepository.insertMultipleRegistros(jsonData);
        } catch (error: any) {
            throw new Error(`Error al insertar múltiples registros: ${error.message}`);
        }
    }

    public async insertar_alumnos(ac: Alumno): Promise<boolean> {
        try {
            return await this.alumnoRepository.insertar_alumnos(ac);
        } catch (error: any) {
            throw new Error(`Error al insertar alumno: ${error.message}`);
        }
    }
    public async actualizar_alumnos(ac: Alumno): Promise<boolean> {
        try {
            return await this.alumnoRepository.actualizar_alumnos(ac);
        } catch (error: any) {
            throw new Error(`Error al actualizar alumno: ${error.message}`);
        }
    }

}