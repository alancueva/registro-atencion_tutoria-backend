import crypto from 'crypto';
import config from '../config/config';

export class CryptoUtil {

    /**
     * Cifra una cadena usando el algoritmo Triple DES y retorna el resultado en base64.
     * 
     * @param clave - Cadena de texto que se desea cifrar.
     * @returns Una promesa que resuelve con la cadena cifrada en formato base64.
     */
    public static async encrypt(clave: string): Promise<string> {
        const md5 = crypto.createHash('md5');
        const hash = md5.update(String(config.clave_hsh.md5)).digest();
        const key = Buffer.concat([hash, hash.slice(0, 8)]);
        const cipher = crypto.createCipheriv('des-ede3', key, null);
        cipher.setAutoPadding(true);
        let encrypted = cipher.update(clave, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

    /**
     * Descifra una cadena cifrada en base64 utilizando Triple DES y retorna el texto original.
     * 
     * @param encryptedKey - Cadena cifrada en formato base64 que se desea descifrar.
     * @returns Una promesa que resuelve con la cadena de texto descifrada.
     */
    public static async decrypt(encryptedKey: string): Promise<string> {
        const md5 = crypto.createHash('md5');
        const hash = md5.update(String(config.clave_hsh.md5)).digest();
        const key = Buffer.concat([hash, hash.slice(0, 8)]);
        const decipher = crypto.createDecipheriv('des-ede3', key, null);
        decipher.setAutoPadding(true);
        let decrypted = decipher.update(encryptedKey, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }





}