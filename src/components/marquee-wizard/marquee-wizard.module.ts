import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardModule } from '../wizard/index';
import { MarqueeWizardComponent } from './marquee-wizard.component';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { TooltipModule } from '../tooltip/index';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    imports: [
        CommonModule,
        WizardModule,
        TooltipModule,
        AccessibilityModule,
        A11yModule
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
