import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AccessibilityConfigurationService } from '../configuration/accessibility-configuration.service';
import { FocusIndicator } from './focus-indicator';
import { FocusIndicatorService } from './focus-indicator.service';

@Directive({
    selector: '[uxFocusIndicator]'
})
export class FocusIndicatorDirective implements OnInit, OnDestroy {

    /** Specify whether or not we should mark this element as having focus if a child is focused */
    @Input() checkChildren: boolean = false;

    /** Indicate whether or not mouse events should cause the focus indicator to appear - will override any global setting */
    @Input() mouseFocusOutline: boolean = this._config.options.mouseFocusOutline;

    /** Indicate whether or not touch events should cause the focus indicator to appear - will override any global setting */
    @Input() touchFocusOutline: boolean = this._config.options.touchFocusOutline;

    /** Indicate whether or not keyboard events should cause the focus indicator to appear - will override any global setting */
    @Input() keyboardFocusOutline: boolean = this._config.options.keyboardFocusOutline;

    /** Indicate whether or not programmatic events should cause the focus indicator to appear - will override any global setting */
    @Input() programmaticFocusOutline: boolean = this._config.options.programmaticFocusOutline;

    /** Store a reference to the focus handler */
    private _focusHandler: FocusIndicator;

    constructor(
        private _elementRef: ElementRef,
        private _focusIndicatorService: FocusIndicatorService,
        private _config: AccessibilityConfigurationService
    ) { }

    /** Setup the focus monitoring */
    ngOnInit(): void {
        this._focusHandler = this._focusIndicatorService.monitor(this._elementRef.nativeElement, {
            checkChildren: this.checkChildren,
            mouseFocusOutline: this.mouseFocusOutline,
            touchFocusOutline: this.touchFocusOutline,
            keyboardFocusOutline: this.keyboardFocusOutline,
            programmaticFocusOutline: this.programmaticFocusOutline
        });
    }

    /** Tear down the directive */
    ngOnDestroy(): void {
        if (this._focusHandler) {
            this._focusHandler.destroy();
        }
    }
}