/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadService } from './typeahead.service';
let /** @type {?} */ uniqueId = 0;
export class TypeaheadComponent {
    /**
     * @param {?} typeaheadElement
     * @param {?} _changeDetector
     * @param {?} _service
     */
    constructor(typeaheadElement, _changeDetector, _service) {
        this.typeaheadElement = typeaheadElement;
        this._changeDetector = _changeDetector;
        this._service = _service;
        this.id = `ux-typeahead-${++uniqueId}`;
        this.openChange = new EventEmitter();
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiselectable = false;
        this.openOnFilterChange = true;
        this.pageSize = 20;
        this.selectFirst = true;
        this.selectOnEnter = false;
        this.loading = false;
        this.optionSelected = new EventEmitter();
        this.highlightedChange = new EventEmitter();
        this.highlightedElementChange = new EventEmitter();
        this.visibleOptions$ = new BehaviorSubject([]);
        this.clicking = false;
        this.highlighted$ = new BehaviorSubject(null);
        this.highlightedKey = null;
        this._onDestroy = new Subject();
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = (pageNum, pageSize, filter) => {
            if (typeof this.options === 'function') {
                // Invoke the callback which may return an array or a promise.
                const /** @type {?} */ arrayOrPromise = this.options(pageNum, pageSize, filter);
                // Map the results to an array of TypeaheadVisibleOption.
                return Promise.resolve(arrayOrPromise).then(newOptions => {
                    if (!Array.isArray(newOptions)) {
                        return newOptions;
                    }
                    return newOptions.map((option) => {
                        return {
                            value: option,
                            key: this.getKey(option)
                        };
                    });
                });
            }
            return null;
        };
        this._service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((next) => {
            this.openChange.emit(next);
            if (next) {
                this.initOptions();
            }
        });
        this.highlighted$.pipe(takeUntil(this._onDestroy)).subscribe((next) => {
            this.highlightedKey = next ? next.key : null;
            this.highlightedChange.emit(next ? next.value : null);
        });
        combineLatest(this._service.open$, this._service.highlightedElement$, this.visibleOptions$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(([open, highlightedElement, visibleOptions]) => {
            this.highlightedElementChange.emit(open && visibleOptions.length > 0 ? highlightedElement : null);
        });
    }
    /**
     * @return {?}
     */
    get open() {
        return this._service.open$.getValue();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        this._service.open$.next(value);
    }
    /**
     * @return {?}
     */
    get highlighted() {
        const /** @type {?} */ value = this.highlighted$.getValue();
        return value ? value.value : null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Open the dropdown if the filter value updates
        if (changes["filter"]) {
            if (this.openOnFilterChange && changes["filter"].currentValue && changes["filter"].currentValue.length > 0) {
                this.open = true;
            }
        }
        // Re-filter visibleOptions
        this.updateOptions();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    mousedownHandler() {
        this.clicking = true;
    }
    /**
     * @return {?}
     */
    mouseupHandler() {
        this.clicking = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    optionMousedownHandler(event) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    optionClickHandler(event, option) {
        this.select(option);
    }
    /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    getKey(option) {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[/** @type {?} */ (this.key)];
        }
        return this.getDisplay(option);
    }
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    getDisplay(option) {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    }
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    getDisplayHtml(option) {
        const /** @type {?} */ displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        let /** @type {?} */ displayHtml = displayText;
        if (this.filter) {
            const /** @type {?} */ length = this.filter.length;
            const /** @type {?} */ matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var /** @type {?} */ highlight = `<span class="ux-filter-match">${displayText.substr(matchIndex, length)}</span>`;
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
            }
        }
        return displayHtml;
    }
    /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    isInfiniteScroll() {
        return typeof this.options === 'function';
    }
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    select(option) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option.value));
            this.highlighted$.next(null);
            this.open = false;
        }
    }
    /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    isDisabled(option) {
        if (this.disabledOptions) {
            const /** @type {?} */ result = this.disabledOptions.find((selectedOption) => {
                return this.getKey(selectedOption) === option.key;
            });
            return result !== undefined;
        }
        return false;
    }
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    highlight(option) {
        if (!this.isDisabled(option)) {
            this.highlighted$.next(option);
            this._changeDetector.detectChanges();
        }
    }
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    moveHighlight(d) {
        const /** @type {?} */ visibleOptions = this.visibleOptions$.getValue();
        const /** @type {?} */ highlightIndex = this.indexOfVisibleOption(this.highlighted);
        let /** @type {?} */ newIndex = highlightIndex;
        let /** @type {?} */ disabled = true;
        let /** @type {?} */ inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < visibleOptions.length);
            disabled = inBounds && this.isDisabled(visibleOptions[newIndex]);
        } while (inBounds && disabled);
        if (!disabled && inBounds) {
            this.highlight(visibleOptions[newIndex]);
        }
        return this.highlighted;
    }
    /**
     * @return {?}
     */
    selectHighlighted() {
        if (this.highlighted) {
            this.select({ value: this.highlighted, key: this.getKey(this.highlighted) });
        }
    }
    /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
     */
    initOptions() {
        // Clear previous highlight
        this.highlighted$.next(null);
        if (this.selectFirst) {
            // This will highlight the first non-disabled option.
            this.moveHighlight(1);
        }
    }
    /**
     * Update the visibleOptions array with the current filter.
     * @return {?}
     */
    updateOptions() {
        if (typeof this.options === 'object') {
            const /** @type {?} */ normalisedInput = (this.filter || '').toLowerCase();
            const /** @type {?} */ visibleOptions = this.options
                .filter((option) => {
                return this.getDisplay(option).toLowerCase().indexOf(normalisedInput) >= 0;
            })
                .map((value) => {
                return {
                    value: value,
                    key: this.getKey(value)
                };
            });
            this.visibleOptions$.next(visibleOptions);
        }
        this.initOptions();
        this._changeDetector.detectChanges();
    }
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    indexOfVisibleOption(option) {
        if (option) {
            const /** @type {?} */ optionKey = this.getKey(option);
            return this.visibleOptions$.getValue().findIndex((el) => {
                return el.key === optionKey;
            });
        }
        return -1;
    }
}
TypeaheadComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-typeahead',
                template: "<div class=\"ux-typeahead-options\"\n    [uxInfiniteScroll]=\"loadOptionsCallback\"\n    [collection]=\"visibleOptions$ | async\"\n    (collectionChange)=\"visibleOptions$.next($event)\"\n    [enabled]=\"isInfiniteScroll()\"\n    [filter]=\"filter\"\n    [loadOnScroll]=\"true\"\n    [pageSize]=\"pageSize\"\n    [scrollElement]=\"typeaheadElement\"\n    (loading)=\"loading = true\"\n    (loaded)=\"loading = false\">\n\n    <ol *ngIf=\"(visibleOptions$ | async).length > 0\">\n        <li *ngFor=\"let option of (visibleOptions$ | async); let i = index\"\n            [attr.id]=\"id + '-option-' + i\"\n            [class.disabled]=\"isDisabled(option)\"\n            [class.highlighted]=\"highlightedKey === option.key\"\n            [attr.aria-selected]=\"multiselectable ? isDisabled(option) : null\"\n            [uxTypeaheadHighlight]=\"highlightedKey === option.key\"\n            [uxScrollIntoViewIf]=\"highlightedKey === option.key\"\n            [scrollParent]=\"typeaheadElement.nativeElement\"\n            (mousedown)=\"optionMousedownHandler($event)\"\n            (click)=\"optionClickHandler($event, option)\"\n            (mouseover)=\"highlight(option)\">\n\n            <ng-container [ngTemplateOutlet]=\"optionTemplate || defaultOptionTemplate\"\n                [ngTemplateOutletContext]=\"{option: option.value, api: optionApi}\">\n            </ng-container>\n\n        </li>\n    </ol>\n\n    <div *uxInfiniteScrollLoading>\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate || defaultLoadingTemplate\"></ng-container>\n    </div>\n\n    <div *ngIf=\"isInfiniteScroll() === false && (visibleOptions$ | async).length === 0 && loading\">\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate || defaultLoadingTemplate\"></ng-container>\n    </div>\n\n</div>\n<div *ngIf=\"(visibleOptions$ | async).length === 0 && !loading\">\n    <ng-container [ngTemplateOutlet]=\"noOptionsTemplate || defaultNoOptionsTemplate\">\n    </ng-container>\n</div>\n\n<ng-template #defaultLoadingTemplate>\n    <div class=\"ux-typeahead-loading\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n        <div>Loading...</div>\n    </div>\n</ng-template>\n\n<ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n</ng-template>\n\n<ng-template #defaultNoOptionsTemplate>\n    <span class=\"ux-typeahead-no-options\">No results</span>\n</ng-template>",
                providers: [TypeaheadService],
                host: {
                    'role': 'listbox',
                    '[class.open]': 'open',
                    '[class.drop-up]': 'dropDirection === "up"',
                    '[style.maxHeight]': 'maxHeight'
                }
            }] }
];
/** @nocollapse */
TypeaheadComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: TypeaheadService }
];
TypeaheadComponent.propDecorators = {
    id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
    options: [{ type: Input }],
    filter: [{ type: Input }],
    open: [{ type: Input }],
    openChange: [{ type: Output }],
    display: [{ type: Input }],
    key: [{ type: Input }],
    disabledOptions: [{ type: Input }],
    dropDirection: [{ type: Input }],
    maxHeight: [{ type: Input }],
    multiselectable: [{ type: Input }, { type: HostBinding, args: ['attr.aria-multiselectable',] }],
    openOnFilterChange: [{ type: Input }],
    pageSize: [{ type: Input }],
    selectFirst: [{ type: Input }],
    selectOnEnter: [{ type: Input }],
    loading: [{ type: Input }],
    loadingTemplate: [{ type: Input }],
    optionTemplate: [{ type: Input }],
    noOptionsTemplate: [{ type: Input }],
    optionSelected: [{ type: Output }],
    highlightedChange: [{ type: Output }],
    highlightedElementChange: [{ type: Output }],
    mousedownHandler: [{ type: HostListener, args: ['mousedown',] }],
    mouseupHandler: [{ type: HostListener, args: ['mouseup',] }]
};
function TypeaheadComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TypeaheadComponent.prototype.id;
    /** @type {?} */
    TypeaheadComponent.prototype.options;
    /** @type {?} */
    TypeaheadComponent.prototype.filter;
    /** @type {?} */
    TypeaheadComponent.prototype.openChange;
    /** @type {?} */
    TypeaheadComponent.prototype.display;
    /** @type {?} */
    TypeaheadComponent.prototype.key;
    /** @type {?} */
    TypeaheadComponent.prototype.disabledOptions;
    /** @type {?} */
    TypeaheadComponent.prototype.dropDirection;
    /** @type {?} */
    TypeaheadComponent.prototype.maxHeight;
    /** @type {?} */
    TypeaheadComponent.prototype.multiselectable;
    /** @type {?} */
    TypeaheadComponent.prototype.openOnFilterChange;
    /** @type {?} */
    TypeaheadComponent.prototype.pageSize;
    /** @type {?} */
    TypeaheadComponent.prototype.selectFirst;
    /** @type {?} */
    TypeaheadComponent.prototype.selectOnEnter;
    /** @type {?} */
    TypeaheadComponent.prototype.loading;
    /** @type {?} */
    TypeaheadComponent.prototype.loadingTemplate;
    /** @type {?} */
    TypeaheadComponent.prototype.optionTemplate;
    /** @type {?} */
    TypeaheadComponent.prototype.noOptionsTemplate;
    /** @type {?} */
    TypeaheadComponent.prototype.optionSelected;
    /** @type {?} */
    TypeaheadComponent.prototype.highlightedChange;
    /** @type {?} */
    TypeaheadComponent.prototype.highlightedElementChange;
    /** @type {?} */
    TypeaheadComponent.prototype.loadOptionsCallback;
    /** @type {?} */
    TypeaheadComponent.prototype.visibleOptions$;
    /** @type {?} */
    TypeaheadComponent.prototype.clicking;
    /** @type {?} */
    TypeaheadComponent.prototype.highlighted$;
    /** @type {?} */
    TypeaheadComponent.prototype.highlightedKey;
    /** @type {?} */
    TypeaheadComponent.prototype._onDestroy;
    /** @type {?} */
    TypeaheadComponent.prototype.optionApi;
    /** @type {?} */
    TypeaheadComponent.prototype.typeaheadElement;
    /** @type {?} */
    TypeaheadComponent.prototype._changeDetector;
    /** @type {?} */
    TypeaheadComponent.prototype._service;
}
/**
 * The API available to option templates.
 * @record
 */
export function TypeaheadOptionApi() { }
function TypeaheadOptionApi_tsickle_Closure_declarations() {
    /**
     * Returns the unique key value of the given option.
     * @type {?}
     */
    TypeaheadOptionApi.prototype.getKey;
    /**
     * Returns the display value of the given option.
     * @type {?}
     */
    TypeaheadOptionApi.prototype.getDisplay;
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value. Override the ux-filter-match class in CSS to modify the default appearance.
     * @type {?}
     */
    TypeaheadOptionApi.prototype.getDisplayHtml;
}
/**
 * @record
 */
export function TypeaheadVisibleOption() { }
function TypeaheadVisibleOption_tsickle_Closure_declarations() {
    /** @type {?} */
    TypeaheadVisibleOption.prototype.value;
    /** @type {?} */
    TypeaheadVisibleOption.prototype.key;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBaUIsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25MLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQWFqQixNQUFNOzs7Ozs7SUF5REYsWUFDVyxrQkFDQyxpQkFDQTtRQUZELHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDZixvQkFBZSxHQUFmLGVBQWU7UUFDZixhQUFRLEdBQVIsUUFBUTtrQkExRDBCLGdCQUFnQixFQUFFLFFBQVEsRUFBRTswQkFhbkQsSUFBSSxZQUFZLEVBQVc7NkJBS1YsTUFBTTt5QkFDakIsT0FBTzsrQkFDMEMsS0FBSztrQ0FDNUMsSUFBSTt3QkFDZixFQUFFOzJCQUNFLElBQUk7NkJBQ0YsS0FBSzt1QkFDcEIsS0FBSzs4QkFNRyxJQUFJLFlBQVksRUFBd0I7aUNBRXJDLElBQUksWUFBWSxFQUFPO3dDQUNoQixJQUFJLFlBQVksRUFBZTsrQkFHbEQsSUFBSSxlQUFlLENBQTJCLEVBQUUsQ0FBQzt3QkFDeEQsS0FBSzs0QkFDRCxJQUFJLGVBQWUsQ0FBeUIsSUFBSSxDQUFDOzhCQUN2QyxJQUFJOzBCQU9SLElBQUksT0FBTyxFQUFRO3lCQUVSO1lBQzVCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2pEO1FBUUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsT0FBZSxFQUFFLFFBQWdCLEVBQUUsTUFBVyxFQUFFLEVBQUU7WUFDMUUsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7O2dCQUdyQyx1QkFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztnQkFHL0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUVyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDO3FCQUNyQjtvQkFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO3dCQUNsQyxNQUFNLENBQUM7NEJBQ0gsS0FBSyxFQUFFLE1BQU07NEJBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3lCQUMzQixDQUFDO3FCQUNMLENBQUMsQ0FBQztpQkFDTixDQUFDLENBQUM7YUFDTjtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZixDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pELENBQUMsQ0FBQztRQUVILGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JHLENBQUMsQ0FBQztLQUNWOzs7O0lBbEdELElBQ0ksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN6Qzs7Ozs7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuQzs7OztJQStCRCxJQUFJLFdBQVc7UUFDWCx1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDckM7Ozs7O0lBNERELFdBQVcsQ0FBQyxPQUFzQjs7UUFFOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFTLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLE9BQU8sV0FBUSxZQUFZLElBQUksT0FBTyxXQUFRLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDcEI7U0FDSjs7UUFHRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDeEI7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7O0lBR0QsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDeEI7Ozs7SUFHRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDekI7Ozs7O0lBRUQsc0JBQXNCLENBQUMsS0FBaUI7O1FBRXBDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Ozs7O0lBRUQsa0JBQWtCLENBQUMsS0FBaUIsRUFBRSxNQUE4QjtRQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZCOzs7Ozs7SUFLRCxNQUFNLENBQUMsTUFBVztRQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxLQUFLLFFBQVEsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxNQUFNLG1CQUFTLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQztTQUNuQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7SUFLRCxVQUFVLENBQUMsTUFBVztRQUNsQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRixNQUFNLENBQUMsTUFBTSxtQkFBUyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUM7U0FDdkM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7Ozs7SUFNRCxjQUFjLENBQUMsTUFBVztRQUN0Qix1QkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvRyxxQkFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xDLHVCQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNoRixFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIscUJBQUksU0FBUyxHQUFHLGlDQUFpQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNqRyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDO2FBQ3pHO1NBQ0o7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ3RCOzs7OztJQUtELGdCQUFnQjtRQUNaLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDO0tBQzdDOzs7Ozs7SUFLRCxNQUFNLENBQUMsTUFBOEI7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO0tBQ0o7Ozs7OztJQUtELFVBQVUsQ0FBQyxNQUE4QjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN2Qix1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNyRCxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7Ozs7OztJQUtELFNBQVMsQ0FBQyxNQUE4QjtRQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEM7S0FDSjs7Ozs7O0lBTUQsYUFBYSxDQUFDLENBQVM7UUFDbkIsdUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkQsdUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkUscUJBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUM5QixxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsR0FBRyxDQUFDO1lBQ0EsUUFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDeEIsUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9ELFFBQVEsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNwRSxRQUNNLFFBQVEsSUFBSSxRQUFRLEVBQUU7UUFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDM0I7Ozs7SUFFRCxpQkFBaUI7UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUMvRTtLQUNKOzs7OztJQUtELFdBQVc7O1FBRVAsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O1lBRW5CLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekI7S0FDSjs7Ozs7SUFLRCxhQUFhO1FBQ1QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsdUJBQU0sZUFBZSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxRCx1QkFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU87aUJBQzlCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUUsQ0FBQztpQkFDRCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDWCxNQUFNLENBQUM7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2lCQUMxQixDQUFDO2FBQ0wsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN4Qzs7Ozs7O0lBS08sb0JBQW9CLENBQUMsTUFBVztRQUNwQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsdUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQzthQUMvQixDQUFDLENBQUM7U0FDTjtRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztZQTVUakIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4Qix1OUVBQXVDO2dCQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0IsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxTQUFTO29CQUNqQixjQUFjLEVBQUUsTUFBTTtvQkFDdEIsaUJBQWlCLEVBQUUsd0JBQXdCO29CQUMzQyxtQkFBbUIsRUFBRSxXQUFXO2lCQUNuQzthQUNKOzs7O1lBckJzQyxVQUFVO1lBQXhDLGlCQUFpQjtZQU9qQixnQkFBZ0I7OztpQkFpQnBCLEtBQUssWUFBSSxXQUFXLFNBQUMsU0FBUztzQkFFOUIsS0FBSztxQkFDTCxLQUFLO21CQUVMLEtBQUs7eUJBUUwsTUFBTTtzQkFFTixLQUFLO2tCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQywyQkFBMkI7aUNBQ2hELEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7c0JBQ0wsS0FBSzs4QkFFTCxLQUFLOzZCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs2QkFFTCxNQUFNO2dDQUVOLE1BQU07dUNBQ04sTUFBTTsrQkF3Rk4sWUFBWSxTQUFDLFdBQVc7NkJBS3hCLFlBQVksU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcclxuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb24gfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi90eXBlYWhlYWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRTZXJ2aWNlIH0gZnJvbSAnLi90eXBlYWhlYWQuc2VydmljZSc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXR5cGVhaGVhZCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3R5cGVhaGVhZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtUeXBlYWhlYWRTZXJ2aWNlXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAncm9sZSc6ICdsaXN0Ym94JyxcclxuICAgICAgICAnW2NsYXNzLm9wZW5dJzogJ29wZW4nLFxyXG4gICAgICAgICdbY2xhc3MuZHJvcC11cF0nOiAnZHJvcERpcmVjdGlvbiA9PT0gXCJ1cFwiJyxcclxuICAgICAgICAnW3N0eWxlLm1heEhlaWdodF0nOiAnbWF4SGVpZ2h0J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHlwZWFoZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5pZCcpIGlkOiBzdHJpbmcgPSBgdXgtdHlwZWFoZWFkLSR7Kyt1bmlxdWVJZH1gO1xyXG5cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueVtdIHwgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb247XHJcbiAgICBASW5wdXQoKSBmaWx0ZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2Uub3BlbiQuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuICAgIHNldCBvcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuJC5uZXh0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNwbGF5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGtleTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZE9wdGlvbnM6IGFueVtdO1xyXG4gICAgQElucHV0KCkgZHJvcERpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gJzI1MHB4JztcclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZScpIG11bHRpc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgb3Blbk9uRmlsdGVyQ2hhbmdlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHBhZ2VTaXplOiBudW1iZXIgPSAyMDtcclxuICAgIEBJbnB1dCgpIHNlbGVjdEZpcnN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHNlbGVjdE9uRW50ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGxvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBsb2FkaW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBvcHRpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VHlwZWFoZWFkT3B0aW9uRXZlbnQ+KCk7XHJcblxyXG4gICAgQE91dHB1dCgpIGhpZ2hsaWdodGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgaGlnaGxpZ2h0ZWRFbGVtZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcclxuXHJcbiAgICBsb2FkT3B0aW9uc0NhbGxiYWNrOiBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIHZpc2libGVPcHRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHlwZWFoZWFkVmlzaWJsZU9wdGlvbltdPihbXSk7XHJcbiAgICBjbGlja2luZyA9IGZhbHNlO1xyXG4gICAgaGlnaGxpZ2h0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUeXBlYWhlYWRWaXNpYmxlT3B0aW9uPihudWxsKTtcclxuICAgIGhpZ2hsaWdodGVkS2V5OiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGdldCBoaWdobGlnaHRlZCgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oaWdobGlnaHRlZCQuZ2V0VmFsdWUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS52YWx1ZSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgICBvcHRpb25BcGk6IFR5cGVhaGVhZE9wdGlvbkFwaSA9IHtcclxuICAgICAgICBnZXRLZXk6IHRoaXMuZ2V0S2V5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheTogdGhpcy5nZXREaXNwbGF5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheUh0bWw6IHRoaXMuZ2V0RGlzcGxheUh0bWwuYmluZCh0aGlzKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdHlwZWFoZWFkRWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljZTogVHlwZWFoZWFkU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZE9wdGlvbnNDYWxsYmFjayA9IChwYWdlTnVtOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIGZpbHRlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW52b2tlIHRoZSBjYWxsYmFjayB3aGljaCBtYXkgcmV0dXJuIGFuIGFycmF5IG9yIGEgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5T3JQcm9taXNlID0gdGhpcy5vcHRpb25zKHBhZ2VOdW0sIHBhZ2VTaXplLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1hcCB0aGUgcmVzdWx0cyB0byBhbiBhcnJheSBvZiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhcnJheU9yUHJvbWlzZSkudGhlbihuZXdPcHRpb25zID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld09wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld09wdGlvbnMubWFwKChvcHRpb246IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkob3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKG5leHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQobmV4dCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV4dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkS2V5ID0gbmV4dCA/IG5leHQua2V5IDogbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZENoYW5nZS5lbWl0KG5leHQgPyBuZXh0LnZhbHVlIDogbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5fc2VydmljZS5vcGVuJCwgdGhpcy5fc2VydmljZS5oaWdobGlnaHRlZEVsZW1lbnQkLCB0aGlzLnZpc2libGVPcHRpb25zJClcclxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtvcGVuLCBoaWdobGlnaHRlZEVsZW1lbnQsIHZpc2libGVPcHRpb25zXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UuZW1pdChvcGVuICYmIHZpc2libGVPcHRpb25zLmxlbmd0aCA+IDAgPyBoaWdobGlnaHRlZEVsZW1lbnQgOiBudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIC8vIE9wZW4gdGhlIGRyb3Bkb3duIGlmIHRoZSBmaWx0ZXIgdmFsdWUgdXBkYXRlc1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuT25GaWx0ZXJDaGFuZ2UgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZS1maWx0ZXIgdmlzaWJsZU9wdGlvbnNcclxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicpXHJcbiAgICBtb3VzZWRvd25IYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMuY2xpY2tpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnKVxyXG4gICAgbW91c2V1cEhhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbk1vdXNlZG93bkhhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIHRvIHByZXZlbnQgZm9jdXMgY2hhbmdpbmcgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9uQ2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdChvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdW5pcXVlIGtleSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXRLZXkob3B0aW9uOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5rZXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5rZXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbiAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkodGhpcy5rZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc3BsYXkob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uIHdpdGggSFRNTCBtYXJrdXAgYWRkZWQgdG8gaGlnaGxpZ2h0IHRoZSBwYXJ0IHdoaWNoIG1hdGNoZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlLlxyXG4gICAgICogQHBhcmFtIG9wdGlvblxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5SHRtbChvcHRpb246IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYXlUZXh0ID0gdGhpcy5nZXREaXNwbGF5KG9wdGlvbikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgICAgIGxldCBkaXNwbGF5SHRtbCA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmZpbHRlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBkaXNwbGF5VGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBoaWdobGlnaHQgPSBgPHNwYW4gY2xhc3M9XCJ1eC1maWx0ZXItbWF0Y2hcIj4ke2Rpc3BsYXlUZXh0LnN1YnN0cihtYXRjaEluZGV4LCBsZW5ndGgpfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUh0bWwgPSBkaXNwbGF5VGV4dC5zdWJzdHIoMCwgbWF0Y2hJbmRleCkgKyBoaWdobGlnaHQgKyBkaXNwbGF5VGV4dC5zdWJzdHIobWF0Y2hJbmRleCArIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlIdG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbmZpbml0ZSBzY3JvbGwgY29tcG9uZW50IHNob3VsZCBsb2FkXHJcbiAgICAgKi9cclxuICAgIGlzSW5maW5pdGVTY3JvbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3RzIHRoZSBnaXZlbiBvcHRpb24sIGVtaXR0aW5nIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCBhbmQgY2xvc2luZyB0aGUgZHJvcGRvd24uXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdChuZXcgVHlwZWFoZWFkT3B0aW9uRXZlbnQob3B0aW9uLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb3B0aW9uIGlzIHBhcnQgb2YgdGhlIGRpc2FibGVkT3B0aW9ucyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaXNEaXNhYmxlZChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kaXNhYmxlZE9wdGlvbnMuZmluZCgoc2VsZWN0ZWRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEtleShzZWxlY3RlZE9wdGlvbikgPT09IG9wdGlvbi5rZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgZ2l2ZW4gb3B0aW9uIGFzIHRoZSBjdXJyZW50IGhpZ2hsaWdodGVkIG9wdGlvbiwgYXZhaWxhYmxlIGluIHRoZSBoaWdobGlnaHRlZE9wdGlvbiBwYXJhbWV0ZXIuXHJcbiAgICAgKi9cclxuICAgIGhpZ2hsaWdodChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQob3B0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluY3JlbWVudCBvciBkZWNyZW1lbnQgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiBpbiB0aGUgbGlzdC4gRGlzYWJsZWQgb3B0aW9ucyBhcmUgc2tpcHBlZC5cclxuICAgICAqIEBwYXJhbSBkIFZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBpbmRleCBvZiB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uLCBpLmUuIC0xIHRvIG1vdmUgYmFja3dhcmRzLCArMSB0byBtb3ZlIGZvcndhcmRzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlSGlnaGxpZ2h0KGQ6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgY29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLnZpc2libGVPcHRpb25zJC5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodEluZGV4ID0gdGhpcy5pbmRleE9mVmlzaWJsZU9wdGlvbih0aGlzLmhpZ2hsaWdodGVkKTtcclxuICAgICAgICBsZXQgbmV3SW5kZXggPSBoaWdobGlnaHRJbmRleDtcclxuICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBpbkJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4ICsgZDtcclxuICAgICAgICAgICAgaW5Cb3VuZHMgPSAobmV3SW5kZXggPj0gMCAmJiBuZXdJbmRleCA8IHZpc2libGVPcHRpb25zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGRpc2FibGVkID0gaW5Cb3VuZHMgJiYgdGhpcy5pc0Rpc2FibGVkKHZpc2libGVPcHRpb25zW25ld0luZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChpbkJvdW5kcyAmJiBkaXNhYmxlZCk7XHJcblxyXG4gICAgICAgIGlmICghZGlzYWJsZWQgJiYgaW5Cb3VuZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQodmlzaWJsZU9wdGlvbnNbbmV3SW5kZXhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEhpZ2hsaWdodGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHsgdmFsdWU6IHRoaXMuaGlnaGxpZ2h0ZWQsIGtleTogdGhpcy5nZXRLZXkodGhpcy5oaWdobGlnaHRlZCl9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdXAgdGhlIG9wdGlvbnMgYmVmb3JlIHRoZSBkcm9wZG93biBpcyBkaXNwbGF5ZWQuXHJcbiAgICAgKi9cclxuICAgIGluaXRPcHRpb25zKCkge1xyXG4gICAgICAgIC8vIENsZWFyIHByZXZpb3VzIGhpZ2hsaWdodFxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQobnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3QpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyB3aWxsIGhpZ2hsaWdodCB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIG9wdGlvbi5cclxuICAgICAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgdmlzaWJsZU9wdGlvbnMgYXJyYXkgd2l0aCB0aGUgY3VycmVudCBmaWx0ZXIuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZU9wdGlvbnMoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGlzZWRJbnB1dCA9ICh0aGlzLmZpbHRlciB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERpc3BsYXkob3B0aW9uKS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXNlZElucHV0KSA+PSAwO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucyQubmV4dCh2aXNpYmxlT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIGdpdmVuIG9wdGlvbiBpbiB0aGUgdmlzaWJsZU9wdGlvbnMgYXJyYXkuIFJldHVybnMgLTEgaWYgdGhlIG9wdGlvbiBpcyBub3QgY3VycmVudGx5IHZpc2libGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5kZXhPZlZpc2libGVPcHRpb24ob3B0aW9uOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uS2V5ID0gdGhpcy5nZXRLZXkob3B0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMkLmdldFZhbHVlKCkuZmluZEluZGV4KChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmtleSA9PT0gb3B0aW9uS2V5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBBUEkgYXZhaWxhYmxlIHRvIG9wdGlvbiB0ZW1wbGF0ZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZE9wdGlvbkFwaSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldEtleShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbiB3aXRoIEhUTUwgbWFya3VwIGFkZGVkIHRvIGhpZ2hsaWdodCB0aGUgcGFydCB3aGljaCBtYXRjaGVzIHRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZS4gT3ZlcnJpZGUgdGhlIHV4LWZpbHRlci1tYXRjaCBjbGFzcyBpbiBDU1MgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGFwcGVhcmFuY2UuXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlIdG1sKG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZFZpc2libGVPcHRpb24ge1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIGtleTogc3RyaW5nO1xyXG59Il19