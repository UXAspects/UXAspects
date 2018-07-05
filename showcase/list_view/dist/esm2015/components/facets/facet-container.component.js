/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FacetSelect, FacetDeselect, FacetDeselectAll } from './facet-events';
export class FacetContainerComponent {
    constructor() {
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
    selectFacet(facet) {
        // push the facet on to the list
        this.facets.push(facet);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    deselectFacet(facet) {
        // find the index of the item in the selected array
        let /** @type {?} */ idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);
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
    }
    /**
     * @return {?}
     */
    deselectAllFacets() {
        // empty the selected array
        this.facets = [];
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselectAll());
    }
    /**
     * @param {?} event
     * @return {?}
     */
    triggerEvent(event) {
        this.events.next(event);
    }
}
FacetContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-container',
                template: `<!-- Display Any Selected Facets -->
<div class="facets-selected-container">

    <!-- Display Title an Clear Button -->
    <div class="facets-selected-header-container">

        <!-- Show The Selected Text -->
        <span class="facets-selected-header-label">{{ header }}</span>

        <!-- Add a Clear Button -->
        <div class="facets-selected-clear-button" tabindex="0" [uxTooltip]="clearTooltip" placement="left" (click)="deselectAllFacets()"
            (keyup.enter)="deselectAllFacets()" *ngIf="facets.length > 0">

            <svg class="facets-selected-clear-graphic" viewBox="0 0 19 12" shape-rendering="geometricPrecision">
                <rect class="light-grey" x="0" y="2" width="7" height="2"></rect>
                <rect class="dark-grey" x="0" y="5" width="9" height="2"></rect>
                <rect class="light-grey" x="0" y="8" width="7" height="2"></rect>
                <path class="dark-grey" d="M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z"></path>
                <path class="dark-grey" d="M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z"></path>
            </svg>
        </div>

    </div>

    <!-- Display Tags For Selected Items -->
    <div class="facets-selected-list" uxReorderable [reorderingDisabled]="!facetsReorderable" [(reorderableModel)]="facets" (reorderableModelChange)="facetsChange.emit(facets)">

        <!-- Show Selected Tags -->
        <div class="facet-selected-tag" tabindex="0" *ngFor="let facet of facets" (mousedown)="$event.preventDefault()" (click)="deselectFacet(facet)" (keyup.enter)="deselectFacet(facet)"
             [uxReorderableModel]="facet">

            <!-- Display Label -->
            <span class="facet-selected-tag-label" uxReorderableHandle>{{ facet.title }}</span>

            <!-- Display Remove Icon -->
            <span class="hpe-icon hpe-close"></span>
        </div>

    </div>

    <!-- Show Message Here if No Facets Selected -->
    <p class="facets-selected-none-label" *ngIf="emptyText && facets.length === 0">{{ emptyText }}</p>

</div>

<!-- Any Facet Elements Should be Added Here By User -->
<div class="facets-region">
    <ng-content></ng-content>
</div>`
            },] },
];
/** @nocollapse */
FacetContainerComponent.ctorParameters = () => [];
FacetContainerComponent.propDecorators = {
    "header": [{ type: Input },],
    "clearTooltip": [{ type: Input },],
    "emptyText": [{ type: Input },],
    "facets": [{ type: Input },],
    "facetsReorderable": [{ type: Input },],
    "facetsChange": [{ type: Output },],
    "events": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBYyxXQUFXLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUF1RDFGLE1BQU07O3NCQUV3QixXQUFXOzRCQUNMLFdBQVc7eUJBQ2QsVUFBVTtzQkFDWixFQUFFO2lDQUNTLEtBQUs7NEJBRUssSUFBSSxZQUFZLEVBQVc7c0JBQzlCLElBQUksWUFBWSxFQUFjOzs7Ozs7SUFFM0UsV0FBVyxDQUFDLEtBQVk7O1FBRXBCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBR3BDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM3Qzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBWTs7UUFHdEIscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFBSSxLQUFLLEtBQUssYUFBYSxDQUFDLENBQUM7O1FBRzFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBRzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQy9DOzs7O0lBRUQsaUJBQWlCOztRQUdiLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztRQUdqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBR3BDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7S0FDN0M7Ozs7O0lBRU8sWUFBWSxDQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBM0cvQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnRFA7YUFDTjs7Ozs7dUJBR0ksS0FBSzs2QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztrQ0FDTCxLQUFLOzZCQUVMLE1BQU07dUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGYWNldEV2ZW50LCBGYWNldFNlbGVjdCwgRmFjZXREZXNlbGVjdCwgRmFjZXREZXNlbGVjdEFsbCB9IGZyb20gJy4vZmFjZXQtZXZlbnRzJztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi9tb2RlbHMvZmFjZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IGA8IS0tIERpc3BsYXkgQW55IFNlbGVjdGVkIEZhY2V0cyAtLT5cbjxkaXYgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtY29udGFpbmVyXCI+XG5cbiAgICA8IS0tIERpc3BsYXkgVGl0bGUgYW4gQ2xlYXIgQnV0dG9uIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtaGVhZGVyLWNvbnRhaW5lclwiPlxuXG4gICAgICAgIDwhLS0gU2hvdyBUaGUgU2VsZWN0ZWQgVGV4dCAtLT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtaGVhZGVyLWxhYmVsXCI+e3sgaGVhZGVyIH19PC9zcGFuPlxuXG4gICAgICAgIDwhLS0gQWRkIGEgQ2xlYXIgQnV0dG9uIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWNsZWFyLWJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIFt1eFRvb2x0aXBdPVwiY2xlYXJUb29sdGlwXCIgcGxhY2VtZW50PVwibGVmdFwiIChjbGljayk9XCJkZXNlbGVjdEFsbEZhY2V0cygpXCJcbiAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJkZXNlbGVjdEFsbEZhY2V0cygpXCIgKm5nSWY9XCJmYWNldHMubGVuZ3RoID4gMFwiPlxuXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWNsZWFyLWdyYXBoaWNcIiB2aWV3Qm94PVwiMCAwIDE5IDEyXCIgc2hhcGUtcmVuZGVyaW5nPVwiZ2VvbWV0cmljUHJlY2lzaW9uXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiMlwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJkYXJrLWdyZXlcIiB4PVwiMFwiIHk9XCI1XCIgd2lkdGg9XCI5XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImxpZ2h0LWdyZXlcIiB4PVwiMFwiIHk9XCI4XCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxIGgxIGw5LDkgdjEgaC0xIGwtOSwtOSB2LTEgWlwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxMSB2LTEgbDksLTkgaDEgdjEgbC05LDkgaC0xIFpcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gRGlzcGxheSBUYWdzIEZvciBTZWxlY3RlZCBJdGVtcyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZmFjZXRzLXNlbGVjdGVkLWxpc3RcIiB1eFJlb3JkZXJhYmxlIFtyZW9yZGVyaW5nRGlzYWJsZWRdPVwiIWZhY2V0c1Jlb3JkZXJhYmxlXCIgWyhyZW9yZGVyYWJsZU1vZGVsKV09XCJmYWNldHNcIiAocmVvcmRlcmFibGVNb2RlbENoYW5nZSk9XCJmYWNldHNDaGFuZ2UuZW1pdChmYWNldHMpXCI+XG5cbiAgICAgICAgPCEtLSBTaG93IFNlbGVjdGVkIFRhZ3MgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmYWNldC1zZWxlY3RlZC10YWdcIiB0YWJpbmRleD1cIjBcIiAqbmdGb3I9XCJsZXQgZmFjZXQgb2YgZmFjZXRzXCIgKG1vdXNlZG93bik9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIChjbGljayk9XCJkZXNlbGVjdEZhY2V0KGZhY2V0KVwiIChrZXl1cC5lbnRlcik9XCJkZXNlbGVjdEZhY2V0KGZhY2V0KVwiXG4gICAgICAgICAgICAgW3V4UmVvcmRlcmFibGVNb2RlbF09XCJmYWNldFwiPlxuXG4gICAgICAgICAgICA8IS0tIERpc3BsYXkgTGFiZWwgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LXNlbGVjdGVkLXRhZy1sYWJlbFwiIHV4UmVvcmRlcmFibGVIYW5kbGU+e3sgZmFjZXQudGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDwhLS0gRGlzcGxheSBSZW1vdmUgSWNvbiAtLT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWNsb3NlXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBTaG93IE1lc3NhZ2UgSGVyZSBpZiBObyBGYWNldHMgU2VsZWN0ZWQgLS0+XG4gICAgPHAgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtbm9uZS1sYWJlbFwiICpuZ0lmPVwiZW1wdHlUZXh0ICYmIGZhY2V0cy5sZW5ndGggPT09IDBcIj57eyBlbXB0eVRleHQgfX08L3A+XG5cbjwvZGl2PlxuXG48IS0tIEFueSBGYWNldCBFbGVtZW50cyBTaG91bGQgYmUgQWRkZWQgSGVyZSBCeSBVc2VyIC0tPlxuPGRpdiBjbGFzcz1cImZhY2V0cy1yZWdpb25cIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nID0gJ1NlbGVjdGVkOic7XG4gICAgQElucHV0KCkgY2xlYXJUb29sdGlwOiBzdHJpbmcgPSAnQ2xlYXIgQWxsJztcbiAgICBASW5wdXQoKSBlbXB0eVRleHQ6IHN0cmluZyA9ICdObyBJdGVtcyc7XG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdID0gW107XG4gICAgQElucHV0KCkgZmFjZXRzUmVvcmRlcmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBmYWNldHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGYWNldFtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXRbXT4oKTtcbiAgICBAT3V0cHV0KCkgZXZlbnRzOiBFdmVudEVtaXR0ZXI8RmFjZXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZhY2V0RXZlbnQ+KCk7XG5cbiAgICBzZWxlY3RGYWNldChmYWNldDogRmFjZXQpOiB2b2lkIHtcbiAgICAgICAgLy8gcHVzaCB0aGUgZmFjZXQgb24gdG8gdGhlIGxpc3RcbiAgICAgICAgdGhpcy5mYWNldHMucHVzaChmYWNldCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0d28gd2F5IGJpbmRpbmdcbiAgICAgICAgdGhpcy5mYWNldHNDaGFuZ2UuZW1pdCh0aGlzLmZhY2V0cyk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXRTZWxlY3QoZmFjZXQpKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdEZhY2V0KGZhY2V0OiBGYWNldCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBpdGVtIGluIHRoZSBzZWxlY3RlZCBhcnJheVxuICAgICAgICBsZXQgaWR4ID0gdGhpcy5mYWNldHMuZmluZEluZGV4KHNlbGVjdGVkRmFjZXQgPT4gZmFjZXQgPT09IHNlbGVjdGVkRmFjZXQpO1xuXG4gICAgICAgIC8vIGlmIG1hdGNoIHRoZXJlIHdhcyBubyBtYXRjaCB0aGVuIGZpbmlzaFxuICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBsYXN0IGl0ZW1cbiAgICAgICAgdGhpcy5mYWNldHMuc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0d28gd2F5IGJpbmRpbmdcbiAgICAgICAgdGhpcy5mYWNldHNDaGFuZ2UuZW1pdCh0aGlzLmZhY2V0cyk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXREZXNlbGVjdChmYWNldCkpO1xuICAgIH1cblxuICAgIGRlc2VsZWN0QWxsRmFjZXRzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGVtcHR5IHRoZSBzZWxlY3RlZCBhcnJheVxuICAgICAgICB0aGlzLmZhY2V0cyA9IFtdO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHdvIHdheSBiaW5kaW5nXG4gICAgICAgIHRoaXMuZmFjZXRzQ2hhbmdlLmVtaXQodGhpcy5mYWNldHMpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0RGVzZWxlY3RBbGwoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmlnZ2VyRXZlbnQoZXZlbnQ6IEZhY2V0RXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChldmVudCk7XG4gICAgfVxufSJdfQ==