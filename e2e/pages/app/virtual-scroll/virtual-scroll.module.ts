import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VirtualScrollModule, CheckboxModule, AccordionModule } from '@ux-aspects/ux-aspects';
import { VirtualScrollTestPageComponent } from './virtual-scroll.testpage.component';

@NgModule({
    imports: [
        AccordionModule,
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
