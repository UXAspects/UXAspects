import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TabComponent } from './tab/tab.component';

@Injectable()
export class TabsetService {

    tabs$ = new BehaviorSubject<TabComponent[]>([]);
    active$ = new BehaviorSubject<TabComponent>(null);
    focused$ = new BehaviorSubject<boolean>(false);

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

    selectFirstTab(): void {
        if (this.tabs$.value.length > 0) {
            this.selectAtIndex(0);
        }
    }

    selectLastTab(): void {
        if (this.tabs$.value.length > 0) {
            this.selectAtIndex(this.tabs$.value.length - 1);
        }
    }
} 