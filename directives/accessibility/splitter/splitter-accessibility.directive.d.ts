import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { SplitAreaDirective, SplitComponent } from 'angular-split';
export declare class SplitterAccessibilityDirective implements AfterViewInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _platform;
    private _splitter;
    /** Emit an event whenever the gutter is moved using the keyboard */
    gutterKeydown: EventEmitter<KeyboardEvent>;
    /** Find all the split areas */
    areas: QueryList<SplitAreaDirective>;
    /** Store all the gutter elements */
    private _gutters;
    /** Watch for gutters being added or removed */
    private _observer;
    /** Teardown our observables on destroy */
    private _onDestroy;
    constructor(_elementRef: ElementRef<HTMLElement>, _renderer: Renderer2, _platform: string, _splitter: SplitComponent);
    /** Once initialised make the gutters accessible */
    ngAfterViewInit(): void;
    /** Destroy all observables and observers */
    ngOnDestroy(): void;
    /** We should focus the gutter when it is clicked */
    onClick(event: MouseEvent): void;
    /** Find all the gutters and set their attributes */
    private onGutterChange();
    /** Get all the gutter elements */
    private getGutters();
    /** Set the appropriate attributes on the gutter elements */
    private setGutterAttributes();
    /** Apply the aria attribute values */
    private updateGutterAttributes();
    /** Apply the value now aria attribute */
    private setGutterValueNow(gutter, index);
    /** Apply the value min aria attribute */
    private setGutterValueMin(gutter, index);
    /** Apply the value max aria attribute */
    private setGutterValueMax(gutter, index);
    onKeydown(event: KeyboardEvent): void;
    onIncreaseKey(event: KeyboardEvent): void;
    onDecreaseKey(event: KeyboardEvent): void;
    onHomeKey(event: KeyboardEvent): void;
    onEndKey(event: KeyboardEvent): void;
    /** Determine if an element is a gutter */
    private isSplitterGutter(element);
    /** Update the gutter position */
    private setGutterPosition(gutter, delta);
    /** Get the split areas associated with a given gutter */
    private getAreasFromGutter(gutter);
}
