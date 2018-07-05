import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { TooltipDirective } from '../tooltip/index';
import { PopoverComponent } from './popover.component';
export declare class PopoverDirective extends TooltipDirective implements OnInit, OnChanges {
    /** Contains the content of the popover or a TemplateRef for more detailed content */
    content: string | TemplateRef<any>;
    /** Optionally display a title in the popover */
    title: string;
    /** Allow the popover to be conditionally disabled */
    disabled: boolean;
    /** All the user to add a custom class to the popover */
    customClass: string;
    /** All the user to add a role to the popover - default is tooltip */
    role: string;
    /** Provide the TemplateRef a context object */
    context: any;
    /** Delay the showing of the popover by a number of miliseconds */
    delay: number;
    /** Specify which events should show the popover */
    showTriggers: string[];
    /** Specify which events should hide the popover */
    hideTriggers: string[];
    /** Keep track of the tooltip visibility and update aria-expanded attribute */
    isVisible: boolean;
    /** A reference to the CDK portal containing the overlay */
    protected _portal: ComponentPortal<PopoverComponent>;
    /** A reference to the instance of the popover component when created */
    protected _instance: PopoverComponent;
    /** Determine whether or not an aria-describedby property originally existed on the element */
    private _ariaDescribedBy;
    /** Internally store the type of this component - usual for distinctions when extending the tooltip class */
    protected _type: string;
    /** Set up the triggers and bind to the show/hide events to keep visibility in sync */
    ngOnInit(): void;
    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     **/
    ngOnChanges(changes: SimpleChanges): void;
    protected createInstance(overlayRef: OverlayRef): PopoverComponent;
    protected createPortal(): ComponentPortal<PopoverComponent>;
    private onKeyDown(event);
    private onClickOutside();
    /** Programmatically update the aria-describedby property */
    protected setAriaDescribedBy(id: string | null): void;
}
