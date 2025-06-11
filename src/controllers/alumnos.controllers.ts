import { Alumno, AlumnoConsulta } from '../models/interface/alumno.interface';
import { AlumnoService } from '../services/alumnos.services';
import { Request, Response } from 'express';

export class AlumnoController {
    private alumnoService: AlumnoService;

    constructor() {
        this.alumnoService = new AlumnoService();
    }

    public async verificarUsuarioDni(req: Request, res: Response): Promise<void> {
        const { a_dni, a_periodo_academico, a_anio } = req.params;
        try {
            const result = await this.alumnoService.verificarUsuarioDni(a_dni, a_periodo_academico, a_anio);
            res.status(200).json({ result });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async consulta_alumnos(req: Request, res: Response): Promise<void> {
        const ac: AlumnoConsulta = req.body;
        try {
            const result = await this.alumnoService.consulta_alumnos(ac);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    public async mostrar_alumnos_programa_turno_semestre(req: Request, res: Response): Promise<void> {
        const { programa, turno, semestre } = req.body;
        try {
            const result = await this.alumnoService.mostrar_alumnos_programa_turno_semestre(programa, turno, semestre);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async recuperar_alumno(req: Request, res: Response): Promise<void> {
        const { a_idalumnos } = req.params;
        try {
            const result = await this.alumnoService.recuperar_alumno(Number(a_idalumnos));
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async insertMultipleRegistros(req: Request, res: Response): Promise<void> {
        try {
            const jsonData: any[] = req.body;
            const result = await this.alumnoService.insertMultipleRegistros(jsonData);
            if (result) {
                res.status(200).json({ success: result, message: 'Registros insertados correctamente' });
            } else {
                res.status(400).json({ success: result, message: 'No se pudo insertar los registros' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al insertar múltiples registros' });
        }
    }

    public async insertar_alumnos(req: Request, res: Response): Promise<void> {
        const ac: Alumno = req.body;
        try {
            const result = await this.alumnoService.insertar_alumnos(ac);
            if (result) {
                res.status(200).json({ message: 'Alumno insertado correctamente' });         
            } else {
                res.status(400).json({ message: 'Error al insertar el alumno' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    public async actualizar_alumnos(req: Request, res: Response): Promise<void> {
        const ac: Alumno = req.body;
        try {
            const result = await this.alumnoService.actualizar_alumnos(ac);
            if (result) {
                res.status(200).json({ message: 'Alumno actualizado correctamente' });
            }else{
                res.status(400).json({ message: 'Error al actualizar el alumno' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


}