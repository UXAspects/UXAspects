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
var PopoverDirective = /** @class */ (function (_super) {
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
    return PopoverDirective;
}(TooltipDirective));
export { PopoverDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWlELE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBTWpCLDRDQUFnQjs7Ozs7OzRCQVlMLEVBQUU7Ozs7cUJBR1YsU0FBUzs7Ozt3QkFHTixFQUFFOzs7O3NCQUdILENBQUM7Ozs7NkJBR04sQ0FBQyxPQUFPLENBQUM7Ozs7NkJBR1QsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQzs7OzswQkFHYixLQUFLOzs7O3NCQVluQyxTQUFTOzs7SUFFbkMsc0ZBQXNGOzs7OztJQUN0RixtQ0FBUTs7OztJQUFSOztRQUdJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7UUFHckcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMs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LFNBQUMsYUFBYTswQkFHbkIsS0FBSyxTQUFDLGdCQUFnQjt3QkFHdEIsS0FBSyxTQUFDLGNBQWM7K0JBR3BCLEtBQUs7K0JBR0wsS0FBSzs0QkFHTCxXQUFXLFNBQUMsb0JBQW9COzsyQkEzQ3JDO0VBYXNDLGdCQUFnQjtTQUF6QyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5pbXBvcnQgeyBQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4UG9wb3Zlcl0nLFxuICAgIGV4cG9ydEFzOiAndXgtcG9wb3Zlcidcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZSBleHRlbmRzIFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICAvKiogQ29udGFpbnMgdGhlIGNvbnRlbnQgb2YgdGhlIHBvcG92ZXIgb3IgYSBUZW1wbGF0ZVJlZiBmb3IgbW9yZSBkZXRhaWxlZCBjb250ZW50ICovXG4gICAgQElucHV0KCd1eFBvcG92ZXInKSBjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIE9wdGlvbmFsbHkgZGlzcGxheSBhIHRpdGxlIGluIHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCdwb3BvdmVyVGl0bGUnKSB0aXRsZTogc3RyaW5nO1xuXG4gICAgLyoqIEFsbG93IHRoZSBwb3BvdmVyIHRvIGJlIGNvbmRpdGlvbmFsbHkgZGlzYWJsZWQgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJEaXNhYmxlZCcpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIEFsbCB0aGUgdXNlciB0byBhZGQgYSBjdXN0b20gY2xhc3MgdG8gdGhlIHBvcG92ZXIgKi9cbiAgICBASW5wdXQoJ3BvcG92ZXJDbGFzcycpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBBbGwgdGhlIHVzZXIgdG8gYWRkIGEgcm9sZSB0byB0aGUgcG9wb3ZlciAtIGRlZmF1bHQgaXMgdG9vbHRpcCAqL1xuICAgIEBJbnB1dCgncG9wb3ZlclJvbGUnKSByb2xlOiBzdHJpbmcgPSAndG9vbHRpcCc7XG5cbiAgICAvKiogUHJvdmlkZSB0aGUgVGVtcGxhdGVSZWYgYSBjb250ZXh0IG9iamVjdCAqL1xuICAgIEBJbnB1dCgncG9wb3ZlckNvbnRleHQnKSBjb250ZXh0OiBhbnkgPSB7fTtcblxuICAgIC8qKiBEZWxheSB0aGUgc2hvd2luZyBvZiB0aGUgcG9wb3ZlciBieSBhIG51bWJlciBvZiBtaWxpc2Vjb25kcyAqL1xuICAgIEBJbnB1dCgncG9wb3ZlckRlbGF5JykgZGVsYXk6IG51bWJlciA9IDA7XG5cbiAgICAvKiogU3BlY2lmeSB3aGljaCBldmVudHMgc2hvdWxkIHNob3cgdGhlIHBvcG92ZXIgKi9cbiAgICBASW5wdXQoKSBzaG93VHJpZ2dlcnM6IHN0cmluZ1tdID0gWydjbGljayddO1xuXG4gICAgLyoqIFNwZWNpZnkgd2hpY2ggZXZlbnRzIHNob3VsZCBoaWRlIHRoZSBwb3BvdmVyICovXG4gICAgQElucHV0KCkgaGlkZVRyaWdnZXJzOiBzdHJpbmdbXSA9IFsnY2xpY2snLCAnY2xpY2tvdXRzaWRlJywgJ2VzY2FwZSddO1xuXG4gICAgLyoqIEtlZXAgdHJhY2sgb2YgdGhlIHRvb2x0aXAgdmlzaWJpbGl0eSBhbmQgdXBkYXRlIGFyaWEtZXhwYW5kZWQgYXR0cmlidXRlICovXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZXhwYW5kZWQnKSBpc1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgQ0RLIHBvcnRhbCBjb250YWluaW5nIHRoZSBvdmVybGF5ICovXG4gICAgcHJvdGVjdGVkIF9wb3J0YWw6IENvbXBvbmVudFBvcnRhbDxQb3BvdmVyQ29tcG9uZW50PjtcblxuICAgIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgdGhlIHBvcG92ZXIgY29tcG9uZW50IHdoZW4gY3JlYXRlZCAqL1xuICAgIHByb3RlY3RlZCBfaW5zdGFuY2U6IFBvcG92ZXJDb21wb25lbnQ7XG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGFuIGFyaWEtZGVzY3JpYmVkYnkgcHJvcGVydHkgb3JpZ2luYWxseSBleGlzdGVkIG9uIHRoZSBlbGVtZW50ICovXG4gICAgcHJpdmF0ZSBfYXJpYURlc2NyaWJlZEJ5OiBib29sZWFuO1xuXG4gICAgLyoqIEludGVybmFsbHkgc3RvcmUgdGhlIHR5cGUgb2YgdGhpcyBjb21wb25lbnQgLSB1c3VhbCBmb3IgZGlzdGluY3Rpb25zIHdoZW4gZXh0ZW5kaW5nIHRoZSB0b29sdGlwIGNsYXNzICovXG4gICAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAncG9wb3Zlcic7XG5cbiAgICAvKiogU2V0IHVwIHRoZSB0cmlnZ2VycyBhbmQgYmluZCB0byB0aGUgc2hvdy9oaWRlIGV2ZW50cyB0byBrZWVwIHZpc2liaWxpdHkgaW4gc3luYyAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgZXZlbnQgdHJpZ2dlcnNcbiAgICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicpLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhbiBhcmlhLWRlc2NyaWJlZCBieSBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy5fYXJpYURlc2NyaWJlZEJ5ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpO1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgZGVmYXVsdCBldmVudCB0cmlnZ2Vyc1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIG5lZWQgdG8gc2VuZCBpbnB1dCBjaGFuZ2VzIHRvIHRoZSBwb3BvdmVyIGNvbXBvbmVudFxuICAgICAqIFdlIGNhbid0IHVzZSBzZXR0ZXJzIGFzIHRoZXkgbWF5IHRyaWdnZXIgYmVmb3JlIHBvcG92ZXIgaW5pdGlhbGlzZWQgYW5kIGNhbid0IHJlc2VuZCBvbmNlIGluaXRpYWxpc2VkXG4gICAgICoqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICYmIGNoYW5nZXMudGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLnNldFRpdGxlKGNoYW5nZXMudGl0bGUuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVJbnN0YW5jZShvdmVybGF5UmVmOiBPdmVybGF5UmVmKTogUG9wb3ZlckNvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fcG9ydGFsKS5pbnN0YW5jZSBhcyBQb3BvdmVyQ29tcG9uZW50O1xuXG4gICAgICAgIC8vIHN1cHBseSB0aGUgdG9vbHRpcCB3aXRoIHRoZSBjb3JyZWN0IHByb3BlcnRpZXNcbiAgICAgICAgaW5zdGFuY2Uuc2V0VGl0bGUodGhpcy50aXRsZSk7XG4gICAgICAgIGluc3RhbmNlLnNldENvbnRlbnQodGhpcy5jb250ZW50KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0UGxhY2VtZW50KHRoaXMucGxhY2VtZW50KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q2xhc3ModGhpcy5jdXN0b21DbGFzcyk7XG4gICAgICAgIGluc3RhbmNlLnNldENvbnRleHQodGhpcy5jb250ZXh0KTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Um9sZSh0aGlzLnJvbGUpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy5zZXRBcmlhRGVzY3JpYmVkQnkoaW5zdGFuY2UuaWQpO1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byB0aGUgb3V0c2lkZSBjbGljayBldmVudFxuICAgICAgICBpbnN0YW5jZS5jbGlja091dHNpZGUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uQ2xpY2tPdXRzaWRlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUG9ydGFsKCk6IENvbXBvbmVudFBvcnRhbDxQb3BvdmVyQ29tcG9uZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3J0YWwgfHwgbmV3IENvbXBvbmVudFBvcnRhbChQb3BvdmVyQ29tcG9uZW50LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHZpc2libGUgYW5kIHRoZSBlc2NhcGUga2V5IGlzIHByZXNzZWQgYW5kIGl0IGlzIG9uZSBvZiB0aGUgaGlkZSB0cmlnZ2Vyc1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuaW5jbHVkZXModGhpcy5oaWRlVHJpZ2dlcnMsICdlc2NhcGUnKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tPdXRzaWRlKCk6IHZvaWQge1xuICAgICAgICAvLyBpZiB2aXNpYmxlIGFuZCBpdCBpcyBvbmUgb2YgdGhlIGhpZGUgdHJpZ2dlcnNcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlICYmIHRoaXMuaW5jbHVkZXModGhpcy5oaWRlVHJpZ2dlcnMsICdjbGlja291dHNpZGUnKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUHJvZ3JhbW1hdGljYWxseSB1cGRhdGUgdGhlIGFyaWEtZGVzY3JpYmVkYnkgcHJvcGVydHkgKi9cbiAgICBwcm90ZWN0ZWQgc2V0QXJpYURlc2NyaWJlZEJ5KGlkOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIHNldCB0aGUgYXJpYS1kZXNjcmliZWRieSBhdHRyIHdoZW4gdGhlIGNvbnRlbnQgaXMgYSBzdHJpbmcgYW5kIHRoZXJlIHdhcyBubyB1c2VyIGRlZmluZWQgYXR0cmlidXRlIGFscmVhZHlcbiAgICAgICAgaWYgKHRoaXMuX2FyaWFEZXNjcmliZWRCeSA9PT0gZmFsc2UgJiYgdHlwZW9mIHRoaXMuY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHN1cGVyLnNldEFyaWFEZXNjcmliZWRCeShpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=