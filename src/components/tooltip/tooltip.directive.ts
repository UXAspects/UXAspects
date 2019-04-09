import { HorizontalConnectionPos, OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef, ScrollDispatcher, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';

@Directive({
    selector: '[uxTooltip]',
    exportAs: 'ux-tooltip'
})
export class TooltipDirective implements OnInit, OnChanges, OnDestroy {

    /** Contains the content of the tooltip or a TemplateRef for more detailed content */
    @Input('uxTooltip') content: string | TemplateRef<any>;

    /** Allow the tooltip to be conditionally disabled */
    @Input('tooltipDisabled') disabled: boolean;

    /** All the user to add a custom class to the tooltip */
    @Input('tooltipClass') customClass: string = '';

    /** All the user to add a role to the tooltip - default is tooltip */
    @Input('tooltipRole') role: string = 'tooltip';

    /** Provide the TemplateRef a context object */
    @Input('tooltipContext') context: any = {};

    /** Delay the showing of the tooltip by a number of miliseconds */
    @Input('tooltipDelay') delay: number = 0;

    /** Programmatically show and hide the tooltip */
    @Input() isOpen: boolean = false;

    /** Customize how the tooltip should be positioned relative to the element */
    @Input() placement: AnchorPlacement = 'top';

    /** Customize the position of the callout */
    @Input() alignment: AnchorAlignment = 'center';

    /** Specify which events should show the tooltip */
    @Input() showTriggers: OverlayTrigger[] = ['mouseenter', 'focus'];

    /** Specify which events should hide the tooltip */
    @Input() hideTriggers: OverlayTrigger[] = ['mouseleave', 'blur'];

    /** Emits an event when the tooltip is shown */
    @Output() shown = new EventEmitter<void>();

    /** Emits a event when the tooltip is hidden */
    @Output() hidden = new EventEmitter<void>();

    /** Allow two way binding to track the visibility of the tooltip */
    @Output() isOpenChange = new EventEmitter<boolean>();

    /** Keep track of the tooltip visibility */
    isVisible: boolean = false;

    /** A reference to the CDK portal containing the overlay */
    protected _portal: ComponentPortal<TooltipComponent>;

    /** A reference to the overlay the tooltip will be inserted into */
    protected _overlayRef: OverlayRef;

    /** A reference to the instance of the tooltip component when created */
    protected _instance: TooltipComponent;

    /** This will emit when the directive is destroyed allowing us to unsubscribe all subscriptions automatically */
    protected _onDestroy = new Subject<void>();

    /** Store the timeout interval for cancelation */
    private _showTimeoutId: number = null;

    /** Internally store the type of this component - usual for distinctions when extending this class */
    protected _type: string = 'tooltip';

    constructor(
        protected _elementRef: ElementRef,
        protected _viewContainerRef: ViewContainerRef,
        protected _overlay: Overlay,
        protected _scrollDispatcher: ScrollDispatcher,
        private _changeDetectorRef: ChangeDetectorRef,
        private _renderer: Renderer2,
        private _tooltipService: TooltipService
    ) { }

    /** Set up the triggers and bind to the show/hide events to keep visibility in sync */
    ngOnInit(): void {

        // set up show and hide event triggers
        fromEvent(this._elementRef.nativeElement, 'click').pipe(takeUntil(this._onDestroy)).subscribe(this.onClick.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseenter').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseEnter.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseleave').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseLeave.bind(this));
        fromEvent(this._elementRef.nativeElement, 'focus').pipe(takeUntil(this._onDestroy)).subscribe(this.onFocus.bind(this));
        fromEvent(this._elementRef.nativeElement, 'blur').pipe(takeUntil(this._onDestroy)).subscribe(this.onBlur.bind(this));

        // when any other tooltips open hide this one
        this._tooltipService.shown$.pipe(
            filter(() => this._type === 'tooltip'),
            filter(tooltip => tooltip !== this._instance),
            takeUntil(this._onDestroy)
        ).subscribe(this.hide.bind(this));

        // if the tooltip should be initially visible then open it
        if (this.isOpen) {
            this.show();
        }
    }

    /**
     * We need to send input changes to the tooltip component
     * We can't use setters as they may trigger before tooltip initialised and can't resend once initialised
     **/
    ngOnChanges(changes: SimpleChanges): void {

        // we can ignore the first change as it's handled in ngOnInit
        if (changes.isOpen && !changes.isOpen.firstChange && changes.isOpen.currentValue !== this.isVisible) {
            changes.isOpen.currentValue ? this.show() : this.hide();
        }

        // destroy the overlay ref so a new correctly positioned instance will be created next time
        if (changes.placement) {
            this.destroyOverlay();
        }

        if (this._instance && changes.placement) {
            this._instance.setPlacement(changes.placement.currentValue);
        }

        if (this._instance && changes.alignment) {
            this._instance.setAlignment(changes.alignment.currentValue);
        }

        if (this._instance && changes.content) {
            this._instance.setContent(changes.content.currentValue);
        }

        if (this._instance && changes.customClass) {
            this._instance.setClass(changes.customClass.currentValue);
        }

        if (this._instance && changes.context) {
            this._instance.setContext(changes.context.currentValue);
        }

        if (this._instance && changes.role) {
            this._instance.setContext(changes.role.currentValue);
        }
    }

    /** Ensure we clean up after ourselves */
    ngOnDestroy(): void {

        // ensure we close the tooltip when the host is destroyed
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._instance = null;
        }

        // emit this event to automatically unsubscribe from all subscriptions
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Make the tooltip open */
    show(): void {

        // if the tooltip is disabled then do nothing
        if (this.disabled || this.isVisible || this._showTimeoutId || !this.content) {
            return;
        }

        // delay the show by the delay amount
        this._showTimeoutId = window.setTimeout(() => {

            // create the tooltip and get the overlay ref
            const overlayRef = this.createOverlay();

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

    /** If a tooltip exists and is visible, hide it */
    hide(): void {

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

    /** Toggle the visibility of the tooltip */
    toggle(): void {
        this.isVisible ? this.hide() : this.show();
    }

    /** Recalculate the position of the popover */
    reposition(): void {
        if (this.isVisible && this._overlayRef) {
            this._overlayRef.updatePosition();
        }
    }

    /** Create an instance from the overlay ref - allows overriding and additional logic here */
    protected createInstance(overlayRef: OverlayRef): TooltipComponent {
        const instance = overlayRef.attach(this._portal).instance as TooltipComponent;

        // supply the tooltip with the correct properties
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setAlignment(this.alignment);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);

        // Update the aria-describedby attribute
        this.setAriaDescribedBy(instance.id);

        return instance;
    }

    /** Create the component portal - allows overriding to allow other portals eg. popovers */
    protected createPortal(): ComponentPortal<any> {
        return this._portal || new ComponentPortal(TooltipComponent, this._viewContainerRef);
    }

    /** Create the overlay and set up the scroll handling behavior */
    private createOverlay(): OverlayRef {

        // if the tooltip has already been created then just return the existing instance
        if (this._overlayRef) {
            return this._overlayRef;
        }

        // configure the tooltip
        const strategy = this._overlay.position()
            .connectedTo(this._elementRef, this.getOrigin(), this.getOverlayPosition());

        // correctly handle scrolling
        const scrollableAncestors = this._scrollDispatcher
            .getAncestorScrollContainers(this._elementRef);

        strategy.withScrollableContainers(scrollableAncestors);

        this._overlayRef = this._overlay.create({
            positionStrategy: strategy,
            panelClass: 'ux-tooltip-pane',
            scrollStrategy: this._overlay.scrollStrategies.reposition({ scrollThrottle: 0 }),
            hasBackdrop: false
        });

        return this._overlayRef;
    }

    /** Recreate the overlay ref using the updated origin and overlay positions */
    private destroyOverlay(): void {

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

    /** Get the origin position based on the specified tooltip placement */
    private getOrigin(): OriginConnectionPosition {

        // ensure placement is defined
        this.placement = this.placement || 'top';

        if (this.placement === 'top' || this.placement === 'bottom') {
            return { originX: this.alignment as HorizontalConnectionPos, originY: this.placement };
        }

        if (this.placement === 'left') {
            return { originX: 'start', originY: this.getVerticalAlignment() };
        }

        if (this.placement === 'right') {
            return { originX: 'end', originY: this.getVerticalAlignment() };
        }
    }

    /** Calculate the overlay position based on the specified tooltip placement */
    private getOverlayPosition(): OverlayConnectionPosition {

        // ensure placement is defined
        this.placement = this.placement || 'top';

        if (this.placement === 'top') {
            return { overlayX: this.alignment as HorizontalConnectionPos, overlayY: 'bottom' };
        }

        if (this.placement === 'bottom') {
            return { overlayX: this.alignment as HorizontalConnectionPos, overlayY: 'top' };
        }

        if (this.placement === 'left') {
            return { overlayX: 'end', overlayY: this.getVerticalAlignment() };
        }

        if (this.placement === 'right') {
            return { overlayX: 'start', overlayY: this.getVerticalAlignment() };
        }
    }

    /** Convert the alignment property to a valid CDK alignment value */
    private getVerticalAlignment(): VerticalConnectionPos {

        switch (this.alignment) {
            case 'start':
                return 'top';

            case 'end':
                return 'bottom';

            default:
                return this.alignment;
        }
    }

    /**
     * Simple utility method - because IE doesn't support array.includes
     * And it isn't included in the core-js/es6 polyfills which are the
     * only ones required by Angular and guaranteed to be there
     **/
    protected includes<T>(array: Array<T>, value: T): boolean {
        return Array.isArray(array) && !!array.find(item => item === value);
    }

    /** Handle the click event - show or hide accordingly */
    protected onClick(_: MouseEvent): void {

        // if its not visible and click is a show trigger open it
        if (!this.isVisible && this.includes(this.showTriggers, 'click') && this._showTimeoutId === null) {
            return this.show();
        }

        // if its visible and click is a hide trigger close it
        if (this.isVisible && this.includes(this.hideTriggers, 'click') && this._showTimeoutId === null) {
            return this.hide();
        }

        // if its not visible and click is a hide trigger close it and there is a pending tooltip
        if (!this.isVisible && this.includes(this.hideTriggers, 'click') && this._showTimeoutId !== null) {
            return this.cancelTooltip();
        }

    }

    /** Handle the mouse enter event - show or hide accordingly */
    protected onMouseEnter(_: MouseEvent): void {

        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'mouseenter')) {
            return;
        }

        // otherwise open the tooltip
        this.show();
    }

    /** Handle the mouse leave event - show or hide accordingly */
    protected onMouseLeave(_: MouseEvent): void {

        // If the tooltip is pending then cancel showing it
        if (!this.isVisible && this.includes(this.hideTriggers, 'mouseleave') && this._showTimeoutId !== null) {
            return this.cancelTooltip();
        }

        // if the tooltip is not visible or mouseleave isn't a hide trigger then do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'mouseleave')) {
            return;
        }

        // otherwise close the tooltip
        this.hide();
    }

    /** Handle the focus event - show or hide accordingly */
    protected onFocus(_: Event): void {

        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'focus')) {
            return;
        }

        // otherwise open the tooltip
        this.show();
    }

    /** Handle the blur event - show or hide accordingly */
    protected onBlur(_: Event): void {

        // If the tooltip is pending then cancel showing it
        if (!this.isVisible && this.includes(this.hideTriggers, 'blur') && this._showTimeoutId !== null) {
            return this.cancelTooltip();
        }

        // this is an hide only trigger - if not open or it isn't a trigger do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'blur')) {
            return;
        }

        // otherwise close the tooltip
        this.hide();
    }

    /** Programmatically update the aria-describedby property */
    protected setAriaDescribedBy(id: string | null): void {
        if (id === null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
        } else {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', id);
        }
    }

    /** Cancel any pending tooltip (waiting on delay ellapsing) */
    private cancelTooltip(): void {
        if (this._showTimeoutId !== null) {
            clearTimeout(this._showTimeoutId);
            this._showTimeoutId = null;
        }
    }

}

export type AnchorPlacement = 'top' | 'right' | 'bottom' | 'left';
export type AnchorAlignment = 'start' | 'center' | 'end';
export type OverlayTrigger = 'click' | 'clickoutside' | 'escape' | 'mouseenter' | 'focus' | 'mouseleave' | 'blur';