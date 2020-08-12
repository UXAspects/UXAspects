import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'uxd-toolbar-search',
    templateUrl: './toolbar-search.testpage.component.html',
    styleUrls: ['./toolbar-search.testpage.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarSearchTestPageComponent {

    expanded: boolean;
    searchText: string;
    searchedFor: string = '';
    alwaysExpanded: boolean = false;

    form = new FormGroup({
        search: new FormControl('')
    });

    onSearch(searchText: string) {
        // Execute search here
        this.searchedFor = searchText;

        // Close the search field if needed
        this.expanded = false;
    }

    onSearchRight() {
        // Execute search here
        this.searchedFor = this.form.controls.search.value;
    }

    @ViewChild('searchField')
    searchField: ElementRef;

    toolbarExpanded: boolean;
    toolbarSearchText: string;
    toolbarSearchedFor: string = '';

    mastheadSearchExpanded: boolean;
    mastheadSearchText: string;
    mastheadSearchedFor: string = '';
    values: ReadonlyArray<string> = [];
    searchDropdownOpen: boolean;

    input: string = '';

    options = ['One', 'Two', 'Three', 'Four'];

    onToolbarSearch(searchText: string): void {
        // Execute search here
        this.toolbarSearchedFor = searchText;

        // Close the search field if needed
        this.toolbarExpanded = false;
    }

    onMastheadSearch(searchText: string): void {
        // Execute search here
        this.mastheadSearchedFor = searchText;

        // Close the search field if needed
        this.mastheadSearchExpanded = false;
    }

}
