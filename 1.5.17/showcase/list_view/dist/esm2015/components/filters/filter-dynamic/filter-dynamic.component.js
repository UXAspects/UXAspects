/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, Pipe, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TypeaheadKeyService } from '../../typeahead/index';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { FilterContainerComponent } from '../filter-container.component';
let /** @type {?} */ uniqueId = 1;
export class FilterDynamicComponent extends FilterBaseComponent {
    /**
     * @param {?} typeaheadKeyService
     * @param {?} container
     * @param {?} announcer
     */
    constructor(typeaheadKeyService, container, announcer) {
        super(container, announcer);
        this.typeaheadKeyService = typeaheadKeyService;
        this.defaultOptions = {
            placeholder: '',
            minCharacters: 3,
            maxResults: Infinity
        };
        this.typeaheadId = `ux-filter-dynamic-typeahead-${uniqueId++}`;
        this.query$ = new BehaviorSubject('');
        this.showTypeahead = true;
        this.typeaheadItems = [];
        this.typeaheadOpen = false;
        this._config = Object.assign({}, this.defaultOptions);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this._config = Object.assign({}, this.defaultOptions, options);
    }
    /**
     * @return {?}
     */
    get options() {
        return this._config;
    }
    /**
     * @return {?}
     */
    getItems() {
        const /** @type {?} */ query = this.query$.value.toLowerCase();
        return this.filters.filter(item => item !== this.initial && item.name.toLowerCase().indexOf(query) !== -1)
            .map(item => item.name)
            .slice(0, this._config.maxResults);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    }
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    selectOption(typeaheadOption) {
        this.removeFilter();
        const /** @type {?} */ idx = this.filters.findIndex(filter => filter.name === typeaheadOption.value);
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.query$.next('');
        this.dropdown.hide();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickOff(event) {
        let /** @type {?} */ target = /** @type {?} */ (event.target);
        let /** @type {?} */ hideDropdown = true;
        while (target && target.nodeName !== 'BODY') {
            if (target.classList.contains('ux-dynamic-filter')) {
                hideDropdown = false;
                break;
            }
            else {
                target = target.parentElement;
            }
        }
        if (hideDropdown) {
            this.query$.next('');
            this.dropdown.hide();
        }
    }
    /**
     * @return {?}
     */
    removeFilter() {
        if (this.selected !== this.initial) {
            super.removeFilter(this.selected);
            this.selected = this.initial;
        }
        this.query$.next('');
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    selectFilter(filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    updateTypeahead(query) {
        this.typeaheadOpen = query.length >= this._config.minCharacters;
        this.typeaheadItems = this.getItems();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    select(event) {
        // find the filter with the matching name
        const /** @type {?} */ filter = this.filters.find(_filter => _filter.name === event.option);
        if (filter) {
            this.selectFilter(filter);
        }
    }
}
FilterDynamicComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dynamic',
                template: `<div class="btn-group ux-dynamic-filter"
    dropdown
    [autoClose]="true"
    #dynamicDropdown="bs-dropdown">

    <button
        type="button"
        tabindex="0"
        dropdownToggle
        aria-haspopup="true"
        uxMenuNavigationToggle
        #menuNavigationToggle="uxMenuNavigationToggle"
        [(menuOpen)]="dynamicDropdown.isOpen"
        [attr.aria-expanded]="dynamicDropdown.isOpen"
        [class.active]="selected !== initial"
        class="filter-dropdown btn dropdown-toggle">
        {{ selected?.title }}
        <span class="hpe-icon hpe-down"></span>
    </button>

    <ul *dropdownMenu
        class="dropdown-menu"
        role="menu"
        uxMenuNavigation
        [toggleButton]="menuNavigationToggle">

        <li class="dropdown-list-item"
            *ngIf="showTypeahead"
            role="none">

            <a class="dropdown-item"
                role="menuitem"
                tabindex="-1"
                uxMenuNavigationItem
                [attr.aria-selected]="initial === selected"
                (click)="removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()"
                (keydown.enter)="removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()">

                <i class="hpe-icon" [class.hpe-checkmark]="initial === selected"></i>
                <span class="filter-dropdown-title">{{ initial.name }}</span>
            </a>
        </li>

        <li class="dropdown-list-item"
            *ngIf="selected !== initial && showTypeahead"
            role="none">

            <a class="dropdown-item"
                role="menuitem"
                tabindex="-1"
                uxMenuNavigationItem>
                <i class="hpe-icon hpe-checkmark"></i>
                <span class="filter-dropdown-title">{{ selected.name }}</span>
            </a>
        </li>

        <hr>

        <li *ngIf="showTypeahead" class="typeahead-box" role="none">

                <input type="text"
                    class="form-control"
                    [placeholder]="options?.placeholder || defaultOptions.placeholder"
                    [attr.aria-activedescendant]="highlightedElement?.id"
                    [attr.aria-controls]="typeaheadId"
                    aria-autocomplete="list"
                    aria-multiline="false"
                    [ngModel]="query$ | async"
                    (ngModelChange)="query$.next($event); updateTypeahead($event)"
                    (keydown)="typeaheadKeyService.handleKey($event, typeahead); $event.stopPropagation();"
                    (keydown.enter)="$event.preventDefault()"
                    (blur)="typeaheadOpen = false"
                    (click)="$event.stopPropagation()">

                <ux-typeahead #typeahead
                    [id]="typeaheadId"
                    [(open)]="typeaheadOpen"
                    display="title"
                    [selectOnEnter]="true"
                    [options]="typeaheadItems"
                    [optionTemplate]="filterOptionTemplate"
                    (optionSelected)="select($event); dynamicDropdown.hide(); menuNavigationToggle.focus()"
                    (highlightedElementChange)="highlightedElement = $event">
                </ux-typeahead>
        </li>

        <ng-container *ngIf="!showTypeahead">

            <li class="dropdown-list-item"
                *ngFor="let filter of filters"
                role="none">

                <a class="dropdown-item"
                    role="menuitem"
                    tabindex="-1"
                    uxMenuNavigationItem
                    [attr.aria-selected]="filter === selected"
                    (click)="selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()"
                    (keydown.enter)="selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()">

                    <i class="hpe-icon" [class.hpe-checkmark]="filter === selected"></i>
                    <span class="filter-dropdown-title">{{ filter.name }}</span>
                </a>
            </li>

        </ng-container>

    </ul>
</div>

<ng-template #filterOptionTemplate let-option="option" let-api="api">
    <span [attr.aria-label]="option" [innerHTML]="option | filterTypeaheadHighlight: (query$ | async)"></span>
</ng-template>`,
                host: {
                    '(document:click)': 'clickOff($event)',
                }
            },] },
];
/** @nocollapse */
FilterDynamicComponent.ctorParameters = () => [
    { type: TypeaheadKeyService, },
    { type: FilterContainerComponent, },
    { type: LiveAnnouncer, },
];
FilterDynamicComponent.propDecorators = {
    "filters": [{ type: Input },],
    "initial": [{ type: Input },],
    "options": [{ type: Input },],
    "dropdown": [{ type: ViewChild, args: [BsDropdownDirective,] },],
};
function FilterDynamicComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterDynamicComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterDynamicComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FilterDynamicComponent.propDecorators;
    /** @type {?} */
    FilterDynamicComponent.prototype.filters;
    /** @type {?} */
    FilterDynamicComponent.prototype.initial;
    /** @type {?} */
    FilterDynamicComponent.prototype.dropdown;
    /** @type {?} */
    FilterDynamicComponent.prototype.defaultOptions;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadId;
    /** @type {?} */
    FilterDynamicComponent.prototype.query$;
    /** @type {?} */
    FilterDynamicComponent.prototype.selected;
    /** @type {?} */
    FilterDynamicComponent.prototype.showTypeahead;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadItems;
    /** @type {?} */
    FilterDynamicComponent.prototype.highlightedElement;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadOpen;
    /** @type {?} */
    FilterDynamicComponent.prototype._config;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadKeyService;
}
/**
 * @record
 */
export function FilterDynamicListConfig() { }
function FilterDynamicListConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.placeholder;
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.minCharacters;
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.maxResults;
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.maxIndividualItems;
}
export class FilterTypeaheadHighlight {
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    transform(value, searchQuery) {
        const /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="filter-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}
FilterTypeaheadHighlight.decorators = [
    { type: Pipe, args: [{
                name: 'filterTypeaheadHighlight'
            },] },
];
/** @nocollapse */
FilterTypeaheadHighlight.ctorParameters = () => [];
function FilterTypeaheadHighlight_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterTypeaheadHighlight.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterTypeaheadHighlight.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQWlCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBVSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWpGLHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUF5SGpCLE1BQU0sNkJBQThCLFNBQVEsbUJBQW1COzs7Ozs7SUErQjNELFlBQW1CLG1CQUF3QyxFQUFFLFNBQW1DLEVBQUUsU0FBd0I7UUFDdEgsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQURiLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7OEJBaEJqQjtZQUN0QyxXQUFXLEVBQUUsRUFBRTtZQUNmLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLFVBQVUsRUFBRSxRQUFRO1NBQ3ZCOzJCQUVxQiwrQkFBK0IsUUFBUSxFQUFFLEVBQUU7c0JBQ3hELElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQzs2QkFFZixJQUFJOzhCQUNGLEVBQUU7NkJBRUosS0FBSzt5Q0FFa0IsSUFBSSxD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Ozs7WUE1SFEsbUJBQW1CO1lBRVgsd0JBQXdCO1lBUGhDLGFBQWE7Ozt3QkFvSWpCLEtBQUs7d0JBQ0wsS0FBSzt3QkFFTCxLQUFLO3lCQVFMLFNBQVMsU0FBQyxtQkFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkdsQyxNQUFNOzs7Ozs7SUFDRixTQUFTLENBQUMsS0FBYSxFQUFFLFdBQW1CO1FBQ3hDLHVCQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLDJDQUEyQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwRzs7O1lBUEosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSwwQkFBMEI7YUFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgUGlwZSwgUGlwZVRyYW5zZm9ybSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duRGlyZWN0aXZlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9kcm9wZG93bic7XG5pbXBvcnQgeyBUeXBlYWhlYWRNYXRjaCB9IGZyb20gJ25neC1ib290c3RyYXAvdHlwZWFoZWFkJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFR5cGVhaGVhZEtleVNlcnZpY2UsIFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vLi4vdHlwZWFoZWFkL2luZGV4JztcbmltcG9ydCB7IEZpbHRlckJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyLCBGaWx0ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbmxldCB1bmlxdWVJZCA9IDE7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWR5bmFtaWMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCB1eC1keW5hbWljLWZpbHRlclwiXG4gICAgZHJvcGRvd25cbiAgICBbYXV0b0Nsb3NlXT1cInRydWVcIlxuICAgICNkeW5hbWljRHJvcGRvd249XCJicy1kcm9wZG93blwiPlxuXG4gICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgZHJvcGRvd25Ub2dnbGVcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlXG4gICAgICAgICNtZW51TmF2aWdhdGlvblRvZ2dsZT1cInV4TWVudU5hdmlnYXRpb25Ub2dnbGVcIlxuICAgICAgICBbKG1lbnVPcGVuKV09XCJkeW5hbWljRHJvcGRvd24uaXNPcGVuXCJcbiAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkeW5hbWljRHJvcGRvd24uaXNPcGVuXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RlZCAhPT0gaW5pdGlhbFwiXG4gICAgICAgIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duIGJ0biBkcm9wZG93bi10b2dnbGVcIj5cbiAgICAgICAge3sgc2VsZWN0ZWQ/LnRpdGxlIH19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWRvd25cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG5cbiAgICA8dWwgKmRyb3Bkb3duTWVudVxuICAgICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIlxuICAgICAgICByb2xlPVwibWVudVwiXG4gICAgICAgIHV4TWVudU5hdmlnYXRpb25cbiAgICAgICAgW3RvZ2dsZUJ1dHRvbl09XCJtZW51TmF2aWdhdGlvblRvZ2dsZVwiPlxuXG4gICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLWxpc3QtaXRlbVwiXG4gICAgICAgICAgICAqbmdJZj1cInNob3dUeXBlYWhlYWRcIlxuICAgICAgICAgICAgcm9sZT1cIm5vbmVcIj5cblxuICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCJcbiAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICAgIHV4TWVudU5hdmlnYXRpb25JdGVtXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpbml0aWFsID09PSBzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUZpbHRlcigpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBkeW5hbWljRHJvcGRvd24uaGlkZSgpOyBtZW51TmF2aWdhdGlvblRvZ2dsZS5mb2N1cygpXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJyZW1vdmVGaWx0ZXIoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKTsgZHluYW1pY0Ryb3Bkb3duLmhpZGUoKTsgbWVudU5hdmlnYXRpb25Ub2dnbGUuZm9jdXMoKVwiPlxuXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtY2hlY2ttYXJrXT1cImluaXRpYWwgPT09IHNlbGVjdGVkXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duLXRpdGxlXCI+e3sgaW5pdGlhbC5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLWxpc3QtaXRlbVwiXG4gICAgICAgICAgICAqbmdJZj1cInNlbGVjdGVkICE9PSBpbml0aWFsICYmIHNob3dUeXBlYWhlYWRcIlxuICAgICAgICAgICAgcm9sZT1cIm5vbmVcIj5cblxuICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCJcbiAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICAgIHV4TWVudU5hdmlnYXRpb25JdGVtPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLWNoZWNrbWFya1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbHRlci1kcm9wZG93bi10aXRsZVwiPnt7IHNlbGVjdGVkLm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGhyPlxuXG4gICAgICAgIDxsaSAqbmdJZj1cInNob3dUeXBlYWhlYWRcIiBjbGFzcz1cInR5cGVhaGVhZC1ib3hcIiByb2xlPVwibm9uZVwiPlxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ucGxhY2Vob2xkZXIgfHwgZGVmYXVsdE9wdGlvbnMucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiaGlnaGxpZ2h0ZWRFbGVtZW50Py5pZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwidHlwZWFoZWFkSWRcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLW11bHRpbGluZT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW25nTW9kZWxdPVwicXVlcnkkIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJxdWVyeSQubmV4dCgkZXZlbnQpOyB1cGRhdGVUeXBlYWhlYWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cInR5cGVhaGVhZEtleVNlcnZpY2UuaGFuZGxlS2V5KCRldmVudCwgdHlwZWFoZWFkKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwidHlwZWFoZWFkT3BlbiA9IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuXG4gICAgICAgICAgICAgICAgPHV4LXR5cGVhaGVhZCAjdHlwZWFoZWFkXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCJ0eXBlYWhlYWRJZFwiXG4gICAgICAgICAgICAgICAgICAgIFsob3BlbildPVwidHlwZWFoZWFkT3BlblwiXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk9XCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtzZWxlY3RPbkVudGVyXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJ0eXBlYWhlYWRJdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgIFtvcHRpb25UZW1wbGF0ZV09XCJmaWx0ZXJPcHRpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJzZWxlY3QoJGV2ZW50KTsgZHluYW1pY0Ryb3Bkb3duLmhpZGUoKTsgbWVudU5hdmlnYXRpb25Ub2dnbGUuZm9jdXMoKVwiXG4gICAgICAgICAgICAgICAgICAgIChoaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UpPVwiaGlnaGxpZ2h0ZWRFbGVtZW50ID0gJGV2ZW50XCI+XG4gICAgICAgICAgICAgICAgPC91eC10eXBlYWhlYWQ+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzaG93VHlwZWFoZWFkXCI+XG5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLWxpc3QtaXRlbVwiXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzXCJcbiAgICAgICAgICAgICAgICByb2xlPVwibm9uZVwiPlxuXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgICAgIHV4TWVudU5hdmlnYXRpb25JdGVtXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiZmlsdGVyID09PSBzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKTsgZHluYW1pY0Ryb3Bkb3duLmhpZGUoKTsgbWVudU5hdmlnYXRpb25Ub2dnbGUuZm9jdXMoKVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBkeW5hbWljRHJvcGRvd24uaGlkZSgpOyBtZW51TmF2aWdhdGlvblRvZ2dsZS5mb2N1cygpXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtY2hlY2ttYXJrXT1cImZpbHRlciA9PT0gc2VsZWN0ZWRcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duLXRpdGxlXCI+e3sgZmlsdGVyLm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cblxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvdWw+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmaWx0ZXJPcHRpb25UZW1wbGF0ZSBsZXQtb3B0aW9uPVwib3B0aW9uXCIgbGV0LWFwaT1cImFwaVwiPlxuICAgIDxzcGFuIFthdHRyLmFyaWEtbGFiZWxdPVwib3B0aW9uXCIgW2lubmVySFRNTF09XCJvcHRpb24gfCBmaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHQ6IChxdWVyeSQgfCBhc3luYylcIj48L3NwYW4+XG48L25nLXRlbXBsYXRlPmAsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdjbGlja09mZigkZXZlbnQpJyxcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckR5bmFtaWNDb21wb25lbnQgZXh0ZW5kcyBGaWx0ZXJCYXNlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdO1xuICAgIEBJbnB1dCgpIGluaXRpYWw6IEZpbHRlcjtcblxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHsuLi4gdGhpcy5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICAgIH1cblxuICAgIGdldCBvcHRpb25zKCk6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKEJzRHJvcGRvd25EaXJlY3RpdmUpIGRyb3Bkb3duOiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuXG4gICAgZGVmYXVsdE9wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnID0ge1xuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIG1pbkNoYXJhY3RlcnM6IDMsXG4gICAgICAgIG1heFJlc3VsdHM6IEluZmluaXR5XG4gICAgfTtcblxuICAgIHR5cGVhaGVhZElkOiBzdHJpbmcgPSBgdXgtZmlsdGVyLWR5bmFtaWMtdHlwZWFoZWFkLSR7dW5pcXVlSWQrK31gO1xuICAgIHF1ZXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gICAgc2VsZWN0ZWQ6IEZpbHRlcjtcbiAgICBzaG93VHlwZWFoZWFkOiBib29sZWFuID0gdHJ1ZTtcbiAgICB0eXBlYWhlYWRJdGVtczogc3RyaW5nW10gPSBbXTtcbiAgICBoaWdobGlnaHRlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHR5cGVhaGVhZE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2NvbmZpZzogRmlsdGVyRHluYW1pY0xpc3RDb25maWcgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMgfTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlYWhlYWRLZXlTZXJ2aWNlOiBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBjb250YWluZXI6IEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCwgYW5ub3VuY2VyOiBMaXZlQW5ub3VuY2VyKSB7XG4gICAgICAgIHN1cGVyKGNvbnRhaW5lciwgYW5ub3VuY2VyKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeSQudmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHRoaXMuaW5pdGlhbCAmJiBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpXG4gICAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbS5uYW1lKVxuICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuX2NvbmZpZy5tYXhSZXN1bHRzKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICAgICAgdGhpcy50eXBlYWhlYWRJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5tYXhJbmRpdmlkdWFsSXRlbXMgJiYgdGhpcy5vcHRpb25zLm1heEluZGl2aWR1YWxJdGVtcyArIDEgPj0gdGhpcy5maWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zaG93VHlwZWFoZWFkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RPcHRpb24odHlwZWFoZWFkT3B0aW9uOiBUeXBlYWhlYWRNYXRjaCkge1xuICAgICAgICB0aGlzLnJlbW92ZUZpbHRlcigpO1xuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmZpbHRlcnMuZmluZEluZGV4KGZpbHRlciA9PiBmaWx0ZXIubmFtZSA9PT0gdHlwZWFoZWFkT3B0aW9uLnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZmlsdGVyc1tpZHhdO1xuICAgICAgICB0aGlzLmFkZEZpbHRlcih0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgIH1cblxuICAgIGNsaWNrT2ZmKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgbGV0IGhpZGVEcm9wZG93biA9IHRydWU7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQubm9kZU5hbWUgIT09ICdCT0RZJykge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3V4LWR5bmFtaWMtZmlsdGVyJykpIHtcbiAgICAgICAgICAgICAgICBoaWRlRHJvcGRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGlkZURyb3Bkb3duKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5JC5uZXh0KCcnKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICE9PSB0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICAgIHN1cGVyLnJlbW92ZUZpbHRlcih0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmlsdGVyKGZpbHRlcjogRmlsdGVyKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRmlsdGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmaWx0ZXI7XG4gICAgICAgIHRoaXMuYWRkRmlsdGVyKHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVR5cGVhaGVhZChxdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkT3BlbiA9IHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLl9jb25maWcubWluQ2hhcmFjdGVycztcbiAgICAgICAgdGhpcy50eXBlYWhlYWRJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGZpbHRlciB3aXRoIHRoZSBtYXRjaGluZyBuYW1lXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuZmlsdGVycy5maW5kKF9maWx0ZXIgPT4gX2ZpbHRlci5uYW1lID09PSBldmVudC5vcHRpb24pO1xuXG4gICAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyB7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgbWluQ2hhcmFjdGVycz86IG51bWJlcjtcbiAgICBtYXhSZXN1bHRzPzogbnVtYmVyO1xuICAgIG1heEluZGl2aWR1YWxJdGVtcz86IG51bWJlcjtcbn1cblxuQFBpcGUoe1xuICAgIG5hbWU6ICdmaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHQnXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlclR5cGVhaGVhZEhpZ2hsaWdodCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBzZWFyY2hRdWVyeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHNlYXJjaFF1ZXJ5LCAnaScpO1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShyZWdleCwgYDxiIGNsYXNzPVwiZmlsdGVyLXR5cGVhaGVhZC1oaWdobGlnaHRlZFwiPiR7dmFsdWUubWF0Y2gocmVnZXgpfTwvYj5gKTtcbiAgICB9XG59Il19