import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective } from './item-display-panel.component';

const DECLARATIONS = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];

@NgModule({
    imports: [
        CommonModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class ItemDisplayPanelModule {}