/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ESCAPE } from '@angular/cdk/keycodes';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, HostBinding, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import { TooltipDirective } from '../tooltip/index';
import { PopoverComponent } from './popover.component';
export class PopoverDirective extends TooltipDirective {
    constructor() {
        super(...arguments);
        /**
         * All the user to add a custom class to the popover
         */
        this.customClass = '';
        /**
         * All the user to add a role to the popover - default is tooltip
         */
        this.role = 'tooltip';
        /**
         * Provide the TemplateRef a context object
         */
        this.context = {};
        /**
         * Delay the showing of the popover by a number of miliseconds
         */
        this.delay = 0;
        /**
         * Specify which events should show the popover
         */
        this.showTriggers = ['click'];
        /**
         * Specify which events should hide the popover
         */
        this.hideTriggers = ['click', 'clickoutside', 'escape'];
        /**
         * Keep track of the tooltip visibility and update aria-expanded attribute
         */
        this.isVisible = false;
        /**
         * Internally store the type of this component - usual for distinctions when extending the tooltip class
         */
        this._type = 'popover';
    }
    /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    ngOnInit() {
        // set up the event triggers
        fromEvent(document, 'keydown').pipe(takeUntil(this._onDestroy)).subscribe(this.onKeyDown.bind(this));
        // check if there is an aria-described by attribute
        this._ariaDescribedBy = this._elementRef.nativeElement.hasAttribute('aria-describedby');
        // set up the default event triggers
        super.ngOnInit();
    }
    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (this._instance && changes["title"]) {
            this._instance.setTitle(changes["title"].currentValue);
        }
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    createInstance(overlayRef) {
        const /** @type {?} */ instance = /** @type {?} */ (overlayRef.attach(this._portal).instance);
        // supply the tooltip with the correct properties
        instance.setTitle(this.title);
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);
        // Update the aria-describedby attribute
        this.setAriaDescribedBy(instance.id);
        // subscribe to the outside click event
        instance.clickOutside$.pipe(takeUntil(this._onDestroy)).subscribe(this.onClickOutside.bind(this));
        return instance;
    }
    /**
     * @return {?}
     */
    createPortal() {
        return this._portal || new ComponentPortal(PopoverComponent, this._viewContainerRef);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // if visible and the escape key is pressed and it is one of the hide triggers
        if (this.isVisible && event.keyCode === ESCAPE && this.includes(this.hideTriggers, 'escape')) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    onClickOutside() {
        // if visible and it is one of the hide triggers
        if (this.isVisible && this.includes(this.hideTriggers, 'clickoutside')) {
            this.hide();
        }
    }
    /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    setAriaDescribedBy(id) {
        // we only want to set the aria-describedby attr when the content is a string and there was no user defined attribute already
        if (this._ariaDescribedBy === false && typeof this.content === 'string') {
            super.setAriaDescribedBy(id);
        }
    }
}
PopoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxPopover]',
                exportAs: 'ux-popover'
            },] },
];
/** @nocollapse */
PopoverDirective.ctorParameters = () => [];
PopoverDirective.propDecorators = {
    "content": [{ type: Input, args: ['uxPopover',] },],
    "title": [{ type: Input, args: ['popoverTitle',] },],
    "disabled": [{ type: Input, args: ['popoverDisabled',] },],
    "customClass": [{ type: Input, args: ['popoverClass',] },],
    "role": [{ type: Input, args: ['popoverRole',] },],
    "context": [{ type: Input, args: ['popoverContext',] },],
    "delay": [{ type: Input, args: ['popoverDelay',] },],
    "showTriggers": [{ type: Input },],
    "hideTriggers": [{ type: Input },],
    "isVisible": [{ type: HostBinding, args: ['attr.aria-expanded',] },],
};
function PopoverDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PopoverDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PopoverDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PopoverDirective.propDecorators;
    /**
     * Contains the content of the popover or a TemplateRef for more detailed content
     * @type {?}
     */
    PopoverDirective.prototype.content;
    /**
     * Optionally display a title in the popover
     * @type {?}
     */
    PopoverDirective.prototype.title;
    /**
     * Allow the popover to be conditionally disabled
     * @type {?}
     */
    PopoverDirective.prototype.disabled;
    /**
     * All the user to add a custom class to the popover
     * @type {?}
     */
    PopoverDirective.prototype.customClass;
    /**
     * All the user to add a role to the popover - default is tooltip
     * @type {?}
     */
    PopoverDirective.prototype.role;
    /**
     * Provide the TemplateRef a context object
     * @type {?}
     */
    PopoverDirective.prototype.context;
    /**
     * Delay the showing of the popover by a number of miliseconds
     * @type {?}
     */
    PopoverDirective.prototype.delay;
    /**
     * Specify which events should show the popover
     * @type {?}
     */
    PopoverDirective.prototype.showTriggers;
    /**
     * Specify which events should hide the popover
     * @type {?}
     */
    PopoverDirective.prototype.hideTriggers;
    /**
     * Keep track of the tooltip visibility and update aria-expanded attribute
     * @type {?}
     */
    PopoverDirective.prototype.isVisible;
    /**
     * A reference to the CDK portal containing the overlay
     * @type {?}
     */
    PopoverDirective.prototype._portal;
    /**
     * A reference to the instance of the popover component when created
     * @type {?}
     */
    PopoverDirective.prototype._instance;
    /**
     * Determine whether or not an aria-describedby property originally existed on the element
     * @type {?}
     */
    PopoverDirective.prototype._ariaDescribedBy;
    /**
     * Internally store the type of this component - usual for distinctions when extending the tooltip class
     * @type {?}
     */
    PopoverDirective.prototype._type;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBaUQsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxNQUFNLHVCQUF3QixTQUFRLGdCQUFnQjs7Ozs7OzJCQVlMLEVBQUU7Ozs7b0JBR1YsU0FBUzs7Ozt1QkFHTixFQUFFOzs7O3FCQUdILENBQUM7Ozs7NEJBR04sQ0FBQyxPQUFPLENBQUM7Ozs7NEJBR1QsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQzs7Ozt5QkFHYixLQUFLOzs7O3FCQVluQyxTQUFTOzs7Ozs7SUFHbkMsUUFBUTs7UUFHSixTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR3JHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FB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QkFHTCxLQUFLOzBCQUdMLFdBQVcsU0FBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5pbXBvcnQgeyBQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4UG9wb3Zlcl0nLFxuICAgIGV4cG9ydEFzOiAndXgtcG9wb3Zlcidcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZSBleHRlbmRzIFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICAvKiogQ29udGFpbnMgdGhlIGNvbnRlbnQgb2YgdGhlIHBvcG92ZXIgb3IgYSBUZW1wbGF0ZVJlZiBmb3IgbW9yZSBkZXRhaWxlZCBjb250ZW50ICovXG4gICAgQElucHV0KCd1eFBvcG92ZXInKSBjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIE9wdGlvbmFsbHkgZGlzcGxheSBhIHRpdGxlIGluIHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCdwb3BvdmVyVGl0bGUnKSB0aXRsZTogc3RyaW5nO1xuXG4gICAgLyoqIEFsbG93IHRoZSBwb3BvdmVyIHRvIGJlIGNvbmRpdGlvbmFsbHkgZGlzYWJsZWQgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJEaXNhYmxlZCcpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIEFsbCB0aGUgdXNlciB0byBhZGQgYSBjdXN0b20gY2xhc3MgdG8gdGhlIHBvcG92ZXIgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJDbGFzcycpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBBbGwgdGhlIHVzZXIgdG8gYWRkIGEgcm9sZSB0byB0aGUgcG9wb3ZlciAtIGRlZmF1bHQgaXMgdG9vbHRpcCAqL1xuICAgIEBJbnB1dCgncG9wb3ZlclJvbGUnKSByb2xlOiBzdHJpbmcgPSAndG9vbHRpcCc7XG5cbiAgICAvKiogUHJvdmlkZSB0aGUgVGVtcGxhdGVSZWYgYSBjb250ZXh0IG9iamVjdCAqL1xuICAgIEBJbnB1dCgncG9wb3ZlckNvbnRleHQnKSBjb250ZXh0OiBhbnkgPSB7fTtcblxuICAgIC8qKiBEZWxheSB0aGUgc2hvd2luZyBvZiB0aGUgcG9wb3ZlciBieSBhIG51bWJlciBvZiBtaWxpc2Vjb25kcyAqL1xuICAgIEBJbnB1dCgncG9wb3ZlckRlbGF5JykgZGVsYXk6IG51bWJlciA9IDA7XG5cbiAgICAvKiogU3BlY2lmeSB3aGljaCBldmVudHMgc2hvdWxkIHNob3cgdGhlIHBvcG92ZXIgKi9cbiAgICBASW5wdXQoKSBzaG93VHJpZ2dlcnM6IHN0cmluZ1tdID0gWydjbGljayddO1xuXG4gICAgLyoqIFNwZWNpZnkgd2hpY2ggZXZlbnRzIHNob3VsZCBoaWRlIHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCkgaGlkZVRyaWdnZXJzOiBzdHJpbmdbXSA9IFsnY2xpY2snLCAnY2xpY2tvdXRzaWRlJywgJ2VzY2FwZSddO1xuXG4gICAgLyoqIEtlZXAgdHJhY2sgb2YgdGhlIHRvb2x0aXAgdmlzaWJpbGl0eSBhbmQgdXBkYXRlIGFyaWEtZXhwYW5kZWQgYXR0cmlidXRlICovXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZXhwYW5kZWQnKSBpc1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgQ0RLIHBvcnRhbCBjb250YWluaW5nIHRoZSBvdmVybGF5ICovXG4gICAgcHJvdGVjdGVkIF9wb3J0YWw6IENvbXBvbmVudFBvcnRhbDxQb3BvdmVyQ29tcG9uZW50PjtcblxuICAgIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgdGhlIHBvcG92ZXIgY29tcG9uZW50IHdoZW4gY3JlYXRlZCAqL1xuICAgIHByb3RlY3RlZCBfaW5zdGFuY2U6IFBvcG92ZXJDb21wb25lbnQ7XG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGFuIGFyaWEtZGVzY3JpYmVkYnkgcHJvcGVydHkgb3JpZ2luYWxseSBleGlzdGVkIG9uIHRoZSBlbGVtZW50ICovXG4gICAgcHJpdmF0ZSBfYXJpYURlc2NyaWJlZEJ5OiBib29sZWFuO1xuXG4gICAgLyoqIEludGVybmFsbHkgc3RvcmUgdGhlIHR5cGUgb2YgdGhpcyBjb21wb25lbnQgLSB1c3VhbCBmb3IgZGlzdGluY3Rpb25zIHdoZW4gZXh0ZW5kaW5nIHRoZSB0b29sdGlwIGNsYXNzICovXG4gICAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAncG9wb3Zlcic7XG5cbiAgICAvKiogU2V0IHVwIHRoZSB0cmlnZ2VycyBhbmQgYmluZCB0byB0aGUgc2hvdy9oaWRlIGV2ZW50cyB0byBrZWVwIHZpc2liaWxpdHkgaW4gc3luYyAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgZXZlbnQgdHJpZ2dlcnNcbiAgICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicpLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhbiBhcmlhLWRlc2NyaWJlZCBieSBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy5fYXJpYURlc2NyaWJlZEJ5ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpO1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgZGVmYXVsdCBldmVudCB0cmlnZ2Vyc1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIG5lZWQgdG8gc2VuZCBpbnB1dCBjaGFuZ2VzIHRvIHRoZSBwb3BvdmVyIGNvbXBvbmVudFxuICAgICAqIFdlIGNhbid0IHVzZSBzZXR0ZXJzIGFzIHRoZXkgbWF5IHRyaWdnZXIgYmVmb3JlIHBvcG92ZXIgaW5pdGlhbGlzZWQgYW5kIGNhbid0IHJlc2VuZCBvbmNlIGluaXRpYWxpc2VkXG4gICAgICoqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICYmIGNoYW5nZXMudGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnNldFRpdGxlKGNoYW5nZXMudGl0bGUuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVJbnN0YW5jZShvdmVybGF5UmVmOiBPdmVybGF5UmVmKTogUG9wb3ZlckNvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fcG9ydGFsKS5pbnN0YW5jZSBhcyBQb3BvdmVyQ29tcG9uZW50O1xuXG4gICAgICAgIC8vIHN1cHBseSB0aGUgdG9vbHRpcCB3aXRoIHRoZSBjb3JyZWN0IHByb3BlcnRpZXNcbiAgICAgICAgaW5zdGFuY2Uuc2V0VGl0bGUodGhpcy50aXRsZSk7XG4gICAgICAgIGluc3RhbmNlLnNldENvbnRlbnQodGhpcy5jb250ZW50KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0UGxhY2VtZW50KHRoaXMucGxhY2VtZW50KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q2xhc3ModGhpcy5jdXN0b21DbGFzcyk7XG4gICAgICAgIGluc3RhbmNlLnNldENvbnRleHQodGhpcy5jb250ZXh0KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Um9sZSh0aGlzLnJvbGUpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy5zZXRBcmlhRGVzY3JpYmVkQnkoaW5zdGFuY2UuaWQpO1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byB0aGUgb3V0c2lkZSBjbGljayBldmVudFxuICAgICAgICBpbnN0YW5jZS5jbGlja091dHNpZGUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uQ2xpY2tPdXRzaWRlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUG9ydGFsKCk6IENvbXBvbmVudFBvcnRhbDxQb3BvdmVyQ29tcG9uZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3J0YWwgfHwgbmV3IENvbXBvbmVudFBvcnRhbChQb3BvdmVyQ29tcG9uZW50LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHZpc2libGUgYW5kIHRoZSBlc2NhcGUga2V5IGlzIHByZXNzZWQgYW5kIGl0IGlzIG9uZSBvZiB0aGUgaGlkZSB0cmlnZ2Vyc1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuaW5jbHVkZXModGhpcy5oaWRlVHJpZ2dlcnMsICdlc2NhcGUnKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tPdXRzaWRlKCk6IHZvaWQge1xuICAgICAgICAvLyBpZiB2aXNpYmxlIGFuZCBpdCBpcyBvbmUgb2YgdGhlIGhpZGUgdHJpZ2dlcnNcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlICYmIHRoaXMuaW5jbHVkZXModGhpcy5oaWRlVHJpZ2dlcnMsICdjbGlja291dHNpZGUnKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUHJvZ3JhbW1hdGljYWxseSB1cGRhdGUgdGhlIGFyaWEtZGVzY3JpYmVkYnkgcHJvcGVydHkgKi9cbiAgICBwcm90ZWN0ZWQgc2V0QXJpYURlc2NyaWJlZEJ5KGlkOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIHNldCB0aGUgYXJpYS1kZXNjcmliZWRieSBhdHRyIHdoZW4gdGhlIGNvbnRlbnQgaXMgYSBzdHJpbmcgYW5kIHRoZXJlIHdhcyBubyB1c2VyIGRlZmluZWQgYXR0cmlidXRlIGFscmVhZHlcbiAgICAgICAgaWYgKHRoaXMuX2FyaWFEZXNjcmliZWRCeSA9PT0gZmFsc2UgJiYgdHlwZW9mIHRoaXMuY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHN1cGVyLnNldEFyaWFEZXNjcmliZWRCeShpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=