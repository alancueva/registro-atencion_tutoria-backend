import { TurnoRepository } from "../repositories/turnoRepository";
import { Turno } from "../models/interface/turno.interface";

export class TurnoService {
    private turnoRepository: TurnoRepository;

    constructor() {
        this.turnoRepository = new TurnoRepository();
    }
    /**
     * Obtiene la lista de turnos
     * @returns {Promise<Turno[]>} Lista de turnos
     */
    public async getTurnos(): Promise<Turno[]> {
        try {
            const turnos = await this.turnoRepository.getTurnos();
            return turnos;
        } catch (error) {
            console.error('Error en TurnoService.getTurnos:', error);
            throw error;
        }
    }
}