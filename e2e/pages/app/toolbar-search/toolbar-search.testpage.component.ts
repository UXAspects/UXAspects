import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'uxd-toolbar-search',
    templateUrl: './toolbar-search.testpage.component.html',
    styleUrls: ['./toolbar-search.testpage.component.less']
})
export class ToolbarSearchTestPageComponent {

    expanded: boolean;
    searchText: string;
    searchedFor: string = '';

    @ViewChild('searchFieldRight')
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
