import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule, NumberPickerModule, MarqueeWizardModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { MarqueeWizardTestPageComponent } from './marquee-wizard.testpage.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        IconModule,
        MarqueeWizardModule,
        NumberPickerModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: MarqueeWizardTestPageComponent
            }
        ]),
        CommonModule,
    ],
    declarations: [MarqueeWizardTestPageComponent]
})
export class MarqueeWizardTestPageModule { }
