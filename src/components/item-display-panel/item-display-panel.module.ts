import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/focus-if.module';
import { IconModule } from '../icon/index';
import { ItemDisplayPanelComponent, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective } from './item-display-panel.component';

const DECLARATIONS = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        FocusIfModule,
        IconModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class ItemDisplayPanelModule { }