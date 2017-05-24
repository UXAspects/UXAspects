import { EventEmitter } from '@angular/core';
export declare class FlippableCardComponent {
    direction: 'horizontal' | 'vertical';
    trigger: 'click' | 'hover' | 'manual';
    width: number;
    height: number;
    flipped: boolean;
    flippedChange: EventEmitter<boolean>;
    setFlipped(state: boolean): void;
    toggleFlipped(): void;
    private clickTrigger();
    private hoverEnter();
    private hoverExit();
}
export declare class FlippableCardFrontDirective {
}
export declare class FlippableCardBackDirective {
}
