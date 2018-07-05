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
FacetTypeaheadListComponent.ctorParameters = () => [];
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
/** @nocollapse */
FacetTypeaheadHighlight.ctorParameters = () => [];
function FacetTypeaheadHighlight_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetTypeaheadHighlight.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetTypeaheadHighlight.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmFjZXRzL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUF1QzdFLE1BQU0sa0NBQW1DLFNBQVEsa0JBQWtCOzs7d0JBSWxDLElBQUk7K0JBQ29CLEVBQUU7MkJBQ3ZCLEVBQUU7MEJBQ0gsSUFBSTtnREFLRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQTRCO3VDQUN2QjtZQUN4RCxXQUFXLEVBQUUsRUFBRTtZQUNmLFVBQVUsRUFBRSxFQUFFO1lBQ2QsYUFBYSxFQUFFLENBQUM7U0FDbkI7Ozs7O0lBRUQsUUFBUTs7UUFHSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUM7O1lBR3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFlOztnQkFHL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMs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O1lBbElKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBZ0NDO2FBQ2Q7Ozs7O3VCQUdJLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO2dDQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFHVixNQUFNOzs7Ozs7SUFDRixTQUFTLENBQUMsS0FBYSxFQUFFLFdBQW1CO1FBQ3hDLHFCQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLDBDQUEyQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBRSxNQUFNLENBQUMsQ0FBQztLQUNyRzs7O1lBUEosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSx5QkFBeUI7YUFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFR5cGVhaGVhZE1hdGNoIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90eXBlYWhlYWQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb20nO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRmFjZXRCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi4vbW9kZWxzL2ZhY2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC10eXBlYWhlYWQtbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8dXgtZmFjZXQtaGVhZGVyIFtoZWFkZXJdPVwiaGVhZGVyXCIgWyhleHBhbmRlZCldPVwiZXhwYW5kZWRcIj48L3V4LWZhY2V0LWhlYWRlcj5cblxuPGRpdiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LWNvbnRhaW5lclwiICpuZ0lmPVwiZXhwYW5kZWRcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1jb250YWluZXJcIiAqbmdJZj1cInN1Z2dlc3Rpb25zPy5sZW5ndGggPiAwXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LXNlbGVjdGVkLW9wdGlvblwiIHRhYmluZGV4PVwiMFwiICpuZ0Zvcj1cImxldCBmYWNldCBvZiBzdWdnZXN0aW9uc1wiIChjbGljayk9XCJ0b2dnbGVGYWNldFNlbGVjdGlvbihmYWNldClcIlxuICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cInRvZ2dsZUZhY2V0U2VsZWN0aW9uKGZhY2V0KVwiPlxuXG4gICAgICAgICAgICA8dXgtY2hlY2tib3ggW2NsaWNrYWJsZV09XCJmYWxzZVwiIFt2YWx1ZV09XCJpc0ZhY2V0U2VsZWN0ZWQoZmFjZXQpXCIgW3NpbXBsaWZpZWRdPVwic2ltcGxpZmllZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtc2VsZWN0ZWQtb3B0aW9uLXRpdGxlXCI+e3sgZmFjZXQudGl0bGUgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1vcHRpb24tY291bnRcIj4oe3sgZmFjZXQuY291bnQgfX0pPC9zcGFuPlxuICAgICAgICAgICAgPC91eC1jaGVja2JveD5cblxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LWNvbnRyb2xcIj5cblxuICAgICAgICA8IS0tIENyZWF0ZSBUeXBlYWhlYWQgQ29udHJvbCAtLT5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbcGxhY2Vob2xkZXJdPVwidHlwZWFoZWFkQ29uZmlnPy5wbGFjZWhvbGRlclwiIFt0eXBlYWhlYWRdPVwidHlwZWFoZWFkT3B0aW9uc1wiIFsobmdNb2RlbCldPVwic2VhcmNoUXVlcnlcIlxuICAgICAgICAgICAgW3R5cGVhaGVhZE1pbkxlbmd0aF09XCJ0eXBlYWhlYWRDb25maWc/Lm1pbkNoYXJhY3RlcnNcIiBbdHlwZWFoZWFkT3B0aW9uc0xpbWl0XT1cInR5cGVhaGVhZENvbmZpZz8ubWF4UmVzdWx0c1wiIFt0eXBlYWhlYWRXYWl0TXNdPVwidHlwZWFoZWFkQ29uZmlnPy5kZWxheVwiXG4gICAgICAgICAgICAodHlwZWFoZWFkT25TZWxlY3QpPVwic2VsZWN0T3B0aW9uKCRldmVudClcIiBbdHlwZWFoZWFkSXRlbVRlbXBsYXRlXT1cImZhY2V0T3B0aW9uVGVtcGxhdGVcIiAoa2V5dXAuQXJyb3dVcCk9XCJzY3JvbGxUb0ZvY3VzZWQoKVwiIChrZXl1cC5BcnJvd0Rvd24pPVwic2Nyb2xsVG9Gb2N1c2VkKClcIj5cblxuICAgIDwvZGl2PlxuXG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWNldE9wdGlvblRlbXBsYXRlIGxldC1tb2RlbD1cIml0ZW1cIiBsZXQtaW5kZXg9XCJpbmRleFwiPlxuICAgIDxwIGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtb3B0aW9uXCI+PHNwYW4gW2lubmVySFRNTF09XCJtb2RlbC50aXRsZSB8IGZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0OiBzZWFyY2hRdWVyeVwiPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1vcHRpb24tY291bnRcIlxuICAgICAgICAgICAgKm5nSWY9XCJtb2RlbC5jb3VudFwiPih7eyBtb2RlbC5jb3VudCB9fSk8L3NwYW4+PC9wPlxuPC9uZy10ZW1wbGF0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VHlwZWFoZWFkTGlzdENvbXBvbmVudCBleHRlbmRzIEZhY2V0QmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBmYWNldHM6IEZhY2V0W10gfCBPYnNlcnZhYmxlPEZhY2V0W10+O1xuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB0eXBlYWhlYWRDb25maWc6IEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyA9IHt9O1xuICAgIEBJbnB1dCgpIHN1Z2dlc3Rpb25zOiBGYWNldFtdID0gW107XG4gICAgQElucHV0KCkgc2ltcGxpZmllZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICB0eXBlYWhlYWRPcHRpb25zOiBPYnNlcnZhYmxlPEZhY2V0W10+O1xuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9uYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9kZWZhdWx0VHlwZWFoZWFkQ29uZmlnOiBGYWNldFR5cGVhaGVhZExpc3RDb25maWcgPSB7XG4gICAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgbWF4UmVzdWx0czogNTAsXG4gICAgICAgIG1pbkNoYXJhY3RlcnM6IDFcbiAgICB9O1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gd3JhcCB0aGUgb2JzZXJ2YWJsZSBhbmQgZmlsdGVyIG91dCBhbnkgYWxyZWFkeSBzZWxlY3RlZCBpdGVtcyBvciBhbnkgZGlzYWJsZWQgaXRlbXNcbiAgICAgICAgaWYgKHRoaXMuZmFjZXRzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgYW4gb2JzZXJ2YWJsZSBvZiBkYXRhXG4gICAgICAgICAgICB0aGlzLnR5cGVhaGVhZE9wdGlvbnMgPSBmcm9tKHRoaXMuZmFjZXRzKS5waXBlKG1hcCgoZmFjZXRzOiBGYWNldFtdKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGlzYWJsZWQgZmFjZXRzLCBzZWxlY3RlZCBmYWNldHMgYW5kIGZhY2V0cyB0aGF0IGRvbnQgbWF0Y2ggc2VhcmNoIHRlcm1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjZXRzLmZpbHRlcihmYWNldCA9PiAhZmFjZXQuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZmFjZXQgPT4gIXRoaXMuc2VsZWN0ZWQuZmluZChzZWxlY3RlZEZhY2V0ID0+IHNlbGVjdGVkRmFjZXQgPT09IGZhY2V0KSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmYWNldCA9PiBmYWNldC50aXRsZS50b1VwcGVyQ2FzZSgpLmluY2x1ZGVzKHRoaXMuc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSkpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBhbiBhcnJheSBvZiBkYXRhXG4gICAgICAgICAgICB0aGlzLnR5cGVhaGVhZE9wdGlvbnMgPSBvZih0aGlzLmZhY2V0cykucGlwZShtYXAoKGZhY2V0czogRmFjZXRbXSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRpc2FibGVkIGZhY2V0cywgc2VsZWN0ZWQgZmFjZXRzIGFuZCBmYWNldHMgdGhhdCBkb250IG1hdGNoIHNlYXJjaCB0ZXJtXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY2V0cy5maWx0ZXIoZmFjZXQgPT4gIWZhY2V0LmRpc2FibGVkKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZhY2V0ID0+ICF0aGlzLnNlbGVjdGVkLmZpbmQoc2VsZWN0ZWRGYWNldCA9PiBzZWxlY3RlZEZhY2V0ID09PSBmYWNldCkpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZmFjZXQgPT4gZmFjZXQudGl0bGUudG9VcHBlckNhc2UoKS5pbmNsdWRlcyh0aGlzLnNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIHR5cGVhaGVhZCBjb25maWdcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLl9kZWZhdWx0VHlwZWFoZWFkQ29uZmlnKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHByb3AgaGFzIGJlZW4gZGVmaW5lZCBpbiB0aGUgdXNlcnMgdHlwZWFoZWFkIGNvbmZpZyAtIGlmIG5vdCBzZXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkQ29uZmlnLmhhc093blByb3BlcnR5KHByb3ApID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkQ29uZmlnW3Byb3BdID0gdGhpcy5fZGVmYXVsdFR5cGVhaGVhZENvbmZpZ1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE9wdGlvbih0eXBlYWhlYWRPcHRpb246IFR5cGVhaGVhZE1hdGNoKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGl0ZW0gaXMgbm90IGN1cnJlbnRseSBzZWxlY3RlZFxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZC5maW5kKGZhY2V0ID0+IGZhY2V0ID09PSB0eXBlYWhlYWRPcHRpb24uaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlbGVjdCB0aGUgZmFjZXRcbiAgICAgICAgdGhpcy5zZWxlY3RGYWNldCh0eXBlYWhlYWRPcHRpb24uaXRlbSk7XG5cbiAgICAgICAgLy8gY2xlYXIgdGhlIHR5cGVhaGVhZFxuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgfVxuXG4gICAgc2Nyb2xsVG9Gb2N1c2VkKCk6IHZvaWQge1xuXG4gICAgICAgIGxldCBkcm9wZG93biA9IHRoaXMuX25hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLW1lbnUnKTtcblxuICAgICAgICAvLyBkZWxheSB0byBhbGxvdyB0aGUgdHlwZWFoZWFkIHVpIHRvIHVwZGF0ZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgY3VycmVudGx5IGFjdGl2ZSBlbGVtZW50IGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgbGV0IGFjdGl2ZUVsZW1lbnQgPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbWVudSA+IGxpLmFjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgZWxlbWVudCBpcyBub3QgaW4gdmlld1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50Qm91bmRzID0gYWN0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBsZXQgZHJvcGRvd25Cb3VuZHMgPSBkcm9wZG93bi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Qm91bmRzLnRvcCA8IGRyb3Bkb3duQm91bmRzLnRvcCkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5zY3JvbGxUb3AgKz0gZWxlbWVudEJvdW5kcy50b3AgLSBkcm9wZG93bkJvdW5kcy50b3A7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRCb3VuZHMuYm90dG9tID4gZHJvcGRvd25Cb3VuZHMuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duLnNjcm9sbFRvcCArPSBlbGVtZW50Qm91bmRzLmJvdHRvbSAtIGRyb3Bkb3duQm91bmRzLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyB7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgbWluQ2hhcmFjdGVycz86IG51bWJlcjtcbiAgICBtYXhSZXN1bHRzPzogbnVtYmVyO1xuICAgIGRlbGF5PzogbnVtYmVyO1xufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBGYWNldFR5cGVhaGVhZEhpZ2hsaWdodCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBzZWFyY2hRdWVyeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsIGA8YiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1oaWdobGlnaHRlZFwiPiR7IHZhbHVlLm1hdGNoKHJlZ2V4KSB9PC9iPmApO1xuICAgIH1cbn0iXX0=