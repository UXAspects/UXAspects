import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, ColorPickerModule, FocusIfModule, IconModule, MenuModule, TableModule } from '@ux-aspects/ux-aspects';
import { ColorPickerTestPageComponent } from './color-picker.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ColorPickerModule,
        TableModule,
        FocusIfModule,
        AccessibilityModule,
        MenuModule,
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
