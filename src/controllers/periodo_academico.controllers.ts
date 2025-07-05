import { PeriodoAcademico } from '../models/interface/periodo_academico.interface';
import { PeriodoAcademicoService } from '../services/periodo_academico.service';
import { Request, Response } from 'express';

export class PeriodoAcademicoController {
    private periodoAcademicoService: PeriodoAcademicoService;

    constructor() {
        this.periodoAcademicoService = new PeriodoAcademicoService();
    }

    public async getPeriodoAcademico(req: Request, res: Response): Promise<void> {
        try {
            const periodo = await this.periodoAcademicoService.getPeriodoAcademico();
            res.json(periodo);
        } catch (error) {
            console.error('Error en PeriodoAcademicoController.getPeriodoAcademico:', error);
            res.status(500).json({ error: 'Error al obtener el periodo académico' });
        }
    }

    public async updatePeriodoAcademico(req: Request, res: Response): Promise<void> {
        try {
            const periodo: PeriodoAcademico = req.body;
            const result = await this.periodoAcademicoService.updatePeriodoAcademico(periodo);
            res.json({ success: result, message: 'Registros actualizados correctamente' });
        } catch (error) {
            console.error('Error en PeriodoAcademicoController.updatePeriodoAcademico:', error);
            res.status(500).json({ error: 'Error al actualizar el periodo académico' });
        }
    }
}
