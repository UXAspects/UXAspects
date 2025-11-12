import { Component, inject } from '@angular/core';
import { PersistentDataService, PersistentDataStorageType } from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _persistentDataService = inject(PersistentDataService);

  searches = ['checkbox', 'toggle switch', 'tree grid'];

  constructor() {
    this._persistentDataService.setItem(
      'mySearches',
      this.searches,
      PersistentDataStorageType.LocalStorage
    );
    const mySearches = this._persistentDataService.getItem(
      'mySearches',
      PersistentDataStorageType.LocalStorage
    );
    this._persistentDataService.removeItem('mySearches', PersistentDataStorageType.LocalStorage);
    this._persistentDataService.clear(PersistentDataStorageType.LocalStorage);
  }
}
