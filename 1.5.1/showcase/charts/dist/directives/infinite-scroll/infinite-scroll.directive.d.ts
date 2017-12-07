import { AfterContentInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/partition';
export declare class InfiniteScrollDirective implements OnInit, AfterContentInit, OnChanges, OnDestroy {
    private _element;
    load: InfiniteScrollLoadFunction;
    _collection: any[];
    collection: any[];
    enabled: boolean;
    filter: any;
    loadOnInit: boolean;
    loadOnScroll: boolean;
    pageSize: number;
    scrollElement: ElementRef;
    collectionChange: EventEmitter<any[]>;
    loadingEvent: EventEmitter<InfiniteScrollLoadingEvent>;
    loadedEvent: EventEmitter<InfiniteScrollLoadedEvent>;
    loadErrorEvent: EventEmitter<InfiniteScrollLoadErrorEvent>;
    private _loadButtonQuery;
    private _loadingIndicatorQuery;
    private _nextPageNum;
    private _domObserver;
    private _scrollEventSub;
    private _updateRequests;
    private _isLoading;
    private _isExhausted;
    private _loadButtonEnabled;
    private _canLoadManually;
    private _loadButtonSubscriptions;
    constructor(_element: ElementRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Request an additional page of data.
     */
    loadNextPage(): void;
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     */
    check(): void;
    /**
     * Clear the collection. Future requests will load from page 0.
     */
    reset(): void;
    private onScroll(event);
    private onDomChange();
    /**
     * Attach scroll event handler and DOM observer.
     */
    private attachEventHandlers();
    /**
     * Detach scroll event handler and DOM observer.
     */
    private detachEventHandlers();
    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     */
    private attachLoadButtonEvents();
    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     */
    private doRequest(request);
    /**
     * Returns true if the request should be fulfilled.
     */
    private needsData(request);
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     */
    private beginLoading(request);
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     */
    private endLoading(request, data?);
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     */
    private endLoadingWithError(request, error);
}
export declare type InfiniteScrollLoadFunction = (pageNum: number, pageSize: number, filter: any) => any | Promise<any>;
/**
 * Event raised before the `loading` function is called.
 */
export declare class InfiniteScrollLoadingEvent {
    /**
     * The index of the requested page, starting from 0.
     */
    pageNumber: number;
    /**
     * The number of items requested.
     */
    pageSize: number;
    /**
     * The filter details as provided via the `filter` binding.
     */
    filter: any;
    private _defaultPrevented;
    constructor(
        /**
         * The index of the requested page, starting from 0.
         */
        pageNumber: number, 
        /**
         * The number of items requested.
         */
        pageSize: number, 
        /**
         * The filter details as provided via the `filter` binding.
         */
        filter: any);
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     */
    preventDefault(): void;
    defaultPrevented(): boolean;
}
/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
export declare class InfiniteScrollLoadedEvent {
    /**
     * The index of the requested page, starting from 0.
     */
    pageNumber: number;
    /**
     * The number of items requested.
     */
    pageSize: number;
    /**
     * The filter details as provided via the `filter` binding.
     */
    filter: any;
    /**
     * The result of the promise returned from the loading function.
     */
    data: any;
    /**
     * True if the data is considered exhausted (number of items returned less than `pageSize`).
     */
    exhausted: boolean;
    constructor(
        /**
         * The index of the requested page, starting from 0.
         */
        pageNumber: number, 
        /**
         * The number of items requested.
         */
        pageSize: number, 
        /**
         * The filter details as provided via the `filter` binding.
         */
        filter: any, 
        /**
         * The result of the promise returned from the loading function.
         */
        data: any, 
        /**
         * True if the data is considered exhausted (number of items returned less than `pageSize`).
         */
        exhausted: boolean);
}
/**
 * Event raised if the loading function returns a rejected promise.
 */
export declare class InfiniteScrollLoadErrorEvent {
    /**
     * The index of the requested page, starting from 0.
     */
    pageNumber: number;
    /**
     * The number of items requested.
     */
    pageSize: number;
    /**
     * The filter details as provided via the `filter` binding.
     */
    filter: any;
    /**
     * The object provided when rejecting the promise.
     */
    error: any;
    constructor(
        /**
         * The index of the requested page, starting from 0.
         */
        pageNumber: number, 
        /**
         * The number of items requested.
         */
        pageSize: number, 
        /**
         * The filter details as provided via the `filter` binding.
         */
        filter: any, 
        /**
         * The object provided when rejecting the promise.
         */
        error: any);
}
