import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, FixedHeaderTableModule, VirtualScrollModule } from '@ux-aspects/ux-aspects';
import { VirtualForTestPageComponent } from './virtual-for.testpage.component';

@NgModule({
    imports: [
        AccessibilityModule,
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
