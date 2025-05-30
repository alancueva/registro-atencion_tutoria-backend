export interface Motivo{
    idmotivo: number;
    motivo: string;
    idarea: number;
    area: string;
    vigencia: string;
    usuario_creacion: string;
    fecha_creacion: Date;
    usuario_modificacion: string;
    fecha_modificacion: Date;
    usuario_baja: string;
    fecha_baja: Date;
}

export interface MotivoporArea {
    idMotivo: number;
    motivo: string;
}