import { Component, Directive, ContentChildren } from '@angular/core';


@Directive({
    selector: '[pdfExportItem]'
})
export class PdfExportItemDirective { }

@Component({
    selector: 'ux-pdf-export',
    templateUrl: './pdf-export.component.html'
})
export class PdfExportComponent { 
    
    items: any;

    test: any;

    testButton() {

        this.items = document.querySelectorAll('[PdfExportItem]');

        this.items.forEach((item: any) => {
            this.test += item.outerHTML;
        });
    }
}