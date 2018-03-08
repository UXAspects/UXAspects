import { Component, Input, ChangeDetectionStrategy, HostBinding, HostListener, Attribute } from '@angular/core';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
import { trigger, state, style, transition, animate, query } from '@angular/animations';

@Component({
    selector: 'ux-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    animations: [
        trigger('fabAnimation', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('500ms ease-in')),
            transition('active => inactive', animate('500ms ease-out'))
        ])
    ]
})
export class FloatingActionButtonComponent {

    @Input() icon: string;
    @HostBinding() tabindex = 1;

    primary: boolean = false;

    constructor(@Attribute('fab-primary') primary: string, public fab: FloatingActionButtonsService) {
        this.primary = primary !== null;
    }

    @HostListener('click') click(): void {
        if (this.primary) {
            this.fab.open();
        }
    }

    @HostListener('keydown.enter') select(): void {
        if (this.primary) {
            this.fab.toggle();
        } else {
            this.fab.close();
        }
    }
}