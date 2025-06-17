import { Inicio_Sesion } from '../models/interface/inicio_sesion.interface';
import { InicioSesionRepository } from '../repositories/inicio_sesionRepository';

export class InicioSesionService {
    private inicioSesionRepository: InicioSesionRepository;

    constructor() {
        this.inicioSesionRepository = new InicioSesionRepository();
    }

    public async iniciarSesion(dni: string, password: string): Promise<Inicio_Sesion | null> {
        if (dni == "" || password == "") throw new Error("DNI o clave no pueden estar vacíos");
        const dni_rege = /^\d+$/;
        if (!dni_rege.test(dni)) throw new Error("El DNI debe contener solo números");
        if (dni.length != 8) throw new Error("DNI debe tener 8 caracteres");

        const usuario = await this.inicioSesionRepository.iniciarSesion(dni, password);

        if (usuario == null) throw new Error("Credenciales incorrectas");

        if (usuario.rol === "Docente") {
            if (usuario.vigencia === "NO") throw new Error(`Hola ${usuario.usua_datos}. Tu cuenta está inactiva.`);
            if (usuario.estado_sistema === "SC") throw new Error(`Hola ${usuario.usua_datos}. El sistema se encuentra cerrado temporalmente, pronto se activará para que puedas acceder.`);
            if (usuario.estado_matricula === "MA") throw new Error(`Hola ${usuario.usua_datos}. La matrícula se encuentra abierta y no podrás hacer registros hasta que se cierre para ver a los alumnos.`);

            if (usuario.programa === "NO ES DOCENTE") {
                throw new Error(`Hola ${usuario.usua_datos}. No estás asociado a un programa de estudio, por favor contacta al administrador.`);
            }
            if (usuario.turno === "NO ES TUTOR") {
                throw new Error(`Hola ${usuario.usua_datos}. No estás asignado como tutor en el sistema, por favor contacta al administrador.`);
            }
        }
        
        return usuario;
    }
}
