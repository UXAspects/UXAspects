import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchMouseEvent } from '../../common/testing/index';
import { TooltipModule } from '../../components/tooltip/index';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { SankeyLink } from './interfaces/link.interface';
import { SankeyNode } from './interfaces/node.interface';
import { SankeyNodeDirective } from './sankey-chart-node.directive';
import { SankeyChartComponent } from './sankey-chart.component';


@Component({
    selector: 'app-sankey-chart',
    template: `
    <ux-sankey-chart [nodes]="nodes" [links]="links" [columns]="columns">
      <ng-template #sankeyNodeTemplate let-node="node" let-active="active">
        <span class="node-state">{{ node.data.name }}</span> - <span class="active-state">{{ active }}</span>
      </ng-template>
    </ux-sankey-chart>
  `,
    styles: [
        `ux-sankey-chart {
      width: 800px;
      height: 800px;
    }`
    ]
})
export class SankeyChartTestComponent {

    nodes: ReadonlyArray<SankeyNode<SankeyNodeData>> = [
        {
            id: SankeyNodeId.FileSystem,
            data: { name: 'File System Windows', files: 2_100_000, space: 23_100_000_000 }
        },
        {
            id: SankeyNodeId.Exchange,
            data: { name: 'Exchange', files: 3_700_000, space: 40_700_000_000 }
        },
        {
            id: SankeyNodeId.Office365,
            data: { name: 'Office 365 Exchange', files: 1_600_000, space: 17_600_000_000 }
        },
        {
            id: SankeyNodeId.SharePoint,
            data: { name: 'Sharepoint', files: 5_300_000, space: 58_300_000_000 }
        },
        {
            id: SankeyNodeId.Text,
            data: { name: 'Text', files: 2_300_000, space: 18_700_000_000 }
        },
        {
            id: SankeyNodeId.Audio,
            data: { name: 'Audio', files: 1_300_000, space: 17_600_000_000 }
        },
        {
            id: SankeyNodeId.Video,
            data: { name: 'Video', files: 2_500_000, space: 23_100_000_000 }
        },
        {
            id: SankeyNodeId.Entity,
            data: { name: 'Entity', files: 2_950_000, space: 22_000_000_000 }
        },
        {
            id: SankeyNodeId.Metadata,
            data: { name: 'Metadata', files: 1_450_000, space: 12_100_000_000 }
        },
        {
            id: SankeyNodeId.Other,
            data: { name: 'Other', files: 2_200_000, space: 20_900_000_000 }
        },
        {
            id: SankeyNodeId.EmployeeData,
            data: { name: 'Employee data', files: 3_030_000, space: 23_100_000_000 }
        },
        {
            id: SankeyNodeId.HealthData,
            data: { name: 'Health data', files: 1_400_000, space: 17_600_000_000 }
        },
        {
            id: SankeyNodeId.FinancialData,
            data: { name: 'Financial', files: 2_540_000, space: 17_600_000_000 }
        },
        {
            id: SankeyNodeId.PersonalData,
            data: { name: 'Personal', files: 2_480_000, space: 20_900_000_000 }
        },
        {
            id: SankeyNodeId.OtherData,
            data: { name: 'Other', files: 2_800_000, space: 19_800_000_000 }
        }
    ];

    links: ReadonlyArray<SankeyLink> = [
        { source: SankeyNodeId.FileSystem, target: SankeyNodeId.Video, value: 950_000 },
        { source: SankeyNodeId.FileSystem, target: SankeyNodeId.Metadata, value: 200_000 },
        { source: SankeyNodeId.FileSystem, target: SankeyNodeId.Other, value: 950_000 },
        { source: SankeyNodeId.Exchange, target: SankeyNodeId.Text, value: 2_000_000 },
        { source: SankeyNodeId.Exchange, target: SankeyNodeId.Entity, value: 1_700_000 },
        { source: SankeyNodeId.Office365, target: SankeyNodeId.Text, value: 300_000 },
        { source: SankeyNodeId.Office365, target: SankeyNodeId.Audio, value: 1_000_000 },
        { source: SankeyNodeId.Office365, target: SankeyNodeId.Other, value: 300_000 },
        { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Audio, value: 300_000 },
        { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Video, value: 1_250_000 },
        { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Entity, value: 1_250_000 },
        { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Metadata, value: 1_250_000 },
        { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Other, value: 1_250_000 },
        { source: SankeyNodeId.Text, target: SankeyNodeId.EmployeeData, value: 1_150_000 },
        { source: SankeyNodeId.Text, target: SankeyNodeId.FinancialData, value: 920_000 },
        { source: SankeyNodeId.Text, target: SankeyNodeId.PersonalData, value: 230_000 },
        { source: SankeyNodeId.Audio, target: SankeyNodeId.HealthData, value: 520_000 },
        { source: SankeyNodeId.Audio, target: SankeyNodeId.OtherData, value: 780_000 },
        { source: SankeyNodeId.Video, target: SankeyNodeId.PersonalData, value: 2_250_000 },
        { source: SankeyNodeId.Video, target: SankeyNodeId.OtherData, value: 250_000 },
        { source: SankeyNodeId.Entity, target: SankeyNodeId.OtherData, value: 1_770_000 },
        { source: SankeyNodeId.Entity, target: SankeyNodeId.FinancialData, value: 1_180_000 },
        { source: SankeyNodeId.Metadata, target: SankeyNodeId.EmployeeData, value: 1_000_000 },
        { source: SankeyNodeId.Other, target: SankeyNodeId.HealthData, value: 880_000 },
        { source: SankeyNodeId.Other, target: SankeyNodeId.EmployeeData, value: 880_000 },
        { source: SankeyNodeId.Other, target: SankeyNodeId.FinancialData, value: 440_000 },
    ];

    columns: string[] = ['Repositories', 'Extraction', 'Classification'];
}

export interface SankeyNodeData {
    name: string;
    files: number;
    space: number;
}

export enum SankeyNodeId {
    FileSystem,
    Exchange,
    Office365,
    SharePoint,
    Text,
    Audio,
    Video,
    Entity,
    Metadata,
    Other,
    EmployeeData,
    HealthData,
    FinancialData,
    PersonalData,
    OtherData
}

describe('Sankey Chart Component', () => {
    let component: SankeyChartTestComponent;
    let fixture: ComponentFixture<SankeyChartTestComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AccessibilityModule,
                CommonModule,
                TooltipModule,
                ResizeModule,
                BrowserAnimationsModule
            ],
            declarations: [
                SankeyChartTestComponent,
                SankeyChartComponent,
                SankeyNodeDirective,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SankeyChartTestComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create the chart', () => {
        expect(component).toBeTruthy();
    });

    it('should show the correct column headings', () => {
        const titles = element.querySelectorAll<HTMLElement>('.ux-sankey-chart-column-title');
        expect(titles.length).toBe(component.columns.length);
        for (let idx = 0; idx < titles.length; idx++) {
            expect(titles.item(idx).innerText).toBe(component.columns[idx]);
        }
    });

    it('should display the correct number of nodes', () => {
        const nodes = element.querySelectorAll('.ux-sankey-chart-node');
        expect(nodes.length).toBe(15);
    });

    it('should display the correct number of links', () => {
        const links = element.querySelectorAll('.ux-sankey-chart-link');
        expect(links.length).toBe(26);
    });

    it('should display the correct node content', () => {
        const nodes = element.querySelectorAll('.node-state');

        expect(nodes.length).toBe(15);

        for (let idx = 0; idx < nodes.length; idx++) {
            const node = nodes.item(idx);
            expect((node as HTMLElement).innerText).toBe(component.nodes[idx].data.name);
        }
    });

    it('should not show any nodes or links initially active', () => {
        const activeNodes = element.querySelectorAll('.ux-sankey-chart-node-active');
        const activeLinks = element.querySelectorAll('.ux-sankey-chart-link-active');

        expect(activeNodes.length).toBe(0);
        expect(activeLinks.length).toBe(0);
    });

    it('should show active state on node hover', () => {

        // hover over the first node
        const node = element.querySelectorAll('.ux-sankey-chart-node').item(0);
        dispatchMouseEvent(node, 'mouseenter');

        // ensure that the node is active
        expect(node.classList.contains('ux-sankey-chart-node-active')).toBeTruthy();

        // the correct number of links and nodes should now be active
        const activeNodes = element.querySelectorAll('.ux-sankey-chart-node-active');
        const activeLinks = element.querySelectorAll('.ux-sankey-chart-link-active');

        expect(activeNodes.length).toBe(4);
        expect(activeLinks.length).toBe(3);
    });

    it('should remove active state when node hover leaves', () => {
        // hover over the first node
        const node = element.querySelectorAll('.ux-sankey-chart-node').item(0);
        dispatchMouseEvent(node, 'mouseenter');

        // the correct number of links and nodes should now be active
        let activeNodes = element.querySelectorAll('.ux-sankey-chart-node-active');
        let activeLinks = element.querySelectorAll('.ux-sankey-chart-link-active');

        expect(activeNodes.length).toBe(4);
        expect(activeLinks.length).toBe(3);

        dispatchMouseEvent(node, 'mouseleave');

        // the correct number of links and nodes should now be active
        activeNodes = element.querySelectorAll('.ux-sankey-chart-node-active');
        activeLinks = element.querySelectorAll('.ux-sankey-chart-link-active');

        expect(activeNodes.length).toBe(0);
        expect(activeLinks.length).toBe(0);
    });

    it('should show active state on link hover', () => {
        // hover over the first link
        const link = element.querySelectorAll('.ux-sankey-chart-link').item(0);
        dispatchMouseEvent(link, 'mouseenter');

        // ensure that the link is active
        expect(link.classList.contains('ux-sankey-chart-link-active')).toBeTruthy();

        // the correct number of links and nodes should now be active
        const activeNodes = element.querySelectorAll('.ux-sankey-chart-node-active');
        const activeLinks = element.querySelectorAll('.ux-sankey-chart-link-active');

        expect(activeNodes.length).toBe(2);
        expect(activeLinks.length).toBe(1);
    });

    it('should not active state when link hover leaves', () => {
        // hover over the first link
        const link = element.querySelectorAll('.ux-sankey-chart-link').item(0);
        dispatchMouseEvent(link, 'mouseenter');

        // the correct number of links and nodes should now be active
        let activeNodes = element.querySelectorAll('.ux-sankey-chart-node-active');
        let activeLinks = element.querySelectorAll('.ux-sankey-chart-link-active');

        expect(activeNodes.length).toBe(2);
        expect(activeLinks.length).toBe(1);
        dispatchMouseEvent(link, 'mouseleave');

        // the correct number of links and nodes should now be active
        activeNodes = element.querySelectorAll('.ux-sankey-chart-node-active');
        activeLinks = element.querySelectorAll('.ux-sankey-chart-link-active');

        expect(activeNodes.length).toBe(0);
        expect(activeLinks.length).toBe(0);
    });


    it('should update TemplateRef context on node hover', () => {
        // hover over the first node
        const node = element.querySelectorAll('.ux-sankey-chart-node').item(0);
        const activeState = node.querySelector('.active-state') as HTMLElement;

        expect(activeState.innerText).toBe('false');

        dispatchMouseEvent(node, 'mouseenter');

        expect(activeState.innerText).toBe('true');
    });


    it('should update TemplateRef context on link hover', () => {
        // hover over the first link
        const node = element.querySelectorAll('.ux-sankey-chart-node').item(0);
        const link = element.querySelectorAll('.ux-sankey-chart-link').item(0);
        const activeState = node.querySelector('.active-state') as HTMLElement;

        expect(activeState.innerText).toBe('false');

        dispatchMouseEvent(link, 'mouseenter');

        expect(activeState.innerText).toBe('true');
    });

    it('should not intially show a tooltip', () => {
        const tooltip = element.querySelector('ux-tooltip');
        expect(tooltip).toBeFalsy();
    });

    it('should show a tooltip on link hover', () => {
        const link = element.querySelectorAll('.ux-sankey-chart-link').item(0);
        dispatchMouseEvent(link, 'mouseenter');

        const tooltip = element.querySelector('ux-tooltip');
        expect(tooltip).toBeTruthy();
    });

    it('should show a the correct tooltip content on link hover', () => {
        const link = element.querySelectorAll('.ux-sankey-chart-link').item(0);
        dispatchMouseEvent(link, 'mouseenter');

        const tooltip = element.querySelector('ux-tooltip') as HTMLElement;
        expect(tooltip.innerText).toBe('950,000 items');
    });

    it('should show a falloff indicator when the outputs are less than the inputs', () => {
        const falloff = element.querySelectorAll('.ux-sankey-chart-falloff-indicator');
        expect(falloff.length).toBe(2);
    });

    it('should show a tooltip on falloff hover', () => {
        const falloff = element.querySelectorAll('.ux-sankey-chart-falloff-indicator').item(0);
        dispatchMouseEvent(falloff, 'mouseenter');

        const tooltip = element.querySelector('ux-tooltip');
        expect(tooltip).toBeTruthy();
    });

    it('should show a the correct tooltip content', () => {
        const falloff = element.querySelectorAll('.ux-sankey-chart-falloff-indicator').item(0);
        dispatchMouseEvent(falloff, 'mouseenter');

        const tooltip = element.querySelector('ux-tooltip') as HTMLElement;
        expect(tooltip.innerText).toBe('450,000 items');
    });

    it('should resize nodes when container is resized', (done) => {
        const chart = element.querySelector('ux-sankey-chart') as HTMLElement;
        const node = element.querySelectorAll('.ux-sankey-chart-node').item(0) as HTMLElement;

        expect(node.offsetWidth).toBe(150);
        chart.style.width = '900px';

        setTimeout(() => {
            expect(node.offsetWidth).toBe(170);
            done();
        }, 100);

    });
});
