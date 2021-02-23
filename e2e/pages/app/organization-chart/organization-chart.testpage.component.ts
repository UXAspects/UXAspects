import { Component } from '@angular/core';
import { HierarchyBarNode, OrganizationChartConnector, OrganizationChartNode } from '@ux-aspects/ux-aspects';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-organization-chart',
    templateUrl: './organization-chart.testpage.component.html',
    styleUrls: ['./organization-chart.testpage.component.less']
})
export class OrganizationChartTestPageComponent {

    connector: OrganizationChartConnector = 'elbow';

    canReveal: boolean = true;

    dataset: OrganizationChartNode<OrganizationChartContext> = {
        id: 0,
        expanded: true,
        data: {
            name: 'Matt',
            position: 'National Manager',
            email: 'nat_manager@company.com'
        },
        children: [
            {
                id: 1,
                data: {
                    name: 'Shannon',
                    position: 'Regional Manager',
                    email: 'reg_manager@company.com'
                },
                children: [
                    {
                        id: 2,
                        data: {
                            name: 'Jim',
                            position: 'Assistant',
                            email: 'assistant@company.com'
                        },
                        children: [
                            {
                                id: 5,
                                data: {
                                    name: 'Karen',
                                    position: 'Human Resources',
                                    email: 'hr@company.com'
                                },
                            },
                            {
                                id: 6,
                                data: {
                                    name: 'Bob',
                                    position: 'Engineer',
                                    email: 'tech@company.com'
                                },
                            },
                        ]
                    },
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
                name: 'Stephen',
                position: 'CEO',
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
    email: string;
    marker?: boolean;
}
