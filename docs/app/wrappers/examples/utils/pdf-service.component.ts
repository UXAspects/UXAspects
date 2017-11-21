import '../../../pages/components/components-sections/utilities/pdf-service-ng1/wrapper/pdf-service-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-pdf-service-wrapper'
})
export class PdfServiceComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdPdfServiceWrapper', elementRef, injector);
    }
}