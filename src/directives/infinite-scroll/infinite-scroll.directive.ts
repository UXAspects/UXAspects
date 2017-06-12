import { InfiniteScrollLoadButtonDirective } from './infinite-scroll-load-button.directive';
import { InfiniteScrollLoadingDirective } from './infinite-scroll-loading.directive';
import {
    AfterContentInit,
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';

@Directive({
    selector: '[uxInfiniteScroll]',
    exportAs: 'uxInfiniteScroll'
})
export class InfiniteScrollDirective implements OnInit, AfterContentInit, OnChanges, OnDestroy {

    @Input('uxInfiniteScroll') load: InfiniteScrollLoadFunction;

    @Input('collection') _collection: any[] = [];
    get collection() {
        return this._collection;
    }
    set collection(value: any[]) {
        this.collectionChange.emit(value);
        this._collection = value;
    }

    @Input() filter: any;
    @Input() pageSize: number = 20;
    @Input() scrollElement: ElementRef;
    @Input() loadOnScroll: boolean = true;

    @Output() collectionChange = new EventEmitter<any[]>();
    @Output('loading') loadingEvent = new EventEmitter<InfiniteScrollLoadingEvent>();
    @Output('loaded') loadedEvent = new EventEmitter<InfiniteScrollLoadedEvent>();
    @Output('loadError') loadErrorEvent = new EventEmitter<InfiniteScrollLoadErrorEvent>();

    @ContentChildren(InfiniteScrollLoadButtonDirective) private _loadButtonQuery: QueryList<InfiniteScrollLoadButtonDirective>;
    @ContentChildren(InfiniteScrollLoadingDirective) private _loadingIndicatorQuery: QueryList<InfiniteScrollLoadingDirective>;

    private _nextPageNum = 0;
    private _domObserver: MutationObserver;
    private _scrollEventSub: Subscription;
    private _updateRequests = new Subject<InfiniteScrollRequest>();

    private _isLoading = new BehaviorSubject<boolean>(false);
    private _isExhausted = new BehaviorSubject<boolean>(false);
    private _loadButtonEnabled = new BehaviorSubject<boolean>(false);
    private _canLoadManually: Observable<boolean>;

    private _loadButtonSubscriptions: Subscription[] = [];

    constructor(private _element: ElementRef) {

        this._canLoadManually = this._isLoading.combineLatest(this._isExhausted, this._loadButtonEnabled, (isLoading, isExhausted, loadButtonEnabled) => {
            return !isLoading && !isExhausted && loadButtonEnabled;
        });
    }

    ngOnInit() {

        if (!this.scrollElement) {
            this.scrollElement = this._element;
        }

        this._loadButtonEnabled.next(!this.loadOnScroll);
    }

    ngAfterContentInit() {

        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        const requests = this._updateRequests.partition((r) => r.check);
        requests[0].auditTime(200).subscribe(this.doRequest.bind(this));
        requests[1].subscribe(this.doRequest.bind(this));

        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = Observable.fromEvent(this.scrollElement.nativeElement, 'scroll')
            .subscribe(this.onScroll.bind(this));

        // Subscribe to child DOM changes. The main effect of this is to check whether even more data is
        // required after the initial load.
        this._domObserver = new MutationObserver(this.onDomChange.bind(this));
        this._domObserver.observe(this.scrollElement.nativeElement, {
            childList: true,
            subtree: true
        });

        // Connect the Load More button visible state.
        this._canLoadManually.subscribe((canLoad) => {
            this._loadButtonQuery.forEach((loadButton) => {
                loadButton.visible = canLoad;
            });
        });

        // Connect the loading indicator visible state.
        this._isLoading.subscribe((isLoading) => {
            this._loadingIndicatorQuery.forEach((loading) => {
                loading.visible = isLoading;
            });
        });

        // Link the Load More button click event to trigger an update.
        this.attachLoadButtonEvents();
        this._loadButtonQuery.changes.subscribe((query) => {
            this.attachLoadButtonEvents();
        });

        // Initial update.
        this.load();
    }

    ngOnChanges(changes: SimpleChanges) {

        let check = true;

        if (changes.filter && changes.filter.currentValue !== changes.filter.previousValue) {
            this.reset();
            check = false;
        }

        if (changes.pageSize && changes.pageSize.currentValue !== changes.pageSize.previousValue) {
            this.reset();
            check = false;
        }

        if (changes.loadOnScroll) {
            this._loadButtonEnabled.next(!changes.loadOnScroll.currentValue);
        }

        this._updateRequests.next({
            check: check,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }

    ngOnDestroy() {
        this._scrollEventSub.unsubscribe();
        this._domObserver.disconnect();
    }

    /**
     * Request an additional page of data.
     */
    loadNextPage() {
        this._updateRequests.next({
            check: false,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }

    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     */
    check() {
        this._updateRequests.next({
            check: true,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }

    /**
     * Clear the collection. Future requests will load from page 0.
     */
    reset() {
        // Reset the page counter.
        this._nextPageNum = 0;

        // Clear the collection (without changing the reference).
        if (this.collection) {
            this.collection.length = 0;
        }

        // Reset the exhausted flag, allowing the Load More button to appear.
        this._isExhausted.next(false);
    }

    private onScroll(event: Event) {
        this.check();
    }

    private onDomChange() {
        this.check();
    }

    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     */
    private attachLoadButtonEvents() {
        this._loadButtonSubscriptions.forEach((s) => s.unsubscribe());
        this._loadButtonSubscriptions = this._loadButtonQuery.map((loadButton) => {
            return loadButton.load.subscribe(this.load.bind(this));
        });
    }

    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     */
    private doRequest(request: InfiniteScrollRequest) {

        // Load a new page if the scroll position is beyond the threshhold and if the client code did not 
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {

            // Invoke the callback load function, which returns a promose or plain data.
            const loadResult = this.load(request.pageNumber, request.pageSize, request.filter);

            Promise.resolve(loadResult)
                .then((newData) => {

                    // Make sure that the parameters have not changed since the load started;
                    // otherwise discard the results.
                    if (request.filter === this.filter && request.pageSize === this.pageSize) {

                        if (newData && newData.length) {
                            Array.prototype.push.apply(this.collection, newData);
                        }

                        // Emit the loaded event
                        this.endLoading(request, newData);
                    }
                })
                .catch((reason) => {
                    // Emit the loadError event
                    this.endLoadingWithError(request, reason);
                });
        }
    }

    /**
     * Returns true if the request should be fulfilled.
     */
    private needsData(request: InfiniteScrollRequest): boolean {

        // Always load for a load request
        if (!request.check) {
            return true;
        }

        // Ignore a check request when the end of data has been detected, or if data is currently loading.
        if (this._isExhausted.getValue() || this._isLoading.getValue()) {
            return false;
        }

        // Load if the remaining scroll area is <= the element height.
        if (this.scrollElement && this.loadOnScroll) {
            const element = <HTMLElement>this.scrollElement.nativeElement;
            const remainingScroll = element.scrollHeight - (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }

        return false;
    }

    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     */
    private beginLoading(request: InfiniteScrollRequest): boolean {

        const event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);

        this._isLoading.next(!event.defaultPrevented());

        return !event.defaultPrevented();
    }

    /**
     * Updates state from a successful load. Raises the `loaded` event.
     */
    private endLoading(request: InfiniteScrollRequest, data?: any) {

        this._isLoading.next(false);

        const isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);

        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));

        this._nextPageNum += 1;
    }

    /**
     * Updates state from a failed load. Raises the `loadError` event.
     */
    private endLoadingWithError(request: InfiniteScrollRequest, error: any) {

        this._isLoading.next(false);

        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    }
}

/**
 * The internal data associated with a load/check request.
 */
class InfiniteScrollRequest {
    public check: boolean;
    public pageNumber: number;
    public pageSize: number;
    public filter: any;
}

export type InfiniteScrollLoadFunction = (pageNum: number, pageSize: number, filter: any) => any | Promise<any>;

/**
 * Event raised before the `loading` function is called.
 */
export class InfiniteScrollLoadingEvent {

    private _defaultPrevented = false;

    constructor(
        /**
         * The index of the requested page, starting from 0.
         */
        public pageNumber: number,
        /**
         * The number of items requested.
         */
        public pageSize: number,
        /**
         * The filter details as provided via the `filter` binding.
         */
        public filter: any) { }

    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     */
    public preventDefault() {
        this._defaultPrevented = true;
    }

    public defaultPrevented(): boolean {
        return this._defaultPrevented;
    }
}

/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
export class InfiniteScrollLoadedEvent {
    constructor(
        /**
         * The index of the requested page, starting from 0.
         */
        public pageNumber: number,
        /**
         * The number of items requested.
         */
        public pageSize: number,
        /**
         * The filter details as provided via the `filter` binding.
         */
        public filter: any,
        /**
         * The result of the promise returned from the loading function.
         */
        public data: any,
        /**
         * True if the data is considered exhausted (number of items returned less than `pageSize`).
         */
        public exhausted: boolean) { }
}

/**
 * Event raised if the loading function returns a rejected promise.
 */
export class InfiniteScrollLoadErrorEvent {
    constructor(
        /**
         * The index of the requested page, starting from 0.
         */
        public pageNumber: number,
        /**
         * The number of items requested.
         */
        public pageSize: number,
        /**
         * The filter details as provided via the `filter` binding.
         */
        public filter: any,
        /**
         * The object provided when rejecting the promise.
         */
        public error: any) { }
}