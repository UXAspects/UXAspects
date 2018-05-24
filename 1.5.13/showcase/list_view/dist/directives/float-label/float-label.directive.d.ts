import { OnInit, Renderer2, OnDestroy, OnChanges, ElementRef } from '@angular/core';
export declare class FloatLabelDirective implements OnInit, OnChanges, OnDestroy {
    private _elementRef;
    private _renderer;
    input: HTMLInputElement;
    value: any;
    mode: 'focus' | 'input';
    raised: boolean;
    private _focused;
    private _eventHandles;
    constructor(_elementRef: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    private hasText();
    private inputFocus(event);
    private inputBlur(event);
    private inputChange(event);
}
