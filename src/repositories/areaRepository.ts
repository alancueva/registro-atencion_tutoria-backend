import pool from '../config/DatabaseConexion'; // Asegúrate de que la ruta sea correcta
import { Area } from "../models/interface/area.interface"; // Asegúrate de que la ruta sea correcta

export class AreaRepository {

    /**
     * Obtiene la lista de areas
     * @returns {Promise<Area[]>} Lista de areas
     */
    public async getAreas(): Promise<Area[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_area_mostrar()");
            return rows as Area[];
        }
        catch (error) {
            console.error('Error al obtener las areas:', error);
            throw new Error('Error al obtener las areas');
        }
    }

    public async getRecuperarAreas(id_area: number): Promise<Area> {
        try {
            const [rows]: any = await pool.query("CALL sp_area_recuperar(?)", [id_area]);
            return rows as Area;
        }
        catch (error) {
            console.error('Error al obtener las areas:', error);
            throw new Error('Error al obtener las areas');
        }       
    }


    public async update_area(areaData: Area): Promise<boolean> {
        try {
            await pool.query('CALL sp_area_modificar(?, ?)', [
                areaData.idarea, areaData.area]);
            return true;
        } catch (error) {
            console.error('Error en AreaRepository.update_area: ', error);
            throw error;
        }
    }

}