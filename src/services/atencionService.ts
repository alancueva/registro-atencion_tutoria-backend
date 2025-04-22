import { AtencionRepository } from "../repositories/atencionRepository";
import { Atencion } from "../models/interface/atencion.interface";

export class AtencionService {
    private atencionRepository: AtencionRepository;

    constructor() {
        this.atencionRepository = new AtencionRepository();
    }

    /**
     * Obtiene la lista de atenciones
     * @returns {Promise<Atencion[]>} Lista de atenciones
     */
    public async getAtenciones(): Promise<Atencion[]> {
        try {
            const atenciones = await this.atencionRepository.getAllAtencion();
            return atenciones;
        } catch (error) {
            console.error('Error en AtencionService.getAtenciones:', error);
            throw error;
        }
    }
    
}