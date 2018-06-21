/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged } from 'rxjs/operators';
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
        this._open = false;
        this._subscription = new Subscription();
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = (pageNum, pageSize, filter) => {
            if (typeof this.options === 'function') {
                return this.options(pageNum, pageSize, filter);
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
        let /** @type {?} */ displayText;
        if (typeof option === 'string') {
            displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        else {
            displayText = this.getDisplay(option.name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
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
            [class.highlighted]="(highlighted$ | async).key === option.key"
            [attr.aria-selected]="multiselectable ? isDisabled(option) : null"
            [uxTypeaheadHighlight]="(highlighted$ | async).key === option.key"
            [uxScrollIntoViewIf]="(highlighted$ | async).key === option.key"
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF3QixNQUFNLEVBQWlCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN00sT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQXFFakIsTUFBTTs7Ozs7O0lBNERGLFlBQ1csa0JBQ0MsUUFDQTtRQUZELHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDZixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO2tCQTdEMEIsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFOzBCQWFuRCxJQUFJLFlBQVksRUFBVzs2QkFLVixNQUFNO3lCQUNqQixPQUFPOytCQUMwQyxLQUFLO2tDQUM1QyxJQUFJO3dCQUNmLEVBQUU7MkJBQ0UsSUFBSTs4QkFNVCxJQUFJLFlBQVksRUFBd0I7aUNBRXJDLElBQUksWUFBWSxFQUFPO3dDQUNoQixJQUFJLFlBQVksRUFBZTsrQkFP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S0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7Z0NBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQywyQkFBMkI7bUNBQ2hELEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLO2dDQUVMLEtBQUs7K0JBQ0wsS0FBSztrQ0FDTCxLQUFLOytCQUVMLE1BQU07a0NBRU4sTUFBTTt5Q0FDTixNQUFNO3dDQUVOLFNBQVMsU0FBQyx3QkFBd0I7dUNBQ2xDLFNBQVMsU0FBQyx1QkFBdUI7MENBQ2pDLFNBQVMsU0FBQywwQkFBMEI7aUNBOEZwQyxZQUFZLFNBQUMsV0FBVzsrQkFLeEIsWUFBWSxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb24gfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi90eXBlYWhlYWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRTZXJ2aWNlIH0gZnJvbSAnLi90eXBlYWhlYWQuc2VydmljZSc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXR5cGVhaGVhZCcsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ1eC10eXBlYWhlYWQtb3B0aW9uc1wiXG4gICAgW3V4SW5maW5pdGVTY3JvbGxdPVwibG9hZE9wdGlvbnNDYWxsYmFja1wiXG4gICAgW2NvbGxlY3Rpb25dPVwidmlzaWJsZU9wdGlvbnMkIHwgYXN5bmNcIlxuICAgIChjb2xsZWN0aW9uQ2hhbmdlKT1cInZpc2libGVPcHRpb25zJC5uZXh0KCRldmVudClcIlxuICAgIFtlbmFibGVkXT1cImlzSW5maW5pdGVTY3JvbGwoKVwiXG4gICAgW2ZpbHRlcl09XCJmaWx0ZXJcIlxuICAgIFtsb2FkT25TY3JvbGxdPVwidHJ1ZVwiXG4gICAgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCJcbiAgICBbc2Nyb2xsRWxlbWVudF09XCJ0eXBlYWhlYWRFbGVtZW50XCJcbiAgICAobG9hZGluZyk9XCJsb2FkaW5nID0gdHJ1ZVwiXG4gICAgKGxvYWRlZCk9XCJsb2FkaW5nID0gZmFsc2VcIj5cblxuICAgIDxvbCAqbmdJZj1cIih2aXNpYmxlT3B0aW9ucyQgfCBhc3luYykubGVuZ3RoID4gMFwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiAodmlzaWJsZU9wdGlvbnMkIHwgYXN5bmMpOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgIFthdHRyLmlkXT1cImlkICsgJy1vcHRpb24tJyArIGlcIlxuICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRGlzYWJsZWQob3B0aW9uKVwiXG4gICAgICAgICAgICBbY2xhc3MuaGlnaGxpZ2h0ZWRdPVwiKGhpZ2hsaWdodGVkJCB8IGFzeW5jKS5rZXkgPT09IG9wdGlvbi5rZXlcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJtdWx0aXNlbGVjdGFibGUgPyBpc0Rpc2FibGVkKG9wdGlvbikgOiBudWxsXCJcbiAgICAgICAgICAgIFt1eFR5cGVhaGVhZEhpZ2hsaWdodF09XCIoaGlnaGxpZ2h0ZWQkIHwgYXN5bmMpLmtleSA9PT0gb3B0aW9uLmtleVwiXG4gICAgICAgICAgICBbdXhTY3JvbGxJbnRvVmlld0lmXT1cIihoaWdobGlnaHRlZCQgfCBhc3luYykua2V5ID09PSBvcHRpb24ua2V5XCJcbiAgICAgICAgICAgIFtzY3JvbGxQYXJlbnRdPVwidHlwZWFoZWFkRWxlbWVudC5uYXRpdmVFbGVtZW50XCJcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwib3B0aW9uTW91c2Vkb3duSGFuZGxlcigkZXZlbnQpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvcHRpb25DbGlja0hhbmRsZXIoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgICAgIChtb3VzZW92ZXIpPVwiaGlnaGxpZ2h0KG9wdGlvbilcIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJvcHRpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntvcHRpb246IG9wdGlvbi52YWx1ZSwgYXBpOiBvcHRpb25BcGl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2xpPlxuICAgIDwvb2w+XG5cbiAgICA8ZGl2ICp1eEluZmluaXRlU2Nyb2xsTG9hZGluZz5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsb2FkaW5nVGVtcGxhdGVcIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIih2aXNpYmxlT3B0aW9ucyQgfCBhc3luYykubGVuZ3RoID09PSAwICYmICFsb2FkaW5nXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJub09wdGlvbnNUZW1wbGF0ZVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdExvYWRpbmdUZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwidXgtdHlwZWFoZWFkLWxvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lci1hY2NlbnQgc3Bpbm5lci1ib3VuY2UtbWlkZGxlXCI+PC9kaXY+XG4gICAgICAgIDxkaXY+TG9hZGluZy4uLjwvZGl2PlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0T3B0aW9uVGVtcGxhdGUgbGV0LW9wdGlvbj1cIm9wdGlvblwiIGxldC1hcGk9XCJhcGlcIj5cbiAgICA8c3BhbiBjbGFzcz1cInV4LXR5cGVhaGVhZC1vcHRpb25cIiBbaW5uZXJIdG1sXT1cImFwaS5nZXREaXNwbGF5SHRtbChvcHRpb24pXCI+PC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0Tm9PcHRpb25zVGVtcGxhdGU+XG4gICAgPHNwYW4gY2xhc3M9XCJ1eC10eXBlYWhlYWQtbm8tb3B0aW9uc1wiPk5vIHJlc3VsdHM8L3NwYW4+XG48L25nLXRlbXBsYXRlPmAsXHJcbiAgICBwcm92aWRlcnM6IFtUeXBlYWhlYWRTZXJ2aWNlXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAncm9sZSc6ICdsaXN0Ym94JyxcclxuICAgICAgICAnW2NsYXNzLm9wZW5dJzogJ29wZW4nLFxyXG4gICAgICAgICdbY2xhc3MuZHJvcC11cF0nOiAnZHJvcERpcmVjdGlvbiA9PT0gXCJ1cFwiJyxcclxuICAgICAgICAnW3N0eWxlLm1heEhlaWdodF0nOiAnbWF4SGVpZ2h0J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHlwZWFoZWFkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5pZCcpIGlkOiBzdHJpbmcgPSBgdXgtdHlwZWFoZWFkLSR7Kyt1bmlxdWVJZH1gO1xyXG5cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueVtdIHwgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb247XHJcbiAgICBASW5wdXQoKSBmaWx0ZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoJ29wZW4nKVxyXG4gICAgZ2V0IG9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2Uub3BlbiQuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuICAgIHNldCBvcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuJC5uZXh0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNwbGF5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGtleTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZE9wdGlvbnM6IGFueVtdO1xyXG4gICAgQElucHV0KCkgZHJvcERpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gJzI1MHB4JztcclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZScpIG11bHRpc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgb3Blbk9uRmlsdGVyQ2hhbmdlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHBhZ2VTaXplOiBudW1iZXIgPSAyMDtcclxuICAgIEBJbnB1dCgpIHNlbGVjdEZpcnN0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBsb2FkaW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBvcHRpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VHlwZWFoZWFkT3B0aW9uRXZlbnQ+KCk7XHJcblxyXG4gICAgQE91dHB1dCgpIGhpZ2hsaWdodGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgaGlnaGxpZ2h0ZWRFbGVtZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4oKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdkZWZhdWx0TG9hZGluZ1RlbXBsYXRlJykgcHJpdmF0ZSBfZGVmYXVsdExvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRPcHRpb25UZW1wbGF0ZScpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHROb09wdGlvbnNUZW1wbGF0ZScpIHByaXZhdGUgX2RlZmF1bHROb09wdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBsb2FkT3B0aW9uc0NhbGxiYWNrOiBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIHZpc2libGVPcHRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHlwZWFoZWFkVmlzaWJsZU9wdGlvbltdPihbXSk7XHJcbiAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICBjbGlja2luZyA9IGZhbHNlO1xyXG4gICAgaGlnaGxpZ2h0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUeXBlYWhlYWRWaXNpYmxlT3B0aW9uPihudWxsKTtcclxuXHJcbiAgICBnZXQgaGlnaGxpZ2h0ZWQoKTogYW55IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaGlnaGxpZ2h0ZWQkLmdldFZhbHVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWUudmFsdWUgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgICBvcHRpb25BcGk6IFR5cGVhaGVhZE9wdGlvbkFwaSA9IHtcclxuICAgICAgICBnZXRLZXk6IHRoaXMuZ2V0S2V5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheTogdGhpcy5nZXREaXNwbGF5LmJpbmQodGhpcyksXHJcbiAgICAgICAgZ2V0RGlzcGxheUh0bWw6IHRoaXMuZ2V0RGlzcGxheUh0bWwuYmluZCh0aGlzKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdHlwZWFoZWFkRWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljZTogVHlwZWFoZWFkU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZE9wdGlvbnNDYWxsYmFjayA9IChwYWdlTnVtOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIGZpbHRlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zKHBhZ2VOdW0sIHBhZ2VTaXplLCBmaWx0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2Uub3BlbiQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKG5leHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KG5leHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLnN1YnNjcmliZSgobmV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZENoYW5nZS5lbWl0KG5leHQgPyBuZXh0LnZhbHVlIDogbnVsbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLl9zZXJ2aWNlLm9wZW4kLCB0aGlzLl9zZXJ2aWNlLmhpZ2hsaWdodGVkRWxlbWVudCQsIHRoaXMudmlzaWJsZU9wdGlvbnMkKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoW29wZW4sIGhpZ2hsaWdodGVkRWxlbWVudCwgdmlzaWJsZU9wdGlvbnNdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UuZW1pdChvcGVuICYmIHZpc2libGVPcHRpb25zLmxlbmd0aCA+IDAgPyBoaWdobGlnaHRlZEVsZW1lbnQgOiBudWxsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgLy8gQXR0YWNoIGRlZmF1bHQgbG9hZGluZyB0ZW1wbGF0ZVxyXG4gICAgICAgIGlmICghdGhpcy5sb2FkaW5nVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nVGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0TG9hZGluZ1RlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXR0YWNoIGRlZmF1bHQgb3B0aW9uIHRlbXBsYXRlXHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvblRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uVGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0T3B0aW9uVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdHRhY2ggZGVmYXVsdCBcIm5vIHJlc3VsdHNcIiB0ZW1wbGF0ZVxyXG4gICAgICAgIGlmICghdGhpcy5ub09wdGlvbnNUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vT3B0aW9uc1RlbXBsYXRlID0gdGhpcy5fZGVmYXVsdE5vT3B0aW9uc1RlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICAvLyBPcGVuIHRoZSBkcm9wZG93biBpZiB0aGUgZmlsdGVyIHZhbHVlIHVwZGF0ZXNcclxuICAgICAgICBpZiAoY2hhbmdlcy5maWx0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3Blbk9uRmlsdGVyQ2hhbmdlICYmIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmUtZmlsdGVyIHZpc2libGVPcHRpb25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJylcclxuICAgIG1vdXNlZG93bkhhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja2luZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcpXHJcbiAgICBtb3VzZXVwSGFuZGxlcigpIHtcclxuICAgICAgICB0aGlzLmNsaWNraW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9uTW91c2Vkb3duSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIFdvcmthcm91bmQgdG8gcHJldmVudCBmb2N1cyBjaGFuZ2luZyB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25DbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIG9wdGlvbjogVHlwZWFoZWFkVmlzaWJsZU9wdGlvbikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0KG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldEtleShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmtleSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmtleSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMua2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheShvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJyAmJiBvcHRpb24gJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24gd2l0aCBIVE1MIG1hcmt1cCBhZGRlZCB0byBoaWdobGlnaHQgdGhlIHBhcnQgd2hpY2ggbWF0Y2hlcyB0aGUgY3VycmVudCBmaWx0ZXIgdmFsdWUuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlIdG1sKG9wdGlvbjogYW55KSB7XHJcbiAgICAgICAgbGV0IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBkaXNwbGF5VGV4dCA9IHRoaXMuZ2V0RGlzcGxheShvcHRpb24pLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXNwbGF5VGV4dCA9IHRoaXMuZ2V0RGlzcGxheShvcHRpb24ubmFtZSkucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlzcGxheUh0bWwgPSBkaXNwbGF5VGV4dDtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5maWx0ZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gZGlzcGxheVRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGlnaGxpZ2h0ID0gYDxzcGFuIGNsYXNzPVwidXgtZmlsdGVyLW1hdGNoXCI+JHtkaXNwbGF5VGV4dC5zdWJzdHIobWF0Y2hJbmRleCwgbGVuZ3RoKX08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlIdG1sID0gZGlzcGxheVRleHQuc3Vic3RyKDAsIG1hdGNoSW5kZXgpICsgaGlnaGxpZ2h0ICsgZGlzcGxheVRleHQuc3Vic3RyKG1hdGNoSW5kZXggKyBsZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaXNwbGF5SHRtbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5maW5pdGUgc2Nyb2xsIGNvbXBvbmVudCBzaG91bGQgbG9hZFxyXG4gICAgICovXHJcbiAgICBpc0luZmluaXRlU2Nyb2xsKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnZnVuY3Rpb24nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyB0aGUgZ2l2ZW4gb3B0aW9uLCBlbWl0dGluZyB0aGUgb3B0aW9uU2VsZWN0ZWQgZXZlbnQgYW5kIGNsb3NpbmcgdGhlIGRyb3Bkb3duLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3Qob3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQob3B0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQobmV3IFR5cGVhaGVhZE9wdGlvbkV2ZW50KG9wdGlvbi52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG9wdGlvbiBpcyBwYXJ0IG9mIHRoZSBkaXNhYmxlZE9wdGlvbnMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIGlzRGlzYWJsZWQob3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWRPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGlzYWJsZWRPcHRpb25zLmZpbmQoKHNlbGVjdGVkT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXkoc2VsZWN0ZWRPcHRpb24pID09PSBvcHRpb24ua2V5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGdpdmVuIG9wdGlvbiBhcyB0aGUgY3VycmVudCBoaWdobGlnaHRlZCBvcHRpb24sIGF2YWlsYWJsZSBpbiB0aGUgaGlnaGxpZ2h0ZWRPcHRpb24gcGFyYW1ldGVyLlxyXG4gICAgICovXHJcbiAgICBoaWdobGlnaHQob3B0aW9uOiBUeXBlYWhlYWRWaXNpYmxlT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQob3B0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jcmVtZW50IG9yIGRlY3JlbWVudCB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGluIHRoZSBsaXN0LiBEaXNhYmxlZCBvcHRpb25zIGFyZSBza2lwcGVkLlxyXG4gICAgICogQHBhcmFtIGQgVmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIGluZGV4IG9mIHRoZSBoaWdobGlnaHRlZCBvcHRpb24sIGkuZS4gLTEgdG8gbW92ZSBiYWNrd2FyZHMsICsxIHRvIG1vdmUgZm9yd2FyZHMuXHJcbiAgICAgKi9cclxuICAgIG1vdmVIaWdobGlnaHQoZDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMudmlzaWJsZU9wdGlvbnMkLmdldFZhbHVlKCk7XHJcbiAgICAgICAgY29uc3QgaGlnaGxpZ2h0SW5kZXggPSB0aGlzLmluZGV4T2ZWaXNpYmxlT3B0aW9uKHRoaXMuaGlnaGxpZ2h0ZWQpO1xyXG4gICAgICAgIGxldCBuZXdJbmRleCA9IGhpZ2hsaWdodEluZGV4O1xyXG4gICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IGluQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggKyBkO1xyXG4gICAgICAgICAgICBpbkJvdW5kcyA9IChuZXdJbmRleCA+PSAwICYmIG5ld0luZGV4IDwgdmlzaWJsZU9wdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBpbkJvdW5kcyAmJiB0aGlzLmlzRGlzYWJsZWQodmlzaWJsZU9wdGlvbnNbbmV3SW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGluQm91bmRzICYmIGRpc2FibGVkKTtcclxuXHJcbiAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBpbkJvdW5kcykge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KHZpc2libGVPcHRpb25zW25ld0luZGV4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB1cCB0aGUgb3B0aW9ucyBiZWZvcmUgdGhlIGRyb3Bkb3duIGlzIGRpc3BsYXllZC5cclxuICAgICAqL1xyXG4gICAgaW5pdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgLy8gQ2xlYXIgcHJldmlvdXMgaGlnaGxpZ2h0XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dChudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RGaXJzdCkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgaGlnaGxpZ2h0IHRoZSBmaXJzdCBub24tZGlzYWJsZWQgb3B0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSB2aXNpYmxlT3B0aW9ucyBhcnJheSB3aXRoIHRoZSBjdXJyZW50IGZpbHRlci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlT3B0aW9ucygpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXNlZElucHV0ID0gKHRoaXMuZmlsdGVyIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheShvcHRpb24pLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpc2VkSW5wdXQpID49IDA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkodmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zJC5uZXh0KHZpc2libGVPcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIGdpdmVuIG9wdGlvbiBpbiB0aGUgdmlzaWJsZU9wdGlvbnMgYXJyYXkuIFJldHVybnMgLTEgaWYgdGhlIG9wdGlvbiBpcyBub3QgY3VycmVudGx5IHZpc2libGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5kZXhPZlZpc2libGVPcHRpb24ob3B0aW9uOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uS2V5ID0gdGhpcy5nZXRLZXkob3B0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMkLmdldFZhbHVlKCkuZmluZEluZGV4KChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmtleSA9PT0gb3B0aW9uS2V5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBBUEkgYXZhaWxhYmxlIHRvIG9wdGlvbiB0ZW1wbGF0ZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZE9wdGlvbkFwaSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IHZhbHVlIG9mIHRoZSBnaXZlbiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGdldEtleShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbiB3aXRoIEhUTUwgbWFya3VwIGFkZGVkIHRvIGhpZ2hsaWdodCB0aGUgcGFydCB3aGljaCBtYXRjaGVzIHRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZS4gT3ZlcnJpZGUgdGhlIHV4LWZpbHRlci1tYXRjaCBjbGFzcyBpbiBDU1MgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGFwcGVhcmFuY2UuXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlIdG1sKG9wdGlvbjogYW55KTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZFZpc2libGVPcHRpb24ge1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIGtleTogc3RyaW5nO1xyXG59Il19