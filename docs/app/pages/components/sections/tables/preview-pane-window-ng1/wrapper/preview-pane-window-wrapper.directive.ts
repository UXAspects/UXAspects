angular.module('app').directive('uxdPreviewPaneWindowWrapper', () => {
    return {
        restrict: 'E',
        template: require('./preview-pane-window-wrapper.directive.html'),
        controller: PreviewPaneWindowController,
        controllerAs: 'vm'
    };
});


class PreviewPaneWindowController {

    private sparklabel: any;
    private previewFile: string;
    private previewTitle: string;
    private previewSubtitle: string;
    private previewEmptyText = 'No document selected';
    private previewName = 'preview-pane-example';
    private selectedIndex = 0;
    private reviewed = false;
    private signed = '';
    private items: any[];
    private childScope: angular.IScope;
    private bottomLeftLabel = "<span class='spark-bottom-label'>completed</span>";

    private scrollBarConfig = {
        enableKeyboardNavigation: true,
        verticalGutter: -10,
        resizeSensor: true,
        isScrollableH: false
    };

    private tooltip = {
        content: 'Opens another window for a larger or full-screen preview',
        dismiss: 'HIDE TIP',
        direction: 'right',
        position: 'start'
    };

    static $inject = ['$scope', 'previewPaneProvider', '$templateCache'];

    constructor(private $scope: angular.IScope,
        private previewPaneProvider: any,
        private $templateCache: angular.ITemplateCacheService) {

        this.childScope = $scope;

        let chance = require('chance').Chance();

        // load the preview templates
        $templateCache.put('Preview.html', require('./previews/Preview.html'));
        $templateCache.put('PreviewDOC.html', require('./previews/PreviewDOC.html'));
        $templateCache.put('PreviewPDF.html', require('./previews/PreviewPDF.html'));
        $templateCache.put('PreviewPPT.html', require('./previews/PreviewPPT.html'));
        $templateCache.put('PreviewXLS.html', require('./previews/PreviewXLS.html'));

        this.items = [{
            name: 'Document 1.html',
            author: chance.name(),
            date: '14 Jun 2016',
            extension: '.html',
            storage: 75,
            active: true
        }, {
            name: 'Document 2.doc',
            author: chance.name(),
            date: '22 Mar 2016',
            extension: '.doc',
            storage: 13,
            active: true
        }, {
            name: 'Document 3.ppt',
            author: chance.name(),
            date: '19 May 2016',
            extension: '.ppt',
            storage: 66
        }, {
            name: 'Document 4.pdf',
            author: chance.name(),
            date: '20 Jun 2016',
            extension: '.pdf'
        }, {
            name: 'Document 5.xls',
            author: chance.name(),
            date: '10 Jan 2016',
            extension: '.xls'
        }, {
            name: 'Document 6.html',
            author: chance.name(),
            date: '13 Feb 2016',
            extension: '.html',
            storage: 55
        }, {
            name: 'Document 7.doc',
            author: chance.name(),
            date: '19 May 2016',
            extension: '.doc',
            storage: 25
        }, {
            name: 'Document 8.html',
            author: chance.name(),
            date: '22 Mar 2016',
            extension: '.html',
            storage: 90
        }, {
            name: 'Document 9.doc',
            author: chance.name(),
            date: '29 May 2016',
            extension: '.doc',
            storage: 33,
            active: true
        }, {
            name: 'Document 10.xls',
            author: chance.name(),
            date: '3 Jun 2016',
            extension: '.xls'
        }, {
            name: 'Document 11.ppt',
            author: chance.name(),
            date: '14 Apr 2016',
            extension: '.ppt',
            storage: 25
        }, {
            name: 'Document 12.html',
            author: chance.name(),
            date: '9 Feb 2016',
            extension: '.html',
            storage: 25
        }, {
            name: 'Document 13.xls',
            author: chance.name(),
            date: '22 Jun 2016',
            extension: '.xls'
        }, {
            name: 'Document 14.html',
            author: chance.name(),
            date: '30 Apr 2016',
            extension: '.html',
            storage: 93
        }, {
            name: 'Document 15.doc',
            author: chance.name(),
            date: '18 May 2016',
            extension: '.doc',
            storage: 5
        }, {
            name: 'Document 16.ppt',
            author: chance.name(),
            date: '2 Jan 2016',
            extension: '.ppt',
            storage: 66
        }];

        // ensure the preview pane is visible
        previewPaneProvider.preview.previewOn = true;
    }

    goToDetails(itemIndex: number) {
        this.selectedIndex = itemIndex;
        this.$scope.author = this.items[itemIndex].author;
        this.$scope.documentName = this.items[itemIndex].name;

        this.sparklabel = this.updateSparkline(this.items[itemIndex]);

        this.previewTitle = this.items[itemIndex].name;
        this.previewSubtitle = this.items[itemIndex].date;

        if (this.items[itemIndex].extension === '.html') {
            this.previewFile = 'Preview.html';
        } else if (this.items[itemIndex].extension === '.pdf') {
            this.previewFile = 'PreviewPDF.html';
        } else if (this.items[itemIndex].extension === '.doc') {
            this.previewFile = 'PreviewDOC.html';
        } else if (this.items[itemIndex].extension === '.xls') {
            this.previewFile = 'PreviewXLS.html';
        } else if (this.items[itemIndex].extension === '.ppt') {
            this.previewFile = 'PreviewPPT.html';
        }

        // ensure the corresponding item is selected
        this.$scope.$broadcast('$previewPaneItemSelect', itemIndex);
    };

    goToPrevious() {
        this.goToDetails(this.selectedIndex - 1);
    };

    goToNext() {
        this.goToDetails(this.selectedIndex + 1);
    };

    canGoBack() {
        return this.selectedIndex <= 0;
    };

    canGoForward() {
        return this.selectedIndex >= (this.items.length - 1);
    };

    updateSparkline(item: any) {

        let value = (item.storage / 100) * 8.2;

        this.sparklabel = {
            percentComplete: item.storage,
            inlineLabel: "<span class='spark-label'><span class='x-large'>" + Math.round(item.storage) + '%</span></span>',
            topLeftLabel: "<span class='spark-label-1'>Work completed (%)</span>",
            tooltip: 'Spark Line Indicator - ' + value.toFixed(2) + 'GB of 8.2GB occupied (' + item.storage + '%)',
            type: 'spark-secondary3'
        };

        return this.sparklabel;
    }
}
