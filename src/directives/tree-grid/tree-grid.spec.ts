import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeGridItem, TreeGridModule } from './index';

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
                [(expanded)]="row.expanded">
                <td>{{ row.title }}</td>
            </tr>
        </table>
    `
})
export class TreeGridTestComponent {
    items: TreeGridTestItem[] = [];
    rows: TreeGridTestItem[];
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

    describe('with pre-expanded rows', () => {

        beforeEach(async () => {
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
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it('should initially render children of pre-expanded rows', () => {
            const titles = getRowTitles();
            expect(titles.length).toBe(2);
            expect(titles[0]).toBe('Root');
            expect(titles[1]).toBe('Node 1');
        });
    });

    function getRowElements(): HTMLTableRowElement[] {
        return Array.from(nativeElement.querySelectorAll('tr'));
    }

    function getRowTitles(): string[] {
        return getRowElements().map(row => row.innerText);
    }
});
