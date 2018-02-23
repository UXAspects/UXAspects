import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ToggleButtonTestPageComponent } from './toggle-button.testpage.component';

@NgModule({
    imports: [
        ButtonsModule.forRoot(),
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ToggleButtonTestPageComponent
            }
        ])
    ],
    declarations: [ToggleButtonTestPageComponent]
})
export class ToggleButtonTestPageModule { }
