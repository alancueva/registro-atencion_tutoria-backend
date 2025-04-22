import pool from '../config/DatabaseConexion'; // Asegúrate de que la ruta sea correcta
import { Registro, RegistroBusqueda, RegistroBusquedaDocente, RegistroResponse } from '../models/interface/registro.interface';

export class RegistroRepository {

    public async getRegistrosBusquedaDocente(registroDTO: RegistroBusquedaDocente):Promise<RegistroResponse[]> {    
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows] = await connetion.query("CALL sp_buscar_tabla_docente(?,?,?,?,?,?,?)",
                [registroDTO.anio,
                    registroDTO.mes,
                    `%${registroDTO.area}%`, 
                    `%${registroDTO.atencion}%`, 
                    registroDTO.id_usuario]);
            
            return rows as RegistroResponse[];
            
        } catch (error) {
            
            console.error(error);
            throw new Error('Error fetching registros');
        }finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async getRegistrosBusqueda(registroDTO: RegistroBusqueda):Promise<RegistroResponse[]> {    
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows] = await connetion.query("CALL sp_buscar_tabla_admin(?,?,?,?,?)",
                [registroDTO.anio,
                    registroDTO.mes,
                    `%${registroDTO.programa}%`, 
                    `%${registroDTO.area}%`, 
                    `%${registroDTO.atencion}%`]);
            
            return rows as RegistroResponse[];
            
        } catch (error) {
            
            console.error(error);
            throw new Error('Error fetching registros');
        }finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async insert_tabla(registroDTO: Registro): Promise<boolean> {   
        let connetion;
        try {
            connetion = await pool.getConnection();
            await connetion.query("CALL sp_tabla_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [registroDTO.nom_ape,
                    registroDTO.idarea,
                    registroDTO.motivo,
                    registroDTO.osb,
                    registroDTO.fecha,
                    registroDTO.idatencion,
                    registroDTO.programa,
                    registroDTO.turno,
                    registroDTO.semestre,
                    registroDTO.tutor,
                    registroDTO.idusuario,
                    registroDTO.periodo_academico,
                    registroDTO.anio,
                    registroDTO.vigencia,
                    registroDTO.usuario_creacion,
                    registroDTO.fecha_creacion,
                    registroDTO.usuario_modificacion,
                    registroDTO.fecha_modificacion]);
            
            return true;
            
        } catch (error) {
            
            console.error(error);
            throw new Error('Error inserting registros');
        }finally {
            if (connetion) {
                connetion.release();
            }
        }
    }  
    
    public async insertTablaMultiple(jsonData: any[]): Promise<boolean> {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.query("CALL sp_tabla_insert_multiple(?)", [JSON.stringify(jsonData)]);
            return true;
        } catch (error) {
            console.error(error);
            throw new Error('Error inserting multiple registros');
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}
