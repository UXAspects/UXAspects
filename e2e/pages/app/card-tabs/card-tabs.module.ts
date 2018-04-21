import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardTabsModule } from '../../../../dist';
import { CardTabsTestPageComponent } from './card-tabs.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        CardTabsModule,
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
