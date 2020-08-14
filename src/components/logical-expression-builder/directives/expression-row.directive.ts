import {
    Directive,
    ElementRef, HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { FocusHandlerService } from '../services/focus-handler.service';
import { FocusIndicatorService } from '../../../directives/accessibility/focus-indicator/focus-indicator.service';
import { FocusIndicator } from '../../../directives/accessibility/focus-indicator/focus-indicator';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ManagedFocusContainerService } from '../../../directives/accessibility/managed-focus-container/managed-focus-container.service';
import { FocusIndicatorOriginService } from '../../../directives/accessibility/focus-indicator/focus-indicator-origin/focus-indicator-origin.service';
import { Platform } from '@angular/cdk/platform';

@Directive({
    selector: '[expressionRow]'
})
export class ExpressionRow implements FocusableOption, OnInit, OnDestroy, OnChanges {
    /** Used to identify and sort rows */
    @Input('rowPath') path: number[] = [];

    /** Listen for arrow key presses to shift focus */
    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        this._focusHandler.onKeydown(event);
        this._setTabIndex();
    }

    @HostListener('focus')
    @HostListener('click')
    onFocus(): void {
        // if this item is not currently focused in the focusKeyManager set it as the active item
        if (!this._focusHandler.isItemActive(this)) {
            this._focusHandler.setPathToActivate(this.path, true);
        }
    }

    get tabindex(): number {
        return this._focusHandler.isItemActive(this) ? 0 : -1;
    }

    /** Store a reference to the focus indicator instance */
    private _focusIndicator: FocusIndicator;

    /** Determine if this element has a focus indicator visible */
    private _focusOrigin: FocusOrigin = null;

    private _destroy$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _focusHandler: FocusHandlerService,
        private _focusIndicatorService: FocusIndicatorService,
        private _managedFocusContainerService: ManagedFocusContainerService,
        private _renderer: Renderer2,
        private _focusOriginService: FocusIndicatorOriginService,
        private _platform: Platform,
    ) {
        // Listen for focus changes to set tabindex to either 0 or -1
        this._focusHandler.onTabindexChange$.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._setTabIndex();
        });
    }

    focus(): void {
        const hasRow = this._focusHandler.hasRow();

        const origin: FocusOrigin = this._focusOrigin;

        const preventScroll = origin !== 'program' && origin !== 'keyboard';

        this._focusIndicator.focus(origin, { preventScroll });

        this._focusHandler.setPathToActivate(this.path, hasRow);
    }


    ngOnInit() {
        // create the focus indicator
        this._focusIndicator = this._focusIndicatorService.monitor(this._elementRef.nativeElement);

        // store the most current focus origin
        this._focusIndicator.origin$.pipe(takeUntil(this._destroy$), distinctUntilChanged(), filter(Boolean))
            .subscribe((origin: FocusOrigin) => {
                this._focusOrigin = origin;
            });

        // Register the row with the focus handler
        this._focusHandler.register(this);

        // Watch for focus within the container element and manage tabindex of descendants
        this._managedFocusContainerService.register(this._elementRef.nativeElement, this);

        // ensure the tab index is initially set
        this._setTabIndex();
        if (this._focusHandler.isItemActive(this)) {
            this._focusHandler.setPathToActivate(this.path);
        }
    }

    ngOnDestroy(): void {
        this._focusHandler.unregister(this);
        this._focusIndicator.destroy();

        this._destroy$.next();
        this._destroy$.complete();
    }

    private _setTabIndex(): void {
        // update the tabindex attribute
        this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', this.tabindex.toString());
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.path) {
            const path = changes.path;

            if (path.previousValue && path.previousValue.join() !== path.currentValue.join()) {
                this._focusHandler.unregister(this);
                this._focusHandler.register(this);
            }
        }

        this._setTabIndex();
    }
}
