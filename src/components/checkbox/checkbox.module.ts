import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { CheckboxComponent } from './checkbox.component';


@NgModule({
    imports: [
        AccessibilityModule,
        FormsModule
    ],
    exports: [
        CheckboxComponent
    ],
    declarations: [
        CheckboxComponent
    ]
})
export class CheckboxModule { }
