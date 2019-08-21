import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonGroupDirective } from './radio-button-group/radio-button-group.directive';

@NgModule({
    imports: [
        AccessibilityModule,
        FormsModule
    ],
    exports: [
        RadioButtonComponent,
        RadioButtonGroupDirective
    ],
    declarations: [
        RadioButtonComponent,
        RadioButtonGroupDirective
    ]
})
export class RadioButtonModule { }