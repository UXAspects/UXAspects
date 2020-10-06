import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { options } from 'less';
import { CheckboxModule } from '../../checkbox/checkbox.module';
import { BaseResizableTableService } from '../table-column-resize/resizable-table-base.service';
import { RESIZABLE_TABLE_SERVICE_TOKEN } from '../table-column-resize/resizable-table-service.token';
import { TableModule } from '../table.module';

interface TableDocument {
    selected: boolean;
    title: string;
    author: string;
    date: Date;
}

@Component({
    template: `
        <table id="standard-table" class="table" uxResizableTable>
            <thead>
                <tr>
                    <th uxResizableTableColumn [width]="50" [disabled]="true"></th>
                    <th uxResizableTableColumn [(width)]="titleWidth">
                        Title <small class="column-size-label">{{ titleWidth | number }}px</small>
                    </th>
                    <th uxResizableTableColumn [(width)]="authorWidth" [hideHandle]="true">
                        Author <small class="column-size-label">{{ authorWidth | number }}px</small>
                    </th>
                    <th uxResizableTableColumn (widthChange)="dateWidth = $event">
                        Date <small class="column-size-label">{{ dateWidth | number }}px</small>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let document of documents | slice:0:5">
                    <td class="checkbox-column">
                        <ux-checkbox tabindex="-1"></ux-checkbox>
                    </td>
                    <td>{{ document.title }}</td>
                    <td>{{ document.author }}</td>
                    <td>{{ document.date | date }}</td>
                </tr>
            </tbody>
        </table>
    `
})


export class ResizableTableColumnComponent {

    documents: TableDocument[] = [];
    selection: TableDocument[] = [];

    titleWidth: number = 260;
    authorWidth: number = 300;
    dateWidth: number;
    hideHandle: boolean;

    constructor() {
        // generate some dummy data
        this.getPage();
    }

    getPage(): void {
        for (let idx = 0; idx < 5; idx++) {
            this.documents.push({
                selected: false,
                title: `Document ${idx + 1}`,
                author: `Author ${idx + 1}`,
                date: new Date(2019, 8, 12)
            });
        }
    }
}

describe('Resizable table column Component', () => {
    let fixture: ComponentFixture<ResizableTableColumnComponent>;
    let component: ResizableTableColumnComponent;
    let inputElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TableModule, CheckboxModule],
            declarations: [ResizableTableColumnComponent],
            providers: [
                BaseResizableTableService,
                { provide: RESIZABLE_TABLE_SERVICE_TOKEN, useValue: options },

            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResizableTableColumnComponent);
        component = fixture.componentInstance;
        inputElement = fixture.elementRef.nativeElement.querySelectorAll('th');
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should not display column handle when hideHandle is false', () => {
        fixture.detectChanges();
        expect(inputElement[1].classList.contains('ux-resizable-table-hide-handle')).toBeFalsy();
    });

    it('should display column handle when hideHandle is true', () => {
        fixture.detectChanges();
        expect(inputElement[2].classList.contains('ux-resizable-table-hide-handle')).toBeTruthy();
    });
});
