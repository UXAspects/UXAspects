import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TabComponent } from './tab/tab.component';

@Injectable()
export class TabsetService {

    tabs$ = new BehaviorSubject<TabComponent[]>([]);
    active$ = new BehaviorSubject<TabComponent>(null);
    focused$ = new BehaviorSubject<boolean>(false);
    highlighted$ = new BehaviorSubject<TabComponent>(null);

    add(tab: TabComponent): void {
        this.tabs$.next([...this.tabs$.value, tab]);

        // check if this is the only tab. If so select this by default
        if (!this.active$.value) {
            this.select(tab);
        }
    }

    remove(tab: TabComponent): void {

        // remove the tab
        this.tabs$.next(this.tabs$.value.filter(_tab => _tab !== tab));
    }

    select(tab: TabComponent): void {
        if (!tab.disabled) {
            this.active$.next(tab);
            this.highlighted$.next(tab);
        }
    }

    selectAtIndex(index: number): void {

        // if there are no tabs then do nothing
        if (this.tabs$.value.length === 0) {
            return;
        }

        // check if the index is within the bounds
        if (index < 0) {
            return this.selectAtIndex(this.tabs$.value.length - 1);
        } else if (index >= this.tabs$.value.length) {
            return this.selectAtIndex(0);
        }

        const target = this.tabs$.value[index];

        if (target) {
            this.select(target);
        }
    }

    selectNextTab(): void {
        // find the currently selected index
        const index = this.tabs$.value.indexOf(this.active$.value);

        // check the tabs after the active one to see if there are any selectable tabs
        const tabs = this.tabs$.value.slice(index + 1);

        // check if any of the tabs are not disabled
        for (let tab of tabs) {
            if (!tab.disabled) {
                return this.select(tab);
            }
        }

        // if we reach here then no tab could be selected - select the first tab
        this.selectFirstTab();
    }

    selectPreviousTab(): void {
        // find the currently selected index
        const index = this.tabs$.value.indexOf(this.active$.value);

        // check the tabs before the active one to see if there are any selectable tabs
        const tabs = this.tabs$.value.slice(0, index);

        // check if any of the tabs are not disabled
        for (let tab of tabs.reverse()) {
            if (!tab.disabled) {
                return this.select(tab);
            }
        }

        // if we reach here then no previous tab could be selected - select the last tab
        this.selectLastTab();
    }

    selectFirstTab(): void {
        // find the index of the first non-disabled tab
        const tabIndex = this.tabs$.value.findIndex(tab => !tab.disabled);

        if (tabIndex !== -1) {
            this.selectAtIndex(tabIndex);
        }
    }

    selectLastTab(): void {
        // find the index of the first non-disabled tab
        const tabIndex = this.tabs$.value.slice().reverse().findIndex(tab => !tab.disabled);

        if (tabIndex !== -1) {
            this.selectAtIndex((this.tabs$.value.length - 1) - tabIndex);
        }
    }
} 