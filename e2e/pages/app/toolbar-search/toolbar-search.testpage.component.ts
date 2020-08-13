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
    searchedFor: string = '';
    alwaysExpanded: boolean = false;

    mastheadSearchText: string;
    searchDropdownOpen: boolean;

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

}
