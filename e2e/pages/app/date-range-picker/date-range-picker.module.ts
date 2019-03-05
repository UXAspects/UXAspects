import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, DateRangePickerModule } from '@ux-aspects/ux-aspects';
import { DateRangePickerTestPageComponent } from './date-range-picker.testpage.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        DateRangePickerModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: DateRangePickerTestPageComponent
            }
        ])
    ],
    declarations: [DateRangePickerTestPageComponent]
})
export class DateRangePickerTestPageModule { }
