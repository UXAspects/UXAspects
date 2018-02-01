import { IPdfService, PdfColumns, PdfOptions, PdfDocument } from './pdf.interface';
export declare class PdfService implements IPdfService {
    private _pdfService;
    constructor(_pdfService: IPdfService);
    createTable(columns: PdfColumns, rows: any[], options?: PdfOptions): PdfDocument;
}
