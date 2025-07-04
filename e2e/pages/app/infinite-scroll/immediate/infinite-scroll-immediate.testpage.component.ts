import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: './infinite-scroll-immediate.testpage.component.html',
  styleUrls: ['./infinite-scroll-immediate.testpage.component.css'],
  standalone: false,
})
export class InfiniteScrollImmediateTestPageComponent {
  filterText = new BehaviorSubject<string>('');
  debouncedFilterText = this.filterText;

  allEmployees = [];
  loadedEmployees = [];
  loadCallback = this.load.bind(this);
  pageSize = 20;

  loadOnScroll: boolean = true;

  load(pageNum: number, pageSize: number): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      setTimeout(() => {
        const pageStart = pageNum * pageSize;
        const newItems = this.allEmployees.slice(pageStart, pageStart + pageSize);
        resolve(newItems);
      });
    });
  }

  constructor() {
    for (let i = 0; i < 111; i += 1) {
      const name = 'employee_' + i;
      this.allEmployees.push({
        id: i,
        name: name,
        department: 'department_' + i,
        email: name.toLowerCase().replace(' ', '.') + '@business.com',
      });
    }
  }
}
