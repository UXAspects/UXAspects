import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, ColorServiceModule, PartitionMapModule } from '@ux-aspects/ux-aspects';
import { PartitionMapTestPageComponent } from './partition-map.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        PartitionMapModule,
        ColorServiceModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: PartitionMapTestPageComponent
            }
        ])
    ],
    declarations: [PartitionMapTestPageComponent]
})
export class PartitionMapTestPageModule { }
