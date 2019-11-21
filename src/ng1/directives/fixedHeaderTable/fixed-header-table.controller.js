export class FixedHeaderTableController {

    constructor($element, $scope) {

        this.$element = $element;
        this.$scope = $scope;

        // get the native element
        const elementRef = $element.get(0);

        // add a class to the table
        $element.addClass('ux-fixed-header-table');

        // locate the important elements
        this._tableHead = elementRef.querySelector('thead');
        this._tableBody = elementRef.querySelector('tbody');

        // bind to scroll events on the table body
        this._tableBody.addEventListener('scroll', this.onScroll.bind(this));

        // Wait until the table has a width before proceeding
        const initWatcher = $scope.$watch(() => this._tableBody.offsetWidth, (newValue, oldValue) => {

            // we need to re-run the setLayout function if the table width is greater than 0
            // and it was 0 when we first run it as it won't have correctly applied the padding to
            // the table header when there is no table width.
            if (newValue > 0 && oldValue === 0) {
                this.setLayout();
            }

            // remove the watcher after the table has a width as it is no longer needed
            if (newValue > 0) {
                initWatcher();
            }
        });

        
        // wait until bindings are available
        $scope.$evalAsync(this.onInit.bind(this));

        // ensure we have destroyed all watchers on component destroy
        $scope.$on('$destroy', () => initWatcher());
    }

    /**
     * Triggered when bindings are available
     */
    onInit() {
        // resize the table header to account for scrollbar
        this.setLayout();

        // load the first page of data
        this.requestPage();
    }

    requestPage() {
        if (angular.isFunction(this.tablePaging)) {
            this.$scope.$evalAsync(() => this.tablePaging());
        }
    }

    /**
     * Handle scroll events
     */
    onScroll() {

        // If the scroll position approaches the bottom, load a new page of data
        const remainingScroll = this._tableBody.scrollHeight - (this._tableBody.scrollTop + this._tableBody.clientHeight);
        if (remainingScroll <= this._tableBody.clientHeight) {
            this.requestPage();
        }
    }

    /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     */
    setLayout() {

        // calculate the size of the scrollbar
        const scrollbar = this._tableBody.offsetWidth - this._tableBody.clientWidth;

        // add padding to the header to account for this
        this._tableHead.style.paddingRight = scrollbar + 'px';
        this._tableBody.style.height = typeof this.tableHeight === 'number' ? `${this.tableHeight}px` : this.tableHeight;
    }

}

FixedHeaderTableController.$inject = ['$element', '$scope'];