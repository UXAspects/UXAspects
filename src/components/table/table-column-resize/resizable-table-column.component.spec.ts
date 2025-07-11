import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxModule } from '../../checkbox/checkbox.module';
import { BaseResizableTableService } from '../table-column-resize/resizable-table-base.service';
import { RESIZABLE_TABLE_SERVICE_TOKEN } from '../table-column-resize/resizable-table-service.token';
import { TableModule } from '../table.module';
import { ResizableTableService } from './table-column-resize-standard/resizable-table.service';

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
          <th uxResizableTableColumn [(width)]="authorWidth" handleVisible="false">
            Author <small class="column-size-label">{{ authorWidth | number }}px</small>
          </th>
          <th uxResizableTableColumn (widthChange)="dateWidth = $event">
            Date <small class="column-size-label">{{ dateWidth | number }}px</small>
          </th>
        </tr>
      </thead>
      <tbody>
        @for (document of documents | slice: 0 : 5; track document) {
          <tr>
            <td class="checkbox-column">
              <ux-checkbox tabindex="-1"></ux-checkbox>
            </td>
            <td>{{ document.title }}</td>
            <td>{{ document.author }}</td>
            <td>{{ document.date | date }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  standalone: false,
})
export class ResizableTableColumnComponent {
  documents: TableDocument[] = [];
  selection: TableDocument[] = [];

  titleWidth: number = 260;
  authorWidth: number = 300;
  dateWidth: number;
  handleVisible: boolean;

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
        date: new Date(2019, 8, 12),
      });
    }
  }
}

describe('Resizable table column Component', () => {
  let fixture: ComponentFixture<ResizableTableColumnComponent>;
  let component: ResizableTableColumnComponent;
  let tableHeaderElements: NodeListOf<HTMLElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, CheckboxModule],
      declarations: [ResizableTableColumnComponent],
      providers: [
        BaseResizableTableService,
        { provide: RESIZABLE_TABLE_SERVICE_TOKEN, useValue: ResizableTableService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizableTableColumnComponent);
    component = fixture.componentInstance;
    tableHeaderElements = fixture.elementRef.nativeElement.querySelectorAll('th');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display column handle when handleVisible is true', () => {
    expect(tableHeaderElements[1].classList.contains('ux-resizable-table-hide-handle')).toBe(false);
  });

  it('should not display column handle when handleVisible is false', () => {
    expect(tableHeaderElements[2].classList.contains('ux-resizable-table-hide-handle')).toBe(true);
  });

  it('should have the current width as the aria-valenow label on the drag handles', () => {
    expect(
      tableHeaderElements[1]
        .querySelector('.ux-resizable-table-column-handle')
        .getAttribute('aria-valuenow')
    ).toBe('260');
  });

  it('should have the correct role of separator as the drag handle role', () => {
    expect(
      tableHeaderElements[1].querySelector('.ux-resizable-table-column-handle').getAttribute('role')
    ).toBe('separator');
  });
});
