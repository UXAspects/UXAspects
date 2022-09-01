import { Component, ViewChild } from '@angular/core';
import { ColumnSortingComponent, ColumnSortingOrder, ColumnSortingState, InfiniteScrollDirective } from '../../../../src';


@Component({
    selector: 'uxd-team',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.less']
})
export class TestPageComponent {

    loadCallback = this.load.bind(this);
    isLoading = false;
    pageSize = 20;
    users = [];
    @ViewChild('listUsers') usersList: InfiniteScrollDirective;
    sortBy = 'username';
    sortOrder = 'ASC';
    order: ColumnSortingOrder;

    load(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
      let usersList = [];
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          for (let i = pageNum * pageSize; i < 50; i++) {
            usersList.push({
              username: 'user' + i,
              description: 'Test User' + i
            });
          }
          usersList = this.sort(usersList);
          resolve(usersList);
        }, 2000);
      });
    }

    changeSortingOrder(column: ColumnSortingComponent): void {
      if (typeof column !== 'undefined' && column !== null) {
        this.order = column.changeState()[0];
      }
      if (typeof this.order !== 'undefined' && this.order !== null) {
        this.sortBy = this.order.key;
        this.sortOrder =
          this.order.state === ColumnSortingState.Ascending ? 'ASC' : 'DESC';
      }
      this.usersList.reset(true, true);
    }

    sort(users): any {
      if (this.sortOrder === 'ASC') {
        users?.sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? 1 : -1));
      } else if (this.sortOrder === 'DESC') {
        users?.sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? -1 : 1));
      }
      return users;
    }

    constructor() {}
}

export interface FilterOption {
    id: string;
    name: string;
}