import { Injectable } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Injectable()
export class TabsetService {

    /** Store the list of tabs */
    tabs: ReadonlyArray<TabComponent> = [];

    /** Store the manual state */
    manual: boolean = false;

    /** Update the array of tabs - required to preserve order */
    update(tabs: TabComponent[]): void {
        this.tabs = [...tabs];
    }

    /** Programmatically select a tab */
    select(tab: TabComponent): void {
        if (!tab.disabled) {
            // update the active state of each tab accordingly
            this.tabs.forEach(_tab => _tab === tab ? _tab.selectTab() : _tab.deselectTab());
        }
    }

    /** Determine if there is a selected tab */
    isTabActive(): boolean {
        return !!this.tabs.find(tab => tab.active);
    }

    /** Select the first non-disabled tab */
    selectFirstTab(): void {
        // find the index of the first non-disabled tab
        const tab = this.tabs.find(_tab => !_tab.disabled);

        if (tab) {
            this.select(tab);
        }
    }
}