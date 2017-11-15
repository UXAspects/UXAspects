import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

const chance = require('chance').Chance();

@Component({
    selector: 'uxd-charts-social-chart-ng1',
    templateUrl: './social-chart-ng1.component.html'
})
@DocumentationSectionComponent('ChartsSocialChartNg1Component')
export class ChartsSocialChartNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    minLabels: number;
    forceAtlasDuration: number;
    edgeWeightInfluence: boolean;
    options: any;
    detailStyle: any;
    communities: any;
    api: any;
    chartTitle: any;
    data: any;
    showMaximizeControl: boolean = false;
    startMaximized: boolean = false;
    templates: any;
    nodeIdInput: string;
    edgeIdInput: string;

    codepen: ICodePen = {
        html: this.snippets.raw.chartExampleHtml,
        htmlAttributes: {
            'ng-controller': 'SocialCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'nodeDetails.html',
                content: this.snippets.raw.nodeDetailHtml
            },
            {
                id: 'nodePopover.html',
                content: this.snippets.raw.nodePopoverHtml
            },
            {
                id: 'edgeDetails.html',
                content: this.snippets.raw.edgeDetailHtml
            },
            {
                id: 'edgePopover.html',
                content: this.snippets.raw.edgePopoverHtml
            }
        ],
        js: [ this.snippets.raw.chartExampleJs ],
        css: [ this.snippets.raw.chartExampleCss ]
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        this.chartTitle = {
            title: 'Entire network',
            timeout: 3000,
            nodeSelectedTitle: 'Social interactions with {{node}}',
            edgeSelectedTitle: 'Social interactions between {{source}} and {{target}}',
            stageSelectedTitle: 'Entire network'
        };

        this.templates = {
            edgeDetail: require('!!file-loader?name=[path][name].[ext]!./snippets/edge-detail.html'),
            edgePopover: require('!!file-loader?name=[path][name].[ext]!./snippets/edge-popover.html'),
            nodeDetail: require('!!file-loader?name=[path][name].[ext]!./snippets/node-detail.html'),
            nodePopover: require('!!file-loader?name=[path][name].[ext]!./snippets/node-popover.html')
        };

        this.api = {
            selectedNode: null,
            selectedEdge: null,
            onNodeClick: this.onNodeClick(),
            onEdgeClick: this.onEdgeClick(),
            onStageClick: this.onStageClick(),
            onNodeHover: this.onNodeClick(),
            onEdgeHover: this.onEdgeClick()
        };

        this.communities = {
            example_group_1: {
                color: '#00cceb',
                style: 'stroke'
            }
        };
        this.detailStyle = {
            node: {
                'width': '235px',
                'height': '99%'
            },
            edge: {
                'width': '40vw',
                'height': '150px',
                'min-width': '524px',
                'max-height': '176px'
            }
        };

        this.options = {
            neighborViewOnSelect: true,
            minNodeSize: 5,
            maxNodeSize: 12
        };

        this.edgeWeightInfluence = false;
        this.forceAtlasDuration = 1700;
        this.minLabels = 5;

        var nodes: any[] = [{
            id: 0,
            label: chance.name()
        }, {
            id: 1,
            label: chance.name()
        }, {
            id: 2,
            label: chance.name()
        }, {
            id: 3,
            label: chance.name()
        }, {
            id: 4,
            label: chance.name()
        }, {
            id: 5,
            label: chance.name()
        }, {
            id: 6,
            label: chance.name()
        }, {
            id: 7,
            label: chance.name()
        }, {
            id: 8,
            label: chance.name()
        }, {
            id: 9,
            label: chance.name()
        }, {
            id: 10,
            label: chance.name()
        }, {
            id: 11,
            label: chance.name()
        }, {
            id: 12,
            label: chance.name()
        }, {
            id: 13,
            label: chance.name()
        }, {
            id: 14,
            label: chance.name()
        }, {
            id: 15,
            label: chance.name()
        }, {
            id: 16,
            label: chance.name()
        }, {
            id: 17,
            label: chance.name()
        }, {
            id: 18,
            label: chance.name()
        }, {
            id: 19,
            label: chance.name()
        }, {
            id: 20,
            label: chance.name()
        }, {
            id: 21,
            label: chance.name()
        }, {
            id: 22,
            label: chance.name()
        }, {
            id: 23,
            label: chance.name()
        }, {
            id: 24,
            label: chance.name()
        }, {
            id: 25,
            label: chance.name()
        }, {
            id: 26,
            label: chance.name()
        }, {
            id: 27,
            label: chance.name()
        }, {
            id: 28,
            label: chance.name()
        }, {
            id: 29,
            label: chance.name()
        }, {
            id: 30,
            label: chance.name()
        }, {
            id: 31,
            label: chance.name(),
            community: 'example_group_1'
        }, {
            id: 32,
            label: chance.name()
        }, {
            id: 33,
            label: chance.name()
        }, {
            id: 34,
            label: chance.name()
        }, {
            id: 35,
            label: chance.name()
        }, {
            id: 36,
            label: chance.name()
        }, {
            id: 37,
            label: chance.name()
        }, {
            id: 38,
            label: chance.name(),
            community: 'example_group_1'
        }, {
            id: 39,
            label: chance.name()
        }, {
            id: 40,
            label: chance.name()
        }, {
            id: 41,
            label: chance.name()
        }, {
            id: 42,
            label: chance.name()
        }, {
            id: 43,
            label: chance.name()
        }, {
            id: 44,
            label: chance.name()
        }, {
            id: 45,
            label: chance.name()
        }, {
            id: 46,
            label: chance.name()
        }, {
            id: 47,
            label: chance.name()
        }, {
            id: 48,
            label: chance.name()
        }, {
            id: 49,
            label: chance.name()
        }, {
            id: 50,
            label: chance.name()
        }, {
            id: 51,
            label: chance.name()
        }, {
            id: 52,
            label: chance.name()
        }, {
            id: 53,
            label: chance.name()
        }, {
            id: 54,
            label: chance.name()
        }, {
            id: 55,
            label: chance.name()
        }, {
            id: 56,
            label: chance.name()
        }, {
            id: 57,
            label: chance.name()
        }, {
            id: 58,
            label: chance.name()
        }, {
            id: 59,
            label: chance.name()
        }, {
            id: 60,
            label: chance.name()
        }, {
            id: 61,
            label: chance.name()
        }, {
            id: 62,
            label: chance.name()
        }, {
            id: 63,
            label: chance.name()
        }, {
            id: 64,
            label: chance.name()
        }, {
            id: 65,
            label: chance.name(),
            community: 'example_group_1'
        }, {
            id: 66,
            label: chance.name()
        }, {
            id: 67,
            label: chance.name()
        }, {
            id: 68,
            label: chance.name()
        }, {
            id: 69,
            label: chance.name()
        }, {
            id: 70,
            label: chance.name(),
            community: 'example_group_1'
        }, {
            id: 71,
            label: chance.name()
        }, {
            id: 72,
            label: chance.name()
        }, {
            id: 73,
            label: chance.name()
        }, {
            id: 74,
            label: chance.name()
        }, {
            id: 75,
            label: chance.name()
        }, {
            id: 76,
            label: chance.name()
        }];

        var nodeMap = {};

        for (var i = 0; i < nodes.length; i += 1) {
            var email = nodes[i].label.replace(' ', '').toLowerCase();
            nodes[i].additional = {
                fullName: email + '@business.com'
            };
            nodeMap[nodes[i].id] = nodes[i];
        }

        var edges = [{
            source: 1,
            target: 0,
            value: 1
        }, {
            source: 2,
            target: 0,
            value: 8
        }, {
            source: 3,
            target: 0,
            value: 10
        }, {
            source: 3,
            target: 2,
            value: 6
        }, {
            source: 4,
            target: 0,
            value: 1
        }, {
            source: 5,
            target: 0,
            value: 1
        }, {
            source: 6,
            target: 0,
            value: 1
        }, {
            source: 7,
            target: 0,
            value: 1
        }, {
            source: 8,
            target: 0,
            value: 2
        }, {
            source: 9,
            target: 0,
            value: 1
        }, {
            source: 11,
            target: 10,
            value: 1
        }, {
            source: 11,
            target: 3,
            value: 3
        }, {
            source: 11,
            target: 2,
            value: 3
        }, {
            source: 11,
            target: 0,
            value: 5
        }, {
            source: 12,
            target: 11,
            value: 1
        }, {
            source: 13,
            target: 11,
            value: 1
        }, {
            source: 14,
            target: 11,
            value: 1
        }, {
            source: 15,
            target: 11,
            value: 1
        }, {
            source: 17,
            target: 16,
            value: 4
        }, {
            source: 18,
            target: 16,
            value: 4
        }, {
            source: 18,
            target: 17,
            value: 4
        }, {
            source: 19,
            target: 16,
            value: 4
        }, {
            source: 19,
            target: 17,
            value: 4
        }, {
            source: 19,
            target: 18,
            value: 4
        }, {
            source: 20,
            target: 16,
            value: 3
        }, {
            source: 20,
            target: 17,
            value: 3
        }, {
            source: 20,
            target: 18,
            value: 3
        }, {
            source: 20,
            target: 19,
            value: 4
        }, {
            source: 21,
            target: 16,
            value: 3
        }, {
            source: 21,
            target: 17,
            value: 3
        }, {
            source: 21,
            target: 18,
            value: 3
        }, {
            source: 21,
            target: 19,
            value: 3
        }, {
            source: 21,
            target: 20,
            value: 5
        }, {
            source: 22,
            target: 16,
            value: 3
        }, {
            source: 22,
            target: 17,
            value: 3
        }, {
            source: 22,
            target: 18,
            value: 3
        }, {
            source: 22,
            target: 19,
            value: 3
        }, {
            source: 22,
            target: 20,
            value: 4
        }, {
            source: 22,
            target: 21,
            value: 4
        }, {
            source: 23,
            target: 16,
            value: 3
        }, {
            source: 23,
            target: 17,
            value: 3
        }, {
            source: 23,
            target: 18,
            value: 3
        }, {
            source: 23,
            target: 19,
            value: 3
        }, {
            source: 23,
            target: 20,
            value: 4
        }, {
            source: 23,
            target: 21,
            value: 4
        }, {
            source: 23,
            target: 22,
            value: 4
        }, {
            source: 23,
            target: 12,
            value: 2
        }, {
            source: 23,
            target: 11,
            value: 9
        }, {
            source: 24,
            target: 23,
            value: 2
        }, {
            source: 24,
            target: 11,
            value: 7
        }, {
            source: 25,
            target: 24,
            value: 13
        }, {
            source: 25,
            target: 23,
            value: 1
        }, {
            source: 25,
            target: 11,
            value: 12
        }, {
            source: 26,
            target: 24,
            value: 4
        }, {
            source: 26,
            target: 11,
            value: 31
        }, {
            source: 26,
            target: 16,
            value: 1
        }, {
            source: 26,
            target: 25,
            value: 1
        }, {
            source: 27,
            target: 11,
            value: 17
        }, {
            source: 27,
            target: 23,
            value: 5
        }, {
            source: 27,
            target: 25,
            value: 5
        }, {
            source: 27,
            target: 24,
            value: 1
        }, {
            source: 27,
            target: 26,
            value: 1
        }, {
            source: 28,
            target: 11,
            value: 8
        }, {
            source: 28,
            target: 27,
            value: 1
        }, {
            source: 29,
            target: 23,
            value: 1
        }, {
            source: 29,
            target: 27,
            value: 1
        }, {
            source: 29,
            target: 11,
            value: 2
        }, {
            source: 30,
            target: 23,
            value: 1
        }, {
            source: 31,
            target: 30,
            value: 2
        }, {
            source: 31,
            target: 11,
            value: 3
        }, {
            source: 31,
            target: 23,
            value: 2
        }, {
            source: 31,
            target: 27,
            value: 1
        }, {
            source: 32,
            target: 11,
            value: 1
        }, {
            source: 33,
            target: 11,
            value: 2
        }, {
            source: 33,
            target: 27,
            value: 1
        }, {
            source: 34,
            target: 11,
            value: 3
        }, {
            source: 34,
            target: 29,
            value: 2
        }, {
            source: 35,
            target: 11,
            value: 3
        }, {
            source: 35,
            target: 34,
            value: 3
        }, {
            source: 35,
            target: 29,
            value: 2
        }, {
            source: 36,
            target: 34,
            value: 2
        }, {
            source: 36,
            target: 35,
            value: 2
        }, {
            source: 36,
            target: 11,
            value: 2
        }, {
            source: 36,
            target: 29,
            value: 1
        }, {
            source: 37,
            target: 34,
            value: 2
        }, {
            source: 37,
            target: 35,
            value: 2
        }, {
            source: 37,
            target: 36,
            value: 2
        }, {
            source: 37,
            target: 11,
            value: 2
        }, {
            source: 37,
            target: 29,
            value: 1
        }, {
            source: 38,
            target: 34,
            value: 2
        }, {
            source: 38,
            target: 35,
            value: 2
        }, {
            source: 38,
            target: 36,
            value: 2
        }, {
            source: 38,
            target: 37,
            value: 2
        }, {
            source: 38,
            target: 11,
            value: 2
        }, {
            source: 38,
            target: 29,
            value: 1
        }, {
            source: 39,
            target: 25,
            value: 1
        }, {
            source: 40,
            target: 25,
            value: 1
        }, {
            source: 41,
            target: 24,
            value: 2
        }, {
            source: 41,
            target: 25,
            value: 3
        }, {
            source: 42,
            target: 41,
            value: 2
        }, {
            source: 42,
            target: 25,
            value: 2
        }, {
            source: 42,
            target: 24,
            value: 1
        }, {
            source: 43,
            target: 11,
            value: 3
        }, {
            source: 43,
            target: 26,
            value: 1
        }, {
            source: 43,
            target: 27,
            value: 1
        }, {
            source: 44,
            target: 28,
            value: 3
        }, {
            source: 44,
            target: 11,
            value: 1
        }, {
            source: 45,
            target: 28,
            value: 2
        }, {
            source: 47,
            target: 46,
            value: 1
        }, {
            source: 48,
            target: 47,
            value: 2
        }, {
            source: 48,
            target: 25,
            value: 1
        }, {
            source: 48,
            target: 27,
            value: 1
        }, {
            source: 48,
            target: 11,
            value: 1
        }, {
            source: 49,
            target: 26,
            value: 3
        }, {
            source: 49,
            target: 11,
            value: 2
        }, {
            source: 50,
            target: 49,
            value: 1
        }, {
            source: 50,
            target: 24,
            value: 1
        }, {
            source: 51,
            target: 49,
            value: 9
        }, {
            source: 51,
            target: 26,
            value: 2
        }, {
            source: 51,
            target: 11,
            value: 2
        }, {
            source: 52,
            target: 51,
            value: 1
        }, {
            source: 52,
            target: 39,
            value: 1
        }, {
            source: 53,
            target: 51,
            value: 1
        }, {
            source: 54,
            target: 51,
            value: 2
        }, {
            source: 54,
            target: 49,
            value: 1
        }, {
            source: 54,
            target: 26,
            value: 1
        }, {
            source: 55,
            target: 51,
            value: 6
        }, {
            source: 55,
            target: 49,
            value: 12
        }, {
            source: 55,
            target: 39,
            value: 1
        }, {
            source: 55,
            target: 54,
            value: 1
        }, {
            source: 55,
            target: 26,
            value: 21
        }, {
            source: 55,
            target: 11,
            value: 19
        }, {
            source: 55,
            target: 16,
            value: 1
        }, {
            source: 55,
            target: 25,
            value: 2
        }, {
            source: 55,
            target: 41,
            value: 5
        }, {
            source: 55,
            target: 48,
            value: 4
        }, {
            source: 56,
            target: 49,
            value: 1
        }, {
            source: 56,
            target: 55,
            value: 1
        }, {
            source: 57,
            target: 55,
            value: 1
        }, {
            source: 57,
            target: 41,
            value: 1
        }, {
            source: 57,
            target: 48,
            value: 1
        }, {
            source: 58,
            target: 55,
            value: 7
        }, {
            source: 58,
            target: 48,
            value: 7
        }, {
            source: 58,
            target: 27,
            value: 6
        }, {
            source: 58,
            target: 57,
            value: 1
        }, {
            source: 58,
            target: 11,
            value: 4
        }, {
            source: 59,
            target: 58,
            value: 15
        }, {
            source: 59,
            target: 55,
            value: 5
        }, {
            source: 59,
            target: 48,
            value: 6
        }, {
            source: 59,
            target: 57,
            value: 2
        }, {
            source: 60,
            target: 48,
            value: 1
        }, {
            source: 60,
            target: 58,
            value: 4
        }, {
            source: 60,
            target: 59,
            value: 2
        }, {
            source: 61,
            target: 48,
            value: 2
        }, {
            source: 61,
            target: 58,
            value: 6
        }, {
            source: 61,
            target: 60,
            value: 2
        }, {
            source: 61,
            target: 59,
            value: 5
        }, {
            source: 61,
            target: 57,
            value: 1
        }, {
            source: 61,
            target: 55,
            value: 1
        }, {
            source: 62,
            target: 55,
            value: 9
        }, {
            source: 62,
            target: 58,
            value: 17
        }, {
            source: 62,
            target: 59,
            value: 13
        }, {
            source: 62,
            target: 48,
            value: 7
        }, {
            source: 62,
            target: 57,
            value: 2
        }, {
            source: 62,
            target: 41,
            value: 1
        }, {
            source: 62,
            target: 61,
            value: 6
        }, {
            source: 62,
            target: 60,
            value: 3
        }, {
            source: 63,
            target: 59,
            value: 5
        }, {
            source: 63,
            target: 48,
            value: 5
        }, {
            source: 63,
            target: 62,
            value: 6
        }, {
            source: 63,
            target: 57,
            value: 2
        }, {
            source: 63,
            target: 58,
            value: 4
        }, {
            source: 63,
            target: 61,
            value: 3
        }, {
            source: 63,
            target: 60,
            value: 2
        }, {
            source: 63,
            target: 55,
            value: 1
        }, {
            source: 64,
            target: 55,
            value: 5
        }, {
            source: 64,
            target: 62,
            value: 12
        }, {
            source: 64,
            target: 48,
            value: 5
        }, {
            source: 64,
            target: 63,
            value: 4
        }, {
            source: 64,
            target: 58,
            value: 10
        }, {
            source: 64,
            target: 61,
            value: 6
        }, {
            source: 64,
            target: 60,
            value: 2
        }, {
            source: 64,
            target: 59,
            value: 9
        }, {
            source: 64,
            target: 57,
            value: 1
        }, {
            source: 64,
            target: 11,
            value: 1
        }, {
            source: 65,
            target: 63,
            value: 5
        }, {
            source: 65,
            target: 64,
            value: 7
        }, {
            source: 65,
            target: 48,
            value: 3
        }, {
            source: 65,
            target: 62,
            value: 5
        }, {
            source: 65,
            target: 58,
            value: 5
        }, {
            source: 65,
            target: 61,
            value: 5
        }, {
            source: 65,
            target: 60,
            value: 2
        }, {
            source: 65,
            target: 59,
            value: 5
        }, {
            source: 65,
            target: 57,
            value: 1
        }, {
            source: 65,
            target: 55,
            value: 2
        }, {
            source: 66,
            target: 64,
            value: 3
        }, {
            source: 66,
            target: 58,
            value: 3
        }, {
            source: 66,
            target: 59,
            value: 1
        }, {
            source: 66,
            target: 62,
            value: 2
        }, {
            source: 66,
            target: 65,
            value: 2
        }, {
            source: 66,
            target: 48,
            value: 1
        }, {
            source: 66,
            target: 63,
            value: 1
        }, {
            source: 66,
            target: 61,
            value: 1
        }, {
            source: 66,
            target: 60,
            value: 1
        }, {
            source: 67,
            target: 57,
            value: 3
        }, {
            source: 68,
            target: 25,
            value: 5
        }, {
            source: 68,
            target: 11,
            value: 1
        }, {
            source: 68,
            target: 24,
            value: 1
        }, {
            source: 68,
            target: 27,
            value: 1
        }, {
            source: 68,
            target: 48,
            value: 1
        }, {
            source: 68,
            target: 41,
            value: 1
        }, {
            source: 69,
            target: 25,
            value: 6
        }, {
            source: 69,
            target: 68,
            value: 6
        }, {
            source: 69,
            target: 11,
            value: 1
        }, {
            source: 69,
            target: 24,
            value: 1
        }, {
            source: 69,
            target: 27,
            value: 2
        }, {
            source: 69,
            target: 48,
            value: 1
        }, {
            source: 69,
            target: 41,
            value: 1
        }, {
            source: 70,
            target: 25,
            value: 4
        }, {
            source: 70,
            target: 69,
            value: 4
        }, {
            source: 70,
            target: 68,
            value: 4
        }, {
            source: 70,
            target: 11,
            value: 1
        }, {
            source: 70,
            target: 24,
            value: 1
        }, {
            source: 70,
            target: 27,
            value: 1
        }, {
            source: 70,
            target: 41,
            value: 1
        }, {
            source: 70,
            target: 58,
            value: 1
        }, {
            source: 71,
            target: 27,
            value: 1
        }, {
            source: 71,
            target: 69,
            value: 2
        }, {
            source: 71,
            target: 68,
            value: 2
        }, {
            source: 71,
            target: 70,
            value: 2
        }, {
            source: 71,
            target: 11,
            value: 1
        }, {
            source: 71,
            target: 48,
            value: 1
        }, {
            source: 71,
            target: 41,
            value: 1
        }, {
            source: 71,
            target: 25,
            value: 1
        }, {
            source: 72,
            target: 26,
            value: 2
        }, {
            source: 72,
            target: 27,
            value: 1
        }, {
            source: 72,
            target: 11,
            value: 1
        }, {
            source: 73,
            target: 48,
            value: 2
        }, {
            source: 74,
            target: 48,
            value: 2
        }, {
            source: 74,
            target: 73,
            value: 3
        }, {
            source: 75,
            target: 69,
            value: 3
        }, {
            source: 75,
            target: 68,
            value: 3
        }, {
            source: 75,
            target: 25,
            value: 3
        }, {
            source: 75,
            target: 48,
            value: 1
        }, {
            source: 75,
            target: 41,
            value: 1
        }, {
            source: 75,
            target: 70,
            value: 1
        }, {
            source: 75,
            target: 71,
            value: 1
        }, {
            source: 76,
            target: 64,
            value: 1
        }, {
            source: 76,
            target: 65,
            value: 1
        }, {
            source: 76,
            target: 66,
            value: 1
        }, {
            source: 76,
            target: 63,
            value: 1
        }, {
            source: 76,
            target: 62,
            value: 1
        }, {
            source: 76,
            target: 48,
            value: 1
        }, {
            source: 76,
            target: 58,
            value: 1
        }];

        for (var e = 0; e < edges.length; e += 1) {
            nodeMap[edges[e].target].additional.received = nodeMap[edges[e].target].additional.received || {};
            nodeMap[edges[e].target].additional.sent = nodeMap[edges[e].target].additional.sent || {};

            nodeMap[edges[e].source].additional.received = nodeMap[edges[e].source].additional.received || {};
            nodeMap[edges[e].source].additional.sent = nodeMap[edges[e].source].additional.sent || {};

            var sourceToTarget = Math.round(Math.random() * 10);
            var targetToSource = Math.round(Math.random() * 10);

            nodeMap[edges[e].target].additional.received[edges[e].source] = sourceToTarget;
            nodeMap[edges[e].target].additional.sent[edges[e].source] = targetToSource;

            nodeMap[edges[e].source].additional.received[edges[e].target] = targetToSource;
            nodeMap[edges[e].source].additional.sent[edges[e].target] = sourceToTarget;
        }

        var newNodes = [];

        for (var n in nodeMap) {
            if (nodeMap.hasOwnProperty(n)) {
                var sentTotal = 0;
                var receivedTotal = 0;
                for (var s in nodeMap[n].additional.sent) {
                    sentTotal += nodeMap[n].additional.sent[s];
                }
                for (var r in nodeMap[n].additional.received) {
                    receivedTotal += nodeMap[n].additional.received[r];
                }
                nodeMap[n].additional.volume = receivedTotal + sentTotal;
                newNodes.push(nodeMap[n]);
            }
        }

        this.data = {
            'nodes': nodes,
            'edges': edges
        };
    }

    compareNodes(a: any, b: any) {
        if (a.setInExternal.ratio < b.setInExternal.ratio) {
            return 1;
        }
        if (a.setInExternal.ratio > b.setInExternal.ratio) {
            return -1;
        }
        return 0;
    }

    onNodeClick() {

        var onNodeClickFn = (node: any) => {

            if (node.neighborNodes) {
                return;
            }
            var neighbours = node.getNeighbors();
            node.neighborNodes = neighbours.nodes;

            let edges = neighbours.edges;

            let makeEdgeFunc = (i: any) => {
                let goToEdge = () => {
                    this.api.setSelectedEdgeById(Object.keys(edges[i])[0]);
                };
                return goToEdge;
            };

            node.neighbourList = [];
            for (let i in node.neighborNodes) {
                node.neighborNodes[i].setInExternal = {
                    ratio: Math.round((node.neighborNodes[i].additional.sent[node.id] + node.neighborNodes[i].additional.received[node.id]) / node.additional.volume * 100),
                    goToEdge: makeEdgeFunc(i)
                };
                node.neighbourList.push(node.neighborNodes[i]);
            }

            node.neighbourList.sort(this.compareNodes);
        };

        return onNodeClickFn;
    }

    onEdgeClick() {

        let onEdgeClickFn = (edge: any) => {
            if (edge.sourceNode) {
                return;
            }

            edge.sourceNode = edge.getSourceNode();
            edge.sourceNode.goTo = () => {
                this.api.setSelectedNodeById(edge.sourceNode.id);
            };
            edge.targetNode = edge.getTargetNode();
            edge.targetNode.goTo = () => {
                this.api.setSelectedNodeById(edge.targetNode.id);
            };
        };

        return onEdgeClickFn;
    }

    onStageClick() {
        return function () { };
    }
}
