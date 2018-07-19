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
                template: `<ux-facet-header [header]="header" [(expanded)]="expanded"></ux-facet-header>

<div class="facet-typeahead-list-container" role="listbox" *ngIf="expanded">

    <div class="facet-typeahead-list-selected-container" tabindex="-1" *ngIf="suggestions?.length > 0">

        <ux-facet-typeahead-list-item
            *ngFor="let facet of suggestions; let index = index"
            [facet]="facet"
            [tabbable]="activeIndex === index"
            [selected]="isFacetSelected(facet)"
            (selectedChange)="toggleFacet(index, facet)"
            (keydown)="onKeydown($event)"
            (itemFocus)="onFocus(index)">
        </ux-facet-typeahead-list-item>

    </div>

    <div class="facet-typeahead-list-control">

        <!-- Create Typeahead Control -->
        <input type="text"
            class="form-control"
            [placeholder]="typeaheadConfig?.placeholder"
            [attr.aria-activedescendant]="highlightedElement?.id"
            aria-autocomplete="list"
            aria-multiline="false"
            [attr.aria-controls]="typeaheadId"
            [ngModel]="query$ | async"
            (ngModelChange)="query$.next($event); updateTypeahead($event)"
            (keydown)="typeaheadKeyService.handleKey($event, typeahead)"
            (blur)="typeaheadOpen = false">

        <ux-typeahead #typeahead
            [id]="typeaheadId"
            [(open)]="typeaheadOpen"
            [loading]="loading"
            display="title"
            [options]="typeaheadOptions"
            [optionTemplate]="facetOptionTemplate"
            [selectOnEnter]="true"
            (optionSelected)="select($event)"
            (highlightedElementChange)="highlightedElement = $event">
        </ux-typeahead>

    </div>

</div>

<ng-template #facetOptionTemplate let-option="option" let-api="api">
    <p class="facet-typeahead-list-option" [attr.aria-label]="option.title">
        <span [innerHTML]="option.title | facetTypeaheadHighlight: (query$ | async)"></span>
        <span class="facet-typeahead-list-option-count"
            *ngIf="option.count">
            ({{ option.count }})
        </span>
    </p>
</ng-template>`
            },] },
];
/** @nocollapse */
FacetTypeaheadListComponent.ctorParameters = () => [
    { type: TypeaheadKeyService, },
    { type: FacetContainerComponent, },
    { type: ElementRef, },
    { type: LiveAnnouncer, },
];
FacetTypeaheadListComponent.propDecorators = {
    "facets": [{ type: Input },],
    "header": [{ type: Input },],
    "expanded": [{ type: Input },],
    "suggestions": [{ type: Input },],
    "simplified": [{ type: Input },],
    "typeaheadConfig": [{ type: Input },],
    "options": [{ type: ViewChildren, args: [FacetTypeaheadListItemComponent,] },],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmFjZXRzL2ZhY2V0LXR5cGVhaGVhZC1saXN0L2ZhY2V0LXR5cGVhaGVhZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBRTVHLHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUErRGpCLE1BQU0sa0NBQW1DLFNBQVEsa0JBQWtCOzs7Ozs7O0lBOEIvRCxZQUFtQixtQkFBd0MsRUFBRSxjQUF1QyxFQUFFLFVBQXNCLEVBQVUsVUFBeUI7UUFDM0osS0FBSyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMs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QyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSwwQ0FBMEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkc7OztZQVBKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUseUJBQXlCO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyLCBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgUGlwZSwgUGlwZVRyYW5zZm9ybSwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uLy4uL3R5cGVhaGVhZC9pbmRleCc7XG5pbXBvcnQgeyBGYWNldEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2ZhY2V0LWJhc2UvZmFjZXQtYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9mYWNldC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi4vbW9kZWxzL2ZhY2V0JztcbmltcG9ydCB7IEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1saXN0LWl0ZW0vZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQnO1xuXG5sZXQgdW5pcXVlSWQgPSAxO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LXR5cGVhaGVhZC1saXN0JyxcbiAgICB0ZW1wbGF0ZTogYDx1eC1mYWNldC1oZWFkZXIgW2hlYWRlcl09XCJoZWFkZXJcIiBbKGV4cGFuZGVkKV09XCJleHBhbmRlZFwiPjwvdXgtZmFjZXQtaGVhZGVyPlxuXG48ZGl2IGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3QtY29udGFpbmVyXCIgcm9sZT1cImxpc3Rib3hcIiAqbmdJZj1cImV4cGFuZGVkXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtc2VsZWN0ZWQtY29udGFpbmVyXCIgdGFiaW5kZXg9XCItMVwiICpuZ0lmPVwic3VnZ2VzdGlvbnM/Lmxlbmd0aCA+IDBcIj5cblxuICAgICAgICA8dXgtZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGZhY2V0IG9mIHN1Z2dlc3Rpb25zOyBsZXQgaW5kZXggPSBpbmRleFwiXG4gICAgICAgICAgICBbZmFjZXRdPVwiZmFjZXRcIlxuICAgICAgICAgICAgW3RhYmJhYmxlXT1cImFjdGl2ZUluZGV4ID09PSBpbmRleFwiXG4gICAgICAgICAgICBbc2VsZWN0ZWRdPVwiaXNGYWNldFNlbGVjdGVkKGZhY2V0KVwiXG4gICAgICAgICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwidG9nZ2xlRmFjZXQoaW5kZXgsIGZhY2V0KVwiXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAoaXRlbUZvY3VzKT1cIm9uRm9jdXMoaW5kZXgpXCI+XG4gICAgICAgIDwvdXgtZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbT5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LWNvbnRyb2xcIj5cblxuICAgICAgICA8IS0tIENyZWF0ZSBUeXBlYWhlYWQgQ29udHJvbCAtLT5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJ0eXBlYWhlYWRDb25maWc/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJoaWdobGlnaHRlZEVsZW1lbnQ/LmlkXCJcbiAgICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiXG4gICAgICAgICAgICBhcmlhLW11bHRpbGluZT1cImZhbHNlXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwidHlwZWFoZWFkSWRcIlxuICAgICAgICAgICAgW25nTW9kZWxdPVwicXVlcnkkIHwgYXN5bmNcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwicXVlcnkkLm5leHQoJGV2ZW50KTsgdXBkYXRlVHlwZWFoZWFkKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24pPVwidHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoJGV2ZW50LCB0eXBlYWhlYWQpXCJcbiAgICAgICAgICAgIChibHVyKT1cInR5cGVhaGVhZE9wZW4gPSBmYWxzZVwiPlxuXG4gICAgICAgIDx1eC10eXBlYWhlYWQgI3R5cGVhaGVhZFxuICAgICAgICAgICAgW2lkXT1cInR5cGVhaGVhZElkXCJcbiAgICAgICAgICAgIFsob3BlbildPVwidHlwZWFoZWFkT3BlblwiXG4gICAgICAgICAgICBbbG9hZGluZ109XCJsb2FkaW5nXCJcbiAgICAgICAgICAgIGRpc3BsYXk9XCJ0aXRsZVwiXG4gICAgICAgICAgICBbb3B0aW9uc109XCJ0eXBlYWhlYWRPcHRpb25zXCJcbiAgICAgICAgICAgIFtvcHRpb25UZW1wbGF0ZV09XCJmYWNldE9wdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtzZWxlY3RPbkVudGVyXT1cInRydWVcIlxuICAgICAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cInNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChoaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UpPVwiaGlnaGxpZ2h0ZWRFbGVtZW50ID0gJGV2ZW50XCI+XG4gICAgICAgIDwvdXgtdHlwZWFoZWFkPlxuXG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2ZhY2V0T3B0aW9uVGVtcGxhdGUgbGV0LW9wdGlvbj1cIm9wdGlvblwiIGxldC1hcGk9XCJhcGlcIj5cbiAgICA8cCBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LW9wdGlvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwib3B0aW9uLnRpdGxlXCI+XG4gICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwib3B0aW9uLnRpdGxlIHwgZmFjZXRUeXBlYWhlYWRIaWdobGlnaHQ6IChxdWVyeSQgfCBhc3luYylcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtdHlwZWFoZWFkLWxpc3Qtb3B0aW9uLWNvdW50XCJcbiAgICAgICAgICAgICpuZ0lmPVwib3B0aW9uLmNvdW50XCI+XG4gICAgICAgICAgICAoe3sgb3B0aW9uLmNvdW50IH19KVxuICAgICAgICA8L3NwYW4+XG4gICAgPC9wPlxuPC9uZy10ZW1wbGF0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VHlwZWFoZWFkTGlzdENvbXBvbmVudCBleHRlbmRzIEZhY2V0QmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdIHwgT2JzZXJ2YWJsZTxGYWNldFtdPjtcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc3VnZ2VzdGlvbnM6IEZhY2V0W10gPSBbXTtcbiAgICBASW5wdXQoKSBzaW1wbGlmaWVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHR5cGVhaGVhZENvbmZpZyhjb25maWc6IEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSB7IHBsYWNlaG9sZGVyOiAnJywgbWF4UmVzdWx0czogNTAsIG1pbkNoYXJhY3RlcnM6IDEsIC4uLmNvbmZpZyB9O1xuICAgIH1cblxuICAgIGdldCB0eXBlYWhlYWRDb25maWcoKTogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkcmVuKEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxGYWNldFR5cGVhaGVhZExpc3RJdGVtQ29tcG9uZW50PjtcblxuICAgIHF1ZXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuICAgIHR5cGVhaGVhZElkOiBzdHJpbmcgPSBgdXgtZmFjZXQtdHlwZWFoZWFkLSR7dW5pcXVlSWQrK31gO1xuICAgIHR5cGVhaGVhZE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB0eXBlYWhlYWRPcHRpb25zOiBGYWNldFtdID0gW107XG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHByaXZhdGUgX2NvbmZpZzogRmFjZXRUeXBlYWhlYWRMaXN0Q29uZmlnID0geyBwbGFjZWhvbGRlcjogJycsIG1heFJlc3VsdHM6IDUwLCBtaW5DaGFyYWN0ZXJzOiAxIH07XG4gICAgcHJpdmF0ZSBfZm9jdXNLZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8RmFjZXRUeXBlYWhlYWRMaXN0SXRlbUNvbXBvbmVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSwgZmFjZXRDb250YWluZXI6IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50LCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHtcbiAgICAgICAgc3VwZXIoZmFjZXRDb250YWluZXIsIGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzZXQgdXAgc2VhcmNoIHF1ZXJ5IHN1YnNjcmlwdGlvblxuICAgICAgICB0aGlzLnF1ZXJ5JC5waXBlKFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gW107XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHRoaXMuZ2V0RmFjZXRPYnNlcnZhYmxlKCkucGlwZShtYXAoZmFjZXRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjZXRzLmZpbHRlcihmYWNldCA9PiAhZmFjZXQuZGlzYWJsZWQgJiYgIXRoaXMuc2VsZWN0ZWQuZmluZChzZWxlY3RlZEZhY2V0ID0+IHNlbGVjdGVkRmFjZXQgPT09IGZhY2V0KSlcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuX2NvbmZpZy5tYXhSZXN1bHRzKTtcbiAgICAgICAgICAgIH0pKSlcbiAgICAgICAgKS5zdWJzY3JpYmUoZmFjZXRzID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWRPcHRpb25zID0gZmFjZXRzO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKHRoaXMub3B0aW9ucykud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKTtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoaW5kZXggPT4gdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4KTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlRmFjZXQoaW5kZXg6IG51bWJlciwgZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQpO1xuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqIE9ubHkgc2hvdyB0eXBlYWhlYWQgaWYgd2UgaGF2ZSBlbm91Z2ggY2hhcmFjdGVycyAqL1xuICAgIHVwZGF0ZVR5cGVhaGVhZChxdWVyeTogc3RyaW5nID0gJycpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50eXBlYWhlYWRPcGVuID0gcXVlcnkubGVuZ3RoID49IHRoaXMuX2NvbmZpZy5taW5DaGFyYWN0ZXJzO1xuICAgIH1cblxuICAgIGdldEZhY2V0T2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPEZhY2V0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXRzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IHRoaXMuZmFjZXRzIDogb2YodGhpcy5mYWNldHMpO1xuICAgIH1cblxuICAgIHNlbGVjdChldmVudDogVHlwZWFoZWFkT3B0aW9uRXZlbnQpIHtcblxuICAgICAgICAvLyBjaGVjayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgaXRlbSBpcyBub3QgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmZpbmQoZmFjZXQgPT4gZmFjZXQgPT09IGV2ZW50Lm9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlbGVjdCB0aGUgZmFjZXRcbiAgICAgICAgdGhpcy5zZWxlY3RGYWNldChldmVudC5vcHRpb24pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSB0eXBlYWhlYWRcbiAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG5cbiAgICAgICAgLy8gYW5ub3VuY2UgdGhlIHNlbGVjdGVkIGZhY2V0XG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgJHsoZXZlbnQub3B0aW9uIGFzIEZhY2V0KS50aXRsZX0gc2VsZWN0ZWQuYCk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0VHlwZWFoZWFkTGlzdENvbmZpZyB7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgbWluQ2hhcmFjdGVycz86IG51bWJlcjtcbiAgICBtYXhSZXN1bHRzPzogbnVtYmVyO1xuICAgIGRlbGF5PzogbnVtYmVyO1xufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZhY2V0VHlwZWFoZWFkSGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBGYWNldFR5cGVhaGVhZEhpZ2hsaWdodCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBzZWFyY2hRdWVyeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsIGA8YiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1oaWdobGlnaHRlZFwiPiR7dmFsdWUubWF0Y2gocmVnZXgpfTwvYj5gKTtcbiAgICB9XG59Il19