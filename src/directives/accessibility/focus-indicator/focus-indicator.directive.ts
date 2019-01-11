import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { FocusIndicator } from './focus-indicator';
import { FocusIndicatorService } from './focus-indicator.service';

@Directive({
    selector: '[uxFocusIndicator]'
})
export class FocusIndicatorDirective implements OnInit, OnDestroy {

    /** Specify whether or not we should mark this element as having focus if a child is focused */
    @Input() set checkChildren(checkChildren: boolean) {
        this._checkChildren = checkChildren;
        this.setOptions();
    }

    /** Indicate whether or not mouse events should cause the focus indicator to appear - will override any global setting */
    @Input() set mouseFocusIndicator(mouseFocusIndicator: boolean) {
        this._mouseFocusIndicator = mouseFocusIndicator;
        this.setOptions();
    }

    /** Indicate whether or not touch events should cause the focus indicator to appear - will override any global setting */
    @Input() set touchFocusIndicator(touchFocusIndicator: boolean) {
        this._touchFocusIndicator = touchFocusIndicator;
        this.setOptions();
    }

    /** Indicate whether or not keyboard events should cause the focus indicator to appear - will override any global setting */
    @Input() set keyboardFocusIndicator(keyboardFocusIndicator: boolean) {
        this._keyboardFocusIndicator = keyboardFocusIndicator;
        this.setOptions();
    }

    /** Indicate whether or not programmatic events should cause the focus indicator to appear - will override any global setting */
    @Input() set programmaticFocusIndicator(programmaticFocusIndicator: boolean) {
        this._programmaticFocusIndicator = programmaticFocusIndicator;
        this.setOptions();
    }

    /** Emit the latest focus state */
    @Output() indicator = new EventEmitter<boolean>();

    /** Store a private reference for the checkChildren option */
    private _checkChildren: boolean = false;

    /** Store a private reference for the mouseFocusIndicator option */
    private _mouseFocusIndicator: boolean = this._optionsService.options.mouseFocusIndicator;

    /** Store a private reference for the mouseFocusIndicator option */
    private _touchFocusIndicator: boolean = this._optionsService.options.touchFocusIndicator;

    /** Store a private reference for the mouseFocusIndicator option */
    private _keyboardFocusIndicator: boolean = this._optionsService.options.keyboardFocusIndicator;

    /** Store a private reference for the mouseFocusIndicator option */
    private _programmaticFocusIndicator: boolean = this._optionsService.options.programmaticFocusIndicator;

    /** Store a reference to the focus handler */
    private _focusIndicator: FocusIndicator;

    /** Unsubscribe on component destroy */
    private readonly _onDestroy = new Subject<void>();

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusIndicatorService: FocusIndicatorService,
        private readonly _optionsService: AccessibilityOptionsService,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) { }

    /** Setup the focus monitoring */
    ngOnInit(): void {

        // start the focus monitoring
        this._focusIndicator = this._focusIndicatorService.monitor(this._elementRef.nativeElement, {
            checkChildren: this._checkChildren,
            mouseFocusIndicator: this._mouseFocusIndicator,
            touchFocusIndicator: this._touchFocusIndicator,
            keyboardFocusIndicator: this._keyboardFocusIndicator,
            programmaticFocusIndicator: this._programmaticFocusIndicator
        });

        // subscribe to the focus state to emit an event on change
        this._focusIndicator.isFocused$.pipe(takeUntil(this._onDestroy)).subscribe(isFocused => {
            // emit the latest value
            this.indicator.emit(isFocused);

            // inform the change detector that we need to run as focus monitor runs outside of NgZone
            this._changeDetectorRef.detectChanges();
        });
    }

    /** Tear down the directive */
    ngOnDestroy(): void {
        if (this._focusIndicator) {
            this._focusIndicator.destroy();
        }

        // unsubscribe from all observables
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Update the focus indicator with the latest options */
    private setOptions(): void {
        if (this._focusIndicator) {
            this._focusIndicator.setOptions({
                checkChildren: this._checkChildren,
                mouseFocusIndicator: this._mouseFocusIndicator,
                touchFocusIndicator: this._touchFocusIndicator,
                keyboardFocusIndicator: this._keyboardFocusIndicator,
                programmaticFocusIndicator: this._programmaticFocusIndicator
            });
        }
    }
}