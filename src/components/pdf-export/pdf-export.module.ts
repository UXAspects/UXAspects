import { NgModule } from '@angular/core';
import { PdfExportContainerComponent, PdfExportItemDirective } from './pdf-export-container.component';

const DECLARATIONS = [
    PdfExportContainerComponent,
    PdfExportItemDirective
];

@NgModule({
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class PdfExportModule {}