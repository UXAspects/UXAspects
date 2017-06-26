import { NgModule } from '@angular/core';
import { PdfExportContainerComponent, PdfExportItemDirective, PdfExportBoxDirective } from './pdf-export-container.component';

const DECLARATIONS = [
    PdfExportContainerComponent,
    PdfExportItemDirective,
    PdfExportBoxDirective
];

@NgModule({
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class PdfExportModule {}