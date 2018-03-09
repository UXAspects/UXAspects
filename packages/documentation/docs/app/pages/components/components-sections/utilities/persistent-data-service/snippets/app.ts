import { PersistentDataService, PersistentDataStorageType } from '@ux-aspects/ux-aspects';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    searches = ['checkbox', 'toggle switch', 'tree grid'];

    constructor(private _persistentDataService: PersistentDataService) {
        this._persistentDataService.setItem(
            'mySearches',
            this.searches,
            PersistentDataStorageType.LocalStorage
        );
        let mySearches = this._persistentDataService.getItem(
            'mySearches',
            PersistentDataStorageType.LocalStorage
        );
        this._persistentDataService.removeItem(
            'mySearches',
            PersistentDataStorageType.LocalStorage
        );
        this._persistentDataService.clear(
            PersistentDataStorageType.LocalStorage
        );
    }
}