export declare class FlippableCardComponent {
    direction: 'horizontal' | 'vertical';
    trigger: 'click' | 'hover' | 'manual';
    width: number;
    height: number;
    private flippedState;
    constructor();
    setFlippedState(isFlipped: boolean): void;
    clickTrigger(): void;
    hoverEnter(): void;
    hoverExit(): void;
}
export declare class FlippableCardFrontDirective {
}
export declare class FlippableCardBackDirective {
}
