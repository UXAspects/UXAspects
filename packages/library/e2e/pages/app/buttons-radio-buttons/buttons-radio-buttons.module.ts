import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ButtonsRadioButtonsTestPageComponent } from './buttons-radio-buttons.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        ButtonsModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: ButtonsRadioButtonsTestPageComponent
            }
        ])
    ],
    declarations: [ButtonsRadioButtonsTestPageComponent]
})
export class ButtonsRadioButtonsTestPageModule { }
