import { ProgramaEstudio } from '../models/interface/programaEstudio.interface';
import {ProgramaEstudioRepository} from '../repositories/programaEstudioRepository';

export class ProgramaEstudioService {
    private programaEstudioRepository: ProgramaEstudioRepository;

    constructor() {
        this.programaEstudioRepository = new ProgramaEstudioRepository();
    }

   /**
    * Método para obtener los programas de estudio vigentes
    * @returns {Promise<ProgramaEstudio[]>} Lista de programas de estudio vigentes
    */
    public async getProgramaEstudio():Promise<ProgramaEstudio[]> {
        return await this.programaEstudioRepository.getProgramasVigentes();
    }

    /**
     * Método para obtener todos los programas de estudio
     * @returns {Promise<ProgramaEstudio[]>} Lista de programas de estudio
     */
    public async getProgramas(): Promise<ProgramaEstudio[]> {
        return await this.programaEstudioRepository.getProgramas();
    }
    
    /**
     * Método para obtener un programa de estudio por su ID
     * @param {number} id - ID del programa de estudio
     * @returns {Promise<ProgramaEstudio | null>} Programa de estudio encontrado o null si no existe
     */
    public async getProgramasporId(id: number): Promise<ProgramaEstudio | null> {
        return await this.programaEstudioRepository.getProgramasporId(id);
    }

    /**
     * Método para insertar un nuevo programa de estudio
     * @param {ProgramaEstudio} programaEstudio - Programa de estudio a insertar
     * @returns {Promise<boolean>} Verdadero si se insertó correctamente, falso en caso contrario
     */
    public async insertProgramaEstudio(programaEstudio: ProgramaEstudio): Promise<boolean> {
        return await this.programaEstudioRepository.insertProgramaEstudio(programaEstudio);
    }

    /**
     * Método para actualizar un programa de estudio
     * @param {ProgramaEstudio} programaEstudio - Programa de estudio a actualizar
     * @returns {Promise<boolean>} Verdadero si se actualizó correctamente, falso en caso contrario
     */
    public async updateProgramaEstudio(programaEstudio: ProgramaEstudio): Promise<boolean> {
        return await this.programaEstudioRepository.updateProgramaEstudio(programaEstudio);
    }
}
