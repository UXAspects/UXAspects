import { InfiniteScrollController } from './infiniteScroll.controller';

infiniteScroll.$inject = ['$compile', '$templateRequest'];

export default function infiniteScroll($compile, $templateRequest) {
    return {
        restrict: 'A',
        controller: InfiniteScrollController,
        controllerAs: '$ctrl',
        bindToController: true,
        scope: {
            pageSize: '=',
            pageFn: '=',
            pagePosition: '=?',
            containerId: '=?',
            itemTemplate: '=',
            itemApi: '=',
            showLoading: '=?',
            searchQuery: '=?',
            scrollConfig: '=',
            windowScroll: '=?',
            loadMoreButton: '=?',
            loadingChange: '&'
        },
        link: function (scope, element, attrs, controller) {

            // create our insertion point
            $templateRequest(controller.itemTemplate).then(template => {

                // create an element from the template and add repeater
                const templateElement = angular.element(template);
                templateElement.attr('ng-repeat', 'data in $ctrl.items');
                templateElement.attr('ng-init', 'api = $ctrl.itemApi');

                // compile and add element
                getContainer().prepend($compile(templateElement)(scope));
            });

            // if we need a load more button then create one
            if (controller.buttonOptions && controller.buttonOptions.show) {

                // create the button element
                let button = angular.element(`
                    <div class="infinite-scroll-load-button {{ $ctrl.buttonOptions.class }}" ng-click="$ctrl.getNextPage()" ng-show="!$ctrl.loading">
                        <p class="load-button-text">{{ $ctrl.buttonOptions.text }}</p>
                    </div>
                `);

                // add the element to the dom
                getContainer().append($compile(button)(scope));
            }

            // add a loading indicator if required
            if (controller.showLoading) {

                const indicator = angular.element(`
                    <div class="infinite-scroll-loading" ng-show="$ctrl.loading">
                        <div class="spinner spinner-accent"></div>
                        <span class="spinner-text">Loading...</span>
                    </div>
                `);

                getContainer().append($compile(indicator)(scope));
            }

            function getContainer() {
                return !controller.containerId ? element : angular.element(element.find('[infinite-scroll-container="' + controller.containerId + '"]').get(0));
            }
        }
    };
}