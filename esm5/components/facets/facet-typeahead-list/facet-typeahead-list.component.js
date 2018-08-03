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
var FacetTypeaheadListComponent = /** @class */ (function (_super) {
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
        }), mergeMap(function () { return _this.getFacetObservable().pipe(map(function (facets) {
            return facets.filter(function (facet) { return !facet.disabled && !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                .slice(0, _this._config.maxResults);
        })); })).subscribe(function (facets) {
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
                }] }
    ];
    /** @nocollapse */
    FacetTypeaheadListComponent.ctorParameters = function () { return [
        { type: TypeaheadKeyService },
        { type: FacetContainerComponent },
        { type: ElementRef },
        { type: LiveAnnouncer }
    ]; };
    FacetTypeaheadListComponent.propDecorators = {
        facets: [{ type: Input }],
        header: [{ type: Input }],
        expanded: [{ type: Input }],
        suggestions: [{ type: Input }],
        simplified: [{ type: Input }],
        typeaheadConfig: [{ type: Input }],
        options: [{ type: ViewChildren, args: [FacetTypeaheadListItemComponent,] }]
    };
    return FacetTypeaheadListComponent;
}(FacetBaseComponent));
export { FacetTypeaheadListComponent };
function FacetTypeaheadListComponent_tsickle_Closure_declarations() {
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
var FacetTypeaheadHighlight = /** @class */ (function () {
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
                },] }
    ];
    return FacetTypeaheadHighlight;
}());
export { FacetTypeaheadHighlight };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmFjZXRzL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBd0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUU1RyxxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDOztJQU1nQyx1REFBa0I7SUE4Qi9ELHFDQUFtQixtQkFBd0MsRUFBRSxjQUF1QyxFQUFFLFVBQXNCLEVBQVUsVUFBeUI7UUFBL0osWUFDSSxrQkFBTSxjQUFjLEVBQUUsVUFBVSxDQUFDLFNBQ3BDO1FBRmtCLHlCQUFtQixH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K0JBQStCOztzQ0FuQ2pEO0VBa0JpRCxrQkFBa0I7U0FBdEQsMkJBQTJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZHcEMsMkNBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsV0FBbUI7UUFDeEMscUJBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsOENBQTBDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQU0sQ0FBQyxDQUFDO0tBQ25HOztnQkFQSixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLHlCQUF5QjtpQkFDbEM7O2tDQTdIRDs7U0E4SGEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyLCBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgUGlwZSwgUGlwZVRyYW5zZm9ybSwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uLy4uL3R5cGVhaGVhZC9pbmRleCc7XG5pbXBvcnQgeyBGYWNldEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2ZhY2V0LWJhc2UvZmFjZXQtYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9mYWNldC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi4vbW9kZWxzL2ZhY2V0JztcbmltcG9ydCB7IEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1saXN0LWl0ZW0vZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQnO1xuXG5sZXQgdW5pcXVlSWQgPSAxO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LXR5cGVhaGVhZC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VHlwZWFoZWFkTGlzdENvbXBvbmVudCBleHRlbmRzIEZhY2V0QmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdIHwgT2JzZXJ2YWJsZTxGYWNldFtdPjtcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc3VnZ2VzdGlvbnM6IEZhY2V0W10gPSBbXTtcbiAgICBASW5wdXQoKSBzaW1wbGlmaWVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHR5cGVhaGVhZENvbmZpZyhjb25maWc6IEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSB7IHBsYWNlaG9sZGVyOiAnJywgbWF4UmVzdWx0czogNTAsIG1pbkNoYXJhY3RlcnM6IDEsIC4uLmNvbmZpZyB9O1xuICAgIH1cblxuICAgIGdldCB0eXBlYWhlYWRDb25maWcoKTogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkcmVuKEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxGYWNldFR5cGVhaGVhZExpc3RJdGVtQ29tcG9uZW50PjtcblxuICAgIHF1ZXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuICAgIHR5cGVhaGVhZElkOiBzdHJpbmcgPSBgdXgtZmFjZXQtdHlwZWFoZWFkLSR7dW5pcXVlSWQrK31gO1xuICAgIHR5cGVhaGVhZE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB0eXBlYWhlYWRPcHRpb25zOiBGYWNldFtdID0gW107XG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHByaXZhdGUgX2NvbmZpZzogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnID0geyBwbGFjZWhvbGRlcjogJycsIG1heFJlc3VsdHM6IDUwLCBtaW5DaGFyYWN0ZXJzOiAxIH07XG4gICAgcHJpdmF0ZSBfZm9jdXNLZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8RmFjZXRUeXBlYWhlYWRMaXN0SXRlbUNvbXBvbmVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSwgZmFjZXRDb250YWluZXI6IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50LCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHtcbiAgICAgICAgc3VwZXIoZmFjZXRDb250YWluZXIsIGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzZXQgdXAgc2VhcmNoIHF1ZXJ5IHN1YnNjcmlwdGlvblxuICAgICAgICB0aGlzLnF1ZXJ5JC5waXBlKFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gW107XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHRoaXMuZ2V0RmFjZXRPYnNlcnZhYmxlKCkucGlwZShtYXAoZmFjZXRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjZXRzLmZpbHRlcihmYWNldCA9PiAhZmFjZXQuZGlzYWJsZWQgJiYgIXRoaXMuc2VsZWN0ZWQuZmluZChzZWxlY3RlZEZhY2V0ID0+IHNlbGVjdGVkRmFjZXQgPT09IGZhY2V0KSlcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuX2NvbmZpZy5tYXhSZXN1bHRzKTtcbiAgICAgICAgICAgIH0pKSlcbiAgICAgICAgKS5zdWJzY3JpYmUoZmFjZXRzID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gZmFjZXRzO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKHRoaXMub3B0aW9ucykud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKTtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoaW5kZXggPT4gdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4KTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlRmFjZXQoaW5kZXg6IG51bWJlciwgZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQpO1xuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqIE9ubHkgc2hvdyB0eXBlYWhlYWQgaWYgd2UgaGF2ZSBlbm91Z2ggY2hhcmFjdGVycyAqL1xuICAgIHVwZGF0ZVR5cGVhaGVhZChxdWVyeTogc3RyaW5nID0gJycpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50eXBlYWhlYWRPcGVuID0gcXVlcnkubGVuZ3RoID49IHRoaXMuX2NvbmZpZy5taW5DaGFyYWN0ZXJzO1xuICAgIH1cblxuICAgIGdldEZhY2V0T2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPEZhY2V0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXRzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IHRoaXMuZmFjZXRzIDogb2YodGhpcy5mYWNldHMpO1xuICAgIH1cblxuICAgIHNlbGVjdChldmVudDogVHlwZWFoZWFkT3B0aW9uRXZlbnQpIHtcblxuICAgICAgICAvLyBjaGVjayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgaXRlbSBpcyBub3QgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmZpbmQoZmFjZXQgPT4gZmFjZXQgPT09IGV2ZW50Lm9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlbGVjdCB0aGUgZmFjZXRcbiAgICAgICAgdGhpcy5zZWxlY3RGYWNldChldmVudC5vcHRpb24pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSB0eXBlYWhlYWRcbiAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG5cbiAgICAgICAgLy8gYW5ub3VuY2UgdGhlIHNlbGVjdGVkIGZhY2V0XG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgJHsoZXZlbnQub3B0aW9uIGFzIEZhY2V0KS50aXRsZX0gc2VsZWN0ZWQuYCk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyB7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgbWluQ2hhcmFjdGVycz86IG51bWJlcjtcbiAgICBtYXhSZXN1bHRzPzogbnVtYmVyO1xuICAgIGRlbGF5PzogbnVtYmVyO1xufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBGYWNldFR5cGVhaGVhZEhpZ2hsaWdodCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBzZWFyY2hRdWVyeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsIGA8YiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1oaWdobGlnaHRlZFwiPiR7dmFsdWUubWF0Y2gocmVnZXgpfTwvYj5gKTtcbiAgICB9XG59Il19