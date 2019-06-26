import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    expanded: boolean;
    searchText: string;
    searchedFor: string = '';

    @ViewChild('searchFieldRight', { static: true })
    searchFieldRight: ElementRef;

    onSearch(searchText: string) {
        // Execute search here
        this.searchedFor = searchText;

        // Close the search field if needed
        this.expanded = false;
    }

    onSearchRight(searchText: string) {
        // Execute search here
        this.searchedFor = searchText;
        this.searchFieldRight.nativeElement.blur();
    }
}