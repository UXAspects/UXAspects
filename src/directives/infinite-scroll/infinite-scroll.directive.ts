
import { AfterContentInit, ContentChildren, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { BehaviorSubject, from, fromEvent, Observable, of, Subject, Subscription } from 'rxjs';
import { auditTime, combineLatest, filter as filterOperator, first, takeUntil } from 'rxjs/operators';
import { InfiniteScrollLoadButtonDirective } from './infinite-scroll-load-button.directive';
import { InfiniteScrollLoadingDirective } from './infinite-scroll-loading.directive';

@Directive({
    selector: '[uxInfiniteScroll]',
    exportAs: 'uxInfiniteScroll'
})
export class InfiniteScrollDirective<T = any> implements OnInit, AfterContentInit, OnChanges, OnDestroy {

    @Input('uxInfiniteScroll') load: InfiniteScrollLoadFunction<T>;

    @Input('collection') _collection: T[] = [];
    get collection() {
        return this._collection;
    }
    set collection(value: T[]) {
        this.collectionChange.emit(value);
        this._collection = value;
    }


    @Input() set scrollElement(element: ElementRef | HTMLElement) {
        this._scrollElement = element instanceof ElementRef ? element : new ElementRef(element);
    }

    @Input() enabled: boolean = true;
    @Input() filter: any;
    @Input() loadOnInit: boolean = true;
    @Input() loadOnScroll: boolean = true;
    @Input() pageSize: number = 20;

    @Output() collectionChange = new EventEmitter<T[]>();

    @Output('loading')
    loadingEvent = new EventEmitter<InfiniteScrollLoadingEvent>();

    @Output('loaded')
    loadedEvent = new EventEmitter<InfiniteScrollLoadedEvent>();

    @Output('loadError')
    loadErrorEvent = new EventEmitter<InfiniteScrollLoadErrorEvent>();

    @ContentChildren(InfiniteScrollLoadButtonDirective)
    private _loadButtonQuery: QueryList<InfiniteScrollLoadButtonDirective>;

    @ContentChildren(InfiniteScrollLoadingDirective)
    private _loadingIndicatorQuery: QueryList<InfiniteScrollLoadingDirective>;

    private _pages: T[][];
    private _nextPageNum = 0;
    private _domObserver: MutationObserver;
    private _scrollEventSub: Subscription;
    private _updateRequests = new Subject<InfiniteScrollRequest<T>>();

    private _isLoading = new BehaviorSubject<boolean>(false);
    private _isExhausted = new BehaviorSubject<boolean>(false);
    private _loadButtonEnabled = new BehaviorSubject<boolean>(false);
    private _canLoadManually: Observable<boolean>;

    private _scrollElement: ElementRef;
    private _subscriptions: Subscription[] = [];
    private _loadButtonSubscriptions: Subscription[] = [];
    private _onDestroy = new Subject<void>();

    constructor(private _element: ElementRef) {
        this._canLoadManually = this._isLoading.pipe(combineLatest(
            this._isExhausted,
            this._loadButtonEnabled,
            (isLoading, isExhausted, loadButtonEnabled) => {
                return !isLoading && !isExhausted && loadButtonEnabled;
            }
        ));
    }

    ngOnInit(): void {
        if (!this._scrollElement) {
            this._scrollElement = this._element;
        }

        this._loadButtonEnabled.next(!this.loadOnScroll);
    }

    ngAfterContentInit(): void {

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

    ngOnChanges(changes: SimpleChanges): void {
        let check = true;

        if (changes.enabled && changes.enabled.currentValue !== changes.enabled.previousValue) {
            if (changes.enabled.currentValue) {
                this.attachEventHandlers();
                this.reset();
                check = false;
            } else {
                this.detachEventHandlers();
            }
        }

        if (this.enabled) {
            // discount filter.previousValue if null or undefined.
            if (changes.filter && changes.filter.currentValue !== changes.filter.previousValue && changes.filter.previousValue !== undefined && changes.filter.previousValue !== null) {
                this.reset();
                check = false;
            }

            if (changes.loadOnScroll) {
                this._loadButtonEnabled.next(
                    !changes.loadOnScroll.currentValue
                );
            }

            if (changes.pageSize && changes.pageSize.currentValue !== changes.pageSize.previousValue) {
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

    ngOnDestroy(): void {
        this.detachEventHandlers();
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Request an additional page of data.
     */
    loadNextPage(): void {
        if (!this.enabled) {
            return;
        }
        // filter should consider null/undefined to be ''.
        if (!this.filter || this.filter === null) {
            this.filter = '';
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
     */
    check(): void {
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
     */
    reset(): void {
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
     */
    reload(): void {
        this._pages.forEach((page, i) => this.reloadPage(i));
    }

    /**
     * Reload the data in a specific page without clearing the view.
     * @param pageNum Page number
     */
    reloadPage(pageNum: number): void {
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
     */
    private attachEventHandlers(): void {

        // if the scrollElement is documentElement we must watch for a scroll event on the document
        const target = this._scrollElement.nativeElement instanceof HTMLHtmlElement ? document : this._scrollElement.nativeElement;

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
     */
    private detachEventHandlers(): void {
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
     * Remove any existing event subscriptions for the load button `loading` event, then attach
     * subscriptions
     * for any in the query.
     */
    private attachLoadButtonEvents(): void {
        this._loadButtonSubscriptions.forEach(s => s.unsubscribe());
        this._loadButtonSubscriptions = this._loadButtonQuery.map(
            loadButton => loadButton.loading.subscribe(this.loadNextPage.bind(this))
        );
    }

    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     */
    private doRequest(request: InfiniteScrollRequest<T>): void {

        // Load a new page if the scroll position is beyond the threshhold and if the client code did not
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {

            // Invoke the callback load function, which returns a promose or plain data.
            const loadResult = this.load(request.pageNumber, request.pageSize, request.filter);

            const observable = Array.isArray(loadResult) ? of(loadResult) : from(loadResult);

            const subscription = observable.pipe(first()).subscribe(
                items => {
                    // Make sure that the parameters have not changed since the load started;
                    // otherwise discard the results.
                    if (request.filter === this.filter && request.pageSize === this.pageSize) {
                        if (items && items.length) {
                            this.setPageItems(request.pageNumber, items);
                        }

                        // Emit the loaded event
                        this.endLoading(request, items);
                    }
                },
                reason => {
                    // Emit the loadError event
                    this.endLoadingWithError(request, reason);
                },
                () => {
                    // remove this request from the list
                    this._subscriptions = this._subscriptions.filter(s => s !== subscription);
                }
            );

            // add the subscription to the list of requests
            this._subscriptions.push(subscription);
        }
    }

    /**
     * Returns true if the request should be fulfilled.
     */
    private needsData(request: InfiniteScrollRequest<T>): boolean {
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

            const element = <HTMLElement>this._scrollElement.nativeElement;
            const remainingScroll =
                element.scrollHeight -
                (element.scrollTop + element.clientHeight);

            return remainingScroll <= element.clientHeight;
        }

        return false;
    }

    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     */
    private beginLoading(request: InfiniteScrollRequest<T>): boolean {

        const event = new InfiniteScrollLoadingEvent(
            request.pageNumber,
            request.pageSize,
            request.filter
        );
        this.loadingEvent.emit(event);

        this._isLoading.next(!event.defaultPrevented());

        return !event.defaultPrevented();
    }

    private setPageItems(pageNum: number, items: T[]) {
        this._pages[pageNum] = items;
        this.collection = this._pages.reduce((previous, current) => previous.concat(current), []);
    }

    /**
     * Updates state from a successful load. Raises the `loaded` event.
     */
    private endLoading(request: InfiniteScrollRequest<T>, data?: any): void {
        this._isLoading.next(false);

        const isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);

        this.loadedEvent.emit(
            new InfiniteScrollLoadedEvent(
                request.pageNumber,
                request.pageSize,
                request.filter,
                data,
                isExhausted
            )
        );

        if (!request.reload) {
            this._nextPageNum += 1;
        }
    }

    /**
     * Updates state from a failed load. Raises the `loadError` event.
     */
    private endLoadingWithError(request: InfiniteScrollRequest<T>, error: any): void {
        this._isLoading.next(false);

        this.loadErrorEvent.emit(
            new InfiniteScrollLoadErrorEvent<T>(
                request.pageNumber,
                request.pageSize,
                request.filter,
                error
            )
        );
    }
}

/**
 * The internal data associated with a load/check request.
 */
class InfiniteScrollRequest<S = any> {
    check: boolean;
    pageNumber: number;
    pageSize: number;
    filter: S;
    reload?: boolean;
}

export type InfiniteScrollLoadFunction<T = any, S = any> = (
    pageNum: number,
    pageSize: number,
    filter: S
) => T[] | Promise<T[]>;

/**
 * Event raised before the `loading` function is called.
 */
export class InfiniteScrollLoadingEvent<S = any> {
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
        public filter: S
    ) { }

    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     */
    preventDefault(): void {
        this._defaultPrevented = true;
    }

    defaultPrevented(): boolean {
        return this._defaultPrevented;
    }
}

/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
export class InfiniteScrollLoadedEvent<T = any, S = any> {
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
        public filter: S,
        /**
         * The result of the promise returned from the loading function.
         */
        public data: T[],
        /**
         * True if the data is considered exhausted (number of items returned less than `pageSize`).
         */
        public exhausted: boolean
    ) { }
}

/**
 * Event raised if the loading function returns a rejected promise.
 */
export class InfiniteScrollLoadErrorEvent<S = any> {
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
        public filter: S,
        /**
         * The object provided when rejecting the promise.
         */
        public error: any
    ) { }
}
