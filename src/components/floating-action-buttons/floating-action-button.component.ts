import { Component, Input, ChangeDetectionStrategy, HostBinding, HostListener, Attribute } from '@angular/core';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class FloatingActionButtonComponent {

    @Input() icon: string;    
    @HostBinding() tabindex = 1;
    
    primary: boolean = false;

    constructor(@Attribute('fab-primary') primary: string, public fab: FloatingActionButtonsService) {
        this.primary = primary !== null;
    }
}