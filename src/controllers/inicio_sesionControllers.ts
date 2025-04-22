import { Request, Response } from 'express';
import { InicioSesionService } from '../services/inicio_sesionService';

export class InicioSesionController {
    private inicioSesionService: InicioSesionService;

    constructor(){
        this.inicioSesionService = new InicioSesionService();
    }


    public async iniciarSesion (req: Request, res: Response) {
        try {
            const { dni, contrasena } = req.body;
            const resultado = await this.inicioSesionService.iniciarSesion(dni, contrasena);
            res.status(200).json({ 
                success: true,
                message: 'Inicio de sesión exitoso', 
                data: resultado 
            });
        } catch (error) {
            if (error instanceof Error) {
                // Handle specific error cases
                if (error.message.includes('DNI') || 
                    error.message.includes('Credenciales incorrectas') || 
                    error.message.includes('cuenta está inactiva') ||
                    error.message.includes('asociado a un programa') ||
                    error.message.includes('asignado como tutor')) {
                    
                    return res.status(400).json({ 
                        success: false,
                        message: error.message 
                    });
                }
            }else{
                res.status(500).json({ mensaje: 'Error en el servidor', error });

            }


        }
    }



}

