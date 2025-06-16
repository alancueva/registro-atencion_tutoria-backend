export interface DashboardConteoAdmin {
    n_periodo: String;
    n_alumnos: number;
    n_docente: number;
    n_tutor: number;
    n_sesiones: number;
}

export interface DashboardCantidadSesiones {
    docente: string;
    cantidad_registrada: number;
    cantidad_sesiones: number;
}

export interface DashboardConteoPorcentajeArea {
    area: string;
    registros: number;
    Total_registros: number;
    Porcentaje: number;
}

export interface DashboardDocenteSesiones {
    cantidad_registrada: number;
    cantidad_sesiones: number;
    mes: string;
    anio: number;
    periodo_academico: string;
}