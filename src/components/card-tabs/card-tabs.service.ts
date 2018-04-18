import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CardTabComponent } from './card-tab/card-tab.component';

@Injectable()
export class CardTabsService {

  tab$ = new BehaviorSubject<CardTabComponent>(null);
  position = new BehaviorSubject<string>('top');

  /**
   * Each tab will call this when it is initialised.
   * This allows us to initially select the first tab
   */
  initialise(tab: CardTabComponent): void {
    if (!this.tab$.getValue()) {
      this.select(tab);
    }
  }

  /**
   * Select the tab
   */
  select(tab: CardTabComponent): void {
    this.tab$.next(tab);
  }

  /**
   * Set the position of the tab content
   */
  setPosition(position: string): void {
    this.position.next(position);
  }
}
