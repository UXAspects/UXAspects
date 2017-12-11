import * as angular from "angular";

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

        // wait until bindings are available
        $scope.$evalAsync(this.onInit.bind(this));
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

        // determine if we are scrolled to the bottom and if so load the next page
        if (this._tableBody.scrollTop === (this._tableBody.scrollHeight - this._tableBody.offsetHeight)) {
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
        this._tableBody.style.height = this.tableHeight + 'px';
    }

}

FixedHeaderTableController.$inject = ['$element', '$scope'];