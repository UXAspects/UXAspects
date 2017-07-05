import { NgModule } from '@angular/core';
import { PdfExportItemDirective } from './pdf-export-item.component';
import { PdfExportService } from './pdf-export.service';

const DECLARATIONS = [
    PdfExportItemDirective
];

@NgModule({
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
    providers: [PdfExportService]
})
export class PdfExportModule {}