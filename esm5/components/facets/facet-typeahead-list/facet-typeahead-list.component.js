/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, Pipe, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { TypeaheadKeyService } from '../../typeahead/index';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { FacetContainerComponent } from '../facet-container.component';
import { FacetTypeaheadListItemComponent } from './typeahead-list-item/facet-typeahead-list-item.component';
var /** @type {?} */ uniqueId = 1;
var FacetTypeaheadListComponent = (function (_super) {
    tslib_1.__extends(FacetTypeaheadListComponent, _super);
    function FacetTypeaheadListComponent(typeaheadKeyService, facetContainer, elementRef, _announcer) {
        var _this = _super.call(this, facetContainer, elementRef) || this;
        _this.typeaheadKeyService = typeaheadKeyService;
        _this._announcer = _announcer;
        _this.expanded = true;
        _this.suggestions = [];
        _this.simplified = true;
        _this.query$ = new BehaviorSubject('');
        _this.loading = false;
        _this.activeIndex = 0;
        _this.typeaheadId = "ux-facet-typeahead-" + uniqueId++;
        _this.typeaheadOpen = false;
        _this.typeaheadOptions = [];
        _this._config = { placeholder: '', maxResults: 50, minCharacters: 1 };
        return _this;
    }
    Object.defineProperty(FacetTypeaheadListComponent.prototype, "typeaheadConfig", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this._config = tslib_1.__assign({ placeholder: '', maxResults: 50, minCharacters: 1 }, config);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // set up search query subscription
        this.query$.pipe(takeUntil(this._onDestroy), tap(function () {
            _this.loading = true;
            _this.typeaheadOptions = [];
        }), mergeMap(function () {
            return _this.getFacetObservable().pipe(map(function (facets) {
                return facets.filter(function (facet) { return !facet.disabled && !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .slice(0, _this._config.maxResults);
            }));
        })).subscribe(function (facets) {
            _this.loading = false;
            _this.typeaheadOptions = facets;
        });
        this._focusKeyManager = new FocusKeyManager(this.options).withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(function (index) { return _this.activeIndex = index; });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._focusKeyManager.onKeydown(event);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.onFocus = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    };
    /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.toggleFacet = /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    function (index, facet) {
        this.toggleFacetSelection(facet);
        this._focusKeyManager.setActiveItem(index);
    };
    /** Only show typeahead if we have enough characters */
    /**
     * Only show typeahead if we have enough characters
     * @param {?=} query
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.updateTypeahead = /**
     * Only show typeahead if we have enough characters
     * @param {?=} query
     * @return {?}
     */
    function (query) {
        if (query === void 0) { query = ''; }
        this.typeaheadOpen = query.length >= this._config.minCharacters;
    };
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.getFacetObservable = /**
     * @return {?}
     */
    function () {
        return this.facets instanceof Observable ? this.facets : of(this.facets);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.select = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(function (facet) { return facet === event.option; })) {
            return;
        }
        // select the facet
        this.selectFacet(event.option);
        // clear the typeahead
        this.query$.next('');
        // announce the selected facet
        this._announcer.announce(((/** @type {?} */ (event.option))).title + " selected.");
    };
    FacetTypeaheadListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-typeahead-list',
                    template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<div class=\"facet-typeahead-list-container\" role=\"listbox\" *ngIf=\"expanded\">\n\n    <div class=\"facet-typeahead-list-selected-container\" tabindex=\"-1\" *ngIf=\"suggestions?.length > 0\">\n\n        <ux-facet-typeahead-list-item\n            *ngFor=\"let facet of suggestions; let index = index\"\n            [facet]=\"facet\"\n            [tabbable]=\"activeIndex === index\"\n            [selected]=\"isFacetSelected(facet)\"\n            (selectedChange)=\"toggleFacet(index, facet)\"\n            (keydown)=\"onKeydown($event)\"\n            (itemFocus)=\"onFocus(index)\">\n        </ux-facet-typeahead-list-item>\n\n    </div>\n\n    <div class=\"facet-typeahead-list-control\">\n\n        <!-- Create Typeahead Control -->\n        <input type=\"text\"\n            class=\"form-control\"\n            [placeholder]=\"typeaheadConfig?.placeholder\"\n            [attr.aria-activedescendant]=\"highlightedElement?.id\"\n            aria-autocomplete=\"list\"\n            aria-multiline=\"false\"\n            [attr.aria-controls]=\"typeaheadId\"\n            [ngModel]=\"query$ | async\"\n            (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n            (keydown)=\"typeaheadKeyService.handleKey($event, typeahead)\"\n            (blur)=\"typeaheadOpen = false\">\n\n        <ux-typeahead #typeahead\n            [id]=\"typeaheadId\"\n            [(open)]=\"typeaheadOpen\"\n            [loading]=\"loading\"\n            display=\"title\"\n            [options]=\"typeaheadOptions\"\n            [optionTemplate]=\"facetOptionTemplate\"\n            [selectOnEnter]=\"true\"\n            (optionSelected)=\"select($event)\"\n            (highlightedElementChange)=\"highlightedElement = $event\">\n        </ux-typeahead>\n\n    </div>\n\n</div>\n\n<ng-template #facetOptionTemplate let-option=\"option\" let-api=\"api\">\n    <p class=\"facet-typeahead-list-option\" [attr.aria-label]=\"option.title\">\n        <span [innerHTML]=\"option.title | facetTypeaheadHighlight: (query$ | async)\"></span>\n        <span class=\"facet-typeahead-list-option-count\"\n            *ngIf=\"option.count\">\n            ({{ option.count }})\n        </span>\n    </p>\n</ng-template>"
                },] },
    ];
    /** @nocollapse */
    FacetTypeaheadListComponent.ctorParameters = function () { return [
        { type: TypeaheadKeyService, },
        { type: FacetContainerComponent, },
        { type: ElementRef, },
        { type: LiveAnnouncer, },
    ]; };
    FacetTypeaheadListComponent.propDecorators = {
        "facets": [{ type: Input },],
        "header": [{ type: Input },],
        "expanded": [{ type: Input },],
        "suggestions": [{ type: Input },],
        "simplified": [{ type: Input },],
        "typeaheadConfig": [{ type: Input },],
        "options": [{ type: ViewChildren, args: [FacetTypeaheadListItemComponent,] },],
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
    FacetTypeaheadListComponent.prototype.suggestions;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.simplified;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.options;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.query$;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.loading;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.activeIndex;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.typeaheadId;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.typeaheadOpen;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.typeaheadOptions;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.highlightedElement;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype._config;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype._focusKeyManager;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype.typeaheadKeyService;
    /** @type {?} */
    FacetTypeaheadListComponent.prototype._announcer;
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
    /** @nocollapse */
    FacetTypeaheadHighlight.ctorParameters = function () { return []; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmFjZXRzL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBd0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUU1RyxxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDOztJQStEZ0MsdURBQWtCO0lBOEIvRCxxQ0FBbUIsbUJBQXdDLEVBQUUsY0FBdUMsRUFBRSxVQUFzQixFQUFVLFVBQXlCO1FBQS9KLFlBQ0ksa0JBQU0sY0FBYyxFQUFFLFVBQVUsQ0FBQyxTQUNwQztRQUZrQix5QkFBbUIs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QUFrQjtTQUF0RCwyQkFBMkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkdwQywyQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQWEsRUFBRSxXQUFtQjtRQUN4QyxxQkFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSw4Q0FBMEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBTSxDQUFDLENBQUM7S0FDbkc7O2dCQVBKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUseUJBQXlCO2lCQUNsQzs7OztrQ0F0TEQ7O1NBdUxhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciwgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFBpcGUsIFBpcGVUcmFuc2Zvcm0sIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVHlwZWFoZWFkS2V5U2VydmljZSwgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuLi8uLi90eXBlYWhlYWQvaW5kZXgnO1xuaW1wb3J0IHsgRmFjZXRCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4uL21vZGVscy9mYWNldCc7XG5pbXBvcnQgeyBGYWNldFR5cGVhaGVhZExpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlYWhlYWQtbGlzdC1pdGVtL2ZhY2V0LXR5cGVhaGVhZC1saXN0LWl0ZW0uY29tcG9uZW50JztcblxubGV0IHVuaXF1ZUlkID0gMTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC10eXBlYWhlYWQtbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8dXgtZmFjZXQtaGVhZGVyIFtoZWFkZXJdPVwiaGVhZGVyXCIgWyhleHBhbmRlZCldPVwiZXhwYW5kZWRcIj48L3V4LWZhY2V0LWhlYWRlcj5cblxuPGRpdiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LWNvbnRhaW5lclwiIHJvbGU9XCJsaXN0Ym94XCIgKm5nSWY9XCJleHBhbmRlZFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LXNlbGVjdGVkLWNvbnRhaW5lclwiIHRhYmluZGV4PVwiLTFcIiAqbmdJZj1cInN1Z2dlc3Rpb25zPy5sZW5ndGggPiAwXCI+XG5cbiAgICAgICAgPHV4LWZhY2V0LXR5cGVhaGVhZC1saXN0LWl0ZW1cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBmYWNldCBvZiBzdWdnZXN0aW9uczsgbGV0IGluZGV4ID0gaW5kZXhcIlxuICAgICAgICAgICAgW2ZhY2V0XT1cImZhY2V0XCJcbiAgICAgICAgICAgIFt0YWJiYWJsZV09XCJhY3RpdmVJbmRleCA9PT0gaW5kZXhcIlxuICAgICAgICAgICAgW3NlbGVjdGVkXT1cImlzRmFjZXRTZWxlY3RlZChmYWNldClcIlxuICAgICAgICAgICAgKHNlbGVjdGVkQ2hhbmdlKT1cInRvZ2dsZUZhY2V0KGluZGV4LCBmYWNldClcIlxuICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgKGl0ZW1Gb2N1cyk9XCJvbkZvY3VzKGluZGV4KVwiPlxuICAgICAgICA8L3V4LWZhY2V0LXR5cGVhaGVhZC1saXN0LWl0ZW0+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1jb250cm9sXCI+XG5cbiAgICAgICAgPCEtLSBDcmVhdGUgVHlwZWFoZWFkIENvbnRyb2wgLS0+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwidHlwZWFoZWFkQ29uZmlnPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiaGlnaGxpZ2h0ZWRFbGVtZW50Py5pZFwiXG4gICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxuICAgICAgICAgICAgYXJpYS1tdWx0aWxpbmU9XCJmYWxzZVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cInR5cGVhaGVhZElkXCJcbiAgICAgICAgICAgIFtuZ01vZGVsXT1cInF1ZXJ5JCB8IGFzeW5jXCJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInF1ZXJ5JC5uZXh0KCRldmVudCk7IHVwZGF0ZVR5cGVhaGVhZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cInR5cGVhaGVhZEtleVNlcnZpY2UuaGFuZGxlS2V5KCRldmVudCwgdHlwZWFoZWFkKVwiXG4gICAgICAgICAgICAoYmx1cik9XCJ0eXBlYWhlYWRPcGVuID0gZmFsc2VcIj5cblxuICAgICAgICA8dXgtdHlwZWFoZWFkICN0eXBlYWhlYWRcbiAgICAgICAgICAgIFtpZF09XCJ0eXBlYWhlYWRJZFwiXG4gICAgICAgICAgICBbKG9wZW4pXT1cInR5cGVhaGVhZE9wZW5cIlxuICAgICAgICAgICAgW2xvYWRpbmddPVwibG9hZGluZ1wiXG4gICAgICAgICAgICBkaXNwbGF5PVwidGl0bGVcIlxuICAgICAgICAgICAgW29wdGlvbnNdPVwidHlwZWFoZWFkT3B0aW9uc1wiXG4gICAgICAgICAgICBbb3B0aW9uVGVtcGxhdGVdPVwiZmFjZXRPcHRpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICBbc2VsZWN0T25FbnRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJzZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAoaGlnaGxpZ2h0ZWRFbGVtZW50Q2hhbmdlKT1cImhpZ2hsaWdodGVkRWxlbWVudCA9ICRldmVudFwiPlxuICAgICAgICA8L3V4LXR5cGVhaGVhZD5cblxuICAgIDwvZGl2PlxuXG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWNldE9wdGlvblRlbXBsYXRlIGxldC1vcHRpb249XCJvcHRpb25cIiBsZXQtYXBpPVwiYXBpXCI+XG4gICAgPHAgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1vcHRpb25cIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm9wdGlvbi50aXRsZVwiPlxuICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cIm9wdGlvbi50aXRsZSB8IGZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0OiAocXVlcnkkIHwgYXN5bmMpXCI+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LW9wdGlvbi1jb3VudFwiXG4gICAgICAgICAgICAqbmdJZj1cIm9wdGlvbi5jb3VudFwiPlxuICAgICAgICAgICAgKHt7IG9wdGlvbi5jb3VudCB9fSlcbiAgICAgICAgPC9zcGFuPlxuICAgIDwvcD5cbjwvbmctdGVtcGxhdGU+YFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldFR5cGVhaGVhZExpc3RDb21wb25lbnQgZXh0ZW5kcyBGYWNldEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIGZhY2V0czogRmFjZXRbXSB8IE9ic2VydmFibGU8RmFjZXRbXT47XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHN1Z2dlc3Rpb25zOiBGYWNldFtdID0gW107XG4gICAgQElucHV0KCkgc2ltcGxpZmllZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB0eXBlYWhlYWRDb25maWcoY29uZmlnOiBGYWNldFR5cGVhaGVhZExpc3RDb25maWcpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0geyBwbGFjZWhvbGRlcjogJycsIG1heFJlc3VsdHM6IDUwLCBtaW5DaGFyYWN0ZXJzOiAxLCAuLi5jb25maWcgfTtcbiAgICB9XG5cbiAgICBnZXQgdHlwZWFoZWFkQ29uZmlnKCk6IEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZHJlbihGYWNldFR5cGVhaGVhZExpc3RJdGVtQ29tcG9uZW50KSBvcHRpb25zOiBRdWVyeUxpc3Q8RmFjZXRUeXBlYWhlYWRMaXN0SXRlbUNvbXBvbmVudD47XG5cbiAgICBxdWVyeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcbiAgICB0eXBlYWhlYWRJZDogc3RyaW5nID0gYHV4LWZhY2V0LXR5cGVhaGVhZC0ke3VuaXF1ZUlkKyt9YDtcbiAgICB0eXBlYWhlYWRPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgdHlwZWFoZWFkT3B0aW9uczogRmFjZXRbXSA9IFtdO1xuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIF9jb25maWc6IEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyA9IHsgcGxhY2Vob2xkZXI6ICcnLCBtYXhSZXN1bHRzOiA1MCwgbWluQ2hhcmFjdGVyczogMSB9O1xuICAgIHByaXZhdGUgX2ZvY3VzS2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQ+O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGVhaGVhZEtleVNlcnZpY2U6IFR5cGVhaGVhZEtleVNlcnZpY2UsIGZhY2V0Q29udGFpbmVyOiBGYWNldENvbnRhaW5lckNvbXBvbmVudCwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfYW5ub3VuY2VyOiBMaXZlQW5ub3VuY2VyKSB7XG4gICAgICAgIHN1cGVyKGZhY2V0Q29udGFpbmVyLCBlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc2V0IHVwIHNlYXJjaCBxdWVyeSBzdWJzY3JpcHRpb25cbiAgICAgICAgdGhpcy5xdWVyeSQucGlwZShcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkT3B0aW9ucyA9IFtdO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLmdldEZhY2V0T2JzZXJ2YWJsZSgpLnBpcGUobWFwKGZhY2V0cyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY2V0cy5maWx0ZXIoZmFjZXQgPT4gIWZhY2V0LmRpc2FibGVkICYmICF0aGlzLnNlbGVjdGVkLmZpbmQoc2VsZWN0ZWRGYWNldCA9PiBzZWxlY3RlZEZhY2V0ID09PSBmYWNldCkpXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCB0aGlzLl9jb25maWcubWF4UmVzdWx0cyk7XG4gICAgICAgICAgICB9KSkpXG4gICAgICAgICkuc3Vic2NyaWJlKGZhY2V0cyA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkT3B0aW9ucyA9IGZhY2V0cztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcih0aGlzLm9wdGlvbnMpLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGluZGV4ID0+IHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUZhY2V0KGluZGV4OiBudW1iZXIsIGZhY2V0OiBGYWNldCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZUZhY2V0U2VsZWN0aW9uKGZhY2V0KTtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgIH1cblxuICAgIC8qKiBPbmx5IHNob3cgdHlwZWFoZWFkIGlmIHdlIGhhdmUgZW5vdWdoIGNoYXJhY3RlcnMgKi9cbiAgICB1cGRhdGVUeXBlYWhlYWQocXVlcnk6IHN0cmluZyA9ICcnKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkT3BlbiA9IHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLl9jb25maWcubWluQ2hhcmFjdGVycztcbiAgICB9XG5cbiAgICBnZXRGYWNldE9ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxGYWNldFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0cyBpbnN0YW5jZW9mIE9ic2VydmFibGUgPyB0aGlzLmZhY2V0cyA6IG9mKHRoaXMuZmFjZXRzKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KSB7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGl0ZW0gaXMgbm90IGN1cnJlbnRseSBzZWxlY3RlZFxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZC5maW5kKGZhY2V0ID0+IGZhY2V0ID09PSBldmVudC5vcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZWxlY3QgdGhlIGZhY2V0XG4gICAgICAgIHRoaXMuc2VsZWN0RmFjZXQoZXZlbnQub3B0aW9uKTtcblxuICAgICAgICAvLyBjbGVhciB0aGUgdHlwZWFoZWFkXG4gICAgICAgIHRoaXMucXVlcnkkLm5leHQoJycpO1xuXG4gICAgICAgIC8vIGFubm91bmNlIHRoZSBzZWxlY3RlZCBmYWNldFxuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYCR7KGV2ZW50Lm9wdGlvbiBhcyBGYWNldCkudGl0bGV9IHNlbGVjdGVkLmApO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFR5cGVhaGVhZExpc3RDb25maWcge1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIG1pbkNoYXJhY3RlcnM/OiBudW1iZXI7XG4gICAgbWF4UmVzdWx0cz86IG51bWJlcjtcbiAgICBkZWxheT86IG51bWJlcjtcbn1cblxuQFBpcGUoe1xuICAgIG5hbWU6ICdmYWNldFR5cGVhaGVhZEhpZ2hsaWdodCdcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRUeXBlYWhlYWRIaWdobGlnaHQgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgc2VhcmNoUXVlcnk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoc2VhcmNoUXVlcnksICdpJyk7XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlZ2V4LCBgPGIgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtaGlnaGxpZ2h0ZWRcIj4ke3ZhbHVlLm1hdGNoKHJlZ2V4KX08L2I+YCk7XG4gICAgfVxufSJdfQ==