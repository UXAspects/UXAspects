import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    multiple: boolean = false;
    selected: string[] = [];
    authors: string[] = [];
    query: string = '';

    private _authors: string[] = [];

    constructor() {
        // create some dummy list items
        for (let idx = 0; idx < 20; idx++) {
            this._authors.push(chance.name());
        }

        // perform initial search
        this.search();
    }

    search(): void {
        this.authors = this._authors.filter(author => author.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    }

}