import { semestre } from "../models/interface/semestre.interface";
import { semestreRepository } from "../repositories/semestreRepository";

export class SemestreService {
    private semestreRepository: semestreRepository;
    
    constructor() {
        this.semestreRepository = new semestreRepository();
    }

    /**
     * Método para obtener los semestres vigentes
     * @returns {Promise<semestre[]>} Lista de semestres vigentes
     */
    public async getSemestres(): Promise<semestre[]> {
        try {
            const semestres = await this.semestreRepository.getSemestres();
            return semestres;
        } catch (error) {
            console.error('Error en SemestreService.getSemestres:', error);
            throw error;
        }
    }
}