import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabComponent } from './tab/tab.component';

@Injectable()
export class TabsetService {

    /** Store the list of tabs */
    tabs: ReadonlyArray<TabComponent> = [];

    activeTab$ = new BehaviorSubject<TabComponent>(null);

    /** Store the manual state */
    manual: boolean = false;

    /** Update the array of tabs - required to preserve order */
    update(tabs: TabComponent[]): void {
        this.tabs = [...tabs];
    }

    /** Select a tab (from user input) */
    select(tab: TabComponent): void {
        if (tab.disabled) {
            return;
        }

        if (this.manual) {
            // In manual mode, emit the activated/deactivated events.
            // The application is responsible for updating the active state on each tab, which will then update the UI.
            this.tabs.forEach(_tab => _tab === tab ? _tab.activate() : _tab.deactivate());
        } else {
            this.activeTab$.next(tab);
        }
    }

    /** Set tab active state */
    setTabActive(tab: TabComponent): void {
        if (!tab.disabled) {
            this.activeTab$.next(tab);
        }
    }

    /** Determine if there is a selected tab */
    isTabActive(): boolean {
        return this.activeTab$.getValue() !== null;
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
