import '../../../pages/css/css-sections/forms/form-validation-on-submit/wrapper/form-validation-on-submit-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-form-validation-on-submit-wrapper'
})
export class FormValidationOnSubmitComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFormValidationOnSubmitWrapper', elementRef, injector);
    }
}