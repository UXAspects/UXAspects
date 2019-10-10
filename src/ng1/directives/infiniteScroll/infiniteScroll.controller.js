import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { first } from 'rxjs/operators';
import { ElementScrollAdapter } from "./adapters/element-scroll.adapter";
import { ScrollPaneAdapter } from "./adapters/scroll-pane.adapter";
import { WindowScrollAdapter } from "./adapters/window-scroll.adapter";

export class InfiniteScrollController {

    get searchQuery() {
        return this._query || '';
    }

    set searchQuery(value) {
        if (value !== this._query) {
            this._query = value;
            this.reset();
        }
    }

    set loading(value) {
        this._loading = value;

        if (this.loadingChange) {
            this.loadingChange(value);
        }
    }

    get loading() {
        return this._loading;
    }

    constructor($attrs, $scope, $element, safeInterval, $timeout) {
        this.page = 0;
        this.items = [];
        this.pages = [];
        this.initialised = true;
        this.template = null;
        this.complete = false;
        this.$element = $element;
        this.$interval = safeInterval.create($scope);
        this._loading = false;
        this._ensureScrollableInterval = null;

        // private variables
        this._query = this._query || null;
        this._subscriptions = [];

        // set some default values if required
        this.pagePosition = this.pagePosition || 85;
        this.windowScroll = this.windowScroll || false;
        this.showLoading = this.showLoading !== false;
        this.buttonOptions = angular.extend({ show: false, text: 'Load More' }, this.loadMoreButton);

        // determine the type of scrolling to use
        this.scrollbar = angular.isUndefined($attrs.scrollPane) ? ScrollType.Standard : ScrollType.JScrollPane;

        // watch for broadcasted events
        $scope.$on('infiniteScroll.reset', () => this.reset());
        $scope.$on('infiniteScroll.reload', () => this.reload());
        $scope.$on('infiniteScroll.reloadPage', (event, page) => this.getPage(page));

        // cleanup after ourselves
        $scope.$on('$destroy', () => this.scrollbarAdapter.destroy());

        // get the appropriate scrollbar adapter
        this.scrollbarAdapter = this.getScrollbarAdapter();

        // we want to ensure that the container is scrollable
        this.scrollbarAdapter.subscribe('initialised', () => $timeout(this.ensureScrollable.bind(this)));

        // bind to any scroll events
        this.scrollbarAdapter.subscribe('scroll', this.onScroll.bind(this));

        // load the first page
        this.getPage(0);
    }

    /**
     * Ensure that there are enough items to scroll
     */
    ensureScrollable() {

        if (this._ensureScrollableInterval) return;

        //if we are using a load more button this is also not required
        if (this.buttonOptions && this.buttonOptions.show) return;

        // repeat until we have enough items
        this._ensureScrollableInterval = this.$interval.interval(() => {

            let isElementHidden = this.$element.is(':hidden');

            // if we are currently loading or have loaded all pages then do nothing
            if (this.loading || this.complete || document.hidden || isElementHidden) {
                return;
            }

            // check if scrollbar is visible
            if (!this.scrollbarAdapter.getScrollbarVisible()) {
                this.getNextPage();
            }

        }, 250, 0, false);
    }

    /**
     * Handle scroll events
     */
    onScroll(position) {

        // if we are using the load more button
        // or we are currently loading then stop here
        if (this.loading || this.buttonOptions.show) {
            return;
        }

        // otherwise check if the position is greater than the loading position
        if (position >= this.pagePosition && !this.complete) {
            this.getNextPage();
        }
    }

    /**
     * Get the items for a specific page
     */
    getPage(page) {

        // update the loading state
        this.loading = true;

        // call the specified paging function
        let results = this.pageFn(page, this.pageSize, this.searchQuery);

        // convert to an observable
        const observable = angular.isArray(results) ? of(results) : from(results);

        // store the subscription - now it is cancellable unlike a promise
        const subscription = observable.pipe(first()).subscribe(items => {

            // remove this request from the list
            this._subscriptions = this._subscriptions.filter(request => request !== subscription);

            // update the data for the current page
            this.setPageItems(page, items);

            // check if we have finished loading all requests
            if (this._subscriptions.length === 0) {
                this.loading = false;
            }
        });

        // add the subscription to the list of requests
        this._subscriptions.push(subscription);
    }

    /**
     * Load the next page
     */
    getNextPage() {
        this.getPage(++this.page);
    }

    /**
     * Define the items associated with each page
     */
    setPageItems(page, items) {

        // if we return less items that the specified page size then we have loaded all items
        if (items.length < this.pageSize) {
            this.complete = true;
        }

        // store the data for the relevant page
        this.pages[page] = items;

        // flatten the array
        this.items = this.pages.reduce((previous, current) => previous.concat(current), []);

        // update the loading state
        this.loading = false;
    }

    reset() {

        if (!this.initialised) {
            return;
        }

        // remove all current data
        this.page = 0;
        this.items = [];
        this.pages = [];

        // reset the loading state and cancel any pending requests
        this.loading = false;
        this.complete = false;

        // cancel any pending requests
        if (this._subscriptions) {
            this._subscriptions.forEach(request => request.unsubscribe());
        }

        this._subscriptions = [];

        // ensure we scroll back to the top of the element
        if (this.scrollbarAdapter) {
            this.scrollbarAdapter.scrollTop();
        }

        // reset back to page one
        this.getPage(0);
    }

    /**
     * Reload all pages that have already been loaded
     */
    reload() {
        this.pages.forEach((page, idx) => this.getPage(idx));
    }

    /**
     * Allows us to abstract the different event bindings
     */
    getScrollbarAdapter() {

        if (this.scrollbar === ScrollType.JScrollPane) {
            return new ScrollPaneAdapter(this.$element);
        }

        if (this.scrollbar === ScrollType.Standard && this.windowScroll) {
            return new WindowScrollAdapter();
        }

        return new ElementScrollAdapter(this.$element);
    }

}

const ScrollType = {
    JScrollPane: 0,
    Standard: 1
};

InfiniteScrollController.$inject = ['$attrs', '$scope', '$element', 'safeInterval', '$timeout'];