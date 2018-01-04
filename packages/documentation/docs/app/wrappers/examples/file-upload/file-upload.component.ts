import '../../../pages/components/components-sections/file-upload/file-upload-ng1/wrapper/file-upload-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-file-upload-wrapper'
})
export class FileUploadComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFileUploadWrapper', elementRef, injector);
    }
}