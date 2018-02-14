import { Injector } from '@angular/core';
import { IPdfService, PdfColumns, PdfOptions, PdfDocument } from './pdf.interface';
export declare class PdfService implements IPdfService {
    private _pdfService;
    constructor(_pdfService: IPdfService);
    createTable(columns: PdfColumns, rows: any[], options?: PdfOptions): PdfDocument;
}
export declare function pdfServiceFactory(injector: Injector): any;
export declare const pdfServiceProvider: {
    provide: string;
    useFactory: (injector: Injector) => any;
    deps: string[];
};
