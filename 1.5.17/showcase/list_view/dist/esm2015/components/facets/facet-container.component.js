/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacetDeselect, FacetDeselectAll, FacetSelect } from './facet-events';
export class FacetContainerComponent {
    /**
     * @param {?} _announcer
     */
    constructor(_announcer) {
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
    ngOnDestroy() {
        this.events.complete();
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
     * @param {?=} tag
     * @return {?}
     */
    deselectFacet(facet, tag) {
        // find the index of the item in the selected array
        const /** @type {?} */ idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);
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
        this._announcer.announce(`Option ${facet.title} deselected.`, 'assertive');
        // focus another tag if there is one
        if (tag) {
            const /** @type {?} */ sibling = tag.previousElementSibling || tag.nextElementSibling;
            // if there is a sibling then focus it
            if (sibling) {
                (/** @type {?} */ (sibling)).focus();
            }
        }
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
        // announce the facet removal
        this._announcer.announce(`All options deselected.`, 'assertive');
    }
    /**
     * @param {?} _index
     * @param {?} facet
     * @return {?}
     */
    trackBy(_index, facet) {
        return facet.id || facet.title;
    }
    /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    shiftRight(facet, element) {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }
        // perform the movement
        this.shiftFacet(facet, 1);
        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());
        // announce the move
        this._announcer.announce(`Option ${facet.title} moved down.`);
    }
    /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    shiftLeft(facet, element) {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }
        // perform the movement
        this.shiftFacet(facet, -1);
        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());
        // announce the move
        this._announcer.announce(`Option ${facet.title} moved up.`);
    }
    /**
     * @param {?} facet
     * @param {?} distance
     * @return {?}
     */
    shiftFacet(facet, distance) {
        const /** @type {?} */ index = this.facets.indexOf(facet);
        const /** @type {?} */ target = index + distance;
        // Ensure the move is valid
        if (target < 0 || target === this.facets.length) {
            return;
        }
        // Perform the move
        this.facets.splice(index, 1);
        this.facets.splice(target, 0, facet);
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
        <button class="btn btn-link btn-icon button-secondary"
            tabindex="0"
            [attr.aria-label]="clearTooltip"
            [uxTooltip]="clearTooltip"
            placement="left"
            (click)="deselectAllFacets()"
            *ngIf="facets.length > 0">

            <svg class="facets-selected-clear-graphic" focusable="false" viewBox="0 0 19 12" shape-rendering="geometricPrecision">
                <rect class="light-grey" x="0" y="2" width="7" height="2"></rect>
                <rect class="dark-grey" x="0" y="5" width="9" height="2"></rect>
                <rect class="light-grey" x="0" y="8" width="7" height="2"></rect>
                <path class="dark-grey" d="M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z"></path>
                <path class="dark-grey" d="M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z"></path>
            </svg>
        </button>

    </div>

    <!-- Display Tags For Selected Items -->
    <div class="facets-selected-list"
        uxReorderable
        role="list"
        [reorderingDisabled]="!facetsReorderable"
        [(reorderableModel)]="facets"
        (reorderableModelChange)="facetsChange.emit(facets)">

        <!-- Show Selected Tags -->
        <div #tag
            class="facet-selected-tag"
            role="listitem"
            tabindex="0"
            uxReorderableHandle
            *ngFor="let facet of facets; trackBy: trackBy"
            [attr.aria-label]="facet.title"
            [uxReorderableModel]="facet"
            (mousedown)="tag.focus()"
            (keydown.ArrowRight)="shiftRight(facet, tag)"
            (keydown.ArrowLeft)="shiftLeft(facet, tag)">

            <!-- Display Label -->
            <span class="facet-selected-tag-label">{{ facet.title }}</span>

            <!-- Display Remove Icon -->
            <button class="facet-selected-remove-btn"
                i18n-aria-label
                aria-label="Deselect Facet"
                (click)="deselectFacet(facet, tag)">

                <i class="hpe-icon hpe-close"></i>
            </button>
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
FacetContainerComponent.ctorParameters = () => [
    { type: LiveAnnouncer, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFjLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBZ0YxRixNQUFNOzs7O0lBV0YsWUFBb0IsVUFBeUI7UUFBekIsZUFBVSxHQUFWLFVBQVUsQ0FBZTtzQkFUbkIsV0FBVzs0QkFDTCxXQUFXO3lCQUNkLFVBQVU7c0JBQ1osRUFBRTtpQ0FDUyxLQUFLOzRCQUVLLElBQUksWUFBWSxFQUFXO3NCQUM5QixJQUFJLFlBQVksRUFBYztLQUV6Qjs7OztJQUVsRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBWTs7UUFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzdDOzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBWSxFQUFFLEdBQWlCOztRQUd6Qyx1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxJQUFJLEtBQUssS0FBSyxh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TSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFHakMsWUFBWSxDQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBNU0vQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUVQO2FBQ047Ozs7WUFsRlEsYUFBYTs7O3VCQXFGakIsS0FBSzs2QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztrQ0FDTCxLQUFLOzZCQUVMLE1BQU07dUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpdmVBbm5vdW5jZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZW9yZGVyRXZlbnQgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL2luZGV4JztcbmltcG9ydCB7IEZhY2V0RGVzZWxlY3QsIEZhY2V0RGVzZWxlY3RBbGwsIEZhY2V0RXZlbnQsIEZhY2V0U2VsZWN0IH0gZnJvbSAnLi9mYWNldC1ldmVudHMnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICcuL21vZGVscy9mYWNldCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gRGlzcGxheSBBbnkgU2VsZWN0ZWQgRmFjZXRzIC0tPlxuPGRpdiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1jb250YWluZXJcIj5cblxuICAgIDwhLS0gRGlzcGxheSBUaXRsZSBhbiBDbGVhciBCdXR0b24gLS0+XG4gICAgPGRpdiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1oZWFkZXItY29udGFpbmVyXCI+XG5cbiAgICAgICAgPCEtLSBTaG93IFRoZSBTZWxlY3RlZCBUZXh0IC0tPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1oZWFkZXItbGFiZWxcIj57eyBoZWFkZXIgfX08L3NwYW4+XG5cbiAgICAgICAgPCEtLSBBZGQgYSBDbGVhciBCdXR0b24gLS0+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLWljb24gYnV0dG9uLXNlY29uZGFyeVwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjbGVhclRvb2x0aXBcIlxuICAgICAgICAgICAgW3V4VG9vbHRpcF09XCJjbGVhclRvb2x0aXBcIlxuICAgICAgICAgICAgcGxhY2VtZW50PVwibGVmdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZGVzZWxlY3RBbGxGYWNldHMoKVwiXG4gICAgICAgICAgICAqbmdJZj1cImZhY2V0cy5sZW5ndGggPiAwXCI+XG5cbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtY2xlYXItZ3JhcGhpY1wiIGZvY3VzYWJsZT1cImZhbHNlXCIgdmlld0JveD1cIjAgMCAxOSAxMlwiIHNoYXBlLXJlbmRlcmluZz1cImdlb21ldHJpY1ByZWNpc2lvblwiPlxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwibGlnaHQtZ3JleVwiIHg9XCIwXCIgeT1cIjJcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiZGFyay1ncmV5XCIgeD1cIjBcIiB5PVwiNVwiIHdpZHRoPVwiOVwiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiOFwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJkYXJrLWdyZXlcIiBkPVwiTTksMSBoMSBsOSw5IHYxIGgtMSBsLTksLTkgdi0xIFpcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJkYXJrLWdyZXlcIiBkPVwiTTksMTEgdi0xIGw5LC05IGgxIHYxIGwtOSw5IGgtMSBaXCI+PC9wYXRoPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIERpc3BsYXkgVGFncyBGb3IgU2VsZWN0ZWQgSXRlbXMgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZhY2V0cy1zZWxlY3RlZC1saXN0XCJcbiAgICAgICAgdXhSZW9yZGVyYWJsZVxuICAgICAgICByb2xlPVwibGlzdFwiXG4gICAgICAgIFtyZW9yZGVyaW5nRGlzYWJsZWRdPVwiIWZhY2V0c1Jlb3JkZXJhYmxlXCJcbiAgICAgICAgWyhyZW9yZGVyYWJsZU1vZGVsKV09XCJmYWNldHNcIlxuICAgICAgICAocmVvcmRlcmFibGVNb2RlbENoYW5nZSk9XCJmYWNldHNDaGFuZ2UuZW1pdChmYWNldHMpXCI+XG5cbiAgICAgICAgPCEtLSBTaG93IFNlbGVjdGVkIFRhZ3MgLS0+XG4gICAgICAgIDxkaXYgI3RhZ1xuICAgICAgICAgICAgY2xhc3M9XCJmYWNldC1zZWxlY3RlZC10YWdcIlxuICAgICAgICAgICAgcm9sZT1cImxpc3RpdGVtXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICB1eFJlb3JkZXJhYmxlSGFuZGxlXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgZmFjZXQgb2YgZmFjZXRzOyB0cmFja0J5OiB0cmFja0J5XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZmFjZXQudGl0bGVcIlxuICAgICAgICAgICAgW3V4UmVvcmRlcmFibGVNb2RlbF09XCJmYWNldFwiXG4gICAgICAgICAgICAobW91c2Vkb3duKT1cInRhZy5mb2N1cygpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93UmlnaHQpPVwic2hpZnRSaWdodChmYWNldCwgdGFnKVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5BcnJvd0xlZnQpPVwic2hpZnRMZWZ0KGZhY2V0LCB0YWcpXCI+XG5cbiAgICAgICAgICAgIDwhLS0gRGlzcGxheSBMYWJlbCAtLT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtc2VsZWN0ZWQtdGFnLWxhYmVsXCI+e3sgZmFjZXQudGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDwhLS0gRGlzcGxheSBSZW1vdmUgSWNvbiAtLT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmYWNldC1zZWxlY3RlZC1yZW1vdmUtYnRuXCJcbiAgICAgICAgICAgICAgICBpMThuLWFyaWEtbGFiZWxcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiRGVzZWxlY3QgRmFjZXRcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJkZXNlbGVjdEZhY2V0KGZhY2V0LCB0YWcpXCI+XG5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jbG9zZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBTaG93IE1lc3NhZ2UgSGVyZSBpZiBObyBGYWNldHMgU2VsZWN0ZWQgLS0+XG4gICAgPHAgY2xhc3M9XCJmYWNldHMtc2VsZWN0ZWQtbm9uZS1sYWJlbFwiICpuZ0lmPVwiZW1wdHlUZXh0ICYmIGZhY2V0cy5sZW5ndGggPT09IDBcIj57eyBlbXB0eVRleHQgfX08L3A+XG5cbjwvZGl2PlxuXG48IS0tIEFueSBGYWNldCBFbGVtZW50cyBTaG91bGQgYmUgQWRkZWQgSGVyZSBCeSBVc2VyIC0tPlxuPGRpdiBjbGFzcz1cImZhY2V0cy1yZWdpb25cIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nID0gJ1NlbGVjdGVkOic7XG4gICAgQElucHV0KCkgY2xlYXJUb29sdGlwOiBzdHJpbmcgPSAnQ2xlYXIgQWxsJztcbiAgICBASW5wdXQoKSBlbXB0eVRleHQ6IHN0cmluZyA9ICdObyBJdGVtcyc7XG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdID0gW107XG4gICAgQElucHV0KCkgZmFjZXRzUmVvcmRlcmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBmYWNldHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGYWNldFtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXRbXT4oKTtcbiAgICBAT3V0cHV0KCkgZXZlbnRzOiBFdmVudEVtaXR0ZXI8RmFjZXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZhY2V0RXZlbnQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHsgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmFjZXQoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgICAgIC8vIHB1c2ggdGhlIGZhY2V0IG9uIHRvIHRoZSBsaXN0XG4gICAgICAgIHRoaXMuZmFjZXRzLnB1c2goZmFjZXQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHdvIHdheSBiaW5kaW5nXG4gICAgICAgIHRoaXMuZmFjZXRzQ2hhbmdlLmVtaXQodGhpcy5mYWNldHMpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0U2VsZWN0KGZhY2V0KSk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3RGYWNldChmYWNldDogRmFjZXQsIHRhZz86IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhlIGl0ZW0gaW4gdGhlIHNlbGVjdGVkIGFycmF5XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZmFjZXRzLmZpbmRJbmRleChzZWxlY3RlZEZhY2V0ID0+IGZhY2V0ID09PSBzZWxlY3RlZEZhY2V0KTtcblxuICAgICAgICAvLyBpZiBtYXRjaCB0aGVyZSB3YXMgbm8gbWF0Y2ggdGhlbiBmaW5pc2hcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbGFzdCBpdGVtXG4gICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHdvIHdheSBiaW5kaW5nXG4gICAgICAgIHRoaXMuZmFjZXRzQ2hhbmdlLmVtaXQodGhpcy5mYWNldHMpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0RGVzZWxlY3QoZmFjZXQpKTtcblxuICAgICAgICAvLyBhbm5vdW5jZSB0aGUgZmFjZXQgcmVtb3ZhbFxuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYE9wdGlvbiAke2ZhY2V0LnRpdGxlfSBkZXNlbGVjdGVkLmAsICdhc3NlcnRpdmUnKTtcblxuICAgICAgICAvLyBmb2N1cyBhbm90aGVyIHRhZyBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgY29uc3Qgc2libGluZyA9IHRhZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIHx8IHRhZy5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc2libGluZyB0aGVuIGZvY3VzIGl0XG4gICAgICAgICAgICBpZiAoc2libGluZykge1xuICAgICAgICAgICAgICAgIChzaWJsaW5nIGFzIEhUTUxFbGVtZW50KS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGxGYWNldHMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZW1wdHkgdGhlIHNlbGVjdGVkIGFycmF5XG4gICAgICAgIHRoaXMuZmFjZXRzID0gW107XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0d28gd2F5IGJpbmRpbmdcbiAgICAgICAgdGhpcy5mYWNldHNDaGFuZ2UuZW1pdCh0aGlzLmZhY2V0cyk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXREZXNlbGVjdEFsbCgpKTtcblxuICAgICAgICAvLyBhbm5vdW5jZSB0aGUgZmFjZXQgcmVtb3ZhbFxuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYEFsbCBvcHRpb25zIGRlc2VsZWN0ZWQuYCwgJ2Fzc2VydGl2ZScpO1xuICAgIH1cblxuICAgIHRyYWNrQnkoX2luZGV4OiBudW1iZXIsIGZhY2V0OiBGYWNldCk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIHJldHVybiBmYWNldC5pZCB8fCBmYWNldC50aXRsZTtcbiAgICB9XG5cbiAgICBzaGlmdFJpZ2h0KGZhY2V0OiBGYWNldCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gb25seSBtb3ZlIHRoZSBpdGVtIGlmIHJlb3JkZXJpbmcgaXMgYWxsb3dlZFxuICAgICAgICBpZiAodGhpcy5mYWNldHNSZW9yZGVyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gdGhlIG1vdmVtZW50XG4gICAgICAgIHRoaXMuc2hpZnRGYWNldChmYWNldCwgMSk7XG5cbiAgICAgICAgLy8gdGhlIGl0ZW0gbWF5IGJlY29tZSB1bmZvY3VzZWQgZHVyaW5nIHRoZSByZW9yZGVyIHNvIHdlIHNob3VsZCByZWZvY3VzIGl0XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBlbGVtZW50LmZvY3VzKCkpO1xuXG4gICAgICAgIC8vIGFubm91bmNlIHRoZSBtb3ZlXG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgT3B0aW9uICR7ZmFjZXQudGl0bGV9IG1vdmVkIGRvd24uYCk7XG4gICAgfVxuXG4gICAgc2hpZnRMZWZ0KGZhY2V0OiBGYWNldCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gb25seSBtb3ZlIHRoZSBpdGVtIGlmIHJlb3JkZXJpbmcgaXMgYWxsb3dlZFxuICAgICAgICBpZiAodGhpcy5mYWNldHNSZW9yZGVyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gdGhlIG1vdmVtZW50XG4gICAgICAgIHRoaXMuc2hpZnRGYWNldChmYWNldCwgLTEpO1xuXG4gICAgICAgIC8vIHRoZSBpdGVtIG1heSBiZWNvbWUgdW5mb2N1c2VkIGR1cmluZyB0aGUgcmVvcmRlciBzbyB3ZSBzaG91bGQgcmVmb2N1cyBpdFxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZWxlbWVudC5mb2N1cygpKTtcblxuICAgICAgICAvLyBhbm5vdW5jZSB0aGUgbW92ZVxuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYE9wdGlvbiAke2ZhY2V0LnRpdGxlfSBtb3ZlZCB1cC5gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNoaWZ0RmFjZXQoZmFjZXQ6IEZhY2V0LCBkaXN0YW5jZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5mYWNldHMuaW5kZXhPZihmYWNldCk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGluZGV4ICsgZGlzdGFuY2U7XG5cbiAgICAgICAgLy8gRW5zdXJlIHRoZSBtb3ZlIGlzIHZhbGlkXG4gICAgICAgIGlmICh0YXJnZXQgPCAwIHx8IHRhcmdldCA9PT0gdGhpcy5mYWNldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQZXJmb3JtIHRoZSBtb3ZlXG4gICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZSh0YXJnZXQsIDAsIGZhY2V0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyaWdnZXJFdmVudChldmVudDogRmFjZXRFdmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGV2ZW50KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRSZW9yZGVyRXZlbnQgZXh0ZW5kcyBSZW9yZGVyRXZlbnQge1xuICAgIGluZGV4OiBudW1iZXI7XG59Il19