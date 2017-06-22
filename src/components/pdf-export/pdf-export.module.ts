import { NgModule } from '@angular/core';
import { PdfExportComponent, PdfExportItemDirective } from './pdf-export.component';

const DECLARATIONS = [
    PdfExportComponent,
    PdfExportItemDirective
];

@NgModule({
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class PdfExportModule {}