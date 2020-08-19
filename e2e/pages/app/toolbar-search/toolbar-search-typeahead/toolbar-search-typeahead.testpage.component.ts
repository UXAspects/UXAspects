import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'uxd-toolbar-search',
    templateUrl: './toolbar-search-typeahead.testpage.component.html',
    styleUrls: ['./toolbar-search-typeahead.testpage.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarSearchTypeaheadTestPageComponent {

    expanded: boolean;
    searchedFor: string = '';
    alwaysExpanded: boolean = false;
    searchText: string;
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

}
