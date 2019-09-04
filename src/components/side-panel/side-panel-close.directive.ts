import { Directive, HostListener } from '@angular/core';
import { isKeyboardTrigger } from '../../common/index';
import { FocusIndicatorOriginService } from '../../directives/accessibility/index';
import { SidePanelService } from './side-panel.service';

@Directive({
    selector: '[uxSidePanelClose]'
})
export class SidePanelCloseDirective {

    constructor(
        private readonly _service: SidePanelService,
        private readonly _focusOrigin: FocusIndicatorOriginService
    ) { }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent | KeyboardEvent): void {
        // determine the correct origin for the trigger event
        this._focusOrigin.setOrigin(isKeyboardTrigger(event) ? 'keyboard' : 'mouse');

        // close the side panel menu
        this._service.close();
    }
}