import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FixedHeaderTableModule, VirtualScrollModule } from '@ux-aspects/ux-aspects';
import { VirtualForTestPageComponent } from './virtual-for.testpage.component';

@NgModule({
    imports: [
        VirtualScrollModule,
        FixedHeaderTableModule,
        RouterModule.forChild([
            {
                path: '',
                component: VirtualForTestPageComponent
            }
        ])
    ],
    declarations: [VirtualForTestPageComponent]
})
export class VirtualForTestPageModule { }
