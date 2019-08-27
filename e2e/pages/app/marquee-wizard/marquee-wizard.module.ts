import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule, MarqueeWizardModule } from '@ux-aspects/ux-aspects';
import { MarqueeWizardTestPageComponent } from './marquee-wizard.testpage.component';


@NgModule({
    imports: [
        IconModule,
        MarqueeWizardModule,
        RouterModule.forChild([
            {
                path: '',
                component: MarqueeWizardTestPageComponent
            }
        ])
    ],
    declarations: [MarqueeWizardTestPageComponent]
})
export class MarqueeWizardTestPageModule { }
