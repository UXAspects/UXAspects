angular.module('app').directive('uxdSearchBuilderCodeWrapper', SearchBuilderCodeWrapperDirective);

function SearchBuilderCodeWrapperDirective() {
    return {
        restrict: 'E',
        template: require('./search-builder-code-wrapper.directive.html'),
        scope: {
            snippets: '='
        },
        controller: SearchBuilderCodeWrapperController,
        controllerAs: 'vm'
    };
}

angular.module('app').controller('SearchBuilderCodeWrapperController', SearchBuilderCodeWrapperController);

SearchBuilderCodeWrapperController.$inject = ['$scope', '$templateCache', '$modal'];

function SearchBuilderCodeWrapperController($scope, $templateCache, $modal) {
    $templateCache.put('codeModal.html', require('../templates/codeModal.html'));
    $templateCache.put('launchingModal.html', require('../templates/launchingModal.html'));
    $templateCache.put('searchBuilder.html', require('../templates/searchBuilder.html'));
    $templateCache.put('services.html', require('../templates/services.html'));
    $templateCache.put('searchComponents.html', require('../templates/searchComponents.html'));
    $templateCache.put('insetPanels.html', require('../templates/insetPanels.html'));

    var vm = this;

    vm.openCodeModal = function () {
        $modal.open({
            animation: false,
            templateUrl: 'codeModal.html',
            controller: 'SearchBuilderCodeCtrl',
            controllerAs: 'vm',
            resolve: {
                'snippets': function() { return $scope.snippets; }
            },
            keyboard: 'true',
            size: 'lg',
            windowClass: 'marquee-modal-window'
        });
    };

    // Clean up scope
    vm.$onDestroy = function () {
        $scope.$destroy();
    };
}

angular.module('app').controller('SearchBuilderCodeCtrl', SearchBuilderCodeCtrl);

SearchBuilderCodeCtrl.$inject = ['$modalInstance', '$scope', 'snippets'];

function SearchBuilderCodeCtrl($modalInstance, $scope, snippets) {
    var vm = this;

    $scope.snippets = snippets;

    vm.scrollBarConfig = {
        resizeSensor: true,
        enableKeyboardNavigation: true,
        showOnlyOnHover: true,
        isScrollableH: false
    };

    vm.selectedSection = 0;

    vm.sections = [{
        title: 'Launching Modal',
        templateUrl: 'launchingModal.html'
    }, {
        title: 'Search Builder',
        templateUrl: 'searchBuilder.html'
    }, {
        title: 'Services',
        templateUrl: 'services.html'
    }, {
        title: 'Search Components',
        templateUrl: 'searchComponents.html'
    }, {
        title: 'Inset Panels',
        templateUrl: 'insetPanels.html'
    }];

    $scope.$watch('vm.selectedSection', function (nv, ov) {
        if (nv !== ov) {
            //try and reset the scroll position when changing tabs
            $('.marquee-body').find('.jspPane').css('top', 0);
        }
    });

    vm.ok = function () {
        $modalInstance.dismiss("ok");
    };

    vm.cancel = function () {
        $modalInstance.dismiss("cancel");
    };
}