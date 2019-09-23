import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        AccessibilityModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class WizardModule { }
