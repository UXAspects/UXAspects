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
export class ExpressionRowDirective implements FocusableOption, OnInit, OnDestroy {
    /** Used to identify and sort rows */
    @Input('rowPath') path: number[] = [];

    /** Listen for arrow key presses to shift focus */
    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        this.focusHandlerService.onKeydown(event);
        this.setTabIndex();
    }

    @HostListener('focus')
    @HostListener('click')
    onFocus(): void {
        // if this item is not currently focused in the focusKeyManager set it as the active item
        if (!this.focusHandlerService.isItemActive(this)) {
            this.focusHandlerService.setPathToActivate(this.path, true);
        }

        // add focus class for styling
        if (this.focusOrigin === 'keyboard' || this.focusOrigin === 'program') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ux-keyboard-focus');
        }

        this.setActiveClasses();
    }

    get tabindex(): number {
        return this.focusHandlerService.isItemActive(this) ? 0 : -1;
    }

    /** Determine if this element has a focus indicator visible */
    private focusOrigin: FocusOrigin = null;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private elementRef: ElementRef,
        private focusHandlerService: FocusHandlerService,
        private managedFocusContainerService: ManagedFocusContainerService,
        private renderer: Renderer2,
        private focusMonitor: FocusMonitor
    ) {
        // Add class for styling
        this.renderer.addClass(this.elementRef.nativeElement, 'expression-row');

        // Listen for focus changes to set tabindex to either 0 or -1
        this.focusHandlerService.onTabindexChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.setTabIndex();
        });

        // Monitor the focus of this element and subscribe to the focus origin
        this.focusMonitor.monitor(this.elementRef, false).pipe(takeUntil(this.destroy$)).subscribe((origin: FocusOrigin) => {
            this.focusOrigin = origin;

            if (!origin) {
                this.renderer.removeClass(this.elementRef.nativeElement, 'ux-keyboard-focus');
            }
        });
    }

    ngOnInit() {
        // ensure the tab index is initially set
        this.setTabIndex();
        if (this.focusHandlerService.isItemActive(this)) {
            this.focusHandlerService.setPathToActivate(this.path);
        }

        // Register the row with the focus handler
        this.focusHandlerService.register(this);

        // Watch for focus within the container element and manage tabindex of descendants
        this.managedFocusContainerService.register(this.elementRef.nativeElement, this);
    }

    ngOnDestroy(): void {
        // unregister the row with the focus handler service
        this.focusHandlerService.unregister(this);
        // stop monitoring the focus of this row
        this.focusMonitor.stopMonitoring(this.elementRef);
        // unregister from managed focus container
        this.managedFocusContainerService.unregister(this.elementRef.nativeElement, this);

        this.destroy$.next();
        this.destroy$.complete();
    }

    focus(): void {
        const hasRow = this.focusHandlerService.hasRow();

        // map programmatic focus to keyboard focus
        const origin: FocusOrigin = (this.focusOrigin === 'program' ? 'keyboard' : this.focusOrigin) ?? 'keyboard';

        this.focusMonitor.focusVia(this.elementRef, origin);

        this.focusHandlerService.setPathToActivate(this.path, hasRow);

        this.setActiveClasses();

        if (origin === 'keyboard') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ux-keyboard-focus');
        }
    }

    private setTabIndex(): void {
        // update the tabindex attribute
        this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', this.tabindex.toString());

        // make sure the button for adding groups is tabbable if the row is active
        const groupAddBtn: HTMLButtonElement = (this.elementRef.nativeElement as HTMLElement).querySelector('button.group-add-btn');
        if (groupAddBtn) {
            this.renderer.setAttribute(groupAddBtn, 'tabindex', this.tabindex.toString());
        }

        this.setActiveClasses();
    }

    /** set or remove the active classes for hover actions, if they exist inside the row */
    private setActiveClasses(): void {
        // get any hover action buttons in the row
        const buttons = (this.elementRef.nativeElement as HTMLElement).querySelectorAll('button[uxhoveraction]');

        if (this.tabindex === 0) {
            this.renderer.addClass(this.elementRef.nativeElement, 'hover-action-container-active');
            this.renderer.addClass(this.elementRef.nativeElement, 'expression-row-active');

            if (buttons) {
                buttons.forEach((btn: HTMLButtonElement) => {
                    this.renderer.addClass(btn, 'hover-action-active');
                });
            }
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'hover-action-container-active');
            this.renderer.removeClass(this.elementRef.nativeElement, 'expression-row-active');

            if (buttons) {
                buttons.forEach((btn: HTMLButtonElement) => {
                    this.renderer.removeClass(btn, 'hover-action-active');
                });
            }
        }
    }
}
