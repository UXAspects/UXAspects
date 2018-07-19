/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadService } from './typeahead.service';
var /** @type {?} */ uniqueId = 0;
var TypeaheadComponent = (function () {
    function TypeaheadComponent(typeaheadElement, _service) {
        var _this = this;
        this.typeaheadElement = typeaheadElement;
        this._service = _service;
        this.id = "ux-typeahead-" + ++uniqueId;
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
        this._service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(function (next) {
            _this.openChange.emit(next);
            if (next) {
                _this.initOptions();
            }
        });
        this.highlighted$.pipe(takeUntil(this._onDestroy)).subscribe(function (next) {
            _this.highlightedKey = next ? next.key : null;
            _this.highlightedChange.emit(next ? next.value : null);
        });
        combineLatest(this._service.open$, this._service.highlightedElement$, this.visibleOptions$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 3), open = _b[0], highlightedElement = _b[1], visibleOptions = _b[2];
            _this.highlightedElementChange.emit(open && visibleOptions.length > 0 ? highlightedElement : null);
        });
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
        this._onDestroy.next();
        this._onDestroy.complete();
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
     * @return {?}
     */
    TypeaheadComponent.prototype.selectHighlighted = /**
     * @return {?}
     */
    function () {
        if (this.highlighted) {
            this.select({ value: this.highlighted, key: this.getKey(this.highlighted) });
        }
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
                    template: "<div class=\"ux-typeahead-options\"\n    [uxInfiniteScroll]=\"loadOptionsCallback\"\n    [collection]=\"visibleOptions$ | async\"\n    (collectionChange)=\"visibleOptions$.next($event)\"\n    [enabled]=\"isInfiniteScroll()\"\n    [filter]=\"filter\"\n    [loadOnScroll]=\"true\"\n    [pageSize]=\"pageSize\"\n    [scrollElement]=\"typeaheadElement\"\n    (loading)=\"loading = true\"\n    (loaded)=\"loading = false\">\n\n    <ol *ngIf=\"(visibleOptions$ | async).length > 0\">\n        <li *ngFor=\"let option of (visibleOptions$ | async); let i = index\"\n            [attr.id]=\"id + '-option-' + i\"\n            [class.disabled]=\"isDisabled(option)\"\n            [class.highlighted]=\"highlightedKey === option.key\"\n            [attr.aria-selected]=\"multiselectable ? isDisabled(option) : null\"\n            [uxTypeaheadHighlight]=\"highlightedKey === option.key\"\n            [uxScrollIntoViewIf]=\"highlightedKey === option.key\"\n            [scrollParent]=\"typeaheadElement.nativeElement\"\n            (mousedown)=\"optionMousedownHandler($event)\"\n            (click)=\"optionClickHandler($event, option)\"\n            (mouseover)=\"highlight(option)\">\n\n            <ng-container [ngTemplateOutlet]=\"optionTemplate || defaultOptionTemplate\"\n                [ngTemplateOutletContext]=\"{option: option.value, api: optionApi}\">\n            </ng-container>\n\n        </li>\n    </ol>\n\n    <div *uxInfiniteScrollLoading>\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate || defaultLoadingTemplate\"></ng-container>\n    </div>\n\n    <div *ngIf=\"isInfiniteScroll() === false && (visibleOptions$ | async).length === 0 && loading\">\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate || defaultLoadingTemplate\"></ng-container>\n    </div>\n\n</div>\n<div *ngIf=\"(visibleOptions$ | async).length === 0 && !loading\">\n    <ng-container [ngTemplateOutlet]=\"noOptionsTemplate || defaultNoOptionsTemplate\">\n    </ng-container>\n</div>\n\n<ng-template #defaultLoadingTemplate>\n    <div class=\"ux-typeahead-loading\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n        <div>Loading...</div>\n    </div>\n</ng-template>\n\n<ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n</ng-template>\n\n<ng-template #defaultNoOptionsTemplate>\n    <span class=\"ux-typeahead-no-options\">No results</span>\n</ng-template>",
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
        { type: TypeaheadService, },
    ]; };
    TypeaheadComponent.propDecorators = {
        "id": [{ type: Input }, { type: HostBinding, args: ['attr.id',] },],
        "options": [{ type: Input },],
        "filter": [{ type: Input },],
        "open": [{ type: Input },],
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
        "selectOnEnter": [{ type: Input },],
        "loading": [{ type: Input },],
        "loadingTemplate": [{ type: Input },],
        "optionTemplate": [{ type: Input },],
        "noOptionsTemplate": [{ type: Input },],
        "optionSelected": [{ type: Output },],
        "highlightedChange": [{ type: Output },],
        "highlightedElementChange": [{ type: Output },],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF3QixNQUFNLEVBQWlCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBaUliLDRCQUNXLGtCQUNDO1FBRlosaUJBK0NDO1FBOUNVLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDZixhQUFRLEdBQVIsUUFBUTtrQkF6RDBCLGtCQUFnQixFQUFFLFFBQVU7MEJBYW5ELElBQUksWUFBWSxFQUFXOzZCQUtWLE1BQU07eUJBQ2pCLE9BQU87K0JBQzBDLEtBQUs7a0NBQzVDLElBQUk7d0JBQ2YsRUFBRTsyQkFDRSxJQUFJOzZCQUNGLEtBQUs7dUJBQ3BCLEtBQUs7OEJBTUcsSUFBSSxZQUFZLEVBQXdCO2lDQUVyQyxJQUFJLFlBQVksRUFBTzt3Q0FDaEIsSUFBSSxZQUFZLEVBQWU7K0JBR2xELElBQUksZUFBZSxDQUEyQixFQUFF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QUU7d0JBQ0YsTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLGNBQWMsRUFBRSxNQUFNO3dCQUN0QixpQkFBaUIsRUFBRSx3QkFBd0I7d0JBQzNDLG1CQUFtQixFQUFFLFdBQVc7cUJBQ25DO2lCQUNKOzs7O2dCQWhGbUIsVUFBVTtnQkFPckIsZ0JBQWdCOzs7dUJBNEVwQixLQUFLLFlBQUksV0FBVyxTQUFDLFNBQVM7NEJBRTlCLEtBQUs7MkJBQ0wsS0FBSzt5QkFFTCxLQUFLOytCQVFMLE1BQU07NEJBRU4sS0FBSzt3QkFDTCxLQUFLO29DQUNMLEtBQUs7a0NBQ0wsS0FBSzs4QkFDTCxLQUFLO29DQUNMLEtBQUssWUFBSSxXQUFXLFNBQUMsMkJBQTJCO3VDQUNoRCxLQUFLOzZCQUNMLEtBQUs7Z0NBQ0wsS0FBSztrQ0FDTCxLQUFLOzRCQUNMLEtBQUs7b0NBRUwsS0FBSzttQ0FDTCxLQUFLO3NDQUNMLEtBQUs7bUNBRUwsTUFBTTtzQ0FFTixNQUFNOzZDQUNOLE1BQU07cUNBdUZOLFlBQVksU0FBQyxXQUFXO21DQUt4QixZQUFZLFNBQUMsU0FBUzs7NkJBak4zQjs7U0FpRmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1ldmVudCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZFNlcnZpY2UgfSBmcm9tICcuL3R5cGVhaGVhZC5zZXJ2aWNlJztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtdHlwZWFoZWFkJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LXR5cGVhaGVhZC1vcHRpb25zXCJcbiAgICBbdXhJbmZpbml0ZVNjcm9sbF09XCJsb2FkT3B0aW9uc0NhbGxiYWNrXCJcbiAgICBbY29sbGVjdGlvbl09XCJ2aXNpYmxlT3B0aW9ucyQgfCBhc3luY1wiXG4gICAgKGNvbGxlY3Rpb25DaGFuZ2UpPVwidmlzaWJsZU9wdGlvbnMkLm5leHQoJGV2ZW50KVwiXG4gICAgW2VuYWJsZWRdPVwiaXNJbmZpbml0ZVNjcm9sbCgpXCJcbiAgICBbZmlsdGVyXT1cImZpbHRlclwiXG4gICAgW2xvYWRPblNjcm9sbF09XCJ0cnVlXCJcbiAgICBbcGFnZVNpemVdPVwicGFnZVNpemVcIlxuICAgIFtzY3JvbGxFbGVtZW50XT1cInR5cGVhaGVhZEVsZW1lbnRcIlxuICAgIChsb2FkaW5nKT1cImxvYWRpbmcgPSB0cnVlXCJcbiAgICAobG9hZGVkKT1cImxvYWRpbmcgPSBmYWxzZVwiPlxuXG4gICAgPG9sICpuZ0lmPVwiKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKS5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mICh2aXNpYmxlT3B0aW9ucyQgfCBhc3luYyk7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgW2F0dHIuaWRdPVwiaWQgKyAnLW9wdGlvbi0nICsgaVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChvcHRpb24pXCJcbiAgICAgICAgICAgIFtjbGFzcy5oaWdobGlnaHRlZF09XCJoaWdobGlnaHRlZEtleSA9PT0gb3B0aW9uLmtleVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIm11bHRpc2VsZWN0YWJsZSA/IGlzRGlzYWJsZWQob3B0aW9uKSA6IG51bGxcIlxuICAgICAgICAgICAgW3V4VHlwZWFoZWFkSGlnaGxpZ2h0XT1cImhpZ2hsaWdodGVkS2V5ID09PSBvcHRpb24ua2V5XCJcbiAgICAgICAgICAgIFt1eFNjcm9sbEludG9WaWV3SWZdPVwiaGlnaGxpZ2h0ZWRLZXkgPT09IG9wdGlvbi5rZXlcIlxuICAgICAgICAgICAgW3Njcm9sbFBhcmVudF09XCJ0eXBlYWhlYWRFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvcHRpb25Nb3VzZWRvd25IYW5kbGVyKCRldmVudClcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvbkNsaWNrSGFuZGxlcigkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJoaWdobGlnaHQob3B0aW9uKVwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm9wdGlvblRlbXBsYXRlIHx8IGRlZmF1bHRPcHRpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntvcHRpb246IG9wdGlvbi52YWx1ZSwgYXBpOiBvcHRpb25BcGl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2xpPlxuICAgIDwvb2w+XG5cbiAgICA8ZGl2ICp1eEluZmluaXRlU2Nyb2xsTG9hZGluZz5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsb2FkaW5nVGVtcGxhdGUgfHwgZGVmYXVsdExvYWRpbmdUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdJZj1cImlzSW5maW5pdGVTY3JvbGwoKSA9PT0gZmFsc2UgJiYgKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKS5sZW5ndGggPT09IDAgJiYgbG9hZGluZ1wiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvYWRpbmdUZW1wbGF0ZSB8fCBkZWZhdWx0TG9hZGluZ1RlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIih2aXNpYmxlT3B0aW9ucyQgfCBhc3luYykubGVuZ3RoID09PSAwICYmICFsb2FkaW5nXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJub09wdGlvbnNUZW1wbGF0ZSB8fCBkZWZhdWx0Tm9PcHRpb25zVGVtcGxhdGVcIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRMb2FkaW5nVGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInV4LXR5cGVhaGVhZC1sb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyIHNwaW5uZXItYWNjZW50IHNwaW5uZXItYm91bmNlLW1pZGRsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2PkxvYWRpbmcuLi48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdE9wdGlvblRlbXBsYXRlIGxldC1vcHRpb249XCJvcHRpb25cIiBsZXQtYXBpPVwiYXBpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ1eC10eXBlYWhlYWQtb3B0aW9uXCIgW2lubmVySHRtbF09XCJhcGkuZ2V0RGlzcGxheUh0bWwob3B0aW9uKVwiPjwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdE5vT3B0aW9uc1RlbXBsYXRlPlxuICAgIDxzcGFuIGNsYXNzPVwidXgtdHlwZWFoZWFkLW5vLW9wdGlvbnNcIj5ObyByZXN1bHRzPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5gLFxyXG4gICAgcHJvdmlkZXJzOiBbVHlwZWFoZWFkU2VydmljZV0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ3JvbGUnOiAnbGlzdGJveCcsXHJcbiAgICAgICAgJ1tjbGFzcy5vcGVuXSc6ICdvcGVuJyxcclxuICAgICAgICAnW2NsYXNzLmRyb3AtdXBdJzogJ2Ryb3BEaXJlY3Rpb24gPT09IFwidXBcIicsXHJcbiAgICAgICAgJ1tzdHlsZS5tYXhIZWlnaHRdJzogJ21heEhlaWdodCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKSBpZDogc3RyaW5nID0gYHV4LXR5cGVhaGVhZC0keysrdW5pcXVlSWR9YDtcclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgQElucHV0KCkgZmlsdGVyOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCBvcGVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLm9wZW4kLmdldFZhbHVlKCk7XHJcbiAgICB9XHJcbiAgICBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2Uub3BlbiQubmV4dCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBrZXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWRPcHRpb25zOiBhbnlbXTtcclxuICAgIEBJbnB1dCgpIGRyb3BEaXJlY3Rpb246ICd1cCcgfCAnZG93bicgPSAnZG93bic7XHJcbiAgICBASW5wdXQoKSBtYXhIZWlnaHQ6IHN0cmluZyA9ICcyNTBweCc7XHJcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGUnKSBtdWx0aXNlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIG9wZW5PbkZpbHRlckNoYW5nZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyID0gMjA7XHJcbiAgICBASW5wdXQoKSBzZWxlY3RGaXJzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBzZWxlY3RPbkVudGVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBsb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgb3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBub09wdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFR5cGVhaGVhZE9wdGlvbkV2ZW50PigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBoaWdobGlnaHRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIGhpZ2hsaWdodGVkRWxlbWVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnQ+KCk7XHJcblxyXG4gICAgbG9hZE9wdGlvbnNDYWxsYmFjazogSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb247XHJcbiAgICB2aXNpYmxlT3B0aW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFR5cGVhaGVhZFZpc2libGVPcHRpb25bXT4oW10pO1xyXG4gICAgY2xpY2tpbmcgPSBmYWxzZTtcclxuICAgIGhpZ2hsaWdodGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHlwZWFoZWFkVmlzaWJsZU9wdGlvbj4obnVsbCk7XHJcbiAgICBoaWdobGlnaHRlZEtleTogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBnZXQgaGlnaGxpZ2h0ZWQoKTogYW55IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaGlnaGxpZ2h0ZWQkLmdldFZhbHVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWUudmFsdWUgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gICAgb3B0aW9uQXBpOiBUeXBlYWhlYWRPcHRpb25BcGkgPSB7XHJcbiAgICAgICAgZ2V0S2V5OiB0aGlzLmdldEtleS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGdldERpc3BsYXk6IHRoaXMuZ2V0RGlzcGxheS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGdldERpc3BsYXlIdG1sOiB0aGlzLmdldERpc3BsYXlIdG1sLmJpbmQodGhpcylcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHR5cGVhaGVhZEVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljZTogVHlwZWFoZWFkU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZE9wdGlvbnNDYWxsYmFjayA9IChwYWdlTnVtOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIGZpbHRlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW52b2tlIHRoZSBjYWxsYmFjayB3aGljaCBtYXkgcmV0dXJuIGFuIGFycmF5IG9yIGEgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5T3JQcm9taXNlID0gdGhpcy5vcHRpb25zKHBhZ2VOdW0sIHBhZ2VTaXplLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1hcCB0aGUgcmVzdWx0cyB0byBhbiBhcnJheSBvZiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhcnJheU9yUHJvbWlzZSkudGhlbihuZXdPcHRpb25zID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld09wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld09wdGlvbnMubWFwKChvcHRpb246IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkob3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKG5leHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQobmV4dCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV4dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkS2V5ID0gbmV4dCA/IG5leHQua2V5IDogbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZENoYW5nZS5lbWl0KG5leHQgPyBuZXh0LnZhbHVlIDogbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5fc2VydmljZS5vcGVuJCwgdGhpcy5fc2VydmljZS5oaWdobGlnaHRlZEVsZW1lbnQkLCB0aGlzLnZpc2libGVPcHRpb25zJClcclxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtvcGVuLCBoaWdobGlnaHRlZEVsZW1lbnQsIHZpc2libGVPcHRpb25zXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UuZW1pdChvcGVuICYmIHZpc2libGVPcHRpb25zLmxlbmd0aCA+IDAgPyBoaWdobGlnaHRlZEVsZW1lbnQgOiBudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIC8vIE9wZW4gdGhlIGRyb3Bkb3duIGlmIHRoZSBmaWx0ZXIgdmFsdWUgdXBkYXRlc1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuT25GaWx0ZXJDaGFuZ2UgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZS1maWx0ZXIgdmlzaWJsZU9wdGlvbnNcclxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicpXHJcbiAgICBtb3VzZWRvd25IYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMuY2xpY2tpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnKVxyXG4gICAgbW91c2V1cEhhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbk1vdXNlZG93bkhhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIHRvIHByZXZlbnQgZm9jdXMgY2hhbmdpbmcgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9uQ2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdChvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdW5pcXVlIGtleSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXRLZXkob3B0aW9uOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5rZXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5rZXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbiAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkodGhpcy5rZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc3BsYXkob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uIHdpdGggSFRNTCBtYXJrdXAgYWRkZWQgdG8gaGlnaGxpZ2h0IHRoZSBwYXJ0IHdoaWNoIG1hdGNoZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlLlxyXG4gICAgICogQHBhcmFtIG9wdGlvblxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5SHRtbChvcHRpb246IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYXlUZXh0ID0gdGhpcy5nZXREaXNwbGF5KG9wdGlvbikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgICAgIGxldCBkaXNwbGF5SHRtbCA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmZpbHRlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBkaXNwbGF5VGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBoaWdobGlnaHQgPSBgPHNwYW4gY2xhc3M9XCJ1eC1maWx0ZXItbWF0Y2hcIj4ke2Rpc3BsYXlUZXh0LnN1YnN0cihtYXRjaEluZGV4LCBsZW5ndGgpfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUh0bWwgPSBkaXNwbGF5VGV4dC5zdWJzdHIoMCwgbWF0Y2hJbmRleCkgKyBoaWdobGlnaHQgKyBkaXNwbGF5VGV4dC5zdWJzdHIobWF0Y2hJbmRleCArIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlIdG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbmZpbml0ZSBzY3JvbGwgY29tcG9uZW50IHNob3VsZCBsb2FkXHJcbiAgICAgKi9cclxuICAgIGlzSW5maW5pdGVTY3JvbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3RzIHRoZSBnaXZlbiBvcHRpb24sIGVtaXR0aW5nIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCBhbmQgY2xvc2luZyB0aGUgZHJvcGRvd24uXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdChuZXcgVHlwZWFoZWFkT3B0aW9uRXZlbnQob3B0aW9uLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb3B0aW9uIGlzIHBhcnQgb2YgdGhlIGRpc2FibGVkT3B0aW9ucyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaXNEaXNhYmxlZChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kaXNhYmxlZE9wdGlvbnMuZmluZCgoc2VsZWN0ZWRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEtleShzZWxlY3RlZE9wdGlvbikgPT09IG9wdGlvbi5rZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgZ2l2ZW4gb3B0aW9uIGFzIHRoZSBjdXJyZW50IGhpZ2hsaWdodGVkIG9wdGlvbiwgYXZhaWxhYmxlIGluIHRoZSBoaWdobGlnaHRlZE9wdGlvbiBwYXJhbWV0ZXIuXHJcbiAgICAgKi9cclxuICAgIGhpZ2hsaWdodChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmNyZW1lbnQgb3IgZGVjcmVtZW50IHRoZSBoaWdobGlnaHRlZCBvcHRpb24gaW4gdGhlIGxpc3QuIERpc2FibGVkIG9wdGlvbnMgYXJlIHNraXBwZWQuXHJcbiAgICAgKiBAcGFyYW0gZCBWYWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgaW5kZXggb2YgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiwgaS5lLiAtMSB0byBtb3ZlIGJhY2t3YXJkcywgKzEgdG8gbW92ZSBmb3J3YXJkcy5cclxuICAgICAqL1xyXG4gICAgbW92ZUhpZ2hsaWdodChkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy52aXNpYmxlT3B0aW9ucyQuZ2V0VmFsdWUoKTtcclxuICAgICAgICBjb25zdCBoaWdobGlnaHRJbmRleCA9IHRoaXMuaW5kZXhPZlZpc2libGVPcHRpb24odGhpcy5oaWdobGlnaHRlZCk7XHJcbiAgICAgICAgbGV0IG5ld0luZGV4ID0gaGlnaGxpZ2h0SW5kZXg7XHJcbiAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaW5Cb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCArIGQ7XHJcbiAgICAgICAgICAgIGluQm91bmRzID0gKG5ld0luZGV4ID49IDAgJiYgbmV3SW5kZXggPCB2aXNpYmxlT3B0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBkaXNhYmxlZCA9IGluQm91bmRzICYmIHRoaXMuaXNEaXNhYmxlZCh2aXNpYmxlT3B0aW9uc1tuZXdJbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoaW5Cb3VuZHMgJiYgZGlzYWJsZWQpO1xyXG5cclxuICAgICAgICBpZiAoIWRpc2FibGVkICYmIGluQm91bmRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQodmlzaWJsZU9wdGlvbnNbbmV3SW5kZXhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEhpZ2hsaWdodGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHsgdmFsdWU6IHRoaXMuaGlnaGxpZ2h0ZWQsIGtleTogdGhpcy5nZXRLZXkodGhpcy5oaWdobGlnaHRlZCl9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdXAgdGhlIG9wdGlvbnMgYmVmb3JlIHRoZSBkcm9wZG93biBpcyBkaXNwbGF5ZWQuXHJcbiAgICAgKi9cclxuICAgIGluaXRPcHRpb25zKCkge1xyXG4gICAgICAgIC8vIENsZWFyIHByZXZpb3VzIGhpZ2hsaWdodFxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQobnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3QpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyB3aWxsIGhpZ2hsaWdodCB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIG9wdGlvbi5cclxuICAgICAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgdmlzaWJsZU9wdGlvbnMgYXJyYXkgd2l0aCB0aGUgY3VycmVudCBmaWx0ZXIuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZU9wdGlvbnMoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGlzZWRJbnB1dCA9ICh0aGlzLmZpbHRlciB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERpc3BsYXkob3B0aW9uKS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXNlZElucHV0KSA+PSAwO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucyQubmV4dCh2aXNpYmxlT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBnaXZlbiBvcHRpb24gaW4gdGhlIHZpc2libGVPcHRpb25zIGFycmF5LiBSZXR1cm5zIC0xIGlmIHRoZSBvcHRpb24gaXMgbm90IGN1cnJlbnRseSB2aXNpYmxlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluZGV4T2ZWaXNpYmxlT3B0aW9uKG9wdGlvbjogYW55KTogbnVtYmVyIHtcclxuICAgICAgICBpZiAob3B0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbktleSA9IHRoaXMuZ2V0S2V5KG9wdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zJC5nZXRWYWx1ZSgpLmZpbmRJbmRleCgoZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbC5rZXkgPT09IG9wdGlvbktleTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgQVBJIGF2YWlsYWJsZSB0byBvcHRpb24gdGVtcGxhdGVzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlYWhlYWRPcHRpb25BcGkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdW5pcXVlIGtleSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXRLZXkob3B0aW9uOiBhbnkpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXkob3B0aW9uOiBhbnkpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24gd2l0aCBIVE1MIG1hcmt1cCBhZGRlZCB0byBoaWdobGlnaHQgdGhlIHBhcnQgd2hpY2ggbWF0Y2hlcyB0aGUgY3VycmVudCBmaWx0ZXIgdmFsdWUuIE92ZXJyaWRlIHRoZSB1eC1maWx0ZXItbWF0Y2ggY2xhc3MgaW4gQ1NTIHRvIG1vZGlmeSB0aGUgZGVmYXVsdCBhcHBlYXJhbmNlLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5SHRtbChvcHRpb246IGFueSk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uIHtcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICBrZXk6IHN0cmluZztcclxufSJdfQ==