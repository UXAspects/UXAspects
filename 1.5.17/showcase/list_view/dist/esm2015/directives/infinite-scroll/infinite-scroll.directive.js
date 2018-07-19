/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { auditTime, combineLatest, filter as filterOperator, first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { InfiniteScrollLoadButtonDirective } from './infinite-scroll-load-button.directive';
import { InfiniteScrollLoadingDirective } from './infinite-scroll-loading.directive';
export class InfiniteScrollDirective {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this._collection = [];
        this.enabled = true;
        this.loadOnInit = true;
        this.loadOnScroll = true;
        this.pageSize = 20;
        this.collectionChange = new EventEmitter();
        this.loadingEvent = new EventEmitter();
        this.loadedEvent = new EventEmitter();
        this.loadErrorEvent = new EventEmitter();
        this._nextPageNum = 0;
        this._updateRequests = new Subject();
        this._isLoading = new BehaviorSubject(false);
        this._isExhausted = new BehaviorSubject(false);
        this._loadButtonEnabled = new BehaviorSubject(false);
        this._subscriptions = [];
        this._loadButtonSubscriptions = [];
        this._onDestroy = new Subject();
        this._canLoadManually = this._isLoading.pipe(combineLatest(this._isExhausted, this._loadButtonEnabled, (isLoading, isExhausted, loadButtonEnabled) => {
            return !isLoading && !isExhausted && loadButtonEnabled;
        }));
    }
    /**
     * @return {?}
     */
    get collection() {
        return this._collection;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collection(value) {
        this.collectionChange.emit(value);
        this._collection = value;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    set scrollElement(element) {
        this._scrollElement = element instanceof ElementRef ? element : new ElementRef(element);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this._scrollElement) {
            this._scrollElement = this._element;
        }
        this._loadButtonEnabled.next(!this.loadOnScroll);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        this._updateRequests.pipe(filterOperator(request => request.check), auditTime(200), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        this._updateRequests.pipe(filterOperator(request => !request.check), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        if (this.enabled) {
            // Subscribe to scroll events and DOM changes.
            this.attachEventHandlers();
        }
        // Connect the Load More button visible state.
        this._canLoadManually.pipe(takeUntil(this._onDestroy)).subscribe(canLoad => {
            this._loadButtonQuery.forEach(loadButton => {
                loadButton.visible = canLoad;
            });
        });
        // Connect the loading indicator visible state.
        this._isLoading.pipe(takeUntil(this._onDestroy)).subscribe(isLoading => {
            this._loadingIndicatorQuery.forEach(loading => {
                loading.visible = isLoading;
            });
        });
        // Link the Load More button click event to trigger an update.
        this.attachLoadButtonEvents();
        this._loadButtonQuery.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.attachLoadButtonEvents();
        });
        // Initial update.
        if (this.loadOnInit) {
            this.loadNextPage();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ check = true;
        if (changes["enabled"] && changes["enabled"].currentValue !== changes["enabled"].previousValue) {
            if (changes["enabled"].currentValue) {
                this.attachEventHandlers();
                this.reset();
                check = false;
            }
            else {
                this.detachEventHandlers();
            }
        }
        if (this.enabled) {
            if (changes["filter"] && changes["filter"].currentValue !== changes["filter"].previousValue) {
                this.reset();
                check = false;
            }
            if (changes["loadOnScroll"]) {
                this._loadButtonEnabled.next(!changes["loadOnScroll"].currentValue);
            }
            if (changes["pageSize"] && changes["pageSize"].currentValue !== changes["pageSize"].previousValue) {
                this.reset();
                check = false;
            }
            this._updateRequests.next({
                check: check,
                pageNumber: this._nextPageNum,
                pageSize: this.pageSize,
                filter: this.filter
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.detachEventHandlers();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Request an additional page of data.
     * @return {?}
     */
    loadNextPage() {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     * @return {?}
     */
    check() {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: true,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }
    /**
     * Clear the collection. Future requests will load from page 0.
     * @return {?}
     */
    reset() {
        if (!this.enabled) {
            return;
        }
        // Reset the page counter.
        this._nextPageNum = 0;
        this._pages = [];
        // Clear the collection (without changing the reference).
        if (this.collection) {
            this.collection.length = 0;
        }
        // Reset the exhausted flag, allowing the Load More button to appear.
        this._isExhausted.next(false);
        // Cancel any pending requests
        if (this._subscriptions) {
            this._subscriptions.forEach(request => request.unsubscribe());
        }
    }
    /**
     * Reload the data without clearing the view.
     * @return {?}
     */
    reload() {
        this._pages.forEach((page, i) => this.reloadPage(i));
    }
    /**
     * Reload the data in a specific page without clearing the view.
     * @param {?} pageNum Page number
     * @return {?}
     */
    reloadPage(pageNum) {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: pageNum,
            pageSize: this.pageSize,
            filter: this.filter,
            reload: true
        });
    }
    /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    attachEventHandlers() {
        // if the scrollElement is documentElement we must watch for a scroll event on the document
        const /** @type {?} */ target = this._scrollElement.nativeElement instanceof HTMLHtmlElement ? document : this._scrollElement.nativeElement;
        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = fromEvent(target, 'scroll').subscribe(this.check.bind(this));
        // Subscribe to child DOM changes. The main effect of this is to check whether even more data is
        // required after the initial load.
        this._domObserver = new MutationObserver(this.check.bind(this));
        this._domObserver.observe(this._scrollElement.nativeElement, {
            childList: true,
            subtree: true
        });
    }
    /**
     * Detach scroll event handler and DOM observer.
     * @return {?}
     */
    detachEventHandlers() {
        if (this._scrollEventSub) {
            this._scrollEventSub.unsubscribe();
            this._scrollEventSub = null;
        }
        if (this._domObserver) {
            this._domObserver.disconnect();
            this._domObserver = null;
        }
    }
    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     * @return {?}
     */
    attachLoadButtonEvents() {
        this._loadButtonSubscriptions.forEach(s => s.unsubscribe());
        this._loadButtonSubscriptions = this._loadButtonQuery.map(loadButton => loadButton.load.subscribe(this.loadNextPage.bind(this)));
    }
    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     * @param {?} request
     * @return {?}
     */
    doRequest(request) {
        // Load a new page if the scroll position is beyond the threshhold and if the client code did not
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {
            // Invoke the callback load function, which returns a promose or plain data.
            const /** @type {?} */ loadResult = this.load(request.pageNumber, request.pageSize, request.filter);
            const /** @type {?} */ observable = Array.isArray(loadResult) ? of(loadResult) : from(loadResult);
            const /** @type {?} */ subscription = observable.pipe(first()).subscribe(items => {
                // Make sure that the parameters have not changed since the load started;
                // otherwise discard the results.
                if (request.filter === this.filter && request.pageSize === this.pageSize) {
                    if (items && items.length) {
                        this.setPageItems(request.pageNumber, items);
                    }
                    // Emit the loaded event
                    this.endLoading(request, items);
                }
            }, reason => {
                // Emit the loadError event
                this.endLoadingWithError(request, reason);
            }, () => {
                // remove this request from the list
                this._subscriptions = this._subscriptions.filter(s => s !== subscription);
            });
            // add the subscription to the list of requests
            this._subscriptions.push(subscription);
        }
    }
    /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
     */
    needsData(request) {
        if (!this.enabled) {
            return false;
        }
        // Always load for a load request
        if (!request.check) {
            return true;
        }
        // Ignore a check request when the end of data has been detected, or if data is currently loading.
        if (this._isExhausted.getValue() || this._isLoading.getValue()) {
            return false;
        }
        // Load if the remaining scroll area is <= the element height.
        if (this._scrollElement && this.loadOnScroll) {
            const /** @type {?} */ element = /** @type {?} */ (this._scrollElement.nativeElement);
            const /** @type {?} */ remainingScroll = element.scrollHeight -
                (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }
        return false;
    }
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    beginLoading(request) {
        const /** @type {?} */ event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);
        this._isLoading.next(!event.defaultPrevented());
        return !event.defaultPrevented();
    }
    /**
     * @param {?} pageNum
     * @param {?} items
     * @return {?}
     */
    setPageItems(pageNum, items) {
        this._pages[pageNum] = items;
        this.collection = this._pages.reduce((previous, current) => previous.concat(current), []);
    }
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    endLoading(request, data) {
        this._isLoading.next(false);
        const /** @type {?} */ isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);
        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));
        if (!request.reload) {
            this._nextPageNum += 1;
        }
    }
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    endLoadingWithError(request, error) {
        this._isLoading.next(false);
        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    }
}
InfiniteScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxInfiniteScroll]',
                exportAs: 'uxInfiniteScroll'
            },] },
];
/** @nocollapse */
InfiniteScrollDirective.ctorParameters = () => [
    { type: ElementRef, },
];
InfiniteScrollDirective.propDecorators = {
    "load": [{ type: Input, args: ['uxInfiniteScroll',] },],
    "_collection": [{ type: Input, args: ['collection',] },],
    "scrollElement": [{ type: Input },],
    "enabled": [{ type: Input },],
    "filter": [{ type: Input },],
    "loadOnInit": [{ type: Input },],
    "loadOnScroll": [{ type: Input },],
    "pageSize": [{ type: Input },],
    "collectionChange": [{ type: Output },],
    "loadingEvent": [{ type: Output, args: ['loading',] },],
    "loadedEvent": [{ type: Output, args: ['loaded',] },],
    "loadErrorEvent": [{ type: Output, args: ['loadError',] },],
    "_loadButtonQuery": [{ type: ContentChildren, args: [InfiniteScrollLoadButtonDirective,] },],
    "_loadingIndicatorQuery": [{ type: ContentChildren, args: [InfiniteScrollLoadingDirective,] },],
};
function InfiniteScrollDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    InfiniteScrollDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    InfiniteScrollDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    InfiniteScrollDirective.propDecorators;
    /** @type {?} */
    InfiniteScrollDirective.prototype.load;
    /** @type {?} */
    InfiniteScrollDirective.prototype._collection;
    /** @type {?} */
    InfiniteScrollDirective.prototype.enabled;
    /** @type {?} */
    InfiniteScrollDirective.prototype.filter;
    /** @type {?} */
    InfiniteScrollDirective.prototype.loadOnInit;
    /** @type {?} */
    InfiniteScrollDirective.prototype.loadOnScroll;
    /** @type {?} */
    InfiniteScrollDirective.prototype.pageSize;
    /** @type {?} */
    InfiniteScrollDirective.prototype.collectionChange;
    /** @type {?} */
    InfiniteScrollDirective.prototype.loadingEvent;
    /** @type {?} */
    InfiniteScrollDirective.prototype.loadedEvent;
    /** @type {?} */
    InfiniteScrollDirective.prototype.loadErrorEvent;
    /** @type {?} */
    InfiniteScrollDirective.prototype._loadButtonQuery;
    /** @type {?} */
    InfiniteScrollDirective.prototype._loadingIndicatorQuery;
    /** @type {?} */
    InfiniteScrollDirective.prototype._pages;
    /** @type {?} */
    InfiniteScrollDirective.prototype._nextPageNum;
    /** @type {?} */
    InfiniteScrollDirective.prototype._domObserver;
    /** @type {?} */
    InfiniteScrollDirective.prototype._scrollEventSub;
    /** @type {?} */
    InfiniteScrollDirective.prototype._updateRequests;
    /** @type {?} */
    InfiniteScrollDirective.prototype._isLoading;
    /** @type {?} */
    InfiniteScrollDirective.prototype._isExhausted;
    /** @type {?} */
    InfiniteScrollDirective.prototype._loadButtonEnabled;
    /** @type {?} */
    InfiniteScrollDirective.prototype._canLoadManually;
    /** @type {?} */
    InfiniteScrollDirective.prototype._scrollElement;
    /** @type {?} */
    InfiniteScrollDirective.prototype._subscriptions;
    /** @type {?} */
    InfiniteScrollDirective.prototype._loadButtonSubscriptions;
    /** @type {?} */
    InfiniteScrollDirective.prototype._onDestroy;
    /** @type {?} */
    InfiniteScrollDirective.prototype._element;
}
/**
 * The internal data associated with a load/check request.
 */
class InfiniteScrollRequest {
}
function InfiniteScrollRequest_tsickle_Closure_declarations() {
    /** @type {?} */
    InfiniteScrollRequest.prototype.check;
    /** @type {?} */
    InfiniteScrollRequest.prototype.pageNumber;
    /** @type {?} */
    InfiniteScrollRequest.prototype.pageSize;
    /** @type {?} */
    InfiniteScrollRequest.prototype.filter;
    /** @type {?} */
    InfiniteScrollRequest.prototype.reload;
}
/**
 * Event raised before the `loading` function is called.
 */
export class InfiniteScrollLoadingEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     */
    constructor(pageNumber, pageSize, filter) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this._defaultPrevented = false;
    }
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    preventDefault() {
        this._defaultPrevented = true;
    }
    /**
     * @return {?}
     */
    defaultPrevented() {
        return this._defaultPrevented;
    }
}
function InfiniteScrollLoadingEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    InfiniteScrollLoadingEvent.prototype._defaultPrevented;
    /**
     * The index of the requested page, starting from 0.
     * @type {?}
     */
    InfiniteScrollLoadingEvent.prototype.pageNumber;
    /**
     * The number of items requested.
     * @type {?}
     */
    InfiniteScrollLoadingEvent.prototype.pageSize;
    /**
     * The filter details as provided via the `filter` binding.
     * @type {?}
     */
    InfiniteScrollLoadingEvent.prototype.filter;
}
/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
export class InfiniteScrollLoadedEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} data
     * @param {?} exhausted
     */
    constructor(pageNumber, pageSize, filter, data, exhausted) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this.data = data;
        this.exhausted = exhausted;
    }
}
function InfiniteScrollLoadedEvent_tsickle_Closure_declarations() {
    /**
     * The index of the requested page, starting from 0.
     * @type {?}
     */
    InfiniteScrollLoadedEvent.prototype.pageNumber;
    /**
     * The number of items requested.
     * @type {?}
     */
    InfiniteScrollLoadedEvent.prototype.pageSize;
    /**
     * The filter details as provided via the `filter` binding.
     * @type {?}
     */
    InfiniteScrollLoadedEvent.prototype.filter;
    /**
     * The result of the promise returned from the loading function.
     * @type {?}
     */
    InfiniteScrollLoadedEvent.prototype.data;
    /**
     * True if the data is considered exhausted (number of items returned less than `pageSize`).
     * @type {?}
     */
    InfiniteScrollLoadedEvent.prototype.exhausted;
}
/**
 * Event raised if the loading function returns a rejected promise.
 */
export class InfiniteScrollLoadErrorEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} error
     */
    constructor(pageNumber, pageSize, filter, error) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this.error = error;
    }
}
function InfiniteScrollLoadErrorEvent_tsickle_Closure_declarations() {
    /**
     * The index of the requested page, starting from 0.
     * @type {?}
     */
    InfiniteScrollLoadErrorEvent.prototype.pageNumber;
    /**
     * The number of items requested.
     * @type {?}
     */
    InfiniteScrollLoadErrorEvent.prototype.pageSize;
    /**
     * The filter details as provided via the `filter` binding.
     * @type {?}
     */
    InfiniteScrollLoadErrorEvent.prototype.filter;
    /**
     * The object provided when rejecting the promise.
     * @type {?}
     */
    InfiniteScrollLoadErrorEvent.prototype.error;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmZpbml0ZS1zY3JvbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzlLLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxNQUFNLElBQUksY0FBYyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBTXJGLE1BQU07Ozs7SUF5REYsWUFBb0IsUUFBb0I7UUFBcEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTsyQkFyREUsRUFBRTt1QkFjaEIsSUFBSTswQkFFRCxJQUFJOzRCQUNGLElBQUk7d0JBQ1QsRUFBRTtnQ0FFRCxJQUFJLFlBQVksRUFBUzs0QkFHdkMsSUFBSSxZQUFZLEVBQThCOzJCQUcvQyxJQUFJLFlBQVksRUFBNkI7OEJBRzFDLElBQUksWUFBWSxFQUFnQzs0QkFT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Q1osTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztLQUNqQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtELE1BQU07Ozs7Ozs7O0lBQ0YsWUFJVyxZQUlBLFVBSUEsUUFJQSxNQUlBO1FBaEJBLGVBQVUsR0FBVixVQUFVO1FBSVYsYUFBUSxHQUFSLFFBQVE7UUFJUixXQUFNLEdBQU4sTUFBTTtRQUlOLFNBQUksR0FBSixJQUFJO1FBSUosY0FBUyxHQUFULFNBQVM7S0FDZjtDQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0QsTUFBTTs7Ozs7OztJQUNGLFlBSVcsWUFJQSxVQUlBLFFBSUE7UUFaQSxlQUFVLEdBQVYsVUFBVTtRQUlWLGFBQVEsR0FBUixRQUFRO1FBSVIsV0FBTSxHQUFOLE1BQU07UUFJTixVQUFLLEdBQUwsS0FBSztLQUNYO0NBQ1IiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb20nO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIGNvbWJpbmVMYXRlc3QsIGZpbHRlciBhcyBmaWx0ZXJPcGVyYXRvciwgZmlyc3QsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxMb2FkQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9pbmZpbml0ZS1zY3JvbGwtbG9hZC1idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTG9hZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vaW5maW5pdGUtc2Nyb2xsLWxvYWRpbmcuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhJbmZpbml0ZVNjcm9sbF0nLFxuICAgIGV4cG9ydEFzOiAndXhJbmZpbml0ZVNjcm9sbCdcbn0pXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgndXhJbmZpbml0ZVNjcm9sbCcpIGxvYWQ6IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xuXG4gICAgQElucHV0KCdjb2xsZWN0aW9uJykgX2NvbGxlY3Rpb246IGFueVtdID0gW107XG4gICAgZ2V0IGNvbGxlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uO1xuICAgIH1cbiAgICBzZXQgY29sbGVjdGlvbih2YWx1ZTogYW55W10pIHtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBASW5wdXQoKSBzZXQgc2Nyb2xsRWxlbWVudChlbGVtZW50OiBFbGVtZW50UmVmIHwgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsRWxlbWVudCA9IGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50UmVmID8gZWxlbWVudCA6IG5ldyBFbGVtZW50UmVmKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGZpbHRlcjogYW55O1xuICAgIEBJbnB1dCgpIGxvYWRPbkluaXQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGxvYWRPblNjcm9sbDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlciA9IDIwO1xuXG4gICAgQE91dHB1dCgpIGNvbGxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gICAgQE91dHB1dCgnbG9hZGluZycpXG4gICAgbG9hZGluZ0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxJbmZpbml0ZVNjcm9sbExvYWRpbmdFdmVudD4oKTtcblxuICAgIEBPdXRwdXQoJ2xvYWRlZCcpXG4gICAgbG9hZGVkRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEluZmluaXRlU2Nyb2xsTG9hZGVkRXZlbnQ+KCk7XG5cbiAgICBAT3V0cHV0KCdsb2FkRXJyb3InKVxuICAgIGxvYWRFcnJvckV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxJbmZpbml0ZVNjcm9sbExvYWRFcnJvckV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihJbmZpbml0ZVNjcm9sbExvYWRCdXR0b25EaXJlY3RpdmUpXG4gICAgcHJpdmF0ZSBfbG9hZEJ1dHRvblF1ZXJ5OiBRdWVyeUxpc3Q8SW5maW5pdGVTY3JvbGxMb2FkQnV0dG9uRGlyZWN0aXZlPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oSW5maW5pdGVTY3JvbGxMb2FkaW5nRGlyZWN0aXZlKVxuICAgIHByaXZhdGUgX2xvYWRpbmdJbmRpY2F0b3JRdWVyeTogUXVlcnlMaXN0PEluZmluaXRlU2Nyb2xsTG9hZGluZ0RpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIF9wYWdlczogYW55W11bXTtcbiAgICBwcml2YXRlIF9uZXh0UGFnZU51bSA9IDA7XG4gICAgcHJpdmF0ZSBfZG9tT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgcHJpdmF0ZSBfc2Nyb2xsRXZlbnRTdWI6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIF91cGRhdGVSZXF1ZXN0cyA9IG5ldyBTdWJqZWN0PEluZmluaXRlU2Nyb2xsUmVxdWVzdD4oKTtcblxuICAgIHByaXZhdGUgX2lzTG9hZGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIHByaXZhdGUgX2lzRXhoYXVzdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgcHJpdmF0ZSBfbG9hZEJ1dHRvbkVuYWJsZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBwcml2YXRlIF9jYW5Mb2FkTWFudWFsbHk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgICBwcml2YXRlIF9zY3JvbGxFbGVtZW50OiBFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gICAgcHJpdmF0ZSBfbG9hZEJ1dHRvblN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5fY2FuTG9hZE1hbnVhbGx5ID0gdGhpcy5faXNMb2FkaW5nLnBpcGUoY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgIHRoaXMuX2lzRXhoYXVzdGVkLFxuICAgICAgICAgICAgdGhpcy5fbG9hZEJ1dHRvbkVuYWJsZWQsXG4gICAgICAgICAgICAoaXNMb2FkaW5nLCBpc0V4aGF1c3RlZCwgbG9hZEJ1dHRvbkVuYWJsZWQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWlzTG9hZGluZyAmJiAhaXNFeGhhdXN0ZWQgJiYgbG9hZEJ1dHRvbkVuYWJsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Njcm9sbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZEJ1dHRvbkVuYWJsZWQubmV4dCghdGhpcy5sb2FkT25TY3JvbGwpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblxuICAgICAgICAvLyBUaGVyZSBhcmUgdHdvIGtpbmRzIG9mIHVwZGF0ZSByZXF1ZXN0czogY2hlY2sgYW5kIGxvYWQuXG4gICAgICAgIC8vIENoZWNrIHJlcXVlc3RzIGFyZSB0aHJvdHRsZWQgYW5kIHdpbGwgb25seSBjYXVzZSBhbiB1cGRhdGUgaWYgbW9yZSBkYXRhIGlzIHJlcXVpcmVkXG4gICAgICAgIC8vIHRvIGZpbGwgdGhlIHNjcm9sbGluZyB2aWV3LCBhbmQgaXQgaXNuJ3QgYWxyZWFkeSBsb2FkaW5nIHNvbWUuXG4gICAgICAgIC8vIExvYWQgcmVxdWVzdHMgYXJlIG5vdCB0aHJvdHRsZWQgYW5kIGFsd2F5cyByZXF1ZXN0IGEgcGFnZSBvZiBkYXRhLlxuICAgICAgICB0aGlzLl91cGRhdGVSZXF1ZXN0cy5waXBlKGZpbHRlck9wZXJhdG9yKHJlcXVlc3QgPT4gcmVxdWVzdC5jaGVjayksIGF1ZGl0VGltZSgyMDApLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMuZG9SZXF1ZXN0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl91cGRhdGVSZXF1ZXN0cy5waXBlKGZpbHRlck9wZXJhdG9yKHJlcXVlc3QgPT4gIXJlcXVlc3QuY2hlY2spLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMuZG9SZXF1ZXN0LmJpbmQodGhpcykpO1xuXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIFN1YnNjcmliZSB0byBzY3JvbGwgZXZlbnRzIGFuZCBET00gY2hhbmdlcy5cbiAgICAgICAgICAgIHRoaXMuYXR0YWNoRXZlbnRIYW5kbGVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29ubmVjdCB0aGUgTG9hZCBNb3JlIGJ1dHRvbiB2aXNpYmxlIHN0YXRlLlxuICAgICAgICB0aGlzLl9jYW5Mb2FkTWFudWFsbHkucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGNhbkxvYWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9hZEJ1dHRvblF1ZXJ5LmZvckVhY2gobG9hZEJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZEJ1dHRvbi52aXNpYmxlID0gY2FuTG9hZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb25uZWN0IHRoZSBsb2FkaW5nIGluZGljYXRvciB2aXNpYmxlIHN0YXRlLlxuICAgICAgICB0aGlzLl9pc0xvYWRpbmcucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGlzTG9hZGluZyA9PiB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nSW5kaWNhdG9yUXVlcnkuZm9yRWFjaChsb2FkaW5nID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nLnZpc2libGUgPSBpc0xvYWRpbmc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGluayB0aGUgTG9hZCBNb3JlIGJ1dHRvbiBjbGljayBldmVudCB0byB0cmlnZ2VyIGFuIHVwZGF0ZS5cbiAgICAgICAgdGhpcy5hdHRhY2hMb2FkQnV0dG9uRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2xvYWRCdXR0b25RdWVyeS5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaExvYWRCdXR0b25FdmVudHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW5pdGlhbCB1cGRhdGUuXG4gICAgICAgIGlmICh0aGlzLmxvYWRPbkluaXQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZE5leHRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGxldCBjaGVjayA9IHRydWU7XG5cbiAgICAgICAgaWYgKGNoYW5nZXMuZW5hYmxlZCAmJiBjaGFuZ2VzLmVuYWJsZWQuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmVuYWJsZWQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZW5hYmxlZC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2hFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5maWx0ZXIgJiYgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmZpbHRlci5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmxvYWRPblNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRCdXR0b25FbmFibGVkLm5leHQoXG4gICAgICAgICAgICAgICAgICAgICFjaGFuZ2VzLmxvYWRPblNjcm9sbC5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5wYWdlU2l6ZSAmJiBjaGFuZ2VzLnBhZ2VTaXplLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5wYWdlU2l6ZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJlcXVlc3RzLm5leHQoe1xuICAgICAgICAgICAgICAgIGNoZWNrOiBjaGVjayxcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyOiB0aGlzLl9uZXh0UGFnZU51bSxcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRldGFjaEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBhbiBhZGRpdGlvbmFsIHBhZ2Ugb2YgZGF0YS5cbiAgICAgKi9cbiAgICBsb2FkTmV4dFBhZ2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVSZXF1ZXN0cy5uZXh0KHtcbiAgICAgICAgICAgIGNoZWNrOiBmYWxzZSxcbiAgICAgICAgICAgIHBhZ2VOdW1iZXI6IHRoaXMuX25leHRQYWdlTnVtLFxuICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgYSBjaGVjayBmb3Igd2hldGhlciBhbiBhZGRpdGlvbmFsIHBhZ2Ugb2YgZGF0YSBpcyByZXF1aXJlZC4gVGhpcyBpcyB0aHJvdHRsZWQuXG4gICAgICovXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVSZXF1ZXN0cy5uZXh0KHtcbiAgICAgICAgICAgIGNoZWNrOiB0cnVlLFxuICAgICAgICAgICAgcGFnZU51bWJlcjogdGhpcy5fbmV4dFBhZ2VOdW0sXG4gICAgICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGNvbGxlY3Rpb24uIEZ1dHVyZSByZXF1ZXN0cyB3aWxsIGxvYWQgZnJvbSBwYWdlIDAuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCB0aGUgcGFnZSBjb3VudGVyLlxuICAgICAgICB0aGlzLl9uZXh0UGFnZU51bSA9IDA7XG5cbiAgICAgICAgdGhpcy5fcGFnZXMgPSBbXTtcblxuICAgICAgICAvLyBDbGVhciB0aGUgY29sbGVjdGlvbiAod2l0aG91dCBjaGFuZ2luZyB0aGUgcmVmZXJlbmNlKS5cbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCB0aGUgZXhoYXVzdGVkIGZsYWcsIGFsbG93aW5nIHRoZSBMb2FkIE1vcmUgYnV0dG9uIHRvIGFwcGVhci5cbiAgICAgICAgdGhpcy5faXNFeGhhdXN0ZWQubmV4dChmYWxzZSk7XG5cbiAgICAgICAgLy8gQ2FuY2VsIGFueSBwZW5kaW5nIHJlcXVlc3RzXG4gICAgICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2gocmVxdWVzdCA9PiByZXF1ZXN0LnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsb2FkIHRoZSBkYXRhIHdpdGhvdXQgY2xlYXJpbmcgdGhlIHZpZXcuXG4gICAgICovXG4gICAgcmVsb2FkKCkge1xuICAgICAgICB0aGlzLl9wYWdlcy5mb3JFYWNoKChwYWdlLCBpKSA9PiB0aGlzLnJlbG9hZFBhZ2UoaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZCB0aGUgZGF0YSBpbiBhIHNwZWNpZmljIHBhZ2Ugd2l0aG91dCBjbGVhcmluZyB0aGUgdmlldy5cbiAgICAgKiBAcGFyYW0gcGFnZU51bSBQYWdlIG51bWJlclxuICAgICAqL1xuICAgIHJlbG9hZFBhZ2UocGFnZU51bTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVSZXF1ZXN0cy5uZXh0KHtcbiAgICAgICAgICAgIGNoZWNrOiBmYWxzZSxcbiAgICAgICAgICAgIHBhZ2VOdW1iZXI6IHBhZ2VOdW0sXG4gICAgICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgICAgICByZWxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoIHNjcm9sbCBldmVudCBoYW5kbGVyIGFuZCBET00gb2JzZXJ2ZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhdHRhY2hFdmVudEhhbmRsZXJzKCkge1xuXG4gICAgICAgIC8vIGlmIHRoZSBzY3JvbGxFbGVtZW50IGlzIGRvY3VtZW50RWxlbWVudCB3ZSBtdXN0IHdhdGNoIGZvciBhIHNjcm9sbCBldmVudCBvbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fc2Nyb2xsRWxlbWVudC5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEh0bWxFbGVtZW50ID8gZG9jdW1lbnQgOiB0aGlzLl9zY3JvbGxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIHRoZSBzY3JvbGwgZXZlbnQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAgICB0aGlzLl9zY3JvbGxFdmVudFN1YiA9IGZyb21FdmVudCh0YXJnZXQsICdzY3JvbGwnKS5zdWJzY3JpYmUodGhpcy5jaGVjay5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hpbGQgRE9NIGNoYW5nZXMuIFRoZSBtYWluIGVmZmVjdCBvZiB0aGlzIGlzIHRvIGNoZWNrIHdoZXRoZXIgZXZlbiBtb3JlIGRhdGEgaXNcbiAgICAgICAgLy8gcmVxdWlyZWQgYWZ0ZXIgdGhlIGluaXRpYWwgbG9hZC5cbiAgICAgICAgdGhpcy5fZG9tT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLmNoZWNrLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl9kb21PYnNlcnZlci5vYnNlcnZlKHRoaXMuX3Njcm9sbEVsZW1lbnQubmF0aXZlRWxlbWVudCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2ggc2Nyb2xsIGV2ZW50IGhhbmRsZXIgYW5kIERPTSBvYnNlcnZlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRldGFjaEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxFdmVudFN1Yikge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbEV2ZW50U3ViID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kb21PYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5fZG9tT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5fZG9tT2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFueSBleGlzdGluZyBldmVudCBzdWJzY3JpcHRpb25zIGZvciB0aGUgbG9hZCBidXR0b24gYGxvYWRgIGV2ZW50LCB0aGVuIGF0dGFjaCBzdWJzY3JpcHRpb25zXG4gICAgICogZm9yIGFueSBpbiB0aGUgcXVlcnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhdHRhY2hMb2FkQnV0dG9uRXZlbnRzKCkge1xuICAgICAgICB0aGlzLl9sb2FkQnV0dG9uU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgdGhpcy5fbG9hZEJ1dHRvblN1YnNjcmlwdGlvbnMgPSB0aGlzLl9sb2FkQnV0dG9uUXVlcnkubWFwKFxuICAgICAgICAgICAgbG9hZEJ1dHRvbiA9PiBsb2FkQnV0dG9uLmxvYWQuc3Vic2NyaWJlKHRoaXMubG9hZE5leHRQYWdlLmJpbmQodGhpcykpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZGl0aW9uYWxseSBsb2FkcyBhIHBhZ2UgaW50byB0aGUgY29sbGVjdGlvbiBiYXNlZCBvbiBkaXJlY3RpdmUgc3RhdGUgYW5kIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRvUmVxdWVzdChyZXF1ZXN0OiBJbmZpbml0ZVNjcm9sbFJlcXVlc3QpIHtcblxuICAgICAgICAvLyBMb2FkIGEgbmV3IHBhZ2UgaWYgdGhlIHNjcm9sbCBwb3NpdGlvbiBpcyBiZXlvbmQgdGhlIHRocmVzaGhvbGQgYW5kIGlmIHRoZSBjbGllbnQgY29kZSBkaWQgbm90XG4gICAgICAgIC8vIGNhbmNlbC5cbiAgICAgICAgaWYgKHRoaXMubmVlZHNEYXRhKHJlcXVlc3QpICYmIHRoaXMuYmVnaW5Mb2FkaW5nKHJlcXVlc3QpKSB7XG5cbiAgICAgICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgbG9hZCBmdW5jdGlvbiwgd2hpY2ggcmV0dXJucyBhIHByb21vc2Ugb3IgcGxhaW4gZGF0YS5cbiAgICAgICAgICAgIGNvbnN0IGxvYWRSZXN1bHQgPSB0aGlzLmxvYWQocmVxdWVzdC5wYWdlTnVtYmVyLCByZXF1ZXN0LnBhZ2VTaXplLCByZXF1ZXN0LmZpbHRlcik7XG5cbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBBcnJheS5pc0FycmF5KGxvYWRSZXN1bHQpID8gb2YobG9hZFJlc3VsdCkgOiBmcm9tPGFueVtdPihsb2FkUmVzdWx0KTtcblxuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gb2JzZXJ2YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBwYXJhbWV0ZXJzIGhhdmUgbm90IGNoYW5nZWQgc2luY2UgdGhlIGxvYWQgc3RhcnRlZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGRpc2NhcmQgdGhlIHJlc3VsdHMuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmZpbHRlciA9PT0gdGhpcy5maWx0ZXIgJiYgcmVxdWVzdC5wYWdlU2l6ZSA9PT0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFnZUl0ZW1zKHJlcXVlc3QucGFnZU51bWJlciwgaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbWl0IHRoZSBsb2FkZWQgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kTG9hZGluZyhyZXF1ZXN0LCBpdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVtaXQgdGhlIGxvYWRFcnJvciBldmVudFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZExvYWRpbmdXaXRoRXJyb3IocmVxdWVzdCwgcmVhc29uKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoaXMgcmVxdWVzdCBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zLmZpbHRlcihzID0+IHMgIT09IHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBzdWJzY3JpcHRpb24gdG8gdGhlIGxpc3Qgb2YgcmVxdWVzdHNcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByZXF1ZXN0IHNob3VsZCBiZSBmdWxmaWxsZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBuZWVkc0RhdGEocmVxdWVzdDogSW5maW5pdGVTY3JvbGxSZXF1ZXN0KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbHdheXMgbG9hZCBmb3IgYSBsb2FkIHJlcXVlc3RcbiAgICAgICAgaWYgKCFyZXF1ZXN0LmNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElnbm9yZSBhIGNoZWNrIHJlcXVlc3Qgd2hlbiB0aGUgZW5kIG9mIGRhdGEgaGFzIGJlZW4gZGV0ZWN0ZWQsIG9yIGlmIGRhdGEgaXMgY3VycmVudGx5IGxvYWRpbmcuXG4gICAgICAgIGlmICh0aGlzLl9pc0V4aGF1c3RlZC5nZXRWYWx1ZSgpIHx8IHRoaXMuX2lzTG9hZGluZy5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2FkIGlmIHRoZSByZW1haW5pbmcgc2Nyb2xsIGFyZWEgaXMgPD0gdGhlIGVsZW1lbnQgaGVpZ2h0LlxuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsRWxlbWVudCAmJiB0aGlzLmxvYWRPblNjcm9sbCkge1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMuX3Njcm9sbEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZ1Njcm9sbCA9XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICAgICAgICAgIChlbGVtZW50LnNjcm9sbFRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlbWFpbmluZ1Njcm9sbCA8PSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHN0YXRlIGZvciB0aGUgYmVnaW5uaW5nIG9mIGEgbG9hZC4gUmV0dXJucyBmYWxzZSBpZiB0aGUgYGxvYWRpbmdgIGV2ZW50IHdhcyBjYW5jZWxsZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBiZWdpbkxvYWRpbmcocmVxdWVzdDogSW5maW5pdGVTY3JvbGxSZXF1ZXN0KTogYm9vbGVhbiB7XG5cbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgSW5maW5pdGVTY3JvbGxMb2FkaW5nRXZlbnQoXG4gICAgICAgICAgICByZXF1ZXN0LnBhZ2VOdW1iZXIsXG4gICAgICAgICAgICByZXF1ZXN0LnBhZ2VTaXplLFxuICAgICAgICAgICAgcmVxdWVzdC5maWx0ZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRXZlbnQuZW1pdChldmVudCk7XG5cbiAgICAgICAgdGhpcy5faXNMb2FkaW5nLm5leHQoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKSk7XG5cbiAgICAgICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYWdlSXRlbXMocGFnZU51bTogbnVtYmVyLCBpdGVtczogYW55W10pIHtcbiAgICAgICAgdGhpcy5fcGFnZXNbcGFnZU51bV0gPSBpdGVtcztcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gdGhpcy5fcGFnZXMucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gcHJldmlvdXMuY29uY2F0KGN1cnJlbnQpLCBbXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBzdGF0ZSBmcm9tIGEgc3VjY2Vzc2Z1bCBsb2FkLiBSYWlzZXMgdGhlIGBsb2FkZWRgIGV2ZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZW5kTG9hZGluZyhyZXF1ZXN0OiBJbmZpbml0ZVNjcm9sbFJlcXVlc3QsIGRhdGE/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nLm5leHQoZmFsc2UpO1xuXG4gICAgICAgIGNvbnN0IGlzRXhoYXVzdGVkID0gISEoZGF0YSAmJiBkYXRhLmxlbmd0aCA8IHRoaXMucGFnZVNpemUpO1xuICAgICAgICB0aGlzLl9pc0V4aGF1c3RlZC5uZXh0KGlzRXhoYXVzdGVkKTtcblxuICAgICAgICB0aGlzLmxvYWRlZEV2ZW50LmVtaXQoXG4gICAgICAgICAgICBuZXcgSW5maW5pdGVTY3JvbGxMb2FkZWRFdmVudChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhZ2VOdW1iZXIsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYWdlU2l6ZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmZpbHRlcixcbiAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgIGlzRXhoYXVzdGVkXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFyZXF1ZXN0LnJlbG9hZCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dFBhZ2VOdW0gKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgc3RhdGUgZnJvbSBhIGZhaWxlZCBsb2FkLiBSYWlzZXMgdGhlIGBsb2FkRXJyb3JgIGV2ZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZW5kTG9hZGluZ1dpdGhFcnJvcihyZXF1ZXN0OiBJbmZpbml0ZVNjcm9sbFJlcXVlc3QsIGVycm9yOiBhbnkpIHtcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nLm5leHQoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMubG9hZEVycm9yRXZlbnQuZW1pdChcbiAgICAgICAgICAgIG5ldyBJbmZpbml0ZVNjcm9sbExvYWRFcnJvckV2ZW50KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFnZU51bWJlcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhZ2VTaXplLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QuZmlsdGVyLFxuICAgICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBpbnRlcm5hbCBkYXRhIGFzc29jaWF0ZWQgd2l0aCBhIGxvYWQvY2hlY2sgcmVxdWVzdC5cbiAqL1xuY2xhc3MgSW5maW5pdGVTY3JvbGxSZXF1ZXN0IHtcbiAgICBjaGVjazogYm9vbGVhbjtcbiAgICBwYWdlTnVtYmVyOiBudW1iZXI7XG4gICAgcGFnZVNpemU6IG51bWJlcjtcbiAgICBmaWx0ZXI6IGFueTtcbiAgICByZWxvYWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiA9IChcbiAgICBwYWdlTnVtOiBudW1iZXIsXG4gICAgcGFnZVNpemU6IG51bWJlcixcbiAgICBmaWx0ZXI6IGFueVxuKSA9PiBhbnkgfCBQcm9taXNlPGFueT47XG5cbi8qKlxuICogRXZlbnQgcmFpc2VkIGJlZm9yZSB0aGUgYGxvYWRpbmdgIGZ1bmN0aW9uIGlzIGNhbGxlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZmluaXRlU2Nyb2xsTG9hZGluZ0V2ZW50IHtcbiAgICBwcml2YXRlIF9kZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbmRleCBvZiB0aGUgcmVxdWVzdGVkIHBhZ2UsIHN0YXJ0aW5nIGZyb20gMC5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwYWdlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIGl0ZW1zIHJlcXVlc3RlZC5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwYWdlU2l6ZTogbnVtYmVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGZpbHRlciBkZXRhaWxzIGFzIHByb3ZpZGVkIHZpYSB0aGUgYGZpbHRlcmAgYmluZGluZy5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBmaWx0ZXI6IGFueVxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBQcmV2ZW50cyB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgdGhlIGBsb2FkaW5nYCBldmVudCAobG9hZGluZyBmdW5jdGlvbiB3aWxsIG5vdCBiZSBjYWxsZWQpLlxuICAgICAqL1xuICAgIHByZXZlbnREZWZhdWx0KCkge1xuICAgICAgICB0aGlzLl9kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZWZhdWx0UHJldmVudGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFByZXZlbnRlZDtcbiAgICB9XG59XG5cbi8qKlxuICogRXZlbnQgcmFpc2VkIHdoZW4gdGhlIGxvYWRpbmcgZnVuY3Rpb24gcmVzdWx0IGhhcyBiZWVuIHJlc29sdmVkIGFuZCBhZGRlZCB0byB0aGUgY29sbGVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZmluaXRlU2Nyb2xsTG9hZGVkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IG9mIHRoZSByZXF1ZXN0ZWQgcGFnZSwgc3RhcnRpbmcgZnJvbSAwLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhZ2VOdW1iZXI6IG51bWJlcixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgaXRlbXMgcmVxdWVzdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmlsdGVyIGRldGFpbHMgYXMgcHJvdmlkZWQgdmlhIHRoZSBgZmlsdGVyYCBiaW5kaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGZpbHRlcjogYW55LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHJlc3VsdCBvZiB0aGUgcHJvbWlzZSByZXR1cm5lZCBmcm9tIHRoZSBsb2FkaW5nIGZ1bmN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGRhdGE6IGFueSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgaWYgdGhlIGRhdGEgaXMgY29uc2lkZXJlZCBleGhhdXN0ZWQgKG51bWJlciBvZiBpdGVtcyByZXR1cm5lZCBsZXNzIHRoYW4gYHBhZ2VTaXplYCkuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXhoYXVzdGVkOiBib29sZWFuXG4gICAgKSB7IH1cbn1cblxuLyoqXG4gKiBFdmVudCByYWlzZWQgaWYgdGhlIGxvYWRpbmcgZnVuY3Rpb24gcmV0dXJucyBhIHJlamVjdGVkIHByb21pc2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbExvYWRFcnJvckV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbmRleCBvZiB0aGUgcmVxdWVzdGVkIHBhZ2UsIHN0YXJ0aW5nIGZyb20gMC5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwYWdlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIGl0ZW1zIHJlcXVlc3RlZC5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwYWdlU2l6ZTogbnVtYmVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGZpbHRlciBkZXRhaWxzIGFzIHByb3ZpZGVkIHZpYSB0aGUgYGZpbHRlcmAgYmluZGluZy5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBmaWx0ZXI6IGFueSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvYmplY3QgcHJvdmlkZWQgd2hlbiByZWplY3RpbmcgdGhlIHByb21pc2UuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXJyb3I6IGFueVxuICAgICkgeyB9XG59XG4iXX0=