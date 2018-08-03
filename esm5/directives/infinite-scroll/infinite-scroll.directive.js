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
var InfiniteScrollDirective = /** @class */ (function () {
    function InfiniteScrollDirective(_element) {
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
        this._canLoadManually = this._isLoading.pipe(combineLatest(this._isExhausted, this._loadButtonEnabled, function (isLoading, isExhausted, loadButtonEnabled) {
            return !isLoading && !isExhausted && loadButtonEnabled;
        }));
    }
    Object.defineProperty(InfiniteScrollDirective.prototype, "collection", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collection;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.collectionChange.emit(value);
            this._collection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfiniteScrollDirective.prototype, "scrollElement", {
        set: /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            this._scrollElement = element instanceof ElementRef ? element : new ElementRef(element);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this._scrollElement) {
            this._scrollElement = this._element;
        }
        this._loadButtonEnabled.next(!this.loadOnScroll);
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        this._updateRequests.pipe(filterOperator(function (request) { return request.check; }), auditTime(200), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        this._updateRequests.pipe(filterOperator(function (request) { return !request.check; }), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        if (this.enabled) {
            // Subscribe to scroll events and DOM changes.
            this.attachEventHandlers();
        }
        // Connect the Load More button visible state.
        this._canLoadManually.pipe(takeUntil(this._onDestroy)).subscribe(function (canLoad) {
            _this._loadButtonQuery.forEach(function (loadButton) {
                loadButton.visible = canLoad;
            });
        });
        // Connect the loading indicator visible state.
        this._isLoading.pipe(takeUntil(this._onDestroy)).subscribe(function (isLoading) {
            _this._loadingIndicatorQuery.forEach(function (loading) {
                loading.visible = isLoading;
            });
        });
        // Link the Load More button click event to trigger an update.
        this.attachLoadButtonEvents();
        this._loadButtonQuery.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () {
            _this.attachLoadButtonEvents();
        });
        // Initial update.
        if (this.loadOnInit) {
            this.loadNextPage();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var /** @type {?} */ check = true;
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
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.detachEventHandlers();
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * Request an additional page of data.
     */
    /**
     * Request an additional page of data.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.loadNextPage = /**
     * Request an additional page of data.
     * @return {?}
     */
    function () {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    };
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     */
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.check = /**
     * Request a check for whether an additional page of data is required. This is throttled.
     * @return {?}
     */
    function () {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: true,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    };
    /**
     * Clear the collection. Future requests will load from page 0.
     */
    /**
     * Clear the collection. Future requests will load from page 0.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reset = /**
     * Clear the collection. Future requests will load from page 0.
     * @return {?}
     */
    function () {
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
            this._subscriptions.forEach(function (request) { return request.unsubscribe(); });
        }
    };
    /**
     * Reload the data without clearing the view.
     */
    /**
     * Reload the data without clearing the view.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reload = /**
     * Reload the data without clearing the view.
     * @return {?}
     */
    function () {
        var _this = this;
        this._pages.forEach(function (page, i) { return _this.reloadPage(i); });
    };
    /**
     * Reload the data in a specific page without clearing the view.
     * @param pageNum Page number
     */
    /**
     * Reload the data in a specific page without clearing the view.
     * @param {?} pageNum Page number
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reloadPage = /**
     * Reload the data in a specific page without clearing the view.
     * @param {?} pageNum Page number
     * @return {?}
     */
    function (pageNum) {
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
    };
    /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.attachEventHandlers = /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    function () {
        // if the scrollElement is documentElement we must watch for a scroll event on the document
        var /** @type {?} */ target = this._scrollElement.nativeElement instanceof HTMLHtmlElement ? document : this._scrollElement.nativeElement;
        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = fromEvent(target, 'scroll').subscribe(this.check.bind(this));
        // Subscribe to child DOM changes. The main effect of this is to check whether even more data is
        // required after the initial load.
        this._domObserver = new MutationObserver(this.check.bind(this));
        this._domObserver.observe(this._scrollElement.nativeElement, {
            childList: true,
            subtree: true
        });
    };
    /**
     * Detach scroll event handler and DOM observer.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.detachEventHandlers = /**
     * Detach scroll event handler and DOM observer.
     * @return {?}
     */
    function () {
        if (this._scrollEventSub) {
            this._scrollEventSub.unsubscribe();
            this._scrollEventSub = null;
        }
        if (this._domObserver) {
            this._domObserver.disconnect();
            this._domObserver = null;
        }
    };
    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.attachLoadButtonEvents = /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     * @return {?}
     */
    function () {
        var _this = this;
        this._loadButtonSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._loadButtonSubscriptions = this._loadButtonQuery.map(function (loadButton) { return loadButton.load.subscribe(_this.loadNextPage.bind(_this)); });
    };
    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.doRequest = /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     * @param {?} request
     * @return {?}
     */
    function (request) {
        var _this = this;
        // Load a new page if the scroll position is beyond the threshhold and if the client code did not
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {
            // Invoke the callback load function, which returns a promose or plain data.
            var /** @type {?} */ loadResult = this.load(request.pageNumber, request.pageSize, request.filter);
            var /** @type {?} */ observable = Array.isArray(loadResult) ? of(loadResult) : from(loadResult);
            var /** @type {?} */ subscription_1 = observable.pipe(first()).subscribe(function (items) {
                // Make sure that the parameters have not changed since the load started;
                // otherwise discard the results.
                if (request.filter === _this.filter && request.pageSize === _this.pageSize) {
                    if (items && items.length) {
                        _this.setPageItems(request.pageNumber, items);
                    }
                    // Emit the loaded event
                    // Emit the loaded event
                    _this.endLoading(request, items);
                }
            }, function (reason) {
                // Emit the loadError event
                // Emit the loadError event
                _this.endLoadingWithError(request, reason);
            }, function () {
                // remove this request from the list
                // remove this request from the list
                _this._subscriptions = _this._subscriptions.filter(function (s) { return s !== subscription_1; });
            });
            // add the subscription to the list of requests
            this._subscriptions.push(subscription_1);
        }
    };
    /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.needsData = /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
     */
    function (request) {
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
            var /** @type {?} */ element = /** @type {?} */ (this._scrollElement.nativeElement);
            var /** @type {?} */ remainingScroll = element.scrollHeight -
                (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }
        return false;
    };
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.beginLoading = /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    function (request) {
        var /** @type {?} */ event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);
        this._isLoading.next(!event.defaultPrevented());
        return !event.defaultPrevented();
    };
    /**
     * @param {?} pageNum
     * @param {?} items
     * @return {?}
     */
    InfiniteScrollDirective.prototype.setPageItems = /**
     * @param {?} pageNum
     * @param {?} items
     * @return {?}
     */
    function (pageNum, items) {
        this._pages[pageNum] = items;
        this.collection = this._pages.reduce(function (previous, current) { return previous.concat(current); }, []);
    };
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    InfiniteScrollDirective.prototype.endLoading = /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    function (request, data) {
        this._isLoading.next(false);
        var /** @type {?} */ isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);
        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));
        if (!request.reload) {
            this._nextPageNum += 1;
        }
    };
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    InfiniteScrollDirective.prototype.endLoadingWithError = /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    function (request, error) {
        this._isLoading.next(false);
        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    };
    InfiniteScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxInfiniteScroll]',
                    exportAs: 'uxInfiniteScroll'
                },] }
    ];
    /** @nocollapse */
    InfiniteScrollDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    InfiniteScrollDirective.propDecorators = {
        load: [{ type: Input, args: ['uxInfiniteScroll',] }],
        _collection: [{ type: Input, args: ['collection',] }],
        scrollElement: [{ type: Input }],
        enabled: [{ type: Input }],
        filter: [{ type: Input }],
        loadOnInit: [{ type: Input }],
        loadOnScroll: [{ type: Input }],
        pageSize: [{ type: Input }],
        collectionChange: [{ type: Output }],
        loadingEvent: [{ type: Output, args: ['loading',] }],
        loadedEvent: [{ type: Output, args: ['loaded',] }],
        loadErrorEvent: [{ type: Output, args: ['loadError',] }],
        _loadButtonQuery: [{ type: ContentChildren, args: [InfiniteScrollLoadButtonDirective,] }],
        _loadingIndicatorQuery: [{ type: ContentChildren, args: [InfiniteScrollLoadingDirective,] }]
    };
    return InfiniteScrollDirective;
}());
export { InfiniteScrollDirective };
function InfiniteScrollDirective_tsickle_Closure_declarations() {
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
var /**
 * The internal data associated with a load/check request.
 */
InfiniteScrollRequest = /** @class */ (function () {
    function InfiniteScrollRequest() {
    }
    return InfiniteScrollRequest;
}());
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
var /**
 * Event raised before the `loading` function is called.
 */
InfiniteScrollLoadingEvent = /** @class */ (function () {
    function InfiniteScrollLoadingEvent(pageNumber, pageSize, filter) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this._defaultPrevented = false;
    }
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     */
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    InfiniteScrollLoadingEvent.prototype.preventDefault = /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    function () {
        this._defaultPrevented = true;
    };
    /**
     * @return {?}
     */
    InfiniteScrollLoadingEvent.prototype.defaultPrevented = /**
     * @return {?}
     */
    function () {
        return this._defaultPrevented;
    };
    return InfiniteScrollLoadingEvent;
}());
/**
 * Event raised before the `loading` function is called.
 */
export { InfiniteScrollLoadingEvent };
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
var /**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
InfiniteScrollLoadedEvent = /** @class */ (function () {
    function InfiniteScrollLoadedEvent(pageNumber, pageSize, filter, data, exhausted) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this.data = data;
        this.exhausted = exhausted;
    }
    return InfiniteScrollLoadedEvent;
}());
/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
export { InfiniteScrollLoadedEvent };
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
var /**
 * Event raised if the loading function returns a rejected promise.
 */
InfiniteScrollLoadErrorEvent = /** @class */ (function () {
    function InfiniteScrollLoadErrorEvent(pageNumber, pageSize, filter, error) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this.error = error;
    }
    return InfiniteScrollLoadErrorEvent;
}());
/**
 * Event raised if the loading function returns a rejected promise.
 */
export { InfiniteScrollLoadErrorEvent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmZpbml0ZS1zY3JvbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzlLLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxNQUFNLElBQUksY0FBYyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztJQStEakYsaUNBQW9CLFFBQW9CO1FBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7MkJBckRFLEVBQUU7dUJBY2hCLElBQUk7MEJBRUQsSUFBSTs0QkFDRixJQUFJO3dCQUNULEVBQUU7Z0NBRUQsSUFBSSxZQUFZLEVBQVM7NEJBR3ZDLElBQUksWUFBWSxFQUE4QjsyQkFHL0MsSUFBSSxZQUFZLEVBQTZCOzhCQUcxQyxJQUFJLFlBQVksRUFBZ0M7NEJBUzFDLENBQUM7K0JB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Ozs7OztBQUtEOzs7QUFBQTtJQUNJLHNDQUlXLFlBSUEsVUFJQSxRQUlBO1FBWkEsZUFBVSxHQUFWLFVBQVU7UUFJVixhQUFRLEdBQVIsUUFBUTtRQUlSLFdBQU0sR0FBTixNQUFNO1FBSU4sVUFBSyxHQUFMLEtBQUs7S0FDWDt1Q0EvaEJUO0lBZ2lCQyxDQUFBOzs7O0FBbkJELHdDQW1CQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgY29tYmluZUxhdGVzdCwgZmlsdGVyIGFzIGZpbHRlck9wZXJhdG9yLCBmaXJzdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRCdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL2luZmluaXRlLXNjcm9sbC1sb2FkLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxMb2FkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9pbmZpbml0ZS1zY3JvbGwtbG9hZGluZy5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEluZmluaXRlU2Nyb2xsXScsXG4gICAgZXhwb3J0QXM6ICd1eEluZmluaXRlU2Nyb2xsJ1xufSlcbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCd1eEluZmluaXRlU2Nyb2xsJykgbG9hZDogSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb247XG5cbiAgICBASW5wdXQoJ2NvbGxlY3Rpb24nKSBfY29sbGVjdGlvbjogYW55W10gPSBbXTtcbiAgICBnZXQgY29sbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxlY3Rpb247XG4gICAgfVxuICAgIHNldCBjb2xsZWN0aW9uKHZhbHVlOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25DaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIEBJbnB1dCgpIHNldCBzY3JvbGxFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnRSZWYgfCBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnRSZWYgPyBlbGVtZW50IDogbmV3IEVsZW1lbnRSZWYoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZmlsdGVyOiBhbnk7XG4gICAgQElucHV0KCkgbG9hZE9uSW5pdDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgbG9hZE9uU2Nyb2xsOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyID0gMjA7XG5cbiAgICBAT3V0cHV0KCkgY29sbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgICBAT3V0cHV0KCdsb2FkaW5nJylcbiAgICBsb2FkaW5nRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEluZmluaXRlU2Nyb2xsTG9hZGluZ0V2ZW50PigpO1xuXG4gICAgQE91dHB1dCgnbG9hZGVkJylcbiAgICBsb2FkZWRFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8SW5maW5pdGVTY3JvbGxMb2FkZWRFdmVudD4oKTtcblxuICAgIEBPdXRwdXQoJ2xvYWRFcnJvcicpXG4gICAgbG9hZEVycm9yRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEluZmluaXRlU2Nyb2xsTG9hZEVycm9yRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEluZmluaXRlU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZSlcbiAgICBwcml2YXRlIF9sb2FkQnV0dG9uUXVlcnk6IFF1ZXJ5TGlzdDxJbmZpbml0ZVNjcm9sbExvYWRCdXR0b25EaXJlY3RpdmU+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihJbmZpbml0ZVNjcm9sbExvYWRpbmdEaXJlY3RpdmUpXG4gICAgcHJpdmF0ZSBfbG9hZGluZ0luZGljYXRvclF1ZXJ5OiBRdWVyeUxpc3Q8SW5maW5pdGVTY3JvbGxMb2FkaW5nRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX3BhZ2VzOiBhbnlbXVtdO1xuICAgIHByaXZhdGUgX25leHRQYWdlTnVtID0gMDtcbiAgICBwcml2YXRlIF9kb21PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgICBwcml2YXRlIF9zY3JvbGxFdmVudFN1YjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX3VwZGF0ZVJlcXVlc3RzID0gbmV3IFN1YmplY3Q8SW5maW5pdGVTY3JvbGxSZXF1ZXN0PigpO1xuXG4gICAgcHJpdmF0ZSBfaXNMb2FkaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgcHJpdmF0ZSBfaXNFeGhhdXN0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBwcml2YXRlIF9sb2FkQnV0dG9uRW5hYmxlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIHByaXZhdGUgX2NhbkxvYWRNYW51YWxseTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAgIHByaXZhdGUgX3Njcm9sbEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIF9sb2FkQnV0dG9uU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9jYW5Mb2FkTWFudWFsbHkgPSB0aGlzLl9pc0xvYWRpbmcucGlwZShjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgdGhpcy5faXNFeGhhdXN0ZWQsXG4gICAgICAgICAgICB0aGlzLl9sb2FkQnV0dG9uRW5hYmxlZCxcbiAgICAgICAgICAgIChpc0xvYWRpbmcsIGlzRXhoYXVzdGVkLCBsb2FkQnV0dG9uRW5hYmxlZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAhaXNMb2FkaW5nICYmICFpc0V4aGF1c3RlZCAmJiBsb2FkQnV0dG9uRW5hYmxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fc2Nyb2xsRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2FkQnV0dG9uRW5hYmxlZC5uZXh0KCF0aGlzLmxvYWRPblNjcm9sbCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgICAgIC8vIFRoZXJlIGFyZSB0d28ga2luZHMgb2YgdXBkYXRlIHJlcXVlc3RzOiBjaGVjayBhbmQgbG9hZC5cbiAgICAgICAgLy8gQ2hlY2sgcmVxdWVzdHMgYXJlIHRocm90dGxlZCBhbmQgd2lsbCBvbmx5IGNhdXNlIGFuIHVwZGF0ZSBpZiBtb3JlIGRhdGEgaXMgcmVxdWlyZWRcbiAgICAgICAgLy8gdG8gZmlsbCB0aGUgc2Nyb2xsaW5nIHZpZXcsIGFuZCBpdCBpc24ndCBhbHJlYWR5IGxvYWRpbmcgc29tZS5cbiAgICAgICAgLy8gTG9hZCByZXF1ZXN0cyBhcmUgbm90IHRocm90dGxlZCBhbmQgYWx3YXlzIHJlcXVlc3QgYSBwYWdlIG9mIGRhdGEuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlcXVlc3RzLnBpcGUoZmlsdGVyT3BlcmF0b3IocmVxdWVzdCA9PiByZXF1ZXN0LmNoZWNrKSwgYXVkaXRUaW1lKDIwMCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5kb1JlcXVlc3QuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlcXVlc3RzLnBpcGUoZmlsdGVyT3BlcmF0b3IocmVxdWVzdCA9PiAhcmVxdWVzdC5jaGVjayksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5kb1JlcXVlc3QuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgLy8gU3Vic2NyaWJlIHRvIHNjcm9sbCBldmVudHMgYW5kIERPTSBjaGFuZ2VzLlxuICAgICAgICAgICAgdGhpcy5hdHRhY2hFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25uZWN0IHRoZSBMb2FkIE1vcmUgYnV0dG9uIHZpc2libGUgc3RhdGUuXG4gICAgICAgIHRoaXMuX2NhbkxvYWRNYW51YWxseS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoY2FuTG9hZCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkQnV0dG9uUXVlcnkuZm9yRWFjaChsb2FkQnV0dG9uID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkQnV0dG9uLnZpc2libGUgPSBjYW5Mb2FkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbm5lY3QgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIHZpc2libGUgc3RhdGUuXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoaXNMb2FkaW5nID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdJbmRpY2F0b3JRdWVyeS5mb3JFYWNoKGxvYWRpbmcgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRpbmcudmlzaWJsZSA9IGlzTG9hZGluZztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMaW5rIHRoZSBMb2FkIE1vcmUgYnV0dG9uIGNsaWNrIGV2ZW50IHRvIHRyaWdnZXIgYW4gdXBkYXRlLlxuICAgICAgICB0aGlzLmF0dGFjaExvYWRCdXR0b25FdmVudHMoKTtcbiAgICAgICAgdGhpcy5fbG9hZEJ1dHRvblF1ZXJ5LmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoTG9hZEJ1dHRvbkV2ZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbml0aWFsIHVwZGF0ZS5cbiAgICAgICAgaWYgKHRoaXMubG9hZE9uSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkTmV4dFBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcblxuICAgICAgICBpZiAoY2hhbmdlcy5lbmFibGVkICYmIGNoYW5nZXMuZW5hYmxlZC5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuZW5hYmxlZC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5lbmFibGVkLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoRXZlbnRIYW5kbGVycygpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFjaEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmZpbHRlciAmJiBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuZmlsdGVyLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYW5nZXMubG9hZE9uU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZEJ1dHRvbkVuYWJsZWQubmV4dChcbiAgICAgICAgICAgICAgICAgICAgIWNoYW5nZXMubG9hZE9uU2Nyb2xsLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLnBhZ2VTaXplICYmIGNoYW5nZXMucGFnZVNpemUuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLnBhZ2VTaXplLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVxdWVzdHMubmV4dCh7XG4gICAgICAgICAgICAgICAgY2hlY2s6IGNoZWNrLFxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXI6IHRoaXMuX25leHRQYWdlTnVtLFxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoRXZlbnRIYW5kbGVycygpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGFuIGFkZGl0aW9uYWwgcGFnZSBvZiBkYXRhLlxuICAgICAqL1xuICAgIGxvYWROZXh0UGFnZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlcXVlc3RzLm5leHQoe1xuICAgICAgICAgICAgY2hlY2s6IGZhbHNlLFxuICAgICAgICAgICAgcGFnZU51bWJlcjogdGhpcy5fbmV4dFBhZ2VOdW0sXG4gICAgICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBhIGNoZWNrIGZvciB3aGV0aGVyIGFuIGFkZGl0aW9uYWwgcGFnZSBvZiBkYXRhIGlzIHJlcXVpcmVkLiBUaGlzIGlzIHRocm90dGxlZC5cbiAgICAgKi9cbiAgICBjaGVjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlcXVlc3RzLm5leHQoe1xuICAgICAgICAgICAgY2hlY2s6IHRydWUsXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiB0aGlzLl9uZXh0UGFnZU51bSxcbiAgICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgY29sbGVjdGlvbi4gRnV0dXJlIHJlcXVlc3RzIHdpbGwgbG9hZCBmcm9tIHBhZ2UgMC5cbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IHRoZSBwYWdlIGNvdW50ZXIuXG4gICAgICAgIHRoaXMuX25leHRQYWdlTnVtID0gMDtcblxuICAgICAgICB0aGlzLl9wYWdlcyA9IFtdO1xuXG4gICAgICAgIC8vIENsZWFyIHRoZSBjb2xsZWN0aW9uICh3aXRob3V0IGNoYW5naW5nIHRoZSByZWZlcmVuY2UpLlxuICAgICAgICBpZiAodGhpcy5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24ubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IHRoZSBleGhhdXN0ZWQgZmxhZywgYWxsb3dpbmcgdGhlIExvYWQgTW9yZSBidXR0b24gdG8gYXBwZWFyLlxuICAgICAgICB0aGlzLl9pc0V4aGF1c3RlZC5uZXh0KGZhbHNlKTtcblxuICAgICAgICAvLyBDYW5jZWwgYW55IHBlbmRpbmcgcmVxdWVzdHNcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChyZXF1ZXN0ID0+IHJlcXVlc3QudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxvYWQgdGhlIGRhdGEgd2l0aG91dCBjbGVhcmluZyB0aGUgdmlldy5cbiAgICAgKi9cbiAgICByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VzLmZvckVhY2goKHBhZ2UsIGkpID0+IHRoaXMucmVsb2FkUGFnZShpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsb2FkIHRoZSBkYXRhIGluIGEgc3BlY2lmaWMgcGFnZSB3aXRob3V0IGNsZWFyaW5nIHRoZSB2aWV3LlxuICAgICAqIEBwYXJhbSBwYWdlTnVtIFBhZ2UgbnVtYmVyXG4gICAgICovXG4gICAgcmVsb2FkUGFnZShwYWdlTnVtOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlcXVlc3RzLm5leHQoe1xuICAgICAgICAgICAgY2hlY2s6IGZhbHNlLFxuICAgICAgICAgICAgcGFnZU51bWJlcjogcGFnZU51bSxcbiAgICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgICAgIHJlbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2ggc2Nyb2xsIGV2ZW50IGhhbmRsZXIgYW5kIERPTSBvYnNlcnZlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGF0dGFjaEV2ZW50SGFuZGxlcnMoKSB7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNjcm9sbEVsZW1lbnQgaXMgZG9jdW1lbnRFbGVtZW50IHdlIG11c3Qgd2F0Y2ggZm9yIGEgc2Nyb2xsIGV2ZW50IG9uIHRoZSBkb2N1bWVudFxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLl9zY3JvbGxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSHRtbEVsZW1lbnQgPyBkb2N1bWVudCA6IHRoaXMuX3Njcm9sbEVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIHNjcm9sbCBldmVudCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICAgIHRoaXMuX3Njcm9sbEV2ZW50U3ViID0gZnJvbUV2ZW50KHRhcmdldCwgJ3Njcm9sbCcpLnN1YnNjcmliZSh0aGlzLmNoZWNrLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGlsZCBET00gY2hhbmdlcy4gVGhlIG1haW4gZWZmZWN0IG9mIHRoaXMgaXMgdG8gY2hlY2sgd2hldGhlciBldmVuIG1vcmUgZGF0YSBpc1xuICAgICAgICAvLyByZXF1aXJlZCBhZnRlciB0aGUgaW5pdGlhbCBsb2FkLlxuICAgICAgICB0aGlzLl9kb21PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuY2hlY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX2RvbU9ic2VydmVyLm9ic2VydmUodGhpcy5fc2Nyb2xsRWxlbWVudC5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaCBzY3JvbGwgZXZlbnQgaGFuZGxlciBhbmQgRE9NIG9ic2VydmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgZGV0YWNoRXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbEV2ZW50U3ViKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxFdmVudFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRTdWIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RvbU9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9kb21PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLl9kb21PYnNlcnZlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW55IGV4aXN0aW5nIGV2ZW50IHN1YnNjcmlwdGlvbnMgZm9yIHRoZSBsb2FkIGJ1dHRvbiBgbG9hZGAgZXZlbnQsIHRoZW4gYXR0YWNoIHN1YnNjcmlwdGlvbnNcbiAgICAgKiBmb3IgYW55IGluIHRoZSBxdWVyeS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGF0dGFjaExvYWRCdXR0b25FdmVudHMoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRCdXR0b25TdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB0aGlzLl9sb2FkQnV0dG9uU3Vic2NyaXB0aW9ucyA9IHRoaXMuX2xvYWRCdXR0b25RdWVyeS5tYXAoXG4gICAgICAgICAgICBsb2FkQnV0dG9uID0+IGxvYWRCdXR0b24ubG9hZC5zdWJzY3JpYmUodGhpcy5sb2FkTmV4dFBhZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25kaXRpb25hbGx5IGxvYWRzIGEgcGFnZSBpbnRvIHRoZSBjb2xsZWN0aW9uIGJhc2VkIG9uIGRpcmVjdGl2ZSBzdGF0ZSBhbmQgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZG9SZXF1ZXN0KHJlcXVlc3Q6IEluZmluaXRlU2Nyb2xsUmVxdWVzdCkge1xuXG4gICAgICAgIC8vIExvYWQgYSBuZXcgcGFnZSBpZiB0aGUgc2Nyb2xsIHBvc2l0aW9uIGlzIGJleW9uZCB0aGUgdGhyZXNoaG9sZCBhbmQgaWYgdGhlIGNsaWVudCBjb2RlIGRpZCBub3RcbiAgICAgICAgLy8gY2FuY2VsLlxuICAgICAgICBpZiAodGhpcy5uZWVkc0RhdGEocmVxdWVzdCkgJiYgdGhpcy5iZWdpbkxvYWRpbmcocmVxdWVzdCkpIHtcblxuICAgICAgICAgICAgLy8gSW52b2tlIHRoZSBjYWxsYmFjayBsb2FkIGZ1bmN0aW9uLCB3aGljaCByZXR1cm5zIGEgcHJvbW9zZSBvciBwbGFpbiBkYXRhLlxuICAgICAgICAgICAgY29uc3QgbG9hZFJlc3VsdCA9IHRoaXMubG9hZChyZXF1ZXN0LnBhZ2VOdW1iZXIsIHJlcXVlc3QucGFnZVNpemUsIHJlcXVlc3QuZmlsdGVyKTtcblxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IEFycmF5LmlzQXJyYXkobG9hZFJlc3VsdCkgPyBvZihsb2FkUmVzdWx0KSA6IGZyb208YW55W10+KGxvYWRSZXN1bHQpO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHBhcmFtZXRlcnMgaGF2ZSBub3QgY2hhbmdlZCBzaW5jZSB0aGUgbG9hZCBzdGFydGVkO1xuICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgZGlzY2FyZCB0aGUgcmVzdWx0cy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QuZmlsdGVyID09PSB0aGlzLmZpbHRlciAmJiByZXF1ZXN0LnBhZ2VTaXplID09PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQYWdlSXRlbXMocmVxdWVzdC5wYWdlTnVtYmVyLCBpdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVtaXQgdGhlIGxvYWRlZCBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRMb2FkaW5nKHJlcXVlc3QsIGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRW1pdCB0aGUgbG9hZEVycm9yIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kTG9hZGluZ1dpdGhFcnJvcihyZXF1ZXN0LCByZWFzb24pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhpcyByZXF1ZXN0IGZyb20gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3N1YnNjcmlwdGlvbnMuZmlsdGVyKHMgPT4gcyAhPT0gc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHN1YnNjcmlwdGlvbiB0byB0aGUgbGlzdCBvZiByZXF1ZXN0c1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIGZ1bGZpbGxlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIG5lZWRzRGF0YShyZXF1ZXN0OiBJbmZpbml0ZVNjcm9sbFJlcXVlc3QpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsd2F5cyBsb2FkIGZvciBhIGxvYWQgcmVxdWVzdFxuICAgICAgICBpZiAoIXJlcXVlc3QuY2hlY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWdub3JlIGEgY2hlY2sgcmVxdWVzdCB3aGVuIHRoZSBlbmQgb2YgZGF0YSBoYXMgYmVlbiBkZXRlY3RlZCwgb3IgaWYgZGF0YSBpcyBjdXJyZW50bHkgbG9hZGluZy5cbiAgICAgICAgaWYgKHRoaXMuX2lzRXhoYXVzdGVkLmdldFZhbHVlKCkgfHwgdGhpcy5faXNMb2FkaW5nLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvYWQgaWYgdGhlIHJlbWFpbmluZyBzY3JvbGwgYXJlYSBpcyA8PSB0aGUgZWxlbWVudCBoZWlnaHQuXG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxFbGVtZW50ICYmIHRoaXMubG9hZE9uU2Nyb2xsKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5fc2Nyb2xsRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nU2Nyb2xsID1cbiAgICAgICAgICAgICAgICBlbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQuc2Nyb2xsVG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVtYWluaW5nU2Nyb2xsIDw9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgc3RhdGUgZm9yIHRoZSBiZWdpbm5pbmcgb2YgYSBsb2FkLiBSZXR1cm5zIGZhbHNlIGlmIHRoZSBgbG9hZGluZ2AgZXZlbnQgd2FzIGNhbmNlbGxlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGJlZ2luTG9hZGluZyhyZXF1ZXN0OiBJbmZpbml0ZVNjcm9sbFJlcXVlc3QpOiBib29sZWFuIHtcblxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBJbmZpbml0ZVNjcm9sbExvYWRpbmdFdmVudChcbiAgICAgICAgICAgIHJlcXVlc3QucGFnZU51bWJlcixcbiAgICAgICAgICAgIHJlcXVlc3QucGFnZVNpemUsXG4gICAgICAgICAgICByZXF1ZXN0LmZpbHRlclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxvYWRpbmdFdmVudC5lbWl0KGV2ZW50KTtcblxuICAgICAgICB0aGlzLl9pc0xvYWRpbmcubmV4dCghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKTtcblxuICAgICAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhZ2VJdGVtcyhwYWdlTnVtOiBudW1iZXIsIGl0ZW1zOiBhbnlbXSkge1xuICAgICAgICB0aGlzLl9wYWdlc1twYWdlTnVtXSA9IGl0ZW1zO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLl9wYWdlcy5yZWR1Y2UoKHByZXZpb3VzLCBjdXJyZW50KSA9PiBwcmV2aW91cy5jb25jYXQoY3VycmVudCksIFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHN0YXRlIGZyb20gYSBzdWNjZXNzZnVsIGxvYWQuIFJhaXNlcyB0aGUgYGxvYWRlZGAgZXZlbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbmRMb2FkaW5nKHJlcXVlc3Q6IEluZmluaXRlU2Nyb2xsUmVxdWVzdCwgZGF0YT86IGFueSkge1xuICAgICAgICB0aGlzLl9pc0xvYWRpbmcubmV4dChmYWxzZSk7XG5cbiAgICAgICAgY29uc3QgaXNFeGhhdXN0ZWQgPSAhIShkYXRhICYmIGRhdGEubGVuZ3RoIDwgdGhpcy5wYWdlU2l6ZSk7XG4gICAgICAgIHRoaXMuX2lzRXhoYXVzdGVkLm5leHQoaXNFeGhhdXN0ZWQpO1xuXG4gICAgICAgIHRoaXMubG9hZGVkRXZlbnQuZW1pdChcbiAgICAgICAgICAgIG5ldyBJbmZpbml0ZVNjcm9sbExvYWRlZEV2ZW50KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFnZU51bWJlcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhZ2VTaXplLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QuZmlsdGVyLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgaXNFeGhhdXN0ZWRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXJlcXVlc3QucmVsb2FkKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0UGFnZU51bSArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBzdGF0ZSBmcm9tIGEgZmFpbGVkIGxvYWQuIFJhaXNlcyB0aGUgYGxvYWRFcnJvcmAgZXZlbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbmRMb2FkaW5nV2l0aEVycm9yKHJlcXVlc3Q6IEluZmluaXRlU2Nyb2xsUmVxdWVzdCwgZXJyb3I6IGFueSkge1xuICAgICAgICB0aGlzLl9pc0xvYWRpbmcubmV4dChmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5sb2FkRXJyb3JFdmVudC5lbWl0KFxuICAgICAgICAgICAgbmV3IEluZmluaXRlU2Nyb2xsTG9hZEVycm9yRXZlbnQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYWdlTnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFnZVNpemUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5maWx0ZXIsXG4gICAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIGludGVybmFsIGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgbG9hZC9jaGVjayByZXF1ZXN0LlxuICovXG5jbGFzcyBJbmZpbml0ZVNjcm9sbFJlcXVlc3Qge1xuICAgIGNoZWNrOiBib29sZWFuO1xuICAgIHBhZ2VOdW1iZXI6IG51bWJlcjtcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xuICAgIGZpbHRlcjogYW55O1xuICAgIHJlbG9hZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uID0gKFxuICAgIHBhZ2VOdW06IG51bWJlcixcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIGZpbHRlcjogYW55XG4pID0+IGFueSB8IFByb21pc2U8YW55PjtcblxuLyoqXG4gKiBFdmVudCByYWlzZWQgYmVmb3JlIHRoZSBgbG9hZGluZ2AgZnVuY3Rpb24gaXMgY2FsbGVkLlxuICovXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGxMb2FkaW5nRXZlbnQge1xuICAgIHByaXZhdGUgX2RlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IG9mIHRoZSByZXF1ZXN0ZWQgcGFnZSwgc3RhcnRpbmcgZnJvbSAwLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhZ2VOdW1iZXI6IG51bWJlcixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgaXRlbXMgcmVxdWVzdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmlsdGVyIGRldGFpbHMgYXMgcHJvdmlkZWQgdmlhIHRoZSBgZmlsdGVyYCBiaW5kaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGZpbHRlcjogYW55XG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFByZXZlbnRzIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiB0aGUgYGxvYWRpbmdgIGV2ZW50IChsb2FkaW5nIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGNhbGxlZCkuXG4gICAgICovXG4gICAgcHJldmVudERlZmF1bHQoKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRlZmF1bHRQcmV2ZW50ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0UHJldmVudGVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFdmVudCByYWlzZWQgd2hlbiB0aGUgbG9hZGluZyBmdW5jdGlvbiByZXN1bHQgaGFzIGJlZW4gcmVzb2x2ZWQgYW5kIGFkZGVkIHRvIHRoZSBjb2xsZWN0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGxMb2FkZWRFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5kZXggb2YgdGhlIHJlcXVlc3RlZCBwYWdlLCBzdGFydGluZyBmcm9tIDAuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcGFnZU51bWJlcjogbnVtYmVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiBpdGVtcyByZXF1ZXN0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcGFnZVNpemU6IG51bWJlcixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmaWx0ZXIgZGV0YWlscyBhcyBwcm92aWRlZCB2aWEgdGhlIGBmaWx0ZXJgIGJpbmRpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZmlsdGVyOiBhbnksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcmVzdWx0IG9mIHRoZSBwcm9taXNlIHJldHVybmVkIGZyb20gdGhlIGxvYWRpbmcgZnVuY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZGF0YTogYW55LFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBpZiB0aGUgZGF0YSBpcyBjb25zaWRlcmVkIGV4aGF1c3RlZCAobnVtYmVyIG9mIGl0ZW1zIHJldHVybmVkIGxlc3MgdGhhbiBgcGFnZVNpemVgKS5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBleGhhdXN0ZWQ6IGJvb2xlYW5cbiAgICApIHsgfVxufVxuXG4vKipcbiAqIEV2ZW50IHJhaXNlZCBpZiB0aGUgbG9hZGluZyBmdW5jdGlvbiByZXR1cm5zIGEgcmVqZWN0ZWQgcHJvbWlzZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZmluaXRlU2Nyb2xsTG9hZEVycm9yRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IG9mIHRoZSByZXF1ZXN0ZWQgcGFnZSwgc3RhcnRpbmcgZnJvbSAwLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhZ2VOdW1iZXI6IG51bWJlcixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgaXRlbXMgcmVxdWVzdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmlsdGVyIGRldGFpbHMgYXMgcHJvdmlkZWQgdmlhIHRoZSBgZmlsdGVyYCBiaW5kaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGZpbHRlcjogYW55LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG9iamVjdCBwcm92aWRlZCB3aGVuIHJlamVjdGluZyB0aGUgcHJvbWlzZS5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBlcnJvcjogYW55XG4gICAgKSB7IH1cbn1cbiJdfQ==