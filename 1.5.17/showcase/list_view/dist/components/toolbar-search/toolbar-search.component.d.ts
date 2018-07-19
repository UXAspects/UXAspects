import { AnimationEvent } from '@angular/animations';
import { AfterContentInit, ElementRef, EventEmitter } from '@angular/core';
import { ColorService } from '../../services/color/color.service';
import { ToolbarSearchButtonDirective } from './toolbar-search-button.directive';
import { ToolbarSearchFieldDirective } from './toolbar-search-field.directive';
export declare class ToolbarSearchComponent implements AfterContentInit {
    private _elementRef;
    private _colorService;
    private _document;
    expanded: boolean;
    direction: 'left' | 'right';
    inverse: boolean;
    background: string;
    expandedChange: EventEmitter<boolean>;
    search: EventEmitter<string>;
    private _expanded;
    readonly expandedAnimation: any;
    position: string;
    backgroundColor: string;
    field: ToolbarSearchFieldDirective;
    button: ToolbarSearchButtonDirective;
    private _placeholder;
    constructor(_elementRef: ElementRef, _colorService: ColorService, _document: any);
    ngAfterContentInit(): void;
    animationStart(event: AnimationEvent): void;
    animationDone(event: AnimationEvent): void;
    private createPlaceholder();
    private enablePlaceholder(enabled);
}
