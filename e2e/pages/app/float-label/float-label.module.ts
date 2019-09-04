import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule, IconModule, RadioButtonModule } from '@ux-aspects/ux-aspects';
import { FloatLabelTestPageComponent } from './float-label.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconModule,
        RouterModule.forChild([{
            path: '',
            component: FloatLabelTestPageComponent
        }]),
        FloatLabelModule,
        RadioButtonModule,
    ],
    declarations: [FloatLabelTestPageComponent],
})
export class FloatLabelTestPageModule { }
