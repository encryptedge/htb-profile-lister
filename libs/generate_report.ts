import fs from 'fs';
import converter from 'json-2-csv';

export function generateReport(data: any) {
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `reports/report-${date}.csv`;

    fs.writeFileSync(fileName, 
        converter.json2csv(data), 
        'utf8'
    );
}