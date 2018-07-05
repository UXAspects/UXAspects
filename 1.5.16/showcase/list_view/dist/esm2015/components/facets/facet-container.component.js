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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBYyxXQUFXLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUF1RDFGLE1BQU07O3NCQUV3QixXQUFXOzRCQUNMLFdBQVc7eUJBQ2QsVUFBVTtzQkFDWixFQUFFO2lDQUNTLEtBQUs7NEJBRUssSUFBSSxZQUFZLEVBQVc7c0JBQzlCLElBQUksWUFBWSxFQUFjOzs7Ozs7SUFFM0UsV0FBVyxDQUFDLEtBQVk7O1FBRXBCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBR3BDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM3Qzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBWTs7UUFHdEIscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFBSSxLQUFLLEtBQUssYUFBYSxDQUFDLENBQUM7O1FBRzFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBRzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQy9DOzs7O0lBRUQsaUJBQWlCOztRQUdiLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztRQUdqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBR3BDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7S0FDN0M7Ozs7O0lBRU8sWUFBWSxDQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBM0cvQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnRFA7YUFDTjs7Ozt1QkFHSSxLQUFLOzZCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO2tDQUNMLEtBQUs7NkJBRUwsTUFBTTt1QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZhY2V0RXZlbnQsIEZhY2V0U2VsZWN0LCBGYWNldERlc2VsZWN0LCBGYWNldERlc2VsZWN0QWxsIH0gZnJvbSAnLi9mYWNldC1ldmVudHMnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICcuL21vZGVscy9mYWNldCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gRGlzcGxheSBBbnkgU2VsZWN0ZWQgRmFjZXRzIC0tPlxuPGRpdiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1jb250YWluZXJcIj5cblxuICAgIDwhLS0gRGlzcGxheSBUaXRsZSBhbiBDbGVhciBCdXR0b24gLS0+XG4gICAgPGRpdiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1oZWFkZXItY29udGFpbmVyXCI+XG5cbiAgICAgICAgPCEtLSBTaG93IFRoZSBTZWxlY3RlZCBUZXh0IC0tPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1oZWFkZXItbGFiZWxcIj57eyBoZWFkZXIgfX08L3NwYW4+XG5cbiAgICAgICAgPCEtLSBBZGQgYSBDbGVhciBCdXR0b24gLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtY2xlYXItYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgW3V4VG9vbHRpcF09XCJjbGVhclRvb2x0aXBcIiBwbGFjZW1lbnQ9XCJsZWZ0XCIgKGNsaWNrKT1cImRlc2VsZWN0QWxsRmFjZXRzKClcIlxuICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cImRlc2VsZWN0QWxsRmFjZXRzKClcIiAqbmdJZj1cImZhY2V0cy5sZW5ndGggPiAwXCI+XG5cbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtY2xlYXItZ3JhcGhpY1wiIHZpZXdCb3g9XCIwIDAgMTkgMTJcIiBzaGFwZS1yZW5kZXJpbmc9XCJnZW9tZXRyaWNQcmVjaXNpb25cIj5cbiAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImxpZ2h0LWdyZXlcIiB4PVwiMFwiIHk9XCIyXCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImRhcmstZ3JleVwiIHg9XCIwXCIgeT1cIjVcIiB3aWR0aD1cIjlcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwibGlnaHQtZ3JleVwiIHg9XCIwXCIgeT1cIjhcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiZGFyay1ncmV5XCIgZD1cIk05LDEgaDEgbDksOSB2MSBoLTEgbC05LC05IHYtMSBaXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiZGFyay1ncmV5XCIgZD1cIk05LDExIHYtMSBsOSwtOSBoMSB2MSBsLTksOSBoLTEgWlwiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBEaXNwbGF5IFRhZ3MgRm9yIFNlbGVjdGVkIEl0ZW1zIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtbGlzdFwiIHV4UmVvcmRlcmFibGUgW3Jlb3JkZXJpbmdEaXNhYmxlZF09XCIhZmFjZXRzUmVvcmRlcmFibGVcIiBbKHJlb3JkZXJhYmxlTW9kZWwpXT1cImZhY2V0c1wiIChyZW9yZGVyYWJsZU1vZGVsQ2hhbmdlKT1cImZhY2V0c0NoYW5nZS5lbWl0KGZhY2V0cylcIj5cblxuICAgICAgICA8IS0tIFNob3cgU2VsZWN0ZWQgVGFncyAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZhY2V0LXNlbGVjdGVkLXRhZ1wiIHRhYmluZGV4PVwiMFwiICpuZ0Zvcj1cImxldCBmYWNldCBvZiBmYWNldHNcIiAobW91c2Vkb3duKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgKGNsaWNrKT1cImRlc2VsZWN0RmFjZXQoZmFjZXQpXCIgKGtleXVwLmVudGVyKT1cImRlc2VsZWN0RmFjZXQoZmFjZXQpXCJcbiAgICAgICAgICAgICBbdXhSZW9yZGVyYWJsZU1vZGVsXT1cImZhY2V0XCI+XG5cbiAgICAgICAgICAgIDwhLS0gRGlzcGxheSBMYWJlbCAtLT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtc2VsZWN0ZWQtdGFnLWxhYmVsXCIgdXhSZW9yZGVyYWJsZUhhbmRsZT57eyBmYWNldC50aXRsZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPCEtLSBEaXNwbGF5IFJlbW92ZSBJY29uIC0tPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtY2xvc2VcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFNob3cgTWVzc2FnZSBIZXJlIGlmIE5vIEZhY2V0cyBTZWxlY3RlZCAtLT5cbiAgICA8cCBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1ub25lLWxhYmVsXCIgKm5nSWY9XCJlbXB0eVRleHQgJiYgZmFjZXRzLmxlbmd0aCA9PT0gMFwiPnt7IGVtcHR5VGV4dCB9fTwvcD5cblxuPC9kaXY+XG5cbjwhLS0gQW55IEZhY2V0IEVsZW1lbnRzIFNob3VsZCBiZSBBZGRlZCBIZXJlIEJ5IFVzZXIgLS0+XG48ZGl2IGNsYXNzPVwiZmFjZXRzLXJlZ2lvblwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRDb250YWluZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmcgPSAnU2VsZWN0ZWQ6JztcbiAgICBASW5wdXQoKSBjbGVhclRvb2x0aXA6IHN0cmluZyA9ICdDbGVhciBBbGwnO1xuICAgIEBJbnB1dCgpIGVtcHR5VGV4dDogc3RyaW5nID0gJ05vIEl0ZW1zJztcbiAgICBASW5wdXQoKSBmYWNldHM6IEZhY2V0W10gPSBbXTtcbiAgICBASW5wdXQoKSBmYWNldHNSZW9yZGVyYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGZhY2V0c0NoYW5nZTogRXZlbnRFbWl0dGVyPEZhY2V0W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGYWNldFtdPigpO1xuICAgIEBPdXRwdXQoKSBldmVudHM6IEV2ZW50RW1pdHRlcjxGYWNldEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXRFdmVudD4oKTtcblxuICAgIHNlbGVjdEZhY2V0KGZhY2V0OiBGYWNldCk6IHZvaWQge1xuICAgICAgICAvLyBwdXNoIHRoZSBmYWNldCBvbiB0byB0aGUgbGlzdFxuICAgICAgICB0aGlzLmZhY2V0cy5wdXNoKGZhY2V0KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHR3byB3YXkgYmluZGluZ1xuICAgICAgICB0aGlzLmZhY2V0c0NoYW5nZS5lbWl0KHRoaXMuZmFjZXRzKTtcblxuICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBGYWNldFNlbGVjdChmYWNldCkpO1xuICAgIH1cblxuICAgIGRlc2VsZWN0RmFjZXQoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhlIGl0ZW0gaW4gdGhlIHNlbGVjdGVkIGFycmF5XG4gICAgICAgIGxldCBpZHggPSB0aGlzLmZhY2V0cy5maW5kSW5kZXgoc2VsZWN0ZWRGYWNldCA9PiBmYWNldCA9PT0gc2VsZWN0ZWRGYWNldCk7XG5cbiAgICAgICAgLy8gaWYgbWF0Y2ggdGhlcmUgd2FzIG5vIG1hdGNoIHRoZW4gZmluaXNoXG4gICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIGxhc3QgaXRlbVxuICAgICAgICB0aGlzLmZhY2V0cy5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHR3byB3YXkgYmluZGluZ1xuICAgICAgICB0aGlzLmZhY2V0c0NoYW5nZS5lbWl0KHRoaXMuZmFjZXRzKTtcblxuICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBGYWNldERlc2VsZWN0KGZhY2V0KSk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGxGYWNldHMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZW1wdHkgdGhlIHNlbGVjdGVkIGFycmF5XG4gICAgICAgIHRoaXMuZmFjZXRzID0gW107XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0d28gd2F5IGJpbmRpbmdcbiAgICAgICAgdGhpcy5mYWNldHNDaGFuZ2UuZW1pdCh0aGlzLmZhY2V0cyk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXREZXNlbGVjdEFsbCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyaWdnZXJFdmVudChldmVudDogRmFjZXRFdmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGV2ZW50KTtcbiAgICB9XG59Il19