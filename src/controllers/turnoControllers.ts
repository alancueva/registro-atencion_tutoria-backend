import { TurnoService } from "../services/turnoService";
import { Request, Response } from 'express';

export class TurnoControllers {
    private turnoService: TurnoService;

    constructor() {
        this.turnoService = new TurnoService();
    }

    /**
     * Controlador para obtener la lista de turnos
     * @param req - Request object
     * @param res - Response object
     */
    public async getTurnos(req: Request, res: Response): Promise<void> {
        try {
            const turnos = await this.turnoService.getTurnos();
            res.status(200).json({
                success: true,
                data: turnos,
            });
        } catch (error) {
            console.error('Error en TurnoControllers.getTurnos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los turnos',
                error:  (error as Error).message
            });
        }
    }


}