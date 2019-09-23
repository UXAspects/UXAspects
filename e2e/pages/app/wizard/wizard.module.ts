import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { WizardTestPageComponent } from './wizard.testpage.component';


@NgModule({
    imports: [
        CommonModule,
        WizardModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: WizardTestPageComponent
            }
        ])
    ],
    declarations: [WizardTestPageComponent]
})
export class WizardTestPageModule { }
