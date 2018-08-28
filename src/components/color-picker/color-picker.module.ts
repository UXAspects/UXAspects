import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { NumberPickerModule } from '../number-picker/index';
import { TooltipModule } from '../tooltip/index';
import { ColorPickerComponent } from './color-picker.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        FormsModule,
        NumberPickerModule,
        TooltipModule,
    ],
    exports: [ColorPickerComponent],
    declarations: [ColorPickerComponent],
    providers: [],
})
export class ColorPickerModule { }
