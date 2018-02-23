import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { VirtualScrollModule, CheckboxModule } from '../../../../dist';

import { VirtualScrollTestPageComponent } from './virtual-scroll.testpage.component';

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CheckboxModule,
        VirtualScrollModule,
        RouterModule.forChild([
            {
                path: '',
                component: VirtualScrollTestPageComponent
            }
        ])
    ],
    declarations: [VirtualScrollTestPageComponent]
})
export class VirtualScrollTestPageModule { }
