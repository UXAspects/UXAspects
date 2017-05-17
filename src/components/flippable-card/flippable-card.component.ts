import { Component, Input, Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ux-flippable-card',
    templateUrl: './flippable-card.component.html',
    host: {
        '[class.horizontal]': 'direction === "horizontal"',
        '[class.vertical]': 'direction === "vertical"'
    },
    exportAs: 'ux-flippable-card'
})
export class FlippableCardComponent {

    @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
    @Input() trigger: 'click' | 'hover' | 'manual' = 'hover';
    @Input() width: number = 280;
    @Input() height: number = 200;
    @Input() flipped: boolean = false;
    @Output() flippedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    setFlipped(state: boolean) {
        this.flipped = state;
        this.flippedChange.emit(this.flipped);
    }

    toggleFlipped() {
        this.setFlipped(!this.flipped);
    }

    @HostListener('click')
    private clickTrigger() {

        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    }

    @HostListener('mouseenter')
    private hoverEnter() {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    }

    @HostListener('mouseleave')
    private hoverExit() {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    }
}


@Directive({
    selector: 'ux-flippable-card-front'
})
export class FlippableCardFrontDirective { }

@Directive({
    selector: 'ux-flippable-card-back'
})
export class FlippableCardBackDirective { }
