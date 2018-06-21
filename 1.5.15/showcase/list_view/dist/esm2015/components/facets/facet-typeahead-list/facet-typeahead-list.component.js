/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Pipe } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
export class FacetTypeaheadListComponent extends FacetBaseComponent {
    constructor() {
        super(...arguments);
        this.expanded = true;
        this.typeaheadConfig = {};
        this.suggestions = [];
        this.simplified = true;
        this._nativeElement = /** @type {?} */ (this._elementRef.nativeElement);
        this._defaultTypeaheadConfig = {
            placeholder: '',
            maxResults: 50,
            minCharacters: 1
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof Observable) {
            // handle an observable of data
            this.typeaheadOptions = from(this.facets).pipe(map((facets) => {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            }));
        }
        else {
            // handle an array of data
            this.typeaheadOptions = of(this.facets).pipe(map((facets) => {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            }));
        }
        // provide default values for typeahead config
        for (let /** @type {?} */ prop in this._defaultTypeaheadConfig) {
            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this._defaultTypeaheadConfig[prop];
            }
        }
    }
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    selectOption(typeaheadOption) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(facet => facet === typeaheadOption.item)) {
            return;
        }
        // select the facet
        this.selectFacet(typeaheadOption.item);
        // clear the typeahead
        this.searchQuery = '';
    }
    /**
     * @return {?}
     */
    scrollToFocused() {
        let /** @type {?} */ dropdown = this._nativeElement.querySelector('.dropdown-menu');
        // delay to allow the typeahead ui to update
        setTimeout(() => {
            // find the currently active element if there is one
            let /** @type {?} */ activeElement = dropdown.querySelector('.dropdown-menu > li.active');
            if (activeElement) {
                // check if element is not in view
                let /** @type {?} */ elementBounds = activeElement.getBoundingClientRect();
                let /** @type {?} */ dropdownBounds = dropdown.getBoundingClientRect();
                if (elementBounds.top < dropdownBounds.top) {
                    dropdown.scrollTop += elementBounds.top - dropdownBounds.top;
                }
                if (elementBounds.bottom > dropdownBounds.bottom) {
                    dropdown.scrollTop += elementBounds.bottom - dropdownBounds.bottom;
                }
            }
        });
    }
}
FacetTypeaheadListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-typeahead-list',
                template: `<ux-facet-header [header]="header" [(expanded)]="expanded"></ux-facet-header>

<div class="facet-typeahead-list-container" *ngIf="expanded">

    <div class="facet-typeahead-list-selected-container" *ngIf="suggestions?.length > 0">

        <div class="facet-typeahead-list-selected-option" tabindex="0" *ngFor="let facet of suggestions" (click)="toggleFacetSelection(facet)"
            (keyup.enter)="toggleFacetSelection(facet)">

            <ux-checkbox [clickable]="false" [value]="isFacetSelected(facet)" [simplified]="simplified">
                <span class="facet-typeahead-list-selected-option-title">{{ facet.title }}</span>
                <span class="facet-typeahead-list-selected-option-count">({{ facet.count }})</span>
            </ux-checkbox>

        </div>

    </div>

    <div class="facet-typeahead-list-control">

        <!-- Create Typeahead Control -->
        <input type="text" class="form-control" [placeholder]="typeaheadConfig?.placeholder" [typeahead]="typeaheadOptions" [(ngModel)]="searchQuery"
            [typeaheadMinLength]="typeaheadConfig?.minCharacters" [typeaheadOptionsLimit]="typeaheadConfig?.maxResults" [typeaheadWaitMs]="typeaheadConfig?.delay"
            (typeaheadOnSelect)="selectOption($event)" [typeaheadItemTemplate]="facetOptionTemplate" (keyup.ArrowUp)="scrollToFocused()" (keyup.ArrowDown)="scrollToFocused()">

    </div>

</div>

<ng-template #facetOptionTemplate let-model="item" let-index="index">
    <p class="facet-typeahead-list-option"><span [innerHTML]="model.title | facetTypeaheadHighlight: searchQuery"></span> <span class="facet-typeahead-list-option-count"
            *ngIf="model.count">({{ model.count }})</span></p>
</ng-template>`
            },] },
];
/** @nocollapse */
FacetTypeaheadListComponent.propDecorators = {
    "facets": [{ type: Input },],
    "header": [{ type: Input },],
    "expanded": [{ type: Input },],
    "typeaheadConfig": [{ type: Input },],
    "suggestions": [{ type: Input },],
    "simplified": [{ type: Input },],
};
function FacetTypeaheadListComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetTypeaheadListComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetTypeaheadListComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetTypeaheadListComponent.propDecorators;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.facets;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.header;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.expanded;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.typeaheadConfig;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.suggestions;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.simplified;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.typeaheadOptions;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.searchQuery;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype._nativeElement;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype._defaultTypeaheadConfig;
}
/**
 * @record
 */
export function FacetTypeaheadListConfig() { }
function FacetTypeaheadListConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    FacetTypeaheadListConfig.prototype.placeholder;
    /** @type {?|undefined} */
    FacetTypeaheadListConfig.prototype.minCharacters;
    /** @type {?|undefined} */
    FacetTypeaheadListConfig.prototype.maxResults;
    /** @type {?|undefined} */
    FacetTypeaheadListConfig.prototype.delay;
}
export class FacetTypeaheadHighlight {
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    transform(value, searchQuery) {
        let /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="facet-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}
FacetTypeaheadHighlight.decorators = [
    { type: Pipe, args: [{
                name: 'facetTypeaheadHighlight'
            },] },
];
function FacetTypeaheadHighlight_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetTypeaheadHighlight.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetTypeaheadHighlight.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmFjZXRzL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUF1QzdFLE1BQU0sa0NBQW1DLFNBQVEsa0JBQWtCOzs7d0JBSWxDLElBQUk7K0JBQ29CLEVBQUU7MkJBQ3ZCLEVBQUU7MEJBQ0gsSUFBSTtnREFLRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQTRCO3VDQUN2QjtZQUN4RCxXQUFXLEVBQUUsRUFBRTtZQUNmLFVBQVUsRUFBRSxFQUFFO1lBQ2QsYUFBYSxFQUFFLENBQUM7U0FDbkI7Ozs7O0lBRUQsUUFBUTs7UUFHSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUM7O1lBR3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFlOztnQkFHL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMs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O1lBbElKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBZ0NDO2FBQ2Q7Ozs7dUJBR0ksS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUdWLE1BQU07Ozs7OztJQUNGLFNBQVMsQ0FBQyxLQUFhLEVBQUUsV0FBbUI7UUFDeEMscUJBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsMENBQTJDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3JHOzs7WUFQSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLHlCQUF5QjthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHlwZWFoZWFkTWF0Y2ggfSBmcm9tICduZ3gtYm9vdHN0cmFwL3R5cGVhaGVhZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbSc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGYWNldEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2ZhY2V0LWJhc2UvZmFjZXQtYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICcuLi9tb2RlbHMvZmFjZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LXR5cGVhaGVhZC1saXN0JyxcbiAgICB0ZW1wbGF0ZTogYDx1eC1mYWNldC1oZWFkZXIgW2hlYWRlcl09XCJoZWFkZXJcIiBbKGV4cGFuZGVkKV09XCJleHBhbmRlZFwiPjwvdXgtZmFjZXQtaGVhZGVyPlxuXG48ZGl2IGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3QtY29udGFpbmVyXCIgKm5nSWY9XCJleHBhbmRlZFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LXNlbGVjdGVkLWNvbnRhaW5lclwiICpuZ0lmPVwic3VnZ2VzdGlvbnM/Lmxlbmd0aCA+IDBcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtc2VsZWN0ZWQtb3B0aW9uXCIgdGFiaW5kZXg9XCIwXCIgKm5nRm9yPVwibGV0IGZhY2V0IG9mIHN1Z2dlc3Rpb25zXCIgKGNsaWNrKT1cInRvZ2dsZUZhY2V0U2VsZWN0aW9uKGZhY2V0KVwiXG4gICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwidG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQpXCI+XG5cbiAgICAgICAgICAgIDx1eC1jaGVja2JveCBbY2xpY2thYmxlXT1cImZhbHNlXCIgW3ZhbHVlXT1cImlzRmFjZXRTZWxlY3RlZChmYWNldClcIiBbc2ltcGxpZmllZF09XCJzaW1wbGlmaWVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1vcHRpb24tdGl0bGVcIj57eyBmYWNldC50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LXNlbGVjdGVkLW9wdGlvbi1jb3VudFwiPih7eyBmYWNldC5jb3VudCB9fSk8L3NwYW4+XG4gICAgICAgICAgICA8L3V4LWNoZWNrYm94PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3QtY29udHJvbFwiPlxuXG4gICAgICAgIDwhLS0gQ3JlYXRlIFR5cGVhaGVhZCBDb250cm9sIC0tPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtwbGFjZWhvbGRlcl09XCJ0eXBlYWhlYWRDb25maWc/LnBsYWNlaG9sZGVyXCIgW3R5cGVhaGVhZF09XCJ0eXBlYWhlYWRPcHRpb25zXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hRdWVyeVwiXG4gICAgICAgICAgICBbdHlwZWFoZWFkTWluTGVuZ3RoXT1cInR5cGVhaGVhZENvbmZpZz8ubWluQ2hhcmFjdGVyc1wiIFt0eXBlYWhlYWRPcHRpb25zTGltaXRdPVwidHlwZWFoZWFkQ29uZmlnPy5tYXhSZXN1bHRzXCIgW3R5cGVhaGVhZFdhaXRNc109XCJ0eXBlYWhlYWRDb25maWc/LmRlbGF5XCJcbiAgICAgICAgICAgICh0eXBlYWhlYWRPblNlbGVjdCk9XCJzZWxlY3RPcHRpb24oJGV2ZW50KVwiIFt0eXBlYWhlYWRJdGVtVGVtcGxhdGVdPVwiZmFjZXRPcHRpb25UZW1wbGF0ZVwiIChrZXl1cC5BcnJvd1VwKT1cInNjcm9sbFRvRm9jdXNlZCgpXCIgKGtleXVwLkFycm93RG93bik9XCJzY3JvbGxUb0ZvY3VzZWQoKVwiPlxuXG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2ZhY2V0T3B0aW9uVGVtcGxhdGUgbGV0LW1vZGVsPVwiaXRlbVwiIGxldC1pbmRleD1cImluZGV4XCI+XG4gICAgPHAgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1vcHRpb25cIj48c3BhbiBbaW5uZXJIVE1MXT1cIm1vZGVsLnRpdGxlIHwgZmFjZXRUeXBlYWhlYWRIaWdobGlnaHQ6IHNlYXJjaFF1ZXJ5XCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LW9wdGlvbi1jb3VudFwiXG4gICAgICAgICAgICAqbmdJZj1cIm1vZGVsLmNvdW50XCI+KHt7IG1vZGVsLmNvdW50IH19KTwvc3Bhbj48L3A+XG48L25nLXRlbXBsYXRlPmBcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRUeXBlYWhlYWRMaXN0Q29tcG9uZW50IGV4dGVuZHMgRmFjZXRCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGZhY2V0czogRmFjZXRbXSB8IE9ic2VydmFibGU8RmFjZXRbXT47XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHR5cGVhaGVhZENvbmZpZzogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnID0ge307XG4gICAgQElucHV0KCkgc3VnZ2VzdGlvbnM6IEZhY2V0W10gPSBbXTtcbiAgICBASW5wdXQoKSBzaW1wbGlmaWVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHR5cGVhaGVhZE9wdGlvbnM6IE9ic2VydmFibGU8RmFjZXRbXT47XG4gICAgc2VhcmNoUXVlcnk6IHN0cmluZztcblxuICAgIHByaXZhdGUgX25hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX2RlZmF1bHRUeXBlYWhlYWRDb25maWc6IEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyA9IHtcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICBtYXhSZXN1bHRzOiA1MCxcbiAgICAgICAgbWluQ2hhcmFjdGVyczogMVxuICAgIH07XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyB3cmFwIHRoZSBvYnNlcnZhYmxlIGFuZCBmaWx0ZXIgb3V0IGFueSBhbHJlYWR5IHNlbGVjdGVkIGl0ZW1zIG9yIGFueSBkaXNhYmxlZCBpdGVtc1xuICAgICAgICBpZiAodGhpcy5mYWNldHMgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBhbiBvYnNlcnZhYmxlIG9mIGRhdGFcbiAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkT3B0aW9ucyA9IGZyb20odGhpcy5mYWNldHMpLnBpcGUobWFwKChmYWNldHM6IEZhY2V0W10pID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkaXNhYmxlZCBmYWNldHMsIHNlbGVjdGVkIGZhY2V0cyBhbmQgZmFjZXRzIHRoYXQgZG9udCBtYXRjaCBzZWFyY2ggdGVybVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWNldHMuZmlsdGVyKGZhY2V0ID0+ICFmYWNldC5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmYWNldCA9PiAhdGhpcy5zZWxlY3RlZC5maW5kKHNlbGVjdGVkRmFjZXQgPT4gc2VsZWN0ZWRGYWNldCA9PT0gZmFjZXQpKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZhY2V0ID0+IGZhY2V0LnRpdGxlLnRvVXBwZXJDYXNlKCkuaW5jbHVkZXModGhpcy5zZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKSk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIGFuIGFycmF5IG9mIGRhdGFcbiAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkT3B0aW9ucyA9IG9mKHRoaXMuZmFjZXRzKS5waXBlKG1hcCgoZmFjZXRzOiBGYWNldFtdKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGlzYWJsZWQgZmFjZXRzLCBzZWxlY3RlZCBmYWNldHMgYW5kIGZhY2V0cyB0aGF0IGRvbnQgbWF0Y2ggc2VhcmNoIHRlcm1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjZXRzLmZpbHRlcihmYWNldCA9PiAhZmFjZXQuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZmFjZXQgPT4gIXRoaXMuc2VsZWN0ZWQuZmluZChzZWxlY3RlZEZhY2V0ID0+IHNlbGVjdGVkRmFjZXQgPT09IGZhY2V0KSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmYWNldCA9PiBmYWNldC50aXRsZS50b1VwcGVyQ2FzZSgpLmluY2x1ZGVzKHRoaXMuc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSkpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgdHlwZWFoZWFkIGNvbmZpZ1xuICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMuX2RlZmF1bHRUeXBlYWhlYWRDb25maWcpIHtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgcHJvcCBoYXMgYmVlbiBkZWZpbmVkIGluIHRoZSB1c2VycyB0eXBlYWhlYWQgY29uZmlnIC0gaWYgbm90IHNldCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWRDb25maWcuaGFzT3duUHJvcGVydHkocHJvcCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRDb25maWdbcHJvcF0gPSB0aGlzLl9kZWZhdWx0VHlwZWFoZWFkQ29uZmlnW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0T3B0aW9uKHR5cGVhaGVhZE9wdGlvbjogVHlwZWFoZWFkTWF0Y2gpIHtcblxuICAgICAgICAvLyBjaGVjayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgaXRlbSBpcyBub3QgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmZpbmQoZmFjZXQgPT4gZmFjZXQgPT09IHR5cGVhaGVhZE9wdGlvbi5pdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VsZWN0IHRoZSBmYWNldFxuICAgICAgICB0aGlzLnNlbGVjdEZhY2V0KHR5cGVhaGVhZE9wdGlvbi5pdGVtKTtcblxuICAgICAgICAvLyBjbGVhciB0aGUgdHlwZWFoZWFkXG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSAnJztcbiAgICB9XG5cbiAgICBzY3JvbGxUb0ZvY3VzZWQoKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IGRyb3Bkb3duID0gdGhpcy5fbmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbWVudScpO1xuXG4gICAgICAgIC8vIGRlbGF5IHRvIGFsbG93IHRoZSB0eXBlYWhlYWQgdWkgdG8gdXBkYXRlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBjdXJyZW50bHkgYWN0aXZlIGVsZW1lbnQgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgICAgICBsZXQgYWN0aXZlRWxlbWVudCA9IGRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51ID4gbGkuYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50KSB7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBlbGVtZW50IGlzIG5vdCBpbiB2aWV3XG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRCb3VuZHMgPSBhY3RpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGxldCBkcm9wZG93bkJvdW5kcyA9IGRyb3Bkb3duLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRCb3VuZHMudG9wIDwgZHJvcGRvd25Cb3VuZHMudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duLnNjcm9sbFRvcCArPSBlbGVtZW50Qm91bmRzLnRvcCAtIGRyb3Bkb3duQm91bmRzLnRvcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudEJvdW5kcy5ib3R0b20gPiBkcm9wZG93bkJvdW5kcy5ib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uc2Nyb2xsVG9wICs9IGVsZW1lbnRCb3VuZHMuYm90dG9tIC0gZHJvcGRvd25Cb3VuZHMuYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnIHtcbiAgICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgICBtaW5DaGFyYWN0ZXJzPzogbnVtYmVyO1xuICAgIG1heFJlc3VsdHM/OiBudW1iZXI7XG4gICAgZGVsYXk/OiBudW1iZXI7XG59XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZmFjZXRUeXBlYWhlYWRIaWdobGlnaHQnXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIHNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKHNlYXJjaFF1ZXJ5LCAnaScpO1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShyZWdleCwgYDxiIGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWhpZ2hsaWdodGVkXCI+JHsgdmFsdWUubWF0Y2gocmVnZXgpIH08L2I+YCk7XG4gICAgfVxufSJdfQ==