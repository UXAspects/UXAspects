import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
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
export class TabsetComponent implements AfterViewInit {

    /** Determine if the appearance of the tabset */
    @Input() minimal: boolean = true;

    /** Determine if the tabset should appear stacked */
    @Input() stacked: 'left' | 'right' | 'none' = 'none';

    /** Determine if we want to manually update the active state */
    @Input() set manual(manual: boolean) {
        this.tabset.manual = manual;
    }

    /** Provide am aria label for the tabset */
    @Input('aria-label') ariaLabel: string;

    constructor(
        public readonly tabset: TabsetService,
        private readonly _changeDetector: ChangeDetectorRef
    ) { }

    ngAfterViewInit(): void {

        // Make sure a tab is selected
        if (!this.tabset.isTabActive()) {
            this.tabset.selectFirstTab();
            this._changeDetector.detectChanges();
        }
    }
}