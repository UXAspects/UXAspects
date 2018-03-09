import { Component, Input, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

import { FloatingActionButtonComponent } from './floating-action-button.component';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-buttons',
    templateUrl: './floating-action-buttons.component.html',
    providers: [FloatingActionButtonsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    animations: [
        trigger('fabAnimation', [
            transition('void => true', [
                query('ux-floating-action-button', style({ opacity: 0 })),
                query('ux-floating-action-button', stagger(50, animate(250, style({ opacity: 1 }))))
            ]),
            transition('true => void', [
                query('ux-floating-action-button', stagger(-50, animate(250, style({ opacity: 0 }))))
            ])
        ])
    ]
})
export class FloatingActionButtonsComponent {

    @Input() direction: FloatingActionButtonDirection = 'top';

    constructor(public fab: FloatingActionButtonsService, private _elementRef: ElementRef) { }

    /*
     * Detect any clicks to trigger close of the menu
     */
    @HostListener('document:click', ['$event.target']) close(target: HTMLElement): void {
        if (!this._elementRef.nativeElement.contains(target)) {
            this.fab.close();
        }
    }
}

export type FloatingActionButtonDirection = 'top' | 'right' | 'bottom' | 'left';