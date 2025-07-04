import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ColumnSortingComponent,
  ColumnSortingOrder,
  ColumnSortingState,
  InfiniteScrollDirective,
} from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app',
  templateUrl: './infinite-scroll-column-sorting.testpage.component.html',
  styleUrls: ['./infinite-scroll-column-sorting.testpage.component.css'],
  standalone: false,
})
export class InfiniteScrollColumnSortingTestPageComponent {
  @ViewChild('listEmployees') loadedEmployees: InfiniteScrollDirective;
  @ViewChild('userNameSort') userNameSort: ElementRef;

  loadCallback = this.load.bind(this);
  isLoading = false;
  pageSize = 20;
  employees = [];
  sortBy = 'name';
  sortOrder = 'ASC';
  order: ColumnSortingOrder;

  load(pageNum: number, pageSize: number): Promise<unknown[]> {
    let loadedEmployees = [];
    return new Promise(resolve => {
      setTimeout(() => {
        for (let i = pageNum * pageSize; i < 50; i++) {
          const name = 'employee_' + i;
          loadedEmployees.push({
            name,
            department: 'department_' + i,
          });
        }
        loadedEmployees = this.sort(loadedEmployees);
        resolve(loadedEmployees);
      }, 500);
    });
  }

  changeSortingOrder(column: ColumnSortingComponent): void {
    if (typeof column !== 'undefined' && column !== null) {
      this.order = column.changeState()[0];
    }
    if (typeof this.order !== 'undefined' && this.order !== null) {
      this.sortBy = this.order.key;
      this.sortOrder = this.order.state === ColumnSortingState.Ascending ? 'ASC' : 'DESC';
    }
    this.loadedEmployees.reset();
  }

  sort(users) {
    if (this.sortOrder === 'ASC') {
      users?.sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? 1 : -1));
    } else if (this.sortOrder === 'DESC') {
      users?.sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? -1 : 1));
    }
    return users;
  }

  clickSortTwice(): void {
    this.userNameSort.nativeElement.click();
    setTimeout(() => {
      this.userNameSort.nativeElement.click();
    }, 250);
  }
}
