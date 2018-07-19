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
var InfiniteScrollDirective = (function () {
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
                },] },
    ];
    /** @nocollapse */
    InfiniteScrollDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
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
    return InfiniteScrollDirective;
}());
export { InfiniteScrollDirective };
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
var /**
 * The internal data associated with a load/check request.
 */
InfiniteScrollRequest = (function () {
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
InfiniteScrollLoadingEvent = (function () {
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
InfiniteScrollLoadedEvent = (function () {
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
InfiniteScrollLoadErrorEvent = (function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmZpbml0ZS1zY3JvbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzlLLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxNQUFNLElBQUksY0FBYyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztJQStEakYsaUNBQW9CLFFBQW9CO1FBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7MkJBckRFLEVBQUU7dUJBY2hCLElBQUk7MEJBRUQsSUFBSTs0QkFDRixJQUFJO3dCQUNULEVBQUU7Z0NBRUQsSUFBSSxZQUFZLEVBQVM7NEJBR3ZDLElBQUksWUFBWSxFQUE4QjsyQkFHL0MsSUFBSSxZQUFZLEVBQTZCOzhCQUcxQyxJQUFJLFlBQVksRUFBZ0M7NEJBUzFDLENBQUM7K0JBR0UsSUFBSSxPQUFPLEVBQXlCOzBCQUV6QyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7NEJBQ2pDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQztrQ0FDN0IsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzhCQUl2QixFQUFFO3dDQUNRLEVBQUU7MEJBQ2hDLElBQUksT0FBTyxFQUFRO1FBR3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQ3RELElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsVUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLGlCQUFpQjtZQUN0QyxNQUFNLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxXQUFXLElBQUksaUJBQWlCLENBQUM7U0FDMUQsQ0FDSixDQUFDLENBQUM7S0FDTjtJQTVERCxzQkFBSSwrQ0FBVTs7OztRQUFkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7Ozs7O1FBQ0QsVUFBZSxLQUFZO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7OztPQUpBOzBCQU9ZLGtEQUFhOzs7OztrQkFBQyxPQUFpQztZQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sWUFBWSxVQUFVLEdBQUcsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztJQW9ENUYsMENBQVE7OztJQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BEOzs7O0lBRUQsb0RBQWtCOzs7SUFBbEI7UUFBQSxpQkFzQ0M7Ozs7O1FBaENHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQWIsQ0FBYSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNySixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQWQsQ0FBYyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXRJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUVmLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCOztRQUdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDcEUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7Z0JBQ3BDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQ2hDLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7UUFHSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUztZQUNoRSxLQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDdkMsT0FBTyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7YUFDL0IsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOztRQUdILElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDckUsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakMsQ0FBQyxDQUFDOztRQUdILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtLQUNKOzs7OztJQUVELDZDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sZUFBWSxPQUFPLFlBQVMsWUFBWSxLQUFLLE9BQU8sWUFBUyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBUyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDakI7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM5QjtTQUNKO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQVcsT0FBTyxXQUFRLFlBQVksS0FBSyxPQUFPLFdBQVEsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDakI7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGtCQUFlLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQ3hCLENBQUMsT0FBTyxpQkFBYyxZQUFZLENBQ3JDLENBQUM7YUFDTDtZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sZ0JBQWEsT0FBTyxhQUFVLFlBQVksS0FBSyxPQUFPLGFBQVUsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdkYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDakI7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDdEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtLQUNKOzs7O0lBRUQsNkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsOENBQVk7Ozs7SUFBWjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN0QixLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3RCLENBQUMsQ0FBQztLQUNOO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQUs7Ozs7SUFBTDtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3RCLENBQUMsQ0FBQztLQUNOO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQUs7Ozs7SUFBTDtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7O1FBR2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUM5Qjs7UUFHRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQXJCLENBQXFCLENBQUMsQ0FBQztTQUNqRTtLQUNKO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsd0NBQU07Ozs7SUFBTjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw0Q0FBVTs7Ozs7SUFBVixVQUFXLE9BQWU7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEtBQUssRUFBRSxLQUFLO1lBQ1osVUFBVSxFQUFFLE9BQU87WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztLQUNOOzs7OztJQUtPLHFEQUFtQjs7Ozs7O1FBR3ZCLHFCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsWUFBWSxlQUFlLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDOztRQUczSCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztRQUlwRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTtZQUN6RCxTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQzs7Ozs7O0lBTUMscURBQW1COzs7OztRQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQy9CO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1Qjs7Ozs7OztJQU9HLHdEQUFzQjs7Ozs7OztRQUMxQixJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUNyRCxVQUFBLFVBQVUsSUFBSSxPQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLEVBQXZELENBQXVELENBQ3hFLENBQUM7Ozs7Ozs7SUFNRSwyQ0FBUzs7Ozs7Y0FBQyxPQUE4Qjs7OztRQUk1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUd4RCxxQkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5GLHFCQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQVEsVUFBVSxDQUFDLENBQUM7WUFFeEYscUJBQU0sY0FBWSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQ25ELFVBQUEsS0FBSzs7O2dCQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN2RSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDaEQ7O29CQUdELEFBREEsd0JBQXdCO29CQUN4QixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDbkM7YUFDSixFQUNELFVBQUEsTUFBTTs7Z0JBRUYsQUFEQSwyQkFBMkI7Z0JBQzNCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDN0MsRUFDRDs7Z0JBRUksQUFEQSxvQ0FBb0M7Z0JBQ3BDLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssY0FBWSxFQUFsQixDQUFrQixDQUFDLENBQUM7YUFDN0UsQ0FDSixDQUFDOztZQUdGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQVksQ0FBQyxDQUFDO1NBQzFDOzs7Ozs7O0lBTUcsMkNBQVM7Ozs7O2NBQUMsT0FBOEI7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCOztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBRTNDLHFCQUFNLE9BQU8scUJBQWdCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFBLENBQUM7WUFDL0QscUJBQU0sZUFBZSxHQUNqQixPQUFPLENBQUMsWUFBWTtnQkFDcEIsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUvQyxNQUFNLENBQUMsZUFBZSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDbEQ7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0lBTVQsOENBQVk7Ozs7O2NBQUMsT0FBOEI7UUFFL0MscUJBQU0sS0FBSyxHQUFHLElBQUksMEJBQTBCLENBQ3hDLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLE9BQU8sQ0FBQyxRQUFRLEVBQ2hCLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFFaEQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7Ozs7SUFHN0IsOENBQVk7Ozs7O2NBQUMsT0FBZSxFQUFFLEtBQVk7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQVEsRUFBRSxPQUFPLElBQUssT0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUF4QixDQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7OztJQU10Riw0Q0FBVTs7Ozs7O2NBQUMsT0FBOEIsRUFBRSxJQUFVO1FBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVCLHFCQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2pCLElBQUkseUJBQXlCLENBQ3pCLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLE9BQU8sQ0FBQyxRQUFRLEVBQ2hCLE9BQU8sQ0FBQyxNQUFNLEVBQ2QsSUFBSSxFQUNKLFdBQVcsQ0FDZCxDQUNKLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDO1NBQzFCOzs7Ozs7OztJQU1HLHFEQUFtQjs7Ozs7O2NBQUMsT0FBOEIsRUFBRSxLQUFVO1FBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNwQixJQUFJLDRCQUE0QixDQUM1QixPQUFPLENBQUMsVUFBVSxFQUNsQixPQUFPLENBQUMsUUFBUSxFQUNoQixPQUFPLENBQUMsTUFBTSxFQUNkLEtBQUssQ0FDUixDQUNKLENBQUM7OztnQkEzYVQsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxrQkFBa0I7aUJBQy9COzs7O2dCQWZzRCxVQUFVOzs7eUJBa0I1RCxLQUFLLFNBQUMsa0JBQWtCO2dDQUV4QixLQUFLLFNBQUMsWUFBWTtrQ0FVbEIsS0FBSzs0QkFJTCxLQUFLOzJCQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FDTCxLQUFLOzZCQUNMLEtBQUs7cUNBRUwsTUFBTTtpQ0FFTixNQUFNLFNBQUMsU0FBUztnQ0FHaEIsTUFBTSxTQUFDLFFBQVE7bUNBR2YsTUFBTSxTQUFDLFdBQVc7cUNBR2xCLGVBQWUsU0FBQyxpQ0FBaUM7MkNBR2pELGVBQWUsU0FBQyw4QkFBOEI7O2tDQXZEbkQ7O1NBaUJhLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOGFwQzs7O0FBQUE7OztnQ0EvYkE7SUFxY0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztBQVdEOzs7QUFBQTtJQUdJLG9DQUlXLFlBSUEsVUFJQTtRQVJBLGVBQVUsR0FBVixVQUFVO1FBSVYsYUFBUSxHQUFSLFFBQVE7UUFJUixXQUFNLEdBQU4sTUFBTTtpQ0FkVyxLQUFLO0tBZTVCO0lBRUw7O09BRUc7Ozs7O0lBQ0gsbURBQWM7Ozs7SUFBZDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7S0FDakM7Ozs7SUFFRCxxREFBZ0I7OztJQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDakM7cUNBM2VMO0lBNGVDLENBQUE7Ozs7QUE1QkQsc0NBNEJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtEOzs7QUFBQTtJQUNJLG1DQUlXLFlBSUEsVUFJQSxRQUlBLE1BSUE7UUFoQkEsZUFBVSxHQUFWLFVBQVU7UUFJVixhQUFRLEdBQVIsUUFBUTtRQUlSLFdBQU0sR0FBTixNQUFNO1FBSU4sU0FBSSxHQUFKLElBQUk7UUFJSixjQUFTLEdBQVQsU0FBUztLQUNmO29DQXZnQlQ7SUF3Z0JDLENBQUE7Ozs7QUF2QkQscUNBdUJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0Q7OztBQUFBO0lBQ0ksc0NBSVcsWUFJQSxVQUlBLFFBSUE7UUFaQSxlQUFVLEdBQVYsVUFBVTtRQUlWLGFBQVEsR0FBUixRQUFRO1FBSVIsV0FBTSxHQUFOLE1BQU07UUFJTixVQUFLLEdBQUwsS0FBSztLQUNYO3VDQS9oQlQ7SUFnaUJDLENBQUE7Ozs7QUFuQkQsd0NBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBjb21iaW5lTGF0ZXN0LCBmaWx0ZXIgYXMgZmlsdGVyT3BlcmF0b3IsIGZpcnN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vaW5maW5pdGUtc2Nyb2xsLWxvYWQtYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2luZmluaXRlLXNjcm9sbC1sb2FkaW5nLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4SW5maW5pdGVTY3JvbGxdJyxcbiAgICBleHBvcnRBczogJ3V4SW5maW5pdGVTY3JvbGwnXG59KVxuZXhwb3J0IGNsYXNzIEluZmluaXRlU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoJ3V4SW5maW5pdGVTY3JvbGwnKSBsb2FkOiBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcblxuICAgIEBJbnB1dCgnY29sbGVjdGlvbicpIF9jb2xsZWN0aW9uOiBhbnlbXSA9IFtdO1xuICAgIGdldCBjb2xsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbjtcbiAgICB9XG4gICAgc2V0IGNvbGxlY3Rpb24odmFsdWU6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgQElucHV0KCkgc2V0IHNjcm9sbEVsZW1lbnQoZWxlbWVudDogRWxlbWVudFJlZiB8IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudFJlZiA/IGVsZW1lbnQgOiBuZXcgRWxlbWVudFJlZihlbGVtZW50KTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBlbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBmaWx0ZXI6IGFueTtcbiAgICBASW5wdXQoKSBsb2FkT25Jbml0OiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBsb2FkT25TY3JvbGw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHBhZ2VTaXplOiBudW1iZXIgPSAyMDtcblxuICAgIEBPdXRwdXQoKSBjb2xsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICAgIEBPdXRwdXQoJ2xvYWRpbmcnKVxuICAgIGxvYWRpbmdFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8SW5maW5pdGVTY3JvbGxMb2FkaW5nRXZlbnQ+KCk7XG5cbiAgICBAT3V0cHV0KCdsb2FkZWQnKVxuICAgIGxvYWRlZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxJbmZpbml0ZVNjcm9sbExvYWRlZEV2ZW50PigpO1xuXG4gICAgQE91dHB1dCgnbG9hZEVycm9yJylcbiAgICBsb2FkRXJyb3JFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8SW5maW5pdGVTY3JvbGxMb2FkRXJyb3JFdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oSW5maW5pdGVTY3JvbGxMb2FkQnV0dG9uRGlyZWN0aXZlKVxuICAgIHByaXZhdGUgX2xvYWRCdXR0b25RdWVyeTogUXVlcnlMaXN0PEluZmluaXRlU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZT47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEluZmluaXRlU2Nyb2xsTG9hZGluZ0RpcmVjdGl2ZSlcbiAgICBwcml2YXRlIF9sb2FkaW5nSW5kaWNhdG9yUXVlcnk6IFF1ZXJ5TGlzdDxJbmZpbml0ZVNjcm9sbExvYWRpbmdEaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfcGFnZXM6IGFueVtdW107XG4gICAgcHJpdmF0ZSBfbmV4dFBhZ2VOdW0gPSAwO1xuICAgIHByaXZhdGUgX2RvbU9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAgIHByaXZhdGUgX3Njcm9sbEV2ZW50U3ViOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfdXBkYXRlUmVxdWVzdHMgPSBuZXcgU3ViamVjdDxJbmZpbml0ZVNjcm9sbFJlcXVlc3Q+KCk7XG5cbiAgICBwcml2YXRlIF9pc0xvYWRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBwcml2YXRlIF9pc0V4aGF1c3RlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIHByaXZhdGUgX2xvYWRCdXR0b25FbmFibGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgcHJpdmF0ZSBfY2FuTG9hZE1hbnVhbGx5OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gICAgcHJpdmF0ZSBfc2Nyb2xsRWxlbWVudDogRWxlbWVudFJlZjtcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgX2xvYWRCdXR0b25TdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX2NhbkxvYWRNYW51YWxseSA9IHRoaXMuX2lzTG9hZGluZy5waXBlKGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICB0aGlzLl9pc0V4aGF1c3RlZCxcbiAgICAgICAgICAgIHRoaXMuX2xvYWRCdXR0b25FbmFibGVkLFxuICAgICAgICAgICAgKGlzTG9hZGluZywgaXNFeGhhdXN0ZWQsIGxvYWRCdXR0b25FbmFibGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpc0xvYWRpbmcgJiYgIWlzRXhoYXVzdGVkICYmIGxvYWRCdXR0b25FbmFibGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zY3JvbGxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvYWRCdXR0b25FbmFibGVkLm5leHQoIXRoaXMubG9hZE9uU2Nyb2xsKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cbiAgICAgICAgLy8gVGhlcmUgYXJlIHR3byBraW5kcyBvZiB1cGRhdGUgcmVxdWVzdHM6IGNoZWNrIGFuZCBsb2FkLlxuICAgICAgICAvLyBDaGVjayByZXF1ZXN0cyBhcmUgdGhyb3R0bGVkIGFuZCB3aWxsIG9ubHkgY2F1c2UgYW4gdXBkYXRlIGlmIG1vcmUgZGF0YSBpcyByZXF1aXJlZFxuICAgICAgICAvLyB0byBmaWxsIHRoZSBzY3JvbGxpbmcgdmlldywgYW5kIGl0IGlzbid0IGFscmVhZHkgbG9hZGluZyBzb21lLlxuICAgICAgICAvLyBMb2FkIHJlcXVlc3RzIGFyZSBub3QgdGhyb3R0bGVkIGFuZCBhbHdheXMgcmVxdWVzdCBhIHBhZ2Ugb2YgZGF0YS5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmVxdWVzdHMucGlwZShmaWx0ZXJPcGVyYXRvcihyZXF1ZXN0ID0+IHJlcXVlc3QuY2hlY2spLCBhdWRpdFRpbWUoMjAwKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLmRvUmVxdWVzdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVxdWVzdHMucGlwZShmaWx0ZXJPcGVyYXRvcihyZXF1ZXN0ID0+ICFyZXF1ZXN0LmNoZWNrKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLmRvUmVxdWVzdC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgdG8gc2Nyb2xsIGV2ZW50cyBhbmQgRE9NIGNoYW5nZXMuXG4gICAgICAgICAgICB0aGlzLmF0dGFjaEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbm5lY3QgdGhlIExvYWQgTW9yZSBidXR0b24gdmlzaWJsZSBzdGF0ZS5cbiAgICAgICAgdGhpcy5fY2FuTG9hZE1hbnVhbGx5LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShjYW5Mb2FkID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRCdXR0b25RdWVyeS5mb3JFYWNoKGxvYWRCdXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRCdXR0b24udmlzaWJsZSA9IGNhbkxvYWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29ubmVjdCB0aGUgbG9hZGluZyBpbmRpY2F0b3IgdmlzaWJsZSBzdGF0ZS5cbiAgICAgICAgdGhpcy5faXNMb2FkaW5nLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShpc0xvYWRpbmcgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9hZGluZ0luZGljYXRvclF1ZXJ5LmZvckVhY2gobG9hZGluZyA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZy52aXNpYmxlID0gaXNMb2FkaW5nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExpbmsgdGhlIExvYWQgTW9yZSBidXR0b24gY2xpY2sgZXZlbnQgdG8gdHJpZ2dlciBhbiB1cGRhdGUuXG4gICAgICAgIHRoaXMuYXR0YWNoTG9hZEJ1dHRvbkV2ZW50cygpO1xuICAgICAgICB0aGlzLl9sb2FkQnV0dG9uUXVlcnkuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hMb2FkQnV0dG9uRXZlbnRzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEluaXRpYWwgdXBkYXRlLlxuICAgICAgICBpZiAodGhpcy5sb2FkT25Jbml0KSB7XG4gICAgICAgICAgICB0aGlzLmxvYWROZXh0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBsZXQgY2hlY2sgPSB0cnVlO1xuXG4gICAgICAgIGlmIChjaGFuZ2VzLmVuYWJsZWQgJiYgY2hhbmdlcy5lbmFibGVkLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5lbmFibGVkLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmVuYWJsZWQuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoRXZlbnRIYW5kbGVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZmlsdGVyICYmIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5maWx0ZXIucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5sb2FkT25TY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkQnV0dG9uRW5hYmxlZC5uZXh0KFxuICAgICAgICAgICAgICAgICAgICAhY2hhbmdlcy5sb2FkT25TY3JvbGwuY3VycmVudFZhbHVlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYW5nZXMucGFnZVNpemUgJiYgY2hhbmdlcy5wYWdlU2l6ZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMucGFnZVNpemUucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSZXF1ZXN0cy5uZXh0KHtcbiAgICAgICAgICAgICAgICBjaGVjazogY2hlY2ssXG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcjogdGhpcy5fbmV4dFBhZ2VOdW0sXG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXRhY2hFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgYW4gYWRkaXRpb25hbCBwYWdlIG9mIGRhdGEuXG4gICAgICovXG4gICAgbG9hZE5leHRQYWdlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmVxdWVzdHMubmV4dCh7XG4gICAgICAgICAgICBjaGVjazogZmFsc2UsXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiB0aGlzLl9uZXh0UGFnZU51bSxcbiAgICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGEgY2hlY2sgZm9yIHdoZXRoZXIgYW4gYWRkaXRpb25hbCBwYWdlIG9mIGRhdGEgaXMgcmVxdWlyZWQuIFRoaXMgaXMgdGhyb3R0bGVkLlxuICAgICAqL1xuICAgIGNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmVxdWVzdHMubmV4dCh7XG4gICAgICAgICAgICBjaGVjazogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2VOdW1iZXI6IHRoaXMuX25leHRQYWdlTnVtLFxuICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBjb2xsZWN0aW9uLiBGdXR1cmUgcmVxdWVzdHMgd2lsbCBsb2FkIGZyb20gcGFnZSAwLlxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgdGhlIHBhZ2UgY291bnRlci5cbiAgICAgICAgdGhpcy5fbmV4dFBhZ2VOdW0gPSAwO1xuXG4gICAgICAgIHRoaXMuX3BhZ2VzID0gW107XG5cbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbGxlY3Rpb24gKHdpdGhvdXQgY2hhbmdpbmcgdGhlIHJlZmVyZW5jZSkuXG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbi5sZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgdGhlIGV4aGF1c3RlZCBmbGFnLCBhbGxvd2luZyB0aGUgTG9hZCBNb3JlIGJ1dHRvbiB0byBhcHBlYXIuXG4gICAgICAgIHRoaXMuX2lzRXhoYXVzdGVkLm5leHQoZmFsc2UpO1xuXG4gICAgICAgIC8vIENhbmNlbCBhbnkgcGVuZGluZyByZXF1ZXN0c1xuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHJlcXVlc3QgPT4gcmVxdWVzdC51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZCB0aGUgZGF0YSB3aXRob3V0IGNsZWFyaW5nIHRoZSB2aWV3LlxuICAgICAqL1xuICAgIHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5fcGFnZXMuZm9yRWFjaCgocGFnZSwgaSkgPT4gdGhpcy5yZWxvYWRQYWdlKGkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxvYWQgdGhlIGRhdGEgaW4gYSBzcGVjaWZpYyBwYWdlIHdpdGhvdXQgY2xlYXJpbmcgdGhlIHZpZXcuXG4gICAgICogQHBhcmFtIHBhZ2VOdW0gUGFnZSBudW1iZXJcbiAgICAgKi9cbiAgICByZWxvYWRQYWdlKHBhZ2VOdW06IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmVxdWVzdHMubmV4dCh7XG4gICAgICAgICAgICBjaGVjazogZmFsc2UsXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiBwYWdlTnVtLFxuICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICAgICAgcmVsb2FkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBzY3JvbGwgZXZlbnQgaGFuZGxlciBhbmQgRE9NIG9ic2VydmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgYXR0YWNoRXZlbnRIYW5kbGVycygpIHtcblxuICAgICAgICAvLyBpZiB0aGUgc2Nyb2xsRWxlbWVudCBpcyBkb2N1bWVudEVsZW1lbnQgd2UgbXVzdCB3YXRjaCBmb3IgYSBzY3JvbGwgZXZlbnQgb24gdGhlIGRvY3VtZW50XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuX3Njcm9sbEVsZW1lbnQubmF0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxIdG1sRWxlbWVudCA/IGRvY3VtZW50IDogdGhpcy5fc2Nyb2xsRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgc2Nyb2xsIGV2ZW50IG9uIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRTdWIgPSBmcm9tRXZlbnQodGFyZ2V0LCAnc2Nyb2xsJykuc3Vic2NyaWJlKHRoaXMuY2hlY2suYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoaWxkIERPTSBjaGFuZ2VzLiBUaGUgbWFpbiBlZmZlY3Qgb2YgdGhpcyBpcyB0byBjaGVjayB3aGV0aGVyIGV2ZW4gbW9yZSBkYXRhIGlzXG4gICAgICAgIC8vIHJlcXVpcmVkIGFmdGVyIHRoZSBpbml0aWFsIGxvYWQuXG4gICAgICAgIHRoaXMuX2RvbU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5jaGVjay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fZG9tT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9zY3JvbGxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoIHNjcm9sbCBldmVudCBoYW5kbGVyIGFuZCBET00gb2JzZXJ2ZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkZXRhY2hFdmVudEhhbmRsZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsRXZlbnRTdWIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbEV2ZW50U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxFdmVudFN1YiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZG9tT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvbU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuX2RvbU9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbnkgZXhpc3RpbmcgZXZlbnQgc3Vic2NyaXB0aW9ucyBmb3IgdGhlIGxvYWQgYnV0dG9uIGBsb2FkYCBldmVudCwgdGhlbiBhdHRhY2ggc3Vic2NyaXB0aW9uc1xuICAgICAqIGZvciBhbnkgaW4gdGhlIHF1ZXJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgYXR0YWNoTG9hZEJ1dHRvbkV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5fbG9hZEJ1dHRvblN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuX2xvYWRCdXR0b25TdWJzY3JpcHRpb25zID0gdGhpcy5fbG9hZEJ1dHRvblF1ZXJ5Lm1hcChcbiAgICAgICAgICAgIGxvYWRCdXR0b24gPT4gbG9hZEJ1dHRvbi5sb2FkLnN1YnNjcmliZSh0aGlzLmxvYWROZXh0UGFnZS5iaW5kKHRoaXMpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmRpdGlvbmFsbHkgbG9hZHMgYSBwYWdlIGludG8gdGhlIGNvbGxlY3Rpb24gYmFzZWQgb24gZGlyZWN0aXZlIHN0YXRlIGFuZCByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkb1JlcXVlc3QocmVxdWVzdDogSW5maW5pdGVTY3JvbGxSZXF1ZXN0KSB7XG5cbiAgICAgICAgLy8gTG9hZCBhIG5ldyBwYWdlIGlmIHRoZSBzY3JvbGwgcG9zaXRpb24gaXMgYmV5b25kIHRoZSB0aHJlc2hob2xkIGFuZCBpZiB0aGUgY2xpZW50IGNvZGUgZGlkIG5vdFxuICAgICAgICAvLyBjYW5jZWwuXG4gICAgICAgIGlmICh0aGlzLm5lZWRzRGF0YShyZXF1ZXN0KSAmJiB0aGlzLmJlZ2luTG9hZGluZyhyZXF1ZXN0KSkge1xuXG4gICAgICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIGxvYWQgZnVuY3Rpb24sIHdoaWNoIHJldHVybnMgYSBwcm9tb3NlIG9yIHBsYWluIGRhdGEuXG4gICAgICAgICAgICBjb25zdCBsb2FkUmVzdWx0ID0gdGhpcy5sb2FkKHJlcXVlc3QucGFnZU51bWJlciwgcmVxdWVzdC5wYWdlU2l6ZSwgcmVxdWVzdC5maWx0ZXIpO1xuXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gQXJyYXkuaXNBcnJheShsb2FkUmVzdWx0KSA/IG9mKGxvYWRSZXN1bHQpIDogZnJvbTxhbnlbXT4obG9hZFJlc3VsdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgaXRlbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgcGFyYW1ldGVycyBoYXZlIG5vdCBjaGFuZ2VkIHNpbmNlIHRoZSBsb2FkIHN0YXJ0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBkaXNjYXJkIHRoZSByZXN1bHRzLlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5maWx0ZXIgPT09IHRoaXMuZmlsdGVyICYmIHJlcXVlc3QucGFnZVNpemUgPT09IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBhZ2VJdGVtcyhyZXF1ZXN0LnBhZ2VOdW1iZXIsIGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW1pdCB0aGUgbG9hZGVkIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZExvYWRpbmcocmVxdWVzdCwgaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBFbWl0IHRoZSBsb2FkRXJyb3IgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRMb2FkaW5nV2l0aEVycm9yKHJlcXVlc3QsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGlzIHJlcXVlc3QgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucy5maWx0ZXIocyA9PiBzICE9PSBzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgc3Vic2NyaXB0aW9uIHRvIHRoZSBsaXN0IG9mIHJlcXVlc3RzXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgZnVsZmlsbGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgbmVlZHNEYXRhKHJlcXVlc3Q6IEluZmluaXRlU2Nyb2xsUmVxdWVzdCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWx3YXlzIGxvYWQgZm9yIGEgbG9hZCByZXF1ZXN0XG4gICAgICAgIGlmICghcmVxdWVzdC5jaGVjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZ25vcmUgYSBjaGVjayByZXF1ZXN0IHdoZW4gdGhlIGVuZCBvZiBkYXRhIGhhcyBiZWVuIGRldGVjdGVkLCBvciBpZiBkYXRhIGlzIGN1cnJlbnRseSBsb2FkaW5nLlxuICAgICAgICBpZiAodGhpcy5faXNFeGhhdXN0ZWQuZ2V0VmFsdWUoKSB8fCB0aGlzLl9pc0xvYWRpbmcuZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTG9hZCBpZiB0aGUgcmVtYWluaW5nIHNjcm9sbCBhcmVhIGlzIDw9IHRoZSBlbGVtZW50IGhlaWdodC5cbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbEVsZW1lbnQgJiYgdGhpcy5sb2FkT25TY3JvbGwpIHtcblxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IDxIVE1MRWxlbWVudD50aGlzLl9zY3JvbGxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCByZW1haW5pbmdTY3JvbGwgPVxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAoZWxlbWVudC5zY3JvbGxUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCk7XG5cbiAgICAgICAgICAgIHJldHVybiByZW1haW5pbmdTY3JvbGwgPD0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBzdGF0ZSBmb3IgdGhlIGJlZ2lubmluZyBvZiBhIGxvYWQuIFJldHVybnMgZmFsc2UgaWYgdGhlIGBsb2FkaW5nYCBldmVudCB3YXMgY2FuY2VsbGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgYmVnaW5Mb2FkaW5nKHJlcXVlc3Q6IEluZmluaXRlU2Nyb2xsUmVxdWVzdCk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEluZmluaXRlU2Nyb2xsTG9hZGluZ0V2ZW50KFxuICAgICAgICAgICAgcmVxdWVzdC5wYWdlTnVtYmVyLFxuICAgICAgICAgICAgcmVxdWVzdC5wYWdlU2l6ZSxcbiAgICAgICAgICAgIHJlcXVlc3QuZmlsdGVyXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubG9hZGluZ0V2ZW50LmVtaXQoZXZlbnQpO1xuXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZy5uZXh0KCFldmVudC5kZWZhdWx0UHJldmVudGVkKCkpO1xuXG4gICAgICAgIHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFnZUl0ZW1zKHBhZ2VOdW06IG51bWJlciwgaXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VzW3BhZ2VOdW1dID0gaXRlbXM7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IHRoaXMuX3BhZ2VzLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHByZXZpb3VzLmNvbmNhdChjdXJyZW50KSwgW10pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgc3RhdGUgZnJvbSBhIHN1Y2Nlc3NmdWwgbG9hZC4gUmFpc2VzIHRoZSBgbG9hZGVkYCBldmVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGVuZExvYWRpbmcocmVxdWVzdDogSW5maW5pdGVTY3JvbGxSZXF1ZXN0LCBkYXRhPzogYW55KSB7XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZy5uZXh0KGZhbHNlKTtcblxuICAgICAgICBjb25zdCBpc0V4aGF1c3RlZCA9ICEhKGRhdGEgJiYgZGF0YS5sZW5ndGggPCB0aGlzLnBhZ2VTaXplKTtcbiAgICAgICAgdGhpcy5faXNFeGhhdXN0ZWQubmV4dChpc0V4aGF1c3RlZCk7XG5cbiAgICAgICAgdGhpcy5sb2FkZWRFdmVudC5lbWl0KFxuICAgICAgICAgICAgbmV3IEluZmluaXRlU2Nyb2xsTG9hZGVkRXZlbnQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYWdlTnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFnZVNpemUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5maWx0ZXIsXG4gICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICBpc0V4aGF1c3RlZFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcmVxdWVzdC5yZWxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRQYWdlTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHN0YXRlIGZyb20gYSBmYWlsZWQgbG9hZC4gUmFpc2VzIHRoZSBgbG9hZEVycm9yYCBldmVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGVuZExvYWRpbmdXaXRoRXJyb3IocmVxdWVzdDogSW5maW5pdGVTY3JvbGxSZXF1ZXN0LCBlcnJvcjogYW55KSB7XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZy5uZXh0KGZhbHNlKTtcblxuICAgICAgICB0aGlzLmxvYWRFcnJvckV2ZW50LmVtaXQoXG4gICAgICAgICAgICBuZXcgSW5maW5pdGVTY3JvbGxMb2FkRXJyb3JFdmVudChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhZ2VOdW1iZXIsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYWdlU2l6ZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmZpbHRlcixcbiAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgaW50ZXJuYWwgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSBsb2FkL2NoZWNrIHJlcXVlc3QuXG4gKi9cbmNsYXNzIEluZmluaXRlU2Nyb2xsUmVxdWVzdCB7XG4gICAgY2hlY2s6IGJvb2xlYW47XG4gICAgcGFnZU51bWJlcjogbnVtYmVyO1xuICAgIHBhZ2VTaXplOiBudW1iZXI7XG4gICAgZmlsdGVyOiBhbnk7XG4gICAgcmVsb2FkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb24gPSAoXG4gICAgcGFnZU51bTogbnVtYmVyLFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgZmlsdGVyOiBhbnlcbikgPT4gYW55IHwgUHJvbWlzZTxhbnk+O1xuXG4vKipcbiAqIEV2ZW50IHJhaXNlZCBiZWZvcmUgdGhlIGBsb2FkaW5nYCBmdW5jdGlvbiBpcyBjYWxsZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbExvYWRpbmdFdmVudCB7XG4gICAgcHJpdmF0ZSBfZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5kZXggb2YgdGhlIHJlcXVlc3RlZCBwYWdlLCBzdGFydGluZyBmcm9tIDAuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcGFnZU51bWJlcjogbnVtYmVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiBpdGVtcyByZXF1ZXN0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcGFnZVNpemU6IG51bWJlcixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmaWx0ZXIgZGV0YWlscyBhcyBwcm92aWRlZCB2aWEgdGhlIGBmaWx0ZXJgIGJpbmRpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZmlsdGVyOiBhbnlcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogUHJldmVudHMgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIHRoZSBgbG9hZGluZ2AgZXZlbnQgKGxvYWRpbmcgZnVuY3Rpb24gd2lsbCBub3QgYmUgY2FsbGVkKS5cbiAgICAgKi9cbiAgICBwcmV2ZW50RGVmYXVsdCgpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZGVmYXVsdFByZXZlbnRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRQcmV2ZW50ZWQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEV2ZW50IHJhaXNlZCB3aGVuIHRoZSBsb2FkaW5nIGZ1bmN0aW9uIHJlc3VsdCBoYXMgYmVlbiByZXNvbHZlZCBhbmQgYWRkZWQgdG8gdGhlIGNvbGxlY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbExvYWRlZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbmRleCBvZiB0aGUgcmVxdWVzdGVkIHBhZ2UsIHN0YXJ0aW5nIGZyb20gMC5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwYWdlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIGl0ZW1zIHJlcXVlc3RlZC5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwYWdlU2l6ZTogbnVtYmVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGZpbHRlciBkZXRhaWxzIGFzIHByb3ZpZGVkIHZpYSB0aGUgYGZpbHRlcmAgYmluZGluZy5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBmaWx0ZXI6IGFueSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSByZXN1bHQgb2YgdGhlIHByb21pc2UgcmV0dXJuZWQgZnJvbSB0aGUgbG9hZGluZyBmdW5jdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGlmIHRoZSBkYXRhIGlzIGNvbnNpZGVyZWQgZXhoYXVzdGVkIChudW1iZXIgb2YgaXRlbXMgcmV0dXJuZWQgbGVzcyB0aGFuIGBwYWdlU2l6ZWApLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGV4aGF1c3RlZDogYm9vbGVhblxuICAgICkgeyB9XG59XG5cbi8qKlxuICogRXZlbnQgcmFpc2VkIGlmIHRoZSBsb2FkaW5nIGZ1bmN0aW9uIHJldHVybnMgYSByZWplY3RlZCBwcm9taXNlLlxuICovXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGxMb2FkRXJyb3JFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5kZXggb2YgdGhlIHJlcXVlc3RlZCBwYWdlLCBzdGFydGluZyBmcm9tIDAuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcGFnZU51bWJlcjogbnVtYmVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiBpdGVtcyByZXF1ZXN0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcGFnZVNpemU6IG51bWJlcixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmaWx0ZXIgZGV0YWlscyBhcyBwcm92aWRlZCB2aWEgdGhlIGBmaWx0ZXJgIGJpbmRpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZmlsdGVyOiBhbnksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb2JqZWN0IHByb3ZpZGVkIHdoZW4gcmVqZWN0aW5nIHRoZSBwcm9taXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGVycm9yOiBhbnlcbiAgICApIHsgfVxufVxuIl19