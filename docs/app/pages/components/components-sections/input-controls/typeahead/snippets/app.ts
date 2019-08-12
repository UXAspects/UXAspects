import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'uxd-components-typeahead',
    templateUrl: 'typeahead.component.html',
    styleUrls: ['./typeahead.component.less'],
})
export class AppComponent {

    dropdownOpened: boolean = false;

    selectOnEnter: boolean = false;

    private _input$ = new BehaviorSubject<string>('');

    private  _value$ = new BehaviorSubject<any>(null);

    dropDirection: 'up' | 'down' = 'down';

    selectFirst: boolean = false;

    loadOptions(pageNum: number, pageSize: number, filter: string) {

        const allTags = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];

        return allTags.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1).slice(pageNum * pageSize, (pageNum + 1) * pageSize);
    }

    @ViewChild('singleInput', { static: false }) singleInput: ElementRef;


    /** The selected option */
    @Input()
    set value(value: any) {
        this._value$.next(value);
    }
    get value() {
        return this._value$.value;
    }

    /** selected option and closing dropdown **/

    singleOptionSelected(event: TypeaheadOptionEvent): void {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpened = false;
        }
    }


    /** Opening the dropdown with filter options. */
    dropdown() {
        this.dropdownOpened = true;
    }

    /** The text in the input area. This is used to filter the options dropdown. */
    @Input()
    set input(value: string) {
        this._input$.next(value);
    }
    get input() {
        return this._input$.value;
    }
}