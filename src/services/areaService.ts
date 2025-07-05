import { AreaRepository } from "../repositories/areaRepository";
import { Area } from "../models/interface/area.interface";
export class AreaService{
    private areaRepository: AreaRepository;

    constructor() {
        this.areaRepository = new AreaRepository();
    }
    /**
     * Obtiene la lista de areas
     * @returns {Promise<Area[]>} Lista de areas
     */
    public async getAreas(): Promise<Area[]> {
        try {
            const areas = await this.areaRepository.getAreas();
            return areas;
        } catch (error) {
            console.error('Error en AreaService.getAreas:', error);
            throw error;
        }
    }

    public async getRecuperarAreas(id_area: number): Promise<Area> {
        try {    
            const areas = await this.areaRepository.getRecuperarAreas(id_area);
            return areas;
        } catch (error) {
            console.error('Error en AreaService.getRecuperarAreas:', error);
            throw error;
        }
    }

    public async update_area(areaData: Area): Promise<boolean> {
        try {
            const result = await this.areaRepository.update_area(areaData);
            return result;
        } catch (error) {
            console.error('Error en AreaService.update_area:', error);
            throw error;
        }
    }


}