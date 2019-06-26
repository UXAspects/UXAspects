import { Component } from '@angular/core';
import { HierarchyBarNode, OrganizationChartConnector, OrganizationChartNode } from '@ux-aspects/ux-aspects';
import 'chance';
import { Observable } from 'rxjs';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    connector: OrganizationChartConnector = 'elbow';

    canReveal: boolean = true;

    dataset: OrganizationChartNode<OrganizationChartContext> = {
        id: 0,
        expanded: true,
        data: {
            name: chance.name(),
            position: 'National Manager',
            phone: chance.phone(),
            email: 'nat_manager@company.com'
        },
        children: [
            {
                id: 1,
                data: {
                    name: chance.name(),
                    position: 'Regional Manager',
                    phone: chance.phone(),
                    email: 'reg_manager@company.com'
                },
                children: [
                    {
                        id: 2,
                        data: {
                            name: chance.name(),
                            position: 'Assistant',
                            phone: chance.phone(),
                            email: 'assistant@company.com'
                        },
                        children: [
                            {
                                id: 5,
                                data: {
                                    name: chance.name(),
                                    position: 'Human Resources',
                                    phone: chance.phone(),
                                    email: 'hr@company.com'
                                },
                            },
                            {
                                id: 6,
                                data: {
                                    name: chance.name(),
                                    position: 'Engineer',
                                    phone: chance.phone(),
                                    email: 'tech@company.com'
                                },
                            },
                            {
                                id: 7,
                                data: {
                                    name: chance.name(),
                                    position: 'Quality Assurance',
                                    phone: chance.phone(),
                                    email: 'qa@company.com'
                                },
                            }
                        ]
                    },
                    {

                        id: 3,
                        data: {
                            name: chance.name(),
                            position: 'Manager',
                            phone: chance.phone(),
                            email: 'manager@company.com',
                            marker: true
                        },
                        children: [
                            {
                                id: 8,
                                data: {
                                    name: chance.name(),
                                    position: 'Sales',
                                    phone: chance.phone(),
                                    email: 'sales1@company.com',
                                },
                            },
                            {
                                id: 9,
                                data: {
                                    name: chance.name(),
                                    position: 'Office Administrator',
                                    phone: chance.phone(),
                                    email: 'office_admin@company.com',
                                },
                                children: [
                                    {
                                        id: 11,
                                        data: {
                                            name: chance.name(),
                                            position: 'Receptionist',
                                            phone: chance.phone(),
                                            email: 'reception@company.com',
                                        },
                                    }
                                ]
                            },
                            {
                                id: 10,
                                data: {
                                    name: chance.name(),
                                    position: 'Sales',
                                    phone: chance.phone(),
                                    email: 'sales2@company.com',
                                },
                            }
                        ]
                    },
                    {
                        id: 4,
                        data: {
                            name: chance.name(),
                            position: 'Head of Accounting',
                            phone: chance.phone(),
                            email: 'accounting@company.com',
                        },
                        children: [
                            {
                                id: 12,
                                data: {
                                    name: chance.name(),
                                    position: 'Accountant',
                                    phone: chance.phone(),
                                    email: 'accountant1@company.com',
                                },
                            },
                            {
                                id: 13,
                                data: {
                                    name: chance.name(),
                                    position: 'Accountant',
                                    phone: chance.phone(),
                                    email: 'accountant2@company.com',
                                },
                            }
                        ]
                    }
                ]
            }
        ]
    };

    hierarchy: HierarchyBarNode = this.getHierarchy(this.dataset);
    hierarchyBarSelected: HierarchyBarNode;
    organizationChartSelected: OrganizationChartNode<OrganizationChartContext>;

    onReveal(): void {
        // add a new node above the root node
        this.dataset = {
            id: 14,
            expanded: true,
            data: {
                name: chance.name(),
                position: 'CEO',
                phone: chance.phone(),
                email: 'ceo@company.com',
            },
            children: [this.dataset]
        };

        // update the hierarchy bar
        this.hierarchy = this.getHierarchy(this.dataset);

        this.canReveal = false;
    }

    getHierarchy(node: OrganizationChartNode<OrganizationChartContext>): HierarchyBarNode {
        return {
            title: node.data.name,
            icon: 'https://uxaspects.github.io/UXAspects/assets/IconManagerColorized.png',
            children: node.children ? node.children.map(child => this.getHierarchy(child)) : null
        } as HierarchyBarNode;
    }

    onOrganizationChartSelect(node: OrganizationChartNode<OrganizationChartContext>): void {
        // get a flattened array of all hierarchy bar nodes
        const nodes = this.flatten(this.hierarchy);

        // find the matching hierarchy bar node
        this.hierarchyBarSelected = nodes.find(_node => _node.title === node.data.name);
    }

    onHierarchyBarSelect(node: HierarchyBarNode): void {
        // get a flattened array of all hierarchy bar nodes
        const nodes = this.flatten(this.dataset);

        // find the matching hierarchy bar node
        this.organizationChartSelected = nodes.find(_node => _node.data.name === node.title);
    }

    /** Get a flattened array of the OrganizationChart nodes or HierarchyBarNodes */
    flatten<T extends HasChildren<T>>(nodes: T | T[]): T[] {
        nodes = Array.isArray(nodes) ? nodes : [nodes];
        return nodes.reduce((accumulation, node) =>
            Array.isArray(node.children) ?
                [...accumulation, node, ...this.flatten(node.children)] :
                [...accumulation, node], []);
    }
}

export interface HasChildren<T> {
    children?: T[] | ReadonlyArray<T> | Observable<T[]>;
}

export interface OrganizationChartContext {
    name: string;
    position: string;
    phone: string;
    email: string;
    marker?: boolean;
}