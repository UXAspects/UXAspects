import { ChangeDetectionStrategy, Component } from '@angular/core';
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

    toolbarExpanded: boolean;
    toolbarSearchedFor: string = '';
    mastheadSearchText: string;
    searchDropdownOpen: boolean;

    input: string = '';

    options = ['One', 'Two', 'Three', 'Four'];

    form = new FormGroup({
        search: new FormControl('')
    });

    onSearch(searchText: string): void {
        // Execute search here
        this.searchedFor = searchText;

        // Close the search field if needed
        this.expanded = false;
    }

    onSearchRight(): void {
        // Execute search here
        this.searchedFor = this.form.controls.search.value;
    }

    onToolbarSearch(searchText: string): void {
        // Execute search here
        this.toolbarSearchedFor = searchText;

        // Close the search field if needed
        this.toolbarExpanded = false;
    }
}
