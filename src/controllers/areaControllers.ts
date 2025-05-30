import { AreaService } from "../services/areaService";
import { Area } from "../models/interface/area.interface";
import { Request, Response } from 'express';

export class AreaContorllers {
    private areaService: AreaService;

    constructor() {
        this.areaService = new AreaService();
    }
    
    /**
     * Controlador para obtener la lista de areas
     * @param req - Request object
     * @param res - Response object
     */
    public async getAreas(req: Request, res: Response): Promise<void> {
        try {
            const areas = await this.areaService.getAreas();
            res.status(200).json({
                success: true,
                data: areas
            });
        } catch (error) {
            console.error('Error en AreaControllers.getAreas:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener las areas',
                error:  (error as Error).message
            });
        }
    }

    public async getRecuperarAreas(req: Request, res: Response): Promise<void> {
        try {
            const id_area = parseInt(req.params.id_area, 10);
            const areas = await this.areaService.getRecuperarAreas(id_area);
            res.status(200).json({
                success: true,
                data: areas
            });
        } catch (error) {
            console.error('Error en AreaControllers.getRecuperarAreas:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener las areas',
                error:  (error as Error).message
            });
        }
    }

    public async update_area(req: Request, res: Response): Promise<void> {
        try {
            const areaData: Area = req.body;
            const result = await this.areaService.update_area(areaData);
            res.status(200).json({
                success: true,
                message: 'Area actualizada correctamente',
                data: result,
            });
        } catch (error) {
            console.error('Error en AreaControllers.update_area:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el area',
                error:  (error as Error).message
            });
        }
    }

}