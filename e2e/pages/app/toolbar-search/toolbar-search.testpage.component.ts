import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'uxd-toolbar-search',
    templateUrl: './toolbar-search.testpage.component.html',
    styleUrls: ['./toolbar-search.testpage.component.less']
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
}
