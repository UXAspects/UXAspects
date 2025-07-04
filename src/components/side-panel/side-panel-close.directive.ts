import { Directive, HostListener, inject } from '@angular/core';
import { isKeyboardTrigger } from '../../common/index';
import { FocusIndicatorOriginService } from '../../directives/accessibility/index';
import { SidePanelService } from './side-panel.service';

@Directive({
    selector: '[uxSidePanelClose]',
    standalone: false
})
export class SidePanelCloseDirective {
    private readonly _service = inject(SidePanelService);

    private readonly _focusOrigin = inject(FocusIndicatorOriginService);

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent | KeyboardEvent): void {
        // determine the correct origin for the trigger event
        this._focusOrigin.setOrigin(isKeyboardTrigger(event) ? 'keyboard' : 'mouse');

        // close the side panel menu
        this._service.close();
    }
}