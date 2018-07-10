import { Component, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-flippable-card',
    templateUrl: './flippable-card.component.html',
    host: {
        'tabindex': '0',
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

    setFlipped(state: boolean): void {
        this.flipped = state;
        this.flippedChange.emit(this.flipped);
    }

    toggleFlipped(): void {
        this.setFlipped(!this.flipped);
    }

    @HostListener('click')
    clickTrigger(): void {

        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    }

    @HostListener('mouseenter')
    hoverEnter(): void {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    }

    @HostListener('mouseleave')
    hoverExit(): void {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    }

    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (this.trigger !== 'manual') {
            this.toggleFlipped();
            event.preventDefault();
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