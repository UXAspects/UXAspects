import { Component, OnDestroy } from '@angular/core';
import { Conduit, ConduitZone, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import 'chance';
import { BehaviorSubject ,  Subscription } from 'rxjs';

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view/list-view.component.html',
    providers: [ConduitZone]
})
export class ListViewComponent extends ConduitZoneComponent implements OnDestroy {
    zoneId: string = 'list-zone';
    documents: ConduitListItem[] = [];
    acceptsInput: boolean | string[] = true;
    producesOutput: boolean = true;

    @Conduit({ id: 'search' })
    search = new BehaviorSubject('');

    @Conduit({ id: 'show-zones', producesOutput: false })
    showZones = new BehaviorSubject(false);

    private _documents: ConduitListItem[] = [];
    private _subscription: Subscription;

    constructor(zone: ConduitZone) {
        super(zone);

        for (let index = 0; index < 10; index++) {
            this._documents.push({
                document: `Document ${index}`,
                author: chance.name(),
                date: chance.date({ year: chance.integer({ min: 2015, max: 2018 }) }) as Date
            });
        }

        // whenever the conduit receives a new query update the items
        this._subscription = this.search.subscribe(this.filterItems.bind(this));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    filterItems(value: string = ''): void {
        this.documents = this._documents.filter(_document =>
            _document.document.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            _document.author.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

}

interface ConduitListItem {
    document: string;
    author: string;
    date: Date;
}
