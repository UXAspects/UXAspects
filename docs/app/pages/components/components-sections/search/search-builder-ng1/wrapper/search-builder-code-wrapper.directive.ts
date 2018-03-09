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

function SearchBuilderCodeWrapperController($scope: ng.IScope, $templateCache: ng.ITemplateCacheService, $modal: any) {
    $templateCache.put('codeModal.html', require('../templates/codeModal.html'));
    $templateCache.put('launchingModal.html', require('../templates/launchingModal.html'));
    $templateCache.put('searchBuilder.html', require('../templates/searchBuilder.html'));
    $templateCache.put('services.html', require('../templates/services.html'));
    $templateCache.put('searchComponents.html', require('../templates/searchComponents.html'));
    $templateCache.put('insetPanels.html', require('../templates/insetPanels.html'));

    var vm = this;

    vm.openCodeModal = function () {

        // workaround for @ngtools - prevent it trying to load resource
        var key = 'templateUrl';
    
        var config = {
            animation: false,
            controller: 'SearchBuilderCodeCtrl',
            controllerAs: 'vm',
            resolve: {
                snippets: function () { return $scope.snippets; }
            },
            keyboard: 'true',
            size: 'lg',
            windowClass: 'marquee-modal-window'
        };

        config[key] = 'codeModal.html';

        $modal.open(config);
    };

    // Clean up scope
    vm.$onDestroy = function () {
        $scope.$destroy();
    };
}

angular.module('app').controller('SearchBuilderCodeCtrl', SearchBuilderCodeCtrl);

SearchBuilderCodeCtrl.$inject = ['$modalInstance', '$scope', 'snippets'];

function SearchBuilderCodeCtrl($modalInstance: any, $scope: ng.IScope, snippets: any) {
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
        url: 'launchingModal.html'
    }, {
        title: 'Search Builder',
        url: 'searchBuilder.html'
    }, {
        title: 'Services',
        url: 'services.html'
    }, {
        title: 'Search Components',
        url: 'searchComponents.html'
    }, {
        title: 'Inset Panels',
        url: 'insetPanels.html'
    }];

    // workaround - @ngtools tries to inline these
    vm.sections.forEach((section: any) => section.templateUrl = section.url);

    $scope.$watch('vm.selectedSection', function (nv, ov) {
        if (nv !== ov) {
            // try and reset the scroll position when changing tabs
            $('.marquee-body').find('.jspPane').css('top', 0);
        }
    });

    vm.ok = function () {
        $modalInstance.dismiss('ok');
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}