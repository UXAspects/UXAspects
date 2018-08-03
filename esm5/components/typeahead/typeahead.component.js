/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadService } from './typeahead.service';
var /** @type {?} */ uniqueId = 0;
var TypeaheadComponent = /** @class */ (function () {
    function TypeaheadComponent(typeaheadElement, _changeDetector, _service) {
        var _this = this;
        this.typeaheadElement = typeaheadElement;
        this._changeDetector = _changeDetector;
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
            this._changeDetector.detectChanges();
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
            this.highlight(visibleOptions[newIndex]);
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
        this._changeDetector.detectChanges();
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
                }] }
    ];
    /** @nocollapse */
    TypeaheadComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: TypeaheadService }
    ]; };
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
    return TypeaheadComponent;
}());
export { TypeaheadComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF3QixNQUFNLEVBQWlCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuTCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBc0ViLDRCQUNXLGtCQUNDLGlCQUNBO1FBSFosaUJBZ0RDO1FBL0NVLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDZixvQkFBZSxHQUFmLGVBQWU7UUFDZixhQUFRLEdBQVIsUUFBUTtrQkExRDBCLGtCQUFnQixFQUFFLFFBQVU7MEJBYW5ELElBQUksWUFBWSxFQUFXOzZCQUtWLE1BQU07eUJBQ2pCLE9BQU87K0JBQzBDLEtBQUs7a0NBQzVDLElBQUk7d0JBQ2YsRUFBRTsyQkFDRSxJQUFJOzZCQUNGLEtBQUs7dUJBQ3BCLEtBQUs7OEJBTUcsSUFBSSxZQUFZLEVBQXdCO2lDQUVyQyxJQUFJLFlBQVksRUFBTzt3Q0FDaEIsSUFB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QUFDLFVBQUMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssV0FBUyxDQUFDO2FBQy9CLENBQUMsQ0FBQztTQUNOO1FBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Z0JBNVRqQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLHU5RUFBdUM7b0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixJQUFJLEVBQUU7d0JBQ0YsTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLGNBQWMsRUFBRSxNQUFNO3dCQUN0QixpQkFBaUIsRUFBRSx3QkFBd0I7d0JBQzNDLG1CQUFtQixFQUFFLFdBQVc7cUJBQ25DO2lCQUNKOzs7O2dCQXJCc0MsVUFBVTtnQkFBeEMsaUJBQWlCO2dCQU9qQixnQkFBZ0I7OztxQkFpQnBCLEtBQUssWUFBSSxXQUFXLFNBQUMsU0FBUzswQkFFOUIsS0FBSzt5QkFDTCxLQUFLO3VCQUVMLEtBQUs7NkJBUUwsTUFBTTswQkFFTixLQUFLO3NCQUNMLEtBQUs7a0NBQ0wsS0FBSztnQ0FDTCxLQUFLOzRCQUNMLEtBQUs7a0NBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQywyQkFBMkI7cUNBQ2hELEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLO2dDQUNMLEtBQUs7MEJBQ0wsS0FBSztrQ0FFTCxLQUFLO2lDQUNMLEtBQUs7b0NBQ0wsS0FBSztpQ0FFTCxNQUFNO29DQUVOLE1BQU07MkNBQ04sTUFBTTttQ0F3Rk4sWUFBWSxTQUFDLFdBQVc7aUNBS3hCLFlBQVksU0FBQyxTQUFTOzs2QkF2SjNCOztTQXNCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1ldmVudCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZFNlcnZpY2UgfSBmcm9tICcuL3R5cGVhaGVhZC5zZXJ2aWNlJztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtdHlwZWFoZWFkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAndHlwZWFoZWFkLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW1R5cGVhaGVhZFNlcnZpY2VdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdyb2xlJzogJ2xpc3Rib3gnLFxyXG4gICAgICAgICdbY2xhc3Mub3Blbl0nOiAnb3BlbicsXHJcbiAgICAgICAgJ1tjbGFzcy5kcm9wLXVwXSc6ICdkcm9wRGlyZWN0aW9uID09PSBcInVwXCInLFxyXG4gICAgICAgICdbc3R5bGUubWF4SGVpZ2h0XSc6ICdtYXhIZWlnaHQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC10eXBlYWhlYWQtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55W10gfCBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIEBJbnB1dCgpIGZpbHRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgb3BlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZS5vcGVuJC5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IG9wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4kLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc3BsYXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkga2V5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkT3B0aW9uczogYW55W107XHJcbiAgICBASW5wdXQoKSBkcm9wRGlyZWN0aW9uOiAndXAnIHwgJ2Rvd24nID0gJ2Rvd24nO1xyXG4gICAgQElucHV0KCkgbWF4SGVpZ2h0OiBzdHJpbmcgPSAnMjUwcHgnO1xyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlJykgbXVsdGlzZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBvcGVuT25GaWx0ZXJDaGFuZ2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlciA9IDIwO1xyXG4gICAgQElucHV0KCkgc2VsZWN0Rmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgc2VsZWN0T25FbnRlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgbG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgbm9PcHRpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUeXBlYWhlYWRPcHRpb25FdmVudD4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgaGlnaGxpZ2h0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBoaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xyXG5cclxuICAgIGxvYWRPcHRpb25zQ2FsbGJhY2s6IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgdmlzaWJsZU9wdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUeXBlYWhlYWRWaXNpYmxlT3B0aW9uW10+KFtdKTtcclxuICAgIGNsaWNraW5nID0gZmFsc2U7XHJcbiAgICBoaWdobGlnaHRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFR5cGVhaGVhZFZpc2libGVPcHRpb24+KG51bGwpO1xyXG4gICAgaGlnaGxpZ2h0ZWRLZXk6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgZ2V0IGhpZ2hsaWdodGVkKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmhpZ2hsaWdodGVkJC5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnZhbHVlIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgIG9wdGlvbkFwaTogVHlwZWFoZWFkT3B0aW9uQXBpID0ge1xyXG4gICAgICAgIGdldEtleTogdGhpcy5nZXRLZXkuYmluZCh0aGlzKSxcclxuICAgICAgICBnZXREaXNwbGF5OiB0aGlzLmdldERpc3BsYXkuYmluZCh0aGlzKSxcclxuICAgICAgICBnZXREaXNwbGF5SHRtbDogdGhpcy5nZXREaXNwbGF5SHRtbC5iaW5kKHRoaXMpXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB0eXBlYWhlYWRFbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNlOiBUeXBlYWhlYWRTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkT3B0aW9uc0NhbGxiYWNrID0gKHBhZ2VOdW06IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgZmlsdGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIHdoaWNoIG1heSByZXR1cm4gYW4gYXJyYXkgb3IgYSBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJyYXlPclByb21pc2UgPSB0aGlzLm9wdGlvbnMocGFnZU51bSwgcGFnZVNpemUsIGZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWFwIHRoZSByZXN1bHRzIHRvIGFuIGFycmF5IG9mIFR5cGVhaGVhZFZpc2libGVPcHRpb24uXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFycmF5T3JQcm9taXNlKS50aGVuKG5ld09wdGlvbnMgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobmV3T3B0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3T3B0aW9ucy5tYXAoKG9wdGlvbjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleShvcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4kLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChuZXh0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKChuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRLZXkgPSBuZXh0ID8gbmV4dC5rZXkgOiBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkQ2hhbmdlLmVtaXQobmV4dCA/IG5leHQudmFsdWUgOiBudWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLl9zZXJ2aWNlLm9wZW4kLCB0aGlzLl9zZXJ2aWNlLmhpZ2hsaWdodGVkRWxlbWVudCQsIHRoaXMudmlzaWJsZU9wdGlvbnMkKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW29wZW4sIGhpZ2hsaWdodGVkRWxlbWVudCwgdmlzaWJsZU9wdGlvbnNdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRWxlbWVudENoYW5nZS5lbWl0KG9wZW4gJiYgdmlzaWJsZU9wdGlvbnMubGVuZ3RoID4gMCA/IGhpZ2hsaWdodGVkRWxlbWVudCA6IG51bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgLy8gT3BlbiB0aGUgZHJvcGRvd24gaWYgdGhlIGZpbHRlciB2YWx1ZSB1cGRhdGVzXHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5PbkZpbHRlckNoYW5nZSAmJiBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlLWZpbHRlciB2aXNpYmxlT3B0aW9uc1xyXG4gICAgICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJylcclxuICAgIG1vdXNlZG93bkhhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja2luZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcpXHJcbiAgICBtb3VzZXVwSGFuZGxlcigpIHtcclxuICAgICAgICB0aGlzLmNsaWNraW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9uTW91c2Vkb3duSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIFdvcmthcm91bmQgdG8gcHJldmVudCBmb2N1cyBjaGFuZ2luZyB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25DbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0KG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldEtleShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmtleSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmtleSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMua2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheShvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJyAmJiBvcHRpb24gJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24gd2l0aCBIVE1MIG1hcmt1cCBhZGRlZCB0byBoaWdobGlnaHQgdGhlIHBhcnQgd2hpY2ggbWF0Y2hlcyB0aGUgY3VycmVudCBmaWx0ZXIgdmFsdWUuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlIdG1sKG9wdGlvbjogYW55KSB7XHJcbiAgICAgICAgY29uc3QgZGlzcGxheVRleHQgPSB0aGlzLmdldERpc3BsYXkob3B0aW9uKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XHJcbiAgICAgICAgbGV0IGRpc3BsYXlIdG1sID0gZGlzcGxheVRleHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuZmlsdGVyLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IGRpc3BsYXlUZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhpZ2hsaWdodCA9IGA8c3BhbiBjbGFzcz1cInV4LWZpbHRlci1tYXRjaFwiPiR7ZGlzcGxheVRleHQuc3Vic3RyKG1hdGNoSW5kZXgsIGxlbmd0aCl9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5SHRtbCA9IGRpc3BsYXlUZXh0LnN1YnN0cigwLCBtYXRjaEluZGV4KSArIGhpZ2hsaWdodCArIGRpc3BsYXlUZXh0LnN1YnN0cihtYXRjaEluZGV4ICsgbGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlzcGxheUh0bWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGluZmluaXRlIHNjcm9sbCBjb21wb25lbnQgc2hvdWxkIGxvYWRcclxuICAgICAqL1xyXG4gICAgaXNJbmZpbml0ZVNjcm9sbCgpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdHMgdGhlIGdpdmVuIG9wdGlvbiwgZW1pdHRpbmcgdGhlIG9wdGlvblNlbGVjdGVkIGV2ZW50IGFuZCBjbG9zaW5nIHRoZSBkcm9wZG93bi5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0KG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKG9wdGlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KG5ldyBUeXBlYWhlYWRPcHRpb25FdmVudChvcHRpb24udmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvcHRpb24gaXMgcGFydCBvZiB0aGUgZGlzYWJsZWRPcHRpb25zIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpc0Rpc2FibGVkKG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkT3B0aW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRpc2FibGVkT3B0aW9ucy5maW5kKChzZWxlY3RlZE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5KHNlbGVjdGVkT3B0aW9uKSA9PT0gb3B0aW9uLmtleTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBnaXZlbiBvcHRpb24gYXMgdGhlIGN1cnJlbnQgaGlnaGxpZ2h0ZWQgb3B0aW9uLCBhdmFpbGFibGUgaW4gdGhlIGhpZ2hsaWdodGVkT3B0aW9uIHBhcmFtZXRlci5cclxuICAgICAqL1xyXG4gICAgaGlnaGxpZ2h0KG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKG9wdGlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChvcHRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jcmVtZW50IG9yIGRlY3JlbWVudCB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGluIHRoZSBsaXN0LiBEaXNhYmxlZCBvcHRpb25zIGFyZSBza2lwcGVkLlxyXG4gICAgICogQHBhcmFtIGQgVmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIGluZGV4IG9mIHRoZSBoaWdobGlnaHRlZCBvcHRpb24sIGkuZS4gLTEgdG8gbW92ZSBiYWNrd2FyZHMsICsxIHRvIG1vdmUgZm9yd2FyZHMuXHJcbiAgICAgKi9cclxuICAgIG1vdmVIaWdobGlnaHQoZDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMudmlzaWJsZU9wdGlvbnMkLmdldFZhbHVlKCk7XHJcbiAgICAgICAgY29uc3QgaGlnaGxpZ2h0SW5kZXggPSB0aGlzLmluZGV4T2ZWaXNpYmxlT3B0aW9uKHRoaXMuaGlnaGxpZ2h0ZWQpO1xyXG4gICAgICAgIGxldCBuZXdJbmRleCA9IGhpZ2hsaWdodEluZGV4O1xyXG4gICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IGluQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggKyBkO1xyXG4gICAgICAgICAgICBpbkJvdW5kcyA9IChuZXdJbmRleCA+PSAwICYmIG5ld0luZGV4IDwgdmlzaWJsZU9wdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBpbkJvdW5kcyAmJiB0aGlzLmlzRGlzYWJsZWQodmlzaWJsZU9wdGlvbnNbbmV3SW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGluQm91bmRzICYmIGRpc2FibGVkKTtcclxuXHJcbiAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBpbkJvdW5kcykge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCh2aXNpYmxlT3B0aW9uc1tuZXdJbmRleF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0SGlnaGxpZ2h0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoeyB2YWx1ZTogdGhpcy5oaWdobGlnaHRlZCwga2V5OiB0aGlzLmdldEtleSh0aGlzLmhpZ2hsaWdodGVkKX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB1cCB0aGUgb3B0aW9ucyBiZWZvcmUgdGhlIGRyb3Bkb3duIGlzIGRpc3BsYXllZC5cclxuICAgICAqL1xyXG4gICAgaW5pdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgLy8gQ2xlYXIgcHJldmlvdXMgaGlnaGxpZ2h0XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RGaXJzdCkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgaGlnaGxpZ2h0IHRoZSBmaXJzdCBub24tZGlzYWJsZWQgb3B0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSB2aXNpYmxlT3B0aW9ucyBhcnJheSB3aXRoIHRoZSBjdXJyZW50IGZpbHRlci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlT3B0aW9ucygpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXNlZElucHV0ID0gKHRoaXMuZmlsdGVyIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheShvcHRpb24pLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpc2VkSW5wdXQpID49IDA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkodmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zJC5uZXh0KHZpc2libGVPcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gb3B0aW9uIGluIHRoZSB2aXNpYmxlT3B0aW9ucyBhcnJheS4gUmV0dXJucyAtMSBpZiB0aGUgb3B0aW9uIGlzIG5vdCBjdXJyZW50bHkgdmlzaWJsZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbmRleE9mVmlzaWJsZU9wdGlvbihvcHRpb246IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25LZXkgPSB0aGlzLmdldEtleShvcHRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlT3B0aW9ucyQuZ2V0VmFsdWUoKS5maW5kSW5kZXgoKGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwua2V5ID09PSBvcHRpb25LZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEFQSSBhdmFpbGFibGUgdG8gb3B0aW9uIHRlbXBsYXRlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkT3B0aW9uQXBpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBrZXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0S2V5KG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uIHdpdGggSFRNTCBtYXJrdXAgYWRkZWQgdG8gaGlnaGxpZ2h0IHRoZSBwYXJ0IHdoaWNoIG1hdGNoZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlLiBPdmVycmlkZSB0aGUgdXgtZmlsdGVyLW1hdGNoIGNsYXNzIGluIENTUyB0byBtb2RpZnkgdGhlIGRlZmF1bHQgYXBwZWFyYW5jZS5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheUh0bWwob3B0aW9uOiBhbnkpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkVmlzaWJsZU9wdGlvbiB7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbn0iXX0=