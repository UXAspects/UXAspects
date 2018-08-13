import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusIfModule } from '../../directives/focus-if/focus-if.module';
import { ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective } from './item-display-panel.component';

const DECLARATIONS = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];

@NgModule({
    imports: [
        CommonModule,
        FocusIfModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class ItemDisplayPanelModule {}