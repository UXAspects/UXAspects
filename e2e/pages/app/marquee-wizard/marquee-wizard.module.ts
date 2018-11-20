import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarqueeWizardModule } from '@ux-aspects/ux-aspects';

import { MarqueeWizardTestPageComponent } from './marquee-wizard.testpage.component';

@NgModule({
    imports: [
        MarqueeWizardModule,
        RouterModule.forChild([
            {
                path: '',
                component: MarqueeWizardTestPageComponent
            }
        ])
    ],
    declarations: [MarqueeWizardTestPageComponent]
})
export class MarqueeWizardTestPageModule { }
