/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacetDeselect, FacetDeselectAll, FacetSelect } from './facet-events';
var FacetContainerComponent = /** @class */ (function () {
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
                }] }
    ];
    /** @nocollapse */
    FacetContainerComponent.ctorParameters = function () { return [
        { type: LiveAnnouncer }
    ]; };
    FacetContainerComponent.propDecorators = {
        header: [{ type: Input }],
        clearTooltip: [{ type: Input }],
        emptyText: [{ type: Input }],
        facets: [{ type: Input }],
        facetsReorderable: [{ type: Input }],
        facetsChange: [{ type: Output }],
        events: [{ type: Output }]
    };
    return FacetContainerComponent;
}());
export { FacetContainerComponent };
function FacetContainerComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFjLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQWtCdEYsaUNBQW9CLFVBQXlCO1FBQXpCLGVBQVUsR0FBVixVQUFVLENBQWU7c0JBVG5CLFdBQVc7NEJBQ0wsV0FBVzt5QkFDZCxVQUFVO3NCQUNaLEVBQUU7aUNBQ1MsS0FBSzs0QkFFSyxJQUFJLFlBQVksRUFBVztzQkFDOUIsSUFBSSxZQUFZLEVBQWM7S0FFekI7Ozs7SUFFbEQsNkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCw2Q0FBVzs7OztJQUFYLFVBQVksS0FBWTs7UUFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzdDOzs7Ozs7SUFFRCwrQ0FBYTs7Ozs7SUFBYixVQUFjLEtBQVksRUFBRSxHQUFpQjs7UUFHekMscUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEs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QUcsQ0FBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUdqQyw4Q0FBWTs7OztjQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBbkkvQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsd3pGQUErQztpQkFDbEQ7Ozs7Z0JBVFEsYUFBYTs7O3lCQVlqQixLQUFLOytCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLO29DQUNMLEtBQUs7K0JBRUwsTUFBTTt5QkFDTixNQUFNOztrQ0FuQlg7O1NBVWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlb3JkZXJFdmVudCB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVvcmRlcmFibGUvaW5kZXgnO1xuaW1wb3J0IHsgRmFjZXREZXNlbGVjdCwgRmFjZXREZXNlbGVjdEFsbCwgRmFjZXRFdmVudCwgRmFjZXRTZWxlY3QgfSBmcm9tICcuL2ZhY2V0LWV2ZW50cyc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4vbW9kZWxzL2ZhY2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNldC1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nID0gJ1NlbGVjdGVkOic7XG4gICAgQElucHV0KCkgY2xlYXJUb29sdGlwOiBzdHJpbmcgPSAnQ2xlYXIgQWxsJztcbiAgICBASW5wdXQoKSBlbXB0eVRleHQ6IHN0cmluZyA9ICdObyBJdGVtcyc7XG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdID0gW107XG4gICAgQElucHV0KCkgZmFjZXRzUmVvcmRlcmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBmYWNldHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGYWNldFtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXRbXT4oKTtcbiAgICBAT3V0cHV0KCkgZXZlbnRzOiBFdmVudEVtaXR0ZXI8RmFjZXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZhY2V0RXZlbnQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHsgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmFjZXQoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgICAgIC8vIHB1c2ggdGhlIGZhY2V0IG9uIHRvIHRoZSBsaXN0XG4gICAgICAgIHRoaXMuZmFjZXRzLnB1c2goZmFjZXQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHdvIHdheSBiaW5kaW5nXG4gICAgICAgIHRoaXMuZmFjZXRzQ2hhbmdlLmVtaXQodGhpcy5mYWNldHMpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0U2VsZWN0KGZhY2V0KSk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3RGYWNldChmYWNldDogRmFjZXQsIHRhZz86IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhlIGl0ZW0gaW4gdGhlIHNlbGVjdGVkIGFycmF5XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZmFjZXRzLmZpbmRJbmRleChzZWxlY3RlZEZhY2V0ID0+IGZhY2V0ID09PSBzZWxlY3RlZEZhY2V0KTtcblxuICAgICAgICAvLyBpZiBtYXRjaCB0aGVyZSB3YXMgbm8gbWF0Y2ggdGhlbiBmaW5pc2hcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbGFzdCBpdGVtXG4gICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHdvIHdheSBiaW5kaW5nXG4gICAgICAgIHRoaXMuZmFjZXRzQ2hhbmdlLmVtaXQodGhpcy5mYWNldHMpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0RGVzZWxlY3QoZmFjZXQpKTtcblxuICAgICAgICAvLyBhbm5vdW5jZSB0aGUgZmFjZXQgcmVtb3ZhbFxuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYE9wdGlvbiAke2ZhY2V0LnRpdGxlfSBkZXNlbGVjdGVkLmAsICdhc3NlcnRpdmUnKTtcblxuICAgICAgICAvLyBmb2N1cyBhbm90aGVyIHRhZyBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgY29uc3Qgc2libGluZyA9IHRhZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIHx8IHRhZy5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc2libGluZyB0aGVuIGZvY3VzIGl0XG4gICAgICAgICAgICBpZiAoc2libGluZykge1xuICAgICAgICAgICAgICAgIChzaWJsaW5nIGFzIEhUTUxFbGVtZW50KS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGxGYWNldHMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZW1wdHkgdGhlIHNlbGVjdGVkIGFycmF5XG4gICAgICAgIHRoaXMuZmFjZXRzID0gW107XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0d28gd2F5IGJpbmRpbmdcbiAgICAgICAgdGhpcy5mYWNldHNDaGFuZ2UuZW1pdCh0aGlzLmZhY2V0cyk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXREZXNlbGVjdEFsbCgpKTtcblxuICAgICAgICAvLyBhbm5vdW5jZSB0aGUgZmFjZXQgcmVtb3ZhbFxuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYEFsbCBvcHRpb25zIGRlc2VsZWN0ZWQuYCwgJ2Fzc2VydGl2ZScpO1xuICAgIH1cblxuICAgIHRyYWNrQnkoX2luZGV4OiBudW1iZXIsIGZhY2V0OiBGYWNldCk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIHJldHVybiBmYWNldC5pZCB8fCBmYWNldC50aXRsZTtcbiAgICB9XG5cbiAgICBzaGlmdFJpZ2h0KGZhY2V0OiBGYWNldCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gb25seSBtb3ZlIHRoZSBpdGVtIGlmIHJlb3JkZXJpbmcgaXMgYWxsb3dlZFxuICAgICAgICBpZiAodGhpcy5mYWNldHNSZW9yZGVyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gdGhlIG1vdmVtZW50XG4gICAgICAgIHRoaXMuc2hpZnRGYWNldChmYWNldCwgMSk7XG5cbiAgICAgICAgLy8gdGhlIGl0ZW0gbWF5IGJlY29tZSB1bmZvY3VzZWQgZHVyaW5nIHRoZSByZW9yZGVyIHNvIHdlIHNob3VsZCByZWZvY3VzIGl0XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBlbGVtZW50LmZvY3VzKCkpO1xuXG4gICAgICAgIC8vIGFubm91bmNlIHRoZSBtb3ZlXG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgT3B0aW9uICR7ZmFjZXQudGl0bGV9IG1vdmVkIGRvd24uYCk7XG4gICAgfVxuXG4gICAgc2hpZnRMZWZ0KGZhY2V0OiBGYWNldCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gb25seSBtb3ZlIHRoZSBpdGVtIGlmIHJlb3JkZXJpbmcgaXMgYWxsb3dlZFxuICAgICAgICBpZiAodGhpcy5mYWNldHNSZW9yZGVyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gdGhlIG1vdmVtZW50XG4gICAgICAgIHRoaXMuc2hpZnRGYWNldChmYWNldCwgLTEpO1xuXG4gICAgICAgIC8vIHRoZSBpdGVtIG1heSBiZWNvbWUgdW5mb2N1c2VkIGR1cmluZyB0aGUgcmVvcmRlciBzbyB3ZSBzaG91bGQgcmVmb2N1cyBpdFxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZWxlbWVudC5mb2N1cygpKTtcblxuICAgICAgICAvLyBhbm5vdW5jZSB0aGUgbW92ZVxuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYE9wdGlvbiAke2ZhY2V0LnRpdGxlfSBtb3ZlZCB1cC5gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNoaWZ0RmFjZXQoZmFjZXQ6IEZhY2V0LCBkaXN0YW5jZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5mYWNldHMuaW5kZXhPZihmYWNldCk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGluZGV4ICsgZGlzdGFuY2U7XG5cbiAgICAgICAgLy8gRW5zdXJlIHRoZSBtb3ZlIGlzIHZhbGlkXG4gICAgICAgIGlmICh0YXJnZXQgPCAwIHx8IHRhcmdldCA9PT0gdGhpcy5mYWNldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQZXJmb3JtIHRoZSBtb3ZlXG4gICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZSh0YXJnZXQsIDAsIGZhY2V0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyaWdnZXJFdmVudChldmVudDogRmFjZXRFdmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGV2ZW50KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRSZW9yZGVyRXZlbnQgZXh0ZW5kcyBSZW9yZGVyRXZlbnQge1xuICAgIGluZGV4OiBudW1iZXI7XG59Il19