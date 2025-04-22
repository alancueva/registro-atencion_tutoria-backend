import ExcelJS from 'exceljs';

export class ExcelUtils {
    public static async exportToExcel(data: any[]): Promise<ArrayBuffer> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Add headers
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            worksheet.addRow(headers);

            // Add data
            data.forEach(item => {
                const row: any[] = [];
                headers.forEach(header => {
                    row.push(item[header]);
                });
                worksheet.addRow(row);
            });

            // Style the header
            const headerRow = worksheet.getRow(1);
            headerRow.eachCell(cell => {
                cell.font = { bold: true };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });

            // Style the data rows
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const row = worksheet.getRow(i);
                row.eachCell(cell => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            }

            // Auto fit columns
            worksheet.columns.forEach(column => {
                if (column.values) {
                    const lengths = column.values.map(v => v ? v.toString().length : 0);
                    const maxLength = Math.max(...lengths.filter(v => typeof v === 'number')) + 2;
                    column.width = maxLength;
                }
            });
        }

        // Convert to buffer
        return await workbook.xlsx.writeBuffer();
    }
}