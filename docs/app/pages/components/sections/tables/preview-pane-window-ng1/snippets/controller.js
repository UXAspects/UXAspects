angular.module("app").controller("PreviewPaneWindowCtrl", ["$scope", "windowCommunicationService", "$timeout", "previewPaneProvider", PreviewPaneWindowCtrl]);

function PreviewPaneWindowCtrl($scope, windowCommunicationService, $timeout, previewPaneProvider) {
    var vm = this;
    vm.childScope = $scope;

    vm.previewFile = "";
    vm.previewTitle = "";
    vm.previewSubtitle = "";
    vm.previewEmptyText = "No document selected";
    vm.previewName = "preview-pane-example";
    vm.selectedIndex = 0;

    vm.signed = "";

    vm.scrollBarConfig = {
        enableKeyboardNavigation: true,
        verticalGutter: -10,
        resizeSensor: true,
        isScrollableH: false
    };

    vm.tooltip = {
        content: 'Opens another window for a larger or full-screen preview',
        dismiss: 'HIDE TIP',
        direction: 'right',
        position: 'start'
    };

    // ensure the preview pane is visible
    previewPaneProvider.preview.previewOn = true;

    vm.items = [{
        name: "Document 1.html",
        author: chance.name(),
        date: "14 Jun 2016",
        extension: ".html",
        storage: 75,
        active: true
    }, {
        name: "Document 2.doc",
        author: chance.name(),
        date: "22 Mar 2016",
        extension: ".doc",
        storage: 13,
        active: true
    }, {
        name: "Document 3.ppt",
        author: chance.name(),
        date: "19 May 2016",
        extension: ".ppt",
        storage: 66
    }, {
        name: "Document 4.pdf",
        author: chance.name(),
        date: "20 Jun 2016",
        extension: ".pdf"
    }, {
        name: "Document 5.xls",
        author: chance.name(),
        date: "10 Jan 2016",
        extension: ".xls"
    }, {
        name: "Document 6.html",
        author: chance.name(),
        date: "13 Feb 2016",
        extension: ".html",
        storage: 55
    }, {
        name: "Document 7.doc",
        author: chance.name(),
        date: "19 May 2016",
        extension: ".doc",
        storage: 25
    }, {
        name: "Document 8.html",
        author: chance.name(),
        date: "22 Mar 2016",
        extension: ".html",
        storage: 90
    }, {
        name: "Document 9.doc",
        author: chance.name(),
        date: "29 May 2016",
        extension: ".doc",
        storage: 33,
        active: true
    }, {
        name: "Document 10.xls",
        author: chance.name(),
        date: "3 Jun 2016",
        extension: ".xls"
    }, {
        name: "Document 11.ppt",
        author: chance.name(),
        date: "14 Apr 2016",
        extension: ".ppt",
        storage: 25
    }, {
        name: "Document 12.html",
        author: chance.name(),
        date: "9 Feb 2016",
        extension: ".html",
        storage: 25
    }, {
        name: "Document 13.xls",
        author: chance.name(),
        date: "22 Jun 2016",
        extension: ".xls"
    }, {
        name: "Document 14.html",
        author: chance.name(),
        date: "30 Apr 2016",
        extension: ".html",
        storage: 93
    }, {
        name: "Document 15.doc",
        author: chance.name(),
        date: "18 May 2016",
        extension: ".doc",
        storage: 5
    }, {
        name: "Document 16.ppt",
        author: chance.name(),
        date: "2 Jan 2016",
        extension: ".ppt",
        storage: 66
    }];

    vm.bottomLeftLabel = "<span class='spark-bottom-label'>completed</span>";

    vm.goToDetails = function (itemIndex) {
        vm.selectedIndex = itemIndex;
        vm.childScope.author = vm.items[itemIndex].author;
        vm.childScope.documentName = vm.items[itemIndex].name;

        vm.sparklabel = updateSparkline(vm.items[itemIndex]);

        vm.previewTitle = vm.items[itemIndex].name;
        vm.previewSubtitle = vm.items[itemIndex].date;

        if (vm.items[itemIndex].extension === ".html") {
            vm.previewFile = 'Preview.html';
        } else if (vm.items[itemIndex].extension === ".pdf") {
            vm.previewFile = 'PreviewPDF.html';
        } else if (vm.items[itemIndex].extension === ".doc") {
            vm.previewFile = 'PreviewDOC.html';
        } else if (vm.items[itemIndex].extension === ".xls") {
            vm.previewFile = 'PreviewXLS.html';
        } else if (vm.items[itemIndex].extension === ".ppt") {
            vm.previewFile = 'PreviewPPT.html';
        }

        // ensure the corresponding item is selected
        $scope.$broadcast('$previewPaneItemSelect', itemIndex);
    };

    vm.goToPrevious = function () {
        vm.goToDetails(vm.selectedIndex - 1);
    };

    vm.goToNext = function () {
        vm.goToDetails(vm.selectedIndex + 1);
    };

    vm.canGoBack = function () {
        return vm.selectedIndex <= 0;
    };

    vm.canGoForward = function () {
        return vm.selectedIndex >= (vm.items.length - 1);
    };

    function updateSparkline(item) {
        var vm = this;

        vm.sparklabel = {
            percentComplete: item.storage,
            inlineLabel: "<span class='spark-label'><span class='x-large'>" + Math.round(item.storage) + "%</span></span>",
            topLeftLabel: "<span class='spark-label-1'>Work completed (%)</span>",
            tooltip: "Spark Line Indicator - " + parseFloat((item.storage / 100) * 8.2).toFixed(2) + "GB of 8.2GB occupied (" + item.storage + "%)",
            type: "spark-secondary3"
        };

        return vm.sparklabel;
    }
}