/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadService } from './typeahead.service';
let /** @type {?} */ uniqueId = 0;
export class TypeaheadComponent {
    /**
     * @param {?} typeaheadElement
     * @param {?} _cdRef
     * @param {?} _service
     */
    constructor(typeaheadElement, _cdRef, _service) {
        this.typeaheadElement = typeaheadElement;
        this._cdRef = _cdRef;
        this._service = _service;
        this.id = `ux-typeahead-${++uniqueId}`;
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
        this._subscription.add(this._service.open$.pipe(distinctUntilChanged()).subscribe((next) => {
            this.openChange.emit(next);
            if (next) {
                this.initOptions();
            }
        }));
        this._subscription.add(this.highlighted$.subscribe((next) => {
            this.highlightedKey = next ? next.key : null;
            this.highlightedChange.emit(next ? next.value : null);
        }));
        this._subscription.add(combineLatest(this._service.open$, this._service.highlightedElement$, this.visibleOptions$)
            .subscribe(([open, highlightedElement, visibleOptions]) => {
            this.highlightedElementChange.emit(open && visibleOptions.length > 0 ? highlightedElement : null);
        }));
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
     * @return {?}
     */
    ngAfterViewInit() {
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
        this._subscription.unsubscribe();
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

            <ng-container [ngTemplateOutlet]="optionTemplate"
                [ngTemplateOutletContext]="{option: option.value, api: optionApi}">
            </ng-container>

        </li>
    </ol>

    <div *uxInfiniteScrollLoading>
        <ng-container [ngTemplateOutlet]="loadingTemplate">
        </ng-container>
    </div>

</div>
<div *ngIf="(visibleOptions$ | async).length === 0 && !loading">
    <ng-container [ngTemplateOutlet]="noOptionsTemplate">
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
    { type: ChangeDetectorRef, },
    { type: TypeaheadService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF3QixNQUFNLEVBQWlCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN00sT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQXFFakIsTUFBTTs7Ozs7O0lBNkRGLFlBQ1csa0JBQ0MsUUFDQTtRQUZELHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDZixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO2tCQTlEMEIsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFOzBCQWFuRCxJQUFJLFlBQVksRUFBVzs2QkFLVixNQUFNO3lCQUNqQixPQUFPOytCQUMwQyxLQUFLO2tDQUM1QyxJQUFJO3dCQUNmLEVBQUU7MkJBQ0UsSUFBSTs4QkFNVCxJQUFJLFlBQVksRUFBd0I7aUNBRXJDLElBQUksWUFBWSxFQUFPO3dDQUNoQixJQUFJLFlBQVksRUFBZTsrQkFP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QUNKOzs7O1lBN0VxRCxVQUFVO1lBQXhDLGlCQUFpQjtZQU9oQyxnQkFBZ0I7OzttQkF5RXBCLEtBQUssWUFBSSxXQUFXLFNBQUMsU0FBUzt3QkFFOUIsS0FBSzt1QkFDTCxLQUFLO3FCQUVMLEtBQUssU0FBQyxNQUFNOzJCQVFaLE1BQU07d0JBRU4sS0FBSztvQkFDTCxLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLO2dDQUNMLEtBQUssWUFBSSxXQUFXLFNBQUMsMkJBQTJCO21DQUNoRCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSztnQ0FFTCxLQUFLOytCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFFTCxNQUFNO2tDQUVOLE1BQU07eUNBQ04sTUFBTTt3Q0FFTixTQUFTLFNBQUMsd0JBQXdCO3VDQUNsQyxTQUFTLFNBQUMsdUJBQXVCOzBDQUNqQyxTQUFTLFNBQUMsMEJBQTBCO2lDQWlIcEMsWUFBWSxTQUFDLFdBQVc7K0JBS3hCLFlBQVksU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZpbml0ZS1zY3JvbGwvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4vdHlwZWFoZWFkLWV2ZW50JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkU2VydmljZSB9IGZyb20gJy4vdHlwZWFoZWFkLnNlcnZpY2UnO1xyXG5cclxubGV0IHVuaXF1ZUlkID0gMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC10eXBlYWhlYWQnLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtdHlwZWFoZWFkLW9wdGlvbnNcIlxuICAgIFt1eEluZmluaXRlU2Nyb2xsXT1cImxvYWRPcHRpb25zQ2FsbGJhY2tcIlxuICAgIFtjb2xsZWN0aW9uXT1cInZpc2libGVPcHRpb25zJCB8IGFzeW5jXCJcbiAgICAoY29sbGVjdGlvbkNoYW5nZSk9XCJ2aXNpYmxlT3B0aW9ucyQubmV4dCgkZXZlbnQpXCJcbiAgICBbZW5hYmxlZF09XCJpc0luZmluaXRlU2Nyb2xsKClcIlxuICAgIFtmaWx0ZXJdPVwiZmlsdGVyXCJcbiAgICBbbG9hZE9uU2Nyb2xsXT1cInRydWVcIlxuICAgIFtwYWdlU2l6ZV09XCJwYWdlU2l6ZVwiXG4gICAgW3Njcm9sbEVsZW1lbnRdPVwidHlwZWFoZWFkRWxlbWVudFwiXG4gICAgKGxvYWRpbmcpPVwibG9hZGluZyA9IHRydWVcIlxuICAgIChsb2FkZWQpPVwibG9hZGluZyA9IGZhbHNlXCI+XG5cbiAgICA8b2wgKm5nSWY9XCIodmlzaWJsZU9wdGlvbnMkIHwgYXN5bmMpLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgKHZpc2libGVPcHRpb25zJCB8IGFzeW5jKTsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJpZCArICctb3B0aW9uLScgKyBpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0Rpc2FibGVkKG9wdGlvbilcIlxuICAgICAgICAgICAgW2NsYXNzLmhpZ2hsaWdodGVkXT1cImhpZ2hsaWdodGVkS2V5ID09PSBvcHRpb24ua2V5XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwibXVsdGlzZWxlY3RhYmxlID8gaXNEaXNhYmxlZChvcHRpb24pIDogbnVsbFwiXG4gICAgICAgICAgICBbdXhUeXBlYWhlYWRIaWdobGlnaHRdPVwiaGlnaGxpZ2h0ZWRLZXkgPT09IG9wdGlvbi5rZXlcIlxuICAgICAgICAgICAgW3V4U2Nyb2xsSW50b1ZpZXdJZl09XCJoaWdobGlnaHRlZEtleSA9PT0gb3B0aW9uLmtleVwiXG4gICAgICAgICAgICBbc2Nyb2xsUGFyZW50XT1cInR5cGVhaGVhZEVsZW1lbnQubmF0aXZlRWxlbWVudFwiXG4gICAgICAgICAgICAobW91c2Vkb3duKT1cIm9wdGlvbk1vdXNlZG93bkhhbmRsZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib3B0aW9uQ2xpY2tIYW5kbGVyKCRldmVudCwgb3B0aW9uKVwiXG4gICAgICAgICAgICAobW91c2VvdmVyKT1cImhpZ2hsaWdodChvcHRpb24pXCI+XG5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwib3B0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7b3B0aW9uOiBvcHRpb24udmFsdWUsIGFwaTogb3B0aW9uQXBpfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPC9saT5cbiAgICA8L29sPlxuXG4gICAgPGRpdiAqdXhJbmZpbml0ZVNjcm9sbExvYWRpbmc+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibG9hZGluZ1RlbXBsYXRlXCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbjxkaXYgKm5nSWY9XCIodmlzaWJsZU9wdGlvbnMkIHwgYXN5bmMpLmxlbmd0aCA9PT0gMCAmJiAhbG9hZGluZ1wiPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibm9PcHRpb25zVGVtcGxhdGVcIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRMb2FkaW5nVGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInV4LXR5cGVhaGVhZC1sb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyIHNwaW5uZXItYWNjZW50IHNwaW5uZXItYm91bmNlLW1pZGRsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2PkxvYWRpbmcuLi48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdE9wdGlvblRlbXBsYXRlIGxldC1vcHRpb249XCJvcHRpb25cIiBsZXQtYXBpPVwiYXBpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ1eC10eXBlYWhlYWQtb3B0aW9uXCIgW2lubmVySHRtbF09XCJhcGkuZ2V0RGlzcGxheUh0bWwob3B0aW9uKVwiPjwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdE5vT3B0aW9uc1RlbXBsYXRlPlxuICAgIDxzcGFuIGNsYXNzPVwidXgtdHlwZWFoZWFkLW5vLW9wdGlvbnNcIj5ObyByZXN1bHRzPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5gLFxyXG4gICAgcHJvdmlkZXJzOiBbVHlwZWFoZWFkU2VydmljZV0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ3JvbGUnOiAnbGlzdGJveCcsXHJcbiAgICAgICAgJ1tjbGFzcy5vcGVuXSc6ICdvcGVuJyxcclxuICAgICAgICAnW2NsYXNzLmRyb3AtdXBdJzogJ2Ryb3BEaXJlY3Rpb24gPT09IFwidXBcIicsXHJcbiAgICAgICAgJ1tzdHlsZS5tYXhIZWlnaHRdJzogJ21heEhlaWdodCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKSBpZDogc3RyaW5nID0gYHV4LXR5cGVhaGVhZC0keysrdW5pcXVlSWR9YDtcclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgQElucHV0KCkgZmlsdGVyOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCdvcGVuJylcclxuICAgIGdldCBvcGVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLm9wZW4kLmdldFZhbHVlKCk7XHJcbiAgICB9XHJcbiAgICBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2Uub3BlbiQubmV4dCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBrZXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWRPcHRpb25zOiBhbnlbXTtcclxuICAgIEBJbnB1dCgpIGRyb3BEaXJlY3Rpb246ICd1cCcgfCAnZG93bicgPSAnZG93bic7XHJcbiAgICBASW5wdXQoKSBtYXhIZWlnaHQ6IHN0cmluZyA9ICcyNTBweCc7XHJcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGUnKSBtdWx0aXNlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIG9wZW5PbkZpbHRlckNoYW5nZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyID0gMjA7XHJcbiAgICBASW5wdXQoKSBzZWxlY3RGaXJzdDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgb3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBub09wdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFR5cGVhaGVhZE9wdGlvbkV2ZW50PigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBoaWdobGlnaHRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIGhpZ2hsaWdodGVkRWxlbWVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnQ+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdExvYWRpbmdUZW1wbGF0ZScpIHByaXZhdGUgX2RlZmF1bHRMb2FkaW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBAVmlld0NoaWxkKCdkZWZhdWx0T3B0aW9uVGVtcGxhdGUnKSBwcml2YXRlIF9kZWZhdWx0T3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBAVmlld0NoaWxkKCdkZWZhdWx0Tm9PcHRpb25zVGVtcGxhdGUnKSBwcml2YXRlIF9kZWZhdWx0Tm9PcHRpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgbG9hZE9wdGlvbnNDYWxsYmFjazogSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb247XHJcbiAgICB2aXNpYmxlT3B0aW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFR5cGVhaGVhZFZpc2libGVPcHRpb25bXT4oW10pO1xyXG4gICAgbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgY2xpY2tpbmcgPSBmYWxzZTtcclxuICAgIGhpZ2hsaWdodGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHlwZWFoZWFkVmlzaWJsZU9wdGlvbj4obnVsbCk7XHJcbiAgICBoaWdobGlnaHRlZEtleTogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBnZXQgaGlnaGxpZ2h0ZWQoKTogYW55IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaGlnaGxpZ2h0ZWQkLmdldFZhbHVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWUudmFsdWUgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgICBvcHRpb25BcGk6IFR5cGVhaGVhZE9wdGlvbkFwaSA9IHtcclxuICAgICAgICBnZXRLZXk6IHRoaXMuZ2V0S2V5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheTogdGhpcy5nZXREaXNwbGF5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheUh0bWw6IHRoaXMuZ2V0RGlzcGxheUh0bWwuYmluZCh0aGlzKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdHlwZWFoZWFkRWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljZTogVHlwZWFoZWFkU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZE9wdGlvbnNDYWxsYmFjayA9IChwYWdlTnVtOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIGZpbHRlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW52b2tlIHRoZSBjYWxsYmFjayB3aGljaCBtYXkgcmV0dXJuIGFuIGFycmF5IG9yIGEgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5T3JQcm9taXNlID0gdGhpcy5vcHRpb25zKHBhZ2VOdW0sIHBhZ2VTaXplLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1hcCB0aGUgcmVzdWx0cyB0byBhbiBhcnJheSBvZiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhcnJheU9yUHJvbWlzZSkudGhlbihuZXdPcHRpb25zID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld09wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld09wdGlvbnMubWFwKChvcHRpb246IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkob3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQobmV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkS2V5ID0gbmV4dCA/IG5leHQua2V5IDogbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRDaGFuZ2UuZW1pdChuZXh0ID8gbmV4dC52YWx1ZSA6IG51bGwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5fc2VydmljZS5vcGVuJCwgdGhpcy5fc2VydmljZS5oaWdobGlnaHRlZEVsZW1lbnQkLCB0aGlzLnZpc2libGVPcHRpb25zJClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtvcGVuLCBoaWdobGlnaHRlZEVsZW1lbnQsIHZpc2libGVPcHRpb25zXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRFbGVtZW50Q2hhbmdlLmVtaXQob3BlbiAmJiB2aXNpYmxlT3B0aW9ucy5sZW5ndGggPiAwID8gaGlnaGxpZ2h0ZWRFbGVtZW50IDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vIEF0dGFjaCBkZWZhdWx0IGxvYWRpbmcgdGVtcGxhdGVcclxuICAgICAgICBpZiAoIXRoaXMubG9hZGluZ1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1RlbXBsYXRlID0gdGhpcy5fZGVmYXVsdExvYWRpbmdUZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBkZWZhdWx0IG9wdGlvbiB0ZW1wbGF0ZVxyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25UZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvblRlbXBsYXRlID0gdGhpcy5fZGVmYXVsdE9wdGlvblRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXR0YWNoIGRlZmF1bHQgXCJubyByZXN1bHRzXCIgdGVtcGxhdGVcclxuICAgICAgICBpZiAoIXRoaXMubm9PcHRpb25zVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub09wdGlvbnNUZW1wbGF0ZSA9IHRoaXMuX2RlZmF1bHROb09wdGlvbnNUZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgLy8gT3BlbiB0aGUgZHJvcGRvd24gaWYgdGhlIGZpbHRlciB2YWx1ZSB1cGRhdGVzXHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5PbkZpbHRlckNoYW5nZSAmJiBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlLWZpbHRlciB2aXNpYmxlT3B0aW9uc1xyXG4gICAgICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicpXHJcbiAgICBtb3VzZWRvd25IYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMuY2xpY2tpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnKVxyXG4gICAgbW91c2V1cEhhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbk1vdXNlZG93bkhhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIHRvIHByZXZlbnQgZm9jdXMgY2hhbmdpbmcgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9uQ2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdChvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdW5pcXVlIGtleSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXRLZXkob3B0aW9uOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5rZXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5rZXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbiAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkodGhpcy5rZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc3BsYXkob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uIHdpdGggSFRNTCBtYXJrdXAgYWRkZWQgdG8gaGlnaGxpZ2h0IHRoZSBwYXJ0IHdoaWNoIG1hdGNoZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlLlxyXG4gICAgICogQHBhcmFtIG9wdGlvblxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5SHRtbChvcHRpb246IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYXlUZXh0ID0gdGhpcy5nZXREaXNwbGF5KG9wdGlvbikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgICAgIGxldCBkaXNwbGF5SHRtbCA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmZpbHRlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBkaXNwbGF5VGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBoaWdobGlnaHQgPSBgPHNwYW4gY2xhc3M9XCJ1eC1maWx0ZXItbWF0Y2hcIj4ke2Rpc3BsYXlUZXh0LnN1YnN0cihtYXRjaEluZGV4LCBsZW5ndGgpfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUh0bWwgPSBkaXNwbGF5VGV4dC5zdWJzdHIoMCwgbWF0Y2hJbmRleCkgKyBoaWdobGlnaHQgKyBkaXNwbGF5VGV4dC5zdWJzdHIobWF0Y2hJbmRleCArIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlIdG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbmZpbml0ZSBzY3JvbGwgY29tcG9uZW50IHNob3VsZCBsb2FkXHJcbiAgICAgKi9cclxuICAgIGlzSW5maW5pdGVTY3JvbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm9wdGlvbnMgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3RzIHRoZSBnaXZlbiBvcHRpb24sIGVtaXR0aW5nIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCBhbmQgY2xvc2luZyB0aGUgZHJvcGRvd24uXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdChuZXcgVHlwZWFoZWFkT3B0aW9uRXZlbnQob3B0aW9uLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb3B0aW9uIGlzIHBhcnQgb2YgdGhlIGRpc2FibGVkT3B0aW9ucyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaXNEaXNhYmxlZChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kaXNhYmxlZE9wdGlvbnMuZmluZCgoc2VsZWN0ZWRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEtleShzZWxlY3RlZE9wdGlvbikgPT09IG9wdGlvbi5rZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgZ2l2ZW4gb3B0aW9uIGFzIHRoZSBjdXJyZW50IGhpZ2hsaWdodGVkIG9wdGlvbiwgYXZhaWxhYmxlIGluIHRoZSBoaWdobGlnaHRlZE9wdGlvbiBwYXJhbWV0ZXIuXHJcbiAgICAgKi9cclxuICAgIGhpZ2hsaWdodChvcHRpb246IFR5cGVhaGVhZFZpc2libGVPcHRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmNyZW1lbnQgb3IgZGVjcmVtZW50IHRoZSBoaWdobGlnaHRlZCBvcHRpb24gaW4gdGhlIGxpc3QuIERpc2FibGVkIG9wdGlvbnMgYXJlIHNraXBwZWQuXHJcbiAgICAgKiBAcGFyYW0gZCBWYWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgaW5kZXggb2YgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiwgaS5lLiAtMSB0byBtb3ZlIGJhY2t3YXJkcywgKzEgdG8gbW92ZSBmb3J3YXJkcy5cclxuICAgICAqL1xyXG4gICAgbW92ZUhpZ2hsaWdodChkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy52aXNpYmxlT3B0aW9ucyQuZ2V0VmFsdWUoKTtcclxuICAgICAgICBjb25zdCBoaWdobGlnaHRJbmRleCA9IHRoaXMuaW5kZXhPZlZpc2libGVPcHRpb24odGhpcy5oaWdobGlnaHRlZCk7XHJcbiAgICAgICAgbGV0IG5ld0luZGV4ID0gaGlnaGxpZ2h0SW5kZXg7XHJcbiAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaW5Cb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCArIGQ7XHJcbiAgICAgICAgICAgIGluQm91bmRzID0gKG5ld0luZGV4ID49IDAgJiYgbmV3SW5kZXggPCB2aXNpYmxlT3B0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBkaXNhYmxlZCA9IGluQm91bmRzICYmIHRoaXMuaXNEaXNhYmxlZCh2aXNpYmxlT3B0aW9uc1tuZXdJbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoaW5Cb3VuZHMgJiYgZGlzYWJsZWQpO1xyXG5cclxuICAgICAgICBpZiAoIWRpc2FibGVkICYmIGluQm91bmRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQodmlzaWJsZU9wdGlvbnNbbmV3SW5kZXhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHVwIHRoZSBvcHRpb25zIGJlZm9yZSB0aGUgZHJvcGRvd24gaXMgZGlzcGxheWVkLlxyXG4gICAgICovXHJcbiAgICBpbml0T3B0aW9ucygpIHtcclxuICAgICAgICAvLyBDbGVhciBwcmV2aW91cyBoaWdobGlnaHRcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdEZpcnN0KSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBoaWdobGlnaHQgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCBvcHRpb24uXHJcbiAgICAgICAgICAgIHRoaXMubW92ZUhpZ2hsaWdodCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHZpc2libGVPcHRpb25zIGFycmF5IHdpdGggdGhlIGN1cnJlbnQgZmlsdGVyLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVPcHRpb25zKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxpc2VkSW5wdXQgPSAodGhpcy5maWx0ZXIgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5KG9wdGlvbikudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGlzZWRJbnB1dCkgPj0gMDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMkLm5leHQodmlzaWJsZU9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gb3B0aW9uIGluIHRoZSB2aXNpYmxlT3B0aW9ucyBhcnJheS4gUmV0dXJucyAtMSBpZiB0aGUgb3B0aW9uIGlzIG5vdCBjdXJyZW50bHkgdmlzaWJsZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbmRleE9mVmlzaWJsZU9wdGlvbihvcHRpb246IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25LZXkgPSB0aGlzLmdldEtleShvcHRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlT3B0aW9ucyQuZ2V0VmFsdWUoKS5maW5kSW5kZXgoKGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwua2V5ID09PSBvcHRpb25LZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEFQSSBhdmFpbGFibGUgdG8gb3B0aW9uIHRlbXBsYXRlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkT3B0aW9uQXBpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBrZXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0S2V5KG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uIHdpdGggSFRNTCBtYXJrdXAgYWRkZWQgdG8gaGlnaGxpZ2h0IHRoZSBwYXJ0IHdoaWNoIG1hdGNoZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlLiBPdmVycmlkZSB0aGUgdXgtZmlsdGVyLW1hdGNoIGNsYXNzIGluIENTUyB0byBtb2RpZnkgdGhlIGRlZmF1bHQgYXBwZWFyYW5jZS5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheUh0bWwob3B0aW9uOiBhbnkpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkVmlzaWJsZU9wdGlvbiB7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbn0iXX0=