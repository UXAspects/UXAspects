angular.module('app').controller('SearchHistoryDemoCtrl', SearchHistoryDemoCtrl);

SearchHistoryDemoCtrl.$inject = ['$scope', '$modal', '$persistentDataService'];

function SearchHistoryDemoCtrl($scope, $modal, $persistentDataService) {
    var vm = this;

    vm.scrollConfig = {
        autoReinitialise: true,
        showOnlyOnHover: false,
        enableKeyboardNavigation: true,
        isScrollableH: false,
        scrollMargin: 5
    };

    vm.searches = [
        {
            icon: 'hpe-search',
            text: '"periwinkle documents" AND ("Emma Hart" OR "ehart")',
            any: 'PDF, DOC, DOCX, XLS, PPT',
            all: '16/03/2016 - 18/11/2016',
            exclude: '"Recycle Bin", "Trash"'
        }, {
            icon: 'hpe-search',
            text: '"attendance record" AND "Tim Walsh"',
            any: 'XLS, XLSX',
            all: 'File Archives, Time Off Docs',
            exclude: '"Recycle Bin", "Trash"'
        }, {
            icon: 'hpe-folder',
            text: 'Helena\'s Workbook'
        }, {
            icon: 'hpe-user',
            text: 'Lauren Scott'
        }, {
            icon: 'hpe-search',
            text: '"meeting notes"',
            exclude: '"Recycle Bin", "Trash"'
        }, {
            icon: 'hpe-search',
            text: '"time off allowance"',
            exclude: '"Recycle Bin", "Trash"'
        }, {
            icon: 'hpe-folder',
            text: 'Gabriel\'s Workbook'
        }, {
            icon: 'hpe-search',
            text: '"hr links" AND ("hr connect" OR "hr@company.com")',
            any: "HR, Human Resources, HR Connect",
            all: "12/09/2016 - 22/10/2016",
            exclude: '"Mail"'
        }, {
            icon: 'hpe-user-manager',
            text: 'Joshua Smith'
        }, {
            icon: 'hpe-mail',
            text: '"weekly rota"',
            any: "Joshua Smith, Michael Tucker",
            all: "10/11/2016",
            exclude: "Donny Piper"
        }
    ];

    storeSearches();

    vm.getHistory = function () {
        vm.searches = JSON.parse($persistentDataService.getData('mySearches'));
    };

    vm.openModal = function () {
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'search-history-ng1/modalLayout.html',
            controller: 'SearchHistoryModalDemoCtrl',
            controllerAs: 'vm',
            keyboard: 'true',
            size: 'md',
            windowClass: 'square-modal-window'
        });

        modalInstance.result.then(function (result) {
            if (result === "cancel") return;

            vm.searches = JSON.parse($persistentDataService.getData('mySearches'));
            vm.searches.unshift(result);
            vm.searches.pop();

            storeSearches();
        });
    };

    vm.search = function (search) {
        vm.searches.unshift(search);
        vm.searches.pop();
        storeSearches();
    };

    function storeSearches() {
        $persistentDataService.setData('mySearches', JSON.stringify(vm.searches));
    }
}