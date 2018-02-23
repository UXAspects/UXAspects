import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardModule } from '../../../../dist';

import { WizardTestPageComponent } from './wizard.testpage.component';

@NgModule({
    imports: [
        WizardModule,
        RouterModule.forChild([
            {
                path: '',
                component: WizardTestPageComponent
            }
        ])
    ],
    declarations: [WizardTestPageComponent]
})
export class WizardTestPageModule { }
