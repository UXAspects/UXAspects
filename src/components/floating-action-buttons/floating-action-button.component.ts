import { Component, Input, ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core';
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
    
    constructor(public fab: FloatingActionButtonsService) { }

    @HostListener('keydown.enter') select(): void {
        this.fab.close();
    }
}