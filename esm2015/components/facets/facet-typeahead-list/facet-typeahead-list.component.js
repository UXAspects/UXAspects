/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
let /** @type {?} */ uniqueId = 1;
export class FacetTypeaheadListComponent extends FacetBaseComponent {
    /**
     * @param {?} typeaheadKeyService
     * @param {?} facetContainer
     * @param {?} elementRef
     * @param {?} _announcer
     */
    constructor(typeaheadKeyService, facetContainer, elementRef, _announcer) {
        super(facetContainer, elementRef);
        this.typeaheadKeyService = typeaheadKeyService;
        this._announcer = _announcer;
        this.expanded = true;
        this.suggestions = [];
        this.simplified = true;
        this.query$ = new BehaviorSubject('');
        this.loading = false;
        this.activeIndex = 0;
        this.typeaheadId = `ux-facet-typeahead-${uniqueId++}`;
        this.typeaheadOpen = false;
        this.typeaheadOptions = [];
        this._config = { placeholder: '', maxResults: 50, minCharacters: 1 };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set typeaheadConfig(config) {
        this._config = Object.assign({ placeholder: '', maxResults: 50, minCharacters: 1 }, config);
    }
    /**
     * @return {?}
     */
    get typeaheadConfig() {
        return this._config;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // set up search query subscription
        this.query$.pipe(takeUntil(this._onDestroy), tap(() => {
            this.loading = true;
            this.typeaheadOptions = [];
        }), mergeMap(() => this.getFacetObservable().pipe(map(facets => {
            return facets.filter(facet => !facet.disabled && !this.selected.find(selectedFacet => selectedFacet === facet))
                .slice(0, this._config.maxResults);
        })))).subscribe(facets => {
            this.loading = false;
            this.typeaheadOptions = facets;
        });
        this._focusKeyManager = new FocusKeyManager(this.options).withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._focusKeyManager.onKeydown(event);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onFocus(index) {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    }
    /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    toggleFacet(index, facet) {
        this.toggleFacetSelection(facet);
        this._focusKeyManager.setActiveItem(index);
    }
    /**
     * Only show typeahead if we have enough characters
     * @param {?=} query
     * @return {?}
     */
    updateTypeahead(query = '') {
        this.typeaheadOpen = query.length >= this._config.minCharacters;
    }
    /**
     * @return {?}
     */
    getFacetObservable() {
        return this.facets instanceof Observable ? this.facets : of(this.facets);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    select(event) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(facet => facet === event.option)) {
            return;
        }
        // select the facet
        this.selectFacet(event.option);
        // clear the typeahead
        this.query$.next('');
        // announce the selected facet
        this._announcer.announce(`${((/** @type {?} */ (event.option))).title} selected.`);
    }
}
FacetTypeaheadListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-typeahead-list',
                template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<div class=\"facet-typeahead-list-container\" role=\"listbox\" *ngIf=\"expanded\">\n\n    <div class=\"facet-typeahead-list-selected-container\" tabindex=\"-1\" *ngIf=\"suggestions?.length > 0\">\n\n        <ux-facet-typeahead-list-item\n            *ngFor=\"let facet of suggestions; let index = index\"\n            [facet]=\"facet\"\n            [tabbable]=\"activeIndex === index\"\n            [selected]=\"isFacetSelected(facet)\"\n            (selectedChange)=\"toggleFacet(index, facet)\"\n            (keydown)=\"onKeydown($event)\"\n            (itemFocus)=\"onFocus(index)\">\n        </ux-facet-typeahead-list-item>\n\n    </div>\n\n    <div class=\"facet-typeahead-list-control\">\n\n        <!-- Create Typeahead Control -->\n        <input type=\"text\"\n            class=\"form-control\"\n            [placeholder]=\"typeaheadConfig?.placeholder\"\n            [attr.aria-activedescendant]=\"highlightedElement?.id\"\n            aria-autocomplete=\"list\"\n            aria-multiline=\"false\"\n            [attr.aria-controls]=\"typeaheadId\"\n            [ngModel]=\"query$ | async\"\n            (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n            (keydown)=\"typeaheadKeyService.handleKey($event, typeahead)\"\n            (blur)=\"typeaheadOpen = false\">\n\n        <ux-typeahead #typeahead\n            [id]=\"typeaheadId\"\n            [(open)]=\"typeaheadOpen\"\n            [loading]=\"loading\"\n            display=\"title\"\n            [options]=\"typeaheadOptions\"\n            [optionTemplate]=\"facetOptionTemplate\"\n            [selectOnEnter]=\"true\"\n            (optionSelected)=\"select($event)\"\n            (highlightedElementChange)=\"highlightedElement = $event\">\n        </ux-typeahead>\n\n    </div>\n\n</div>\n\n<ng-template #facetOptionTemplate let-option=\"option\" let-api=\"api\">\n    <p class=\"facet-typeahead-list-option\" [attr.aria-label]=\"option.title\">\n        <span [innerHTML]=\"option.title | facetTypeaheadHighlight: (query$ | async)\"></span>\n        <span class=\"facet-typeahead-list-option-count\"\n            *ngIf=\"option.count\">\n            ({{ option.count }})\n        </span>\n    </p>\n</ng-template>"
            }] }
];
/** @nocollapse */
FacetTypeaheadListComponent.ctorParameters = () => [
    { type: TypeaheadKeyService },
    { type: FacetContainerComponent },
    { type: ElementRef },
    { type: LiveAnnouncer }
];
FacetTypeaheadListComponent.propDecorators = {
    facets: [{ type: Input }],
    header: [{ type: Input }],
    expanded: [{ type: Input }],
    suggestions: [{ type: Input }],
    simplified: [{ type: Input }],
    typeaheadConfig: [{ type: Input }],
    options: [{ type: ViewChildren, args: [FacetTypeaheadListItemComponent,] }]
};
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
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmFjZXRzL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBRTVHLHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFNakIsTUFBTSxrQ0FBbUMsU0FBUSxrQkFBa0I7Ozs7Ozs7SUE4Qi9ELFlBQW1CLG1CQUF3QyxFQUFFLGNBQXVDLEVBQUUsVUFBc0IsRUFBVSxVQUF5QjtRQUMzSixLQUFLLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxD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QUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSwwQ0FBMEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkc7OztZQVBKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUseUJBQXlCO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyLCBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgUGlwZSwgUGlwZVRyYW5zZm9ybSwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uLy4uL3R5cGVhaGVhZC9pbmRleCc7XG5pbXBvcnQgeyBGYWNldEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2ZhY2V0LWJhc2UvZmFjZXQtYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9mYWNldC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi4vbW9kZWxzL2ZhY2V0JztcbmltcG9ydCB7IEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1saXN0LWl0ZW0vZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQnO1xuXG5sZXQgdW5pcXVlSWQgPSAxO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LXR5cGVhaGVhZC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VHlwZWFoZWFkTGlzdENvbXBvbmVudCBleHRlbmRzIEZhY2V0QmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdIHwgT2JzZXJ2YWJsZTxGYWNldFtdPjtcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc3VnZ2VzdGlvbnM6IEZhY2V0W10gPSBbXTtcbiAgICBASW5wdXQoKSBzaW1wbGlmaWVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHR5cGVhaGVhZENvbmZpZyhjb25maWc6IEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSB7IHBsYWNlaG9sZGVyOiAnJywgbWF4UmVzdWx0czogNTAsIG1pbkNoYXJhY3RlcnM6IDEsIC4uLmNvbmZpZyB9O1xuICAgIH1cblxuICAgIGdldCB0eXBlYWhlYWRDb25maWcoKTogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkcmVuKEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxGYWNldFR5cGVhaGVhZExpc3RJdGVtQ29tcG9uZW50PjtcblxuICAgIHF1ZXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuICAgIHR5cGVhaGVhZElkOiBzdHJpbmcgPSBgdXgtZmFjZXQtdHlwZWFoZWFkLSR7dW5pcXVlSWQrK31gO1xuICAgIHR5cGVhaGVhZE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB0eXBlYWhlYWRPcHRpb25zOiBGYWNldFtdID0gW107XG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHByaXZhdGUgX2NvbmZpZzogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnID0geyBwbGFjZWhvbGRlcjogJycsIG1heFJlc3VsdHM6IDUwLCBtaW5DaGFyYWN0ZXJzOiAxIH07XG4gICAgcHJpdmF0ZSBfZm9jdXNLZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8RmFjZXRUeXBlYWhlYWRMaXN0SXRlbUNvbXBvbmVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSwgZmFjZXRDb250YWluZXI6IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50LCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHtcbiAgICAgICAgc3VwZXIoZmFjZXRDb250YWluZXIsIGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzZXQgdXAgc2VhcmNoIHF1ZXJ5IHN1YnNjcmlwdGlvblxuICAgICAgICB0aGlzLnF1ZXJ5JC5waXBlKFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gW107XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHRoaXMuZ2V0RmFjZXRPYnNlcnZhYmxlKCkucGlwZShtYXAoZmFjZXRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjZXRzLmZpbHRlcihmYWNldCA9PiAhZmFjZXQuZGlzYWJsZWQgJiYgIXRoaXMuc2VsZWN0ZWQuZmluZChzZWxlY3RlZEZhY2V0ID0+IHNlbGVjdGVkRmFjZXQgPT09IGZhY2V0KSlcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuX2NvbmZpZy5tYXhSZXN1bHRzKTtcbiAgICAgICAgICAgIH0pKSlcbiAgICAgICAgKS5zdWJzY3JpYmUoZmFjZXRzID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gZmFjZXRzO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKHRoaXMub3B0aW9ucykud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKTtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoaW5kZXggPT4gdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4KTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlRmFjZXQoaW5kZXg6IG51bWJlciwgZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQpO1xuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqIE9ubHkgc2hvdyB0eXBlYWhlYWQgaWYgd2UgaGF2ZSBlbm91Z2ggY2hhcmFjdGVycyAqL1xuICAgIHVwZGF0ZVR5cGVhaGVhZChxdWVyeTogc3RyaW5nID0gJycpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50eXBlYWhlYWRPcGVuID0gcXVlcnkubGVuZ3RoID49IHRoaXMuX2NvbmZpZy5taW5DaGFyYWN0ZXJzO1xuICAgIH1cblxuICAgIGdldEZhY2V0T2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPEZhY2V0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXRzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IHRoaXMuZmFjZXRzIDogb2YodGhpcy5mYWNldHMpO1xuICAgIH1cblxuICAgIHNlbGVjdChldmVudDogVHlwZWFoZWFkT3B0aW9uRXZlbnQpIHtcblxuICAgICAgICAvLyBjaGVjayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgaXRlbSBpcyBub3QgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmZpbmQoZmFjZXQgPT4gZmFjZXQgPT09IGV2ZW50Lm9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlbGVjdCB0aGUgZmFjZXRcbiAgICAgICAgdGhpcy5zZWxlY3RGYWNldChldmVudC5vcHRpb24pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSB0eXBlYWhlYWRcbiAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG5cbiAgICAgICAgLy8gYW5ub3VuY2UgdGhlIHNlbGVjdGVkIGZhY2V0XG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgJHsoZXZlbnQub3B0aW9uIGFzIEZhY2V0KS50aXRsZX0gc2VsZWN0ZWQuYCk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyB7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgbWluQ2hhcmFjdGVycz86IG51bWJlcjtcbiAgICBtYXhSZXN1bHRzPzogbnVtYmVyO1xuICAgIGRlbGF5PzogbnVtYmVyO1xufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBGYWNldFR5cGVhaGVhZEhpZ2hsaWdodCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBzZWFyY2hRdWVyeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsIGA8YiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1oaWdobGlnaHRlZFwiPiR7dmFsdWUubWF0Y2gocmVnZXgpfTwvYj5gKTtcbiAgICB9XG59Il19