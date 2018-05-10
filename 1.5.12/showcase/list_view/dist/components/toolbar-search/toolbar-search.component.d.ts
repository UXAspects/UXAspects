import { AfterContentInit, EventEmitter, ElementRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { ColorService } from '../../services/color/color.service';
export declare class ToolbarSearchComponent implements AfterContentInit {
    private _elementRef;
    private _colorService;
    expanded: boolean;
    direction: 'left' | 'right';
    inverse: boolean;
    background: string;
    expandedChange: EventEmitter<boolean>;
    search: EventEmitter<string>;
    private _expanded;
    private readonly _expandedAnimation;
    private _position;
    private _backgroundColor;
    private _field;
    private _button;
    private _placeholder;
    private _document;
    constructor(_elementRef: ElementRef, _colorService: ColorService, document: any);
    ngAfterContentInit(): void;
    animationStart(event: AnimationEvent): void;
    animationDone(event: AnimationEvent): void;
    private createPlaceholder();
    private enablePlaceholder(enabled);
}
