import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export declare class OverflowDirective implements OnInit, AfterViewInit, OnDestroy {
    private _elementRef;
    /** Allow a observable to be used to check for overflow */
    trigger: Observable<void>;
    /** Allow overflow to be within a range before emitting */
    tolerance: number;
    /** Emit when there is a change to the overflow state - horizontal or vertical */
    uxOverflowObserver: EventEmitter<boolean>;
    /** Emit when there is a change to overflow on the horizontal axis */
    uxOverflowHorizontalObserver: EventEmitter<boolean>;
    /** Emit when there is a change to overflow on the vertical axis */
    uxOverflowVerticalObserver: EventEmitter<boolean>;
    /** Store the overflow state on both axis */
    private _state;
    /** Unsubscribe from all the observables */
    private _onDestroy;
    constructor(_elementRef: ElementRef);
    /** Set up the trigger if specified */
    ngOnInit(): void;
    /** Perform an intial check for overflow */
    ngAfterViewInit(): void;
    /** Unsubscribe from the trigger */
    ngOnDestroy(): void;
    /** Programmatically trigger check for overflow */
    checkForOverflow(): void;
}
