import { Component } from '@angular/core';
import { OrganizationChartConnector, OrganizationChartNode } from '@ux-aspects/ux-aspects';
import { Chance } from 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

const chance = new Chance();

@Component({
    selector: 'uxd-charts-organization-chart',
    templateUrl: './organization-chart.component.html'
})
@DocumentationSectionComponent('ChartsOrganizationChartComponent')
export class ChartsOrganizationChartComponent extends BaseDocumentationSection {

    connector: OrganizationChartConnector = 'elbow';

    dataset: OrganizationChartNode<any> = {
        id: 0,
        data: {
            name: chance.name(),
            position: 'National Manager',
            phone: chance.phone(),
            email: 'nat_manager@company.com',
            role: 'admin',
        },
        children: [
            {
                id: 1,
                data: {
                    name: chance.name(),
                    position: 'Regional Manager',
                    phone: chance.phone(),
                    email: 'reg_manager@company.com',
                    role: 'admin',
                },
                children: [
                    {
                        id: 2,
                        data: {
                            name: chance.name(),
                            position: 'Assistant',
                            phone: chance.phone(),
                            email: 'assistant@company.com',
                            role: 'admin',
                        },
                        children: [
                            {
                                id: 4,
                                data: {
                                    name: chance.name(),
                                    position: 'Human Resources',
                                    phone: chance.phone(),
                                    email: 'hr@company.com',
                                    role: 'user'
                                },
                            },
                            {
                                id: 5,
                                data: {
                                    name: chance.name(),
                                    position: 'Engineer',
                                    phone: chance.phone(),
                                    email: 'tech@company.com',
                                    role: 'user'
                                },
                            },
                            {
                                id: 6,
                                data: {
                                    name: chance.name(),
                                    position: 'Quality Assurance',
                                    phone: chance.phone(),
                                    email: 'qa@company.com',
                                    role: 'user'
                                },
                            }
                        ]
                    },
                    {

                        id: 2,
                        data: {
                            name: chance.name(),
                            position: 'Manager',
                            phone: chance.phone(),
                            email: 'manager@company.com',
                            role: 'user',
                        },
                        children: [
                            {
                                id: 7,
                                data: {
                                    name: chance.name(),
                                    position: 'Sales',
                                    phone: chance.phone(),
                                    email: 'sales1@company.com',
                                    role: 'user'
                                },
                            },
                            {
                                id: 8,
                                data: {
                                    name: chance.name(),
                                    position: 'Office Administrator',
                                    phone: chance.phone(),
                                    email: 'office_admin@company.com',
                                    role: 'user',
                                },
                                children: [
                                    {
                                        id: 10,
                                        data: {
                                            name: chance.name(),
                                            position: 'Receptionist',
                                            phone: chance.phone(),
                                            email: 'reception@company.com',
                                            role: 'user'
                                        },
                                    }
                                ]
                            },
                            {
                                id: 9,
                                data: {
                                    name: chance.name(),
                                    position: 'Sales',
                                    phone: chance.phone(),
                                    email: 'sales2@company.com',
                                    role: 'user'
                                },
                            }
                        ]
                    },
                    {
                        id: 3,
                        data: {
                            name: chance.name(),
                            position: 'Head of Accounting',
                            phone: chance.phone(),
                            email: 'accounting@company.com',
                            role: 'user',
                        },
                        children: [
                            {
                                id: 11,
                                data: {
                                    name: chance.name(),
                                    position: 'Accountant',
                                    phone: chance.phone(),
                                    email: 'accountant1@company.com',
                                    role: 'user'
                                },
                            },
                            {
                                id: 12,
                                data: {
                                    name: chance.name(),
                                    position: 'Accountant',
                                    phone: chance.phone(),
                                    email: 'accountant2@company.com',
                                    role: 'user'
                                },
                            }
                        ]
                    }
                ]
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}