import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatingActionButtonsModule } from '@ux-aspects/ux-aspects';

import { FloatingActionButtonsTestPageComponent } from './floating-action-buttons.testpage.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FloatingActionButtonsModule,
        RouterModule.forChild([{
            path: '',
            component: FloatingActionButtonsTestPageComponent
        }])
    ],
    declarations: [FloatingActionButtonsTestPageComponent],
})
export class FloatingActionButtonsTestPageModule {

}
