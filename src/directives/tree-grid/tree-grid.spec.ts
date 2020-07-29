import { Component, QueryList, ViewChildren } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeGridItem, TreeGridModule, TreeGridRowDirective } from './index';

interface TreeGridTestItem extends TreeGridItem {
    title: string;
    children?: TreeGridTestItem[];
}

@Component({
    selector: 'tree-grid-test',
    template: `
        <table [uxTreeGrid]="items" (rowsChange)="rows = $event">
            <tr *ngFor="let row of rows"
                [uxTreeGridRow]="row"
                [canExpand]="true"
                [(expanded)]="row.expanded"
                (expandedChange)="expandedChange(row, $event)">
                <td>{{ row.title }}</td>
            </tr>
        </table>
    `
})
export class TreeGridTestComponent {
    items: TreeGridTestItem[] = [];
    rows: TreeGridTestItem[];
    @ViewChildren(TreeGridRowDirective) rowDirectives: QueryList<TreeGridRowDirective>;
    expandedChange(row: TreeGridTestItem, expanded: boolean): void {}
}

describe('Tree Grid', () => {
    let component: TreeGridTestComponent;
    let fixture: ComponentFixture<TreeGridTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TreeGridModule],
            declarations: [TreeGridTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeGridTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
    });

    describe('with collapsed rows', () => {

        beforeEach(async () => {
            spyOn(component, 'expandedChange');
            component.items = [
                {
                    title: 'Root 1',
                    children: [
                        {
                            title: 'Node 1',
                            children: [
                                {
                                    title: 'Leaf 1'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Root 2'
                }
            ];
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it('should initially render top-level rows', () => {
            const titles = getRowTitles();
            expect(titles.length).toBe(2);
            expect(titles[0]).toBe('Root 1');
            expect(titles[1]).toBe('Root 2');
            expect(component.expandedChange).toHaveBeenCalledTimes(0);
        });

        it('should insert child rows when expanded', async () => {
            component.rowDirectives.first.expand();
            fixture.detectChanges();
            await fixture.whenStable();

            const titles = getRowTitles();
            expect(titles.length).toBe(3);
            expect(titles[0]).toBe('Root 1');
            expect(titles[1]).toBe('Node 1');
            expect(titles[2]).toBe('Root 2');
            expect(component.expandedChange).toHaveBeenCalledTimes(1);
        });

        it('should insert child rows when expanded programmatically', async () => {
            component.items[0].expanded = true;
            fixture.detectChanges();
            await fixture.whenStable();

            const titles = getRowTitles();
            expect(titles.length).toBe(3);
            expect(titles[0]).toBe('Root 1');
            expect(titles[1]).toBe('Node 1');
            expect(titles[2]).toBe('Root 2');
            expect(component.expandedChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('with pre-expanded rows', () => {

        beforeEach(async () => {
            spyOn(component, 'expandedChange');
            component.items = [
                {
                    title: 'Root',
                    expanded: true,
                    children: [
                        {
                            title: 'Node 1',
                            children: [
                                {
                                    title: 'Leaf 1'
                                }
                            ]
                        }
                    ]
                }
            ];
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it('should initially render children of pre-expanded rows', () => {
            const titles = getRowTitles();
            expect(titles.length).toBe(2);
            expect(titles[0]).toBe('Root');
            expect(titles[1]).toBe('Node 1');
            expect(component.expandedChange).toHaveBeenCalledTimes(0);
        });

        it('should remove child rows when collapsed', async () => {
            component.rowDirectives.first.collapse();
            fixture.detectChanges();
            await fixture.whenStable();

            const titles = getRowTitles();
            expect(titles.length).toBe(1);
            expect(titles[0]).toBe('Root');
            expect(component.expandedChange).toHaveBeenCalledTimes(1);
        });

        it('should remove child rows when collapsed programmatically', async () => {
            component.items[0].expanded = false;
            fixture.detectChanges();
            await fixture.whenStable();

            const titles = getRowTitles();
            expect(titles.length).toBe(1);
            expect(titles[0]).toBe('Root');
            expect(component.expandedChange).toHaveBeenCalledTimes(0);
        });
    });

    function getRowElements(): HTMLTableRowElement[] {
        return Array.from(nativeElement.querySelectorAll('tr'));
    }

    function getRowTitles(): string[] {
        return getRowElements().map(row => row.innerText);
    }
});
