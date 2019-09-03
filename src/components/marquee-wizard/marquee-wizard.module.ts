import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { TooltipModule } from '../tooltip/index';
import { WizardModule } from '../wizard/index';
import { MarqueeWizardStepIconDirective } from './marquee-wizard-step-icon.directive';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardComponent } from './marquee-wizard.component';
import { AngularSplitModule } from 'angular-split';


@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        IconModule,
        TooltipModule,
        WizardModule,
        AngularSplitModule,
    ],
    exports: [
        MarqueeWizardComponent,
        MarqueeWizardStepComponent,
        MarqueeWizardStepIconDirective
    ],
    declarations: [
        MarqueeWizardComponent,
        MarqueeWizardStepComponent,
        MarqueeWizardStepIconDirective
    ]
})
export class MarqueeWizardModule { }
