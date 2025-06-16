export interface PeriodoAcademico {
    idperiodo_academico: number;
    num_mes_inicio: number;
    num_mes_fin: number;
    mes_inicio: string;
    mes_fin: string;
    estado_matricula: string;
    estado_sistema: string;
    periodo_academico: string;
}

export interface PeriodoAcademicoInsert {
    mes_inicio: number;
    mes_fin: number;
    estado_matricula: string;
    estado_sistema: string;
    periodo_academico: string;
}

export interface PeriodoAcademicoUpdate extends PeriodoAcademicoInsert {
    idperiodo_academico: number;
}