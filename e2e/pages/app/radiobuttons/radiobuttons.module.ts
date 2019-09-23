import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RadioButtonModule, AccessibilityModule } from '@ux-aspects/ux-aspects';

import { RadioButtonsTestPageComponent } from './radiobuttons.testpage.component';

@NgModule({
    imports: [
        RadioButtonModule,
        AccessibilityModule,
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
