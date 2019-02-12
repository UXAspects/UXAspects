import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { SpinButtonComponent } from './spin-button.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        FormsModule
    ],
    exports: [SpinButtonComponent],
    declarations: [SpinButtonComponent]
})
export class SpinButtonModule { }