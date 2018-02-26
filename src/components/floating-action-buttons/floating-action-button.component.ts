import { Component, Input, Attribute, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingActionButtonComponent {
    
    primary: boolean = false;

    constructor(@Attribute('fab-primary') primary: string, private _fabService: FloatingActionButtonsService) {
        this.primary = primary !== null;
    }

    expand(): void {
        if (this.primary) {
            this._fabService.open();
        }
    }
}