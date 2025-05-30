import { MotivoService } from "../services/motivoService";
import { Motivo } from "../models/interface/motivo.interface";
import { Request, Response } from 'express';

export class MotivoController {
    private motivoService: MotivoService;

    constructor() {
        this.motivoService = new MotivoService();
    }
 
    public async getMotivos_Consultar(req: Request, res: Response): Promise<void> {
        try {
            const idArea = parseInt(req.params.idArea, 10);
            const motivo = req.params.motivo || ''; 

            const motivos = await this.motivoService.getMotivos_Consultar(idArea, motivo);
            res.status(200).json({
                success: true,
                data: motivos,
            });
        } catch (error) {
            console.error('Error en MotivoController.getMotivos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los motivos',
                error:  (error as Error).message
            });
        }
    }

    public async getRecuperarMotivos(req: Request, res: Response): Promise<void> {
        try {
            const id_motivo = parseInt(req.params.id_motivo, 10);
            const motivos = await this.motivoService.getRecuperarMotivos(id_motivo);
            res.status(200).json({
                success: true,
                data: motivos,
            });
        } catch (error) {
            console.error('Error en MotivoController.getRecuperarMotivos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los motivos',
                error:  (error as Error).message
            });
        }
    }

    public async getMotivos_por_area(req: Request, res: Response): Promise<void> {
        try {
            const idArea = parseInt(req.params.idarea, 10);     
            const motivos = await this.motivoService.getMotivos_por_area(idArea);
            res.status(200).json({
                success: true,
                data: motivos
            });
        } catch (error) {
            console.error('Error en MotivoController.getMotivos_por_area:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los motivos por area',
                error:  (error as Error).message
            });
        }
    }

    public async insert_motivo(req: Request, res: Response): Promise<void> {
        try {
            const motivoData: Motivo = req.body;
            const result = await this.motivoService.insert_motivo(motivoData);
            res.status(200).json({
                success: true,
                message: 'Motivo insertado correctamente',
                data: result,
            });
        } catch (error) {
            console.error('Error en MotivoController.insert_motivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al insertar el motivo',
                error:  (error as Error).message
            });
        }
    }

    public async update_motivo(req: Request, res: Response): Promise<void> {
        try {
            const motivoData: Motivo = req.body;
            const result = await this.motivoService.update_motivo(motivoData);
            res.status(200).json({
                success: true,
                message: 'Motivo actualizado correctamente',
                data: result,
            });
        } catch (error) {
            console.error('Error en MotivoController.update_motivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el motivo',
                error:  (error as Error).message
            });
        }
    }
    
}