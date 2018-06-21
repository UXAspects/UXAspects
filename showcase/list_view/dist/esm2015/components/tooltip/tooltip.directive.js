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
            },] },
];
/** @nocollapse */
TooltipDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: ViewContainerRef, },
    { type: Overlay, },
    { type: ScrollDispatcher, },
    { type: ChangeDetectorRef, },
    { type: Renderer2, },
    { type: TooltipService, },
];
TooltipDirective.propDecorators = {
    "content": [{ type: Input, args: ['uxTooltip',] },],
    "disabled": [{ type: Input, args: ['tooltipDisabled',] },],
    "customClass": [{ type: Input, args: ['tooltipClass',] },],
    "role": [{ type: Input, args: ['tooltipRole',] },],
    "context": [{ type: Input, args: ['tooltipContext',] },],
    "delay": [{ type: Input, args: ['tooltipDelay',] },],
    "isOpen": [{ type: Input },],
    "placement": [{ type: Input },],
    "showTriggers": [{ type: Input },],
    "hideTriggers": [{ type: Input },],
    "shown": [{ type: Output },],
    "hidden": [{ type: Output },],
    "isOpenChange": [{ type: Output },],
};
function TooltipDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TooltipDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TooltipDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TooltipDirective.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQTRCLE9BQU8sRUFBeUMsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsSSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFFLFNBQVMsRUFBOEIsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0wsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFNbkQsTUFBTTs7Ozs7Ozs7OztJQThERixZQUNjLFdBQXVCLEVBQ3ZCLGlCQUFtQyxFQUNuQyxRQUFpQixFQUNqQixpQkFBbUMsRUFDckMsb0JBQ0EsV0FDQTtRQU5FLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3JDLHVCQUFrQixHQUFsQixrQkFBa0I7UUFDbEIsY0FBUyxHQUFULFNBQVM7UUFDVCxvQkFBZSxHQUFmLGVBQWU7Ozs7MkJBNURrQixFQUFF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S0FBaUI7O1FBRy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7S0FFSjs7Ozs7O0lBR1MsWUFBWSxDQUFDLEtBQWlCOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDZjs7Ozs7O0lBR1MsWUFBWSxDQUFDLEtBQWlCOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNmOzs7Ozs7SUFHUyxPQUFPLENBQUMsS0FBWTs7UUFHMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2Y7Ozs7OztJQUdTLE1BQU0sQ0FBQyxLQUFZOztRQUd6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNmOzs7OztJQUdPLFNBQVM7UUFDYixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7Ozs7OztJQUkzRCxrQkFBa0IsQ0FBQyxFQUFpQjtRQUMxQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDdEY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZGO0tBQ0o7OztZQS9aSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSxZQUFZO2FBQ3pCOzs7O1lBVnNDLFVBQVU7WUFBb0csZ0JBQWdCO1lBRmxJLE9BQU87WUFBeUMsZ0JBQWdCO1lBRTFGLGlCQUFpQjtZQUFvRixTQUFTO1lBSzlHLGNBQWM7Ozt3QkFTbEIsS0FBSyxTQUFDLFdBQVc7eUJBR2pCLEtBQUssU0FBQyxpQkFBaUI7NEJBR3ZCLEtBQUssU0FBQyxjQUFjO3FCQUdwQixLQUFLLFNBQUMsYUFBYTt3QkFHbkIsS0FBSyxTQUFDLGdCQUFnQjtzQkFHdEIsS0FBSyxTQUFDLGNBQWM7dUJBR3BCLEtBQUs7MEJBR0wsS0FBSzs2QkFHTCxLQUFLOzZCQUdMLEtBQUs7c0JBR0wsTUFBTTt1QkFHTixNQUFNOzZCQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sIE92ZXJsYXksIE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24sIE92ZXJsYXlSZWYsIFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVG9vbHRpcENvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9vbHRpcFNlcnZpY2UgfSBmcm9tICcuL3Rvb2x0aXAuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VG9vbHRpcF0nLFxuICAgIGV4cG9ydEFzOiAndXgtdG9vbHRpcCdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIENvbnRhaW5zIHRoZSBjb250ZW50IG9mIHRoZSB0b29sdGlwIG9yIGEgVGVtcGxhdGVSZWYgZm9yIG1vcmUgZGV0YWlsZWQgY29udGVudCAqL1xuICAgIEBJbnB1dCgndXhUb29sdGlwJykgY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBBbGxvdyB0aGUgdG9vbHRpcCB0byBiZSBjb25kaXRpb25hbGx5IGRpc2FibGVkICovXG4gICAgQElucHV0KCd0b29sdGlwRGlzYWJsZWQnKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBBbGwgdGhlIHVzZXIgdG8gYWRkIGEgY3VzdG9tIGNsYXNzIHRvIHRoZSB0b29sdGlwICovXG4gICAgQElucHV0KCd0b29sdGlwQ2xhc3MnKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogQWxsIHRoZSB1c2VyIHRvIGFkZCBhIHJvbGUgdG8gdGhlIHRvb2x0aXAgLSBkZWZhdWx0IGlzIHRvb2x0aXAgKi9cbiAgICBASW5wdXQoJ3Rvb2x0aXBSb2xlJykgcm9sZTogc3RyaW5nID0gJ3Rvb2x0aXAnO1xuXG4gICAgLyoqIFByb3ZpZGUgdGhlIFRlbXBsYXRlUmVmIGEgY29udGV4dCBvYmplY3QgKi9cbiAgICBASW5wdXQoJ3Rvb2x0aXBDb250ZXh0JykgY29udGV4dDogYW55ID0ge307XG5cbiAgICAvKiogRGVsYXkgdGhlIHNob3dpbmcgb2YgdGhlIHRvb2x0aXAgYnkgYSBudW1iZXIgb2YgbWlsaXNlY29uZHMgKi9cbiAgICBASW5wdXQoJ3Rvb2x0aXBEZWxheScpIGRlbGF5OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFByb2dyYW1tYXRpY2FsbHkgc2hvdyBhbmQgaGlkZSB0aGUgdG9vbHRpcCAqL1xuICAgIEBJbnB1dCgpIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEN1c3RvbWl6ZSBob3cgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gdGhlIGVsZW1lbnQgKi9cbiAgICBASW5wdXQoKSBwbGFjZW1lbnQ6IEFuY2hvclBsYWNlbWVudCA9ICd0b3AnO1xuXG4gICAgLyoqIFNwZWNpZnkgd2hpY2ggZXZlbnRzIHNob3VsZCBzaG93IHRoZSB0b29sdGlwICovXG4gICAgQElucHV0KCkgc2hvd1RyaWdnZXJzOiBzdHJpbmdbXSA9IFsnbW91c2VlbnRlcicsICdmb2N1cyddO1xuXG4gICAgLyoqIFNwZWNpZnkgd2hpY2ggZXZlbnRzIHNob3VsZCBoaWRlIHRoZSB0b29sdGlwICovXG4gICAgQElucHV0KCkgaGlkZVRyaWdnZXJzOiBzdHJpbmdbXSA9IFsnbW91c2VsZWF2ZScsICdibHVyJ107XG5cbiAgICAvKiogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93biAqL1xuICAgIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFbWl0cyBhIGV2ZW50IHdoZW4gdGhlIHRvb2x0aXAgaXMgaGlkZGVuICovXG4gICAgQE91dHB1dCgpIGhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBBbGxvdyB0d28gd2F5IGJpbmRpbmcgdG8gdHJhY2sgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHRvb2x0aXAgKi9cbiAgICBAT3V0cHV0KCkgaXNPcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEtlZXAgdHJhY2sgb2YgdGhlIHRvb2x0aXAgdmlzaWJpbGl0eSAqL1xuICAgIGlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBDREsgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIG92ZXJsYXkgKi9cbiAgICBwcm90ZWN0ZWQgX3BvcnRhbDogQ29tcG9uZW50UG9ydGFsPFRvb2x0aXBDb21wb25lbnQ+O1xuXG4gICAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBvdmVybGF5IHRoZSB0b29sdGlwIHdpbGwgYmUgaW5zZXJ0ZWQgaW50byAqL1xuICAgIHByb3RlY3RlZCBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcblxuICAgIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgdGhlIHRvb2x0aXAgY29tcG9uZW50IHdoZW4gY3JlYXRlZCAqL1xuICAgIHByb3RlY3RlZCBfaW5zdGFuY2U6IFRvb2x0aXBDb21wb25lbnQ7XG5cbiAgICAvKiogVGhpcyB3aWxsIGVtaXQgd2hlbiB0aGUgZGlyZWN0aXZlIGlzIGRlc3Ryb3llZCBhbGxvd2luZyB1cyB0byB1bnN1YnNjcmliZSBhbGwgc3Vic2NyaXB0aW9ucyBhdXRvbWF0aWNhbGx5ICovXG4gICAgcHJvdGVjdGVkIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIFN0b3JlIHRoZSB0aW1lb3V0IGludGVydmFsIGZvciBjYW5jZWxhdGlvbiAqL1xuICAgIHByaXZhdGUgX3Nob3dUaW1lb3V0SWQ6IG51bWJlcjtcblxuICAgIC8qKiBJbnRlcm5hbGx5IHN0b3JlIHRoZSB0eXBlIG9mIHRoaXMgY29tcG9uZW50IC0gdXN1YWwgZm9yIGRpc3RpbmN0aW9ucyB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzICovXG4gICAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAndG9vbHRpcCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcm90ZWN0ZWQgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJvdGVjdGVkIF9zY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgX3Rvb2x0aXBTZXJ2aWNlOiBUb29sdGlwU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvKiogU2V0IHVwIHRoZSB0cmlnZ2VycyBhbmQgYmluZCB0byB0aGUgc2hvdy9oaWRlIGV2ZW50cyB0byBrZWVwIHZpc2liaWxpdHkgaW4gc3luYyAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHNldCB1cCBzaG93IGFuZCBoaWRlIGV2ZW50IHRyaWdnZXJzXG4gICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjbGljaycpLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJykucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcykpO1xuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScpLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJykucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMub25Gb2N1cy5iaW5kKHRoaXMpKTtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2JsdXInKS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbkJsdXIuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gd2hlbiBhbnkgb3RoZXIgdG9vbHRpcHMgb3BlbiBoaWRlIHRoaXMgb25lXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBTZXJ2aWNlLnNob3duJC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX3R5cGUgPT09ICd0b29sdGlwJyksXG4gICAgICAgICAgICBmaWx0ZXIodG9vbHRpcCA9PiB0b29sdGlwICE9PSB0aGlzLl9pbnN0YW5jZSksXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICApLnN1YnNjcmliZSh0aGlzLmhpZGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGluaXRpYWxseSB2aXNpYmxlIHRoZW4gb3BlbiBpdFxuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgbmVlZCB0byBzZW5kIGlucHV0IGNoYW5nZXMgdG8gdGhlIHRvb2x0aXAgY29tcG9uZW50XG4gICAgICogV2UgY2FuJ3QgdXNlIHNldHRlcnMgYXMgdGhleSBtYXkgdHJpZ2dlciBiZWZvcmUgdG9vbHRpcCBpbml0aWFsaXNlZCBhbmQgY2FuJ3QgcmVzZW5kIG9uY2UgaW5pdGlhbGlzZWRcbiAgICAgKiovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXG4gICAgICAgIC8vIHdlIGNhbiBpZ25vcmUgdGhlIGZpcnN0IGNoYW5nZSBhcyBpdCdzIGhhbmRsZWQgaW4gbmdPbkluaXRcbiAgICAgICAgaWYgKGNoYW5nZXMuaXNPcGVuICYmICFjaGFuZ2VzLmlzT3Blbi5maXJzdENoYW5nZSAmJiBjaGFuZ2VzLmlzT3Blbi5jdXJyZW50VmFsdWUgIT09IHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLmlzT3Blbi5jdXJyZW50VmFsdWUgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVzdHJveSB0aGUgb3ZlcmxheSByZWYgc28gYSBuZXcgY29ycmVjdGx5IHBvc2l0aW9uZWQgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkIG5leHQgdGltZVxuICAgICAgICBpZiAoY2hhbmdlcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSAmJiBjaGFuZ2VzLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uuc2V0UGxhY2VtZW50KGNoYW5nZXMucGxhY2VtZW50LmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgJiYgY2hhbmdlcy5jb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5zZXRDb250ZW50KGNoYW5nZXMuY29udGVudC5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICYmIGNoYW5nZXMuY3VzdG9tQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnNldENsYXNzKGNoYW5nZXMuY3VzdG9tQ2xhc3MuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSAmJiBjaGFuZ2VzLmNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnNldENvbnRleHQoY2hhbmdlcy5jb250ZXh0LmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgJiYgY2hhbmdlcy5yb2xlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5zZXRDb250ZXh0KGNoYW5nZXMucm9sZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVuc3VyZSB3ZSBjbGVhbiB1cCBhZnRlciBvdXJzZWx2ZXMgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICAvLyBlbnN1cmUgd2UgY2xvc2UgdGhlIHRvb2x0aXAgd2hlbiB0aGUgaG9zdCBpcyBkZXN0cm95ZWRcbiAgICAgICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW1pdCB0aGlzIGV2ZW50IHRvIGF1dG9tYXRpY2FsbHkgdW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogTWFrZSB0aGUgdG9vbHRpcCBvcGVuICovXG4gICAgc2hvdygpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGUgdG9vbHRpcCBpcyBkaXNhYmxlZCB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5pc1Zpc2libGUgfHwgdGhpcy5fc2hvd1RpbWVvdXRJZCB8fCAhdGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWxheSB0aGUgc2hvdyBieSB0aGUgZGVsYXkgYW1vdW50XG4gICAgICAgIHRoaXMuX3Nob3dUaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgdG9vbHRpcCBhbmQgZ2V0IHRoZSBvdmVybGF5IHJlZlxuICAgICAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIHBvcnRhbCB0byBjcmVhdGUgdGhlIHRvb2x0aXAgY29tcG9uZW50XG4gICAgICAgICAgICB0aGlzLl9wb3J0YWwgPSB0aGlzLmNyZWF0ZVBvcnRhbCgpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0aGlzLmNyZWF0ZUluc3RhbmNlKG92ZXJsYXlSZWYpO1xuXG4gICAgICAgICAgICAvLyB3YXRjaCBmb3IgYW55IGNoYW5nZXMgdG8gdGhlIGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnJlcG9zaXRpb24kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLnJlcG9zaXRpb24uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSB2aXNpYmxlIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgb3ZlcmxheSBoYXMgdGhlIGNvcnJlY3QgaW5pdGlhbCBwb3NpdGlvblxuICAgICAgICAgICAgdGhpcy5yZXBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIHNob3cgZXZlbnRzXG4gICAgICAgICAgICB0aGlzLnNob3duLmVtaXQoKTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLm5leHQodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBpbnRlcnZhbCBpZFxuICAgICAgICAgICAgdGhpcy5fc2hvd1RpbWVvdXRJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIHNob3cgZXZlbnQgdG8gY2xvc2UgYW55IG90aGVyIHRvb2x0aXBzXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU2VydmljZS5zaG93biQubmV4dCh0aGlzLl9pbnN0YW5jZSk7XG5cbiAgICAgICAgICAgIC8vIGVuc3VyZSBjaGFuZ2UgZGV0ZWN0aW9uIGlzIHJ1blxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9LCB0aGlzLmRlbGF5KTtcblxuICAgIH1cblxuICAgIC8qKiBJZiBhIHRvb2x0aXAgZXhpc3RzIGFuZCBpcyB2aXNpYmxlLCBoaWRlIGl0ICovXG4gICAgaGlkZSgpIHtcblxuICAgICAgICAvLyBpZiB3ZSBhcmUgd2FpdGluZyB0byBzaG93IGEgdG9vbHRpcCB0aGVuIGNhbmNlbCB0aGUgcGVuZGluZyB0aW1lb3V0XG4gICAgICAgIGlmICh0aGlzLl9zaG93VGltZW91dElkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd1RpbWVvdXRJZCk7XG4gICAgICAgICAgICB0aGlzLl9zaG93VGltZW91dElkID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vdmVybGF5UmVmICYmIHRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0QXJpYURlc2NyaWJlZEJ5KG51bGwpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHZpc2libGUgc3RhdGVcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBoaWRlIGV2ZW50c1xuICAgICAgICB0aGlzLmhpZGRlbi5lbWl0KCk7XG4gICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLm5leHQoZmFsc2UpO1xuXG4gICAgICAgIC8vIGVuc3VyZSBjaGFuZ2UgZGV0ZWN0aW9uIGlzIHJ1blxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgdG9vbHRpcCAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIC8qKiBSZWNhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIHBvcG92ZXIgKi9cbiAgICByZXBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSBhbiBpbnN0YW5jZSBmcm9tIHRoZSBvdmVybGF5IHJlZiAtIGFsbG93cyBvdmVycmlkaW5nIGFuZCBhZGRpdGlvbmFsIGxvZ2ljIGhlcmUgKi9cbiAgICBwcm90ZWN0ZWQgY3JlYXRlSW5zdGFuY2Uob3ZlcmxheVJlZjogT3ZlcmxheVJlZik6IFRvb2x0aXBDb21wb25lbnQge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMuX3BvcnRhbCkuaW5zdGFuY2UgYXMgVG9vbHRpcENvbXBvbmVudDtcblxuICAgICAgICAvLyBzdXBwbHkgdGhlIHRvb2x0aXAgd2l0aCB0aGUgY29ycmVjdCBwcm9wZXJ0aWVzXG4gICAgICAgIGluc3RhbmNlLnNldENvbnRlbnQodGhpcy5jb250ZW50KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0UGxhY2VtZW50KHRoaXMucGxhY2VtZW50KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q2xhc3ModGhpcy5jdXN0b21DbGFzcyk7XG4gICAgICAgIGluc3RhbmNlLnNldENvbnRleHQodGhpcy5jb250ZXh0KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Um9sZSh0aGlzLnJvbGUpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy5zZXRBcmlhRGVzY3JpYmVkQnkoaW5zdGFuY2UuaWQpO1xuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBjb21wb25lbnQgcG9ydGFsIC0gYWxsb3dzIG92ZXJyaWRpbmcgdG8gYWxsb3cgb3RoZXIgcG9ydGFscyBlZy4gcG9wb3ZlcnMgKi9cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUG9ydGFsKCk6IENvbXBvbmVudFBvcnRhbDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKFRvb2x0aXBDb21wb25lbnQsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgYW5kIHNldCB1cCB0aGUgc2Nyb2xsIGhhbmRsaW5nIGJlaGF2aW9yICovXG4gICAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KCk6IE92ZXJsYXlSZWYge1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b29sdGlwIGhhcyBhbHJlYWR5IGJlZW4gY3JlYXRlZCB0aGVuIGp1c3QgcmV0dXJuIHRoZSBleGlzdGluZyBpbnN0YW5jZVxuICAgICAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJsYXlSZWY7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25maWd1cmUgdGhlIHRvb2x0aXBcbiAgICAgICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5jb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50UmVmLCB0aGlzLmdldE9yaWdpbigpLCB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpKTtcblxuICAgICAgICAvLyBjb3JyZWN0bHkgaGFuZGxlIHNjcm9sbGluZ1xuICAgICAgICBjb25zdCBzY3JvbGxhYmxlQW5jZXN0b3JzID0gdGhpcy5fc2Nyb2xsRGlzcGF0Y2hlclxuICAgICAgICAgICAgLmdldEFuY2VzdG9yU2Nyb2xsQ29udGFpbmVycyh0aGlzLl9lbGVtZW50UmVmKTtcblxuICAgICAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZUFuY2VzdG9ycyk7XG5cbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHN0cmF0ZWd5LFxuICAgICAgICAgICAgcGFuZWxDbGFzczogJ3V4LW92ZXJsYXktcGFuZScsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oeyBzY3JvbGxUaHJvdHRsZTogMCB9KSxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICAvKiogUmVjcmVhdGUgdGhlIG92ZXJsYXkgcmVmIHVzaW5nIHRoZSB1cGRhdGVkIG9yaWdpbiBhbmQgb3ZlcmxheSBwb3NpdGlvbnMgKi9cbiAgICBwcml2YXRlIGRlc3Ryb3lPdmVybGF5KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGRlc3Ryb3kgdGhlIGV4aXN0aW5nIG92ZXJsYXlcbiAgICAgICAgaWYgKHRoaXMuX292ZXJsYXlSZWYgJiYgdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIG9yaWdpbiBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIHRvb2x0aXAgcGxhY2VtZW50ICovXG4gICAgcHJpdmF0ZSBnZXRPcmlnaW4oKTogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uIHtcblxuICAgICAgICAvLyBlbnN1cmUgcGxhY2VtZW50IGlzIGRlZmluZWRcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQgPSB0aGlzLnBsYWNlbWVudCB8fCAndG9wJztcblxuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQgPT0gJ3RvcCcgfHwgdGhpcy5wbGFjZW1lbnQgPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiB0aGlzLnBsYWNlbWVudCB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2VtZW50ID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYWNlbWVudCA9PSAncmlnaHQnKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIG92ZXJsYXkgcG9zaXRpb24gYmFzZWQgb24gdGhlIHNwZWNpZmllZCB0b29sdGlwIHBsYWNlbWVudCAqL1xuICAgIHByaXZhdGUgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24ge1xuXG4gICAgICAgIC8vIGVuc3VyZSBwbGFjZW1lbnQgaXMgZGVmaW5lZFxuICAgICAgICB0aGlzLnBsYWNlbWVudCA9IHRoaXMucGxhY2VtZW50IHx8ICd0b3AnO1xuXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudCA9PSAndG9wJykge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYWNlbWVudCA9PSAnYm90dG9tJykge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYWNlbWVudCA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGFjZW1lbnQgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2ltcGxlIHV0aWxpdHkgbWV0aG9kIC0gYmVjYXVzZSBJRSBkb2Vzbid0IHN1cHBvcnQgYXJyYXkuaW5jbHVkZXNcbiAgICAgKiBBbmQgaXQgaXNuJ3QgaW5jbHVkZWQgaW4gdGhlIGNvcmUtanMvZXM2IHBvbHlmaWxscyB3aGljaCBhcmUgdGhlXG4gICAgICogb25seSBvbmVzIHJlcXVpcmVkIGJ5IEFuZ3VsYXIgYW5kIGd1YXJhbnRlZWQgdG8gYmUgdGhlcmVcbiAgICAgKiovXG4gICAgcHJvdGVjdGVkIGluY2x1ZGVzPFQ+KGFycmF5OiBBcnJheTxUPiwgdmFsdWU6IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyYXkpICYmICEhYXJyYXkuZmluZChpdGVtID0+IGl0ZW0gPT09IHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIHRoZSBjbGljayBldmVudCAtIHNob3cgb3IgaGlkZSBhY2NvcmRpbmdseSAqL1xuICAgIHByb3RlY3RlZCBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgaXRzIG5vdCB2aXNpYmxlIGFuZCBjbGljayBpcyBhIHNob3cgdHJpZ2dlciBvcGVuIGl0XG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUgJiYgdGhpcy5pbmNsdWRlcyh0aGlzLnNob3dUcmlnZ2VycywgJ2NsaWNrJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGl0cyB2aXNpYmxlIGFuZCBjbGljayBpcyBhIGhpZGUgdHJpZ2dlciBjbG9zZSBpdFxuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgdGhpcy5pbmNsdWRlcyh0aGlzLmhpZGVUcmlnZ2VycywgJ2NsaWNrJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSB0aGUgbW91c2UgZW50ZXIgZXZlbnQgLSBzaG93IG9yIGhpZGUgYWNjb3JkaW5nbHkgKi9cbiAgICBwcm90ZWN0ZWQgb25Nb3VzZUVudGVyKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBhbiBzaG93IG9ubHkgdHJpZ2dlciAtIGlmIGFscmVhZHkgb3BlbiBvciBpdCBpc24ndCBhIHRyaWdnZXIgZG8gbm90aGluZ1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuaW5jbHVkZXModGhpcy5zaG93VHJpZ2dlcnMsICdtb3VzZWVudGVyJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBvcGVuIHRoZSB0b29sdGlwXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgdGhlIG1vdXNlIGxlYXZlIGV2ZW50IC0gc2hvdyBvciBoaWRlIGFjY29yZGluZ2x5ICovXG4gICAgcHJvdGVjdGVkIG9uTW91c2VMZWF2ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYW4gaGlkZSBvbmx5IHRyaWdnZXIgLSBpZiBub3Qgb3BlbiBvciBpdCBpc24ndCBhIHRyaWdnZXIgZG8gbm90aGluZ1xuICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLmluY2x1ZGVzKHRoaXMuaGlkZVRyaWdnZXJzLCAnbW91c2VsZWF2ZScpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UgY2xvc2UgdGhlIHRvb2x0aXBcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSB0aGUgZm9jdXMgZXZlbnQgLSBzaG93IG9yIGhpZGUgYWNjb3JkaW5nbHkgKi9cbiAgICBwcm90ZWN0ZWQgb25Gb2N1cyhldmVudDogRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyB0aGlzIGlzIGFuIHNob3cgb25seSB0cmlnZ2VyIC0gaWYgYWxyZWFkeSBvcGVuIG9yIGl0IGlzbid0IGEgdHJpZ2dlciBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSB8fCAhdGhpcy5pbmNsdWRlcyh0aGlzLnNob3dUcmlnZ2VycywgJ2ZvY3VzJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBvcGVuIHRoZSB0b29sdGlwXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgdGhlIGJsdXIgZXZlbnQgLSBzaG93IG9yIGhpZGUgYWNjb3JkaW5nbHkgKi9cbiAgICBwcm90ZWN0ZWQgb25CbHVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYW4gaGlkZSBvbmx5IHRyaWdnZXIgLSBpZiBub3Qgb3BlbiBvciBpdCBpc24ndCBhIHRyaWdnZXIgZG8gbm90aGluZ1xuICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLmluY2x1ZGVzKHRoaXMuaGlkZVRyaWdnZXJzLCAnYmx1cicpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UgY2xvc2UgdGhlIHRvb2x0aXBcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgLyoqIERldGVybWluZSBpZiB0aGUgdHJpZ2dlciBlbGVtZW50IGlzIGZvY3VzZWQgKi9cbiAgICBwcml2YXRlIGlzRm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKiogUHJvZ3JhbW1hdGljYWxseSB1cGRhdGUgdGhlIGFyaWEtZGVzY3JpYmVkYnkgcHJvcGVydHkgKi9cbiAgICBwcm90ZWN0ZWQgc2V0QXJpYURlc2NyaWJlZEJ5KGlkOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGlmIChpZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCB0eXBlIEFuY2hvclBsYWNlbWVudCA9ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnOyJdfQ==