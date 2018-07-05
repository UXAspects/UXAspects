/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadService } from './typeahead.service';
var /** @type {?} */ uniqueId = 0;
var TypeaheadComponent = (function () {
    function TypeaheadComponent(typeaheadElement, _cdRef, _service) {
        var _this = this;
        this.typeaheadElement = typeaheadElement;
        this._cdRef = _cdRef;
        this._service = _service;
        this.id = "ux-typeahead-" + ++uniqueId;
        this.openChange = new EventEmitter();
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiselectable = false;
        this.openOnFilterChange = true;
        this.pageSize = 20;
        this.selectFirst = true;
        this.optionSelected = new EventEmitter();
        this.highlightedChange = new EventEmitter();
        this.highlightedElementChange = new EventEmitter();
        this.visibleOptions$ = new BehaviorSubject([]);
        this.loading = false;
        this.clicking = false;
        this.highlighted$ = new BehaviorSubject(null);
        this.highlightedKey = null;
        this._open = false;
        this._subscription = new Subscription();
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = function (pageNum, pageSize, filter) {
            if (typeof _this.options === 'function') {
                // Invoke the callback which may return an array or a promise.
                var /** @type {?} */ arrayOrPromise = _this.options(pageNum, pageSize, filter);
                // Map the results to an array of TypeaheadVisibleOption.
                return Promise.resolve(arrayOrPromise).then(function (newOptions) {
                    if (!Array.isArray(newOptions)) {
                        return newOptions;
                    }
                    return newOptions.map(function (option) {
                        return {
                            value: option,
                            key: _this.getKey(option)
                        };
                    });
                });
            }
            return null;
        };
        this._subscription.add(this._service.open$.pipe(distinctUntilChanged()).subscribe(function (next) {
            _this.openChange.emit(next);
            if (next) {
                _this.initOptions();
            }
        }));
        this._subscription.add(this.highlighted$.subscribe(function (next) {
            _this.highlightedKey = next ? next.key : null;
            _this.highlightedChange.emit(next ? next.value : null);
        }));
        this._subscription.add(combineLatest(this._service.open$, this._service.highlightedElement$, this.visibleOptions$)
            .subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 3), open = _b[0], highlightedElement = _b[1], visibleOptions = _b[2];
            _this.highlightedElementChange.emit(open && visibleOptions.length > 0 ? highlightedElement : null);
        }));
    }
    Object.defineProperty(TypeaheadComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this._service.open$.getValue();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._service.open$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadComponent.prototype, "highlighted", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ value = this.highlighted$.getValue();
            return value ? value.value : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // Attach default loading template
        if (!this.loadingTemplate) {
            this.loadingTemplate = this._defaultLoadingTemplate;
        }
        // Attach default option template
        if (!this.optionTemplate) {
            this.optionTemplate = this._defaultOptionTemplate;
        }
        // Attach default "no results" template
        if (!this.noOptionsTemplate) {
            this.noOptionsTemplate = this._defaultNoOptionsTemplate;
        }
        this._cdRef.detectChanges();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TypeaheadComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Open the dropdown if the filter value updates
        if (changes["filter"]) {
            if (this.openOnFilterChange && changes["filter"].currentValue && changes["filter"].currentValue.length > 0) {
                this.open = true;
            }
        }
        // Re-filter visibleOptions
        this.updateOptions();
    };
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.mousedownHandler = /**
     * @return {?}
     */
    function () {
        this.clicking = true;
    };
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.mouseupHandler = /**
     * @return {?}
     */
    function () {
        this.clicking = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TypeaheadComponent.prototype.optionMousedownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.optionClickHandler = /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    function (event, option) {
        this.select(option);
    };
    /**
     * Returns the unique key value of the given option.
     */
    /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getKey = /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[/** @type {?} */ (this.key)];
        }
        return this.getDisplay(option);
    };
    /**
     * Returns the display value of the given option.
     */
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getDisplay = /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    };
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param option
     */
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getDisplayHtml = /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var /** @type {?} */ displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var /** @type {?} */ displayHtml = displayText;
        if (this.filter) {
            var /** @type {?} */ length_1 = this.filter.length;
            var /** @type {?} */ matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var /** @type {?} */ highlight = "<span class=\"ux-filter-match\">" + displayText.substr(matchIndex, length_1) + "</span>";
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length_1);
            }
        }
        return displayHtml;
    };
    /**
     * Returns true if the infinite scroll component should load
     */
    /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    TypeaheadComponent.prototype.isInfiniteScroll = /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    function () {
        return typeof this.options === 'function';
    };
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     */
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.select = /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option.value));
            this.highlighted$.next(null);
            this.open = false;
        }
    };
    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.isDisabled = /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var _this = this;
        if (this.disabledOptions) {
            var /** @type {?} */ result = this.disabledOptions.find(function (selectedOption) {
                return _this.getKey(selectedOption) === option.key;
            });
            return result !== undefined;
        }
        return false;
    };
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.highlight = /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!this.isDisabled(option)) {
            this.highlighted$.next(option);
        }
    };
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    TypeaheadComponent.prototype.moveHighlight = /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    function (d) {
        var /** @type {?} */ visibleOptions = this.visibleOptions$.getValue();
        var /** @type {?} */ highlightIndex = this.indexOfVisibleOption(this.highlighted);
        var /** @type {?} */ newIndex = highlightIndex;
        var /** @type {?} */ disabled = true;
        var /** @type {?} */ inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < visibleOptions.length);
            disabled = inBounds && this.isDisabled(visibleOptions[newIndex]);
        } while (inBounds && disabled);
        if (!disabled && inBounds) {
            this.highlighted$.next(visibleOptions[newIndex]);
        }
        return this.highlighted;
    };
    /**
     * Set up the options before the dropdown is displayed.
     */
    /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
     */
    TypeaheadComponent.prototype.initOptions = /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
     */
    function () {
        // Clear previous highlight
        this.highlighted$.next(null);
        if (this.selectFirst) {
            // This will highlight the first non-disabled option.
            this.moveHighlight(1);
        }
    };
    /**
     * Update the visibleOptions array with the current filter.
     */
    /**
     * Update the visibleOptions array with the current filter.
     * @return {?}
     */
    TypeaheadComponent.prototype.updateOptions = /**
     * Update the visibleOptions array with the current filter.
     * @return {?}
     */
    function () {
        var _this = this;
        if (typeof this.options === 'object') {
            var /** @type {?} */ normalisedInput_1 = (this.filter || '').toLowerCase();
            var /** @type {?} */ visibleOptions = this.options
                .filter(function (option) {
                return _this.getDisplay(option).toLowerCase().indexOf(normalisedInput_1) >= 0;
            })
                .map(function (value) {
                return {
                    value: value,
                    key: _this.getKey(value)
                };
            });
            this.visibleOptions$.next(visibleOptions);
        }
        this.initOptions();
    };
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.indexOfVisibleOption = /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option) {
            var /** @type {?} */ optionKey_1 = this.getKey(option);
            return this.visibleOptions$.getValue().findIndex(function (el) {
                return el.key === optionKey_1;
            });
        }
        return -1;
    };
    TypeaheadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-typeahead',
                    template: "<div class=\"ux-typeahead-options\"\n    [uxInfiniteScroll]=\"loadOptionsCallback\"\n    [collection]=\"visibleOptions$ | async\"\n    (collectionChange)=\"visibleOptions$.next($event)\"\n    [enabled]=\"isInfiniteScroll()\"\n    [filter]=\"filter\"\n    [loadOnScroll]=\"true\"\n    [pageSize]=\"pageSize\"\n    [scrollElement]=\"typeaheadElement\"\n    (loading)=\"loading = true\"\n    (loaded)=\"loading = false\">\n\n    <ol *ngIf=\"(visibleOptions$ | async).length > 0\">\n        <li *ngFor=\"let option of (visibleOptions$ | async); let i = index\"\n            [attr.id]=\"id + '-option-' + i\"\n            [class.disabled]=\"isDisabled(option)\"\n            [class.highlighted]=\"highlightedKey === option.key\"\n            [attr.aria-selected]=\"multiselectable ? isDisabled(option) : null\"\n            [uxTypeaheadHighlight]=\"highlightedKey === option.key\"\n            [uxScrollIntoViewIf]=\"highlightedKey === option.key\"\n            [scrollParent]=\"typeaheadElement.nativeElement\"\n            (mousedown)=\"optionMousedownHandler($event)\"\n            (click)=\"optionClickHandler($event, option)\"\n            (mouseover)=\"highlight(option)\">\n\n            <ng-container [ngTemplateOutlet]=\"optionTemplate\"\n                [ngTemplateOutletContext]=\"{option: option.value, api: optionApi}\">\n            </ng-container>\n\n        </li>\n    </ol>\n\n    <div *uxInfiniteScrollLoading>\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate\">\n        </ng-container>\n    </div>\n\n</div>\n<div *ngIf=\"(visibleOptions$ | async).length === 0 && !loading\">\n    <ng-container [ngTemplateOutlet]=\"noOptionsTemplate\">\n    </ng-container>\n</div>\n\n<ng-template #defaultLoadingTemplate>\n    <div class=\"ux-typeahead-loading\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n        <div>Loading...</div>\n    </div>\n</ng-template>\n\n<ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n</ng-template>\n\n<ng-template #defaultNoOptionsTemplate>\n    <span class=\"ux-typeahead-no-options\">No results</span>\n</ng-template>",
                    providers: [TypeaheadService],
                    host: {
                        'role': 'listbox',
                        '[class.open]': 'open',
                        '[class.drop-up]': 'dropDirection === "up"',
                        '[style.maxHeight]': 'maxHeight'
                    }
                },] },
    ];
    /** @nocollapse */
    TypeaheadComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: TypeaheadService, },
    ]; };
    TypeaheadComponent.propDecorators = {
        "id": [{ type: Input }, { type: HostBinding, args: ['attr.id',] },],
        "options": [{ type: Input },],
        "filter": [{ type: Input },],
        "open": [{ type: Input, args: ['open',] },],
        "openChange": [{ type: Output },],
        "display": [{ type: Input },],
        "key": [{ type: Input },],
        "disabledOptions": [{ type: Input },],
        "dropDirection": [{ type: Input },],
        "maxHeight": [{ type: Input },],
        "multiselectable": [{ type: Input }, { type: HostBinding, args: ['attr.aria-multiselectable',] },],
        "openOnFilterChange": [{ type: Input },],
        "pageSize": [{ type: Input },],
        "selectFirst": [{ type: Input },],
        "loadingTemplate": [{ type: Input },],
        "optionTemplate": [{ type: Input },],
        "noOptionsTemplate": [{ type: Input },],
        "optionSelected": [{ type: Output },],
        "highlightedChange": [{ type: Output },],
        "highlightedElementChange": [{ type: Output },],
        "_defaultLoadingTemplate": [{ type: ViewChild, args: ['defaultLoadingTemplate',] },],
        "_defaultOptionTemplate": [{ type: ViewChild, args: ['defaultOptionTemplate',] },],
        "_defaultNoOptionsTemplate": [{ type: ViewChild, args: ['defaultNoOptionsTemplate',] },],
        "mousedownHandler": [{ type: HostListener, args: ['mousedown',] },],
        "mouseupHandler": [{ type: HostListener, args: ['mouseup',] },],
    };
    return TypeaheadComponent;
}());
export { TypeaheadComponent };
function TypeaheadComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TypeaheadComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TypeaheadComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TypeaheadComponent.propDecorators;
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
    TypeaheadComponent.prototype._defaultLoadingTemplate;
    /** @type {?} */
    TypeaheadComponent.prototype._defaultOptionTemplate;
    /** @type {?} */
    TypeaheadComponent.prototype._defaultNoOptionsTemplate;
    /** @type {?} */
    TypeaheadComponent.prototype.loadOptionsCallback;
    /** @type {?} */
    TypeaheadComponent.prototype.visibleOptions$;
    /** @type {?} */
    TypeaheadComponent.prototype.loading;
    /** @type {?} */
    TypeaheadComponent.prototype.clicking;
    /** @type {?} */
    TypeaheadComponent.prototype.highlighted$;
    /** @type {?} */
    TypeaheadComponent.prototype.highlightedKey;
    /** @type {?} */
    TypeaheadComponent.prototype._open;
    /** @type {?} */
    TypeaheadComponent.prototype._subscription;
    /** @type {?} */
    TypeaheadComponent.prototype.optionApi;
    /** @type {?} */
    TypeaheadComponent.prototype.typeaheadElement;
    /** @type {?} */
    TypeaheadComponent.prototype._cdRef;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFpQixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdNLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBa0liLDRCQUNXLGtCQUNDLFFBQ0E7UUFIWixpQkFxREM7UUFwRFUscUJBQWdCLEdBQWhCLGdCQUFnQjtRQUNmLFdBQU0sR0FBTixNQUFNO1FBQ04sYUFBUSxHQUFSLFFBQVE7a0JBOUQwQixrQkFBZ0IsRUFBRSxRQUFVOzBCQWFuRCxJQUFJLFlBQVksRUFBVzs2QkFLVixNQUFNO3lCQUNqQixPQUFPOytCQUMwQyxLQUFLO2tDQUM1QyxJQUFJO3dCQUNmLEVBQUU7MkJBQ0UsSUFBSTs4QkFNVCxJQUFJLFlBQVksRUFBd0I7aUNBRXJDLElBQUksWUFBWSxFQUFPO3dDQUNoQixJQUFJLFlBQVksRUFBZTsrQkFPbEQsSUFB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L0IsQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7OztnQkF0WWpCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLDJxRUF3REM7b0JBQ1gsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLElBQUksRUFBRTt3QkFDRixNQUFNLEVBQUUsU0FBUzt3QkFDakIsY0FBYyxFQUFFLE1BQU07d0JBQ3RCLGlCQUFpQixFQUFFLHdCQUF3Qjt3QkFDM0MsbUJBQW1CLEVBQUUsV0FBVztxQkFDbkM7aUJBQ0o7Ozs7Z0JBN0VxRCxVQUFVO2dCQUF4QyxpQkFBaUI7Z0JBT2hDLGdCQUFnQjs7O3VCQXlFcEIsS0FBSyxZQUFJLFdBQVcsU0FBQyxTQUFTOzRCQUU5QixLQUFLOzJCQUNMLEtBQUs7eUJBRUwsS0FBSyxTQUFDLE1BQU07K0JBUVosTUFBTTs0QkFFTixLQUFLO3dCQUNMLEtBQUs7b0NBQ0wsS0FBSztrQ0FDTCxLQUFLOzhCQUNMLEtBQUs7b0NBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQywyQkFBMkI7dUNBQ2hELEtBQUs7NkJBQ0wsS0FBSztnQ0FDTCxLQUFLO29DQUVMLEtBQUs7bUNBQ0wsS0FBSztzQ0FDTCxLQUFLO21DQUVMLE1BQU07c0NBRU4sTUFBTTs2Q0FDTixNQUFNOzRDQUVOLFNBQVMsU0FBQyx3QkFBd0I7MkNBQ2xDLFNBQVMsU0FBQyx1QkFBdUI7OENBQ2pDLFNBQVMsU0FBQywwQkFBMEI7cUNBaUhwQyxZQUFZLFNBQUMsV0FBVzttQ0FLeEIsWUFBWSxTQUFDLFNBQVM7OzZCQTFPM0I7O1NBOEVhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1ldmVudCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZFNlcnZpY2UgfSBmcm9tICcuL3R5cGVhaGVhZC5zZXJ2aWNlJztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtdHlwZWFoZWFkJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LXR5cGVhaGVhZC1vcHRpb25zXCJcbiAgICBbdXhJbmZpbml0ZVNjcm9sbF09XCJsb2FkT3B0aW9uc0NhbGxiYWNrXCJcbiAgICBbY29sbGVjdGlvbl09XCJ2aXNpYmxlT3B0aW9ucyQgfCBhc3luY1wiXG4gICAgKGNvbGxlY3Rpb25DaGFuZ2UpPVwidmlzaWJsZU9wdGlvbnMkLm5leHQoJGV2ZW50KVwiXG4gICAgW2VuYWJsZWRdPVwiaXNJbmZpbml0ZVNjcm9sbCgpXCJcbiAgICBbZmlsdGVyXT1cImZpbHRlclwiXG4gICAgW2xvYWRPblNjcm9sbF09XCJ0cnVlXCJcbiAgICBbcGFnZVNpemVdPVwicGFnZVNpemVcIlxuICAgIFtzY3JvbGxFbGVtZW50XT1cInR5cGVhaGVhZEVsZW1lbnRcIlxuICAgIChsb2FkaW5nKT1cImxvYWRpbmcgPSB0cnVlXCJcbiAgICAobG9hZGVkKT1cImxvYWRpbmcgPSBmYWxzZVwiPlxuXG4gICAgPG9sICpuZ0lmPVwiKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKS5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mICh2aXNpYmxlT3B0aW9ucyQgfCBhc3luYyk7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgW2F0dHIuaWRdPVwiaWQgKyAnLW9wdGlvbi0nICsgaVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChvcHRpb24pXCJcbiAgICAgICAgICAgIFtjbGFzcy5oaWdobGlnaHRlZF09XCJoaWdobGlnaHRlZEtleSA9PT0gb3B0aW9uLmtleVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIm11bHRpc2VsZWN0YWJsZSA/IGlzRGlzYWJsZWQob3B0aW9uKSA6IG51bGxcIlxuICAgICAgICAgICAgW3V4VHlwZWFoZWFkSGlnaGxpZ2h0XT1cImhpZ2hsaWdodGVkS2V5ID09PSBvcHRpb24ua2V5XCJcbiAgICAgICAgICAgIFt1eFNjcm9sbEludG9WaWV3SWZdPVwiaGlnaGxpZ2h0ZWRLZXkgPT09IG9wdGlvbi5rZXlcIlxuICAgICAgICAgICAgW3Njcm9sbFBhcmVudF09XCJ0eXBlYWhlYWRFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvcHRpb25Nb3VzZWRvd25IYW5kbGVyKCRldmVudClcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvbkNsaWNrSGFuZGxlcigkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJoaWdobGlnaHQob3B0aW9uKVwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm9wdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie29wdGlvbjogb3B0aW9uLnZhbHVlLCBhcGk6IG9wdGlvbkFwaX1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvbGk+XG4gICAgPC9vbD5cblxuICAgIDxkaXYgKnV4SW5maW5pdGVTY3JvbGxMb2FkaW5nPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvYWRpbmdUZW1wbGF0ZVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKS5sZW5ndGggPT09IDAgJiYgIWxvYWRpbmdcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm5vT3B0aW9uc1RlbXBsYXRlXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0TG9hZGluZ1RlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ1eC10eXBlYWhlYWQtbG9hZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lciBzcGlubmVyLWFjY2VudCBzcGlubmVyLWJvdW5jZS1taWRkbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdj5Mb2FkaW5nLi4uPC9kaXY+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRPcHRpb25UZW1wbGF0ZSBsZXQtb3B0aW9uPVwib3B0aW9uXCIgbGV0LWFwaT1cImFwaVwiPlxuICAgIDxzcGFuIGNsYXNzPVwidXgtdHlwZWFoZWFkLW9wdGlvblwiIFtpbm5lckh0bWxdPVwiYXBpLmdldERpc3BsYXlIdG1sKG9wdGlvbilcIj48L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHROb09wdGlvbnNUZW1wbGF0ZT5cbiAgICA8c3BhbiBjbGFzcz1cInV4LXR5cGVhaGVhZC1uby1vcHRpb25zXCI+Tm8gcmVzdWx0czwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+YCxcclxuICAgIHByb3ZpZGVyczogW1R5cGVhaGVhZFNlcnZpY2VdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdyb2xlJzogJ2xpc3Rib3gnLFxyXG4gICAgICAgICdbY2xhc3Mub3Blbl0nOiAnb3BlbicsXHJcbiAgICAgICAgJ1tjbGFzcy5kcm9wLXVwXSc6ICdkcm9wRGlyZWN0aW9uID09PSBcInVwXCInLFxyXG4gICAgICAgICdbc3R5bGUubWF4SGVpZ2h0XSc6ICdtYXhIZWlnaHQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC10eXBlYWhlYWQtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55W10gfCBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIEBJbnB1dCgpIGZpbHRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgnb3BlbicpXHJcbiAgICBnZXQgb3BlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZS5vcGVuJC5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IG9wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4kLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc3BsYXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkga2V5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkT3B0aW9uczogYW55W107XHJcbiAgICBASW5wdXQoKSBkcm9wRGlyZWN0aW9uOiAndXAnIHwgJ2Rvd24nID0gJ2Rvd24nO1xyXG4gICAgQElucHV0KCkgbWF4SGVpZ2h0OiBzdHJpbmcgPSAnMjUwcHgnO1xyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlJykgbXVsdGlzZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBvcGVuT25GaWx0ZXJDaGFuZ2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlciA9IDIwO1xyXG4gICAgQElucHV0KCkgc2VsZWN0Rmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgbm9PcHRpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUeXBlYWhlYWRPcHRpb25FdmVudD4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgaGlnaGxpZ2h0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBoaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRMb2FkaW5nVGVtcGxhdGUnKSBwcml2YXRlIF9kZWZhdWx0TG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdE9wdGlvblRlbXBsYXRlJykgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdE5vT3B0aW9uc1RlbXBsYXRlJykgcHJpdmF0ZSBfZGVmYXVsdE5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGxvYWRPcHRpb25zQ2FsbGJhY2s6IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgdmlzaWJsZU9wdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUeXBlYWhlYWRWaXNpYmxlT3B0aW9uW10+KFtdKTtcclxuICAgIGxvYWRpbmcgPSBmYWxzZTtcclxuICAgIGNsaWNraW5nID0gZmFsc2U7XHJcbiAgICBoaWdobGlnaHRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFR5cGVhaGVhZFZpc2libGVPcHRpb24+KG51bGwpO1xyXG4gICAgaGlnaGxpZ2h0ZWRLZXk6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgZ2V0IGhpZ2hsaWdodGVkKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmhpZ2hsaWdodGVkJC5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnZhbHVlIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gICAgb3B0aW9uQXBpOiBUeXBlYWhlYWRPcHRpb25BcGkgPSB7XHJcbiAgICAgICAgZ2V0S2V5OiB0aGlzLmdldEtleS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGdldERpc3BsYXk6IHRoaXMuZ2V0RGlzcGxheS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGdldERpc3BsYXlIdG1sOiB0aGlzLmdldERpc3BsYXlIdG1sLmJpbmQodGhpcylcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHR5cGVhaGVhZEVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHByaXZhdGUgX3NlcnZpY2U6IFR5cGVhaGVhZFNlcnZpY2VcclxuICAgICkge1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRPcHRpb25zQ2FsbGJhY2sgPSAocGFnZU51bTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBmaWx0ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgd2hpY2ggbWF5IHJldHVybiBhbiBhcnJheSBvciBhIHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJheU9yUHJvbWlzZSA9IHRoaXMub3B0aW9ucyhwYWdlTnVtLCBwYWdlU2l6ZSwgZmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNYXAgdGhlIHJlc3VsdHMgdG8gYW4gYXJyYXkgb2YgVHlwZWFoZWFkVmlzaWJsZU9wdGlvbi5cclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYXJyYXlPclByb21pc2UpLnRoZW4obmV3T3B0aW9ucyA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShuZXdPcHRpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3T3B0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdPcHRpb25zLm1hcCgob3B0aW9uOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KG9wdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2Uub3BlbiQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKG5leHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KG5leHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZEtleSA9IG5leHQgPyBuZXh0LmtleSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkQ2hhbmdlLmVtaXQobmV4dCA/IG5leHQudmFsdWUgOiBudWxsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKFxyXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuX3NlcnZpY2Uub3BlbiQsIHRoaXMuX3NlcnZpY2UuaGlnaGxpZ2h0ZWRFbGVtZW50JCwgdGhpcy52aXNpYmxlT3B0aW9ucyQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbb3BlbiwgaGlnaGxpZ2h0ZWRFbGVtZW50LCB2aXNpYmxlT3B0aW9uc10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRWxlbWVudENoYW5nZS5lbWl0KG9wZW4gJiYgdmlzaWJsZU9wdGlvbnMubGVuZ3RoID4gMCA/IGhpZ2hsaWdodGVkRWxlbWVudCA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICAvLyBBdHRhY2ggZGVmYXVsdCBsb2FkaW5nIHRlbXBsYXRlXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRpbmdUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdUZW1wbGF0ZSA9IHRoaXMuX2RlZmF1bHRMb2FkaW5nVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdHRhY2ggZGVmYXVsdCBvcHRpb24gdGVtcGxhdGVcclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25UZW1wbGF0ZSA9IHRoaXMuX2RlZmF1bHRPcHRpb25UZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBkZWZhdWx0IFwibm8gcmVzdWx0c1wiIHRlbXBsYXRlXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vT3B0aW9uc1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9PcHRpb25zVGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0Tm9PcHRpb25zVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIC8vIE9wZW4gdGhlIGRyb3Bkb3duIGlmIHRoZSBmaWx0ZXIgdmFsdWUgdXBkYXRlc1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuT25GaWx0ZXJDaGFuZ2UgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZS1maWx0ZXIgdmlzaWJsZU9wdGlvbnNcclxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nKVxyXG4gICAgbW91c2Vkb3duSGFuZGxlcigpIHtcclxuICAgICAgICB0aGlzLmNsaWNraW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJylcclxuICAgIG1vdXNldXBIYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMuY2xpY2tpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25Nb3VzZWRvd25IYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgLy8gV29ya2Fyb3VuZCB0byBwcmV2ZW50IGZvY3VzIGNoYW5naW5nIHdoZW4gYW4gb3B0aW9uIGlzIGNsaWNrZWRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbkNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCwgb3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Qob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBrZXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0S2V5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMua2V5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtleShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMua2V5ID09PSAnc3RyaW5nJyAmJiBvcHRpb24gJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMua2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uWzxzdHJpbmc+dGhpcy5rZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5KG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXkob3B0aW9uOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbiAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uWzxzdHJpbmc+dGhpcy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbiB3aXRoIEhUTUwgbWFya3VwIGFkZGVkIHRvIGhpZ2hsaWdodCB0aGUgcGFydCB3aGljaCBtYXRjaGVzIHRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheUh0bWwob3B0aW9uOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBkaXNwbGF5VGV4dCA9IHRoaXMuZ2V0RGlzcGxheShvcHRpb24pLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcclxuICAgICAgICBsZXQgZGlzcGxheUh0bWwgPSBkaXNwbGF5VGV4dDtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5maWx0ZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gZGlzcGxheVRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGlnaGxpZ2h0ID0gYDxzcGFuIGNsYXNzPVwidXgtZmlsdGVyLW1hdGNoXCI+JHtkaXNwbGF5VGV4dC5zdWJzdHIobWF0Y2hJbmRleCwgbGVuZ3RoKX08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlIdG1sID0gZGlzcGxheVRleHQuc3Vic3RyKDAsIG1hdGNoSW5kZXgpICsgaGlnaGxpZ2h0ICsgZGlzcGxheVRleHQuc3Vic3RyKG1hdGNoSW5kZXggKyBsZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaXNwbGF5SHRtbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5maW5pdGUgc2Nyb2xsIGNvbXBvbmVudCBzaG91bGQgbG9hZFxyXG4gICAgICovXHJcbiAgICBpc0luZmluaXRlU2Nyb2xsKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnZnVuY3Rpb24nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyB0aGUgZ2l2ZW4gb3B0aW9uLCBlbWl0dGluZyB0aGUgb3B0aW9uU2VsZWN0ZWQgZXZlbnQgYW5kIGNsb3NpbmcgdGhlIGRyb3Bkb3duLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3Qob3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQob3B0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQobmV3IFR5cGVhaGVhZE9wdGlvbkV2ZW50KG9wdGlvbi52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG9wdGlvbiBpcyBwYXJ0IG9mIHRoZSBkaXNhYmxlZE9wdGlvbnMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIGlzRGlzYWJsZWQob3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWRPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGlzYWJsZWRPcHRpb25zLmZpbmQoKHNlbGVjdGVkT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXkoc2VsZWN0ZWRPcHRpb24pID09PSBvcHRpb24ua2V5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGdpdmVuIG9wdGlvbiBhcyB0aGUgY3VycmVudCBoaWdobGlnaHRlZCBvcHRpb24sIGF2YWlsYWJsZSBpbiB0aGUgaGlnaGxpZ2h0ZWRPcHRpb24gcGFyYW1ldGVyLlxyXG4gICAgICovXHJcbiAgICBoaWdobGlnaHQob3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQob3B0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jcmVtZW50IG9yIGRlY3JlbWVudCB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGluIHRoZSBsaXN0LiBEaXNhYmxlZCBvcHRpb25zIGFyZSBza2lwcGVkLlxyXG4gICAgICogQHBhcmFtIGQgVmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIGluZGV4IG9mIHRoZSBoaWdobGlnaHRlZCBvcHRpb24sIGkuZS4gLTEgdG8gbW92ZSBiYWNrd2FyZHMsICsxIHRvIG1vdmUgZm9yd2FyZHMuXHJcbiAgICAgKi9cclxuICAgIG1vdmVIaWdobGlnaHQoZDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMudmlzaWJsZU9wdGlvbnMkLmdldFZhbHVlKCk7XHJcbiAgICAgICAgY29uc3QgaGlnaGxpZ2h0SW5kZXggPSB0aGlzLmluZGV4T2ZWaXNpYmxlT3B0aW9uKHRoaXMuaGlnaGxpZ2h0ZWQpO1xyXG4gICAgICAgIGxldCBuZXdJbmRleCA9IGhpZ2hsaWdodEluZGV4O1xyXG4gICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IGluQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggKyBkO1xyXG4gICAgICAgICAgICBpbkJvdW5kcyA9IChuZXdJbmRleCA+PSAwICYmIG5ld0luZGV4IDwgdmlzaWJsZU9wdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBpbkJvdW5kcyAmJiB0aGlzLmlzRGlzYWJsZWQodmlzaWJsZU9wdGlvbnNbbmV3SW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGluQm91bmRzICYmIGRpc2FibGVkKTtcclxuXHJcbiAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBpbkJvdW5kcykge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KHZpc2libGVPcHRpb25zW25ld0luZGV4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB1cCB0aGUgb3B0aW9ucyBiZWZvcmUgdGhlIGRyb3Bkb3duIGlzIGRpc3BsYXllZC5cclxuICAgICAqL1xyXG4gICAgaW5pdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgLy8gQ2xlYXIgcHJldmlvdXMgaGlnaGxpZ2h0XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RGaXJzdCkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgaGlnaGxpZ2h0IHRoZSBmaXJzdCBub24tZGlzYWJsZWQgb3B0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSB2aXNpYmxlT3B0aW9ucyBhcnJheSB3aXRoIHRoZSBjdXJyZW50IGZpbHRlci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlT3B0aW9ucygpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXNlZElucHV0ID0gKHRoaXMuZmlsdGVyIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheShvcHRpb24pLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpc2VkSW5wdXQpID49IDA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkodmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zJC5uZXh0KHZpc2libGVPcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIGdpdmVuIG9wdGlvbiBpbiB0aGUgdmlzaWJsZU9wdGlvbnMgYXJyYXkuIFJldHVybnMgLTEgaWYgdGhlIG9wdGlvbiBpcyBub3QgY3VycmVudGx5IHZpc2libGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5kZXhPZlZpc2libGVPcHRpb24ob3B0aW9uOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uS2V5ID0gdGhpcy5nZXRLZXkob3B0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMkLmdldFZhbHVlKCkuZmluZEluZGV4KChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmtleSA9PT0gb3B0aW9uS2V5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBBUEkgYXZhaWxhYmxlIHRvIG9wdGlvbiB0ZW1wbGF0ZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZE9wdGlvbkFwaSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldEtleShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbiB3aXRoIEhUTUwgbWFya3VwIGFkZGVkIHRvIGhpZ2hsaWdodCB0aGUgcGFydCB3aGljaCBtYXRjaGVzIHRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZS4gT3ZlcnJpZGUgdGhlIHV4LWZpbHRlci1tYXRjaCBjbGFzcyBpbiBDU1MgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGFwcGVhcmFuY2UuXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlIdG1sKG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZFZpc2libGVPcHRpb24ge1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIGtleTogc3RyaW5nO1xyXG59Il19