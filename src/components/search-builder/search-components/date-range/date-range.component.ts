import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
import { DateTimePickerTimezone } from '../../../date-time-picker/index';

@Component({
    selector: 'ux-search-date-range',
    templateUrl: './date-range.component.html'
})
export class SearchDateRangeComponent extends BaseSearchComponent implements OnInit {

    type: string = 'date-range';
    label: string;
    placeholder: string = 'Enter date';

    get from() {
        return this.value.hasOwnProperty('from') ? this.value.from : new Date();
    }

    set from(fromValue: any) {

        // create a new value object - promote immutability
        const value = Object.assign({}, this.value);

        // update the from property on the value object
        value.from = fromValue;

        // update the value
        this.value = value;
    }

    get to() {
        return this.value.hasOwnProperty('to') ? this.value.to : new Date();
    }

    set to(toValue: any) {

        // create a new value object - promote immutability
        const value = Object.assign({}, this.value);

        // update the to property on the value object
        value.to = toValue;

        // update the value
        this.value = value;
    }

    ngOnInit(): void {

        // take into account any configuration
        this.label = this.config.label || this.label;
        this.placeholder = this.config.placeholder || this.placeholder;
    }
}