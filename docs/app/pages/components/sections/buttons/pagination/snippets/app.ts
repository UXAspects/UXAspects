import { Component } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {
    currentPage: number = 1;
    totalItems: number = 100;
    itemsPerPage: number = 10;
    totalPages: number;
    maxSize: number = 5;
    previousButton = `<i class="hpe-icon hpe-previous" aria-label="previous page"></i>`;
    nextButton = `<i class="hpe-icon hpe-next" aria-label="next page"></i>`;
}
