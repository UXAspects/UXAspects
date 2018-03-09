import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizard-step.component';

const DECLARATIONS = [
    WizardComponent,
    WizardStepComponent
];

@NgModule({
    imports: [
        CommonModule,
        TooltipModule.forRoot()
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class WizardModule { }
