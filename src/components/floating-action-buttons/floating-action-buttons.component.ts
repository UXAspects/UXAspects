import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-buttons',
    templateUrl: './floating-action-buttons.component.html',
    providers: [FloatingActionButtonsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class FloatingActionButtonsComponent {

    @Input() icon: string;    
    @Input() direction: FloatingActionButtonDirection = 'top';

    constructor(public fab: FloatingActionButtonsService) {}

    /*
     * Detect any clicks to trigger close of the menu
     */
    @HostListener('document:mouseup') close(): void {
        this.fab.close();
    }
}

export type FloatingActionButtonDirection = 'top' | 'right' | 'bottom' | 'left';