import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CircularIconButtonsTestPageComponent } from './circular-icon-buttons.testpage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CircularIconButtonsTestPageComponent
            }
        ])
    ],
    declarations: [CircularIconButtonsTestPageComponent]
})
export class CircularIconButtonsTestPageModule { }
