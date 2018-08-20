import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip';
import { ColorPickerComponent } from './color-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule
    ],
    exports: [ColorPickerComponent],
    declarations: [ColorPickerComponent],
    providers: [],
})
export class ColorPickerModule { }
