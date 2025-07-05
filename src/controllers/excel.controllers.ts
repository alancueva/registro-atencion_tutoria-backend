import { Request, Response } from 'express';
import { ExcelUtils } from '../utils/excel.utils';
import { IExcelData } from '../models/interface/excel.interface';

export class ExcelController {
    public async exportToExcel(req: Request, res: Response): Promise<void> {
        try {
            // Check if body is empty
            if (!req.body || Object.keys(req.body).length === 0) {
                res.status(400).json({ error: 'Request body is empty' });
                return;
            }

            // Check if body is an array
            let data: IExcelData[];
            if (Array.isArray(req.body)) {
                data = req.body;
            } else {
                // Convert single object to array
                data = [req.body];
            }

            // Generate Excel file
            const excelBuffer = await ExcelUtils.exportToExcel(data);

            // Set headers
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=ExportedData.xlsx');

            // Send the file
            res.send(excelBuffer);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}