
import { Request, Response } from 'express';
import { AtencionService } from '../services/atencionService';
import { Atencion } from '../models/interface/atencion.interface';

export class AtencionControlles{
    private atencionService: AtencionService;

    constructor() {
        this.atencionService = new AtencionService();
    }

    public async getAtenciones(req: Request, res: Response): Promise<void> {
        try {
            const atenciones = await this.atencionService.getAtenciones();
            res.status(200).json({
                success: true,
                data: atenciones,
            });
        } catch (error) {
            console.error('Error en AtencionController.getAtenciones:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener las atenciones',
                error: (error as Error).message
            });
        }
    }
}
