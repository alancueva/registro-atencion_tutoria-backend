import { DashboardRepository } from "../repositories/dashboard.repository";
import { DashboardConteoAdmin, DashboardCantidadSesiones, DashboardConteoPorcentajeArea,  DashboardDocenteSesiones} from "../models/interface/dashboard.interface";

export class DashboardService {
    private dashboardRepository: DashboardRepository;

    constructor() {
        this.dashboardRepository = new DashboardRepository();
    }

    public async getDashboardData(): Promise<DashboardConteoAdmin> {
        try {
            return await this.dashboardRepository.getDashboardData();
        } catch (error) {
            throw error;
        }
    }

    public async getDashboardCantidadSesiones(): Promise<DashboardCantidadSesiones[]> {
        try {
            return await this.dashboardRepository.getDashboardCantidadSesiones();
        } catch (error) {
            throw error;
        }
    }

    public async getDashboardConteoPorcentajeArea(): Promise<DashboardConteoPorcentajeArea[]> {
        try {
            return await this.dashboardRepository.getDashboardConteoPorcentajeArea();
        } catch (error) {
            throw error;
        }
    }

    public async getDashboardDocenteSesiones(idusuario: number): Promise<DashboardDocenteSesiones[]> {
        try {
            return await this.dashboardRepository.getDashboardDocenteSesiones(idusuario);
        } catch (error) {
            throw error;
        }
    }
}