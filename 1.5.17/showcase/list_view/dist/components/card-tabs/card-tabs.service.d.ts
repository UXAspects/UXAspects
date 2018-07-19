import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CardTabComponent } from './card-tab/card-tab.component';
export declare class CardTabsService implements OnDestroy {
    tab$: BehaviorSubject<CardTabComponent>;
    tabs$: BehaviorSubject<CardTabComponent[]>;
    position$: BehaviorSubject<string>;
    private _subscription;
    constructor();
    ngOnDestroy(): void;
    /**
     * Add a tab to the list of tabs
     */
    addTab(tab: CardTabComponent): void;
    /**
     * Remove a tab from the list
     */
    removeTab(tab: CardTabComponent): void;
    /**
     * Select the tab
     */
    select(tab: CardTabComponent): void;
    /**
     * Set the position of the tab content
     */
    setPosition(position: string): void;
}
