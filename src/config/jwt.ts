import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import config from './config';

export interface TokenPayload extends JwtPayload {
    id: number | null;
    nombres?: string;
    dni?: string;
    rol?: string;
}

export class JWTService {


    // Generar token
    public static generarToken(payload: TokenPayload): string {
         if (!config.jwt.secret) {
            throw new Error('JWT_SECRET no está configurado en las variables de entorno');
        }

        /**
         * Opciones del token:
         * - expiresIn: Duración del token, puede ser un número (en segundos)
         *   o una cadena (como '1h' para 1 hora).
         * - issuer: Identificador del emisor del token.
         * - audience: Identificador del destinatario del token.
         *   Usamos el DNI como audience para identificar al usuario.
         */
        const options: SignOptions = {
            expiresIn: (config.jwt.expiresIn as jwt.SignOptions['expiresIn']) || '1h',
            issuer: config.app.name ,
            audience: payload.dni
        };

        return jwt.sign(payload, config.jwt.secret, options);
    }

    // Verificar token
    public static verificarToken(token: string): any {
        if (!config.jwt.secret) {
            throw new Error('JWT_SECRET no está configurado');
        }

        try {
            const secret: jwt.Secret = config.jwt.secret as jwt.Secret;
            return jwt.verify(token, secret) as JwtPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Token expirado');
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Token inválido');
            }
            throw new Error('Error al verificar el token');
        }
    }


    public static generarParejaTokens(payload: TokenPayload): {
        token: string;
        refreshToken: string;
    } {
        return {
            token: this.generarToken(payload),
            refreshToken: this.generarToken({
                ...payload,
                isRefreshToken: true,
                expiresIn: config.jwt.refreshExpiresIn
            })
        };
    }

    // Extraer datos del token sin verificar (útil para logging)
    public static decodificarToken(token: string): JwtPayload | null {
        return jwt.decode(token) as JwtPayload | null;
    }
}