import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule, AccessibilityModule } from '@ux-aspects/ux-aspects';

import { CheckboxTestPageComponent } from './checkbox.testpage.component';

@NgModule({
    imports: [
        CheckboxModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: CheckboxTestPageComponent
            }
        ])
    ],
    declarations: [CheckboxTestPageComponent]
})
export class CheckboxTestPageModule { }
