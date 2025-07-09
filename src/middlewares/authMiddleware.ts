import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../config/jwt';

// Extender la interfaz Request de Express para incluir el campo usuario
// Esto permite que el middleware autenticar pueda agregar información del usuario al objeto Request
// y que otros middlewares o controladores puedan acceder a ella sin errores de tipo.
declare module 'express' {
    interface Request {
        usuario?: any;
    }
}

/**
 * Middleware para autenticar usuarios mediante JWT.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @param next - Función para pasar al siguiente middleware.
 * Este middleware verifica la presencia de un token JWT en el encabezado Authorization.
 * Si el token es válido, decodifica la información del usuario y la agrega al objeto Request.
 * Si el token no es válido o ha expirado, devuelve un error 401 (Unauthorized) o 403 (Forbidden).
 * Si no se proporciona un token, devuelve un error 401 (Unauthorized).
 */
export const autenticar = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
             res.status(401).json({
                success: false,
                message: 'Acceso no autorizado. Token requerido.'
            });
            return;
        }

        const decoded = JWTService.verificarToken(token);
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Error en autenticación:', error);

        let statusCode = 401;
        let errorCode = 'TOKEN_INVALIDO';
        let message = 'Token inválido';

        if (error instanceof Error) {
            if (error.message.includes('expirado')) {
                statusCode = 403;
                errorCode = 'TOKEN_EXPIRADO';
                message = 'Token expirado. Por favor inicie sesión nuevamente';
            }
        }

        res.status(statusCode).json({
            success: false,
            message: message,
            errorCode: errorCode
        });
    }
};


/**
 * 
 * @param rolesPermitidos Lista de roles permitidos para acceder al recurso.
 * Este middleware verifica si el usuario autenticado tiene uno de los roles permitidos.
 * Si el usuario no tiene un rol permitido, se devuelve un error 403 (Forbidden).
 * El rol 'admin' siempre tiene acceso, aunque no esté en la lista de rolesPermitidos.
 */
export const autorizar = (...rolesPermitidos: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (
            !req.usuario ||
            !(rolesPermitidos.includes(req.usuario.rol) || req.usuario.rol === 'admin')
        ) {
            res.status(403).json({
                success: false,
                message: 'No tienes permisos para acceder a este recurso',
                errorCode: 'ACCESO_NO_AUTORIZADO'
            });
            return; 
        }
        next();
    };
};