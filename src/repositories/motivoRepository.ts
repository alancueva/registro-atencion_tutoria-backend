import pool from '../config/DatabaseConexion'; // Asegúrate de que la ruta sea correcta
import { Motivo } from "../models/interface/motivo.interface"; // Asegúrate de que la ruta sea correcta

export class MotivoRepository{


    public async getMotivos_Consultar(idArea:number, motivo:string): Promise<Motivo[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows] = await connetion.query("CALL sp_motivo_consultar(?, ?)", [idArea, motivo]);
            return rows as Motivo[];
        }
        catch (error) {
            console.error('Error al obtener los motivos:', error);
            throw new Error('Error al obtener los motivos');
        }
        finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async getRecuperarMotivos(id_motivo: number): Promise<Motivo[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows] = await connetion.query("CALL sp_motivo_recuperar(?)", [id_motivo]);
            return rows as Motivo[];
        }
        catch (error) {
            console.error('Error al obtener los motivos:', error);
            throw new Error('Error al obtener los motivos');
        }
        finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async getMotivos_por_area(idArea:number): Promise<Motivo[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows] = await connetion.query("CALL sp_motivo_recuperar_por_idarea(?)", [idArea]);
            return rows as Motivo[];
        }
        catch (error) {
            console.error('Error al obtener los motivos:', error);
            throw new Error('Error al obtener los motivos');
        }
        finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async insert_motivo(motivoData: Motivo): Promise<boolean> {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.query('CALL sp_motivo_insert(?, ?)', [
                motivoData.idarea, motivoData.motivo ]);
            return true;
        } catch (error) {
            console.error('Error en MotivoRepository.insert_motivo: ', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    public async update_motivo(motivoData: Motivo): Promise<boolean> {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.query('CALL sp_motivo_update(?, ?, ?)', [
                motivoData.idarea, motivoData.idmotivo,motivoData.motivo ]);
            return true;
        } catch (error) {
            console.error('Error en MotivoRepository.update_motivo: ', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }


}