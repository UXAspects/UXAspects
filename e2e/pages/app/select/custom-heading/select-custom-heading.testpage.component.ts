import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-select-custom-heading',
    templateUrl: './select-custom-heading.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomHeadingTestPageComponent implements OnInit {

    // ux-select configuration properties
    options: string[] | Function;
    dropdownOpen: boolean;
    placeholder = 'Select a country';
    recentOptions: ReadonlyArray<string> = null;

    // Customize settings
    dataSet = new BehaviorSubject<string>('strings');

    dataSets: { strings?: any[], objects?: any[] } = {};

    constructor() {

        // "strings" data set
        this.dataSets.strings = ['United States', 'United Kingdom', 'Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'American Samoa'];

        // "objects" data set
        this.dataSets.objects = this.dataSets.strings.map((option, i) => {
            return { id: i, name: option };
        });
    }

    ngOnInit() {
        this.options = this.selectedDataSet();
    }

    selectedDataSet(): any[] {
        return this.dataSets[this.dataSet.getValue()];
    }

}
