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

    selectPreviousTab(event: KeyboardEvent): void {

        // determine which arrow key is pressed
        const arrowLeft = event.key === 'ArrowLeft' || event.keyCode === 37;
        const arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;

        // only perform action if the arrow key matches the orientation
        if (arrowLeft && this.stacked !== 'none' || arrowUp && this.stacked === 'none') {
            return;
        }

        // perform selection
        this.tabset.selectPreviousTab();

        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    }

    selectNextTab(event: KeyboardEvent): void {

        // determine which arrow key is pressed
        const arrowRight = event.key === 'ArrowRight' || event.keyCode === 39;
        const arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;

        // only perform action if the arrow key matches the orientation
        if (arrowRight && this.stacked !== 'none' || arrowDown && this.stacked === 'none') {
            return;
        }

        // perform selection
        this.tabset.selectNextTab();

        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    }
}