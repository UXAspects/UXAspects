import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { AccessibilityConfigurationService } from '../configuration/accessibility-configuration.service';

@Directive({
    selector: '[uxFocus]',
    exportAs: 'ux-focus'
})
export class FocusDirective implements OnInit, OnDestroy {

    /** Specify whether or not we should mark this element as having focus if a child is focused */
    @Input() checkChildren: boolean = false;

    /** Indicate whether or not mouse events should cause the focus indicator to appear - will override any global setting */
    @Input() mouseFocusOutline?: boolean;

    /** Indicate whether or not touch events should cause the focus indicator to appear - will override any global setting */
    @Input() touchFocusOutline?: boolean;

    /** Indicate whether or not keyboard events should cause the focus indicator to appear - will override any global setting */
    @Input() keyboardFocusOutline?: boolean;

    /** Indicate whether or not programmatic events should cause the focus indicator to appear - will override any global setting */
    @Input() programmaticFocusOutline?: boolean;

    /** Apply a class when the item is focused */
    set isFocused(value: boolean) {
        value ? this._renderer.addClass(this._elementRef.nativeElement, 'ux-focus-indicator') :
            this._renderer.removeClass(this._elementRef.nativeElement, 'ux-focus-indicator');
    }

    /** Destroy any subscriptions */
    private readonly _onDestroy = new Subject<void>();

    constructor(
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _configService: AccessibilityConfigurationService
    ) { }

    /** Setup the focus monitoring */
    ngOnInit(): void {

        // add a class to the element to specify we are controlling the focus
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-focus');

        // watch for any changes to the focus state
        this._focusMonitor.monitor(this._elementRef.nativeElement, this.checkChildren)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(this.onFocusChange.bind(this));
    }

    /** Tear down the directive */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Monitor changes to an elements focus state */
    onFocusChange(origin: FocusOrigin): void {

        switch (origin) {

            case 'mouse':
                this.isFocused = this.mouseFocusOutline || this._configService.options.mouseFocusOutline;
                break;

            case 'touch':
                this.isFocused = this.touchFocusOutline || this._configService.options.touchFocusOutline;
                break;

            case 'keyboard':
                debugger;
                this.isFocused = this.keyboardFocusOutline || this._configService.options.keyboardFocusOutline;
                break;

            case 'program':
                this.isFocused = this.programmaticFocusOutline || this._configService.options.programmaticFocusOutline;
                break;

            default:
                this.isFocused = false;
        }
    }
}