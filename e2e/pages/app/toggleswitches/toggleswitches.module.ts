import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToggleSwitchModule } from '@ux-aspects/ux-aspects';

import { ToggleSwitchesTestPageComponent } from './toggleswitches.testpage.component';

@NgModule({
    imports: [
        ToggleSwitchModule,
        RouterModule.forChild([
            {
                path: '',
                component: ToggleSwitchesTestPageComponent
            }
        ])
    ],
    declarations: [ToggleSwitchesTestPageComponent]
})
export class ToggleSwitchesTestPageModule { }
