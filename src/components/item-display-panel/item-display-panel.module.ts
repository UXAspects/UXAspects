import { ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective } from './item-display-panel.component';
import { NgModule, Input } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

const DECLARATIONS = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];

@NgModule({
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class ItemDisplayPanelModule {}