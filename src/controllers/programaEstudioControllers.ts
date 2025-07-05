import { Request, Response } from 'express';
import {ProgramaEstudioService} from '../services/programaEstudioService';

export class ProgramaEstudioController {
    private programaEstudioService: ProgramaEstudioService;

    constructor() {
        this.programaEstudioService = new ProgramaEstudioService();
    }
    
    /**
     * Método para obtener todos los programas de estudio vigentes
     * @param req - Request de Express
     * @param res - Response de Express
     */
    public async getProgramasEstudio (req: Request, res: Response): Promise<void> {
        try {
            const programas = await this.programaEstudioService.getProgramaEstudio();
            if (!programas || programas.length === 0) {
                res.status(404).json({ message: 'No hay programas de estudio disponibles' });
                return;
            }
            res.status(200).json({
                success: true,
                data: programas
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los programas de estudio', error });
        }
    }

    /**
     * Método para obtener todos los programas de estudio
     * @param req - Request de Express
     * @param res - Response de Express
     */
    public async getProgramasEstudioTodos(req: Request, res: Response): Promise<void> {
        try {
            const programas = await this.programaEstudioService.getProgramas();
            if (!programas || programas.length === 0) {
                res.status(404).json({ message: 'No hay programas de estudio disponibles' });
                return;
            }
            res.status(200).json({
                success: true,
                data: programas
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los programas de estudio', error });
        }
    }

    /**
     * Método para obtener un programa de estudio por su ID
     * @param req - Request de Express
     * @param res - Response de Express
     */
    public async getProgramaEstudioById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const programa = await this.programaEstudioService.getProgramasporId(Number(id));
            if (!programa) {
                res.status(404).json({ message: 'Programa de estudio no encontrado' });
                return;
            }
            res.status(200).json({
                success: true,
                data: programa
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el programa de estudio', error });
        }
    }

    /**
     * Método para insertar un nuevo programa de estudio
     * @param req - Request de Express
     * @param res - Response de Express
     */
    public async insertProgramaEstudio(req: Request, res: Response): Promise<void> {
        try {
            const programa = req.body;
            const nuevoPrograma = await this.programaEstudioService.insertProgramaEstudio(programa);
            res.status(201).json(
                {success: nuevoPrograma, 
                message: 'Programa de estudio creado exitosamente'}
            );
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el programa de estudio', error });
        }
    }

    /**
     * Método para actualizar un programa de estudio
     * @param req - Request de Express
     * @param res - Response de Express
     */
    public async updateProgramaEstudio(req: Request, res: Response): Promise<void> {
        try {
            const ProgramaEstudio = req.body;
            const programaActualizado = await this.programaEstudioService.updateProgramaEstudio(ProgramaEstudio);
            if (!programaActualizado) {
                res.status(404).json({ message: 'Programa de estudio no encontrado' });
                return;
            }
            res.json({
                success: programaActualizado,
                message: 'Programa de estudio actualizado exitosamente'
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el programa de estudio', error });
        }
    }
}
