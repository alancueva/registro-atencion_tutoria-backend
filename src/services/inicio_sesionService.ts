import { InicioSesionRepository } from '../repositories/inicio_sesionRepository';

export class InicioSesionService {
    private inicioSesionRepository: InicioSesionRepository;

    constructor() {
        this.inicioSesionRepository = new InicioSesionRepository();
    }

    public async iniciarSesion(dni: string, password: string) {
        if (dni == "" || password == "") throw new Error("DNI o clave no pueden estar vacíos");
        const dni_rege = /^\d+$/;
        if (!dni_rege.test(dni)) throw new Error("El DNI debe contener solo números");
        if (dni.length != 8) throw new Error("DNI debe tener 8 caracteres");

        const usuario = await this.inicioSesionRepository.iniciarSesion(dni, password);

        if (usuario == null) throw new Error("Credenciales incorrectas");
        if (usuario.vigencia === "NO") throw new Error(`Hola ${usuario.usua_datos}. Tu cuenta está inactiva.`);
        if (usuario.rol === "Docente") {
            if (usuario.programa === "NO ES DOCENTE") {
                throw new Error(`Hola ${usuario.usua_datos}. No estás asociado a un programa de estudio.`);
            }
            if (usuario.turno === "NO ES TUTOR") {
                throw new Error(`Hola ${usuario.usua_datos}. No estás asignado como tutor en el sistema.`);
            }
        }
        
        return usuario;
    }
}
