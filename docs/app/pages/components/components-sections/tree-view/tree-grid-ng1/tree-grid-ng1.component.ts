import { Component, Inject } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
    selector: 'uxd-components-tree-grid-ng1',
    templateUrl: './tree-grid-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsTreeGridNg1Component')
export class ComponentsTreeGridNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    actionsHtml = require('./wrapper/actions.html');
    displayPanel = require('./wrapper/displayPanel.html');
    displayPanelFooter = require('./wrapper/displayPanelFooter.html');

    data: any[] = [{
        id: 1,
        title: 'Documents',
        date: new Date('2013-02-16'),
        type: 'folder',
        nodes: [{
            id: 12,
            title: 'Pictures',
            date: new Date('2013-05-28'),
            type: 'folder',
            nodes: [{
                title: 'Alcazar',
                date: new Date('2014-05-15'),
                type: 'item'
            }, {
                title: 'Citadel',
                date: new Date('2015-09-02'),
                type: 'item'
            }, {
                title: 'Donjon',
                date: new Date('2014-04-10'),
                type: 'item'
            }]
        }, {
            id: 11,
            title: 'Word files',
            date: new Date('2013-09-25'),
            type: 'folder',
            nodes: [{
                id: 111,
                title: 'Accounts',
                date: new Date('2013-10-04'),
                type: 'folder',
                nodes: [{
                    title: 'Castle',
                    date: new Date('2014-05-15'),
                    type: 'item'
                }, {
                    title: 'Estate',
                    date: new Date('2015-08-03'),
                    type: 'item'
                }, {
                    title: 'Manor',
                    date: new Date('2014-05-30'),
                    type: 'item'
                }, {
                    title: 'Mansion',
                    date: new Date('2014-04-23'),
                    type: 'item'
                }, {
                    title: 'Villa',
                    date: new Date('2015-09-21'),
                    type: 'item'
                }]
            }]
        }]
    }, {
        id: 2,
        title: 'Emails',
        date: new Date('2013-03-17'),
        type: 'folder',
        nodes: [{
            id: 21,
            title: 'Inbox',
            date: new Date('2013-03-17'),
            type: 'folder',
            nodes: []
        }, {
            id: 22,
            title: 'Outbox',
            date: new Date('2013-03-17'),
            type: 'folder',
            nodes: []
        }]
    }, {
        id: 3,
        title: 'Empty',
        date: new Date('2016-06-02'),
        type: 'folder',
        nodes: []
    }];

    columns: any[] = [{
        name: 'TITLE',
        value: 'title',
        width: '50%'
    }, {
        name: 'DATE',
        value: function (dataItem: any) {
            return dataItem.date ? dataItem.date.toLocaleDateString() : '';
        },
        width: '25%',
        tooltip: '{{item.date | date : \'fullDate\'}}'
    }, {
        name: 'ACTIONS',
        template: 'tree-grid-wrapper/actions.html',
        width: '25%',
        headerClass: 'text-center',
        cellClass: 'item-actions text-center'
    }];

    selected: any = [];

    set currentRow(row: any) {
        this._currentRow = row;

        if (this.enableDisplayPanel && row) {
            this.showDisplayPanel(row);
        }
    }

    get currentRow(): any {
        return this._currentRow;
    }

    set enableDisplayPanel(value: boolean) {
        this._displayPanel = value;

        if (value && this.currentRow) {
            this.showDisplayPanel(this.currentRow);
        } else {
            this.hideDisplayPanel();
        }
    }

    get enableDisplayPanel(): boolean {
        return this._displayPanel;
    }

    private _currentRow: any;
    private _displayPanel: boolean = false;

    options = {
        childrenProperty: 'nodes',
        select: {
            row: true,
            check: false,
            selectChildren: false,
            rowClass: 'shift-select-selected-bg'
        }
    };

    displayPanelScope = this.$scope.$new(true);

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'TreeGridCtrl as vm'
        },
        htmlTemplates: [{
            id: 'actions.html',
            content: this.actionsHtml
        }, {
            id: 'displayPanel.html',
            content: this.displayPanel
        }, {
            id: 'displayPanelFooter.html',
            content: this.displayPanelFooter
        }],
        js: [this.snippets.raw.sampleJs, this.snippets.raw.actionsJs]
    };

    constructor(@Inject('$scope') private $scope: ng.IScope, @Inject('$displayPanel') private $displayPanel: any, @Inject('$templateCache') $templateCache: ng.ITemplateCacheService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // Events triggered by 'Previous' and 'Next' buttons
        $scope.$on('$displayPanelPrevious', () => $displayPanel.movePrev());
        $scope.$on('$displayPanelNext', () => $displayPanel.moveNext());

        $templateCache.put('tree-grid-wrapper/actions.html', require('!!raw-loader!./wrapper/actions.html'));
        $templateCache.put('tree-grid-wrapper/displayPanel.html', require('!!raw-loader!./wrapper/displayPanel.html'));
        $templateCache.put('tree-grid-wrapper/displayPanelFooter.html', require('!!raw-loader!./wrapper/displayPanelFooter.html'));
    }

    showDisplayPanel(row: any) {
        this.displayPanelScope.item = row.item;

        const modalOptions = {
            title: row.item.title,
            main: 'tree-grid-wrapper/displayPanel.html',
            footer: 'tree-grid-wrapper/displayPanelFooter.html',
            modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
            top: 50,
            scope: this.displayPanelScope
        };
        const enablePrev = (row.element.prevAll('tr').length > 0);
        const enableNext = (row.element.nextAll('tr').length > 0);
        this.$displayPanel.open(row.element, modalOptions, false, enablePrev, enableNext);
    }

    hideDisplayPanel() {
        if (this.$displayPanel.panelOpen()) {
            this.$displayPanel.close({ animate: false });
        }
    }

}