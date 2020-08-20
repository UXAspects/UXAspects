import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { FocusHandlerService } from '../services/focus-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ManagedFocusContainerService } from '../../../directives/accessibility/managed-focus-container/managed-focus-container.service';

@Directive({
    selector: '[expressionRow]'
})
export class ExpressionRow implements FocusableOption, OnInit, OnDestroy {
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

        if (this._focusOrigin === 'keyboard' || this._focusOrigin === 'program') {
            this._renderer.addClass(this._elementRef.nativeElement, 'ux-keyboard-focus');
        }
    }

    get tabindex(): number {
        return this._focusHandler.isItemActive(this) ? 0 : -1;
    }

    /** Determine if this element has a focus indicator visible */
    private _focusOrigin: FocusOrigin = null;

    private _destroy$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _focusHandler: FocusHandlerService,
        private _managedFocusContainerService: ManagedFocusContainerService,
        private _renderer: Renderer2,
        private _focusMonitor: FocusMonitor
    ) {
        // Listen for focus changes to set tabindex to either 0 or -1
        this._focusHandler.onTabindexChange$.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._setTabIndex();
        });

        // Monitor the focus of this element and subscribe to the focus origin
        this._focusMonitor.monitor(this._elementRef, false).pipe(takeUntil(this._destroy$)).subscribe((origin: FocusOrigin) => {
            this._focusOrigin = origin;

            if (!origin) {
                this._renderer.removeClass(this._elementRef.nativeElement, 'ux-keyboard-focus');
            }
        });
    }

    ngOnInit() {
        // ensure the tab index is initially set
        this._setTabIndex();
        if (this._focusHandler.isItemActive(this)) {
            this._focusHandler.setPathToActivate(this.path);
        }

        // Register the row with the focus handler
        this._focusHandler.register(this);

        // Watch for focus within the container element and manage tabindex of descendants
        this._managedFocusContainerService.register(this._elementRef.nativeElement, this);
    }

    ngOnDestroy(): void {
        // unregister the row with the focus handler service
        this._focusHandler.unregister(this);
        // stop monitoring the focus of this row
        this._focusMonitor.stopMonitoring(this._elementRef);

        this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);

        this._destroy$.next();
        this._destroy$.complete();
    }

    focus(): void {
        const hasRow = this._focusHandler.hasRow();

        // map programmatic focus to keyboard focus
        const origin: FocusOrigin = (this._focusOrigin === 'program' ? 'keyboard' : this._focusOrigin) ?? 'keyboard';

        this._focusMonitor.focusVia(this._elementRef, origin);

        this._focusHandler.setPathToActivate(this.path, hasRow);

        if (origin === 'keyboard') {
            this._renderer.addClass(this._elementRef.nativeElement, 'ux-keyboard-focus');
        }
    }

    private _setTabIndex(): void {
        // update the tabindex attribute
        this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', this.tabindex.toString());
    }

}
