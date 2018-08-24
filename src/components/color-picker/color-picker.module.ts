import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility';
import { NumberPickerModule } from '../number-picker';
import { TooltipModule } from '../tooltip';
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
