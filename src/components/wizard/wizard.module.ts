import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/accessibility.module';
import { IconModule } from '../icon/index';
import { TooltipModule } from '../tooltip/index';
import { WizardStepComponent } from './wizard-step.component';
import { WizardComponent } from './wizard.component';

const DECLARATIONS = [
    WizardComponent,
    WizardStepComponent
];

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        IconModule,
        TooltipModule,
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class WizardModule { }
