import rateLimit from "express-rate-limit";
import { RequestHandler } from "express";

/**
 * Crea un middleware de limitación de velocidad.
 * @param opciones Configuración para el limitador.
 * @returns Middleware de limitación de velocidad.
 */
export const crearLimiter = (opciones: {
    ventanaMs: number;
    maxIntentos: number;
    mensaje?: string;
}): RequestHandler => {
    return rateLimit({
        windowMs: opciones.ventanaMs,
        max: opciones.maxIntentos,
        message: opciones.mensaje || 'Demasiadas solicitudes, por favor intenta, más tarde',
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: (req) => {
            return `${req.ip}_${req.originalUrl}`;
        }
    });
};


/**
 * Limita las solicitudes a 100 por minuto.
 * Utilizado para proteger rutas que no requieren autenticación.
 * Por ejemplo, rutas de inicio de sesión.
 */
export const loginLimiter = crearLimiter({
    ventanaMs: 60 * 1000,
    maxIntentos: 100,
    mensaje: JSON.stringify({
        success: false,
        message: 'Demasiados intentos de login. Por favor espera 1 minuto.'
    })
});

