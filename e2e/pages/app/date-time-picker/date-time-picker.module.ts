import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateTimePickerModule } from '@ux-aspects/ux-aspects';
import { DateTimePickerTestPageComponent } from './date-time-picker.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        DateTimePickerModule,
        RouterModule.forChild([
            {
                path: '',
                component: DateTimePickerTestPageComponent
            }
        ])
    ],
    declarations: [DateTimePickerTestPageComponent]
})
export class DateTimePickerTestPageModule { }
