import { Component } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './pagination.testpage.component.html'
})
// changed name from AppComponent
export class PaginationTestPageComponent {
    currentPage: number = 1;
    totalItems: number = 100;
    itemsPerPage: number = 10;
    totalPages: number;
    maxSize: number = 5;

    reset(): void {
        this.currentPage = 1;
        this.totalItems = 100;
        this.itemsPerPage = 10;
        this.maxSize = 5;
    }
}
