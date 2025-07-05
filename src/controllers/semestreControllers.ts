import { Request, Response } from 'express';
import { SemestreService } from '../services/semestreService';
import { semestre } from '../models/interface/semestre.interface';

export class SemestreController {
    
    private semestreService: SemestreService;

    constructor() {
        this.semestreService = new SemestreService();
    }

    /**
     * Método para obtener los semestres 
     * @returns {Promise<void>} Respuesta HTTP con la lista de semestres
     */
    public async getSemestres(req: Request, res: Response): Promise<void> {
        try {
            const semestres: semestre[] = await this.semestreService.getSemestres();
            res.status(200).json({
                success: true,
                data: semestres
            });
        } catch (error) {
            console.error('Error en SemestreController.getSemestres:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los semestres',
                error: (error as Error).message
            });
        }
    }

}