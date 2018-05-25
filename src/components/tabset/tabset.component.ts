import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabsetService } from './tabset.service';

@Component({
    selector: 'ux-tabset',
    templateUrl: './tabset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TabsetService],
    host: {
        '[class.tabs-left]': 'stacked === "left"',
        '[class.tabs-right]': 'stacked === "right"',
    }
})
export class TabsetComponent {

    @Input() type: 'tabs' | 'pills' = 'tabs';
    @Input() justified: boolean = false;
    @Input() vertical: boolean = false;
    @Input() minimal: boolean = true;
    @Input() stacked: 'left' | 'right' | 'none' = 'none';
    @Input('aria-label') ariaLabel: string;

    constructor(public tabset: TabsetService) { }

    /**
     * Allow manual tab selected
     */
    select(tab: TabComponent): void {
        this.tabset.select(tab);
    }
}