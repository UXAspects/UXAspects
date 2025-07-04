import { Component, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'e2e-reorderable-table',
  templateUrl: './reorderable-table.testpage.component.html',
  standalone: false,
})
export class ReorderableTableTestPageComponent {
  data: ReorderableTableData[] = [
    {
      document: 'Document 1',
      author: 'Francis Porter',
      date: new Date(2019, 2, 2),
      completed: 92,
      active: false,
    },
    {
      document: 'Document 2',
      author: 'Catherine Holt',
      date: new Date(2019, 4, 13),
      completed: 71,
      active: true,
    },
    {
      document: 'Document 3',
      author: 'Sue Sherman',
      date: new Date(2019, 5, 4),
      completed: 40,
      active: true,
    },
  ];
}

@Pipe({
  name: 'map',
  pure: true,
  standalone: false,
})
export class MapPipe implements PipeTransform {
  transform(value: ReorderableTableData[]) {
    return value.map(_value => _value.document);
  }
}

export interface ReorderableTableData {
  document: string;
  author: string;
  date: Date;
  completed: number;
  active: boolean;
}
