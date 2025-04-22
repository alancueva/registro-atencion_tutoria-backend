import { CryptoUtil } from '../utils/CryptoUtil';
import { Request, Response } from 'express';
export class CryptoController {
    
    public async encryptData(req: Request, res: Response): Promise<void> {
        try {
            const { data } = req.body;
            if (!data) {
                res.status(400).json({ error: 'Data is required' });
                return;
            }
            const encryptedData = await CryptoUtil.encrypt(data);

            res.status(200).json({ success: true, data: encryptedData });
        } catch (error) {
            res.status(500).json({ error: `Error encrypting data: ${error}` });
        }
    }

    public async decryptData(req: Request, res: Response): Promise<void> {
        try {
            const { encryptedData } = req.body;
            if (!encryptedData) {
                res.status(400).json({ error: 'Encrypted data is required' });
                return;
            }
            const decryptedData = await CryptoUtil.decrypt(encryptedData);
            res.status(200).json({ success: true, data: decryptedData });
        } catch (error) {
            res.status(500).json({ error: `Error decrypting data: ${error}` });
        }
    }
}