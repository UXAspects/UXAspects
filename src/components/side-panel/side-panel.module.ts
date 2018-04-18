import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidePanelComponent } from './side-panel.component';
import { SidePanelCloseDirective } from './side-panel-close.directive';
import { SidePanelService } from './side-panel.service';

const EXPORTS = [
    SidePanelComponent,
    SidePanelCloseDirective
];

@NgModule({
    imports: [
        CommonModule
    ],
    exports: EXPORTS,
    declarations: EXPORTS,
    providers: [SidePanelService]
})
export class SidePanelModule { }
