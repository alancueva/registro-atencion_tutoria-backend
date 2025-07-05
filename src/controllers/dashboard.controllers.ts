import { DashboardService } from "../services/dashboard.service";
import { DashboardConteoAdmin, DashboardCantidadSesiones, DashboardConteoPorcentajeArea,  DashboardDocenteSesiones} from "../models/interface/dashboard.interface";
import { Request, Response } from "express";

export class DashboardController {
    private dashboardService: DashboardService;

    constructor() {
        this.dashboardService = new DashboardService();
    }

    public async getDashboardData(req: Request, res: Response): Promise<void> {
        try {
            const data: DashboardConteoAdmin = await this.dashboardService.getDashboardData();
            res.status(200).json({ data : data });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public async getDashboardCantidadSesiones(req: Request, res: Response): Promise<void> {
        try {
            const data: DashboardCantidadSesiones[] = await this.dashboardService.getDashboardCantidadSesiones();
            res.status(200).json({ data : data });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
    public async getDashboardConteoPorcentajeArea(req: Request, res: Response): Promise<void> { 
        try {
            const data: DashboardConteoPorcentajeArea[] = await this.dashboardService.getDashboardConteoPorcentajeArea();
            res.status(200).json({ data : data });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
    public async getDashboardDocenteSesiones(req: Request, res: Response): Promise<void> {
        const idusuario = parseInt(req.params.idusuario, 10); // Asegúrate de que idusuario es un número
        try {
            const data: DashboardDocenteSesiones[] = await this.dashboardService.getDashboardDocenteSesiones(idusuario);
            res.status(200).json({ data : data });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
    
}