import { Component, Input, Directive } from '@angular/core';

@Component({
    selector: 'ux-flippable-card',
    templateUrl: './flippable-card.component.html',
    host: {
        '[class.horizontal]': 'direction === "horizontal"',
        '[class.vertical]': 'direction === "vertical"',
        '(click)': 'clickTrigger()',
        '(mouseenter)': 'hoverEnter()',
        '(mouseleave)': 'hoverExit()'
    }
})
export class FlippableCardComponent {

    @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
    @Input() trigger: 'click' | 'hover' | 'manual' = 'hover';
    @Input() width: number = 280;
    @Input() height: number = 200;

    private flippedState: boolean = false;

    constructor() { }

    setFlippedState(isFlipped: boolean) {
        this.flippedState = isFlipped;
    }

    clickTrigger() {

        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click' && this.flippedState === false) {
            this.setFlippedState(true);
        } else if (this.trigger === 'click' && this.flippedState === true) {
            this.setFlippedState(false);
        }
    }

    hoverEnter() {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlippedState(true);
        }
    }

    hoverExit() {
        if (this.trigger === 'hover') {
            this.setFlippedState(false);
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
