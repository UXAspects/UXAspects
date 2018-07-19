/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacetDeselect, FacetDeselectAll, FacetSelect } from './facet-events';
var FacetContainerComponent = (function () {
    function FacetContainerComponent(_announcer) {
        this._announcer = _announcer;
        this.header = 'Selected:';
        this.clearTooltip = 'Clear All';
        this.emptyText = 'No Items';
        this.facets = [];
        this.facetsReorderable = false;
        this.facetsChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FacetContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.complete();
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetContainerComponent.prototype.selectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // push the facet on to the list
        this.facets.push(facet);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    };
    /**
     * @param {?} facet
     * @param {?=} tag
     * @return {?}
     */
    FacetContainerComponent.prototype.deselectFacet = /**
     * @param {?} facet
     * @param {?=} tag
     * @return {?}
     */
    function (facet, tag) {
        // find the index of the item in the selected array
        var /** @type {?} */ idx = this.facets.findIndex(function (selectedFacet) { return facet === selectedFacet; });
        // if match there was no match then finish
        if (idx === -1) {
            return;
        }
        // remove the last item
        this.facets.splice(idx, 1);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselect(facet));
        // announce the facet removal
        this._announcer.announce("Option " + facet.title + " deselected.", 'assertive');
        // focus another tag if there is one
        if (tag) {
            var /** @type {?} */ sibling = tag.previousElementSibling || tag.nextElementSibling;
            // if there is a sibling then focus it
            if (sibling) {
                (/** @type {?} */ (sibling)).focus();
            }
        }
    };
    /**
     * @return {?}
     */
    FacetContainerComponent.prototype.deselectAllFacets = /**
     * @return {?}
     */
    function () {
        // empty the selected array
        this.facets = [];
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselectAll());
        // announce the facet removal
        this._announcer.announce("All options deselected.", 'assertive');
    };
    /**
     * @param {?} _index
     * @param {?} facet
     * @return {?}
     */
    FacetContainerComponent.prototype.trackBy = /**
     * @param {?} _index
     * @param {?} facet
     * @return {?}
     */
    function (_index, facet) {
        return facet.id || facet.title;
    };
    /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    FacetContainerComponent.prototype.shiftRight = /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    function (facet, element) {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }
        // perform the movement
        this.shiftFacet(facet, 1);
        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(function () { return element.focus(); });
        // announce the move
        this._announcer.announce("Option " + facet.title + " moved down.");
    };
    /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    FacetContainerComponent.prototype.shiftLeft = /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    function (facet, element) {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }
        // perform the movement
        this.shiftFacet(facet, -1);
        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(function () { return element.focus(); });
        // announce the move
        this._announcer.announce("Option " + facet.title + " moved up.");
    };
    /**
     * @param {?} facet
     * @param {?} distance
     * @return {?}
     */
    FacetContainerComponent.prototype.shiftFacet = /**
     * @param {?} facet
     * @param {?} distance
     * @return {?}
     */
    function (facet, distance) {
        var /** @type {?} */ index = this.facets.indexOf(facet);
        var /** @type {?} */ target = index + distance;
        // Ensure the move is valid
        if (target < 0 || target === this.facets.length) {
            return;
        }
        // Perform the move
        this.facets.splice(index, 1);
        this.facets.splice(target, 0, facet);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetContainerComponent.prototype.triggerEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.events.next(event);
    };
    FacetContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-container',
                    template: "<!-- Display Any Selected Facets -->\n<div class=\"facets-selected-container\">\n\n    <!-- Display Title an Clear Button -->\n    <div class=\"facets-selected-header-container\">\n\n        <!-- Show The Selected Text -->\n        <span class=\"facets-selected-header-label\">{{ header }}</span>\n\n        <!-- Add a Clear Button -->\n        <button class=\"btn btn-link btn-icon button-secondary\"\n            tabindex=\"0\"\n            [attr.aria-label]=\"clearTooltip\"\n            [uxTooltip]=\"clearTooltip\"\n            placement=\"left\"\n            (click)=\"deselectAllFacets()\"\n            *ngIf=\"facets.length > 0\">\n\n            <svg class=\"facets-selected-clear-graphic\" focusable=\"false\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n                <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n                <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n                <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n                <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n                <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n            </svg>\n        </button>\n\n    </div>\n\n    <!-- Display Tags For Selected Items -->\n    <div class=\"facets-selected-list\"\n        uxReorderable\n        role=\"list\"\n        [reorderingDisabled]=\"!facetsReorderable\"\n        [(reorderableModel)]=\"facets\"\n        (reorderableModelChange)=\"facetsChange.emit(facets)\">\n\n        <!-- Show Selected Tags -->\n        <div #tag\n            class=\"facet-selected-tag\"\n            role=\"listitem\"\n            tabindex=\"0\"\n            uxReorderableHandle\n            *ngFor=\"let facet of facets; trackBy: trackBy\"\n            [attr.aria-label]=\"facet.title\"\n            [uxReorderableModel]=\"facet\"\n            (mousedown)=\"tag.focus()\"\n            (keydown.ArrowRight)=\"shiftRight(facet, tag)\"\n            (keydown.ArrowLeft)=\"shiftLeft(facet, tag)\">\n\n            <!-- Display Label -->\n            <span class=\"facet-selected-tag-label\">{{ facet.title }}</span>\n\n            <!-- Display Remove Icon -->\n            <button class=\"facet-selected-remove-btn\"\n                i18n-aria-label\n                aria-label=\"Deselect Facet\"\n                (click)=\"deselectFacet(facet, tag)\">\n\n                <i class=\"hpe-icon hpe-close\"></i>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- Show Message Here if No Facets Selected -->\n    <p class=\"facets-selected-none-label\" *ngIf=\"emptyText && facets.length === 0\">{{ emptyText }}</p>\n\n</div>\n\n<!-- Any Facet Elements Should be Added Here By User -->\n<div class=\"facets-region\">\n    <ng-content></ng-content>\n</div>"
                },] },
    ];
    /** @nocollapse */
    FacetContainerComponent.ctorParameters = function () { return [
        { type: LiveAnnouncer, },
    ]; };
    FacetContainerComponent.propDecorators = {
        "header": [{ type: Input },],
        "clearTooltip": [{ type: Input },],
        "emptyText": [{ type: Input },],
        "facets": [{ type: Input },],
        "facetsReorderable": [{ type: Input },],
        "facetsChange": [{ type: Output },],
        "events": [{ type: Output },],
    };
    return FacetContainerComponent;
}());
export { FacetContainerComponent };
function FacetContainerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetContainerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetContainerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetContainerComponent.propDecorators;
    /** @type {?} */
    FacetContainerComponent.prototype.header;
    /** @type {?} */
    FacetContainerComponent.prototype.clearTooltip;
    /** @type {?} */
    FacetContainerComponent.prototype.emptyText;
    /** @type {?} */
    FacetContainerComponent.prototype.facets;
    /** @type {?} */
    FacetContainerComponent.prototype.facetsReorderable;
    /** @type {?} */
    FacetContainerComponent.prototype.facetsChange;
    /** @type {?} */
    FacetContainerComponent.prototype.events;
    /** @type {?} */
    FacetContainerComponent.prototype._announcer;
}
/**
 * @record
 */
export function FacetReorderEvent() { }
function FacetReorderEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    FacetReorderEvent.prototype.index;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFjLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQTJGdEYsaUNBQW9CLFVBQXlCO1FBQXpCLGVBQVUsR0FBVixVQUFVLENBQWU7c0JBVG5CLFdBQVc7NEJBQ0wsV0FBVzt5QkFDZCxVQUFVO3NCQUNaLEVBQUU7aUNBQ1MsS0FBSzs0QkFFSyxJQUFJLFlBQVksRUFBVztzQkFDOUIsSUFBSSxZQUFZLEVBQWM7S0FFekI7Ozs7SUFFbEQsNkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCw2Q0FBVzs7OztJQUFYLFVBQVksS0FBWTs7UUFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzdDOzs7Ozs7SUFFRCwrQ0FBYTs7Ozs7SUFBYixVQUFjLEtBQVksRUFBRSxHQUFpQjs7UUFHekMscUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEs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QUcsQ0FBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUdqQyw4Q0FBWTs7OztjQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBNU0vQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLDh5RkF5RVA7aUJBQ047Ozs7Z0JBbEZRLGFBQWE7OzsyQkFxRmpCLEtBQUs7aUNBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7c0NBQ0wsS0FBSztpQ0FFTCxNQUFNOzJCQUNOLE1BQU07O2tDQTVGWDs7U0FtRmEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlb3JkZXJFdmVudCB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVvcmRlcmFibGUvaW5kZXgnO1xuaW1wb3J0IHsgRmFjZXREZXNlbGVjdCwgRmFjZXREZXNlbGVjdEFsbCwgRmFjZXRFdmVudCwgRmFjZXRTZWxlY3QgfSBmcm9tICcuL2ZhY2V0LWV2ZW50cyc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4vbW9kZWxzL2ZhY2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC1jb250YWluZXInLFxuICAgIHRlbXBsYXRlOiBgPCEtLSBEaXNwbGF5IEFueSBTZWxlY3RlZCBGYWNldHMgLS0+XG48ZGl2IGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxuXG4gICAgPCEtLSBEaXNwbGF5IFRpdGxlIGFuIENsZWFyIEJ1dHRvbiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWhlYWRlci1jb250YWluZXJcIj5cblxuICAgICAgICA8IS0tIFNob3cgVGhlIFNlbGVjdGVkIFRleHQgLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWhlYWRlci1sYWJlbFwiPnt7IGhlYWRlciB9fTwvc3Bhbj5cblxuICAgICAgICA8IS0tIEFkZCBhIENsZWFyIEJ1dHRvbiAtLT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGluayBidG4taWNvbiBidXR0b24tc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNsZWFyVG9vbHRpcFwiXG4gICAgICAgICAgICBbdXhUb29sdGlwXT1cImNsZWFyVG9vbHRpcFwiXG4gICAgICAgICAgICBwbGFjZW1lbnQ9XCJsZWZ0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJkZXNlbGVjdEFsbEZhY2V0cygpXCJcbiAgICAgICAgICAgICpuZ0lmPVwiZmFjZXRzLmxlbmd0aCA+IDBcIj5cblxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1jbGVhci1ncmFwaGljXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiB2aWV3Qm94PVwiMCAwIDE5IDEyXCIgc2hhcGUtcmVuZGVyaW5nPVwiZ2VvbWV0cmljUHJlY2lzaW9uXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiMlwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJkYXJrLWdyZXlcIiB4PVwiMFwiIHk9XCI1XCIgd2lkdGg9XCI5XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImxpZ2h0LWdyZXlcIiB4PVwiMFwiIHk9XCI4XCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxIGgxIGw5LDkgdjEgaC0xIGwtOSwtOSB2LTEgWlwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxMSB2LTEgbDksLTkgaDEgdjEgbC05LDkgaC0xIFpcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gRGlzcGxheSBUYWdzIEZvciBTZWxlY3RlZCBJdGVtcyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWxpc3RcIlxuICAgICAgICB1eFJlb3JkZXJhYmxlXG4gICAgICAgIHJvbGU9XCJsaXN0XCJcbiAgICAgICAgW3Jlb3JkZXJpbmdEaXNhYmxlZF09XCIhZmFjZXRzUmVvcmRlcmFibGVcIlxuICAgICAgICBbKHJlb3JkZXJhYmxlTW9kZWwpXT1cImZhY2V0c1wiXG4gICAgICAgIChyZW9yZGVyYWJsZU1vZGVsQ2hhbmdlKT1cImZhY2V0c0NoYW5nZS5lbWl0KGZhY2V0cylcIj5cblxuICAgICAgICA8IS0tIFNob3cgU2VsZWN0ZWQgVGFncyAtLT5cbiAgICAgICAgPGRpdiAjdGFnXG4gICAgICAgICAgICBjbGFzcz1cImZhY2V0LXNlbGVjdGVkLXRhZ1wiXG4gICAgICAgICAgICByb2xlPVwibGlzdGl0ZW1cIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIHV4UmVvcmRlcmFibGVIYW5kbGVcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBmYWNldCBvZiBmYWNldHM7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJmYWNldC50aXRsZVwiXG4gICAgICAgICAgICBbdXhSZW9yZGVyYWJsZU1vZGVsXT1cImZhY2V0XCJcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwidGFnLmZvY3VzKClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dSaWdodCk9XCJzaGlmdFJpZ2h0KGZhY2V0LCB0YWcpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93TGVmdCk9XCJzaGlmdExlZnQoZmFjZXQsIHRhZylcIj5cblxuICAgICAgICAgICAgPCEtLSBEaXNwbGF5IExhYmVsIC0tPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldC1zZWxlY3RlZC10YWctbGFiZWxcIj57eyBmYWNldC50aXRsZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPCEtLSBEaXNwbGF5IFJlbW92ZSBJY29uIC0tPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZhY2V0LXNlbGVjdGVkLXJlbW92ZS1idG5cIlxuICAgICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbFxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZXNlbGVjdCBGYWNldFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImRlc2VsZWN0RmFjZXQoZmFjZXQsIHRhZylcIj5cblxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLWNsb3NlXCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFNob3cgTWVzc2FnZSBIZXJlIGlmIE5vIEZhY2V0cyBTZWxlY3RlZCAtLT5cbiAgICA8cCBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1ub25lLWxhYmVsXCIgKm5nSWY9XCJlbXB0eVRleHQgJiYgZmFjZXRzLmxlbmd0aCA9PT0gMFwiPnt7IGVtcHR5VGV4dCB9fTwvcD5cblxuPC9kaXY+XG5cbjwhLS0gQW55IEZhY2V0IEVsZW1lbnRzIFNob3VsZCBiZSBBZGRlZCBIZXJlIEJ5IFVzZXIgLS0+XG48ZGl2IGNsYXNzPVwiZmFjZXRzLXJlZ2lvblwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmcgPSAnU2VsZWN0ZWQ6JztcbiAgICBASW5wdXQoKSBjbGVhclRvb2x0aXA6IHN0cmluZyA9ICdDbGVhciBBbGwnO1xuICAgIEBJbnB1dCgpIGVtcHR5VGV4dDogc3RyaW5nID0gJ05vIEl0ZW1zJztcbiAgICBASW5wdXQoKSBmYWNldHM6IEZhY2V0W10gPSBbXTtcbiAgICBASW5wdXQoKSBmYWNldHNSZW9yZGVyYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGZhY2V0c0NoYW5nZTogRXZlbnRFbWl0dGVyPEZhY2V0W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGYWNldFtdPigpO1xuICAgIEBPdXRwdXQoKSBldmVudHM6IEV2ZW50RW1pdHRlcjxGYWNldEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXRFdmVudD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Fubm91bmNlcjogTGl2ZUFubm91bmNlcikgeyB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudHMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGYWNldChmYWNldDogRmFjZXQpOiB2b2lkIHtcbiAgICAgICAgLy8gcHVzaCB0aGUgZmFjZXQgb24gdG8gdGhlIGxpc3RcbiAgICAgICAgdGhpcy5mYWNldHMucHVzaChmYWNldCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0d28gd2F5IGJpbmRpbmdcbiAgICAgICAgdGhpcy5mYWNldHNDaGFuZ2UuZW1pdCh0aGlzLmZhY2V0cyk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXRTZWxlY3QoZmFjZXQpKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdEZhY2V0KGZhY2V0OiBGYWNldCwgdGFnPzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGUgaXRlbSBpbiB0aGUgc2VsZWN0ZWQgYXJyYXlcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5mYWNldHMuZmluZEluZGV4KHNlbGVjdGVkRmFjZXQgPT4gZmFjZXQgPT09IHNlbGVjdGVkRmFjZXQpO1xuXG4gICAgICAgIC8vIGlmIG1hdGNoIHRoZXJlIHdhcyBubyBtYXRjaCB0aGVuIGZpbmlzaFxuICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBsYXN0IGl0ZW1cbiAgICAgICAgdGhpcy5mYWNldHMuc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0d28gd2F5IGJpbmRpbmdcbiAgICAgICAgdGhpcy5mYWNldHNDaGFuZ2UuZW1pdCh0aGlzLmZhY2V0cyk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXREZXNlbGVjdChmYWNldCkpO1xuXG4gICAgICAgIC8vIGFubm91bmNlIHRoZSBmYWNldCByZW1vdmFsXG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgT3B0aW9uICR7ZmFjZXQudGl0bGV9IGRlc2VsZWN0ZWQuYCwgJ2Fzc2VydGl2ZScpO1xuXG4gICAgICAgIC8vIGZvY3VzIGFub3RoZXIgdGFnIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gdGFnLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgfHwgdGFnLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzaWJsaW5nIHRoZW4gZm9jdXMgaXRcbiAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgKHNpYmxpbmcgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbEZhY2V0cygpOiB2b2lkIHtcblxuICAgICAgICAvLyBlbXB0eSB0aGUgc2VsZWN0ZWQgYXJyYXlcbiAgICAgICAgdGhpcy5mYWNldHMgPSBbXTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHR3byB3YXkgYmluZGluZ1xuICAgICAgICB0aGlzLmZhY2V0c0NoYW5nZS5lbWl0KHRoaXMuZmFjZXRzKTtcblxuICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBGYWNldERlc2VsZWN0QWxsKCkpO1xuXG4gICAgICAgIC8vIGFubm91bmNlIHRoZSBmYWNldCByZW1vdmFsXG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgQWxsIG9wdGlvbnMgZGVzZWxlY3RlZC5gLCAnYXNzZXJ0aXZlJyk7XG4gICAgfVxuXG4gICAgdHJhY2tCeShfaW5kZXg6IG51bWJlciwgZmFjZXQ6IEZhY2V0KTogc3RyaW5nIHwgbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGZhY2V0LmlkIHx8IGZhY2V0LnRpdGxlO1xuICAgIH1cblxuICAgIHNoaWZ0UmlnaHQoZmFjZXQ6IEZhY2V0LCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAvLyBvbmx5IG1vdmUgdGhlIGl0ZW0gaWYgcmVvcmRlcmluZyBpcyBhbGxvd2VkXG4gICAgICAgIGlmICh0aGlzLmZhY2V0c1Jlb3JkZXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybSB0aGUgbW92ZW1lbnRcbiAgICAgICAgdGhpcy5zaGlmdEZhY2V0KGZhY2V0LCAxKTtcblxuICAgICAgICAvLyB0aGUgaXRlbSBtYXkgYmVjb21lIHVuZm9jdXNlZCBkdXJpbmcgdGhlIHJlb3JkZXIgc28gd2Ugc2hvdWxkIHJlZm9jdXMgaXRcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGVsZW1lbnQuZm9jdXMoKSk7XG5cbiAgICAgICAgLy8gYW5ub3VuY2UgdGhlIG1vdmVcbiAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKGBPcHRpb24gJHtmYWNldC50aXRsZX0gbW92ZWQgZG93bi5gKTtcbiAgICB9XG5cbiAgICBzaGlmdExlZnQoZmFjZXQ6IEZhY2V0LCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAvLyBvbmx5IG1vdmUgdGhlIGl0ZW0gaWYgcmVvcmRlcmluZyBpcyBhbGxvd2VkXG4gICAgICAgIGlmICh0aGlzLmZhY2V0c1Jlb3JkZXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybSB0aGUgbW92ZW1lbnRcbiAgICAgICAgdGhpcy5zaGlmdEZhY2V0KGZhY2V0LCAtMSk7XG5cbiAgICAgICAgLy8gdGhlIGl0ZW0gbWF5IGJlY29tZSB1bmZvY3VzZWQgZHVyaW5nIHRoZSByZW9yZGVyIHNvIHdlIHNob3VsZCByZWZvY3VzIGl0XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBlbGVtZW50LmZvY3VzKCkpO1xuXG4gICAgICAgIC8vIGFubm91bmNlIHRoZSBtb3ZlXG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgT3B0aW9uICR7ZmFjZXQudGl0bGV9IG1vdmVkIHVwLmApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hpZnRGYWNldChmYWNldDogRmFjZXQsIGRpc3RhbmNlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmZhY2V0cy5pbmRleE9mKGZhY2V0KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaW5kZXggKyBkaXN0YW5jZTtcblxuICAgICAgICAvLyBFbnN1cmUgdGhlIG1vdmUgaXMgdmFsaWRcbiAgICAgICAgaWYgKHRhcmdldCA8IDAgfHwgdGFyZ2V0ID09PSB0aGlzLmZhY2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBlcmZvcm0gdGhlIG1vdmVcbiAgICAgICAgdGhpcy5mYWNldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5mYWNldHMuc3BsaWNlKHRhcmdldCwgMCwgZmFjZXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJpZ2dlckV2ZW50KGV2ZW50OiBGYWNldEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFJlb3JkZXJFdmVudCBleHRlbmRzIFJlb3JkZXJFdmVudCB7XG4gICAgaW5kZXg6IG51bWJlcjtcbn0iXX0=