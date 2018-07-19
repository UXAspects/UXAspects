/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef } from '@angular/core';
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
     * @param {?} _service
     */
    constructor(typeaheadElement, _service) {
        this.typeaheadElement = typeaheadElement;
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
            this.highlighted$.next(visibleOptions[newIndex]);
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
                template: `<div class="ux-typeahead-options"
    [uxInfiniteScroll]="loadOptionsCallback"
    [collection]="visibleOptions$ | async"
    (collectionChange)="visibleOptions$.next($event)"
    [enabled]="isInfiniteScroll()"
    [filter]="filter"
    [loadOnScroll]="true"
    [pageSize]="pageSize"
    [scrollElement]="typeaheadElement"
    (loading)="loading = true"
    (loaded)="loading = false">

    <ol *ngIf="(visibleOptions$ | async).length > 0">
        <li *ngFor="let option of (visibleOptions$ | async); let i = index"
            [attr.id]="id + '-option-' + i"
            [class.disabled]="isDisabled(option)"
            [class.highlighted]="highlightedKey === option.key"
            [attr.aria-selected]="multiselectable ? isDisabled(option) : null"
            [uxTypeaheadHighlight]="highlightedKey === option.key"
            [uxScrollIntoViewIf]="highlightedKey === option.key"
            [scrollParent]="typeaheadElement.nativeElement"
            (mousedown)="optionMousedownHandler($event)"
            (click)="optionClickHandler($event, option)"
            (mouseover)="highlight(option)">

            <ng-container [ngTemplateOutlet]="optionTemplate || defaultOptionTemplate"
                [ngTemplateOutletContext]="{option: option.value, api: optionApi}">
            </ng-container>

        </li>
    </ol>

    <div *uxInfiniteScrollLoading>
        <ng-container [ngTemplateOutlet]="loadingTemplate || defaultLoadingTemplate"></ng-container>
    </div>

    <div *ngIf="isInfiniteScroll() === false && (visibleOptions$ | async).length === 0 && loading">
        <ng-container [ngTemplateOutlet]="loadingTemplate || defaultLoadingTemplate"></ng-container>
    </div>

</div>
<div *ngIf="(visibleOptions$ | async).length === 0 && !loading">
    <ng-container [ngTemplateOutlet]="noOptionsTemplate || defaultNoOptionsTemplate">
    </ng-container>
</div>

<ng-template #defaultLoadingTemplate>
    <div class="ux-typeahead-loading">
        <div class="spinner spinner-accent spinner-bounce-middle"></div>
        <div>Loading...</div>
    </div>
</ng-template>

<ng-template #defaultOptionTemplate let-option="option" let-api="api">
    <span class="ux-typeahead-option" [innerHtml]="api.getDisplayHtml(option)"></span>
</ng-template>

<ng-template #defaultNoOptionsTemplate>
    <span class="ux-typeahead-no-options">No results</span>
</ng-template>`,
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
TypeaheadComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: TypeaheadService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBaUIsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hLLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQXdFakIsTUFBTTs7Ozs7SUF5REYsWUFDVyxrQkFDQztRQURELHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDZixhQUFRLEdBQVIsUUFBUTtrQkF6RDBCLGdCQUFnQixFQUFFLFFBQVEsRUFBRTswQkFhbkQsSUFBSSxZQUFZLEVBQVc7NkJBS1YsTUFBTTt5QkFDakIsT0FBTzsrQkFDMEMsS0FBSztrQ0FDNUMsSUFBSTt3QkFDZixFQUFFOzJCQUNFLElBQUk7NkJBQ0YsS0FBSzt1QkFDcEIsS0FBSzs4QkFNRyxJQUFJLFlBQVksRUFBd0I7aUNBRXJDLElBQUksWUFBWSxFQUFPO3dDQUNoQixJQUFJLFlBQVksRUFBZTsrQkFHbEQsSUFBSSxlQUFlLENBQTJC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Q0wsS0FBSztnQ0FDTCxLQUFLLFlBQUksV0FBVyxTQUFDLDJCQUEyQjttQ0FDaEQsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSzt3QkFDTCxLQUFLO2dDQUVMLEtBQUs7K0JBQ0wsS0FBSztrQ0FDTCxLQUFLOytCQUVMLE1BQU07a0NBRU4sTUFBTTt5Q0FDTixNQUFNO2lDQXVGTixZQUFZLFNBQUMsV0FBVzsrQkFLeEIsWUFBWSxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcclxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0JztcclxuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZpbml0ZS1zY3JvbGwvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4vdHlwZWFoZWFkLWV2ZW50JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkU2VydmljZSB9IGZyb20gJy4vdHlwZWFoZWFkLnNlcnZpY2UnO1xyXG5cclxubGV0IHVuaXF1ZUlkID0gMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC10eXBlYWhlYWQnLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtdHlwZWFoZWFkLW9wdGlvbnNcIlxuICAgIFt1eEluZmluaXRlU2Nyb2xsXT1cImxvYWRPcHRpb25zQ2FsbGJhY2tcIlxuICAgIFtjb2xsZWN0aW9uXT1cInZpc2libGVPcHRpb25zJCB8IGFzeW5jXCJcbiAgICAoY29sbGVjdGlvbkNoYW5nZSk9XCJ2aXNpYmxlT3B0aW9ucyQubmV4dCgkZXZlbnQpXCJcbiAgICBbZW5hYmxlZF09XCJpc0luZmluaXRlU2Nyb2xsKClcIlxuICAgIFtmaWx0ZXJdPVwiZmlsdGVyXCJcbiAgICBbbG9hZE9uU2Nyb2xsXT1cInRydWVcIlxuICAgIFtwYWdlU2l6ZV09XCJwYWdlU2l6ZVwiXG4gICAgW3Njcm9sbEVsZW1lbnRdPVwidHlwZWFoZWFkRWxlbWVudFwiXG4gICAgKGxvYWRpbmcpPVwibG9hZGluZyA9IHRydWVcIlxuICAgIChsb2FkZWQpPVwibG9hZGluZyA9IGZhbHNlXCI+XG5cbiAgICA8b2wgKm5nSWY9XCIodmlzaWJsZU9wdGlvbnMkIHwgYXN5bmMpLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKTsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJpZCArICctb3B0aW9uLScgKyBpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0Rpc2FibGVkKG9wdGlvbilcIlxuICAgICAgICAgICAgW2NsYXNzLmhpZ2hsaWdodGVkXT1cImhpZ2hsaWdodGVkS2V5ID09PSBvcHRpb24ua2V5XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwibXVsdGlzZWxlY3RhYmxlID8gaXNEaXNhYmxlZChvcHRpb24pIDogbnVsbFwiXG4gICAgICAgICAgICBbdXhUeXBlYWhlYWRIaWdobGlnaHRdPVwiaGlnaGxpZ2h0ZWRLZXkgPT09IG9wdGlvbi5rZXlcIlxuICAgICAgICAgICAgW3V4U2Nyb2xsSW50b1ZpZXdJZl09XCJoaWdobGlnaHRlZEtleSA9PT0gb3B0aW9uLmtleVwiXG4gICAgICAgICAgICBbc2Nyb2xsUGFyZW50XT1cInR5cGVhaGVhZEVsZW1lbnQubmF0aXZlRWxlbWVudFwiXG4gICAgICAgICAgICAobW91c2Vkb3duKT1cIm9wdGlvbk1vdXNlZG93bkhhbmRsZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib3B0aW9uQ2xpY2tIYW5kbGVyKCRldmVudCwgb3B0aW9uKVwiXG4gICAgICAgICAgICAobW91c2VvdmVyKT1cImhpZ2hsaWdodChvcHRpb24pXCI+XG5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwib3B0aW9uVGVtcGxhdGUgfHwgZGVmYXVsdE9wdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie29wdGlvbjogb3B0aW9uLnZhbHVlLCBhcGk6IG9wdGlvbkFwaX1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvbGk+XG4gICAgPC9vbD5cblxuICAgIDxkaXYgKnV4SW5maW5pdGVTY3JvbGxMb2FkaW5nPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvYWRpbmdUZW1wbGF0ZSB8fCBkZWZhdWx0TG9hZGluZ1RlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ0lmPVwiaXNJbmZpbml0ZVNjcm9sbCgpID09PSBmYWxzZSAmJiAodmlzaWJsZU9wdGlvbnMkIHwgYXN5bmMpLmxlbmd0aCA9PT0gMCAmJiBsb2FkaW5nXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibG9hZGluZ1RlbXBsYXRlIHx8IGRlZmF1bHRMb2FkaW5nVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKS5sZW5ndGggPT09IDAgJiYgIWxvYWRpbmdcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm5vT3B0aW9uc1RlbXBsYXRlIHx8IGRlZmF1bHROb09wdGlvbnNUZW1wbGF0ZVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdExvYWRpbmdUZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwidXgtdHlwZWFoZWFkLWxvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lci1hY2NlbnQgc3Bpbm5lci1ib3VuY2UtbWlkZGxlXCI+PC9kaXY+XG4gICAgICAgIDxkaXY+TG9hZGluZy4uLjwvZGl2PlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0T3B0aW9uVGVtcGxhdGUgbGV0LW9wdGlvbj1cIm9wdGlvblwiIGxldC1hcGk9XCJhcGlcIj5cbiAgICA8c3BhbiBjbGFzcz1cInV4LXR5cGVhaGVhZC1vcHRpb25cIiBbaW5uZXJIdG1sXT1cImFwaS5nZXREaXNwbGF5SHRtbChvcHRpb24pXCI+PC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0Tm9PcHRpb25zVGVtcGxhdGU+XG4gICAgPHNwYW4gY2xhc3M9XCJ1eC10eXBlYWhlYWQtbm8tb3B0aW9uc1wiPk5vIHJlc3VsdHM8L3NwYW4+XG48L25nLXRlbXBsYXRlPmAsXHJcbiAgICBwcm92aWRlcnM6IFtUeXBlYWhlYWRTZXJ2aWNlXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAncm9sZSc6ICdsaXN0Ym94JyxcclxuICAgICAgICAnW2NsYXNzLm9wZW5dJzogJ29wZW4nLFxyXG4gICAgICAgICdbY2xhc3MuZHJvcC11cF0nOiAnZHJvcERpcmVjdGlvbiA9PT0gXCJ1cFwiJyxcclxuICAgICAgICAnW3N0eWxlLm1heEhlaWdodF0nOiAnbWF4SGVpZ2h0J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHlwZWFoZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5pZCcpIGlkOiBzdHJpbmcgPSBgdXgtdHlwZWFoZWFkLSR7Kyt1bmlxdWVJZH1gO1xyXG5cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueVtdIHwgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb247XHJcbiAgICBASW5wdXQoKSBmaWx0ZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2Uub3BlbiQuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuICAgIHNldCBvcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuJC5uZXh0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNwbGF5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGtleTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZE9wdGlvbnM6IGFueVtdO1xyXG4gICAgQElucHV0KCkgZHJvcERpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gJzI1MHB4JztcclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZScpIG11bHRpc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgb3Blbk9uRmlsdGVyQ2hhbmdlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHBhZ2VTaXplOiBudW1iZXIgPSAyMDtcclxuICAgIEBJbnB1dCgpIHNlbGVjdEZpcnN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHNlbGVjdE9uRW50ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGxvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBsb2FkaW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBvcHRpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VHlwZWFoZWFkT3B0aW9uRXZlbnQ+KCk7XHJcblxyXG4gICAgQE91dHB1dCgpIGhpZ2hsaWdodGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgaGlnaGxpZ2h0ZWRFbGVtZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcclxuXHJcbiAgICBsb2FkT3B0aW9uc0NhbGxiYWNrOiBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIHZpc2libGVPcHRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHlwZWFoZWFkVmlzaWJsZU9wdGlvbltdPihbXSk7XHJcbiAgICBjbGlja2luZyA9IGZhbHNlO1xyXG4gICAgaGlnaGxpZ2h0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUeXBlYWhlYWRWaXNpYmxlT3B0aW9uPihudWxsKTtcclxuICAgIGhpZ2hsaWdodGVkS2V5OiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGdldCBoaWdobGlnaHRlZCgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oaWdobGlnaHRlZCQuZ2V0VmFsdWUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS52YWx1ZSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgICBvcHRpb25BcGk6IFR5cGVhaGVhZE9wdGlvbkFwaSA9IHtcclxuICAgICAgICBnZXRLZXk6IHRoaXMuZ2V0S2V5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheTogdGhpcy5nZXREaXNwbGF5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheUh0bWw6IHRoaXMuZ2V0RGlzcGxheUh0bWwuYmluZCh0aGlzKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdHlwZWFoZWFkRWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNlOiBUeXBlYWhlYWRTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkT3B0aW9uc0NhbGxiYWNrID0gKHBhZ2VOdW06IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgZmlsdGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIHdoaWNoIG1heSByZXR1cm4gYW4gYXJyYXkgb3IgYSBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJyYXlPclByb21pc2UgPSB0aGlzLm9wdGlvbnMocGFnZU51bSwgcGFnZVNpemUsIGZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWFwIHRoZSByZXN1bHRzIHRvIGFuIGFycmF5IG9mIFR5cGVhaGVhZFZpc2libGVPcHRpb24uXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFycmF5T3JQcm9taXNlKS50aGVuKG5ld09wdGlvbnMgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobmV3T3B0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3T3B0aW9ucy5tYXAoKG9wdGlvbjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleShvcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4kLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChuZXh0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKChuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRLZXkgPSBuZXh0ID8gbmV4dC5rZXkgOiBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkQ2hhbmdlLmVtaXQobmV4dCA/IG5leHQudmFsdWUgOiBudWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLl9zZXJ2aWNlLm9wZW4kLCB0aGlzLl9zZXJ2aWNlLmhpZ2hsaWdodGVkRWxlbWVudCQsIHRoaXMudmlzaWJsZU9wdGlvbnMkKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW29wZW4sIGhpZ2hsaWdodGVkRWxlbWVudCwgdmlzaWJsZU9wdGlvbnNdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRWxlbWVudENoYW5nZS5lbWl0KG9wZW4gJiYgdmlzaWJsZU9wdGlvbnMubGVuZ3RoID4gMCA/IGhpZ2hsaWdodGVkRWxlbWVudCA6IG51bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgLy8gT3BlbiB0aGUgZHJvcGRvd24gaWYgdGhlIGZpbHRlciB2YWx1ZSB1cGRhdGVzXHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5PbkZpbHRlckNoYW5nZSAmJiBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlLWZpbHRlciB2aXNpYmxlT3B0aW9uc1xyXG4gICAgICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJylcclxuICAgIG1vdXNlZG93bkhhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja2luZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcpXHJcbiAgICBtb3VzZXVwSGFuZGxlcigpIHtcclxuICAgICAgICB0aGlzLmNsaWNraW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9uTW91c2Vkb3duSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIFdvcmthcm91bmQgdG8gcHJldmVudCBmb2N1cyBjaGFuZ2luZyB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25DbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0KG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldEtleShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmtleSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmtleSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMua2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheShvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJyAmJiBvcHRpb24gJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24gd2l0aCBIVE1MIG1hcmt1cCBhZGRlZCB0byBoaWdobGlnaHQgdGhlIHBhcnQgd2hpY2ggbWF0Y2hlcyB0aGUgY3VycmVudCBmaWx0ZXIgdmFsdWUuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlIdG1sKG9wdGlvbjogYW55KSB7XHJcbiAgICAgICAgY29uc3QgZGlzcGxheVRleHQgPSB0aGlzLmdldERpc3BsYXkob3B0aW9uKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XHJcbiAgICAgICAgbGV0IGRpc3BsYXlIdG1sID0gZGlzcGxheVRleHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuZmlsdGVyLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IGRpc3BsYXlUZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhpZ2hsaWdodCA9IGA8c3BhbiBjbGFzcz1cInV4LWZpbHRlci1tYXRjaFwiPiR7ZGlzcGxheVRleHQuc3Vic3RyKG1hdGNoSW5kZXgsIGxlbmd0aCl9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5SHRtbCA9IGRpc3BsYXlUZXh0LnN1YnN0cigwLCBtYXRjaEluZGV4KSArIGhpZ2hsaWdodCArIGRpc3BsYXlUZXh0LnN1YnN0cihtYXRjaEluZGV4ICsgbGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlzcGxheUh0bWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGluZmluaXRlIHNjcm9sbCBjb21wb25lbnQgc2hvdWxkIGxvYWRcclxuICAgICAqL1xyXG4gICAgaXNJbmZpbml0ZVNjcm9sbCgpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdHMgdGhlIGdpdmVuIG9wdGlvbiwgZW1pdHRpbmcgdGhlIG9wdGlvblNlbGVjdGVkIGV2ZW50IGFuZCBjbG9zaW5nIHRoZSBkcm9wZG93bi5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0KG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKG9wdGlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KG5ldyBUeXBlYWhlYWRPcHRpb25FdmVudChvcHRpb24udmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvcHRpb24gaXMgcGFydCBvZiB0aGUgZGlzYWJsZWRPcHRpb25zIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpc0Rpc2FibGVkKG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkT3B0aW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRpc2FibGVkT3B0aW9ucy5maW5kKChzZWxlY3RlZE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5KHNlbGVjdGVkT3B0aW9uKSA9PT0gb3B0aW9uLmtleTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBnaXZlbiBvcHRpb24gYXMgdGhlIGN1cnJlbnQgaGlnaGxpZ2h0ZWQgb3B0aW9uLCBhdmFpbGFibGUgaW4gdGhlIGhpZ2hsaWdodGVkT3B0aW9uIHBhcmFtZXRlci5cclxuICAgICAqL1xyXG4gICAgaGlnaGxpZ2h0KG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKG9wdGlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluY3JlbWVudCBvciBkZWNyZW1lbnQgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiBpbiB0aGUgbGlzdC4gRGlzYWJsZWQgb3B0aW9ucyBhcmUgc2tpcHBlZC5cclxuICAgICAqIEBwYXJhbSBkIFZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBpbmRleCBvZiB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uLCBpLmUuIC0xIHRvIG1vdmUgYmFja3dhcmRzLCArMSB0byBtb3ZlIGZvcndhcmRzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlSGlnaGxpZ2h0KGQ6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgY29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLnZpc2libGVPcHRpb25zJC5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodEluZGV4ID0gdGhpcy5pbmRleE9mVmlzaWJsZU9wdGlvbih0aGlzLmhpZ2hsaWdodGVkKTtcclxuICAgICAgICBsZXQgbmV3SW5kZXggPSBoaWdobGlnaHRJbmRleDtcclxuICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBpbkJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4ICsgZDtcclxuICAgICAgICAgICAgaW5Cb3VuZHMgPSAobmV3SW5kZXggPj0gMCAmJiBuZXdJbmRleCA8IHZpc2libGVPcHRpb25zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGRpc2FibGVkID0gaW5Cb3VuZHMgJiYgdGhpcy5pc0Rpc2FibGVkKHZpc2libGVPcHRpb25zW25ld0luZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChpbkJvdW5kcyAmJiBkaXNhYmxlZCk7XHJcblxyXG4gICAgICAgIGlmICghZGlzYWJsZWQgJiYgaW5Cb3VuZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dCh2aXNpYmxlT3B0aW9uc1tuZXdJbmRleF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0SGlnaGxpZ2h0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoeyB2YWx1ZTogdGhpcy5oaWdobGlnaHRlZCwga2V5OiB0aGlzLmdldEtleSh0aGlzLmhpZ2hsaWdodGVkKX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB1cCB0aGUgb3B0aW9ucyBiZWZvcmUgdGhlIGRyb3Bkb3duIGlzIGRpc3BsYXllZC5cclxuICAgICAqL1xyXG4gICAgaW5pdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgLy8gQ2xlYXIgcHJldmlvdXMgaGlnaGxpZ2h0XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RGaXJzdCkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgaGlnaGxpZ2h0IHRoZSBmaXJzdCBub24tZGlzYWJsZWQgb3B0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSB2aXNpYmxlT3B0aW9ucyBhcnJheSB3aXRoIHRoZSBjdXJyZW50IGZpbHRlci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlT3B0aW9ucygpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXNlZElucHV0ID0gKHRoaXMuZmlsdGVyIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheShvcHRpb24pLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpc2VkSW5wdXQpID49IDA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkodmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zJC5uZXh0KHZpc2libGVPcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIGdpdmVuIG9wdGlvbiBpbiB0aGUgdmlzaWJsZU9wdGlvbnMgYXJyYXkuIFJldHVybnMgLTEgaWYgdGhlIG9wdGlvbiBpcyBub3QgY3VycmVudGx5IHZpc2libGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5kZXhPZlZpc2libGVPcHRpb24ob3B0aW9uOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uS2V5ID0gdGhpcy5nZXRLZXkob3B0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMkLmdldFZhbHVlKCkuZmluZEluZGV4KChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmtleSA9PT0gb3B0aW9uS2V5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBBUEkgYXZhaWxhYmxlIHRvIG9wdGlvbiB0ZW1wbGF0ZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZE9wdGlvbkFwaSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldEtleShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbiB3aXRoIEhUTUwgbWFya3VwIGFkZGVkIHRvIGhpZ2hsaWdodCB0aGUgcGFydCB3aGljaCBtYXRjaGVzIHRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZS4gT3ZlcnJpZGUgdGhlIHV4LWZpbHRlci1tYXRjaCBjbGFzcyBpbiBDU1MgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGFwcGVhcmFuY2UuXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlIdG1sKG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZFZpc2libGVPcHRpb24ge1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIGtleTogc3RyaW5nO1xyXG59Il19