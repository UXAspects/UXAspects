import { Directive, HostListener } from '@angular/core';
import { SidePanelService } from './side-panel.service';

@Directive({
    selector: '[uxSidePanelClose]'
})
export class SidePanelCloseDirective {

    constructor(private _service: SidePanelService) { }

    @HostListener('click')
    clickHandler() {
        this._service.close();
    }
}