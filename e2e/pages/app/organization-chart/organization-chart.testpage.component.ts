import { Component } from '@angular/core';
import { OrganizationChartNode } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-organization-chart',
    templateUrl: './organization-chart.testpage.component.html',
    styleUrls: ['./organization-chart.testpage.component.less'],
})
export class OrganizationChartTestPageComponent {
    toggleNodesOnClick: boolean = true;

    dataset: OrganizationChartNode<OrganizationChartContext> = {
        id: 0,
        expanded: true,
        data: {
            name: 'Node 0',
        },
        children: [
            {
                id: 1,
                data: {
                    name: 'Node 1',
                },
                children: [
                    {
                        id: 2,
                        data: {
                            name: 'Node 2',
                        },
                    },
                ],
            },
        ],
    };
}

interface OrganizationChartContext {
    name: string;
}
