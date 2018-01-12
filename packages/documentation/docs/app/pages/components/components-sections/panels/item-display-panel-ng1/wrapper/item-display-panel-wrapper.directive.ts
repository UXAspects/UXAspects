angular.module('app').directive('uxdItemDisplayPanelWrapper', () => {
    return {
        restrict: 'E',
        template: require('./item-display-panel-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', function ($scope, $templateCache) {
            $templateCache.put('item-display-panel-ng1/modalFooter.html', require('!!raw-loader!../snippets/modalFooter.html'));
            $templateCache.put('modalPDF.html', require('!!raw-loader!../snippets/modalPDF.html'));
            $templateCache.put('modalPPT.html', require('!!raw-loader!../snippets/modalPPT.html'));
            $templateCache.put('modalDOC.html', require('!!raw-loader!../snippets/modalDOC.html'));

            var vm = this;

            var chance = require('chance').Chance();

            vm.items = [{
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 4.ppt',
                'extension': '.ppt',
                'storage': '95.25',
                'active': false,
                'panel': {
                    'scope': $scope.$new(),
                    'title': 'Site Detail - UX Aspects (PPT)',
                    'main': 'modalPPT.html',
                    'footer': 'item-display-panel-ng1/modalFooter.html',
                    'modalColumns': 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
                    'reference': 'uxd-navigation-bar',
                    'top': 53
                }
            }, {
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 9.pdf',
                'extension': '.pdf',
                'storage': '15.25',
                'active': true,
                'panel': {
                    'scope': $scope.$new(),
                    'title': 'Site Detail - UX Aspects (PDF)',
                    'main': 'modalPDF.html',
                    'footer': 'item-display-panel-ng1/modalFooter.html',
                    'modalColumns': 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
                    'reference': 'uxd-navigation-bar',
                    'top': 53
                }
            }, {
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 14.doc',
                'extension': '.doc',
                'storage': '25.25',
                'active': false,
                'panel': {
                    'scope': $scope.$new(),
                    'title': 'Site Detail - UX Aspects (DOC)',
                    'main': 'modalDOC.html',
                    'footer': 'item-display-panel-ng1/modalFooter.html',
                    'modalColumns': 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
                    'reference': 'uxd-navigation-bar',
                    'top': 53
                }
            }, {
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 29.pdf',
                'extension': '.pdf',
                'storage': '15.25',
                'active': true,
                'panel': {
                    'scope': $scope.$new(),
                    'title': 'Site Detail - UX Aspects (PDF)',
                    'main': 'modalPDF.html',
                    'footer': 'item-display-panel-ng1/modalFooter.html',
                    'modalColumns': 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
                    'reference': 'uxd-navigation-bar',
                    'top': 53
                }
            }, {
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 34.pdf',
                'extension': '.pdf',
                'storage': '15.25',
                'active': false,
                'panel': {
                    'scope': $scope.$new(),
                    'title': 'Site Detail - UX Aspects (PDF)',
                    'main': 'modalPDF.html',
                    'footer': 'item-display-panel-ng1/modalFooter.html',
                    'modalColumns': 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
                    'reference': 'uxd-navigation-bar',
                    'top': 53
                }
            }];

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});
