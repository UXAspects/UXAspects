import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, ColorPickerModule, IconModule, TableModule } from '@ux-aspects/ux-aspects';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ColorPickerTestPageComponent } from './color-picker.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ColorPickerModule,
        TableModule,
        AccessibilityModule,
        BsDropdownModule,
        IconModule,
        RouterModule.forChild([
            {
                path: '',
                component: ColorPickerTestPageComponent
            }
        ])
    ],
    declarations: [ColorPickerTestPageComponent]
})
export class ColumnPickerTestPageModule { }
