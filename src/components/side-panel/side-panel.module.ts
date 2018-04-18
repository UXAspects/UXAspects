import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidePanelComponent } from './side-panel.component';
import { SidePanelCloseDirective } from './side-panel-close.directive';

const EXPORTS = [
    SidePanelComponent,
    SidePanelCloseDirective
];

@NgModule({
    imports: [
        CommonModule
    ],
    exports: EXPORTS,
    declarations: EXPORTS
})
export class SidePanelModule { }
