import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ColumnPickerTestPageComponent } from './column-picker.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: ColumnPickerTestPageComponent
            }
        ])
    ],
    declarations: [ColumnPickerTestPageComponent]
})
export class ColumnPickerTestPageModule { }
