import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TabsetService } from '../tabset.service';
import { TabHeadingDirective } from './tab-heading.directive';

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
    @Input()
    set active(active: boolean) {
        if (active) {
            this._tabset.select(this);
        }
    }

    get active(): boolean {
        return this._active;
    }

    /** Define if this tab is disabled */
    @Input() disabled: boolean = false;

    /** Define the tab heading */
    @Input() heading: string;

    /** provide a custom class for the tab */
    @Input() customClass: string;

    /** Emits when the active state changes. */
    @Output() activeChange = new EventEmitter<boolean>();

    /** Emit when this tab is selected */
    @Output() activated = new EventEmitter<void>();

    /** Emit when this tab is deselected */
    @Output() deactivated = new EventEmitter<void>();

    /** Store a custom header templateRef */
    @ContentChild(TabHeadingDirective, { read: TemplateRef, static: false }) headingRef: TemplateRef<void>;

    /** Whether the tab is active. */
    _active = false;

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(
        private readonly _tabset: TabsetService,
        private readonly _changeDetector: ChangeDetectorRef
    ) {
        _tabset.activeTab$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(activeTab => {
            if (activeTab === this) {
                this.selectTab();
            } else {
                this.deselectTab();
            }
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private selectTab(): void {
        // if this tab is currently active do nothing
        if (this._active && !this._tabset.manual) {
            return;
        }

        if (!this._tabset.manual) {
            this._active = true;
            this.activeChange.emit(true);
        }

        this.activated.emit();

        this._changeDetector.detectChanges();
    }

    private deselectTab(): void {

        // if this tab is not currently active do nothing
        if (!this._active && !this._tabset.manual) {
            return;
        }

        if (!this._tabset.manual) {
            this._active = false;
            this.activeChange.emit(false);
        }

        this.deactivated.emit();

        this._changeDetector.detectChanges();
    }
}
