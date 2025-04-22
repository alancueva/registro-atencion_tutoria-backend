import { ProgramaEstudio } from '../models/interface/programaEstudio.interface';
import {ProgramaEstudioRepository} from '../repositories/programaEstudioRepository';

export class ProgramaEstudioService {
    private programaEstudioRepository: ProgramaEstudioRepository;

    constructor() {
        this.programaEstudioRepository = new ProgramaEstudioRepository();
    }

    /**
     * Método para obtener los programas de estudio vigentes
     */
    public async getProgramaEstudio():Promise<ProgramaEstudio[]> {
        return await this.programaEstudioRepository.getProgramasVigentes();
    }
}

