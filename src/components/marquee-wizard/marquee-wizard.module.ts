import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { TooltipModule } from '../tooltip/index';
import { WizardModule } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardComponent } from './marquee-wizard.component';


@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        IconModule,
        TooltipModule,
        WizardModule,
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
