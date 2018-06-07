import { Overlay, OverlayRef, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
export declare class TooltipDirective implements OnInit, OnChanges, OnDestroy {
    protected _elementRef: ElementRef;
    protected _viewContainerRef: ViewContainerRef;
    protected _overlay: Overlay;
    protected _scrollDispatcher: ScrollDispatcher;
    private _changeDetectorRef;
    private _renderer;
    private _tooltipService;
    /** Contains the content of the tooltip or a TemplateRef for more detailed content */
    content: string | TemplateRef<any>;
    /** Allow the tooltip to be conditionally disabled */
    disabled: boolean;
    /** All the user to add a custom class to the tooltip */
    customClass: string;
    /** All the user to add a role to the tooltip - default is tooltip */
    role: string;
    /** Provide the TemplateRef a context object */
    context: any;
    /** Delay the showing of the tooltip by a number of miliseconds */
    delay: number;
    /** Programmatically show and hide the tooltip */
    isOpen: boolean;
    /** Customize how the tooltip should be positioned relative to the element */
    placement: AnchorPlacement;
    /** Specify which events should show the tooltip */
    showTriggers: string[];
    /** Specify which events should hide the tooltip */
    hideTriggers: string[];
    /** Emits an event when the tooltip is shown */
    shown: EventEmitter<void>;
    /** Emits a event when the tooltip is hidden */
    hidden: EventEmitter<void>;
    /** Allow two way binding to track the visibility of the tooltip */
    isOpenChange: EventEmitter<boolean>;
    /** Keep track of the tooltip visibility */
    isVisible: boolean;
    /** A reference to the CDK portal containing the overlay */
    protected _portal: ComponentPortal<TooltipComponent>;
    /** A reference to the overlay the tooltip will be inserted into */
    protected _overlayRef: OverlayRef;
    /** A reference to the instance of the tooltip component when created */
    protected _instance: TooltipComponent;
    /** This will emit when the directive is destroyed allowing us to unsubscribe all subscriptions automatically */
    protected _onDestroy: Subject<void>;
    /** Store the timeout interval for cancelation */
    private _showTimeoutId;
    /** Internally store the type of this component - usual for distinctions when extending this class */
    protected _type: string;
    constructor(_elementRef: ElementRef, _viewContainerRef: ViewContainerRef, _overlay: Overlay, _scrollDispatcher: ScrollDispatcher, _changeDetectorRef: ChangeDetectorRef, _renderer: Renderer2, _tooltipService: TooltipService);
    /** Set up the triggers and bind to the show/hide events to keep visibility in sync */
    ngOnInit(): void;
    /**
     * We need to send input changes to the tooltip component
     * We can't use setters as they may trigger before tooltip initialised and can't resend once initialised
     **/
    ngOnChanges(changes: SimpleChanges): void;
    /** Ensure we clean up after ourselves */
    ngOnDestroy(): void;
    /** Make the tooltip open */
    show(): void;
    /** If a tooltip exists and is visible, hide it */
    hide(): void;
    /** Toggle the visibility of the tooltip */
    toggle(): void;
    /** Recalculate the position of the popover */
    reposition(): void;
    /** Create an instance from the overlay ref - allows overriding and additional logic here */
    protected createInstance(overlayRef: OverlayRef): TooltipComponent;
    /** Create the component portal - allows overriding to allow other portals eg. popovers */
    protected createPortal(): ComponentPortal<any>;
    /** Create the overlay and set up the scroll handling behavior */
    private createOverlay();
    /** Recreate the overlay ref using the updated origin and overlay positions */
    private destroyOverlay();
    /** Get the origin position based on the specified tooltip placement */
    private getOrigin();
    /** Calculate the overlay position based on the specified tooltip placement */
    private getOverlayPosition();
    /**
     * Simple utility method - because IE doesn't support array.includes
     * And it isn't included in the core-js/es6 polyfills which are the
     * only ones required by Angular and guaranteed to be there
     **/
    protected includes<T>(array: Array<T>, value: T): boolean;
    /** Handle the click event - show or hide accordingly */
    protected onClick(event: MouseEvent): void;
    /** Handle the mouse enter event - show or hide accordingly */
    protected onMouseEnter(event: MouseEvent): void;
    /** Handle the mouse leave event - show or hide accordingly */
    protected onMouseLeave(event: MouseEvent): void;
    /** Handle the focus event - show or hide accordingly */
    protected onFocus(event: Event): void;
    /** Handle the blur event - show or hide accordingly */
    protected onBlur(event: Event): void;
    /** Determine if the trigger element is focused */
    private isFocused();
    /** Programmatically update the aria-describedby property */
    protected setAriaDescribedBy(id: string | null): void;
}
export declare type AnchorPlacement = 'top' | 'right' | 'bottom' | 'left';
