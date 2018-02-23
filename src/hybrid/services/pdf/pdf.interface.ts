export interface IPdfService {
    createTable(columns: PdfColumns, rows: any[], options: PdfOptions): PdfDocument;
}

export interface PdfDocument {
    download(filename: string): void;
}

export interface PdfColumns {
    title: string;
    value: string | Function;
    width: string;
}

export interface PdfOptions {
    pageSize?: string;
    pageOrientation?: 'portrait' | 'landscape';
    pageMargins?: [number, number, number, number];
    metadata?: {
        title?: string;
        author?: string;
        subject?: string;
        keywords?: string;
    };
}