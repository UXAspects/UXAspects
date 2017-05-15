import { ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective } from './item-display-panel.component';
import { NgModule, Input } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    exports: [ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective],
    declarations: [ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective]
})
export class ItemDisplayPanelModule {}