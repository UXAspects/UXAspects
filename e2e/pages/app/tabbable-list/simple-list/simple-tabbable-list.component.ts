import { ChangeDetectorRef, Component } from '@angular/core';
import { Chance } from 'chance';

const chance = new Chance();

@Component({
    selector: 'app-simple-tabbable-list',
    templateUrl: './simple-tabbable-list.component.html',
    styleUrls: ['./simple-tabbable-list.component.less']
})
export class SimpleTabbableListComponent {

    /** Store the complete dataset */
    data: ReadonlyArray<IDocument> = [];

    /** Store the documents that should be displayed */
    documents: ReadonlyArray<IDocument> = [];

    /** Store whether or not the component should wrap */
    shouldWrap: boolean = true;

    /** Determine if we should allow boundary keys */
    allowBoundaryKeys: boolean = true;

    /** Allow the view to be recreated with different properties */
    isResetting: boolean = false;

    /** Determine if we should focus on show */
    focusOnShow: boolean = false;

    constructor(private _changeDetector: ChangeDetectorRef) {
        // populate the list of items
        for (let idx = 0; idx < 5; idx++) {
            this.data = [...this.data, { id: idx, name: `Document ${idx}`, author: chance.name(), date: chance.date() }];
        }

        // create the list of items to display
        this.documents = [...this.data];
    }

    search(query: string): void {
        this.documents = this.data.filter(document =>
            document.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            document.author.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }

    resetView(): void {
        this.isResetting = true;
        this._changeDetector.detectChanges();
        this.isResetting = false;
        this._changeDetector.detectChanges();
    }
}

export interface IDocument {
    id: number;
    name: string;
    author: string;
    date: Date;
}
