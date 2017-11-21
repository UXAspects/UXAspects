import '../../../pages/css/css-sections/forms/form-validation-field-by-field/wrapper/form-validation-field-by-field-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-form-validation-field-by-field-wrapper'
})
export class FormValidationFieldByFieldComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFormValidationFieldByFieldWrapper', elementRef, injector);
    }
}