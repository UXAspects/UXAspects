import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyBarModule } from './hierarchy-bar.module';
import { HierarchyBarNode } from './interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'hierarchy-bar-collapsed',
    template: `
        <ux-hierarchy-bar
            mode="collapsed"
            [root]="root"
            [(selected)]="selected"
        ></ux-hierarchy-bar>
    `
})
export class HierarchyBarCollapsedTestComponent {
    root: HierarchyBarNode = {
        title: 'A.1',
        children: [
            {
                title: 'B.1',
                children: [
                    {
                        title: 'C.1'
                    },
                    {
                        title: 'C.2'
                    }
                ]
            },
            {
                title: 'B.2'
            }
        ]
    };
    selected: HierarchyBarNode;
}

describe('Hierarchy Bar in collapsed mode', () => {

    let component: HierarchyBarCollapsedTestComponent;
    let fixture: ComponentFixture<HierarchyBarCollapsedTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HierarchyBarModule],
            declarations: [HierarchyBarCollapsedTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HierarchyBarCollapsedTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should not collapse when two nodes are selected', () => {
        component.selected = component.root.children[0];
        fixture.detectChanges();

        expect(getVisibleNodeCount()).toBe(2);
        expect(getNodeTitle(0)).toBe('A.1');
        expect(getNodeTitle(1)).toBe('B.1');

        expect(nativeElement.querySelector('.hierarchy-bar-overflow')).toBeFalsy();
    });

    it('should collapse when three nodes are selected', () => {
        component.selected = component.root.children[0].children[0];
        fixture.detectChanges();

        expect(getVisibleNodeCount()).toBe(2);
        expect(getNodeTitle(0)).toBe('A.1');
        expect(getNodeTitle(1)).toBe('C.1');

        expect(nativeElement.querySelector('.hierarchy-bar-overflow')).toBeTruthy();
    });

    it('should update when root is modified', () => {
        expect(getVisibleNodeCount()).toBe(1);
        expect(getNodeTitle(0)).toBe('A.1');

        component.root = {
            title: 'New A.1'
        };
        fixture.detectChanges();

        expect(getVisibleNodeCount()).toBe(1);
        expect(getNodeTitle(0)).toBe('New A.1');
    });

    it('should update when a node is selected and root is modified', () => {
        component.selected = component.root.children[0].children[0];
        fixture.detectChanges();

        expect(getVisibleNodeCount()).toBe(2);
        expect(getNodeTitle(0)).toBe('A.1');
        expect(getNodeTitle(1)).toBe('C.1');
        expect(nativeElement.querySelector('.hierarchy-bar-overflow')).toBeTruthy();

        component.root = {
            title: 'New A.1',
            children: [
                {
                    title: 'New B.1',
                    children: [
                        {
                            title: 'New C.1'
                        },
                        {
                            title: 'New C.2'
                        }
                    ]
                },
                {
                    title: 'New B.2'
                }
            ]
        };
        fixture.detectChanges();

        expect(getVisibleNodeCount()).toBe(1);
        expect(getNodeTitle(0)).toBe('New A.1');
        expect(nativeElement.querySelector('.hierarchy-bar-overflow')).toBeFalsy();
    });

    function getVisibleNodeCount(): number {
        return nativeElement.querySelectorAll<HTMLElement>('.hierarchy-bar-node-title').length;
    }

    function getNodeTitle(nodeIndex: number): string {
        const titles = nativeElement.querySelectorAll<HTMLElement>('.hierarchy-bar-node-title');
        return titles[nodeIndex].innerText;
    }
});
