import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TabComponent } from './tab/tab.component';
export declare class TabsetService {
    tabs$: BehaviorSubject<TabComponent[]>;
    active$: BehaviorSubject<TabComponent>;
    focused$: BehaviorSubject<boolean>;
    highlighted$: BehaviorSubject<TabComponent>;
    add(tab: TabComponent): void;
    remove(tab: TabComponent): void;
    select(tab: TabComponent): void;
    selectAtIndex(index: number): void;
    selectNextTab(): void;
    selectPreviousTab(): void;
    selectFirstTab(): void;
    selectLastTab(): void;
}
