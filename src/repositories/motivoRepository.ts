import pool from '../config/DatabaseConexion'; // Asegúrate de que la ruta sea correcta
import { Motivo } from "../models/interface/motivo.interface"; // Asegúrate de que la ruta sea correcta

export class MotivoRepository{


    public async getMotivos_Consultar(idArea:number, motivo:string): Promise<Motivo[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_motivo_consultar(?, ?)", [idArea, motivo]);
            return rows as Motivo[];
        }
        catch (error) {
            console.error('Error al obtener los motivos:', error);
            throw new Error('Error al obtener los motivos');
        }
    }

    public async getRecuperarMotivos(id_motivo: number): Promise<Motivo[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_motivo_recuperar(?)", [id_motivo]);
            return rows as Motivo[];
        }
        catch (error) {
            console.error('Error al obtener los motivos:', error);
            throw new Error('Error al obtener los motivos');
        }
    }

    public async getMotivos_por_area(idArea:number): Promise<Motivo[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_motivo_recuperar_por_idarea(?)", [idArea]);
            return rows as Motivo[];
        }
        catch (error) {
            console.error('Error al obtener los motivos:', error);
            throw new Error('Error al obtener los motivos');
        }    
    }

    public async insert_motivo(motivoData: Motivo): Promise<boolean> {
        try {
            await pool.query('CALL sp_motivo_insert(?, ?)', [
                motivoData.idarea, motivoData.motivo ]);
            return true;
        } catch (error) {
            console.error('Error en MotivoRepository.insert_motivo: ', error);
            throw error;
        }
    }

    public async update_motivo(motivoData: Motivo): Promise<boolean> {
        try {
            await pool.query('CALL sp_motivo_update(?, ?, ?)', [
                motivoData.idarea, motivoData.idmotivo,motivoData.motivo ]);
            return true;
        } catch (error) {
            console.error('Error en MotivoRepository.update_motivo: ', error);
            throw error;
        }
    }


}