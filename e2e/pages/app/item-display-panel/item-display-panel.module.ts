import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule, ItemDisplayPanelModule, SparkModule } from '@ux-aspects/ux-aspects';
import { ItemDisplayPanelTestPageComponent } from './item-display-panel.testpage.component';


@NgModule({
    imports: [
        CommonModule,
        SparkModule,
        ItemDisplayPanelModule,
        IconModule,
        RouterModule.forChild([
            {
                path: '',
                component: ItemDisplayPanelTestPageComponent
            }
        ])
    ],
    declarations: [ItemDisplayPanelTestPageComponent]
})
export class ItemDisplayPanelTestPageModule { }
