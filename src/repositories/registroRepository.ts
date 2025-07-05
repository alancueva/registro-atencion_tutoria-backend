import pool from '../config/DatabaseConexion';
import { Registro, RegistroBusqueda, RegistroBusquedaDocente, RegistroResponse, TablaRegistro } from '../models/interface/registro.interface';

export class RegistroRepository {

    public async getRegistrosBusquedaDocente(registroDTO: RegistroBusquedaDocente): Promise<RegistroResponse[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_buscar_tabla_docente(?,?,?,?,?)",
                [registroDTO.id_usuario,
                registroDTO.anio,
                registroDTO.mes,
                registroDTO.area,
                registroDTO.atencion
                ]);

            return rows[0] as RegistroResponse[];

        } catch (error) {

            console.error(error);
            throw new Error('Error fetching registros');
        }
    }

    public async getRegistrosBusqueda(registroDTO: RegistroBusqueda): Promise<RegistroResponse[]> {
        try {
            const [rows]: any = await pool.query("CALL sp_buscar_tabla_admin(?,?,?,?,?)",
                [registroDTO.anio,
                registroDTO.mes,
                registroDTO.programa,
                registroDTO.area,
                registroDTO.atencion]);
            return rows[0] as RegistroResponse[];

        } catch (error) {

            console.error(error);
            throw new Error('Error fetching registros');
        }
    }

    public async insert_tabla_registro(tablaRegistro: TablaRegistro): Promise<boolean> {
        try {
            const alumnosJSON = JSON.stringify(tablaRegistro.alumnos);
            await pool.query("CALL sp_tabla_registro_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [tablaRegistro.idarea,
                tablaRegistro.area,
                tablaRegistro.motivo,
                tablaRegistro.osb,
                tablaRegistro.fecha,
                tablaRegistro.idatencion,
                tablaRegistro.atencion,
                tablaRegistro.programa,
                tablaRegistro.turno,
                tablaRegistro.semestre,
                tablaRegistro.tutor,
                alumnosJSON,
                tablaRegistro.idusuario,
                tablaRegistro.usuario_creacion]);
            return true;

        } catch (error) {
            console.error(error);
            throw new Error('Error inserting tabla registro: ' + error);
        }
    }

    public async insert_tabla(registroDTO: Registro): Promise<boolean> {
        try {
            await pool.query("CALL sp_tabla_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
        }
    }


    public async insertTablaMultiple(jsonData: any[]): Promise<boolean> {
        try {
            await pool.query("CALL sp_tabla_insert_multiple(?)", [JSON.stringify(jsonData)]);
            return true;
        } catch (error) {
            console.error(error);
            throw new Error('Error inserting multiple registros');
        }
    }
}
