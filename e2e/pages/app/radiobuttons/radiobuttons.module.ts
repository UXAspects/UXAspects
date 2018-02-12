import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RadioButtonModule } from '../../../../dist';

import { RadioButtonsTestPageComponent } from './radiobuttons.testpage.component';

@NgModule({
    imports: [
        RadioButtonModule,
        RouterModule.forChild([
            {
                path: '',
                component: RadioButtonsTestPageComponent
            }
        ])
    ],
    declarations: [RadioButtonsTestPageComponent]
})
export class RadioButtonsTestPageModule { }
