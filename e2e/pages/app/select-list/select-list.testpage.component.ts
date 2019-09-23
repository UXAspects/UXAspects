import { Component } from '@angular/core';

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.testpage.component.html',
    styleUrls: ['./select-list.testpage.component.css']
})
export class SelectListTestPageComponent {
    multiple: boolean = false;
    selected: string[] = [];
    authors: string[] = [];
    query: string = '';

    private _authors: string[] = [
        'Linnie Dixon',
        'Jeremy Floyd',
        'Benjamin Hawkins',
        'Bess Mathis',
        'Caroline Montgomery',
        'Matthew Osborne',
        'Zachary Holland',
        'Isaiah Curry',
        'Ian Lyons',
        'Sara Valdez',
        'Margaret Douglas',
        'Lulu Chandler',
        'Owen Crawford',
        'Jennie Rowe',
        'Genevieve Alexander',
        'Frances Todd',
        'Hunter Clark',
        'Tom Frazier',
        'Randy Cole',
        'Helena Cross'
    ];

    constructor() {
        // perform initial search
        this.search();
    }

    search(): void {
        this.authors = this._authors.filter(author => author.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    }

    reset(): void {
        this.multiple = false;
        this.selected = [];
        this.authors = [];
        this.query = '';
        this.search();
    }
}
