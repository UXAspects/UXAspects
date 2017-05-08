import { Component } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {
    public currentPage: number = 1;
    public totalItems: number = 100;
    public itemsPerPage: number = 10;
    public totalPages: number;
    public maxSize: number = 5;
    public previousButton = `<i class="hpe-icon hpe-previous" aria-label="previous page"></i>`;
    public nextButton = `<i class="hpe-icon hpe-next" aria-label="next page"></i>`;
}
