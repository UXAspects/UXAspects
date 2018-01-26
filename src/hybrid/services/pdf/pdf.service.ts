import { Injectable, Inject } from '@angular/core';
import { IPdfService, PdfColumns, PdfOptions, PdfDocument } from './pdf.interface';

@Injectable()
export class PdfService implements IPdfService {
    
    constructor(@Inject('$pdf') private _pdfService: IPdfService) { }
    
    createTable(columns: PdfColumns, rows: any[], options: PdfOptions = {}): PdfDocument {
        return this._pdfService.createTable(columns, rows, options);
    }
}