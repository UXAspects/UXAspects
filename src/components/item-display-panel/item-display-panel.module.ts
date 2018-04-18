import { CommonModule } from '@angular/common';
import { ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective } from './item-display-panel.component';
import { NgModule, Input } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidePanelModule } from '../..';

const DECLARATIONS = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];

@NgModule({
    imports: [
        CommonModule,
        SidePanelModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class ItemDisplayPanelModule {}