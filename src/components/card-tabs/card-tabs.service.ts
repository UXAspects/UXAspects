import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CardTabComponent } from './card-tab/card-tab.component';

@Injectable()
export class CardTabsService implements OnDestroy {

    tab$ = new BehaviorSubject<CardTabComponent>(null);
    tabs$ = new BehaviorSubject<CardTabComponent[]>([]);
    position$ = new BehaviorSubject<string>('top');

    private _subscription: Subscription;

    constructor() {

        // when a tab is added or removed ensure we always select one if any are available
        this._subscription = this.tabs$.pipe(
            filter(tabs => !this.tab$.value || !tabs.find(tab => tab === this.tab$.value)),
        ).subscribe(tabs => this.tab$.next(tabs.length > 0 ? tabs[0] : null));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /**
     * Add a tab to the list of tabs
     */
    addTab(tab: CardTabComponent): void {
        this.tabs$.next([...this.tabs$.value, tab]);
    }

    /**
     * Remove a tab from the list
     */
    removeTab(tab: CardTabComponent): void {
        this.tabs$.next(this.tabs$.value.filter(_tab => _tab !== tab));
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
        this.position$.next(position);
    }
}
