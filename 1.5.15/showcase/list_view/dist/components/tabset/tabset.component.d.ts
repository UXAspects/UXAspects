import { TabComponent } from './tab/tab.component';
import { TabsetService } from './tabset.service';
export declare class TabsetComponent {
    tabset: TabsetService;
    minimal: boolean;
    stacked: 'left' | 'right' | 'none';
    ariaLabel: string;
    constructor(tabset: TabsetService);
    /**
     * Allow manual tab selected
     */
    select(tab: TabComponent): void;
    selectPreviousTab(event: KeyboardEvent): void;
    selectNextTab(event: KeyboardEvent): void;
}
