import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { TabsetService } from '../tabset.service';
import { TabHeadingDirective } from './tab-heading.directive';
import { Subject } from 'rxjs';

let uniqueTabId = 0;

@Component({
    selector: 'ux-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnDestroy {

    /** Define the tab unique id */
    @Input() id: string = `ux-tab-${++uniqueTabId}`;

    /** Define the active state of this tab */
    @Input() active: boolean = false;

    /** Define if this tab is disabled */
    @Input() disabled: boolean = false;

    /** Define the tab heading */
    @Input() heading: string;

    /** provide a custom class for the tab */
    @Input() customClass: string;

    /** Emit when this tab is selected */
    @Output() activated = new EventEmitter<void>();

    /** Emit when this tab is deselected */
    @Output() deactivated = new EventEmitter<void>();

    /** Store a custom header templateRef */
    @ContentChild(TabHeadingDirective, { read: TemplateRef, static: false }) headingRef: TemplateRef<void>;

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(
        private readonly _tabset: TabsetService,
        private readonly _changeDetector: ChangeDetectorRef
    ) { }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    selectTab(): void {
        // if this tab is currently active do nothing
        if (this.active && !this._tabset.manual) {
            return;
        }

        if (!this._tabset.manual) {
            this.active = true;
        }

        this.activated.emit();

        this._changeDetector.detectChanges();
    }

    deselectTab(): void {

        // if this tab is not currently active do nothing
        if (!this.active && !this._tabset.manual) {
            return;
        }

        if (!this._tabset.manual) {
            this.active = false;
        }

        this.deactivated.emit();

        this._changeDetector.detectChanges();
    }
}