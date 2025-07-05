import { RegistroRepository } from "../repositories/registroRepository";
import { Registro, RegistroBusqueda, RegistroBusquedaDocente, RegistroResponse } from '../models/interface/registro.interface';

export class RegistroService {
    private registroRepository: RegistroRepository;

    constructor() {
        this.registroRepository = new RegistroRepository();
    }

    public async getRegistrosBusquedaDocente(registroDTO: RegistroBusquedaDocente): Promise<RegistroResponse[]> {
        try {         
            return await this.registroRepository.getRegistrosBusquedaDocente(registroDTO);
        } catch (error) {        
            console.error(error);
            throw new Error('Error consulta registros docente');
        }
    }

    public async getRegistrosBusquedaAdmin(registroDTO: RegistroBusqueda): Promise<RegistroResponse[]> {
        try {
            return await this.registroRepository.getRegistrosBusqueda(registroDTO);
        } catch (error) {
            console.error(error);
            throw new Error('Error consulta registros admin');
        }
    }

    public async insertRegistro(registroDTO: Registro): Promise<boolean> {
        try {
            return await this.registroRepository.insert_tabla(registroDTO);
        } catch (error) {
            console.error(error);
            throw new Error('Error insertando registro');
        }
    }

    
    /**
     * Inserta múltiples registros en la base de datos ejecutando dos métodos del repositorio en paralelo.
     *
     * @param jsonData - Un arreglo de objetos que representa los registros a insertar en lote.
     * @param data - Un objeto que contiene los datos a insertar en la tabla principal de registro.
     * @returns Una promesa que resuelve a `true` si ambas operaciones de inserción tienen éxito, de lo contrario `false`.
     * @throws {Error} Lanza un error si alguna de las operaciones de inserción falla.
     */
    public async insertMultipleRegistros(jsonData: any[], data: any): Promise<boolean> {
        try {
            // Ejecutar ambos métodos en paralelo usando Promise.all
            const [b, b2] = await Promise.all([
                this.registroRepository.insert_tabla_registro(data),
                this.registroRepository.insertTablaMultiple(jsonData)
            ]);
            return b && b2;
        } catch (error) {
            console.error(error);
            throw new Error('Error insertando múltiples registros');
        }
    }

}