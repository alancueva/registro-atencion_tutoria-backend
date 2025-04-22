import pool from '../config/DatabaseConexion'; // Asegúrate de que la ruta sea correcta
import { DashboardCantidadSesiones, DashboardConteoAdmin,DashboardConteoPorcentajeArea,DashboardDocenteSesiones } from '../models/interface/dashboard.interface';
export class DashboardRepository {

    public async getDashboardData(): Promise<DashboardConteoAdmin[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows]: any = await connetion.query("CALL sp_dashboard_conteo_cabecera_admin()");
            return rows[0].map((row: any) => ({
                n_alumnos: row.n_alumnos,
                n_docente: row.n_docente,
                n_tutor: row.n_tutor,
                n_sesiones: row.n_sesiones
            }));
        } catch (error) {
            throw new Error((error as Error).message);
        }finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async getDashboardCantidadSesiones(): Promise<DashboardCantidadSesiones[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows]: any = await connetion.query("CALL sp_dashboard_cantidad_sesiones()");
            return rows[0].map((row: any) => ({
                docente: row.docente,
                cantidad_registrada: row.cantidad_registrada,
                cantidad_sesiones: row.cantidad_sesiones
            }));
        } catch (error) {
            throw error;
        } finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async getDashboardConteoPorcentajeArea(): Promise<DashboardConteoPorcentajeArea[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows]: any = await connetion.query("CALL sp_dashboard_conteo_porcentaje_registro_tabla_area()");
            return rows[0].map((row: any) => ({
                area: row.area,
                registros: row.registros,
                Total_registros: row.Total_registros,
                Porcentaje: row.Porcentaje
            }));
        } catch (error) {
            throw error;
        } finally {
            if (connetion) {
                connetion.release();
            }
        }
    }

    public async getDashboardDocenteSesiones(idusuario: number): Promise<DashboardDocenteSesiones[]> {
        let connetion;
        try {
            connetion = await pool.getConnection();
            const [rows]: any = await connetion.query("CALL sp_dashboard_docente_cantidad_sesiones(?)", [idusuario]);
            return rows[0].map((row: any) => ({
                cantidad_registrada: row.cantidad_registrada,
                cantidad_sesiones: row.cantidad_sesiones,
                mes: row.mes,
                anio: row.anio,
                periodo_academico: row.periodo_academico
            }));
        } catch (error) {
            throw error;
        } finally {
            if (connetion) {
                connetion.release();
            }
        }
    }





}