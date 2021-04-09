import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, ColorServiceModule, IconModule, PartitionMapModule, PopoverModule } from '@ux-aspects/ux-aspects';
import { PartitionMapTestPageComponent } from './partition-map.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        PartitionMapModule,
        ColorServiceModule,
        CommonModule,
        IconModule,
        PopoverModule,
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
