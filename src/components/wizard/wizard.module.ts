import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizard-step.component';
import { TooltipModule } from '../tooltip/index';

const DECLARATIONS = [
    WizardComponent,
    WizardStepComponent
];

@NgModule({
    imports: [
        CommonModule,
        TooltipModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class WizardModule { }
