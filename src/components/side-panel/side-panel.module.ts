import { NgModule } from '@angular/core';

import { SidePanelComponent } from './side-panel.component';
import { SidePanelCloseDirective } from './side-panel-close.directive';
import { SidePanelService } from './side-panel.service';

const EXPORTS = [
    SidePanelComponent,
    SidePanelCloseDirective
];

@NgModule({
    imports: [],
    exports: EXPORTS,
    declarations: EXPORTS,
    providers: [SidePanelService]
})
export class SidePanelModule { }
