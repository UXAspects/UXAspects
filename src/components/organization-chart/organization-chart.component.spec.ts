import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { dispatchKeyboardEvent, dispatchMouseEvent } from '../../common/testing/index';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeDimensions, ResizeService } from '../../directives/resize/index';
import { OrganizationChartComponent, OrganizationChartNode } from './organization-chart.component';

export class MockResizeService {
    addResizeListener(target: HTMLElement): BehaviorSubject<ResizeDimensions> {
        return new BehaviorSubject<ResizeDimensions>({ width: target.offsetWidth, height: target.offsetHeight });
    }

    removeResizeListener(_target: HTMLElement): void { }
}

@Component({
    selector: 'app-organization-chart',
    template: `
    <div style="width: 800px; height: 600px;">
        <ux-organization-chart
            [dataset]="dataset"
            [duration]="0"
            [(selected)]="selected"
            [nodeWidth]="210"
            [nodeHeight]="90"
            [showReveal]="canReveal"
            (reveal)="onReveal()">

            <ng-template #nodeTemplate let-data="data" let-focused="focused">
                <span class="node-name">{{ data.name }}</span>
                <span class="node-focused">{{ focused }}</span>
            </ng-template>

        </ux-organization-chart>
    </div>`
})
export class OrganizationChartTestComponent {

    dataset: OrganizationChartNode<Employee> = {
        id: 0,
        data: {
            name: 'Tony Stark'
        },
        children: [
            {
                id: 1,
                data: {
                    name: 'Carol Danvers'
                }
            },
            {
                id: 2,
                data: {
                    name: 'Peter Parker'
                }
            },
            {
                id: 3,
                data: {
                    name: 'Bruce Banner'
                }
            }
        ]
    };

    selected: OrganizationChartNode<Employee>;
    canReveal: boolean = false;

    onReveal(): void { }

}

export interface Employee {
    name: string;
}

describe('Organization Chart Component', () => {
    let component: OrganizationChartTestComponent;
    let fixture: ComponentFixture<OrganizationChartTestComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AccessibilityModule,
                CommonModule
            ],
            providers: [
                { provide: ResizeService, useClass: MockResizeService }
            ],
            declarations: [
                OrganizationChartTestComponent,
                OrganizationChartComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(OrganizationChartTestComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    }));

    afterEach(() => fixture.nativeElement.remove());

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initially show the correct nodes', () => {
        const nodes = getNodes();
        expect(nodes.length).toBe(1);
    });

    it('should show the correct content in the root node', () => {
        const [name, isFocused] = getNodeContents(getRootNode());

        expect(name).toBe('Tony Stark');
        expect(isFocused).toBe(false);
    });

    it('should not show the reveal button when `showReveal` is false', () => {
        expect(getRevealButton().hasAttribute('hidden')).toBeTruthy();
    });

    it('should not show the reveal button when `showReveal` is true', () => {
        component.canReveal = true;
        fixture.detectChanges();
        expect(getRevealButton().hasAttribute('hidden')).toBeFalsy();
    });

    it('should emit whenever the reveal button is pressed', () => {
        component.canReveal = true;
        fixture.detectChanges();

        const onRevealSpy = spyOn(component, 'onReveal');

        dispatchMouseEvent(getRevealButton(), 'click');

        // expect the onReveal function to be called
        expect(onRevealSpy).toHaveBeenCalledTimes(1);
    });

    it('should select the root node by default', () => {
        expect(getRootNode().classList.contains('ux-organization-chart-node-selected')).toBeTruthy();
        expect(component.selected).toEqual(component.dataset);
    });

    it('should expand nodes on click if they have children', async (done) => {
        await clickOnNode(getRootNode());
        expect(getNodes().length).toBe(4);
        done();
    });

    it('should expand nodes on enter if they have children', async (done) => {
        getRootNode().focus();
        await keydownOnNode(getRootNode(), ENTER);
        expect(getNodes().length).toBe(4);
        done();
    });

    it('should collapse expanded nodes on click', async (done) => {
        await clickOnNode(getRootNode());
        expect(getNodes().length).toBe(4);
        await clickOnNode(getRootNode());
        expect(getNodes().length).toBe(1);
        done();
    });

    it('should collapse expanded nodes on enter key', async (done) => {
        getRootNode().focus();
        await keydownOnNode(getRootNode(), ENTER);
        expect(getNodes().length).toBe(4);
        await keydownOnNode(getRootNode(), ENTER);
        expect(getNodes().length).toBe(1);
        done();
    });

    it('should focus a child node on click', async (done) => {
        await clickOnNode(getRootNode());
        await clickOnNode(getNodes().item(1));
        expect(getNodes().item(1).classList.contains('ux-organization-chart-node-selected')).toBeTruthy();
        expect(component.selected).toEqual(component.dataset.children[0]);
        done();
    });

    function getNodes(): NodeListOf<HTMLElement> {
        return element.querySelectorAll<HTMLElement>('.ux-organization-chart-node');
    }

    function getRootNode(): HTMLElement {
        return getNodes().item(0) as HTMLElement;
    }

    function getNodeContents(node: HTMLElement): [string, boolean] {
        const data: HTMLSpanElement = node.querySelector('.node-name');
        const focused: HTMLSpanElement = node.querySelector('.node-focused');

        return [data.innerText, coerceBooleanProperty(focused.innerText)];
    }

    function getRevealButton(): HTMLButtonElement | null {
        return element.querySelector('.ux-organization-chart-reveal');
    }

    function clickOnNode(node: HTMLElement): Promise<void> {
        return new Promise<void>(resolve => {
            dispatchMouseEvent(node, 'click');
            setTimeout(() => resolve(), 100);
        });
    }

    function keydownOnNode(node: HTMLElement, keyCode: number): Promise<void> {
        return new Promise<void>(resolve => {
            dispatchKeyboardEvent(node, 'keydown', keyCode);
            setTimeout(() => resolve(), 100);
        });
    }
});