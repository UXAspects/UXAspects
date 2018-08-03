/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
export class TooltipDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _viewContainerRef
     * @param {?} _overlay
     * @param {?} _scrollDispatcher
     * @param {?} _changeDetectorRef
     * @param {?} _renderer
     * @param {?} _tooltipService
     */
    constructor(_elementRef, _viewContainerRef, _overlay, _scrollDispatcher, _changeDetectorRef, _renderer, _tooltipService) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._overlay = _overlay;
        this._scrollDispatcher = _scrollDispatcher;
        this._changeDetectorRef = _changeDetectorRef;
        this._renderer = _renderer;
        this._tooltipService = _tooltipService;
        /**
         * All the user to add a custom class to the tooltip
         */
        this.customClass = '';
        /**
         * All the user to add a role to the tooltip - default is tooltip
         */
        this.role = 'tooltip';
        /**
         * Provide the TemplateRef a context object
         */
        this.context = {};
        /**
         * Delay the showing of the tooltip by a number of miliseconds
         */
        this.delay = 0;
        /**
         * Programmatically show and hide the tooltip
         */
        this.isOpen = false;
        /**
         * Customize how the tooltip should be positioned relative to the element
         */
        this.placement = 'top';
        /**
         * Specify which events should show the tooltip
         */
        this.showTriggers = ['mouseenter', 'focus'];
        /**
         * Specify which events should hide the tooltip
         */
        this.hideTriggers = ['mouseleave', 'blur'];
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits a event when the tooltip is hidden
         */
        this.hidden = new EventEmitter();
        /**
         * Allow two way binding to track the visibility of the tooltip
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Keep track of the tooltip visibility
         */
        this.isVisible = false;
        /**
         * This will emit when the directive is destroyed allowing us to unsubscribe all subscriptions automatically
         */
        this._onDestroy = new Subject();
        /**
         * Internally store the type of this component - usual for distinctions when extending this class
         */
        this._type = 'tooltip';
    }
    /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    ngOnInit() {
        // set up show and hide event triggers
        fromEvent(this._elementRef.nativeElement, 'click').pipe(takeUntil(this._onDestroy)).subscribe(this.onClick.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseenter').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseEnter.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseleave').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseLeave.bind(this));
        fromEvent(this._elementRef.nativeElement, 'focus').pipe(takeUntil(this._onDestroy)).subscribe(this.onFocus.bind(this));
        fromEvent(this._elementRef.nativeElement, 'blur').pipe(takeUntil(this._onDestroy)).subscribe(this.onBlur.bind(this));
        // when any other tooltips open hide this one
        this._tooltipService.shown$.pipe(filter(() => this._type === 'tooltip'), filter(tooltip => tooltip !== this._instance), takeUntil(this._onDestroy)).subscribe(this.hide.bind(this));
        // if the tooltip should be initially visible then open it
        if (this.isOpen) {
            this.show();
        }
    }
    /**
     * We need to send input changes to the tooltip component
     * We can't use setters as they may trigger before tooltip initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // we can ignore the first change as it's handled in ngOnInit
        if (changes["isOpen"] && !changes["isOpen"].firstChange && changes["isOpen"].currentValue !== this.isVisible) {
            changes["isOpen"].currentValue ? this.show() : this.hide();
        }
        // destroy the overlay ref so a new correctly positioned instance will be created next time
        if (changes["placement"]) {
            this.destroyOverlay();
        }
        if (this._instance && changes["placement"]) {
            this._instance.setPlacement(changes["placement"].currentValue);
        }
        if (this._instance && changes["content"]) {
            this._instance.setContent(changes["content"].currentValue);
        }
        if (this._instance && changes["customClass"]) {
            this._instance.setClass(changes["customClass"].currentValue);
        }
        if (this._instance && changes["context"]) {
            this._instance.setContext(changes["context"].currentValue);
        }
        if (this._instance && changes["role"]) {
            this._instance.setContext(changes["role"].currentValue);
        }
    }
    /**
     * Ensure we clean up after ourselves
     * @return {?}
     */
    ngOnDestroy() {
        // ensure we close the tooltip when the host is destroyed
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._instance = null;
        }
        // emit this event to automatically unsubscribe from all subscriptions
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Make the tooltip open
     * @return {?}
     */
    show() {
        // if the tooltip is disabled then do nothing
        if (this.disabled || this.isVisible || this._showTimeoutId || !this.content) {
            return;
        }
        // delay the show by the delay amount
        this._showTimeoutId = window.setTimeout(() => {
            // create the tooltip and get the overlay ref
            const /** @type {?} */ overlayRef = this.createOverlay();
            // create the portal to create the tooltip component
            this._portal = this.createPortal();
            this._instance = this.createInstance(overlayRef);
            // watch for any changes to the content
            this._instance.reposition$.pipe(takeUntil(this._onDestroy)).subscribe(this.reposition.bind(this));
            // store the visible state
            this.isVisible = true;
            // ensure the overlay has the correct initial position
            this.reposition();
            // emit the show events
            this.shown.emit();
            this.isOpenChange.next(true);
            // clear the interval id
            this._showTimeoutId = null;
            // emit the show event to close any other tooltips
            this._tooltipService.shown$.next(this._instance);
            // ensure change detection is run
            this._changeDetectorRef.detectChanges();
        }, this.delay);
    }
    /**
     * If a tooltip exists and is visible, hide it
     * @return {?}
     */
    hide() {
        // if we are waiting to show a tooltip then cancel the pending timeout
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
            this._showTimeoutId = null;
            return;
        }
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this.setAriaDescribedBy(null);
        this._instance = null;
        // store the visible state
        this.isVisible = false;
        // emit the hide events
        this.hidden.emit();
        this.isOpenChange.next(false);
        // ensure change detection is run
        this._changeDetectorRef.detectChanges();
    }
    /**
     * Toggle the visibility of the tooltip
     * @return {?}
     */
    toggle() {
        this.isVisible ? this.hide() : this.show();
    }
    /**
     * Recalculate the position of the popover
     * @return {?}
     */
    reposition() {
        if (this.isVisible && this._overlayRef) {
            this._overlayRef.updatePosition();
        }
    }
    /**
     * Create an instance from the overlay ref - allows overriding and additional logic here
     * @param {?} overlayRef
     * @return {?}
     */
    createInstance(overlayRef) {
        const /** @type {?} */ instance = /** @type {?} */ (overlayRef.attach(this._portal).instance);
        // supply the tooltip with the correct properties
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);
        // Update the aria-describedby attribute
        this.setAriaDescribedBy(instance.id);
        return instance;
    }
    /**
     * Create the component portal - allows overriding to allow other portals eg. popovers
     * @return {?}
     */
    createPortal() {
        return this._portal || new ComponentPortal(TooltipComponent, this._viewContainerRef);
    }
    /**
     * Create the overlay and set up the scroll handling behavior
     * @return {?}
     */
    createOverlay() {
        // if the tooltip has already been created then just return the existing instance
        if (this._overlayRef) {
            return this._overlayRef;
        }
        // configure the tooltip
        const /** @type {?} */ strategy = this._overlay.position()
            .connectedTo(this._elementRef, this.getOrigin(), this.getOverlayPosition());
        // correctly handle scrolling
        const /** @type {?} */ scrollableAncestors = this._scrollDispatcher
            .getAncestorScrollContainers(this._elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        this._overlayRef = this._overlay.create({
            positionStrategy: strategy,
            panelClass: 'ux-overlay-pane',
            scrollStrategy: this._overlay.scrollStrategies.reposition({ scrollThrottle: 0 }),
            hasBackdrop: false
        });
        return this._overlayRef;
    }
    /**
     * Recreate the overlay ref using the updated origin and overlay positions
     * @return {?}
     */
    destroyOverlay() {
        // destroy the existing overlay
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this.isVisible = false;
    }
    /**
     * Get the origin position based on the specified tooltip placement
     * @return {?}
     */
    getOrigin() {
        // ensure placement is defined
        this.placement = this.placement || 'top';
        if (this.placement == 'top' || this.placement == 'bottom') {
            return { originX: 'center', originY: this.placement };
        }
        else if (this.placement == 'left') {
            return { originX: 'start', originY: 'center' };
        }
        else if (this.placement == 'right') {
            return { originX: 'end', originY: 'center' };
        }
    }
    /**
     * Calculate the overlay position based on the specified tooltip placement
     * @return {?}
     */
    getOverlayPosition() {
        // ensure placement is defined
        this.placement = this.placement || 'top';
        if (this.placement == 'top') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (this.placement == 'bottom') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        else if (this.placement == 'left') {
            return { overlayX: 'end', overlayY: 'center' };
        }
        else if (this.placement == 'right') {
            return { overlayX: 'start', overlayY: 'center' };
        }
    }
    /**
     * Simple utility method - because IE doesn't support array.includes
     * And it isn't included in the core-js/es6 polyfills which are the
     * only ones required by Angular and guaranteed to be there
     *
     * @template T
     * @param {?} array
     * @param {?} value
     * @return {?}
     */
    includes(array, value) {
        return Array.isArray(array) && !!array.find(item => item === value);
    }
    /**
     * Handle the click event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        // if its not visible and click is a show trigger open it
        if (!this.isVisible && this.includes(this.showTriggers, 'click')) {
            return this.show();
        }
        // if its visible and click is a hide trigger close it
        if (this.isVisible && this.includes(this.hideTriggers, 'click')) {
            return this.hide();
        }
    }
    /**
     * Handle the mouse enter event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onMouseEnter(event) {
        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'mouseenter')) {
            return;
        }
        // otherwise open the tooltip
        this.show();
    }
    /**
     * Handle the mouse leave event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onMouseLeave(event) {
        // this is an hide only trigger - if not open or it isn't a trigger do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'mouseleave')) {
            return;
        }
        // otherwise close the tooltip
        this.hide();
    }
    /**
     * Handle the focus event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onFocus(event) {
        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'focus')) {
            return;
        }
        // otherwise open the tooltip
        this.show();
    }
    /**
     * Handle the blur event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onBlur(event) {
        // this is an hide only trigger - if not open or it isn't a trigger do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'blur')) {
            return;
        }
        // otherwise close the tooltip
        this.hide();
    }
    /**
     * Determine if the trigger element is focused
     * @return {?}
     */
    isFocused() {
        return document.activeElement === this._elementRef.nativeElement;
    }
    /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    setAriaDescribedBy(id) {
        if (id === null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
        }
        else {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', id);
        }
    }
}
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTooltip]',
                exportAs: 'ux-tooltip'
            },] }
];
/** @nocollapse */
TooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Overlay },
    { type: ScrollDispatcher },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: TooltipService }
];
TooltipDirective.propDecorators = {
    content: [{ type: Input, args: ['uxTooltip',] }],
    disabled: [{ type: Input, args: ['tooltipDisabled',] }],
    customClass: [{ type: Input, args: ['tooltipClass',] }],
    role: [{ type: Input, args: ['tooltipRole',] }],
    context: [{ type: Input, args: ['tooltipContext',] }],
    delay: [{ type: Input, args: ['tooltipDelay',] }],
    isOpen: [{ type: Input }],
    placement: [{ type: Input }],
    showTriggers: [{ type: Input }],
    hideTriggers: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }],
    isOpenChange: [{ type: Output }]
};
function TooltipDirective_tsickle_Closure_declarations() {
    /**
     * Contains the content of the tooltip or a TemplateRef for more detailed content
     * @type {?}
     */
    TooltipDirective.prototype.content;
    /**
     * Allow the tooltip to be conditionally disabled
     * @type {?}
     */
    TooltipDirective.prototype.disabled;
    /**
     * All the user to add a custom class to the tooltip
     * @type {?}
     */
    TooltipDirective.prototype.customClass;
    /**
     * All the user to add a role to the tooltip - default is tooltip
     * @type {?}
     */
    TooltipDirective.prototype.role;
    /**
     * Provide the TemplateRef a context object
     * @type {?}
     */
    TooltipDirective.prototype.context;
    /**
     * Delay the showing of the tooltip by a number of miliseconds
     * @type {?}
     */
    TooltipDirective.prototype.delay;
    /**
     * Programmatically show and hide the tooltip
     * @type {?}
     */
    TooltipDirective.prototype.isOpen;
    /**
     * Customize how the tooltip should be positioned relative to the element
     * @type {?}
     */
    TooltipDirective.prototype.placement;
    /**
     * Specify which events should show the tooltip
     * @type {?}
     */
    TooltipDirective.prototype.showTriggers;
    /**
     * Specify which events should hide the tooltip
     * @type {?}
     */
    TooltipDirective.prototype.hideTriggers;
    /**
     * Emits an event when the tooltip is shown
     * @type {?}
     */
    TooltipDirective.prototype.shown;
    /**
     * Emits a event when the tooltip is hidden
     * @type {?}
     */
    TooltipDirective.prototype.hidden;
    /**
     * Allow two way binding to track the visibility of the tooltip
     * @type {?}
     */
    TooltipDirective.prototype.isOpenChange;
    /**
     * Keep track of the tooltip visibility
     * @type {?}
     */
    TooltipDirective.prototype.isVisible;
    /**
     * A reference to the CDK portal containing the overlay
     * @type {?}
     */
    TooltipDirective.prototype._portal;
    /**
     * A reference to the overlay the tooltip will be inserted into
     * @type {?}
     */
    TooltipDirective.prototype._overlayRef;
    /**
     * A reference to the instance of the tooltip component when created
     * @type {?}
     */
    TooltipDirective.prototype._instance;
    /**
     * This will emit when the directive is destroyed allowing us to unsubscribe all subscriptions automatically
     * @type {?}
     */
    TooltipDirective.prototype._onDestroy;
    /**
     * Store the timeout interval for cancelation
     * @type {?}
     */
    TooltipDirective.prototype._showTimeoutId;
    /**
     * Internally store the type of this component - usual for distinctions when extending this class
     * @type {?}
     */
    TooltipDirective.prototype._type;
    /** @type {?} */
    TooltipDirective.prototype._elementRef;
    /** @type {?} */
    TooltipDirective.prototype._viewContainerRef;
    /** @type {?} */
    TooltipDirective.prototype._overlay;
    /** @type {?} */
    TooltipDirective.prototype._scrollDispatcher;
    /** @type {?} */
    TooltipDirective.prototype._changeDetectorRef;
    /** @type {?} */
    TooltipDirective.prototype._renderer;
    /** @type {?} */
    TooltipDirective.prototype._tooltipService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQTRCLE9BQU8sRUFBeUMsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsSSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFFLFNBQVMsRUFBOEIsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0wsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFNbkQsTUFBTTs7Ozs7Ozs7OztJQThERixZQUNjLFdBQXVCLEVBQ3ZCLGlCQUFtQyxFQUNuQyxRQUFpQixFQUNqQixpQkFBbUMsRUFDckMsb0JBQ0EsV0FDQTtRQU5FLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3JDLHVCQUFrQixHQUFsQixrQkFBa0I7UUFDbEIsY0FBUyxHQUFULFNBQVM7UUFDVCxvQkFBZSxHQUFmLGVBQWU7Ozs7MkJBNURrQixFQUFF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QyxhQUFhO3NCQUduQixLQUFLLFNBQUMsZ0JBQWdCO29CQUd0QixLQUFLLFNBQUMsY0FBYztxQkFHcEIsS0FBSzt3QkFHTCxLQUFLOzJCQUdMLEtBQUs7MkJBR0wsS0FBSztvQkFHTCxNQUFNO3FCQUdOLE1BQU07MkJBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbiwgT3ZlcmxheSwgT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbiwgT3ZlcmxheVJlZiwgU2Nyb2xsRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUb29sdGlwQ29tcG9uZW50IH0gZnJvbSAnLi90b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb29sdGlwU2VydmljZSB9IGZyb20gJy4vdG9vbHRpcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUb29sdGlwXScsXG4gICAgZXhwb3J0QXM6ICd1eC10b29sdGlwJ1xufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogQ29udGFpbnMgdGhlIGNvbnRlbnQgb2YgdGhlIHRvb2x0aXAgb3IgYSBUZW1wbGF0ZVJlZiBmb3IgbW9yZSBkZXRhaWxlZCBjb250ZW50ICovXG4gICAgQElucHV0KCd1eFRvb2x0aXAnKSBjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIEFsbG93IHRoZSB0b29sdGlwIHRvIGJlIGNvbmRpdGlvbmFsbHkgZGlzYWJsZWQgKi9cbiAgICBASW5wdXQoJ3Rvb2x0aXBEaXNhYmxlZCcpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIEFsbCB0aGUgdXNlciB0byBhZGQgYSBjdXN0b20gY2xhc3MgdG8gdGhlIHRvb2x0aXAgKi9cbiAgICBASW5wdXQoJ3Rvb2x0aXBDbGFzcycpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBBbGwgdGhlIHVzZXIgdG8gYWRkIGEgcm9sZSB0byB0aGUgdG9vbHRpcCAtIGRlZmF1bHQgaXMgdG9vbHRpcCAqL1xuICAgIEBJbnB1dCgndG9vbHRpcFJvbGUnKSByb2xlOiBzdHJpbmcgPSAndG9vbHRpcCc7XG5cbiAgICAvKiogUHJvdmlkZSB0aGUgVGVtcGxhdGVSZWYgYSBjb250ZXh0IG9iamVjdCAqL1xuICAgIEBJbnB1dCgndG9vbHRpcENvbnRleHQnKSBjb250ZXh0OiBhbnkgPSB7fTtcblxuICAgIC8qKiBEZWxheSB0aGUgc2hvd2luZyBvZiB0aGUgdG9vbHRpcCBieSBhIG51bWJlciBvZiBtaWxpc2Vjb25kcyAqL1xuICAgIEBJbnB1dCgndG9vbHRpcERlbGF5JykgZGVsYXk6IG51bWJlciA9IDA7XG5cbiAgICAvKiogUHJvZ3JhbW1hdGljYWxseSBzaG93IGFuZCBoaWRlIHRoZSB0b29sdGlwICovXG4gICAgQElucHV0KCkgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQ3VzdG9taXplIGhvdyB0aGUgdG9vbHRpcCBzaG91bGQgYmUgcG9zaXRpb25lZCByZWxhdGl2ZSB0byB0aGUgZWxlbWVudCAqL1xuICAgIEBJbnB1dCgpIHBsYWNlbWVudDogQW5jaG9yUGxhY2VtZW50ID0gJ3RvcCc7XG5cbiAgICAvKiogU3BlY2lmeSB3aGljaCBldmVudHMgc2hvdWxkIHNob3cgdGhlIHRvb2x0aXAgKi9cbiAgICBASW5wdXQoKSBzaG93VHJpZ2dlcnM6IHN0cmluZ1tdID0gWydtb3VzZWVudGVyJywgJ2ZvY3VzJ107XG5cbiAgICAvKiogU3BlY2lmeSB3aGljaCBldmVudHMgc2hvdWxkIGhpZGUgdGhlIHRvb2x0aXAgKi9cbiAgICBASW5wdXQoKSBoaWRlVHJpZ2dlcnM6IHN0cmluZ1tdID0gWydtb3VzZWxlYXZlJywgJ2JsdXInXTtcblxuICAgIC8qKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIHNob3duICovXG4gICAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXRzIGEgZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBoaWRkZW4gKi9cbiAgICBAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEFsbG93IHR3byB3YXkgYmluZGluZyB0byB0cmFjayB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgdG9vbHRpcCAqL1xuICAgIEBPdXRwdXQoKSBpc09wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogS2VlcCB0cmFjayBvZiB0aGUgdG9vbHRpcCB2aXNpYmlsaXR5ICovXG4gICAgaXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIENESyBwb3J0YWwgY29udGFpbmluZyB0aGUgb3ZlcmxheSAqL1xuICAgIHByb3RlY3RlZCBfcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VG9vbHRpcENvbXBvbmVudD47XG5cbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIG92ZXJsYXkgdGhlIHRvb2x0aXAgd2lsbCBiZSBpbnNlcnRlZCBpbnRvICovXG4gICAgcHJvdGVjdGVkIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuXG4gICAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiB0aGUgdG9vbHRpcCBjb21wb25lbnQgd2hlbiBjcmVhdGVkICovXG4gICAgcHJvdGVjdGVkIF9pbnN0YW5jZTogVG9vbHRpcENvbXBvbmVudDtcblxuICAgIC8qKiBUaGlzIHdpbGwgZW1pdCB3aGVuIHRoZSBkaXJlY3RpdmUgaXMgZGVzdHJveWVkIGFsbG93aW5nIHVzIHRvIHVuc3Vic2NyaWJlIGFsbCBzdWJzY3JpcHRpb25zIGF1dG9tYXRpY2FsbHkgKi9cbiAgICBwcm90ZWN0ZWQgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogU3RvcmUgdGhlIHRpbWVvdXQgaW50ZXJ2YWwgZm9yIGNhbmNlbGF0aW9uICovXG4gICAgcHJpdmF0ZSBfc2hvd1RpbWVvdXRJZDogbnVtYmVyO1xuXG4gICAgLyoqIEludGVybmFsbHkgc3RvcmUgdGhlIHR5cGUgb2YgdGhpcyBjb21wb25lbnQgLSB1c3VhbCBmb3IgZGlzdGluY3Rpb25zIHdoZW4gZXh0ZW5kaW5nIHRoaXMgY2xhc3MgKi9cbiAgICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICd0b29sdGlwJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcm90ZWN0ZWQgX3Njcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfdG9vbHRpcFNlcnZpY2U6IFRvb2x0aXBTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8qKiBTZXQgdXAgdGhlIHRyaWdnZXJzIGFuZCBiaW5kIHRvIHRoZSBzaG93L2hpZGUgZXZlbnRzIHRvIGtlZXAgdmlzaWJpbGl0eSBpbiBzeW5jICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc2V0IHVwIHNob3cgYW5kIGhpZGUgZXZlbnQgdHJpZ2dlcnNcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsaWNrJykucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInKS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbk1vdXNlRW50ZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWxlYXZlJykucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMub25Nb3VzZUxlYXZlLmJpbmQodGhpcykpO1xuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZm9jdXMnKS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbkZvY3VzLmJpbmQodGhpcykpO1xuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYmx1cicpLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uQmx1ci5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyB3aGVuIGFueSBvdGhlciB0b29sdGlwcyBvcGVuIGhpZGUgdGhpcyBvbmVcbiAgICAgICAgdGhpcy5fdG9vbHRpcFNlcnZpY2Uuc2hvd24kLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5fdHlwZSA9PT0gJ3Rvb2x0aXAnKSxcbiAgICAgICAgICAgIGZpbHRlcih0b29sdGlwID0+IHRvb2x0aXAgIT09IHRoaXMuX2luc3RhbmNlKSxcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICkuc3Vic2NyaWJlKHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBpZiB0aGUgdG9vbHRpcCBzaG91bGQgYmUgaW5pdGlhbGx5IHZpc2libGUgdGhlbiBvcGVuIGl0XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBuZWVkIHRvIHNlbmQgaW5wdXQgY2hhbmdlcyB0byB0aGUgdG9vbHRpcCBjb21wb25lbnRcbiAgICAgKiBXZSBjYW4ndCB1c2Ugc2V0dGVycyBhcyB0aGV5IG1heSB0cmlnZ2VyIGJlZm9yZSB0b29sdGlwIGluaXRpYWxpc2VkIGFuZCBjYW4ndCByZXNlbmQgb25jZSBpbml0aWFsaXNlZFxuICAgICAqKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cbiAgICAgICAgLy8gd2UgY2FuIGlnbm9yZSB0aGUgZmlyc3QgY2hhbmdlIGFzIGl0J3MgaGFuZGxlZCBpbiBuZ09uSW5pdFxuICAgICAgICBpZiAoY2hhbmdlcy5pc09wZW4gJiYgIWNoYW5nZXMuaXNPcGVuLmZpcnN0Q2hhbmdlICYmIGNoYW5nZXMuaXNPcGVuLmN1cnJlbnRWYWx1ZSAhPT0gdGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIGNoYW5nZXMuaXNPcGVuLmN1cnJlbnRWYWx1ZSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXN0cm95IHRoZSBvdmVybGF5IHJlZiBzbyBhIG5ldyBjb3JyZWN0bHkgcG9zaXRpb25lZCBpbnN0YW5jZSB3aWxsIGJlIGNyZWF0ZWQgbmV4dCB0aW1lXG4gICAgICAgIGlmIChjaGFuZ2VzLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95T3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICYmIGNoYW5nZXMucGxhY2VtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5zZXRQbGFjZW1lbnQoY2hhbmdlcy5wbGFjZW1lbnQuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSAmJiBjaGFuZ2VzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnNldENvbnRlbnQoY2hhbmdlcy5jb250ZW50LmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgJiYgY2hhbmdlcy5jdXN0b21DbGFzcykge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uuc2V0Q2xhc3MoY2hhbmdlcy5jdXN0b21DbGFzcy5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICYmIGNoYW5nZXMuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uuc2V0Q29udGV4dChjaGFuZ2VzLmNvbnRleHQuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSAmJiBjaGFuZ2VzLnJvbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnNldENvbnRleHQoY2hhbmdlcy5yb2xlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW5zdXJlIHdlIGNsZWFuIHVwIGFmdGVyIG91cnNlbHZlcyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGVuc3VyZSB3ZSBjbG9zZSB0aGUgdG9vbHRpcCB3aGVuIHRoZSBob3N0IGlzIGRlc3Ryb3llZFxuICAgICAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbWl0IHRoaXMgZXZlbnQgdG8gYXV0b21hdGljYWxseSB1bnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBNYWtlIHRoZSB0b29sdGlwIG9wZW4gKi9cbiAgICBzaG93KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b29sdGlwIGlzIGRpc2FibGVkIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmlzVmlzaWJsZSB8fCB0aGlzLl9zaG93VGltZW91dElkIHx8ICF0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGF5IHRoZSBzaG93IGJ5IHRoZSBkZWxheSBhbW91bnRcbiAgICAgICAgdGhpcy5fc2hvd1RpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSB0b29sdGlwIGFuZCBnZXQgdGhlIG92ZXJsYXkgcmVmXG4gICAgICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgcG9ydGFsIHRvIGNyZWF0ZSB0aGUgdG9vbHRpcCBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMuX3BvcnRhbCA9IHRoaXMuY3JlYXRlUG9ydGFsKCk7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuY3JlYXRlSW5zdGFuY2Uob3ZlcmxheVJlZik7XG5cbiAgICAgICAgICAgIC8vIHdhdGNoIGZvciBhbnkgY2hhbmdlcyB0byB0aGUgY29udGVudFxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UucmVwb3NpdGlvbiQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMucmVwb3NpdGlvbi5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHZpc2libGUgc3RhdGVcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBvdmVybGF5IGhhcyB0aGUgY29ycmVjdCBpbml0aWFsIHBvc2l0aW9uXG4gICAgICAgICAgICB0aGlzLnJlcG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgc2hvdyBldmVudHNcbiAgICAgICAgICAgIHRoaXMuc2hvd24uZW1pdCgpO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UubmV4dCh0cnVlKTtcblxuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGludGVydmFsIGlkXG4gICAgICAgICAgICB0aGlzLl9zaG93VGltZW91dElkID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgc2hvdyBldmVudCB0byBjbG9zZSBhbnkgb3RoZXIgdG9vbHRpcHNcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTZXJ2aWNlLnNob3duJC5uZXh0KHRoaXMuX2luc3RhbmNlKTtcblxuICAgICAgICAgICAgLy8gZW5zdXJlIGNoYW5nZSBkZXRlY3Rpb24gaXMgcnVuXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0sIHRoaXMuZGVsYXkpO1xuXG4gICAgfVxuXG4gICAgLyoqIElmIGEgdG9vbHRpcCBleGlzdHMgYW5kIGlzIHZpc2libGUsIGhpZGUgaXQgKi9cbiAgICBoaWRlKCkge1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZSB3YWl0aW5nIHRvIHNob3cgYSB0b29sdGlwIHRoZW4gY2FuY2VsIHRoZSBwZW5kaW5nIHRpbWVvdXRcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUaW1lb3V0SWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93VGltZW91dElkKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX292ZXJsYXlSZWYgJiYgdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRBcmlhRGVzY3JpYmVkQnkobnVsbCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gbnVsbDtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgdmlzaWJsZSBzdGF0ZVxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIGhpZGUgZXZlbnRzXG4gICAgICAgIHRoaXMuaGlkZGVuLmVtaXQoKTtcbiAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UubmV4dChmYWxzZSk7XG5cbiAgICAgICAgLy8gZW5zdXJlIGNoYW5nZSBkZXRlY3Rpb24gaXMgcnVuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSB0b29sdGlwICovXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgLyoqIFJlY2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9wb3ZlciAqL1xuICAgIHJlcG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSAmJiB0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLl9vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIGFuIGluc3RhbmNlIGZyb20gdGhlIG92ZXJsYXkgcmVmIC0gYWxsb3dzIG92ZXJyaWRpbmcgYW5kIGFkZGl0aW9uYWwgbG9naWMgaGVyZSAqL1xuICAgIHByb3RlY3RlZCBjcmVhdGVJbnN0YW5jZShvdmVybGF5UmVmOiBPdmVybGF5UmVmKTogVG9vbHRpcENvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fcG9ydGFsKS5pbnN0YW5jZSBhcyBUb29sdGlwQ29tcG9uZW50O1xuXG4gICAgICAgIC8vIHN1cHBseSB0aGUgdG9vbHRpcCB3aXRoIHRoZSBjb3JyZWN0IHByb3BlcnRpZXNcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q29udGVudCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICBpbnN0YW5jZS5zZXRQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQpO1xuICAgICAgICBpbnN0YW5jZS5zZXRDbGFzcyh0aGlzLmN1c3RvbUNsYXNzKTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q29udGV4dCh0aGlzLmNvbnRleHQpO1xuICAgICAgICBpbnN0YW5jZS5zZXRSb2xlKHRoaXMucm9sZSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZVxuICAgICAgICB0aGlzLnNldEFyaWFEZXNjcmliZWRCeShpbnN0YW5jZS5pZCk7XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIGNvbXBvbmVudCBwb3J0YWwgLSBhbGxvd3Mgb3ZlcnJpZGluZyB0byBhbGxvdyBvdGhlciBwb3J0YWxzIGVnLiBwb3BvdmVycyAqL1xuICAgIHByb3RlY3RlZCBjcmVhdGVQb3J0YWwoKTogQ29tcG9uZW50UG9ydGFsPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoVG9vbHRpcENvbXBvbmVudCwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBhbmQgc2V0IHVwIHRoZSBzY3JvbGwgaGFuZGxpbmcgYmVoYXZpb3IgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvb2x0aXAgaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkIHRoZW4ganVzdCByZXR1cm4gdGhlIGV4aXN0aW5nIGluc3RhbmNlXG4gICAgICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3ZlcmxheVJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbmZpZ3VyZSB0aGUgdG9vbHRpcFxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgLmNvbm5lY3RlZFRvKHRoaXMuX2VsZW1lbnRSZWYsIHRoaXMuZ2V0T3JpZ2luKCksIHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCkpO1xuXG4gICAgICAgIC8vIGNvcnJlY3RseSBoYW5kbGUgc2Nyb2xsaW5nXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVBbmNlc3RvcnMgPSB0aGlzLl9zY3JvbGxEaXNwYXRjaGVyXG4gICAgICAgICAgICAuZ2V0QW5jZXN0b3JTY3JvbGxDb250YWluZXJzKHRoaXMuX2VsZW1lbnRSZWYpO1xuXG4gICAgICAgIHN0cmF0ZWd5LndpdGhTY3JvbGxhYmxlQ29udGFpbmVycyhzY3JvbGxhYmxlQW5jZXN0b3JzKTtcblxuICAgICAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAndXgtb3ZlcmxheS1wYW5lJyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7IHNjcm9sbFRocm90dGxlOiAwIH0pLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vdmVybGF5UmVmO1xuICAgIH1cblxuICAgIC8qKiBSZWNyZWF0ZSB0aGUgb3ZlcmxheSByZWYgdXNpbmcgdGhlIHVwZGF0ZWQgb3JpZ2luIGFuZCBvdmVybGF5IHBvc2l0aW9ucyAqL1xuICAgIHByaXZhdGUgZGVzdHJveU92ZXJsYXkoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZGVzdHJveSB0aGUgZXhpc3Rpbmcgb3ZlcmxheVxuICAgICAgICBpZiAodGhpcy5fb3ZlcmxheVJlZiAmJiB0aGlzLl9vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgb3JpZ2luIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgdG9vbHRpcCBwbGFjZW1lbnQgKi9cbiAgICBwcml2YXRlIGdldE9yaWdpbigpOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24ge1xuXG4gICAgICAgIC8vIGVuc3VyZSBwbGFjZW1lbnQgaXMgZGVmaW5lZFxuICAgICAgICB0aGlzLnBsYWNlbWVudCA9IHRoaXMucGxhY2VtZW50IHx8ICd0b3AnO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudCA9PSAndG9wJyB8fCB0aGlzLnBsYWNlbWVudCA9PSAnYm90dG9tJykge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6IHRoaXMucGxhY2VtZW50IH07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGFjZW1lbnQgPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2VtZW50ID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgb3ZlcmxheSBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIHRvb2x0aXAgcGxhY2VtZW50ICovXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5UG9zaXRpb24oKTogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbiB7XG5cbiAgICAgICAgLy8gZW5zdXJlIHBsYWNlbWVudCBpcyBkZWZpbmVkXG4gICAgICAgIHRoaXMucGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnQgfHwgJ3RvcCc7XG5cbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50ID09ICd0b3AnKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAnYm90dG9tJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2VtZW50ID09ICdib3R0b20nKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAndG9wJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2VtZW50ID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYWNlbWVudCA9PSAncmlnaHQnKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgdXRpbGl0eSBtZXRob2QgLSBiZWNhdXNlIElFIGRvZXNuJ3Qgc3VwcG9ydCBhcnJheS5pbmNsdWRlc1xuICAgICAqIEFuZCBpdCBpc24ndCBpbmNsdWRlZCBpbiB0aGUgY29yZS1qcy9lczYgcG9seWZpbGxzIHdoaWNoIGFyZSB0aGVcbiAgICAgKiBvbmx5IG9uZXMgcmVxdWlyZWQgYnkgQW5ndWxhciBhbmQgZ3VhcmFudGVlZCB0byBiZSB0aGVyZVxuICAgICAqKi9cbiAgICBwcm90ZWN0ZWQgaW5jbHVkZXM8VD4oYXJyYXk6IEFycmF5PFQ+LCB2YWx1ZTogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnJheSkgJiYgISFhcnJheS5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgdGhlIGNsaWNrIGV2ZW50IC0gc2hvdyBvciBoaWRlIGFjY29yZGluZ2x5ICovXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiBpdHMgbm90IHZpc2libGUgYW5kIGNsaWNrIGlzIGEgc2hvdyB0cmlnZ2VyIG9wZW4gaXRcbiAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSAmJiB0aGlzLmluY2x1ZGVzKHRoaXMuc2hvd1RyaWdnZXJzLCAnY2xpY2snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXRzIHZpc2libGUgYW5kIGNsaWNrIGlzIGEgaGlkZSB0cmlnZ2VyIGNsb3NlIGl0XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSAmJiB0aGlzLmluY2x1ZGVzKHRoaXMuaGlkZVRyaWdnZXJzLCAnY2xpY2snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIHRoZSBtb3VzZSBlbnRlciBldmVudCAtIHNob3cgb3IgaGlkZSBhY2NvcmRpbmdseSAqL1xuICAgIHByb3RlY3RlZCBvbk1vdXNlRW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyB0aGlzIGlzIGFuIHNob3cgb25seSB0cmlnZ2VyIC0gaWYgYWxyZWFkeSBvcGVuIG9yIGl0IGlzbid0IGEgdHJpZ2dlciBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSB8fCAhdGhpcy5pbmNsdWRlcyh0aGlzLnNob3dUcmlnZ2VycywgJ21vdXNlZW50ZXInKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIG9wZW4gdGhlIHRvb2x0aXBcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSB0aGUgbW91c2UgbGVhdmUgZXZlbnQgLSBzaG93IG9yIGhpZGUgYWNjb3JkaW5nbHkgKi9cbiAgICBwcm90ZWN0ZWQgb25Nb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBhbiBoaWRlIG9ubHkgdHJpZ2dlciAtIGlmIG5vdCBvcGVuIG9yIGl0IGlzbid0IGEgdHJpZ2dlciBkbyBub3RoaW5nXG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuaW5jbHVkZXModGhpcy5oaWRlVHJpZ2dlcnMsICdtb3VzZWxlYXZlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBjbG9zZSB0aGUgdG9vbHRpcFxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIHRoZSBmb2N1cyBldmVudCAtIHNob3cgb3IgaGlkZSBhY2NvcmRpbmdseSAqL1xuICAgIHByb3RlY3RlZCBvbkZvY3VzKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYW4gc2hvdyBvbmx5IHRyaWdnZXIgLSBpZiBhbHJlYWR5IG9wZW4gb3IgaXQgaXNuJ3QgYSB0cmlnZ2VyIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLmluY2x1ZGVzKHRoaXMuc2hvd1RyaWdnZXJzLCAnZm9jdXMnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIG9wZW4gdGhlIHRvb2x0aXBcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSB0aGUgYmx1ciBldmVudCAtIHNob3cgb3IgaGlkZSBhY2NvcmRpbmdseSAqL1xuICAgIHByb3RlY3RlZCBvbkJsdXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBhbiBoaWRlIG9ubHkgdHJpZ2dlciAtIGlmIG5vdCBvcGVuIG9yIGl0IGlzbid0IGEgdHJpZ2dlciBkbyBub3RoaW5nXG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuaW5jbHVkZXModGhpcy5oaWRlVHJpZ2dlcnMsICdibHVyJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBjbG9zZSB0aGUgdG9vbHRpcFxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lIGlmIHRoZSB0cmlnZ2VyIGVsZW1lbnQgaXMgZm9jdXNlZCAqL1xuICAgIHByaXZhdGUgaXNGb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKiBQcm9ncmFtbWF0aWNhbGx5IHVwZGF0ZSB0aGUgYXJpYS1kZXNjcmliZWRieSBwcm9wZXJ0eSAqL1xuICAgIHByb3RlY3RlZCBzZXRBcmlhRGVzY3JpYmVkQnkoaWQ6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlkID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCBpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IHR5cGUgQW5jaG9yUGxhY2VtZW50ID0gJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCc7Il19