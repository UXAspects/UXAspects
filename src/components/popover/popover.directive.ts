import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import { TooltipDirective } from '../tooltip/index';
import { PopoverComponent } from './popover.component';

@Directive({
    selector: '[uxPopover]',
    exportAs: 'ux-popover'
})
export class PopoverDirective extends TooltipDirective implements OnInit, OnChanges {

    /** Contains the content of the popover or a TemplateRef for more detailed content */
    @Input('uxPopover') content: string | TemplateRef<any>;

    /** Optionally display a title in the popover */
    @Input('popoverTitle') title: string;

    /** Allow the popover to be conditionally disabled */
    @Input('popoverDisabled') disabled: boolean;

    /** All the user to add a custom class to the popover */
    @Input('popoverClass') customClass: string = '';

    /** All the user to add a role to the popover - default is tooltip */
    @Input('popoverRole') role: string = 'tooltip';

    /** Provide the TemplateRef a context object */
    @Input('popoverContext') context: any = {};

    /** Specify which events should show the popover */
    @Input() showTriggers: string[] = ['click'];

    /** Specify which events should hide the popover */
    @Input() hideTriggers: string[] = ['click', 'outsideclick', 'escape'];

    /** A reference to the CDK portal containing the overlay */
    protected _portal: ComponentPortal<PopoverComponent>;

    /** A reference to the instance of the popover component when created */
    protected _instance: PopoverComponent;

    /** Set up the triggers and bind to the show/hide events to keep visibility in sync */
    ngOnInit(): void {

        // set up the event triggers
        fromEvent(document, 'keydown').pipe(takeUntil(this._onDestroy)).subscribe(this.onKeyDown.bind(this));

        // set up the default event triggers
        super.ngOnInit();
    }

    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     **/
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (this.isVisible && changes.title) {
            this._instance.setTitle(changes.title.currentValue);
        }
    }

    protected createInstance(overlayRef: OverlayRef): PopoverComponent {
        const instance = overlayRef.attach(this._portal).instance as PopoverComponent;

        // supply the tooltip with the correct properties
        instance.setTitle(this.title);
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);

        // Update the aria-describedby attribute
        this.describedBy = instance.id;

        // subscribe to the outside click event
        instance.clickOutside$.pipe(takeUntil(this._onDestroy)).subscribe(this.onOutsideClick.bind(this));

        return instance;
    }

    protected createPortal(): ComponentPortal<PopoverComponent> {
        return this._portal || new ComponentPortal(PopoverComponent, this._viewContainerRef);
    }

    private onKeyDown(event: KeyboardEvent): void {

        // if visible and the escape key is pressed and it is one of the hide triggers
        if (this.isVisible && event.keyCode === ESCAPE && this.includes(this.hideTriggers, 'escape')) {
            this.hide();
        }
    }

    private onOutsideClick(): void {
        // if visible and it is one of the hide triggers
        if (this.isVisible && this.includes(this.hideTriggers, 'outsideclick')) {
            this.hide();
        }
    }

}