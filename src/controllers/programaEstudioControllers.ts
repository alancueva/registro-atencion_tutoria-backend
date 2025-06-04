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
    public async getAllProgramasEstudio (req: Request, res: Response): Promise<void> {
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



}

// // POR CONSIDERAR ESTOS METODOS EN EL CONTROLADOR DE PROGRAMA DE ESTUDIO


// // Obtener un programa de estudio por ID
// export const getProgramaEstudioById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const programa = await programaEstudioService.getProgramaEstudioById(Number(id));
//         if (!programa) {
//             return res.status(404).json({ message: 'Programa de estudio no encontrado' });
//         }
//         res.json(programa);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener el programa de estudio', error });
//     }
// };

// // Crear un nuevo programa de estudio
// export const createProgramaEstudio = async (req: Request, res: Response) => {
//     try {
//         const nuevoPrograma = await programaEstudioService.createProgramaEstudio(req.body);
//         res.status(201).json(nuevoPrograma);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al crear el programa de estudio', error });
//     }
// };

// // Actualizar un programa de estudio
// export const updateProgramaEstudio = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const programaActualizado = await programaEstudioService.updateProgramaEstudio(Number(id), req.body);
//         if (!programaActualizado) {
//             return res.status(404).json({ message: 'Programa de estudio no encontrado' });
//         }
//         res.json(programaActualizado);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al actualizar el programa de estudio', error });
//     }
// };

// // Eliminar un programa de estudio
// export const deleteProgramaEstudio = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const eliminado = await programaEstudioService.deleteProgramaEstudio(Number(id));
//         if (!eliminado) {
//             return res.status(404).json({ message: 'Programa de estudio no encontrado' });
//         }
//         res.json({ message: 'Programa de estudio eliminado correctamente' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error al eliminar el programa de estudio', error });
//     }
// };