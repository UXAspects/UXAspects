/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Pipe } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
var FacetTypeaheadListComponent = (function (_super) {
    tslib_1.__extends(FacetTypeaheadListComponent, _super);
    function FacetTypeaheadListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.expanded = true;
        _this.typeaheadConfig = {};
        _this.suggestions = [];
        _this.simplified = true;
        _this._nativeElement = /** @type {?} */ (_this._elementRef.nativeElement);
        _this._defaultTypeaheadConfig = {
            placeholder: '',
            maxResults: 50,
            minCharacters: 1
        };
        return _this;
    }
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof Observable) {
            // handle an observable of data
            this.typeaheadOptions = from(this.facets).pipe(map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            }));
        }
        else {
            // handle an array of data
            this.typeaheadOptions = of(this.facets).pipe(map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            }));
        }
        // provide default values for typeahead config
        for (var /** @type {?} */ prop in this._defaultTypeaheadConfig) {
            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this._defaultTypeaheadConfig[prop];
            }
        }
    };
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.selectOption = /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    function (typeaheadOption) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(function (facet) { return facet === typeaheadOption.item; })) {
            return;
        }
        // select the facet
        this.selectFacet(typeaheadOption.item);
        // clear the typeahead
        this.searchQuery = '';
    };
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.scrollToFocused = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ dropdown = this._nativeElement.querySelector('.dropdown-menu');
        // delay to allow the typeahead ui to update
        setTimeout(function () {
            // find the currently active element if there is one
            var /** @type {?} */ activeElement = dropdown.querySelector('.dropdown-menu > li.active');
            if (activeElement) {
                // check if element is not in view
                var /** @type {?} */ elementBounds = activeElement.getBoundingClientRect();
                var /** @type {?} */ dropdownBounds = dropdown.getBoundingClientRect();
                if (elementBounds.top < dropdownBounds.top) {
                    dropdown.scrollTop += elementBounds.top - dropdownBounds.top;
                }
                if (elementBounds.bottom > dropdownBounds.bottom) {
                    dropdown.scrollTop += elementBounds.bottom - dropdownBounds.bottom;
                }
            }
        });
    };
    FacetTypeaheadListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-typeahead-list',
                    template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<div class=\"facet-typeahead-list-container\" *ngIf=\"expanded\">\n\n    <div class=\"facet-typeahead-list-selected-container\" *ngIf=\"suggestions?.length > 0\">\n\n        <div class=\"facet-typeahead-list-selected-option\" tabindex=\"0\" *ngFor=\"let facet of suggestions\" (click)=\"toggleFacetSelection(facet)\"\n            (keyup.enter)=\"toggleFacetSelection(facet)\">\n\n            <ux-checkbox [clickable]=\"false\" [value]=\"isFacetSelected(facet)\" [simplified]=\"simplified\">\n                <span class=\"facet-typeahead-list-selected-option-title\">{{ facet.title }}</span>\n                <span class=\"facet-typeahead-list-selected-option-count\">({{ facet.count }})</span>\n            </ux-checkbox>\n\n        </div>\n\n    </div>\n\n    <div class=\"facet-typeahead-list-control\">\n\n        <!-- Create Typeahead Control -->\n        <input type=\"text\" class=\"form-control\" [placeholder]=\"typeaheadConfig?.placeholder\" [typeahead]=\"typeaheadOptions\" [(ngModel)]=\"searchQuery\"\n            [typeaheadMinLength]=\"typeaheadConfig?.minCharacters\" [typeaheadOptionsLimit]=\"typeaheadConfig?.maxResults\" [typeaheadWaitMs]=\"typeaheadConfig?.delay\"\n            (typeaheadOnSelect)=\"selectOption($event)\" [typeaheadItemTemplate]=\"facetOptionTemplate\" (keyup.ArrowUp)=\"scrollToFocused()\" (keyup.ArrowDown)=\"scrollToFocused()\">\n\n    </div>\n\n</div>\n\n<ng-template #facetOptionTemplate let-model=\"item\" let-index=\"index\">\n    <p class=\"facet-typeahead-list-option\"><span [innerHTML]=\"model.title | facetTypeaheadHighlight: searchQuery\"></span> <span class=\"facet-typeahead-list-option-count\"\n            *ngIf=\"model.count\">({{ model.count }})</span></p>\n</ng-template>"
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
    return FacetTypeaheadListComponent;
}(FacetBaseComponent));
export { FacetTypeaheadListComponent };
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
var FacetTypeaheadHighlight = (function () {
    function FacetTypeaheadHighlight() {
    }
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    FacetTypeaheadHighlight.prototype.transform = /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    function (value, searchQuery) {
        var /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, "<b class=\"facet-typeahead-highlighted\">" + value.match(regex) + "</b>");
    };
    FacetTypeaheadHighlight.decorators = [
        { type: Pipe, args: [{
                    name: 'facetTypeaheadHighlight'
                },] },
    ];
    return FacetTypeaheadHighlight;
}());
export { FacetTypeaheadHighlight };
function FacetTypeaheadHighlight_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetTypeaheadHighlight.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetTypeaheadHighlight.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmFjZXRzL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztJQXVDNUIsdURBQWtCOzs7eUJBSWxDLElBQUk7Z0NBQ29CLEVBQUU7NEJBQ3ZCLEVBQUU7MkJBQ0gsSUFBSTtpREFLRyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQTRCO3dDQUN2QjtZQUN4RCxXQUFXLEVBQUUsRUFBRTtZQUNmLFVBQVUsRUFBRSxFQUFFO1lBQ2QsYUFBYSxFQUFFLENBQUM7U0FDbkI7Ozs7OztJQUVELDhDQUFROzs7SUFBUjtRQUFBLGlCQWtDQzs7UUEvQkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sWUFBWSxVQUFVLENBQUMsQ0FBQyxDQUFDOztZQUdwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBZTs7Z0JBRy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FB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YUFBYSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO2lCQUNoRTtnQkFFRCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxRQUFRLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztpQkFDdEU7YUFDSjtTQUNKLENBQUMsQ0FBQztLQUNOOztnQkFsSUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSxzeERBZ0NDO2lCQUNkOzs7OzJCQUdJLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLO29DQUNMLEtBQUs7Z0NBQ0wsS0FBSzsrQkFDTCxLQUFLOztzQ0FwRFY7RUE2Q2lELGtCQUFrQjtTQUF0RCwyQkFBMkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZHcEMsMkNBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsV0FBbUI7UUFDeEMscUJBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsOENBQTJDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQU8sQ0FBQyxDQUFDO0tBQ3JHOztnQkFQSixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLHlCQUF5QjtpQkFDbEM7O2tDQXhKRDs7U0F5SmEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUeXBlYWhlYWRNYXRjaCB9IGZyb20gJ25neC1ib290c3RyYXAvdHlwZWFoZWFkJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZhY2V0QmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvZmFjZXQtYmFzZS9mYWNldC1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4uL21vZGVscy9mYWNldCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtdHlwZWFoZWFkLWxpc3QnLFxuICAgIHRlbXBsYXRlOiBgPHV4LWZhY2V0LWhlYWRlciBbaGVhZGVyXT1cImhlYWRlclwiIFsoZXhwYW5kZWQpXT1cImV4cGFuZGVkXCI+PC91eC1mYWNldC1oZWFkZXI+XG5cbjxkaXYgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1jb250YWluZXJcIiAqbmdJZj1cImV4cGFuZGVkXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtc2VsZWN0ZWQtY29udGFpbmVyXCIgKm5nSWY9XCJzdWdnZXN0aW9ucz8ubGVuZ3RoID4gMFwiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1vcHRpb25cIiB0YWJpbmRleD1cIjBcIiAqbmdGb3I9XCJsZXQgZmFjZXQgb2Ygc3VnZ2VzdGlvbnNcIiAoY2xpY2spPVwidG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQpXCJcbiAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJ0b2dnbGVGYWNldFNlbGVjdGlvbihmYWNldClcIj5cblxuICAgICAgICAgICAgPHV4LWNoZWNrYm94IFtjbGlja2FibGVdPVwiZmFsc2VcIiBbdmFsdWVdPVwiaXNGYWNldFNlbGVjdGVkKGZhY2V0KVwiIFtzaW1wbGlmaWVkXT1cInNpbXBsaWZpZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LXNlbGVjdGVkLW9wdGlvbi10aXRsZVwiPnt7IGZhY2V0LnRpdGxlIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtc2VsZWN0ZWQtb3B0aW9uLWNvdW50XCI+KHt7IGZhY2V0LmNvdW50IH19KTwvc3Bhbj5cbiAgICAgICAgICAgIDwvdXgtY2hlY2tib3g+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1jb250cm9sXCI+XG5cbiAgICAgICAgPCEtLSBDcmVhdGUgVHlwZWFoZWFkIENvbnRyb2wgLS0+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3BsYWNlaG9sZGVyXT1cInR5cGVhaGVhZENvbmZpZz8ucGxhY2Vob2xkZXJcIiBbdHlwZWFoZWFkXT1cInR5cGVhaGVhZE9wdGlvbnNcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICAgIFt0eXBlYWhlYWRNaW5MZW5ndGhdPVwidHlwZWFoZWFkQ29uZmlnPy5taW5DaGFyYWN0ZXJzXCIgW3R5cGVhaGVhZE9wdGlvbnNMaW1pdF09XCJ0eXBlYWhlYWRDb25maWc/Lm1heFJlc3VsdHNcIiBbdHlwZWFoZWFkV2FpdE1zXT1cInR5cGVhaGVhZENvbmZpZz8uZGVsYXlcIlxuICAgICAgICAgICAgKHR5cGVhaGVhZE9uU2VsZWN0KT1cInNlbGVjdE9wdGlvbigkZXZlbnQpXCIgW3R5cGVhaGVhZEl0ZW1UZW1wbGF0ZV09XCJmYWNldE9wdGlvblRlbXBsYXRlXCIgKGtleXVwLkFycm93VXApPVwic2Nyb2xsVG9Gb2N1c2VkKClcIiAoa2V5dXAuQXJyb3dEb3duKT1cInNjcm9sbFRvRm9jdXNlZCgpXCI+XG5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFjZXRPcHRpb25UZW1wbGF0ZSBsZXQtbW9kZWw9XCJpdGVtXCIgbGV0LWluZGV4PVwiaW5kZXhcIj5cbiAgICA8cCBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LW9wdGlvblwiPjxzcGFuIFtpbm5lckhUTUxdPVwibW9kZWwudGl0bGUgfCBmYWNldFR5cGVhaGVhZEhpZ2hsaWdodDogc2VhcmNoUXVlcnlcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtb3B0aW9uLWNvdW50XCJcbiAgICAgICAgICAgICpuZ0lmPVwibW9kZWwuY291bnRcIj4oe3sgbW9kZWwuY291bnQgfX0pPC9zcGFuPjwvcD5cbjwvbmctdGVtcGxhdGU+YFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldFR5cGVhaGVhZExpc3RDb21wb25lbnQgZXh0ZW5kcyBGYWNldEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdIHwgT2JzZXJ2YWJsZTxGYWNldFtdPjtcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdHlwZWFoZWFkQ29uZmlnOiBGYWNldFR5cGVhaGVhZExpc3RDb25maWcgPSB7fTtcbiAgICBASW5wdXQoKSBzdWdnZXN0aW9uczogRmFjZXRbXSA9IFtdO1xuICAgIEBJbnB1dCgpIHNpbXBsaWZpZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgdHlwZWFoZWFkT3B0aW9uczogT2JzZXJ2YWJsZTxGYWNldFtdPjtcbiAgICBzZWFyY2hRdWVyeTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfZGVmYXVsdFR5cGVhaGVhZENvbmZpZzogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnID0ge1xuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIG1heFJlc3VsdHM6IDUwLFxuICAgICAgICBtaW5DaGFyYWN0ZXJzOiAxXG4gICAgfTtcblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIHdyYXAgdGhlIG9ic2VydmFibGUgYW5kIGZpbHRlciBvdXQgYW55IGFscmVhZHkgc2VsZWN0ZWQgaXRlbXMgb3IgYW55IGRpc2FibGVkIGl0ZW1zXG4gICAgICAgIGlmICh0aGlzLmZhY2V0cyBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIGFuIG9ic2VydmFibGUgb2YgZGF0YVxuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gZnJvbSh0aGlzLmZhY2V0cykucGlwZShtYXAoKGZhY2V0czogRmFjZXRbXSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRpc2FibGVkIGZhY2V0cywgc2VsZWN0ZWQgZmFjZXRzIGFuZCBmYWNldHMgdGhhdCBkb250IG1hdGNoIHNlYXJjaCB0ZXJtXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY2V0cy5maWx0ZXIoZmFjZXQgPT4gIWZhY2V0LmRpc2FibGVkKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZhY2V0ID0+ICF0aGlzLnNlbGVjdGVkLmZpbmQoc2VsZWN0ZWRGYWNldCA9PiBzZWxlY3RlZEZhY2V0ID09PSBmYWNldCkpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZmFjZXQgPT4gZmFjZXQudGl0bGUudG9VcHBlckNhc2UoKS5pbmNsdWRlcyh0aGlzLnNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgYW4gYXJyYXkgb2YgZGF0YVxuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gb2YodGhpcy5mYWNldHMpLnBpcGUobWFwKChmYWNldHM6IEZhY2V0W10pID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkaXNhYmxlZCBmYWNldHMsIHNlbGVjdGVkIGZhY2V0cyBhbmQgZmFjZXRzIHRoYXQgZG9udCBtYXRjaCBzZWFyY2ggdGVybVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWNldHMuZmlsdGVyKGZhY2V0ID0+ICFmYWNldC5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmYWNldCA9PiAhdGhpcy5zZWxlY3RlZC5maW5kKHNlbGVjdGVkRmFjZXQgPT4gc2VsZWN0ZWRGYWNldCA9PT0gZmFjZXQpKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZhY2V0ID0+IGZhY2V0LnRpdGxlLnRvVXBwZXJDYXNlKCkuaW5jbHVkZXModGhpcy5zZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciB0eXBlYWhlYWQgY29uZmlnXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5fZGVmYXVsdFR5cGVhaGVhZENvbmZpZykge1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBwcm9wIGhhcyBiZWVuIGRlZmluZWQgaW4gdGhlIHVzZXJzIHR5cGVhaGVhZCBjb25maWcgLSBpZiBub3Qgc2V0IGRlZmF1bHQgdmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZENvbmZpZy5oYXNPd25Qcm9wZXJ0eShwcm9wKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZENvbmZpZ1twcm9wXSA9IHRoaXMuX2RlZmF1bHRUeXBlYWhlYWRDb25maWdbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RPcHRpb24odHlwZWFoZWFkT3B0aW9uOiBUeXBlYWhlYWRNYXRjaCkge1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBpdGVtIGlzIG5vdCBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQuZmluZChmYWNldCA9PiBmYWNldCA9PT0gdHlwZWFoZWFkT3B0aW9uLml0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZWxlY3QgdGhlIGZhY2V0XG4gICAgICAgIHRoaXMuc2VsZWN0RmFjZXQodHlwZWFoZWFkT3B0aW9uLml0ZW0pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSB0eXBlYWhlYWRcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9ICcnO1xuICAgIH1cblxuICAgIHNjcm9sbFRvRm9jdXNlZCgpOiB2b2lkIHtcblxuICAgICAgICBsZXQgZHJvcGRvd24gPSB0aGlzLl9uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XG5cbiAgICAgICAgLy8gZGVsYXkgdG8gYWxsb3cgdGhlIHR5cGVhaGVhZCB1aSB0byB1cGRhdGVcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIGN1cnJlbnRseSBhY3RpdmUgZWxlbWVudCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgICAgIGxldCBhY3RpdmVFbGVtZW50ID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLW1lbnUgPiBsaS5hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQpIHtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGVsZW1lbnQgaXMgbm90IGluIHZpZXdcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudEJvdW5kcyA9IGFjdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgbGV0IGRyb3Bkb3duQm91bmRzID0gZHJvcGRvd24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudEJvdW5kcy50b3AgPCBkcm9wZG93bkJvdW5kcy50b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uc2Nyb2xsVG9wICs9IGVsZW1lbnRCb3VuZHMudG9wIC0gZHJvcGRvd25Cb3VuZHMudG9wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Qm91bmRzLmJvdHRvbSA+IGRyb3Bkb3duQm91bmRzLmJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5zY3JvbGxUb3AgKz0gZWxlbWVudEJvdW5kcy5ib3R0b20gLSBkcm9wZG93bkJvdW5kcy5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFR5cGVhaGVhZExpc3RDb25maWcge1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIG1pbkNoYXJhY3RlcnM/OiBudW1iZXI7XG4gICAgbWF4UmVzdWx0cz86IG51bWJlcjtcbiAgICBkZWxheT86IG51bWJlcjtcbn1cblxuQFBpcGUoe1xuICAgIG5hbWU6ICdmYWNldFR5cGVhaGVhZEhpZ2hsaWdodCdcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRUeXBlYWhlYWRIaWdobGlnaHQgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgc2VhcmNoUXVlcnk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoc2VhcmNoUXVlcnksICdpJyk7XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlZ2V4LCBgPGIgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtaGlnaGxpZ2h0ZWRcIj4keyB2YWx1ZS5tYXRjaChyZWdleCkgfTwvYj5gKTtcbiAgICB9XG59Il19