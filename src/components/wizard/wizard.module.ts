import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizard-step.component';
import { TooltipModule } from '../tooltip/index';
import { AccessibilityModule } from '../../directives/accessibility/accessibility.module';

const DECLARATIONS = [
    WizardComponent,
    WizardStepComponent
];

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        AccessibilityModule,
        A11yModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class WizardModule { }
