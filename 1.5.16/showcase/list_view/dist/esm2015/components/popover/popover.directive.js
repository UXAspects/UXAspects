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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBaUQsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxNQUFNLHVCQUF3QixTQUFRLGdCQUFnQjs7Ozs7OzJCQVlMLEVBQUU7Ozs7b0JBR1YsU0FBUzs7Ozt1QkFHTixFQUFFOzs7O3FCQUdILENBQUM7Ozs7NEJBR04sQ0FBQyxPQUFPLENBQUM7Ozs7NEJBR1QsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQzs7Ozt5QkFHYixLQUFLOzs7O3FCQVluQyxTQUFTOzs7Ozs7SUFHbkMsUUFBUTs7UUFHSixTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR3JHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FB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QUdMLEtBQUs7MEJBR0wsV0FBVyxTQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICcuLi90b29sdGlwL2luZGV4JztcbmltcG9ydCB7IFBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXIuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhQb3BvdmVyXScsXG4gICAgZXhwb3J0QXM6ICd1eC1wb3BvdmVyJ1xufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyRGlyZWN0aXZlIGV4dGVuZHMgVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIC8qKiBDb250YWlucyB0aGUgY29udGVudCBvZiB0aGUgcG9wb3ZlciBvciBhIFRlbXBsYXRlUmVmIGZvciBtb3JlIGRldGFpbGVkIGNvbnRlbnQgKi9cbiAgICBASW5wdXQoJ3V4UG9wb3ZlcicpIGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogT3B0aW9uYWxseSBkaXNwbGF5IGEgdGl0bGUgaW4gdGhlIHBvcG92ZXIgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJUaXRsZScpIHRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKiogQWxsb3cgdGhlIHBvcG92ZXIgdG8gYmUgY29uZGl0aW9uYWxseSBkaXNhYmxlZCAqL1xuICAgIEBJbnB1dCgncG9wb3ZlckRpc2FibGVkJykgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogQWxsIHRoZSB1c2VyIHRvIGFkZCBhIGN1c3RvbSBjbGFzcyB0byB0aGUgcG9wb3ZlciAqL1xuICAgIEBJbnB1dCgncG9wb3ZlckNsYXNzJykgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIEFsbCB0aGUgdXNlciB0byBhZGQgYSByb2xlIHRvIHRoZSBwb3BvdmVyIC0gZGVmYXVsdCBpcyB0b29sdGlwICovXG4gICAgQElucHV0KCdwb3BvdmVyUm9sZScpIHJvbGU6IHN0cmluZyA9ICd0b29sdGlwJztcblxuICAgIC8qKiBQcm92aWRlIHRoZSBUZW1wbGF0ZVJlZiBhIGNvbnRleHQgb2JqZWN0ICovXG4gICAgQElucHV0KCdwb3BvdmVyQ29udGV4dCcpIGNvbnRleHQ6IGFueSA9IHt9O1xuXG4gICAgLyoqIERlbGF5IHRoZSBzaG93aW5nIG9mIHRoZSBwb3BvdmVyIGJ5IGEgbnVtYmVyIG9mIG1pbGlzZWNvbmRzICovXG4gICAgQElucHV0KCdwb3BvdmVyRGVsYXknKSBkZWxheTogbnVtYmVyID0gMDtcblxuICAgIC8qKiBTcGVjaWZ5IHdoaWNoIGV2ZW50cyBzaG91bGQgc2hvdyB0aGUgcG9wb3ZlciAqL1xuICAgIEBJbnB1dCgpIHNob3dUcmlnZ2Vyczogc3RyaW5nW10gPSBbJ2NsaWNrJ107XG5cbiAgICAvKiogU3BlY2lmeSB3aGljaCBldmVudHMgc2hvdWxkIGhpZGUgdGhlIHBvcG92ZXIgKi9cbiAgICBASW5wdXQoKSBoaWRlVHJpZ2dlcnM6IHN0cmluZ1tdID0gWydjbGljaycsICdjbGlja291dHNpZGUnLCAnZXNjYXBlJ107XG5cbiAgICAvKiogS2VlcCB0cmFjayBvZiB0aGUgdG9vbHRpcCB2aXNpYmlsaXR5IGFuZCB1cGRhdGUgYXJpYS1leHBhbmRlZCBhdHRyaWJ1dGUgKi9cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1leHBhbmRlZCcpIGlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBDREsgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIG92ZXJsYXkgKi9cbiAgICBwcm90ZWN0ZWQgX3BvcnRhbDogQ29tcG9uZW50UG9ydGFsPFBvcG92ZXJDb21wb25lbnQ+O1xuXG4gICAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiB0aGUgcG9wb3ZlciBjb21wb25lbnQgd2hlbiBjcmVhdGVkICovXG4gICAgcHJvdGVjdGVkIF9pbnN0YW5jZTogUG9wb3ZlckNvbXBvbmVudDtcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYW4gYXJpYS1kZXNjcmliZWRieSBwcm9wZXJ0eSBvcmlnaW5hbGx5IGV4aXN0ZWQgb24gdGhlIGVsZW1lbnQgKi9cbiAgICBwcml2YXRlIF9hcmlhRGVzY3JpYmVkQnk6IGJvb2xlYW47XG5cbiAgICAvKiogSW50ZXJuYWxseSBzdG9yZSB0aGUgdHlwZSBvZiB0aGlzIGNvbXBvbmVudCAtIHVzdWFsIGZvciBkaXN0aW5jdGlvbnMgd2hlbiBleHRlbmRpbmcgdGhlIHRvb2x0aXAgY2xhc3MgKi9cbiAgICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdwb3BvdmVyJztcblxuICAgIC8qKiBTZXQgdXAgdGhlIHRyaWdnZXJzIGFuZCBiaW5kIHRvIHRoZSBzaG93L2hpZGUgZXZlbnRzIHRvIGtlZXAgdmlzaWJpbGl0eSBpbiBzeW5jICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc2V0IHVwIHRoZSBldmVudCB0cmlnZ2Vyc1xuICAgICAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMub25LZXlEb3duLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFuIGFyaWEtZGVzY3JpYmVkIGJ5IGF0dHJpYnV0ZVxuICAgICAgICB0aGlzLl9hcmlhRGVzY3JpYmVkQnkgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG5cbiAgICAgICAgLy8gc2V0IHVwIHRoZSBkZWZhdWx0IGV2ZW50IHRyaWdnZXJzXG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgbmVlZCB0byBzZW5kIGlucHV0IGNoYW5nZXMgdG8gdGhlIHBvcG92ZXIgY29tcG9uZW50XG4gICAgICogV2UgY2FuJ3QgdXNlIHNldHRlcnMgYXMgdGhleSBtYXkgdHJpZ2dlciBiZWZvcmUgcG9wb3ZlciBpbml0aWFsaXNlZCBhbmQgY2FuJ3QgcmVzZW5kIG9uY2UgaW5pdGlhbGlzZWRcbiAgICAgKiovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgJiYgY2hhbmdlcy50aXRsZSkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2Uuc2V0VGl0bGUoY2hhbmdlcy50aXRsZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUluc3RhbmNlKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpOiBQb3BvdmVyQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpLmluc3RhbmNlIGFzIFBvcG92ZXJDb21wb25lbnQ7XG5cbiAgICAgICAgLy8gc3VwcGx5IHRoZSB0b29sdGlwIHdpdGggdGhlIGNvcnJlY3QgcHJvcGVydGllc1xuICAgICAgICBpbnN0YW5jZS5zZXRUaXRsZSh0aGlzLnRpdGxlKTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q29udGVudCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICBpbnN0YW5jZS5zZXRQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQpO1xuICAgICAgICBpbnN0YW5jZS5zZXRDbGFzcyh0aGlzLmN1c3RvbUNsYXNzKTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q29udGV4dCh0aGlzLmNvbnRleHQpO1xuICAgICAgICBpbnN0YW5jZS5zZXRSb2xlKHRoaXMucm9sZSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZVxuICAgICAgICB0aGlzLnNldEFyaWFEZXNjcmliZWRCeShpbnN0YW5jZS5pZCk7XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBvdXRzaWRlIGNsaWNrIGV2ZW50XG4gICAgICAgIGluc3RhbmNlLmNsaWNrT3V0c2lkZSQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMub25DbGlja091dHNpZGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVQb3J0YWwoKTogQ29tcG9uZW50UG9ydGFsPFBvcG92ZXJDb21wb25lbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKFBvcG92ZXJDb21wb25lbnQsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdmlzaWJsZSBhbmQgdGhlIGVzY2FwZSBrZXkgaXMgcHJlc3NlZCBhbmQgaXQgaXMgb25lIG9mIHRoZSBoaWRlIHRyaWdnZXJzXG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSAmJiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5pbmNsdWRlcyh0aGlzLmhpZGVUcmlnZ2VycywgJ2VzY2FwZScpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja091dHNpZGUoKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHZpc2libGUgYW5kIGl0IGlzIG9uZSBvZiB0aGUgaGlkZSB0cmlnZ2Vyc1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgdGhpcy5pbmNsdWRlcyh0aGlzLmhpZGVUcmlnZ2VycywgJ2NsaWNrb3V0c2lkZScpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQcm9ncmFtbWF0aWNhbGx5IHVwZGF0ZSB0aGUgYXJpYS1kZXNjcmliZWRieSBwcm9wZXJ0eSAqL1xuICAgIHByb3RlY3RlZCBzZXRBcmlhRGVzY3JpYmVkQnkoaWQ6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gc2V0IHRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHIgd2hlbiB0aGUgY29udGVudCBpcyBhIHN0cmluZyBhbmQgdGhlcmUgd2FzIG5vIHVzZXIgZGVmaW5lZCBhdHRyaWJ1dGUgYWxyZWFkeVxuICAgICAgICBpZiAodGhpcy5fYXJpYURlc2NyaWJlZEJ5ID09PSBmYWxzZSAmJiB0eXBlb2YgdGhpcy5jb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc3VwZXIuc2V0QXJpYURlc2NyaWJlZEJ5KGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==