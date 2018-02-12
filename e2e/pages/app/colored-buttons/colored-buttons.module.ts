import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColoredButtonsTestPageComponent } from './colored-buttons.testpage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ColoredButtonsTestPageComponent
            }
        ])
    ],
    declarations: [ColoredButtonsTestPageComponent]
})
export class ColoredButtonsTestPageModule { }
