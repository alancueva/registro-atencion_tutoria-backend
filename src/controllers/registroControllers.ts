import { RegistroService } from "../services/registroService";
import { Request, Response } from "express";
import { Registro, RegistroBusqueda, RegistroBusquedaDocente} from '../models/interface/registro.interface';

export class RegistroController {
    private registroService: RegistroService;

    constructor() {
        this.registroService = new RegistroService();
    }

    public async getRegistrosBusquedaDocente(req: Request, res: Response): Promise<void> {
        try {
            const registroDTO: RegistroBusquedaDocente = req.body;
            const registros = await this.registroService.getRegistrosBusquedaDocente(registroDTO);
            res.status(200).json({
                success: true,
                data: registros
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false,message: 'Error al obtener registros' });
        }
    }
    public async getRegistrosBusquedaAdmin(req: Request, res: Response): Promise<void> {
        try {
            const registroDTO: RegistroBusqueda = req.body;
            const registros = await this.registroService.getRegistrosBusquedaAdmin(registroDTO);
            res.status(200).json({
                success: true,
                data: registros
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener registros' });
        }
    }
    public async insertRegistro(req: Request, res: Response): Promise<void> {
        try {
            const registroDTO: Registro = req.body;
            const result = await this.registroService.insertRegistro(registroDTO);
            if (result) {
                res.status(200).json({ message: 'Registro insertado correctamente', result });
                
            } else {
                res.status(400).json({ message: 'No se pudo insertar el registro' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al insertar registro' });
        }
    }
    public async insertMultipleRegistros(req: Request, res: Response): Promise<void> {
        try {
            const tablaMultiple = req.body.tablaMultiple;
            const tablaFila = req.body.tablaFila;

            const result = await this.registroService.insertMultipleRegistros(tablaMultiple, tablaFila);
            if (result) {
                res.status(200).json({ success: result, message: 'Registros insertados correctamente' });
            } else {
                res.status(400).json({ success: result, message: 'No se pudo insertar los registros' });
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al insertar múltiples registros' });
        }
    }

}