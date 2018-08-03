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
            },] }
];
PopoverDirective.propDecorators = {
    content: [{ type: Input, args: ['uxPopover',] }],
    title: [{ type: Input, args: ['popoverTitle',] }],
    disabled: [{ type: Input, args: ['popoverDisabled',] }],
    customClass: [{ type: Input, args: ['popoverClass',] }],
    role: [{ type: Input, args: ['popoverRole',] }],
    context: [{ type: Input, args: ['popoverContext',] }],
    delay: [{ type: Input, args: ['popoverDelay',] }],
    showTriggers: [{ type: Input }],
    hideTriggers: [{ type: Input }],
    isVisible: [{ type: HostBinding, args: ['attr.aria-expanded',] }]
};
function PopoverDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBaUQsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxNQUFNLHVCQUF3QixTQUFRLGdCQUFnQjs7Ozs7OzJCQVlMLEVBQUU7Ozs7b0JBR1YsU0FBUzs7Ozt1QkFHTixFQUFFOzs7O3FCQUdILENBQUM7Ozs7NEJBR04sQ0FBQyxPQUFPLENBQUM7Ozs7NEJBR1QsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQzs7Ozt5QkFHYixLQUFLOzs7O3FCQVluQyxTQUFTOzs7Ozs7SUFHbkMsUUFBUTs7UUFHSixTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR3JHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FB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R0wsS0FBSzt3QkFHTCxXQUFXLFNBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFBvcG92ZXJdJyxcbiAgICBleHBvcnRBczogJ3V4LXBvcG92ZXInXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJEaXJlY3RpdmUgZXh0ZW5kcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIENvbnRhaW5zIHRoZSBjb250ZW50IG9mIHRoZSBwb3BvdmVyIG9yIGEgVGVtcGxhdGVSZWYgZm9yIG1vcmUgZGV0YWlsZWQgY29udGVudCAqL1xuICAgIEBJbnB1dCgndXhQb3BvdmVyJykgY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBPcHRpb25hbGx5IGRpc3BsYXkgYSB0aXRsZSBpbiB0aGUgcG9wb3ZlciAqL1xuICAgIEBJbnB1dCgncG9wb3ZlclRpdGxlJykgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKiBBbGxvdyB0aGUgcG9wb3ZlciB0byBiZSBjb25kaXRpb25hbGx5IGRpc2FibGVkICovXG4gICAgQElucHV0KCdwb3BvdmVyRGlzYWJsZWQnKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBBbGwgdGhlIHVzZXIgdG8gYWRkIGEgY3VzdG9tIGNsYXNzIHRvIHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCdwb3BvdmVyQ2xhc3MnKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogQWxsIHRoZSB1c2VyIHRvIGFkZCBhIHJvbGUgdG8gdGhlIHBvcG92ZXIgLSBkZWZhdWx0IGlzIHRvb2x0aXAgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJSb2xlJykgcm9sZTogc3RyaW5nID0gJ3Rvb2x0aXAnO1xuXG4gICAgLyoqIFByb3ZpZGUgdGhlIFRlbXBsYXRlUmVmIGEgY29udGV4dCBvYmplY3QgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJDb250ZXh0JykgY29udGV4dDogYW55ID0ge307XG5cbiAgICAvKiogRGVsYXkgdGhlIHNob3dpbmcgb2YgdGhlIHBvcG92ZXIgYnkgYSBudW1iZXIgb2YgbWlsaXNlY29uZHMgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJEZWxheScpIGRlbGF5OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFNwZWNpZnkgd2hpY2ggZXZlbnRzIHNob3VsZCBzaG93IHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCkgc2hvd1RyaWdnZXJzOiBzdHJpbmdbXSA9IFsnY2xpY2snXTtcblxuICAgIC8qKiBTcGVjaWZ5IHdoaWNoIGV2ZW50cyBzaG91bGQgaGlkZSB0aGUgcG9wb3ZlciAqL1xuICAgIEBJbnB1dCgpIGhpZGVUcmlnZ2Vyczogc3RyaW5nW10gPSBbJ2NsaWNrJywgJ2NsaWNrb3V0c2lkZScsICdlc2NhcGUnXTtcblxuICAgIC8qKiBLZWVwIHRyYWNrIG9mIHRoZSB0b29sdGlwIHZpc2liaWxpdHkgYW5kIHVwZGF0ZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSAqL1xuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJykgaXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIENESyBwb3J0YWwgY29udGFpbmluZyB0aGUgb3ZlcmxheSAqL1xuICAgIHByb3RlY3RlZCBfcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8UG9wb3ZlckNvbXBvbmVudD47XG5cbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIG9mIHRoZSBwb3BvdmVyIGNvbXBvbmVudCB3aGVuIGNyZWF0ZWQgKi9cbiAgICBwcm90ZWN0ZWQgX2luc3RhbmNlOiBQb3BvdmVyQ29tcG9uZW50O1xuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCBhbiBhcmlhLWRlc2NyaWJlZGJ5IHByb3BlcnR5IG9yaWdpbmFsbHkgZXhpc3RlZCBvbiB0aGUgZWxlbWVudCAqL1xuICAgIHByaXZhdGUgX2FyaWFEZXNjcmliZWRCeTogYm9vbGVhbjtcblxuICAgIC8qKiBJbnRlcm5hbGx5IHN0b3JlIHRoZSB0eXBlIG9mIHRoaXMgY29tcG9uZW50IC0gdXN1YWwgZm9yIGRpc3RpbmN0aW9ucyB3aGVuIGV4dGVuZGluZyB0aGUgdG9vbHRpcCBjbGFzcyAqL1xuICAgIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ3BvcG92ZXInO1xuXG4gICAgLyoqIFNldCB1cCB0aGUgdHJpZ2dlcnMgYW5kIGJpbmQgdG8gdGhlIHNob3cvaGlkZSBldmVudHMgdG8ga2VlcCB2aXNpYmlsaXR5IGluIHN5bmMgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzZXQgdXAgdGhlIGV2ZW50IHRyaWdnZXJzXG4gICAgICAgIGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbktleURvd24uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYW4gYXJpYS1kZXNjcmliZWQgYnkgYXR0cmlidXRlXG4gICAgICAgIHRoaXMuX2FyaWFEZXNjcmliZWRCeSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKTtcblxuICAgICAgICAvLyBzZXQgdXAgdGhlIGRlZmF1bHQgZXZlbnQgdHJpZ2dlcnNcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBuZWVkIHRvIHNlbmQgaW5wdXQgY2hhbmdlcyB0byB0aGUgcG9wb3ZlciBjb21wb25lbnRcbiAgICAgKiBXZSBjYW4ndCB1c2Ugc2V0dGVycyBhcyB0aGV5IG1heSB0cmlnZ2VyIGJlZm9yZSBwb3BvdmVyIGluaXRpYWxpc2VkIGFuZCBjYW4ndCByZXNlbmQgb25jZSBpbml0aWFsaXNlZFxuICAgICAqKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSAmJiBjaGFuZ2VzLnRpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5zZXRUaXRsZShjaGFuZ2VzLnRpdGxlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlSW5zdGFuY2Uob3ZlcmxheVJlZjogT3ZlcmxheVJlZik6IFBvcG92ZXJDb21wb25lbnQge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMuX3BvcnRhbCkuaW5zdGFuY2UgYXMgUG9wb3ZlckNvbXBvbmVudDtcblxuICAgICAgICAvLyBzdXBwbHkgdGhlIHRvb2x0aXAgd2l0aCB0aGUgY29ycmVjdCBwcm9wZXJ0aWVzXG4gICAgICAgIGluc3RhbmNlLnNldFRpdGxlKHRoaXMudGl0bGUpO1xuICAgICAgICBpbnN0YW5jZS5zZXRDb250ZW50KHRoaXMuY29udGVudCk7XG4gICAgICAgIGluc3RhbmNlLnNldFBsYWNlbWVudCh0aGlzLnBsYWNlbWVudCk7XG4gICAgICAgIGluc3RhbmNlLnNldENsYXNzKHRoaXMuY3VzdG9tQ2xhc3MpO1xuICAgICAgICBpbnN0YW5jZS5zZXRDb250ZXh0KHRoaXMuY29udGV4dCk7XG4gICAgICAgIGluc3RhbmNlLnNldFJvbGUodGhpcy5yb2xlKTtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlXG4gICAgICAgIHRoaXMuc2V0QXJpYURlc2NyaWJlZEJ5KGluc3RhbmNlLmlkKTtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIG91dHNpZGUgY2xpY2sgZXZlbnRcbiAgICAgICAgaW5zdGFuY2UuY2xpY2tPdXRzaWRlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbkNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVBvcnRhbCgpOiBDb21wb25lbnRQb3J0YWw8UG9wb3ZlckNvbXBvbmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoUG9wb3ZlckNvbXBvbmVudCwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB2aXNpYmxlIGFuZCB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkIGFuZCBpdCBpcyBvbmUgb2YgdGhlIGhpZGUgdHJpZ2dlcnNcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmluY2x1ZGVzKHRoaXMuaGlkZVRyaWdnZXJzLCAnZXNjYXBlJykpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrT3V0c2lkZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgdmlzaWJsZSBhbmQgaXQgaXMgb25lIG9mIHRoZSBoaWRlIHRyaWdnZXJzXG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSAmJiB0aGlzLmluY2x1ZGVzKHRoaXMuaGlkZVRyaWdnZXJzLCAnY2xpY2tvdXRzaWRlJykpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFByb2dyYW1tYXRpY2FsbHkgdXBkYXRlIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IHByb3BlcnR5ICovXG4gICAgcHJvdGVjdGVkIHNldEFyaWFEZXNjcmliZWRCeShpZDogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBzZXQgdGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0ciB3aGVuIHRoZSBjb250ZW50IGlzIGEgc3RyaW5nIGFuZCB0aGVyZSB3YXMgbm8gdXNlciBkZWZpbmVkIGF0dHJpYnV0ZSBhbHJlYWR5XG4gICAgICAgIGlmICh0aGlzLl9hcmlhRGVzY3JpYmVkQnkgPT09IGZhbHNlICYmIHR5cGVvZiB0aGlzLmNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzdXBlci5zZXRBcmlhRGVzY3JpYmVkQnkoaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19