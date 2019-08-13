import { Component } from '@angular/core';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    dropdownOpened: boolean = false;
    selectOnEnter: boolean = false;
    dropDirection: 'up' | 'down' = 'down';
    selectFirst: boolean = false;

    private _input$ = new BehaviorSubject<string>('');
    private  _value$ = new BehaviorSubject<string>(null);

    /** Load the options and filter the them */
    loadOptions(pageNum: number, pageSize: number, filter: string) {

        const displayValues = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];
        return displayValues.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1).slice(pageNum * pageSize, (pageNum + 1) * pageSize);
    }

    /** The selected option in input field */
    set value(value: string) {
        this._value$.next(value);
    }
    get value() {
        return this._value$.value;
    }

    /** selected typeahead option and closing dropdown **/
    singleOptionSelected(event: TypeaheadOptionEvent): void {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpened = false;
        }
    }

    /** Opening the typeahead dropdown with filter options. */
    dropdown() {
        this.dropdownOpened = true;
    }

    /** The text in the input area. This is used as the filter value. */
    set input(value: string) {
        this._input$.next(value);
    }
    get input() {
        return this._input$.value;
    }
}