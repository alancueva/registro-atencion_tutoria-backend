import { PeriodoAcademico } from "../models/interface/periodo_academico.interface";
import { PeriodoAcademicoRepository } from "../repositories/periodo_academico.repository";

export class PeriodoAcademicoService {
    private periodoAcademicoRepository: PeriodoAcademicoRepository;

    constructor() {
        this.periodoAcademicoRepository = new PeriodoAcademicoRepository();
    }

    public async getPeriodoAcademico(): Promise<PeriodoAcademico> {
        try {
            const periodo = await this.periodoAcademicoRepository.getPeriodoAcademico();
            return periodo;
        } catch (error) {
            console.error('Error en PeriodoAcademicoService.getPeriodoAcademico:', error);
            throw error;
        }
    }

    public async updatePeriodoAcademico(periodo: PeriodoAcademico): Promise<boolean> {
        try {
            const result = await this.periodoAcademicoRepository.UpdatePeriodoAcademico(periodo);
            return result;
        } catch (error) {
            console.error('Error en PeriodoAcademicoService.updatePeriodoAcademico:', error);
            throw error;
        }
    }
}