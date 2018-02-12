import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { WizardModule } from '../wizard/index';
import { MarqueeWizardComponent } from './marquee-wizard.component';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';

@NgModule({
    imports: [
        CommonModule,
        WizardModule,
        TooltipModule.forRoot()
    ],
    exports: [
        MarqueeWizardComponent,
        MarqueeWizardStepComponent
    ],
    declarations: [
        MarqueeWizardComponent,
        MarqueeWizardStepComponent
    ]
})
export class MarqueeWizardModule { }
