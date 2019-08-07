import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { SpinButtonComponent } from './spin-button.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        FormsModule,
        IconModule,
    ],
    exports: [SpinButtonComponent],
    declarations: [SpinButtonComponent]
})
export class SpinButtonModule { }