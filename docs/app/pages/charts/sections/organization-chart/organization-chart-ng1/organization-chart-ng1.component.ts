import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

const chance = require('chance').Chance();

@Component({
    selector: 'uxd-charts-organization-chart-ng1',
    templateUrl: './organization-chart-ng1.component.html'
})
@DocumentationSectionComponent('ChartsOrganizationChartNg1Component')
export class ChartsOrganizationChartNg1Component implements ICodePenProvider {

    private data: IOrganizationChartNode;
    private options: any;

    private htmlCode = require('./snippets/chart.html');
    private jsCode = require('./snippets/chart.js');
    private cssCode = require('./snippets/chart.css');
    private nodeHtml = require('./snippets/chart-node.html');
    private searchHtml = require('./snippets/search-item.html');
    
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlTemplates: [
            {
                id: 'chart-node.html',
                content: this.nodeHtml
            },
            {
                id: 'search-item.html',
                content: this.searchHtml
            }
        ],
        htmlAttributes: {
            'ng-controller': 'OrganizationChartDemoCtrl as vm'
        },
        js: [this.jsCode],
        css: [this.cssCode]
    };

    constructor() {

        let adminIcon = require('../../../../../assets/img/IconManagerColorized.png');
        let userIcon = require('../../../../../assets/img/IconCustodianColorized.png');

        let internationManager: IOrganizationChartNode = {
            name: chance.name(),
            position: 'International Manager',
            phone: chance.phone(),
            email: 'inat_manager@company.com',
            image: adminIcon
        };

        let chiefTechnicalOfficer: IOrganizationChartNode = {
            name: chance.name(),
            position: 'Chief Technical Officer',
            phone: chance.phone(),
            email: 'cto@company.com',
            image: adminIcon
        };

        this.options = {
            hierarchyBar: {
                image: (data: IOrganizationChartNode) => {
                    return data.image;
                }
            },
            nodes: {
                template: require('!file-loader!./snippets/chart-node.html')
            },
            reveal: () => {

                if (this.data.name === internationManager.name) {

                    // add a new root node
                    chiefTechnicalOfficer.children = [this.data];
                    this.data = chiefTechnicalOfficer;

                    // hide the button now
                    return false;

                } else {

                    // add a new root node                    
                    internationManager.children = [this.data];
                    this.data = internationManager;
                }
            },
            search: {
                enabled: true,
                placeholder: 'Enter name or job title',
                template: require('!file-loader!./snippets/search-item.html'),
                query: (query: string, node: IOrganizationChartNode) => {
                    // return true if the name or title contains the search query
                    return node.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                        node.position.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                }
            }
        };

        this.data = {
            name: chance.name(),
            position: 'National Manager',
            phone: chance.phone(),
            email: 'nat_manager@company.com',
            image: adminIcon,
            children: [{
                name: chance.name(),
                position: 'Regional Manager',
                phone: chance.phone(),
                email: 'reg_manager@company.com',
                image: adminIcon,
                children: [{
                    name: chance.name(),
                    position: 'Assistant',
                    phone: chance.phone(),
                    email: 'assistant@company.com',
                    image: adminIcon,
                    children: [{
                        name: chance.name(),
                        position: 'Human Resources',
                        phone: chance.phone(),
                        email: 'hr@company.com',
                        image: userIcon
                    }, {
                        name: chance.name(),
                        position: 'Engineer',
                        phone: chance.phone(),
                        email: 'tech@company.com',
                        image: userIcon
                    }, {
                        name: chance.name(),
                        position: 'Quality Assurance',
                        phone: chance.phone(),
                        email: 'qa@company.com',
                        image: userIcon
                    }]
                }, {
                    name: chance.name(),
                    position: 'Manager',
                    phone: chance.phone(),
                    email: 'manager@company.com',
                    active: true,
                    image: userIcon,
                    children: [{
                        name: chance.name(),
                        position: 'Sales',
                        phone: chance.phone(),
                        email: 'sales1@company.com',
                        image: userIcon
                    }, {
                        name: chance.name(),
                        position: 'Office Administrator',
                        phone: chance.phone(),
                        email: 'office_admin@company.com',
                        image: userIcon,
                        children: [{
                            name: chance.name(),
                            position: 'Receptionist',
                            phone: chance.phone(),
                            email: 'reception@company.com',
                            image: userIcon
                        }]
                    }, {
                        name: chance.name(),
                        position: 'Sales',
                        phone: chance.phone(),
                        email: 'sales2@company.com',
                        image: userIcon
                    }]
                }, {
                    name: chance.name(),
                    position: 'Head of Accounting',
                    phone: chance.phone(),
                    email: 'accounting@company.com',
                    image: userIcon,
                    children: [{
                        name: chance.name(),
                        position: 'Accountant',
                        phone: chance.phone(),
                        email: 'accountant1@company.com',
                        image: userIcon
                    }, {
                        name: chance.name(),
                        position: 'Accountant',
                        phone: chance.phone(),
                        email: 'accountant2@company.com',
                        image: userIcon
                    }]
                }]
            }]
        };
    }

}

interface IOrganizationChartNode {
    name: string;
    position: string;
    phone: string;
    email: string;
    image: string;
    active?: boolean;
    children?: IOrganizationChartNode[];
}