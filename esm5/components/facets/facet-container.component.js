/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FacetSelect, FacetDeselect, FacetDeselectAll } from './facet-events';
var FacetContainerComponent = (function () {
    function FacetContainerComponent() {
        this.header = 'Selected:';
        this.clearTooltip = 'Clear All';
        this.emptyText = 'No Items';
        this.facets = [];
        this.facetsReorderable = false;
        this.facetsChange = new EventEmitter();
        this.events = new EventEmitter();
    }
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
     * @return {?}
     */
    FacetContainerComponent.prototype.deselectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
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
                    template: "<!-- Display Any Selected Facets -->\n<div class=\"facets-selected-container\">\n\n    <!-- Display Title an Clear Button -->\n    <div class=\"facets-selected-header-container\">\n\n        <!-- Show The Selected Text -->\n        <span class=\"facets-selected-header-label\">{{ header }}</span>\n\n        <!-- Add a Clear Button -->\n        <div class=\"facets-selected-clear-button\" tabindex=\"0\" [uxTooltip]=\"clearTooltip\" placement=\"left\" (click)=\"deselectAllFacets()\"\n            (keyup.enter)=\"deselectAllFacets()\" *ngIf=\"facets.length > 0\">\n\n            <svg class=\"facets-selected-clear-graphic\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n                <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n                <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n                <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n                <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n                <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n            </svg>\n        </div>\n\n    </div>\n\n    <!-- Display Tags For Selected Items -->\n    <div class=\"facets-selected-list\" uxReorderable [reorderingDisabled]=\"!facetsReorderable\" [(reorderableModel)]=\"facets\" (reorderableModelChange)=\"facetsChange.emit(facets)\">\n\n        <!-- Show Selected Tags -->\n        <div class=\"facet-selected-tag\" tabindex=\"0\" *ngFor=\"let facet of facets\" (mousedown)=\"$event.preventDefault()\" (click)=\"deselectFacet(facet)\" (keyup.enter)=\"deselectFacet(facet)\"\n             [uxReorderableModel]=\"facet\">\n\n            <!-- Display Label -->\n            <span class=\"facet-selected-tag-label\" uxReorderableHandle>{{ facet.title }}</span>\n\n            <!-- Display Remove Icon -->\n            <span class=\"hpe-icon hpe-close\"></span>\n        </div>\n\n    </div>\n\n    <!-- Show Message Here if No Facets Selected -->\n    <p class=\"facets-selected-none-label\" *ngIf=\"emptyText && facets.length === 0\">{{ emptyText }}</p>\n\n</div>\n\n<!-- Any Facet Elements Should be Added Here By User -->\n<div class=\"facets-region\">\n    <ng-content></ng-content>\n</div>"
                },] },
    ];
    /** @nocollapse */
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBYyxXQUFXLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztzQkF5RDVELFdBQVc7NEJBQ0wsV0FBVzt5QkFDZCxVQUFVO3NCQUNaLEVBQUU7aUNBQ1MsS0FBSzs0QkFFSyxJQUFJLFlBQVksRUFBVztzQkFDOUIsSUFBSSxZQUFZLEVBQWM7Ozs7OztJQUUzRSw2Q0FBVzs7OztJQUFYLFVBQVksS0FBWTs7UUFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzdDOzs7OztJQUVELCtDQUFhOzs7O0lBQWIsVUFBYyxLQUFZOztRQUd0QixxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxhQUFhLElBQUksT0FBQSxLQUFLLEtBQUssYUFBYSxFQUF2QixDQUF1QixDQUFDLENBQUM7O1FBRzFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBRzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQy9DOzs7O0lBRUQsbURBQWlCOzs7SUFBakI7O1FBR0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7O1FBR2pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztLQUM3Qzs7Ozs7SUFFTyw4Q0FBWTs7OztjQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBM0cvQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGd2RUFnRFA7aUJBQ047Ozs7MkJBR0ksS0FBSztpQ0FDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQ0FDTCxLQUFLO2lDQUVMLE1BQU07MkJBQ04sTUFBTTs7a0NBakVYOztTQXdEYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmFjZXRFdmVudCwgRmFjZXRTZWxlY3QsIEZhY2V0RGVzZWxlY3QsIEZhY2V0RGVzZWxlY3RBbGwgfSBmcm9tICcuL2ZhY2V0LWV2ZW50cyc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4vbW9kZWxzL2ZhY2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC1jb250YWluZXInLFxuICAgIHRlbXBsYXRlOiBgPCEtLSBEaXNwbGF5IEFueSBTZWxlY3RlZCBGYWNldHMgLS0+XG48ZGl2IGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxuXG4gICAgPCEtLSBEaXNwbGF5IFRpdGxlIGFuIENsZWFyIEJ1dHRvbiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWhlYWRlci1jb250YWluZXJcIj5cblxuICAgICAgICA8IS0tIFNob3cgVGhlIFNlbGVjdGVkIFRleHQgLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWhlYWRlci1sYWJlbFwiPnt7IGhlYWRlciB9fTwvc3Bhbj5cblxuICAgICAgICA8IS0tIEFkZCBhIENsZWFyIEJ1dHRvbiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1jbGVhci1idXR0b25cIiB0YWJpbmRleD1cIjBcIiBbdXhUb29sdGlwXT1cImNsZWFyVG9vbHRpcFwiIHBsYWNlbWVudD1cImxlZnRcIiAoY2xpY2spPVwiZGVzZWxlY3RBbGxGYWNldHMoKVwiXG4gICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiZGVzZWxlY3RBbGxGYWNldHMoKVwiICpuZ0lmPVwiZmFjZXRzLmxlbmd0aCA+IDBcIj5cblxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1jbGVhci1ncmFwaGljXCIgdmlld0JveD1cIjAgMCAxOSAxMlwiIHNoYXBlLXJlbmRlcmluZz1cImdlb21ldHJpY1ByZWNpc2lvblwiPlxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwibGlnaHQtZ3JleVwiIHg9XCIwXCIgeT1cIjJcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiZGFyay1ncmV5XCIgeD1cIjBcIiB5PVwiNVwiIHdpZHRoPVwiOVwiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiOFwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJkYXJrLWdyZXlcIiBkPVwiTTksMSBoMSBsOSw5IHYxIGgtMSBsLTksLTkgdi0xIFpcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJkYXJrLWdyZXlcIiBkPVwiTTksMTEgdi0xIGw5LC05IGgxIHYxIGwtOSw5IGgtMSBaXCI+PC9wYXRoPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIERpc3BsYXkgVGFncyBGb3IgU2VsZWN0ZWQgSXRlbXMgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1saXN0XCIgdXhSZW9yZGVyYWJsZSBbcmVvcmRlcmluZ0Rpc2FibGVkXT1cIiFmYWNldHNSZW9yZGVyYWJsZVwiIFsocmVvcmRlcmFibGVNb2RlbCldPVwiZmFjZXRzXCIgKHJlb3JkZXJhYmxlTW9kZWxDaGFuZ2UpPVwiZmFjZXRzQ2hhbmdlLmVtaXQoZmFjZXRzKVwiPlxuXG4gICAgICAgIDwhLS0gU2hvdyBTZWxlY3RlZCBUYWdzIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmFjZXQtc2VsZWN0ZWQtdGFnXCIgdGFiaW5kZXg9XCIwXCIgKm5nRm9yPVwibGV0IGZhY2V0IG9mIGZhY2V0c1wiIChtb3VzZWRvd24pPVwiJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiAoY2xpY2spPVwiZGVzZWxlY3RGYWNldChmYWNldClcIiAoa2V5dXAuZW50ZXIpPVwiZGVzZWxlY3RGYWNldChmYWNldClcIlxuICAgICAgICAgICAgIFt1eFJlb3JkZXJhYmxlTW9kZWxdPVwiZmFjZXRcIj5cblxuICAgICAgICAgICAgPCEtLSBEaXNwbGF5IExhYmVsIC0tPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldC1zZWxlY3RlZC10YWctbGFiZWxcIiB1eFJlb3JkZXJhYmxlSGFuZGxlPnt7IGZhY2V0LnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8IS0tIERpc3BsYXkgUmVtb3ZlIEljb24gLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1jbG9zZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gU2hvdyBNZXNzYWdlIEhlcmUgaWYgTm8gRmFjZXRzIFNlbGVjdGVkIC0tPlxuICAgIDxwIGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLW5vbmUtbGFiZWxcIiAqbmdJZj1cImVtcHR5VGV4dCAmJiBmYWNldHMubGVuZ3RoID09PSAwXCI+e3sgZW1wdHlUZXh0IH19PC9wPlxuXG48L2Rpdj5cblxuPCEtLSBBbnkgRmFjZXQgRWxlbWVudHMgU2hvdWxkIGJlIEFkZGVkIEhlcmUgQnkgVXNlciAtLT5cbjxkaXYgY2xhc3M9XCJmYWNldHMtcmVnaW9uXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldENvbnRhaW5lckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZyA9ICdTZWxlY3RlZDonO1xuICAgIEBJbnB1dCgpIGNsZWFyVG9vbHRpcDogc3RyaW5nID0gJ0NsZWFyIEFsbCc7XG4gICAgQElucHV0KCkgZW1wdHlUZXh0OiBzdHJpbmcgPSAnTm8gSXRlbXMnO1xuICAgIEBJbnB1dCgpIGZhY2V0czogRmFjZXRbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGZhY2V0c1Jlb3JkZXJhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgZmFjZXRzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmFjZXRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZhY2V0W10+KCk7XG4gICAgQE91dHB1dCgpIGV2ZW50czogRXZlbnRFbWl0dGVyPEZhY2V0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGYWNldEV2ZW50PigpO1xuXG4gICAgc2VsZWN0RmFjZXQoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgICAgIC8vIHB1c2ggdGhlIGZhY2V0IG9uIHRvIHRoZSBsaXN0XG4gICAgICAgIHRoaXMuZmFjZXRzLnB1c2goZmFjZXQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHdvIHdheSBiaW5kaW5nXG4gICAgICAgIHRoaXMuZmFjZXRzQ2hhbmdlLmVtaXQodGhpcy5mYWNldHMpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0U2VsZWN0KGZhY2V0KSk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3RGYWNldChmYWNldDogRmFjZXQpOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGUgaXRlbSBpbiB0aGUgc2VsZWN0ZWQgYXJyYXlcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuZmFjZXRzLmZpbmRJbmRleChzZWxlY3RlZEZhY2V0ID0+IGZhY2V0ID09PSBzZWxlY3RlZEZhY2V0KTtcblxuICAgICAgICAvLyBpZiBtYXRjaCB0aGVyZSB3YXMgbm8gbWF0Y2ggdGhlbiBmaW5pc2hcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbGFzdCBpdGVtXG4gICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHdvIHdheSBiaW5kaW5nXG4gICAgICAgIHRoaXMuZmFjZXRzQ2hhbmdlLmVtaXQodGhpcy5mYWNldHMpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0RGVzZWxlY3QoZmFjZXQpKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbEZhY2V0cygpOiB2b2lkIHtcblxuICAgICAgICAvLyBlbXB0eSB0aGUgc2VsZWN0ZWQgYXJyYXlcbiAgICAgICAgdGhpcy5mYWNldHMgPSBbXTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHR3byB3YXkgYmluZGluZ1xuICAgICAgICB0aGlzLmZhY2V0c0NoYW5nZS5lbWl0KHRoaXMuZmFjZXRzKTtcblxuICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBGYWNldERlc2VsZWN0QWxsKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJpZ2dlckV2ZW50KGV2ZW50OiBGYWNldEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgIH1cbn0iXX0=