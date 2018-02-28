import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class FloatingActionButtonComponent {

    @Input() icon: string;
    
    constructor(public fab: FloatingActionButtonsService) { }
}