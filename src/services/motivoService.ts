import { MotivoRepository } from "../repositories/motivoRepository";
import { Motivo } from "../models/interface/motivo.interface";

export class MotivoService {
    private motivoRepository: MotivoRepository;


    constructor() {
        this.motivoRepository = new MotivoRepository();
    }

    public async getMotivos_Consultar(idArea:number, motivo:string): Promise<Motivo[]> {
        try {
            const motivos = await this.motivoRepository.getMotivos_Consultar(idArea, motivo);
            return motivos;
        } catch (error) {
            console.error('Error en MotivoService.getMotivos:', error);
            throw error;
        }
    }

    public async getRecuperarMotivos(id_motivo: number): Promise<Motivo[]> {
        try {
            const motivos = await this.motivoRepository.getRecuperarMotivos(id_motivo);
            return motivos;
        } catch (error) {
            console.error('Error en MotivoService.getRecuperarMotivos:', error);
            throw error;
        }
    }

    public async getMotivos_por_area(idArea: number): Promise<Motivo[]> {
        try {
            const motivos = await this.motivoRepository.getMotivos_por_area(idArea);
            return motivos;
        } catch (error) {
            console.error('Error en MotivoService.getMotivos_por_area:', error);
            throw error;
        }
    }

    public async insert_motivo(motivoData: Motivo): Promise<boolean> {
        try {
            const result = await this.motivoRepository.insert_motivo(motivoData);
            return result;
        } catch (error) {
            console.error('Error en MotivoService.insert_motivo:', error);
            throw error;
        }
    }

    public async update_motivo(motivoData: Motivo): Promise<boolean> {
        try {
            const result = await this.motivoRepository.update_motivo(motivoData);
            return result;
        } catch (error) {
            console.error('Error en MotivoService.update_motivo:', error);
            throw error;
        }
    }

}