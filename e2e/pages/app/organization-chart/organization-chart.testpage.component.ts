import { Component } from '@angular/core';
import { OrganizationChartConnector, OrganizationChartNode } from '@ux-aspects/ux-aspects';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-organization-chart',
    templateUrl: './organization-chart.testpage.component.html',
    styleUrls: ['./organization-chart.testpage.component.less']
})
export class OrganizationChartTestPageComponent {

    connector: OrganizationChartConnector = 'elbow';
    toggleNodesOnClick: boolean = true;

    dataset: OrganizationChartNode<OrganizationChartContext> = {
        id: 0,
        expanded: true,
        data: {
            name: 'Matt',
            position: 'National Manager',
        },
        children: [
            {
                id: 1,
                data: {
                    name: 'Shannon',
                    position: 'Regional Manager',
                },
                children: [
                    {
                        id: 2,
                        data: {
                            name: 'Jim',
                            position: 'Assistant',
                        },
                    },
                ]
            }
        ]
    };

}

export interface HasChildren<T> {
    children?: T[] | ReadonlyArray<T> | Observable<T[]>;
}

export interface OrganizationChartContext {
    name: string;
    position: string;
    marker?: boolean;
}
