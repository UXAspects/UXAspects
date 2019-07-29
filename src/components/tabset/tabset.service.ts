import { Injectable } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Injectable()
export class TabsetService {

    /** Store the list of tabs */
    tabs: ReadonlyArray<TabComponent> = [];

    // tabs$ = new BehaviorSubject<TabComponent[]>([]);
    // active$ = new BehaviorSubject<TabComponent>(null);
    // focused$ = new BehaviorSubject<boolean>(false);
    // highlighted$ = new BehaviorSubject<TabComponent>(null);

    /** Register a tab in the tabset */
    add(tab: TabComponent): void {
        this.tabs = [...this.tabs, tab];
    }

    /** Remove a tab from the tabset */
    remove(tab: TabComponent): void {
        this.tabs = this.tabs.filter(_tab => _tab !== tab);
    }

    /** Programmatically select a tab */
    select(tab: TabComponent): void {
        if (!tab.disabled) {
            // update the active state of each tab accordingly
            this.tabs.forEach(_tab => _tab.active = _tab === tab);
        }
    }

    /** Determine if there is a selected tab */
    isTabActive(): boolean {
        return !!this.tabs.find(tab => tab.active);
    }

    // selectAtIndex(index: number): void {

    //     // if there are no tabs then do nothing
    //     if (this.tabs$.value.length === 0) {
    //         return;
    //     }

    //     // check if the index is within the bounds
    //     if (index < 0) {
    //         return this.selectAtIndex(this.tabs$.value.length - 1);
    //     } else if (index >= this.tabs$.value.length) {
    //         return this.selectAtIndex(0);
    //     }

    //     const target = this.tabs$.value[index];

    //     if (target) {
    //         this.select(target);
    //     }
    // }

    // selectNextTab(): void {
    //     // find the currently selected index
    //     const index = this.tabs$.value.indexOf(this.active$.value);

    //     // check the tabs after the active one to see if there are any selectable tabs
    //     const tabs = this.tabs$.value.slice(index + 1);

    //     // check if any of the tabs are not disabled
    //     for (let tab of tabs) {
    //         if (!tab.disabled) {
    //             return this.select(tab);
    //         }
    //     }

    //     // if we reach here then no tab could be selected - select the first tab
    //     this.selectFirstTab();
    // }

    // selectPreviousTab(): void {
    //     // find the currently selected index
    //     const index = this.tabs$.value.indexOf(this.active$.value);

    //     // check the tabs before the active one to see if there are any selectable tabs
    //     const tabs = this.tabs$.value.slice(0, index);

    //     // check if any of the tabs are not disabled
    //     for (let tab of tabs.reverse()) {
    //         if (!tab.disabled) {
    //             return this.select(tab);
    //         }
    //     }

    //     // if we reach here then no previous tab could be selected - select the last tab
    //     this.selectLastTab();
    // }

    /** Select the first non-disabled tab */
    selectFirstTab(): void {
        // find the index of the first non-disabled tab
        const tab = this.tabs.find(_tab => !_tab.disabled);

        if (tab) {
            this.select(tab);
        }
    }

    // selectLastTab(): void {
    //     // find the index of the first non-disabled tab
    //     const tabIndex = this.tabs$.value.slice().reverse().findIndex(tab => !tab.disabled);

    //     if (tabIndex !== -1) {
    //         this.selectAtIndex((this.tabs$.value.length - 1) - tabIndex);
    //     }
    // }
}