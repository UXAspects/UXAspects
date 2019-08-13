import { Component, ElementRef, HostListener, Inject } from '@angular/core';
import 'chance';
import { TypeaheadOptionEvent } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    tagDocumentationRoute: string;
    values: string[] = [];

    dropdownOpen: boolean = false;
    selectOnEnter: boolean = false;
    dropDirection: 'up' | 'down' = 'down';
    selectFirst: boolean = false;

    value: string = '';
    input: string = '';

    loadOptionsFn = this.loadOptions.bind(this);

    /** Load the options and filter the them */
    loadOptions(pageNum: number, pageSize: number, filter: string): string[] {
        return this.values.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1).slice(pageNum * pageSize, (pageNum + 1) * pageSize);
    }

    /** selected typeahead option and closing dropdown **/
    select(event: TypeaheadOptionEvent): void {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }

    /** close dropdown when click outside of typeahead*/
    @HostListener('document:click', ['$event'])
    handleOutsideClick(event: Event): void {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.dropdownOpen = false;
        }
    }

    constructor(private eRef: ElementRef) {

        /* Adding values to typeahead list */
        for (let index = 0; index < 40; index++) {
            this.values.push(chance.name());
        }
    }

}