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
                template: "<div class=\"btn-group ux-dynamic-filter\"\n    dropdown\n    [autoClose]=\"true\"\n    #dynamicDropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        aria-haspopup=\"true\"\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dynamicDropdown.isOpen\"\n        [attr.aria-expanded]=\"dynamicDropdown.isOpen\"\n        [class.active]=\"selected !== initial\"\n        class=\"filter-dropdown btn dropdown-toggle\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"initial === selected\"\n                (click)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"selected !== initial && showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem>\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\" role=\"none\">\n\n                <input type=\"text\"\n                    class=\"form-control\"\n                    [placeholder]=\"options?.placeholder || defaultOptions.placeholder\"\n                    [attr.aria-activedescendant]=\"highlightedElement?.id\"\n                    [attr.aria-controls]=\"typeaheadId\"\n                    aria-autocomplete=\"list\"\n                    aria-multiline=\"false\"\n                    [ngModel]=\"query$ | async\"\n                    (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n                    (keydown)=\"typeaheadKeyService.handleKey($event, typeahead); $event.stopPropagation();\"\n                    (keydown.enter)=\"$event.preventDefault()\"\n                    (blur)=\"typeaheadOpen = false\"\n                    (click)=\"$event.stopPropagation()\">\n\n                <ux-typeahead #typeahead\n                    [id]=\"typeaheadId\"\n                    [(open)]=\"typeaheadOpen\"\n                    display=\"title\"\n                    [selectOnEnter]=\"true\"\n                    [options]=\"typeaheadItems\"\n                    [optionTemplate]=\"filterOptionTemplate\"\n                    (optionSelected)=\"select($event); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (highlightedElementChange)=\"highlightedElement = $event\">\n                </ux-typeahead>\n        </li>\n\n        <ng-container *ngIf=\"!showTypeahead\">\n\n            <li class=\"dropdown-list-item\"\n                *ngFor=\"let filter of filters\"\n                role=\"none\">\n\n                <a class=\"dropdown-item\"\n                    role=\"menuitem\"\n                    tabindex=\"-1\"\n                    uxMenuNavigationItem\n                    [attr.aria-selected]=\"filter === selected\"\n                    (click)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (keydown.enter)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n\n        </ng-container>\n\n    </ul>\n</div>\n\n<ng-template #filterOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span [attr.aria-label]=\"option\" [innerHTML]=\"option | filterTypeaheadHighlight: (query$ | async)\"></span>\n</ng-template>",
                host: {
                    '(document:click)': 'clickOff($event)',
                }
            }] }
];
/** @nocollapse */
FilterDynamicComponent.ctorParameters = () => [
    { type: TypeaheadKeyService },
    { type: FilterContainerComponent },
    { type: LiveAnnouncer }
];
FilterDynamicComponent.propDecorators = {
    filters: [{ type: Input }],
    initial: [{ type: Input }],
    options: [{ type: Input }],
    dropdown: [{ type: ViewChild, args: [BsDropdownDirective,] }]
};
function FilterDynamicComponent_tsickle_Closure_declarations() {
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
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQWlCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBVSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWpGLHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFTakIsTUFBTSw2QkFBOEIsU0FBUSxtQkFBbUI7Ozs7OztJQStCM0QsWUFBbUIsbUJBQXdDLEVBQUUsU0FBbUMsRUFBRSxTQUF3QjtRQUN0SCxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRGIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjs4QkFoQmpCO1lBQ3RDLFdBQVcsRUFBRSxFQUFFO1lBQ2YsYUFBYSxFQUFFLENBQUM7WUFDaEIsVUFBVSxFQUFFLFFBQVE7U0FDdkI7MkJBRXFCLCtCQUErQixRQUFRLEVBQUUsRUFBRTtzQkFDeEQsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDOzZCQUVmLElBQUk7OEJBQ0YsRUFBRTs2QkFFSixLQUFLO3lDQUVrQixJQUFJLENB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S0FBSzt1QkFRTCxTQUFTLFNBQUMsbUJBQW1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZHbEMsTUFBTTs7Ozs7O0lBQ0YsU0FBUyxDQUFDLEtBQWEsRUFBRSxXQUFtQjtRQUN4Qyx1QkFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSwyQ0FBMkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEc7OztZQVBKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsMEJBQTBCO2FBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFBpcGUsIFBpcGVUcmFuc2Zvcm0sIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnNEcm9wZG93bkRpcmVjdGl2ZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgVHlwZWFoZWFkTWF0Y2ggfSBmcm9tICduZ3gtYm9vdHN0cmFwL3R5cGVhaGVhZCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uLy4uL3R5cGVhaGVhZC9pbmRleCc7XG5pbXBvcnQgeyBGaWx0ZXJCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJhc2UvZmlsdGVyLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlciwgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5sZXQgdW5pcXVlSWQgPSAxO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1keW5hbWljJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xpY2tPZmYoJGV2ZW50KScsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEeW5hbWljQ29tcG9uZW50IGV4dGVuZHMgRmlsdGVyQmFzZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXTtcbiAgICBASW5wdXQoKSBpbml0aWFsOiBGaWx0ZXI7XG5cbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSB7Li4uIHRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICB9XG5cbiAgICBnZXQgb3B0aW9ucygpOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChCc0Ryb3Bkb3duRGlyZWN0aXZlKSBkcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZTtcblxuICAgIGRlZmF1bHRPcHRpb25zOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyA9IHtcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICBtaW5DaGFyYWN0ZXJzOiAzLFxuICAgICAgICBtYXhSZXN1bHRzOiBJbmZpbml0eVxuICAgIH07XG5cbiAgICB0eXBlYWhlYWRJZDogc3RyaW5nID0gYHV4LWZpbHRlci1keW5hbWljLXR5cGVhaGVhZC0ke3VuaXF1ZUlkKyt9YDtcbiAgICBxdWVyeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICAgIHNlbGVjdGVkOiBGaWx0ZXI7XG4gICAgc2hvd1R5cGVhaGVhZDogYm9vbGVhbiA9IHRydWU7XG4gICAgdHlwZWFoZWFkSXRlbXM6IHN0cmluZ1tdID0gW107XG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICB0eXBlYWhlYWRPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9jb25maWc6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSwgY29udGFpbmVyOiBGaWx0ZXJDb250YWluZXJDb21wb25lbnQsIGFubm91bmNlcjogTGl2ZUFubm91bmNlcikge1xuICAgICAgICBzdXBlcihjb250YWluZXIsIGFubm91bmNlcik7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnkkLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0aGlzLmluaXRpYWwgJiYgaXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeSkgIT09IC0xKVxuICAgICAgICAgICAgLm1hcChpdGVtID0+IGl0ZW0ubmFtZSlcbiAgICAgICAgICAgIC5zbGljZSgwLCB0aGlzLl9jb25maWcubWF4UmVzdWx0cyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubWF4SW5kaXZpZHVhbEl0ZW1zICYmIHRoaXMub3B0aW9ucy5tYXhJbmRpdmlkdWFsSXRlbXMgKyAxID49IHRoaXMuZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1R5cGVhaGVhZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0T3B0aW9uKHR5cGVhaGVhZE9wdGlvbjogVHlwZWFoZWFkTWF0Y2gpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5maWx0ZXJzLmZpbmRJbmRleChmaWx0ZXIgPT4gZmlsdGVyLm5hbWUgPT09IHR5cGVhaGVhZE9wdGlvbi52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmZpbHRlcnNbaWR4XTtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIHRoaXMucXVlcnkkLm5leHQoJycpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICB9XG5cbiAgICBjbGlja09mZihldmVudDogTW91c2VFdmVudCkge1xuXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGxldCBoaWRlRHJvcGRvd24gPSB0cnVlO1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGVOYW1lICE9PSAnQk9EWScpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1eC1keW5hbWljLWZpbHRlcicpKSB7XG4gICAgICAgICAgICAgICAgaGlkZURyb3Bkb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhpZGVEcm9wZG93bikge1xuICAgICAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAhPT0gdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgICBzdXBlci5yZW1vdmVGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkkLm5leHQoJycpO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpbHRlcikge1xuICAgICAgICB0aGlzLnJlbW92ZUZpbHRlcigpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmFkZEZpbHRlcih0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUeXBlYWhlYWQocXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnR5cGVhaGVhZE9wZW4gPSBxdWVyeS5sZW5ndGggPj0gdGhpcy5fY29uZmlnLm1pbkNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGV2ZW50OiBUeXBlYWhlYWRPcHRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBmaWx0ZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZVxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmZpbHRlcnMuZmluZChfZmlsdGVyID0+IF9maWx0ZXIubmFtZSA9PT0gZXZlbnQub3B0aW9uKTtcblxuICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyRHluYW1pY0xpc3RDb25maWcge1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIG1pbkNoYXJhY3RlcnM/OiBudW1iZXI7XG4gICAgbWF4UmVzdWx0cz86IG51bWJlcjtcbiAgICBtYXhJbmRpdmlkdWFsSXRlbXM/OiBudW1iZXI7XG59XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZmlsdGVyVHlwZWFoZWFkSGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHQgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgc2VhcmNoUXVlcnk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsIGA8YiBjbGFzcz1cImZpbHRlci10eXBlYWhlYWQtaGlnaGxpZ2h0ZWRcIj4ke3ZhbHVlLm1hdGNoKHJlZ2V4KX08L2I+YCk7XG4gICAgfVxufSJdfQ==