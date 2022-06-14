import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

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

    form = new UntypedFormGroup({
        search: new UntypedFormControl('')
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
