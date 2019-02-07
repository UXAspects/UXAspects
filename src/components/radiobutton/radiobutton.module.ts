import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { RadioButtonComponent } from './radiobutton.component';


@NgModule({
    imports: [
        AccessibilityModule,
        FormsModule
    ],
    exports: [
        RadioButtonComponent
    ],
    declarations: [
        RadioButtonComponent
    ]
})
export class RadioButtonModule { }
