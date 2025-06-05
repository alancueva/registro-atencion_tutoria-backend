import { Router } from 'express';
import { ExcelController } from '../controllers/excel.controllers';
import cors from 'cors';

const router = Router();
const excelController = new ExcelController();


router.post('/export-excel', excelController.exportToExcel.bind(excelController));

export default router;