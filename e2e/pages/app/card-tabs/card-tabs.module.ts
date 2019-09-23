import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardTabsModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { CardTabsTestPageComponent } from './card-tabs.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        CardTabsModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: CardTabsTestPageComponent
            }
        ])
    ],
    declarations: [CardTabsTestPageComponent]
})
export class CardTabsTestPageModule { }
