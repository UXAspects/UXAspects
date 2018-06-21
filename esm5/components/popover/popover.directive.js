/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ESCAPE } from '@angular/cdk/keycodes';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, HostBinding, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import { TooltipDirective } from '../tooltip/index';
import { PopoverComponent } from './popover.component';
var PopoverDirective = (function (_super) {
    tslib_1.__extends(PopoverDirective, _super);
    function PopoverDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * All the user to add a custom class to the popover
         */
        _this.customClass = '';
        /**
         * All the user to add a role to the popover - default is tooltip
         */
        _this.role = 'tooltip';
        /**
         * Provide the TemplateRef a context object
         */
        _this.context = {};
        /**
         * Delay the showing of the popover by a number of miliseconds
         */
        _this.delay = 0;
        /**
         * Specify which events should show the popover
         */
        _this.showTriggers = ['click'];
        /**
         * Specify which events should hide the popover
         */
        _this.hideTriggers = ['click', 'clickoutside', 'escape'];
        /**
         * Keep track of the tooltip visibility and update aria-expanded attribute
         */
        _this.isVisible = false;
        /**
         * Internally store the type of this component - usual for distinctions when extending the tooltip class
         */
        _this._type = 'popover';
        return _this;
    }
    /** Set up the triggers and bind to the show/hide events to keep visibility in sync */
    /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    PopoverDirective.prototype.ngOnInit = /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    function () {
        // set up the event triggers
        fromEvent(document, 'keydown').pipe(takeUntil(this._onDestroy)).subscribe(this.onKeyDown.bind(this));
        // check if there is an aria-described by attribute
        this._ariaDescribedBy = this._elementRef.nativeElement.hasAttribute('aria-describedby');
        // set up the default event triggers
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     **/
    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    PopoverDirective.prototype.ngOnChanges = /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this._instance && changes["title"]) {
            this._instance.setTitle(changes["title"].currentValue);
        }
    };
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    PopoverDirective.prototype.createInstance = /**
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        var /** @type {?} */ instance = /** @type {?} */ (overlayRef.attach(this._portal).instance);
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
    };
    /**
     * @return {?}
     */
    PopoverDirective.prototype.createPortal = /**
     * @return {?}
     */
    function () {
        return this._portal || new ComponentPortal(PopoverComponent, this._viewContainerRef);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopoverDirective.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // if visible and the escape key is pressed and it is one of the hide triggers
        if (this.isVisible && event.keyCode === ESCAPE && this.includes(this.hideTriggers, 'escape')) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    PopoverDirective.prototype.onClickOutside = /**
     * @return {?}
     */
    function () {
        // if visible and it is one of the hide triggers
        if (this.isVisible && this.includes(this.hideTriggers, 'clickoutside')) {
            this.hide();
        }
    };
    /** Programmatically update the aria-describedby property */
    /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    PopoverDirective.prototype.setAriaDescribedBy = /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    function (id) {
        // we only want to set the aria-describedby attr when the content is a string and there was no user defined attribute already
        if (this._ariaDescribedBy === false && typeof this.content === 'string') {
            _super.prototype.setAriaDescribedBy.call(this, id);
        }
    };
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
    return PopoverDirective;
}(TooltipDirective));
export { PopoverDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWlELE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBTWpCLDRDQUFnQjs7Ozs7OzRCQVlMLEVBQUU7Ozs7cUJBR1YsU0FBUzs7Ozt3QkFHTixFQUFFOzs7O3NCQUdILENBQUM7Ozs7NkJBR04sQ0FBQyxPQUFPLENBQUM7Ozs7NkJBR1QsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQzs7OzswQkFHYixLQUFLOzs7O3NCQVluQyxTQUFTOzs7SUFFbkMsc0ZBQXNGOzs7OztJQUN0RixtQ0FBUTs7OztJQUFSOztRQUdJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7UUFHckcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMs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SyxTQUFDLGFBQWE7NEJBR25CLEtBQUssU0FBQyxnQkFBZ0I7MEJBR3RCLEtBQUssU0FBQyxjQUFjO2lDQUdwQixLQUFLO2lDQUdMLEtBQUs7OEJBR0wsV0FBVyxTQUFDLG9CQUFvQjs7MkJBM0NyQztFQWFzQyxnQkFBZ0I7U0FBekMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFBvcG92ZXJdJyxcbiAgICBleHBvcnRBczogJ3V4LXBvcG92ZXInXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJEaXJlY3RpdmUgZXh0ZW5kcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIENvbnRhaW5zIHRoZSBjb250ZW50IG9mIHRoZSBwb3BvdmVyIG9yIGEgVGVtcGxhdGVSZWYgZm9yIG1vcmUgZGV0YWlsZWQgY29udGVudCAqL1xuICAgIEBJbnB1dCgndXhQb3BvdmVyJykgY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBPcHRpb25hbGx5IGRpc3BsYXkgYSB0aXRsZSBpbiB0aGUgcG9wb3ZlciAqL1xuICAgIEBJbnB1dCgncG9wb3ZlclRpdGxlJykgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKiBBbGxvdyB0aGUgcG9wb3ZlciB0byBiZSBjb25kaXRpb25hbGx5IGRpc2FibGVkICovXG4gICAgQElucHV0KCdwb3BvdmVyRGlzYWJsZWQnKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBBbGwgdGhlIHVzZXIgdG8gYWRkIGEgY3VzdG9tIGNsYXNzIHRvIHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCdwb3BvdmVyQ2xhc3MnKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogQWxsIHRoZSB1c2VyIHRvIGFkZCBhIHJvbGUgdG8gdGhlIHBvcG92ZXIgLSBkZWZhdWx0IGlzIHRvb2x0aXAgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJSb2xlJykgcm9sZTogc3RyaW5nID0gJ3Rvb2x0aXAnO1xuXG4gICAgLyoqIFByb3ZpZGUgdGhlIFRlbXBsYXRlUmVmIGEgY29udGV4dCBvYmplY3QgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJDb250ZXh0JykgY29udGV4dDogYW55ID0ge307XG5cbiAgICAvKiogRGVsYXkgdGhlIHNob3dpbmcgb2YgdGhlIHBvcG92ZXIgYnkgYSBudW1iZXIgb2YgbWlsaXNlY29uZHMgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJEZWxheScpIGRlbGF5OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFNwZWNpZnkgd2hpY2ggZXZlbnRzIHNob3VsZCBzaG93IHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCkgc2hvd1RyaWdnZXJzOiBzdHJpbmdbXSA9IFsnY2xpY2snXTtcblxuICAgIC8qKiBTcGVjaWZ5IHdoaWNoIGV2ZW50cyBzaG91bGQgaGlkZSB0aGUgcG9wb3ZlciAqL1xuICAgIEBJbnB1dCgpIGhpZGVUcmlnZ2Vyczogc3RyaW5nW10gPSBbJ2NsaWNrJywgJ2NsaWNrb3V0c2lkZScsICdlc2NhcGUnXTtcblxuICAgIC8qKiBLZWVwIHRyYWNrIG9mIHRoZSB0b29sdGlwIHZpc2liaWxpdHkgYW5kIHVwZGF0ZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSAqL1xuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJykgaXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIENESyBwb3J0YWwgY29udGFpbmluZyB0aGUgb3ZlcmxheSAqL1xuICAgIHByb3RlY3RlZCBfcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8UG9wb3ZlckNvbXBvbmVudD47XG5cbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIG9mIHRoZSBwb3BvdmVyIGNvbXBvbmVudCB3aGVuIGNyZWF0ZWQgKi9cbiAgICBwcm90ZWN0ZWQgX2luc3RhbmNlOiBQb3BvdmVyQ29tcG9uZW50O1xuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCBhbiBhcmlhLWRlc2NyaWJlZGJ5IHByb3BlcnR5IG9yaWdpbmFsbHkgZXhpc3RlZCBvbiB0aGUgZWxlbWVudCAqL1xuICAgIHByaXZhdGUgX2FyaWFEZXNjcmliZWRCeTogYm9vbGVhbjtcblxuICAgIC8qKiBJbnRlcm5hbGx5IHN0b3JlIHRoZSB0eXBlIG9mIHRoaXMgY29tcG9uZW50IC0gdXN1YWwgZm9yIGRpc3RpbmN0aW9ucyB3aGVuIGV4dGVuZGluZyB0aGUgdG9vbHRpcCBjbGFzcyAqL1xuICAgIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ3BvcG92ZXInO1xuXG4gICAgLyoqIFNldCB1cCB0aGUgdHJpZ2dlcnMgYW5kIGJpbmQgdG8gdGhlIHNob3cvaGlkZSBldmVudHMgdG8ga2VlcCB2aXNpYmlsaXR5IGluIHN5bmMgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzZXQgdXAgdGhlIGV2ZW50IHRyaWdnZXJzXG4gICAgICAgIGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbktleURvd24uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYW4gYXJpYS1kZXNjcmliZWQgYnkgYXR0cmlidXRlXG4gICAgICAgIHRoaXMuX2FyaWFEZXNjcmliZWRCeSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKTtcblxuICAgICAgICAvLyBzZXQgdXAgdGhlIGRlZmF1bHQgZXZlbnQgdHJpZ2dlcnNcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBuZWVkIHRvIHNlbmQgaW5wdXQgY2hhbmdlcyB0byB0aGUgcG9wb3ZlciBjb21wb25lbnRcbiAgICAgKiBXZSBjYW4ndCB1c2Ugc2V0dGVycyBhcyB0aGV5IG1heSB0cmlnZ2VyIGJlZm9yZSBwb3BvdmVyIGluaXRpYWxpc2VkIGFuZCBjYW4ndCByZXNlbmQgb25jZSBpbml0aWFsaXNlZFxuICAgICAqKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSAmJiBjaGFuZ2VzLnRpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5zZXRUaXRsZShjaGFuZ2VzLnRpdGxlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlSW5zdGFuY2Uob3ZlcmxheVJlZjogT3ZlcmxheVJlZik6IFBvcG92ZXJDb21wb25lbnQge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMuX3BvcnRhbCkuaW5zdGFuY2UgYXMgUG9wb3ZlckNvbXBvbmVudDtcblxuICAgICAgICAvLyBzdXBwbHkgdGhlIHRvb2x0aXAgd2l0aCB0aGUgY29ycmVjdCBwcm9wZXJ0aWVzXG4gICAgICAgIGluc3RhbmNlLnNldFRpdGxlKHRoaXMudGl0bGUpO1xuICAgICAgICBpbnN0YW5jZS5zZXRDb250ZW50KHRoaXMuY29udGVudCk7XG4gICAgICAgIGluc3RhbmNlLnNldFBsYWNlbWVudCh0aGlzLnBsYWNlbWVudCk7XG4gICAgICAgIGluc3RhbmNlLnNldENsYXNzKHRoaXMuY3VzdG9tQ2xhc3MpO1xuICAgICAgICBpbnN0YW5jZS5zZXRDb250ZXh0KHRoaXMuY29udGV4dCk7XG4gICAgICAgIGluc3RhbmNlLnNldFJvbGUodGhpcy5yb2xlKTtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlXG4gICAgICAgIHRoaXMuc2V0QXJpYURlc2NyaWJlZEJ5KGluc3RhbmNlLmlkKTtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIG91dHNpZGUgY2xpY2sgZXZlbnRcbiAgICAgICAgaW5zdGFuY2UuY2xpY2tPdXRzaWRlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbkNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVBvcnRhbCgpOiBDb21wb25lbnRQb3J0YWw8UG9wb3ZlckNvbXBvbmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoUG9wb3ZlckNvbXBvbmVudCwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB2aXNpYmxlIGFuZCB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkIGFuZCBpdCBpcyBvbmUgb2YgdGhlIGhpZGUgdHJpZ2dlcnNcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmluY2x1ZGVzKHRoaXMuaGlkZVRyaWdnZXJzLCAnZXNjYXBlJykpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrT3V0c2lkZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgdmlzaWJsZSBhbmQgaXQgaXMgb25lIG9mIHRoZSBoaWRlIHRyaWdnZXJzXG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSAmJiB0aGlzLmluY2x1ZGVzKHRoaXMuaGlkZVRyaWdnZXJzLCAnY2xpY2tvdXRzaWRlJykpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFByb2dyYW1tYXRpY2FsbHkgdXBkYXRlIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IHByb3BlcnR5ICovXG4gICAgcHJvdGVjdGVkIHNldEFyaWFEZXNjcmliZWRCeShpZDogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBzZXQgdGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0ciB3aGVuIHRoZSBjb250ZW50IGlzIGEgc3RyaW5nIGFuZCB0aGVyZSB3YXMgbm8gdXNlciBkZWZpbmVkIGF0dHJpYnV0ZSBhbHJlYWR5XG4gICAgICAgIGlmICh0aGlzLl9hcmlhRGVzY3JpYmVkQnkgPT09IGZhbHNlICYmIHR5cGVvZiB0aGlzLmNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzdXBlci5zZXRBcmlhRGVzY3JpYmVkQnkoaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19