import { Request, Response } from 'express';
import { InicioSesionService } from '../services/inicio_sesionService';
import { JWTService, TokenPayload } from '../config/jwt';

export class InicioSesionController {
    private inicioSesionService: InicioSesionService;

    constructor() {
        this.inicioSesionService = new InicioSesionService();
    }


    public async iniciarSesion(req: Request, res: Response): Promise<void> {
        try {
            const { dni, contrasena } = req.body;
            if (!dni || !contrasena) {
                res.status(400).json({
                    success: false,
                    message: 'DNI y contraseña son requeridos'
                });
                return;
            }
            const resultado = await this.inicioSesionService.iniciarSesion(dni, contrasena);

            const payload: TokenPayload = {
                id: resultado?.idusuario || null,
                nombres: resultado?.nombres,
                dni: resultado?.dni,
                rol: resultado?.rol
            };
            
            const tokens = JWTService.generarParejaTokens(payload);


            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: resultado,
                tokens: tokens
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error en el servidor'
            });
        }
    }



}

