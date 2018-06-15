import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';

@Component({
    selector: 'ux-search-date-range',
    templateUrl: './date-range.component.html'
})
export class SearchDateRangeComponent extends BaseSearchComponent {

    type: string = 'date-range';

    get label(): string {
        return this.config.label;
    }

    get from() {

        // if value does not exist the set it
        if (!this.value || !this.value.from) {
            this.from = new Date();
        }

        // ensure that the from value is a date object
        if (this.value.from instanceof Date === false) {
            this.value.from = new Date(this.value.from);
        }

        return this.value.from;
    }

    set from(fromValue: any) {

        // create new object based on the current value
        const value = Object.assign({}, this.value);

        // ensure that the from value is a date
        if (fromValue instanceof Date === false) {
            fromValue = new Date(fromValue);
        }

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

        // ensure that the to value is a date object
        if (this.value.to instanceof Date === false) {
            this.value.to = new Date(this.value.to);
        }

        return this.value.to;
    }

    set to(toValue: any) {

        // create new object based on the current value
        const value = Object.assign({}, this.value);

        // ensure that the to value is a date
        if (toValue instanceof Date === false) {
            toValue = new Date(toValue);
        }

        // set the latest value
        value.to = toValue;

        // update the value object while ensuring immutability
        this.value = value;
    }

    get fromLabel(): string {
        return this.config.fromLabel || 'From';
    }

    get toLabel(): string {
        return this.config.toLabel || 'To';
    }

    get fromPlaceholder(): string {
        return this.config.fromPlaceholder;
    }

    get toPlaceholder(): string {
        return this.config.toPlaceholder;
    }

    /**
     * Override the default validation
     */
    validate(): void {

        // check if there is a config validation function
        if (this.config.validation) {
            return super.validate();
        }

        // create copies of the dates so we can modify time value (to ignore it)
        const from = new Date(this.value.from);
        const to = new Date(this.value.to);

        // set the time to the same so we dont compare it
        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);

        // valid if the from date is less than or equal to the to date
        this.valid = from <= to;
    }
}

export interface SearchDateRangeConfig {
    label?: string;
    fromLabel?: string;
    toLabel?: string;
    fromPlaceholder?: string;
    toPlaceholder?: string;
    validation: (value: any) => boolean;
}