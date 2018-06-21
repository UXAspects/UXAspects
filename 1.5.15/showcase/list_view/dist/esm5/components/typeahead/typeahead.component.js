/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged } from 'rxjs/operators';
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
        this._open = false;
        this._subscription = new Subscription();
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = function (pageNum, pageSize, filter) {
            if (typeof _this.options === 'function') {
                return _this.options(pageNum, pageSize, filter);
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
        var /** @type {?} */ displayText;
        if (typeof option === 'string') {
            displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        else {
            displayText = this.getDisplay(option.name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
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
                    template: "<div class=\"ux-typeahead-options\"\n    [uxInfiniteScroll]=\"loadOptionsCallback\"\n    [collection]=\"visibleOptions$ | async\"\n    (collectionChange)=\"visibleOptions$.next($event)\"\n    [enabled]=\"isInfiniteScroll()\"\n    [filter]=\"filter\"\n    [loadOnScroll]=\"true\"\n    [pageSize]=\"pageSize\"\n    [scrollElement]=\"typeaheadElement\"\n    (loading)=\"loading = true\"\n    (loaded)=\"loading = false\">\n\n    <ol *ngIf=\"(visibleOptions$ | async).length > 0\">\n        <li *ngFor=\"let option of (visibleOptions$ | async); let i = index\"\n            [attr.id]=\"id + '-option-' + i\"\n            [class.disabled]=\"isDisabled(option)\"\n            [class.highlighted]=\"(highlighted$ | async).key === option.key\"\n            [attr.aria-selected]=\"multiselectable ? isDisabled(option) : null\"\n            [uxTypeaheadHighlight]=\"(highlighted$ | async).key === option.key\"\n            [uxScrollIntoViewIf]=\"(highlighted$ | async).key === option.key\"\n            [scrollParent]=\"typeaheadElement.nativeElement\"\n            (mousedown)=\"optionMousedownHandler($event)\"\n            (click)=\"optionClickHandler($event, option)\"\n            (mouseover)=\"highlight(option)\">\n\n            <ng-container [ngTemplateOutlet]=\"optionTemplate\"\n                [ngTemplateOutletContext]=\"{option: option.value, api: optionApi}\">\n            </ng-container>\n\n        </li>\n    </ol>\n\n    <div *uxInfiniteScrollLoading>\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate\">\n        </ng-container>\n    </div>\n\n</div>\n<div *ngIf=\"(visibleOptions$ | async).length === 0 && !loading\">\n    <ng-container [ngTemplateOutlet]=\"noOptionsTemplate\">\n    </ng-container>\n</div>\n\n<ng-template #defaultLoadingTemplate>\n    <div class=\"ux-typeahead-loading\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n        <div>Loading...</div>\n    </div>\n</ng-template>\n\n<ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n</ng-template>\n\n<ng-template #defaultNoOptionsTemplate>\n    <span class=\"ux-typeahead-no-options\">No results</span>\n</ng-template>",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFpQixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdNLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBaUliLDRCQUNXLGtCQUNDLFFBQ0E7UUFIWixpQkFtQ0M7UUFsQ1UscUJBQWdCLEdBQWhCLGdCQUFnQjtRQUNmLFdBQU0sR0FBTixNQUFNO1FBQ04sYUFBUSxHQUFSLFFBQVE7a0JBN0QwQixrQkFBZ0IsRUFBRSxRQUFVOzBCQWFuRCxJQUFJLFlBQVksRUFBVzs2QkFLVixNQUFNO3lCQUNqQixPQUFPOytCQUMwQyxLQUFLO2tDQUM1QyxJQUFJO3dCQUNmLEVBQUU7MkJBQ0UsSUFBSTs4QkFNVCxJQUFJLFlBQVksRUFBd0I7aUNBRXJDLElBQUksWUFBWSxFQUFPO3dDQUNoQixJQUFJLFlBQVksRUFBZTsrQkFPbEQsSUFB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RixNQUFNLEVBQUUsU0FBUzt3QkFDakIsY0FBYyxFQUFFLE1BQU07d0JBQ3RCLGlCQUFpQixFQUFFLHdCQUF3Qjt3QkFDM0MsbUJBQW1CLEVBQUUsV0FBVztxQkFDbkM7aUJBQ0o7Ozs7Z0JBN0VxRCxVQUFVO2dCQUF4QyxpQkFBaUI7Z0JBT2hDLGdCQUFnQjs7O3VCQXlFcEIsS0FBSyxZQUFJLFdBQVcsU0FBQyxTQUFTOzRCQUU5QixLQUFLOzJCQUNMLEtBQUs7eUJBRUwsS0FBSyxTQUFDLE1BQU07K0JBUVosTUFBTTs0QkFFTixLQUFLO3dCQUNMLEtBQUs7b0NBQ0wsS0FBSztrQ0FDTCxLQUFLOzhCQUNMLEtBQUs7b0NBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQywyQkFBMkI7dUNBQ2hELEtBQUs7NkJBQ0wsS0FBSztnQ0FDTCxLQUFLO29DQUVMLEtBQUs7bUNBQ0wsS0FBSztzQ0FDTCxLQUFLO21DQUVMLE1BQU07c0NBRU4sTUFBTTs2Q0FDTixNQUFNOzRDQUVOLFNBQVMsU0FBQyx3QkFBd0I7MkNBQ2xDLFNBQVMsU0FBQyx1QkFBdUI7OENBQ2pDLFNBQVMsU0FBQywwQkFBMEI7cUNBOEZwQyxZQUFZLFNBQUMsV0FBVzttQ0FLeEIsWUFBWSxTQUFDLFNBQVM7OzZCQXZOM0I7O1NBOEVhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1ldmVudCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZFNlcnZpY2UgfSBmcm9tICcuL3R5cGVhaGVhZC5zZXJ2aWNlJztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtdHlwZWFoZWFkJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LXR5cGVhaGVhZC1vcHRpb25zXCJcbiAgICBbdXhJbmZpbml0ZVNjcm9sbF09XCJsb2FkT3B0aW9uc0NhbGxiYWNrXCJcbiAgICBbY29sbGVjdGlvbl09XCJ2aXNpYmxlT3B0aW9ucyQgfCBhc3luY1wiXG4gICAgKGNvbGxlY3Rpb25DaGFuZ2UpPVwidmlzaWJsZU9wdGlvbnMkLm5leHQoJGV2ZW50KVwiXG4gICAgW2VuYWJsZWRdPVwiaXNJbmZpbml0ZVNjcm9sbCgpXCJcbiAgICBbZmlsdGVyXT1cImZpbHRlclwiXG4gICAgW2xvYWRPblNjcm9sbF09XCJ0cnVlXCJcbiAgICBbcGFnZVNpemVdPVwicGFnZVNpemVcIlxuICAgIFtzY3JvbGxFbGVtZW50XT1cInR5cGVhaGVhZEVsZW1lbnRcIlxuICAgIChsb2FkaW5nKT1cImxvYWRpbmcgPSB0cnVlXCJcbiAgICAobG9hZGVkKT1cImxvYWRpbmcgPSBmYWxzZVwiPlxuXG4gICAgPG9sICpuZ0lmPVwiKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKS5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mICh2aXNpYmxlT3B0aW9ucyQgfCBhc3luYyk7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgW2F0dHIuaWRdPVwiaWQgKyAnLW9wdGlvbi0nICsgaVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChvcHRpb24pXCJcbiAgICAgICAgICAgIFtjbGFzcy5oaWdobGlnaHRlZF09XCIoaGlnaGxpZ2h0ZWQkIHwgYXN5bmMpLmtleSA9PT0gb3B0aW9uLmtleVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIm11bHRpc2VsZWN0YWJsZSA/IGlzRGlzYWJsZWQob3B0aW9uKSA6IG51bGxcIlxuICAgICAgICAgICAgW3V4VHlwZWFoZWFkSGlnaGxpZ2h0XT1cIihoaWdobGlnaHRlZCQgfCBhc3luYykua2V5ID09PSBvcHRpb24ua2V5XCJcbiAgICAgICAgICAgIFt1eFNjcm9sbEludG9WaWV3SWZdPVwiKGhpZ2hsaWdodGVkJCB8IGFzeW5jKS5rZXkgPT09IG9wdGlvbi5rZXlcIlxuICAgICAgICAgICAgW3Njcm9sbFBhcmVudF09XCJ0eXBlYWhlYWRFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvcHRpb25Nb3VzZWRvd25IYW5kbGVyKCRldmVudClcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvbkNsaWNrSGFuZGxlcigkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJoaWdobGlnaHQob3B0aW9uKVwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm9wdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie29wdGlvbjogb3B0aW9uLnZhbHVlLCBhcGk6IG9wdGlvbkFwaX1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvbGk+XG4gICAgPC9vbD5cblxuICAgIDxkaXYgKnV4SW5maW5pdGVTY3JvbGxMb2FkaW5nPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvYWRpbmdUZW1wbGF0ZVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKS5sZW5ndGggPT09IDAgJiYgIWxvYWRpbmdcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm5vT3B0aW9uc1RlbXBsYXRlXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0TG9hZGluZ1RlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ1eC10eXBlYWhlYWQtbG9hZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lciBzcGlubmVyLWFjY2VudCBzcGlubmVyLWJvdW5jZS1taWRkbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdj5Mb2FkaW5nLi4uPC9kaXY+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRPcHRpb25UZW1wbGF0ZSBsZXQtb3B0aW9uPVwib3B0aW9uXCIgbGV0LWFwaT1cImFwaVwiPlxuICAgIDxzcGFuIGNsYXNzPVwidXgtdHlwZWFoZWFkLW9wdGlvblwiIFtpbm5lckh0bWxdPVwiYXBpLmdldERpc3BsYXlIdG1sKG9wdGlvbilcIj48L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHROb09wdGlvbnNUZW1wbGF0ZT5cbiAgICA8c3BhbiBjbGFzcz1cInV4LXR5cGVhaGVhZC1uby1vcHRpb25zXCI+Tm8gcmVzdWx0czwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+YCxcclxuICAgIHByb3ZpZGVyczogW1R5cGVhaGVhZFNlcnZpY2VdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdyb2xlJzogJ2xpc3Rib3gnLFxyXG4gICAgICAgICdbY2xhc3Mub3Blbl0nOiAnb3BlbicsXHJcbiAgICAgICAgJ1tjbGFzcy5kcm9wLXVwXSc6ICdkcm9wRGlyZWN0aW9uID09PSBcInVwXCInLFxyXG4gICAgICAgICdbc3R5bGUubWF4SGVpZ2h0XSc6ICdtYXhIZWlnaHQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC10eXBlYWhlYWQtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55W10gfCBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIEBJbnB1dCgpIGZpbHRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgnb3BlbicpXHJcbiAgICBnZXQgb3BlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZS5vcGVuJC5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IG9wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4kLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc3BsYXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkga2V5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkT3B0aW9uczogYW55W107XHJcbiAgICBASW5wdXQoKSBkcm9wRGlyZWN0aW9uOiAndXAnIHwgJ2Rvd24nID0gJ2Rvd24nO1xyXG4gICAgQElucHV0KCkgbWF4SGVpZ2h0OiBzdHJpbmcgPSAnMjUwcHgnO1xyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlJykgbXVsdGlzZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBvcGVuT25GaWx0ZXJDaGFuZ2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlciA9IDIwO1xyXG4gICAgQElucHV0KCkgc2VsZWN0Rmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgbm9PcHRpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUeXBlYWhlYWRPcHRpb25FdmVudD4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgaGlnaGxpZ2h0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBoaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRMb2FkaW5nVGVtcGxhdGUnKSBwcml2YXRlIF9kZWZhdWx0TG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdE9wdGlvblRlbXBsYXRlJykgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdE5vT3B0aW9uc1RlbXBsYXRlJykgcHJpdmF0ZSBfZGVmYXVsdE5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGxvYWRPcHRpb25zQ2FsbGJhY2s6IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgdmlzaWJsZU9wdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUeXBlYWhlYWRWaXNpYmxlT3B0aW9uW10+KFtdKTtcclxuICAgIGxvYWRpbmcgPSBmYWxzZTtcclxuICAgIGNsaWNraW5nID0gZmFsc2U7XHJcbiAgICBoaWdobGlnaHRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFR5cGVhaGVhZFZpc2libGVPcHRpb24+KG51bGwpO1xyXG5cclxuICAgIGdldCBoaWdobGlnaHRlZCgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oaWdobGlnaHRlZCQuZ2V0VmFsdWUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS52YWx1ZSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG5cclxuICAgIG9wdGlvbkFwaTogVHlwZWFoZWFkT3B0aW9uQXBpID0ge1xyXG4gICAgICAgIGdldEtleTogdGhpcy5nZXRLZXkuYmluZCh0aGlzKSxcclxuICAgICAgICBnZXREaXNwbGF5OiB0aGlzLmdldERpc3BsYXkuYmluZCh0aGlzKSxcclxuICAgICAgICBnZXREaXNwbGF5SHRtbDogdGhpcy5nZXREaXNwbGF5SHRtbC5iaW5kKHRoaXMpXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB0eXBlYWhlYWRFbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNlOiBUeXBlYWhlYWRTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkT3B0aW9uc0NhbGxiYWNrID0gKHBhZ2VOdW06IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgZmlsdGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMocGFnZU51bSwgcGFnZVNpemUsIGZpbHRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQobmV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkQ2hhbmdlLmVtaXQobmV4dCA/IG5leHQudmFsdWUgOiBudWxsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKFxyXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuX3NlcnZpY2Uub3BlbiQsIHRoaXMuX3NlcnZpY2UuaGlnaGxpZ2h0ZWRFbGVtZW50JCwgdGhpcy52aXNpYmxlT3B0aW9ucyQpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbb3BlbiwgaGlnaGxpZ2h0ZWRFbGVtZW50LCB2aXNpYmxlT3B0aW9uc10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRWxlbWVudENoYW5nZS5lbWl0KG9wZW4gJiYgdmlzaWJsZU9wdGlvbnMubGVuZ3RoID4gMCA/IGhpZ2hsaWdodGVkRWxlbWVudCA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICAvLyBBdHRhY2ggZGVmYXVsdCBsb2FkaW5nIHRlbXBsYXRlXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRpbmdUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdUZW1wbGF0ZSA9IHRoaXMuX2RlZmF1bHRMb2FkaW5nVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdHRhY2ggZGVmYXVsdCBvcHRpb24gdGVtcGxhdGVcclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25UZW1wbGF0ZSA9IHRoaXMuX2RlZmF1bHRPcHRpb25UZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBkZWZhdWx0IFwibm8gcmVzdWx0c1wiIHRlbXBsYXRlXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vT3B0aW9uc1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9PcHRpb25zVGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0Tm9PcHRpb25zVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIC8vIE9wZW4gdGhlIGRyb3Bkb3duIGlmIHRoZSBmaWx0ZXIgdmFsdWUgdXBkYXRlc1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuT25GaWx0ZXJDaGFuZ2UgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlICYmIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZS1maWx0ZXIgdmlzaWJsZU9wdGlvbnNcclxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nKVxyXG4gICAgbW91c2Vkb3duSGFuZGxlcigpIHtcclxuICAgICAgICB0aGlzLmNsaWNraW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJylcclxuICAgIG1vdXNldXBIYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMuY2xpY2tpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25Nb3VzZWRvd25IYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgLy8gV29ya2Fyb3VuZCB0byBwcmV2ZW50IGZvY3VzIGNoYW5naW5nIHdoZW4gYW4gb3B0aW9uIGlzIGNsaWNrZWRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbkNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCwgb3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Qob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBrZXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0S2V5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMua2V5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtleShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMua2V5ID09PSAnc3RyaW5nJyAmJiBvcHRpb24gJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMua2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uWzxzdHJpbmc+dGhpcy5rZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5KG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXkob3B0aW9uOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbiAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uWzxzdHJpbmc+dGhpcy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbiB3aXRoIEhUTUwgbWFya3VwIGFkZGVkIHRvIGhpZ2hsaWdodCB0aGUgcGFydCB3aGljaCBtYXRjaGVzIHRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheUh0bWwob3B0aW9uOiBhbnkpIHtcclxuICAgICAgICBsZXQgZGlzcGxheVRleHQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gdGhpcy5nZXREaXNwbGF5KG9wdGlvbikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gdGhpcy5nZXREaXNwbGF5KG9wdGlvbi5uYW1lKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkaXNwbGF5SHRtbCA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmZpbHRlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBkaXNwbGF5VGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBoaWdobGlnaHQgPSBgPHNwYW4gY2xhc3M9XCJ1eC1maWx0ZXItbWF0Y2hcIj4ke2Rpc3BsYXlUZXh0LnN1YnN0cihtYXRjaEluZGV4LCBsZW5ndGgpfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUh0bWwgPSBkaXNwbGF5VGV4dC5zdWJzdHIoMCwgbWF0Y2hJbmRleCkgKyBoaWdobGlnaHQgKyBkaXNwbGF5VGV4dC5zdWJzdHIobWF0Y2hJbmRleCArIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlIdG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbmZpbml0ZSBzY3JvbGwgY29tcG9uZW50IHNob3VsZCBsb2FkXHJcbiAgICAgKi9cclxuICAgIGlzSW5maW5pdGVTY3JvbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3RzIHRoZSBnaXZlbiBvcHRpb24sIGVtaXR0aW5nIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCBhbmQgY2xvc2luZyB0aGUgZHJvcGRvd24uXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdChuZXcgVHlwZWFoZWFkT3B0aW9uRXZlbnQob3B0aW9uLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb3B0aW9uIGlzIHBhcnQgb2YgdGhlIGRpc2FibGVkT3B0aW9ucyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaXNEaXNhYmxlZChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kaXNhYmxlZE9wdGlvbnMuZmluZCgoc2VsZWN0ZWRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEtleShzZWxlY3RlZE9wdGlvbikgPT09IG9wdGlvbi5rZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgZ2l2ZW4gb3B0aW9uIGFzIHRoZSBjdXJyZW50IGhpZ2hsaWdodGVkIG9wdGlvbiwgYXZhaWxhYmxlIGluIHRoZSBoaWdobGlnaHRlZE9wdGlvbiBwYXJhbWV0ZXIuXHJcbiAgICAgKi9cclxuICAgIGhpZ2hsaWdodChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmNyZW1lbnQgb3IgZGVjcmVtZW50IHRoZSBoaWdobGlnaHRlZCBvcHRpb24gaW4gdGhlIGxpc3QuIERpc2FibGVkIG9wdGlvbnMgYXJlIHNraXBwZWQuXHJcbiAgICAgKiBAcGFyYW0gZCBWYWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgaW5kZXggb2YgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiwgaS5lLiAtMSB0byBtb3ZlIGJhY2t3YXJkcywgKzEgdG8gbW92ZSBmb3J3YXJkcy5cclxuICAgICAqL1xyXG4gICAgbW92ZUhpZ2hsaWdodChkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy52aXNpYmxlT3B0aW9ucyQuZ2V0VmFsdWUoKTtcclxuICAgICAgICBjb25zdCBoaWdobGlnaHRJbmRleCA9IHRoaXMuaW5kZXhPZlZpc2libGVPcHRpb24odGhpcy5oaWdobGlnaHRlZCk7XHJcbiAgICAgICAgbGV0IG5ld0luZGV4ID0gaGlnaGxpZ2h0SW5kZXg7XHJcbiAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaW5Cb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCArIGQ7XHJcbiAgICAgICAgICAgIGluQm91bmRzID0gKG5ld0luZGV4ID49IDAgJiYgbmV3SW5kZXggPCB2aXNpYmxlT3B0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBkaXNhYmxlZCA9IGluQm91bmRzICYmIHRoaXMuaXNEaXNhYmxlZCh2aXNpYmxlT3B0aW9uc1tuZXdJbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoaW5Cb3VuZHMgJiYgZGlzYWJsZWQpO1xyXG5cclxuICAgICAgICBpZiAoIWRpc2FibGVkICYmIGluQm91bmRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQodmlzaWJsZU9wdGlvbnNbbmV3SW5kZXhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHVwIHRoZSBvcHRpb25zIGJlZm9yZSB0aGUgZHJvcGRvd24gaXMgZGlzcGxheWVkLlxyXG4gICAgICovXHJcbiAgICBpbml0T3B0aW9ucygpIHtcclxuICAgICAgICAvLyBDbGVhciBwcmV2aW91cyBoaWdobGlnaHRcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdEZpcnN0KSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBoaWdobGlnaHQgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCBvcHRpb24uXHJcbiAgICAgICAgICAgIHRoaXMubW92ZUhpZ2hsaWdodCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHZpc2libGVPcHRpb25zIGFycmF5IHdpdGggdGhlIGN1cnJlbnQgZmlsdGVyLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVPcHRpb25zKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxpc2VkSW5wdXQgPSAodGhpcy5maWx0ZXIgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5KG9wdGlvbikudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGlzZWRJbnB1dCkgPj0gMDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMkLm5leHQodmlzaWJsZU9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gb3B0aW9uIGluIHRoZSB2aXNpYmxlT3B0aW9ucyBhcnJheS4gUmV0dXJucyAtMSBpZiB0aGUgb3B0aW9uIGlzIG5vdCBjdXJyZW50bHkgdmlzaWJsZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbmRleE9mVmlzaWJsZU9wdGlvbihvcHRpb246IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25LZXkgPSB0aGlzLmdldEtleShvcHRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlT3B0aW9ucyQuZ2V0VmFsdWUoKS5maW5kSW5kZXgoKGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwua2V5ID09PSBvcHRpb25LZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEFQSSBhdmFpbGFibGUgdG8gb3B0aW9uIHRlbXBsYXRlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkT3B0aW9uQXBpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBrZXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0S2V5KG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uIHdpdGggSFRNTCBtYXJrdXAgYWRkZWQgdG8gaGlnaGxpZ2h0IHRoZSBwYXJ0IHdoaWNoIG1hdGNoZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlLiBPdmVycmlkZSB0aGUgdXgtZmlsdGVyLW1hdGNoIGNsYXNzIGluIENTUyB0byBtb2RpZnkgdGhlIGRlZmF1bHQgYXBwZWFyYW5jZS5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheUh0bWwob3B0aW9uOiBhbnkpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkVmlzaWJsZU9wdGlvbiB7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbn0iXX0=