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

    public async insertMultipleRegistros(jsonData: any[]): Promise<boolean> {
        try {
            return await this.registroRepository.insertTablaMultiple(jsonData);
        } catch (error) {
            console.error(error);
            throw new Error('Error insertando múltiples registros');
        }
        
    }

}