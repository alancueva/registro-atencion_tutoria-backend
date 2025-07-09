import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Envuelve funciones async de rutas para capturar errores automáticamente.
 * Así puedes evitar múltiples bloques try/catch.
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };