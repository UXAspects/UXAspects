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

        // if value does not exist the set it
        if (!this.value || !this.value.from) {
            this.from = new Date();
        }

        return this.value.from;
    }

    set from(fromValue: any) {

        // create new object based on the current value
        const value = Object.assign({}, this.value);

        // set the latest value
        value.from = fromValue;

        // update the value object while ensuring immutability
        this.value = value;
    }

    get to() {

        // if value does not exist the set it
        if (!this.value || !this.value.to) {
            this.to = new Date();
        }

        return this.value.to;
    }

    set to(toValue: any) {

        // create new object based on the current value
        const value = Object.assign({}, this.value);

        // set the latest value
        value.to = toValue;

        // update the value object while ensuring immutability
        this.value = value;
    }

    ngOnInit(): void {

        // take into account any configuration
        this.label = this.config.label || this.label;
        this.placeholder = this.config.placeholder || this.placeholder;
    }

    /**
     * Override the default validation
     */
    validate(): void {

        // check if there is a config validation function
        if (this.config.validation) {
            return super.validate();
        }

        // otherwise perform the built in validation function
        this.valid = this.from.getDate() <= this.to.getDate() &&
            this.from.getMonth() <= this.to.getMonth() &&
            this.from.getYear() <= this.to.getYear();
    }
}