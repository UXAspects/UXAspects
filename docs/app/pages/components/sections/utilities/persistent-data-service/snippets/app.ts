import { PersistentDataService, PersistentDataStorageType } from 'ux-aspects';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    searches = ['checkbox', 'toggle switch', 'tree grid'];

    constructor(public persistentDataService: PersistentDataService) {
        this.persistentDataService.setData(
            'mySearches',
            this.searches,
            PersistentDataStorageType.LocalStorage
        );
        let mySearches = this.persistentDataService.getData(
            'mySearches',
            PersistentDataStorageType.LocalStorage
        );
    }
}