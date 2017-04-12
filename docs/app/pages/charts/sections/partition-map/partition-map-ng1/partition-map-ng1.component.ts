import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

const chance = require('chance').Chance();

import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-charts-partition-map-ng1',
    templateUrl: './partition-map-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsPartitionMapNg1Component')
export class ChartsPartitionMapNg1Component implements ICodePenProvider {


    private data: any;
    private options: any;
    private isLoading: boolean;

    private htmlCode = require('./snippets/chart.html');
    private jsCode = require('./snippets/chart.js');
    private cssCode = require('./snippets/chart.css');

    private popoverHtml = require('./snippets/popover.html');
    private popoverJs = require('./snippets/popover.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'PartitionMapCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'templateId.html',
                content: this.popoverHtml
            }
        ],
        js: [this.jsCode, this.popoverJs],
        css: [this.cssCode]
    };


    constructor() {
        this.options = {
            edit: {
                text: 'Edit',
                image: require('../../../../../assets/img/pencil.png'),
                click: function () {
                    // perform action when the edit option is clicked
                },
                editor: {
                    enabled: true,
                    finishText: 'Done',
                    noGroupsText: 'No groups available',
                    availableGroups: ['Custodian', 'Language', 'Data Source'],
                    maxRows: 3,
                    minRows: 1,
                    onFinish: function () {

                    }
                }
            },
            select: function () {
                // perform action when a segment has been clicked
            },
            maximize: {
                disableScrolling: false,
                buttonVisible: true,
                isMaximized: false,
                fillScreen: true,
                sidePanelWidth: 235,
                shouldResize: true,
                onToggle: function () { }
            },
            popoverTemplate: require('!file-loader?name=[path][name].[ext]!./snippets/popover.html'),
            popoverEnabled: true,
            valueFormatter: function (value: string) {
                return value.toLocaleString();
            },
            noDataLabel: 'No data to display',
            loadingLabel: 'Loading...',
            popoverDelay: 650
        };

        this.isLoading = false;

        this.data = [{
            label: 'Home',
            image: require('../../../../../assets/img/home.png'),
            groupName: 'Hard Drives',
            children: [{
                label: chance.name(),
                groupName: 'Custodian',
                children: [{
                    label: 'English',
                    groupName: 'Language',
                    children: [{
                        label: 'Email',
                        groupName: 'Data Source',
                        value: 40
                    }, {
                        label: 'Microsoft Word',
                        groupName: 'Data Source',
                        value: 10
                    }]
                }, {
                    label: 'German',
                    groupName: 'Language',
                    children: [{
                        label: 'Email',
                        groupName: 'Data Source',
                        value: 10
                    }, {
                        label: 'Microsoft Word',
                        groupName: 'Data Source',
                        value: 5
                    }]
                }]
            }, {
                label: chance.name(),
                groupName: 'Custodian',
                children: [{
                    label: 'English',
                    groupName: 'Language',
                    children: [
                        {
                            label: 'Email',
                            groupName: 'Data Source',
                            value: 15
                        }, {
                            label: 'Microsoft Word',
                            groupName: 'Data Source',
                            value: 5
                        }],
                },
                {
                    label: 'German',
                    groupName: 'Language',
                    children: [{
                        label: 'Email',
                        groupName: 'Data Source',
                        value: 10
                    }, {
                        label: 'Microsoft Word',
                        groupName: 'Data Source',
                        value: 5
                    }]
                }]
            }]
        }];
    }

}